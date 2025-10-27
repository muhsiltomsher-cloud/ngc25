"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  className?: string;
}

export default function ProductGallery({ images, className = "" }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className={`w-full ${className}`}>
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5">
        {activeImage && (
          <>
            <Image
              src={activeImage}
              alt="Product image"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute right-4 top-4 rounded-full bg-white/90 p-3 text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
              title={isZoomed ? "Zoom Out" : "Zoom In"}
            >
              {isZoomed ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              )}
            </button>
            <div className="absolute bottom-4 left-4 rounded-full bg-slate-900/80 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6">
          {images.map((src, idx) => (
            <button
              key={`${src}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                activeIndex === idx 
                  ? "scale-105 border-slate-900 shadow-lg shadow-slate-900/20 ring-2 ring-slate-900 ring-offset-2" 
                  : "border-slate-200 hover:border-slate-400 hover:scale-105 hover:shadow-md"
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={src} 
                alt={`Thumbnail ${idx + 1}`} 
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
                loading="lazy" 
              />
              {activeIndex === idx && (
                <div className="absolute inset-0 bg-slate-900/10"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

