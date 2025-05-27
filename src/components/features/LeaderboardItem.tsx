import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

interface LeaderboardItemProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    points: number;
    role: string;
    badges: string[];
  };
  rank: number;
}

export function LeaderboardItem({ user, rank }: LeaderboardItemProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-8 text-center font-semibold text-gray-600 dark:text-gray-400">
          #{rank}
        </div>
        <Avatar 
          src={user.avatar} 
          alt={user.name} 
          size="md" 
          className="ml-4" 
        />
        <div className="ml-4">
          <h4 className="font-medium text-gray-900 dark:text-white">
            {user.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user.role === 'tutor' ? 'ஆசிரியர்' : 'மாணவர்'}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Badge variant="primary">
          {user.points} புள்ளிகள்
        </Badge>
        <Badge variant="secondary">
          {user.badges.length} பதக்கங்கள்
        </Badge>
      </div>
    </div>
  );
}