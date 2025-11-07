"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  className?: string;
}

export default function ProductGallery({ images, className = "" }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState<{x: number; y: number}>({ x: 50, y: 50 });
  const [isLoading, setIsLoading] = useState(true);
  const [lightbox, setLightbox] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const [isHover, setIsHover] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0); // 0..100
  const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('cover');
  const [copied, setCopied] = useState(false);
  const activeImage = images[activeIndex] ?? images[0];

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') setActiveIndex(i => Math.min(images.length - 1, i + 1));
      if (e.key === 'ArrowLeft') setActiveIndex(i => Math.max(0, i - 1));
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox, images.length]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isZoomed || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }, [isZoomed]);

  const next = () => setActiveIndex(i => (i + 1 < images.length ? i + 1 : i));
  const prev = () => setActiveIndex(i => (i - 1 >= 0 ? i - 1 : i));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next(); else prev();
    }
  };

  // Autoplay controller
  useEffect(() => {
    if (!autoplay || isHover || isZoomed || lightbox || images.length <= 1) {
      setProgress(0);
      return;
    }
    let frame = 0;
    const total = 3000; // 3s per slide
    const tick = 100; // update every 0.1s
    setProgress(0);
    const id = setInterval(() => {
      frame += tick;
      const p = Math.min(100, (frame / total) * 100);
      setProgress(p);
      if (frame >= total) {
        setProgress(0);
        frame = 0;
        setActiveIndex((i) => (i + 1 < images.length ? i + 1 : 0));
      }
    }, tick);
    return () => clearInterval(id);
  }, [autoplay, isHover, isZoomed, lightbox, images.length]);
  return (
    <div className={`w-full ${className}`}>
      <div
        ref={containerRef}
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {activeImage && (
          <>
            <Image
              src={activeImage}
              alt="Product image"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
              style={isZoomed ? { transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` } : undefined}
              // Switch between cover/contain for creative viewing
              // @ts-ignore - next/image allows style+class; objectFit via style is fine
              objectFit={objectFit}
              priority
              onLoadingComplete={() => setIsLoading(false)}
            />
            {isLoading && (
              <div className="absolute inset-0 animate-pulse bg-slate-200/60" aria-hidden />
            )}
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
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="absolute right-4 top-16 rounded-full bg-white/90 p-3 text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
              title="Open full screen"
              aria-label="Open full screen"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 9V5a1 1 0 011-1h4" />
                <path d="M20 15v4a1 1 0 01-1 1h-4" />
                <path d="M15 4h4a1 1 0 011 1v4" />
                <path d="M9 20H5a1 1 0 01-1-1v-4" />
              </svg>
            </button>
            {/* Fit toggle */}
            <button
              type="button"
              onClick={() => setObjectFit(prev => (prev === 'cover' ? 'contain' : 'cover'))}
              className="absolute right-4 top-28 rounded-full bg-white/90 p-3 text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
              title={objectFit === 'cover' ? 'Fit within frame' : 'Fill frame'}
              aria-label="Toggle fit mode"
            >
              {objectFit === 'cover' ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="6" width="16" height="12" rx="2"/><rect x="8" y="9" width="8" height="6"/></svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="8" width="12" height="8" rx="1"/><path d="M3 6h18v12H3z"/></svg>
              )}
            </button>
            {/* Share / Download */}
            <button
              type="button"
              onClick={async () => {
                try {
                  if (navigator.share) {
                    await navigator.share({ title: 'NGC Product', url: activeImage });
                  } else {
                    await navigator.clipboard?.writeText(activeImage);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1200);
                  }
                } catch {}
              }}
              className="absolute right-4 top-40 rounded-full bg-white/90 p-3 text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
              title="Share image"
              aria-label="Share image"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
            </button>
            <a
              href={activeImage}
              download
              className="absolute right-4 top-52 rounded-full bg-white/90 p-3 text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
              title="Download image"
              aria-label="Download image"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 19h14"/></svg>
            </a>
            {copied && (
              <div className="absolute right-4 top-64 rounded-md bg-slate-900/80 px-3 py-1 text-xs text-white shadow">Link copied</div>
            )}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow hover:bg-white focus:outline-none"
                  aria-label="Previous image"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow hover:bg-white focus:outline-none"
                  aria-label="Next image"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
                </button>
              </>
            )}
            <div className="absolute bottom-4 left-4 rounded-full bg-slate-900/80 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              {activeIndex + 1} / {images.length}
            </div>
            {/* Autoplay progress & controls */}
            {images.length > 1 && (
              <>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10">
                  <div className="h-full bg-white/70 transition-[width]" style={{ width: `${progress}%` }} />
                </div>
                <button
                  type="button"
                  onClick={() => setAutoplay(a => !a)}
                  className="absolute bottom-3 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow hover:bg-white"
                >
                  {autoplay ? 'Pause' : 'Play'}
                </button>
              </>
            )}
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

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[120] bg-black/90 p-4 md:p-8" role="dialog" aria-modal>
          <button
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 rounded-md bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none"
            aria-label="Close"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6"/></svg>
          </button>
          <div className="mx-auto flex h-full max-w-6xl items-center justify-center">
            <div className="relative h-full w-full">
              <Image src={activeImage} alt="Fullscreen image" fill className="object-contain" sizes="100vw" />
            </div>
          </div>
          {images.length > 1 && (
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between">
              <button onClick={prev} className="pointer-events-auto ml-2 rounded-full bg-white/20 p-3 text-white hover:bg-white/30 focus:outline-none" aria-label="Previous">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button onClick={next} className="pointer-events-auto mr-2 rounded-full bg-white/20 p-3 text-white hover:bg-white/30 focus:outline-none" aria-label="Next">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
              </button>
            </div>
          )}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4">
              {images.map((src, idx) => (
                <button key={idx} onClick={() => setActiveIndex(idx)} className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border ${idx===activeIndex?'border-white':'border-white/30'} focus:outline-none`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="thumb" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

