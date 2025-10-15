'use client';

import React from 'react';

import HeroBannerSection from '@/components/sections/floors/HeroBannerSection';
import ShowcaseBrandsSection from '@/components/sections/floors/ShowcaseBrandsSection';
import CollectionsBrandsSection from '@/components/sections/floors/CollectionsBrandsSection';
import WhyChooseFlooringsSection from '@/components/sections/floors/WhyChooseFlooringsSection';
import WhyChooseFlooringOverCarpetSection from '@/components/sections/floors/WhyChooseFlooringOverCarpetSection';
import RunwayToFloorsSection from '@/components/sections/floors/RunwayToFloorsSection';
import { allFloorBrandsData } from '@/data/floorBrands';

export default function FloorsPage() {
  const staticWhyChooseFeatures = [
    {
      image: '/images/instock/floorings.png',
      title: 'In Stock',
      description:
        'A wide range of flooring options are in-stock and ready to ship across the UAE for a stylish transformation.',
    },
    {
      image: '/images/segments/residential.png',
      title: 'Residential',
      description:
        'From elegant hardwoods to durable vinyl, find the perfect floor to add warmth, personality, and lasting quality to your home.',
    },
    {
      image: '/images/segments/hospitality.png',
      title: 'Commercial',
      description:
        'High-performance flooring solutions designed for commercial spaces, offering durability, style, and ease of maintenance.',
    },
  ];

  return (
    <>
      <HeroBannerSection />

      <WhyChooseFlooringsSection
        headline="Why Choose Our *Designer* Floorings?"
        features={staticWhyChooseFeatures}
      />

      <WhyChooseFlooringOverCarpetSection
        headline="Why *Choose* Hard Flooring Over Carpet?"
        benefits={[
          { title: 'Durability & Longevity' },
          { title: 'Easy to Clean & Maintain' },
          { title: 'Hypoallergenic Qualities' },
          { title: 'Timeless Style' },
          { title: 'Adds Resale Value' },
        ]}
      />

      <RunwayToFloorsSection />

      <ShowcaseBrandsSection
        title="From the *Showroom* to Your Floors"
        bannerImage="/images/products/floors.png"
        brands={allFloorBrandsData.map(b => ({ name: b.title, image: b.logo, link: '#'}))}
      />

      <CollectionsBrandsSection />
    </>
  );
}
