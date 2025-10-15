'use client';

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperNavArrow from '@/components/atoms/SwiperNavArrow';
import Container from '@/components/atoms/Container';
import SectionHeader from '@/components/molecules/SectionHeader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const segments = [
  { name: 'Education', image: '/images/segments/education.png', link: '/segments/education' },
  { name: 'Hospitality', image: '/images/segments/hospitality.png', link: '/segments/hospitality' },
  { name: 'Healthcare', image: '/images/segments/healthcare.png', link: '/segments/healthcare' },
  { name: 'Residential', image: '/images/segments/residential.png', link: '/segments/residential' },
  { name: 'Workspace', image: '/images/segments/workspace.png', link: '/segments/workspace' },
];

const SegmentCard = ({ segment }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <a href={segment.link} className="block group h-full">
      <div className="relative bg-white shadow-lg rounded-md overflow-visible transition-shadow duration-300 hover:shadow-2xl">
        <div className="relative h-[550px] rounded-md overflow-hidden">
          {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />}
          <img
            src={segment.image}
            alt={segment.name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover rounded-md transition-opacity duration-700 ease-in-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="absolute bottom-0 left-0 w-full z-10">
            <div className="h-20 w-full bg-gradient-to-t from-black/80 to-transparent" />
            <span className="absolute left-0 bottom-6 w-full text-center text-xl font-normal group-hover:bg-lightbeige/50  py-2  text-white drop-shadow-lg group-hover:text-primary transition-colors duration-300">
              {segment.name}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default function SegmentsSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [navigationReady, setNavigationReady] = useState(false);
  const contentRefs = useRef([]);

  useEffect(() => {
    setNavigationReady(true);
  }, []);

  useLayoutEffect(() => {
    if (!navigationReady) return;

    const ctx = gsap.context(() => {
      contentRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
            ease: "power3.out",
          }
        );
      });
    }, contentRefs);

    return () => ctx.revert();
  }, [navigationReady]);

  return (
    <section className="py-16 bg-[#fdfde7] relative">
      <Container>
        <SectionHeader title="SEGMENTS" className="mb-10" />
        <div className="relative">
          {navigationReady && (
            <Swiper
              modules={[Navigation]}
              loop
              spaceBetween={15}
              slidesPerView={4}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="!overflow-visible"
            >
              {segments.map((segment, idx) => (
                <SwiperSlide key={segment.name}>
                  <div ref={(el) => (contentRefs.current[idx] = el)}>
                    <SegmentCard segment={segment} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <SwiperNavArrow
            ref={prevRef}
            direction="prev"
            className="absolute top-1/2 left-3 -translate-y-1/2 z-30"
          />
          <SwiperNavArrow
            ref={nextRef}
            direction="next"
            className="absolute top-1/2 right-3 -translate-y-1/2 z-30"
          />
        </div>
      </Container>
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }
      `}</style>
    </section>
  );
}
