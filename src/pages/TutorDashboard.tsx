import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  Star, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Award,
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Languages
} from 'lucide-react';

import TutoringSession from '../components/TutoringSession';

// Mock translations
const translations = {
  en: {
    dashboardOverview: 'Dashboard Overview',
    welcomeMessage: 'Welcome back! Here\'s your activity summary.',
    totalStudents: 'Total Students',
    teachingHours: 'Teaching Hours',
    averageRating: 'Average Rating',
    completionRate: 'Completion Rate',
    recentActivities: 'Recent Activities',
    performanceMetrics: 'Performance Metrics',
    popularSubjects: 'Popular Subjects',
    tutorProfile: 'Tutor Profile',
    tutoringRequests: 'Tutoring Requests',
    scheduledSessions: 'Scheduled Sessions',
    activeLearners: 'Active Learners',
    thisMonth: 'This Month',
    outOfFive: 'out of 5.0',
    sessionCompletion: 'Session Completion',
    avgResponseTime: 'Avg. Response Time',
    studentRetentionRate: 'Student Retention Rate',
    satisfactionScore: 'Satisfaction Score',
    sessionCompletionRate: 'Session Completion Rate',
    students: 'Students',
    subjects: 'Subjects',
    languages: 'Languages',
    education: 'Education',
    availability: 'Availability',
    date: 'Date',
    time: 'Time',
    duration: 'Duration',
    level: 'Level',
    additionalNotes: 'Additional Notes',
    status: 'Status',
    accept: 'Accept',
    decline: 'Decline',
    startSession: 'Start Session',
    endSession: 'End Session',
    sessionWith: 'Session with',
    newReviewFrom: 'New Review from',
    feedback: 'Feedback',
    statusColon: 'Status:',
    typeColon: 'Type:',
    actions: 'Actions',
    reschedule: 'Reschedule',
    cancel: 'Cancel',
    viewDetails: 'View Details',
    sendMessage: 'Send Message',
    ratings: 'Ratings',
    reviews: 'Reviews',
    earnings: 'Earnings',
    paymentHistory: 'Payment History',
    settings: 'Settings',
    help: 'Help',
    logout: 'Logout'
  },
  ta: {
    dashboardOverview: 'டாஷ்போர்டு கண்ணோட்டம்',
    welcomeMessage: 'மீண்டும் வருக! உங்கள் செயல்பாடு சுருக்கம் இங்கே.',
    totalStudents: 'மொத்த மாணவர்கள்',
    teachingHours: 'கற்பித்தல் நேரம்',
    averageRating: 'சராசரி மதிப்பீடு',
    completionRate: 'பூர்த்தி விகிதம்',
    recentActivities: 'சமீபத்திய செயல்பாடுகள்',
    performanceMetrics: 'செயல்திறன் அளவீடுகள்',
    popularSubjects: 'பிரபலமான பாடங்கள்',
    tutorProfile: 'ஆசிரியர் சுயவிவரம்',
    tutoringRequests: 'பயிற்சி கோரிக்கைகள்',
    scheduledSessions: 'திட்டமிடப்பட்ட அமர்வுகள்',
    activeLearners: 'செயலில் உள்ள கற்பவர்கள்',
    thisMonth: 'இந்த மாதம்',
    outOfFive: '5.0 இல்',
    sessionCompletion: 'அமர்வு பூர்த்தி',
    avgResponseTime: 'சராசரி பதில் நேரம்',
    studentRetentionRate: 'மாணவர் தக்கவைப்பு விகிதம்',
    satisfactionScore: 'திருப்தி மதிப்பெண்',
    sessionCompletionRate: 'அமர்வு பூர்த்தி விகிதம்',
    students: 'மாணவர்கள்',
    subjects: 'பாடங்கள்',
    languages: 'மொழிகள்',
    education: 'கல்வி',
    availability: 'கிடைக்கும் நேரம்',
    date: 'தேதி',
    time: 'நேரம்',
    duration: 'கால அளவு',
    level: 'நிலை',
    additionalNotes: 'கூடுதல் குறிப்புகள்',
    status: 'நிலை',
    accept: 'ஏற்றுக்கொள்',
    decline: 'மறுப்பு',
    startSession: 'அமர்வு தொடங்கு',
    endSession: 'அமர்வு முடி',
    sessionWith: 'அமர்வு',
    newReviewFrom: 'புதிய மதிப்பீடு இருந்து',
    feedback: 'பின்னூட்டம்',
    statusColon: 'நிலை:',
    typeColon: 'வகை:',
    actions: 'செயல்கள்',
    reschedule: 'மறுதிட்டமிடு',
    cancel: 'ரத்து செய்',
    viewDetails: 'விவரங்களைக் காண்க',
    sendMessage: 'செய்தி அனுப்பு',
    ratings: 'மதிப்பீடுகள்',
    reviews: 'விமர்சனங்கள்',
    earnings: 'வருமானம்',
    paymentHistory: 'பணப்பரிவர்த்தனை வரலாறு',
    settings: 'அமைப்புகள்',
    help: 'உதவி',
    logout: 'வெளியேறு'
  },
};

