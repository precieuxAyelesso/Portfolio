import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, FadeIn, LineDraw, RevealText } from '../ui';
import { faqItems } from '../../data';

export function FAQ() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 sm:py-40 bg-[var(--bg-soft)]">
      <div className="container-x grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <FadeIn><p className="label mb-6">{t('faq-label')}</p></FadeIn>
          <RevealText as="h2" text={t('faq-title')} className="display-lg block max-w-md md:sticky md:top-28" />
        </div>
        <div className="md:col-span-7">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.questionKey}>
                <LineDraw delay={i * 0.06} />
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group w-full flex items-start justify-between gap-6 py-6 text-left"
                >
                  <span className="text-lg sm:text-xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                    {t(item.questionKey)}
                  </span>
                  <span className="relative w-4 h-4 mt-1.5 shrink-0">
                    <span className="absolute top-1/2 left-0 w-full h-px bg-current" />
                    <motion.span
                      className="absolute top-1/2 left-0 w-full h-px bg-current"
                      animate={{ rotate: isOpen ? 0 : 90 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-10 text-[var(--muted)] leading-relaxed">{t(item.answerKey)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <LineDraw />
        </div>
      </div>
    </section>
  );
}
