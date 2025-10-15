// src/components/sections/collection/BrandShowcaseCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Brand } from '@/data/brands';

interface BrandShowcaseCardProps {
  brand: Brand;
}

export default function BrandShowcaseCard({ brand }: BrandShowcaseCardProps) {
  const background = brand.img || brand.logo;

  return (
    <Link
      href={`/collections/${brand.key}`}
      className="group relative flex-shrink-0 w-[220px] md:w-[240px] h-full max-h-[150px] !rounded-md overflow-hidden shadow-md bg-gray-900"
    >
      <Image
        src={background}
        alt={brand.title}
        fill
        className="object-cover !rounded-md"
        sizes="(max-width: 768px) 220px, 240px"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 opacity-90 group-hover:opacity-100 transition" />

      <div className="relative h-full w-full flex flex-col  justify-between p-6 text-white">
        {/* <div className="flex-1 flex items-center justify-center">
          {brand.logo ? (
            <Image
              src={brand.logo}
              alt={`${brand.title} logo`}
              width={140}
              height={80}
              className="object-contain h-auto w-auto"
              priority={false}
            />
          ) : (
            <h3 className="text-xl font-semibold tracking-[0.25em] text-center uppercase">
              {brand.title}
            </h3>
          )}
        </div> */}
        <div className="pt-4 text-center">
          <p className="text-[13px] uppercase tracking-[0.35em] text-white/80">
            {brand.title || 'Collection'}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
        <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900">
          View Collection
        </div>
      </div>
    </Link>
  );
}
