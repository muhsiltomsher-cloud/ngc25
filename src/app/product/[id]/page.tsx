"use client";

import React, { useEffect, useMemo, useState } from "react";
// import Link from 'next/link';
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
    <div className="bg-white">
      <Container className="py-8 md:py-12">
        <button
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          &larr; Back
        </button>

        <div className="sticky top-16 z-10 mb-6 rounded-full border border-slate-200 bg-white/80 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <ViewModeTabs value={viewMode} onChange={setViewMode} onOpenMySpace={() => setShowMySpace(true)} />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ProductGallery images={images} />

          <div className="flex flex-col gap-6">
            <div>
              {brand ? (
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{brand.title}</p>
              ) : null}
              <h1 className="mt-1 text-3xl font-semibold text-slate-900 md:text-4xl">{product.name}</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-700">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-semibold">{product.currency} {product.price.toFixed(2)}</span>
              <span className="text-slate-400">|</span>
              <span>SKU: {product.sku}</span>
              <span className="text-slate-400">|</span>
              <span>
                {product.availability.quantity} {product.availability.type} available
              </span>
            </div>

            {product.variations?.length ? (
              <VariationCarousel
                variations={product.variations}
                selectedId={selectedVariation?.id}
                onSelect={setSelectedVariation}
              />
            ) : null}
            {product.variations && product.variations.length > 12 && (
              <button
                type="button"
                onClick={() => setShowAllColors(true)}
                className="inline-flex w-fit items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
              >
                View all colours ({product.variations.length})
              </button>
            )}

            {product.tags?.length ? (
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
            ) : null}
          </div>
        </div>

        <div className="mt-6">
          <ProductShareBar title={product.name} images={images} />
        </div>

        {otherVariations.length ? (
          <section className="mt-12">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Other Colors</h2>
              <p className="text-sm text-slate-600">Explore more colorways of this design.</p>
            </div>
            <VariationCarousel
              variations={otherVariations}
              selectedId={selectedVariation?.id}
              onSelect={setSelectedVariation}
            />
          </section>
        ) : null}

        {relatedProducts.length ? (
          <section className="mt-14">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">You May Also Like</h2>
                <p className="text-sm text-slate-600">Suggested picks curated for you.</p>
              </div>
            </div>
            <ProductCarousel products={relatedProducts} />
          </section>
        ) : null}

        {sameCollection.length ? (
          <section className="mt-14">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-slate-900">In The Same Collection</h2>
              <p className="text-sm text-slate-600">More from {brand?.title ?? product.brandKey} in {product.subCategory}.</p>
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
