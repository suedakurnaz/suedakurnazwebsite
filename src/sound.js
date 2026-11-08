// "Petal" — a soft, short tap, and "Braam" — the cinematic hit that greets the
// landing screen (React Bits Sound Lab recipe). Both play on one shared context.
import { renderSound } from './sounds/react-bits-sound';
import BRAAM from './sounds/braam';

let ctx = null;
let enabled = true;

try {
  enabled = localStorage.getItem('sound') !== 'off';
} catch {
  enabled = true;
}

export const isSoundOn = () => enabled;

export const setSound = on => {
  enabled = on;
  try {
    localStorage.setItem('sound', on ? 'on' : 'off');
  } catch {
    /* storage unavailable */
  }
};

const context = () => {
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
};

export const petal = (pitch = 1) => {
  if (!enabled) return;
  try {
    context();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    const out = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2600;
    out.gain.setValueAtTime(0.0001, now);
    out.gain.exponentialRampToValueAtTime(0.14, now + 0.006);
    out.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    filter.connect(out);
    out.connect(ctx.destination);

    [
      [1, 'sine', 1],
      [2.01, 'triangle', 0.18]
    ].forEach(([mult, type, level]) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(1180 * pitch * mult, now);
      osc.frequency.exponentialRampToValueAtTime(640 * pitch * mult, now + 0.09);
      g.gain.value = level;
      osc.connect(g);
      g.connect(filter);
      osc.start(now);
      osc.stop(now + 0.25);
    });
  } catch {
    /* audio blocked */
  }
};

/* ---------- braam ---------- */
const BRAAM_GAIN = 0.55;
let braamBuffer = null;
let lastBraam = -1e9;
let waiting = null;

const braamReady = () => {
  if (!braamBuffer) {
    try {
      braamBuffer = renderSound(BRAAM, {}, { sampleRate: context().sampleRate });
    } catch {
      braamBuffer = Promise.reject();
    }
    braamBuffer.catch(() => {
      braamBuffer = null;
    });
  }
  return braamBuffer;
};

const fire = () => {
  const now = performance.now();
  if (now - lastBraam < 2600) return;
  lastBraam = now;
  braamReady()
    .then(buffer => {
      if (!enabled || ctx.state !== 'running') return;
      const src = ctx.createBufferSource();
      const g = ctx.createGain();
      src.buffer = buffer;
      g.gain.value = BRAAM_GAIN;
      src.connect(g);
      g.connect(ctx.destination);
      src.start();
    })
    .catch(() => {});
};

/* Plays only when the browser lets the page make sound right now, so a hit never
   arrives late. Returns false when it could not play. */
export const braam = () => {
  if (!enabled) return true;
  try {
    context();
    if (ctx.state !== 'running') return false;
    fire();
    return true;
  } catch {
    return false;
  }
};

/* First visit: browsers keep a page silent until the visitor touches it. Play right
   away when allowed; otherwise play on the first click, tap or key press, as long as
   the landing screen is still what they are looking at. */
export const braamOnArrival = stillOnLanding => {
  try {
    braamReady();
  } catch {
    /* audio unavailable */
  }
  if (braam()) return () => {};
  const events = ['pointerdown', 'keydown', 'touchend'];
  const stop = () => events.forEach(e => window.removeEventListener(e, waiting, true));
  waiting = () => {
    stop();
    try {
      context();
      const go = () => stillOnLanding() && braam();
      if (ctx.state === 'running') go();
      else ctx.resume().then(go, () => {});
    } catch {
      /* audio unavailable */
    }
  };
  events.forEach(e => window.addEventListener(e, waiting, true));
  return stop;
};
