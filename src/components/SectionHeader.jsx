// src/components/SectionHeader.jsx
import React from 'react';

const SectionHeader = ({ title, subtitle, className = '' }) => (
  <div className={`mb-6 text-center ${className}`}>
    <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
    {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
  </div>
);

export default SectionHeader;
