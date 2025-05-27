import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, Clock, Filter, ChevronDown, Search, Plus, X, CheckCircle, Star, BookOpen, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { mockUsers, mockTutorSessions, mockTutorAvailabilities } from '../data/mockData';
import { SessionCard } from '../components/features/SessionCard';
import { UserBadge } from '../components/features/UserBadge';

export function EduBridge() {
  // Current user - in a real app would come from auth context
  const currentUser = mockUsers[0]; // Alex (student)
  
  const [activeTab, setActiveTab] = useState<'sessions' | 'tutors' | 'availability' | 'badges'>('sessions');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showTutorProfile, setShowTutorProfile] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<any>(null);
  
  // Form state
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [sessionSubject, setSessionSubject] = useState('');
  const [sessionTopic, setSessionTopic] = useState('');
  
  // Get user's tutor sessions
  const userSessions = mockTutorSessions.filter(
    session => session.studentId === currentUser.id || session.tutorId === currentUser.id
  );
  
  // Get available tutors
  const availableTutors = mockUsers.filter(user => 
    user.role === 'tutor' && 
    (!subjectFilter || user.subjects?.includes(subjectFilter))
  );

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Reset form state
  const resetFormState = () => {
    setSessionDate('');
    setSessionTime('');
    setSessionSubject('');
    setSessionTopic('');
    setSelectedTutor(null);
  };

  // Close request form and reset state
  const handleCloseRequestForm = () => {
    setShowRequestForm(false);
    resetFormState();
  };

  const handleBookSession = (tutor: any) => {
    try {
      // Create new session with default values
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1); // Book for tomorrow by default
      tomorrow.setHours(10, 0, 0, 0); // Set to 10:00 AM
      
      const newSession = {
        id: `session-${Date.now()}`,
        studentId: currentUser.id,
        tutorId: tutor.id,
        subject: tutor.subjects?.[0] || 'General', // Default to first subject
        topic: 'General Discussion',
        date: tomorrow, // Pass the Date object directly
        duration: 60, // Default duration
        status: 'scheduled',
        notes: ''
      };
      
      // Add to sessions (in a real app, this would be an API call)
      mockTutorSessions.push(newSession);
      
      // Show notification
      setNotificationMessage(`${tutor.name} உடன் வகுப்பு பதிவு செய்யப்பட்டது! உங்கள் வகுப்புகளில் சேர்க்கப்பட்டது.`);
      setShowNotification(true);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      
      // Switch to sessions tab
      setActiveTab('sessions');
    } catch (error) {
      console.error('Error booking session:', error);
      setNotificationMessage('வகுப்பு பதிவில் பிழை. மீண்டும் முயற்சிக்கவும்.');
      setShowNotification(true);
    }
  };

  const handleRequestSession = () => {
    try {
      if (!sessionDate || !sessionTime || !sessionSubject || !sessionTopic) {
        setNotificationMessage('அனைத்து விவரங்களையும் நிரப்பவும்');
        setShowNotification(true);
        return;
      }

      // Create a proper Date object from the date and time
      const [hours, minutes] = sessionTime.split(':').map(Number);
      const sessionDateTime = new Date(sessionDate);
      sessionDateTime.setHours(hours, minutes, 0, 0);

      // Validate date
      if (isNaN(sessionDateTime.getTime())) {
        setNotificationMessage('தவறான தேதி அல்லது நேர வடிவம்');
        setShowNotification(true);
        return;
      }

      // Show request submitted notification
      setNotificationMessage('வகுப்பு கோரிக்கை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! ஆசிரியர் உங்கள் கோரிக்கையை மதிப்பாய்வு செய்து உறுதிப்படுத்துவார்.');
      setShowNotification(true);
      
      // Reset form and close modal
      handleCloseRequestForm();
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      
      // Switch to sessions tab
      setActiveTab('sessions');
    } catch (error) {
      console.error('Error requesting session:', error);
      setNotificationMessage('கோரிக்கை சமர்ப்பிப்பதில் பிழை. மீண்டும் முயற்சிக்கவும்.');
      setShowNotification(true);
    }
  };

  const handleViewProfile = (tutor: any) => {
    setSelectedTutor(tutor);
    setShowTutorProfile(true);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  // Form labels and notifications
  const notifications = {
    fillFields: 'அனைத்து விவரங்களையும் நிரப்பவும்',
    invalidDate: 'தவறான தேதி அல்லது நேர வடிவம்',
    sessionBooked: (tutorName: string) => `${tutorName} உடன் வகுப்பு பதிவு செய்யப்பட்டது! உங்கள் வகுப்புகளில் சேர்க்கப்பட்டது.`,
    bookingError: 'வகுப்பு பதிவில் பிழை. மீண்டும் முயற்சிக்கவும்.',
    requestSubmitted: 'வகுப்பு கோரிக்கை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! ஆசிரியர் உங்கள் கோரிக்கையை மதிப்பாய்வு செய்து உறுதிப்படுத்துவார்.',
    requestError: 'கோரிக்கை சமர்ப்பிப்பதில் பிழை. மீண்டும் முயற்சிக்கவும்.'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50"
          >
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg shadow-lg p-4 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-3" />
              <p className="text-green-800 dark:text-green-200">{notificationMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">எடுபிரிட்ஜ்</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">ஆசிரியர்களுடன் இணைந்து உங்கள் கல்வியில் உதவி பெறுங்கள்</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary" 
            onClick={() => {
              setShowRequestForm(true);
              setSelectedTutor(null);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            வகுப்பு கோர
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('sessions')}
            className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
              activeTab === 'sessions'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            வகுப்புகள்
          </button>
          <button
            onClick={() => setActiveTab('tutors')}
            className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
              activeTab === 'tutors'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            ஆசிரியர்களைக் கண்டறிக
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
              activeTab === 'availability'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            கிடைக்கும் நேரம்
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
              activeTab === 'badges'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            பதக்கங்கள்
          </button>
        </nav>
      </div>

      {/* Request Session Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedTutor 
                  ? `${selectedTutor.name} உடன் வகுப்பு கோரிக்கை`
                  : 'புதிய வகுப்பு கோரிக்கை'}
              </h3>
              <button
                onClick={handleCloseRequestForm}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  தேதி
                </label>
                <Input
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  நேரம்
                </label>
                <Input
                  type="time"
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  பாடம்
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={sessionSubject}
                  onChange={(e) => setSessionSubject(e.target.value)}
                  required
                >
                  <option value="">பாடத்தைத் தேர்ந்தெடுக்கவும்</option>
                  <option value="Mathematics">கணிதம்</option>
                  <option value="Physics">இயற்பியல்</option>
                  <option value="Computer Science">கணினி அறிவியல்</option>
                  <option value="English Literature">ஆங்கில இலக்கியம்</option>
                  <option value="Writing">எழுத்து</option>
                  <option value="Economics">பொருளியல்</option>
                  <option value="Business">வணிகம்</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  தலைப்பு
                </label>
                <Input
                  type="text"
                  placeholder="குறிப்பிட்ட தலைப்பை உள்ளிடவும்"
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={handleCloseRequestForm}
              >
                ரத்து செய்
              </Button>
              <Button
                variant="primary"
                onClick={handleRequestSession}
              >
                வகுப்பு கோர
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Tutor Profile Modal */}
      {showTutorProfile && selectedTutor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <Avatar
                  src={selectedTutor.avatar}
                  alt={selectedTutor.name}
                  size="xl"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedTutor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedTutor.bio}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowTutorProfile(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  கற்பிக்கும் பாடங்கள்
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTutor.subjects?.map((subject: string) => (
                    <Badge key={subject} variant="primary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  வகுப்பு வரலாறு
                </h4>
                <div className="space-y-3">
                  {mockTutorSessions
                    .filter(session => session.tutorId === selectedTutor.id)
                    .slice(0, 3)
                    .map(session => (
                      <div
                        key={session.id}
                        className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                      >
                        <p className="font-medium text-gray-900 dark:text-white">
                          {session.subject}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          தலைப்பு: {session.topic}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(session.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowTutorProfile(false)}
              >
                மூடு
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowTutorProfile(false);
                  handleBookSession(selectedTutor);
                }}
              >
                வகுப்பு பதிவு செய்
              </Button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Sessions Tab */}
      {activeTab === 'sessions' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">உங்கள் வகுப்புகள்</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                நாட்காட்டி பார்வை
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                வடிகட்டி
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          
          {userSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userSessions.map((session) => {
                const tutor = mockUsers.find(u => u.id === session.tutorId)!;
                const student = mockUsers.find(u => u.id === session.studentId)!;
                
                return (
                  <motion.div
                    key={session.id}
                    {...fadeIn}
                  >
                    <SessionCard 
                      session={session} 
                      tutor={tutor} 
                      student={student} 
                      currentUserId={currentUser.id} 
                    />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <Calendar className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">வகுப்புகள் எதுவும் இல்லை</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                நீங்கள் இன்னும் எந்த வகுப்புகளையும் திட்டமிடவில்லை. ஒரு ஆசிரியரைக் கண்டறிந்து உங்கள் முதல் வகுப்பைப் பதிவு செய்யுங்கள்!
              </p>
              <Button variant="primary" onClick={() => setActiveTab('tutors')}>
                ஆசிரியரைக் கண்டறிக
              </Button>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Find Tutors Tab */}
      {activeTab === 'tutors' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">கிடைக்கும் ஆசிரியர்கள்</h2>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="ஆசிரியர்களைத் தேட..." 
                  className="pl-10"
                />
              </div>
              <select 
                className="h-10 w-full sm:w-auto rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
              >
                <option value="">அனைத்து பாடங்கள்</option>
                <option value="Mathematics">கணிதம்</option>
                <option value="Physics">இயற்பியல்</option>
                <option value="Computer Science">கணினி அறிவியல்</option>
                <option value="English Literature">ஆங்கில இலக்கியம்</option>
                <option value="Writing">எழுத்து</option>
                <option value="Economics">பொருளியல்</option>
                <option value="Business">வணிகம்</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTutors.map((tutor) => (
              <motion.div
                key={tutor.id}
                {...fadeIn}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Avatar 
                        src={tutor.avatar} 
                        alt={tutor.name} 
                        size="lg" 
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900 dark:text-white">{tutor.name}</h3>
                        <Badge variant="secondary" className="mt-1">
                          {tutor.points} points
                        </Badge>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          {tutor.bio}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Subjects:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tutor.subjects?.map((subject: string) => (
                          <Badge key={subject} variant="primary">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex space-x-3">
                      <Button 
                        variant="primary"
                        onClick={() => handleBookSession(tutor)}
                      >
                        வகுப்பு பதிவு செய்
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleViewProfile(tutor)}
                      >
                        சுயவிவரம் காண்க
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Availability Tab */}
      {activeTab === 'availability' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentUser.role === 'tutor' ? 'உங்கள் கிடைப்பு' : 'ஆசிரியர் கிடைப்பு'}
            </h2>
            {currentUser.role === 'tutor' && (
              <Button variant="primary" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                நேர வகை சேர்க்கவும்
              </Button>
            )}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
              {['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'].map((day) => (
                <div key={day} className="px-4 py-3 text-center font-medium text-gray-900 dark:text-white">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 min-h-[300px]">
              {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                const dayAvailability = mockTutorAvailabilities.filter(
                  avail => avail.dayOfWeek === dayIndex
                );
                
                return (
                  <div 
                    key={dayIndex}
                    className="border-r border-gray-200 dark:border-gray-700 last:border-r-0 p-2"
                  >
                    {dayAvailability.map((avail) => {
                      const tutor = mockUsers.find(u => u.id === avail.tutorId)!;
                      
                      return (
                        <motion.div
                          key={avail.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mb-2 p-2 bg-primary-100 dark:bg-primary-900/30 rounded text-xs"
                        >
                          <div className="flex items-center">
                            <Avatar 
                              src={tutor.avatar} 
                              alt={tutor.name} 
                              size="sm" 
                              className="mr-1"
                            />
                            <span className="font-medium">{tutor.name}</span>
                          </div>
                          <div className="mt-1 flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                            {avail.startTime} - {avail.endTime}
                          </div>
                          <div className="mt-1">
                            {avail.subjects.map((subject: string) => (
                              <Badge key={subject} variant="primary" size="sm" className="mr-1 mt-1">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                          {currentUser.role === 'student' && (
                            <Button variant="primary" size="sm" className="w-full mt-2 py-1 h-7">
                              பதிவு செய்யவும்
                            </Button>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">ஆசிரியர் சாதனைகள்</h2>
            <p className="text-gray-600 dark:text-gray-400">
              மாணவர்களுக்கு உதவி உயர்தர வகுப்புகளை நடத்துவதன் மூலம் பதக்கங்களைப் பெறுங்கள்
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>முன்னேற்ற விவரம்</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Avatar 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    size="xl" 
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentUser.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentUser.role === 'tutor' ? 'ஆசிரியர்' : 'மாணவர்'}
                  </p>
                  <div className="mt-2 flex items-center">
                    <Badge variant="primary" className="mr-2">
                      {currentUser.points} புள்ளிகள்
                    </Badge>
                    <Badge variant="accent">
                      {currentUser.badges.length} பதக்கங்கள் பெறப்பட்டன
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">அடுத்த நிலைக்கான புள்ளிகள்:</h4>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min((currentUser.points / 500) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-600 dark:text-gray-400">
                  <span>{currentUser.points} புள்ளிகள்</span>
                  <span>500 புள்ளிகள்</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Badges</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Tutor-specific badges */}
            <motion.div {...fadeIn}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Student Success</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Help 10 students achieve their goals</p>
                    </div>
                  </div>
                  <Badge variant="primary">In Progress</Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeIn}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center mr-4">
                      <Calendar className="h-6 w-6 text-success-600 dark:text-success-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Consistent Tutor</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Complete 20 sessions without cancellation</p>
                    </div>
                  </div>
                  <Badge variant="success">Earned</Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeIn}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-warning-100 dark:bg-warning-900/30 flex items-center justify-center mr-4">
                      <Star className="h-6 w-6 text-warning-600 dark:text-warning-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Top Rated</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Maintain a 4.5+ rating for 10 sessions</p>
                    </div>
                  </div>
                  <Badge variant="warning">In Progress</Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeIn}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mr-4">
                      <BookOpen className="h-6 w-6 text-accent-600 dark:text-accent-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Subject Expert</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Complete 15 sessions in a single subject</p>
                    </div>
                  </div>
                  <Badge variant="accent">Available</Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeIn}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4">
                      <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Time Management</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Complete 30 sessions on time</p>
                    </div>
                  </div>
                  <Badge variant="primary">Available</Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeIn}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center mr-4">
                      <MessageSquare className="h-6 w-6 text-success-600 dark:text-success-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Communication Pro</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receive 5 positive feedback comments</p>
                    </div>
                  </div>
                  <Badge variant="success">Earned</Badge>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}