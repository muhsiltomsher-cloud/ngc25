'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '@/components/atoms/Container'; // Import your custom Container

// Sample product data with links added
const instockProducts = [
  { name: "WALLCOVERING", image: "/images/instock/wallcovering.png", link: "/wallcoverings" },
  { name: "FLOORINGS", image: "/images/instock/floorings.png", link: "/floorings" },
  { name: "FABRICS", image: "/images/instock/fabrics.png", link: "/fabrics" },
];

export default function InstockCollectionSection() {
  const productsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // GSAP animation for scrolling effects (fade-in and slide-in effect for each product)
    productsRef.current.forEach((product, index) => {
      gsap.fromTo(
        product,
        { opacity: 0, x: index === 0 ? '100%' : index === 2 ? '-100%' : '0%' }, // Initial positions (left or right offscreen)
        {
          opacity: 1,  // Final opacity
          x: '0%',     // Move to the center
          duration: 1, // Duration of the animation
          ease: 'power3.out', // Ease function for smooth transition
          scrollTrigger: {
            trigger: product,
            start: 'top 75%',  // Start the animation when 75% of the product is visible
            end: 'top 25%',    // End the animation when 25% of the product is out of view
            scrub: true,       // Smooth animation while scrolling
            toggleActions: 'play none none reverse',  // Play animation on entering and reverse on leaving
          },
        }
      );
    });

    return () => {
      // Cleanup ScrollTriggers when component is unmounted
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section style={{ background: "#fefff1" }} className="w-full py-20">
      {/* Wrap everything inside the container */}
      <Container>
        {/* Header and Description */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center" style={{ fontFamily: 'inherit' }}>
            INSTOCK COLLECTION
          </h2>
          <p className="text-3xl text-center text-[#28594C] max-w-3xl mb-6 font-normal">
            Discover our extensive range of wallcoverings, flooring, and fabrics, all in stock and available across the UAE.
            From versatile designs to premium textures, our collection is curated to meet your project needs without delay.
          </p>
          <div className="text-2xl text-[#28594C] text-center space-y-1 mt-4 font-normal">
            <div>Immediate Availability</div>
            <div>Quick Delivery Within the UAE</div>
            <div>Perfect for Fast-Track Projects</div>
          </div>
        </div>

        {/* Product Thumbnails with GSAP scroll effects */}
        <div
          className="grid grid-cols-1 
            md:grid-cols-3 
            items-start 
            gap-y-10 gap-x-8 
            justify-center"
        >
          {instockProducts.map((item, index) => (
            <a
              key={item.name}
              href={item.link} // Link added to each product
              ref={(el) => (productsRef.current[index] = el)}  // Ref to trigger animations for each item
              className="flex flex-col items-center opacity-0"  // Initially invisible until animated
            >
              <div
                className="shadow"
                style={{
                  background: "#ece6d7",
                  boxShadow: '0 6px 32px 0 rgba(0,0,0,0.10)',
                  borderRadius: '12px',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '12px' }}
                />
              </div>
              <div className="mt-6 text-[#28594C] tracking-wide text-center text-2xl font-light">
                {item.name}
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
