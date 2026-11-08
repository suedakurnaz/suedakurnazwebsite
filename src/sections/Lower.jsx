import { useEffect, useRef, useState } from 'react';
import MicroSlats from '../components/MicroSlats';
import Starfield from '../components/Starfield';
import { PROJECTS } from '../projects';
import { ABOUT, JOURNEY, KIND_COLORS, SITE, STACK } from '../site';
import { Arrow, REDUCED, pad2 } from '../ui';

const byId = id => PROJECTS.findIndex(p => p.id === id);
const idle = { current: 0 };

/* run fn on every animation frame while the element is near the viewport */
const useScrollFrame = (ref, fn) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const tick = () => {
      raf = 0;
      fn(el.getBoundingClientRect(), window.innerHeight);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [ref, fn]);
};

/* ---------- About: calm and clear ---------- */
export const About = () => (
  <section className="about3" id="hakkimda" aria-labelledby="about3-title">
    <Starfield speedRef={idle} count={160} />
    <div className="wrap about3-inner">
      <div className="about3-top">
        <div className="about3-intro" data-reveal>
          <p className="mono label label-light">hakkımda</p>
          <h2 id="about3-title">
            <span className="metal">Merhaba,</span> <span className="accent">ben Sueda.</span>
          </h2>
          {ABOUT.bio.map(t => (
            <p key={t} className="about3-bio">
              {t}
            </p>
          ))}
        </div>
        <dl className="about3-facts" data-reveal>
          {ABOUT.facts.map(([k, v]) => (
            <div key={k}>
              <dt className="mono">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="about3-approach" data-reveal>
        <p className="mono label label-light">nasıl çalışırım</p>
        <ol>
          {ABOUT.approach.map((x, i) => (
            <li key={x.t}>
              <span className="mono">{pad2(i + 1)}</span>
              <h3>{x.t}</h3>
              <p>{x.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

/* ---------- Stack: four quiet columns ---------- */
export const Stack = () => {
  // the note that is open by tap (hover and keyboard focus are handled in CSS)
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (open === null) return undefined;
    const away = e => {
      if (!e.target.closest?.('.tool')) setOpen(null);
    };
    const esc = e => {
      if (e.key === 'Escape') setOpen(null);
    };
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc);
    window.addEventListener('scroll', away, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', away);
      document.removeEventListener('keydown', esc);
      window.removeEventListener('scroll', away);
    };
  }, [open]);

  return (
    <section className="stack3" id="araclar" aria-labelledby="stack3-title">
      <div className="wrap">
        <header className="stack3-head" data-reveal>
          <p className="mono label label-light">araç kutusu</p>
          <h2 id="stack3-title">
            <span className="metal">Kullandığım</span> <span className="accent">araçlar.</span>
          </h2>
        </header>
        <div className="stack3-grid">
          {STACK.map((g, i) => (
            <div className="stack3-col" key={g.group} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="mono stack3-group">
                <span>{pad2(i + 1)}</span> {g.group}
              </p>
              <ul>
                {g.items.map((x, j) => {
                  const id = `tool-${i}-${j}`;
                  const on = open === id;
                  return (
                    <li key={x.name} className={`tool ${on ? 'is-open' : ''}`}>
                      <button
                        type="button"
                        className="tool-name"
                        aria-describedby={`${id}-note`}
                        aria-expanded={on}
                        onClick={() => setOpen(on ? null : id)}
                      >
                        {x.name}
                      </button>
                      <span className="tool-note mono" id={`${id}-note`} role="tooltip">
                        {x.note}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <p className="mono stack3-hint" aria-hidden="true">
          <span className="hint-hover">ne için kullandığımı görmek için üzerine gel</span>
          <span className="hint-tap">ne için kullandığımı görmek için dokun</span>
        </p>
      </div>
    </section>
  );
};

/* ---------- Journey: a readable log, grouped by year ---------- */
const yearOf = when => (when.match(/\d{4}/) || ['sırada'])[0];
const KIND_ORDER = ['hackathon', 'yarışma', 'ödül', 'staj', 'topluluk', 'okul'];

export const Journey = ({ onCase }) => {
  const sec = useRef(null);
  const fill = useRef(null);

  // the line fills in and each stop lights up as it passes the reading line
  const frame = useRef((r, vh) => {
    const root = sec.current;
    const list = root?.querySelector('.jr-list');
    if (!list) return;
    const lr = list.getBoundingClientRect();
    const read = vh * 0.62;
    const f = Math.min(1, Math.max(0, (read - lr.top) / Math.max(1, lr.height)));
    if (fill.current) fill.current.style.transform = `scaleY(${f.toFixed(4)})`;
    root.querySelectorAll('.jr-item').forEach(el => {
      el.classList.toggle('lit', el.getBoundingClientRect().top < read);
    });
  }).current;
  useScrollFrame(sec, frame);

  // group stops by year, keep their order
  const groups = [];
  JOURNEY.forEach((j, i) => {
    const y = yearOf(j.when);
    const last = groups[groups.length - 1];
    if (last && last.year === y) last.items.push([j, i]);
    else groups.push({ year: y, items: [[j, i]] });
  });

  const counts = KIND_ORDER.map(k => [k, JOURNEY.filter(j => j.kind === k).length]).filter(([, n]) => n > 0);

  return (
    <section className="jr" id="yol" ref={sec} aria-labelledby="jr-title">
      <div className="jr-sky" aria-hidden="true">
        <Starfield speedRef={idle} count={160} />
      </div>
      <div className="wrap jr-grid">
        <header className="jr-side" data-reveal>
          <p className="mono label label-light">yol</p>
          <h2 id="jr-title">
            <span className="metal">Kısa ama</span> <span className="accent">yoğun bir yol.</span>
          </h2>
          <p className="jr-lede">2023’te Konya’da başladı; hackathonlar, topluluklar ve stajlarla hızlandı.</p>
          <ul className="jr-legend mono" aria-label="Durak türleri">
            {counts.map(([k, n]) => (
              <li key={k} style={{ '--k': KIND_COLORS[k] || '#f3f2ee' }}>
                <i aria-hidden="true" />
                {k}
                <b>{n}</b>
              </li>
            ))}
          </ul>
        </header>

        <div className="jr-list">
          <span className="jr-rail" aria-hidden="true">
            <span className="jr-fill" ref={fill} />
          </span>
          {groups.map(g => (
            <div className={`jr-group ${g.year === 'sırada' ? 'jr-group-next' : ''}`} key={g.year}>
              {g.year !== 'sırada' && (
                <p className="jr-year metal" aria-hidden="true">
                  {g.year}
                </p>
              )}
              <ol>
                {g.items.map(([j, i]) => {
                  const pi = j.project ? byId(j.project) : -1;
                  const proj = pi >= 0 ? PROJECTS[pi] : null;
                  const k = KIND_COLORS[j.kind] || '#f3f2ee';
                  const next = j.kind === 'sırada';
                  return (
                    <li className={`jr-item ${next ? 'jr-next' : ''}`} key={i} style={{ '--k': k, '--pacc': proj ? proj.accent : k }} data-reveal>
                      <span className="jr-dot" aria-hidden="true" />
                      <p className="mono jr-meta">
                        <time>{j.when}</time>
                        {!next && <span className="jr-kind">{j.kind}</span>}
                      </p>
                      <h3>{j.where}</h3>
                      <p className="jr-detail">{j.detail}</p>
                      <p className="jr-role">{j.role}</p>
                      {j.tags && (
                        <ul className="jr-tags mono">
                          {j.tags.map(t => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      )}
                      {proj && (
                        <button className="tl-project jr-project" onClick={() => onCase(pi)} style={{ '--accent': proj.accent }}>
                          <img src={proj.screens[0].src} alt="" loading="lazy" />
                          <span>
                            <span className="mono">projeyi incele</span>
                            <strong>{proj.name}</strong>
                          </span>
                          <Arrow />
                        </button>
                      )}
                      {next && (
                        <a className="btn btn-lime jr-cta" href="#iletisim">
                          Hadi konuşalım <Arrow />
                        </a>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Contact: landing on the planet ---------- */
const CopyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
);

export const Contact = ({ onCopy }) => {
  const links = SITE.links.filter(l => l.href);
  return (
    <section className="land" id="iletisim" aria-labelledby="land-title">
      <Starfield speedRef={idle} count={260} />
      <div className="land-surface" aria-hidden="true">
        <MicroSlats
          preset="swell"
          color="#3a2219"
          glintColor="#ff6b3d"
          backgroundColor="transparent"
          slatWidth={7}
          slatHeight={20}
          gap={3}
          cursorSize={60}
          perspective={0.85}
          fog={0.75}
        />
      </div>
      <div className="land-horizon" aria-hidden="true" />
      <div className="land-copy" data-reveal>
        <p className="mono land-status">
          <i /> yeni projelere açık
        </p>
        <h2 id="land-title">
          <span className="metal">Bir sonraki ürünü</span>
          <span className="accent">birlikte yayına taşıyalım.</span>
        </h2>
        <button className="email-xl" onClick={onCopy} aria-label={`E-posta adresini kopyala: ${SITE.email}`}>
          <span>{SITE.email}</span>
          <CopyIcon />
        </button>
        <div className="land-actions">
          <a className="btn btn-lime btn-lg" href={`mailto:${SITE.email}`}>
            E-posta gönder <Arrow />
          </a>
          {SITE.cv && (
            <a className="btn btn-glass btn-lg" href={SITE.cv} target="_blank" rel="noreferrer">
              CV <Arrow />
            </a>
          )}
        </div>
        {links.length > 0 && (
          <ul className="socials mono">
            {links.map(l => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
