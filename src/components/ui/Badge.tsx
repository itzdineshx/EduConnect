import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
      secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300',
      accent: 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-300',
      success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300',
      warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-300',
      error: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-300',
      outline: 'bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200',
    };

    const sizes = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-2.5 py-0.5',
      lg: 'px-3 py-1',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };