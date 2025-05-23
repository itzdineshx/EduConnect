import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Network, Users, FileText } from 'lucide-react';
import { Module } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { cn } from '../../lib/utils';

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const iconMap: Record<string, ReactNode> = {
    'book-open': <BookOpen className="h-8 w-8" />,
    'network': <Network className="h-8 w-8" />,
    'users': <Users className="h-8 w-8" />,
    'file-text': <FileText className="h-8 w-8" />,
  };

  const colorMap: Record<string, string> = {
    'primary': 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20',
    'secondary': 'text-secondary-600 dark:text-secondary-400 bg-secondary-50 dark:bg-secondary-900/20',
    'accent': 'text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-900/20',
    'success': 'text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-900/20',
  };

  const borderColorMap: Record<string, string> = {
    'primary': 'hover:border-primary-200 dark:hover:border-primary-800',
    'secondary': 'hover:border-secondary-200 dark:hover:border-secondary-800',
    'accent': 'hover:border-accent-200 dark:hover:border-accent-800',
    'success': 'hover:border-success-200 dark:hover:border-success-800',
  };

  return (
    <Link to={module.path}>
      <Card 
        variant="bordered" 
        className={cn(
          "h-full transition-all duration-300 hover:-translate-y-1",
          borderColorMap[module.color]
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className={cn(
              "p-3 rounded-lg",
              colorMap[module.color]
            )}>
              {iconMap[module.icon]}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{module.name}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{module.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}