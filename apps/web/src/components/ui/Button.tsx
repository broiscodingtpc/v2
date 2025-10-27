'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const buttonVariants = {
  default: 'bg-ascii-green/20 border-ascii-green text-ascii-green hover:bg-ascii-green/30',
  outline: 'border-ascii-green text-ascii-green hover:bg-ascii-green/10',
  ghost: 'text-ascii-green hover:bg-ascii-green/10',
  success: 'bg-ascii-green/20 border-ascii-green text-ascii-green hover:bg-ascii-green/30',
  warning: 'bg-ascii-amber/20 border-ascii-amber text-ascii-amber hover:bg-ascii-amber/30',
  error: 'bg-ascii-red/20 border-ascii-red text-ascii-red hover:bg-ascii-red/30',
};

const buttonSizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', loading, children, disabled, ...props }, ref) => {
    const variantClass = buttonVariants[variant];
    const sizeClass = buttonSizes[size];

    return (
      <button
        ref={ref}
        className={cn(
          'ascii-button font-mono border transition-colors duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus:ring-2 focus:ring-ascii-green/50',
          variantClass,
          sizeClass,
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⟳</span>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';