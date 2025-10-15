"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '@/components/atoms/Container';
import StyledHeadline from '@/components/atoms/StyledHeadline'; // 1. Import the new component

gsap.registerPlugin(ScrollTrigger);

// Data for the component
const featureData = [
  {
    tagline: 'Timeless Materials',
    title: 'Wallcoverings',
    description: "Experience textures that transform spaces. Our curated collection of wallcoverings brings depth, character, and a sophisticated finish to any interior.",
    imageUrl: '/images/workspace/options-wallcoverings.png',
    link: '#',
  },
  {
    tagline: 'Foundation of Design',
    title: 'Floorings',
    description: "Set the stage with flooring that blends durability with unparalleled elegance. Our solutions provide a flawless foundation for designs that endure and inspire.",
    imageUrl: '/images/workspace/options-floorings.png',
    link: '#',
  },
  {
    tagline: 'The Finishing Touch',
    title: 'Fabrics',
    description: "Discover a world of tactile beauty with our exclusive fabric selections, perfect for upholstery and drapery that add a layer of comfort, color, and luxury.",
    imageUrl: '/images/workspace/options-fabrics.png',
    link: '#',
  },
  {
    tagline: 'Engineered Silence',
    title: 'Acoustic',
    description: "Engineer silence and clarity. Our acoustic solutions are designed to absorb sound beautifully, enhancing focus and tranquility without compromising on aesthetic integrity.",
    imageUrl: '/images/workspace/options-acoustic.png',
    link: '#',
  },
  {
    tagline: 'Bespoke Creations',
    title: 'Custom',
    description: "Your vision, realized with precision. Our custom fabrication services allow for bespoke creations, ensuring every detail of your project is unique and personal.",
    imageUrl: '/images/workspace/options-custom.png',
    link: '#',
  },
  {
    tagline: 'Distinguished Luxury',
    title: 'Leather',
    description: "Indulge in the classic appeal of genuine leather. Supple, durable, and rich with character, our leather collection offers a touch of distinguished luxury.",
    imageUrl: '/images/workspace/options-leather.png',
    link: '#',
  },
];


const WorkspaceOption = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Hero Animation ---
      gsap.from(".anim-hero-text", {
        y: 80, autoAlpha: 0, skewY: 5, duration: 1.5, ease: 'expo.out', stagger: 0.2,
        scrollTrigger: { trigger: ".hero-section", start: 'top 70%', toggleActions: 'play none none none' }
      });

      // --- Entrance Animation Timeline ---
      const entranceTl = gsap.timeline({
        scrollTrigger: { trigger: ".features-container", start: 'top 75%', toggleActions: 'play none none none' }
      });

      entranceTl
        .to('.anim-image-reveal', { scaleX: 0, transformOrigin: 'right', duration: 1.5, ease: 'expo.inOut', stagger: 0.2 })
        .from('.anim-image', { scale: 1.2, duration: 1.5, ease: 'expo.out', stagger: 0.2 }, "-=1.4")
        .from('.anim-number', { x: -50, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.2}, "-=1.2")
        .from('.anim-title', { yPercent: 100, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.2 }, "-=1.0")
        .from(['.anim-text', '.anim-cta'], { y: 30, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.1 }, "-=1.0");
      
      // --- Parallax Effect ---
      const images = gsap.utils.toArray('.anim-image') as HTMLElement[];
      images.forEach((image) => {
        gsap.to(image, {
          yPercent: -10, ease: 'none',
          scrollTrigger: { trigger: image.closest('.anim-feature-item'), start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} className="bg-[#181818] text-[#F3F3F3] pb-20 sm:pb-32 overflow-x-hidden">
      
      {/* === Hero Section === */}
      <div className="hero-section relative h-[60vh] min-h-[450px] w-full">
        <Image src="/images/workspace/options-hero.png" alt="Luxurious and modern office workspace" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          
          {/* 2. The old h1 is replaced with the new, reusable component */}
          <StyledHeadline
            as="h1"
            text="Design *That* Endures."
            className="anim-hero-text invisible font-serif text-4xl font-medium md:text-6xl lg:text-7xl"
          />

          <p className="anim-hero-text invisible mt-6 max-w-2xl text-lg text-gray-300 md:text-xl font-sans">
            Explore a curated collection of materials crafted for the modern workspace.
          </p>
        </div>
      </div>

      <Container>
        {/* === Features Section === */}
        <div className="features-container mt-24 md:mt-40 flex flex-col gap-24 md:gap-40">
          {featureData.map((feature, index) => (
            <div key={index} className="anim-feature-item group grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
              
              {/* Image Content */}
              <div className={`w-full ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                <div className="anim-image-wrapper relative overflow-hidden rounded-lg">
                  <div className="anim-image-reveal absolute inset-0 z-10 bg-[#C0A062]"></div>
                  <Image src={feature.imageUrl} alt={feature.title} width={800} height={600} className="anim-image w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
                </div>
              </div>

              {/* Text Content with Stylized Number */}
              <div className="relative text-center md:text-left transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
                <div className="anim-number invisible absolute -top-12 -left-4 md:-left-12 text-[6rem] font-serif text-gray-500/10 z-0">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                
                <div className="relative z-10">
                  <p className="anim-text invisible text-sm font-medium uppercase tracking-[0.2em] text-gray-400 transition-colors duration-300 ease-in-out group-hover:text-[#C0A062] font-sans">
                    {feature.tagline}
                  </p>
                  <div className="overflow-hidden mt-4">
                    <h3 className="anim-title invisible font-serif text-4xl font-medium text-white md:text-5xl">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="anim-text invisible mt-6 text-lg text-gray-300 leading-relaxed font-sans">
                    {feature.description}
                  </p>
                  <a href={feature.link} className="anim-cta invisible inline-block mt-6 text-[#C0A062] font-semibold tracking-wider after:block after:h-[1px] after:w-0 after:bg-[#C0A062] after:transition-all after:duration-300 hover:after:w-full font-sans">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WorkspaceOption;