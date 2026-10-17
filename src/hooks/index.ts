import { useState, useEffect } from 'react';
import Lenis from 'lenis';

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('light-theme', theme === 'light');
    try { localStorage.setItem('theme', theme); } catch { /* storage unavailable */ }
  }, [theme]);

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  return { theme, toggle };
}

/* ─── Smooth scroll (Lenis) ─── */
let lenis: Lenis | null = null;

export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let raf = 0;
    const loop = (time: number) => { lenis?.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); lenis = null; };
  }, [enabled]);
}

export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.6 });
    return;
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}

export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop(); else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatch(mq.matches);
    const on = (e: MediaQueryListEvent) => setMatch(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

export const useIsFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
