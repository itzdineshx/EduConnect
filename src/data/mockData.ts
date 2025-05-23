import { User, Badge, TutorSession, TutorAvailability, MindMap, StudyGroup, StudySession, Note, NoteSummary, Module } from '../types';
import { 
  BookOpen, Users, Network, FileText, 
  Award, Clock, Calendar, MapPin, 
  Video, Mail, Star 
} from 'lucide-react';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Junior studying Computer Science',
    subjects: ['Mathematics', 'Computer Science'],
    points: 120,
    badges: [
      {
        id: 'b1',
        name: 'Fast Learner',
        description: 'Completed 5 sessions in a week',
        icon: 'award',
        criteria: 'Complete 5 sessions in a week',
        earnedAt: new Date('2023-12-15')
      }
    ],
    createdAt: new Date('2023-10-01')
  },
  {
    id: '2',
    name: 'Samantha Lee',
    email: 'samantha@example.com',
    role: 'tutor',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'PhD candidate in Physics with 3 years of teaching experience',
    subjects: ['Physics', 'Mathematics'],
    points: 450,
    badges: [
      {
        id: 'b2',
        name: 'Super Tutor',
        description: 'Helped 20 students',
        icon: 'star',
        criteria: 'Help 20 students',
        earnedAt: new Date('2023-11-10')
      }
    ],
    createdAt: new Date('2023-09-15')
  },
  {
    id: '3',
    name: 'David Wilson',
    email: 'david@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Sophomore majoring in Business',
    subjects: ['Economics', 'Business'],
    points: 80,
    badges: [],
    createdAt: new Date('2023-10-10')
  },
  {
    id: '4',
    name: 'Emily Chen',
    email: 'emily@example.com',
    role: 'tutor',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Masters in Literature, passionate about helping others',
    subjects: ['English Literature', 'Writing'],
    points: 320,
    badges: [],
    createdAt: new Date('2023-08-20')
  }
];

export const mockTutorSessions: TutorSession[] = [
  {
    id: 't1',
    tutorId: '2',
    studentId: '1',
    subject: 'Physics',
    date: new Date('2024-04-15T14:00:00'),
    duration: 60,
    status: 'scheduled',
    notes: 'Focusing on quantum mechanics concepts'
  },
  {
    id: 't2',
    tutorId: '4',
    studentId: '3',
    subject: 'English Literature',
    date: new Date('2024-04-16T10:30:00'),
    duration: 45,
    status: 'scheduled',
    notes: 'Essay review session'
  },
  {
    id: 't3',
    tutorId: '2',
    studentId: '1',
    subject: 'Mathematics',
    date: new Date('2024-04-10T15:00:00'),
    duration: 60,
    status: 'completed',
    notes: 'Calculus review',
    rating: 5
  }
];

export const mockTutorAvailabilities: TutorAvailability[] = [
  {
    id: 'a1',
    tutorId: '2',
    dayOfWeek: 1, // Monday
    startTime: '14:00',
    endTime: '18:00',
    subjects: ['Physics', 'Mathematics']
  },
  {
    id: 'a2',
    tutorId: '2',
    dayOfWeek: 3, // Wednesday
    startTime: '13:00',
    endTime: '17:00',
    subjects: ['Physics']
  },
  {
    id: 'a3',
    tutorId: '4',
    dayOfWeek: 2, // Tuesday
    startTime: '10:00',
    endTime: '15:00',
    subjects: ['English Literature', 'Writing']
  }
];

