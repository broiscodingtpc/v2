'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-mono text-ascii-green">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'ascii-input w-full px-3 py-2 font-mono text-sm',
            'bg-ascii-dark-800 border border-ascii-green/30',
            'text-ascii-green placeholder-ascii-gray-500',
            'focus:outline-none focus:border-ascii-green focus:ring-1 focus:ring-ascii-green/50',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-ascii-red focus:border-ascii-red focus:ring-ascii-red/50',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs font-mono text-ascii-red">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';