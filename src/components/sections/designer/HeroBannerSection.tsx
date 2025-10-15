'use client';

import React from 'react';
import CommonHeroBannerSection from '@/components/sections/common/HeroBannerSection';

const DesignerHeroBannerSection: React.FC = () => {
  return (
    <CommonHeroBannerSection
      title="Designer *Walls*"
      subtitle="Luxury wallcoverings from the best brands to elevate your space with style."
      ctaLabel="Explore Wallcoverings"
      ctaHref="/walls/designer/collection"
      mediaSrc="/images/walls/designer-hero.png"
      mediaAlt="Elegant wallcovering sample in a styled interior setting"
      className="designer-hero"
      variant="default"
      showParallax={true}
      // bannerHeight="h-[500px]"
    />
  );
};

export default DesignerHeroBannerSection;
