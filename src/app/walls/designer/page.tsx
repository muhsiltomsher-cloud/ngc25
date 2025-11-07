'use client';

import React from 'react';

import HeroBannerSection from '@/components/sections/designer/HeroBannerSection';
import ShowcaseBrandsSection from '@/components/sections/designer/ShowcaseBrandsSection';
import CollectionsBrandsSection from '@/components/sections/designer/CollectionsBrandsSection';
import WhyChooseWallcoveringsSection from '@/components/sections/common/WhyChooseWallcoveringsSection';
import WhyChooseWallpaperOverPaintSection from '@/components/sections/common/WhyChooseWallpaperOverPaintSection';
import RunwayToWallsSection from '@/components/sections/designer/RunwayToWallsSection';

export default function DesignerWallsPage() {
  const staticWhyChooseFeatures = [
    {
      image: '/images/walls/instock.png', // icon
      title: 'Instock',
      description:
        'In-stock wallpapers, ready to ship across the UAE. Choose from a wide range of designs and enjoy fast delivery for quick, stylish transformations.',
    },
    {
      image: '/images/walls/residential.png', // icon
      title: 'Residential',
      description:
        'Beautiful wallpapers perfect for any home. From elegant plain designs with luxury textures to bold patterns, each style adds warmth, personality, and lasting quality to your space.',
    },
    {
      image: '/images/walls/luxury.png', // icon
      title: 'Luxury',
      description:
        'Bring the Iconic to Your Walls. Experience luxury like never before with exquisite wallpapers from the world’s most iconic fashion brands. Now, your walls can wear the same elegance, craftsmanship, and style that define haute couture.',
    },
  ];

  return (
    <>


<HeroBannerSection />

<WhyChooseWallcoveringsSection
  headline="Why Choose Our *Designer* Wallcoverings?"
  features={staticWhyChooseFeatures}
/>

<WhyChooseWallpaperOverPaintSection
  headline="Why *Choose* Wallpaper Over Paint?"
  benefits={[
    { title: 'Endless Designs' },
    { title: 'Durability & Longevity' },
    { title: 'Eco-Friendly Options' },
    { title: 'Acoustic & Insulation Benefits' },
    { title: 'Hides Imperfections' },
  ]}
/>

      <RunwayToWallsSection />

<ShowcaseBrandsSection
  title="From the *Runway* to Your Walls"
  bannerImage="/images/walls/runway-walls.png"
  brands={[
    { name: 'Armani Casa', image: '/images/walls/logo.png', link: '/collections/armani-casa' },
    { name: 'Mission Home', image: '/images/walls/logo.png', link: '/collections/mission-home' },
    { name: 'Versace', image: '/images/walls/logo.png', link: '/collections/versace' },
    { name: 'Armani Casa 2', image: '/images/walls/logo.png', link: '/collections/armani-casa-2' },
    { name: 'Mission Home 2', image: '/images/walls/logo.png', link: '/collections/mission-home-2' },
    { name: 'Versace 2', image: '/images/walls/logo.png', link: '/collections/versace-2' },
        { name: 'Armani Casa', image: '/images/walls/logo.png', link: '/collections/armani-casa' },
    { name: 'Mission Home', image: '/images/walls/logo.png', link: '/collections/mission-home' },
    { name: 'Versace', image: '/images/walls/logo.png', link: '/collections/versace' },
    { name: 'Armani Casa 2', image: '/images/walls/logo.png', link: '/collections/armani-casa-2' },
    { name: 'Mission Home 2', image: '/images/walls/logo.png', link: '/collections/mission-home-2' },
    { name: 'Versace 2', image: '/images/walls/logo.png', link: '/collections/versace-2' },
       { name: 'Versace', image: '/images/walls/logo.png', link: '/collections/versace' },
    { name: 'Armani Casa 2', image: '/images/walls/logo.png', link: '/collections/armani-casa-2' },
    { name: 'Mission Home 2', image: '/images/walls/logo.png', link: '/collections/mission-home-2' },
    { name: 'Versace 2', image: '/images/walls/logo.png', link: '/collections/versace-2' },
    // Add as many repeats as you want
  ]}
/>


      <CollectionsBrandsSection
   
      />
    </>
  );






}
