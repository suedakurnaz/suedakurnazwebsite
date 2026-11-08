import { useEffect, useRef } from 'react';

/*
  Lightweight 2D take on React Bits' Antigravity "magnet" preset.
  Floating dashes drift across the field; the cursor pulls the nearby ones
  into a slowly turning ring. With no pointer, the magnet wanders on its own.
*/
const Antigravity = ({
  colors = ['#363427', '#e6dee6', '#28222d'],
  count = 650,
  particleSize = 0.4,
  particleVariance = 0.3,
  ringRadius = 5.5,
  className = ''
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return undefined;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    let w = 1;
    let h = 1;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let t = 0;
    let last = performance.now();
    const pointer = { x: 0, y: 0, inside: false };
    const magnet = { x: 0, y: 0 };

    const R = ringRadius * 30;
    const parts = Array.from({ length: count }, (_, i) => {
      const v = 1 + (Math.random() * 2 - 1) * particleVariance;
      return {
        hx: Math.random(),
        hy: Math.random(),
        drift: Math.random() * Math.PI * 2,
        a: Math.random() * Math.PI * 2,
        r: R * (0.85 + Math.random() * 0.3),
        len: 18 * particleSize * v,
        color: colors[i % colors.length],
        alpha: colors[i % colors.length].toLowerCase() === '#e6dee6' ? 0.85 : 0.9,
        x: 0,
        y: 0,
        rot: Math.random() * Math.PI,
        ready: false
      };
    });

    const resize = () => {
      w = Math.max(1, host.clientWidth);
      h = Math.max(1, host.clientHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if (!magnet.x) {
        magnet.x = w * 0.5;
        magnet.y = h * 0.5;
      }
      draw(0);
    };

    const smooth = (e0, e1, x) => {
      const k = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
      return k * k * (3 - 2 * k);
    };

    const draw = dt => {
      t += dt;
      const tx = pointer.inside ? pointer.x : w * (0.5 + 0.28 * Math.sin(t * 0.21));
      const ty = pointer.inside ? pointer.y : h * (0.5 + 0.18 * Math.sin(t * 0.33 + 1));
      const k = 1 - Math.exp(-dt / (pointer.inside ? 0.12 : 0.6));
      magnet.x += (tx - magnet.x) * k;
      magnet.y += (ty - magnet.y) * k;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = 'round';
      ctx.lineWidth = Math.max(1.5, 5 * particleSize);
      const reach = R * 2.4;
      const ease = 1 - Math.exp(-dt / 0.35);

      for (const p of parts) {
        const hx = p.hx * w + Math.sin(t * 0.25 + p.drift) * 18;
        const hy = p.hy * h + Math.cos(t * 0.2 + p.drift) * 18;
        const d = Math.hypot(hx - magnet.x, hy - magnet.y);
        const pull = smooth(reach, R * 0.6, d);
        const ang = p.a + t * 0.18;
        const wave = Math.sin(p.a * 4 + t * 1.3) * 10;
        const rx = magnet.x + Math.cos(ang) * (p.r + wave);
        const ry = magnet.y + Math.sin(ang) * (p.r + wave);
        const gx = hx + (rx - hx) * pull;
        const gy = hy + (ry - hy) * pull;
        if (!p.ready) {
          p.x = gx;
          p.y = gy;
          p.ready = true;
        }
        p.x += (gx - p.x) * ease;
        p.y += (gy - p.y) * ease;
        const target = pull > 0.05 ? Math.atan2(p.y - magnet.y, p.x - magnet.x) : p.drift + t * 0.1;
        let diff = target - p.rot;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        p.rot += diff * ease;
        const half = (p.len * (0.6 + 0.4 * pull)) / 2;
        const cx = Math.cos(p.rot) * half;
        const cy = Math.sin(p.rot) * half;
        ctx.globalAlpha = p.alpha * (0.35 + 0.65 * pull);
        ctx.strokeStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(p.x - cx, p.y - cy);
        ctx.lineTo(p.x + cx, p.y + cy);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = now => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (raf || !visible || reduced) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.inside = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= r.width && pointer.y <= r.height;
    };
    const onLeave = () => {
      pointer.inside = false;
    };

    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave, { passive: true });
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(host);
    resize();
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [colors, count, particleSize, particleVariance, ringRadius]);

  return <canvas ref={ref} className={`antigravity ${className}`.trim()} aria-hidden="true" />;
};

export default Antigravity;
