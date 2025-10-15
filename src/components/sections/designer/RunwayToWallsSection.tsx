'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

import Container from '@/components/atoms/Container';
import StyledHeadline from '@/components/atoms/StyledHeadline';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { name: 'ARMANI CASA', image: '/images/walls/armani-casa-bg.png' },
  { name: 'MISSONI HOME', image: '/images/walls/missoni-home.png' },
  { name: 'VERSACE', image: '/images/walls/versace.png' },
];

const RunwayToWallsSection = () => {
  const stickySectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // A single, optimized timeline for all scroll-based animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickySectionRef.current,
          start: 'top top',
          end: 'bottom bottom', // Animate over the full height of the section
          scrub: 1,
        },
      });

      // Animate background overlay, cards, and titles in a synchronized sequence
      tl.from('.anim-bg-overlay', { scale: 1.2, autoAlpha: 0, ease: 'power2.inOut' })
        .from('.anim-card', { autoAlpha: 0, y: 100, scale: 0.9, stagger: 0.2, ease: 'power2.out' }, 0.2)
        .from('.anim-card-title', { autoAlpha: 0, y: 50, stagger: 0.2, ease: 'power2.out' }, 0.4);

    }, stickySectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {/* Title Section (will be scrolled over) */}
      <section className="h-[40vh] bg-neutral-lightest flex items-center justify-center relative z-10">
        <Container>
          <StyledHeadline
            as="h1"
            text="From the *Runway* to Your Walls"
            className="text-4xl md:text-5xl font-serif font-medium text-center text-gray-900 leading-tight"
          />
        </Container>
      </section>

      {/* Sticky Card Grid Section */}
      <section ref={stickySectionRef} className="relative h-screen">
        <div className="sticky top-0 h-full overflow-hidden">
          
          {/* Background Image Overlay */}
          <div className="anim-bg-overlay absolute inset-0">
            <Image
              src="/images/walls/runway-to-your-walls.png"
              alt="Runway fashion background"
              fill
              className="object-cover"
            />
          </div>

          {/* Cards Grid */}
          <div className="relative z-10 h-full flex items-center">
            <Container>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card) => (
                  <div key={card.name} className="anim-card group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/25" />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <span className="anim-card-title font-sans text-white text-2xl md:text-3xl font-light tracking-widest uppercase text-center">
                        {card.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RunwayToWallsSection;