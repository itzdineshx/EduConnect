import { User, Badge, TutorSession, TutorAvailability, MindMap, StudyGroup, StudySession, Note, NoteSummary, Module, Quiz, QuizAttempt, Flashcard, QuizAnswer } from '../types';
import { 
  BookOpen, Users, Network, FileText, 
  Award, Clock, Calendar, MapPin, 
  Video, Mail, Star 
} from 'lucide-react';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'அனு',
    email: 'anu@edu.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'கணினி அறிவியலில் மூன்றாம் ஆண்டு படிக்கும் மாணவி',
    subjects: ['கணிதம்', 'கணினி அறிவியல்'],
    points: 120,
    badges: [
      {
        id: 'b1',
        name: 'விரைவு கற்பவர்',
        description: 'ஒரு வாரத்தில் 5 அமர்வுகளை முடித்தார்',
        icon: 'award',
        criteria: 'ஒரு வாரத்தில் 5 அமர்வுகளை முடிக்கவும்',
        earnedAt: new Date('2023-12-15')
      }
    ],
    createdAt: new Date('2023-10-01')
  },
  {
    id: '2',
    name: 'தினேஷ்',
    email: 'dinesh@edu.com',
    role: 'tutor',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'இயற்பியலில் முனைவர் பட்ட ஆய்வாளர், 3 ஆண்டுகள் கற்பித்தல் அனுபவம்',
    subjects: ['இயற்பியல்', 'கணிதம்'],
    points: 450,
    badges: [
      {
        id: 'b2',
        name: 'சிறந்த ஆசிரியர்',
        description: '20 மாணவர்களுக்கு உதவினார்',
        icon: 'star',
        criteria: '20 மாணவர்களுக்கு உதவவும்',
        earnedAt: new Date('2023-11-10')
      }
    ],
    createdAt: new Date('2023-09-15')
  },
  {
    id: '3',
    name: 'ரோகன்',
    email: 'rogan@edu.com',
    role: 'organizer',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: '5+ ஆண்டுகள் கல்வி தளம் ஒருங்கிணைப்பாளர் அனுபவம்',
    subjects: ['வணிகம்', 'பொருளாதாரம்'],
    points: 320,
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
    date: new Date('2024-05-01T10:00:00'),
    duration: 90,
    agenda: 'Reviewing basic concepts of limits and continuity, working on practice problems.',
    resources: ['Calculus textbook Chapter 2'],
    attendees: ['1', '2'],
  },
  {
    id: 'ss2',
    groupId: 'g2',
    title: 'Schrödinger Equation',
    date: new Date('2024-05-02T14:00:00'),
    duration: 60,
    agenda: 'Discussion on the time-dependent and time-independent Schrödinger equation.',
    resources: ['Quantum Physics notes'],
    attendees: ['1', '2'],
  },
  {
    id: 'ss3',
    groupId: 'g3',
    title: 'Introduction to Algorithms',
    date: new Date('2024-05-03T11:00:00'),
    duration: 75,
    agenda: 'Understanding basic algorithm analysis and common algorithms.',
    resources: ['Cormen Book Chapter 1'],
    attendees: ['1', '3', '4'],
  },
  {
    id: 'ss4',
    groupId: 'g4',
    title: 'Poetry Analysis',
    date: new Date('2024-05-04T16:00:00'),
    duration: 60,
    agenda: 'Analyzing selected poems.',
    resources: ['Selected Poems PDF'],
    attendees: ['1', '4'],
  },
  {
    id: 'ss5',
    groupId: 'g5',
    title: 'Marketing Case Study',
    date: new Date('2024-05-05T13:00:00'),
    duration: 90,
    agenda: 'Discussing a recent marketing case study.',
    resources: ['Case Study Document'],
    attendees: ['1', '3'],
  },
  {
    id: 'ss6',
    groupId: 'g3',
    title: 'Data Structures Deep Dive',
    date: new Date('2024-05-06T15:30:00'),
    duration: 90,
    agenda: 'In-depth look at common data structures like trees and graphs.',
    resources: ['Online resources'],
    attendees: ['1', '2', '4'],
  },
  {
    id: 'ss7',
    groupId: 'g1',
    title: 'Derivatives Workshop',
    date: new Date('2024-05-07T09:00:00'),
    duration: 75,
    agenda: 'Workshop on calculating and applying derivatives.',
    resources: ['Practice problems'],
    attendees: ['1', '3'],
  },
  {
    id: 'ss8',
    groupId: 'g6',
    title: 'Abstract Algebra Fundamentals',
    date: new Date('2024-05-08T11:00:00'),
    duration: 90,
    agenda: 'Introduction to groups, rings, and fields.',
    resources: ['Textbook Chapter 10'],
    attendees: ['2', '3'],
  },
  {
    id: 'ss9',
    groupId: 'g7',
    title: 'Introduction to React Hooks',
    date: new Date('2024-05-09T14:00:00'),
    duration: 120,
    agenda: 'Learning useState, useEffect, and other basic hooks.',
    resources: ['React documentation', 'Online tutorial link'],
    attendees: ['3', '4'],
  },
  {
    id: 'ss10',
    groupId: 'g6',
    title: 'Real Analysis: Sequences and Series',
    date: new Date('2024-05-10T10:30:00'),
    duration: 90,
    agenda: 'Convergence tests and properties of real sequences.',
    resources: ['Lecture notes'],
    attendees: ['2'],
  },
  {
    id: 'ss11',
    groupId: 'g7',
    title: 'State Management with Redux Toolkit',
    date: new Date('2024-05-11T13:00:00'),
    duration: 120,
    agenda: 'Setting up a Redux store and using slices.',
    resources: ['Redux Toolkit docs'],
    attendees: ['3', '4'],
  },
  {
    id: 'ss12',
    groupId: 'g6',
    title: 'Complex Analysis: Contour Integration',
    date: new Date('2024-05-12T15:00:00'),
    duration: 90,
    agenda: 'Calculating integrals using the residue theorem.',
    resources: [],
    attendees: ['2', '3'],
  },
  {
    id: 'ss13',
    groupId: 'g7',
    title: 'CSS-in-JS with Styled Components',
    date: new Date('2024-05-13T10:00:00'),
    duration: 75,
    agenda: 'Styling React components using styled-components library.',
    resources: ['Styled Components documentation'],
    attendees: ['3'],
  },
  {
    id: 'ss14',
    groupId: 'g6',
    title: 'Topology: Introduction to Metric Spaces',
    date: new Date('2024-05-14T11:30:00'),
    duration: 90,
    agenda: 'Defining metric spaces and exploring open/closed sets.',
    resources: [],
    attendees: ['2'],
  },
  {
    id: 'ss15',
    groupId: 'g7',
    title: 'Testing React Applications (Jest/Testing Library)',
    date: new Date('2024-05-15T14:30:00'),
    duration: 120,
    agenda: 'Writing unit and integration tests for React components.',
    resources: ['Jest docs', 'Testing Library docs'],
    attendees: ['3', '4'],
  },
  {
    id: 'ss16',
    groupId: 'g6',
    title: 'Differential Equations: Laplace Transforms',
    date: new Date('2024-05-16T10:00:00'),
    duration: 75,
    agenda: 'Using Laplace transforms to solve differential equations.',
    resources: [],
    attendees: ['2', '3'],
  },
  {
    id: 'ss17',
    groupId: 'g7',
    title: 'Web Performance Optimization',
    date: new Date('2024-05-17T13:30:00'),
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
    title: 'கணிதம்: வரம்புகள் மற்றும் தொடர்ச்சி',
    content: `கணிதத்தில் வரம்புகள் மற்றும் தொடர்ச்சி பற்றிய அடிப்படை கருத்துக்கள்.

முக்கிய கருத்துக்கள்:
1. வரம்பின் வரையறை: lim(x→a) f(x) = L
2. ஒரு பக்க வரம்புகள்: இடது மற்றும் வலது வரம்புகள்
3. வரம்புகளின் பண்புகள்: கூட்டல், பெருக்கல், வகுத்தல் விதிகள்
4. முடிவிலி வரம்புகள்
5. தொடர்ச்சி: f(a) உள்ளது, வரம்பு உள்ளது, f(a) = வரம்பு

தொடர்ச்சியற்ற வகைகள்:
- தாவல் தொடர்ச்சியின்மை
- நீக்கக்கூடிய தொடர்ச்சியின்மை
- முடிவிலி தொடர்ச்சியின்மை

பயன்பாடுகள்:
- மாற்ற வீதம் கணக்கீடுகள்
- உகப்பாக்கல் பிரச்சினைகள்
- சார்பு நடத்தை பகுப்பாய்வு
- வகையீட்டிற்கான அடிப்படை`,
    tags: ['கணிதம்', 'வரம்புகள்', 'தொடர்ச்சி', 'சார்புகள்'],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01')
  },
  {
    id: 'n2',
    userId: '1',
    title: 'இயற்பியல்: குவாண்டம் இயக்கவியல் அடிப்படைகள்',
    content: `குவாண்டம் இயக்கவியல் என்பது அணு மற்றும் துணை அணுத்துகள்களின் ஆற்றல் நிலைகளை விவரிக்கும் அடிப்படை கோட்பாடு.

முக்கிய கொள்கைகள்:
1. அலை-துகள் இரட்டைத்தன்மை
   - பொருள் அலை மற்றும் துகள் பண்புகளை காட்டுகிறது
   - டி பிராக்லி அலைநீளம்: λ = h/p
   - இரட்டைப் பிளவு சோதனை தாக்கங்கள்

2. ஹைசன்பர்க் நிச்சயமற்ற தத்துவம்
   - Δx·Δp ≥ ℏ/2
   - நிலை-உந்தம் நிச்சயமின்மை
   - ஆற்றல்-நேர நிச்சயமின்மை

3. குவாண்டம் நிலைகள்
   - அலைச்சார்புகள் மற்றும் நிகழ்தகவு வீச்சுகள்
   - மேற்பொருந்துதல் கொள்கை
   - அளவீட்டின் போது அலைச்சார்பு சரிவு

பயன்பாடுகள்:
- அணு அமைப்பு புரிதல்
- குவாண்டம் குறுக்கீடு
- குவாண்டம் கணினி
- நவீன மின்னணுவியல்`,
    tags: ['இயற்பியல்', 'குவாண்டம் இயக்கவியல்', 'அலைச்சார்பு'],
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05')
  },
  {
    id: 'n3',
    userId: '1',
    title: 'Linear Algebra: Eigenvalues and Eigenvectors',
    content: `Eigenvalues and eigenvectors are fundamental concepts in linear algebra with wide-ranging applications in physics, computer graphics, and data science.

Key Concepts:
1. Definition: Av = λv
   - A: square matrix
   - v: eigenvector
   - λ: eigenvalue

2. Characteristic Equation
   - det(A - λI) = 0
   - Finding eigenvalues
   - Multiplicity of eigenvalues

3. Properties
   - Linear independence of eigenvectors
   - Diagonalization conditions
   - Geometric interpretation

Applications:
- Principal Component Analysis (PCA)
- Google's PageRank algorithm
- Quantum mechanics
- Vibration analysis
- Image processing

Computational Methods:
1. Power method
2. QR algorithm
3. Singular Value Decomposition

Real-world Examples:
- Structural engineering
- Population growth models
- Machine learning algorithms`,
    tags: ['linear algebra', 'mathematics', 'eigenvalues', 'matrices'],
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10')
  },
  {
    id: 'n4',
    userId: '1',
    title: 'Machine Learning: Neural Networks',
    content: `Deep dive into neural networks and their applications in modern machine learning.

Key Topics:
1. Neural Network Architecture
   - Input layer, hidden layers, output layer
   - Neurons and activation functions
   - Forward propagation and backpropagation

2. Types of Neural Networks
   - Feedforward Neural Networks
   - Convolutional Neural Networks (CNN)
   - Recurrent Neural Networks (RNN)
   - Transformers

3. Training Process
   - Loss functions
   - Gradient descent
   - Optimization algorithms
   - Regularization techniques

4. Implementation Considerations
   - Hyperparameter tuning
   - Batch normalization
   - Dropout layers
   - Learning rate scheduling

Practical Applications:
- Image recognition
- Natural language processing
- Speech recognition
- Game playing AI
- Autonomous vehicles`,
    tags: ['machine learning', 'neural networks', 'AI', 'deep learning'],
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15')
  }
];

export const mockNoteSummaries: NoteSummary[] = [
  {
    id: 's1',
    noteId: 'n1',
    title: 'Limits and Continuity in Mathematics - AI Summary',
    content: `Based on the provided notes, here's a comprehensive analysis of limits and continuity in mathematics:

The concept of limits and continuity forms the foundation of calculus and mathematical analysis. The key definition of a limit, lim(x→a) f(x) = L, represents the value that a function approaches as the input approaches a specific point. This concept is crucial for understanding both one-sided limits and the broader implications of continuity.

The notes effectively outline three major types of discontinuities: jump discontinuities (where the function has a sudden break), removable discontinuities (where a single point is missing), and infinite discontinuities (where the function approaches infinity). These classifications are essential for analyzing function behavior and solving real-world optimization problems.

The practical applications mentioned, including rate of change calculations and optimization problems, demonstrate the real-world relevance of these concepts, particularly in fields requiring function behavior analysis.`,
    createdAt: new Date('2024-03-15'),
    model: 'gpt-4',
    confidence: 0.95,
    keyPoints: [
      'Fundamental definition of limits: lim(x→a) f(x) = L represents function behavior near a point',
      'One-sided limits provide deeper insight into function behavior from left and right approaches',
      'Continuity requires three conditions: f(a) exists, limit exists, and f(a) equals the limit',
      'Three types of discontinuities: jump, removable, and infinite',
      'Practical applications include rate of change and optimization problems',
      'Understanding limits is crucial for calculus and advanced mathematical analysis'
    ],
    metadata: {
      complexity_score: 0.85,
      readability_score: 0.92,
      key_concepts_extracted: 12,
      suggested_prerequisites: ['Basic Algebra', 'Function Concepts'],
      recommended_practice_problems: 8
    }
  },
  {
    id: 's2',
    noteId: 'n2',
    title: 'Quantum Mechanics Fundamentals - AI Analysis',
    content: `Analysis of the quantum mechanics fundamentals notes reveals a comprehensive overview of this foundational physics concept:

The wave-particle duality stands as a cornerstone principle, demonstrating how matter exhibits both wave and particle characteristics. The de Broglie wavelength equation (λ = h/p) quantifies this relationship, while the double-slit experiment provides empirical evidence of this phenomenon. This duality challenges our classical physics intuition and introduces quantum mechanical principles.

Heisenberg's Uncertainty Principle (Δx·Δp ≥ ℏ/2) represents a fundamental limit to the precision with which complementary variables can be known. This principle isn't merely a limitation of measurement technology but a fundamental aspect of quantum systems. The implications extend to position-momentum uncertainty and energy-time uncertainty relationships.

The notes effectively connect these theoretical concepts to practical applications in atomic structure understanding, quantum interference, and modern electronics. The emphasis on quantum states and probability amplitudes provides a solid foundation for understanding more advanced quantum mechanical concepts.`,
    createdAt: new Date('2024-03-15'),
    model: 'gpt-4',
    confidence: 0.93,
    keyPoints: [
      'Wave-particle duality is demonstrated through the de Broglie wavelength equation and double-slit experiment',
      'Heisenberg\'s Uncertainty Principle sets fundamental limits on measurement precision',
      'Quantum states are described by wave functions and probability amplitudes',
      'Measurement causes wave function collapse according to Copenhagen interpretation',
      'Applications range from atomic structure to quantum computing',
      'Modern electronics rely on quantum mechanical principles'
    ],
    metadata: {
      complexity_score: 0.88,
      readability_score: 0.87,
      key_concepts_extracted: 15,
      suggested_prerequisites: ['Classical Mechanics', 'Wave Physics'],
      recommended_practice_problems: 10
    }
  }
];

export const mockQuizAnswers: QuizAnswer[] = [
  {
    flashcardId: 'f1',
    isCorrect: true,
    userAnswer: 'A computational model inspired by the brain',
    timeSpent: 45,
    confidence: 'high'
  },
  {
    flashcardId: 'f2',
    isCorrect: true,
    userAnswer: 'An algorithm for updating neural network weights',
    timeSpent: 60,
    confidence: 'medium'
  }
];

export const mockQuizAttempts: QuizAttempt[] = [
  {
    id: 'qa1',
    quizId: 'q1',
    userId: '1',
    startedAt: new Date('2024-03-16T10:00:00'),
    completedAt: new Date('2024-03-16T10:05:00'),
    score: 85,
    answers: mockQuizAnswers,
    timeSpent: 300
  }
];

export const modules: Module[] = [
  {
    id: 'edubridge',
    name: 'கல்விப்பாலம்',
    description: 'நிபுணர் ஆசிரியர்களுடன் இணைந்து உங்கள் படிப்பில் உதவி பெறுங்கள்',
    icon: 'book-open',
    path: '/edubridge',
    color: 'primary'
  },
  {
    id: 'mindmap',
    name: 'மனவரைபடம்',
    description: 'காட்சி மனவரைபடங்களை உருவாக்கி பகிரவும்',
    icon: 'network',
    path: '/mindmap',
    color: 'secondary'
  },
  {
    id: 'studybuddy',
    name: 'கல்வித்தோழன்',
    description: 'கூட்டு கற்றலுக்கான படிப்புக் குழுக்களை கண்டறியவும் அல்லது உருவாக்கவும்',
    icon: 'users',
    path: '/studybuddy',
    color: 'accent'
  },
  {
    id: 'eduassist',
    name: 'கல்வி உதவி',
    description: 'AI-சக்தி கொண்ட கருவிகள் மூலம் குறிப்புகளை சுருக்கி படிப்பு பொருட்களை உருவாக்கவும்',
    icon: 'file-text',
    path: '/eduassist',
    color: 'success'
  }
];

