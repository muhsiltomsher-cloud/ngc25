import Link from 'next/link';
import Container from '@/components/atoms/Container';

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-100/70 to-teal-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-sky-100/70 to-lime-100/40 blur-3xl" />
        <Container className="py-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">Sustainability</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif font-medium text-gray-900">Better by Nature</h1>
            <p className="mt-3 text-gray-600">We partner with responsible mills and factories to bring durable, low‑impact materials to hospitality, workplace and residential projects across the region.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/support/contact" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 focus:outline-none">Talk to our team</Link>
              <Link href="/media" className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">Read articles</Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section>
        <Container className="pb-4">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-center sm:grid-cols-4">
            {[
              { k: 'Recycled', v: 'Up to 60%' },
              { k: 'Low‑VOC', v: 'Cert. E0/E1' },
              { k: 'Take‑Back', v: 'Available' },
              { k: 'Longevity', v: '5–10+ yrs' },
            ].map((s) => (
              <div key={s.k} className="rounded-xl bg-white py-4 shadow-sm">
                <div className="text-xl font-semibold text-emerald-700">{s.v}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">{s.k}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section>
        <Container className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
              <div className="mb-2 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">MC</span>
                <h2 className="text-xl font-semibold text-slate-900">Materials & Certifications</h2>
              </div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                <li>Recycled textile wallcoverings and carpet tiles with low‑VOC formulations.</li>
                <li>Options to meet E0/E1, and third‑party testing for flame and emissions.</li>
                <li>Phthalate‑free vinyl and PVC‑free programs where performance allows.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
              <div className="mb-2 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-teal-700">RM</span>
                <h2 className="text-xl font-semibold text-slate-900">Responsible Manufacturing</h2>
              </div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                <li>Partner mills audited for energy, water stewardship and fair labor.</li>
                <li>Digital printing to minimize waste and enable on‑demand production.</li>
                <li>Durable finishes that extend lifecycle and reduce replacement frequency.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
              <div className="mb-2 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-lime-100 text-lime-700">TB</span>
                <h2 className="text-xl font-semibold text-slate-900">Take‑Back & Recycling</h2>
              </div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                <li>Project‑based take‑back programs available on select product lines.</li>
                <li>Guidance on sorting, roll handling and transport to reduce site waste.</li>
                <li>Spec support to align with environmental goals and rating systems.</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Callout */}
      <section className="pb-12">
        <Container>
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 text-center shadow">
            <p className="text-sm text-slate-600">Need EPDs, certificates or recycled content documentation?</p>
            <Link href="/support/contact" className="mt-2 inline-block rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 focus:outline-none">Request documentation</Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

