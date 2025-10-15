'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import Container from '@/components/atoms/Container';
import StyledHeadline from '@/components/atoms/StyledHeadline';

gsap.registerPlugin(ScrollTrigger);

const DOT_COLORS = ['#A0522D', '#D2B48C', '#8B4513', '#C0C0C0']; 
const ROW_HEIGHT = 75;

interface Benefit {
  title: string;
}

interface WhyChooseFlooringOverCarpetProps {
  headline: string;
  benefits: Benefit[];
  className?: string;
  onClick?: () => void;
}

const WhyChooseFlooringOverCarpet: React.FC<WhyChooseFlooringOverCarpetProps> = ({
  headline,
  benefits,
  className = '',
  onClick,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const dots = gsap.utils.toArray('.anim-dot') as HTMLElement[];
      const rows = gsap.utils.toArray('.anim-row') as HTMLElement[];
      const scrollLength = ROW_HEIGHT * benefits.length;

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollLength + 200}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
      
      benefits.forEach((_, idx) => {
        masterTl
          .from(rows[idx], { autoAlpha: 0, y: 60, ease: 'power2.out' })
          .from(dots[idx], { autoAlpha: 0, scale: 0.7, x: -35, ease: 'back.out(1.7)' }, '<');
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [benefits]);

  return (
    <section ref={sectionRef} className={`w-full overflow-hidden bg-neutral-lightest py-24 sm:py-32 ${className}`}>
      <Container>
        <div className="mx-auto">
          <div className="mb-16 md:mb-24">
            <StyledHeadline
              as="h2"
              text={headline}
              className="text-4xl md:text-5xl font-serif font-medium text-gray-900 leading-tight"
            />
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-0">
            <div className="w-full lg:w-[55%] flex justify-center lg:justify-start">
              <div className="flex -space-x-7 pl-1">
                {DOT_COLORS.slice(0, benefits.length).map((color, idx) => (
                  <div
                    key={idx}
                    className="anim-dot"
                    style={{
                      width: 70, height: 70, borderRadius: '50%',
                      backgroundColor: color, border: '5px solid var(--background-color, #F5F2EF)',
                      zIndex: 10 - idx, boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="w-full lg:w-[42%] mt-0 relative" style={{ minHeight: ROW_HEIGHT * benefits.length }}>
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="anim-row flex justify-between items-center border-b border-neutral-light py-5 absolute left-0 w-full"
                  style={{ top: idx * ROW_HEIGHT }}
                >
                  <span className="font-serif text-2xl md:text-3xl font-medium text-gray-800">
                    {b.title}
                  </span>

                  {idx === benefits.length - 1 && (
                    <button
                      onClick={onClick}
                      className="ml-auto px-6 py-3 rounded-full bg-primary text-white text-base font-semibold flex items-center gap-2.5 shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-300"
                    >
                      All Features
                      <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseFlooringOverCarpet;
