import Link from 'next/link';
import Container from '@/components/atoms/Container';
import { allProducts } from '@/data/productsData';

export default function CatalogIndexPage() {
  const categories = Array.from(
    allProducts.reduce((map, p) => {
      const key = p.category || 'Uncategorized';
      map.set(key, (map.get(key) || 0) + 1);
      return map;
    }, new Map<string, number>())
  ).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <main className="min-h-screen bg-white">
      <Container className="py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
          <Link href="/">Home</Link>
          <span className="mx-2" aria-hidden>/</span>
          <span className="text-gray-900">Catalog</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">Catalog</h1>
        <p className="mt-2 text-gray-600">Browse categories to explore subcategories and products.</p>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {categories.map(([name, count]) => (
            <li key={name} className="rounded-2xl border border-gray-200 p-6 hover:bg-gray-50 transition-colors">
              <Link href={`/catalog/${encodeURIComponent(name)}`} className="block focus:outline-none">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
                  <span className="text-xs text-gray-500" aria-label={`${count} products`}>{count}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">Explore subcategories and featured products.</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}

