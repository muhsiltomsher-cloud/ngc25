'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { allProducts } from '../data/productsData';
import VoiceSearchModal from './ui/VoiceSearchModal';

/**
 * Reusable search bar with text, image, and voice search actions.
 * Props:
 * - initialQuery?: string
 * - placeholder?: string
 * - onTextSearch?: (query: string) => void
 * - onImageSelected?: (dataUrl: string, file: File) => void
 * - className?: string
 */
export default function SearchBar({
  initialQuery = '',
  placeholder = "Search for products like 'Sheer Curtains' or 'Carpet Tiles'",
  onTextSearch,
  onImageSelected,
  className = '',
}) {
  const [query, setQuery] = useState(initialQuery);
  const fileInputRef = useRef(null);
  const rootRef = useRef(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    onTextSearch && onTextSearch(q);
    setIsOpen(false);
  };

  const handleImageButtonClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.value = '';
    fileInputRef.current.click();
  };

  const handleVoiceButtonClick = () => {
    setIsVoiceModalOpen(true);
  };

  const handleVoiceSubmit = (voiceQuery) => {
    setQuery(voiceQuery);
    onTextSearch && onTextSearch(voiceQuery);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl === 'string') {
        onImageSelected && onImageSelected(dataUrl, file);
      }
    };
    reader.readAsDataURL(file);
  };

  // Compute simple product suggestions based on the query
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    const scored = allProducts.map((p) => {
      const fields = [p.name, p.category, p.subCategory, p.brandKey, ...(p.tags || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      let score = 0;
      if (p.name.toLowerCase().startsWith(q)) score += 3;
      if (p.name.toLowerCase().includes(q)) score += 2;
      if (fields.includes(q)) score += 1;
      return { p, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(x => x.p);
    setSuggestions(scored);
    setIsOpen(scored.length > 0);
  }, [query]);

  // Close suggestions on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div ref={rootRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <input
          type="search"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full py-4 pl-6 pr-28 text-md text-white placeholder-gray-300 bg-black/40 border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm transition-all"
          onFocus={() => { if (suggestions.length) setIsOpen(true); }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            type="button"
            onClick={handleImageButtonClick}
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
            type="submit"
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        {/* Hidden file input for image search */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute mt-2 left-0 right-0 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="py-2">
            {suggestions.map((s) => (
              <Link
                key={s.id}
                href={`/product/${s.id}`}
                className="flex items-center px-3 py-2 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 border border-gray-200 mr-3">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/80x80/e2e8f0/4a5568?text=No+Img'; }}
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{s.name}</div>
                  <div className="text-xs text-gray-500 truncate">{s.category}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <VoiceSearchModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onSubmit={handleVoiceSubmit}
      />
    </div>
  );
}
