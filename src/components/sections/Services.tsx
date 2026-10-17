import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, FadeIn, LineDraw, RevealText } from '../ui';
import { disciplines, techStack } from '../../data';

export function Services() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="py-24 sm:py-40 bg-[var(--bg-soft)] rounded-t-[2rem] sm:rounded-t-[3rem]">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 sm:mb-24">
          <div className="md:col-span-8">
            <FadeIn><p className="label mb-6">{t('services-label')}</p></FadeIn>
            <h2 className="display-xxl">
              <RevealText text={t('services-title-a')} className="block" />
              <RevealText text={t('services-title-b')} className="block serif !font-normal pl-[10vw]" delay={0.1} />
            </h2>
          </div>
          <FadeIn delay={0.2} className="md:col-span-4 flex items-end">
            <p className="text-[var(--muted)] leading-relaxed max-w-sm">{t('services-intro')}</p>
          </FadeIn>
        </div>

        <div>
          {disciplines.map((d, i) => {
            const isOpen = open === i;
            return (
              <div key={d.key} onMouseEnter={() => setOpen(i)}>
                <LineDraw delay={i * 0.08} />
                <button
                  onClick={() => setOpen(i)}
                  aria-expanded={isOpen}
                  className="w-full grid grid-cols-12 gap-4 items-baseline py-7 sm:py-10 text-left"
                >
                  <span className="col-span-2 sm:col-span-1 label">{d.number}</span>
                  <span className={`col-span-9 sm:col-span-10 text-[clamp(1.8rem,5.5vw,5rem)] font-medium tracking-[-0.045em] leading-[0.95] transition-colors duration-500 ${isOpen ? '' : 'text-[var(--muted)]'}`}>
                    {t(`${d.key}-title`)}
                  </span>
                  <motion.span
                    className="col-span-1 justify-self-end text-2xl font-light"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-4 pb-10">
                        <p className="col-span-12 sm:col-start-2 sm:col-span-6 text-lg leading-relaxed text-[var(--muted)]">
                          {t(`${d.key}-desc`)}
                        </p>
                        <div className="col-span-12 sm:col-span-5 flex flex-wrap content-start gap-2 sm:justify-end">
                          {d.tags.map((tag, j) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, ease: EASE, delay: 0.1 + j * 0.04 }}
                              className="px-3 py-1.5 rounded-full border hairline text-sm"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <LineDraw />
        </div>
      </div>

      <Stack />
    </section>
  );
}

function Stack() {
  const { t } = useTranslation();
  const half = Math.ceil(techStack.length / 2);
  const rows = [techStack.slice(0, half), techStack.slice(half)];

  return (
    <div className="mt-24 sm:mt-40">
      <div className="container-x mb-8"><FadeIn><p className="label">{t('stack-label')}</p></FadeIn></div>
      <div className="space-y-3 marquee-pause [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden">
            <div className={`marquee ${r === 1 ? 'reverse' : ''}`} style={{ ['--marquee-speed' as string]: '45s' }}>
              {[...row, ...row, ...row, ...row].map((name, i) => (
                <span
                  key={i}
                  className="shrink-0 mr-3 px-6 py-3 rounded-full border hairline text-lg sm:text-2xl tracking-tight hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-300"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
