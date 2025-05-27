import { Calendar, Clock, BookOpen, MessageSquare } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface SessionCardProps {
  session: {
    id: string;
    studentId: string;
    tutorId: string;
    subject: string;
    topic: string;
    date: Date;
    duration: number;
    status: string;
    notes: string;
  };
  tutor: {
    id: string;
    name: string;
    avatar: string;
  };
  student: {
    id: string;
    name: string;
    avatar: string;
  };
  currentUserId: string;
}

export function SessionCard({ session, tutor, student, currentUserId }: SessionCardProps) {
  const isStudent = currentUserId === student.id;
  const otherUser = isStudent ? tutor : student;
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ta-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      scheduled: { label: 'திட்டமிடப்பட்டது', variant: 'primary' },
      completed: { label: 'முடிந்தது', variant: 'success' },
      cancelled: { label: 'ரத்து செய்யப்பட்டது', variant: 'destructive' },
      'in-progress': { label: 'நடைபெறுகிறது', variant: 'warning' }
    };
    
    return statusMap[status as keyof typeof statusMap] || { label: status, variant: 'default' };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <Avatar 
            src={otherUser.avatar} 
            alt={otherUser.name}
            size="lg"
          />
          <div className="ml-3">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {otherUser.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isStudent ? 'ஆசிரியர்' : 'மாணவர்'}
            </p>
          </div>
        </div>
        <Badge variant={getStatusBadge(session.status).variant as any}>
          {getStatusBadge(session.status).label}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <BookOpen className="h-4 w-4 mr-2" />
          <span>{session.subject} - {session.topic}</span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formatDate(session.date)}</span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Clock className="h-4 w-4 mr-2" />
          <span>{session.duration} நிமிடங்கள்</span>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <Button variant="outline" size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          செய்தி அனுப்பு
        </Button>
        
        {session.status === 'scheduled' && (
          <Button variant="destructive" size="sm">
            வகுப்பை ரத்து செய்
          </Button>
        )}
      </div>
    </div>
  );
}