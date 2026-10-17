import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Arrow, EASE, FadeIn, Magnetic, RevealText } from '../ui';
import { EMAIL, WHATSAPP, socials } from '../../data';
import { setScrollLocked } from '../../hooks';

interface Draft { name: string; email: string; subject: string; message: string }

/* ─── Modal: pick WhatsApp or email, both prefilled ─── */
function SendModal({ draft, onClose, onSent }: { draft: Draft | null; onClose: () => void; onSent: () => void }) {
  const { t } = useTranslation();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!draft) return;
    setScrollLocked(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { setScrollLocked(false); window.removeEventListener('keydown', onKey); };
  }, [draft, onClose]);

  const body = draft ? [
    t('msg-hello'),
    t('msg-from', { name: draft.name, email: draft.email }),
    t('msg-subject', { subject: draft.subject }),
    '',
    draft.message,
  ].join('\n') : '';

  const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(body)}`;
  const mailUrl = draft
    ? `mailto:${EMAIL}?subject=${encodeURIComponent(t('msg-mail-subject', { subject: draft.subject }))}&body=${encodeURIComponent(body)}`
    : '';

  return (
    <AnimatePresence>
      {draft && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="dialog" aria-modal="true" aria-labelledby="send-modal-title"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-lg rounded-2xl bg-[var(--bg)] border hairline p-6 sm:p-8 shadow-2xl"
            initial={{ y: 40, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40, scale: 0.97 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-start justify-between gap-6">
              <h3 id="send-modal-title" className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] leading-tight">
                {t('modal-title')}
              </h3>
              <button ref={closeRef} onClick={onClose} aria-label={t('modal-close')} className="relative w-8 h-8 shrink-0 rounded-full border hairline hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors">
                <span className="absolute top-1/2 left-1/2 w-3 h-px bg-current -translate-x-1/2 rotate-45" />
                <span className="absolute top-1/2 left-1/2 w-3 h-px bg-current -translate-x-1/2 -rotate-45" />
              </button>
            </div>
            <p className="mt-3 text-[var(--muted)] leading-relaxed">{t('modal-desc')}</p>

            <div className="mt-5 rounded-xl bg-[var(--bg-soft)] p-4 text-sm leading-relaxed whitespace-pre-line max-h-40 overflow-auto text-[var(--muted)]">
              {body}
            </div>

            <div className="mt-6 grid gap-3">
              <a
                href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={onSent}
                className="group flex items-center justify-between gap-4 rounded-xl bg-[#25D366] text-[#0b0b0c] px-5 py-4 transition-transform duration-500 hover:-translate-y-0.5"
              >
                <span>
                  <span className="block font-medium text-lg">{t('modal-whatsapp')}</span>
                  <span className="block text-sm opacity-70">{t('modal-whatsapp-hint')}</span>
                </span>
                <Arrow diagonal className="w-5 h-5 transition-transform duration-500 group-hover:rotate-0" />
              </a>
              <a
                href={mailUrl} onClick={onSent}
                className="group flex items-center justify-between gap-4 rounded-xl border hairline px-5 py-4 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-500"
              >
                <span>
                  <span className="block font-medium text-lg">{t('modal-email')}</span>
                  <span className="block text-sm opacity-60">{t('modal-email-hint')}</span>
                </span>
                <Arrow diagonal className="w-5 h-5 transition-transform duration-500 group-hover:rotate-0" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Contact() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [copied, setCopied] = useState(false);
  const closeModal = useCallback(() => setDraft(null), []);
  const sent = useCallback(() => { formRef.current?.reset(); setDraft(null); }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setDraft({
      name: String(data.get('user_name') ?? '').trim(),
      email: String(data.get('user_email') ?? '').trim(),
      subject: String(data.get('problem_type') ?? ''),
      message: String(data.get('message') ?? '').trim(),
    });
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
                    type="submit"
                    className="group relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex flex-col items-center justify-center gap-2 font-medium text-lg overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-[var(--fg)] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-[var(--bg)]">
                      {t('contact-form-submit')}
                    </span>
                    <Arrow diagonal className="relative z-10 w-5 h-5 transition-all duration-500 group-hover:rotate-0 group-hover:text-[var(--bg)]" />
                  </button>
                </Magnetic>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>

      <SendModal draft={draft} onClose={closeModal} onSent={sent} />
    </section>
  );
}
