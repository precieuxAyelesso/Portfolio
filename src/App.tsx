import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Navbar, Footer, Preloader } from './components/layout';
import { Hero } from './components/sections/Hero';
import { About, Marquee } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import { Cursor } from './components/ui';
import { useIsFinePointer, useSmoothScroll } from './hooks';

export default function App() {
  const [ready, setReady] = useState(false);
  const fine = useIsFinePointer();
  const { i18n } = useTranslation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useSmoothScroll(true);
  useEffect(() => { document.documentElement.lang = i18n.language; }, [i18n.language]);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      {fine && <Cursor />}
      <div className="grain" aria-hidden />
      <motion.div className="fixed top-0 inset-x-0 h-[2px] bg-[var(--accent)] origin-left z-[60]" style={{ scaleX: progress }} />

      <Navbar ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Projects />
        <Services />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
