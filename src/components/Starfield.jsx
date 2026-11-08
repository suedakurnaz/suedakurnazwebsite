import { useEffect, useRef } from 'react';

/*
  Simple 3D starfield. `speedRef.current` is set from outside (scroll velocity),
  so stars stretch into streaks while travelling between projects.
*/
const Starfield = ({ speedRef, colorRef, count = 520 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    let w = 1;
    let h = 1;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let warp = 0;
    let last = performance.now();
    const stars = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),
      pz: 0,
      a: 0.35 + Math.random() * 0.65
    }));

    const resize = () => {
      w = canvas.clientWidth || 1;
      h = canvas.clientHeight || 1;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    const draw = dt => {
      const target = Math.min(1, Math.abs(speedRef.current || 0));
      warp += (target - warp) * (1 - Math.exp(-dt / 0.18));
      const v = (0.02 + warp * 1.4) * dt;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const f = Math.max(w, h) * 0.5;
      ctx.lineCap = 'round';
      for (const s of stars) {
        s.pz = s.z;
        s.z -= v;
        if (s.z <= 0.02) {
          s.x = (Math.random() - 0.5) * 2;
          s.y = (Math.random() - 0.5) * 2;
          s.z = 1;
          s.pz = 1;
        }
        const sx = cx + (s.x / s.z) * f;
        const sy = cy + (s.y / s.z) * f;
        const px = cx + (s.x / s.pz) * f;
        const py = cy + (s.y / s.pz) * f;
        const near = 1 - s.z;
        ctx.globalAlpha = s.a * (0.25 + 0.75 * near);
        ctx.strokeStyle = (colorRef && colorRef.current) || '#ffffff';
        ctx.lineWidth = 0.6 + near * 1.6;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx + 0.01, sy + 0.01);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = now => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      if (visible) raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && !reduced;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(canvas);
    resize();
    draw(0);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [speedRef, colorRef, count]);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
};

export default Starfield;
