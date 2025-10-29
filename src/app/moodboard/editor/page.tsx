"use client";

import '@/lib/react-dom-polyfill';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { createStore } from 'polotno/model/store';
import { unstable_setAnimationsEnabled } from 'polotno/config';
import { allProducts } from '@/data/productsData';

unstable_setAnimationsEnabled(false);

const Workspace = dynamic(
  () => import('@/lib/polotno-workspace').then((mod) => mod.Workspace),
  { ssr: false }
);

export default function MoodboardEditorPage() {
  const [store] = useState(() =>
    createStore({
      key: 'NHUuVJMt0l3lqyb98cbF',
      showCredit: false,
    })
  );
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'templates' | 'products' | 'text' | 'shapes' | 'upload'>('templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [zoom, setZoom] = useState(1);

  const categories = useMemo(() => {
    const cats = new Set(allProducts.map(p => p.category));
    return ['All', ...Array.from(cats).sort()];
  }, []);

  const filteredProducts = useMemo(() => {
    let products = allProducts;
    
    if (selectedCategory && selectedCategory !== 'All') {
      products = products.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }
    
    return products;
  }, [searchQuery, selectedCategory]);

  const templates = [
    {
      id: 'walls-showcase',
      name: 'Walls Showcase',
      thumbnail: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=400&q=80',
      width: 1200,
      height: 800,
      background: '#f5f5f5',
    },
    {
      id: 'floors-display',
      name: 'Floors Display',
      thumbnail: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80',
      width: 1200,
      height: 800,
      background: '#ffffff',
    },
    {
      id: 'fabrics-collection',
      name: 'Fabrics Collection',
      thumbnail: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=400&q=80',
      width: 1200,
      height: 800,
      background: '#fafafa',
    },
    {
      id: 'room-mockup',
      name: 'Room Mockup',
      thumbnail: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80',
      width: 1600,
      height: 900,
      background: '#e8e8e8',
    },
    {
      id: 'presentation-board',
      name: 'Presentation Board',
      thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80',
      width: 1920,
      height: 1080,
      background: '#ffffff',
    },
    {
      id: 'square-layout',
      name: 'Square Layout',
      thumbnail: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=80',
      width: 1000,
      height: 1000,
      background: '#f0f0f0',
    },
  ];

  useEffect(() => {
    setMounted(true);
    
    if (store.pages.length === 0) {
      store.addPage({
        width: 1200,
        height: 800,
      });
    }
  }, [store]);

  const applyTemplate = useCallback((template: typeof templates[0]) => {
    store.clear();
    store.addPage({
      width: template.width,
      height: template.height,
      background: template.background,
    });

    const page = store.activePage;
    if (page && template.thumbnail) {
      page.addElement({
        type: 'image',
        src: template.thumbnail,
        x: 0,
        y: 0,
        width: template.width,
        height: template.height,
        selectable: false,
        opacity: 0.3,
      });
    }
  }, [store]);

  const addProductToCanvas = useCallback((imageUrl: string, name: string) => {
    const page = store.activePage;
    if (!page) return;

    page.addElement({
      type: 'image',
      src: imageUrl,
      x: 50,
      y: 50,
      width: 300,
      height: 300,
      name: name,
    });
  }, [store]);

  const addText = useCallback(() => {
    const page = store.activePage;
    if (!page) return;

    page.addElement({
      type: 'text',
      x: 50,
      y: 50,
      width: 300,
      fontSize: 32,
      text: 'Double-click to edit',
    });
  }, [store]);

  const addShape = useCallback((shapeType: 'rect' | 'circle' | 'triangle') => {
    const page = store.activePage;
    if (!page) return;

    const shapeConfig: any = {
      x: 50,
      y: 50,
      width: 200,
      height: 200,
      fill: '#3498db',
    };

    if (shapeType === 'rect') {
      page.addElement({ type: 'svg', ...shapeConfig });
    } else if (shapeType === 'circle') {
      page.addElement({ type: 'svg', ...shapeConfig, borderRadius: 100 });
    } else if (shapeType === 'triangle') {
      page.addElement({ type: 'svg', ...shapeConfig });
    }
  }, [store]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        addProductToCanvas(dataUrl, file.name);
      }
    };
    reader.readAsDataURL(file);
  }, [addProductToCanvas]);

  const handleExport = useCallback(async () => {
    const url = await store.toDataURL();
    const a = document.createElement('a');
    a.href = url;
    a.download = 'moodboard.png';
    a.click();
  }, [store]);

  const handleSave = useCallback(() => {
    const json = store.toJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'moodboard.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [store]);

  const handleLoad = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const json = event.target?.result as string;
        if (json) {
          store.loadJSON(json);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [store]);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.1, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.1, 0.1));
  }, []);

  const handleZoomFit = useCallback(() => {
    setZoom(1);
  }, []);

  const handleDelete = useCallback(() => {
    const selected = store.selectedElements;
    selected.forEach(el => el.remove());
  }, [store]);

  const handleDuplicate = useCallback(() => {
    const selected = store.selectedElements;
    selected.forEach(el => {
      const page = store.activePage;
      if (page) {
        page.addElement({
          ...el.toJSON(),
          x: el.x + 20,
          y: el.y + 20,
        });
      }
    });
  }, [store]);

  const handleBringForward = useCallback(() => {
    const selected = store.selectedElements[0];
    if (selected) {
      selected.set({ zIndex: (selected.zIndex || 0) + 1 });
    }
  }, [store]);

  const handleSendBackward = useCallback(() => {
    const selected = store.selectedElements[0];
    if (selected) {
      selected.set({ zIndex: Math.max(0, (selected.zIndex || 0) - 1) });
    }
  }, [store]);

  if (!mounted) {
    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
            Loading Moodboard Editor...
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Powered by Polotno
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <div style={{ 
        height: '60px', 
        backgroundColor: '#2c3e50',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
            NGC25 Moodboard Editor
          </h1>
          <div style={{ 
            fontSize: '11px', 
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '4px 8px',
            borderRadius: '4px',
          }}>
            Powered by Polotno
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={handleLoad}
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Load Project
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Save Project
          </button>
          <button
            onClick={handleExport}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3498db',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Export PNG
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <div style={{ width: '320px', backgroundColor: 'white', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', backgroundColor: '#fafafa' }}>
            {[
              { id: 'templates', label: 'Templates', icon: '📋' },
              { id: 'products', label: 'Products', icon: '🎨' },
              { id: 'text', label: 'Text', icon: 'T' },
              { id: 'shapes', label: 'Shapes', icon: '⬛' },
              { id: 'upload', label: 'Upload', icon: '📤' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  flex: 1,
                  padding: '12px 8px',
                  border: 'none',
                  backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
                  borderBottom: activeTab === tab.id ? '2px solid #3498db' : '2px solid transparent',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: activeTab === tab.id ? '600' : '400',
                  color: activeTab === tab.id ? '#2c3e50' : '#666',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '16px' }}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ flex: 1, overflow: 'auto', padding: '15px' }}>
            {activeTab === 'templates' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 15px 0' }}>
                  Custom Templates
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => applyTemplate(template)}
                      style={{
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', paddingTop: '60%', backgroundColor: '#f5f5f5' }}>
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                      <div style={{ padding: '12px' }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                          {template.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#666' }}>
                          {template.width} × {template.height}px
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 15px 0' }}>
                  Product Library
                </h3>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    marginBottom: '10px',
                  }}
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    marginBottom: '15px',
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => addProductToCanvas(product.image, product.name)}
                      style={{
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', paddingTop: '100%', backgroundColor: '#f5f5f5' }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                      <div style={{ padding: '8px' }}>
                        <div style={{ 
                          fontSize: '12px', 
                          fontWeight: '600',
                          marginBottom: '4px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {product.name}
                        </div>
                        <div style={{ 
                          fontSize: '10px', 
                          color: '#666',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {product.category}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {filteredProducts.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#999', fontSize: '14px' }}>
                    No products found
                  </div>
                )}
              </div>
            )}

            {activeTab === 'text' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 15px 0' }}>
                  Add Text
                </h3>
                <button
                  onClick={addText}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  Add Text Box
                </button>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                  Click to add a text box to your moodboard. Double-click the text to edit it.
                </p>
              </div>
            )}

            {activeTab === 'shapes' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 15px 0' }}>
                  Add Shapes
                </h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <button
                    onClick={() => addShape('rect')}
                    style={{
                      padding: '12px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                  >
                    Add Rectangle
                  </button>
                  <button
                    onClick={() => addShape('circle')}
                    style={{
                      padding: '12px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                  >
                    Add Circle
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'upload' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 15px 0' }}>
                  Upload Image
                </h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                  }}
                >
                  Choose File
                </label>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                  Upload your own images to add to the moodboard.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Canvas Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Toolbar */}
          <div style={{ 
            height: '50px', 
            backgroundColor: 'white', 
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 15px',
            gap: '10px',
          }}>
            <button
              onClick={() => store.history.undo()}
              disabled={!store.history.canUndo()}
              style={{
                padding: '6px 12px',
                backgroundColor: store.history.canUndo() ? '#ecf0f1' : '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: store.history.canUndo() ? 'pointer' : 'not-allowed',
                fontSize: '13px',
              }}
            >
              ↶ Undo
            </button>
            <button
              onClick={() => store.history.redo()}
              disabled={!store.history.canRedo()}
              style={{
                padding: '6px 12px',
                backgroundColor: store.history.canRedo() ? '#ecf0f1' : '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: store.history.canRedo() ? 'pointer' : 'not-allowed',
                fontSize: '13px',
              }}
            >
              ↷ Redo
            </button>
            <div style={{ width: '1px', height: '30px', backgroundColor: '#ddd', margin: '0 5px' }} />
            <button
              onClick={handleDelete}
              style={{
                padding: '6px 12px',
                backgroundColor: '#ecf0f1',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              🗑️ Delete
            </button>
            <button
              onClick={handleDuplicate}
              style={{
                padding: '6px 12px',
                backgroundColor: '#ecf0f1',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              📋 Duplicate
            </button>
            <button
              onClick={handleBringForward}
              style={{
                padding: '6px 12px',
                backgroundColor: '#ecf0f1',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              ⬆️ Forward
            </button>
            <button
              onClick={handleSendBackward}
              style={{
                padding: '6px 12px',
                backgroundColor: '#ecf0f1',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              ⬇️ Backward
            </button>
            <div style={{ flex: 1 }} />
            <button
              onClick={handleZoomOut}
              style={{
                padding: '6px 12px',
                backgroundColor: '#ecf0f1',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              −
            </button>
            <span style={{ fontSize: '13px', minWidth: '50px', textAlign: 'center' }}>
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              style={{
                padding: '6px 12px',
                backgroundColor: '#ecf0f1',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              +
            </button>
            <button
              onClick={handleZoomFit}
              style={{
                padding: '6px 12px',
                backgroundColor: '#ecf0f1',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Fit
            </button>
          </div>

          {/* Workspace */}
          <div style={{ flex: 1, backgroundColor: '#e8e8e8', overflow: 'hidden' }}>
            <Workspace store={store} />
          </div>
        </div>
      </div>
    </div>
  );
}
