"use client";

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/atoms/Container';
import { articles } from '@/data/articles';

export default function SupportNewsPage() {
  const news = articles
    .filter((a) => a.category === 'News' || a.category === 'Press')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const hero = news[0];
  const rest = news.slice(1);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-rose-100/60 to-pink-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-sky-100/60 to-indigo-100/40 blur-3xl" />
        <Container className="py-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">Support</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif font-medium text-gray-900">News & Press</h1>
            <p className="mt-3 text-gray-600">Latest updates from NGC, including product news and collaborations.</p>
          </div>
        </Container>
      </section>

      <Container className="pb-12">
        {hero && (
          <Link href={`/media/${hero.slug}`} className="mb-10 block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 focus:outline-none">
            <div className="relative aspect-[5/2]">
              <Image src={hero.image} alt={hero.title} fill className="object-cover" />
            </div>
            <div className="p-6 md:p-8">
              <div className="mb-2 flex items-center gap-3 text-xs text-slate-500">
                <span className="rounded-full bg-slate-900/10 px-2.5 py-1 font-semibold text-slate-700">{hero.category}</span>
                <span>{new Date(hero.date).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-slate-900">{hero.title}</h2>
              <p className="mt-2 text-slate-700">{hero.excerpt}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-blue-600">Read more →</span>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <Link key={a.slug} href={`/media/${a.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm focus:outline-none">
              <div className="relative aspect-[4/3]">
                <Image src={a.image} alt={a.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <div className="mb-1 flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="rounded-full bg-slate-900/10 px-2 py-0.5 font-semibold text-slate-700">{a.category}</span>
                  <span>{new Date(a.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900">{a.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{a.excerpt}</p>
                <span className="mt-2 inline-block text-xs font-semibold text-blue-600">Read more →</span>
              </div>
            </Link>
          ))}
          {rest.length === 0 && !hero && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">No news yet. Please check back soon.</div>
          )}
        </div>
      </Container>
    </main>
  );
}

