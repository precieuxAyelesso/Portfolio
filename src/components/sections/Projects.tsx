import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { Arrow, EASE, FadeIn, LineDraw, ProjectCover, RevealText } from '../ui';
import { projects } from '../../data';
import { useIsFinePointer } from '../../hooks';
import type { Project } from '../../types';

const isLive = (p: Project) => p.url.startsWith('http');
const pad = (n: number) => String(n).padStart(2, '0');

/* ─── Featured: sticky cards that stack and recede ─── */
function FeaturedCard({ project, index, total, progress }: {
  project: Project; index: number; total: number; progress: MotionValue<number>;
}) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.35, 1]);
  const targetScale = 1 - (total - index - 1) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const live = isLive(project);
  const Wrapper = live ? motion.a : motion.div;

  return (
    <div ref={ref} className="h-[100svh] sticky top-0 flex items-center justify-center">
      <Wrapper
        {...(live ? { href: project.url, target: '_blank', rel: 'noopener noreferrer', 'data-cursor': t('work-visit') } : { 'data-cursor': t('work-soon') })}
        style={{ scale, top: `calc(-4vh + ${index * 28}px)` }}
        className="group relative block w-full h-[78svh] max-h-[820px] origin-top rounded-md overflow-hidden bg-[var(--bg-soft)] border hairline"
      >
        <motion.div style={{ scale: imgScale }} className="absolute inset-0">
          <div className="w-full h-full transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
            <ProjectCover project={project} />
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />

        <div className="absolute inset-x-0 top-0 p-5 sm:p-8 flex justify-between text-white/80 label !text-white/80">
          <span>({pad(index + 1)}) — {t('work-featured')}</span>
          <span>{t(`${project.key}-cat`)}</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 text-white grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <h3 className="md:col-span-7 text-[clamp(2.4rem,7vw,6.5rem)] font-medium tracking-[-0.05em] leading-[0.9]">
            {project.title}
          </h3>
          <div className="md:col-span-5 md:justify-self-end max-w-md space-y-4">
            <p className="text-white/75 leading-relaxed">{t(`${project.key}-desc`)}</p>
            <div className="flex flex-wrap items-center gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full border border-white/25 text-xs">{tag}</span>
              ))}
              <span className={`ml-auto flex items-center gap-2 text-sm rounded-full px-4 py-2 ${live ? 'bg-white text-black' : 'border border-white/30'}`}>
                {live ? t('work-visit') : t('work-soon')}
                {live && <Arrow diagonal className="w-4 h-4 transition-transform duration-500 group-hover:rotate-0" />}
              </span>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

function Featured() {
  const featured = projects.filter(p => p.featured);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <div ref={ref} className="container-x">
      {featured.map((p, i) => (
        <FeaturedCard key={p.id} project={p} index={i} total={featured.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

/* ─── Index list with cursor-following preview ─── */
function ProjectIndex() {
  const { t } = useTranslation();
  const fine = useIsFinePointer();
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };

  return (
    <div className="container-x mt-24 sm:mt-40" onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
      <FadeIn className="flex justify-between items-end mb-8">
        <p className="label">{t('work-index')}</p>
        <p className="label">({pad(projects.length)})</p>
      </FadeIn>

      <ul>
        {projects.map((p, i) => {
          const live = isLive(p);
          const Row = live ? 'a' : 'div';
          return (
            <li key={p.id} onMouseEnter={() => setActive(i)}>
              <LineDraw delay={i * 0.05} />
              <Row
                {...(live ? { href: p.url, target: '_blank', rel: 'noopener noreferrer', 'data-cursor': t('work-view') } : { 'data-cursor': t('work-soon') })}
                className={`group grid grid-cols-12 items-center gap-4 py-6 sm:py-8 transition-opacity duration-500 ${active !== null && active !== i ? 'sm:opacity-30' : ''}`}
              >
                <span className="col-span-2 sm:col-span-1 label tabular-nums">{pad(i + 1)}</span>
                <div className="col-span-7 sm:col-span-5 flex items-center gap-4">
                  <div className="sm:hidden w-14 h-14 shrink-0 overflow-hidden rounded-sm"><ProjectCover project={p} /></div>
                  <h3 className="text-[clamp(1.4rem,3.6vw,3.2rem)] font-medium tracking-[-0.04em] leading-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:group-hover:translate-x-4">
                    {p.title}
                  </h3>
                </div>
                <span className="hidden sm:block sm:col-span-2 text-[var(--muted)] text-sm">{t(`${p.key}-cat`)}</span>
                <span className="hidden md:block md:col-span-3 text-[var(--muted)] text-sm truncate">{p.tags.join(' · ')}</span>
                <span className="col-span-3 sm:col-span-4 md:col-span-1 flex justify-end">
                  {live
                    ? <Arrow diagonal className="w-6 h-6 transition-transform duration-500 group-hover:rotate-0" />
                    : <span className="label !text-[var(--accent)] whitespace-nowrap">{t('work-soon')}</span>}
                </span>
              </Row>
            </li>
          );
        })}
        <li aria-hidden><LineDraw /></li>
      </ul>

      {/* Floating preview */}
      {fine && (
        <motion.div
          className="fixed top-0 left-0 z-30 pointer-events-none w-[340px] aspect-[4/3] overflow-hidden rounded-sm"
          style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
          initial={false}
          animate={{ scale: active !== null ? 1 : 0, opacity: active !== null ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <AnimatePresence initial={false}>
            {active !== null && (
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                exit={{ clipPath: 'inset(0 0 100% 0)' }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              >
                <ProjectCover project={projects[active]} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export function Projects() {
  const { t } = useTranslation();
  return (
    <section id="work" className="pt-16 sm:pt-24 pb-24 sm:pb-40">
      <div className="container-x mb-10 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <FadeIn><p className="label mb-6">{t('work-label')}</p></FadeIn>
          <h2 className="display-xxl">
            <RevealText text={t('work-title-a')} className="block" />
            <RevealText text={t('work-title-b')} className="block serif !font-normal pl-[10vw]" delay={0.1} />
          </h2>
        </div>
        <FadeIn delay={0.3}>
          <p className="text-[clamp(3rem,8vw,7rem)] font-medium tracking-[-0.05em] leading-none text-[var(--muted)] tabular-nums">
            ({pad(projects.length)})
          </p>
        </FadeIn>
      </div>
      <Featured />
      <ProjectIndex />
    </section>
  );
}
