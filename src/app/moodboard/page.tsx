import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="w-full max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">Design Your Space</h1>
            <p className="mt-3 text-gray-700">
              Create moodboards, explore combinations, and visualize products together. Start with our curated templates or build from scratch.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/moodboard/editor" className="px-5 py-2 rounded-full bg-gray-900 hover:bg-black text-white text-sm">Start Designing</Link>
              <Link href="/search" className="px-5 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-sm">Browse Products</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1200&q=80',
            ].map((u, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                <div className="aspect-[4/3] bg-gray-100 relative">
                  <Image src={u} alt="Moodboard preview" fill sizes="(max-width: 768px) 50vw, 300px" className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

