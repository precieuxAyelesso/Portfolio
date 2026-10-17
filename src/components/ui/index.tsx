import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';
import {
  motion, useInView, useMotionValue, useScroll, useSpring, useTransform, animate,
  type MotionValue,
} from 'framer-motion';
import type { Project } from '../../types';

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Arrow ─── */
export function Arrow({ className = '', diagonal = false }: { className?: string; diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`${className} ${diagonal ? '-rotate-45' : ''}`} aria-hidden>
      <path d="M4 12h16M14 6l6 6-6 6" strokeLinecap="square" />
    </svg>
  );
}

/* ─── RevealText: words rise from a mask when scrolled into view ─── */
export function RevealText({ text, as: Tag = 'span', className = '', delay = 0, stagger = 0.04, once = true }: {
  text: string; as?: ElementType; className?: string; delay?: number; stagger?: number; once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });
  const words = text.split(' ');
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="mask">
          <motion.span
            className="inline-block"
            initial={{ y: '150%' }}
            animate={inView ? { y: '0%' } : { y: '150%' }}
            transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
          >
            {w}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ─── FadeIn ─── */
export function FadeIn({ children, className = '', delay = 0, y = 30 }: {
  children: ReactNode; className?: string; delay?: number; y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── LineDraw: hairline that grows horizontally ─── */
export function LineDraw({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`h-px bg-[var(--line)] origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}

/* ─── ScrollWords: each word lights up as the paragraph scrolls by ─── */
function ScrollWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">{word}</motion.span>;
}

export function ScrollWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <ScrollWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

/* ─── Magnetic: element drifts toward the pointer ─── */
export function Magnetic({ children, strength = 0.35, className = '' }: {
  children: ReactNode; strength?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 15, mass: 0.3 });
  const y = useSpring(0, { stiffness: 180, damping: 15, mass: 0.3 });
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={reset} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  );
}

/* ─── Counter ─── */
export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, to, { duration: 2, ease: EASE, onUpdate: v => setVal(Math.round(v)) });
    return () => ctrl.stop();
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Cursor: dot that swells over interactive elements ─── */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState('');
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('has-cursor');
    let last = { x: -100, y: -100 };
    const probe = () => {
      const target = document.elementFromPoint(last.x, last.y) as HTMLElement | null;
      const el = target?.closest<HTMLElement>('a, button, [data-cursor], input, select, textarea');
      setHover(!!el);
      setLabel(el?.dataset.cursor ?? '');
    };
    const move = (e: MouseEvent) => {
      last = { x: e.clientX, y: e.clientY };
      x.set(e.clientX); y.set(e.clientY);
      probe();
    };
    // Content moves under a still pointer while scrolling
    const scroll = () => requestAnimationFrame(probe);
    window.addEventListener('scroll', scroll, { passive: true });
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mousedown', d);
    window.addEventListener('mouseup', u);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('mousedown', d);
      window.removeEventListener('mouseup', u);
    };
  }, [x, y]);

  const size = label ? 96 : hover ? 44 : 10;
  return (
    <motion.div
      className={`fixed top-0 left-0 z-[100] pointer-events-none rounded-full flex items-center justify-center ${label ? '' : 'mix-blend-difference'}`}
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%', background: label ? 'var(--accent)' : '#fff' }}
      animate={{ width: size, height: size, scale: down ? 0.8 : 1 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {label && (
        <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className="label !text-[0.65rem] !text-black !tracking-[0.1em]">
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}

/* ─── ProjectCover: screenshot, or a typographic cover if none yet ─── */
export function ProjectCover({ project, className = '' }: { project: Project; className?: string }) {
  if (project.image) {
    return <img src={project.image} alt={project.title} loading="lazy" className={`w-full h-full object-cover object-top ${className}`} />;
  }
  return (
    <div className={`relative w-full h-full overflow-hidden flex items-center justify-center p-[6%] ${className}`} style={{ background: '#101011' }}>
      <div className="absolute -top-1/4 -right-1/4 w-[80%] aspect-square rounded-full blur-[80px] opacity-60" style={{ background: project.tint }} />
      <div className="absolute bottom-[-30%] left-[-10%] w-[60%] aspect-square rounded-full blur-[90px] opacity-25" style={{ background: project.tint }} />
      <span className="relative serif text-white/90 text-center leading-[0.9] text-[clamp(2.5rem,7vw,6rem)]">{project.title}</span>
    </div>
  );
}
