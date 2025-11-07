'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Container from '@/components/atoms/Container';

const bullet = (text: string) => (
  <li className="flex gap-2 text-gray-700 leading-relaxed">
    <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-rose-300" />
    <span>{text}</span>
  </li>
);

type SizeKey = '50x50' | '50x100' | '25x100' | '100x100';

const TEXTURES = [
  {
    key: 'loop',
    title: 'Loop pile',
    desc:
      'Uncut yarn loops for durable, textured surfaces—ideal for high‑traffic areas.',
  },
  {
    key: 'cut',
    title: 'Cut pile',
    desc:
      'Cut yarn loops, creating a soft, plush texture with a more luxurious feel.',
  },
  {
    key: 'multi',
    title: 'Multi‑level loop',
    desc:
      'Varying loop heights create a textured, dimensional surface with added depth.',
  },
  {
    key: 'tip',
    title: 'Tip‑sheared',
    desc:
      'A combination of cut and uncut loops with different heights for a sculpted look.',
  },
  {
    key: 'mini',
    title: 'Mini tuft',
    desc: 'Low‑profile, tightly packed tufts—dense and sleek underfoot.',
  },
];

export default function TexturesAndSizesSection() {
  const [selected, setSelected] = useState<SizeKey>('50x50');
  const revealRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = revealRef.current;
    if (!root || typeof window === 'undefined') return;
    const els = Array.from(root.querySelectorAll('.reveal')) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  const brands: { name: string; src?: string }[] = [
    { name: 'NGC', src: '/images/logo.png' },
    { name: 'Suminoe', src: '/images/brands/suminoe.png' },
    { name: 'Bloq', src: '/images/brands/bloq.png' },
    { name: 'Balsan', src: '/images/brands/balsan.png' },
  ];

  const TextureSchematic = () => (
    <svg
      viewBox="0 0 160 160"
      role="img"
      aria-label="Carpet tile texture diagrams"
      className="w-40 h-40 text-gray-600"
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" />
        </pattern>
      </defs>
      {/* Loop pile */}
      <g transform="translate(8,8)">
        <path d="M0 28 C8 4, 24 4, 32 28 S56 52, 64 28 S88 4, 96 28" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="0" y="54" className="sr-only">Loop pile</text>
      </g>
      {/* Multi-level loop */}
      <g transform="translate(8,64)">
        <path d="M0 28 C8 4, 24 4, 32 28" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M40 28 C48 12, 64 12, 72 28" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M80 28 C88 6, 104 6, 112 28" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="0" y="54" className="sr-only">Multi-level loop</text>
      </g>
      {/* Tip sheared (pattern texture) */}
      <g transform="translate(8,120)">
        <rect x="0" y="8" width="120" height="24" fill="url(#dots)" stroke="currentColor" strokeWidth="0.5" />
        <text x="0" y="54" className="sr-only">Tip-sheared</text>
      </g>
    </svg>
  );

  return (
    <section id="textures-sizes" className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Decorative background in light pastels */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-rose-100/70 to-pink-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-sky-100/70 to-indigo-100/40 blur-3xl" />
      {/* Soft grid overlay */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.14]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="p-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#p-grid)" />
      </svg>

      <Container>
        {/* Section header */}
        <div className="mb-10 md:mb-14 reveal opacity-0 translate-y-6 transition-all duration-700">
          <span className="inline-block text-xs tracking-widest uppercase text-rose-500 bg-rose-50 px-3 py-1 rounded-full">Design Guide</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif font-medium text-gray-900">Textures & Sizes</h2>
          <p className="mt-3 text-gray-600 max-w-2xl">Pick the right feel and format for your space. Blend textures and sizes to craft subtle gradients, zoning, and wayfinding.</p>
        </div>

        <div
          ref={revealRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:divide-x lg:divide-rose-100/60"
        >
          {/* Textures */}
          <div className="lg:pr-8">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6">
              Carpet Tile Textures
            </h2>

            <div className="flex items-start gap-6 reveal opacity-0 translate-y-6 transition-all duration-700">
              {/* Simple schematic */}
              <div className="hidden sm:flex items-center justify-center rounded-lg border border-rose-100 bg-rose-50/60 p-2">
                <TextureSchematic />
              </div>

              <div>
                <p className="text-gray-700 leading-relaxed mb-4 max-w-xl">
                  Our collections are available in different textures, each providing a different feel
                  and visual appeal for your carpet tiles.
                </p>
                {/* Texture cards */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TEXTURES.map((t) => (
                    <div
                      key={t.key}
                      className="group rounded-2xl border border-rose-100 bg-rose-50/50 backdrop-blur-[2px] p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 h-8 w-8 rounded-lg bg-gradient-to-br from-rose-300/40 to-pink-300/40 flex items-center justify-center text-rose-700">
                          <span className="text-sm font-semibold">{t.title.split(' ')[0][0]}</span>
                        </div>
                        <div>
                          <div className="font-serif text-lg text-gray-900">{t.title}</div>
                          <p className="text-sm text-gray-600 leading-relaxed mt-1">{t.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="lg:pl-8">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6">
              Carpet Tile Sizes
            </h2>

            {/* Size selector */}
            <div className="mb-4 flex flex-wrap gap-2 reveal opacity-0 translate-y-6 transition-all duration-700 delay-100">
              {(
                [
                  { key: '50x50', label: '50 × 50' },
                  { key: '50x100', label: '50 × 100' },
                  { key: '25x100', label: '25 × 100' },
                  { key: '100x100', label: '100 × 100' },
                ] as { key: SizeKey; label: string }[]
              ).map((o) => (
                <button
                  key={o.key}
                  onClick={() => setSelected(o.key)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all focus:outline-none focus:ring-0 ${
                    selected === o.key
                      ? 'bg-rose-200/70 text-rose-900 border-rose-300 shadow-sm'
                      : 'bg-white text-gray-800 border-gray-300 hover:bg-rose-50'
                  }`}
                >
                  {o.label} cm
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6 max-w-md reveal opacity-0 translate-y-6 transition-all duration-700 delay-150">
              {/* 50 x 50 */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-24 h-24 border-2 bg-rose-50 transition-all ${
                    selected === '50x50' ? 'border-rose-500 ring-2 ring-rose-300/50' : 'border-rose-200'
                  }`}
                />
                <span className="text-xs tracking-wide text-gray-600">50 × 50 cm</span>
              </div>
              {/* 100 x 100 */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-36 h-36 border-2 bg-pink-50 transition-all ${
                    selected === '100x100' ? 'border-rose-500 ring-2 ring-rose-300/50' : 'border-rose-200'
                  }`}
                />
                <span className="text-xs tracking-wide text-gray-600">100 × 100 cm</span>
              </div>
              {/* 25 x 100 */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-16 h-28 border-2 bg-rose-50 transition-all ${
                    selected === '25x100' ? 'border-rose-500 ring-2 ring-rose-300/50' : 'border-rose-200'
                  }`}
                />
                <span className="text-xs tracking-wide text-gray-600">25 × 100 cm</span>
              </div>
              {/* 50 x 100 */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-20 h-32 border-2 bg-pink-50 transition-all ${
                    selected === '50x100' ? 'border-rose-500 ring-2 ring-rose-300/50' : 'border-rose-200'
                  }`}
                />
                <span className="text-xs tracking-wide text-gray-600">50 × 100 cm</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal opacity-0 translate-y-6 transition-all duration-700 delay-200">
              <ul className="space-y-3">
                {bullet('50 × 50 cm carpet tiles')}
                {bullet('50 × 100 cm carpet tile planks')}
                {bullet('25 × 100 cm carpet tile planks')}
                {bullet('100 × 100 cm carpet tiles')}
              </ul>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-3">
                  Work with tiles or planks, add colour or pattern gradients, and even create
                  <a href="/floors/carpet-tiles/collection" className="underline ml-1 focus:outline-none">custom carpet tile</a>
                  {' '}designs.
                </p>
                <p className="text-sm text-gray-500">Mix sizes for zoning, wayfinding, and texture play.</p>
              </div>
            </div>

          </div>
        </div>

        {/* CTA band */}
        <div className="mt-10 flex flex-wrap gap-3 reveal opacity-0 translate-y-6 transition-all duration-700">
          <a
            href="/floors/carpet-tiles/collection"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-rose-900 bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 transition-colors shadow-sm focus:outline-none"
          >
            Explore Collection
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="/support/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-gray-800 border border-rose-200 hover:bg-rose-50 transition-colors focus:outline-none"
          >
            Talk to an expert
          </a>
        </div>

        {/* Logos */}
        <div className="mt-14 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-8 flex-wrap reveal opacity-0 translate-y-6 transition-all duration-700">
            <span className="text-xs uppercase tracking-widest text-gray-500">Trusted brands</span>
            {brands.map((b) => (
              <div key={b.name} className="flex items-center gap-2">
                <img
                  src={b.src ?? '/images/walls/logo.png'}
                  alt={b.name}
                  className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.onerror = null;
                    el.src = '/images/walls/logo.png';
                  }}
                />
                <span className="text-sm text-gray-600">{b.name}</span>
              </div>
            ))}
          </div>

          {/* Product photo accent */}
          <div className="mt-8 reveal opacity-0 translate-y-6 transition-all duration-700 delay-150">
            <div className="inline-block rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
              <Image
                src="/images/workspace/options-floorings.png"
                alt="Carpet tile selection"
                width={520}
                height={260}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