// Mock data for dashboard insights
const mockStats = {
  totalStudents: 24,
  totalHours: 156,
  averageRating: 4.8,
  completionRate: 92,
  upcomingSessions: 3,
  totalEarnings: 2340,
  popularSubjects: [
    { name: 'Mathematics', students: 12 },
    { name: 'Physics', students: 8 },
    { name: 'Computer Science', students: 6 },
  ],
  recentActivities: [
    {
      id: 1,
      type: 'session',
      subject: 'Mathematics',
      student: 'John Doe',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'review',
      student: 'Jane Smith',
      rating: 5,
      comment: 'Excellent teaching methods!',
      time: '5 hours ago'
    },
    {
      id: 3,
      type: 'session',
      subject: 'Physics',
      student: 'Mike Johnson',
      time: '1 day ago',
      status: 'scheduled'
    }
  ],
  performanceMetrics: {
    responseTime: '15 min',
    studentRetention: 85,
    satisfactionScore: 4.9,
    sessionCompletion: 95
  }
};

// Mock data for tutor profile
const mockProfile = {
  name: 'Dr. Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, USA',
  bio: 'Experienced mathematics and physics tutor with a Ph.D. in Applied Mathematics. Passionate about making complex concepts accessible to students.',
  subjects: ['Mathematics', 'Physics', 'Computer Science'],
  languages: ['English', 'Spanish', 'French'],
  experience: '8 years',
  education: [
    {
      degree: 'Ph.D. in Applied Mathematics',
      institution: 'MIT',
      year: '2015'
    },
    {
      degree: 'M.Sc. in Physics',
      institution: 'Stanford University',
      year: '2012'
    }
  ],
  availability: {
    Monday: [{ start: '09:00', end: '17:00' }],
    Tuesday: [{ start: '09:00', end: '17:00' }],
    Wednesday: [{ start: '09:00', end: '17:00' }],
    Thursday: [{ start: '09:00', end: '17:00' }],
    Friday: [{ start: '09:00', end: '17:00' }]
  }
};

// Mock data for tutoring requests
const mockRequests = [
  {
    id: '1',
    studentName: 'John Doe',
    subject: 'Mathematics',
    topic: 'Calculus',
    date: '2024-03-25',
    time: '10:00',
    duration: '60 min',
    status: 'pending',
    studentLevel: 'High School',
    additionalNotes: 'Need help with integration techniques'
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    subject: 'Physics',
    topic: 'Mechanics',
    date: '2024-03-26',
    time: '14:00',
    duration: '90 min',
    status: 'pending',
    studentLevel: 'College',
    additionalNotes: 'Preparing for final exam'
  },
  {
    id: '3',
    studentName: 'Mike Johnson',
    subject: 'Computer Science',
    topic: 'Data Structures',
    date: '2024-03-27',
    time: '11:00',
    duration: '60 min',
    status: 'pending',
    studentLevel: 'University',
    additionalNotes: 'Understanding binary trees'
  }
];

