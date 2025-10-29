"use client";

import React, { useState, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { SectionTab } from 'polotno/side-panel';
import { ImagesGrid } from 'polotno/side-panel/images-grid';
import { allProducts } from '@/data/productsData';

export const ProductsPanel = observer(({ store }: { store: any }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    allProducts.forEach(product => {
      if (product.category) cats.add(product.category);
    });
    return Array.from(cats).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const images = filteredProducts.map(product => ({
    url: product.image,
    preview: product.image,
    title: product.name,
    category: product.category || '',
  }));

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        <ImagesGrid
          images={images}
          getPreview={(image: any) => image.preview}
          isLoading={false}
          onSelect={async (image: any, pos: any, element: any) => {
            if (element && element.type === 'image') {
              element.set({ src: image.url });
            } else {
              store.activePage?.addElement({
                type: 'image',
                src: image.url,
                width: 300,
                height: 300,
                x: pos?.x || 50,
                y: pos?.y || 50,
              });
            }
          }}
          rowsNumber={2}
        />
      </div>
      
      <div style={{ 
        padding: '10px', 
        borderTop: '1px solid #ccc',
        fontSize: '12px',
        color: '#666'
      }}>
        {filteredProducts.length} products
      </div>
    </div>
  );
});

ProductsPanel.displayName = 'ProductsPanel';

export const ProductsSection = {
  name: 'products',
  Tab: (props: any) => {
    const { active, ...rest } = props;
    return (
      <div 
        style={{ padding: '10px', cursor: 'pointer' }} 
        {...rest}
        className={active ? 'bp5-tab bp5-active' : 'bp5-tab'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <div style={{ marginTop: '5px', fontSize: '12px' }}>Products</div>
      </div>
    );
  },
  Panel: ProductsPanel,
};
