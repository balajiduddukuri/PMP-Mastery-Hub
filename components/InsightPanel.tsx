
import React, { useState, useEffect } from 'react';
import { AIInsight, Task, Domain, Enabler, ProjectLifecycle } from '../types';
import { getTaskInsights, getSynthesizedTaskInsights } from '../services/geminiService';
import VoiceCoachModal from './VoiceCoachModal';

interface InsightPanelProps {
  enabler: Enabler | null;
  task: Task | null;
  domain: Domain | null;
  initialInsight: AIInsight | null;
  loading: boolean;
  onClose: () => void;
}

const InsightPanel: React.FC<InsightPanelProps> = ({ enabler, task, domain, initialInsight, loading: initialLoading, onClose }) => {
  const [lifecycle, setLifecycle] = useState<ProjectLifecycle>('hybrid');
  const [insight, setInsight] = useState<AIInsight | null>(initialInsight);
  const [loading, setLoading] = useState(initialLoading);
  const [showVoiceCoach, setShowVoiceCoach] = useState(false);

  useEffect(() => { setInsight(initialInsight); setLoading(initialLoading); }, [initialInsight, initialLoading]);

  const refreshWithLifecycle = async (newLifecycle: ProjectLifecycle) => {
    if (!task || !domain) return;
    setLifecycle(newLifecycle);
    setLoading(true);
    try {
      let data;
      if (enabler) {
        data = await getTaskInsights(task.name, domain.name, enabler.description, newLifecycle);
      } else {
        data = await getSynthesizedTaskInsights(task.name, domain.name, task.enablers.map(e => e.description), newLifecycle);
      }
      setInsight(data);
    } finally {
      setLoading(false);
    }
  };

  if (!task || !domain || (!enabler && !loading && !insight && !initialLoading)) return null;

  const isSynthesis = !enabler && !!insight;

  return (
    <div className={`fixed inset-y-0 right-0 w-full md:w-2/5 bg-white shadow-2xl z-50 transform transition-transform duration-300 border-l border-slate-200 overflow-y-auto ${task ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <h2 className="text-2xl font-black text-slate-800">
              {isSynthesis ? 'Strategic Synthesis' : 'ECO Mastery Drill'}
            </h2>
            {isSynthesis && <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Multi-Enabler View</span>}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex gap-2 mb-8 p-1 bg-slate-100 rounded-2xl">
          {(['predictive', 'agile', 'hybrid'] as ProjectLifecycle[]).map(l => (
            <button key={l} onClick={() => refreshWithLifecycle(l)} className={`flex-1 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${lifecycle === l ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}>{l}</button>
          ))}
        </div>

        <div className="mb-6 space-y-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Focusing On:</span>
          <p className="text-lg font-black text-slate-800 leading-tight">
            {enabler ? enabler.description : task.name}
          </p>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-slate-400 font-black text-xs uppercase">Consulting PMBOK 7...</p>
          </div>
        ) : insight ? (
          <div className="space-y-10 pb-20">
            <div className="p-6 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
               <span className="text-[10px] font-black opacity-60 uppercase block mb-1">Mnemonic Anchor</span>
               <p className="text-2xl font-black tracking-tight">{insight.mnemonic}</p>
            </div>

            <button onClick={() => setShowVoiceCoach(true)} className="w-full p-6 bg-slate-900 rounded-3xl text-left border-2 border-slate-800 hover:border-indigo-500 transition-all group flex items-center gap-4">
               <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"></path></svg></div>
               <div><h4 className="text-white font-black text-sm uppercase">Start Voice Coach</h4><p className="text-slate-400 text-xs">Simulate Stakeholder Crisis</p></div>
            </button>

            <section className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
              <h4 className="text-[10px] font-black text-slate-400 uppercase mb-3">ITTO Relationship Explorer (Traditional)</h4>
              <div className="space-y-4">
                {['inputs', 'tools', 'outputs'].map(type => (
                  <div key={type}>
                    <span className="text-[9px] font-black text-indigo-400 uppercase">{type}</span>
                    <p className="text-xs font-bold text-slate-600 leading-tight">{(insight.ittos as any)[type]?.join(', ') || 'N/A'}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-[10px] font-black text-slate-800 uppercase mb-3">Domain Interconnectivity</h4>
              <p className="text-sm font-medium text-slate-600 leading-relaxed bg-amber-50 p-4 rounded-2xl border border-amber-100">{insight.interconnectivity}</p>
            </section>

            <section>
              <h4 className="text-[10px] font-black text-indigo-600 uppercase mb-4">Strategic Mastery</h4>
              <ul className="space-y-4">
                {insight.bestPractices.map((bp, i) => (
                  <li key={i} className="flex gap-4 items-start"><span className="w-6 h-6 bg-indigo-50 rounded-lg flex items-center justify-center text-[10px] font-black text-indigo-600">{i+1}</span><span className="text-sm font-bold text-slate-700">{bp}</span></li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}
      </div>
      {showVoiceCoach && <VoiceCoachModal context={enabler?.description || task.name} onClose={() => setShowVoiceCoach(false)} />}
    </div>
  );
};

export default InsightPanel;
