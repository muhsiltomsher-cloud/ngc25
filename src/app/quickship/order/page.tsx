"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';
import Container from '@/components/atoms/Container';

export default function QuickshipOrderPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    const fd = new FormData(formRef.current!);
    const payload = Object.fromEntries(fd.entries());
    try {
      await fetch('/api/quickship-order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      setStatus('sent');
      // Small pause to provide feedback
      setTimeout(() => setStatus('idle'), 1200);
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-rose-100/60 to-pink-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-sky-100/60 to-indigo-100/40 blur-3xl" />
        <Container className="py-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">Quickship</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif font-medium text-gray-900">Start Quickship Order</h1>
            <p className="mt-3 text-gray-600">Provide delivery details and product info; we’ll confirm stock and ship within 24 hours.</p>
          </div>
        </Container>
      </section>

      <Container className="pb-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          <form ref={formRef} onSubmit={submit} className="lg:col-span-2 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Contact Name</label>
                <input name="name" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Company</label>
                <input name="company" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Email</label>
                <input type="email" name="email" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Phone</label>
                <input name="phone" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Category</label>
                <select name="category" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none">
                  <option value="wallcovering">Wallcovering (Type II)</option>
                  <option value="carpet-tiles">Carpet Tiles</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Brand / Collection</label>
                <input name="brand" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="e.g., Rasch, Omexco" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">SKU / Color</label>
                <input name="sku" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="e.g., 12345‑A" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Quantity</label>
                <input name="quantity" type="number" min={1} defaultValue={1} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Need By</label>
                <input name="needBy" type="date" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Site City</label>
                <input name="city" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="Dubai, Abu Dhabi…" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Delivery Address</label>
              <input name="address" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="Street, building, unit" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">Notes</label>
              <textarea name="notes" rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="Access times, lift booking, special handling" />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">By submitting, you agree to Quickship terms and availability.</p>
              <button disabled={status==='sending'} className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 disabled:opacity-60 focus:outline-none">
                {status==='sending' ? 'Sending…' : status==='sent' ? 'Sent' : 'Submit Quickship'}
              </button>
            </div>
          </form>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
            <h2 className="text-lg font-semibold text-slate-900">Need help?</h2>
            <p className="mt-2 text-sm text-slate-600">Unsure about quantities or suitability? We can check stock and propose alternates.</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link href="/support/contact" className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">Contact Support</Link>
              <Link href="/store-locator" className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">Store Locator</Link>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}

