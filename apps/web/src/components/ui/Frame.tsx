'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FrameProps {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

const frameVariants = {
  default: 'border-ascii-green text-ascii-green',
  success: 'border-ascii-green text-ascii-green',
  warning: 'border-ascii-amber text-ascii-amber',
  error: 'border-ascii-red text-ascii-red',
};

const frameSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function Frame({ 
  children, 
  title, 
  className, 
  variant = 'default',
  size = 'md'
}: FrameProps) {
  const variantClass = frameVariants[variant];
  const sizeClass = frameSizes[size];

  return (
    <div className={cn('ascii-frame', variantClass, sizeClass, className)}>
      {title && (
        <div className="frame-title">
          ┌─[ {title} ]─
        </div>
      )}
      <div className="frame-content">
        {children}
      </div>
      <div className="frame-bottom">
        └─────────────
      </div>
    </div>
  );
}

export function SimpleFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('border border-ascii-green/30 bg-ascii-dark-800/50 p-4', className)}>
      {children}
    </div>
  );
}