
import React, { useState } from 'react';
import { AIInsight, Task, Domain } from '../types';

interface InsightPanelProps {
  task: Task | null;
  domain: Domain | null;
  insight: AIInsight | null;
  loading: boolean;
  onClose: () => void;
}

const InsightPanel: React.FC<InsightPanelProps> = ({ task, domain, insight, loading, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!task || !domain) return null;

  const handleCopy = () => {
    if (!insight) return;

    const formattedText = `
PMP Task: ${task.name}
Domain: ${domain.name}

EXECUTIVE SUMMARY
${insight.summary}

EXAM MEMORIZATION TIPS
${insight.tipsToRemember.map(tip => `• ${tip}`).join('\n')}

BEST PRACTICES
${insight.bestPractices.map(bp => `• ${bp}`).join('\n')}

COMMON PITFALLS
${insight.commonPitfalls.map(cp => `• ${cp}`).join('\n')}

MODERN PERSPECTIVE
${insight.modernPerspective}
    `.trim();

    navigator.clipboard.writeText(formattedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-full md:w-1/3 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-slate-200 overflow-y-auto ${task ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Expert AI Insights</h2>
          <div className="flex items-center gap-2">
            {insight && !loading && (
              <button 
                onClick={handleCopy}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                  copied 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' 
                    : 'bg-slate-100 text-slate-500 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-100'
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    COPIED!
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                    COPY INSIGHTS
                  </>
                )}
              </button>
            )}
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black bg-${domain.color}-100 text-${domain.color}-700 uppercase tracking-widest`}>
            {domain.name} Domain
          </span>
          <h3 className="text-xl font-black mt-3 text-slate-800 leading-tight">{task.name}</h3>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-xl h-12 w-12 border-4 border-indigo-600 border-t-transparent shadow-lg shadow-indigo-100"></div>
            <p className="text-slate-500 animate-pulse font-bold text-sm">Consulting Senior Advisor...</p>
          </div>
        ) : insight ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <section>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Executive Summary</h4>
              <p className="text-slate-600 leading-relaxed font-medium italic border-l-4 border-indigo-200 pl-4">"{insight.summary}"</p>
            </section>

            {insight.tipsToRemember && insight.tipsToRemember.length > 0 && (
              <section className="bg-amber-50 p-5 rounded-[1.5rem] border border-amber-100">
                <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                   Exam Memorization Tips
                </h4>
                <ul className="space-y-2">
                  {insight.tipsToRemember.map((tip, i) => (
                    <li key={i} className="text-sm font-bold text-amber-900 leading-snug">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-4">Best Practices</h4>
              <ul className="space-y-3">
                {insight.bestPractices.map((bp, i) => (
                  <li key={i} className="flex items-start text-slate-700 group">
                    <span className="text-indigo-400 mr-3 mt-0.5 group-hover:scale-125 transition-transform">✦</span>
                    <span className="text-sm font-medium leading-relaxed">{bp}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mb-4">Common Pitfalls</h4>
              <ul className="space-y-3">
                {insight.commonPitfalls.map((cp, i) => (
                  <li key={i} className="flex items-start text-slate-700 group">
                    <span className="text-rose-400 mr-3 mt-0.5 group-hover:animate-pulse text-lg leading-none">⚠</span>
                    <span className="text-sm font-medium leading-relaxed">{cp}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200">
              <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] mb-3">Modern Perspective</h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{insight.modernPerspective}</p>
            </section>
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p className="font-bold">Select a task and click "CONSULT AI" for expert strategy.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightPanel;
