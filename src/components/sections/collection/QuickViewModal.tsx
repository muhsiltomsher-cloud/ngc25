'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';
import gsap from 'gsap';

import type { Brand } from '@/data/brands';
import type { Product, ProductVariation } from '@/data/productsData';

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
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(modalRef.current, {
        scale: 0.98,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.from(contentRef.current?.children || [], {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        delay: 0.15,
        ease: 'power2.out',
      });
    }, modalRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 backdrop-blur-md px-4 py-6">
      <div
        ref={modalRef}
        className="relative flex w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-white shadow-2xl md:flex-row md:h-[85vh]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg backdrop-blur-sm transition hover:bg-white hover:scale-110"
          aria-label="Close quick view"
        >
          <FiX className="h-5 w-5" />
        </button>

        <div className="relative w-full md:w-[60%] bg-slate-100">
          <div className="relative h-[50vh] md:h-full w-full overflow-hidden">
            <Image
              src={currentImage}
              alt={selectedVariation?.name || product.name}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
            
            {availableImages.length > 1 && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl max-h-[70vh] overflow-y-auto">
                {availableImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      activeImageIndex === index 
                        ? "border-slate-900 shadow-lg scale-105" 
                        : "border-slate-200/50 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`View ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full md:w-[40%] overflow-y-auto">
          <div
            ref={contentRef}
            className="h-full bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl p-8 md:p-10 space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-slate-300 to-transparent"></div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                  {brand.title}
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-slate-300 to-transparent"></div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-light text-slate-900 leading-tight">
                {selectedVariation?.name || product.name}
              </h3>
              
              <p className="text-sm leading-relaxed text-slate-600">
                {product.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 font-semibold text-white">
                {product.currency} {product.price.toFixed(2)}
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-slate-600">
                SKU: {product.sku}
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-emerald-700 font-medium">
                {product.availability.quantity} {product.availability.type} available
              </span>
            </div>

            {product.variations?.length ? (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Available Colors
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {product.variations.map((variation) => (
                    <button
                      key={variation.id}
                      type="button"
                      onClick={() => {
                        setSelectedVariation(variation);
                        setActiveImageIndex(0);
                      }}
                      className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        selectedVariation?.id === variation.id
                          ? "border-slate-900 shadow-lg"
                          : "border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={variation.image}
                          alt={variation.name}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-4 w-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: variation.swatch ?? "#e5e7eb" }}
                          />
                          <span className="text-xs font-medium text-white truncate">
                            {variation.name}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Category</p>
                <p className="text-slate-900">{product.category}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Segment</p>
                <p className="text-slate-900">{product.segment}</p>
              </div>
            </div>

            {product.tags?.length ? (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Highlights
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 pt-4">
              <Link
                href={`/product/${product.id}`}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 hover:shadow-lg"
              >
                View Full Details
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="absolute bottom-8 right-8 opacity-[0.03] pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="currentColor" className="text-slate-900">
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="80" fontWeight="300">
                  {brand.title.charAt(0)}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
