
import React, { useState, useMemo, useEffect } from 'react';
import { Domain, Task, Enabler, AIInsight } from './types';
import { DOMAINS } from './constants';
import { getTaskInsights, getSynthesizedTaskInsights } from './services/geminiService';
import InsightPanel from './components/InsightPanel';

const App: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(DOMAINS[0]);
  const [selectedContext, setSelectedContext] = useState<{task: Task, domain: Domain, enabler: Enabler | null} | null>(null);
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Persistence Key
  const STORAGE_KEY = 'pmp_mastery_progress';

  // Initialize state from localStorage
  const [completedEnablers, setCompletedEnablers] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
      console.error("Failed to load progress", e);
      return new Set();
    }
  });

  // Sync with localStorage
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
          <div className="flex items-center gap-4">
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
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
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

        {/* Main Content */}
        <section className="lg:col-span-3 space-y-8">
          {/* Global Mastery Card */}
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
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight max-w-xl">{task.name}</h3>
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
                                {enabler.description}
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
              
              {filteredTasks.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-slate-400 font-bold">No tasks found matching "{searchTerm}"</p>
                  <button onClick={() => setSearchTerm('')} className="mt-4 px-6 py-2 bg-indigo-600 text-white text-xs font-black rounded-full shadow-lg">RESET SEARCH</button>
                </div>
              )}
            </div>
          )}
        </section>
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
