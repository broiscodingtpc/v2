import React from 'react';
import { AsciiTabsProps } from '../types';

export const AsciiTabs: React.FC<AsciiTabsProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  className = '' 
}) => {
  return (
    <div className={`font-mono text-amber-200 ${className}`}>
      <div className="flex flex-wrap gap-1">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const tabContent = ` ${tab.label} `;
          
          return (
            <React.Fragment key={tab.id}>
              {tab.href ? (
                <a
                  href={tab.href}
                  className={`
                    border border-amber-600 px-2 py-1 hover:bg-amber-900/20 transition-colors
                    ${isActive ? 'bg-amber-800/30 text-amber-100' : 'text-amber-300'}
                  `}
                >
                  [{tabContent}]
                </a>
              ) : (
                <button
                  onClick={() => onTabChange?.(tab.id)}
                  className={`
                    border border-amber-600 px-2 py-1 hover:bg-amber-900/20 transition-colors
                    ${isActive ? 'bg-amber-800/30 text-amber-100' : 'text-amber-300'}
                  `}
                >
                  [{tabContent}]
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};