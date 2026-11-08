import { useEffect, useRef } from 'react';
import { PROJECTS } from '../projects';

/* ---------- Full-screen viewer ---------- */
export const Viewer = ({ state, onClose, onStep }) => {
  const closeRef = useRef(null);
  const project = PROJECTS[state.project];
  const screen = project.screens[state.screen];

  useEffect(() => {
    const last = document.activeElement;
    closeRef.current?.focus();
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      last?.focus?.();
    };
  }, [onClose, onStep]);

  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label={`${project.name} ekranları`}>
      <header className="viewer-top">
        <p>
          <strong>{project.name}</strong>
          <span className="mono">
            {' '}
            · {screen.label} · {state.screen + 1}/{project.screens.length}
          </span>
        </p>
        <button className="icon-btn icon-btn-light" ref={closeRef} onClick={onClose} aria-label="Kapat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>
      <div
        className={`viewer-stage ${project.kind !== 'phone' && screen.h / screen.w > 1.05 ? 'viewer-stage-tall' : ''}`}
        key={`${state.project}-${state.screen}`}
      >
        <img
          className={project.kind === 'phone' ? 'viewer-phone' : screen.h / screen.w > 1.05 ? 'viewer-tall' : 'viewer-web'}
          src={screen.src}
          alt={`${project.name} — ${screen.label}`}
        />
      </div>
      <footer className="viewer-bottom">
        <button className="icon-btn icon-btn-light" onClick={() => onStep(-1)} aria-label="Önceki ekran">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
        </button>
        <span className="mono viewer-hint">← → ile gez · Esc ile kapat</span>
        <button className="icon-btn icon-btn-light" onClick={() => onStep(1)} aria-label="Sonraki ekran">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </footer>
    </div>
  );
};

