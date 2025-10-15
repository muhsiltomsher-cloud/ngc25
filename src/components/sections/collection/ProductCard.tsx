'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import type { Product } from '@/data/productsData';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-md border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-[280px] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
          priority={false}
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
              onQuickView?.(product);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow transition hover:bg-white"
          >
            <FiSearch />
            Quick View
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-2 pt-2">
        <Link
          href={`/product/${product.id}`}
          className="text-[14px] font-normal text-center leading-tight uppercase tracking-wide text-gray-900 transition hover:text-gray-600"
        >
          {product.name}
        </Link>
      </div>
    </div>
  );
}
