import React from 'react';
import { ArrowUpRight, Award, Compass, Zap, Scale } from 'lucide-react';

const PRINCIPLES = [
  {
    icon: Zap,
    title: 'speed is a moat.',
    desc: 'The best companies move in hours, not sprints. We ship production changes multiple times per day and resolve bottlenecks instantaneously.',
  },
  {
    icon: Compass,
    title: 'global sovereign nodes.',
    desc: 'Our operators are spread across 50+ countries. Every human node has the autonomy to act locally while syncing with the global orchestration mesh.',
  },
  {
    icon: Award,
    title: 'proof over pedigree.',
    desc: 'We never ask where you went to school or what companies you worked at 5 years ago. Send us the work, the metrics, and the repository.',
  },
  {
    icon: Scale,
    title: 'asymmetric upside.',
    desc: 'Compensation at 8x is tied directly to the commercial leverage you create. If you orchestrate a fleet producing $10M, your compensation reflects that reality.',
  },
];

export default function CultureAndFounders({ onOpenApply }) {
  return (
    <section id="founders" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-grid-line">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-grid-line gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            [ core leadership & DNA ]
          </span>
          <h2 className="text-3xl sm:text-6xl font-semibold tracking-tight text-ink mt-2">
            the founders & the creed.
          </h2>
        </div>
        <p className="font-mono text-xs uppercase text-ink/60 sm:text-right max-w-xs">
          Built by operators who recognized that AI automates syntax, but human conviction closes the enterprise.
        </p>
      </div>

      {/* Founders Dossier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        {/* Jaka Bavdek */}
        <div className="border border-ink/20 p-8 sm:p-12 bg-white flex flex-col justify-between shadow-[4px_4px_0px_0px_#1c2121]">
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-grid-line font-mono text-xs">
              <span className="text-accent uppercase">[ co-founder // ceo ]</span>
              <span className="text-ink/40">ljubljana / global</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink mt-6">
              Jaka Bavdek
            </h3>
            <p className="font-mono text-xs text-ink/50 mt-1 uppercase">chief executive officer</p>

            <blockquote className="mt-8 text-base sm:text-lg text-ink/80 leading-relaxed italic border-l-2 border-accent pl-4 font-normal">
              &ldquo;Software is becoming free. That is not a tragedy; it is the greatest liberation in economic history. When everyone can build, the winner is whoever can orchestrate the human in the loop to deliver certainty, distribution, and real-world results.&rdquo;
            </blockquote>
          </div>

          <div className="mt-8 pt-6 border-t border-grid-line flex justify-between items-center font-mono text-xs text-ink/60">
            <span>focus: distribution & global capital</span>
            <a
              href="https://8x.careers/join"
              target="_blank"
              rel="noopener noreferrer"
              className="bracket-btn text-accent hover:text-ink"
            >
              [ read dispatch ]
            </a>
          </div>
        </div>

        {/* Theo Bui */}
        <div className="border border-ink/20 p-8 sm:p-12 bg-white flex flex-col justify-between shadow-[4px_4px_0px_0px_#1c2121]">
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-grid-line font-mono text-xs">
              <span className="text-accent uppercase">[ co-founder // cto ]</span>
              <span className="text-ink/40">engineering / systems</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink mt-6">
              Theo Bui
            </h3>
            <p className="font-mono text-xs text-ink/50 mt-1 uppercase">chief technology officer</p>

            <blockquote className="mt-8 text-base sm:text-lg text-ink/80 leading-relaxed italic border-l-2 border-accent pl-4 font-normal">
              &ldquo;Routing 250,000 human agents with SLA guarantees is the ultimate distributed systems challenge. We are building the orchestration layer that allows a single operator to command the leverage of an entire corporate division.&rdquo;
            </blockquote>
          </div>

          <div className="mt-8 pt-6 border-t border-grid-line flex justify-between items-center font-mono text-xs text-ink/60">
            <span>focus: human routing algorithms</span>
            <a
              href="https://8x.careers/join"
              target="_blank"
              rel="noopener noreferrer"
              className="bracket-btn text-accent hover:text-ink"
            >
              [ tech specs ]
            </a>
          </div>
        </div>
      </div>

      {/* Operating Principles Grid */}
      <div className="mt-16 pt-12 border-t border-grid-line">
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block mb-8">
          [ 4 pillars of the 8x operating cadence ]
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
          {PRINCIPLES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-6 border border-grid-line bg-white/60 flex flex-col justify-between h-[240px]">
                <div>
                  <div className="w-8 h-8 rounded-sm bg-accent/10 text-accent flex items-center justify-center mb-4">
                    <Icon size={16} />
                  </div>
                  <h4 className="font-bold text-sm text-ink lowercase tracking-tight mb-2">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-ink/75 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
                <span className="text-[10px] text-ink/30 uppercase">
                  pillar 0{idx + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