export const mockBadges: Badge[] = [
  {
    id: 'b1',
    name: 'விரைவு கற்பவர்',
    description: 'ஒரு வாரத்தில் 5 அமர்வுகளை முடித்தார்',
    icon: 'award',
    criteria: 'ஒரு வாரத்தில் 5 அமர்வுகளை முடிக்கவும்'
  },
  {
    id: 'b2',
    name: 'சிறந்த ஆசிரியர்',
    description: '20 மாணவர்களுக்கு உதவினார்',
    icon: 'star',
    criteria: '20 மாணவர்களுக்கு உதவவும்'
  },
  {
    id: 'b3',
    name: 'மனவரைபடம்',
    description: '10 மனவரைபடங்களை உருவாக்கின்றன',
    icon: 'network',
    criteria: '10 மனவரைபடங்களை உருவாக்கவும்'
  },
  {
    id: 'b4',
    name: 'குழு மேலாளர்',
    description: '5 படிப்பு குழுக்களை உருவாக்கி மேலாய்வு',
    icon: 'users',
    criteria: '5 படிப்பு குழுக்களை உருவாக்கவும் மேலாய்வு'
  },
  {
    id: 'b5',
    name: 'குறிப்பு மேலாளர்',
    description: '20 குறிப்புகளை உருவாக்கின்றன',
    icon: 'file-text',
    criteria: '20 குறிப்புகளை உருவாக்கவும்'
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'Machine Learning Basics',
    description: 'Test your knowledge of fundamental machine learning concepts',
    flashcardIds: ['f1', 'f2', 'f3'],
    totalQuestions: 3,
    timeLimit: 300,
    createdAt: new Date('2024-03-15'),
    lastAttemptAt: new Date('2024-03-16'),
    bestScore: 85,
    difficultyLevel: 'basic',
    topics: ['Machine Learning', 'Neural Networks', 'AI Basics'],
    learningObjectives: [
      'Understand basic ML concepts',
      'Learn about neural networks',
      'Differentiate between learning types'
    ]
  },
  {
    id: 'q2',
    title: 'Advanced Neural Networks',
    description: 'Challenge yourself with advanced neural network concepts',
    flashcardIds: ['f4', 'f5'],
    totalQuestions: 2,
    timeLimit: 240,
    createdAt: new Date('2024-03-15'),
    difficultyLevel: 'advanced',
    topics: ['Deep Learning', 'Neural Networks', 'Computer Vision'],
    learningObjectives: [
      'Master gradient descent',
      'Understand CNNs',
      'Apply advanced concepts'
    ]
  }
];

