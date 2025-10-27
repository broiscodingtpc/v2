'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TableProps {
  children: ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function Table({ children, className }: TableProps) {
  return (
    <div className={cn('ascii-table overflow-x-auto', className)}>
      <table className="w-full font-mono text-sm">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead className={cn('border-b border-ascii-green/30', className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className }: TableHeaderProps) {
  return (
    <tbody className={cn('divide-y divide-ascii-green/20', className)}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className, onClick }: TableRowProps) {
  return (
    <tr 
      className={cn(
        'hover:bg-ascii-green/5 transition-colors',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TableCell({ children, className, align = 'left' }: TableCellProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <td className={cn('px-4 py-3 text-ascii-green', alignClass, className)}>
      {children}
    </td>
  );
}

export function TableHeaderCell({ children, className, align = 'left' }: TableCellProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <th className={cn('px-4 py-3 text-ascii-green font-bold', alignClass, className)}>
      {children}
    </th>
  );
}