import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/atoms/Container';
import { articles } from '@/data/articles';

interface Params { params: { slug: string } }

export default function ArticlePage({ params }: Params) {
  const article = articles.find(a => a.slug === params.slug);
  if (!article) {
    return (
      <main className="min-h-screen bg-white">
        <Container className="py-16">
          <p className="text-center text-slate-600">Article not found.</p>
          <p className="text-center mt-4"><Link href="/media" className="text-blue-600">Back to Media</Link></p>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Container className="py-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-600"><Link href="/">Home</Link><span className="mx-2">/</span><Link href="/media">Media</Link><span className="mx-2">/</span><span className="text-slate-900">{article.title}</span></nav>

        <article className="mx-auto max-w-3xl">
          <div className="mb-2 flex items-center gap-3 text-xs text-slate-500"><span className="rounded-full bg-slate-900/10 px-2.5 py-1 font-semibold text-slate-700">{article.category}</span><span>{new Date(article.date).toLocaleDateString()}</span><span>•</span><span>{article.readMinutes} min read</span></div>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-slate-900">{article.title}</h1>
          <p className="mt-2 text-slate-700">{article.excerpt}</p>
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200">
            <Image src={article.image} alt={article.title} fill className="object-cover" />
          </div>
          <div className="prose prose-slate mt-6 max-w-none">
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-10"><Link href="/media" className="text-sm font-semibold text-blue-600">← Back to Media</Link></div>
        </article>
      </Container>
    </main>
  );
}