// Add processing states to simulate AI generation
export const mockProcessingStates = {
  notes: {
    isGenerating: false,
    progress: 0,
    currentStep: '',
    steps: [
      'Analyzing content',
      'Extracting key concepts',
      'Generating summary',
      'Creating flashcards',
      'Finalizing quiz questions'
    ]
  }
};

export const mockFlashcards: Flashcard[] = [
  {
    id: 'f1',
    question: 'What is the mathematical definition of a limit, and how does it relate to continuity?',
    answer: 'The limit of a function f(x) as x approaches a is written as lim(x→a) f(x) = L. This means that the function values get arbitrarily close to L as x gets closer to a. For continuity, three conditions must be met: 1) f(a) exists, 2) the limit exists, and 3) f(a) equals the limit. This concept is fundamental to calculus and helps analyze function behavior at specific points.',
    tags: ['calculus', 'limits', 'continuity', 'functions'],
    difficulty: 'intermediate',
    metadata: {
      confidence_score: 0.95,
      average_completion_time: 45,
      success_rate: 0.82,
      related_concepts: ['derivatives', 'function analysis']
    }
  },
  {
    id: 'f2',
    question: 'Explain the three types of discontinuities in functions and provide examples of each.',
    answer: 'The three types of discontinuities are:\n\n1. Jump Discontinuity: Where the function has a sudden break or "jump" (e.g., step functions)\n2. Removable Discontinuity: A single point where the function is undefined but can be fixed by redefining that point (e.g., (x²-1)/(x-1) at x=1)\n3. Infinite Discontinuity: Where the function approaches infinity (e.g., 1/x at x=0)\n\nEach type has distinct characteristics and requires different approaches for analysis.',
    tags: ['calculus', 'discontinuity', 'function analysis'],
    difficulty: 'advanced',
    metadata: {
      confidence_score: 0.92,
      average_completion_time: 60,
      success_rate: 0.75,
      related_concepts: ['limits', 'asymptotes', 'function behavior']
    }
  },
  {
    id: 'f3',
    question: 'What is wave-particle duality in quantum mechanics and how is it demonstrated?',
    answer: 'Wave-particle duality is a fundamental principle of quantum mechanics stating that all matter and energy exhibits both wave and particle characteristics. It is demonstrated through:\n\n1. The de Broglie wavelength equation: λ = h/p\n2. The double-slit experiment, where particles create interference patterns\n3. Photoelectric effect, showing light\'s particle nature\n\nThis principle challenges classical physics and is essential for understanding quantum behavior.',
    tags: ['quantum mechanics', 'physics', 'wave-particle duality'],
    difficulty: 'intermediate',
    metadata: {
      confidence_score: 0.94,
      average_completion_time: 50,
      success_rate: 0.78,
      related_concepts: ['quantum interference', 'wave functions']
    }
  },
  {
    id: 'f4',
    question: 'Explain Heisenberg\'s Uncertainty Principle and its implications for quantum measurements.',
    answer: 'Heisenberg\'s Uncertainty Principle states that it\'s impossible to simultaneously know both the position and momentum of a quantum particle with absolute precision. Mathematically expressed as Δx·Δp ≥ ℏ/2, where:\n\n- Δx is uncertainty in position\n- Δp is uncertainty in momentum\n- ℏ is reduced Planck\'s constant\n\nThis principle is not about measurement limitations but a fundamental property of quantum systems. It has similar implications for energy-time measurements and influences our understanding of quantum behavior.',
    tags: ['quantum mechanics', 'uncertainty principle', 'measurement'],
    difficulty: 'advanced',
    metadata: {
      confidence_score: 0.91,
      average_completion_time: 65,
      success_rate: 0.72,
      related_concepts: ['quantum measurement', 'wave functions', 'probability']
    }
  },
  {
    id: 'f5',
    question: 'How do quantum states and wave functions describe the behavior of quantum systems?',
    answer: 'Quantum states and wave functions describe the complete state of a quantum system:\n\n1. Wave Function (Ψ): Mathematical description of a quantum state\n2. Probability Amplitude: |Ψ|² gives probability density\n3. Superposition: Systems can exist in multiple states simultaneously\n4. Collapse: Measurement causes wave function to collapse to specific state\n\nThis mathematical framework is essential for predicting and understanding quantum behavior in various applications from atomic structure to quantum computing.',
    tags: ['quantum mechanics', 'wave functions', 'quantum states'],
    difficulty: 'advanced',
    metadata: {
      confidence_score: 0.93,
      average_completion_time: 55,
      success_rate: 0.76,
      related_concepts: ['quantum superposition', 'measurement theory']
    }
  }
];