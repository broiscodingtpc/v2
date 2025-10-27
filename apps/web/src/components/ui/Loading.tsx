'use client';

import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const loadingSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Loading({ size = 'md', text = 'Loading', className }: LoadingProps) {
  const sizeClass = loadingSizes[size];

  return (
    <div className={cn('flex items-center justify-center gap-2 font-mono text-ascii-green', sizeClass, className)}>
      <span className="animate-spin">⟳</span>
      <span>{text}...</span>
    </div>
  );
}

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <span className={cn('animate-spin text-ascii-green', className)}>
      ⟳
    </span>
  );
}

export function LoadingDots({ className }: { className?: string }) {
  return (
    <span className={cn('font-mono text-ascii-green', className)}>
      <span className="animate-pulse">.</span>
      <span className="animate-pulse animation-delay-200">.</span>
      <span className="animate-pulse animation-delay-400">.</span>
    </span>
  );
}

export function FullPageLoading() {
  return (
    <div className="min-h-screen bg-ascii-dark-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl font-mono text-ascii-green mb-4">
          ╔══════════════════╗
        </div>
        <div className="text-2xl font-mono text-ascii-green mb-2">
          ║   METAPULSE V2   ║
        </div>
        <div className="text-4xl font-mono text-ascii-green mb-8">
          ╚══════════════════╝
        </div>
        <Loading size="lg" text="Initializing System" />
      </div>
    </div>
  );
}