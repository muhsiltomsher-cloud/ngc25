'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

import Container from '@/components/atoms/Container';
import StyledHeadline from '@/components/atoms/StyledHeadline';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { name: 'ARMANI CASA', image: '/images/collections/armani-casa.png' },
  { name: 'ODE FABRICS', image: '/images/collections/ode-fabrics.png' },
  { name: 'WOVEN VINYL', image: '/images/collections/woven-vinyl.png' },
];

const RunwayToFloorsSection = () => {
  const stickySectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickySectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      tl.from('.anim-bg-overlay', { scale: 1.2, autoAlpha: 0, ease: 'power2.inOut' })
        .from('.anim-card', { autoAlpha: 0, y: 100, scale: 0.9, stagger: 0.2, ease: 'power2.out' }, 0.2)
        .from('.anim-card-title', { autoAlpha: 0, y: 50, stagger: 0.2, ease: 'power2.out' }, 0.4);

    }, stickySectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <section className="h-[40vh] bg-neutral-lightest flex items-center justify-center relative z-10">
        <Container>
          <StyledHeadline
            as="h1"
            text="From the *Showroom* to Your Floors"
            className="text-4xl md:text-5xl font-serif font-medium text-center text-gray-900 leading-tight"
          />
        </Container>
      </section>

      <section ref={stickySectionRef} className="relative h-screen">
        <div className="sticky top-0 h-full overflow-hidden">
          
          <div className="anim-bg-overlay absolute inset-0">
            <Image
              src="/images/carpet-tiles/hero-banner.png" // Using a placeholder
              alt="Showroom flooring background"
              fill
              className="object-cover"
            />
          </div>

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

export default RunwayToFloorsSection;