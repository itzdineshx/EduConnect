import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Clock, MapPin, Video, Search, Filter, ChevronDown, Users, CheckCircle, XCircle, X, Settings, UserPlus, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { mockStudyGroups, mockStudySessions, mockUsers, StudyGroup, StudySession, User } from '../data/mockData';
import { formatDate } from '../lib/utils';

export function StudyBuddy() {
  // Current user - in a real app would come from auth context
  const currentUser = mockUsers[0]; // Alex (student)
  
  const [activeTab, setActiveTab] = useState<'groups' | 'sessions' | 'recommended'>('groups');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [showGroupDetailModal, setShowGroupDetailModal] = useState(false);
  const [selectedGroupDetail, setSelectedGroupDetail] = useState<StudyGroup | null>(null);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showManageGroupModal, setShowManageGroupModal] = useState(false);
  const [showLeaveConfirmModal, setShowLeaveConfirmModal] = useState(false);
  const [groupToLeave, setGroupToLeave] = useState<StudyGroup | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [showScheduleSessionModal, setShowScheduleSessionModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [sessionNotes, setSessionNotes] = useState<{ [sessionId: string]: string }>({});
  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    time: '',
    duration: 60,
    agenda: '',
    resources: '',
  });
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    subject: '',
    capacity: 5,
    isOnline: false,
    location: '',
    meetingLink: ''
  });
  
  // Filter study groups based on subject
  const filteredGroups = mockStudyGroups.filter(
    group => !subjectFilter || group.subject === subjectFilter
  );
  
  // Get user's study groups
  const userGroups = mockStudyGroups.filter(
    group => group.members.includes(currentUser.id) || group.ownerId === currentUser.id
  );
  
  // Get upcoming sessions for user's groups
  const userSessions = mockStudySessions.filter(
    session => {
      const group = mockStudyGroups.find(g => g.id === session.groupId);
      return group && (group.members.includes(currentUser.id) || group.ownerId === currentUser.id);
    }
  );
  
  // Get recommended groups based on user's subjects
  const recommendedGroups = mockStudyGroups.filter(
    group => 
      !userGroups.some(g => g.id === group.id) && // Not already in these groups
      currentUser.subjects?.includes(group.subject) // Matching subject
  );
  
  // Handle viewing group details
  const handleViewGroup = (group: StudyGroup) => {
    setSelectedGroupDetail(group);
    setShowGroupDetailModal(true);
  };

  // Handle closing group detail modal
  const handleCloseGroupDetailModal = () => {
    setSelectedGroupDetail(null);
    setShowGroupDetailModal(false);
  };

  // Find sessions for the selected group
  const selectedGroupSessions = selectedGroupDetail 
    ? mockStudySessions.filter(session => session.groupId === selectedGroupDetail.id)
    : [];

  // Find members for the selected group
  const selectedGroupMembers = selectedGroupDetail 
    ? selectedGroupDetail.members.map(memberId => mockUsers.find(user => user.id === memberId)!)
    : [];

  // Handle creating a new study group
  const handleCreateGroup = () => {
    const newGroupData: StudyGroup = {
      id: `g${mockStudyGroups.length + 1}`,
      name: newGroup.name,
      description: newGroup.description,
      ownerId: currentUser.id,
      members: [currentUser.id],
      subject: newGroup.subject,
      capacity: newGroup.capacity,
      isOnline: newGroup.isOnline,
      location: newGroup.isOnline ? undefined : newGroup.location,
      meetingLink: newGroup.isOnline ? newGroup.meetingLink : undefined,
      createdAt: new Date()
    };

    mockStudyGroups.push(newGroupData);
    setShowCreateGroupModal(false);
    setNewGroup({
      name: '',
      description: '',
      subject: '',
      capacity: 5,
      isOnline: false,
      location: '',
      meetingLink: ''
    });
  };

  // Handle input changes for new group form
  const handleNewGroupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewGroup(prev => ({
      ...prev,
      [name]: name === 'capacity' ? parseInt(value) : value
    }));
  };

  // Handle leaving a group
  const handleLeaveGroup = (group: StudyGroup) => {
    setGroupToLeave(group);
    setShowLeaveConfirmModal(true);
  };

  // Confirm leaving a group
  const confirmLeaveGroup = () => {
    if (groupToLeave) {
      const groupIndex = mockStudyGroups.findIndex(g => g.id === groupToLeave.id);
      if (groupIndex !== -1) {
        mockStudyGroups[groupIndex].members = mockStudyGroups[groupIndex].members.filter(
          id => id !== currentUser.id
        );
      }
      setShowLeaveConfirmModal(false);
      setGroupToLeave(null);
    }
  };

  // Handle managing a group
  const handleManageGroup = (group: StudyGroup) => {
    setSelectedGroupDetail(group);
    setShowManageGroupModal(true);
  };

  // Handle inviting a member
  const handleInviteMember = () => {
    if (inviteEmail && selectedGroupDetail) {
      // In a real app, this would send an invitation email
      console.log(`Invitation sent to ${inviteEmail} for group ${selectedGroupDetail.name}`);
      setInviteEmail('');
    }
  };

  // Handle removing a member
  const handleRemoveMember = (memberId: string) => {
    if (selectedGroupDetail) {
      const groupIndex = mockStudyGroups.findIndex(g => g.id === selectedGroupDetail.id);
      if (groupIndex !== -1) {
        mockStudyGroups[groupIndex].members = mockStudyGroups[groupIndex].members.filter(
          id => id !== memberId
        );
        setSelectedGroupDetail({
          ...selectedGroupDetail,
          members: selectedGroupDetail.members.filter(id => id !== memberId)
        });
      }
    }
  };

  // Handle joining a session
  const handleJoinSession = (sessionId: string) => {
    const sessionIndex = mockStudySessions.findIndex(s => s.id === sessionId);
    if (sessionIndex !== -1) {
      const session = mockStudySessions[sessionIndex];
      if (!session.attendees.includes(currentUser.id)) {
        session.attendees.push(currentUser.id);
        // Update state to trigger re-render if necessary (for mock data, direct push works)
        // For a real app, you'd typically update state with a new array:
        // setMockStudySessions([...mockStudySessions]);
        setNotificationMessage(`Joined session: ${session.title}`);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } else {
        setNotificationMessage(`You are already attending: ${session.title}`);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    }
  };

  // Handle cancelling attendance for a session
  const handleCancelAttendance = (sessionId: string) => {
    const sessionIndex = mockStudySessions.findIndex(s => s.id === sessionId);
    if (sessionIndex !== -1) {
      const session = mockStudySessions[sessionIndex];
      if (session.attendees.includes(currentUser.id)) {
        session.attendees = session.attendees.filter(id => id !== currentUser.id);
        // Update state to trigger re-render if necessary
        setNotificationMessage(`Cancelled attendance for: ${session.title}`);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } else {
        setNotificationMessage(`You were not attending: ${session.title}`);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    }
  };

  // Handle scheduling a new session
  const handleScheduleSession = () => {
    if (selectedGroupDetail && newSession.title && newSession.date && newSession.time) {
      const sessionDate = new Date(`${newSession.date}T${newSession.time}:00`);
      
      const newSessionData: StudySession = {
        id: `s${mockStudySessions.length + 1}`,
        groupId: selectedGroupDetail.id,
        title: newSession.title,
        date: sessionDate.toISOString(), // Store date as ISO string
        duration: newSession.duration,
        agenda: newSession.agenda,
        resources: newSession.resources.split(',').map(res => res.trim()).filter(res => res),
        attendees: [currentUser.id]
      };
      
      mockStudySessions.push(newSessionData as any); // Add to mock data
      setShowScheduleSessionModal(false);
      setNewSession({
        title: '',
        date: '',
        time: '',
        duration: 60,
        agenda: '',
        resources: '',
      });
      // Optionally, update the selectedGroupDetail to show the new session immediately
      // This might require refetching or manually adding the session to selectedGroupDetail.sessions if it existed
    }
  };

  // Handle input changes for new session form
  const handleNewSessionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSession(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) : value
    }));
  };

  // Handle saving session notes (using localStorage for persistence)
  const handleSaveSessionNotes = (sessionId: string, notes: string) => {
    setSessionNotes(prev => ({
      ...prev,
      [sessionId]: notes,
    }));
    localStorage.setItem(`sessionNotes-${currentUser.id}-${sessionId}`, notes);
    setNotificationMessage(`Notes saved for session: ${mockStudySessions.find(s => s.id === sessionId)?.title}`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Load session notes from localStorage on component mount
  useState(() => {
    const loadedNotes: { [sessionId: string]: string } = {};
    mockStudySessions.forEach(session => {
      const savedNotes = localStorage.getItem(`sessionNotes-${currentUser.id}-${session.id}`);
      if (savedNotes) {
        loadedNotes[session.id] = savedNotes;
      }
    });
    setSessionNotes(loadedNotes);
  }); // Empty dependency array to run only once on mount

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };
  
  // Session Materials Rendering Helper
  const renderSessionMaterials = (resources: string[] | undefined) => {
    if (!resources || resources.length === 0) {
      return <p className="text-sm text-gray-600 dark:text-gray-400">No materials provided.</p>;
    }
    return (
      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
        {resources.map((resource, index) => (
          <li key={index} className="flex items-center">
            <span className="mr-2 text-gray-500 dark:text-gray-400">•</span>
            {/* Check if the resource is a URL */}
            {resource.startsWith('http://') || resource.startsWith('https://') ? (
              <a href={resource} target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">
                {resource}
              </a>
            ) : (
              <span>{resource}</span>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">StudyBuddy</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Find or create study groups for collaborative learning</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="primary" onClick={() => setShowCreateGroupModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Study Group
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('groups')}
            className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
              activeTab === 'groups'
                ? 'border-accent-500 text-accent-600 dark:text-accent-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Your Groups
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
              activeTab === 'sessions'
                ? 'border-accent-500 text-accent-600 dark:text-accent-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Upcoming Sessions
          </button>
          <button
            onClick={() => setActiveTab('recommended')}
            className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
              activeTab === 'recommended'
                ? 'border-accent-500 text-accent-600 dark:text-accent-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Recommended
          </button>
        </nav>
      </div>
      
      {/* Your Groups Tab */}
      {activeTab === 'groups' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Study Groups</h2>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search groups..." 
                  className="pl-10"
                />
              </div>
              <select 
                className="h-10 w-full sm:w-auto rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
              >
                <option value="">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="English Literature">English Literature</option>
                <option value="Economics">Economics</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>
          
          {userGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userGroups.map((group) => {
                const owner = mockUsers.find(u => u.id === group.ownerId)!;
                const isOwner = group.ownerId === currentUser.id;
                
                // Get members excluding owner
                const members = group.members
                  .filter(id => id !== group.ownerId)
                  .map(id => mockUsers.find(u => u.id === id)!)
                  .slice(0, 3); // Show max 3
                
                return (
                  <motion.div
                    key={group.id}
                    {...fadeIn}
                  >
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{group.name}</CardTitle>
                          <Badge variant="accent">{group.subject}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        {group.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {group.description}
                          </p>
                        )}
                        
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                            <Users className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                            {group.members.length} / {group.capacity} members
                          </div>
                          
                          {group.location && (
                            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <MapPin className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                              {group.location}
                            </div>
                          )}
                          
                          {group.isOnline && group.meetingLink && (
                            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <Video className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                              Online Meeting
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Members:</h4>
                          <div className="flex items-center">
                            <div className="flex -space-x-2 mr-2">
                              <Avatar 
                                src={owner.avatar} 
                                alt={owner.name} 
                                size="sm" 
                                className="border-2 border-white dark:border-gray-800"
                              />
                              {members.map((member) => (
                                <Avatar 
                                  key={member.id}
                                  src={member.avatar} 
                                  alt={member.name} 
                                  size="sm" 
                                  className="border-2 border-white dark:border-gray-800"
                                />
                              ))}
                            </div>
                            {group.members.length > 4 && (
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                +{group.members.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex space-x-2 w-full">
                          <Button variant="primary" className="flex-1" onClick={() => handleViewGroup(group)}>
                            View Group
                          </Button>
                          {isOwner ? (
                            <Button variant="outline" onClick={() => handleManageGroup(group)}>
                              <Settings className="h-4 w-4 mr-2" />
                              Manage
                            </Button>
                          ) : (
                            <Button variant="outline" onClick={() => handleLeaveGroup(group)}>
                              <XCircle className="h-4 w-4 mr-2" />
                              Leave
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <Users className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No study groups yet</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                You're not a member of any study groups yet. Create a new one or join an existing group.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Study Group
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('recommended')}>
                  Browse Groups
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Group Detail Modal */}
      {showGroupDetailModal && selectedGroupDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedGroupDetail.name}
              </h3>
              <button
                onClick={handleCloseGroupDetailModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Subject:</p>
                <Badge variant="accent">{selectedGroupDetail.subject}</Badge>
              </div>
              {selectedGroupDetail.description && (
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Description:</p>
                  <p className="text-sm">{selectedGroupDetail.description}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Members:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedGroupMembers.map((member: User) => (
                    <div key={member.id} className="flex items-center text-sm">
                      <Avatar src={member.avatar} alt={member.name} size="sm" className="mr-1" />
                      <span>{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Upcoming Sessions:</p>
                {selectedGroupSessions.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedGroupSessions.map((session: StudySession) => (
                      <li key={session.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                        <p className="font-medium text-gray-900 dark:text-white">{session.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          <Calendar className="h-3 w-3 inline-block mr-1" />{formatDate(new Date(session.date))}
                          <Clock className="h-3 w-3 inline-block mx-1" />{new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {session.agenda && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Topic: {session.agenda}
                          </p>
                        )}
                        {/* Display materials in group detail modal */}
                        <div className="mt-3">
                          <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Materials:</h5>
                          {renderSessionMaterials(session.resources)}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">No upcoming sessions.</p>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={handleCloseGroupDetailModal}>
                Close
              </Button>
              {selectedGroupDetail.ownerId === currentUser.id && (
                <Button variant="primary" onClick={() => setShowScheduleSessionModal(true)}>
                  Schedule Session
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Upcoming Sessions Tab */}
      {activeTab === 'sessions' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Study Sessions</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar View
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          
          {userSessions.length > 0 ? (
            <div className="space-y-4">
              {userSessions
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((session) => {
                  const group = mockStudyGroups.find(g => g.id === session.groupId)!;
                  const sessionTime = new Date(session.date);
                  const endTime = new Date(sessionTime.getTime() + session.duration * 60000);
                  
                  const formatTime = (date: Date) => {
                    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                  };
                  
                  return (
                    <motion.div
                      key={session.id}
                      {...fadeIn}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{session.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Group: {group.name}
                              </p>
                            </div>
                            <Badge variant="accent" className="mt-2 md:mt-0">
                              {group.subject}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-3">
                              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                                {formatDate(session.date)}
                              </div>
                              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                                {formatTime(sessionTime)} - {formatTime(endTime)} ({session.duration} min)
                              </div>
                              {group.location && !group.isOnline && (
                                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                  <MapPin className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                                  {group.location}
                                </div>
                              )}
                              {group.isOnline && (
                                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                  <Video className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                                  Online Meeting
                                </div>
                              )}
                            </div>
                            
                            <div>
                              {session.agenda && (
                                <div className="mb-3">
                                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Agenda:</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {session.agenda}
                                  </p>
                                </div>
                              )}
                              
                              {/* Display materials in session card */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Materials:</h4>
                                {renderSessionMaterials(session.resources)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex -space-x-2 mr-2">
                                {session.attendees.slice(0, 3).map((attendeeId) => {
                                  const attendee = mockUsers.find(u => u.id === attendeeId)!;
                                  return (
                                    <Avatar 
                                      key={attendee.id}
                                      src={attendee.avatar} 
                                      alt={attendee.name} 
                                      size="sm" 
                                      className="border-2 border-white dark:border-gray-800"
                                    />
                                  );
                                })}
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {session.attendees.length} attending
                              </span>
                            </div>
                            
                            <div className="flex space-x-2">
                              {group.isOnline && group.meetingLink && (
                                <Button variant="primary">
                                  <Video className="h-4 w-4 mr-2" />
                                  Join Session
                                </Button>
                              )}
                              <Button variant="outline"
                                onClick={() => {
                                  if (session.attendees.includes(currentUser.id)) {
                                    handleCancelAttendance(session.id);
                                  } else {
                                    handleJoinSession(session.id);
                                  }
                                }}
                              >
                                {session.attendees.includes(currentUser.id) ? (
                                  <>
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Cancel
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Attend
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <Calendar className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No upcoming sessions</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                You don't have any upcoming study sessions. Create a new session or join an existing one.
              </p>
              <Button variant="primary">
                Schedule Session
              </Button>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Recommended Tab */}
      {activeTab === 'recommended' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recommended For You</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Based on your subjects: {currentUser.subjects?.join(', ')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search groups..." 
                  className="pl-10"
                />
              </div>
              <select 
                className="h-10 w-full sm:w-auto rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
              >
                <option value="">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="English Literature">English Literature</option>
                <option value="Economics">Economics</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>
          
          {recommendedGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedGroups.map((group) => {
                const owner = mockUsers.find(u => u.id === group.ownerId)!;
                
                // Get members excluding owner
                const members = group.members
                  .filter(id => id !== group.ownerId)
                  .map(id => mockUsers.find(u => u.id === id)!)
                  .slice(0, 3); // Show max 3
                
                return (
                  <motion.div
                    key={group.id}
                    {...fadeIn}
                  >
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{group.name}</CardTitle>
                          <Badge variant="accent">{group.subject}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        {group.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {group.description}
                          </p>
                        )}
                        
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                            <Users className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                            {group.members.length} / {group.capacity} members
                          </div>
                          
                          {group.location && (
                            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <MapPin className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                              {group.location}
                            </div>
                          )}
                          
                          {group.isOnline && group.meetingLink && (
                            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <Video className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                              Online Meeting
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Members:</h4>
                          <div className="flex items-center">
                            <div className="flex -space-x-2 mr-2">
                              <Avatar 
                                src={owner.avatar} 
                                alt={owner.name} 
                                size="sm" 
                                className="border-2 border-white dark:border-gray-800"
                              />
                              {members.map((member) => (
                                <Avatar 
                                  key={member.id}
                                  src={member.avatar} 
                                  alt={member.name} 
                                  size="sm" 
                                  className="border-2 border-white dark:border-gray-800"
                                />
                              ))}
                            </div>
                            {group.members.length > 4 && (
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                +{group.members.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex space-x-2 w-full">
                          <Button variant="primary" className="flex-1">
                            Join Group
                          </Button>
                          <Button variant="outline">
                            Learn More
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <Users className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No recommended groups</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                We couldn't find any study groups that match your subjects. Try updating your profile or browsing all groups.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="primary">
                  Browse All Groups
                </Button>
                <Button variant="outline">
                  Update Interests
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Create Study Group Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create New Study Group
              </h3>
              <button
                onClick={() => setShowCreateGroupModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Group Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={newGroup.name}
                  onChange={handleNewGroupChange}
                  placeholder="Enter group name"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newGroup.description}
                  onChange={handleNewGroupChange}
                  placeholder="Enter group description"
                  className="w-full h-24 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <select
                  name="subject"
                  value={newGroup.subject}
                  onChange={handleNewGroupChange}
                  className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="English Literature">English Literature</option>
                  <option value="Economics">Economics</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Capacity
                </label>
                <Input
                  type="number"
                  name="capacity"
                  value={newGroup.capacity}
                  onChange={handleNewGroupChange}
                  min="2"
                  max="20"
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isOnline"
                  name="isOnline"
                  checked={newGroup.isOnline}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, isOnline: e.target.checked }))}
                  className="h-4 w-4 text-accent-600 focus:ring-accent-500 border-gray-300 rounded"
                />
                <label htmlFor="isOnline" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  This is an online study group
                </label>
              </div>
              
              {newGroup.isOnline ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Meeting Link
                  </label>
                  <Input
                    type="text"
                    name="meetingLink"
                    value={newGroup.meetingLink}
                    onChange={handleNewGroupChange}
                    placeholder="Enter meeting link"
                    className="w-full"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <Input
                    type="text"
                    name="location"
                    value={newGroup.location}
                    onChange={handleNewGroupChange}
                    placeholder="Enter meeting location"
                    className="w-full"
                  />
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowCreateGroupModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleCreateGroup}
                disabled={!newGroup.name || !newGroup.subject}
              >
                Create Group
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Leave Group Confirmation Modal */}
      {showLeaveConfirmModal && groupToLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Leave Study Group
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to leave "{groupToLeave.name}"? You can rejoin later if you change your mind.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowLeaveConfirmModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={confirmLeaveGroup}>
                Leave Group
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Manage Group Modal */}
      {showManageGroupModal && selectedGroupDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Manage {selectedGroupDetail.name}
              </h3>
              <button
                onClick={() => setShowManageGroupModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Invite Members Section */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Invite Members</h4>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="primary" onClick={handleInviteMember}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite
                  </Button>
                </div>
              </div>
              
              {/* Current Members Section */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Current Members</h4>
                <div className="space-y-2">
                  {selectedGroupDetail.members.map(memberId => {
                    const member = mockUsers.find(u => u.id === memberId)!;
                    const isOwner = memberId === selectedGroupDetail.ownerId;
                    
                    return (
                      <div key={memberId} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
                        <div className="flex items-center">
                          <Avatar src={member.avatar} alt={member.name} size="sm" className="mr-2" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {member.name}
                            {isOwner && <span className="ml-2 text-xs text-gray-500">(Owner)</span>}
                          </span>
                        </div>
                        {!isOwner && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(memberId)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Group Settings Section */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Group Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Group Name
                    </label>
                    <Input
                      type="text"
                      value={selectedGroupDetail.name}
                      onChange={(e) => {
                        const groupIndex = mockStudyGroups.findIndex(g => g.id === selectedGroupDetail.id);
                        if (groupIndex !== -1) {
                          mockStudyGroups[groupIndex].name = e.target.value;
                          setSelectedGroupDetail({...selectedGroupDetail, name: e.target.value});
                        }
                      }}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={selectedGroupDetail.description}
                      onChange={(e) => {
                        const groupIndex = mockStudyGroups.findIndex(g => g.id === selectedGroupDetail.id);
                        if (groupIndex !== -1) {
                          mockStudyGroups[groupIndex].description = e.target.value;
                          setSelectedGroupDetail({...selectedGroupDetail, description: e.target.value});
                        }
                      }}
                      className="w-full h-24 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={() => setShowManageGroupModal(false)}>
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Schedule Session Modal */}
      {showScheduleSessionModal && selectedGroupDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Schedule New Session for {selectedGroupDetail.name}
              </h3>
              <button
                onClick={() => setShowScheduleSessionModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Session Title
                </label>
                <Input
                  type="text"
                  name="title"
                  value={newSession.title}
                  onChange={handleNewSessionChange}
                  placeholder="Enter session title"
                  className="w-full"
                />
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <Input
                    type="date"
                    name="date"
                    value={newSession.date}
                    onChange={handleNewSessionChange}
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time
                  </label>
                  <Input
                    type="time"
                    name="time"
                    value={newSession.time}
                    onChange={handleNewSessionChange}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Duration (minutes)
                </label>
                <Input
                  type="number"
                  name="duration"
                  value={newSession.duration}
                  onChange={handleNewSessionChange}
                  min="15"
                  step="15"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Agenda
                </label>
                <textarea
                  name="agenda"
                  value={newSession.agenda}
                  onChange={handleNewSessionChange}
                  placeholder="Outline session topics and goals"
                  className="w-full h-24 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Resources (comma-separated URLs or notes)
                </label>
                <textarea
                  name="resources"
                  value={newSession.resources}
                  onChange={handleNewSessionChange}
                  placeholder="e.g., https://example.com/doc, Notes on Chapter 3"
                  className="w-full h-20 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowScheduleSessionModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleScheduleSession}
                disabled={!newSession.title || !newSession.date || !newSession.time}
              >
                Schedule Session
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Notification */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {notificationMessage}
        </div>
      )}
    </div>
  );
}