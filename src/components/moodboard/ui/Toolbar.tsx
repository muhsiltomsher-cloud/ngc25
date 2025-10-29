import React from 'react';

interface ToolbarProps {
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export function Toolbar({ children, position = 'top' }: ToolbarProps) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 bg-white border-gray-200 ${
        position === 'top' ? 'border-b' : 'border-t'
      }`}
    >
      {children}
    </div>
  );
}

interface ToolbarGroupProps {
  children: React.ReactNode;
  separator?: boolean;
}

export function ToolbarGroup({ children, separator = false }: ToolbarGroupProps) {
  return (
    <>
      <div className="flex items-center gap-1">{children}</div>
      {separator && <div className="w-px h-6 bg-gray-300" />}
    </>
  );
}

interface ToolbarSeparatorProps {}

export function ToolbarSeparator({}: ToolbarSeparatorProps) {
  return <div className="w-px h-6 bg-gray-300" />;
}
