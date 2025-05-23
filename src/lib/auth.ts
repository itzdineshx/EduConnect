import { create } from 'zustand';

export type UserRole = 'student' | 'tutor' | 'organizer';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
  bio?: string;
  subjects?: string[];
  points: number;
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const USERS = [
  { 
    id: '1',
    email: 'anu@edu.com', 
    password: 'anu@8892', 
    role: 'student' as const, 
    name: 'Anu',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Junior studying Computer Science',
    subjects: ['Mathematics', 'Computer Science'],
    points: 120
  },
  { 
    id: '2',
    email: 'dinesh@edu.com', 
    password: 'dinesh@8892', 
    role: 'tutor' as const, 
    name: 'Dinesh',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'PhD candidate in Physics with 3 years of teaching experience',
    subjects: ['Physics', 'Mathematics'],
    points: 450
  },
  { 
    id: '3',
    email: 'rogan@edu.com', 
    password: 'rogan@8892', 
    role: 'organizer' as const, 
    name: 'Rogan',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Education platform organizer with 5+ years experience',
    subjects: ['Business', 'Economics'],
    points: 320
  }
];

export const useAuth = create<AuthState>((set) => ({
  user: null,
  login: async (email: string, password: string) => {
    const user = USERS.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      set({ user: userWithoutPassword });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null }),
}));