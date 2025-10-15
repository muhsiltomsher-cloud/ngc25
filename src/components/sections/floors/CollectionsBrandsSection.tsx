'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Container from '@/components/atoms/Container';
import { allBrandsData, Brand } from '@/data/brands'; 

gsap.registerPlugin(ScrollTrigger);

interface CollectionsBrandsSectionProps {
  brands?: Brand[];
}

const CollectionsBrandsSection = ({ brands }: CollectionsBrandsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".anim-brand-row", {
        autoAlpha: 0,
        y: 50,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const list = brands && brands.length ? brands : allBrandsData;
  const display = list.length > 9 ? list.slice(6, 9) : list.slice(0, Math.min(3, list.length));

  return (
    <section ref={sectionRef} className="py-10">
      <Container>
        <div className="bg-neutral-lightest rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8 lg:gap-12">
            
            {/* Left Column: Brand Details */}
            <div className="flex flex-col gap-12">
              {/* Sliced to show up to 3 items */}
              {display.map((brand: Brand, i: number) => (
                <div key={i} className="anim-brand-row invisible group flex items-start gap-8">
                  <div className="w-24 flex-shrink-0 pt-1">
                    <Image
                      src={brand.logo}
                      alt={`${brand.title} logo`}
                      width={144}
                      height={40}
                      className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-sm uppercase tracking-widest text-neutral-dark mb-1">
                      {brand.subtitle}
                    </p>
                    <h3 className="font-serif text-3xl text-primary font-medium mb-2">
                      {brand.title}
                    </h3>
                    <p className="font-sans text-base text-neutral-dark leading-.relaxed">
                      {brand.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Brand Images */}
            <div className="hidden lg:flex flex-col gap-8 pt-2">
              {/* Image column mirrors the same set */}
              {display.map((brand: Brand, i: number) => (
                <div key={i} className="anim-brand-row invisible relative w-full h-[120px] rounded-xl overflow-hidden">
                  <Image
                    src={brand.img}
                    alt={brand.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CollectionsBrandsSection;
