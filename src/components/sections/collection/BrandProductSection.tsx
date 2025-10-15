'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';

import type { Brand } from '@/data/brands';
import type { Product } from '@/data/productsData';
import BrandShowcaseCard from '@/components/sections/collection/BrandShowcaseCard';
import ProductCard from '@/components/sections/collection/ProductCard';
import QuickViewModal from '@/components/sections/collection/QuickViewModal';

interface BrandProductSectionProps {
  brand: Brand;
  products: Product[];
}

const CHUNK_SIZE = 4;

const sanitizeId = (value: string) => `brand-${value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

const chunkProducts = (items: Product[]) => {
  const chunks: Product[][] = [];
  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    chunks.push(items.slice(i, i + CHUNK_SIZE));
  }
  return chunks;
};

export default function BrandProductSection({ brand, products }: BrandProductSectionProps) {
  const sectionId = useMemo(() => sanitizeId(brand.key || brand.id), [brand.id, brand.key]);
  const slides = useMemo(() => chunkProducts(products), [products]);
  const showSlider = slides.length > 1;

  const [activeSlide, setActiveSlide] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    setActiveSlide(0);
  }, [slides.length]);

  const goPrev = () => setActiveSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  const goNext = () => setActiveSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));

  const visibleProducts = showSlider ? slides[activeSlide] ?? [] : products;

  return (
    <section className="space-y-4" aria-labelledby={sectionId}>
      <div className="relative rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
       <header id={sectionId} className="flex flex-col gap-1">
            <h2 className="text-md font-normal tracking-tight text-gray-900">{brand.title}</h2>
            <span className="text-[12px] font-normal text-gray-400">{products.length} Products</span>
          </header>

          {showSlider && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={goPrev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-100"
                aria-label={`Previous ${brand.title} products`}
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-100"
                aria-label={`Next ${brand.title} products`}
              >
                <FiChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <div className="flex-shrink-0 md:w-[220px]">
            <BrandShowcaseCard brand={brand} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {visibleProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          </div>
        </div>


              <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
        <Link
          href={`/brands/${brand.key}`}
          className="group inline-flex items-center gap-2 text-sm font-normal text-slate-900/ transition hover:text-slate-600 focus:outline-none focus:underline"
        >
          <span>Explore {brand.title}</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/10 text-slate-900 transition group-hover:bg-slate-900/20">
            <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
        {showSlider && (
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={`${sectionId}-dot-${index}`}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2 w-8 rounded-full transition ${
                  index === activeSlide ? 'bg-gray-900' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Show slide ${index + 1} of ${slides.length}`}
              />
            ))}
          </div>
        )}
      </div>



      </div>



      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          brand={brand}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
}

