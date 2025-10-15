'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/molecules/SectionHeader';
import Container from '@/components/atoms/Container';

gsap.registerPlugin(ScrollTrigger);

const PLACEHOLDER_IMG = "/images/colors/placeholder.jpg";

// Color columns structure
const COLOR_COLUMNS = [
  [
    { name: "CLAY", img: "/images/colors/clay.jpg" },
    { name: "SLATE", img: "/images/colors/placeholder.jpg" },
    { name: "COPPER", img: "/images/colors/placeholder.jpg" }
  ],
  [
    { name: "FRESH BARK", img: "/images/colors/fresh-bark.jpg" },
    { name: "PEBBLE", img: "/images/colors/placeholder.jpg" },
    { name: "TRUFFLE", img: "/images/colors/placeholder.jpg" }
  ],
  [
    { name: "OLIVE", img: "/images/colors/olive.jpg" },
    { name: "WOOL", img: "/images/colors/placeholder.jpg" },
    { name: "MUSHROOM", img: "/images/colors/placeholder.jpg" }
  ],
  [
    { name: "SAND", img: "/images/colors/sand.jpg" },
    { name: "PEANUT", img: "/images/colors/placeholder.jpg" },
    { name: "ROSE QUARTZ", img: "/images/colors/placeholder.jpg" }
  ],
  [
    { name: "HERB", img: "/images/colors/herb.jpg" },
    { name: "CREAM", img: "/images/colors/placeholder.jpg" },
    { name: "BLUSH", img: "/images/colors/placeholder.jpg" }
  ],
  [
    { name: "SEED PUFF", img: "/images/colors/seed-puff.jpg" },
    { name: "COTTON", img: "/images/colors/placeholder.jpg" },
    { name: "LINEN", img: "/images/colors/placeholder.jpg" }
  ],
];

const IMAGE_URL = "/images/colors/color-banner-left.png";

// Color Card component
function ColorCard({ name, img, onClick }) {
  const [imgSrc, setImgSrc] = useState(img || PLACEHOLDER_IMG);

  const onError = () => {
    if (imgSrc !== PLACEHOLDER_IMG) {
      setImgSrc(PLACEHOLDER_IMG); // Update to placeholder on error
    }
  };

  return (
    <button
      type="button"
      onClick={() => onClick(name)}
      className="flex items-center h-24 rounded-2xl overflow-hidden shadow bg-gray-200 relative focus:outline-none focus:ring-2 focus:ring-blue-400"
      style={{
        background: `url('${imgSrc}') center/cover no-repeat`,
        minHeight: '90px',
      }}
      aria-label={`Select color ${name}`}
    >
      <span className="sr-only">{name}</span>
      <img
        src={imgSrc}
        alt={name}
        className="hidden"
        onError={onError} // Trigger on error
        crossOrigin="anonymous"
      />
    </button>
  );
}

// Colors Section component
export default function ColorsSection() {
  const handleColorClick = (colorName) => {
    console.log("Clicked color:", colorName); // Handle color click
  };

  // Refs for right and left containers to match their height
  const rightRef = useRef(null);
  const leftRef = useRef(null);

  useEffect(() => {
    if (rightRef.current && leftRef.current) {
      // Set left container height to match right container height
      leftRef.current.style.height = `${rightRef.current.clientHeight}px`;
    }
  }, []); // Runs only once after the component is mounted

  return (
    <section className="relative bg-white py-20">
      <Container>
        <SectionHeader
          title={
            <>
              On-trend color<br />palette you may love...
            </>
          }
          className="mb-10 text-left"
        />
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* Left Image Column */}
          <div
            ref={leftRef}
            className="lg:w-1/3 w-full flex items-center justify-center"
            style={{ height: 'auto' }} // will be overwritten by effect
          >
            <img
              src={IMAGE_URL}
              alt="Moodboard palette"
              className="w-full h-full object-cover rounded-md shadow-xl"
              style={{ height: '100%' }}
            />
          </div>
          {/* Right Color Palette Column */}
          <div
            ref={rightRef}
            className="lg:w-2/3 w-full flex flex-row gap-3"
          >
            {/* Render color columns */}
            {[0, 1, 2].map((colIdx) => (
              <div key={colIdx} className="flex flex-col gap-3 flex-1">
                {COLOR_COLUMNS.map((row) => {
                  const colorObj = row[colIdx];
                  if (!colorObj) return null;

                  return (
                    <ColorCard
                      key={colorObj.name}
                      name={colorObj.name}
                      img={colorObj.img}
                      onClick={handleColorClick}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
