export type Role = 'student' | 'tutor' | 'admin' | 'organizer';

export type Difficulty = 'basic' | 'intermediate' | 'advanced';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  timeLimit: number;
  questions: QuizQuestion[];
  difficulty: Difficulty;
  points: number;
} 