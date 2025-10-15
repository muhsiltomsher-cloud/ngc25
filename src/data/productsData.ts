// src/data/productsData.ts

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
  }
]

