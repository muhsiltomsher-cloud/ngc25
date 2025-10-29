"use client";

import React, { useCallback, useMemo, useRef, useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { allProducts } from '@/data/productsData';
import { SidebarSection } from './ui/SidebarSection';
import { SectionHeader } from './ui/SectionHeader';
import { ProductCard } from './ui/ProductCard';
import { EmptyState } from './ui/EmptyState';
import { SegmentedControl } from './ui/SegmentedControl';

interface ImprovedProductLibraryProps {
  onInsert?: (url: string, name?: string, category?: string) => void;
  onSetBackground?: (url: string, name?: string) => void;
  disabled?: boolean;
}

export function ImprovedProductLibrary({
  onInsert,
  onSetBackground,
  disabled = false,
}: ImprovedProductLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [density, setDensity] = useState<'compact' | 'comfortable'>('compact');
  const productListRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let products = allProducts.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      category: p.category,
    }));

    if (selectedCategory) {
      products = products.filter(
        (p) => (p.category || '').toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (query) {
      products = products.filter((p) =>
        `${p.name} ${p.category}`.toLowerCase().includes(query)
      );
    }

    return products;
  }, [searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    return [...new Set(allProducts.map((p) => p.category))].sort();
  }, []);

  const quickApplyProducts = useMemo(() => {
    const wanted = ['Walls', 'Floors', 'Fabrics'];
    const fallback: Record<string, string> = {
      Walls: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1200&q=80',
      Floors: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
      Fabrics: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1200&q=80',
    };
    return wanted.map((cat) => {
      const found = allProducts.find(
        (p) => (p.category || '').toLowerCase() === cat.toLowerCase()
      );
      return { title: cat, url: found?.image || fallback[cat] || fallback.Walls };
    });
  }, []);

  const handleAddProduct = useCallback(
    (url: string, name: string, category: string) => {
      if (!disabled && onInsert) {
        onInsert(url, name, category);
      }
    },
    [disabled, onInsert]
  );

  const handleViewProduct = useCallback((id: string) => {
    window.open(`/product/${id}`, '_blank');
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Sticky Search Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <SectionHeader
          title="Product Library"
          description="Search and add to canvas"
          sticky={false}
        />
        
        <div className="px-4 pb-3 space-y-2">
          {/* Search Input */}
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* View Controls */}
          <div className="flex items-center justify-between gap-2">
            <SegmentedControl
              options={[
                { value: 'grid', label: 'Grid' },
                { value: 'list', label: 'List' },
              ]}
              value={viewMode}
              onChange={(v) => setViewMode(v as 'grid' | 'list')}
              size="sm"
            />
            
            <SegmentedControl
              options={[
                { value: 'compact', label: 'Compact' },
                { value: 'comfortable', label: 'Comfortable' },
              ]}
              value={density}
              onChange={(v) => setDensity(v as 'compact' | 'comfortable')}
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        {/* Quick Apply Section */}
        <SidebarSection
          title="Quick Apply"
          description="Apply textures to walls and floors"
          collapsible={true}
          defaultOpen={true}
        >
          <div className="grid grid-cols-3 gap-2">
            {quickApplyProducts.map((item) => (
              <div
                key={item.title}
                className="group relative rounded-lg overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-all"
              >
                <div className="aspect-square bg-gray-100 relative">
                  <NextImage
                    src={item.url}
                    alt={item.title}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-800 mb-1">
                    {item.title}
                  </div>
                  <button
                    className={`w-full px-2 py-1 text-[10px] rounded border ${
                      disabled
                        ? 'border-gray-200 bg-gray-100 text-gray-400'
                        : 'border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() =>
                      onSetBackground && onSetBackground(item.url, item.title)
                    }
                    disabled={disabled || !onSetBackground}
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SidebarSection>

        {/* Products Section */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-3 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                Products
                <span className="ml-2 text-xs font-normal text-gray-500">
                  ({filteredProducts.length})
                </span>
              </h3>
            </div>
          </div>

          {/* Product Grid */}
          <div ref={productListRef} className="bg-white p-3">
            {filteredProducts.length === 0 ? (
              <EmptyState
                icon={
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                }
                title="No products found"
                description="Try adjusting your search or filter criteria"
              />
            ) : (
              <div className={`grid gap-3 ${viewMode === 'grid' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    category={product.category}
                    onAdd={() => handleAddProduct(product.image, product.name, product.category)}
                    onView={() => handleViewProduct(product.id)}
                    variant={viewMode}
                    density={density}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
