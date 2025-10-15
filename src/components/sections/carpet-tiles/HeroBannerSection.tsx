'use client';

import React from 'react';
import HeroBannerSection from '@/components/sections/common/HeroBannerSection';

const CarpetTilesHeroBannerSection: React.FC = () => {
  return (
    <HeroBannerSection
      title="Carpet *Tiles*"
      subtitle="Tell Your Story, Tile by Tile"
      ctaLabel="Discover more collection"
      ctaHref="/floors/carpet-tiles/collection"
      mediaSrc="/images/carpet-tiles/hero-banner.png"
      mediaAlt="Modern office space with premium carpet tiles"
      className="carpet-tiles-hero"
      variant="default"
      showParallax={true}
    />
  );
};

export default CarpetTilesHeroBannerSection;
