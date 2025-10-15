"use client";

import React, { useMemo, useRef, useState } from "react";

interface ViewInMySpaceModalProps {
  open: boolean;
  onClose: () => void;
  texture: string; // current product image to overlay
}

export default function ViewInMySpaceModal({ open, onClose, texture }: ViewInMySpaceModalProps) {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const blendedStyle = useMemo(() => ({
    backgroundImage: photo ? `url(${photo})` : undefined,
  }), [photo]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h3 className="text-lg font-semibold text-slate-900">View In My Space</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-slate-400"
          >
            Close
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
          <div>
            <div className="aspect-[4/3] w-full rounded-xl border border-slate-200 bg-slate-50 p-4">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt="Uploaded room" className="h-full w-full object-contain" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-500">
                  Upload a room photo to preview
                </div>
              )}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setPhoto(url);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Upload Photo
              </button>
              {photo && (
                <button
                  type="button"
                  onClick={() => setPhoto(null)}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200">
              <div
                className="absolute inset-0 bg-center bg-contain bg-no-repeat"
                style={blendedStyle}
              />
              {/* texture overlay with multiply to simulate application */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={texture}
                alt="Texture"
                className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-80"
              />
              <div className="absolute inset-0 pointer-events-none bg-white/5" />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              This is a visual approximation. For precise visualization, professional render services may be required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

