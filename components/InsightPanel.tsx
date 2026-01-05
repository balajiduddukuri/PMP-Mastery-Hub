
import React from 'react';
import { AIInsight, Task, Domain } from '../types';

interface InsightPanelProps {
  task: Task | null;
  domain: Domain | null;
  insight: AIInsight | null;
  loading: boolean;
  onClose: () => void;
}

const InsightPanel: React.FC<InsightPanelProps> = ({ task, domain, insight, loading, onClose }) => {
  if (!task || !domain) return null;

  return (
    <div className={`fixed inset-y-0 right-0 w-full md:w-1/3 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-slate-200 overflow-y-auto ${task ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Expert AI Insights</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="mb-6">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${domain.color}-100 text-${domain.color}-700 uppercase tracking-wider`}>
            {domain.name} Domain
          </span>
          <h3 className="text-xl font-semibold mt-2 text-slate-700">{task.name}</h3>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-slate-500 animate-pulse font-medium">Consulting Senior PM Advisor...</p>
          </div>
        ) : insight ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <section>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Executive Summary</h4>
              <p className="text-slate-600 leading-relaxed italic border-l-4 border-indigo-200 pl-4">"{insight.summary}"</p>
            </section>

            <section>
              <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Best Practices</h4>
              <ul className="space-y-3">
                {insight.bestPractices.map((bp, i) => (
                  <li key={i} className="flex items-start text-slate-600">
                    <span className="text-indigo-500 mr-2">✦</span>
                    <span className="text-sm">{bp}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="text-sm font-bold text-rose-500 uppercase tracking-widest mb-3">Common Pitfalls</h4>
              <ul className="space-y-3">
                {insight.commonPitfalls.map((cp, i) => (
                  <li key={i} className="flex items-start text-slate-600">
                    <span className="text-rose-400 mr-2">⚠</span>
                    <span className="text-sm">{cp}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-2">Modern Perspective (AI/Remote)</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{insight.modernPerspective}</p>
            </section>
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            Select a task to generate insights.
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightPanel;
