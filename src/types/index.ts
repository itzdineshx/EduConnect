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
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteSummary {
  id: string;
  noteId: string;
  summary: string;
  keyPoints: string[];
  flashcards: Flashcard[];
  createdAt: Date;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  tags: string[];
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