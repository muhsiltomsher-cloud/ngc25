'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { allBrandsData } from '@/data/brands';
import { allProducts, Product } from '@/data/productsData';

import BannerOverlay from '@/components/sections/collection/BannerOverlay';
import ProductFilter, { type FilterState } from '@/components/sections/collection/ProductFilter';
import Container from '@/components/atoms/Container';
import BrandProductSection from '@/components/sections/collection/BrandProductSection';

const INITIAL_BRAND_BATCH = 5;
const LOAD_STEP = 5;

export default function DesignerCollectionsPage() {
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    brand: [],
    segment: [],
    category: [],
    subCategory: [],
  });

  const filteredProducts = useMemo(
    () =>
      allProducts.filter(
        p =>
          (!filter.search.length ||
            p.name.toLowerCase().includes(filter.search.toLowerCase()) ||
            p.tags?.some(tag => tag.toLowerCase().includes(filter.search.toLowerCase()))) &&
          (!filter.brand.length || filter.brand.includes(p.brandKey)) &&
          (!filter.segment.length || filter.segment.includes(p.segment)) &&
          (!filter.category.length || filter.category.includes(p.category)) &&
          (!filter.subCategory.length || filter.subCategory.includes(p.subCategory))
      ),
    [filter]
  );

  const { productsByBrand, brandsWithProducts } = useMemo(() => {
    const byBrand: Record<string, Product[]> = {};
    filteredProducts.forEach(p => {
      if (!byBrand[p.brandKey]) {
        byBrand[p.brandKey] = [];
      }
      byBrand[p.brandKey].push(p);
    });
    const available = allBrandsData.filter(b => byBrand[b.key]?.length);
    return { productsByBrand: byBrand, brandsWithProducts: available };
  }, [filteredProducts]);

  const topBrands = useMemo(() => brandsWithProducts, [brandsWithProducts]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_BRAND_BATCH);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const visibleBrands = useMemo(() => topBrands.slice(0, visibleCount), [topBrands, visibleCount]);

  const hasMore = visibleCount < topBrands.length;

  // Extracted dependency keys to satisfy exhaustive-deps lint
  const filterSearch = filter.search;
  const filterBrandKey = useMemo(() => filter.brand.join('|'), [filter.brand]);
  const filterSegmentKey = useMemo(() => filter.segment.join('|'), [filter.segment]);
  const filterCategoryKey = useMemo(() => filter.category.join('|'), [filter.category]);
  const filterSubCategoryKey = useMemo(() => filter.subCategory.join('|'), [filter.subCategory]);
  const topBrandsLen = topBrands.length;

  useEffect(() => {
    setVisibleCount(INITIAL_BRAND_BATCH);
  }, [filterSearch, filterBrandKey, filterSegmentKey, filterCategoryKey, filterSubCategoryKey, topBrandsLen]);

  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => setIsTransitioning(false), 220);
    return () => clearTimeout(timeout);
  }, [filterSearch, filterBrandKey, filterSegmentKey, filterCategoryKey, filterSubCategoryKey, topBrandsLen]);

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFetchingMore(true);
          setVisibleCount(prev => Math.min(prev + LOAD_STEP, topBrands.length));
        }
      },
      { rootMargin: '240px 0px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, topBrands.length]);

  useEffect(() => {
    if (!isFetchingMore) return;
    if (!hasMore) {
      setIsFetchingMore(false);
      return;
    }
    const timeout = setTimeout(() => setIsFetchingMore(false), 220);
    return () => clearTimeout(timeout);
  }, [visibleCount, isFetchingMore, hasMore]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <BannerOverlay />
      <Container className="py-10">
        <div className="flex flex-col lg:flex-row gap-4">
          <aside className="lg:w-72 flex-none rounded-md border border-gray-100 bg-white p-3 shadow-sm lg:sticky lg:top-24 overflow-y-auto lg:max-h-[80vh]">
            <ProductFilter filter={filter} setFilter={setFilter} brands={allBrandsData} />
          </aside>

          <main className="flex-1 flex flex-col gap-4">
   
            {isTransitioning ? (
              <>
                {Array.from({ length: 2 }).map((_, index) => (
                  <BrandProductSectionSkeleton key={`transition-skeleton-${index}`} />
                ))}
              </>
            ) : visibleBrands.length > 0 ? (
              <>
                {visibleBrands.map(brand => (
                  <BrandProductSection key={brand.key} brand={brand} products={productsByBrand[brand.key] ?? []} />
                ))}

                {isFetchingMore && <BrandProductSectionSkeleton key="fetch-more-skeleton" />}

                <div
                  ref={loadMoreRef}
                  className="mt-4 flex items-center justify-center text-sm text-gray-400"
                >
                  {hasMore
                    ? isFetchingMore
                      ? 'Loading more collections…'
                      : 'Scroll to load more collections'
                    : 'You have reached the end of the catalogue.'}
                </div>
              </>
            ) : (
              <div className="text-center py-20 flex flex-col items-center justify-center">
                <h3 className="text-2xl font-semibold text-gray-700">No Products Found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters to find what you&apos;re looking for.</p>
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}

const BrandProductSectionSkeleton = () => (
  <section className="space-y-4 animate-pulse">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="space-y-2">
        <div className="h-3 w-44 rounded bg-gray-200" />
        <div className="h-6 w-64 rounded bg-gray-200" />
        <div className="h-4 w-56 rounded bg-gray-200" />
      </div>
      <div className="h-4 w-24 rounded bg-gray-200" />
    </div>

    <div className="rounded-[32px] border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 md:w-[240px]">
          <div className="h-[320px] w-[220px] md:w-full rounded-[28px] bg-gray-200" />
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[320px] w-[220px] md:w-full rounded-[28px] bg-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);
