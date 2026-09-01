import { useTranslation } from 'react-i18next';
import { AnimatedSection } from '../ui';
import { services } from '../../data';

export function Services() {
  const { t } = useTranslation();

  return (
    <AnimatedSection id="services" className="py-16 sm:py-24 section-divider">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left sticky */}
          <div className="md:col-span-4 md:sticky md:top-24 space-y-4">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-cyan-400 opacity-80">
              {t('services-label')}
            </span>
            <h2 className="text-3xl font-bold font-[family-name:var(--font-display)] text-white leading-tight">
              {t('services-title')}
            </h2>
            <p className="text-sm font-mono text-slate-400 leading-relaxed">{t('services-intro')}</p>
            <div className="text-xs font-mono text-cyan-400 leading-loose">
              → Intervention rapide & efficace<br />
              → Tarifs étudiants abordables<br />
              → Diagnostic gratuit
            </div>
          </div>

          {/* Right list */}
          <div className="md:col-span-8 flex flex-col gap-2">
            {services.map(s => (
              <div key={s.number} className="glass rounded-xl px-5 py-4 flex items-start gap-4 transition-all duration-300 hover:border-cyan-500/40">
                <span className="font-mono text-xs text-cyan-500/60 pt-0.5 shrink-0">{s.number}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm font-[family-name:var(--font-display)] flex items-center gap-2">
                    <i className={`${s.icon} text-cyan-400 text-xs`} />
                    {t(s.titleKey)}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1 leading-relaxed">{t(s.descKey)}</p>
                </div>
                <span className="text-cyan-400 font-mono shrink-0 self-center text-sm">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
