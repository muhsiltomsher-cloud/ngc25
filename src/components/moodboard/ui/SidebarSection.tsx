import React, { useState } from 'react';

interface SidebarSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
  action?: React.ReactNode;
}

export function SidebarSection({
  title,
  description,
  children,
  defaultOpen = true,
  collapsible = false,
  action,
}: SidebarSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div
        className={`flex items-center justify-between px-4 py-3 ${
          collapsible ? 'cursor-pointer hover:bg-gray-50' : ''
        }`}
        onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {action}
          {collapsible && (
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      </div>

      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}
