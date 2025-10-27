"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import Container from '@/components/atoms/Container';
import ProductGallery from '@/components/sections/product/ProductGallery';
import VariationCarousel from '@/components/sections/product/VariationCarousel';
import ViewModeTabs from '@/components/sections/product/ViewModeTabs';
import ProductShareBar from '@/components/sections/product/ProductShareBar';
import ViewInMySpaceModal from '@/components/sections/product/ViewInMySpaceModal';
import ProductCarousel from '@/components/sections/product/ProductCarousel';
import AllVariationsDialog from '@/components/sections/product/AllVariationsDialog';
import { allProducts, type Product, type ProductVariation, type ProductViewKey } from '@/data/productsData';
import { allBrandsData } from '@/data/brands';

export default function ProductDetailsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>();
  const [viewMode, setViewMode] = useState<ProductViewKey>('installed');
  const [showMySpace, setShowMySpace] = useState(false);
  const [showAllColors, setShowAllColors] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const found = allProducts.find(p => p.id === id);
    if (!found) {
      router.replace('/404');
      return;
    }
    setProduct(found);
    setSelectedVariation(found.variations?.[0]);
  }, [id, router]);

  const images = useMemo(() => {
    if (!product) return [] as string[];
    const fromVariation = selectedVariation?.views?.[viewMode] ?? [];
    const fromProduct = product.views?.[viewMode] ?? [];
    if (fromVariation.length) return fromVariation;
    if (fromProduct.length) return fromProduct;
    if (selectedVariation?.gallery?.length) return selectedVariation.gallery;
    if (product.gallery?.length) return product.gallery;
    return [product.image];
  }, [product, selectedVariation, viewMode]);

  const brand = useMemo(() => {
    if (!product) return undefined;
    return allBrandsData.find(b => b.key === product.brandKey);
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [] as Product[];
    const viaIds = product.relatedProductIds?.map(x => allProducts.find(p => p.id === x)).filter(Boolean) as Product[];
    if (viaIds.length) return viaIds.filter(p => p.id !== product.id).slice(0, 4);
    return allProducts.filter(p => p.brandKey === product.brandKey && p.id !== product.id).slice(0, 4);
  }, [product]);

  const sameCollection = useMemo(() => {
    if (!product) return [] as Product[];
    return allProducts.filter(p => p.brandKey === product.brandKey && p.subCategory === product.subCategory && p.id !== product.id).slice(0, 8);
  }, [product]);

    if (!product) return null;

  const otherVariations = (product.variations ?? []).filter(v => v.id !== selectedVariation?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Container className="py-6 md:py-10">
        <button
          onClick={() => router.back()}
          className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-all hover:gap-3 hover:text-slate-900"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Collection
        </button>

        <div className="sticky top-16 z-20 mb-8 rounded-2xl border border-slate-200/60 bg-white/90 p-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80">
          <ViewModeTabs value={viewMode} onChange={setViewMode} onOpenMySpace={() => setShowMySpace(true)} />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ProductGallery images={images} />
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-36 flex flex-col gap-6">
              <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
                {brand ? (
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">{brand.title}</p>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                  </div>
                ) : null}
                
                <h1 className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-3xl font-bold leading-tight text-transparent md:text-4xl lg:text-5xl">
                  {product.name}
                </h1>
                
                <p className="mt-4 text-base leading-relaxed text-slate-600">{product.description}</p>

                <div className="mt-6 flex items-center gap-2">
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(product.rating!) ? 'text-amber-400' : 'text-slate-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm font-medium text-slate-700">
                        {product.rating} ({product.reviewCount} reviews)
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 p-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">{product.currency} {product.price.toFixed(2)}</span>
                    <span className="text-sm text-slate-500">per unit</span>
                  </div>
                  <div className="h-8 w-px bg-slate-300"></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-500">SKU</span>
                    <span className="text-sm font-semibold text-slate-700">{product.sku}</span>
                  </div>
                  <div className="h-8 w-px bg-slate-300"></div>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${product.availability.quantity > 20 ? 'bg-emerald-500' : product.availability.quantity > 0 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-medium text-slate-700">
                      {product.availability.quantity} {product.availability.type} available
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setAddedToCart(true);
                      setTimeout(() => setAddedToCart(false), 2000);
                    }}
                    className="group relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-4 font-semibold text-white shadow-lg shadow-slate-900/25 transition-all hover:shadow-xl hover:shadow-slate-900/40"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {addedToCart ? (
                        <>
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Add to Cart
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border-2 border-slate-200 bg-white p-4 text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                    title="Add to Wishlist"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {product.tags?.length ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-gradient-to-r from-slate-100 to-slate-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              {product.variations?.length ? (
                <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xl shadow-slate-900/5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Color Options</h3>
                      <p className="text-sm text-slate-600">
                        {product.variations.length} variations available
                      </p>
                    </div>
                    {selectedVariation && (
                      <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                        <span
                          className="h-6 w-6 rounded-full border-2 border-white shadow-md"
                          style={{ backgroundColor: selectedVariation.swatch ?? '#e5e7eb' }}
                        />
                        <span className="text-sm font-semibold text-slate-900">{selectedVariation.name}</span>
                      </div>
                    )}
                  </div>
                  <VariationCarousel
                    variations={product.variations}
                    selectedId={selectedVariation?.id}
                    onSelect={setSelectedVariation}
                  />
                  {product.variations.length > 12 && (
                    <button
                      type="button"
                      onClick={() => setShowAllColors(true)}
                      className="mt-4 w-full rounded-xl border-2 border-slate-200 bg-gradient-to-r from-white to-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:border-slate-300 hover:shadow-md"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        View All {product.variations.length} Colors
                      </span>
                    </button>
                  )}
                </div>
              ) : null}

              <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xl shadow-slate-900/5">
                <h3 className="mb-4 text-lg font-bold text-slate-900">Share This Product</h3>
                <ProductShareBar title={product.name} images={images} />
              </div>
            </div>
          </div>
        </div>

        {otherVariations.length ? (
          <section className="mt-16">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-slate-900">Explore More Colors</h2>
              <p className="mt-2 text-base text-slate-600">Discover additional colorways of this exquisite design</p>
              <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300"></div>
            </div>
            <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xl shadow-slate-900/5">
              <VariationCarousel
                variations={otherVariations}
                selectedId={selectedVariation?.id}
                onSelect={setSelectedVariation}
              />
            </div>
          </section>
        ) : null}

        {relatedProducts.length ? (
          <section className="mt-20">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-slate-900">You May Also Like</h2>
              <p className="mt-2 text-base text-slate-600">Handpicked recommendations just for you</p>
              <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300"></div>
            </div>
            <ProductCarousel products={relatedProducts} />
          </section>
        ) : null}

        {sameCollection.length ? (
          <section className="mt-20 pb-12">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-slate-900">From The Same Collection</h2>
              <p className="mt-2 text-base text-slate-600">
                More stunning pieces from {brand?.title ?? product.brandKey} in {product.subCategory}
              </p>
              <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300"></div>
            </div>
            <ProductCarousel products={sameCollection} />
          </section>
        ) : null}

        <ViewInMySpaceModal
          open={showMySpace}
          onClose={() => setShowMySpace(false)}
          texture={images[0] ?? product.image}
        />
        <AllVariationsDialog
          open={showAllColors}
          onClose={() => setShowAllColors(false)}
          variations={product.variations ?? []}
          selectedId={selectedVariation?.id}
          onSelect={setSelectedVariation}
        />
      </Container>
    </div>
  );
}