export const mockMindMaps: MindMap[] = [
  {
    id: 'm1',
    title: 'Introduction to Physics',
    description: 'Core concepts in physics',
    ownerId: '2',
    collaborators: ['1'],
    nodes: [
      {
        id: 'n1',
        label: 'Physics',
        position: { x: 300, y: 200 },
        type: 'main'
      },
      {
        id: 'n2',
        label: 'Mechanics',
        position: { x: 150, y: 300 },
        type: 'sub'
      },
      {
        id: 'n3',
        label: 'Electromagnetism',
        position: { x: 450, y: 300 },
        type: 'sub'
      }
    ],
    edges: [
      {
        id: 'e1',
        source: 'n1',
        target: 'n2'
      },
      {
        id: 'e2',
        source: 'n1',
        target: 'n3'
      }
    ],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-10'),
    isPublic: true
  },
  {
    id: 'm2',
    title: 'Literary Analysis Framework',
    description: 'Framework for analyzing literature',
    ownerId: '4',
    collaborators: ['3'],
    nodes: [
      {
        id: 'n1',
        label: 'Literary Analysis',
        position: { x: 300, y: 200 },
        type: 'main'
      },
      {
        id: 'n2',
        label: 'Character',
        position: { x: 150, y: 300 },
        type: 'sub'
      },
      {
        id: 'n3',
        label: 'Plot',
        position: { x: 300, y: 300 },
        type: 'sub'
      },
      {
        id: 'n4',
        label: 'Theme',
        position: { x: 450, y: 300 },
        type: 'sub'
      }
    ],
    edges: [
      {
        id: 'e1',
        source: 'n1',
        target: 'n2'
      },
      {
        id: 'e2',
        source: 'n1',
        target: 'n3'
      },
      {
        id: 'e3',
        source: 'n1',
        target: 'n4'
      }
    ],
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-05'),
    isPublic: false
  },
  {
    id: 'm3',
    title: 'Computer Science Basics',
    description: 'Fundamental concepts in CS',
    ownerId: '1',
    collaborators: ['2', '3'],
    nodes: [
      { id: 'cs1', label: 'Computer Science', position: { x: 300, y: 150 }, type: 'main' },
      { id: 'cs2', label: 'Algorithms', position: { x: 150, y: 250 }, type: 'sub' },
      { id: 'cs3', label: 'Data Structures', position: { x: 450, y: 250 }, type: 'sub' },
      { id: 'cs4', label: 'Programming Languages', position: { x: 300, y: 350 }, type: 'sub' }
    ],
    edges: [
      { id: 'cse1', source: 'cs1', target: 'cs2' },
      { id: 'cse2', source: 'cs1', target: 'cs3' },
      { id: 'cse3', source: 'cs1', target: 'cs4' }
    ],
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-04-20'),
    isPublic: true
  },
  {
    id: 'm4',
    title: 'Economics Principles',
    description: 'Key economic concepts',
    ownerId: '3',
    collaborators: ['1', '4'],
    nodes: [
      { id: 'ec1', label: 'Economics', position: { x: 400, y: 150 }, type: 'main' },
      { id: 'ec2', label: 'Microeconomics', position: { x: 200, y: 250 }, type: 'sub' },
      { id: 'ec3', label: 'Macroeconomics', position: { x: 600, y: 250 }, type: 'sub' }
    ],
    edges: [
      { id: 'ece1', source: 'ec1', target: 'ec2' },
      { id: 'ece2', source: 'ec1', target: 'ec3' }
    ],
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-04-12'),
    isPublic: true
  }
];

