import { useEffect, useRef } from 'react';
import Starfield from '../components/Starfield';
import { PROJECTS } from '../projects';
import { REDUCED } from '../ui';

/* ---------- Devices ---------- */
/* Shown inside a device until the real screenshots arrive. */
export const SoonScreen = ({ name, web }) => (
  <div className={`soon ${web ? 'soon-web' : ''}`} role="img" aria-label={`${name} — ekran görüntüsü yakında`}>
    <span className="soon-grid" aria-hidden="true" />
    <strong>{name}</strong>
    <span className="mono">ekranlar yakında</span>
  </div>
);

export const IPhone = ({ src, label, className = '', style, soon, bg, top, sar }) => (
  <figure
    className={`iphone ${className}`}
    style={{ ...style, ...(bg ? { '--bg': bg, '--bgt': top || bg } : {}), ...(sar ? { '--sar': sar } : {}) }}
  >
    <div className="iphone-screen">
      {src && <img className="screen-fill" src={src} alt="" aria-hidden="true" draggable="false" />}
      {src ? <img className="screen-shot" src={src} alt={label} draggable="false" /> : <SoonScreen name={soon} />}
      <span className="island" aria-hidden="true" />
    </div>
  </figure>
);

export const Laptop = ({ src, label, url, soon, ar = 1.6 }) => (
  <figure className="laptop" style={{ '--ar': Math.max(1.6, Math.min(1.9, ar)) }}>
    <div className="laptop-lid">
      <div className="laptop-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>{url}</em>
      </div>
      {src ? <img src={src} alt={label} draggable="false" /> : <SoonScreen name={soon} web />}
    </div>
    <div className="laptop-base" aria-hidden="true" />
  </figure>
);

/* ---------- One project as a poster ---------- */
const Poster = ({ project, index, onCase, layerRef }) => {
  const ref = useRef(null);
  const setRef = el => {
    ref.current = el;
    layerRef(el);
  };

  const onMove = e => {
    if (REDUCED) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    ref.current.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onLeave = () => {
    ref.current.style.setProperty('--mx', 0);
    ref.current.style.setProperty('--my', 0);
  };

  const { layout, coverShots: screens } = project;

  return (
    <article
      ref={setRef}
      className={`poster poster-${layout} ${project.theme.dark ? 'dark' : 'light'} in`}
      data-pid={project.id}
      data-index={index}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ '--accent': project.accent, '--glow': project.glow, '--pbg': project.theme.bg }}
    >
      <div className="poster-glow" aria-hidden="true" />

      <ul className="pills mono">
        <li>({String(index + 1).padStart(2, '0')})</li>
        {project.pills.map(p => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <aside className="info" aria-label={`${project.name} künyesi`}>
        <p className="mono info-meta">{project.info.meta}</p>
        <h3 className="info-title">{project.name}</h3>
        {project.info.role && <p className="mono info-role">rol → {project.info.role}</p>}
        <p className="info-desc">{project.info.desc}</p>
        <ul className="info-tools">
          {project.info.tools.map(t => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <button className="info-cta mono" onClick={() => onCase(index)}>
          projeyi incele <span aria-hidden="true">→</span>
        </button>
      </aside>

      <header className="poster-head">
        <p className="poster-h" aria-hidden="true">
          <span className="metal">{project.line1}</span>
          <span className="accent">{project.line2}</span>
        </p>
      </header>

      <div className="scene">
        <button className="scene-hit" onClick={() => onCase(index)} aria-label={`${project.name} projesini incele`} />
        {project.kind === 'phone' ? (
          <div className="rig">
            {screens.map((s, i) => (
              <IPhone
                key={s.label}
                src={s.src}
                bg={s.bg} top={s.top} sar={s.w / s.h}
                soon={project.name}
                label={`${project.name} — ${s.label}`}
                className={`ph ph-${i}`}
              />
            ))}
          </div>
        ) : (
          <div className="rig">
            <Laptop
              ar={screens[0] ? screens[0].w / screens[0].h : 1.6}
              src={screens[0]?.src}
              soon={project.name}
              label={`${project.name} — ${screens[0]?.label || ''}`}
              url={project.url}
            />
          </div>
        )}
      </div>

    </article>
  );
};

/* ---------- Projects travel through space ---------- */
export const N = PROJECTS.length;

// Where each project flies off to once it has been passed.
const EXITS = [
  { x: -1, y: 0.25, r: 1 },
  { x: 1, y: -0.2, r: -1 },
  { x: 0, y: -1, r: 0 }
];

const clamp01 = v => Math.min(1, Math.max(0, v));

// colour helpers: the whole space slowly turns into each app's colours
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const mix = (a, b, t) => {
  const A = hex(a);
  const B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`;
};
const lum = c => {
  const [r, g, b] = hex(c);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};
const smooth = t => t * t * (3 - 2 * t);

// header colours follow the project on screen
const rgbOf = (a, b, t) => {
  const A = hex(a);
  const B = hex(b);
  return A.map((v, i) => Math.round(v + (B[i] - v) * t));
};
const relLum = rgb => {
  const [r, g, b] = rgb.map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const INK = [17, 17, 17];
const themeHeader = (on, rgb) => {
  const root = document.documentElement;
  root.classList.toggle('nav-themed', on);
  if (!on) return;
  const L = relLum(rgb);
  // text on the accent: whichever of ink / white reads better
  const onInk = (L + 0.05) / (relLum(INK) + 0.05);
  const onWhite = 1.05 / (L + 0.05);
  // accent as text on the black pill: lifted toward white until it reads
  let hi = rgb;
  for (let k = 0; k < 6 && (relLum(hi) + 0.05) / (relLum(INK) + 0.05) < 5; k++) hi = hi.map(v => Math.round(v + (255 - v) * 0.2));
  root.style.setProperty('--nav-acc', `rgb(${rgb.join(',')})`);
  root.style.setProperty('--nav-on', onInk >= onWhite ? '#111111' : '#ffffff');
  root.style.setProperty('--nav-hi', `rgb(${hi.join(',')})`);
};

export const Space = ({ onCase, onActive, sectionRef }) => {
  const layers = useRef([]);
  const stage = useRef(null);
  const starColor = useRef('#ffffff');
  const speed = useRef(0);
  const counter = useRef(null);

  useEffect(() => {
    const sec = sectionRef.current;
    let raf = 0;
    let lastP = -1;
    let lastT = performance.now();
    let calm = 0;
    let active = -2;

    const place = () => {
      raf = 0;
      const vh = window.innerHeight;
      const r = sec.getBoundingClientRect();
      const p = Math.min(N - 1, Math.max(0, -r.top / vh));
      const now = performance.now();
      if (lastP >= 0) {
        const v = (p - lastP) / Math.max(0.008, (now - lastT) / 1000);
        speed.current = Math.max(-1, Math.min(1, v * 0.45));
      }
      lastP = p;
      lastT = now;
      clearTimeout(calm);
      calm = setTimeout(() => {
        speed.current = 0;
      }, 140);

      // blend the space between the two nearest apps
      const i0 = Math.floor(p);
      const i1 = Math.min(N - 1, i0 + 1);
      const t = smooth(clamp01((p - i0 - 0.15) / 0.7));
      const A = PROJECTS[i0];
      const B = PROJECTS[i1];
      const st = stage.current;
      if (st) {
        // light ↔ dark: pass through deep space instead of a muddy grey
        const SPACE = '#07070b';
        const far = Math.abs(lum(A.theme.bg) - lum(B.theme.bg)) > 0.35;
        let bgc;
        let L;
        if (far && t < 0.5) {
          bgc = mix(A.theme.bg, SPACE, smooth(t * 2));
          L = lum(A.theme.bg) * (1 - smooth(t * 2)) + lum(SPACE) * smooth(t * 2);
        } else if (far) {
          bgc = mix(SPACE, B.theme.bg, smooth((t - 0.5) * 2));
          L = lum(SPACE) * (1 - smooth((t - 0.5) * 2)) + lum(B.theme.bg) * smooth((t - 0.5) * 2);
        } else {
          bgc = mix(A.theme.bg, B.theme.bg, t);
          L = lum(A.theme.bg) * (1 - t) + lum(B.theme.bg) * t;
        }
        st.style.setProperty('--sbg', bgc);
        st.style.setProperty('--sacc', mix(A.accent, B.accent, t));
        st.style.setProperty('--slight', L.toFixed(3));
        starColor.current = L > 0.5 ? 'rgba(30,30,40,0.55)' : '#ffffff';
      }

      layers.current.forEach((el, i) => {
        if (!el) return;
        const d = i - p;
        const a = Math.abs(d);
        let transform;
        let opacity;
        if (REDUCED) {
          transform = 'none';
          opacity = clamp01(1 - a * 2);
        } else if (d >= 0) {
          // waiting in the distance
          transform = `translate3d(0, ${-d * 6}vh, ${-d * 1800}px) rotateX(${d * 10}deg)`;
          opacity = clamp01((0.85 - d) / 0.85);
        } else {
          // flying past the camera, off to its own side
          const e = EXITS[i % EXITS.length];
          transform = `translate3d(${e.x * a * 75}vw, ${e.y * a * 70}vh, ${a * 700}px) rotateY(${e.x * a * -28}deg) rotateZ(${e.r * a * 8}deg)`;
          opacity = clamp01(1 - a * 2.6);
        }
        el.style.transform = transform;
        el.style.opacity = opacity.toFixed(3);
        el.style.visibility = opacity < 0.01 ? 'hidden' : 'visible';
        el.style.zIndex = d < 0 ? 3 : a < 0.5 ? 2 : 1;
        el.style.setProperty('--d', d.toFixed(3));
        const live = a < 0.5;
        el.style.pointerEvents = live ? 'auto' : 'none';
        el.inert = !live;
      });

      themeHeader(r.top < vh * 0.5 && r.bottom > vh * 0.5, rgbOf(A.accent, B.accent, t));
      const inView = r.top <= 1 && r.bottom >= vh - 1;
      const next = inView ? Math.round(p) : -1;
      if (next !== active) {
        active = next;
        onActive(next);
      }
      if (counter.current) counter.current.style.setProperty('--prog', (p / (N - 1)).toFixed(4));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };
    place();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(calm);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.documentElement.classList.remove('nav-themed');
    };
  }, [onActive, sectionRef]);

  return (
    <section className="space" id="isler" ref={sectionRef} style={{ height: `${N * 100}svh` }} aria-label="Projeler">
      {PROJECTS.map((p, i) => (
        <span key={p.id} id={p.id} className="snap" style={{ top: `${i * 100}svh` }} aria-hidden="true" />
      ))}
      <div className="space-stage" ref={stage}>
        <div className="space-nebula" aria-hidden="true" />
        <Starfield speedRef={speed} colorRef={starColor} />
        <div className="grain" aria-hidden="true" />
        <div className="space-cam">
          {PROJECTS.map((p, i) => (
            <Poster key={p.id} project={p} index={i} onCase={onCase} layerRef={el => (layers.current[i] = el)} />
          ))}
        </div>
        <div className="space-track" ref={counter} aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
};

