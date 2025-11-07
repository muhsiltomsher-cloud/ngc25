import Link from 'next/link';
import Container from '@/components/atoms/Container';
import { allProducts } from '@/data/productsData';

interface Params { params: { category: string } }

export default function CatalogCategoryPage({ params }: Params) {
  const category = decodeURIComponent(params.category);
  const products = allProducts.filter(p => (p.category || 'Uncategorized') === category);
  const subcats = Array.from(new Set(products.map(p => p.subCategory || 'General'))).sort();

  return (
    <main className="min-h-screen bg-white">
      <Container className="py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
          <Link href="/">Home</Link>
          <span className="mx-2" aria-hidden>/</span>
          <Link href="/catalog">Catalog</Link>
          <span className="mx-2" aria-hidden>/</span>
          <span className="text-gray-900">{category}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">{category}</h1>
        <p className="mt-2 text-gray-600">Choose a subcategory to explore products.</p>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {subcats.map((s) => (
            <li key={s} className="rounded-2xl border border-gray-200 p-6 hover:bg-gray-50 transition-colors">
              <Link href={`/catalog/${encodeURIComponent(category)}/${encodeURIComponent(s)}`} className="block focus:outline-none">
                <h2 className="text-lg font-semibold text-gray-900">{s}</h2>
                <p className="mt-2 text-sm text-gray-600">View all products in this subcategory.</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}

