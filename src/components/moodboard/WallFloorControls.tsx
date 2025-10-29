"use client";

import React from 'react';
import { SidebarSection } from './ui/SidebarSection';

interface WallFloorControlsProps {
  horizon: number;
  onHorizonChange: (value: number) => void;
  wallColor: string;
  onWallColorChange: (color: string) => void;
  wallOpacity: number;
  onWallOpacityChange: (opacity: number) => void;
  wallTextureRepeat: boolean;
  onWallTextureRepeatChange: (repeat: boolean) => void;
  floorColor: string;
  onFloorColorChange: (color: string) => void;
  floorOpacity: number;
  onFloorOpacityChange: (opacity: number) => void;
  floorTextureRepeat: boolean;
  onFloorTextureRepeatChange: (repeat: boolean) => void;
  onEditWallMask: () => void;
  onClearWallMask: () => void;
  onEditFloorMask: () => void;
  onClearFloorMask: () => void;
  disabled?: boolean;
}

export function WallFloorControls({
  horizon,
  onHorizonChange,
  wallColor,
  onWallColorChange,
  wallOpacity,
  onWallOpacityChange,
  wallTextureRepeat,
  onWallTextureRepeatChange,
  floorColor,
  onFloorColorChange,
  floorOpacity,
  onFloorOpacityChange,
  floorTextureRepeat,
  onFloorTextureRepeatChange,
  onEditWallMask,
  onClearWallMask,
  onEditFloorMask,
  onClearFloorMask,
  disabled = false,
}: WallFloorControlsProps) {
  return (
    <div className="space-y-0">
      {/* Horizon Control */}
      <SidebarSection
        title="Horizon"
        description="Adjust wall/floor split"
        collapsible={false}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Position</span>
            <span className="font-medium text-gray-900">{horizon}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="80"
            value={horizon}
            onChange={(e) => onHorizonChange(Number(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </SidebarSection>

      {/* Wall Controls */}
      <SidebarSection
        title="Wall"
        description="Customize wall appearance"
        collapsible={true}
        defaultOpen={true}
      >
        <div className="space-y-3">
          {/* Wall Color */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={wallColor}
                onChange={(e) => onWallColorChange(e.target.value)}
                disabled={disabled}
                className="w-10 h-10 rounded border border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <input
                type="text"
                value={wallColor}
                onChange={(e) => onWallColorChange(e.target.value)}
                disabled={disabled}
                className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Wall Opacity */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-700">Opacity</label>
              <span className="text-xs text-gray-600">{wallOpacity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={wallOpacity}
              onChange={(e) => onWallOpacityChange(Number(e.target.value))}
              disabled={disabled}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900 disabled:opacity-50"
            />
          </div>

          {/* Wall Texture Repeat */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={wallTextureRepeat}
              onChange={(e) => onWallTextureRepeatChange(e.target.checked)}
              disabled={disabled}
              className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-800 disabled:opacity-50"
            />
            <span className="text-xs text-gray-700">Repeat Texture</span>
          </label>

          {/* Wall Mask Controls */}
          <div className="pt-2 border-t border-gray-200">
            <div className="text-xs font-medium text-gray-700 mb-2">Mask</div>
            <div className="flex gap-2">
              <button
                onClick={onEditWallMask}
                disabled={disabled}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Edit Mask
              </button>
              <button
                onClick={onClearWallMask}
                disabled={disabled}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Clear Mask
              </button>
            </div>
          </div>
        </div>
      </SidebarSection>

      {/* Floor Controls */}
      <SidebarSection
        title="Floor"
        description="Customize floor appearance"
        collapsible={true}
        defaultOpen={true}
      >
        <div className="space-y-3">
          {/* Floor Color */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={floorColor}
                onChange={(e) => onFloorColorChange(e.target.value)}
                disabled={disabled}
                className="w-10 h-10 rounded border border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <input
                type="text"
                value={floorColor}
                onChange={(e) => onFloorColorChange(e.target.value)}
                disabled={disabled}
                className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Floor Opacity */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-700">Opacity</label>
              <span className="text-xs text-gray-600">{floorOpacity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={floorOpacity}
              onChange={(e) => onFloorOpacityChange(Number(e.target.value))}
              disabled={disabled}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900 disabled:opacity-50"
            />
          </div>

          {/* Floor Texture Repeat */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={floorTextureRepeat}
              onChange={(e) => onFloorTextureRepeatChange(e.target.checked)}
              disabled={disabled}
              className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-800 disabled:opacity-50"
            />
            <span className="text-xs text-gray-700">Repeat Texture</span>
          </label>

          {/* Floor Mask Controls */}
          <div className="pt-2 border-t border-gray-200">
            <div className="text-xs font-medium text-gray-700 mb-2">Mask</div>
            <div className="flex gap-2">
              <button
                onClick={onEditFloorMask}
                disabled={disabled}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Edit Mask
              </button>
              <button
                onClick={onClearFloorMask}
                disabled={disabled}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Clear Mask
              </button>
            </div>
          </div>
        </div>
      </SidebarSection>
    </div>
  );
}
