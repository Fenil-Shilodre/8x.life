import React, { useState } from 'react';
import { Check, X, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';

const THRIVE_POINTS = [
  {
    title: 'asymmetric personal agency',
    desc: 'You treat your role as an independent founder inside a high-leverage network. You do not ask for permission to fix broken workflows.',
  },
  {
    title: 'evidence over credentials',
    desc: 'We do not care if you went to Stanford or dropped out of high school. We care whether your code compiles, your outbound converts, and your synthesis is verified.',
  },
  {
    title: 'extreme async density',
    desc: 'We despise long meetings. Communication happens in dense, written memos, Git PRs, and verifiable metric dashboards across 50+ time zones.',
  },
  {
    title: 'commercial obsession',
    desc: 'You understand that vanity metrics mean nothing without business outcomes. Every line of code and every human coordinated exists to move enterprise revenue.',
  },
  {
    title: 'ai as an exoskeleton',
    desc: 'You use LLMs and automation to multiply your output by 10x, while taking sovereign pride in the human judgment that algorithms cannot replace.',
  },
];

const SELECT_OUT_POINTS = [
  {
    title: 'needs step-by-step hand-holding',
    desc: 'If you need a manager to define your daily tasks, write your Jira tickets, and follow up every morning, you will quickly drown here.',
  },
  {
    title: 'addicted to consensus & committee meetings',
    desc: 'If you believe 8 people need to attend a 45-minute sync to agree on a landing page headline, you will find our velocity infuriating.',
  },
  {
    title: 'hours worked over output produced',
    desc: 'We do not reward face-time, late-night Slack presence, or performing busyness. If you deliver in 3 hours what takes another 3 days, you win.',
  },
  {
    title: 'credential prestige & corporate titles',
    desc: 'If your self-worth depends on VP titles or brand-name past employers rather than current proof of competence, this is not your home.',
  },
  {
    title: 'seeks corporate comfort & predictability',
    desc: '8x is a high-intensity, rapidly evolving global orchestration machine. If ambiguity stresses you out, please do not apply.',
  },
];

const QUIZ_QUESTIONS = [
  {
    q: 'You are handed a strategic initiative with zero documentation and no existing playbook. You:',
    options: [
      { text: 'Analyze the objective, build a fast prototype or script, test with real users, and document the playbook yourself.', fit: true },
      { text: 'Schedule a discovery meeting with leadership to request clearer instructions and established templates.', fit: false },
    ],
  },
  {
    q: 'An automated pipeline failed and a client campaign missed its morning quota. Who is responsible?',
    options: [
      { text: 'I am, if I was orchestrating that node. The machine is only as reliable as the human maintaining vigilance.', fit: true },
      { text: 'The third-party API provider or the engineering infrastructure team.', fit: false },
    ],
  },
  {
    q: 'How do you view AI models and human labor in 2026+?',
    options: [
      { text: 'AI turns humans into high-leverage directors. Humans who coordinate outcomes become exponentially more valuable.', fit: true },
      { text: 'AI is a threat that will completely replace humans, so trying to coordinate human labor is obsolete.', fit: false },
    ],
  },
];

export default function SelfSelectionMatrix({ onOpenApply }) {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (qIdx, fit) => {
    const updated = { ...quizAnswers, [qIdx]: fit };
    setQuizAnswers(updated);
    if (Object.keys(updated).length === QUIZ_QUESTIONS.length) {
      setShowResult(true);
    }
  };

  const isFullFit = Object.values(quizAnswers).filter(Boolean).length === QUIZ_QUESTIONS.length;

  return (
    <section id="self-selection" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-grid-line gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
            <AlertTriangle size={14} /> [ radical transparency filter ]
          </span>
          <h2 className="text-3xl sm:text-6xl font-semibold tracking-tight text-ink mt-2">
            who thrives vs. who must self-select out.
          </h2>
        </div>
        <p className="font-mono text-xs uppercase text-ink/60 sm:text-right max-w-sm">
          8x is not for everyone. We deliberately make this page rigorous so the wrong people walk away before wasting their time.
        </p>
      </div>

      {/* High-Contrast Comparison Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-16">
        {/* Who Thrives (Green/Emerald accent) */}
        <div className="border-2 border-ink p-6 sm:p-10 bg-white relative">
          <div className="flex items-center justify-between pb-6 border-b border-grid-line">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Check size={18} />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
                who thrives at 8x
              </h3>
            </div>
            <span className="font-mono text-xs text-emerald-600 font-semibold">[ the 0.1% ]</span>
          </div>

          <div className="mt-8 space-y-6">
            {THRIVE_POINTS.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <span className="font-mono text-xs text-emerald-600 pt-1 font-bold">0{idx + 1}</span>
                <div>
                  <h4 className="font-bold text-base text-ink capitalize tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-sm text-ink/75 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-grid-line flex justify-between items-center font-mono text-xs">
            <span className="text-ink/60">outcome: sovereign ownership & scale</span>
            <button
              onClick={onOpenApply}
              className="bracket-btn text-accent font-bold hover:underline"
            >
              [ proceed to apply ]
            </button>
          </div>
        </div>

        {/* Who Should Self-Select Out (Red/Amber accent) */}
        <div className="border border-ink/30 p-6 sm:p-10 bg-ink/[0.02] relative">
          <div className="flex items-center justify-between pb-6 border-b border-grid-line">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <X size={18} />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink/70">
                who must self-select out
              </h3>
            </div>
            <span className="font-mono text-xs text-rose-600 font-semibold">[ save your time ]</span>
          </div>

          <div className="mt-8 space-y-6">
            {SELECT_OUT_POINTS.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start opacity-75 hover:opacity-100 transition-opacity">
                <span className="font-mono text-xs text-rose-600 pt-1 font-bold">0{idx + 1}</span>
                <div>
                  <h4 className="font-bold text-base text-ink/80 capitalize tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-sm text-ink/60 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-grid-line flex justify-between items-center font-mono text-xs text-ink/50">
            <span>recommendation: corporate enterprise or agency</span>
            <span>[ exit cleanly ]</span>
          </div>
        </div>
      </div>

      {/* Interactive 3-Question Alignment Probe */}
      <div className="border border-accent bg-accent/[0.04] p-8 sm:p-12 mt-12">
        <div className="flex items-center gap-3 pb-6 border-b border-accent/20">
          <Sparkles className="text-accent" size={20} />
          <h3 className="text-2xl font-semibold tracking-tight text-ink">
            the 8x alignment probe // 60-second test
          </h3>
        </div>

        <div className="mt-8 space-y-8">
          {QUIZ_QUESTIONS.map((qItem, qIdx) => (
            <div key={qIdx} className="space-y-3">
              <p className="font-medium text-base text-ink">
                <span className="font-mono text-xs text-accent mr-2">Q{qIdx + 1}.</span>
                {qItem.q}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {qItem.options.map((opt, oIdx) => {
                  const isSelected = quizAnswers[qIdx] === opt.fit;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(qIdx, opt.fit)}
                      className={`p-4 text-left border transition-all ${
                        isSelected
                          ? opt.fit
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold'
                            : 'border-rose-600 bg-rose-50 text-rose-950 font-semibold'
                          : 'border-ink/20 hover:border-ink/50 text-ink/80 bg-white'
                      }`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Quiz Result Readout */}
        {showResult && (
          <div className="mt-8 pt-6 border-t border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            {isFullFit ? (
              <div className="text-emerald-700 font-semibold flex items-center gap-2">
                <Check size={16} /> 100% Alignment verified. You possess the sovereign agency we look for.
              </div>
            ) : (
              <div className="text-rose-700 font-semibold flex items-center gap-2">
                <AlertTriangle size={16} /> Friction detected. You will likely find our pace and lack of structure frustrating.
              </div>
            )}

            {isFullFit && (
              <button
                onClick={onOpenApply}
                className="bracket-btn bg-accent text-white hover:bg-accent-dark px-6 py-2 uppercase font-mono"
              >
                [ open intake application ]
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
