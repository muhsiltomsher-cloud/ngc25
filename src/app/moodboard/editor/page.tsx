"use client";

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { allProducts } from '@/data/productsData';
import { MoodboardTemplate, ProductZone } from '@/data/templatesData';
import { Rnd } from 'react-rnd';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { ImprovedProductLibrary } from '@/components/moodboard/ImprovedProductLibrary';
import { WallFloorControls } from '@/components/moodboard/WallFloorControls';
import { UploadRoomImage } from '@/components/moodboard/UploadRoomImage';
import { SidebarSection } from '@/components/moodboard/ui/SidebarSection';
import { IconButton } from '@/components/moodboard/ui/IconButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/moodboard/ui/Toolbar';

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
  zoneId?: string;
  color?: string;
  material?: string;
};

type CustomizationState = {
  color?: string;
  texture?: string;
  size?: { width: number; height: number };
  material?: string;
  opacity?: number;
};

function MoodboardEditorInner() {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [items, setItems] = useState<BoardItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [background, setBackground] = useState<{ url: string | null; name?: string | null; fit?: 'cover' | 'contain' }>({ url: null, name: null, fit: 'cover' });
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try { return localStorage.getItem('moodboard_intro_dismissed') !== '1'; } catch { return true; }
  });
  
  const [template, setTemplate] = useState<MoodboardTemplate | null>(null);
  const [zones, setZones] = useState<ProductZone[]>([]);
  const [showZones, setShowZones] = useState(true);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);

  const [showCustomization, setShowCustomization] = useState(false);
  const [customization, setCustomization] = useState<CustomizationState>({});

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    try {
      const templateData = sessionStorage.getItem('selectedTemplate');
      const uploadedImage = sessionStorage.getItem('uploadedRoomImage');
      
      if (templateData) {
        const tmpl: MoodboardTemplate = JSON.parse(templateData);
        setTemplate(tmpl);
        setZones(tmpl.zones || []);
        if (tmpl.backgroundImage) {
          setBackground({ url: tmpl.backgroundImage, name: tmpl.name, fit: 'cover' });
        }
        if (tmpl.wallColor) {
          setWallStyle(prev => ({ ...prev, color: tmpl.wallColor || '#ffffff' }));
        }
        if (tmpl.floorColor) {
          setFloorStyle(prev => ({ ...prev, color: tmpl.floorColor || '#eaeaea' }));
        }
      } else if (uploadedImage) {
        setBackground({ url: uploadedImage, name: 'Uploaded Room', fit: 'cover' });
      }
    } catch (e) {
      console.error('Failed to load template', e);
    }
  }, [mounted]);

  const [snap, setSnap] = useState(true);
  const [gridSize, setGridSize] = useState(20);
  const [history, setHistory] = useState<{ items: typeof items; background: typeof background; scale: number; zones: typeof zones }[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const [horizon, setHorizon] = useState<number>(55);
  const [wallStyle, setWallStyle] = useState<{ color: string | null; texture: string | null; opacity: number; repeat?: boolean; textureScale?: number }>({ color: '#ffffff', texture: null, opacity: 0.35, repeat: false, textureScale: 1 });
  const [floorStyle, setFloorStyle] = useState<{ color: string | null; texture: string | null; opacity: number; repeat?: boolean; textureScale?: number }>({ color: '#eaeaea', texture: null, opacity: 0.35, repeat: true, textureScale: 1 });

  type Point = { x: number; y: number };
  const [wallMask, setWallMask] = useState<{ points: Point[] }>({ points: [] });
  const [floorMask, setFloorMask] = useState<{ points: Point[] }>({ points: [] });
  const [maskMode, setMaskMode] = useState<null | 'wall' | 'floor'>(null);
  const [maskDraft, setMaskDraft] = useState<Point[]>([]);

  const takeSnapshot = useCallback(() => ({ items: structuredClone(items), background: structuredClone(background), scale, zones: structuredClone(zones) }), [items, background, scale, zones]);
  const pushHistory = useCallback((snap?: { items: typeof items; background: typeof background; scale: number; zones: typeof zones }) => {
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
      if (s) { setItems(s.items); setBackground(s.background); setScale(s.scale); setZones(s.zones); }
      return n;
    });
  }, [history]);
  
  const redo = useCallback(() => {
    setHistoryIndex((idx) => {
      const n = Math.min(history.length - 1, idx + 1);
      const s = history[n];
      if (s) { setItems(s.items); setBackground(s.background); setScale(s.scale); setZones(s.zones); }
      return n;
    });
  }, [history]);

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
    
    let targetZoneId: string | undefined;
    for (const zone of zones) {
      const zoneX = (zone.x / 100) * (boardRef.current?.clientWidth || 1200);
      const zoneY = (zone.y / 100) * (boardRef.current?.clientHeight || 800);
      const zoneW = (zone.width / 100) * (boardRef.current?.clientWidth || 1200);
      const zoneH = (zone.height / 100) * (boardRef.current?.clientHeight || 800);
      
      if (pos.x >= zoneX && pos.x <= zoneX + zoneW && pos.y >= zoneY && pos.y <= zoneY + zoneH) {
        targetZoneId = zone.id;
        dims.w = Math.min(dims.w, zoneW * 0.9);
        dims.h = Math.min(dims.h, zoneH * 0.9);
        break;
      }
    }
    
    setItems((prev) => {
      const maxZ = prev.reduce((m, it) => Math.max(m, it.z || 0), 0);
      const id = `item-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
      const item: BoardItem = { id, type: 'image', x: Math.round(pos.x - dims.w / 2), y: Math.round(pos.y - dims.h / 2), w: dims.w, h: dims.h, url, name, z: maxZ + 1, zoneId: targetZoneId };
      const next: BoardItem[] = [...prev, item];
      pushHistory({ items: next, background, scale, zones });
      return next;
    });
  }, [scale, background, pushHistory, zones]);

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
      pushHistory({ items: next, background, scale, zones });
      return next;
    });
  }, [scale, background, pushHistory, zones]);

  const addText = useCallback(() => {
    const el = boardRef.current; const cw = el?.clientWidth ?? 1200; const ch = el?.clientHeight ?? 800; const w = 240, h = 80;
    const centerX = (cw / 2 - w / 2) / (scale || 1); const centerY = (ch / 2 - h / 2) / (scale || 1);
    setItems((prev) => {
      const maxZ = prev.reduce((m, it) => Math.max(m, it.z || 0), 0);
      const id = `text-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
      const item: BoardItem = { id, type: 'text', x: Math.round(centerX), y: Math.round(centerY), w, h, text: 'Double-click to edit', z: maxZ + 1 };
      const next: BoardItem[] = [...prev, item];
      pushHistory({ items: next, background, scale, zones });
      return next;
    });
  }, [scale, background, pushHistory, zones]);

  const setBackgroundImage = useCallback((url: string, name?: string) => { setBackground({ url, name, fit: 'cover' }); pushHistory(); }, [pushHistory]);
  
  const handleExport = useCallback(async () => {
    if (!boardRef.current) return;
    try {
      const dataUrl = await toPng(boardRef.current, { cacheBust: true, backgroundColor: '#ffffff' });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'moodboard.png';
      a.click();
    } catch (e) {
      console.error('Export failed', e);
    }
  }, []);

  const handleExportPDF = useCallback(async () => {
    if (!boardRef.current) return;
    try {
      const dataUrl = await toPng(boardRef.current, { cacheBust: true, backgroundColor: '#ffffff' });
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297;
      const imgHeight = 210;
      pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('moodboard.pdf');
    } catch (e) {
      console.error('PDF export failed', e);
    }
  }, []);

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
        zones,
        template: template ? { id: template.id, name: template.name } : null,
      };
      localStorage.setItem('moodboard_snapshot', JSON.stringify(payload));
      alert('Mood board saved successfully!');
    } catch {
      alert('Failed to save mood board');
    }
  }, [items, background, scale, horizon, wallStyle, floorStyle, wallMask, floorMask, zones, template]);

  const handleLoad = useCallback(() => {
    try {
      const raw = localStorage.getItem('moodboard_snapshot');
      if (!raw) return;
      const data = JSON.parse(raw || '{}');
      const { items: its, background: bg, scale: sc, horizon: hz, wallStyle: ws, floorStyle: fs, wallMask: wm, floorMask: fm, zones: zs } = data;
      if (Array.isArray(its)) setItems(its);
      if (bg && typeof bg === 'object') setBackground(bg);
      if (typeof sc === 'number') setScale(sc);
      if (typeof hz === 'number') setHorizon(hz);
      if (ws && typeof ws === 'object') setWallStyle(() => ({ ...ws }));
      if (fs && typeof fs === 'object') setFloorStyle(() => ({ ...fs }));
      if (wm && Array.isArray(wm.points)) setWallMask({ points: wm.points });
      if (fm && Array.isArray(fm.points)) setFloorMask({ points: fm.points });
      if (Array.isArray(zs)) setZones(zs);
    } catch {}
  }, []);

  const handleClear = useCallback(() => { setItems(() => { const next: BoardItem[] = []; pushHistory({ items: next, background, scale, zones }); return next; }); setSelectedId(null); }, [pushHistory, background, scale, zones]);
  const handleReset = useCallback(() => { try { localStorage.removeItem('moodboard_snapshot'); sessionStorage.removeItem('selectedTemplate'); sessionStorage.removeItem('uploadedRoomImage'); } catch {} setItems(() => { const next: BoardItem[] = []; pushHistory({ items: next, background: { url: null, name: null, fit: 'cover' }, scale: 1, zones: [] }); return next; }); setSelectedId(null); setBackground({ url: null, name: null, fit: 'cover' }); setScale(1); setZones([]); setTemplate(null); }, [pushHistory]);

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
        const { url, name } = JSON.parse(payload) as { url: string; name?: string; category?: string };
        await addImageAt(url, name, { x, y });
        return;
      }
    } catch {}
    const uri = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text/plain');
    if (uri) await addImageAt(uri, undefined, { x, y });
  }, [scale, addImageAt]);

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
  
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!maskMode) return;
      if (e.key.toLowerCase() === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setMaskDraft((prev) => prev.slice(0, -1));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (maskDraft.length >= 3) {
          if (maskMode === 'wall') setWallMask({ points: maskDraft });
          if (maskMode === 'floor') setFloorMask({ points: maskDraft });
        }
        setMaskDraft([]);
        setMaskMode(null);
      }
      if (e.key === 'Escape') {
        setMaskDraft([]);
        setMaskMode(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [maskMode, maskDraft]);

  const onWheel = useCallback((e: React.WheelEvent) => { if (e.ctrlKey) { e.preventDefault(); setScale((s) => Math.max(0.2, Math.min(3, +(s + (-e.deltaY / 500)).toFixed(2)))) } }, []);
  const snapN = useCallback((n: number) => (snap ? Math.round(n / gridSize) * gridSize : n), [snap, gridSize]);
  const bringToFront = useCallback(() => { if (!selectedId) return; setItems((prev) => { const maxZ = prev.reduce((m, it) => Math.max(m, it.z || 0), 0); const next = prev.map((it) => (it.id === selectedId ? { ...it, z: maxZ + 1 } : it)); pushHistory({ items: next, background, scale, zones }); return next; }); }, [selectedId, pushHistory, background, scale, zones]);
  const sendToBack = useCallback(() => { if (!selectedId) return; setItems((prev) => { const minZ = prev.reduce((m, it) => Math.min(m, it.z || 0), 0); const next = prev.map((it) => (it.id === selectedId ? { ...it, z: minZ - 1 } : it)); pushHistory({ items: next, background, scale, zones }); return next; }); }, [selectedId, pushHistory, background, scale, zones]);
  const toggleLock = useCallback(() => { if (!selectedId) return; setItems((prev) => { const next = prev.map((it) => (it.id === selectedId ? { ...it, locked: !it.locked } : it)); pushHistory({ items: next, background, scale, zones }); return next; }); }, [selectedId, pushHistory, background, scale, zones]);
  const duplicate = useCallback(() => { if (!selectedId) return; setItems((prev) => { const base = prev.find((i) => i.id === selectedId); if (!base) return prev; const maxZ = prev.reduce((m, it) => Math.max(m, it.z || 0), 0); const id = `dup-${Date.now()}-${Math.round(Math.random() * 1e6)}`; const next = [...prev, { ...base, id, x: base.x + 20, y: base.y + 20, z: maxZ + 1 }]; pushHistory({ items: next, background, scale, zones }); return next; }); }, [selectedId, pushHistory, background, scale, zones]);
  const insertFromUrl = useCallback(async () => { const url = window.prompt('Paste image URL to insert'); if (url) await addImage(url, 'Custom'); }, [addImage]);
  const alignCenter = useCallback((axis: 'x' | 'y') => { if (!selectedId || !boardRef.current) return; const cw = boardRef.current.clientWidth / (scale || 1); const ch = boardRef.current.clientHeight / (scale || 1); setItems((prev) => { const next = prev.map((it) => { if (it.id !== selectedId) return it; if (axis === 'x') return { ...it, x: Math.round((cw - it.w) / 2) }; return { ...it, y: Math.round((ch - it.h) / 2) }; }); pushHistory({ items: next, background, scale, zones }); return next; }); }, [selectedId, scale, pushHistory, background, zones]);
  const rotateSelected = useCallback((deg: number) => { if (!selectedId) return; setItems((prev) => { const next = prev.map((it) => (it.id === selectedId ? { ...it, rotation: Math.max(-180, Math.min(180, Math.round(deg))) } : it)); pushHistory({ items: next, background, scale, zones }); return next; }); }, [selectedId, pushHistory, background, scale, zones]);

  const applyCustomization = useCallback(() => {
    if (!selectedId) return;
    setItems((prev) => {
      const next = prev.map((it) => {
        if (it.id !== selectedId) return it;
        return {
          ...it,
          color: customization.color || it.color,
          material: customization.material || it.material,
          w: customization.size?.width || it.w,
          h: customization.size?.height || it.h,
        };
      });
      pushHistory({ items: next, background, scale, zones });
      return next;
    });
    setShowCustomization(false);
  }, [selectedId, customization, pushHistory, background, scale, zones]);

  const selectedItem = useMemo(() => items.find(it => it.id === selectedId), [items, selectedId]);

  return (
    <main className="h-[calc(100vh-var(--app-header-height))] bg-gray-50">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[340px_1fr]">
        <aside className="border-r border-gray-200 bg-white flex flex-col min-h-0">
          <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200 bg-white/90 backdrop-blur z-20">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-900 text-white text-xs font-bold">NGC</span>
              <div>
                <div className="text-sm font-semibold text-gray-900">Product Library</div>
                <div className="text-xs text-gray-500">Search and add to canvas</div>
              </div>
            </div>
            <Link href="/moodboard/templates" className="text-xs font-medium text-gray-600 hover:text-gray-900">Templates</Link>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto bg-gray-50">
            {template && (
              <SidebarSection
                title="Active Template"
                description={`${template.zones.length} product zones`}
                collapsible={false}
                action={
                  <button
                    onClick={() => setShowZones(!showZones)}
                    className="px-2 py-1 text-xs border border-gray-300 rounded bg-white hover:bg-gray-50"
                  >
                    {showZones ? 'Hide' : 'Show'}
                  </button>
                }
              >
                <div className="text-xs text-gray-700">{template.name}</div>
              </SidebarSection>
            )}

            <UploadRoomImage
              onUpload={async (e) => {
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
              disabled={!mounted}
            />

            <WallFloorControls
              horizon={horizon}
              onHorizonChange={setHorizon}
              wallColor={wallStyle.color || '#ffffff'}
              onWallColorChange={(color) => setWallStyle((s) => ({ ...s, color }))}
              wallOpacity={Math.round((wallStyle.opacity || 0) * 100)}
              onWallOpacityChange={(opacity) => setWallStyle((s) => ({ ...s, opacity: opacity / 100 }))}
              wallTextureRepeat={!!wallStyle.repeat}
              onWallTextureRepeatChange={(repeat) => setWallStyle((s) => ({ ...s, repeat }))}
              floorColor={floorStyle.color || '#eaeaea'}
              onFloorColorChange={(color) => setFloorStyle((s) => ({ ...s, color }))}
              floorOpacity={Math.round((floorStyle.opacity || 0) * 100)}
              onFloorOpacityChange={(opacity) => setFloorStyle((s) => ({ ...s, opacity: opacity / 100 }))}
              floorTextureRepeat={!!floorStyle.repeat}
              onFloorTextureRepeatChange={(repeat) => setFloorStyle((s) => ({ ...s, repeat }))}
              onEditWallMask={() => { setMaskMode('wall'); setMaskDraft([]); }}
              onClearWallMask={() => setWallMask({ points: [] })}
              onEditFloorMask={() => { setMaskMode('floor'); setMaskDraft([]); }}
              onClearFloorMask={() => setFloorMask({ points: [] })}
              disabled={!mounted}
            />

            <SidebarSection
              title="Quick Apply Textures"
              description="Apply product images to walls and floors"
              collapsible={true}
              defaultOpen={false}
            >
              <div className="grid grid-cols-2 gap-2">
                {allProducts.filter(p => /wall|floor|tile|carpet/i.test(p.category || '')).slice(0, 8).map(p => (
                  <div key={p.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] relative bg-gray-100">
                      <NextImage src={p.image} alt={p.name} fill sizes="150px" className="object-cover" />
                    </div>
                    <div className="p-1.5 flex items-center justify-between gap-1">
                      <button className="flex-1 px-1.5 py-1 text-[10px] border border-gray-300 rounded bg-white hover:bg-gray-50" onClick={() => setWallStyle((s) => ({ ...s, texture: p.image, color: null }))}>Wall</button>
                      <button className="flex-1 px-1.5 py-1 text-[10px] border border-gray-300 rounded bg-white hover:bg-gray-50" onClick={() => setFloorStyle((s) => ({ ...s, texture: p.image, color: null }))}>Floor</button>
                    </div>
                  </div>
                ))}
              </div>
            </SidebarSection>

            <div className="border-t-4 border-gray-200">
              <ImprovedProductLibrary
                onInsert={mounted ? addImage : undefined}
                onSetBackground={mounted ? setBackgroundImage : undefined}
                disabled={!mounted}
              />
            </div>
          </div>
        </aside>

        <section className="relative bg-white min-h-0">
          <div className="absolute inset-x-0 top-0 z-40">
            <div className="bg-gradient-to-b from-white/95 to-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-200 shadow-sm">
              <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                  <h1 className="text-base md:text-lg font-semibold text-gray-900">Moodboard Editor</h1>
                  <span className="hidden md:inline text-xs text-gray-500">Design your space with products and templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2.5 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs" onClick={undo} title="Undo">Undo</button>
                  <button className="px-2.5 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs" onClick={redo} title="Redo">Redo</button>
                  <button className="px-2.5 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs" onClick={addText} title="Add Text">Text</button>
                  <button className="px-2.5 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs" onClick={insertFromUrl} title="Insert Image by URL">Insert URL</button>
                  {selectedId && (
                    <button className="px-2.5 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs" onClick={() => setShowCustomization(true)} title="Customize">Customize</button>
                  )}
                  <span className="mx-1 h-5 w-px bg-gray-300" />
                  <button className="px-2.5 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800" onClick={zoomOut} title="Zoom out" aria-label="Zoom out"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                  <button className="px-2.5 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800" onClick={zoomIn} title="Zoom in" aria-label="Zoom in"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                  <button className="px-3 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs" onClick={zoomToFit}>Fit</button>
                  <span className="mx-1 h-5 w-px bg-gray-300" />
                  <div className="relative">
                    <button className="px-3 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs" onClick={() => setShowFileMenu((v) => !v)} aria-haspopup="menu" aria-expanded={showFileMenu}>File ▾</button>
                    {showFileMenu ? (
                      <div className="absolute right-0 mt-1 w-40 rounded-md border border-gray-200 bg-white shadow-lg z-50">
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { setShowFileMenu(false); setShowExportModal(true); }}>Export</button>
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { setShowFileMenu(false); handleSave(); }}>Save</button>
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { setShowFileMenu(false); handleLoad(); }}>Load</button>
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { setShowFileMenu(false); setShowShareModal(true); }}>Share</button>
                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { setShowFileMenu(false); handleClear(); }}>Clear</button>
                        <button className="w-full text-left px-3 py-2 text-sm text-rose-700 hover:bg-rose-50" onClick={() => { setShowFileMenu(false); handleReset(); }}>Reset</button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                        <li>Click Templates to choose from pre-designed layouts with product zones.</li>
                      </ol>
                      <div className="flex justify-end gap-2">
                        <button className="px-3 py-1.5 rounded-md border border-gray-300" onClick={() => setShowIntro(false)}>Close</button>
                        <button className="px-3 py-1.5 rounded-md bg-gray-900 text-white" onClick={() => { try { localStorage.setItem('moodboard_intro_dismissed','1'); } catch {}; setShowIntro(false); }}>Got it</button>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="absolute inset-0" style={{ backgroundImage: background.url ? `url(${background.url})` : undefined, backgroundSize: background.fit || 'cover', backgroundPosition: 'center', transform: `scale(${scale})`, transformOrigin: 'center center' }} />
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
                
                {showZones && zones.length > 0 && (
                  <div className="absolute inset-0 pointer-events-none" style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
                    {zones.map((zone) => {
                      const zoneStyle: React.CSSProperties = {
                        position: 'absolute',
                        left: `${zone.x}%`,
                        top: `${zone.y}%`,
                        width: `${zone.width}%`,
                        height: `${zone.height}%`,
                        border: selectedZoneId === zone.id ? '3px dashed #2563eb' : '2px dashed rgba(0,0,0,0.3)',
                        backgroundColor: selectedZoneId === zone.id ? 'rgba(37, 99, 235, 0.1)' : 'rgba(0,0,0,0.05)',
                        pointerEvents: 'auto',
                        cursor: 'pointer',
                      };
                      return (
                        <div
                          key={zone.id}
                          style={zoneStyle}
                          onClick={() => setSelectedZoneId(zone.id === selectedZoneId ? null : zone.id)}
                          title={zone.label}
                        >
                          <div className="absolute top-1 left-1 bg-white/90 px-2 py-1 rounded text-xs font-medium text-gray-900">
                            {zone.label}
                          </div>
                          {zone.category && (
                            <div className="absolute bottom-1 left-1 bg-white/90 px-2 py-0.5 rounded text-[10px] text-gray-600">
                              {zone.category}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div
                  className="absolute inset-0"
                  onDragOver={onBoardDragOver}
                  onDrop={onBoardDrop}
                  onClick={onBoardClickForMask}
                  onDoubleClick={onBoardDoubleClick}
                  style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
                >
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
                      onDragStop={(e, d) => setItems((prev) => { const next = prev.map((p) => (p.id === it.id ? { ...p, x: snapN(Math.round(d.x)), y: snapN(Math.round(d.y)) } : p)); pushHistory({ items: next, background, scale, zones }); return next; })}
                      onResizeStop={(e, dir, ref, delta, pos) => setItems((prev) => { const next = prev.map((p) => (p.id === it.id ? { ...p, w: snapN(Math.round(ref.offsetWidth)), h: snapN(Math.round(ref.offsetHeight)), x: snapN(Math.round(pos.x)), y: snapN(Math.round(pos.y)) } : p)); pushHistory({ items: next, background, scale, zones }); return next; })}
                      enableResizing={{ top:true, right:true, bottom:true, left:true, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true }} style={{ zIndex: it.z || 0 }} scale={scale} disableDragging={it.locked} enableUserSelectHack={false}>
                      <div onMouseDown={() => setSelectedId(it.id)} className={`relative w-full h-full select-none ${selectedId === it.id ? 'ring-2 ring-gray-900 ring-offset-2 ring-offset-white' : ''}`} style={{ transform: `rotate(${it.rotation || 0}deg)`, filter: it.color ? `hue-rotate(${it.color})` : undefined }}>
                        {it.type === 'image' && it.url ? (
                          <NextImage src={it.url} alt={it.name || 'Image'} fill className="object-contain pointer-events-none" />
                        ) : null}
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

      {showCustomization && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowCustomization(false)}>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Customize Product</h2>
              <p className="text-sm text-gray-600 mt-1">{selectedItem.name || 'Selected Item'}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color Adjustment</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={customization.color || '0'}
                  onChange={(e) => setCustomization(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Hue rotation: {customization.color || 0}°</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                <select
                  value={customization.material || ''}
                  onChange={(e) => setCustomization(prev => ({ ...prev, material: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Default</option>
                  <option value="wood">Wood</option>
                  <option value="metal">Metal</option>
                  <option value="leather">Leather</option>
                  <option value="fabric">Fabric</option>
                  <option value="glass">Glass</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600">Width</label>
                    <input
                      type="number"
                      value={customization.size?.width || selectedItem.w}
                      onChange={(e) => setCustomization(prev => ({ ...prev, size: { ...prev.size, width: Number(e.target.value), height: prev.size?.height || selectedItem.h } }))}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Height</label>
                    <input
                      type="number"
                      value={customization.size?.height || selectedItem.h}
                      onChange={(e) => setCustomization(prev => ({ ...prev, size: { width: prev.size?.width || selectedItem.w, height: Number(e.target.value) } }))}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowCustomization(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={applyCustomization}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-black"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowExportModal(false)}>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Export Mood Board</h2>
              <p className="text-sm text-gray-600 mt-1">Choose your export format</p>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={() => { handleExport(); setShowExportModal(false); }}
                className="w-full px-4 py-3 text-left border-2 border-gray-300 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all"
              >
                <div className="font-medium text-gray-900">Export as PNG</div>
                <div className="text-sm text-gray-600">High-resolution image file</div>
              </button>
              <button
                onClick={() => { handleExportPDF(); setShowExportModal(false); }}
                className="w-full px-4 py-3 text-left border-2 border-gray-300 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all"
              >
                <div className="font-medium text-gray-900">Export as PDF</div>
                <div className="text-sm text-gray-600">Printable document format</div>
              </button>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowExportModal(false)}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowShareModal(false)}>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Share Mood Board</h2>
              <p className="text-sm text-gray-600 mt-1">Share on social media</p>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={async () => {
                  if (!boardRef.current) return;
                  try {
                    await toPng(boardRef.current, { cacheBust: true, backgroundColor: '#ffffff' });
                    const text = 'Check out my mood board created with NGC! #InteriorDesign #MoodBoard #NGC';
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`, '_blank');
                  } catch (e) {
                    console.error('Share failed', e);
                  }
                }}
                className="w-full px-4 py-3 text-left border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">f</div>
                <div>
                  <div className="font-medium text-gray-900">Facebook</div>
                  <div className="text-sm text-gray-600">Share on Facebook</div>
                </div>
              </button>
              <button
                onClick={async () => {
                  if (!boardRef.current) return;
                  try {
                    await toPng(boardRef.current, { cacheBust: true, backgroundColor: '#ffffff' });
                    const text = 'Check out my mood board! #InteriorDesign #MoodBoard #NGC';
                    window.open(`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(text)}`, '_blank');
                  } catch (e) {
                    console.error('Share failed', e);
                  }
                }}
                className="w-full px-4 py-3 text-left border-2 border-gray-300 rounded-lg hover:border-red-600 hover:bg-red-50 transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">P</div>
                <div>
                  <div className="font-medium text-gray-900">Pinterest</div>
                  <div className="text-sm text-gray-600">Pin to Pinterest</div>
                </div>
              </button>
              <button
                onClick={async () => {
                  if (!boardRef.current) return;
                  try {
                    const dataUrl = await toPng(boardRef.current, { cacheBust: true, backgroundColor: '#ffffff' });
                    const a = document.createElement('a');
                    a.href = dataUrl;
                    a.download = 'moodboard-for-instagram.png';
                    a.click();
                    alert('Image downloaded! You can now upload it to Instagram with hashtags: #InteriorDesign #MoodBoard #NGC');
                  } catch (e) {
                    console.error('Share failed', e);
                  }
                }}
                className="w-full px-4 py-3 text-left border-2 border-gray-300 rounded-lg hover:border-pink-600 hover:bg-pink-50 transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">IG</div>
                <div>
                  <div className="font-medium text-gray-900">Instagram</div>
                  <div className="text-sm text-gray-600">Download for Instagram</div>
                </div>
              </button>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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
