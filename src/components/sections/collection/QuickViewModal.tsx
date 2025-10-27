'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';

import type { Brand } from '@/data/brands';
import type { Product, ProductVariation } from '@/data/productsData';
import VariationSelector from '@/components/sections/product/VariationSelector';

interface QuickViewModalProps {
  product: Product;
  brand: Brand;
  onClose: () => void;
}

export default function QuickViewModal({ product, brand, onClose }: QuickViewModalProps) {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(
    product.variations?.[0]
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const availableImages = useMemo(() => {
    const images: string[] = [];
    
    if (selectedVariation?.gallery?.length) {
      images.push(...selectedVariation.gallery);
    } else if (selectedVariation?.image) {
      images.push(selectedVariation.image);
    }
    
    if (product.gallery?.length) {
      images.push(...product.gallery);
    }
    
    if (product.image && !images.includes(product.image)) {
      images.push(product.image);
    }
    
    return [...new Set(images)];
  }, [product, selectedVariation]);

  const currentImage = availableImages[activeImageIndex] || product.image;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm px-4 py-6">
      <div className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition hover:bg-white"
          aria-label="Close quick view"
        >
          <FiX className="h-5 w-5" />
        </button>

        <div className="relative w-full md:w-1/2">
          <div className="relative h-64 w-full overflow-hidden bg-slate-100 md:h-80">
            <Image
              src={currentImage}
              alt={selectedVariation?.name || product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>
          
          {availableImages.length > 1 && (
            <div className="mt-3 px-4 md:px-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {availableImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 relative h-16 w-16 overflow-hidden rounded-lg border-2 transition ${
                      activeImageIndex === index ? "border-slate-900" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`View ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 px-6 py-8 md:px-8 md:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            {brand.title}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            {selectedVariation?.name || product.name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-700">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-semibold">
              {product.currency} {product.price.toFixed(2)}
            </span>
            <span className="text-slate-400">|</span>
            <span>SKU: {product.sku}</span>
            <span className="text-slate-400">|</span>
            <span>
              {product.availability.quantity} {product.availability.type} available
            </span>
          </div>

          {product.variations?.length ? (
            <div className="mt-6">
              <VariationSelector
                variations={product.variations}
                selectedId={selectedVariation?.id}
                onSelect={(variation) => {
                  setSelectedVariation(variation);
                  setActiveImageIndex(0);
                }}
              />
            </div>
          ) : null}

          <div className="mt-6 grid grid-cols-1 gap-4 text-sm text-slate-600 sm:grid-cols-2">
            <div>
              <p className="font-semibold text-slate-900">Category</p>
              <p>{product.category}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Segment</p>
              <p>{product.segment}</p>
            </div>
            {product.tags?.length ? (
              <div className="sm:col-span-2">
                <p className="font-semibold text-slate-900">Highlights</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/product/${product.id}`}
              className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              View Full Details
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
