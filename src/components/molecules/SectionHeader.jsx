'use client';

import React from 'react';

const SectionHeader = ({ title, className = '' }) => {
  return (
    <h2
      className={`text-5xl font-bold text-gray-900 ${className}`}
      style={{ letterSpacing: '-0.04em' }}
    >
      {title}
    </h2>
  );
};

export default SectionHeader;
