"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Container from '@/components/atoms/Container';

type Rep = {
  id: string;
  name: string;
  region: string; // e.g., Dubai, Abu Dhabi, Sharjah, Northern Emirates
  email: string;
  phone: string;
  specialties: string[];
};

const REPS: Rep[] = [
  {
    id: 'rep-dubai-1',
    name: 'Aisha Khan',
    region: 'Dubai',
    email: 'aisha.khan@ngcmiddleeast.com',
    phone: '+971 55 200 0794',
    specialties: ['Hospitality', 'Workplace', 'Wallcoverings'],
  },
  {
    id: 'rep-abu-1',
    name: 'Omar Faris',
    region: 'Abu Dhabi',
    email: 'omar.faris@ngcmiddleeast.com',
    phone: '+971 55 200 0794',
    specialties: ['Healthcare', 'Education', 'Flooring'],
  },
  {
    id: 'rep-shj-1',
    name: 'Sara Al Mansoori',
    region: 'Sharjah',
    email: 'sara.mansoori@ngcmiddleeast.com',
    phone: '+971 55 200 0794',
    specialties: ['Residential', 'Fabrics', 'Custom Rugs'],
  },
  {
    id: 'rep-ne-1',
    name: 'Hassan Ali',
    region: 'Northern Emirates',
    email: 'hassan.ali@ngcmiddleeast.com',
    phone: '+971 55 200 0794',
    specialties: ['Retail', 'Mixed Use', 'Acoustic Solutions'],
  },
];

const REGIONS = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Northern Emirates'] as const;

export default function FindYourRepPage() {
  const [activeRegion, setActiveRegion] = useState<string>('Dubai');
  const [q, setQ] = useState('');

  const reps = useMemo(() => {
    const regionFiltered = REPS.filter((r) => r.region === activeRegion);
    const query = q.trim().toLowerCase();
    if (!query) return regionFiltered;
    return regionFiltered.filter((r) =>
      (r.name + ' ' + r.region + ' ' + r.specialties.join(' ')).toLowerCase().includes(query)
    );
  }, [activeRegion, q]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-rose-100/70 to-pink-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-sky-100/70 to-indigo-100/40 blur-3xl" />
        <Container className="py-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">Support</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif font-medium text-gray-900">Find Your Representative</h1>
            <p className="mt-3 text-gray-600">We’ll connect you to the right expert for your project and region.</p>
          </div>
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                aria-pressed={activeRegion === r}
                className={`rounded-full border px-4 py-2 text-sm focus:outline-none ${
                  activeRegion === r
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="mx-auto mt-4 max-w-2xl">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by rep name or specialty (e.g., Acoustic, Rugs)"
              className="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm focus:outline-none"
            />
          </div>
        </Container>
      </section>

      <Container className="pb-12">
        {/* Rep cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
          {reps.map((r) => (
            <div key={r.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{r.name}</h2>
                  <p className="text-sm text-slate-600">{r.region}</p>
                </div>
                <span className="rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold text-slate-700">Representative</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {r.specialties.map((s) => (
                  <span key={s} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a href={`mailto:${r.email}`} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">
                  Email
                </a>
                <a href={`tel:${r.phone.replace(/\D/g, '')}`} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">
                  Call
                </a>
                <Link href="/support/contact" className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-slate-800 focus:outline-none">
                  Start a Project
                </Link>
              </div>
            </div>
          ))}
          {reps.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">No representatives found. Try another region or search term.</div>
          )}
        </div>

        {/* Secondary actions */}
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 text-center shadow">
          <p className="text-sm text-slate-600">Prefer visiting us in person or need assistance choosing materials?</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link href="/store-locator" className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">Store Locator</Link>
            <Link href="/support/contact" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 focus:outline-none">Contact Support</Link>
          </div>
        </div>
      </Container>
    </main>
  );
}

