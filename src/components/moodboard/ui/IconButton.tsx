import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  title?: string;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function IconButton({
  icon,
  onClick,
  title,
  disabled = false,
  variant = 'default',
  size = 'md',
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const variantClasses = {
    default:
      'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400',
    primary: 'bg-gray-900 text-white hover:bg-gray-800',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900',
  };

  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`${sizeClasses[size]} ${
        disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : variantClasses[variant]
      } rounded-lg transition-all duration-150 disabled:opacity-50`}
    >
      {icon}
    </button>
  );
}
