import React from 'react';
import CarpetTilesHeroBannerSection from '@/components/sections/carpet-tiles/HeroBannerSection';
import WhyChooseWallcoveringsSection from '@/components/sections/common/WhyChooseWallcoveringsSection';
import WhyChoosePaint from '@/components/sections/common/WhyChooseWallpaperOverPaintSection';
import TexturesAndSizesSection from '@/components/sections/carpet-tiles/TexturesAndSizesSection';
import OurCollectionsSection from '@/components/sections/carpet-tiles/OurCollectionsSection';

const CarpetTilesPage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <CarpetTilesHeroBannerSection />
      
      <WhyChooseWallcoveringsSection
        headline={'CARPET TILES — Tell Your Story, Tile by Tile'}
        features={[
          {
            image: '/images/workspace/options-floorings.png',
            title: 'Carpet Tile Backings',
            description:
              'Choose the right backing or underlay for comfort, acoustics, and durability. Options tailored for workplaces, schools, and hospitality.',
          },
          {
            image: '/images/workspace/options-acoustic.png',
            title: 'Manage Your Acoustics',
            description:
              'Tiles help absorb sound and reduce footfall noise. Backing systems available to tune performance for your environment.',
          },
          {
            image: '/images/workspace/options-hero.png',
            title: 'Ready For Heavy Traffic',
            description:
              'Engineered for intensive use and easy maintenance—ideal for offices, retail, schools, hotels, and high‑traffic spaces.',
          },
        ]}
      />

      <WhyChoosePaint
        headline={'Why Designers Choose Carpet Tiles'}
        benefits={[
          { title: 'Acoustic comfort' },
          { title: 'Design flexibility' },
          { title: 'Durable + replaceable' },
          { title: 'Fast installation' },
          { title: 'Sustainable options' },
        ]}
        className="bg-white"
        scrollTargetId="textures-sizes"
      />

      <TexturesAndSizesSection />
      <OurCollectionsSection />
    </main>
  );
};

export default CarpetTilesPage;
