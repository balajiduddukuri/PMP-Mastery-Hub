
import React, { useState, useEffect } from 'react';
import { Question, ExamSession, ExamDifficulty } from '../types';

interface ExamModalProps {
  questions: Question[];
  difficulty: ExamDifficulty;
  onClose: (wrongTaskIds?: string[]) => void;
}

const ExamModal: React.FC<ExamModalProps> = ({ questions, difficulty, onClose }) => {
  const [session, setSession] = useState<ExamSession>({
    questions,
    currentIndex: 0,
    answers: new Array(questions.length).fill(null),
    flaggedIndexes: new Set<number>(),
    isFinished: false,
    difficulty,
    startTime: Date.now(),
    mindsetAudited: false
  });
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questions.length * 75);
  const [wrongTasks, setWrongTasks] = useState<string[]>([]);

  useEffect(() => {
    if (session.isFinished || !session.mindsetAudited) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) { setSession(s => ({ ...s, isFinished: true })); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [session.isFinished, session.mindsetAudited]);

  if (!session.mindsetAudited) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6">
        <div className="bg-white w-full max-w-xl rounded-[3rem] p-12 shadow-2xl">
          <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Exam Day Mindset Audit</h2>
          <p className="text-slate-500 font-medium mb-8">Author's Tip: You are a Servant Leader. Do not pick options where you "fire someone" or "tell them to just do it."</p>
          <div className="space-y-4 mb-10">
            {[
              "I am a Servant Leader, not a Dictator.",
              "I prioritize Business Value over rigid plans.",
              "I always seek to solve root causes.",
              "I embrace Agile and Hybrid mentalities."
            ].map((text, i) => (
              <label key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-indigo-50 transition-colors">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500" required />
                <span className="text-sm font-bold text-slate-700">{text}</span>
              </label>
            ))}
          </div>
          <button 
            onClick={() => setSession(s => ({ ...s, mindsetAudited: true }))}
            className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-slate-900 transition-all"
          >
            START SIMULATION
          </button>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = session.questions[session.currentIndex];
  const isCorrect = currentQuestion ? selectedOption === currentQuestion.correctAnswerIndex : false;

  const handleNext = () => {
    const nextIndex = session.currentIndex + 1;
    const isFinished = nextIndex >= session.questions.length;
    if (isFinished) {
      setSession(prev => ({ ...prev, isFinished: true }));
    } else {
      setSession(prev => ({ ...prev, currentIndex: nextIndex }));
      setSelectedOption(session.answers[nextIndex]);
      setShowFeedback(false);
    }
  };

  const handleConfirm = () => {
    const newAnswers = [...session.answers];
    newAnswers[session.currentIndex] = selectedOption;
    if (!isCorrect && currentQuestion.taskId) {
      setWrongTasks(prev => [...prev, currentQuestion.taskId!]);
    }
    setSession(prev => ({ ...prev, answers: newAnswers }));
    setShowFeedback(true);
  };

  if (session.isFinished) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6">
        <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl text-center">
          <h2 className="text-4xl font-black text-slate-800 mb-8">Simulation Report</h2>
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-slate-50 p-6 rounded-3xl">
              <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Score</span>
              <span className="text-3xl font-black text-slate-800">
                {Math.round((session.answers.filter((ans, idx) => ans === session.questions[idx].correctAnswerIndex).length / questions.length) * 100)}%
              </span>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl">
              <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Time Remaining</span>
              <span className="text-3xl font-black text-indigo-600">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <button 
            onClick={() => onClose(wrongTasks)}
            className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl"
          >
            SYNC DATA & CLOSE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        <div className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center">
           <div className="flex items-center gap-6">
              <span className="text-lg font-black">{session.currentIndex + 1} / {questions.length}</span>
              <span className={`text-lg font-black ${timeLeft < 60 ? 'text-rose-500 animate-pulse' : 'text-indigo-400'}`}>
                {formatTime(timeLeft)}
              </span>
           </div>
           <button onClick={() => onClose()} className="p-2 text-slate-400 hover:text-white transition-colors">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
           </button>
        </div>

        <div className="p-8 md:p-12 overflow-y-auto flex-1 space-y-8 bg-slate-50">
          <p className="text-2xl font-black text-slate-800 leading-tight">{currentQuestion.question}</p>
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !showFeedback && setSelectedOption(idx)}
                className={`text-left p-6 rounded-[1.5rem] transition-all border-2 ${
                  selectedOption === idx ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-600' : 'bg-white border-slate-200'
                } ${showFeedback ? (idx === currentQuestion.correctAnswerIndex ? 'border-emerald-500 bg-emerald-50' : 'opacity-40') : ''}`}
              >
                <span className="text-base font-bold">{option}</span>
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="p-8 bg-white rounded-3xl border-2 border-slate-100 shadow-sm">
              <h4 className="text-xs font-black uppercase text-indigo-400 mb-2">PMP Mindset Analysis</h4>
              <p className="text-sm font-medium text-slate-600 italic leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-slate-100 bg-white flex justify-end gap-4">
          {!showFeedback ? (
            <button onClick={handleConfirm} disabled={selectedOption === null} className="px-12 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-600 disabled:opacity-20">SUBMIT ANALYSIS</button>
          ) : (
            <button onClick={handleNext} className="px-12 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-slate-900">PROCEED</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamModal;
