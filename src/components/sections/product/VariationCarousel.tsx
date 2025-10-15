"use client";

import React from "react";
import type { ProductVariation } from "@/data/productsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface VariationCarouselProps {
  variations: ProductVariation[];
  selectedId?: string;
  onSelect: (variation: ProductVariation) => void;
}

export default function VariationCarousel({ variations, selectedId, onSelect }: VariationCarouselProps) {
  if (!variations?.length) return null;

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-900">Colours</p>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={3}
        spaceBetween={12}
        breakpoints={{
          480: { slidesPerView: 4 },
          640: { slidesPerView: 6 },
          1024: { slidesPerView: 8 },
          1280: { slidesPerView: 10 },
        }}
        className="!px-1"
      >
        {variations.map((v) => (
          <SwiperSlide key={v.id} className="!w-auto">
            <button
              type="button"
              onClick={() => onSelect(v)}
              className={`group w-[120px] rounded-xl border p-2 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${
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

