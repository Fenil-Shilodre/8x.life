import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onNavigate, activeSection, onOpenApply }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().substring(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'the manifesto', href: '#manifesto' },
    { label: 'the machine', href: '#machine' },
    { label: 'self-selection', href: '#self-selection' },
    { label: 'founders', href: '#founders' },
    { label: 'kinetic sandbox', href: '#sandbox' },
  ];

  const handleLinkClick = (href) => {
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-auto">
        <div className="mx-auto px-6 sm:px-12 py-5 flex items-center justify-between border-b border-grid-line bg-bg/85 backdrop-blur-md transition-colors">
          {/* 8x Brand Mark - Clean & Boldly Written */}
          <a
            href="#"
            className="flex items-baseline gap-2.5 group text-ink hover:text-accent transition-colors"
          >
            <span className="font-sans font-bold text-2xl sm:text-3xl tracking-tighter text-ink group-hover:text-accent transition-colors flex items-center leading-none">
              8x<span className="text-accent">.</span>
            </span>
            <span className="font-mono text-[11px] tracking-widest uppercase opacity-60 hidden sm:inline-block">
              the human company
            </span>
          </a>

          {/* Live Telemetry Node Status */}
          <div className="hidden md:flex items-center gap-3 font-mono text-xs uppercase tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 live-pulse-dot" />
            <span className="text-ink/80">250,492 nodes active</span>
            <span className="text-ink/30">/</span>
            <span className="text-ink/60">53 countries</span>
            <span className="text-ink/30">/</span>
            <span className="text-ink/40 tabular-nums">{time}</span>
          </div>

          {/* Right Action and Hamburger */}
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenApply}
              className="hidden sm:inline-flex bracket-btn text-ink hover:text-accent font-mono text-xs"
            >
              [ join network ]
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 group cursor-pointer text-ink hover:text-accent uppercase font-mono text-xs tracking-widest focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <span className="rollover-link">
                <span className="rollover-inner">
                  {menuOpen ? 'close' : 'menu'}
                </span>
              </span>
              <span className="w-5 h-5 flex items-center justify-center border border-current rounded-sm">
                {menuOpen ? <X size={12} /> : <Menu size={12} />}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu (e2.vc Style) */}
      <div
        className={`fixed inset-0 z-40 bg-dark-bg text-dark-ink flex flex-col justify-between p-8 sm:p-16 transition-all duration-700 ease-[cubic-bezier(0.9,0,0.1,1)] ${
          menuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
      >
        <div className="flex justify-between items-center border-b border-white/10 pb-6 pt-16">
          <span className="font-mono text-xs uppercase tracking-widest text-white/50">
            [ navigation matrix ]
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            8x.life // live
          </span>
        </div>

        {/* Big Lowercase Display Links with Dimming */}
        <nav className="my-auto py-8 flex flex-col gap-2 dim-group">
          {navLinks.map((item, idx) => (
            <div key={item.label} className="dim-item overflow-hidden">
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className="group flex items-baseline justify-between text-3xl sm:text-6xl md:text-7xl font-semibold tracking-tight hover:text-accent transition-colors"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs sm:text-sm font-normal text-white/40">
                    0{idx + 1}
                  </span>
                  <span>{item.label}</span>
                </span>
                <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1" size={36} />
              </a>
            </div>
          ))}
        </nav>

        {/* Menu Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 font-mono text-xs uppercase text-white/60">
          <div>
            <p className="text-white/30 mb-1">co-founders</p>
            <p className="text-white">Jaka Bavdek (CEO)</p>
            <p className="text-white">Theo Bui (CTO)</p>
          </div>
          <div>
            <p className="text-white/30 mb-1">operating entities</p>
            <p>8x Social · 8x LinkedIn · 8x Research</p>
            <p>8x Sales · 8x Hiring · 8x Global</p>
          </div>
          <div className="sm:text-right">
            <p className="text-white/30 mb-1">intake</p>
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenApply();
              }}
              className="text-accent underline hover:text-white"
            >
              submit evidence / join
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
