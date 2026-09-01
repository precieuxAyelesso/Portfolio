import { useState, useEffect } from 'react';

export function AuraBackground() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Cursor Spotlight */}
      {mousePos && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full w-[450px] h-[450px] bg-cyan-500/[0.04] dark:bg-cyan-400/[0.07] blur-[100px] transition-transform duration-75 ease-out"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        />
      )}

      {/* Floating Aura Orb 1 - Top Center / Left */}
      <div className="absolute -top-24 left-1/4 w-[550px] h-[550px] rounded-full bg-cyan-500/[0.14] dark:bg-cyan-400/[0.12] blur-[120px] aura-orb-1" />

      {/* Floating Aura Orb 2 - Middle Right */}
      <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] rounded-full bg-blue-500/[0.10] dark:bg-sky-400/[0.09] blur-[130px] aura-orb-2" />

      {/* Floating Aura Orb 3 - Bottom Left */}
      <div className="absolute -bottom-20 left-10 w-[600px] h-[600px] rounded-full bg-teal-500/[0.08] dark:bg-emerald-400/[0.07] blur-[140px] aura-orb-3" />
    </div>
  );
}
