import { Calendar, Clock, MapPin, Video } from 'lucide-react';
import { TutorSession, User } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { formatDate } from '../../lib/utils';
import { Button } from '../ui/Button';

interface SessionCardProps {
  session: TutorSession;
  tutor: User;
  student: User;
  currentUserId: string;
}

export function SessionCard({ session, tutor, student, currentUserId }: SessionCardProps) {
  const isStudent = currentUserId === student.id;
  
  // Ensure we have a valid Date object
  const sessionTime = session.date instanceof Date ? session.date : new Date(session.date);
  const endTime = new Date(sessionTime.getTime() + session.duration * 60000);
  
  const formatTime = (date: Date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'Invalid time';
    }
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };
  
  const getStatusBadge = () => {
    switch (session.status) {
      case 'scheduled':
        return <Badge variant="primary">Scheduled</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="error">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Avatar 
              src={isStudent ? tutor.avatar : student.avatar} 
              alt={isStudent ? tutor.name : student.name} 
              size="md" 
            />
            <div className="ml-3">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {isStudent ? `Session with ${tutor.name}` : `Session with ${student.name}`}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{session.subject}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            {sessionTime instanceof Date && !isNaN(sessionTime.getTime()) 
              ? formatDate(sessionTime)
              : 'Invalid date'}
          </div>
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            {formatTime(sessionTime)} - {formatTime(endTime)} ({session.duration} min)
          </div>
          {session.notes && (
            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Notes:</span> {session.notes}
              </p>
            </div>
          )}
        </div>
        
        {session.status === 'scheduled' && (
          <div className="mt-4 flex space-x-2">
            <Button variant="primary">
              <Video className="h-4 w-4 mr-2" />
              Join Session
            </Button>
            <Button variant="outline">Reschedule</Button>
          </div>
        )}
        
        {session.status === 'completed' && session.rating && (
          <div className="mt-4 flex items-center">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Rating:</div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} filled={i < session.rating!} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg 
      className={`w-4 h-4 ${filled ? 'text-warning-500' : 'text-gray-300 dark:text-gray-600'}`} 
      fill="currentColor" 
      viewBox="0 0 20 20" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  );
}