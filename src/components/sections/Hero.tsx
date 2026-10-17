import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Arrow, EASE, Magnetic } from '../ui';
import { scrollToTarget } from '../../hooks';

function Line({ children, delay, ready, className = '' }: {
  children: React.ReactNode; delay: number; ready: boolean; className?: string;
}) {
  return (
    <span className="mask-block">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '150%', rotate: 3 }}
        animate={ready ? { y: '0%', rotate: 0 } : undefined}
        transition={{ duration: 1.3, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yImg = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] flex flex-col pt-28 pb-8 overflow-hidden">
      <div className="container-x flex-1 flex flex-col">
        <motion.div
          className="flex justify-between label"
          initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ duration: 1, delay: 0.1 }}
        >
          <span>{t('hero-kicker')}</span>
          <span className="hidden sm:inline">(01)</span>
        </motion.div>

        <div className="relative flex-1 flex flex-col justify-center sm:flex-row sm:items-center">
          <motion.h1 style={{ y: yText, opacity: fade }} className="display-xl relative z-10 py-10">
            <Line ready={ready} delay={0.15}>{t('hero-line1')}</Line>
            <Line ready={ready} delay={0.25} className="serif !font-normal !tracking-[-0.03em] pl-[8vw]">
              {t('hero-line2')}
            </Line>
            <Line ready={ready} delay={0.35}>{t('hero-line3')}</Line>
            <Line ready={ready} delay={0.45}>
              {t('hero-line4')}
              <motion.span
                className="inline-block w-[0.22em] h-[0.22em] rounded-full bg-[var(--accent)] ml-[0.08em] align-baseline"
                initial={{ scale: 0 }} animate={ready ? { scale: 1 } : undefined}
                transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 1.2 }}
              />
            </Line>
          </motion.h1>

          {/* Portrait */}
          <motion.div
            style={{ y: yImg }}
            className="order-first self-end mt-8 w-[38vw] sm:order-none sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 sm:w-[24vw] max-w-[380px] aspect-[3/4] overflow-hidden rounded-sm"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={ready ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
          >
            <motion.img
              src="/profil_1.jpg" alt="Précieux Ayelesso"
              style={{ scale: scaleImg }}
              className="w-full h-full object-cover grayscale-[0.25]"
            />
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end border-t hairline pt-6"
          initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
        >
          <p className="max-w-sm text-[var(--muted)] leading-relaxed">{t('hero-intro')}</p>

          <div className="hidden md:flex justify-center items-center gap-3 label">
            <span className="relative w-px h-10 bg-[var(--line)] overflow-hidden">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-[var(--fg)]"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
            {t('hero-scroll')}
          </div>

          <div className="flex md:justify-end">
            <Magnetic strength={0.4}>
              <a
                href="#work"
                onClick={e => { e.preventDefault(); scrollToTarget('#work'); }}
                className="group relative flex items-center gap-3 rounded-full bg-[var(--fg)] text-[var(--bg)] pl-6 pr-2 py-2 overflow-hidden"
              >
                <span className="relative z-10 roll font-medium"><span>{t('hero-cta')}</span><span>{t('hero-cta')}</span></span>
                <span className="relative z-10 w-10 h-10 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center transition-transform duration-500 group-hover:rotate-90">
                  <Arrow className="w-4 h-4 rotate-90" />
                </span>
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
