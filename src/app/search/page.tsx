'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SearchBar from '../../components/SearchBar';
import { allProducts } from '../../data/productsData';

function SearchPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const q = (params?.get('q') || '').trim();
  const hasImage = !!params?.has('image');

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Load uploaded image preview from session storage if present
  useEffect(() => {
    try {
      const dataUrl = sessionStorage.getItem('imageSearchPreview');
      setImagePreview(dataUrl);
    } catch {
      setImagePreview(null);
    }
  }, [hasImage]);

  const results = useMemo(() => {
    const query = q.toLowerCase();
    if (!query) {
      // If no query, show featured first; fallback to all
      const featured = allProducts.filter(p => p.isFeatured);
      return featured.length ? featured : allProducts;
    }
    return allProducts.filter((p) => {
      const haystack = [
        p.name,
        p.category,
        p.segment,
        p.subCategory,
        p.brandKey,
        ...(p.tags || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [q]);

  // Simple client-side pagination (Load more)
  const [visibleCount, setVisibleCount] = useState(12);
  useEffect(() => {
    // Reset visible count when query changes
    setVisibleCount(12);
  }, [q]);

  const handleTextSearch = (query: string) => {
    const search = new URLSearchParams();
    search.set('q', query);
    router.push(`/search?${search.toString()}`);
  };

  const handleImageSelected = (dataUrl: string) => {
    try {
      sessionStorage.setItem('imageSearchPreview', dataUrl);
    } catch {}
    // Immediately update local preview so repeat uploads reflect without navigation
    setImagePreview(dataUrl);
    const search = new URLSearchParams(params ? Array.from(params.entries()) : []);
    if (q) search.set('q', q);
    search.set('image', '1');
    // Add a version param to ensure URL changes on repeat uploads
    search.set('imgv', String(Date.now()));
    router.replace(`/search?${search.toString()}`);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="w-full max-w-[1400px] mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">Search</h1>
        <SearchBar
          initialQuery={q}
          onTextSearch={handleTextSearch}
          onImageSelected={handleImageSelected}
          className="mb-6"
        />

        {(hasImage && imagePreview) && (
          <div className="mb-6 flex items-center space-x-4">
            <div className="text-sm text-gray-700">Image uploaded:</div>
            <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200">
              <Image src={imagePreview} alt="Uploaded for search" fill sizes="64px" className="object-cover" />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-700">
            {q ? (
              <>
                Showing results for <span className="font-medium">&quot;{q}&quot;</span>
              </>
            ) : (
              <>
                {hasImage ? 'Suggested products for your image' : 'Featured products'}
              </>
            )}
          </div>
          <div className="text-sm text-gray-500">{results.length} item{results.length === 1 ? '' : 's'}</div>
        </div>

        {results.length === 0 ? (
          <div className="p-6 bg-white border border-gray-200 rounded-xl text-gray-600">
            No products found. Try a different search term.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.slice(0, visibleCount).map((p) => (
                <Link
                  href={`/product/${p.id}`}
                  key={p.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow block"
                >
                  <div className="aspect-[4/3] bg-gray-100 relative">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 300px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-medium text-gray-900 line-clamp-2">{p.name}</h3>
                    <div className="mt-1 text-sm text-gray-600">{p.category}</div>
                    <div className="mt-2 text-sm text-gray-800">
                      <span className="font-semibold">{p.currency}</span> {p.price}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {visibleCount < results.length && (
              <div className="flex justify-center mt-8">
                <button
                  className="px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-sm"
                  onClick={() => setVisibleCount((c) => c + 12)}
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-gray-50"><section className="w-full max-w-[1400px] mx-auto px-4 py-8">Loading…</section></main>}>
      <SearchPageInner />
    </Suspense>
  );
}
