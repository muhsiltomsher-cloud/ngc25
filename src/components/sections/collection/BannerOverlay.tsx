'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

interface BannerOverlayProps {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  highlights?: Array<{ label: string; value: string }>;
}

export default function BannerOverlay({
  imageUrl = '/images/walls/designer-hero.png',
  title = 'Discover Designer Walls',
  subtitle = 'Shop exclusive wallcoverings curated by top brands.',
  ctaText,
  onCtaClick,
  highlights,
}: BannerOverlayProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const featureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!rootRef.current || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (backgroundRef.current) {
        gsap.fromTo(
          backgroundRef.current,
          { scale: 1.08, y: -30 },
          { scale: 1, y: 0, duration: 1.2, ease: 'power2.out' }
        );
      }

      if (textRef.current) {
        gsap.from(textRef.current.children, {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
        });
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 20,
          delay: 0.5,
          duration: 0.6,
          ease: 'power3.out',
        });
      }

      if (featureRefs.current.length) {
        gsap.from(featureRefs.current, {
          opacity: 0,
          y: 28,
          delay: 0.4,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [featureRefs.current.length]);

  const featureChips = useMemo(
    () =>
      highlights && highlights.length
        ? highlights
        : [
            { label: 'Curated Brands', value: '18+' },
            { label: 'Custom Colourways', value: '240' },
            { label: 'Lead Time', value: '3-5 days' },
          ],
    [highlights]
  );

  featureRefs.current = [];

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden border-b border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800"
    >
      <div className="absolute inset-0 -z-20" ref={backgroundRef}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-out will-change-transform"
          style={{
            backgroundImage: `url(${imageUrl})`,
            transform: `translateY(${offsetY * 0.2}px) scale(${1 + offsetY * 0.0004})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08)_0,_rgba(15,23,42,0)_60%)]" />
        <div className="absolute -left-32 top-12 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>
      <div className="relative mx-auto flex min-h-[320px] max-w-[1200px] flex-col justify-center gap-8 px-6 py-12 text-white sm:min-h-[360px]">
        <div
          ref={textRef}
          className={`max-w-3xl transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-100 shadow-sm backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            Trade Collections Preview
          </div>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">{title}</h2>
          <p className="mt-4 text-base text-slate-200 sm:text-lg md:text-xl">{subtitle}</p>
          {ctaText && (
            <button
              ref={ctaRef}
              onClick={onCtaClick}
              className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white/90 px-6 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white ${isLoaded ? 'delay-150 opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            >
              {ctaText}
              <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
            </button>
          )}
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-3">
          {featureChips.map((chip, index) => (
            <div
              key={`${chip.label}-${chip.value}`}
              ref={el => {
                featureRefs.current[index] = el;
              }}
              className={`rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-sm backdrop-blur transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-slate-200/80">{chip.label}</p>
              <p className="mt-1 text-lg font-semibold text-white">{chip.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
