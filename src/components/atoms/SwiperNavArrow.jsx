'use client';

import React from 'react';

const ARROW_BTN_CLASS = `
  flex items-center justify-center w-12 h-12 rounded-full
  bg-white/80 hover:bg-white shadow-lg z-30
  transition-colors duration-300
`;

const ICON_CLASS = `
  h-8 w-8 text-[#2f2b36] transition-colors duration-300
`;

const SwiperNavArrow = React.forwardRef(({ direction, className = '', ...props }, ref) => (
  <button
    ref={ref}
    className={`${ARROW_BTN_CLASS} ${className}`}
    aria-label={direction === 'prev' ? 'previous' : 'next'}
    {...props}
  >
    {direction === 'next' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className={ICON_CLASS} fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className={ICON_CLASS} fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    )}
  </button>
));
SwiperNavArrow.displayName = "SwiperNavArrow";

export default SwiperNavArrow;
