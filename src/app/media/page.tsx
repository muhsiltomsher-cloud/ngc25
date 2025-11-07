"use client";

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/atoms/Container';
import { articles } from '@/data/articles';

const categories = ['All', 'News', 'Case Study', 'Guide', 'Press'] as const;

export default function MediaPage() {
  const [active, setActive] = useState<(typeof categories)[number]>('All');
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    let data = articles.slice().sort((a,b)=> new Date(b.date).getTime()-new Date(a.date).getTime());
    if (active !== 'All') data = data.filter(a => a.category === active);
    const query = q.trim().toLowerCase();
    if (query) data = data.filter(a => (a.title + ' ' + a.excerpt).toLowerCase().includes(query));
    return data;
  }, [active, q]);

  const hero = list[0];
  const rest = list.slice(1);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Container className="py-12">
        <div className="mb-6 text-center">
          <span className="inline-block rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">Media</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-serif font-medium text-gray-900">Articles & Press</h1>
          <p className="mt-2 text-gray-600">Guides, case studies and announcements from NGC.</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {categories.map(c => (
            <button key={c} onClick={()=>setActive(c)} className={`rounded-full border px-4 py-2 text-sm focus:outline-none ${active===c?'bg-slate-900 text-white border-slate-900':'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'}`}>{c}</button>
          ))}
        </div>

        {/* Search */}
        <div className="mx-auto mb-8 max-w-2xl">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search articles (e.g., carpet tiles, acoustic)" className="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm focus:outline-none" />
        </div>

        {/* Hero card */}
        {hero && (
          <Link href={`/media/${hero.slug}`} className="mb-10 block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 focus:outline-none">
            <div className="relative aspect-[5/2]">
              <Image src={hero.image} alt={hero.title} fill className="object-cover" />
            </div>
            <div className="p-6 md:p-8">
              <div className="mb-2 flex items-center gap-3 text-xs text-slate-500">
                <span className="rounded-full bg-slate-900/10 px-2.5 py-1 font-semibold text-slate-700">{hero.category}</span>
                <span>{new Date(hero.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{hero.readMinutes} min read</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-slate-900">{hero.title}</h2>
              <p className="mt-2 text-slate-700">{hero.excerpt}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-blue-600">Read article →</span>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(a => (
            <Link key={a.slug} href={`/media/${a.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm focus:outline-none">
              <div className="relative aspect-[4/3]">
                <Image src={a.image} alt={a.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <div className="mb-1 flex items-center gap-2 text-[11px] text-slate-500"><span className="rounded-full bg-slate-900/10 px-2 py-0.5 font-semibold text-slate-700">{a.category}</span><span>{new Date(a.date).toLocaleDateString()}</span><span>•</span><span>{a.readMinutes} min</span></div>
                <h3 className="text-base font-semibold text-slate-900">{a.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{a.excerpt}</p>
                <span className="mt-2 inline-block text-xs font-semibold text-blue-600">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
