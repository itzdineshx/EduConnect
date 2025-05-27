export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'tutor' | 'admin';
  avatar?: string;
  bio?: string;
  subjects?: string[];
  points: number;
  badges: Badge[];
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  earnedAt?: Date;
}

export interface TutorSession {
  id: string;
  tutorId: string;
  studentId: string;
  subject: string;
  date: Date;
  duration: number; // in minutes
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  rating?: number;
}

export interface TutorAvailability {
  id: string;
  tutorId: string;
  dayOfWeek: number; // 0-6, where 0 is Sunday
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  subjects: string[];
}

export interface MindMap {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  collaborators: string[];
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}

export interface MindMapNode {
  id: string;
  label: string;
  position: { x: number; y: number };
  type: 'main' | 'sub' | 'leaf';
  color?: string;
  notes?: string;
}

export interface MindMapEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: string[];
  subject: string;
  capacity: number;
  location?: string;
  isOnline: boolean;
  meetingLink?: string;
  createdAt: Date;
}

export interface StudySession {
  id: string;
  groupId: string;
  title: string;
  date: Date;
  duration: number; // in minutes
  agenda?: string;
  attendees: string[];
  resources?: string[];
  notes?: string;
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: string[];
}

export interface NoteSummary {
  id: string;
  noteId: string;
  title: string;
  content: string;
  createdAt: Date;
  model: string;
  confidence: number;
  summary?: string;
  keyPoints?: string[];
  metadata?: {
    complexity_score: number;
    readability_score: number;
    key_concepts_extracted: number;
    suggested_prerequisites: string[];
    recommended_practice_problems: number;
  };
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  difficulty: 'basic' | 'intermediate' | 'advanced';
  metadata?: {
    confidence_score: number;
    average_completion_time: number;
    success_rate: number;
    related_concepts: string[];
  };
}

export type ModuleType = 'edubridge' | 'mindmap' | 'studybuddy' | 'eduassist';

export interface Module {
  id: ModuleType;
  name: string;
  description: string;
  icon: string;
  path: string;
  color: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  flashcardIds: string[];
  totalQuestions: number;
  timeLimit: number;
  createdAt: Date;
  lastAttemptAt?: Date;
  bestScore?: number;
  difficultyLevel: 'basic' | 'intermediate' | 'advanced';
  topics: string[];
  learningObjectives: string[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  startedAt: Date;
  completedAt: Date;
  answers: QuizAnswer[];
  timeSpent: number;
}

export interface QuizAnswer {
  flashcardId: string;
  isCorrect: boolean;
  userAnswer: string;
  timeSpent: number;
  correctAnswer?: string;
  confidence: 'low' | 'medium' | 'high';
}

export type Language = 'en' | 'ta';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}