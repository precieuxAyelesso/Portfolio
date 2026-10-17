import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useTheme, scrollToTarget, setScrollLocked } from '../../hooks';
import { socials, EMAIL } from '../../data';
import { Arrow, EASE, Magnetic } from '../ui';

const links = [
  { id: '#work', key: 'nav-work' },
  { id: '#about', key: 'nav-about' },
  { id: '#services', key: 'nav-services' },
  { id: '#contact', key: 'nav-contact' },
];

function go(e: React.MouseEvent, target: string | number) {
  e.preventDefault();
  scrollToTarget(target);
}

/* ─── Preloader ─── */
export function Preloader({ onDone }: { onDone: () => void }) {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    setScrollLocked(true);
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setExit(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => { setScrollLocked(false); onDone(); }}>
      {!exit && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[95] bg-[var(--bg-soft)] flex flex-col justify-between container-x py-6 sm:py-10"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between label">
            <span>Précieux Ayelesso</span>
            <span>{t('loader-text')}</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div className="mask-block">
              <motion.p
                initial={{ y: '150%' }} animate={{ y: '0%' }} transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                className="serif text-[clamp(2rem,6vw,5rem)] leading-none"
              >
                Développeur & Réseaux
              </motion.p>
            </div>
            <span className="font-medium tabular-nums leading-[0.8] tracking-[-0.06em] text-[clamp(5rem,20vw,16rem)]">
              {count}
            </span>
          </div>
          <motion.div className="absolute left-0 bottom-0 h-[3px] bg-[var(--accent)]" style={{ width: `${count}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Navbar ─── */
export function Navbar({ ready }: { ready: boolean }) {
  const { t, i18n } = useTranslation();
  const { theme, toggle: toggleTheme } = useTheme();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', v => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 200);
  });

  useEffect(() => { setScrollLocked(open); }, [open]);

  const toggleLang = () => {
    const next = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(next);
    document.documentElement.lang = next;
    try { localStorage.setItem('lang', next); } catch { /* storage unavailable */ }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50"
        initial={{ y: '-100%' }}
        animate={{ y: ready && (!hidden || open) ? '0%' : '-100%' }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="container-x py-5 flex items-center justify-between gap-6 text-sm">
          <a href="#top" onClick={e => go(e, 0)} className="group font-medium tracking-tight w-fit">
            <span className="roll"><span>Précieux Ayelesso©</span><span>Précieux Ayelesso©</span></span>
          </a>

          <div className="flex items-center justify-end gap-5">
            <nav className="hidden md:flex items-center gap-6">
              {links.map(l => (
                <a key={l.id} href={l.id} onClick={e => go(e, l.id)} className="link-u whitespace-nowrap">{t(l.key)}</a>
              ))}
            </nav>
            <button onClick={toggleLang} className="label !text-[var(--fg)] hover:opacity-60 transition-opacity" aria-label="Toggle language">
              {i18n.language === 'fr' ? 'EN' : 'FR'}
            </button>
            <button onClick={toggleTheme} aria-label="Toggle theme" className="w-4 h-4 rounded-full border border-[var(--fg)] overflow-hidden relative">
              <motion.span
                className="absolute inset-0 bg-[var(--fg)]"
                animate={{ x: theme === 'dark' ? '50%' : '-50%' }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </button>
            <button onClick={() => setOpen(o => !o)} className="md:hidden font-medium" aria-expanded={open}>
              {open ? t('nav-close') : t('nav-menu')}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--bg-soft)] md:hidden flex flex-col justify-between container-x pt-28 pb-8"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-1">
              {links.map((l, i) => (
                <div key={l.id} className="mask-block">
                  <motion.a
                    href={l.id}
                    onClick={e => { setOpen(false); go(e, l.id); }}
                    className="block text-[13vw] leading-[1.05] font-medium tracking-[-0.04em]"
                    initial={{ y: '150%' }} animate={{ y: '0%' }} exit={{ y: '150%' }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.07 }}
                  >
                    {t(l.key)}
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="space-y-4">
              <a href={`mailto:${EMAIL}`} className="block text-lg">{EMAIL}</a>
              <div className="flex flex-wrap gap-x-5 gap-y-2 label !text-[var(--fg)]">
                {socials.map(s => <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Footer ─── */
export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative overflow-hidden pt-10">
      <div className="container-x">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-t hairline text-sm">
          <div className="space-y-2">
            <p className="label">Email</p>
            <a href={`mailto:${EMAIL}`} className="link-u">{EMAIL}</a>
          </div>
          <div className="space-y-2">
            <p className="label">{t('footer-socials')}</p>
            <div className="flex flex-col gap-1">
              {socials.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="link-u w-fit">{s.name}</a>
              ))}
            </div>
          </div>
          <div className="flex sm:justify-end items-start">
            <Magnetic>
              <button
                onClick={() => scrollToTarget(0)}
                className="group flex items-center gap-2 border hairline rounded-full px-4 py-2 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-500"
              >
                {t('footer-top')}
                <Arrow className="w-4 h-4 -rotate-90" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="container-x">
        <motion.p
          className="font-semibold tracking-[-0.07em] leading-[0.78] text-[19.5vw] whitespace-nowrap select-none pb-[0.04em]"
          initial={{ y: '40%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          Ayelesso<span className="text-[var(--accent)]">.</span>
        </motion.p>
      </div>
      <div className="container-x pt-6 pb-6 label">
        <span>{t('footer-copy')}</span>
      </div>
    </footer>
  );
}
