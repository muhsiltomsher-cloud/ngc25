'use client';

import React from 'react';
import Image from 'next/image';
import Container from '@/components/atoms/Container';

interface CollectionItem {
  brand: string;
  brandLogo?: string;
  overline: string;
  title: string;
  description: string;
  image: string;
}

const ITEMS: CollectionItem[] = [
  {
    brand: 'BLOQ',
    brandLogo: '/images/brands/bloq.png',
    overline: 'Get Your Hands Dirty',
    title: 'Farmhand for a Day',
    description:
      "A playful mix of textures and tones—perfect for lively, creative spaces that need durability and warmth.",
    image: '/images/workspace/options-hero.png',
  },
  {
    brand: 'SUMINOE',
    brandLogo: '/images/brands/suminoe.png',
    overline: 'Big Adventures for Small Folk',
    title: "Lil' Farmers Club",
    description:
      'Soft underfoot and sound‑absorbing planks designed for classrooms, libraries, and calm collaborative zones.',
    image: '/images/walls/lifestyle-img.jpg',
  },
  {
    brand: 'BALSAN',
    brandLogo: '/images/brands/balsan.png',
    overline: 'Saddle Up and Explore',
    title: 'Trail Rides',
    description:
      'Statement patterns that guide movement and define areas—ideal for hospitality and retail footprints.',
    image: '/images/walls/runway-walls.png',
  },
];

export default function OurCollectionsSection() {
  return (
    <section className="relative py-20 bg-slate-100/60">
      <Container>
        <div className="mb-8 md:mb-12">
          <span className="inline-block text-xs tracking-widest uppercase text-rose-600 bg-rose-50 px-3 py-1 rounded-full">Our Collections</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif font-medium text-gray-900">Discover What’s Possible</h2>
          <p className="mt-3 text-gray-600 max-w-2xl">Curated carpet tile edits from brands we trust. Built for performance, tuned for design.</p>
        </div>

        <div className="rounded-3xl border border-amber-100 bg-amber-50/50 p-4 md:p-8 shadow-sm">
          {ITEMS.map((item, idx) => (
            <div
              key={item.title}
              className={`grid items-center gap-6 md:gap-10 md:grid-cols-[160px_1fr_420px] ${
                idx > 0 ? 'md:border-t md:border-amber-100 md:pt-10 mt-8' : ''
              }`}
            >
              {/* Brand */}
              <div className="flex items-center md:items-start">
                <img
                  src={item.brandLogo ?? '/images/walls/logo.png'}
                  alt={item.brand}
                  className="h-14 w-auto object-contain"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.onerror = null;
                    el.src = '/images/walls/logo.png';
                  }}
                />
              </div>

              {/* Copy */}
              <div>
                <div className="text-sm text-emerald-800/90">{item.overline}</div>
                <h3 className="mt-1 text-2xl md:text-3xl font-serif text-emerald-900">{item.title}</h3>
                <p className="mt-2 text-gray-700 max-w-2xl">{item.description}</p>
              </div>

              {/* Visual */}
              <div className="order-first md:order-none">
                <div className="relative h-40 md:h-52 rounded-2xl overflow-hidden border border-amber-100 shadow-sm">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

