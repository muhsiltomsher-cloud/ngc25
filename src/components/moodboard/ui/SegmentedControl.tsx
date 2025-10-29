import React from 'react';

interface SegmentedControlProps {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
}

export function SegmentedControl({
  options,
  value,
  onChange,
  size = 'sm',
}: SegmentedControlProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  return (
    <div className="inline-flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`${sizeClasses[size]} rounded-md font-medium transition-all ${
            value === option.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {option.icon && <span className="inline-block mr-1">{option.icon}</span>}
          {option.label}
        </button>
      ))}
    </div>
  );
}
