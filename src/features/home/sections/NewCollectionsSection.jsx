'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// A simple container component placeholder
const Container = ({ children }) => (
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const collections = [
  { name: "ARMANI CASA", image: "/images/collections/armani-casa.png" },
  { name: "WOVEN VINYL", image: "/images/collections/woven-vinyl.png" },
  { name: "ODE FABRICS", image: "/images/collections/ode-fabrics.png" },
];

const brandQueryMap = {
  'ARMANI CASA': 'armani-casa',
  'WOVEN VINYL': 'woven vinyl',
  'ODE FABRICS': 'ode'
};

export default function NewCollections() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || cardsRef.current.length === 0) return;

    // Use gsap.context for proper cleanup of animations and ScrollTriggers
    const ctx = gsap.context(() => {
      
      // --- CORRECTED TITLE VISIBILITY ---
      // This single animation smoothly fades the title in and out.
      // It appears when the section starts and disappears when the section ends.
      gsap.to(titleRef.current, {
        autoAlpha: 1, // Animate to full visibility
        duration: 0.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          // Start the animation when the top of the section hits the top of the viewport
          start: "top top",
          // End the animation when the bottom of the section hits the bottom of the viewport
          end: "bottom bottom",
          // Play the animation on enter, reverse on leave (for both scroll directions)
          toggleActions: "play reverse play reverse",
        }
      });

      // --- CARD ENTRANCE ANIMATION ---
      gsap.fromTo(
        cardsRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "bottom 40%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

    }, sectionRef); // Scope the context to the main section element

    // The context's revert method is the best way to clean up.
    // It automatically handles all GSAP animations and ScrollTriggers created inside.
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gray-50 min-h-[200vh] overflow-hidden"
      style={{ paddingTop: "60vh", paddingBottom: "20vh" }}
    >
      {/* --- FIXED TITLE ELEMENT --- */}
      <h1
        ref={titleRef}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none select-none text-5xl md:text-7xl font-normal uppercase tracking-widest text-gray-900 opacity-0"
      >
        NEW COLLECTIONS
      </h1>

      <Container>
        <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center space-y-10">
          {collections.map((col, i) => (
            <Link
              href={`/search?q=${encodeURIComponent(brandQueryMap[col.name] || col.name)}`}
              key={col.name}
              ref={el => (cardsRef.current[i] = el)}
              className="w-[400px] p-4 border border-[#dcdcdc] rounded-lg shadow-lg overflow-hidden bg-white opacity-0 hover:shadow-xl transition-shadow"
              style={{
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                background: "linear-gradient(135deg, #dcdcdc 0%, #f8fafc 100%)"
              }}
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-[330px] object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/350x330/e2e8f0/4a5568?text=Image+Not+Found'; }}
              />
              <div className="pt-7 text-left px-2">
                <h2 className="text-3xl font-light text-black tracking-wide">{col.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
