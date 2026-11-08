import { useCallback, useEffect, useRef, useState } from 'react';
import TechText from './components/TechText';
import Antigravity from './components/Antigravity';
import { Space } from './sections/Space';
import { CaseStudy } from './sections/CaseStudy';
import { Viewer } from './sections/Viewer';
import { About, Contact, Journey, Stack } from './sections/Lower';
import { braam, braamOnArrival, isSoundOn, petal, setSound } from './sound';
import { PROJECTS } from './projects';
import { SITE } from './site';
import { Arrow, Close, REDUCED, SoundIcon, pad2 } from './ui';
import { attachSnap, measurePage } from './snap';

const AG_COLORS = ['#363427', '#9c958f', '#28222d'];
const ALL_SCREENS = PROJECTS.flatMap((p, pi) => p.screens.map((s, si) => ({ ...s, p, pi, si })));
const byId = id => PROJECTS.findIndex(p => p.id === id);
const CASE_PREFIX = 'proje-';

const NAV = [
  { href: '#hakkimda', label: 'hakkımda' },
  { href: '#isler', label: 'işler' },
  { href: '#yol', label: 'yol' },
  { href: '#iletisim', label: 'iletişim' }
];

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export default function App() {
  const [sound, setSoundState] = useState(isSoundOn());
  const [viewer, setViewer] = useState(null);
  const [caseIdx, setCaseIdx] = useState(null);
  const [active, setActive] = useState(-1);
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState('');
  const spaceRef = useRef(null);
  const menuBtn = useRef(null);

  /* soft tap on every click */
  useEffect(() => {
    const onClick = e => {
      if (e.target.closest('a, button')) petal();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  /* braam: on arrival, and every time the landing screen comes back into view
     (scrolling to the top, the logo, or returning from a case study) */
  const caseOpen = useRef(false);
  caseOpen.current = caseIdx !== null;
  useEffect(() => {
    const onLanding = () => window.scrollY < window.innerHeight * 0.35;
    const opensOnCase = location.hash.slice(1).startsWith(CASE_PREFIX);
    const stop = opensOnCase ? () => {} : braamOnArrival(() => onLanding() && !caseOpen.current);
    let wasTop = onLanding();
    const onScroll = () => {
      const top = onLanding();
      if (top && !wasTop && !caseOpen.current) braam();
      wasTop = top;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      stop();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* stop at every section, in the direction you scroll */
  const snapRef = useRef(null);
  useEffect(() => {
    snapRef.current = attachSnap(window, measurePage);
    return () => snapRef.current?.destroy();
  }, []);
  useEffect(() => {
    snapRef.current?.pause(caseIdx !== null || menu);
  }, [caseIdx, menu]);

  /* reveal on scroll */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* case studies have their own address (#proje-sparkzone). The address is read once
     when the page opens; after that the page itself decides what is shown, so a host
     page that rewrites the hash can never swap one project for another. */
  useEffect(() => {
    const h = decodeURIComponent(location.hash.slice(1));
    if (h.startsWith(CASE_PREFIX)) {
      const i = byId(h.slice(CASE_PREFIX.length));
      if (i >= 0) setCaseIdx(i);
    }
  }, []);

  const setHash = h => {
    try {
      history.replaceState(null, '', h ? `#${h}` : location.pathname + location.search);
    } catch {
      /* sandboxed frame */
    }
  };

  const openCase = useCallback(i => {
    setCaseIdx(i);
    setHash(CASE_PREFIX + PROJECTS[i].id);
  }, []);
  const closeCase = useCallback(() => {
    setCaseIdx(null);
    braam();
    setHash('');
  }, []);
  const nextCase = useCallback(() => {
    setCaseIdx(i => {
      const n = (i + 1) % PROJECTS.length;
      setHash(CASE_PREFIX + PROJECTS[n].id);
      return n;
    });
  }, []);

  const open = useCallback((project, screen) => setViewer({ project, screen }), []);
  const close = useCallback(() => setViewer(null), []);
  const step = useCallback(dir => {
    setViewer(v => {
      if (!v) return v;
      const flat = ALL_SCREENS.findIndex(s => s.pi === v.project && s.si === v.screen);
      const next = ALL_SCREENS[(flat + dir + ALL_SCREENS.length) % ALL_SCREENS.length];
      petal(dir > 0 ? 1.08 : 0.92);
      return { project: next.pi, screen: next.si };
    });
  }, []);

  const goTo = (e, i) => {
    e.preventDefault();
    const sec = spaceRef.current;
    if (!sec) return;
    window.scrollTo({ top: sec.offsetTop + i * window.innerHeight, behavior: REDUCED ? 'auto' : 'smooth' });
  };

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    setSoundState(next);
    if (next) petal(1.2);
  };

  /* mobile menu */
  useEffect(() => {
    if (!menu) return undefined;
    const onKey = e => {
      if (e.key === 'Escape') setMenu(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      menuBtn.current?.focus();
    };
  }, [menu]);

  const say = msg => {
    setToast(msg);
    clearTimeout(say.t);
    say.t = setTimeout(() => setToast(''), 2200);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      say('E-posta adresi kopyalandı');
      petal(1.25);
    } catch {
      say(`Kopyalanamadı — adres: ${SITE.email}`);
    }
  };


  return (
    <>
      <a className="skip" href="#isler">
        İçeriğe geç
      </a>

      <header className="nav">
        <a className="logo" href="#top" aria-label={`${SITE.name}, başa dön`}>
          {SITE.short}
        </a>
        <nav className="nav-links mono" aria-label="Ana menü">
          {NAV.slice(0, 3).map(n => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <button className="icon-btn" onClick={toggleSound} aria-label={sound ? 'Sesi kapat' : 'Sesi aç'} title={sound ? 'Sesi kapat' : 'Sesi aç'}>
            <SoundIcon on={sound} />
          </button>
          <a className="btn btn-lime" href="#iletisim">
            iletişim
          </a>
          <button className="icon-btn menu-btn" ref={menuBtn} onClick={() => setMenu(true)} aria-label="Menüyü aç" aria-expanded={menu}>
            <MenuIcon />
          </button>
        </nav>
      </header>

      {menu && (
        <div className="menu" role="dialog" aria-modal="true" aria-label="Menü">
          <div className="menu-top">
            <span className="logo logo-static">{SITE.short}</span>
            <button className="icon-btn icon-btn-light" onClick={() => setMenu(false)} aria-label="Menüyü kapat" autoFocus>
              <Close />
            </button>
          </div>
          <nav className="menu-links" aria-label="Bölümler">
            {NAV.map((n, i) => (
              <a key={n.href} href={n.href} onClick={() => setMenu(false)} style={{ '--i': i }}>
                <span className="mono">{pad2(i + 1)}</span>
                {n.label}
              </a>
            ))}
          </nav>
          <p className="mono menu-foot">{SITE.role}</p>
        </div>
      )}

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className="hero" aria-label="Giriş">
          <Antigravity colors={AG_COLORS} count={420} particleSize={0.4} particleVariance={0.3} ringRadius={5.5} />
          <div className="hero-top">
            <p className="mono hero-kicker">
              {SITE.role} · {SITE.sub}
            </p>
            <p className="mono hero-kicker">{SITE.location}</p>
          </div>
          <h1 className="hero-name">
            <span className="sr-only">{SITE.name}</span>
            <TechText
              text={SITE.name}
              fontFamily="'Mona Sans', sans-serif"
              fontWeight={800}
              fontSize={240}
              letterSpacing={-0.055}
              color="#111110"
              accentColor="#ff6b3d"
              reveal="letter"
              intro="type"
              introDuration={1.6}
              specks={10}
            />
          </h1>
          <div className="hero-bottom">
            <p className="hero-lede">{SITE.lede}</p>
            <div className="hero-actions">
              <span className="mono hero-scroll" aria-hidden="true">
                kaydır ↓
              </span>
              <a className="btn btn-ink" href="#isler">
                İşleri gör <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* ---------- About, then projects ---------- */}
        <About />
        <Space onCase={openCase} onActive={setActive} sectionRef={spaceRef} />
        <Stack />
        <Journey onCase={openCase} />
        <Contact onCopy={copyEmail} />
      </main>

      <footer className="footer mono">
        <span>
          © {SITE.year} {SITE.name}
        </span>
        <span>tasarım ve kod — {SITE.short}</span>
        <a href="#top">başa dön ↑</a>
      </footer>

      <nav className={`dock ${active >= 0 && caseIdx === null ? 'show' : ''}`} aria-label="Projeler">
        <button className="dock-arrow" onClick={e => goTo(e, Math.max(0, active - 1))} aria-label="Önceki proje" disabled={active <= 0}>
          ‹
        </button>
        <ol className="dock-dots">
          {PROJECTS.map((p, i) => (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                className={active === i ? 'on' : ''}
                style={{ '--accent': p.accent }}
                onClick={e => goTo(e, i)}
                aria-label={p.name}
                aria-current={active === i ? 'true' : undefined}
                title={p.name}
              />
            </li>
          ))}
        </ol>
        <span className="dock-name" style={{ '--accent': PROJECTS[Math.max(0, active)].accent }}>
          <span className="mono">{pad2(Math.max(0, active) + 1)}</span>
          {PROJECTS[Math.max(0, active)].name}
        </span>
        <button
          className="dock-arrow"
          onClick={e => goTo(e, Math.min(PROJECTS.length - 1, active + 1))}
          aria-label="Sonraki proje"
          disabled={active >= PROJECTS.length - 1}
        >
          ›
        </button>
      </nav>

      {caseIdx !== null && <CaseStudy index={caseIdx} onClose={closeCase} onNext={nextCase} onZoom={open} viewerOpen={!!viewer} />}
      {viewer && <Viewer state={viewer} onClose={close} onStep={step} />}

      <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
