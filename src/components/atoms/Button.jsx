import React from 'react';
import clsx from 'clsx';

// Base styles for all buttons
const baseStyles =
  'inline-flex items-center justify-center leading-5 rounded-lg border font-normal text-white focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden z-0 transition-all duration-300 ease-in-out';

// Variant styles with hover color change only (Primary and Bordered)
const variantStyles = {
  primaryLight: 'bg-primary border-transparent hover:border-darkbeige hover:bg-darkbeige text-lightbeige hover:text-primary focus:ring-primary',
  primaryDark: 'bg-primary-dark border-transparent hover:bg-primary text-white hover:text-white focus:ring-primary',
  borderedLight: 'bg-transparent border-slate-400 hover:border-slate-500 hover:bg-slate-200 text-slate-700 hover:text-slate-700 focus:ring-slate-500',
  borderedDark: 'bg-transparent border-steelblue hover:border-steelblue hover:bg-steelblue text-steelblue hover:text-white focus:ring-transparent',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  icon: 'p-3',
};

const Button = ({
  variant = 'primaryLight',
  size = 'md',
  className = '',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  ...props
}) => {
  const isIconOnly = !children && (LeftIcon || RightIcon);
  const finalSize = isIconOnly ? 'icon' : size;

  const combinedClassName = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[finalSize],
    className
  );

  return (
    <button className={combinedClassName} {...props}>
      <span className="relative inline-flex items-center justify-center">
        {LeftIcon && (
          <LeftIcon
            className={clsx(children && 'mr-2')}
            style={{ height: '1em', width: '1em' }}
            aria-hidden="true"
          />
        )}
        {children}
        {RightIcon && (
          <RightIcon
            className={clsx(children && 'ml-2')}
            style={{ height: '1em', width: '1em' }}
            aria-hidden="true"
          />
        )}
      </span>
    </button>
  );
};

export default Button;
