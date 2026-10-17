import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Arrow, EASE, FadeIn, Magnetic, RevealText } from '../ui';
import { EMAIL, socials } from '../../data';

export function Contact() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<'success' | 'error' | null>(null);
  const [copied, setCopied] = useState(false);

  const flash = (kind: 'success' | 'error') => {
    setToast(kind);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || sending) return;
    setSending(true);
    try {
      await emailjs.sendForm('service_d0l3hnh', 'template_k0qb11r', formRef.current, 'g3JcFTt3gGIuFuYHk');
      formRef.current.reset();
      flash('success');
    } catch (err) {
      console.error('EmailJS error:', err);
      flash('error');
    }
    setSending(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const options = Array.from({ length: 7 }, (_, i) => `contact-form-select-opt${i + 1}`);

  return (
    <section id="contact" className="pt-24 sm:pt-40 pb-10">
      <div className="container-x">
        <FadeIn><p className="label mb-6">{t('contact-label')}</p></FadeIn>
        <h2 className="display-xxl">
          <RevealText text={t('contact-title-a')} className="block" />
          <span className="flex items-center gap-[3vw] pl-[10vw]">
            <RevealText text={t('contact-title-b')} className="block serif !font-normal" delay={0.1} />
            <motion.span
              className="hidden sm:block h-[0.08em] flex-1 bg-[var(--fg)] origin-left mt-[0.15em]"
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
            />
          </span>
        </h2>

        <div className="mt-20 sm:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-14">
          <FadeIn className="lg:col-span-5 space-y-10">
            <p className="text-lg leading-relaxed text-[var(--muted)] max-w-md">{t('contact-desc')}</p>
            <div>
              <a href={`mailto:${EMAIL}`} className="link-u text-[clamp(1.2rem,2.6vw,2rem)] font-medium tracking-tight break-all">
                {EMAIL}
              </a>
              <button onClick={copyEmail} className="block mt-3 label hover:!text-[var(--fg)] transition-colors">
                {copied ? t('contact-copied') : t('contact-copy')}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {socials.map(s => (
                <a
                  key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 rounded-full border hairline hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-500"
                >
                  {s.name}
                  <Arrow diagonal className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-0" />
                </a>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 label !text-[var(--fg)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" /> {t('nav-available')}
            </span>
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-7">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <label className="block">
                  <span className="sr-only">{t('contact-form-name')}</span>
                  <input className="field" type="text" name="user_name" required placeholder={t('contact-form-name')} />
                </label>
                <label className="block">
                  <span className="sr-only">{t('contact-form-email')}</span>
                  <input className="field" type="email" name="user_email" required placeholder={t('contact-form-email')} />
                </label>
              </div>
              <label className="block relative">
                <span className="sr-only">{t('contact-form-type')}</span>
                <select className="field pr-8" name="problem_type" required defaultValue="">
                  <option value="" disabled>{t('contact-form-select-default')}</option>
                  {options.map(k => <option key={k} value={t(k)}>{t(k)}</option>)}
                </select>
                <Arrow className="w-4 h-4 rotate-90 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)]" />
              </label>
              <label className="block">
                <span className="sr-only">{t('contact-form-desc')}</span>
                <textarea className="field resize-none" name="message" required rows={4} placeholder={t('contact-form-desc')} />
              </label>

              <div className="pt-10 flex justify-end">
                <Magnetic strength={0.45}>
                  <button
                    type="submit" disabled={sending}
                    className="group relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex flex-col items-center justify-center gap-2 font-medium text-lg overflow-hidden disabled:opacity-60"
                  >
                    <span className="absolute inset-0 bg-[var(--fg)] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-[var(--bg)]">
                      {sending ? t('contact-sending') : t('contact-form-submit')}
                    </span>
                    <Arrow diagonal className="relative z-10 w-5 h-5 transition-all duration-500 group-hover:rotate-0 group-hover:text-[var(--bg)]" />
                  </button>
                </Magnetic>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 left-1/2 z-[60] px-5 py-3 rounded-full bg-[var(--fg)] text-[var(--bg)] text-sm shadow-2xl"
            initial={{ y: 40, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: 40, x: '-50%', opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            role="status"
          >
            {t(toast === 'success' ? 'toast-success' : 'toast-error')}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
