"use client";

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { allProducts } from '@/data/productsData';

type BoardItem = {
  id: string;
  type: 'image' | 'text';
  x: number;
  y: number;
  w: number;
  h: number;
  rotation?: number;
  url?: string;
  text?: string;
  name?: string;
  z?: number;
  locked?: boolean;
};
import { Rnd } from 'react-rnd';
import { toPng } from 'html-to-image';

function ProductLibrary({ onInsert, onSetBackground, disabled = false }: { onInsert?: (url: string, name?: string) => void; onSetBackground?: (url: string, name?: string) => void; disabled?: boolean }) {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState<string>('');

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    const list = allProducts.map(p => ({ id: p.id, name: p.name, image: p.image, category: p.category }));
    const filteredByCat = category ? list.filter(i => (i.category || '').toLowerCase() === category.toLowerCase()) : list;
    if (!query) return filteredByCat;
    return filteredByCat.filter(i => `${i.name} ${i.category}`.toLowerCase().includes(query));
  }, [q, category]);

  const mainTemplates = useMemo(() => {
    const wanted = ['Walls', 'Floors', 'Fabrics'];
    const fallback: Record<string, string> = {
      Walls: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1200&q=80',
      Floors: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
      Fabrics: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1200&q=80',
    };
    return wanted.map((cat) => {
      const found = allProducts.find((p) => (p.category || '').toLowerCase() === cat.toLowerCase());
      return { title: cat, url: found?.image || fallback[cat] || fallback.Walls };
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-3 border-b border-gray-200 bg-white/80 backdrop-blur flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-gray-300 px-2 py-2 text-sm">
          <option value="">All</option>
          {[...new Set(allProducts.map(p => p.category).concat(['Home']))].sort().map(c => (<option key={c} value={c}>{c}</option>))}
        </select>
      </div>
      <div className="flex-1 overflow-auto p-3 space-y-4 bg-white/70">
        <div>
          <div className="px-1 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Main Categories</div>
          <div className="grid grid-cols-2 gap-3">
            {mainTemplates.map((t) => (
              <div key={t.title} className="group relative rounded-lg overflow-hidden border border-gray-200 bg-white">
                <div className="aspect-[4/3] bg-gray-100 relative">
                  <NextImage src={t.url} alt={t.title} fill sizes="(max-width: 768px) 50vw, 200px" className="object-cover" />
                </div>
                <div className="p-2 flex items-center justify-between">
                  <div className="text-xs font-medium text-gray-800">{t.title}</div>
                  <button
                    className={`px-2 py-1 text-[11px] rounded-full border ${disabled ? 'border-gray-200 bg-gray-100 text-gray-400' : 'border-gray-300 bg-white hover:bg-gray-50'} `}
                    onClick={() => onSetBackground && onSetBackground(t.url, t.title)}
                    disabled={disabled || !onSetBackground}
                  >
                    Add as background
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {items.map((it) => (
          <div key={it.id} className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 bg-white hover:shadow-sm">
            <div
              className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 border border-gray-200 shrink-0 relative"
              draggable={!disabled}
              onDragStart={(e) => {
                try {
                  const payload = JSON.stringify({ url: it.image, name: it.name });
                  e.dataTransfer.setData('application/x-moodboard-item', payload);
                } catch {}
                e.dataTransfer.setData('text/uri-list', it.image);
                e.dataTransfer.effectAllowed = 'copy';
              }}
            >
              <NextImage src={it.image} alt={it.name} fill sizes="48px" className="object-cover pointer-events-none" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-gray-900 truncate">{it.name}</div>
              <div className="text-xs text-gray-600 truncate">{it.category}</div>
            </div>
            <button
              className={`px-3 py-1 text-xs rounded-full border ${disabled ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
              onClick={() => onInsert && onInsert(it.image, it.name)}
              disabled={disabled || !onInsert}
            >
              Add
            </button>
            <Link href={`/product/${it.id}`} className="px-3 py-1 text-xs rounded-full bg-gray-900 text-white hover:bg-black" title="View details">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function MoodboardEditorInner() {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [items, setItems] = useState<BoardItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [background, setBackground] = useState<{ url: string | null; name?: string | null; fit?: 'cover' | 'contain' }>({ url: null, name: null, fit: 'cover' });
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try { return localStorage.getItem('moodboard_intro_dismissed') !== '1'; } catch { return true; }
  });
  useEffect(() => setMounted(true), []);

  const [snap, setSnap] = useState(true);
  const [gridSize, setGridSize] = useState(20);
  const [history, setHistory] = useState<{ items: typeof items; background: typeof background; scale: number }[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Wall & Floor customization state
  const [horizon, setHorizon] = useState<number>(55); // percentage split between wall (top) and floor (bottom)
  const [wallStyle, setWallStyle] = useState<{ color: string | null; texture: string | null; opacity: number; repeat?: boolean; textureScale?: number }>({ color: '#ffffff', texture: null, opacity: 0.35, repeat: false, textureScale: 1 });
  const [floorStyle, setFloorStyle] = useState<{ color: string | null; texture: string | null; opacity: number; repeat?: boolean; textureScale?: number }>({ color: '#eaeaea', texture: null, opacity: 0.35, repeat: true, textureScale: 1 });

  // Masks for AI-like region replacement
  type Point = { x: number; y: number };
  const [wallMask, setWallMask] = useState<{ points: Point[] }>({ points: [] });
  const [floorMask, setFloorMask] = useState<{ points: Point[] }>({ points: [] });
  const [maskMode, setMaskMode] = useState<null | 'wall' | 'floor'>(null);
  const [maskDraft, setMaskDraft] = useState<Point[]>([]);

  const takeSnapshot = useCallback(() => ({ items: structuredClone(items), background: structuredClone(background), scale }), [items, background, scale]);
  const pushHistory = useCallback((snap?: { items: typeof items; background: typeof background; scale: number }) => {
    const s = snap ?? takeSnapshot();
    setHistory((prev) => {
      const upto = historyIndex >= 0 ? prev.slice(0, historyIndex + 1) : prev;
      const merged = [...upto, s].slice(-20);
      setHistoryIndex(merged.length - 1);
      return merged;
    });
  }, [historyIndex, takeSnapshot]);

  const undo = useCallback(() => {
    setHistoryIndex((idx) => {
      const n = Math.max(0, idx - 1);
      const s = history[n];
      if (s) { setItems(s.items); setBackground(s.background); setScale(s.scale); }
      return n;
    });
  }, [history]);
  const redo = useCallback(() => {
    setHistoryIndex((idx) => {
      const n = Math.min(history.length - 1, idx + 1);
      const s = history[n];
      if (s) { setItems(s.items); setBackground(s.background); setScale(s.scale); }
      return n;
    });
  }, [history]);

  // Helper to add image at specific coordinates (drop support)
  const addImageAt = useCallback(async (url: string, name: string | undefined, pos: { x: number; y: number }) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const dims = await new Promise<{ w: number; h: number }>((resolve) => {
      img.onload = () => {
        const maxW = 600; const s = Math.min(1, maxW / (img.naturalWidth || 1));
        resolve({ w: Math.max(40, Math.round((img.naturalWidth || 400) * s)), h: Math.max(40, Math.round((img.naturalHeight || 300) * s)) });
      };
      img.onerror = () => resolve({ w: 400, h: 300 });
      img.src = url;
    });
    setItems((prev) => {
      const maxZ = prev.reduce((m, it) => Math.max(m, it.z || 0), 0);
      const id = `item-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
      const item: BoardItem = { id, type: 'image', x: Math.round(pos.x - dims.w / 2), y: Math.round(pos.y - dims.h / 2), w: dims.w, h: dims.h, url, name, z: maxZ + 1 };
      const next: BoardItem[] = [...prev, item];
      pushHistory({ items: next, background, scale });
      return next;
    });
  }, [scale, background, pushHistory]);

  const addImage = useCallback(async (url: string, name?: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const dims = await new Promise<{ w: number; h: number }>((resolve) => {
      img.onload = () => {
        const maxW = 600; const s = Math.min(1, maxW / (img.naturalWidth || 1));
        resolve({ w: Math.max(40, Math.round((img.naturalWidth || 400) * s)), h: Math.max(40, Math.round((img.naturalHeight || 300) * s)) });
      };
      img.onerror = () => resolve({ w: 400, h: 300 });
      img.src = url;
    });





    
    const container = boardRef.current; const cw = container?.clientWidth ?? 1200; const ch = container?.clientHeight ?? 800;
    const centerX = (cw / 2 - dims.w / 2) / (scale || 1); const centerY = (ch / 2 - dims.h / 2) / (scale || 1);
    setItems((prev) => {
      const maxZ = prev.reduce((m, it) => Math.max(m, it.z || 0), 0);
      const id = `item-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
      const item: BoardItem = { id, type: 'image', x: Math.round(centerX), y: Math.round(centerY), w: dims.w, h: dims.h, url, name, z: maxZ + 1 };
      const next: BoardItem[] = [...prev, item];
      pushHistory({ items: next, background, scale });
      return next;
    });
  }, [scale, background, pushHistory]);

  const addText = useCallback(() => {
    const el = boardRef.current; const cw = el?.clientWidth ?? 1200; const ch = el?.clientHeight ?? 800; const w = 240, h = 80;
    const centerX = (cw / 2 - w / 2) / (scale || 1); const centerY = (ch / 2 - h / 2) / (scale || 1);
    setItems((prev) => {
      const maxZ = prev.reduce((m, it) => Math.max(m, it.z || 0), 0);
      const id = `text-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
      const item: BoardItem = { id, type: 'text', x: Math.round(centerX), y: Math.round(centerY), w, h, text: 'Double-click to edit', z: maxZ + 1 };
      const next: BoardItem[] = [...prev, item];
      pushHistory({ items: next, background, scale });
      return next;
    });
  }, [scale, background, pushHistory]);








  const setBackgroundImage = useCallback((url: string, name?: string) => { setBackground({ url, name, fit: 'cover' }); pushHistory(); }, [pushHistory]);
  const handleExport = useCallback(async () => { if (!boardRef.current) return; try { const dataUrl = await toPng(boardRef.current, { cacheBust: true, backgroundColor: '#ffffff' }); const a = document.createElement('a'); a.href = dataUrl; a.download = 'moodboard.png'; a.click(); } catch (e) { console.error('Export failed', e); } }, []);
  const handleSave = useCallback(() => {
    try {
      const payload = {
        items,
        background,
        scale,
        horizon,
        wallStyle,
        floorStyle,
        wallMask,
        floorMask,
      };
      localStorage.setItem('moodboard_snapshot', JSON.stringify(payload));
    } catch {}
  }, [items, background, scale, horizon, wallStyle, floorStyle, wallMask, floorMask]);
  const handleLoad = useCallback(() => {
    try {
      const raw = localStorage.getItem('moodboard_snapshot');
      if (!raw) return;
      const data = JSON.parse(raw || '{}');
      const { items: its, background: bg, scale: sc, horizon: hz, wallStyle: ws, floorStyle: fs, wallMask: wm, floorMask: fm } = data;
      if (Array.isArray(its)) setItems(its);
      if (bg && typeof bg === 'object') setBackground(bg);
      if (typeof sc === 'number') setScale(sc);
      if (typeof hz === 'number') setHorizon(hz);
      if (ws && typeof ws === 'object') setWallStyle((prev) => ({ ...prev, ...ws }));
      if (fs && typeof fs === 'object') setFloorStyle((prev) => ({ ...prev, ...fs }));
      if (wm && Array.isArray(wm.points)) setWallMask({ points: wm.points });
      if (fm && Array.isArray(fm.points)) setFloorMask({ points: fm.points });
    } catch {}
  }, []);
  const handleClear = useCallback(() => { setItems((prev) => { const next: typeof prev = []; pushHistory({ items: next, background, scale }); return next; }); setSelectedId(null); }, [pushHistory, background, scale]);
  const handleReset = useCallback(() => { try { localStorage.removeItem('moodboard_snapshot'); } catch {} setItems((prev) => { const next: typeof prev = []; pushHistory({ items: next, background: { url: null, name: null, fit: 'cover' }, scale: 1 }); return next; }); setSelectedId(null); setBackground({ url: null, name: null, fit: 'cover' }); setScale(1); }, [pushHistory]);

  // Canva integration removed

  // Drag-and-Drop from Library to Board
  const onBoardDragOver = useCallback((e: React.DragEvent) => {
    if (e.dataTransfer.types.includes('application/x-moodboard-item') || e.dataTransfer.types.includes('text/uri-list')) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    }
  }, []);

  const onBoardDrop = useCallback(async (e: React.DragEvent) => {
    if (!boardRef.current) return;
    e.preventDefault();
    const rect = boardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (scale || 1);
    const y = (e.clientY - rect.top) / (scale || 1);
    try {
      const payload = e.dataTransfer.getData('application/x-moodboard-item');
      if (payload) {
        const { url, name } = JSON.parse(payload) as { url: string; name?: string };
        await addImageAt(url, name, { x, y });
        return;
      }
    } catch {}
    const uri = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text/plain');
    if (uri) await addImageAt(uri, undefined, { x, y });
  }, [scale, addImageAt]);

  // Mask creation on board (click to add points, double-click to finish)
  const onBoardClickForMask = useCallback((e: React.MouseEvent) => {
    if (!maskMode || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (scale || 1);
    const y = (e.clientY - rect.top) / (scale || 1);
    setMaskDraft((prev) => [...prev, { x, y }]);
  }, [maskMode, scale]);

  const onBoardDoubleClick = useCallback(() => {
    if (!maskMode) return;
    if (maskDraft.length >= 3) {
      if (maskMode === 'wall') setWallMask({ points: maskDraft });
      if (maskMode === 'floor') setFloorMask({ points: maskDraft });
    }
    setMaskDraft([]);
    setMaskMode(null);
  }, [maskMode, maskDraft]);

  const zoomIn = useCallback(() => setScale((s) => Math.min(3, +(s + 0.1).toFixed(2))), []);
  const zoomOut = useCallback(() => setScale((s) => Math.max(0.2, +(s - 0.1).toFixed(2))), []);
  const zoomToFit = useCallback(() => { const el = boardRef.current; if (!el || !items.length) return setScale(1); const cw = el.clientWidth, ch = el.clientHeight; let minX=Infinity, minY=Infinity, maxX=-Infinity, maxY=-Infinity; for (const it of items) { minX = Math.min(minX, it.x); minY = Math.min(minY, it.y); maxX = Math.max(maxX, it.x + it.w); maxY = Math.max(maxY, it.y + it.h); } const bw = Math.max(1, maxX - minX), bh = Math.max(1, maxY - minY), padding = 40; const s = Math.min((cw - padding) / bw, (ch - padding) / bh); setScale(() => Math.max(0.2, Math.min(3, +s.toFixed(2)))); }, [items]);

  useEffect(() => { const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedId(null); if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) { setItems((prev) => prev.filter((it) => it.id !== selectedId)); setSelectedId(null); } if (e.key === '+' || (e.key === '=' && (e.ctrlKey || e.metaKey))) { e.preventDefault(); zoomIn(); } if (e.key === '-' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); zoomOut(); } }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [selectedId, zoomIn, zoomOut]);
  // Mask editing keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!maskMode) return;
      if (e.key.toLowerCase() === 'z' && (e.ctrlKey || e.metaKey)) {
        // undo last point in draft
        e.preventDefault();
        setMaskDraft((prev) => prev.slice(0, -1));
      }
      if (e.key === 'Enter') {
        // finish mask
        e.preventDefault();
        if (maskDraft.length >= 3) {
          if (maskMode === 'wall') setWallMask({ points: maskDraft });
          if (maskMode === 'floor') setFloorMask({ points: maskDraft });
        }
        setMaskDraft([]);
        setMaskMode(null);
      }
      if (e.key === 'Escape') {
        // cancel mask mode
        setMaskDraft([]);
        setMaskMode(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [maskMode, maskDraft]);
  const onWheel = useCallback((e: React.WheelEvent) => { if (e.ctrlKey) { e.preventDefault(); setScale((s) => Math.max(0.2, Math.min(3, +(s + (-e.deltaY / 500)).toFixed(2)))) } }, []);
  const snapN = useCallback((n: number) => (snap ? Math.round(n / gridSize) * gridSize : n), [snap, gridSize]);
  const bringToFront = useCallback(() => { if (!selectedId) return; setItems((prev) => { const maxZ = prev.reduce((m, it) => Math.max(m, it.z || 0), 0); const next = prev.map((it) => (it.id === selectedId ? { ...it, z: maxZ + 1 } : it)); pushHistory({ items: next, background, scale }); return next; }); }, [selectedId, pushHistory, background, scale]);
  const sendToBack = useCallback(() => { if (!selectedId) return; setItems((prev) => { const minZ = prev.reduce((m, it) => Math.min(m, it.z || 0), 0); const next = prev.map((it) => (it.id === selectedId ? { ...it, z: minZ - 1 } : it)); pushHistory({ items: next, background, scale }); return next; }); }, [selectedId, pushHistory, background, scale]);
  const toggleLock = useCallback(() => { if (!selectedId) return; setItems((prev) => { const next = prev.map((it) => (it.id === selectedId ? { ...it, locked: !it.locked } : it)); pushHistory({ items: next, background, scale }); return next; }); }, [selectedId, pushHistory, background, scale]);
  const duplicate = useCallback(() => { if (!selectedId) return; setItems((prev) => { const base = prev.find((i) => i.id === selectedId); if (!base) return prev; const maxZ = prev.reduce((m, it) => Math.max(m, it.z || 0), 0); const id = `dup-${Date.now()}-${Math.round(Math.random() * 1e6)}`; const next = [...prev, { ...base, id, x: base.x + 20, y: base.y + 20, z: maxZ + 1 }]; pushHistory({ items: next, background, scale }); return next; }); }, [selectedId, pushHistory, background, scale]);
  const insertFromUrl = useCallback(async () => { const url = window.prompt('Paste image URL to insert'); if (url) await addImage(url, 'Custom'); }, [addImage]);
  const alignCenter = useCallback((axis: 'x' | 'y') => { if (!selectedId || !boardRef.current) return; const cw = boardRef.current.clientWidth / (scale || 1); const ch = boardRef.current.clientHeight / (scale || 1); setItems((prev) => { const next = prev.map((it) => { if (it.id !== selectedId) return it; if (axis === 'x') return { ...it, x: Math.round((cw - it.w) / 2) }; return { ...it, y: Math.round((ch - it.h) / 2) }; }); pushHistory({ items: next, background, scale }); return next; }); }, [selectedId, scale, pushHistory, background]);
  const rotateSelected = useCallback((deg: number) => { if (!selectedId) return; setItems((prev) => { const next = prev.map((it) => (it.id === selectedId ? { ...it, rotation: Math.max(-180, Math.min(180, Math.round(deg))) } : it)); pushHistory({ items: next, background, scale }); return next; }); }, [selectedId, pushHistory, background, scale]);

  return (
    <main className="h-[calc(100vh-var(--app-header-height))] bg-gray-50">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[340px_1fr]">
        {/* Library Sidebar */}
        <aside className="border-r border-gray-200 bg-white flex flex-col min-h-0">
          <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200 bg-white/90 backdrop-blur z-20">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-900 text-white text-xs font-bold">NGC</span>
              <div>
                <div className="text-sm font-semibold text-gray-900">Product Library</div>
                <div className="text-xs text-gray-500">Search and add to canvas</div>
              </div>
            </div>
            <Link href="/" className="text-xs font-medium text-gray-600 hover:text-gray-900">Home</Link>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            {/* Upload Room Image */}
            <div className="p-3 border-b border-gray-200 bg-white/70">
              <div className="text-sm font-semibold text-gray-900 mb-2">Upload Room Image</div>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-xs text-gray-700 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-gray-300 file:bg-white file:text-gray-800 hover:file:bg-gray-50"
                onChange={async (e) => {
                  const f = e.currentTarget.files?.[0];
                  if (!f) return;
                  try {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const url = String(reader.result || '');
                      setBackground({ url, name: f.name, fit: 'cover' });
                      pushHistory();
                    };
                    reader.readAsDataURL(f);
                  } catch {}
                }}
              />
            </div>

            {/* Wall & Floor Design Controls */
            <div className="p-3 border-b border-gray-200 bg-white/70 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-900">Wall & Floor</div>
                <div className="text-xs text-gray-500">Horizon: {horizon}%</div>
              </div>
              <input type="range" min={20} max={80} value={horizon} onChange={(e) => setHorizon(parseInt(e.target.value, 10))} className="w-full" />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">Wall Color</div>
                  <input type="color" value={wallStyle.color || '#ffffff'} onChange={(e) => setWallStyle((s) => ({ ...s, color: e.target.value }))} />
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">Wall Opacity</div>
                  <input type="range" min={0} max={100} value={Math.round((wallStyle.opacity || 0) * 100)} onChange={(e) => setWallStyle((s) => ({ ...s, opacity: Math.round(Number(e.target.value)) / 100 }))} />
                </div>
                <div className="col-span-2 flex items-center gap-3">
                  <button className="px-2 py-1 border border-gray-300 rounded bg-white text-xs" onClick={() => { setMaskMode('wall'); setMaskDraft([]); }}>Edit Wall Mask</button>
                  <button className="px-2 py-1 border border-gray-300 rounded bg-white text-xs" onClick={() => setWallMask({ points: [] })}>Clear Wall Mask</button>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">Floor Color</div>
                  <input type="color" value={floorStyle.color || '#eaeaea'} onChange={(e) => setFloorStyle((s) => ({ ...s, color: e.target.value }))} />
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">Floor Opacity</div>
                  <input type="range" min={0} max={100} value={Math.round((floorStyle.opacity || 0) * 100)} onChange={(e) => setFloorStyle((s) => ({ ...s, opacity: Math.round(Number(e.target.value)) / 100 }))} />
                </div>
                <div className="col-span-2 flex items-center gap-3">
                  <button className="px-2 py-1 border border-gray-300 rounded bg-white text-xs" onClick={() => { setMaskMode('floor'); setMaskDraft([]); }}>Edit Floor Mask</button>
                  <button className="px-2 py-1 border border-gray-300 rounded bg-white text-xs" onClick={() => setFloorMask({ points: [] })}>Clear Floor Mask</button>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Wall Texture Repeat</label>
                  <input type="checkbox" checked={!!wallStyle.repeat} onChange={(e) => setWallStyle((s) => ({ ...s, repeat: e.target.checked }))} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Floor Texture Repeat</label>
                  <input type="checkbox" checked={!!floorStyle.repeat} onChange={(e) => setFloorStyle((s) => ({ ...s, repeat: e.target.checked }))} />
                </div>
              </div>
            </div>

            {/* Wall & Floor from Products */}
            <div className="p-3 border-b border-gray-200 bg-white/70 space-y-2">
              <div className="text-sm font-semibold text-gray-900">Walls & Floors from Products</div>
              <div className="text-xs text-gray-600">Pick any product image to apply as a wall or floor texture.</div>
              <div className="grid grid-cols-2 gap-3">
                {allProducts.filter(p => /wall|floor|tile|carpet/i.test(p.category || '')).slice(0, 8).map(p => (
                  <div key={p.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <div className="aspect-[4/3] relative bg-gray-100">
                      <NextImage src={p.image} alt={p.name} fill sizes="200px" className="object-cover" />
                    </div>
                    <div className="p-2 flex items-center justify-between gap-2">
                      <button className="flex-1 px-2 py-1 text-[11px] border border-gray-300 rounded-full bg-white hover:bg-gray-50" onClick={() => setWallStyle((s) => ({ ...s, texture: p.image, color: null }))}>Apply to Wall</button>
                      <button className="flex-1 px-2 py-1 text-[11px] border border-gray-300 rounded-full bg-white hover:bg-gray-50" onClick={() => setFloorStyle((s) => ({ ...s, texture: p.image, color: null }))}>Apply to Floor</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Furniture Catalog */}
            <ProductLibrary onInsert={mounted ? addImage : undefined} onSetBackground={mounted ? setBackgroundImage : undefined} disabled={!mounted} />
          </div>
        </aside>

        {/* Canvas */}
        <section className="relative bg-white min-h-0">
          {/* Top header overlay */}
          <div className="absolute inset-x-0 top-0 z-40">
            <div className="bg-gradient-to-b from-white/95 to-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-200 shadow-sm">
              <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                  <h1 className="text-base md:text-lg font-semibold text-gray-900">Moodboard Editor</h1>
                  <span className="hidden md:inline text-xs text-gray-500">Design your space with products and templates</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Quick actions */}
                  <button className="px-2.5 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs" onClick={undo} title="Undo">Undo</button>
                  <button className="px-2.5 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs" onClick={redo} title="Redo">Redo</button>
                  <button className="px-2.5 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs" onClick={addText} title="Add Text">Text</button>
                  <button className="px-2.5 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs" onClick={insertFromUrl} title="Insert Image by URL">Insert URL</button>
                  <span className="mx-1 h-5 w-px bg-gray-300" />
                  <button className="px-2.5 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800" onClick={zoomOut} title="Zoom out" aria-label="Zoom out"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                  <button className="px-2.5 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800" onClick={zoomIn} title="Zoom in" aria-label="Zoom in"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                  <button className="px-3 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs" onClick={zoomToFit}>Fit</button>
                  <span className="mx-1 h-5 w-px bg-gray-300" />
                  <div className="relative">
                    <button className="px-3 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs" onClick={() => setShowFileMenu((v) => !v)} aria-haspopup="menu" aria-expanded={showFileMenu}>File ▾</button>
                    {showFileMenu ? (
                      <div className="absolute right-0 mt-1 w-40 rounded-md border border-gray-200 bg-white shadow-lg z-50">
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { setShowFileMenu(false); handleExport(); }}>Export</button>
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { setShowFileMenu(false); handleSave(); }}>Save</button>
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { setShowFileMenu(false); handleLoad(); }}>Load</button>
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { setShowFileMenu(false); handleClear(); }}>Clear</button>
                        <button className="w-full text-left px-3 py-2 text-sm text-rose-700 hover:bg-rose-50" onClick={() => { setShowFileMenu(false); handleReset(); }}>Reset</button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom toolbar */}
          <div className="absolute inset-x-0 bottom-0 z-40">
            <div className="bg-gradient-to-t from-white/95 to-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-t border-gray-200">
              <div className="px-4 sm:px-6 lg:px-8 py-2 text-xs text-gray-700 flex items-center justify-between gap-3">
                <div className="hidden md:flex items-center gap-3 text-gray-600">
                  <span className="font-medium">Design your space with products and templates</span>
                  <span className="text-gray-300">·</span>
                  <span>ESC deselect</span>
                  <span className="text-gray-300">·</span>
                  <span>Ctrl+Scroll to zoom</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-2 px-2 py-1 border border-gray-300 rounded-full bg-white"><input type="checkbox" checked={snap} onChange={(e) => setSnap(e.target.checked)} /> Snap</label>
                  <label className="inline-flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-full bg-white">Grid<input type="number" className="w-14 border border-gray-200 rounded px-1 py-0.5" value={gridSize} min={5} max={100} step={5} onChange={(e) => setGridSize(Math.max(5, Math.min(100, Number(e.target.value)||20)))} /></label>
                  <div className="hidden sm:flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-full bg-white"><span>Rotate</span><input type="range" min={-180} max={180} step={1} disabled={!selectedId} className="w-24" onChange={(e) => rotateSelected(Number(e.currentTarget.value))} /></div>
                  <span className="mx-1 h-5 w-px bg-gray-300" />
                  <button className="px-3 py-1 rounded-full border border-gray-300 bg-white text-gray-800 disabled:opacity-50" disabled={!selectedId} onClick={() => alignCenter('x')}>Align H</button>
                  <button className="px-3 py-1 rounded-full border border-gray-300 bg-white text-gray-800 disabled:opacity-50" disabled={!selectedId} onClick={() => alignCenter('y')}>Align V</button>
                  <button className="px-3 py-1 rounded-full border border-gray-300 bg-white text-gray-800 disabled:opacity-50" disabled={!selectedId} onClick={bringToFront}>Front</button>
                  <button className="px-3 py-1 rounded-full border border-gray-300 bg-white text-gray-800 disabled:opacity-50" disabled={!selectedId} onClick={sendToBack}>Back</button>
                  <button className="px-3 py-1 rounded-full border border-gray-300 bg-white text-gray-800 disabled:opacity-50" disabled={!selectedId} onClick={toggleLock}>Lock/Unlock</button>
                  <button className="px-3 py-1 rounded-full border border-gray-300 bg-white text-gray-800 disabled:opacity-50" disabled={!selectedId} onClick={duplicate}>Duplicate</button>
                </div>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="pt-16 pb-12 h-full" onMouseDown={(e) => { if (e.target === boardRef.current) setSelectedId(null); }}>
            {!mounted ? (
              <div className="w-full h-full p-8">
                <div className="animate-pulse space-y-4">
                  <div className="h-8 w-1/3 bg-gray-200 rounded" />
                  <div className="h-64 bg-gray-200 rounded" />
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-24 bg-gray-200 rounded" />
                    <div className="h-24 bg-gray-200 rounded" />
                    <div className="h-24 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ) : (
              <div ref={boardRef} onWheel={onWheel} className="relative w-full h-full overflow-hidden bg-white">
                {showIntro ? (
                  <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to the Moodboard</h3>
                      <ol className="text-sm text-gray-700 space-y-1 mb-4 list-decimal list-inside">
                        <li>Browse the library and click Add to place images.</li>
                        <li>Drag to move; drag corners to resize. Use Snap for tidy layout.</li>
                        <li>Select an item to Align, reorder, Lock or Duplicate from the bottom bar.</li>
                        <li>Use the File menu (top right) to Save, Load or Export your board.</li>
                      </ol>
                      <div className="flex justify-end gap-2">
                        <button className="px-3 py-1.5 rounded-md border border-gray-300" onClick={() => setShowIntro(false)}>Close</button>
                        <button className="px-3 py-1.5 rounded-md bg-gray-900 text-white" onClick={() => { try { localStorage.setItem('moodboard_intro_dismissed','1'); } catch {}; setShowIntro(false); }}>Got it</button>
                      </div>
                    </div>
                  </div>
                ) : null}
                {/* Background room image */}
                <div className="absolute inset-0" style={{ backgroundImage: background.url ? `url(${background.url})` : undefined, backgroundSize: background.fit || 'cover', backgroundPosition: 'center', transform: `scale(${scale})`, transformOrigin: 'center center' }} />
                {/* Wall/Floor overlays */
                {(() => {
                  const wallHeight = `${horizon}%`;
                  const floorTop = `${horizon}%`;
                  const wallStyleCss: React.CSSProperties = {
                    top: 0,
                    height: wallHeight,
                    left: 0,
                    right: 0,
                    backgroundColor: wallStyle.color || undefined,
                    backgroundImage: wallStyle.texture ? `url(${wallStyle.texture})` : undefined,
                    backgroundSize: wallStyle.repeat ? `${Math.round(100 * (wallStyle.textureScale || 1))}% auto` : 'cover',
                    backgroundRepeat: wallStyle.repeat ? 'repeat' : 'no-repeat',
                    opacity: wallStyle.opacity,
                    pointerEvents: 'none',
                    clipPath: wallMask.points.length >= 3 ? `polygon(${wallMask.points.map(pt => `${pt.x}px ${pt.y}px`).join(',')})` : undefined,
                  };
                  const floorStyleCss: React.CSSProperties = {
                    top: floorTop,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: floorStyle.color || undefined,
                    backgroundImage: floorStyle.texture ? `url(${floorStyle.texture})` : undefined,
                    backgroundSize: floorStyle.repeat ? `${Math.round(100 * (floorStyle.textureScale || 1))}% auto` : 'cover',
                    backgroundRepeat: floorStyle.repeat ? 'repeat' : 'no-repeat',
                    opacity: floorStyle.opacity,
                    pointerEvents: 'none',
                    clipPath: floorMask.points.length >= 3 ? `polygon(${floorMask.points.map(pt => `${pt.x}px ${pt.y}px`).join(',')})` : undefined,
                  };
                  return (
                    <>
                      <div className="absolute" style={wallStyleCss} />
                      <div className="absolute" style={floorStyleCss} />
                    </>
                  );
                })()}
                {snap ? (<div className="absolute inset-0 pointer-events-none" style={{ backgroundSize: `${gridSize}px ${gridSize}px`, backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)`, transform: `scale(${scale})`, transformOrigin: 'center center' }} />) : null}
                <div
                  className="absolute inset-0"
                  onDragOver={onBoardDragOver}
                  onDrop={onBoardDrop}
                  onClick={onBoardClickForMask}
                  onDoubleClick={onBoardDoubleClick}
                  style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
                >
                  {/* Mask drafting overlay */}
                  {maskMode && maskDraft.length ? (
                    <svg className="absolute inset-0" width="100%" height="100%" style={{ pointerEvents: 'none' }}>
                      <polyline
                        points={maskDraft.map((p) => `${p.x},${p.y}`).join(' ')}
                        fill="none"
                        stroke={maskMode === 'wall' ? 'rgba(37, 99, 235, 0.8)' : 'rgba(16, 185, 129, 0.8)'}
                        strokeWidth={2}
                      />
                      {maskDraft.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r={3} fill={maskMode === 'wall' ? '#2563eb' : '#10b981'} />
                      ))}
                    </svg>
                  ) : null}
                  {items.slice().sort((a, b) => (a.z || 0) - (b.z || 0)).map((it) => (
                    <Rnd key={it.id} bounds="parent" size={{ width: it.w, height: it.h }} position={{ x: it.x, y: it.y }} onDragStart={() => setSelectedId(it.id)}
                      onDragStop={(e, d) => setItems((prev) => { const next = prev.map((p) => (p.id === it.id ? { ...p, x: snapN(Math.round(d.x)), y: snapN(Math.round(d.y)) } : p)); pushHistory({ items: next, background, scale }); return next; })}
                      onResizeStop={(e, dir, ref, delta, pos) => setItems((prev) => { const next = prev.map((p) => (p.id === it.id ? { ...p, w: snapN(Math.round(ref.offsetWidth)), h: snapN(Math.round(ref.offsetHeight)), x: snapN(Math.round(pos.x)), y: snapN(Math.round(pos.y)) } : p)); pushHistory({ items: next, background, scale }); return next; })}
                      enableResizing={{ top:true, right:true, bottom:true, left:true, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true }} style={{ zIndex: it.z || 0 }} scale={scale} disableDragging={it.locked} enableUserSelectHack={false}>
                      <div onMouseDown={() => setSelectedId(it.id)} className={`relative w-full h-full select-none ${selectedId === it.id ? 'ring-2 ring-gray-900 ring-offset-2 ring-offset-white' : ''}`} style={{ transform: `rotate(${it.rotation || 0}deg)` }}>
                        {it.type === 'image' && it.url ? (// eslint-disable-next-line @next/next/no-img-element
                          <img src={it.url} alt={it.name || 'Image'} className="w-full h-full object-contain pointer-events-none" />) : null}
                        {it.type === 'text' ? (
                          <textarea defaultValue={it.text || ''} onBlur={(e) => setItems((prev) => prev.map((p) => (p.id === it.id ? { ...p, text: e.currentTarget.value } : p)))} className="w-full h-full resize-none outline-none bg-transparent text-gray-900 p-2 text-center" style={{ fontSize: '20px' }} />
                        ) : null}
                        {selectedId === it.id ? (<button onClick={(e) => { e.stopPropagation(); setItems((prev) => prev.filter((p) => p.id !== it.id)); if (selectedId === it.id) setSelectedId(null); }} className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-white border border-gray-300 text-gray-700 shadow flex items-center justify-center text-xs" title="Delete">×</button>) : null}
                      </div>
                    </Rnd>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function MoodboardEditorPage() {
  return (
    <Suspense fallback={<main className="h-[calc(100vh-var(--app-header-height))] bg-gray-50"><div className="w-full h-full flex items-center justify-center text-gray-600">Loading…</div></main>}>
      <MoodboardEditorInner />
    </Suspense>
  );
}
