"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const WorkspaceIntroduction = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const contentBox = componentRef.current?.querySelector('.content-box');
      const headingChars = componentRef.current?.querySelectorAll('.anim-char');
      const divider = componentRef.current?.querySelector('.anim-line hr');
      const paragraph = componentRef.current?.querySelector('.anim-line p');
      const button = componentRef.current?.querySelector('.anim-line button');

      if (contentBox && headingChars && headingChars.length > 0) {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        tl.from(contentBox, {
          autoAlpha: 0,
          x: -40,
          duration: 1.5,
        })
        .from(headingChars, {
          yPercent: 130,
          stagger: 0.05, // Stagger for the new word
          duration: 1.2,
        }, "-=1.2")
        .from([divider, paragraph, button], {
          yPercent: 105,
          stagger: 0.1,
          duration: 1,
        }, "-=1.0"); // Adjusted timing
      }

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={componentRef}
      className="relative flex h-screen items-center justify-end overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/workspace/workspace-hero.png')" }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div
        className="content-box relative mr-8 flex w-full max-w-2xl flex-col gap-4 rounded-lg border border-white/10 bg-black/20 p-12 text-white backdrop-blur-lg sm:mr-16 md:mr-24"
      >
        <div className="anim-line overflow-hidden">
          {/* --- UPDATED: Title is now the single word "Workspace" --- */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium leading-tight tracking-wide text-white">
            {'Workspace'.split('').map((char, index) => (
              <span key={index} className="anim-char inline-block">
                {char}
              </span>
            ))}
          </h1>
        </div>

        <div className="anim-line overflow-hidden">
          <hr className="border-white/20" />
        </div>

        <div className="anim-line overflow-hidden">
          <p className="font-sans text-base leading-relaxed text-gray-200">
            Elevate your workspace with NGC `&apos;`s specially curated collection designed for modern offices and commercial interiors. Our range combines function and style—ensuring comfort, creativity, and productivity for any collaborative or executive space.
          </p>
        </div>

        <div className="anim-line mt-4 overflow-hidden pt-2">
          <button className="font-sans border border-white bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black">
            Discover Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorkspaceIntroduction;