
export interface Enabler {
  id: string;
  description: string;
}

export interface Task {
  id: string;
  name: string;
  enablers: Enabler[];
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  color: string;
}

export interface AIInsight {
  summary: string;
  bestPractices: string[];
  commonPitfalls: string[];
  modernPerspective: string;
}
