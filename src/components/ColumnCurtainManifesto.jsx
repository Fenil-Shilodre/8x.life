import React, { useState } from 'react';
import { ArrowRight, Cpu } from 'lucide-react';

const MANIFESTO_LINES = [
  {
    num: '01',
    line: 'ai is changing the world.',
    subtext: 'Not by replacing humanity, but by exponentially compressing the cost of intellectual labor, computer software, and synthetic intelligence to near-zero.',
  },
  {
    num: '02',
    line: 'anyone can build, so the value lies in distribution.',
    subtext: 'When a million developers can clone any app in a weekend, product is no longer a moat. Reaching the actual buyer, commanding real-world trust, and closing the enterprise transaction is where all margin aggregates.',
  },
  {
    num: '03',
    line: 'jobs will change, but never disappear.',
    subtext: 'Rote compliance and clerical busywork evaporate. Autonomous human judgment, taste, strategic negotiation, and high-agency execution become magnified 100x.',
  },
  {
    num: '04',
    line: 'the human in the loop becomes the most valuable and bottlenecked resource.',
    subtext: 'AI creates infinite possibilities. The scarce constraint is the human deciding what matters, validating empirical truth, and taking sovereign responsibility.',
  },
  {
    num: '05',
    line: '8x supplies and orchestrates those humans.',
    subtext: 'We are building the computational routing infrastructure to mobilize a quarter-million humans across 50+ countries to execute high-impact business outcomes at machine speed.',
  },
  {
    num: '06',
    line: 'the implications are global and generational.',
    subtext: 'Talent has always been evenly distributed across the planet; enterprise leverage was not. We bridge that gap permanently.',
  },
];

export default function ColumnCurtainManifesto() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="manifesto" className="relative bg-dark-bg text-dark-ink py-28 px-6 sm:px-12 transition-colors duration-700 border-t border-white/10">
      {/* Structural Curtain Divider */}
      <div className="max-w-7xl mx-auto mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
            <Cpu size={14} /> [ the philosophical engine ]
          </span>
          <h2 className="text-4xl sm:text-7xl font-semibold tracking-tighter text-white mt-3">
            the 8x manifesto<span className="text-accent">.</span>
          </h2>
        </div>
        <div className="font-mono text-xs uppercase text-white/50 max-w-sm md:text-right">
          6 non-negotiable axioms that govern our operating structure, capital allocation, and hiring threshold.
        </div>
      </div>

      {/* Interactive Manifesto Line Navigator */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Index Bar (Left Column) */}
        <div className="lg:col-span-4 flex flex-col gap-3 font-mono text-xs uppercase">
          <span className="text-white/40 pb-2 border-b border-white/10">
            [ core theses / select to examine ]
          </span>
          {MANIFESTO_LINES.map((item, idx) => (
            <button
              key={item.num}
              onClick={() => setActiveStep(idx)}
              className={`p-4 border text-left transition-all flex items-center justify-between group rounded-sm ${
                activeStep === idx
                  ? 'border-accent bg-accent/10 text-white font-semibold shadow-[2px_2px_0px_0px_#3451f5]'
                  : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white/80 bg-white/[0.01]'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={activeStep === idx ? 'text-accent font-bold' : 'text-white/30'}>
                  {item.num}
                </span>
                <span className="truncate max-w-[200px] sm:max-w-xs">{item.line}</span>
              </span>
              <ArrowRight
                size={14}
                className={`transition-transform ${
                  activeStep === idx ? 'text-accent translate-x-1' : 'opacity-0 group-hover:opacity-100'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Big Display Readout (Right Column) */}
        <div className="lg:col-span-8 bg-[#161a1a] border border-white/15 p-8 sm:p-14 relative flex flex-col justify-between min-h-[460px] shadow-2xl rounded-sm">
          <div>
            <div className="flex justify-between items-center pb-6 border-b border-white/10 font-mono text-xs text-white/40">
              <span className="text-accent font-bold">AXIOM {MANIFESTO_LINES[activeStep].num} OF 06</span>
              <span className="uppercase tracking-wider">[ sovereign principle ]</span>
            </div>

            <h3 className="mt-8 text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
              &ldquo;{MANIFESTO_LINES[activeStep].line}&rdquo;
            </h3>

            <p className="mt-8 text-base sm:text-xl text-white/75 leading-relaxed font-normal">
              {MANIFESTO_LINES[activeStep].subtext}
            </p>
          </div>

          <div className="pt-8 border-t border-white/10 mt-8 flex flex-wrap justify-between items-center gap-4 font-mono text-xs">
            <span className="text-white/40">
              consensus status: absolute / non-negotiable
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : MANIFESTO_LINES.length - 1))}
                className="bracket-btn text-white/70 hover:text-accent border border-white/20 px-3 py-1.5"
              >
                [ prev ]
              </button>
              <button
                onClick={() => setActiveStep((prev) => (prev < MANIFESTO_LINES.length - 1 ? prev + 1 : 0))}
                className="bracket-btn text-white/70 hover:text-accent border border-white/20 px-3 py-1.5"
              >
                [ next ]
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
