"use client";

import { useEffect, useState } from 'react';

export default function A11yToggle() {
  const [high, setHigh] = useState(false);

  useEffect(() => {
    const val = typeof document !== 'undefined' && document.documentElement.getAttribute('data-contrast') === 'high';
    setHigh(!!val);
  }, []);

  const toggle = () => {
    if (typeof document === 'undefined') return;
    const next = !high;
    document.documentElement.setAttribute('data-contrast', next ? 'high' : 'normal');
    setHigh(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={high}
      title={high ? 'Disable high contrast' : 'Enable high contrast'}
      className={`ml-3 inline-flex items-center rounded-md border px-2 py-1 text-xs transition-colors focus:outline-none ${
        high ? 'bg-yellow-300/80 text-black border-yellow-400' : 'bg-zinc-900/90 text-white border-white/10 hover:bg-zinc-800'
      }`}
    >
      {high ? 'Contrast: High' : 'Contrast'}
    </button>
  );
}

