"use client";

import React from "react";
import type { ProductVariation } from "@/data/productsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/grid";

interface VariationCarouselProps {
  variations: ProductVariation[];
  selectedId?: string;
  onSelect: (variation: ProductVariation) => void;
}

export default function VariationCarousel({ variations, selectedId, onSelect }: VariationCarouselProps) {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperInstance | null>(null);
  const [canSlidePrev, setCanSlidePrev] = React.useState(false);
  const [canSlideNext, setCanSlideNext] = React.useState(false);

  const hasVariations = Array.isArray(variations) && variations.length > 0;

  const updateSlideState = React.useCallback((swiper: SwiperInstance) => {
    setCanSlidePrev(!swiper.isBeginning);
    setCanSlideNext(!swiper.isEnd);
  }, []);

  const handlePrev = React.useCallback(() => {
    swiperInstance?.slidePrev();
  }, [swiperInstance]);

  const handleNext = React.useCallback(() => {
    swiperInstance?.slideNext();
  }, [swiperInstance]);

  React.useEffect(() => {
    if (!hasVariations) {
      setSwiperInstance(null);
      setCanSlidePrev(false);
      setCanSlideNext(false);
      return;
    }

    if (swiperInstance) {
      updateSlideState(swiperInstance);
    }
  }, [hasVariations, swiperInstance, updateSlideState]);

  if (!hasVariations) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">Colours</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous colours"
            disabled={!canSlidePrev}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next colours"
            disabled={!canSlideNext}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <Swiper
        modules={[Grid]}
        grid={{ rows: 2, fill: "row" }}
        spaceBetween={10}
        slidesPerView={10}
        className="!px-1"
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          updateSlideState(swiper);
        }}
        onSlideChange={updateSlideState}
      >
        {variations.map((v) => (
          <SwiperSlide key={v.id}>
            <button
              type="button"
              onClick={() => onSelect(v)}
              className={`group flex h-full w-full flex-col rounded-xl border p-2 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${
                selectedId === v.id ? "border-slate-900" : "border-slate-200"
              }`}
              aria-pressed={selectedId === v.id}
              title={v.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.image}
                alt={v.name}
                className="h-16 w-full rounded-md object-cover"
                loading="lazy"
              />
              <div className="mt-2 flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full border"
                  style={{ backgroundColor: v.swatch ?? "#e5e7eb" }}
                />
                <span className="truncate text-xs font-medium text-slate-700">{v.name}</span>
              </div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