export const mockStudyGroups: StudyGroup[] = [
  {
    id: 'g1',
    name: 'Calculus Study Group',
    description: 'Working through Calculus problems and concepts.',
    ownerId: '1',
    members: ['1', '2', '3'],
    subject: 'Mathematics',
    capacity: 10,
    isOnline: false,
    location: 'University Library Room 2B',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'g2',
    name: 'Quantum Physics Discussion',
    description: 'Advanced topics in Quantum Physics.',
    ownerId: '2',
    members: ['1', '2'],
    subject: 'Physics',
    capacity: 5,
    isOnline: true,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    createdAt: new Date('2024-03-15'),
  },
  {
    id: 'g3',
    name: 'Computer Science Basics',
    description: 'Fundamental concepts in CS.',
    ownerId: '1',
    members: ['1', '2', '3', '4'],
    subject: 'Computer Science',
    capacity: 8,
    isOnline: true,
    meetingLink: 'https://zoom.us/j/1234567890',
    createdAt: new Date('2024-03-20'),
  },
  {
    id: 'g4',
    name: 'English Literature Discussion',
    description: 'Deep dives into classic and contemporary literature.',
    ownerId: '4',
    members: ['1', '4'],
    subject: 'English Literature',
    capacity: 7,
    isOnline: true,
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
    createdAt: new Date('2024-04-01'),
  },
  {
    id: 'g5',
    name: 'Business Case Studies',
    description: 'Analyzing real-world business scenarios.',
    ownerId: '3',
    members: ['1', '3'],
    subject: 'Business',
    capacity: 12,
    isOnline: false,
    location: 'Business School Room 101',
    createdAt: new Date('2024-04-05'),
  },
  {
    id: 'g6',
    name: 'Advanced Mathematics Seminar',
    description: 'Exploring advanced topics in pure mathematics.',
    ownerId: '2',
    members: ['2', '3'], // User 1 is not a member, good for recommended
    subject: 'Mathematics',
    capacity: 6,
    isOnline: true,
    meetingLink: 'https://meet.google.com/wxyz-7890-123',
    createdAt: new Date('2024-04-25'),
  },
  {
    id: 'g7',
    name: 'Frontend Development Workshop',
    description: 'Hands-on workshop for web development.',
    ownerId: '3',
    members: ['3', '4'], // User 1 is not a member, good for recommended
    subject: 'Computer Science',
    capacity: 15,
    isOnline: true,
    meetingLink: 'https://zoom.us/j/9876543210',
    createdAt: new Date('2024-04-28'),
  },
  {
    id: 'g8',
    name: 'Linear Algebra Study Group',
    description: 'Problem-solving sessions for linear algebra.',
    ownerId: '2',
    members: ['2', '4'],
    subject: 'Mathematics',
    capacity: 8,
    isOnline: false,
    location: 'Campus Center Room 305',
    createdAt: new Date('2024-05-01'),
  },
  {
    id: 'g9',
    name: 'Data Structures & Algorithms Practice',
    description: 'Practice coding problems related to DSA.',
    ownerId: '4',
    members: ['3', '4'],
    subject: 'Computer Science',
    capacity: 10,
    isOnline: true,
    meetingLink: 'https://meet.google.com/mnop-qrst-uvw',
    createdAt: new Date('2024-05-05'),
  },
  {
    id: 'g10',
    name: 'Discrete Mathematics Discussion',
    description: 'Discussing topics in discrete math.',
    ownerId: '2',
    members: ['2', '3', '4'],
    subject: 'Mathematics',
    capacity: 7,
    isOnline: true,
    meetingLink: 'https://zoom.us/j/5678901234',
    createdAt: new Date('2024-05-08'),
  },
  {
    id: 'g11',
    name: 'Operating Systems Study',
    description: 'Understanding OS concepts and principles.',
    ownerId: '3',
    members: ['2', '3', '4'],
    subject: 'Computer Science',
    capacity: 6,
    isOnline: false,
    location: 'Engineering Building Room 410',
    createdAt: new Date('2024-05-10'),
  },
];

