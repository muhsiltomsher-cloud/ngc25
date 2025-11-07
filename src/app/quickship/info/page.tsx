"use client";

import Link from 'next/link';
import Container from '@/components/atoms/Container';

export default function QuickshipInfoPage() {
  const FEATURES = [
    {
      title: '24‑Hour Dispatch',
      desc: 'Eligible in‑stock SKUs ship within 24 hours across the UAE so weekend refreshes are possible.',
    },
    {
      title: 'Contract‑Grade',
      desc: 'Type II wallcoverings and carpet tiles selected for durability, easy care and rapid install.',
    },
    {
      title: 'Design Support',
      desc: 'Need help choosing patterns? Our team can propose palettes that work together—fast.',
    },
  ];

  const STEPS = [
    { k: '01', t: 'Browse Eligible SKUs', d: 'Look for Instock icons on product pages or ask our team.' },
    { k: '02', t: 'Place Quickship Order', d: 'Submit details and delivery timing using the order form.' },
    { k: '03', t: 'Ship within 24 Hours', d: 'We pick, pack and dispatch for rapid delivery and installation.' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-rose-100/60 to-pink-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-sky-100/60 to-indigo-100/40 blur-3xl" />
        <Container className="py-14">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">Quickship</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif font-medium text-gray-900">24‑Hour Delivery Program</h1>
            <p className="mt-3 text-gray-600">In‑stock wallcoverings and carpet tiles—picked, packed and dispatched within 24 hours across the UAE.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/quickship/order" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 focus:outline-none">Start Quickship Order</Link>
              <Link href="/store-locator" className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">Store Locator</Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section>
        <Container className="pb-6">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl shadow-slate-900/5">
                <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Steps */}
      <section>
        <Container className="pb-12">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
            <h2 className="mb-4 text-center text-xl font-semibold text-slate-900">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.k} className="rounded-xl bg-slate-50 p-4">
                  <div className="text-xl font-semibold text-slate-700">{s.k}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{s.t}</div>
                  <div className="text-xs text-slate-600">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Terms CTA */}
      <section className="pb-16">
        <Container>
          <div className="mx-auto max-w-4xl rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center text-sm text-amber-800">
            Availability depends on location and inventory. For multi‑site projects or special handling, contact our team.
          </div>
        </Container>
      </section>
    </main>
  );
}

