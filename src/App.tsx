import { useState, useEffect } from 'react';
import { Navbar, Footer } from './components/layout';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills, TechStack } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import { AuraBackground } from './components/ui';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="grid-bg min-h-screen flex flex-col relative">
      {/* Dynamic Aura Gradient & Floating Orbs */}
      <AuraBackground />

      {/* Scroll progress line */}
      <div className="scroll-line" style={{ width: `${scrollProgress}%` }} />

      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-0 relative z-10">

        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Projects />
        <Services />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
