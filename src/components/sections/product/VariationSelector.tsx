"use client";

import React from "react";
import type { ProductVariation } from "@/data/productsData";

interface VariationSelectorProps {
  variations: ProductVariation[];
  selectedId?: string;
  onSelect: (variation: ProductVariation) => void;
}

export default function VariationSelector({ variations, selectedId, onSelect }: VariationSelectorProps) {
  if (!variations?.length) return null;

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-900">Color Options</p>
      <div className="flex flex-wrap gap-3">
        {variations.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => onSelect(v)}
            className={`group inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-sm transition ${
              selectedId === v.id
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
            }`}
            aria-pressed={selectedId === v.id}
          >
            <span
              className="h-4 w-4 rounded-full border border-black/10"
              style={{ backgroundColor: v.swatch ?? "#e5e7eb" }}
            />
            <span className="font-medium leading-none">{v.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

