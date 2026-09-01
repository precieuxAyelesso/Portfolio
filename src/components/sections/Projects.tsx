import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection, SectionHeader } from '../ui';
import { projects } from '../../data';

export function Projects() {
  const { t } = useTranslation();
  const total = projects.length;
  const [active, setActive] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setActive(Math.max(0, Math.min(total - 1, i)));
  }, [total]);

  const goNext = useCallback(() => {
    setActive(i => (i < total - 1 ? i + 1 : 0));
  }, [total]);

  const goPrev = useCallback(() => {
    setActive(i => (i > 0 ? i - 1 : total - 1));
  }, [total]);

  // Auto-play
  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(goNext, 5000);
  }, [goNext]);

  useEffect(() => {
    resetAutoPlay();
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [resetAutoPlay]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const vp = viewportRef.current;
      if (!vp) return;
      const rect = vp.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); resetAutoPlay(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); resetAutoPlay(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, resetAutoPlay]);

  // Touch swipe
  const touchStartX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.changedTouches[0].screenX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext(); else goPrev();
      resetAutoPlay();
    }
  };

  // Mouse drag
  const mouseStartX = useRef(0);
  const dragging = useRef(false);
  const onMouseDown = (e: React.MouseEvent) => { mouseStartX.current = e.clientX; dragging.current = true; };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    const diff = mouseStartX.current - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext(); else goPrev();
      resetAutoPlay();
    }
  };

  const getClass = (i: number) => {
    const diff = i - active;
    if (diff === 0) return 'active';
    if (diff === -1) return 'prev-1';
    if (diff === -2) return 'prev-2';
    if (diff <= -3) return 'prev-3';
    if (diff === 1) return 'next-1';
    if (diff === 2) return 'next-2';
    return 'next-3';
  };

  return (
    <AnimatedSection id="project" className="py-16 sm:py-24 section-divider">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader label="project-label" title="project-title" subtitle="project-subtitle" />

        {/* Coverflow viewport */}
        <div
          ref={viewportRef}
          className="coverflow-viewport"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseEnter={() => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); }}
          onMouseLeave={resetAutoPlay}
        >
          <div className="coverflow-track">
            {projects.map((p, i) => (
              <div
                key={p.id}
                className={`coverflow-card ${getClass(i)}`}
                onClick={() => { if (i !== active) { goTo(i); resetAutoPlay(); } }}
              >
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-inner block"
                  onClick={(e) => { if (i !== active) e.preventDefault(); }}
                >
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={t(p.altKey)}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Body */}
                  <div className="p-4">
                    <h3 className="font-semibold text-white text-sm font-[family-name:var(--font-display)] mb-1">
                      {t(p.titleKey)}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 leading-relaxed mb-3 line-clamp-2">
                      {t(p.descKey)}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-cyan-500/8 text-cyan-400 border border-cyan-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button onClick={() => { goPrev(); resetAutoPlay(); }}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all" aria-label="Previous">
            <i className="fa-solid fa-chevron-left text-sm" />
          </button>

          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button key={i}
                className={`coverflow-dot ${i === active ? 'active' : ''}`}
                onClick={() => { goTo(i); resetAutoPlay(); }}
                aria-label={`Project ${i + 1}`}
              />
            ))}
          </div>

          <button onClick={() => { goNext(); resetAutoPlay(); }}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all" aria-label="Next">
            <i className="fa-solid fa-chevron-right text-sm" />
          </button>
        </div>

        {/* Counter */}
        <div className="text-center mt-3">
          <span className="text-xs font-mono text-slate-500">
            {active + 1} / {total}
          </span>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a href="#contact"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition-all text-sm font-mono btn-shine">
            {t('project-cta')}
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
