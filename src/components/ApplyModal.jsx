import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

const ROLES = [
  'Systems / Distributed Routing Engineer',
  'Outbound Fleet Commander (8x Sales)',
  'Viral Content & Distribution Lead (8x Social)',
  'Deep Intelligence Research Analyst (8x Research)',
  'Enterprise Account Director (8x LinkedIn)',
  'General High-Agency Athlete',
];

export default function ApplyModal({ isOpen, onClose }) {
  const [role, setRole] = useState(ROLES[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [proofLink, setProofLink] = useState('');
  const [agencyExample, setAgencyExample] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3451f5', '#1c2121', '#fcf7f0'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border-2 border-ink p-6 sm:p-10 shadow-[8px_8px_0px_0px_#1c2121] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-ink/60 hover:text-ink w-8 h-8 flex items-center justify-center border border-ink/20"
        >
          <X size={16} />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-ink">
              evidence received.
            </h3>
            <p className="font-mono text-xs text-ink/70 max-w-md mx-auto leading-relaxed">
              We review proof within 48 hours. If your submission shows sovereign agency and empirical competence, you will be scheduled for a direct founder technical session with Jaka or Theo.
            </p>
            <div className="pt-6">
              <button
                onClick={onClose}
                className="bracket-btn bg-ink text-white hover:bg-accent px-6 py-2.5 font-mono text-xs"
              >
                [ return to network ]
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="pb-4 border-b border-grid-line font-mono text-xs text-accent uppercase flex items-center gap-2">
              <ShieldCheck size={16} /> [ evidence-first intake terminal ]
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink mt-4">
              apply to orchestrate at 8x.
            </h3>
            <p className="font-mono text-xs text-ink/60 mt-1">
              Zero resume screening. We review only your verifiable work proof and sovereign agency.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5 font-mono text-xs">
              <div>
                <label className="block text-ink/70 uppercase mb-1">
                  1. select target track
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-ink/30 p-2.5 bg-bg text-ink font-sans focus:outline-none focus:border-accent"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ink/70 uppercase mb-1">
                    2. your name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="w-full border border-ink/30 p-2.5 bg-bg text-ink font-sans focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-ink/70 uppercase mb-1">
                    3. primary email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@domain.com"
                    className="w-full border border-ink/30 p-2.5 bg-bg text-ink font-sans focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-ink/70 uppercase mb-1">
                  4. proof of competence URL (GitHub repo, live campaign, dossier)
                </label>
                <input
                  type="url"
                  required
                  value={proofLink}
                  onChange={(e) => setProofLink(e.target.value)}
                  placeholder="https://github.com/... or https://..."
                  className="w-full border border-ink/30 p-2.5 bg-bg text-ink font-sans focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-ink/70 uppercase mb-1">
                  5. evidence of extreme agency (1-2 sentences)
                </label>
                <textarea
                  required
                  rows={3}
                  value={agencyExample}
                  onChange={(e) => setAgencyExample(e.target.value)}
                  placeholder="Describe a time you solved an ambiguous, high-stakes problem without asking for permission or templates."
                  className="w-full border border-ink/30 p-2.5 bg-bg text-ink font-sans focus:outline-none focus:border-accent"
                />
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-grid-line">
                <span className="text-[10px] text-ink/40 uppercase">
                  sla: 48-hour response on proof
                </span>
                <button
                  type="submit"
                  className="bracket-btn bg-accent text-white hover:bg-accent-dark px-6 py-3 uppercase font-mono font-bold"
                >
                  [ submit evidence ] <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
