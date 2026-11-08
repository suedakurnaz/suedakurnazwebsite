// Directional section snapping.
// CSS scroll-snap (mandatory) pulls the page back when a wheel/trackpad gesture is
// shorter than half a screen, and can trap content in sections taller than the screen.
// This version waits until scrolling has settled, then:
//  - inside a section taller than the screen: leaves the page where it is (free reading),
//  - otherwise: moves on to the next stop in the direction you scrolled,
//    or back to where you were if the gesture was tiny.
const REDUCED = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

export function attachSnap(target, measure) {
  const isWin = target === window;
  const getY = () => (isWin ? window.scrollY : target.scrollTop);
  const viewH = () => (isWin ? window.innerHeight : target.clientHeight);
  const maxY = () => (isWin ? document.documentElement.scrollHeight - window.innerHeight : target.scrollHeight - target.clientHeight);
  const scrollTo = top => (isWin ? window : target).scrollTo({ top, behavior: REDUCED ? 'auto' : 'smooth' });

  let settled = getY();
  let aim = null;
  let timer = 0;
  let disabled = false;

  const settle = () => {
    if (disabled) return;
    const y = getY();
    const vh = viewH();
    if (aim !== null) {
      // our own animation finished (or was interrupted by the user)
      if (Math.abs(y - aim) <= 2) {
        settled = aim;
        aim = null;
        return;
      }
      aim = null;
    }
    const { stops: raw, zones } = measure(vh);
    const top = maxY();
    const stops = [...new Set([...raw, ...zones.flat(), top].map(v => Math.round(Math.min(top, Math.max(0, v)))))].sort((a, b) => a - b);

    if (zones.some(([a, b]) => y > a + 1 && y < b - 1)) {
      settled = y; // free reading inside a tall section
      return;
    }
    const near = stops.find(s => Math.abs(s - y) <= 2);
    if (near !== undefined) {
      settled = near;
      return;
    }
    const moved = y - settled;
    let to;
    if (Math.abs(moved) < vh * 0.1) {
      to = stops.reduce((best, s) => (Math.abs(s - settled) < Math.abs(best - settled) ? s : best), stops[0]);
    } else if (moved > 0) {
      const ahead = stops.filter(s => s > settled + 2);
      to = ahead.length ? ahead.reduce((best, s) => (Math.abs(s - y) < Math.abs(best - y) ? s : best), ahead[0]) : y;
      if (to < y - vh * 0.6) to = ahead.find(s => s >= y - 2) ?? to; // flung far: don't pull back up
    } else {
      const behind = stops.filter(s => s < settled - 2);
      to = behind.length ? behind.reduce((best, s) => (Math.abs(s - y) < Math.abs(best - y) ? s : best), behind[0]) : y;
      if (to > y + vh * 0.6) to = [...behind].reverse().find(s => s <= y + 2) ?? to;
    }
    if (Math.abs(to - y) <= 2) {
      settled = to;
      return;
    }
    aim = to;
    scrollTo(to);
  };

  const onScroll = () => {
    clearTimeout(timer);
    timer = setTimeout(settle, 150);
  };
  // jumps from links / buttons start a fresh position
  const reset = () => {
    settled = getY();
  };

  (isWin ? window : target).addEventListener('scroll', onScroll, { passive: true });
  return {
    reset,
    pause: on => {
      disabled = on;
      if (!on) settled = getY();
    },
    destroy: () => {
      clearTimeout(timer);
      (isWin ? window : target).removeEventListener('scroll', onScroll);
    }
  };
}

const docTop = el => el.getBoundingClientRect().top + window.scrollY;

// Stops for the main page.
export const measurePage = vh => {
  const stops = [0];
  const zones = [];
  const sec = id => document.getElementById(id);
  for (const id of ['hakkimda', 'araclar', 'yol', 'iletisim']) {
    const el = sec(id);
    if (!el) continue;
    const t = docTop(el);
    stops.push(t);
    if (el.offsetHeight > vh + 8) zones.push([t, t + el.offsetHeight - vh]);
  }
  document.querySelectorAll('#isler .snap').forEach(s => stops.push(docTop(s)));
  return { stops, zones };
};

// Stops inside a case study.
export const measureCase = scroller => vh => {
  const stops = [];
  const zones = [];
  for (const el of scroller.children) {
    stops.push(el.offsetTop);
    if (!el.classList.contains('cs-tour') && el.offsetHeight > vh + 8) zones.push([el.offsetTop, el.offsetTop + el.offsetHeight - vh]);
  }
  scroller.querySelectorAll('.cs-mark').forEach(m => stops.push(m.offsetParent === scroller ? m.offsetTop : m.parentElement.offsetTop + m.offsetTop));
  return { stops, zones };
};
