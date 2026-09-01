import { useTranslation } from 'react-i18next';
import { AnimatedSection } from '../ui';

export function About() {
  const { t } = useTranslation();
  const points = ['about-li1', 'about-li2', 'about-li3', 'about-li4'];

  return (
    <AnimatedSection id="about" className="py-16 sm:py-24 section-divider">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">

          {/* Left: Profile image */}
          <div className="md:col-span-5">
            <div className="relative">
              {/* Decorative border glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-2xl blur-sm" />
              <div className="relative overflow-hidden rounded-2xl border border-slate-700/50">
                <img
                  src="/profil_1.jpg"
                  alt="AYELESSO Précieux"
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass text-xs font-mono text-cyan-400 border border-cyan-500/30 whitespace-nowrap">
                Porto-Novo, Bénin 🇧🇯
              </div>
            </div>
          </div>

          {/* Right: Text content */}
          <div className="md:col-span-7 space-y-6">
            {/* Header */}
            <div>
              <span className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-cyan-400 opacity-80">
                {t('about-label')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-white leading-tight mt-2">
                {t('about-title')}
              </h2>
            </div>

            {/* Paragraphs */}
            <p className="text-slate-400 text-sm font-mono leading-relaxed" dangerouslySetInnerHTML={{ __html: t('about-p1') }} />
            <p className="text-slate-400 text-sm font-mono leading-relaxed" dangerouslySetInnerHTML={{ __html: t('about-p2') }} />

            {/* Feature points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {points.map(key => (
                <div key={key} className="flex items-center gap-3 px-4 py-3 rounded-xl glass">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-check text-[10px] text-cyan-400" />
                  </span>
                  <span className="text-sm text-slate-300">{t(key)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AnimatedSection>
  );
}
