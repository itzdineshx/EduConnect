import { ImgHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  initials?: string;
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, size = 'md', src, alt, initials, ...props }, ref) => {
    const sizes = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    };

    if (!src && initials) {
      return (
        <div
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium',
            sizes[size],
            className
          )}
          aria-label={alt}
        >
          {initials}
        </div>
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn('rounded-full object-cover', sizes[size], className)}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };