'use client';

import React from 'react';
import CommonHeroBannerSection from '@/components/sections/common/HeroBannerSection';

const FloorsHeroBannerSection: React.FC = () => {
  return (
    <CommonHeroBannerSection
      title="Designer *Floors*"
      subtitle="Luxury flooring from the best brands to elevate your space with style."
      ctaLabel="Explore Flooring"
      ctaHref="/floors/collection"
      mediaSrc="/images/carpet-tiles/hero-banner.png"
      mediaAlt="Elegant flooring sample in a styled interior setting"
      className="floors-hero"
      variant="default"
      showParallax={true}
    />
  );
};

export default FloorsHeroBannerSection;
