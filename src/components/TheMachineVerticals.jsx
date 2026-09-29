import React, { useState } from 'react';
import { ArrowUpRight, Lock, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

const VERTICALS = [
  {
    id: 'social',
    name: '8x Social',
    domain: '8x.social',
    tagline: 'Consumer brand attention & viral distribution',
    summary: 'TikTok, Instagram Reels, and YouTube Shorts scaled through 22,000+ orchestrated creators.',
    status: 'operational',
    kpi: '1.8B+ Monthly Impressions',
    humanLayer: 'Scriptwriters, editors, UGC creators, hook engineers',
    aiLayer: 'Trend scraping, audio-match algorithms, automated distribution routing',
    deliverables: ['Hyper-targeted organic virality', 'No ad-spend dependency', 'Multi-channel syndicate'],
  },
  {
    id: 'business',
    name: '8x LinkedIn',
    domain: '8x.business',
    tagline: 'B2B enterprise pipeline & account penetration',
    summary: 'Outbound pipeline generation engineered directly on LinkedIn with authentic executive presence.',
    status: 'operational',
    kpi: '$42M+ Direct Client Pipeline',
    humanLayer: 'Executive ghostwriters, industry subject-matter researchers, SDRs',
    aiLayer: 'Signal detection, intent-scraping, TAM enrichment',
    deliverables: ['Enterprise deal flow', 'Warm outbound orchestration', 'CEO brand dominance'],
  },
  {
    id: 'research',
    name: '8x Research',
    domain: '8xresearch.com',
    tagline: 'Deep-niche market intelligence & reconnaissance',
    summary: 'Custom intelligence gathered by humans in the field. Bypassing generic Google & LLM hallucinations.',
    status: 'operational',
    kpi: '85,000+ Intelligence Dossiers',
    humanLayer: 'On-the-ground analysts, niche domain specialists, undercover mystery shoppers',
    aiLayer: 'Cross-dossier synthesis, anomaly extraction, graph mapping',
    deliverables: ['Real competitor pricing & churn secrets', 'Supply chain bottlenecks', 'Unindexed niche trends'],
  },
  {
    id: 'sales',
    name: '8x Sales',
    domain: '8x.sale',
    tagline: 'Global telephonic outbound & cold calling fleet',
    summary: 'High-touch outbound telephone callers operating 24/7 across US, EMEA, and APAC time zones.',
    status: 'operational',
    kpi: '650,000+ Live Calls / Week',
    humanLayer: 'Native language conversationalists, objection handlers, account closers',
    aiLayer: 'Real-time pitch prompts, call sentiment analysis, automated CRM synthesis',
    deliverables: ['Guaranteed qualified discovery calls', 'Zero software fatigue', 'Pure human rapport'],
  },
  {
    id: 'careers',
    name: '8x Hiring',
    domain: '8x.careers',
    tagline: 'Evidence-first proof-of-work talent protocol',
    summary: 'Replacing credentialism and resumes with verifiably completed challenges and work proof.',
    status: 'operational',
    kpi: 'Top 0.2% Acceptance Rate',
    humanLayer: 'Peer code reviewers, case evaluators, culture interviews',
    aiLayer: 'Skill-proof hashing, fraud detection, benchmark ranking',
    deliverables: ['Immediate sovereign contributors', 'Zero credential bias', 'Hired on proof alone'],
  },
  {
    id: 'email',
    name: '8x Email',
    domain: '8x.life',
    tagline: 'High-deliverability human newsletter & outreach network',
    summary: 'Orchestrating 1-to-1 personal inbox relationships without spam traps or corporate blandness.',
    status: 'locked',
    unlockProgress: '91% architecture complete',
    kpi: 'Unlocking at 300k network scale',
    humanLayer: 'Direct personal correspondents',
    aiLayer: 'Inbox placement & spam heuristics defense',
    deliverables: ['Human inbox delivery', '99.4% primary tab placement'],
  },
  {
    id: 'global',
    name: '8x Global',
    domain: '8x.life',
    tagline: 'Decentralized physical task orchestration',
    summary: 'Connecting high-agency local humans in 100+ cities for physical verifications and real-world execution.',
    status: 'locked',
    unlockProgress: 'Expanding nodes across Latin America & SE Asia',
    kpi: 'Target Launch: Q1 2027',
    humanLayer: 'Field operatives in major financial & tech hubs',
    aiLayer: 'Geospatial task dispatch engine',
    deliverables: ['Physical ground verification', 'Hardware drop logistics'],
  },
];

export default function TheMachineVerticals() {
  const [expandedId, setExpandedId] = useState('social');

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="machine" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-grid-line gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            [ core operating engines ]
          </span>
          <h2 className="text-3xl sm:text-6xl font-semibold tracking-tight text-ink mt-2">
            the 8x machine.
          </h2>
        </div>
        <p className="font-mono text-xs uppercase text-ink/60 sm:text-right max-w-xs">
          7 specialized vertical engines powered by coordinated human networks and machine routing.
        </p>
      </div>

      {/* Accordion / Table Rows with Sibling Dimming (e2.vc pattern) */}
      <div className="divide-y divide-grid-line dim-group">
        {VERTICALS.map((item) => {
          const isExpanded = expandedId === item.id;
          const isLocked = item.status === 'locked';

          return (
            <div
              key={item.id}
              className={`dim-item transition-all duration-300 ${
                isLocked ? 'opacity-50' : 'hover:bg-ink/[0.02]'
              }`}
            >
              {/* Row Header */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <span className="font-mono text-xs sm:text-sm text-ink/40 w-8">
                    {item.id.substring(0, 3).toUpperCase()}
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight text-ink">
                        {item.name}
                      </h3>
                      {isLocked ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase bg-ink/10 text-ink/70 px-2 py-0.5 rounded-sm">
                          <Lock size={10} /> locked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase bg-accent/10 text-accent px-2 py-0.5 rounded-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent live-pulse-dot" /> active
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-ink/70 mt-1 font-normal">
                      {item.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-8 pl-12 md:pl-0">
                  <div className="text-left md:text-right font-mono text-xs">
                    <span className="text-ink/40 uppercase block text-[10px]">
                      {isLocked ? 'unlock status' : 'performance metric'}
                    </span>
                    <span className="text-accent font-semibold">{item.kpi}</span>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center text-ink/60 hover:text-accent hover:border-accent transition-colors">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </div>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="pb-8 pl-12 sm:pl-16 pr-4 sm:pr-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-ink/80 border-t border-grid-line/60 pt-6 animate-fadeIn">
                  <div>
                    <h4 className="uppercase text-ink/40 text-[10px] tracking-wider mb-2">
                      [ human orchestration layer ]
                    </h4>
                    <p className="font-sans text-sm text-ink leading-relaxed">
                      {item.humanLayer}
                    </p>
                  </div>

                  <div>
                    <h4 className="uppercase text-ink/40 text-[10px] tracking-wider mb-2">
                      [ algorithmic engine layer ]
                    </h4>
                    <p className="font-sans text-sm text-ink leading-relaxed">
                      {item.aiLayer}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <h4 className="uppercase text-ink/40 text-[10px] tracking-wider mb-2">
                        [ verified outcomes ]
                      </h4>
                      <ul className="space-y-1 text-ink/80 font-sans text-xs">
                        {item.deliverables.map((deliv, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-accent flex-shrink-0" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {!isLocked && (
                      <div className="mt-4 pt-3 border-t border-grid-line">
                        <a
                          href={`https://${item.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bracket-btn text-accent hover:text-ink font-mono text-xs"
                        >
                          launch {item.domain} <ArrowUpRight size={12} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