// Mock data for scheduled sessions
const mockSessions = [
  {
    id: '1',
    studentName: 'Alice Brown',
    subject: 'Mathematics',
    topic: 'Algebra',
    date: '2024-03-24',
    time: '15:00',
    duration: '60 min',
    status: 'scheduled',
    type: 'video'
  },
  {
    id: '2',
    studentName: 'Bob Wilson',
    subject: 'Physics',
    topic: 'Electromagnetism',
    date: '2024-03-25',
    time: '16:00',
    duration: '90 min',
    status: 'scheduled',
    type: 'voice'
  },
  {
    id: '3',
    studentName: 'Carol Davis',
    subject: 'Computer Science',
    topic: 'Algorithms',
    date: '2024-03-26',
    time: '13:00',
    duration: '60 min',
    status: 'scheduled',
    type: 'text'
  }
];

const StatCard = ({ icon: Icon, title, value, subtitle }: { 
  icon: any; 
  title: string; 
  value: string | number; 
  subtitle?: string;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
    </div>
  </div>
);

const ActivityCard = ({ activity, language }: { activity: any, language: 'en' | 'ta' }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <div className="flex items-start">
      <div className="flex-shrink-0">
        {activity.type === 'session' ? (
          <MessageSquare className="h-5 w-5 text-blue-500" />
        ) : (
          <Star className="h-5 w-5 text-yellow-500" />
        )}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {activity.type === 'session' ? (
            `${activity.subject} ${translations[language].sessionWith} ${activity.student}`
          ) : (
            `${translations[language].newReviewFrom} ${activity.student}`
          )}
        </p>
        {activity.type === 'review' && (
          <div className="flex items-center mt-1">
            {[...Array(activity.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
            ))}
          </div>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {activity.type === 'review' ? activity.comment : `${translations[language].statusColon} ${activity.status}`}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.time}</p>
      </div>
    </div>
  </div>
);

const TutorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [requests, setRequests] = useState(mockRequests);
  const [sessions, setSessions] = useState(mockSessions);
  const [activeSession, setActiveSession] = useState<typeof mockSessions[0] | null>(null);
  const [language, setLanguage] = useState<'en' | 'ta'>('en'); // New state for language

  const handleRequestResponse = (requestId: string, status: 'accepted' | 'declined') => {
    console.log(`Handling request response for ID: ${requestId} with status: ${status}`);
    setRequests(prev => prev.map(request => 
      request.id === requestId ? { ...request, status } : request
    ));

    if (status === 'accepted') {
      const request = requests.find(r => r.id === requestId);
      if (request) {
        const newSession = {
          id: `session-${Date.now()}`,
          studentName: request.studentName,
          subject: request.subject,
          topic: request.topic,
          date: request.date,
          time: request.time,
          duration: request.duration,
          status: 'scheduled' as const,
          type: 'video' as const,
        };
        setSessions(prev => [...prev, newSession]);
        console.log('New session created:', newSession);
      }
    }
    console.log('Requests after update:', requests);
    console.log('Sessions after update:', sessions);
  };

  const handleStartSession = (session: typeof mockSessions[0]) => {
    console.log('Starting session:', session);
    setActiveSession(session);
  };

  const handleEndSession = () => {
    console.log('Ending session');
    setActiveSession(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={Users}
                title={translations[language].totalStudents}
                value={mockStats.totalStudents}
                subtitle={translations[language].activeLearners}
              />
              <StatCard
                icon={Clock}
                title={translations[language].teachingHours}
                value={mockStats.totalHours}
                subtitle={translations[language].thisMonth}
              />
              <StatCard
                icon={Star}
                title={translations[language].averageRating}
                value={mockStats.averageRating}
                subtitle={translations[language].outOfFive}
              />
              <StatCard
                icon={TrendingUp}
                title={translations[language].completionRate}
                value={`${mockStats.completionRate}%`}
                subtitle={translations[language].sessionCompletion}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activities */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{translations[language].recentActivities}</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {mockStats.recentActivities.map(activity => (
                      <ActivityCard key={activity.id} activity={activity} language={language} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{translations[language].performanceMetrics}</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{translations[language].avgResponseTime}</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">{mockStats.performanceMetrics.responseTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{translations[language].studentRetentionRate}</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">{mockStats.performanceMetrics.studentRetention}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{translations[language].satisfactionScore}</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">{mockStats.performanceMetrics.satisfactionScore}/5.0</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{translations[language].sessionCompletionRate}</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">{mockStats.performanceMetrics.sessionCompletion}%</p>
                    </div>
                  </div>
                </div>

                {/* Popular Subjects */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{translations[language].popularSubjects}</h2>
                  <div className="space-y-4">
                    {mockStats.popularSubjects.map((subject, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">{subject.name}</span>
                        <span className="text-gray-900 dark:text-white font-medium">{subject.students} {translations[language].students}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'profile':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{mockProfile.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{mockProfile.bio}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-600 dark:text-gray-400">{mockProfile.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-600 dark:text-gray-400">{mockProfile.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-600 dark:text-gray-400">{mockProfile.location}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{translations[language].subjects}</p>
                      <p className="text-gray-600 dark:text-gray-400">{mockProfile.subjects.join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Languages className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{translations[language].languages}</p>
                      <p className="text-gray-600 dark:text-gray-400">{mockProfile.languages.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{translations[language].education}</h3>
                <div className="space-y-4">
                  {mockProfile.education.map((edu, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="font-medium text-gray-900 dark:text-white">{edu.degree}</p>
                      <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{translations[language].availability}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(mockProfile.availability).map(([day, slots]) => (
                    <div key={day} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="font-medium text-gray-900 dark:text-white">{day}</p>
                      {slots.map((slot, index) => (
                        <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
                          {slot.start} - {slot.end}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'requests':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{translations[language].tutoringRequests}</h2>
            </div>
            <div className="p-6 space-y-6">
              {requests.map(request => (
                <div key={request.id} className="border dark:border-gray-700 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{request.studentName}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{request.subject} - {request.topic}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      request.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : request.status === 'accepted'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translations[language].date}</p>
                      <p className="text-gray-900 dark:text-white">{request.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translations[language].time}</p>
                      <p className="text-gray-900 dark:text-white">{request.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translations[language].duration}</p>
                      <p className="text-gray-900 dark:text-white">{request.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translations[language].level}</p>
                      <p className="text-gray-900 dark:text-white">{request.studentLevel}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{translations[language].additionalNotes}</p>
                    <p className="text-gray-900 dark:text-white">{request.additionalNotes}</p>
                  </div>

                  {request.status === 'pending' && (
                    <div className="mt-4 flex space-x-4">
                      <button
                        onClick={() => handleRequestResponse(request.id, 'accepted')}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        {translations[language].accept}
                      </button>
                      <button
                        onClick={() => handleRequestResponse(request.id, 'decline')}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        {translations[language].decline}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'sessions':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{translations[language].scheduledSessions}</h2>
            </div>
            <div className="p-6 space-y-6">
              {sessions.map(session => (
                <div key={session.id} className="border dark:border-gray-700 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{session.studentName}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{session.subject} - {session.topic}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translations[language].date}</p>
                      <p className="text-gray-900 dark:text-white">{session.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translations[language].time}</p>
                      <p className="text-gray-900 dark:text-white">{session.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translations[language].duration}</p>
                      <p className="text-gray-900 dark:text-white">{session.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translations[language].status}</p>
                      <p className="text-gray-900 dark:text-white">{session.status}</p>
                    </div>
                  </div>

                  {session.status === 'scheduled' && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleStartSession(session)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        {translations[language].startSession}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (activeSession) {
    return (
      <TutoringSession
        sessionId={activeSession.id}
        studentId="mock-student-id" // Replace with actual student ID if available in mock data
        subject={activeSession.subject}
        type={activeSession.type}
        onEnd={handleEndSession}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{translations[language].dashboardOverview}</h1>
        <p className="text-gray-600 dark:text-gray-300">{translations[language].welcomeMessage}</p>
      </div>

      {/* Language Toggle */}
      <div className="mb-4 flex space-x-2">
        <button 
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded ${
            language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {language === 'en' ? 'English' : 'ஆங்கிலம்'}
        </button>
        <button 
          onClick={() => setLanguage('ta')}
          className={`px-3 py-1 rounded ${
            language === 'ta' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {language === 'en' ? 'Tamil' : 'தமிழ்'}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'overview'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {translations[language].dashboardOverview}
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'profile'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {translations[language].tutorProfile}
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'requests'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {translations[language].tutoringRequests}
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'sessions'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {translations[language].scheduledSessions}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default TutorDashboard; 