export const mockStudySessions: StudySession[] = [
  {
    id: 'ss1',
    groupId: 'g1',
    title: 'Limits and Continuity',
    date: new Date('2024-05-01T10:00:00').toISOString(),
    duration: 90,
    agenda: 'Reviewing basic concepts of limits and continuity, working on practice problems.',
    resources: ['Calculus textbook Chapter 2'],
    attendees: ['1', '2'],
  },
  {
    id: 'ss2',
    groupId: 'g2',
    title: 'Schrödinger Equation',
    date: new Date('2024-05-02T14:00:00').toISOString(),
    duration: 60,
    agenda: 'Discussion on the time-dependent and time-independent Schrödinger equation.',
    resources: ['Quantum Physics notes'],
    attendees: ['1', '2'],
  },
  {
    id: 'ss3',
    groupId: 'g3',
    title: 'Introduction to Algorithms',
    date: new Date('2024-05-03T11:00:00').toISOString(),
    duration: 75,
    agenda: 'Understanding basic algorithm analysis and common algorithms.',
    resources: ['Cormen Book Chapter 1'],
    attendees: ['1', '3', '4'],
  },
  {
    id: 'ss4',
    groupId: 'g4',
    title: 'Poetry Analysis',
    date: new Date('2024-05-04T16:00:00').toISOString(),
    duration: 60,
    agenda: 'Analyzing selected poems.',
    resources: ['Selected Poems PDF'],
    attendees: ['1', '4'],
  },
  {
    id: 'ss5',
    groupId: 'g5',
    title: 'Marketing Case Study',
    date: new Date('2024-05-05T13:00:00').toISOString(),
    duration: 90,
    agenda: 'Discussing a recent marketing case study.',
    resources: ['Case Study Document'],
    attendees: ['1', '3'],
  },
  {
    id: 'ss6',
    groupId: 'g3', // For Computer Science Basics (user 1 is in this group)
    title: 'Data Structures Deep Dive',
    date: new Date('2024-05-06T15:30:00').toISOString(),
    duration: 90,
    agenda: 'In-depth look at common data structures like trees and graphs.',
    resources: ['Online resources'],
    attendees: ['1', '2', '4'],
  },
  {
    id: 'ss7',
    groupId: 'g1', // For Calculus Study Group (user 1 is in this group)
    title: 'Derivatives Workshop',
    date: new Date('2024-05-07T09:00:00').toISOString(),
    duration: 75,
    agenda: 'Workshop on calculating and applying derivatives.',
    resources: ['Practice problems'],
    attendees: ['1', '3'],
  },
  // Recommended Sessions (for groups user 1 is NOT in, but match subjects)
  {
    id: 'ss8',
    groupId: 'g6', // Advanced Mathematics Seminar
    title: 'Abstract Algebra Fundamentals',
    date: new Date('2024-05-08T11:00:00').toISOString(),
    duration: 90,
    agenda: 'Introduction to groups, rings, and fields.',
    resources: ['Textbook Chapter 10'],
    attendees: ['2', '3'],
  },
  {
    id: 'ss9',
    groupId: 'g7', // Frontend Development Workshop
    title: 'Introduction to React Hooks',
    date: new Date('2024-05-09T14:00:00').toISOString(),
    duration: 120,
    agenda: 'Learning useState, useEffect, and other basic hooks.',
    resources: ['React documentation', 'Online tutorial link'],
    attendees: ['3', '4'],
  },
  {
    id: 'ss10',
    groupId: 'g6', // Advanced Mathematics Seminar
    title: 'Real Analysis: Sequences and Series',
    date: new Date('2024-05-10T10:30:00').toISOString(),
    duration: 90,
    agenda: 'Convergence tests and properties of real sequences.',
    resources: ['Lecture notes'],
    attendees: ['2'],
  },
  {
    id: 'ss11',
    groupId: 'g7', // Frontend Development Workshop
    title: 'State Management with Redux Toolkit',
    date: new Date('2024-05-11T13:00:00').toISOString(),
    duration: 120,
    agenda: 'Setting up a Redux store and using slices.',
    resources: ['Redux Toolkit docs'],
    attendees: ['3', '4'],
  },
  {
    id: 'ss12',
    groupId: 'g6', // Advanced Mathematics Seminar
    title: 'Complex Analysis: Contour Integration',
    date: new Date('2024-05-12T15:00:00').toISOString(),
    duration: 90,
    agenda: 'Calculating integrals using the residue theorem.',
    resources: [],
    attendees: ['2', '3'],
  },
  {
    id: 'ss13',
    groupId: 'g7', // Frontend Development Workshop
    title: 'CSS-in-JS with Styled Components',
    date: new Date('2024-05-13T10:00:00').toISOString(),
    duration: 75,
    agenda: 'Styling React components using styled-components library.',
    resources: ['Styled Components documentation'],
    attendees: ['3'],
  },
  {
    id: 'ss14',
    groupId: 'g6', // Advanced Mathematics Seminar
    title: 'Topology: Introduction to Metric Spaces',
    date: new Date('2024-05-14T11:30:00').toISOString(),
    duration: 90,
    agenda: 'Defining metric spaces and exploring open/closed sets.',
    resources: [],
    attendees: ['2'],
  },
  {
    id: 'ss15',
    groupId: 'g7', // Frontend Development Workshop
    title: 'Testing React Applications (Jest/Testing Library)',
    date: new Date('2024-05-15T14:30:00').toISOString(),
    duration: 120,
    agenda: 'Writing unit and integration tests for React components.',
    resources: ['Jest docs', 'Testing Library docs'],
    attendees: ['3', '4'],
  },
  {
    id: 'ss16',
    groupId: 'g6', // Advanced Mathematics Seminar
    title: 'Differential Equations: Laplace Transforms',
    date: new Date('2024-05-16T10:00:00').toISOString(),
    duration: 75,
    agenda: 'Using Laplace transforms to solve differential equations.',
    resources: [],
    attendees: ['2', '3'],
  },
  {
    id: 'ss17',
    groupId: 'g7', // Frontend Development Workshop
    title: 'Web Performance Optimization',
    date: new Date('2024-05-17T13:30:00').toISOString(),
    duration: 90,
    agenda: 'Techniques for improving website speed and performance.',
    resources: ['Web Vitals guide'],
    attendees: ['3'],
  },
];

