'use client';

import { useEffect, useRef, useState } from 'react';
type GSAPContext = { revert: () => void };
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/atoms/Container';

// GSAP is loaded dynamically inside effects to avoid SSR issues

export default function OurStoryPage() {
  // --- REFS & STATE ---
  const mosaicRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null); // New Ref for Timeline
  const teamRef = useRef<HTMLDivElement | null>(null); // Ref for Team section
  const [activeYear, setActiveYear] = useState('2026');    // State for Sticky Display
  const prevYearRef = useRef<number>(2026);

  // --- 1) SIMPLE REVEAL (Intersection Observer) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-24');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.js-scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- 2) GSAP MOSAIC ANIMATION ---
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const noAnim = new URLSearchParams(window.location.search).has('no-anim');
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (noAnim || prefersReduced || !mosaicRef.current) return;

    let ctx: GSAPContext | null = null;
    (async () => {
      const gsapCore = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
      gsapCore.registerPlugin(ScrollTrigger);

      const wrappers = Array.from(
        mosaicRef.current!.querySelectorAll('.card-wrapper')
      ) as HTMLElement[];
      if (!wrappers.length) return;

      const mapScale = gsapCore.utils.mapRange(1, wrappers.length - 1, 0.95, 1);
      const blockHeight = 360;
      const stackOffset = 60;
      const time = 1;

      gsapCore.set(wrappers, {
        y: (index: number) => stackOffset * index,
        transformOrigin: 'center top',
      });

      const qs = new URLSearchParams(window.location.search);
      const markers = qs.has('markers');
      const noPin = qs.has('nopin');
      const startExpr = qs.get('start') ?? 'center+=120 center';

      ctx = gsapCore.context(() => {
        const tl = gsapCore.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: mosaicRef.current!,
            start: startExpr,
            end: `+=${blockHeight * (wrappers.length + 2)}`,
            scrub: true,
            pin: !noPin,
            pinSpacing: true,
            anticipatePin: 1,
            markers,
            invalidateOnRefresh: true,
          },
        });

        const containerEl = mosaicRef.current!.querySelector('.card-container');
        if (containerEl) tl.from(containerEl, { y: blockHeight / 2, duration: 1 });

        tl.to(wrappers.slice(1), {
          yPercent: (i: number) => -100 * (i + 1),
          duration: time / 2,
          stagger: time,
        });

        tl.to(
          wrappers.slice(0, -1),
          {
            rotationX: -20,
            scale: (index: number) => mapScale(index),
            stagger: { each: time },
          },
          '<'
        );

        ScrollTrigger.refresh();
      }, mosaicRef);
    })();

    return () => {
      try { ctx?.revert(); } catch {}
    };
  }, []);

  // --- 3) NEW: GSAP TIMELINE ANIMATION ---
  useEffect(() => {
    if (typeof window === 'undefined' || !timelineRef.current) return;
    
    let ctx: GSAPContext | null = null;
    (async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // 3a. Animate Items Entry & State Change + Active styling
        const items = gsap.utils.toArray<HTMLElement>('.timeline-item');
        items.forEach((item) => {
          const dot = item.querySelector('.timeline-dot') as HTMLElement | null;
          const card = item.querySelector('.timeline-card') as HTMLElement | null;
          const shine = item.querySelector('.timeline-shine') as HTMLElement | null;
          const connector = item.querySelector('.timeline-connector') as HTMLElement | null;
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top center+=150',
                end: 'top center',
                toggleActions: 'play none none reverse',
                toggleClass: { targets: item, className: 'is-active' },
                onEnter: () => {
                  setActiveYear(item.dataset.year || '');
                  if (dot) {
                    gsap.fromTo(
                      dot,
                      { scale: 0.6, backgroundColor: '#ffffff' },
                      { scale: 1, backgroundColor: '#7d1c3a', duration: 0.35, ease: 'back.out(2)' }
                    );
                  }
                  if (connector) {
                    gsap.fromTo(
                      connector,
                      { width: 0, autoAlpha: 0 },
                      { width: 48, autoAlpha: 1, duration: 0.4, ease: 'back.out(1.4)' }
                    );
                  }
                  if (card) {
                    gsap.fromTo(
                      card,
                      { clipPath: 'inset(0 100% 0 0 round 16px)', filter: 'blur(1px)', scale: 0.995 },
                      { clipPath: 'inset(0 0% 0 0 round 16px)', filter: 'blur(0px)', scale: 1, duration: 0.8, ease: 'power3.out' }
                    );
                  }
                  if (shine) {
                    gsap.fromTo(
                      shine,
                      { x: '-120%', autoAlpha: 0 },
                      { x: '120%', autoAlpha: 0.25, duration: 0.8, ease: 'power2.out', onComplete: () => { gsap.set(shine, { autoAlpha: 0 }); } }
                    );
                  }
                },
                onEnterBack: () => {
                  setActiveYear(item.dataset.year || '');
                  if (dot) {
                    gsap.fromTo(
                      dot,
                      { scale: 0.6, backgroundColor: '#ffffff' },
                      { scale: 1, backgroundColor: '#7d1c3a', duration: 0.35, ease: 'back.out(2)' }
                    );
                  }
                  if (connector) {
                    gsap.fromTo(
                      connector,
                      { width: 0, autoAlpha: 0 },
                      { width: 48, autoAlpha: 1, duration: 0.4, ease: 'back.out(1.4)' }
                    );
                  }
                  if (card) {
                    gsap.fromTo(
                      card,
                      { clipPath: 'inset(0 100% 0 0 round 16px)', filter: 'blur(1px)', scale: 0.995 },
                      { clipPath: 'inset(0 0% 0 0 round 16px)', filter: 'blur(0px)', scale: 1, duration: 0.8, ease: 'power3.out' }
                    );
                  }
                  if (shine) {
                    gsap.fromTo(
                      shine,
                      { x: '-120%', autoAlpha: 0 },
                      { x: '120%', autoAlpha: 0.25, duration: 0.8, ease: 'power2.out', onComplete: () => { gsap.set(shine, { autoAlpha: 0 }); } }
                    );
                  }
                },
                onLeave: () => {
                  if (dot) gsap.to(dot, { backgroundColor: '#ffffff', duration: 0.2 });
                  if (connector) gsap.to(connector, { width: 0, duration: 0.2, ease: 'power1.in' });
                  if (card) gsap.to(card, { scale: 0.995, duration: 0.2, ease: 'power1.inOut' });
                },
                onLeaveBack: () => {
                  if (dot) gsap.to(dot, { backgroundColor: '#ffffff', duration: 0.2 });
                  if (connector) gsap.to(connector, { width: 0, duration: 0.2, ease: 'power1.in' });
                  if (card) gsap.to(card, { scale: 0.995, duration: 0.2, ease: 'power1.inOut' });
                },
              },
            }
          );
        });

        // 3b. Progress Bar Animation (smooth scrub) + progress head follow
        gsap.fromTo(
          '.timeline-progress-bar',
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top center',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );

        const lineEl = timelineRef.current!.querySelector('.timeline-line') as HTMLElement | null;
        const headEl = timelineRef.current!.querySelector('.timeline-progress-head') as HTMLElement | null;
        if (lineEl && headEl) {
          const setY = gsap.quickTo(headEl, 'y', { duration: 0.1, ease: 'none' });
          ScrollTrigger.create({
            trigger: timelineRef.current,
            start: 'top center',
            end: 'bottom bottom',
            onUpdate: (self) => {
              setY(lineEl.offsetHeight * self.progress);
            },
          });
        }

        // 3c. Gentle parallax on the globe icon + overlay rotation
        gsap.to('.js-parallax-globe', {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to('.timeline-gradient-overlay', {
          rotate: 10,
          ease: 'none',
          transformOrigin: '50% 50%',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }, timelineRef);
    })();

    return () => {
      try { ctx?.revert(); } catch {}
    };
  }, []);

  // --- 4) Subtle change animation for the sticky year ---
  useEffect(() => {
    if (typeof window === 'undefined' || !timelineRef.current) return;
    (async () => {
      const gsap = (await import('gsap')).default;
      const el = document.querySelector('.js-sticky-year') as HTMLElement | null;
      if (el) {
        // micro fade/slide
        gsap.fromTo(
          el,
          { y: 12, autoAlpha: 0, filter: 'blur(2px)' },
          { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.35, ease: 'power2.out' }
        );

        // odometer-like tween between years
        const prev = prevYearRef.current;
        const next = parseInt(activeYear, 10);
        if (!Number.isNaN(prev) && !Number.isNaN(next) && prev !== next) {
      const obj: { v: number } = { v: prev };
          gsap.to(obj, {
            v: next,
            duration: 0.6,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v));
            },
          });
          prevYearRef.current = next;
        }
      }
    })();
  }, [activeYear]);


  // --- DATA ---
  const revealClass =
    'js-scroll-reveal opacity-0 translate-y-24 transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform';

  const stats = [
    { value: '20+', label: 'Skilled installers' },
    { value: '50+', label: 'Trusted global brands' },
    { value: '5,000+', label: 'Happy customers' },
    { value: '20,000+', label: 'Completed project orders' },
    { value: '17,000+', label: 'Products in our library' },
    { value: '24-hour', label: 'Sample dispatch' },
  ];

  const timeline = [
    { year: '2026', title: 'Full Interior Solutions', body: 'Expanding into end-to-end FF&E and finishes with rapid delivery.' },
    { year: '2019', title: 'NGC Reface', body: 'Walls • Floors • Fabrics with new regional partners.' },
    { year: '2017', title: 'NGC Asia', body: 'Partnerships across India and SEA.' },
    { year: '2010', title: 'Flagship Showroom, Dubai', body: 'Experience center for hospitality and workspace.' },
    { year: '2009', title: 'Commercial Projects', body: 'First large-scale projects with international brands.' },
  ];

  const services = [
    { key: 'supply', title: 'Supply', img: '/images/workspace/options-floorings.png', body: 'High-quality wallcoverings, floorings, and fabrics from curated global brands.' },
    { key: 'installation', title: 'Installation', img: '/images/workspace/options-acoustic.png', body: 'Certified teams delivering precise fit-outs with reliable schedules.' },
    { key: 'support', title: 'Design Support', img: '/images/workspace/options-custom.png', body: 'Samples, specifications, palettes, and technical guidance for your project.' },
  ];

  const team = [
    { name: 'Alafiyah Kagalwala', title: 'Creative Director', img: '/images/walls/designer-hero.png' },
    { name: 'Muhsil Kagalwala', title: 'Managing Director', img: '/images/projects/almullah.png' },
    { name: 'Sara Khan', title: 'Design Lead', img: '/images/walls/lifestyle-img.jpg' },
    { name: 'Omar Ali', title: 'Project Manager', img: '/images/walls/runway-walls.png' },
    { name: 'Priya Patel', title: 'Materials Specialist', img: '/images/workspace/options-floorings.png' },
    { name: 'James Lee', title: 'Installation Lead', img: '/images/workspace/options-acoustic.png' },
    { name: 'Maya Singh', title: 'Marketing Manager', img: '/images/walls/armani-casa.png' },
    { name: 'Ahmed Hassan', title: 'Sales Director', img: '/images/workspace/wallcoverings.png' },
    { name: 'Elena Rossi', title: 'Client Services', img: '/images/projects/palm-jumeirah.png' },
    { name: 'Daniel Chen', title: 'Operations Manager', img: '/images/instock/floorings.png' },
    { name: 'Fatima Noor', title: 'Finance Lead', img: '/images/colors/olive.jpg' },
    { name: 'Lucas Martins', title: 'Logistics Coordinator', img: '/images/workspace/options-leather.png' },
  ];

  // --- 5) TEAM SECTION: sticky title + background parallax ---
  useEffect(() => {
    if (typeof window === 'undefined' || !teamRef.current) return;

    let ctx: GSAPContext | null = null;
    (async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const bg = teamRef.current!.querySelector('.js-team-bg');
        if (bg) {
          gsap.fromTo(
            bg,
            { y: 0, autoAlpha: 0.05 },
            {
              y: -120,
              autoAlpha: 0.12,
              ease: 'none',
              scrollTrigger: {
                trigger: teamRef.current!,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }

        const cards = gsap.utils.toArray<HTMLElement>('.js-team-card');
        if (cards.length) {
          gsap.from(cards, {
            autoAlpha: 0,
            y: 24,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: teamRef.current!,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      }, teamRef);
    })();

    return () => {
      try { ctx?.revert(); } catch {}
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-rose-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" />
        <Container className="py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-slate-900 leading-tight">We help redefine spaces</h1>
            <p className="mt-4 text-slate-600 text-lg">
              At NGC Walls | Floors | Fabrics, every detail matters. From textures to finishes, we curate
              high-quality materials that bring precision, elegance, and excellence to every project.
            </p>
          </div>
        </Container>
      </section>

      {/* Story Mosaic */}
      <div ref={mosaicRef} className="w-full bg-white mosaic trigger extra-trigger">
        <Container className="max-w-6xl px-4 md:px-6 pb-20 pt-10">
          <div className="card-container relative" style={{ perspective: '1000px' }}>
            {/* --- Row 1 --- */}
            <div className="card-wrapper card grid grid-cols-1 md:grid-cols-2 gap-6 relative z-0">
              <div className={`${revealClass} relative aspect-[4/3] w-full overflow-hidden md:rounded-l-sm`}>
                <Image src="/images/walls/lifestyle-img.jpg" alt="NGC Era" fill className="object-cover" />
              </div>
              <div className={`${revealClass} flex flex-col justify-center bg-slate-100 p-8 md:p-14 md:rounded-r-sm delay-100`}>
                <h3 className="text-xl font-semibold text-slate-900 leading-snug">
                  After 40 years in the UAE&apos;s interior design scene, NGC is stepping into a new era.
                </h3>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  Renowned for wall coverings, fabrics and flooring, NGC has now rebranded with the tagline
                  &quot;We help redefine spaces,&quot; embracing growth, innovation, and a vision that looks beyond walls alone.
                </p>
              </div>
            </div>

            {/* --- Row 2 --- */}
            <div className="card-wrapper card grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 -mt-0 md:-mt-24 pointer-events-none">
              <div className={`${revealClass} flex flex-col justify-center bg-[#dce0dd] p-8 md:p-14 md:rounded-l-sm delay-200 shadow-xl pointer-events-auto`}>
                <h3 className="text-lg font-semibold uppercase tracking-wide text-slate-800">Honoring heritage</h3>
                <p className="mt-4 text-slate-700 text-sm leading-relaxed">
                  For those of us who&apos;ve been following NGC, this rebrand feels like a natural evolution.
                  It&apos;s a family-owned business that has journeyed through four generations.
                </p>
              </div>
              <div className={`${revealClass} relative aspect-[4/3] w-full overflow-hidden md:rounded-r-sm delay-100 shadow-xl pointer-events-auto`}>
                <Image src="/images/walls/runway-walls.png" alt="Heritage Materials" fill className="object-cover" />
              </div>
            </div>

            {/* --- Row 3 --- */}
            <div className="card-wrapper card grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20 -mt-0 md:-mt-24 pointer-events-none">
              <div className={`${revealClass} relative aspect-[4/3] w-full overflow-hidden md:rounded-l-sm delay-200 shadow-xl pointer-events-auto`}>
                <Image src="/images/projects/almullah.png" alt="Leadership" fill className="object-cover" />
              </div>
              <div className={`${revealClass} flex flex-col justify-center bg-slate-100 p-8 md:p-14 md:rounded-r-sm delay-300 shadow-xl pointer-events-auto`}>
                <h3 className="text-sm font-semibold text-slate-900 leading-relaxed">
                  Our goal is to serve our clients better and provide them with a wide range of products that meet their specific needs.
                </h3>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  We are always on the lookout for new opportunities to grow and expand our offerings so that we can continue to be a trusted partner in the industry.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* --- NEW SECTION: Presence / Timeline (Sticky Scroll) --- */}
      <section ref={timelineRef} className="relative py-24 bg-slate-50 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* LEFT SIDE: Sticky Year & Visuals */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-1/4">
                <div className="mb-6">
                  <h2 className="text-3xl font-serif font-medium text-slate-900">Expanding Presence</h2>
                  <p className="mt-2 text-slate-500">Milestones that shaped our journey.</p>
                </div>

                {/* The "Big Year" Display */}
                <div className="relative group aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100">
                  {/* Background Decoration */}
                  <div className="timeline-gradient-overlay absolute inset-0 bg-gradient-to-br from-[#7d1c3a]/5 to-transparent will-change-transform" />
                  <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-rose-100/50 blur-3xl" />
                  
                  <div className="relative z-10 flex h-full flex-col justify-between p-10">
                    <Image src="/globe.svg" alt="Global" width={80} height={80} className="opacity-80 js-parallax-globe will-change-transform" />
                    
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-widest text-slate-400">Established Timeline</span>
                      {/* Animated Year Change */}
                      <div className="js-sticky-year mt-2 text-8xl font-serif font-bold text-[#7d1c3a] will-change-transform">
                        {activeYear}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Scrolling List */}
            <div className="lg:col-span-7 relative pt-10 lg:pt-32 pb-20">
              {/* Vertical Line Container */}
              <div className="timeline-line absolute left-0 lg:left-8 top-32 bottom-20 w-px bg-slate-200 hidden lg:block">
                <div className="timeline-progress-bar w-full h-0 rounded-full bg-gradient-to-b from-[#7d1c3a] to-rose-400" />
                <div className="timeline-progress-head absolute -left-1.5 h-4 w-4 rounded-full bg-rose-400 shadow-[0_0_0_6px_rgba(125,28,58,0.15)]" />
              </div>

              <div className="space-y-16 lg:pl-20">
                {timeline.map((t, i) => (
                  <div 
                    key={t.year} 
                    data-year={t.year}
                    className="timeline-item group relative flex flex-col md:flex-row gap-6 md:items-center"
                  >
                    {/* Mobile Only: Year Bubble */}
                    <div className="lg:hidden w-fit px-4 py-1 rounded-full bg-rose-100 text-[#7d1c3a] font-bold text-sm">
                      {t.year}
                    </div>

                    {/* Dot on Line (Desktop) */}
                    <div className="timeline-dot hidden lg:block absolute -left-[57px] h-3 w-3 rounded-full border-2 border-[#7d1c3a] bg-white transition-colors duration-300 z-10 will-change-transform" />
                    <div className="timeline-connector hidden lg:block absolute -left-12 top-1/2 -translate-y-1/2 h-px bg-rose-200 w-0" />

                    {/* Content Card */}
                    <div className="timeline-card relative overflow-hidden w-full rounded-xl bg-white p-8 shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-xl hover:border-rose-100 group-hover:-translate-y-1 group-[.is-active]:shadow-xl group-[.is-active]:border-rose-200 group-[.is-active]:ring-2 group-[.is-active]:ring-rose-100 group-[.is-active]:-translate-y-1">
                      <div className="timeline-shine pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0" />
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-semibold text-slate-900">{t.title}</h4>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{t.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Team */}
<section ref={teamRef} className="relative bg-[#7d1c3a] overflow-hidden">
  <Container className="py-24">
    <div className="pointer-events-none absolute inset-x-0 top-10 z-0 text-center text-[120px] font-serif font-bold tracking-tight text-white/5 md:text-[200px] leading-none js-team-bg">
      TEAM
    </div>
    <div className="relative z-10 mx-auto max-w-6xl">
      <h2 className="js-team-title sticky top-24 z-20 text-center text-3xl md:text-4xl font-serif font-medium text-white">
        Our Team
      </h2>
      <div className="mt-16 lg:pt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {team.map((m, i) => (
          <div
            key={m.name}
            className={`${revealClass} js-team-card group overflow-hidden rounded-xl bg-white shadow-2xl`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="relative aspect-[4/4.5] overflow-hidden">
              <Image
                src={m.img}
                alt={m.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 text-center">
              <div className="text-xl font-semibold text-slate-900">{m.name}</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider mt-1">
                {m.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Container>
</section>


      {/* Numbers */}
      <Container className="py-20 bg-slate-50">
        <h2 className="text-center text-3xl font-serif font-medium text-slate-900">Our Numbers</h2>
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.value}
              className={`${revealClass} flex flex-col items-center justify-center rounded-xl bg-white p-10 text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl font-bold text-[#7d1c3a]">{s.value}</div>
              <div className="mt-3 text-sm font-medium text-slate-500 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>

      {/* Services */}
      <Container className="py-20">
        <h2 className="text-center text-3xl font-serif font-medium text-slate-900">Our Services</h2>
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((svc, i) => (
            <div
              key={svc.key}
              className={`${revealClass} group overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-rose-200 transition-colors`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-[4/2.5] overflow-hidden">
                <Image src={svc.img} alt={svc.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8">
                <div className="text-xl font-semibold text-slate-900">{svc.title}</div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{svc.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            href="/support/contact"
            className="inline-flex rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all hover:-translate-y-1 focus:outline-none"
          >
            Talk to our team
          </Link>
        </div>
      </Container>
    </main>
  );
}
