import React from 'react';

interface SkeletonCardProps {
  variant?: 'grid' | 'list';
}

export function SkeletonCard({ variant = 'grid' }: SkeletonCardProps) {
  const isGrid = variant === 'grid';

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse ${
        isGrid ? 'flex flex-col' : 'flex flex-row'
      }`}
    >
      {/* Image Skeleton */}
      <div
        className={`bg-gray-200 flex-shrink-0 ${
          isGrid ? 'w-full aspect-square' : 'w-20 h-20'
        }`}
      />

      {/* Content Skeleton */}
      <div className={`flex flex-col ${isGrid ? 'p-2' : 'p-2 flex-1'}`}>
        <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}
