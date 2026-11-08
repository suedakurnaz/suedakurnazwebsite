import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Starfield from '../components/Starfield';
import { PROJECTS } from '../projects';
import { petal } from '../sound';
import { Arrow, Back, REDUCED, pad2 } from '../ui';
import { IPhone, Laptop } from './Space';
import { attachSnap, measureCase } from '../snap';

const N = PROJECTS.length;

/* ---------- The annotated main screen ---------- */
const TourDevice = ({ project, feat }) => {
  const { shot, points } = project.hero;
  const f = points[feat];
  const box = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const phone = project.kind === 'phone';

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  // the screenshot is shown whole (contain, pinned to the top); points are % of the image
  // phones: the screenshot spans the full width and is centred vertically
  // (status-bar / home-indicator strips fill the rest); web: contain, pinned top
  const sc = w && h ? (phone ? w / shot.w : Math.min(w / shot.w, h / shot.h)) : 0;
  const iw = shot.w * sc;
  const ih = shot.h * sc;
  const ox = (w - iw) / 2;
  const oy = phone ? (h - ih) / 2 : 0;
  const at = p => [ox + (p.x / 100) * iw, oy + (p.y / 100) * ih];
  const [hx, hy] = at(f);
  const R = phone ? Math.max(70, Math.min(110, w * 0.32)) : Math.max(70, Math.min(110, w * 0.11));
  const Z = phone ? 2.4 : 2.6;
  let bx;
  let by;
  if (phone) {
    bx = w + 56;
    by = Math.min(Math.max(hy - R, -20), h - 2 * R + 20);
  } else {
    bx = hx < w / 2 ? hx + 70 : hx - 70 - 2 * R;
    by = hy < h / 2 ? hy + 50 : hy - 50 - 2 * R;
    bx = Math.min(Math.max(bx, 10), w - 2 * R - 10);
    by = Math.min(Math.max(by, 10), h - 2 * R - 10);
  }
  // phones and small screens hide the lens; instead the screen itself zooms in on the
  // active point (used only by the mobile CSS through --cam / --camz)
  const CZ = phone ? 1.7 : 2.1;
  const clampR = (v, lo, hi) => (lo > hi ? hi : Math.min(hi, Math.max(lo, v)));
  const camX = clampR(w / 2 - CZ * hx, w - CZ * (ox + iw), -CZ * ox);
  const camY = clampR(h / 2 - CZ * hy, h - CZ * (oy + ih), -CZ * oy);
  const cx = bx + R;
  const cy = by + R;
  const dist = Math.max(0, Math.hypot(cx - hx, cy - hy) - R);
  const ang = Math.atan2(cy - hy, cx - hx);

  return (
    <div className={`tdev ${phone ? 'tdev-phone' : 'tdev-web'}`} style={{ '--ar': shot.w / shot.h, '--sar': shot.w / shot.h, '--bg': shot.bg, '--bgt': shot.top }}>
      {!phone && (
        <div className="laptop-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <em>{project.url}</em>
        </div>
      )}
      <div className="tdev-screen" ref={box} style={{ '--hx': `${hx}px`, '--hy': `${hy}px` }}>
        <span className="tdev-cam" style={{ '--cam': `translate(${camX.toFixed(1)}px, ${camY.toFixed(1)}px) scale(${CZ})`, '--camz': CZ }}>
        <span className="tdev-clip">
          {phone && <img className="screen-fill" src={shot.src} alt="" aria-hidden="true" draggable="false" />}
          <img className="screen-shot" src={shot.src} alt={`${project.name} — ${shot.label}`} draggable="false" />
          <span className="spot" aria-hidden="true" />
        </span>
        {points.map((x, i) => (
          <span key={x.t} className={`hot ${i === feat ? 'on' : ''}`} style={{ left: at(x)[0], top: at(x)[1] }} aria-hidden="true">
            {i + 1}
          </span>
        ))}
        </span>
        {w > 0 && (
          <>
            <span className="leader" aria-hidden="true" style={{ left: hx, top: hy, width: dist, transform: `rotate(${ang}rad)` }} />
            <span className="lens" aria-hidden="true" style={{ left: bx, top: by, width: 2 * R, height: 2 * R }}>
              <img src={shot.src} alt="" style={{ width: iw * Z, height: ih * Z, left: R - (hx - ox) * Z, top: R - (hy - oy) * Z }} />
            </span>
          </>
        )}
      </div>
    </div>
  );
};

