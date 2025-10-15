'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';

import type { Brand } from '@/data/brands';
import type { Product } from '@/data/productsData';

interface QuickViewModalProps {
  product: Product;
  brand: Brand;
  onClose: () => void;
}

export default function QuickViewModal({ product, brand, onClose }: QuickViewModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm px-4 py-6">
      <div className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition hover:bg-white"
          aria-label="Close quick view"
        >
          <FiX className="h-5 w-5" />
        </button>

        <div className="relative h-64 w-full overflow-hidden bg-slate-100 md:h-auto md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>

        <div className="flex-1 px-6 py-8 md:px-8 md:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            {brand.title}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{product.name}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>

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
