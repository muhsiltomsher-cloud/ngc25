"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Container from '@/components/atoms/Container';

type QA = { q: string; a: string; linkLabel?: string; linkHref?: string };

const DATA: Record<string, (QA | { group: string; items: QA[] })[]> = {
  Wallpaper: [
    { q: 'Why do wallpapers come in varying widths? What’s the difference between a single roll and double roll?', a: 'A single roll and double roll are both one roll — the double roll is simply longer. Two single rolls equal one double roll in total area.' },
    { q: 'What is the best way to determine how many rolls I will need?', a: 'Use a roll calculator and consider pattern repeat and wastage. Our team can help validate your measurements.', linkLabel: 'Open roll calculator', linkHref: '/support/contact' },
    { q: 'What is a panoramic mural?', a: 'Panoramic murals are large‑format wall art used to wrap a wall for a dramatic effect (e.g., skylines, landscapes).' },
    { q: 'How many years does a wallpaper last?', a: 'With proper care, wallpapers generally last 5–10 years or more in residential settings.' },
    { q: 'Wallpaper is more expensive than paint. Why choose wallpaper?', a: 'Wallpaper often lasts longer than paint and offers richer textures and designs, balancing costs over time.' },
    { q: 'What does the batch number mean?', a: 'Wallpaper is made in batches with slight color variation. Always order from the same batch (lot) for perfect color matching.' },
    { q: 'What does pattern repeat mean?', a: 'Repeat is the distance before the pattern restarts. Complex repeats require more care and can affect required quantity.' },
    { q: 'What’s the difference between pre‑pasted and un‑pasted wallpaper?', a: 'Pre‑pasted has adhesive on the backing and suits DIY; un‑pasted is common for contract installs by professionals.' },
    { q: 'Do you need glue for pre‑pasted wallpaper?', a: 'Pre‑pasted has cured adhesive; extra paste can be added if needed. Use the correct adhesive for the substrate and type.' },
  ],
  Flooring: [
    { group: 'Carpet Tiles', items: [
      { q: 'What are carpet tiles?', a: 'Modular squares cut from broadloom carpet; easy to install, replace, and combine into patterns.' },
      { q: 'What adhesive should I use?', a: 'Use carpet‑tile specific adhesive. Avoid hard‑set adhesives to allow lifting and replacement.' },
      { q: 'Is it ok to install carpet tiles on top of original flooring?', a: 'We do not recommend installing directly on existing floors to avoid damage; prepare the subfloor properly.' },
      { q: 'How many tiles do I need?', a: 'We can calculate for you. Contact our team with your room dimensions and intended pattern.' },
      { q: 'How do you clean and maintain carpet tiles?', a: 'Routine vacuuming; consider steam cleaning for stains. Follow the cleaning and maintenance guide for your tile.' },
    ]},
    { group: 'Rugs', items: [
      { q: 'Best rugs for high‑traffic areas?', a: 'Wool for living/dining; cotton for casual spaces; synthetics for hallways, outdoors and heavier traffic.' },
      { q: 'Why is my wool rug shedding?', a: 'New wool rugs shed initially — do not pull fibers. Vacuum with the pile direction, not against it.' },
      { q: 'Best way to clean a rug?', a: 'Vacuum flat‑woven rugs with care. For long‑pile, use handheld vacuums or professional dry‑cleaning to minimize shedding.' },
      { q: 'Wool vs synthetic?', a: 'Wool is soft and naturally resilient indoors; synthetics are durable and often preferred for outdoor or utility areas.' },
    ]},
    { group: 'Vinyl Floors', items: [
      { q: 'Can I put heavy appliances on vinyl?', a: 'Use non‑staining floor protectors under legs; avoid certain rubber feet which can stain the surface.' },
      { q: 'How do I clean vinyl floors?', a: 'Wash with mild soap and water; follow the brand maintenance guide for best results.' },
    ]},
  ],
  Fabric: [
    { q: 'What fabric types can I choose for my home?', a: 'Blinds: cotton, linen. Cushions: cotton, linen, velvet. Drapery: linen. Upholstery: cotton, linen, rayon, nylon — choose by use‑case and durability.' },
    { q: 'Can your fabrics be machine‑washed?', a: 'Depends on the material. Cotton and synthetics are often machine‑washable (cotton may shrink). Some velvets are washable, others are not. Always follow care labels.' },
  ],
  'Customer Support': [
    { q: 'How can I obtain a sample of your wallpaper or fabric?', a: 'Use “Order Sample” on the product page or contact us by phone/email.', linkLabel: 'Request sample', linkHref: '/support/contact' },
    { q: 'Do you have a catalog?', a: 'Yes — browse the website catalog or request a sample book with physical swatches.' },
    { q: 'What is a playbook?', a: 'A collection overview with brand story, inspiration, and roomsets, plus sales support contacts.' },
    { q: 'How do I request technical specifications?', a: 'Use the “Request Quote” drawer or contact us to receive full technical sheets.', linkLabel: 'Request specs', linkHref: '/support/contact' },
    { q: 'Can I check stock and pricing on the website?', a: 'Stock is available online for many items; pricing is available upon request through our catalog workflow.' },
    { q: 'What is Quickship?', a: '24‑hour delivery program for in‑stock wallpaper and carpet tiles from select brands.' },
    { q: 'Can I purchase discontinued products?', a: 'Discontinued products are not in stock and unavailable for sale.' },
  ],
};

