import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Globe2, Radio, Send, CheckCircle2 } from 'lucide-react';

const CITIES = [
  { name: 'san francisco', tz: 'America/Los_Angeles', ping: '24ms' },
  { name: 'london', tz: 'Europe/London', ping: '16ms' },
  { name: 'ljubljana', tz: 'Europe/Ljubljana', ping: '8ms', hub: true },
  { name: 'singapore', tz: 'Asia/Singapore', ping: '32ms' },
  { name: 'tokyo', tz: 'Asia/Tokyo', ping: '46ms' },
];

export default function Footer({ onOpenApply }) {
  const [times, setTimes] = useState({});
  const [emailSub, setEmailSub] = useState('');
  const [subDone, setSubDone] = useState(false);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const updated = {};
      CITIES.forEach((c) => {
        try {
          updated[c.name] = new Intl.DateTimeFormat('en-US', {
            timeZone: c.tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }).format(now);
        } catch {
          updated[c.name] = '--:--:--';
        }
      });
      setTimes(updated);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailSub) return;
    setSubDone(true);
    setTimeout(() => {
      setEmailSub('');
      setSubDone(false);
    }, 4000);
  };

  return (
    <footer className="bg-dark-bg text-dark-ink pt-20 pb-12 px-6 sm:px-12 select-none border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Top: 5 Global Hubs with Latency & Live Time */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pb-12 border-b border-white/10 font-mono text-xs">
          {CITIES.map((c) => (
            <div
              key={c.name}
              className={`p-3 border rounded-sm flex flex-col justify-between ${
                c.hub
                  ? 'border-accent/50 bg-accent/[0.04]'
                  : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              <div className="flex justify-between items-center text-[10px] text-white/40 uppercase">
                <span>{c.name}</span>
                <span className="text-accent">{c.ping}</span>
              </div>
              <span className="text-white font-semibold tabular-nums mt-2 text-base">
                {times[c.name] || '12:00:00'}
              </span>
              <span className="text-[9px] text-white/30 uppercase mt-1">
                {c.hub ? '8x core hub' : 'regional node'}
              </span>
            </div>
          ))}
        </div>

        {/* Center: Columns & Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
          {/* Col 1: Big Wordmark & Mission */}
          <div className="lg:col-span-4">
            <h3 className="text-5xl sm:text-6xl font-bold tracking-tighter lowercase text-white">
              8x<span className="text-accent">.</span>
            </h3>
            <p className="mt-4 font-mono text-xs text-white/70 leading-relaxed uppercase max-w-sm">
              the human company.
              <br />
              coordinating a quarter-million humans across 50+ countries to execute asymmetric business outcomes.
            </p>

            {/* Weekly Dispatch Input */}
            <div className="mt-8">
              <span className="font-mono text-[10px] uppercase text-white/40 block mb-2">
                [ 8x operational dispatch // weekly ]
              </span>
              {subDone ? (
                <div className="text-emerald-400 font-mono text-xs flex items-center gap-2 py-2">
                  <CheckCircle2 size={14} /> dispatched to network verification.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm font-mono text-xs">
                  <input
                    type="email"
                    required
                    value={emailSub}
                    onChange={(e) => setEmailSub(e.target.value)}
                    placeholder="operator@domain.com"
                    className="w-full bg-white/5 border border-white/20 p-2.5 text-white placeholder-white/30 focus:outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="bg-accent text-white px-4 hover:bg-accent-dark transition-colors flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Verticals */}
          <div className="lg:col-span-3 font-mono text-xs">
            <h4 className="uppercase text-white/40 tracking-wider mb-4 pb-1 border-b border-white/10">
              [ 7 vertical divisions ]
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="https://8x.social" target="_blank" rel="noreferrer" className="rollover-link hover:text-accent flex items-center justify-between">
                  <span className="rollover-inner">8x social (consumer attention)</span>
                  <ArrowUpRight size={12} className="text-white/40" />
                </a>
              </li>
              <li>
                <a href="https://8x.business" target="_blank" rel="noreferrer" className="rollover-link hover:text-accent flex items-center justify-between">
                  <span className="rollover-inner">8x linkedin (b2b demand)</span>
                  <ArrowUpRight size={12} className="text-white/40" />
                </a>
              </li>
              <li>
                <a href="https://8xresearch.com" target="_blank" rel="noreferrer" className="rollover-link hover:text-accent flex items-center justify-between">
                  <span className="rollover-inner">8x research (niche intelligence)</span>
                  <ArrowUpRight size={12} className="text-white/40" />
                </a>
              </li>
              <li>
                <a href="https://8x.sale" target="_blank" rel="noreferrer" className="rollover-link hover:text-accent flex items-center justify-between">
                  <span className="rollover-inner">8x sales (cold outbound)</span>
                  <ArrowUpRight size={12} className="text-white/40" />
                </a>
              </li>
              <li>
                <a href="https://www.8x.careers" target="_blank" rel="noreferrer" className="rollover-link hover:text-accent flex items-center justify-between">
                  <span className="rollover-inner">8x hiring (evidence-first)</span>
                  <ArrowUpRight size={12} className="text-white/40" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Protocol */}
          <div className="lg:col-span-2 font-mono text-xs">
            <h4 className="uppercase text-white/40 tracking-wider mb-4 pb-1 border-b border-white/10">
              [ system creed ]
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#manifesto" className="rollover-link hover:text-accent">
                  <span className="rollover-inner">the 8x manifesto</span>
                </a>
              </li>
              <li>
                <a href="#self-selection" className="rollover-link hover:text-accent">
                  <span className="rollover-inner">self-selection test</span>
                </a>
              </li>
              <li>
                <a href="#founders" className="rollover-link hover:text-accent">
                  <span className="rollover-inner">founders & creed</span>
                </a>
              </li>
              <li>
                <a href="#machine" className="rollover-link hover:text-accent">
                  <span className="rollover-inner">the 8x machine</span>
                </a>
              </li>
              <li>
                <a href="#sandbox" className="rollover-link hover:text-accent">
                  <span className="rollover-inner">kinetic sandbox</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Apply Terminal */}
          <div className="lg:col-span-3 font-mono text-xs flex flex-col justify-between">
            <div className="border border-white/15 p-6 bg-white/[0.02]">
              <h4 className="uppercase text-accent tracking-wider font-bold mb-2">
                [ sovereign intake ]
              </h4>
              <p className="text-white/70 font-sans text-xs leading-relaxed mb-6 font-normal">
                We hire the top 0.1% on empirical proof alone. No resume screening. Submit working code, campaign proof, or intelligence dossiers.
              </p>

              <button
                onClick={onOpenApply}
                className="w-full bracket-btn bg-accent text-white hover:bg-accent-dark py-3 uppercase font-mono font-bold text-center justify-center transition-all shadow-[4px_4px_0px_0px_#ffffff]"
              >
                [ submit evidence / apply ]
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Baseline & Telemetry */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-white/50">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent live-pulse-dot" />
            <span>&copy; {new Date().getFullYear()} 8x Systems Inc.</span>
            <span>·</span>
            <span>all sovereign rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-accent font-semibold">250,492 NODES ACTIVE</span>
            <span>·</span>
            <span>53 COUNTRIES</span>
            <span>·</span>
            <span>0% CREDENTIAL BIAS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
