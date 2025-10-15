"use client";

import React, { useMemo, useState } from "react";
import type { ProductVariation } from "@/data/productsData";

interface Props {
  open: boolean;
  onClose: () => void;
  variations: ProductVariation[];
  selectedId?: string;
  onSelect: (v: ProductVariation) => void;
}

export default function AllVariationsDialog({ open, onClose, variations, selectedId, onSelect }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return variations;
    return variations.filter(v => v.name.toLowerCase().includes(q));
  }, [variations, query]);

  if (!open) return null;

  // simple scrollable grid; no virtualization to avoid dependency issues

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h3 className="text-lg font-semibold text-slate-900">All Colours</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-slate-400"
          >
            Close
          </button>
        </div>
        <div className="flex items-center gap-3 px-5 py-3">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search colours..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
        </div>
        <div className="h-[520px] w-full overflow-auto p-3">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {filtered.map((v) => {
              const active = v.id === selectedId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    onSelect(v);
                    onClose();
                  }}
                  className={`group flex flex-col overflow-hidden rounded-xl border p-2 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${
                    active ? "border-slate-900" : "border-slate-200"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.image} alt={v.name} className="h-20 w-full rounded-md object-cover" />
                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full border" style={{ backgroundColor: v.swatch ?? "#e5e7eb" }} />
                    <span className="truncate text-xs font-medium text-slate-700">{v.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
