'use client';

import React from 'react';

// Define the props for the component
interface StyledHeadlineProps {
  as?: 'h1' | 'h2' | 'h3' | 'p'; // The HTML tag to render
  text: string;                     // The text content, e.g., "Design *That* Endures."
  className?: string;               // Pass any additional classes
}

const StyledHeadline: React.FC<StyledHeadlineProps> = ({
  as: Tag = 'h2', // Default to an h2 tag if 'as' is not provided
  text,
  className = '',
}) => {
  // Use a regular expression to find the word wrapped in asterisks
  const match = text.match(/\*(.*?)\*/);

  // If no word is wrapped, just render the plain text
  if (!match) {
    return <Tag className={className}>{text}</Tag>;
  }

  // Split the text into parts: before the italic word, the word itself, and after
  const before = text.substring(0, match.index);
  const italicWord = match[1]; // The captured word inside the asterisks
  const after = text.substring(match.index! + match[0].length);

  return (
    <Tag className={className}>
      {before}
      <span className="italic font-normal">{italicWord}</span>
      {after}
    </Tag>
  );
};

export default StyledHeadline;