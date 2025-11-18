"use client";

import { useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/atoms/Container';

function decodePayload(raw: string | null) {
  if (!raw) return null as any;
  try {
    const json = atob(decodeURIComponent(raw));
    return JSON.parse(json);
  } catch {
    return null as any;
  }
}

function ThankYouContent() {
  const params = useSearchParams();
  const router = useRouter();
  const type = params?.get('type') ?? 'quote';
  const data = useMemo(() => decodePayload((params && params.get('payload')) ?? null), [params]);

  const onDownload = () => {
    const blob = new Blob([JSON.stringify({ type, ...data }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ngc-${type}-receipt-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const onPrint = () => {
    window.print();
  };

  const productLink = data?.product?.id ? `/product/${data.product.id}` : '/catalog';

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-rose-100/70 to-pink-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-sky-100/70 to-indigo-100/40 blur-3xl" />
        <Container className="py-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">Thank you</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif font-medium text-gray-900">Your {type === 'sample' ? 'Sample Order' : type === 'quickship' ? 'Quickship Order' : 'Quote Request'} Was Received</h1>
            <p className="mt-3 text-gray-600">We’ll review your request and get back to you within 1 business day.</p>
          </div>
        </Container>
      </section>

      <Container className="pb-12">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
          <h2 className="text-lg font-semibold text-slate-900">Summary</h2>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">Product</div>
              <div className="text-sm font-semibold text-slate-900">{data?.product?.name ?? '—'}</div>
              <div className="text-xs text-slate-500">SKU: {data?.product?.sku ?? '—'}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">Request</div>
              <div className="text-sm font-semibold text-slate-900">{type === 'sample' ? 'Order Sample' : type === 'quickship' ? 'Quickship Order' : 'Request Quote'}</div>
              <div className="text-xs text-slate-500">Submitted: {data?.submittedAt ? new Date(data.submittedAt).toLocaleString() : '—'}</div>
            </div>
          </div>
          <div className="mt-4 overflow-auto rounded-xl border border-slate-200">
            <pre className="m-0 whitespace-pre-wrap p-4 text-xs text-slate-700">{JSON.stringify(data?.fields ?? {}, null, 2)}</pre>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button onClick={onDownload} className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 focus:outline-none">Download JSON</button>
            <button onClick={onPrint} className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">Print</button>
            <Link href="/support/contact" className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">New Request</Link>
            <Link href={productLink} className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">Back to Product</Link>
            <Link href="/store-locator" className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">Store Locator</Link>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <Container className="py-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-pulse">
              <div className="h-6 w-32 bg-slate-200 rounded-full mx-auto mb-4"></div>
              <div className="h-12 w-96 bg-slate-200 rounded mx-auto mb-3"></div>
              <div className="h-4 w-64 bg-slate-200 rounded mx-auto"></div>
            </div>
          </div>
        </Container>
      </main>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
