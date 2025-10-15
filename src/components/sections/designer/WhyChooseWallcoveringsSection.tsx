'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

import Container from '@/components/atoms/Container';
import StyledHeadline from '@/components/atoms/StyledHeadline'; // 1. Import your reusable headline

interface Feature {
  image: string;
  title: string;
  description: string;
}

interface WhyChooseWallcoveringsSectionProps {
  headline: string; // 2. Re-added the headline prop
  features: Feature[];
  className?: string;
}

gsap.registerPlugin(ScrollTrigger);

const WhyChooseWallcoveringsSection: React.FC<WhyChooseWallcoveringsSectionProps> = ({
  headline, // 3. Destructure the headline prop
  features,
  className = '',
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
        y: 60,
        duration: 1.2,
        ease: 'expo.out',
      });

      tl.from('.feature-card .anim-image', {
        autoAlpha: 0,
        scale: 0.9,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.15,
      }, '-=1.0')
      .from(['.feature-card .anim-title', '.feature-card .anim-description'], {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.1,
      }, '-=1.0');

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`w-full pt-24 md:pt-32  pb-20 md:pb-20 bg-white ${className}`}
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {/* 4. Use the StyledHeadline component with the prop */}
          <StyledHeadline
            as="h2"
            text={headline}
            className="anim-headline invisible text-4xl md:text-5xl font-serif font-medium text-gray-900 leading-tight mb-20"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {features.map((feature, i) => (
            <div
              key={`${feature.title}-${i}`}
              className="feature-card flex flex-col items-center text-center"
            >
              <div className="anim-image invisible relative w-full aspect-square mb-6 rounded-lg overflow-hidden shadow-2xl shadow-gray-500/10">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="anim-title invisible font-serif text-2xl font-medium text-gray-900 mb-3">{feature.title}</h3>
              <p className="anim-description invisible font-sans text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseWallcoveringsSection;