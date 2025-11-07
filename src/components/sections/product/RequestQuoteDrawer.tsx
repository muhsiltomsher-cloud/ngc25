'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Product, ProductVariation } from '@/data/productsData';

interface RequestQuoteDrawerProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  variation?: ProductVariation;
  initialTab?: 'quote' | 'sample' | 'calculator';
}

export default function RequestQuoteDrawer({ open, onClose, product, variation, initialTab = 'quote' }: RequestQuoteDrawerProps) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState<'calculator' | 'sample' | 'quote'>(initialTab as any);
  const formRef = useRef<HTMLFormElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Focus first field
      setTimeout(() => firstInputRef.current?.focus(), 0);
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Ensure tab follows parent hint on open
  useEffect(() => {
    if (open) setTab(initialTab);
  }, [open, initialTab]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const productLabel = useMemo(() => {
    return `${product.name}${variation ? ` – ${variation.name}` : ''}`;
  }, [product.name, variation]);
  const label = `${product.name}${variation ? ` – ${variation.name}` : ''}`;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSent(false);
    const fd = new FormData(formRef.current!);
    const payload = Object.fromEntries(fd.entries());
    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: label,
          sku: product.sku,
          type: tab,
          ...payload,
        }),
      });
      setSent(true);
      const summary = {
        type: tab,
        product: { id: product.id, name: label, sku: product.sku },
        submittedAt: new Date().toISOString(),
        fields: payload,
      } as const;
      const encoded = encodeURIComponent(btoa(JSON.stringify(summary)));
      router.push(`/support/thank-you?type=${tab}&payload=${encoded}`);
    } catch (err) {
      // Minimal fallback: ignore
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <aside
        className="absolute right-0 top-0 h-full w-full max-w-[560px] bg-white shadow-2xl border-l border-slate-200 animate-[slideIn_.28s_ease-out] overflow-auto"
      >
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">{tab === 'calculator' ? 'Roll Calculator' : tab === 'sample' ? 'Order Sample' : 'Request a Quote'}</h2>
            <button onClick={onClose} aria-label="Close" className="rounded-md p-2 text-slate-600 hover:bg-slate-100 focus:outline-none">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
          </div>
          {/* Tabs */}
          <div role="tablist" className="px-3 pb-3">
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
              <button
                role="tab"
                aria-selected={tab === 'calculator'}
                onClick={() => setTab('calculator')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${tab === 'calculator' ? 'bg-white text-slate-900 shadow' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Roll Calculator
              </button>
              <button
                role="tab"
                aria-selected={tab === 'sample'}
                onClick={() => setTab('sample')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${tab === 'sample' ? 'bg-white text-slate-900 shadow' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Order Sample
              </button>
              <button
                role="tab"
                aria-selected={tab === 'quote'}
                onClick={() => setTab('quote')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${tab === 'quote' ? 'bg-white text-slate-900 shadow' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          {/* Product summary */}
          <div className="mb-5 rounded-xl border border-slate-200 p-4">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Product</div>
            <div className="mt-1 text-sm font-semibold text-slate-900">{label}</div>
            <div className="mt-1 text-xs text-slate-500">SKU: {product.sku}</div>
          </div>

          {/* Quote / Sample forms */}
          {tab !== 'calculator' && (
          <form key={tab} ref={formRef} onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Name</label>
                <input ref={firstInputRef} name="name" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="Your full name" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Company</label>
                <input name="company" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="Company name" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Email</label>
                <input type="email" name="email" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="name@example.com" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Phone</label>
                <input type="tel" name="phone" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="+971…" />
              </div>
            </div>

            {tab === 'quote' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Quantity</label>
                  <input type="number" name="quantity" min={1} defaultValue={1} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Need By</label>
                  <input type="date" name="needBy" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Sample Type</label>
                  <select name="sampleType" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none">
                    <option value="swatch">Swatch</option>
                    <option value="board">A4 Board</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Quantity</label>
                  <input type="number" name="quantity" min={1} defaultValue={1} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
                </div>
              </div>
            )}

            {tab === 'sample' ? (
              <>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Shipping Address</label>
                  <input name="address" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="Street, building, unit" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">City</label>
                    <input name="city" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Country</label>
                    <input name="country" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
                  </div>
                </div>
              </>
            ) : null}

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Message</label>
              <textarea name="message" rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder={tab === 'quote' ? 'Project details, specifications, site location, etc.' : 'Any notes for delivery or preferred sample size'} value={message} onChange={(e)=>setMessage(e.target.value)} />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <p className="text-xs text-slate-500">We’ll get back to you within 1 business day.</p>
              <button type="submit" disabled={sending} className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 disabled:opacity-60 focus:outline-none">
                {sending ? 'Sending…' : sent ? 'Sent' : tab === 'quote' ? 'Submit Request' : 'Place Sample Order'}
              </button>
            </div>
          </form>
          )}

          {/* Roll Calculator */}
          {tab === 'calculator' && (
            <RollCalculator onNext={(nextTab, info, qty) => {
              // Prefill message and quantity, then switch tab
              setMessage(info);
              setTab(nextTab);
              // set quantity after render
              setTimeout(() => {
                const form = formRef.current as any;
                if (form && form.elements && form.elements.namedItem) {
                  const qEl = form.elements.namedItem('quantity') as HTMLInputElement | null;
                  if (qEl && qty) qEl.value = String(qty);
                }
                firstInputRef.current?.focus();
              }, 0);
            }} />
          )}
        </div>
      </aside>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}

function RollCalculator({ onNext }: { onNext: (nextTab: 'sample' | 'quote', info: string, quantity: number) => void }) {
  const [wallH, setWallH] = useState<string>('');
  const [wallW, setWallW] = useState<string>('');
  const [rollH, setRollH] = useState<string>('10.05');
  const [rollW, setRollW] = useState<string>('1.06');
  const [waste, setWaste] = useState<string>('10');
  const [advanced, setAdvanced] = useState<boolean>(false);
  const [repeatCm, setRepeatCm] = useState<string>('0');

  const num = (v: string) => {
    const n = parseFloat(v);
    return isFinite(n) ? Math.max(0, n) : 0;
  };

  const rolls = (() => {
    const h = num(wallH);
    const w = num(wallW);
    const rh = num(rollH);
    const rw = num(rollW);
    const wf = num(waste) / 100;
    if (h <= 0 || w <= 0 || rh <= 0 || rw <= 0) return 0;
    if (!advanced) {
      const area = h * w;
      const rollArea = rh * rw;
      return Math.ceil(((area * (1 + wf)) / rollArea));
    }
    const rpt = num(repeatCm) / 100; // convert cm to m
    const dropLength = rpt > 0 ? Math.ceil(h / rpt) * rpt : h;
    const dropsPerRoll = Math.max(1, Math.floor(rh / dropLength));
    const totalDrops = Math.ceil(w / rw);
    const base = Math.ceil(totalDrops / dropsPerRoll);
    return Math.ceil(base * (1 + wf));
  })();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-slate-700">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 7h10M7 12h10M7 17h6"/></svg>
        <h3 className="text-base font-semibold">Roll Calculator</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input value={wallH} onChange={e=>setWallH(e.target.value)} inputMode="decimal" placeholder="Wall Height (m)" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
        <input value={wallW} onChange={e=>setWallW(e.target.value)} inputMode="decimal" placeholder="Wall Width (m)" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input value={rollH} onChange={e=>setRollH(e.target.value)} inputMode="decimal" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="Roll Height (m)" />
        <input value={rollW} onChange={e=>setRollW(e.target.value)} inputMode="decimal" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="Roll Width (m)" />
        <div className="flex items-center gap-2">
          <input value={waste} onChange={e=>setWaste(e.target.value)} inputMode="decimal" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="Waste %" />
          <span className="text-xs text-slate-500">(default 10%)</span>
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500">Presets:</span>
        <button onClick={()=>{setRollH('10.05'); setRollW('0.53');}} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">10.05 × 0.53 m</button>
        <button onClick={()=>{setRollH('10.05'); setRollW('1.06');}} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">10.05 × 1.06 m</button>
      </div>

      {/* Advanced toggle */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-700">
          <span>Advanced (pattern repeat)</span>
          <input type="checkbox" checked={advanced} onChange={e=>setAdvanced(e.target.checked)} className="h-4 w-4" />
        </label>
        {advanced && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Pattern Repeat (cm)</label>
              <input value={repeatCm} onChange={e=>setRepeatCm(e.target.value)} inputMode="decimal" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="e.g., 64" />
            </div>
            <div className="text-xs text-slate-600 self-end">We add waste and round up by roll based on repeat alignment.</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          <div>Wallpaper Height: <strong>{rollH || '—'}m</strong></div>
          <div>Wallpaper Width: <strong>{rollW || '—'}m</strong></div>
        </div>
        <div className="rounded-lg bg-rose-800 px-4 py-4 text-center text-white shadow">
          <div className="text-xs uppercase tracking-wider opacity-90">Number of Rolls</div>
          <div className="text-2xl font-semibold">{rolls}</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
        <p className="mb-2">This is an estimate. For complex repeats or multiple walls, our team can refine the numbers.</p>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => onNext('sample', `Please send a sample for: ${rolls} roll(s) estimate. Wall: ${wallH}m × ${wallW}m. Roll: ${rollH}m × ${rollW}m. Waste: ${waste}%${advanced ? `, Repeat: ${repeatCm}cm` : ''}.`, 1)} className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-slate-800 focus:outline-none">Order a Sample</button>
          <button onClick={() => onNext('quote', `Quote request: ${rolls} roll(s) estimated. Wall: ${wallH}m × ${wallW}m. Roll: ${rollH}m × ${rollW}m. Waste: ${waste}%${advanced ? `, Repeat: ${repeatCm}cm` : ''}.`, rolls)} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">Get a Quote</button>
        </div>
      </div>
    </div>
  );
}
