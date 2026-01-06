
import React, { useState, useMemo, useEffect } from 'react';
import { Domain, Task, Enabler, AIInsight } from './types';
import { DOMAINS } from './constants';
import { getTaskInsights, getSynthesizedTaskInsights, getGlobalExamNotes } from './services/geminiService';
import InsightPanel from './components/InsightPanel';

/**
 * Helper component to highlight search terms within a string.
 */
const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <>{text}</>;
  }
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => (
        regex.test(part) ? (
          <span key={i} className="bg-indigo-100 text-indigo-900 rounded-sm px-0.5 ring-1 ring-indigo-200">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      ))}
    </>
  );
};

const SummaryView: React.FC<{ completedEnablers: Set<string> }> = ({ completedEnablers }) => {
  const [globalNotes, setGlobalNotes] = useState<{notes: string[], mindset: string} | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const data = await getGlobalExamNotes();
        setGlobalNotes(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const calculateDomainStats = (domain: Domain) => {
    const totalEnablers = domain.tasks.reduce((acc, t) => acc + t.enablers.length, 0);
    const completedEnablersCount = domain.tasks.reduce((acc, t) => 
      acc + t.enablers.filter(e => completedEnablers.has(e.id)).length, 0);
    const progress = totalEnablers === 0 ? 0 : Math.round((completedEnablersCount / totalEnablers) * 100);
    return { progress, totalTasks: domain.tasks.length };
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      {/* Master ECO Index Summary Table */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Master ECO Index</h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Strategic Overview & Exam Weighting</p>
          </div>
          <div className="bg-indigo-50 px-6 py-3 rounded-3xl border border-indigo-100">
            <span className="text-[10px] font-black text-indigo-400 uppercase block mb-1">Total Tasks</span>
            <span className="text-xl font-black text-indigo-600">{DOMAINS.reduce((acc, d) => acc + d.tasks.length, 0)} Units</span>
          </div>
        </div>

        {/* High-Level Statistics Grid (Matching user reference) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {DOMAINS.map(domain => {
            const { progress, totalTasks } = calculateDomainStats(domain);
            return (
              <div key={domain.id} className={`p-6 rounded-[2rem] border-2 transition-all duration-300 bg-white border-${domain.color}-50 hover:shadow-xl hover:shadow-${domain.color}-100/30`}>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-${domain.color}-100 text-${domain.color}-600`}>
                    Domain {domain.id === 'people' ? 'I' : domain.id === 'process' ? 'II' : 'III'}
                  </span>
                  <span className="text-xl font-black text-slate-400">{domain.coverage}% <span className="text-[10px]">Exam Coverage</span></span>
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">{domain.name}</h3>
                <div className="flex items-end justify-between gap-4 mt-6">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Task Count</span>
                    <span className="text-lg font-black text-slate-700">{totalTasks} Tasks</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Mastery</span>
                    <span className={`text-2xl font-black text-${domain.color}-500`}>{progress}%</span>
                  </div>
                </div>
                <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`h-full bg-${domain.color}-500 transition-all duration-1000 ease-out rounded-full`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {DOMAINS.map(domain => (
            <div key={domain.id} className="space-y-6">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full bg-${domain.color}-500 shadow-lg shadow-${domain.color}-200`}></span>
                <h3 className="text-xl font-black text-slate-700 uppercase tracking-tighter">{domain.name}</h3>
              </div>
              <div className="space-y-6 pl-6 border-l-2 border-slate-100">
                {domain.tasks.map(task => (
                  <div key={task.id} className="space-y-2">
                    <h4 className="text-sm font-black text-slate-800 leading-tight">{task.name}</h4>
                    <ul className="space-y-1">
                      {task.enablers.map(enabler => (
                        <li key={enabler.id} className="flex items-start gap-2 group">
                          <span className={`text-[8px] mt-1.5 ${completedEnablers.has(enabler.id) ? 'text-indigo-500' : 'text-slate-300'}`}>●</span>
                          <span className={`text-[11px] leading-tight font-medium ${completedEnablers.has(enabler.id) ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
                            {enabler.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
              <span className="p-2 bg-indigo-500 rounded-2xl text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
              </span>
              Key Exam Notes
            </h2>
            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[...Array(7)].map((_, i) => <div key={i} className="h-4 bg-slate-800 rounded-full w-full"></div>)}
              </div>
            ) : (
              <ul className="space-y-4">
                {globalNotes?.notes.map((note, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-black group-hover:bg-indigo-500 transition-colors">0{i+1}</span>
                    <p className="text-slate-300 font-medium leading-relaxed group-hover:text-white transition-colors">{note}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col justify-center">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400 mb-4">Master Mindset</h3>
            <p className="text-2xl font-black text-indigo-100 leading-tight tracking-tight">
              {loading ? "Aligning strategic mindset..." : globalNotes?.mindset}
            </p>
            <div className="mt-8 pt-8 border-t border-white/10 text-slate-400 text-xs font-medium">
              "Don't memorize tools. Understand <span className="text-white font-bold italic underline decoration-indigo-500">Value Delivery</span> and <span className="text-white font-bold italic underline decoration-indigo-500">Servant Leadership</span>."
            </div>
          </div>
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
  
  const STORAGE_KEY = 'pmp_mastery_progress';

  const [completedEnablers, setCompletedEnablers] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
      console.error("Failed to load progress", e);
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completedEnablers)));
  }, [completedEnablers]);

  const handleToggleEnabler = (id: string) => {
    setCompletedEnablers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredTasks = useMemo(() => {
    if (!selectedDomain) return [];
    return selectedDomain.tasks.filter(task => 
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.enablers.some(e => e.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [selectedDomain, searchTerm]);

  const handleFetchEnablerInsight = async (enabler: Enabler, task: Task, domain: Domain) => {
    setSelectedContext({ enabler, task, domain });
    setInsightLoading(true);
    setInsight(null);
    try {
      const data = await getTaskInsights(task.name, domain.name, enabler.description);
      setInsight(data);
    } catch (err) {
      console.error(err);
    } finally {
      setInsightLoading(false);
    }
  };

  const handleFetchTaskSynthesis = async (task: Task, domain: Domain) => {
    const selectedSubtasks = task.enablers
      .filter(e => completedEnablers.has(e.id))
      .map(e => e.description);

    if (selectedSubtasks.length === 0) {
      alert("Please select (check) at least one sub-task to synthesize.");
      return;
    }

    setSelectedContext({ enabler: null, task, domain });
    setInsightLoading(true);
    setInsight(null);
    try {
      const data = await getSynthesizedTaskInsights(task.name, domain.name, selectedSubtasks);
      setInsight(data);
    } catch (err) {
      console.error(err);
    } finally {
      setInsightLoading(false);
    }
  };

  const calculateDomainProgress = (domain: Domain) => {
    const total = domain.tasks.reduce((acc, t) => acc + t.enablers.length, 0);
    const completed = domain.tasks.reduce((acc, t) => 
      acc + t.enablers.filter(e => completedEnablers.has(e.id)).length, 0);
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const totalStats = useMemo(() => {
    let totalEnablers = 0;
    let completedCount = 0;
    DOMAINS.forEach(d => {
      d.tasks.forEach(t => {
        totalEnablers += t.enablers.length;
        t.enablers.forEach(e => {
          if (completedEnablers.has(e.id)) completedCount++;
        });
      });
    });
    const percentage = totalEnablers === 0 ? 0 : Math.round((completedCount / totalEnablers) * 100);
    return { totalEnablers, completedCount, percentage };
  }, [completedEnablers]);

  const colorMap: Record<string, string> = {
    indigo: 'indigo',
    sky: 'sky',
    emerald: 'emerald'
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setViewMode('explorer')}>
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-indigo-200 transform transition-transform hover:scale-105">
              P
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none">PMP Mastery</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5">Study Intelligence Hub</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <input 
                type="text" 
                placeholder="Find a task or sub-task..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-100 border-transparent rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all placeholder-slate-400 border border-slate-100 focus:shadow-lg focus:shadow-indigo-50"
              />
              <svg className="absolute left-4 top-3 w-4.5 h-4.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <button 
              onClick={() => setViewMode(viewMode === 'explorer' ? 'summary' : 'explorer')}
              className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all border-2 flex items-center gap-2 ${
                viewMode === 'summary' 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              {viewMode === 'summary' ? 'BACK TO EXPLORER' : 'MASTER SUMMARY'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        {viewMode === 'summary' ? (
          <SummaryView completedEnablers={completedEnablers} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="space-y-3">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] px-2">ECO Domains</h2>
                {DOMAINS.map(domain => {
                  const isActive = selectedDomain?.id === domain.id;
                  const progress = calculateDomainProgress(domain);
                  const color = colorMap[domain.color] || 'slate';
                  
                  return (
                    <button
                      key={domain.id}
                      onClick={() => setSelectedDomain(domain)}
                      className={`w-full text-left p-5 rounded-3xl transition-all duration-300 border-2 group relative overflow-hidden ${
                        isActive 
                          ? `bg-white border-${color}-500 shadow-2xl shadow-${color}-100 scale-[1.02]` 
                          : `bg-white border-transparent hover:border-slate-200 text-slate-600 hover:shadow-lg`
                      }`}
                    >
                      <div className="relative z-10">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className={`text-sm font-black tracking-tight ${isActive ? `text-${color}-600` : 'text-slate-700'}`}>
                            {domain.name}
                          </span>
                          <span className={`text-[10px] font-black ${isActive ? `text-${color}-500` : 'text-slate-400'}`}>{progress}%</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium line-clamp-2">{domain.description}</p>
                        <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-${color}-500 transition-all duration-1000 ease-out rounded-full`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] text-white shadow-xl">
                 <div className="flex items-center gap-2 mb-3">
                    <span className="p-1 bg-amber-400 rounded-md text-slate-900">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.464 15.05a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0z"></path></svg>
                    </span>
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Exam Strategy</h3>
                 </div>
                 <p className="text-sm leading-relaxed text-slate-200">
                   "Situational questions dominate. Focus on <strong>Servant Leadership</strong> and <strong>Value Delivery</strong> rather than rigid tools."
                 </p>
              </div>
            </aside>

            {/* Main Task List */}
            <section className="lg:col-span-3 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative z-10 text-center md:text-left">
                  <h2 className="text-4xl font-black text-slate-800 leading-tight">Overall Mastery</h2>
                  <p className="text-slate-500 font-medium mt-1">Your journey toward PMP Certification.</p>
                  <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="px-4 py-2 bg-slate-100 rounded-2xl">
                      <span className="block text-[10px] font-black text-slate-400 uppercase">Items Mastered</span>
                      <span className="text-lg font-black text-slate-700">{totalStats.completedCount} / {totalStats.totalEnablers}</span>
                    </div>
                    <div className="px-4 py-2 bg-indigo-50 rounded-2xl">
                      <span className="block text-[10px] font-black text-indigo-400 uppercase">Ready Status</span>
                      <span className="text-lg font-black text-indigo-600">{totalStats.percentage >= 80 ? 'EXAM READY' : 'PREPARING'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-full relative z-10">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-5xl font-black text-indigo-600">{totalStats.percentage}<span className="text-2xl text-indigo-300">%</span></span>
                    <span className="text-xs font-bold text-slate-400 uppercase mb-2">Completion Rate</span>
                  </div>
                  <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner p-1">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${totalStats.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {!selectedDomain ? (
                <div className="py-20 text-center text-slate-400">
                   <p className="font-medium">Select a domain from the sidebar to continue.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-end px-2">
                    <div>
                      <h2 className="text-2xl font-black text-slate-800">{selectedDomain.name} <span className="text-slate-300">Detailed Tasks</span></h2>
                    </div>
                    <div className="bg-slate-100 px-4 py-2 rounded-2xl">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Focus Areas</span>
                      <span className="text-sm font-black text-slate-800">{filteredTasks.length} Units</span>
                    </div>
                  </div>

                  {filteredTasks.map(task => {
                    const selectedCount = task.enablers.filter(e => completedEnablers.has(e.id)).length;
                    return (
                      <div key={task.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                          <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight max-w-xl">
                            <HighlightText text={task.name} highlight={searchTerm} />
                          </h3>
                          <button 
                            onClick={() => handleFetchTaskSynthesis(task, selectedDomain)}
                            disabled={selectedCount === 0}
                            className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 text-[11px] font-black rounded-2xl transition-all shadow-lg ${
                              selectedCount > 0 
                              ? 'bg-indigo-600 text-white hover:bg-slate-900 hover:scale-105 active:scale-95 shadow-indigo-100' 
                              : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
                            }`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            SYNTHESIZE {selectedCount} SELECTED
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {task.enablers.map(enabler => {
                            const isCompleted = completedEnablers.has(enabler.id);
                            const color = colorMap[selectedDomain.color] || 'indigo';
                            return (
                              <div 
                                key={enabler.id}
                                className={`group flex items-center justify-between gap-4 p-5 rounded-3xl transition-all border-2 ${
                                  isCompleted 
                                    ? `bg-${color}-50/50 border-${color}-100` 
                                    : 'bg-slate-50 border-transparent hover:border-slate-200 hover:bg-white'
                                }`}
                              >
                                <div 
                                  onClick={() => handleToggleEnabler(enabler.id)}
                                  className="flex items-start gap-4 cursor-pointer flex-1"
                                >
                                  <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all ${
                                    isCompleted 
                                      ? `bg-${color}-500 border-${color}-500 shadow-lg shadow-${color}-200` 
                                      : 'border-slate-300 bg-white'
                                  }`}>
                                    {isCompleted && (
                                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    )}
                                  </div>
                                  <p className={`text-sm leading-relaxed font-bold ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                    <HighlightText text={enabler.description} highlight={searchTerm} />
                                  </p>
                                </div>
                                <button 
                                  onClick={() => handleFetchEnablerInsight(enabler, task, selectedDomain)}
                                  title="Get AI Insight for this specific sub-task"
                                  className="flex-shrink-0 p-2.5 rounded-xl bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:shadow-lg transition-all transform active:scale-95 group-hover:scale-105"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      <InsightPanel 
        enabler={selectedContext?.enabler || null}
        task={selectedContext?.task || null} 
        domain={selectedContext?.domain || null}
        insight={insight}
        loading={insightLoading}
        onClose={() => {
          setSelectedContext(null);
          setInsight(null);
        }}
      />
    </div>
  );
};

export default App;
