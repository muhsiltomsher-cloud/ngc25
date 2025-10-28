'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import VoiceSearchModal from '@/components/ui/VoiceSearchModal';

const Container = ({ children, className = '' }) => (
  <div className={` px-4 w-full max-w-[1400px] ${className}`}>
    {children}
  </div>
);

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [query, setQuery] = useState('');
  const fileRef = useRef(null);
  const router = useRouter();
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVoiceButtonClick = () => {
    setIsVoiceModalOpen(true);
  };

  const handleVoiceSubmit = (voiceQuery) => {
    setQuery(voiceQuery);
    const params = new URLSearchParams();
    if (voiceQuery) params.set('q', voiceQuery);
    router.push(`/search${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <section
      className="relative min-h-screen flex items-end"
      style={{
        backgroundImage: "url('/images/banenr.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

      <Container className="relative z-10 max-w-2xl mx-auto text-left px-4 md:px-0 pb-36 md:pb-48">
        <div
          className={`transition-all duration-1000 ease-out max-w-2xl ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg leading-tight">
            We help<br />redefine spaces
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-normal drop-shadow-md mb-8">
            At NGC Walls&nbsp;|&nbsp;Floors&nbsp;|&nbsp;Fabrics, every detail matters. From textures to finishes, we curate high-quality materials that bring precision, elegance, and excellence to every project.
          </p>
          
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = query.trim();
                const params = new URLSearchParams();
                if (q) params.set('q', q);
                router.push(`/search${params.toString() ? `?${params.toString()}` : ''}`);
              }}
            >
              <input
                type="search"
                name="search"
                placeholder="Search products, categories, brands"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full py-4 pl-6 pr-28 text-md text-white placeholder-gray-300 bg-black/40 border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
            </form>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    try { sessionStorage.setItem('imageSearchPreview', String(reader.result || '')); } catch {}
                    const p = new URLSearchParams();
                    if (query.trim()) p.set('q', query.trim());
                    p.set('image', '1');
                    p.set('imgv', String(Date.now()));
                    router.push(`/search?${p.toString()}`);
                  };
                  reader.readAsDataURL(f);
                }}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="p-2 text-gray-300 hover:text-white focus:outline-none"
                aria-label="Search by image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </button>
              <button
                type="button"
                onClick={handleVoiceButtonClick}
                className="p-2 text-gray-300 hover:text-white focus:outline-none transition-colors"
                aria-label="Voice search"
                title="Voice search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  const q = query.trim();
                  const params = new URLSearchParams();
                  if (q) params.set('q', q);
                  router.push(`/search${params.toString() ? `?${params.toString()}` : ''}`);
                }}
                className="p-2 text-gray-300 hover:text-white focus:outline-none"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </Container>

      <VoiceSearchModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onSubmit={handleVoiceSubmit}
      />
    </section>
  );
};

export default HeroSection;
