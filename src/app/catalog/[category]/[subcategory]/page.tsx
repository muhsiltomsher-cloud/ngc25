import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/atoms/Container';
import { allProducts } from '@/data/productsData';

interface Params { params: { category: string; subcategory: string } }

export default function CatalogSubcategoryPage({ params }: Params) {
  const category = decodeURIComponent(params.category);
  const subcategory = decodeURIComponent(params.subcategory);
  const products = allProducts.filter(p => (p.category || 'Uncategorized') === category && (p.subCategory || 'General') === subcategory);

  return (
    <main className="min-h-screen bg-white">
      <Container className="py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
          <Link href="/">Home</Link>
          <span className="mx-2" aria-hidden>/</span>
          <Link href="/catalog">Catalog</Link>
          <span className="mx-2" aria-hidden>/</span>
          <Link href={`/catalog/${encodeURIComponent(category)}`}>{category}</Link>
          <span className="mx-2" aria-hidden>/</span>
          <span className="text-gray-900">{subcategory}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">{subcategory}</h1>
        <p className="mt-2 text-gray-600">Showing {products.length} products</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm focus:outline-none">
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width:768px) 50vw, 300px" />
              </div>
              <div className="p-3">
                <div className="text-sm font-medium text-gray-900 line-clamp-2">{p.name}</div>
                <div className="text-xs text-gray-600">{p.brandKey}</div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}

