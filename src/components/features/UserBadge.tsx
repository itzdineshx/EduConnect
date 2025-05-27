import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

interface UserBadgeProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    points: number;
  };
}

export function UserBadge({ user }: UserBadgeProps) {
  return (
    <div className="flex items-center space-x-3">
      <Avatar 
        src={user.avatar} 
        alt={user.name} 
        size="sm" 
      />
      <div>
        <div className="font-medium text-gray-900 dark:text-white">
          {user.name}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {user.role === 'tutor' ? 'ஆசிரியர்' : 'மாணவர்'}
        </div>
      </div>
      <Badge variant="primary" className="ml-auto">
        {user.points} புள்ளிகள்
      </Badge>
    </div>
  );
}