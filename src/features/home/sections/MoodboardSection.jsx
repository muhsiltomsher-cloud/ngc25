'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '@/components/atoms/Container';
import Button from '@/components/atoms/Button'; // Use your common Button
import Link from 'next/link';
import { ArrowForward, ArrowBack } from '@mui/icons-material'; // Import MUI Arrow Icons

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function MoodboardSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-moodboard-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-16 sm:py-20 overflow-hidden">
      {/* Background video (cover) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-[177.78vh] h-[56.25vw]">
          <iframe
            src="https://player.vimeo.com/video/1047460651?background=1&autoplay=1&loop=1&muted=1&controls=0&dnt=1"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            className="pointer-events-none h-full w-full"
            title="NGC background video"
          />
        </div>
      </div>
      {/* Overlays */}
      <div className="absolute inset-0 z-10">
        {/* color tint */}
        <div className="absolute inset-0 bg-[#cbcdbf]/80" />
        {/* subtle vignetting for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 mix-blend-multiply" />
      </div>
      <Container className="relative z-20">
        <h2 className="animate-moodboard-text text-3xl md:text-4xl font-extrabold text-[#373636] mb-2">
          Create Your Own Mood Board
        </h2>
        <p className="animate-moodboard-text mt-4 text-lg text-[#373636] max-w-xl">
          Present your ideas with confidence using the full range of products your client needs — all in one place.
        </p>
        <p className="animate-moodboard-text mt-4 text-lg text-[#373636] font-semibold max-w-xl">
          With NGC’s comprehensive selection, you have everything you need to bring your vision to life.&nbsp;
          <span className="font-bold">At NGC, we help redefine spaces.</span>
        </p>

        <div className="animate-moodboard-text mt-8 flex flex-col sm:flex-row gap-4 max-w-md">
          <Link href="/moodboard/editor" className="inline-flex">
            <Button
              variant="primaryLight"
              size="md"
              className="inline-flex items-center gap-2"
            >
              Start Creating
              <ArrowForward className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/moodboard" className="inline-flex">
            <Button
              variant="borderedDark"
              size="md"
              className="inline-flex items-center gap-2"
            >
              View Gallery
              <ArrowForward className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
