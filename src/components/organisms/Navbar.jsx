'use client';

import React, { useState, useRef } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { name: "HOME", href: "/", dropdown: false },
  { name: "CATALOG", href: "/catalog", dropdown: false },
  { name: "MOODBOARD", href: "/moodboard", dropdown: false },
  {
    name: "SEGMENTS",
    dropdown: true,
    children: [
      { name: "WORKSPACE", href: "/segments/workspace" },
      { name: "RESIDENTIAL", href: "/segments/residential" },
      { name: "HOSPITALITY", href: "/segments/hospitality" },
      { name: "HEALTHCARE", href: "/segments/healthcare" },
      { name: "EDUCATION", href: "/segments/education" },
    ],
  },
  {
    name: "WALLS",
    dropdown: true,
    children: [
      { name: "DESIGNER", href: "/walls/designer" },
      { name: "COMMERCIAL", href: "/walls/commercial" },
      { name: "KIDS WALL", href: "/walls/kids-wall" },
      { name: "CUSTOM WALL", href: "/walls/custom-wall" },
    ],
  },
  {
    name: "FLOORS",
    dropdown: true,
    children: [
      { name: "CARPET TILES", href: "/floors/carpet-tiles" },
      { name: "LVT", href: "/floors/lvt" },
      { name: "RUG", href: "/floors/rug" },
      { name: "WOVEN", href: "/floors/woven" },
      { name: "WALL TO WALL", href: "/floors/wall-to-wall" },
      { name: "CUSTOM", href: "/floors/custom" },
    ],
  },
  {
    name: "FABRICS",
    dropdown: true,
    children: [
      { name: "SHEERS", href: "/fabrics/sheers" },
      { name: "CURTAINS", href: "/fabrics/curtains" },
      { name: "UPHOLSTERY", href: "/fabrics/upholstery" },
      { name: "OUTDOOR", href: "/fabrics/outdoor" },
      { name: "MARINE", href: "/fabrics/marine" },
      { name: "AUTOMOTIVE", href: "/fabrics/automotive" },
    ],
  },
  {
    name: "SUPPORT",
    dropdown: true,
    children: [
      { name: "OUR STORY", href: "/support/our-story" },
      { name: "CONTACT US", href: "/support/contact" },
      { name: "MEDIA", href: "/media" },
      { name: "STORE LOCATOR", href: "/store-locator" },
      { name: "FAQ", href: "/faq" },
      { name: "TERMS & CONDITIONS", href: "/terms" },
      { name: "SUSTAINABILITY", href: "/support/sustainability" },
      { name: "NEWS", href: "/support/news" },
      { name: "BLOG", href: "/blog" },
      { name: "FIND YOUR REP", href: "/support/find-your-rep" },
    ],
  },
  {
    name: "SOLUTIONS",
    dropdown: true,
    children: [
      { name: "DIGITAL WALLCOVERINGS", href: "/solutions/digital-wallcoverings" },
      { name: "ACOUSTIC", href: "/solutions/acoustic" },
      { name: "CIRCON", href: "/solutions/circon" },
      { name: "TEXTILE WALL PANEL", href: "/solutions/textile-wall-panel" },
      { name: "BETTER BY NATURE", href: "/solutions/better-by-nature" },
      { name: "TYPE II WALLPAPER", href: "/solutions/type-ii-wallpaper" },
      { name: "PVC FREE", href: "/solutions/pvc-free" },
      { name: "UPHOLSTERY", href: "/solutions/upholstery" },
    ],
  },
];


function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [quickshipMenuOpen, setQuickshipMenuOpen] = useState(false);
  const timeoutRef = useRef();
  const pathname = usePathname();

  function handleMouseEnter(name) {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(name);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 120);
  }

  function handleMenuMouseEnter() {
    clearTimeout(timeoutRef.current);
  }

  function handleMenuMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 120);
  }

  // Quickship button toggle
  const toggleQuickship = () => {
    setQuickshipMenuOpen((open) => !open);
  };

  // Close Quickship dropdown on blur
  const closeQuickship = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setQuickshipMenuOpen(false);
    }
  };

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-black/70 backdrop-blur-md h-[var(--app-header-height)] flex items-center shadow-2xl">
      <div className="container mx-auto flex items-center justify-between px-7">
        {/* Logo on left only */}
        <Link href="/" className="flex items-center select-none flex-shrink-0">
          <img
            src="/images/logo.png"
            alt="NGC Logo"
            className="h-[46px] w-auto"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/100x46/ffffff/000000?text=NGC";
            }}
            draggable="false"
            style={{ filter: "drop-shadow(0 2px 18px rgba(0,0,0,0.10))" }}
          />
        </Link>

        {/* Entire menu group on right */}
        <div className="flex items-center space-x-5 relative">
          <ul className="flex space-x-2 h-full items-center">
            {NAV_ITEMS.map((item, idx) => (
              <li
                key={item.name}
                className="relative flex items-center h-full"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                onMouseLeave={() => item.dropdown && handleMouseLeave()}
              >
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      className={`uppercase text-sm font-medium px-5 py-2 text-white hover:text-blue-500 transition flex items-center gap-1 select-none ${
                        openDropdown === item.name ? "text-blue-500" : ""
                      }`}
                    >
                      {item.name}
                      <svg
                        className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.673l3.71-3.443a.75.75 0 1 1 1.02 1.1l-4.22 3.92a.75.75 0 0 1-1.02 0l-4.22-3.92a.75.75 0 0 1 .02-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {openDropdown === item.name && (
                      <div
                        className="absolute left-1/2 top-full -translate-x-1/2 min-w-[220px] bg-black/95 mt-2 rounded-xl shadow-xl border border-white/10 z-40 dropdown-fadein"
                        onMouseEnter={handleMenuMouseEnter}
                        onMouseLeave={handleMenuMouseLeave}
                        style={{ animation: "fadeInDropdown .18s cubic-bezier(.32,.7,.37,1)" }}
                      >
                        <ul className="flex flex-col py-1">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                className="block px-6 py-2.5 text-sm text-white hover:text-blue-600 hover:bg-blue-100/90 rounded-lg font-medium transition"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`uppercase text-sm font-medium px-5 py-2 text-white hover:text-blue-500 transition select-none ${
                      pathname === item.href ? "text-blue-500" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
                {/* Separator except last */}
                {idx < NAV_ITEMS.length - 1 && (
                  <span className="h-5 border-r border-dashed border-white/30 mx-2" />
                )}
              </li>
            ))}
          </ul>

          {/* Quickship button with dropdown */}
          <div
            className="ml-6 relative select-none"
            tabIndex={0}
            onBlur={closeQuickship}
          >
            <button
              type="button"
              className="flex items-center bg-zinc-900/90 px-4 py-1 rounded-lg border border-white/10 hover:bg-zinc-800 transition focus:outline-none"
              onClick={toggleQuickship}
            >
              <svg
                className="mr-2 w-5 h-5 text-white flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 3.5A6.5 6.5 0 1 1 3.5 10a.75.75 0 0 1-1.5 0 8 8 0 1 0 8-8 .75.75 0 0 1 0 1.5Zm-.25 2.25a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-.43.68l-2.75 1.25a.75.75 0 1 1-.62-1.36l2.55-1.16V5.75Z" />
              </svg>
              <div className="flex flex-col leading-tight text-left">
                <span className="text-sm font-semibold text-white">QUICKSHIP</span>
                <span className="text-xs text-white/80">24 HOUR DELIVERY</span>
              </div>
              <svg
                className={`ml-2 w-3 h-3 text-white transition-transform ${
                  quickshipMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {quickshipMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-black/95 rounded-xl shadow-xl border border-white/10 z-50 dropdown-fadein py-2">
                <a
                  href="/quickship/info"
                  className="block px-5 py-2 text-white hover:bg-blue-100/90 hover:text-blue-700 rounded-md transition font-medium text-sm"
                >
                  Quickship Info
                </a>
                <a
                  href="/quickship/order"
                  className="block px-5 py-2 text-white hover:bg-blue-100/90 hover:text-blue-700 rounded-md transition font-medium text-sm"
                >
                  Start Order
                </a>
              </div>
            )}
          </div>

          {/* Accessibility controls removed per requirement (catalog-only on product pages) */}
        </div>
      </div>


    </header>
  );
}

export default Navbar;
