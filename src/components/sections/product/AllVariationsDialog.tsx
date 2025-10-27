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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return variations;
    return variations.filter(v => v.name.toLowerCase().includes(q));
  }, [variations, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-md">
      <div className="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Complete Color Collection</h3>
            <p className="mt-1 text-sm text-slate-600">
              {filtered.length} {filtered.length === 1 ? 'color' : 'colors'} {query && `matching "${query}"`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="group rounded-full bg-slate-100 p-2 text-slate-700 transition-all hover:bg-slate-900 hover:text-white"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by color name..."
                className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-medium outline-none transition-all focus:border-slate-400 focus:bg-white"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-200 p-1 text-slate-600 hover:bg-slate-300"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex gap-2 rounded-xl border-2 border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Grid View"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                  viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="List View"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-white p-6">
          {filtered.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <svg className="h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h4 className="mt-4 text-lg font-semibold text-slate-900">No colors found</h4>
              <p className="mt-2 text-sm text-slate-600">Try adjusting your search terms</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 bg-white p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      active 
                        ? "border-slate-900 shadow-lg shadow-slate-900/20 ring-2 ring-slate-900 ring-offset-2" 
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {active && (
                      <div className="absolute right-2 top-2 z-10 rounded-full bg-slate-900 p-1 text-white shadow-lg">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={v.image} 
                      alt={v.name} 
                      className="aspect-square w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="mt-3 flex items-center gap-2">
                      <span 
                        className="h-5 w-5 flex-shrink-0 rounded-full border-2 border-white shadow-md ring-1 ring-slate-900/10" 
                        style={{ backgroundColor: v.swatch ?? "#e5e7eb" }} 
                      />
                      <span className="truncate text-sm font-semibold text-slate-900">{v.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
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
                    className={`group flex w-full items-center gap-4 rounded-2xl border-2 bg-white p-4 text-left transition-all hover:shadow-lg ${
                      active 
                        ? "border-slate-900 shadow-md ring-2 ring-slate-900 ring-offset-2" 
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={v.image} 
                      alt={v.name} 
                      className="h-20 w-20 flex-shrink-0 rounded-xl object-cover" 
                    />
                    <div className="flex flex-1 items-center gap-4">
                      <span 
                        className="h-8 w-8 flex-shrink-0 rounded-full border-2 border-white shadow-md ring-1 ring-slate-900/10" 
                        style={{ backgroundColor: v.swatch ?? "#e5e7eb" }} 
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{v.name}</h4>
                        <p className="text-sm text-slate-600">{v.swatch ?? 'Custom Color'}</p>
                      </div>
                      {active && (
                        <div className="rounded-full bg-slate-900 p-2 text-white">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
