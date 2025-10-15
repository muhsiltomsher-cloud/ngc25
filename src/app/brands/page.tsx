'use client';

import React from 'react';
import Container from '@/components/atoms/Container';
import CollectionsBrandsSection from '@/components/sections/designer/CollectionsBrandsSection';
import StyledHeadline from '@/components/atoms/StyledHeadline';
import { allBrandsData, Brand } from '@/data/brands';

// Helper function to group brands by category
const groupBrandsByCategory = (brands: Brand[]) => {
  return brands.reduce((acc, brand) => {
    const category = brand.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(brand);
    return acc;
  }, {} as Record<string, Brand[]>);
};

const categorizedBrands = groupBrandsByCategory(allBrandsData);

const BrandsPage = () => {
  return (
    <div className="py-24 md:py-32">
      <Container>
        <div className="text-center mb-16">
          <StyledHeadline
            as="h1"
            text="Our Curated *Brand* Collections"
            className="text-4xl md:text-5xl font-serif font-medium text-gray-900 leading-tight"
          />
        </div>

        {/* Loop through each category */}
        {Object.entries(categorizedBrands).map(([category, brands]) => (
          <div key={category} className="mb-16">
            {/* Category Title */}
            <div className="mb-8">
              <StyledHeadline
                as="h2"
                text={category}
                className="text-3xl md:text-4xl font-serif font-medium text-primary leading-tight"
              />
            </div>

            {/* Brands Section for this category */}
            <CollectionsBrandsSection brands={brands} />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default BrandsPage;
