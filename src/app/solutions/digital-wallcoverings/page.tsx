'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-4 w-full max-w-[1400px] mx-auto ${className}`}>
    {children}
  </div>
);

const CATEGORIES = [
  {
    id: 'kids',
    name: 'KIDS',
    image: '/images/workspace/options-custom.png',
    href: '/search?q=kids+wallcoverings',
  },
  {
    id: 'botanical',
    name: 'BOTANICAL',
    image: '/images/workspace/options-fabrics.png',
    href: '/search?q=botanical+wallcoverings',
  },
  {
    id: 'geometrics',
    name: 'GEOMETRICS',
    image: '/images/walls/luxury.png',
    href: '/search?q=geometric+wallcoverings',
  },
  {
    id: 'nature',
    name: 'NATURE',
    image: '/images/workspace/options-wallcoverings.png',
    href: '/search?q=nature+wallcoverings',
  },
  {
    id: 'abstract',
    name: 'ABSTRACT',
    image: '/images/walls/runway-to-your-walls.png',
    href: '/search?q=abstract+wallcoverings',
  },
  {
    id: 'pattern',
    name: 'PATTERN',
    image: '/images/walls/versace.png',
    href: '/search?q=pattern+wallcoverings',
  },
];

const FEATURES = [
  {
    id: 'eco-greens',
    title: 'ECO GREENS',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M32 8 C 20 8, 12 16, 12 28 C 12 40, 20 48, 32 56 C 44 48, 52 40, 52 28 C 52 16, 44 8, 32 8 Z" />
        <path d="M32 20 L 32 44 M 24 28 L 32 20 L 40 28" />
      </svg>
    ),
    description: 'Made from recycled fibers, eco-friendly and free from harmful ingredients. Durable, washable, and wear-resistant, like premium non-woven wallpapers.',
  },
  {
    id: 'eco-substrate',
    title: 'ECO SUBSTRATE',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="8" width="48" height="48" rx="4" />
        <path d="M8 20 L 56 20 M 20 8 L 20 56" />
        <circle cx="32" cy="32" r="8" />
      </svg>
    ),
    description: 'High-quality print with vibrant colors and sharp details. Custom sizes, designs, and finishes available. Easy to install and remove, with options for flame-retardant standards. Printed with environmentally safe inks.',
  },
  {
    id: 'endless-designs',
    title: 'Endless Designs, Made Yours',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="12" width="48" height="40" rx="2" />
        <circle cx="20" cy="24" r="4" />
        <path d="M8 44 L 20 32 L 32 40 L 56 20" />
      </svg>
    ),
    description: 'All of our existing patterns and murals are available for customization. This extensive library holds thousands of designs to choose from.',
  },
];

function CategoryCard({ category }: { category: typeof CATEGORIES[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-white text-xl font-bold mb-3 tracking-wide">{category.name}</h3>
          <Link
            href={category.href}
            className="inline-block bg-black text-white px-6 py-2.5 text-sm font-semibold rounded-md hover:bg-gray-900 transition-colors"
          >
            Browse Designs
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ feature }: { feature: typeof FEATURES[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="text-green-600 mb-4">{feature.icon}</div>
        <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
        <div
          className={`text-gray-600 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-96' : 'max-h-24'
          }`}
        >
          {feature.description}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 px-6 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'SHOW LESS' : 'READ MORE'}
        </button>
      </div>
    </div>
  );
}

function StickyScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const leftCategories = CATEGORIES.slice(0, 3);
  const rightCategories = CATEGORIES.slice(3, 6);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': () => {
          const getMaxHeight = () => {
            const leftHeight = leftRef.current?.scrollHeight || 0;
            const rightHeight = rightRef.current?.scrollHeight || 0;
            return Math.max(leftHeight, rightHeight);
          };

          const commonConfig = {
            trigger: wrapperRef.current,
            start: 'top top+=100',
            end: () => `+=${Math.max(0, getMaxHeight() - window.innerHeight + 300)}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          };

          ScrollTrigger.create({
            ...commonConfig,
            pin: leftRef.current,
            pinSpacing: true,
          });

          ScrollTrigger.create({
            ...commonConfig,
            pin: rightRef.current,
            pinSpacing: false,
          });

          gsap.to(centerRef.current, {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: 'top top+=100',
              end: () => `+=${getMaxHeight()}`,
              scrub: true,
            },
          });
        },
        '(prefers-reduced-motion: reduce)': () => {
          ScrollTrigger.getAll().forEach((t) => t.disable());
        },
      });

      if (typeof window !== 'undefined') {
        window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
      }
      
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="relative py-20 bg-white overflow-hidden">
      <Container>
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
          <div ref={leftRef} className="flex flex-col gap-8 will-change-transform">
            {leftCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          <div ref={centerRef} className="mx-8 text-center w-[min(520px,80vw)] self-start">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              CUSTOM WALLCOVERINGS
            </h2>
            <p className="text-xl text-gray-600">Bring creativity to your walls</p>
          </div>

          <div ref={rightRef} className="flex flex-col gap-8 will-change-transform">
            {rightCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        <div className="lg:hidden">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              CUSTOM WALLCOVERINGS
            </h2>
            <p className="text-xl text-gray-600">Bring creativity to your walls</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function DigitalWallcoveringsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/workspace/workspace-hero.png"
            alt="Digital Wallcoverings Hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
        </div>

        <Container className="relative z-10 py-20">
          <div className="max-w-3xl mx-auto">
            <div
              className="bg-white/60 backdrop-blur-md backdrop-saturate-150 border border-white/30 shadow-2xl rounded-3xl p-10 md:p-12"
              style={{
                animation: 'fadeInScale 0.8s cubic-bezier(0.32, 0.7, 0.37, 1)',
              }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Digital Wallcoverings
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Elevate your workspace with NGC&apos;s specially curated collection designed for modern offices and commercial interiors. From acoustic wallcoverings and durable flooring solutions to ergonomic fabrics, our range combines function and style—ensuring comfort, creativity, and productivity. Whether it&apos;s a collaborative open-plan office or a focused executive suite, we have tailored design options to meet every workspace need.
              </p>
              <Link
                href="/search?q=wallcoverings"
                className="inline-block bg-black text-white px-8 py-3.5 text-sm font-bold tracking-wide rounded-md hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl"
              >
                DISCOVER COLLECTION
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <StickyScrollSection />

      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </Container>
      </section>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @supports not (backdrop-filter: blur(12px)) {
          .backdrop-blur-md {
            background-color: rgba(255, 255, 255, 0.85);
          }
        }
      `}</style>
    </main>
  );
}
