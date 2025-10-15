"use client";

import React from "react";
import type { ProductViewKey } from "@/data/productsData";

interface ViewModeTabsProps {
  value: ProductViewKey;
  onChange: (v: ProductViewKey) => void;
  onOpenMySpace: () => void;
}

const tabs: { key: ProductViewKey | "myspace"; label: string }[] = [
  { key: "installed", label: "Installed View" },
  { key: "room", label: "Room Scene View" },
  { key: "swatch", label: "Swatch View" },
  { key: "myspace", label: "View In My Space" },
];

export default function ViewModeTabs({ value, onChange, onOpenMySpace }: ViewModeTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const active = t.key === value || t.key === "myspace" && false;
        const handleClick = () => {
          if (t.key === "myspace") onOpenMySpace();
          else onChange(t.key as ProductViewKey);
        };
        return (
          <button
            key={t.key}
            type="button"
            onClick={handleClick}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

