import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '../ui';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative py-20 sm:py-28 overflow-hidden section-divider">
      {/* Subtle glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-sm font-mono text-cyan-400 mb-4 tracking-wide">{t('hero-greeting')}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] text-white leading-[1.1] mb-6">
              {t('hero-title-expert')}{' '}
              <span className="text-cyan-400">{t('hero-title-fields')}</span>
            </h1>
            <p className="text-slate-400 text-lg font-mono mb-2">{t('hero-desc')}</p>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('hero-specialization') }} />

            <div className="flex flex-wrap gap-3 mb-10">
              <Button href="#services">
                <i className="fa-solid fa-server text-xs" />
                {t('hero-btn-services')}
              </Button>
              <Button href="#contact" variant="secondary">
                {t('hero-btn-contact')}
                <i className="fa-solid fa-arrow-right text-xs" />
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {[{ val: '10+', key: 'hero-stat1' }, { val: '50+', key: 'hero-stat2' }, { val: '3', key: 'hero-stat3' }].map(s => (
                <div key={s.key}>
                  <div className="text-2xl font-bold font-[family-name:var(--font-display)] text-white">{s.val}</div>
                  <div className="text-xs font-mono text-slate-500">{t(s.key)}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Terminal */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <div className="terminal shadow-2xl shadow-black/30">
              <div className="terminal-bar">
                <div className="terminal-dot bg-red-500/80" />
                <div className="terminal-dot bg-yellow-500/80" />
                <div className="terminal-dot bg-green-500/80" />
                <span className="ml-2 text-[10px] text-slate-500 font-mono">précieux@portfolio</span>
              </div>
              <div className="terminal-body space-y-1">
                <div><span className="t-prompt">$</span> <span className="t-cmd">whoami</span></div>
                <div><span className="t-highlight">{t('term-whoami-highlight')}</span> {t('term-whoami-output1')}</div>
                <div className="text-slate-500">{t('term-whoami-output2')} <span className="text-cyan-400">{t('term-whoami-output2-val')}</span></div>
                <div className="text-slate-500">{t('term-whoami-output3')} <span className="text-emerald-400">{t('term-whoami-output3-val')}</span></div>
                <div className="h-3" />
                <div><span className="t-prompt">$</span> <span className="t-cmd">skills --list</span></div>
                <div>{t('term-skills-output1')}</div>
                <div>{t('term-skills-output2')}</div>
                <div>{t('term-skills-output3')}</div>
                <div>{t('term-skills-output4')}</div>
                <div className="h-3" />
                <div><span className="t-prompt">$</span> <span className="t-cmd">echo "ready"</span></div>
                <div><span className="t-highlight">✓</span> <span className="text-slate-300">Ready to solve your IT problems.</span></div>
                <div className="h-2" />
                <div className="flex items-center gap-1"><span className="t-prompt">$</span> <span className="animate-pulse text-cyan-400">▌</span></div>
              </div>
            </div>

            {/* Profile picture */}
            <div className="mt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/40">
                <img src="/profil_1.jpg" alt="Précieux AYELESSO" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Précieux AYELESSO</p>
                <p className="text-xs font-mono text-slate-500">Porto-Novo, Bénin</p>
              </div>
              <span className="ml-auto px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
                {t('term-whoami-output3-val')}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
