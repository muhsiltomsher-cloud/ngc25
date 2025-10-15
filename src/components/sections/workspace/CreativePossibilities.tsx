"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '@/components/atoms/Container';

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    title: 'Wallcoverings',
    description:
      'Transform interiors with textures that tell a story. Our wallcoverings merge durability with artistry, offering acoustic comfort and endless creative expression.',
    imageUrl: '/images/workspace/wallcoverings.png',
  },
  {
    title: 'Flooring',
    description:
      'Set the stage with a flawless foundation. Our high-performance flooring solutions combine resilient materials with sophisticated design for an atmosphere of enduring elegance.',
    imageUrl: '/images/workspace/options-floorings.png',
  },
  {
    title: 'Fabrics',
    description:
      'Drape your vision in tactile beauty. From refined upholstery to elegant curtains, our commercial-grade textiles provide the final, luxurious touch to any design.',
    imageUrl: '/images/workspace/options-fabrics.png',
  },
];

const CreativePossibilities = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".anim-title", {
        y: 60,
        autoAlpha: 0,
        duration: 1.2,
        ease: "expo.out",
      });

      tl.from(
        ".creative-card",
        {
          y: 70,
          autoAlpha: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.15,
        },
        "-=1.0"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F8F5F2] py-24 sm:py-32">
      <Container>
        {/* Section Title */}
        <div className="text-center">
          <h2 className="anim-title invisible text-4xl font-serif font-medium text-gray-800 sm:text-5xl md:text-6xl">
            Limitless <span className="italic font-normal">Creative</span> Possibilities
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="creative-card group invisible relative flex h-[480px] flex-col justify-end overflow-hidden rounded-xl shadow-lg"
            >
              <div className="absolute inset-0 z-0 transition-all duration-500 ease-in-out group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)]">
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="relative z-20 p-6 text-white transition-transform duration-500 ease-in-out group-hover:-translate-y-2 sm:p-8">
                {/* Card Title */}
                <h3 className="text-3xl font-serif font-medium">{card.title}</h3>
                {/* Card Description */}
                <p className="mt-3 text-sm font-sans leading-relaxed text-gray-200">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CreativePossibilities;
