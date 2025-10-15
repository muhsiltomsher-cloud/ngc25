'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Container from '@/components/atoms/Container';
import StyledHeadline from '@/components/atoms/StyledHeadline';

gsap.registerPlugin(ScrollTrigger);

interface BrandLinkItem {
  name: string;
  image: string;
  link?: string;
}

interface BrandsSectionProps {
  title?: string;
  brands: BrandLinkItem[];
  bannerImage: string;
  className?: string;
}

const BrandsSection: React.FC<BrandsSectionProps> = ({
  title,
  brands,
  bannerImage,
  className = '',
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.from('.anim-title', {
        autoAlpha: 0,
        y: -40,
        duration: 1,
        ease: 'expo.out',
      })
        .from('.anim-banner', {
          autoAlpha: 0,
          x: -50,
          scale: 0.95,
          duration: 1.2,
          ease: 'expo.out',
        }, '-=0.8')
        .from('.anim-logo', {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.05,
        }, '-=1.0');
    }, sectionRef);

    return () => ctx.revert();
  }, [brands]);

  return (
    <section
      ref={sectionRef}
      className={`w-full py-8 md:py-16 bg-white ${className}`}
    >
      <Container>
        <div className="mx-auto">
          {title && (
            <StyledHeadline
              as="h2"
              text={title}
              className="anim-title invisible text-4xl md:text-5xl font-serif font-medium mb-12 text-gray-900 text-center"
            />
          )}

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Left Banner */}
            <div className="anim-banner md:w-2/5 w-full flex justify-center invisible">
              <div className="w-full max-w-sm rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src={bannerImage}
                  alt="Designer Wallpapers Banner"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Brand Logos Grid */}
            <div className="md:w-3/5 w-full">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-4 place-items-center">
                {brands.map((brand, i) => (
                  <Link
                    key={brand.name + i}
                    href={brand.link || '#'}
                    className="anim-logo invisible block group focus:outline-none w-full h-20 flex items-center justify-center p-2"
                  >
                    <Image
                      src={brand.image}
                      alt={`${brand.name} logo`}
                      width={120}
                      height={64}
                      className="object-contain max-h-12 w-auto transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BrandsSection;
