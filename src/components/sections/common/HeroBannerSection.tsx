'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import Container from '@/components/atoms/Container';
import StyledHeadline from '@/components/atoms/StyledHeadline';

gsap.registerPlugin(ScrollTrigger);

interface HeroBannerSectionProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaIcon?: React.ReactNode;
  mediaSrc: string;
  mediaAlt?: string;
  className?: string;
  variant?: 'default' | 'centered' | 'left-aligned';
  showParallax?: boolean;
  /** Banner image container height, e.g. 'h-96' or 'h-[500px]' */
  bannerHeight?: string;
}

const HeroBannerSection: React.FC<HeroBannerSectionProps> = ({
  title,
  subtitle,
  ctaLabel,
  ctaHref = '#',
  ctaIcon,
  mediaSrc,
  mediaAlt = '',
  className = '',
  variant = 'default',
  showParallax = true,
  bannerHeight = 'h-[450px]',
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });

      tl.from('.anim-headline', {
        autoAlpha: 0,
        y: 50,
        duration: 1,
        ease: 'expo.out',
      })
        .from(
          '.anim-subtitle',
          { autoAlpha: 0, y: 40, duration: 1, ease: 'expo.out' },
          '-=0.8'
        )
        .from(
          '.anim-banner-image',
          { autoAlpha: 0, scale: 0.95, y: 50, duration: 1.2, ease: 'expo.out' },
          '-=0.8'
        );

      if (showParallax) {
        gsap.to(imageRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [showParallax]);

  const alignmentClasses = {
    default: 'text-center md:text-left mx-auto',
    centered: 'text-center mx-auto',
    'left-aligned': 'text-left',
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full bg-white pt-12 md:pt-24 xl:pt-32 overflow-hidden ${className}`}
    >
      <Container>
        <div className={`max-w-5xl ${alignmentClasses[variant]}`}>
          <StyledHeadline
            as="h1"
            text={title}
            className="anim-headline invisible text-4xl md:text-6xl xl:text-7xl font-serif font-medium text-black tracking-tight leading-tight"
          />
          {subtitle && (
            <p className="anim-subtitle invisible mt-4 font-sans text-lg md:text-xl xl:text-3xl font-light text-neutral-dark leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`relative mt-10 md:mt-16 mx-auto ${bannerHeight}`}>
          <div
            className="anim-banner-image invisible rounded-3xl overflow-hidden shadow-lg w-full h-[500px]"
            ref={imageRef}
          >
            <Image
              src={mediaSrc}
              alt={mediaAlt}
              fill
              className="!object-cover w-full h-full block"
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>

          {ctaLabel && (
            <a
              href={ctaHref}
              className="absolute top-6 left-6 md:top-8 md:left-8 z-20 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-white text-lg font-semibold shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary-light transition-all duration-300 hover:scale-105"
              aria-label={ctaLabel}
            >
              {ctaIcon ?? (
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </span>
              )}
              {ctaLabel}
            </a>
          )}
        </div>
      </Container>
    </section>
  );
};

export default HeroBannerSection;
