'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '@/components/atoms/Container';
import SectionHeader from '@/components/molecules/SectionHeader';
import Button from '@/components/atoms/Button'; // Use your common Button
import { ArrowForward, ArrowBack } from '@mui/icons-material'; // Import MUI Arrow Icons
import projects from '@/data/projectsData'; // Adjust path if no alias


// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
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
    <section ref={sectionRef} className="bg-[#fefff1] w-full py-16 sm:py-24">
      <Container>
        {/* Header: Centered with a main title and a descriptive subtitle for better context */}

          <SectionHeader
            title="LATEST PROJECTS
"
            // Pass classes to the SectionHeader component for styling
            className="mb-10"
          />
    

        {/* Projects Grid: Increased gap for better visual separation */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 w-full">
          {projects.map((project) => (
            <div
              key={project.key}
              className="group relative h-[450px] w-full overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl"
            >
              {/* Image with zoom effect */}
              <img
                src={project.img}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content Block */}
              <div
                className="absolute bottom-0 left-0 right-0 z-10 p-6 text-white overflow-hidden
                  h-24 group-hover:h-48 
                  transition-all duration-500 ease-in-out"
              >
                <h3 className="text-2xl font-bold font-serif leading-tight">
                  {project.title}
                </h3>

                {/* Description with fade-in effect */}
                <p className="mt-2 text-base text-slate-200 opacity-0 transition-opacity duration-300 delay-200 group-hover:opacity-100">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