export default function FAQPage() {
  const categories = Object.keys(DATA);
  const [active, setActive] = useState<string>(categories[0]);
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  // Support deep-linking via hash (#fabric, #flooring, etc.)
  useEffect(() => {
    const h = (typeof window !== 'undefined' && window.location.hash.slice(1)) || '';
    const found = categories.find(c => c.toLowerCase().replace(/\s+/g,'-') === h.toLowerCase());
    if (found) setActive(found);
  }, []);

  const items = useMemo(() => {
    const raw = DATA[active] || [];
    const q = query.trim().toLowerCase();
    if (!q) return raw;
    // Filter by question text (and group title if present)
    return raw.map((row) => {
      if ('group' in (row as any)) {
        const r = row as { group: string; items: QA[] };
        const filtered = r.items.filter(it => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q));
        return filtered.length ? { ...r, items: filtered } : null;
      }
      const it = row as QA;
      return (it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q)) ? it : null;
    }).filter(Boolean) as (QA | { group: string; items: QA[] })[];
  }, [active, query]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Container className="py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">FAQ</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-serif font-medium text-gray-900">Frequently Asked Questions</h1>
          <p className="mt-2 text-gray-600">Find quick answers by category, or search below.</p>
        </div>

        {/* Category tabs */}
        <div className="mx-auto mb-6 flex max-w-4xl flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setActive(c); setOpenId(null); }}
              className={`rounded-full border px-4 py-2 text-sm focus:outline-none transition-colors ${active===c ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mx-auto mb-8 max-w-2xl">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search answers (e.g., pattern repeat, sample, adhesive)"
            className="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm focus:outline-none"
          />
        </div>

        {/* Panels */}
        <div className="mx-auto max-w-4xl space-y-6">
          {items.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">No results. Try adjusting your keywords.</div>
          )}
          {items.map((row, idx) => {
            if ('group' in (row as any)) {
              const r = row as { group: string; items: QA[] };
              if (!r.items.length) return null;
              return (
                <section key={`${r.group}-${idx}`} className="rounded-2xl border border-slate-200 bg-white p-1 shadow-xl shadow-slate-900/5">
                  <h2 className="px-4 py-3 text-sm font-semibold uppercase tracking-wide text-slate-600">{r.group}</h2>
                  <div className="divide-y divide-slate-200">
                    {r.items.map((it, i) => {
                      const id = `${r.group}-${i}-${it.q}`;
                      const open = openId === id;
                      return (
                        <button
                          key={id}
                          onClick={() => setOpenId(open ? null : id)}
                          className="w-full text-left px-4 py-4 focus:outline-none"
                          aria-expanded={open}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-base font-semibold text-slate-900">{it.q}</h3>
                            <span className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border text-sm ${open?'bg-slate-900 text-white':'border-slate-300 text-slate-600'}`}>{open?'–':'+'}</span>
                          </div>
                          <div className={`overflow-hidden text-sm text-slate-600 transition-all ${open?'mt-2 max-h-96':'max-h-0'}`}>
                            <p className="pr-2 leading-relaxed">{it.a}</p>
                            {it.linkHref && (
                              <Link href={it.linkHref} className="mt-2 inline-block text-xs font-semibold text-blue-600 hover:text-blue-700 focus:outline-none">{it.linkLabel ?? 'Learn more'} →</Link>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            }
            const it = row as QA;
            const id = `${active}-${idx}-${it.q}`;
            const open = openId === id;
            return (
              <button
                key={id}
                onClick={() => setOpenId(open ? null : id)}
                className="w-full text-left rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 focus:outline-none"
                aria-expanded={open}
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-base font-semibold text-slate-900">{it.q}</h2>
                  <span className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border text-sm ${open?'bg-slate-900 text-white':'border-slate-300 text-slate-600'}`}>{open?'–':'+'}</span>
                </div>
                <div className={`overflow-hidden text-sm text-slate-600 transition-all ${open?'mt-2 max-h-96':'max-h-0'}`}>
                  <p className="leading-relaxed">{it.a}</p>
                  {it.linkHref && (
                    <Link href={it.linkHref} className="mt-2 inline-block text-xs font-semibold text-blue-600 hover:text-blue-700 focus:outline-none">{it.linkLabel ?? 'Learn more'} →</Link>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Help CTA */}
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 text-center shadow">
          <p className="text-sm text-slate-600">Still can’t find what you’re looking for?</p>
          <Link href="/support/contact" className="mt-2 inline-block rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 focus:outline-none">Contact Support</Link>
        </div>
      </Container>
    </main>
  );
}
