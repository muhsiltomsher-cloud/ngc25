"use client";

import { useMemo, useState } from 'react';
import Container from '@/components/atoms/Container';

type TabKey = 'all' | 'makeover' | 'voucher' | 'install';

export default function TermsPage() {
  const [tab, setTab] = useState<TabKey>('all');
  const tabs: { key: TabKey; label: string }[] = useMemo(() => ([
    { key: 'all', label: 'All' },
    { key: 'makeover', label: 'Luxury Makeover' },
    { key: 'voucher', label: '30% Voucher' },
    { key: 'install', label: 'Free Installations' },
  ]), []);

  const show = (k: TabKey) => tab === 'all' || tab === k;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-rose-100/70 to-pink-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-sky-100/70 to-indigo-100/40 blur-3xl" />
        <Container className="py-12">
          <header className="text-center">
            <span className="inline-block rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">Terms & Conditions</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif font-medium text-gray-900">Promotional & Installation Terms</h1>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">Please review the following conditions before scheduling works or redeeming offers.</p>
          </header>
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                aria-pressed={tab===t.key}
                className={`rounded-full border px-4 py-2 text-sm focus:outline-none ${tab===t.key? 'bg-slate-900 text-white border-slate-900':'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'}`}
              >
                {t.label}
              </button>
            ))}
            <a
              href="#"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none"
            >
              Download PDF
            </a>
          </div>
        </Container>
      </section>

      <Container className="pb-12">
        {/* Highlight notice */}
        <div className="mx-auto mb-6 max-w-5xl rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <div className="flex items-start gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 text-amber-700"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
            <p>Installation can only commence when site readiness requirements are met. If written instruction is given to proceed regardless, workmanship and warranty responsibilities are waived as noted below.</p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Luxury Room Makeover */}
          {show('makeover') && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700">LR</span>
                <h2 className="text-xl font-semibold text-slate-900">Luxury Room Makeover</h2>
              </div>
              <p className="mt-2 text-sm text-slate-600">Applicable to giveaway winner. Conditions below apply.</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                <li>Valid for an area up to <strong>30&nbsp;m²</strong>. If the area exceeds this, the winner shall bear the extra cost of materials and installation.</li>
                <li>Wall undulations and cracks must be rectified before installation.</li>
                <li>All corner terminations must be straight and clean (including above skirting) for proper wallpaper termination.</li>
                <li>Walls must be ready to receive wallpaper with <strong>two coats of stucco</strong> and <strong>two coats of primer</strong>, fully dried.</li>
                <li>All surrounding painting and contracting works must be fully completed before installation.</li>
                <li>All joint tape and stucco/drywall compound works (by others) must be completed and fully dry.</li>
                <li>Ambient temperature should be approximately <strong>22–24 °C</strong> prior to installation.</li>
                <li>Site must be ready: no major works (painting, sanding, joinery, MEP) in the installation area.</li>
                <li>Each area must be completely free from dust and debris; switch sockets to be loose for neat finishing.</li>
                <li>If site conditions do not meet the above and written instruction is given to proceed, <strong>NGC waives all responsibility</strong> including (but not limited to) wallpaper damages, warranties and workmanship.</li>
                <li>Total giveaway value not exceeding <strong>AED&nbsp;5,000</strong>.</li>
              </ul>
            </section>
          )}

          {/* 30% Discount Vouchers */}
          {show('voucher') && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-700">30%</span>
                <h2 className="text-xl font-semibold text-slate-900">30% Discount Vouchers</h2>
              </div>
              <p className="mt-2 text-sm text-slate-600">Voucher terms for in‑stock selections.</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                <li><strong>30% discount</strong> is valid on the <strong>Instock</strong> collection of wallpapers only.</li>
                <li>Installation charges are <strong>excluded</strong> from the discount.</li>
                <li>The winner may visit our showroom to select eligible in‑stock wallcoverings.</li>
              </ul>
            </section>
          )}

          {/* Free Installations */}
          {show('install') && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700">FI</span>
                <h2 className="text-xl font-semibold text-slate-900">Free Installations</h2>
              </div>
              <p className="mt-2 text-sm text-slate-600">Conditions for complimentary installation eligibility.</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                <li>Wallpaper must be procured by the winner from <strong>NGC Nafees</strong> wallpaper collections.</li>
                <li>Wall undulations and cracks must be rectified before installation.</li>
                <li>All corner terminations must be straight and clean (including above skirting).</li>
                <li>Walls must be ready with <strong>two coats of stucco</strong> and <strong>two coats of primer</strong>, fully dried.</li>
                <li>All surrounding painting and contracting works must be fully completed.</li>
                <li>All joint tape and stucco/drywall compound works (by others) must be completed and fully dry.</li>
                <li>Ambient temperature should be approximately <strong>22–24 °C</strong> prior to installation.</li>
                <li>Site must be ready: no major works (painting, sanding, joinery, MEP) in the installation area.</li>
                <li>Areas must be free from dust and debris; switch sockets to be loose.</li>
                <li>If site conditions do not meet the above and written instruction is given to proceed, <strong>NGC waives all responsibility</strong> including (but not limited to) wallpaper damages, warranties and workmanship. Installation shall not commence without written instruction.</li>
              </ul>
            </section>
          )}
        </div>

        {/* Footer note */}
        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm text-slate-600 shadow">
          These terms may be updated without prior notice. For clarifications, please contact <a href="mailto:connect@ngcmiddleeast.com" className="font-semibold text-blue-600">connect@ngcmiddleeast.com</a>.
        </div>
      </Container>
    </main>
  );
}
