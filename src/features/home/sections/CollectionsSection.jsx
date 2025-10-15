'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/molecules/SectionHeader';
import Container from '@/components/atoms/Container';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Data for the product collections
const collections = [
  {
    key: 'walls',
    title: 'WALLS',
    image: '/images/products/walls.png',
    products: ['INSTOCK', 'DESIGNER', 'KIDS WALL', 'ACOUSTIC', 'COMMERCIAL', 'CUSTOM'],
  },
  {
    key: 'floors',
    title: 'FLOORS',
    image: '/images/products/floors.png',
    products: ['INSTOCK', 'CARPET TILES', 'LVT', 'RUG', 'WALL TO WALL', 'WOVEN'],
  },
  {
    key: 'fabrics',
    title: 'FABRICS',
    image: '/images/products/fabrics.png',
    products: ['SHEERS', 'CURTAINS', 'UPHOLSTERY', 'OUTDOOR', 'MARINE', 'AUTOMOTIVE'],
  },
];

export function CollectionsSection() {
  const sectionRef = useRef(null);
  const panelsContainerRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    // Use a GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.product-panel');
      const numPanels = panels.length;

      // Loop through each panel and create a pinning ScrollTrigger for it
      panels.forEach((panel, i) => {
        // Create a separate animation for the content of each panel
        const content = panel.querySelector('.panel-content');
        gsap.from(content, {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 60%', // Start animation when panel is 60% from the top
            toggleActions: 'play none none reverse',
          },
        });

        // The logic for the last panel is different to allow a smooth exit
        if (i === numPanels - 1) {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            end: 'bottom bottom', // Pin until the bottom of the panel hits the bottom of the screen
            pin: true,
            pinSpacing: false, // Crucial for the stacking effect
          });
          return; // Stop the loop for the last panel
        }

        // Pin all other panels
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          pin: true,
          pinSpacing: false, // No extra space, so the next panel can scroll up behind it
        });
      });
    }, sectionRef);

    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    // The main section now just acts as a container; no pinning is applied here directly.
    <section ref={sectionRef} className="relative bg-[#fdfde7]">
      {/* Fixed Section Header */}
      <div className="sticky top-0 left-0 w-full bg-[#fdfde7] z-50 border-b border-gray-300">
        <Container className="pt-5 pb-4">
          <SectionHeader title="OUR PRODUCTS" />
          <p className="mt-2 text-lg">Search by categories.</p>
        </Container>
      </div>

      {/* This container holds the panels in a normal document flow (flex column) */}
      <div ref={panelsContainerRef} className="relative flex flex-col">
        {collections.map(({ key, title, image, products }) => (
          <div
            key={key}
            // Panels are now relative, letting the pinning logic handle the layout
            className="product-panel relative w-full h-screen"
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />

            <Container className="h-full">
              {/* Added padding to push content below the fixed header */}
              <div className="panel-content relative z-10 flex flex-col justify-center h-full text-left max-w-3xl px-0 pt-20">
                <h2 className="text-6xl font-extrabold text-white mb-6" style={{ letterSpacing: '-0.04em' }}>
                  {title}
                </h2>
                <ul className="space-y-3 text-white/90 text-3xl font-light max-w-md list-disc list-inside">
                  {products.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </Container>
          </div>
        ))}
      </div>
      

    </section>
  );
}