/* ---------- One flow: copy + a strip of screens ---------- */
const Chapter = ({ project, chapter, i, total, onZoom, index, setRef }) => {
  const strip = useRef(null);
  const phone = project.kind === 'phone';
  const nudge = dir => strip.current?.scrollBy({ left: dir * strip.current.clientWidth * 0.8, behavior: REDUCED ? 'auto' : 'smooth' });
  const many = chapter.shots.length > (phone ? 3 : 1);

  return (
    <section className="cs-chapter cs-snap" ref={setRef} data-chapter="akışlar">
      <div className="cs-chapter-copy">
        <p className="mono cs-chapter-no">
          akış {pad2(i + 1)} / {pad2(total)}
        </p>
        <h3>{chapter.t}</h3>
        <p className="cs-chapter-d">{chapter.d}</p>
        <p className="mono cs-chapter-count">{chapter.shots.length} ekran</p>
        {many && (
          <div className="cs-strip-nav">
            <button className="icon-btn icon-btn-light" onClick={() => nudge(-1)} aria-label="Önceki ekranlar">
              ‹
            </button>
            <button className="icon-btn icon-btn-light" onClick={() => nudge(1)} aria-label="Sonraki ekranlar">
              ›
            </button>
          </div>
        )}
      </div>
      <div
        className={`cs-strip ${phone ? 'cs-strip-phone' : 'cs-strip-web'} ${chapter.shots.length === 1 ? 'cs-strip-single' : ''}`}
        ref={strip}
      >
        {chapter.shots.map(s => {
          const tall = s.h / s.w > 1.05;
          return (
            <button
              key={s.label}
              className="cs-shot"
              onClick={() => onZoom(index, project.screens.indexOf(s))}
              aria-label={`${s.label} ekranını büyüt`}
            >
              {phone ? (
                <IPhone src={s.src} label={s.label} bg={s.bg} top={s.top} sar={s.w / s.h} />
              ) : (
                <span className={`win ${tall ? 'win-tall' : ''}`} style={{ '--ar': tall ? 0.8 : s.w / s.h }}>
                  <span className="win-bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <img src={s.src} alt={s.label} loading="lazy" draggable="false" />
                </span>
              )}
              <span className="mono cs-shot-label">
                {s.label} <span aria-hidden="true">⤢</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

/* ---------- Case study ---------- */
export const CaseStudy = ({ index, onClose, onNext, onZoom, viewerOpen }) => {
  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % N];
  const F = project.hero ? project.hero.points.length : 0;
  const scroller = useRef(null);
  const tour = useRef(null);
  const closeRef = useRef(null);
  const marks = useRef({});
  const speed = useRef(0);
  const [feat, setFeat] = useState(0);
  const [chapter, setChapter] = useState('kapak');
  const [leaving, setLeaving] = useState(false);

  const CHAPTERS = ['kapak', 'hikâye', ...(F ? ['ekranlar'] : []), 'akışlar', 'sıradaki'];
  const mark = name => el => {
    if (el) marks.current[name] = el;
  };

  useEffect(() => {
    const last = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      last?.focus?.();
    };
  }, []);

  useEffect(() => {
    if (viewerOpen) return undefined;
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, viewerOpen]);

  useEffect(() => {
    setFeat(0);
    setChapter('kapak');
    setLeaving(false);
  }, [index]);

  /* stop at every chapter / tour step */
  useEffect(() => {
    const sc = scroller.current;
    const snap = attachSnap(sc, measureCase(sc));
    return () => snap.destroy();
  }, [index]);

  /* which chapter is on screen */
  useEffect(() => {
    const sc = scroller.current;
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) setChapter(e.target.dataset.chapter);
        }),
      { root: sc, rootMargin: '-50% 0px -50% 0px' }
    );
    sc.querySelectorAll('[data-chapter]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [index]);

  /* scroll drives the tour and the stars */
  useEffect(() => {
    const sc = scroller.current;
    let raf = 0;
    let lastY = sc.scrollTop;
    let lastT = performance.now();
    let calm = 0;
    const tick = () => {
      raf = 0;
      const now = performance.now();
      const v = (sc.scrollTop - lastY) / Math.max(8, now - lastT);
      lastY = sc.scrollTop;
      lastT = now;
      speed.current = Math.max(-1, Math.min(1, v * 0.35));
      clearTimeout(calm);
      calm = setTimeout(() => (speed.current = 0), 120);
      const t = tour.current;
      if (t && F) {
        const p = Math.min(F - 1, Math.max(0, (sc.scrollTop - t.offsetTop) / sc.clientHeight));
        setFeat(Math.round(p));
      }
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    sc.addEventListener('scroll', on, { passive: true });
    tick();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(calm);
      sc.removeEventListener('scroll', on);
    };
  }, [F, index]);

  const prevFeat = useRef(0);
  useEffect(() => {
    if (feat !== prevFeat.current) petal(1 + feat * 0.03);
    prevFeat.current = feat;
  }, [feat]);

  const go = top => scroller.current.scrollTo({ top, behavior: REDUCED ? 'auto' : 'smooth' });
  const jumpFeat = i => go(tour.current.offsetTop + i * scroller.current.clientHeight);
  const jumpChapter = name => {
    const el = scroller.current?.querySelector(`[data-chapter="${name}"]`);
    if (el) go(el.offsetTop);
  };

  const goNext = useCallback(() => {
    if (REDUCED) return onNext();
    setLeaving(true);
    speed.current = 1;
    setTimeout(onNext, 650);
  }, [onNext]);

  const f = F ? project.hero.points[feat] : null;

  return (
    <div
      className={`cs ${project.theme.dark ? 'dark' : 'light'} ${leaving ? 'cs-leaving' : ''}`}
      data-pid={project.id}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} vaka çalışması`}
      style={{ '--accent': project.accent, '--glow': project.glow, '--pbg': project.theme.bg }}
    >
      <Starfield speedRef={speed} count={460} />
      <div className="cs-nebula" aria-hidden="true" key={`neb-${project.id}`} />

      <header className="cs-bar">
        <button className="btn btn-glass btn-sm" onClick={onClose} ref={closeRef}>
          <Back /> Uzaya dön
        </button>
        <nav className="cs-chapters mono" aria-label="Bölümler">
          {CHAPTERS.map(c => (
            <button key={c} className={c === chapter ? 'on' : ''} onClick={() => jumpChapter(c)} aria-current={c === chapter ? 'step' : undefined}>
              <i />
              <span>{c}</span>
            </button>
          ))}
        </nav>
        <p className="mono cs-count">
          {pad2(index + 1)} / {pad2(N)}
        </p>
      </header>

      <div className="cs-scroll" ref={scroller} key={project.id}>
        {/* cover */}
        <section className="cs-cover cs-snap" ref={mark('kapak')} data-chapter="kapak">
          <ul className="pills-inline mono">
            {project.pills.map(p => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <h2 className="cs-title">
            <span className="metal">{project.name}</span>
          </h2>
          <p className="cs-tag accent">{project.tagline}</p>
          <div className={`cs-rig cs-rig-${project.kind}`}>
            {project.kind === 'phone' ? (
              project.coverShots.map((s, i) => <IPhone key={s.label} src={s.src} bg={s.bg} top={s.top} sar={s.w / s.h} label={`${project.name} — ${s.label}`} className={`cph cph-${i}`} />)
            ) : (
              <Laptop ar={project.coverShots[0].w / project.coverShots[0].h} src={project.coverShots[0].src} label={`${project.name} — ${project.coverShots[0].label}`} url={project.url} />
            )}
          </div>
          <p className="mono cs-hint">
            {project.count} ekran · kaydır ↓
          </p>
        </section>

        {/* case-study cover artwork, when the project has one */}
        {project.poster && (
          <section className="cs-poster cs-snap" aria-label={`${project.name} — ${project.poster.label}`}>
            <figure>
              <img src={project.poster.src} alt={`${project.name} — ${project.poster.label}`} width={project.poster.w} height={project.poster.h} loading="lazy" />
            </figure>
          </section>
        )}

        {/* overview */}
        <section className="cs-overview cs-snap" ref={mark('hikâye')} data-chapter="hikâye">
          <div className="cs-ov">
            <p className="mono label label-light">hikâye</p>
            <p className="cs-ov-lead">{project.story[0]}</p>
            {project.story[1] && <p className="cs-ov-more">{project.story[1]}</p>}
            <ul className="cs-ov-stats">
              {project.stats.map(s => (
                <li key={s.u}>
                  <strong>{s.v}</strong>
                  <span>{s.u}</span>
                </li>
              ))}
            </ul>
            <dl className="cs-ov-facts">
              {project.specs.map(([k, v]) => (
                <div key={k}>
                  <dt className="mono">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* annotated main screen */}
        {F > 0 && (
          <section
            className="cs-tour"
            ref={el => {
              tour.current = el;
              mark('ekranlar')(el);
            }}
            data-chapter="ekranlar"
            style={{ height: `${F * 100}%` }}
          >
            {project.hero.points.map((x, i) => (
              <span key={x.t} className="cs-mark cs-snap" style={{ top: `${(i / F) * 100}%` }} aria-hidden="true" />
            ))}
            <div className={`cs-tour-stage cs-tour-${project.kind}`}>
              <div className="cs-tour-copy">
                <p className="mono label label-light">{project.hero.title}, adım adım</p>
                <p className="cs-tour-no" aria-hidden="true">
                  <span className="metal">{pad2(feat + 1)}</span>
                  <span className="mono">/ {pad2(F)}</span>
                </p>
                <div className="cs-tour-text" key={feat} aria-live="polite">
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </div>
                <ol className="cs-steps" aria-label="Özellikler">
                  {project.hero.points.map((x, i) => (
                    <li key={x.t}>
                      <button className={i === feat ? 'on' : i < feat ? 'done' : ''} onClick={() => jumpFeat(i)} aria-label={`${i + 1}. ${x.t}`}>
                        <span />
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="cs-tour-device">
                <TourDevice project={project} feat={feat} />
              </div>
            </div>
          </section>
        )}

        {/* flows */}
        {project.chapters.map((c, i) => (
          <Chapter
            key={c.t}
            project={project}
            chapter={c}
            i={i}
            total={project.chapters.length}
            index={index}
            onZoom={onZoom}
            setRef={i === 0 ? mark('akışlar') : undefined}
          />
        ))}

        {/* next */}
        <section className="cs-next cs-snap" ref={mark('sıradaki')} data-chapter="sıradaki" style={{ '--next': next.accent, '--nglow': next.glow }}>
          <div className="cs-next-glow" aria-hidden="true" />
          <p className="mono label label-light">sıradaki durak</p>
          <button className="cs-next-btn" onClick={goNext}>
            <span className="cs-next-name">{next.name}</span>
            <span className="cs-next-go">
              Işınlan <Arrow />
            </span>
          </button>
          <p className="cs-next-sub">{next.tagline}</p>
          <button className="btn btn-glass" onClick={onClose}>
            <Back /> Uzaya dön
          </button>
        </section>
      </div>
    </div>
  );
};
