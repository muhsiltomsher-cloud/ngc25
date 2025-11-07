import Link from 'next/link';
import Image from 'next/image';
import { allProducts } from '../../data/productsData';
import ProductContrastFab from '@/components/atoms/ProductContrastFab';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ProductContrastFab />
      <section className="w-full max-w-[1100px] mx-auto px-4 py-10">
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Products</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((p) => (
            <Link href={`/product/${p.id}`} key={p.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm">
              <div className="aspect-[4/3] bg-gray-100 relative">
                <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 50vw, 300px" className="object-cover" />
              </div>
              <div className="p-3">
                <div className="text-sm font-medium text-gray-900 line-clamp-2">{p.name}</div>
                <div className="text-xs text-gray-600">{p.category}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
