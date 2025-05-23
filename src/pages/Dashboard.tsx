import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Brain, Users, Star, MessageSquare, Mic, 
  Upload, BarChart2, Search, Filter, ChevronDown,
  Network, FileText, Calendar, Clock, Video
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { useAuth } from '../lib/auth';
import { mockUsers, mockTutorSessions, mockStudyGroups, mockNotes, mockNoteSummaries } from '../data/mockData';

export function Dashboard() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  
  // Get user's recent activity
  const recentSessions = mockTutorSessions
    .filter(session => session.studentId === user?.id || session.tutorId === user?.id)
    .slice(0, 3);
    
  const userGroups = mockStudyGroups
    .filter(group => group.members.includes(user?.id!) || group.ownerId === user?.id)
    .slice(0, 3);
    
  const userNotes = mockNotes
    .filter(note => note.userId === user?.id)
    .slice(0, 3);

  const handleAskAI = () => {
    // Implement AI question handling
    console.log('Asking AI:', aiQuestion);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Implement voice recording
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Your learning dashboard
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="primary" className="flex items-center">
            <Star className="h-4 w-4 mr-1" />
            {user?.points} points
          </Badge>
          <Button variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            New Session
          </Button>
        </div>
      </div>

      {/* AI Assistant Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Study Assistant
                </h2>
              </div>
              <div className="flex space-x-2">
                <Input
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ask anything about your studies..."
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={handleVoiceRecord}
                  className={isRecording ? 'bg-error-100 text-error-600' : ''}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button variant="primary" onClick={handleAskAI}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask AI
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <Upload className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Quick Upload
                </h2>
              </div>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Upload notes or recordings for AI processing
                </p>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentSessions.length > 0 ? (
              <div className="space-y-4">
                {recentSessions.map((session) => {
                  const otherUser = mockUsers.find(u => 
                    u.id === (user?.id === session.studentId ? session.tutorId : session.studentId)
                  )!;
                  
                  return (
                    <div key={session.id} className="flex items-center space-x-4">
                      <Avatar src={otherUser.avatar} alt={otherUser.name} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {session.subject}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          with {otherUser.name}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-1" />
                        Join
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No upcoming sessions
              </p>
            )}
          </CardContent>
        </Card>

        {/* Study Groups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
              Your Study Groups
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userGroups.length > 0 ? (
              <div className="space-y-4">
                {userGroups.map((group) => (
                  <div key={group.id} className="flex items-center space-x-4">
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 3).map((memberId) => {
                        const member = mockUsers.find(u => u.id === memberId)!;
                        return (
                          <Avatar 
                            key={member.id}
                            src={member.avatar}
                            alt={member.name}
                            className="border-2 border-white dark:border-gray-800"
                          />
                        );
                      })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {group.name}
                      </p>
                      <Badge variant="secondary" size="sm">
                        {group.subject}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No study groups joined
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
              Recent Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userNotes.length > 0 ? (
              <div className="space-y-4">
                {userNotes.map((note) => {
                  const summary = mockNoteSummaries.find(s => s.noteId === note.id);
                  
                  return (
                    <div key={note.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {note.title}
                        </h4>
                        <Badge variant="outline" size="sm">
                          {note.tags[0]}
                        </Badge>
                      </div>
                      {summary && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                          {summary.summary}
                        </p>
                      )}
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Flashcards
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No notes created yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Progress Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Study Time</span>
                  <span className="font-medium text-gray-900 dark:text-white">12.5 hrs</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '70%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Flashcards Mastered</span>
                  <span className="font-medium text-gray-900 dark:text-white">45/60</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-success-600 h-2 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Session Attendance</span>
                  <span className="font-medium text-gray-900 dark:text-white">90%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-accent-600 h-2 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mind Maps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Network className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
              Mind Maps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Physics Concepts
                </h4>
                <Badge variant="secondary" size="sm">
                  Collaborative
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Math Formulas
                </h4>
                <Badge variant="outline" size="sm">
                  Private
                </Badge>
              </div>
              <Button variant="outline" className="w-full">
                <Network className="h-4 w-4 mr-2" />
                Create New Mind Map
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-primary-900 dark:text-primary-100">
                  Advanced Physics Tutorial
                </h4>
                <p className="text-xs text-primary-700 dark:text-primary-300 mt-1">
                  Based on your recent questions
                </p>
              </div>
              <div className="p-3 bg-accent-50 dark:bg-accent-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-accent-900 dark:text-accent-100">
                  Study Group: Calculus II
                </h4>
                <p className="text-xs text-accent-700 dark:text-accent-300 mt-1">
                  Matches your interests
                </p>
              </div>
              <div className="p-3 bg-success-50 dark:bg-success-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-success-900 dark:text-success-100">
                  New Flashcard Set
                </h4>
                <p className="text-xs text-success-700 dark:text-success-300 mt-1">
                  Generated from your notes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}