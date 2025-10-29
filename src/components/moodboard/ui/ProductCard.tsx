import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  onAdd: () => void;
  onView?: () => void;
  variant?: 'grid' | 'list';
  density?: 'compact' | 'comfortable';
}

export function ProductCard({
  name,
  image,
  category,
  onAdd,
  onView,
  variant = 'grid',
  density = 'compact',
}: ProductCardProps) {
  const isCompact = density === 'compact';
  const isGrid = variant === 'grid';

  return (
    <div
      className={`group relative bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden ${
        isGrid ? 'flex flex-col' : 'flex flex-row'
      }`}
    >
      {/* Image Container */}
      <div
        className={`relative bg-gray-100 flex-shrink-0 ${
          isGrid
            ? 'w-full aspect-square'
            : isCompact
            ? 'w-20 h-20'
            : 'w-24 h-24'
        }`}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes={isGrid ? '(max-width: 768px) 50vw, 160px' : '80px'}
        />
        
        {/* Hover Overlay with Add Button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
          <button
            onClick={onAdd}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-gray-900 rounded-full p-2 shadow-lg hover:scale-110 transform"
            title="Add to canvas"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className={`flex flex-col ${
          isGrid
            ? isCompact
              ? 'p-2'
              : 'p-3'
            : isCompact
            ? 'p-2 flex-1'
            : 'p-3 flex-1'
        }`}
      >
        <h3
          className={`font-medium text-gray-900 line-clamp-2 ${
            isCompact ? 'text-xs' : 'text-sm'
          }`}
          title={name}
        >
          {name}
        </h3>
        
        <span
          className={`inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs truncate ${
            isGrid ? 'w-fit' : ''
          }`}
        >
          {category}
        </span>

        {/* Actions */}
        {!isGrid && (
          <div className="mt-2 flex gap-2">
            <button
              onClick={onAdd}
              className="flex-1 px-3 py-1.5 bg-gray-900 text-white text-xs rounded hover:bg-gray-800 transition-colors"
            >
              Add
            </button>
            {onView && (
              <button
                onClick={onView}
                className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50 transition-colors"
              >
                View
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
