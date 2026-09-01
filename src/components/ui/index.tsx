import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

/* ─── AnimatedSection ─── */
export function AnimatedSection({ children, className = '', id, delay = 0 }: {
  children: ReactNode; className?: string; id?: string; delay?: number;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

/* ─── SectionHeader ─── */
export function SectionHeader({ label, title, subtitle, center = true }: {
  label: string; title: string; subtitle?: string; center?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div className={center ? 'text-center mb-12' : 'mb-10'}>
      <span className="inline-block text-xs font-mono font-semibold tracking-[0.2em] uppercase text-cyan-400 mb-3 opacity-80">
        {t(label)}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-white tracking-tight">
        {t(title)}
      </h2>
      {subtitle && (
        <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm font-mono leading-relaxed">
          {t(subtitle)}
        </p>
      )}
    </div>
  );
}

/* ─── GlassCard ─── */
export function GlassCard({ children, className = '', hover = true }: {
  children: ReactNode; className?: string; hover?: boolean;
}) {
  return (
    <div className={`glass rounded-2xl p-5 ${hover ? 'transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/5' : ''} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Button ─── */
export function Button({ children, href, variant = 'primary', className = '', onClick }: {
  children: ReactNode; href?: string; variant?: 'primary' | 'secondary'; className?: string; onClick?: () => void;
}) {
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300';
  const styles = variant === 'primary'
    ? `${base} bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 btn-shine`
    : `${base} border border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400`;

  if (href) {
    return <a href={href} className={`${styles} ${className}`}>{children}</a>;
  }
  return <button onClick={onClick} className={`${styles} ${className}`}>{children}</button>;
}

/* ─── Toast ─── */
export function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl glass text-sm font-mono text-cyan-400 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      {message}
    </div>
  );
}

export { AuraBackground } from './AuraBackground';

