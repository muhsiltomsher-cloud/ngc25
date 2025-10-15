"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Product } from "@/data/productsData";
import ProductCard from "@/components/sections/collection/ProductCard";

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  if (!products?.length) return null;

  return (
    <Swiper
      modules={[Navigation]}
      navigation
      slidesPerView={1}
      spaceBetween={16}
      breakpoints={{
        520: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      className="!px-1"
    >
      {products.map(p => (
        <SwiperSlide key={p.id} className="!h-auto">
          <ProductCard product={p} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

