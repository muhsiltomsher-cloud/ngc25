"use client";

import React from 'react';
import { SidebarSection } from './ui/SidebarSection';

interface UploadRoomImageProps {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function UploadRoomImage({ onUpload, disabled = false }: UploadRoomImageProps) {
  return (
    <SidebarSection
      title="Upload Room Image"
      description="Add your own room photo as background"
      collapsible={true}
      defaultOpen={false}
    >
      <div className="space-y-2">
        <label
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            disabled
              ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className={`w-8 h-8 mb-2 ${
                disabled ? 'text-gray-300' : 'text-gray-400'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-1 text-xs text-gray-600">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG (MAX. 10MB)</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={onUpload}
            disabled={disabled}
            className="hidden"
          />
        </label>
      </div>
    </SidebarSection>
  );
}
