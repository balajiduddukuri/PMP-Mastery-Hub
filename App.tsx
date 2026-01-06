
import React, { useState, useMemo, useEffect } from 'react';
import { Domain, Task, Enabler, AIInsight, Question, ExamDifficulty } from './types';
import { DOMAINS } from './constants';
import { getTaskInsights, getSynthesizedTaskInsights, getGlobalExamNotes, generateExamQuestions } from './services/geminiService';
import InsightPanel from './components/InsightPanel';
import ExamModal from './components/ExamModal';
import AIThematicImage from './components/AIThematicImage';

const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight || !highlight.trim()) return <>{text}</>;
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <>{parts.map((part, i) => part.toLowerCase() === highlight.toLowerCase() ? <mark key={i} className="bg-yellow-200 text-slate-900 rounded-sm px-0.5 font-bold shadow-sm ring-1 ring-yellow-300">{part}</mark> : <span key={i}>{part}</span>)}</>
  );
};

const SummaryView: React.FC<{ completedEnablers: Set<string>, searchTerm: string }> = ({ completedEnablers, searchTerm }) => {
  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-[2.5rem] p-0 shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-10 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-3xl font-black text-slate-800 mb-2">Master ECO Intelligence Table</h2>
          <p className="text-slate-500 text-sm font-medium">Complete mapping of all 3 Domains, 26 Tasks, and Enablers.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-4 border-r border-slate-700">Domain</th>
                <th className="px-4 py-4 border-r border-slate-700 text-center">%</th>
                <th className="px-4 py-4 border-r border-slate-700 text-center">T#</th>
                <th className="px-6 py-4 border-r border-slate-700">Task Name</th>
                <th className="px-6 py-4">Enablers & Hooks</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {DOMAINS.map((domain) => (
                <React.Fragment key={domain.id}>
                  {domain.tasks.map((task, taskIdx) => (
                    <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group">
                      {taskIdx === 0 && (
                        <td rowSpan={domain.tasks.length} className="px-6 py-8 align-top border-r border-slate-100 font-black text-slate-400 bg-slate-50/30">
                          <div className={`text-${domain.color}-600 uppercase tracking-tighter leading-none whitespace-nowrap`}>
                            DOMAIN {domain.id === 'people' ? 'I' : domain.id === 'process' ? 'II' : 'III'}
                            <br /><span className="text-lg">{domain.name}</span>
                          </div>
                        </td>
                      )}
                      {taskIdx === 0 && (
                        <td rowSpan={domain.tasks.length} className="px-4 py-8 align-top border-r border-slate-100 text-center font-black text-slate-300">
                          {domain.coverage}%
                        </td>
                      )}
                      <td className="px-4 py-6 align-top border-r border-slate-100 text-center font-bold text-slate-400">
                        {taskIdx + 1}
                      </td>
                      <td className="px-6 py-6 align-top border-r border-slate-100 font-black text-slate-800 max-w-xs">
                        <HighlightText text={task.name} highlight={searchTerm} />
                        {task.hook && (
                          <div className="mt-2 text-[9px] font-black text-amber-500 italic uppercase tracking-widest">Hook: {task.hook}</div>
                        )}
                      </td>
                      <td className="px-6 py-6 align-top">
                        <ul className="space-y-3">
                          {task.enablers.map((enabler) => (
                            <li key={enabler.id} className="flex flex-col gap-0.5">
                              <div className="flex items-start gap-2">
                                <span className={`text-[10px] mt-1 ${completedEnablers.has(enabler.id) ? 'text-indigo-500' : 'text-slate-300'}`}>
                                  {completedEnablers.has(enabler.id) ? '✓' : '○'}
                                </span>
                                <span className={`text-[11px] leading-snug ${completedEnablers.has(enabler.id) ? 'text-indigo-700 font-bold' : 'text-slate-500 font-medium'}`}>
                                  <HighlightText text={enabler.description} highlight={searchTerm} />
                                </span>
                              </div>
                              {enabler.hook && (
                                <span className="pl-5 text-[8px] font-bold text-slate-400 italic">Anchor: {enabler.hook}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(DOMAINS[0]);
  const [selectedContext, setSelectedContext] = useState<{task: Task, domain: Domain, enabler: Enabler | null} | null>(null);
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'explorer' | 'summary'>('explorer');
  const [examQuestions, setExamQuestions] = useState<Question[] | null>(null);
  const [examLoading, setExamLoading] = useState(false);
  const [examDifficulty, setExamDifficulty] = useState<ExamDifficulty>('medium');

  const [completedEnablers, setCompletedEnablers] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('pmp_mastery_progress');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [wrongTaskCounts, setWrongTaskCounts] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('pmp_heatmap_data');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => localStorage.setItem('pmp_mastery_progress', JSON.stringify(Array.from(completedEnablers))), [completedEnablers]);
  useEffect(() => localStorage.setItem('pmp_heatmap_data', JSON.stringify(wrongTaskCounts)), [wrongTaskCounts]);

  const domainStats = useMemo(() => {
    return DOMAINS.map(d => {
      let total = 0, done = 0;
      d.tasks.forEach(t => { total += t.enablers.length; t.enablers.forEach(e => { if (completedEnablers.has(e.id)) done++; })} );
      return { id: d.id, name: d.name, percentage: total === 0 ? 0 : Math.round((done / total) * 100), taskCount: d.tasks.length };
    });
  }, [completedEnablers]);

  const totalStats = useMemo(() => {
    let total = 0, done = 0;
    DOMAINS.forEach(d => d.tasks.forEach(t => { total += t.enablers.length; t.enablers.forEach(e => { if (completedEnablers.has(e.id)) done++; })} ));
    return { total, done, percentage: total === 0 ? 0 : Math.round((done / total) * 100) };
  }, [completedEnablers]);

  const handleFetchEnablerInsight = async (enabler: Enabler, task: Task, domain: Domain) => {
    setSelectedContext({ enabler, task, domain });
    setInsightLoading(true); setInsight(null);
    try { const data = await getTaskInsights(task.name, domain.name, enabler.description); setInsight(data); }
    catch (err) { console.error(err); } finally { setInsightLoading(false); }
  };

  const handleFetchTaskSynthesis = async (task: Task, domain: Domain) => {
    setSelectedContext({ enabler: null, task, domain });
    setInsightLoading(true); setInsight(null);
    try { 
      const data = await getSynthesizedTaskInsights(task.name, domain.name, task.enablers.map(e => e.description)); 
      setInsight(data); 
    }
    catch (err) { console.error(err); } finally { setInsightLoading(false); }
  };

  const handleExamFinish = (failedTaskIds?: string[]) => {
    if (failedTaskIds) {
      setWrongTaskCounts(prev => {
        const next = { ...prev };
        failedTaskIds.forEach(id => next[id] = (next[id] || 0) + 1);
        return next;
      });
    }
    setExamQuestions(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setViewMode('explorer')}>
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-indigo-200">P</div>
            <div><h1 className="text-2xl font-black text-slate-800 leading-none">PMP Mastery</h1><p className="text-[10px] text-slate-400 font-bold uppercase mt-1.5 tracking-widest">Study Intelligence Hub</p></div>
          </div>
          <div className="flex items-center gap-4">
            <input type="text" placeholder="Search ECO..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-4 pr-4 py-2.5 bg-slate-100 border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 w-64" />
            <div className="flex items-center bg-slate-100 rounded-2xl p-1 gap-1">
              {(['easy', 'medium', 'hard'] as ExamDifficulty[]).map(l => (
                <button key={l} onClick={() => setExamDifficulty(l)} className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${examDifficulty === l ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}>{l}</button>
              ))}
            </div>
            <button onClick={() => { setExamLoading(true); generateExamQuestions(DOMAINS.map(d => d.name), examDifficulty).then(setExamQuestions).finally(() => setExamLoading(false)); }} disabled={examLoading} className="px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-black shadow-xl hover:bg-indigo-600 transition-all">{examLoading ? 'LOADING...' : 'EXAM SIM'}</button>
            <button onClick={() => setViewMode(v => v === 'explorer' ? 'summary' : 'explorer')} className="px-6 py-2.5 border-2 border-slate-200 rounded-2xl text-xs font-black hover:border-indigo-600 transition-all uppercase tracking-tight">{viewMode === 'explorer' ? 'Switch to Table' : 'Switch to Explorer'}</button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        {/* Intelligence Dashboard Section */}
        <section className="mb-10 space-y-6">
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
            </div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="flex-1">
                  <h2 className="text-5xl font-black mb-2 tracking-tighter">Overall Mastery</h2>
                  <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Simulated Exam Readiness: {totalStats.percentage}%</p>
                  <div className="w-full max-w-lg h-3 bg-slate-800 rounded-full mt-6 p-0.5 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${totalStats.percentage}%` }}></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  {domainStats.map(stat => (
                    <div key={stat.id} className="bg-slate-800/50 backdrop-blur-md p-6 rounded-3xl border border-slate-700 min-w-[140px] hover:border-indigo-500 transition-all cursor-pointer" onClick={() => { setSelectedDomain(DOMAINS.find(d => d.id === stat.id)!); setViewMode('explorer'); }}>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{stat.name}</span>
                      <span className="text-2xl font-black text-white">{stat.percentage}%</span>
                      <div className="mt-3 flex gap-1">
                        {Array.from({ length: stat.taskCount }).map((_, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full ${stat.percentage > (i / stat.taskCount) * 100 ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]' : 'bg-slate-700'}`}></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {viewMode === 'summary' ? <SummaryView completedEnablers={completedEnablers} searchTerm={searchTerm} /> : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1 space-y-6">
              {DOMAINS.map(domain => (
                <button key={domain.id} onClick={() => setSelectedDomain(domain)} className={`w-full text-left p-6 rounded-3xl border-2 transition-all ${selectedDomain?.id === domain.id ? `bg-white border-${domain.color}-500 shadow-2xl` : 'bg-white border-transparent hover:border-slate-200'}`}>
                  <div className="flex justify-between items-center mb-1"><span className="text-sm font-black">{domain.name}</span><span className="text-[10px] font-black text-slate-400">{domain.coverage}%</span></div>
                  <p className="text-xs text-slate-400 line-clamp-2">{domain.description}</p>
                </button>
              ))}
              <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Weakness Heatmap</h4>
                <p className="text-xs font-medium text-slate-400 leading-relaxed">Tasks in <span className="text-rose-400 font-bold">ROSE</span> indicate repeated simulation failures.</p>
              </div>
            </aside>

            <section className="lg:col-span-3 space-y-8">
              {selectedDomain?.tasks.map((task, idx) => {
                const isWeak = (wrongTaskCounts[task.id] || 0) > 1;
                return (
                  <div key={task.id} className={`bg-white rounded-[2rem] p-0 border-2 transition-all overflow-hidden ${isWeak ? 'border-rose-200 bg-rose-50/10' : 'border-slate-100'}`}>
                    {/* Cinematic Header with AI Image */}
                    <div className="relative h-48">
                      <AIThematicImage 
                        id={task.id} 
                        prompt={task.imagePrompt || task.name} 
                        className="w-full h-full" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
                    </div>
                    
                    <div className="p-8 -mt-16 relative z-10">
                      <div className="flex flex-col gap-1 mb-6">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <span className="text-3xl font-black text-slate-200 italic">{(idx + 1).toString().padStart(2, '0')}</span>
                            <div className="flex items-center gap-3">
                              <h3 className="text-2xl font-black text-slate-800">
                                {task.name}
                                {isWeak && <span className="ml-2 text-[10px] bg-rose-500 text-white px-3 py-1 rounded-full uppercase">Review Priority</span>}
                              </h3>
                              <button 
                                onClick={() => handleFetchTaskSynthesis(task, selectedDomain!)}
                                title="Generate Task Synthesis"
                                className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" /></svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        {task.hook && (
                          <span className="text-xs font-black text-amber-500 italic uppercase tracking-widest flex items-center gap-1 pl-12">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.464 15.05a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0z"></path></svg>
                            Hook: {task.hook}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-12">
                        {task.enablers.map(e => (
                          <div key={e.id} className={`flex items-start justify-between p-5 rounded-3xl border-2 transition-all ${completedEnablers.has(e.id) ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-transparent'}`}>
                            <div className="flex flex-col gap-3 cursor-pointer flex-1" onClick={() => setCompletedEnablers(prev => { const n = new Set(prev); if (n.has(e.id)) n.delete(e.id); else n.add(e.id); return n; })}>
                              <div className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${completedEnablers.has(e.id) ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'}`}>{completedEnablers.has(e.id) && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}</div>
                                <span className="text-sm font-bold text-slate-700 leading-tight">{e.description}</span>
                              </div>
                              <div className="flex gap-4 items-center pl-10">
                                <AIThematicImage 
                                  id={e.id} 
                                  prompt={e.imagePrompt || e.description} 
                                  className="w-12 h-12 rounded-xl flex-shrink-0 border border-slate-200 shadow-sm" 
                                />
                                {e.hook && (
                                  <span className="text-[10px] font-bold text-slate-400 italic">
                                    Anchor: {e.hook}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button onClick={() => handleFetchEnablerInsight(e, task, selectedDomain!)} className="p-2 bg-white rounded-xl text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm transition-all flex-shrink-0 ml-2 mt-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        )}
      </main>

      <InsightPanel enabler={selectedContext?.enabler || null} task={selectedContext?.task || null} domain={selectedContext?.domain || null} initialInsight={insight} loading={insightLoading} onClose={() => setSelectedContext(null)} />
      {examQuestions && <ExamModal questions={examQuestions} difficulty={examDifficulty} onClose={handleExamFinish} />}
    </div>
  );
};

export default App;
