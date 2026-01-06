
export interface Enabler {
  id: string;
  description: string;
  hook?: string; // Memory anchor
}

export interface Task {
  id: string;
  name: string;
  enablers: Enabler[];
  hook?: string; // Memory anchor
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  color: string;
  coverage: number;
}

export interface AIInsight {
  summary: string;
  bestPractices: string[];
  commonPitfalls: string[];
  modernPerspective: string;
  tipsToRemember: string[];
  mnemonic?: string;
  ittos?: {
    inputs: string[];
    tools: string[];
    outputs: string[];
  };
  interconnectivity?: string;
  debugPrompt?: string;
}

export type ExamDifficulty = 'easy' | 'medium' | 'hard';
export type ProjectLifecycle = 'predictive' | 'agile' | 'hybrid';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  domain: string;
  taskId?: string; // For heatmap tracking
}

export interface ExamSession {
  questions: Question[];
  currentIndex: number;
  answers: (number | null)[];
  flaggedIndexes: Set<number>;
  isFinished: boolean;
  difficulty: ExamDifficulty;
  startTime: number;
  mindsetAudited: boolean;
}

export interface UserPerformance {
  wrongTaskIds: Record<string, number>;
  completedEnablers: string[];
}
