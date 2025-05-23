import { User } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

interface LeaderboardItemProps {
  user: User;
  rank: number;
}

export function LeaderboardItem({ user, rank }: LeaderboardItemProps) {
  // Get initials if no avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Style for rank badges
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-warning-400 text-white';
    if (rank === 2) return 'bg-gray-300 text-gray-800';
    if (rank === 3) return 'bg-warning-700 text-white';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  return (
    <div className="flex items-center p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${getRankStyle(rank)}`}>
        {rank}
      </div>
      <div className="ml-3 flex-shrink-0">
        <Avatar 
          src={user.avatar} 
          alt={user.name} 
          initials={getInitials(user.name)} 
          size="md" 
        />
      </div>
      <div className="ml-3 min-w-0 flex-1">
        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {user.name}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {user.role === 'tutor' ? 'Tutor' : 'Student'}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Badge variant="primary" className="flex items-center">
          <span className="font-semibold">{user.points}</span>
          <span className="ml-1 text-xs">pts</span>
        </Badge>
        <Badge variant="accent" className="hidden sm:flex">
          {user.badges.length} badges
        </Badge>
      </div>
    </div>
  );
}