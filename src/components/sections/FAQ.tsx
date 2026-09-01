import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection, SectionHeader } from '../ui';
import { faqItems } from '../../data';

export function FAQ() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <AnimatedSection id="faq" className="py-16 sm:py-24 section-divider">
      <div className="max-w-3xl mx-auto px-5">
        <SectionHeader label="faq-label" title="faq-title" />

        <div className="space-y-2">
          {faqItems.map((item, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left text-sm font-semibold font-[family-name:var(--font-display)] text-white hover:text-cyan-400 transition-colors"
              >
                <span>{t(item.questionKey)}</span>
                <span className={`w-7 h-7 rounded-full border border-slate-700 bg-slate-800/50 flex items-center justify-center text-slate-400 text-xs shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>
                  <i className="fa-solid fa-plus" />
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="px-5 pb-4 text-xs font-mono text-slate-400 leading-relaxed">
                  {t(item.answerKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
