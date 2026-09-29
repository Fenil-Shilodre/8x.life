import React, { useState } from 'react';
import { Network, Cpu, Users, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'enterprise intent',
    badge: 'input layer',
    icon: Network,
    desc: 'High-stakes commercial objectives: B2B pipeline, viral brand distribution, confidential market reconnaissance, or massive outbound telephonic scale.',
    meta: 'input latency: < 60 min',
    visualTag: 'intent formulation',
  },
  {
    step: '02',
    title: 'algorithmic routing kernel',
    badge: 'machine layer',
    icon: Cpu,
    desc: 'The 8x proprietary routing engine parses the objective, decomposes it into discrete micro-missions, validates fraud heuristics, and routes to qualified nodes.',
    meta: 'computational dispatch',
    visualTag: 'dynamic task decomposition',
  },
  {
    step: '03',
    title: '250k+ distributed human nodes',
    badge: 'human execution layer',
    icon: Users,
    desc: 'Vetted, high-agency human operators across 53 countries execute in their native contexts: scriptwriting, telephonic negotiation, deep field research, and live coding.',
    meta: '53 sovereign countries',
    visualTag: 'high-agency human loop',
  },
  {
    step: '04',
    title: 'verified enterprise outcome',
    badge: 'settlement layer',
    icon: Award,
    desc: 'Completed deliverables are verified against empirical SLAs before delivery. Output is measured strictly in enterprise revenue, pipeline, and validated truth.',
    meta: '100% evidence-verified',
    visualTag: 'commercial margin realized',
  },
];

export default function VisualArchitecture() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-grid-line">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-grid-line gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            [ visual system architecture ]
          </span>
          <h2 className="text-3xl sm:text-6xl font-semibold tracking-tight text-ink mt-2">
            how 8x orchestrates scale.
          </h2>
        </div>
        <p className="font-mono text-xs uppercase text-ink/60 sm:text-right max-w-xs">
          Software routes the signals. Humans close the reality. The complete 4-tier pipeline.
        </p>
      </div>

      {/* Visual Pipeline Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-16">
        {PIPELINE_STEPS.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeStep === idx;

          return (
            <div
              key={item.step}
              onClick={() => setActiveStep(idx)}
              className={`p-6 sm:p-8 border transition-all cursor-pointer flex flex-col justify-between h-[360px] relative ${
                isActive
                  ? 'border-accent bg-white shadow-[6px_6px_0px_0px_#3451f5] -translate-y-1'
                  : 'border-ink/20 bg-white/50 hover:border-ink/50 hover:bg-white'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-grid-line">
                  <span className="font-mono text-xs font-bold text-accent">
                    PHASE {item.step}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-ink/50">
                    {item.badge}
                  </span>
                </div>

                <div className="my-5 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${
                    isActive ? 'bg-accent text-white' : 'bg-bg text-ink border border-ink/10'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-ink leading-tight capitalize">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-ink/75 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-grid-line flex justify-between items-center font-mono text-[10px]">
                <span className="text-ink/50 uppercase">{item.meta}</span>
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-accent live-pulse-dot' : 'bg-ink/20'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Interactive Visual Inspection Terminal */}
      <div className="border border-ink/20 bg-white p-8 sm:p-12 shadow-[4px_4px_0px_0px_#111414]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-grid-line gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent live-pulse-dot" />
            <span className="uppercase font-bold text-ink">
              ACTIVE INSPECTION: PHASE {PIPELINE_STEPS[activeStep].step} // {PIPELINE_STEPS[activeStep].title}
            </span>
          </div>
          <span className="text-accent uppercase tracking-wider font-semibold">
            {PIPELINE_STEPS[activeStep].visualTag}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div>
            <h4 className="font-mono text-[10px] text-ink/40 uppercase mb-2">
              [ operational mechanism ]
            </h4>
            <p className="text-sm text-ink leading-relaxed font-sans">
              {PIPELINE_STEPS[activeStep].desc}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] text-ink/40 uppercase mb-2">
              [ architectural guarantees ]
            </h4>
            <ul className="space-y-2 font-mono text-xs text-ink/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={12} className="text-accent" />
                <span>Zero single point of failure</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={12} className="text-accent" />
                <span>Autonomous sovereign node execution</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={12} className="text-accent" />
                <span>Sub-second algorithmic routing dispatch</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between border-l border-grid-line pl-0 md:pl-8">
            <div>
              <h4 className="font-mono text-[10px] text-ink/40 uppercase mb-2">
                [ network verification ]
              </h4>
              <p className="font-mono text-xs text-accent font-bold">
                100% EMPIRICAL / SLA-ENFORCED
              </p>
            </div>
            <div className="pt-4 font-mono text-[11px] text-ink/50">
              node status: active across all 53 territorial fleets
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
