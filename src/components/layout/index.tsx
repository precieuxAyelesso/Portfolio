import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme, useScrollSpy } from '../../hooks';
import { socials } from '../../data';

const navIds = ['hero', 'about', 'skills', 'tech', 'project', 'services', 'faq', 'contact'];
const navKeys = ['nav-home', 'nav-about', 'nav-skills', 'nav-tech', 'nav-project', 'nav-services', 'nav-faq', 'nav-cta'];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggle: toggleTheme } = useTheme();
  const active = useScrollSpy(navIds);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => {
    const next = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  return (
    <>
      <header className={`sticky top-0 z-50 glass-nav transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/10' : ''}`}>
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-1.5 font-[family-name:var(--font-display)] text-base font-bold text-white hover:text-cyan-400 transition-colors shrink-0">
            <span className="text-cyan-400 font-mono text-lg">&gt;</span>
            <span>Précieux</span>
            <span className="text-cyan-400">_</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navIds.map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                  ${active === id
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {t(navKeys[i])}
              </a>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button onClick={toggleLang} className="w-8 h-8 rounded-lg bg-white/5 text-xs font-mono font-bold text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center justify-center" aria-label="Toggle language">
              {i18n.language === 'fr' ? 'EN' : 'FR'}
            </button>
            <button onClick={toggleTheme} className="w-8 h-8 rounded-lg bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center justify-center" aria-label="Toggle theme">
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-sm`} />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-8 h-8 rounded-lg bg-white/5 text-slate-400 hover:text-cyan-400 transition-all flex items-center justify-center" aria-label="Menu">
              <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-sm`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
          <nav className="absolute top-16 left-0 right-0 p-4 flex flex-col gap-1 glass mx-4 rounded-2xl" onClick={e => e.stopPropagation()}>
            {navIds.map((id, i) => (
              <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${active === id ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                {t(navKeys[i])}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      try {
        const fmt = new Intl.DateTimeFormat([], { timeZone: 'Africa/Porto-Novo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        setTime(`Porto-Novo, BJ — ${fmt.format(new Date())} (UTC+1)`);
      } catch {
        setTime('Porto-Novo, BJ — UTC+1');
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-slate-800/40 py-12 mt-8">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 font-[family-name:var(--font-display)] font-bold text-white">
              <span className="text-cyan-400 font-mono text-lg">&gt;</span>Précieux<span className="text-cyan-400">_</span>
            </div>
            <p className="text-xs font-mono text-slate-400 leading-relaxed">{t('footer-desc')}</p>
            <p className="text-xs font-mono text-slate-500">{time}</p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t('footer-section-nav')}</h4>
            <div className="grid grid-cols-2 gap-2">
              {navIds.map((id, i) => (
                <a key={id} href={`#${id}`} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">{t(navKeys[i])}</a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t('footer-section-contact')}</h4>
            <p className="text-xs font-mono text-slate-400 mb-4">{t('footer-social-desc')}</p>
            <div className="flex gap-2">
              {socials.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-cyan-500 hover:scale-110 transition-all duration-300" aria-label={s.label}>
                  <i className={`${s.icon} text-sm text-white`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/40 pt-6 text-center">
          <p className="text-xs font-mono text-slate-500">{t('footer-copy')}</p>
        </div>
      </div>
    </footer>
  );
}
