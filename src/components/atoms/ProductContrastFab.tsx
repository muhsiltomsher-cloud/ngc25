"use client";

import { useEffect, useState } from 'react';

type BoolState = boolean;

const getAttrBool = (name: string, truthyValue = 'true') =>
  typeof document !== 'undefined' && document.documentElement.getAttribute(name) === truthyValue;
const setAttrBool = (name: string, value: BoolState, truthyValue = 'true', falsyValue = 'false') =>
  typeof document !== 'undefined' && document.documentElement.setAttribute(name, value ? truthyValue : falsyValue);

export default function ProductContrastFab() {
  const [open, setOpen] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [dark, setDark] = useState(false);
  const [bigText, setBigText] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [underline, setUnderline] = useState(false);

  useEffect(() => {
    // Initialize from attributes/localStorage if available
    const doc = document.documentElement;
    setContrast(doc.getAttribute('data-contrast') === 'high');
    setDark(doc.getAttribute('data-theme') === 'dark');
    setBigText(getAttrBool('data-text-size', 'large'));
    setReduceMotion(getAttrBool('data-reduce-motion'));
    setUnderline(getAttrBool('data-underline-links'));
  }, []);

  const toggleContrast = () => {
    const next = !contrast;
    document.documentElement.setAttribute('data-contrast', next ? 'high' : 'normal');
    setContrast(next);
  };
  const toggleDark = () => {
    const next = !dark;
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    setDark(next);
  };
  const toggleBigText = () => {
    const next = !bigText;
    document.documentElement.setAttribute('data-text-size', next ? 'large' : 'normal');
    setBigText(next);
  };
  const toggleReduceMotion = () => {
    const next = !reduceMotion;
    setAttrBool('data-reduce-motion', next);
    setReduceMotion(next);
  };
  const toggleUnderline = () => {
    const next = !underline;
    setAttrBool('data-underline-links', next);
    setUnderline(next);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      {/* FAB */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label="Accessibility options"
        className={`inline-flex h-12 w-12 items-center justify-center rounded-full shadow-lg focus:outline-none transition-colors ${
          contrast ? 'bg-yellow-300 text-black' : 'bg-black text-white hover:bg-zinc-800'
        }`}
        title="Accessibility"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 000 18V3z" fill="currentColor" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div className="mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          <div className="space-y-2 text-sm">
            <button onClick={toggleContrast} className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left ${contrast ? 'bg-yellow-50' : 'hover:bg-slate-50'} focus:outline-none`}>
              <span>High Contrast</span>
              <span aria-hidden className={`h-4 w-7 rounded-full p-[2px] transition-colors ${contrast ? 'bg-yellow-400' : 'bg-slate-300'}`}>
                <span className={`block h-3 w-3 rounded-full bg-white transition-transform ${contrast ? 'translate-x-3' : ''}`} />
              </span>
            </button>
            <button onClick={toggleDark} className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left ${dark ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'} focus:outline-none`}>
              <span>Dark Mode</span>
              <span aria-hidden className={`h-4 w-7 rounded-full p-[2px] transition-colors ${dark ? 'bg-slate-700' : 'bg-slate-300'}`}>
                <span className={`block h-3 w-3 rounded-full bg-white transition-transform ${dark ? 'translate-x-3' : ''}`} />
              </span>
            </button>
            <button onClick={toggleBigText} className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left ${bigText ? 'bg-emerald-50' : 'hover:bg-slate-50'} focus:outline-none`}>
              <span>Larger Text</span>
              <span aria-hidden className={`h-4 w-7 rounded-full p-[2px] transition-colors ${bigText ? 'bg-emerald-400' : 'bg-slate-300'}`}>
                <span className={`block h-3 w-3 rounded-full bg-white transition-transform ${bigText ? 'translate-x-3' : ''}`} />
              </span>
            </button>
            <button onClick={toggleUnderline} className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left ${underline ? 'bg-indigo-50' : 'hover:bg-slate-50'} focus:outline-none`}>
              <span>Underline Links</span>
              <span aria-hidden className={`h-4 w-7 rounded-full p-[2px] transition-colors ${underline ? 'bg-indigo-400' : 'bg-slate-300'}`}>
                <span className={`block h-3 w-3 rounded-full bg-white transition-transform ${underline ? 'translate-x-3' : ''}`} />
              </span>
            </button>
            <button onClick={toggleReduceMotion} className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left ${reduceMotion ? 'bg-rose-50' : 'hover:bg-slate-50'} focus:outline-none`}>
              <span>Reduce Motion</span>
              <span aria-hidden className={`h-4 w-7 rounded-full p-[2px] transition-colors ${reduceMotion ? 'bg-rose-400' : 'bg-slate-300'}`}>
                <span className={`block h-3 w-3 rounded-full bg-white transition-transform ${reduceMotion ? 'translate-x-3' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