export const mockNotes: Note[] = [
  {
    id: 'n1',
    userId: '1',
    title: 'Calculus Notes Chapter 2',
    content: 'Summary of limits and continuity concepts...',
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2023-11-18'),
    tags: ['Calculus', 'Limits', 'Continuity']
  },
  {
    id: 'n2',
    userId: '1',
    title: 'Physics Formulas',
    content: 'Key formulas for mechanics...',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-01'),
    tags: ['Physics', 'Formulas', 'Mechanics']
  },
];

export const mockNoteSummaries: NoteSummary[] = [
  {
    id: 'ns1',
    noteId: 'n1',
    summary: 'Chapter 2 covers limits and continuity.',
    createdAt: new Date('2023-11-18')
  }
];

export const modules: Module[] = [
  {
    id: 'edubridge',
    name: 'EduBridge',
    description: 'Connect with tutors and get help with your studies',
    icon: 'book-open',
    path: '/edubridge',
    color: 'primary'
  },
  {
    id: 'mindmap',
    name: 'MindMap Master',
    description: 'Create and collaborate on visual mind maps',
    icon: 'network',
    path: '/mindmap',
    color: 'secondary'
  },
  {
    id: 'studybuddy',
    name: 'StudyBuddy',
    description: 'Find or create study groups for collaborative learning',
    icon: 'users',
    path: '/studybuddy',
    color: 'accent'
  },
  {
    id: 'eduassist',
    name: 'EduAssist',
    description: 'AI-powered tools to summarize notes and generate study materials',
    icon: 'file-text',
    path: '/eduassist',
    color: 'success'
  }
];

export const mockBadges: Badge[] = [
  {
    id: 'b1',
    name: 'Fast Learner',
    description: 'Completed 5 sessions in a week',
    icon: 'award',
    criteria: 'Complete 5 sessions in a week'
  },
  {
    id: 'b2',
    name: 'Super Tutor',
    description: 'Helped 20 students',
    icon: 'star',
    criteria: 'Help 20 students'
  },
  {
    id: 'b3',
    name: 'Mind Mapper',
    description: 'Created 10 mind maps',
    icon: 'network',
    criteria: 'Create 10 mind maps'
  },
  {
    id: 'b4',
    name: 'Group Leader',
    description: 'Created and managed 5 study groups',
    icon: 'users',
    criteria: 'Create and manage 5 study groups'
  },
  {
    id: 'b5',
    name: 'Note Master',
    description: 'Created 20 notes with summaries',
    icon: 'file-text',
    criteria: 'Create 20 notes with summaries'
  }
];