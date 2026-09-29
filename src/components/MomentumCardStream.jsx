import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Flame, BarChart3, Radio, Database, Shield, Zap } from 'lucide-react';

const OPERATORS = [
  {
    id: 'social',
    tag: '8x social',
    title: 'Consumer Attention Fleet',
    stat: '1.8B+ views / mo',
    desc: 'Thousands of creators and editors orchestrated to flood TikTok, Instagram Reels, and YouTube Shorts for consumer brands.',
    badge: 'live vertical',
    accentColor: '#3451f5',
    icon: Flame,
    role: '22,400+ creators active',
    domain: '8x.social',
    tilt: -3,
  },
  {
    id: 'linkedin',
    tag: '8x linkedin',
    title: 'B2B Pipeline Protocol',
    stat: '$42M+ pipeline added',
    desc: 'B2B demand generation orchestrated on LinkedIn. Human account executives armed with algorithmic intelligence.',
    badge: 'live vertical',
    accentColor: '#3451f5',
    icon: BarChart3,
    role: 'Enterprise B2B',
    domain: '8x.business',
    tilt: 2,
  },
  {
    id: 'jaka',
    tag: 'co-founder // ceo',
    title: 'Jaka Bavdek',
    stat: 'scale orchestrator',
    desc: '"When software became a commodity, distribution became the only sovereign moat. We built the engine to orchestrate the human loop."',
    badge: 'leadership',
    accentColor: '#3451f5',
    icon: Zap,
    role: 'Chief Executive Officer',
    domain: '8x.life',
    tilt: -2,
  },
  {
    id: 'research',
    tag: '8x research',
    title: 'Market & Niche Recon',
    stat: '85,000+ dossiers',
    desc: 'Deep-dive intelligence synthesis. Distributed domain experts vetting competitor moves, pricing leaks, and hidden trends.',
    badge: 'live vertical',
    accentColor: '#3451f5',
    icon: Database,
    role: 'Intelligence Fleet',
    domain: '8xresearch.com',
    tilt: 3,
  },
  {
    id: 'theo',
    tag: 'co-founder // cto',
    title: 'Theo Bui',
    stat: 'systems architect',
    desc: '"The hardest engineering problem of our generation is not generating another LLM wrapper; it is routing 250k human decisions in real time."',
    badge: 'leadership',
    accentColor: '#3451f5',
    icon: Shield,
    role: 'Chief Technology Officer',
    domain: '8x.life',
    tilt: -1,
  },
  {
    id: 'sales',
    tag: '8x sales',
    title: 'Global Cold Calling Engine',
    stat: '650k calls / week',
    desc: 'High-touch outbound and cold calling fleet operating across multiple time zones with algorithmic live transcription and coaching.',
    badge: 'live vertical',
    accentColor: '#3451f5',
    icon: Radio,
    role: 'Telephonic Outbound',
    domain: '8x.sale',
    tilt: 2,
  },
];

export default function MomentumCardStream({ onSelectCard }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const allCards = [...OPERATORS, ...OPERATORS, ...OPERATORS];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.6;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth / 3;
    }
  }, []);

  return (
    <section className="relative py-20 overflow-hidden border-y border-grid-line bg-bg/50">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            [ the operators & engines ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink mt-2">
            the human orchestration stream.
          </h2>
        </div>
        <p className="font-mono text-xs uppercase text-ink/50 sm:text-right">
          &larr; drag & fling with velocity &rarr;
        </p>
      </div>

      {/* Horizontal Draggable Track */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`cursor-grab active:cursor-grabbing overflow-x-auto no-scrollbar py-8 select-none ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 px-6 sm:px-12 w-max items-center transition-transform"
        >
          {allCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.id}-${idx}`}
                style={{
                  transform: `rotate(${item.tilt}deg)`,
                  transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
                className="w-[300px] sm:w-[360px] flex-shrink-0 bg-white border border-ink/20 p-6 sm:p-7 flex flex-col justify-between h-[420px] shadow-[4px_4px_0px_0px_#111414] hover:shadow-[8px_8px_0px_0px_#3451f5] hover:-translate-y-2 hover:border-accent transition-all duration-300"
              >
                {/* Card Top */}
                <div>
                  <div className="flex justify-between items-center pb-4 border-b border-grid-line">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-medium">
                      {item.tag}
                    </span>
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 border border-ink/20 text-ink/70">
                      {item.badge}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-bg border border-ink/10 flex items-center justify-center text-accent">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs text-ink/50">{item.role}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm text-ink/80 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Card Bottom / Stat */}
                <div className="pt-4 border-t border-grid-line">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-ink/40 block">
                        output telemetry
                      </span>
                      <span className="text-lg sm:text-xl font-semibold tracking-tight text-accent tabular-nums">
                        {item.stat}
                      </span>
                    </div>

                    <a
                      href={`https://${item.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bracket-btn text-ink hover:text-accent font-mono text-[11px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.domain} <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
