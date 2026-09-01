import { useTranslation } from 'react-i18next';
import { AnimatedSection, SectionHeader, GlassCard } from '../ui';
import { skills, techStack } from '../../data';

export function Skills() {
  const { t } = useTranslation();

  return (
    <AnimatedSection id="skills" className="py-16 sm:py-24 section-divider">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader label="skills-label" title="skills-title" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s, i) => (
            <GlassCard key={i}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                  <i className={`${s.icon} text-cyan-400`} />
                </div>
                <div>
                  <h3 className="font-semibold text-white font-[family-name:var(--font-display)]">{t(s.titleKey)}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">{t(s.descKey)}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-[11px] font-semibold bg-slate-800/80 border border-slate-700/60 text-slate-300 rounded">
                    {tag.startsWith('skills-') ? t(tag) : tag}
                  </span>
                ))}
                {s.accentTags?.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-[11px] font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function TechStack() {
  const { t } = useTranslation();
  const doubled = [...techStack, ...techStack];

  return (
    <AnimatedSection id="tech" className="py-16 sm:py-24 section-divider">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader label="tech-label" title="tech-title" />
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {doubled.map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2.5 border border-slate-800/60 bg-slate-800/30 rounded-lg text-xs font-mono text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-all whitespace-nowrap shrink-0">
                <i className={item.icon} />
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
