"use client";

import React from "react";

interface ProductShareBarProps {
  title: string;
  images: string[];
}

export default function ProductShareBar({ title, images }: ProductShareBarProps) {
  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard");
      }
    } catch {
      // noop
    }
  };

  const handleDownload = () => {
    // Open each image in a new tab to allow save; cross-origin downloads may be blocked
    images.slice(0, 5).forEach((src) => window.open(src, "_blank"));
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleShare}
        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
      >
        Share
      </button>
      <button
        type="button"
        onClick={handleDownload}
        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Download Hi-Res Images
      </button>
    </div>
  );
}

