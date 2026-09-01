import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { AnimatedSection, SectionHeader, Toast } from '../ui';

export function Contact() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [toast, setToast] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || sending) return;
    setSending(true);
    try {
      await emailjs.sendForm('service_d0l3hnh', 'template_k0qb11r', formRef.current, 'g3JcFTt3gGIuFuYHk');
      setToast(true);
      setTimeout(() => setToast(false), 2500);
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
    }
    setSending(false);
  };

  const selectOptions = Array.from({ length: 7 }, (_, i) => `contact-form-select-opt${i + 1}`);

  return (
    <AnimatedSection id="contact" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader label="contact-label" title="contact-title" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-sm font-mono text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('contact-desc') }} />

            <div className="space-y-3">
              <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
                <i className="fa-regular fa-envelope text-cyan-400 text-sm" />
                <div>
                  <p className="text-xs text-slate-500 font-mono">{t('contact-method-email')}</p>
                  <a href="mailto:arimelprecieux@gmail.com" className="text-sm text-white hover:text-cyan-400 transition-colors">arimelprecieux@gmail.com</a>
                </div>
              </div>
              <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
                <i className="fa-solid fa-location-dot text-cyan-400 text-sm" />
                <div>
                  <p className="text-xs text-slate-500 font-mono">{t('contact-method-loc')}</p>
                  <p className="text-sm text-white">{t('contact-method-loc-val')}</p>
                </div>
              </div>
            </div>

            <span className="inline-block px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
              {t('contact-badge')}
            </span>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="lg:col-span-3 glass rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 mb-1 block">{t('contact-form-name')}</label>
                <input type="text" name="user_name" required placeholder={t('contact-form-name-placeholder')}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400 mb-1 block">{t('contact-form-email')}</label>
                <input type="email" name="user_email" required placeholder={t('contact-form-email-placeholder')}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 mb-1 block">{t('contact-form-type')}</label>
              <select name="problem_type" required
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500/50 focus:outline-none transition-colors appearance-none">
                <option value="" disabled>{t('contact-form-select-default')}</option>
                {selectOptions.map(key => <option key={key} value={t(key)}>{t(key)}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 mb-1 block">{t('contact-form-desc')}</label>
              <textarea name="message" required rows={4} placeholder={t('contact-form-desc-placeholder')}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none transition-colors resize-none" />
            </div>

            <button type="submit" disabled={sending}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl transition-all duration-300 text-sm font-mono btn-shine disabled:opacity-50">
              {sending ? '...' : t('contact-form-submit')} {!sending && <span className="ml-1">→</span>}
            </button>
          </form>
        </div>
      </div>

      <Toast message={t('toast-success')} visible={toast} />
    </AnimatedSection>
  );
}
