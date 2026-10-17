import { useTranslation } from 'react-i18next';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { Counter, FadeIn, LineDraw, ScrollWords } from '../ui';
import { projects } from '../../data';

/* ─── Big scrolling band that skews with scroll velocity ─── */
export function Marquee() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  const skew = useTransform(velocity, [-2000, 2000], [8, -8], { clamp: true });
  const items = ['marquee-1', 'marquee-2', 'marquee-3', 'marquee-4', 'marquee-5'];
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map(k => (
        <span key={k} className="flex items-center">
          <span className="px-[2vw] text-[clamp(3rem,9vw,8rem)] font-medium tracking-[-0.05em] leading-none">{t(k)}</span>
          <span className="serif text-[clamp(2.5rem,7vw,6rem)] text-[var(--accent)] leading-none">✳</span>
        </span>
      ))}
    </div>
  );
  return (
    <section aria-hidden className="py-14 sm:py-24 overflow-hidden border-y hairline">
      <motion.div style={{ skewX: skew }}>
        <div className="marquee" style={{ ['--marquee-speed' as string]: '35s' }}>
          {row}{row}
        </div>
      </motion.div>
    </section>
  );
}

export function About() {
  const { t } = useTranslation();
  const stats = [
    { to: projects.length, suffix: '', key: 'about-stat1' },
    { to: 50, suffix: '+', key: 'about-stat2' },
    { to: 15, suffix: '+', key: 'about-stat3' },
  ];

  return (
    <section id="about" className="py-24 sm:py-40">
      <div className="container-x grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <FadeIn><p className="label md:sticky md:top-28">{t('about-label')}</p></FadeIn>
        </div>
        <div className="md:col-span-9">
          <ScrollWords
            text={t('about-statement')}
            className="text-[clamp(1.6rem,3.6vw,3.3rem)] leading-[1.12] tracking-[-0.03em] font-medium"
          />

          <div className="mt-20 sm:mt-28 grid grid-cols-3 gap-4 sm:gap-10">
            {stats.map((s, i) => (
              <div key={s.key}>
                <LineDraw delay={i * 0.12} />
                <FadeIn delay={0.2 + i * 0.12}>
                  <p className="mt-5 text-[clamp(2.5rem,7vw,6rem)] font-medium tracking-[-0.05em] leading-none tabular-nums">
                    <Counter to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="label mt-3">{t(s.key)}</p>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
