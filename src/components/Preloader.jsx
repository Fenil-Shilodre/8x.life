import React, { useState, useEffect } from 'react';

const OPERATOR_SNIPPETS = [
  '250,492 HUMANS',
  '53 COUNTRIES',
  '8X SOCIAL',
  '8X LINKEDIN',
  '8X RESEARCH',
  '8X SALES',
  'ZERO CREDENTIAL BIAS',
];

export default function Preloader({ onComplete }) {
  const [split, setSplit] = useState(false);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // 1. Initial pause
    const t1 = setTimeout(() => {
      setSplit(true);
    }, 300);

    // 2. Cycle through snippets
    const interval = setInterval(() => {
      setSnippetIndex((prev) => (prev + 1) % OPERATOR_SNIPPETS.length);
    }, 120);

    // 3. Close split and finish
    const t2 = setTimeout(() => {
      clearInterval(interval);
      setSplit(false);
    }, 1400);

    // 4. Fade out
    const t3 = setTimeout(() => {
      setDone(true);
      if (onComplete) onComplete();
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-bg flex items-center justify-center transition-opacity duration-500 ${
        done ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex items-center font-bold text-5xl sm:text-8xl tracking-tighter text-ink font-sans">
        {/* Left half */}
        <span
          className="transition-transform duration-700 ease-[cubic-bezier(0.8,0,0.2,1)]"
          style={{ transform: split ? 'translateX(-40px)' : 'translateX(0)' }}
        >
          8
        </span>

        {/* Center slot machine text */}
        <div
          className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.8,0,0.2,1)] flex items-center justify-center"
          style={{
            width: split ? '280px' : '0px',
            opacity: split ? 1 : 0,
          }}
        >
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-accent font-semibold px-2 truncate">
            {OPERATOR_SNIPPETS[snippetIndex]}
          </span>
        </div>

        {/* Right half */}
        <span
          className="transition-transform duration-700 ease-[cubic-bezier(0.8,0,0.2,1)]"
          style={{ transform: split ? 'translateX(40px)' : 'translateX(0)' }}
        >
          x
        </span>
      </div>
    </div>
  );
}
