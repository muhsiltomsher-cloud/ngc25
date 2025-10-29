"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const PolotnoEditor = dynamic(
  () => import('@/components/moodboard/PolotnoEditor'),
  { ssr: false }
);

export default function MoodboardEditorPage() {
  return (
    <div className="w-full h-screen">
      <Suspense fallback={<div className="flex items-center justify-center w-full h-full">Loading Polotno Editor...</div>}>
        <PolotnoEditor />
      </Suspense>
    </div>
  );
}
