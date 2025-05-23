import { Award, Star, Network, Users, FileText } from 'lucide-react';
import { Badge as BadgeType } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

interface UserBadgeProps {
  badge: BadgeType;
  earned?: boolean;
}

export function UserBadge({ badge, earned = false }: UserBadgeProps) {
  const iconMap: Record<string, React.ReactNode> = {
    'award': <Award className="h-5 w-5" />,
    'star': <Star className="h-5 w-5" />,
    'network': <Network className="h-5 w-5" />,
    'users': <Users className="h-5 w-5" />,
    'file-text': <FileText className="h-5 w-5" />,
  };

  return (
    <Card
      variant={earned ? 'default' : 'bordered'}
      className={cn(
        'transition-all duration-300',
        earned ? 'hover:shadow-md' : 'opacity-60 hover:opacity-80'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className={cn(
            'p-2 rounded-full',
            earned
              ? 'bg-accent-100 text-accent-600 dark:bg-accent-900 dark:text-accent-300'
              : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
          )}>
            {iconMap[badge.icon]}
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              {badge.name}
              {earned && (
                <Badge
                  variant="accent"
                  size="sm"
                  className="ml-2"
                >
                  Earned
                </Badge>
              )}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {badge.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}