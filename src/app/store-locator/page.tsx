"use client";

import { useMemo, useState } from 'react';
import Container from '@/components/atoms/Container';

type Store = { id: string; name: string; city: string; address: string; phone: string; lat: number; lng: number };

const STORES: Store[] = [
  { id: 'dubai-1', name: 'NGC Dubai Showroom', city: 'Dubai', address: 'Sheikh Zayed Rd, Dubai', phone: '055-2000794', lat: 25.2048, lng: 55.2708 },
  { id: 'abudhabi-1', name: 'NGC Abu Dhabi', city: 'Abu Dhabi', address: 'Corniche Rd, Abu Dhabi', phone: '055-2000794', lat: 24.4539, lng: 54.3773 },
  { id: 'sharjah-1', name: 'NGC Sharjah', city: 'Sharjah', address: 'King Faisal St, Sharjah', phone: '055-2000794', lat: 25.3463, lng: 55.4209 },
];

export default function StoreLocatorPage() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>(STORES[0]?.id ?? '');
  const cities = useMemo(() => Array.from(new Set(STORES.map(s => s.city))), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STORES;
    return STORES.filter(s => `${s.name} ${s.city} ${s.address}`.toLowerCase().includes(q));
  }, [query]);
  const selected = useMemo(() => STORES.find(s => s.id === selectedId) ?? STORES[0], [selectedId]);

  const mapSrc = selected
    ? `https://www.google.com/maps?q=${selected.lat},${selected.lng}&z=14&output=embed`
    : 'https://www.google.com/maps?q=United%20Arab%20Emirates&z=7&output=embed';

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-rose-100/70 to-pink-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-sky-100/70 to-indigo-100/40 blur-3xl" />
        <Container className="py-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">Visit Us</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif font-medium text-gray-900">Store Locator</h1>
            <p className="mt-3 text-gray-600">Find our nearest showroom or representative. Book a visit to explore materials in person.</p>
          </div>
          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2">
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => setQuery(c)}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none"
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mx-auto mt-4 max-w-2xl">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city or address"
              className="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm focus:outline-none"
            />
          </div>
        </Container>
      </section>

      <Container className="pb-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* List */}
          <div className="space-y-4">
            {filtered.map((s) => {
              const active = s.id === selectedId;
              return (
                <div key={s.id} className={`rounded-2xl border p-4 shadow-sm transition-all ${active ? 'border-slate-900 bg-white shadow' : 'border-slate-200 bg-white hover:shadow-md'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">{s.name}</h2>
                      <p className="text-sm text-slate-600">{s.address}</p>
                      <p className="text-sm text-slate-600">{s.city}</p>
                      <p className="text-sm text-slate-600">TEL: <a href={`tel:${s.phone.replace(/\D/g,'')}`} className="underline">{s.phone}</a></p>
                    </div>
                    <button
                      onClick={() => setSelectedId(s.id)}
                      className={`h-8 shrink-0 rounded-full px-3 text-xs font-semibold focus:outline-none ${active ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
                    >
                      {active ? 'Selected' : 'View on Map'}
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={`https://www.google.com/maps?q=${s.lat},${s.lng}`}
                      target="_blank"
                      className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none"
                    >
                      Directions
                    </a>
                    <button
                      onClick={() => navigator.clipboard?.writeText(`${s.name}, ${s.address}, ${s.city}`)}
                      className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none"
                    >
                      Copy Address
                    </button>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">No locations found. Try another city.</div>
            )}
          </div>

          {/* Map */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/5">
            <iframe key={selected?.id} title="NGC Stores Map" className="h-[560px] w-full rounded-2xl" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={mapSrc}></iframe>
          </div>
        </div>

        {/* Help CTA */}
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 text-center shadow">
          <p className="text-sm text-slate-600">Need help booking a visit or finding the right collection?</p>
          <a href="/support/contact" className="mt-2 inline-block rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 focus:outline-none">Contact Support</a>
        </div>
      </Container>
    </main>
  );
}
