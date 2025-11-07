"use client";

import { useRef, useState } from 'react';
import Container from '@/components/atoms/Container';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import { allBrandsData } from '@/data/brands';

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    const fd = new FormData(formRef.current!);
    const payload = Object.fromEntries(fd.entries());
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      setStatus('sent');
      formRef.current?.reset();
      setTimeout(() => setStatus('idle'), 1500);
    } catch (e) {
      setStatus('error');
    }
  };

  const logos = Array.from(new Set(allBrandsData.map(b => b.logo))).slice(0, 12);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-rose-100/70 to-pink-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-sky-100/70 to-indigo-100/40 blur-3xl" />
        <Container className="py-14">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-slate-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">Let’s Talk</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif font-medium text-gray-900">Start Your Project With NGC</h1>
            <p className="mt-3 text-gray-600">Tell us about your space, and we’ll help with samples, specs, and lead times. Response within 1 business day.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/store-locator" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">Store Locator</Link>
              <a href="tel:0552000794" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">Call: 055‑2000794</a>
              <a href="mailto:connect@ngcmiddleeast.com" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none">Email: connect@ngcmiddleeast.com</a>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-6">
        {/* Contact grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
            <form ref={formRef} onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Name</label>
                <input name="name" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Company</label>
                <input name="company" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Email</label>
                <input type="email" name="email" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Phone</label>
                <input type="tel" name="phone" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Subject</label>
                <input name="subject" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">Message</label>
                <textarea name="message" rows={6} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none" placeholder="Tell us about your project" />
              </div>
              <div className="sm:col-span-2 flex items-center justify-between">
                <p className="text-xs text-slate-500">By submitting, you agree to our Terms and privacy policy.</p>
                <button disabled={status==='sending'} className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 disabled:opacity-60 focus:outline-none">
                  {status==='sending' ? 'Sending…' : status==='sent' ? 'Sent' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
          {/* Sidebar */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
            <h2 className="text-lg font-semibold text-slate-900">Head Office</h2>
            <p className="mt-2 text-sm text-slate-600">Dubai, United Arab Emirates</p>
            <p className="text-sm text-slate-600">TEL: 055-2000794</p>
            <p className="text-sm text-slate-600">EMAIL: connect@ngcmiddleeast.com</p>
            <div className="mt-4 h-40 w-full overflow-hidden rounded-lg border border-slate-200">
              <iframe title="NGC Map" className="h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Dubai&z=11&output=embed"></iframe>
            </div>
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">Visit a Showroom</h3>
              <p className="mt-1 text-xs text-slate-600">Find your nearest location and plan a visit.</p>
              <Link href="/store-locator" className="mt-2 inline-block text-xs font-semibold text-blue-600 hover:text-blue-700 focus:outline-none">Open Store Locator →</Link>
            </div>
            {/* Social */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900">Follow us</h3>
              <div className="mt-2 flex gap-3">
                <a href="https://www.instagram.com/ngc_uae/" target="_blank" className="rounded-full bg-slate-900 text-white p-2 focus:outline-none" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" className="rounded-full bg-slate-900 text-white p-2 focus:outline-none" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.95v-7.04H7.9V12h2.6V9.8c0-2.56 1.52-3.98 3.86-3.98 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.86l-.46 2.91h-2.4v7.04A10 10 0 0 0 22 12z"/></svg>
                </a>
                <a href="https://www.linkedin.com" target="_blank" className="rounded-full bg-slate-900 text-white p-2 focus:outline-none" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-3.5v-7c0-1.38-1.12-2.5-2.5-2.5S13.5 12.62 13.5 14v7H10v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="3.5" height="12"/><circle cx="3.75" cy="4.75" r="2"/></svg>
                </a>
                <a href="https://pinterest.com" target="_blank" className="rounded-full bg-slate-900 text-white p-2 focus:outline-none" aria-label="Pinterest">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.53 19.37c-.05-.82-.1-2.09.02-2.99.11-.77.7-4.92.7-4.92s-.18-.36-.18-.9c0-.84.49-1.47 1.1-1.47.52 0 .77.39.77.86 0 .53-.34 1.33-.52 2.07-.15.61.33 1.1.98 1.1 1.18 0 2.08-1.25 2.08-3.06 0-1.6-1.15-2.72-2.8-2.72-1.91 0-3.03 1.43-3.03 2.91 0 .58.22 1.2.49 1.53a.2.2 0 0 1 .05.19c-.05.21-.15.67-.17.76-.03.11-.09.14-.21.08-.77-.36-1.25-1.5-1.25-2.42 0-1.97 1.43-3.77 4.13-3.77 2.17 0 3.86 1.55 3.86 3.64 0 2.16-1.36 3.9-3.25 3.9-.63 0-1.22-.33-1.42-.72l-.39 1.48c-.14.55-.52 1.24-.78 1.66A10 10 0 1 0 12 2z"/></svg>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* Our Clients slider */}
      <section className="py-12">
        <Container>
          <div className="mb-5 text-center">
            <h2 className="text-2xl font-serif font-medium text-slate-900">Our Clients</h2>
            <p className="mt-1 text-sm text-slate-600">Trusted partnerships across hospitality, workplace and residential.</p>
          </div>
          <Swiper modules={[Autoplay, FreeMode]} autoplay={{ delay: 1800, disableOnInteraction: false }} freeMode loop spaceBetween={24} slidesPerView={2} breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 5 } }}>
            {logos.map((logo, idx) => (
              <SwiperSlide key={`${logo}-${idx}`}>
                <div className="flex h-16 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo} alt="client logo" className="max-h-10 w-auto object-contain grayscale" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>
    </main>
  );
}

