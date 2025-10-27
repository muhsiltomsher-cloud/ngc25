﻿// src/data/productsData.ts

export type ProductViewKey = 'installed' | 'room' | 'swatch';

export interface ProductViews {
  installed?: string[];
  room?: string[];
  swatch?: string[];
}

export interface ProductVariation {
  id: string;
  name: string;
  image: string;
  swatch?: string;
  gallery?: string[];
  views?: ProductViews;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  gallery?: string[];
  views?: ProductViews;
  description: string;
  brandKey: string;
  category: string;
  segment: string;
  subCategory: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  price: number;
  currency: string;
  sku: string;
  availability: {
    type: 'seats' | 'tickets' | 'items';
    quantity: number;
  };
  tags: string[];
  isFeatured: boolean;
  rating?: number;
  reviewCount?: number;
  duration?: string;
  eventDate?: string;
  venue?: string;
  details?: {
    ageGroup?: string;
    instructor?: string;
    whatToBring?: string[];
  };
  variations?: ProductVariation[];
  relatedProductIds?: string[];
}

export const allProducts: Product[] = [
  {
    id: 'ac-skyline-panel',
    name: 'Skyline Midnight Panel',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'Silk-backed mural panels layered with graphite geometrics, engineered for double-height installations without visible seams.',
    brandKey: 'armani-casa',
    category: 'Wallcovering Panels',
    segment: 'Luxury Hospitality',
    subCategory: 'Panoramic',
    price: 870,
    currency: 'AED',
    sku: 'AC-PANEL-001',
    availability: { type: 'items', quantity: 12 },
    tags: ['silk', 'mural', 'seamless'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 42,
    details: {
      whatToBring: ['Site survey measurements'],
    },
    variations: [
      {
        id: 'midnight-graphite',
        name: 'Midnight Graphite',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
        swatch: '#1E293B',
        gallery: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
        ],
        views: {
          installed: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
          ],
          room: [
            'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80',
          ],
          swatch: [
            'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80',
          ],
        },
      },
      {
        id: 'soft-dawn',
        name: 'Soft Dawn',
        image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#C7BBA4',
        gallery: [
          'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
        ],
        views: {
          installed: [
            'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
          ],
          room: [
            'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80',
          ],
          swatch: [
            'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80',
          ],
        },
      },
      {
        id: 'copper-fade',
        name: 'Copper Fade',
        image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#B06E45',
        gallery: [
          'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
        ],
        views: {
          installed: [
            'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
          ],
          room: [
            'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80',
          ],
          swatch: [
            'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80',
          ],
        },
      },
    ],
    relatedProductIds: ['ac-emerald-cut', 'om-oase', 'pj-linen-loft'],
  },
  {
    id: 'ac-emerald-cut',
    name: 'Emerald Cut Velour',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'Cut-velvet wallcovering with tonal embossing and acoustic felt backing for private lounges and executive suites.',
    brandKey: 'armani-casa',
    category: 'Textile Wallcovering',
    segment: 'Residential Signature',
    subCategory: 'Velour',
    price: 420,
    currency: 'AED',
    sku: 'AC-VELVET-102',
    availability: { type: 'items', quantity: 24 },
    tags: ['velvet', 'acoustic'],
    isFeatured: false,
    rating: 4.7,
    reviewCount: 35,
    variations: [
      {
        id: 'emerald-depth',
        name: 'Emerald Depth',
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
        swatch: '#014437',
        gallery: [
          'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'sapphire-night',
        name: 'Sapphire Night',
        image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80',
        swatch: '#1D3A70',
        gallery: [
          'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
        ],
      },
    ],
    relatedProductIds: ['ac-skyline-panel', 'ac-archway-relief', 'om-light-night'],
  },
  {
    id: 'ac-archway-relief',
    name: 'Archway Relief Stucco',
    image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'Hand-trowelled plaster panels with sculpted arch motifs, supplied in custom sizes with concealed joining profiles.',
    brandKey: 'armani-casa',
    category: 'Textured Plaster',
    segment: 'Corporate Suites',
    subCategory: 'Stucco',
    price: 980,
    currency: 'AED',
    sku: 'AC-STUCCO-205',
    availability: { type: 'items', quantity: 8 },
    tags: ['plaster', 'feature-wall'],
    isFeatured: true,
    rating: 5,
    reviewCount: 18,
    variations: [
      {
        id: 'stone-neutral',
        name: 'Stone Neutral',
        image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80',
        swatch: '#D2C7B8',
        gallery: [
          'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'powder-sand',
        name: 'Powder Sand',
        image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#E3D7C8',
        gallery: [
          'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
        ],
      },
    ],
    relatedProductIds: ['ac-panorama-silk', 'ac-emerald-cut', 'arte-sculpted'],
  },
  {
    id: 'ac-panorama-silk',
    name: 'Atelier Panorama Silk',
    image: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'Silk murals depicting mineral washes, delivered in numbered drops with protective coating for luxury residences.',
    brandKey: 'armani-casa',
    category: 'Wallcovering Panels',
    segment: 'Luxury Residence',
    subCategory: 'Panoramic',
    price: 1150,
    currency: 'AED',
    sku: 'AC-PANEL-310',
    availability: { type: 'items', quantity: 6 },
    tags: ['silk', 'hand-painted'],
    isFeatured: false,
    rating: 4.8,
    reviewCount: 22,
    variations: [
      {
        id: 'blush-mist',
        name: 'Blush Mist',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
        swatch: '#E2C1AE',
        gallery: [
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'teal-horizon',
        name: 'Teal Horizon',
        image: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80',
        swatch: '#3D6F7A',
        gallery: [
          'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80',
        ],
      },
    ],
    relatedProductIds: ['ac-skyline-panel', 'om-edition-linen'],
  },
  {
    id: 'om-oase',
    name: 'Oase Mineral Gradient',
    image: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'Non-woven wallcovering with iridescent pigments inspired by tidal flats for wellness retreats and spa corridors.',
    brandKey: 'omexco',
    category: 'Non-woven Wallcovering',
    segment: 'Wellness & Spa',
    subCategory: 'Gradient',
    price: 320,
    currency: 'AED',
    sku: 'OM-NW-401',
    availability: { type: 'items', quantity: 40 },
    tags: ['gradient', 'spa'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 63,
    variations: [
      {
        id: 'lagoon',
        name: 'Lagoon',
        image: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80',
        swatch: '#95BAC2',
        gallery: [
          'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'dusk',
        name: 'Dusk',
        image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80',
        swatch: '#B6A8A1',
        gallery: [
          'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80',
        ],
      },
    ],
    relatedProductIds: ['om-light-night', 'om-archipelago', 'ac-emerald-cut'],
  },
  {
    id: 'ac-emerald-cut-geo',
    name: 'Emerald Cut Geometric',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=80',
    ],
    description: 'Faceted pattern wallcovering with subtle sheen for signature feature walls.',
    brandKey: 'armani-casa',
    category: 'Wallcovering',
    segment: 'Luxury Hospitality',
    subCategory: 'Geometric',
    price: 520,
    currency: 'AED',
    sku: 'AC-WC-202',
    availability: { type: 'items', quantity: 24 },
    tags: ['geometric', 'feature', 'sheen'],
    isFeatured: false,
    rating: 4.7,
    reviewCount: 18,
    relatedProductIds: ['ac-skyline-panel', 'ac-panorama-silk']
  },
  {
    id: 'arte-sculpted',
    name: 'Sculpted Mineral Relief',
    image: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Embossed wall panel with hand-textured mineral look for galleries and lobbies.',
    brandKey: 'arte',
    category: 'Wall Panels',
    segment: 'Corporate',
    subCategory: 'Embossed',
    price: 980,
    currency: 'AED',
    sku: 'AR-PNL-011',
    availability: { type: 'items', quantity: 8 },
    tags: ['embossed', 'gallery', 'mineral'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 12,
    relatedProductIds: ['ac-skyline-panel']
  },
  {
    id: 'om-light-night',
    name: 'Light Night Weave',
    image: 'https://images.unsplash.com/photo-1493669928585-85d5193d9d3f?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493669928585-85d5193d9d3f?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Non-woven textured weave suitable for calm lounge environments.',
    brandKey: 'omexco',
    category: 'Non-woven Wallcovering',
    segment: 'Hospitality',
    subCategory: 'Weave',
    price: 260,
    currency: 'AED',
    sku: 'OM-NW-210',
    availability: { type: 'items', quantity: 55 },
    tags: ['weave', 'calm'],
    isFeatured: false,
    relatedProductIds: ['om-oase']
  },
  {
    id: 'om-archipelago',
    name: 'Archipelago Grass Cloth',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Natural grass cloth wallcovering with irregular textures and warm tones.',
    brandKey: 'omexco',
    category: 'Grasscloth',
    segment: 'Residential',
    subCategory: 'Natural Fiber',
    price: 440,
    currency: 'AED',
    sku: 'OM-GC-008',
    availability: { type: 'items', quantity: 22 },
    tags: ['natural', 'fiber', 'warm'],
    isFeatured: false,
    relatedProductIds: ['om-oase']
  },
  {
    id: 'om-edition-linen',
    name: 'Edition Linen Blend',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Premium linen-blend wallcovering for refined residences.',
    brandKey: 'omexco',
    category: 'Textile Wallcovering',
    segment: 'Luxury Residence',
    subCategory: 'Linen',
    price: 690,
    currency: 'AED',
    sku: 'OM-TX-301',
    availability: { type: 'items', quantity: 14 },
    tags: ['linen', 'textile'],
    isFeatured: true,
    relatedProductIds: ['ac-panorama-silk']
  },
  {
    id: 'wv-woven-vinyl-ash',
    name: 'Woven Vinyl Ash Weave',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Durable woven vinyl tiles with an ash-gray weave for high-traffic zones.',
    brandKey: 'woven-vinyl',
    category: 'Flooring',
    segment: 'Workspace',
    subCategory: 'Vinyl Tiles',
    price: 145,
    currency: 'AED',
    sku: 'WV-ASH-101',
    availability: { type: 'items', quantity: 120 },
    tags: ['vinyl', 'woven', 'tiles'],
    isFeatured: true,
    relatedProductIds: []
  },
  {
    id: 'lvt-oak-herringbone',
    name: 'LVT Oak Herringbone',
    image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Luxury vinyl planks in classic herringbone pattern with oak finish.',
    brandKey: 'lvt',
    category: 'Flooring',
    segment: 'Hospitality',
    subCategory: 'LVT',
    price: 210,
    currency: 'AED',
    sku: 'LVT-OAK-HB',
    availability: { type: 'items', quantity: 200 },
    tags: ['lvt', 'oak', 'herringbone'],
    isFeatured: false,
    relatedProductIds: []
  },
  {
    id: 'rug-hand-tufted-sand',
    name: 'Hand-Tufted Sand Rug',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Soft hand-tufted rug in warm sand tone for lounges and suites.',
    brandKey: 'rug',
    category: 'Rug',
    segment: 'Residential',
    subCategory: 'Hand Tufted',
    price: 980,
    currency: 'AED',
    sku: 'RUG-HT-SAND',
    availability: { type: 'items', quantity: 10 },
    tags: ['rug', 'hand-tufted'],
    isFeatured: false,
    relatedProductIds: []
  },
  {
    id: 'ode-sheer-cloud',
    name: 'ODE Sheer Cloud',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Lightweight sheer fabric with diffused light for airy interiors.',
    brandKey: 'ode',
    category: 'Sheer Fabric',
    segment: 'Residential',
    subCategory: 'Sheers',
    price: 95,
    currency: 'AED',
    sku: 'ODE-SHR-001',
    availability: { type: 'items', quantity: 350 },
    tags: ['sheer', 'curtain', 'light'],
    isFeatured: true,
    relatedProductIds: []
  },
  {
    id: 'upholstery-luxe-graphite',
    name: 'Upholstery Luxe Graphite',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Durable upholstery textile with deep graphite tone and soft hand.',
    brandKey: 'fabric',
    category: 'Upholstery',
    segment: 'Corporate',
    subCategory: 'Woven',
    price: 180,
    currency: 'AED',
    sku: 'UPH-LUX-GR',
    availability: { type: 'items', quantity: 90 },
    tags: ['upholstery', 'graphite'],
    isFeatured: false,
    relatedProductIds: []
  },
  {
    id: 'kids-wall-safari',
    name: 'Kids Wall Safari',
    image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Playful kids wall mural with safari motifs for bedrooms and playrooms.',
    brandKey: 'kids-wall',
    category: 'Wall Mural',
    segment: 'Education',
    subCategory: 'Kids',
    price: 320,
    currency: 'AED',
    sku: 'KW-SFR-77',
    availability: { type: 'items', quantity: 60 },
    tags: ['kids', 'mural'],
    isFeatured: false,
    relatedProductIds: []
  },
  {
    id: 'pj-linen-loft',
    name: 'Linen Loft Natural',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Premium natural linen wallcovering with subtle texture for sophisticated interiors.',
    brandKey: 'phillip-jeffries',
    category: 'Textile Wallcovering',
    segment: 'Luxury Residence',
    subCategory: 'Linen',
    price: 720,
    currency: 'AED',
    sku: 'PJ-LN-001',
    availability: { type: 'items', quantity: 18 },
    tags: ['linen', 'natural', 'texture'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 28,
    relatedProductIds: ['om-edition-linen', 'ac-panorama-silk', 'pj-silk-shimmer']
  },
  {
    id: 'pj-silk-shimmer',
    name: 'Silk Shimmer Pearl',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Lustrous silk wallcovering with pearl shimmer for luxury hospitality spaces.',
    brandKey: 'phillip-jeffries',
    category: 'Textile Wallcovering',
    segment: 'Luxury Hospitality',
    subCategory: 'Linen',
    price: 890,
    currency: 'AED',
    sku: 'PJ-SLK-002',
    availability: { type: 'items', quantity: 12 },
    tags: ['silk', 'shimmer', 'luxury'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 35,
    relatedProductIds: ['pj-linen-loft', 'ac-panorama-silk', 'om-edition-linen']
  },
  {
    id: 'pj-grasscloth-bamboo',
    name: 'Grasscloth Bamboo Weave',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Authentic bamboo grasscloth with natural variations for organic interiors.',
    brandKey: 'phillip-jeffries',
    category: 'Grasscloth',
    segment: 'Residential',
    subCategory: 'Natural Fiber',
    price: 480,
    currency: 'AED',
    sku: 'PJ-GC-003',
    availability: { type: 'items', quantity: 30 },
    tags: ['grasscloth', 'bamboo', 'natural'],
    isFeatured: false,
    rating: 4.6,
    reviewCount: 22,
    relatedProductIds: ['om-archipelago', 'pj-linen-loft']
  },
  {
    id: 'ac-velvet-midnight',
    name: 'Velvet Midnight Texture',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Deep velvet wallcovering with rich midnight blue for dramatic spaces.',
    brandKey: 'armani-casa',
    category: 'Textile Wallcovering',
    segment: 'Luxury Hospitality',
    subCategory: 'Velour',
    price: 650,
    currency: 'AED',
    sku: 'AC-VLV-003',
    availability: { type: 'items', quantity: 16 },
    tags: ['velvet', 'midnight', 'dramatic'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 31,
    relatedProductIds: ['ac-emerald-cut', 'ac-skyline-panel', 'ac-velvet-rose']
  },
  {
    id: 'ac-velvet-rose',
    name: 'Velvet Rose Blush',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Soft rose-toned velvet wallcovering for elegant residential suites.',
    brandKey: 'armani-casa',
    category: 'Textile Wallcovering',
    segment: 'Residential Signature',
    subCategory: 'Velour',
    price: 620,
    currency: 'AED',
    sku: 'AC-VLV-004',
    availability: { type: 'items', quantity: 20 },
    tags: ['velvet', 'rose', 'elegant'],
    isFeatured: false,
    rating: 4.7,
    reviewCount: 19,
    relatedProductIds: ['ac-emerald-cut', 'ac-velvet-midnight']
  },
  {
    id: 'ac-geometric-bronze',
    name: 'Geometric Bronze Pattern',
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Bold geometric pattern with bronze metallic accents for statement walls.',
    brandKey: 'armani-casa',
    category: 'Wallcovering',
    segment: 'Corporate Suites',
    subCategory: 'Geometric',
    price: 580,
    currency: 'AED',
    sku: 'AC-GEO-005',
    availability: { type: 'items', quantity: 22 },
    tags: ['geometric', 'bronze', 'metallic'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 26,
    relatedProductIds: ['ac-emerald-cut-geo', 'ac-skyline-panel']
  },
  {
    id: 'ac-stucco-ivory',
    name: 'Stucco Ivory Relief',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Hand-applied ivory stucco with subtle relief for timeless elegance.',
    brandKey: 'armani-casa',
    category: 'Textured Plaster',
    segment: 'Luxury Residence',
    subCategory: 'Stucco',
    price: 1020,
    currency: 'AED',
    sku: 'AC-STC-006',
    availability: { type: 'items', quantity: 10 },
    tags: ['stucco', 'ivory', 'relief'],
    isFeatured: true,
    rating: 5.0,
    reviewCount: 15,
    relatedProductIds: ['ac-archway-relief', 'ac-stucco-charcoal']
  },
  {
    id: 'ac-stucco-charcoal',
    name: 'Stucco Charcoal Texture',
    image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Deep charcoal textured stucco for contemporary dramatic interiors.',
    brandKey: 'armani-casa',
    category: 'Textured Plaster',
    segment: 'Corporate',
    subCategory: 'Stucco',
    price: 1050,
    currency: 'AED',
    sku: 'AC-STC-007',
    availability: { type: 'items', quantity: 8 },
    tags: ['stucco', 'charcoal', 'contemporary'],
    isFeatured: false,
    rating: 4.9,
    reviewCount: 12,
    relatedProductIds: ['ac-archway-relief', 'ac-stucco-ivory']
  },
  {
    id: 'ac-panorama-forest',
    name: 'Panorama Forest Mist',
    image: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Panoramic forest scene with misty atmosphere for spa and wellness areas.',
    brandKey: 'armani-casa',
    category: 'Wallcovering Panels',
    segment: 'Wellness & Spa',
    subCategory: 'Panoramic',
    price: 1180,
    currency: 'AED',
    sku: 'AC-PAN-008',
    availability: { type: 'items', quantity: 7 },
    tags: ['panoramic', 'forest', 'wellness'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 20,
    relatedProductIds: ['ac-panorama-silk', 'ac-skyline-panel']
  },
  {
    id: 'arte-embossed-wave',
    name: 'Embossed Wave Pattern',
    image: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Flowing wave pattern with deep embossing for dynamic wall features.',
    brandKey: 'arte',
    category: 'Wall Panels',
    segment: 'Hospitality',
    subCategory: 'Embossed',
    price: 850,
    currency: 'AED',
    sku: 'AR-EMB-002',
    availability: { type: 'items', quantity: 14 },
    tags: ['embossed', 'wave', 'dynamic'],
    isFeatured: true,
    rating: 4.7,
    reviewCount: 18,
    relatedProductIds: ['arte-sculpted', 'arte-geometric-gold']
  },
  {
    id: 'arte-geometric-gold',
    name: 'Geometric Gold Leaf',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Geometric pattern with gold leaf accents for luxury statement walls.',
    brandKey: 'arte',
    category: 'Wallcovering',
    segment: 'Luxury Hospitality',
    subCategory: 'Geometric',
    price: 1250,
    currency: 'AED',
    sku: 'AR-GEO-003',
    availability: { type: 'items', quantity: 9 },
    tags: ['geometric', 'gold', 'luxury'],
    isFeatured: true,
    rating: 5.0,
    reviewCount: 24,
    relatedProductIds: ['arte-sculpted', 'ac-geometric-bronze']
  },
  {
    id: 'arte-textile-linen',
    name: 'Textile Linen Blend',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Natural linen blend textile wallcovering for refined residential spaces.',
    brandKey: 'arte',
    category: 'Textile Wallcovering',
    segment: 'Residential Signature',
    subCategory: 'Linen',
    price: 680,
    currency: 'AED',
    sku: 'AR-TXT-004',
    availability: { type: 'items', quantity: 25 },
    tags: ['textile', 'linen', 'natural'],
    isFeatured: false,
    rating: 4.6,
    reviewCount: 16,
    relatedProductIds: ['om-edition-linen', 'pj-linen-loft']
  },
  {
    id: 'om-gradient-sunset',
    name: 'Gradient Sunset Ombre',
    image: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Warm sunset gradient wallcovering for serene spa environments.',
    brandKey: 'omexco',
    category: 'Non-woven Wallcovering',
    segment: 'Wellness & Spa',
    subCategory: 'Gradient',
    price: 340,
    currency: 'AED',
    sku: 'OM-GRD-002',
    availability: { type: 'items', quantity: 45 },
    tags: ['gradient', 'sunset', 'spa'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 38,
    relatedProductIds: ['om-oase', 'om-gradient-ocean']
  },
  {
    id: 'om-gradient-ocean',
    name: 'Gradient Ocean Depths',
    image: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Deep ocean blue gradient for calming wellness spaces.',
    brandKey: 'omexco',
    category: 'Non-woven Wallcovering',
    segment: 'Wellness & Spa',
    subCategory: 'Gradient',
    price: 350,
    currency: 'AED',
    sku: 'OM-GRD-003',
    availability: { type: 'items', quantity: 42 },
    tags: ['gradient', 'ocean', 'calming'],
    isFeatured: false,
    rating: 4.7,
    reviewCount: 29,
    relatedProductIds: ['om-oase', 'om-gradient-sunset']
  },
  {
    id: 'om-weave-natural',
    name: 'Weave Natural Hemp',
    image: 'https://images.unsplash.com/photo-1493669928585-85d5193d9d3f?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493669928585-85d5193d9d3f?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Natural hemp weave wallcovering with organic texture.',
    brandKey: 'omexco',
    category: 'Non-woven Wallcovering',
    segment: 'Residential',
    subCategory: 'Weave',
    price: 280,
    currency: 'AED',
    sku: 'OM-WV-004',
    availability: { type: 'items', quantity: 50 },
    tags: ['weave', 'hemp', 'organic'],
    isFeatured: false,
    rating: 4.5,
    reviewCount: 21,
    relatedProductIds: ['om-light-night', 'om-archipelago']
  },
  {
    id: 'om-grasscloth-seagrass',
    name: 'Grasscloth Seagrass',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Authentic seagrass wallcovering with coastal charm.',
    brandKey: 'omexco',
    category: 'Grasscloth',
    segment: 'Residential',
    subCategory: 'Natural Fiber',
    price: 460,
    currency: 'AED',
    sku: 'OM-GC-005',
    availability: { type: 'items', quantity: 28 },
    tags: ['grasscloth', 'seagrass', 'coastal'],
    isFeatured: false,
    rating: 4.6,
    reviewCount: 19,
    relatedProductIds: ['om-archipelago', 'pj-grasscloth-bamboo']
  },
  {
    id: 'om-linen-pearl',
    name: 'Linen Pearl Shimmer',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Pearl-toned linen with subtle shimmer for elegant spaces.',
    brandKey: 'omexco',
    category: 'Textile Wallcovering',
    segment: 'Luxury Residence',
    subCategory: 'Linen',
    price: 710,
    currency: 'AED',
    sku: 'OM-LN-006',
    availability: { type: 'items', quantity: 16 },
    tags: ['linen', 'pearl', 'shimmer'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 25,
    relatedProductIds: ['om-edition-linen', 'pj-silk-shimmer']
  },
  {
    id: 'pj-metallic-copper',
    name: 'Metallic Copper Foil',
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Copper foil wallcovering with metallic sheen for bold statements.',
    brandKey: 'phillip-jeffries',
    category: 'Wallcovering',
    segment: 'Corporate Suites',
    subCategory: 'Geometric',
    price: 950,
    currency: 'AED',
    sku: 'PJ-MTL-004',
    availability: { type: 'items', quantity: 11 },
    tags: ['metallic', 'copper', 'bold'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 32,
    relatedProductIds: ['ac-geometric-bronze', 'arte-geometric-gold']
  },
  {
    id: 'pj-natural-jute',
    name: 'Natural Jute Weave',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Rustic jute weave wallcovering for organic interiors.',
    brandKey: 'phillip-jeffries',
    category: 'Grasscloth',
    segment: 'Residential',
    subCategory: 'Natural Fiber',
    price: 490,
    currency: 'AED',
    sku: 'PJ-JT-005',
    availability: { type: 'items', quantity: 26 },
    tags: ['jute', 'natural', 'rustic'],
    isFeatured: false,
    rating: 4.5,
    reviewCount: 17,
    relatedProductIds: ['pj-grasscloth-bamboo', 'om-archipelago']
  },
  {
    id: 'pj-silk-ivory',
    name: 'Silk Ivory Elegance',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Ivory silk wallcovering with timeless elegance.',
    brandKey: 'phillip-jeffries',
    category: 'Textile Wallcovering',
    segment: 'Luxury Residence',
    subCategory: 'Linen',
    price: 860,
    currency: 'AED',
    sku: 'PJ-SLK-006',
    availability: { type: 'items', quantity: 13 },
    tags: ['silk', 'ivory', 'elegant'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 27,
    relatedProductIds: ['pj-silk-shimmer', 'ac-panorama-silk']
  },
  {
    id: 'wv-vinyl-oak',
    name: 'Vinyl Oak Plank',
    image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Realistic oak vinyl planks for durable flooring.',
    brandKey: 'woven-vinyl',
    category: 'Flooring',
    segment: 'Workspace',
    subCategory: 'Vinyl Tiles',
    price: 155,
    currency: 'AED',
    sku: 'WV-OAK-102',
    availability: { type: 'items', quantity: 150 },
    tags: ['vinyl', 'oak', 'durable'],
    isFeatured: false,
    rating: 4.4,
    reviewCount: 42,
    relatedProductIds: ['wv-woven-vinyl-ash', 'lvt-oak-herringbone']
  },
  {
    id: 'wv-vinyl-marble',
    name: 'Vinyl Marble Effect',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Luxury marble-effect vinyl tiles for elegant spaces.',
    brandKey: 'woven-vinyl',
    category: 'Flooring',
    segment: 'Luxury Hospitality',
    subCategory: 'Vinyl Tiles',
    price: 185,
    currency: 'AED',
    sku: 'WV-MRB-103',
    availability: { type: 'items', quantity: 100 },
    tags: ['vinyl', 'marble', 'luxury'],
    isFeatured: true,
    rating: 4.7,
    reviewCount: 36,
    relatedProductIds: ['wv-woven-vinyl-ash', 'lvt-oak-herringbone']
  },
  {
    id: 'lvt-walnut-chevron',
    name: 'LVT Walnut Chevron',
    image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Walnut chevron pattern luxury vinyl tiles.',
    brandKey: 'lvt',
    category: 'Flooring',
    segment: 'Residential Signature',
    subCategory: 'LVT',
    price: 230,
    currency: 'AED',
    sku: 'LVT-WNT-CHV',
    availability: { type: 'items', quantity: 180 },
    tags: ['lvt', 'walnut', 'chevron'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 44,
    relatedProductIds: ['lvt-oak-herringbone', 'wv-vinyl-oak']
  },
  {
    id: 'rug-wool-geometric',
    name: 'Wool Geometric Rug',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Hand-woven wool rug with geometric pattern.',
    brandKey: 'rug',
    category: 'Rug',
    segment: 'Corporate',
    subCategory: 'Hand Tufted',
    price: 1150,
    currency: 'AED',
    sku: 'RUG-WL-GEO',
    availability: { type: 'items', quantity: 8 },
    tags: ['rug', 'wool', 'geometric'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 21,
    relatedProductIds: ['rug-hand-tufted-sand', 'rug-silk-luxury']
  },
  {
    id: 'rug-silk-luxury',
    name: 'Silk Luxury Rug',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Hand-knotted silk rug for luxury residences.',
    brandKey: 'rug',
    category: 'Rug',
    segment: 'Luxury Residence',
    subCategory: 'Hand Tufted',
    price: 2200,
    currency: 'AED',
    sku: 'RUG-SLK-LUX',
    availability: { type: 'items', quantity: 5 },
    tags: ['rug', 'silk', 'luxury'],
    isFeatured: true,
    rating: 5.0,
    reviewCount: 14,
    relatedProductIds: ['rug-hand-tufted-sand', 'rug-wool-geometric']
  },
  {
    id: 'sheer-linen-white',
    name: 'Sheer Linen White',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Pure white linen sheer fabric for airy spaces.',
    brandKey: 'ode',
    category: 'Sheer Fabric',
    segment: 'Residential',
    subCategory: 'Sheers',
    price: 105,
    currency: 'AED',
    sku: 'ODE-SHR-002',
    availability: { type: 'items', quantity: 400 },
    tags: ['sheer', 'linen', 'white'],
    isFeatured: false,
    rating: 4.6,
    reviewCount: 52,
    relatedProductIds: ['ode-sheer-cloud', 'sheer-silk-ivory']
  },
  {
    id: 'sheer-silk-ivory',
    name: 'Sheer Silk Ivory',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Luxurious silk sheer with ivory tone.',
    brandKey: 'ode',
    category: 'Sheer Fabric',
    segment: 'Luxury Residence',
    subCategory: 'Sheers',
    price: 145,
    currency: 'AED',
    sku: 'ODE-SHR-003',
    availability: { type: 'items', quantity: 280 },
    tags: ['sheer', 'silk', 'ivory'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 38,
    relatedProductIds: ['ode-sheer-cloud', 'sheer-linen-white']
  },
  {
    id: 'upholstery-velvet-navy',
    name: 'Upholstery Velvet Navy',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Rich navy velvet upholstery fabric.',
    brandKey: 'fabric',
    category: 'Upholstery',
    segment: 'Hospitality',
    subCategory: 'Woven',
    price: 195,
    currency: 'AED',
    sku: 'UPH-VLV-NVY',
    availability: { type: 'items', quantity: 75 },
    tags: ['upholstery', 'velvet', 'navy'],
    isFeatured: true,
    rating: 4.7,
    reviewCount: 29,
    relatedProductIds: ['upholstery-luxe-graphite', 'upholstery-linen-natural']
  },
  {
    id: 'upholstery-linen-natural',
    name: 'Upholstery Linen Natural',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Natural linen upholstery for organic interiors.',
    brandKey: 'fabric',
    category: 'Upholstery',
    segment: 'Residential',
    subCategory: 'Woven',
    price: 165,
    currency: 'AED',
    sku: 'UPH-LN-NAT',
    availability: { type: 'items', quantity: 95 },
    tags: ['upholstery', 'linen', 'natural'],
    isFeatured: false,
    rating: 4.5,
    reviewCount: 23,
    relatedProductIds: ['upholstery-luxe-graphite', 'upholstery-velvet-navy']
  },
  {
    id: 'kids-wall-ocean',
    name: 'Kids Wall Ocean Adventure',
    image: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Underwater ocean theme mural for children\'s spaces.',
    brandKey: 'kids-wall',
    category: 'Wall Mural',
    segment: 'Education',
    subCategory: 'Kids',
    price: 340,
    currency: 'AED',
    sku: 'KW-OCN-78',
    availability: { type: 'items', quantity: 55 },
    tags: ['kids', 'mural', 'ocean'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 31,
    relatedProductIds: ['kids-wall-safari', 'kids-wall-space']
  },
  {
    id: 'kids-wall-space',
    name: 'Kids Wall Space Explorer',
    image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Space-themed mural with planets and stars.',
    brandKey: 'kids-wall',
    category: 'Wall Mural',
    segment: 'Education',
    subCategory: 'Kids',
    price: 330,
    currency: 'AED',
    sku: 'KW-SPC-79',
    availability: { type: 'items', quantity: 48 },
    tags: ['kids', 'mural', 'space'],
    isFeatured: false,
    rating: 4.7,
    reviewCount: 26,
    relatedProductIds: ['kids-wall-safari', 'kids-wall-ocean']
  }
]

