import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  sticky?: boolean;
}

export function SectionHeader({
  title,
  description,
  action,
  sticky = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`flex items-start justify-between gap-3 ${
        sticky
          ? 'sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3 px-4'
          : 'mb-3'
      }`}
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
