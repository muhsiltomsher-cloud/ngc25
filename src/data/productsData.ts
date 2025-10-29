﻿﻿﻿﻿﻿// src/data/productsData.ts

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
    id: 'premium-luxury-collection',
    name: 'Premium Luxury Collection - Designer Wallcovering',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
    ],
    views: {
      installed: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
      ],
      room: [
        'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
      ],
      swatch: [
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    description: 'An exquisite designer wallcovering collection featuring premium materials and sophisticated textures. This luxury series offers an unprecedented range of 100 carefully curated color variations, each meticulously crafted to bring elegance and refinement to any interior space. Perfect for high-end residential and commercial projects.',
    brandKey: 'armani-casa',
    category: 'Designer Wallcovering',
    segment: 'Luxury Hospitality',
    subCategory: 'Premium Collection',
    price: 1250,
    currency: 'AED',
    sku: 'PLC-DESIGNER-001',
    availability: { type: 'items', quantity: 50 },
    tags: ['luxury', 'designer', 'premium', 'collection', '100-colors'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 127,
    details: {
      whatToBring: ['Professional installation recommended', 'Color matching service available'],
    },
    variations: [
      {
        id: 'crimson-red',
        name: 'Crimson Red',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#DC143C',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'ruby-wine',
        name: 'Ruby Wine',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#9B111E',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'scarlet-flame',
        name: 'Scarlet Flame',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FF2400',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'cherry-blossom',
        name: 'Cherry Blossom',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FFB7C5',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'burgundy-deep',
        name: 'Burgundy Deep',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#800020',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'rose-petal',
        name: 'Rose Petal',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FF66CC',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'coral-sunset',
        name: 'Coral Sunset',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FF7F50',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'brick-red',
        name: 'Brick Red',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#CB4154',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'terracotta',
        name: 'Terracotta',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#E2725B',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'salmon-pink',
        name: 'Salmon Pink',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FA8072',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'tangerine-dream',
        name: 'Tangerine Dream',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FF9966',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'burnt-orange',
        name: 'Burnt Orange',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#CC5500',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'apricot-glow',
        name: 'Apricot Glow',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FBCEB1',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'amber-gold',
        name: 'Amber Gold',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FFBF00',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'peach-cream',
        name: 'Peach Cream',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FFE5B4',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'rust-orange',
        name: 'Rust Orange',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#B7410E',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'copper-shine',
        name: 'Copper Shine',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#B87333',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'mandarin',
        name: 'Mandarin',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#F28500',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'pumpkin-spice',
        name: 'Pumpkin Spice',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FF7518',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'marigold',
        name: 'Marigold',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#EAA221',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'sunshine-yellow',
        name: 'Sunshine Yellow',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FFD700',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'lemon-zest',
        name: 'Lemon Zest',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FFF44F',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'canary-bright',
        name: 'Canary Bright',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FFEF00',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'mustard-gold',
        name: 'Mustard Gold',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FFDB58',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'honey-amber',
        name: 'Honey Amber',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FFC30B',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'butter-cream',
        name: 'Butter Cream',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FFFACD',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'golden-rod',
        name: 'Golden Rod',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#DAA520',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'saffron',
        name: 'Saffron',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#F4C430',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'champagne',
        name: 'Champagne',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#F7E7CE',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'wheat-field',
        name: 'Wheat Field',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#F5DEB3',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'emerald-forest',
        name: 'Emerald Forest',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#50C878',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'jade-stone',
        name: 'Jade Stone',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#00A86B',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'mint-fresh',
        name: 'Mint Fresh',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#98FF98',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'sage-green',
        name: 'Sage Green',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#9DC183',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'olive-grove',
        name: 'Olive Grove',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#808000',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'forest-deep',
        name: 'Forest Deep',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#228B22',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'lime-bright',
        name: 'Lime Bright',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#32CD32',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'sea-foam',
        name: 'Sea Foam',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#93E9BE',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'pine-needle',
        name: 'Pine Needle',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#01796F',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'moss-garden',
        name: 'Moss Garden',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#8A9A5B',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'ocean-deep',
        name: 'Ocean Deep',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#006994',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'sky-azure',
        name: 'Sky Azure',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#007FFF',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'navy-midnight',
        name: 'Navy Midnight',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#000080',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'turquoise-wave',
        name: 'Turquoise Wave',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#40E0D0',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'sapphire-blue',
        name: 'Sapphire Blue',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#0F52BA',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'powder-blue',
        name: 'Powder Blue',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#B0E0E6',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'cobalt-rich',
        name: 'Cobalt Rich',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#0047AB',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'teal-lagoon',
        name: 'Teal Lagoon',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#008080',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'cerulean-sky',
        name: 'Cerulean Sky',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#007BA7',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'aquamarine',
        name: 'Aquamarine',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#7FFFD4',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'royal-purple',
        name: 'Royal Purple',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#7851A9',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'lavender-mist',
        name: 'Lavender Mist',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#E6E6FA',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'violet-dream',
        name: 'Violet Dream',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#8F00FF',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'plum-wine',
        name: 'Plum Wine',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#8E4585',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'amethyst',
        name: 'Amethyst',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#9966CC',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'lilac-soft',
        name: 'Lilac Soft',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#C8A2C8',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'orchid-pink',
        name: 'Orchid Pink',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#DA70D6',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'mauve-dusk',
        name: 'Mauve Dusk',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#E0B0FF',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'indigo-night',
        name: 'Indigo Night',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#4B0082',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'periwinkle',
        name: 'Periwinkle',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#CCCCFF',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'chocolate-rich',
        name: 'Chocolate Rich',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#7B3F00',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'caramel-swirl',
        name: 'Caramel Swirl',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#C68E17',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'coffee-bean',
        name: 'Coffee Bean',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#6F4E37',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'mocha-cream',
        name: 'Mocha Cream',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#967969',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'chestnut',
        name: 'Chestnut',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#954535',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'walnut-wood',
        name: 'Walnut Wood',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#773F1A',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'tan-leather',
        name: 'Tan Leather',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#D2B48C',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'sienna-earth',
        name: 'Sienna Earth',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#A0522D',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'mahogany',
        name: 'Mahogany',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#C04000',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'sepia-tone',
        name: 'Sepia Tone',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#704214',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'charcoal-dark',
        name: 'Charcoal Dark',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#36454F',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'silver-mist',
        name: 'Silver Mist',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#C0C0C0',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'slate-gray',
        name: 'Slate Gray',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#708090',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'ash-gray',
        name: 'Ash Gray',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#B2BEB5',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'pewter-metal',
        name: 'Pewter Metal',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#899499',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'dove-gray',
        name: 'Dove Gray',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#6D6E71',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'graphite',
        name: 'Graphite',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#383838',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'platinum',
        name: 'Platinum',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#E5E4E2',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'steel-blue-gray',
        name: 'Steel Blue Gray',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#71797E',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'smoke-gray',
        name: 'Smoke Gray',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#738276',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'pure-white',
        name: 'Pure White',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FFFFFF',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'ivory-cream',
        name: 'Ivory Cream',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FFFFF0',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'beige-sand',
        name: 'Beige Sand',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#F5F5DC',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'linen-natural',
        name: 'Linen Natural',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#FAF0E6',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'eggshell',
        name: 'Eggshell',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#F0EAD6',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'alabaster',
        name: 'Alabaster',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#EDEADE',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'pearl-white',
        name: 'Pearl White',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#EAE0C8',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'vanilla-cream',
        name: 'Vanilla Cream',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#F3E5AB',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'bone-white',
        name: 'Bone White',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#E3DAC9',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'coconut',
        name: 'Coconut',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#F8F4E6',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'jet-black',
        name: 'Jet Black',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#0A0A0A',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'onyx-deep',
        name: 'Onyx Deep',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#353839',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'ebony-rich',
        name: 'Ebony Rich',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#555D50',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'obsidian',
        name: 'Obsidian',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#3B3C36',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'raven-black',
        name: 'Raven Black',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#1C1C1C',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'carbon-black',
        name: 'Carbon Black',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        swatch: '#2C2C2C',
        gallery: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'midnight-black',
        name: 'Midnight Black',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        swatch: '#191970',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'noir',
        name: 'Noir',
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        swatch: '#000000',
        gallery: [
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'shadow-dark',
        name: 'Shadow Dark',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        swatch: '#1A1A1A',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
        ],
      },
      {
        id: 'eclipse',
        name: 'Eclipse',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        swatch: '#242124',
        gallery: [
          'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=80',
        ],
      },
    ],
    relatedProductIds: ['ac-skyline-panel', 'ac-emerald-cut', 'om-oase'],
  },
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
      { id: 'crimson-red', name: 'Crimson Red', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80', swatch: '#DC143C', gallery: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'ruby-wine', name: 'Ruby Wine', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', swatch: '#9B111E', gallery: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'scarlet-flame', name: 'Scarlet Flame', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80', swatch: '#FF2400', gallery: ['https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'burgundy-velvet', name: 'Burgundy Velvet', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80', swatch: '#800020', gallery: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'cherry-blossom', name: 'Cherry Blossom', image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80', swatch: '#FFB7C5', gallery: ['https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'rose-quartz', name: 'Rose Quartz', image: 'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80', swatch: '#F7CAC9', gallery: ['https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'coral-sunset', name: 'Coral Sunset', image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80', swatch: '#FF7F50', gallery: ['https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'blush-pink', name: 'Blush Pink', image: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80', swatch: '#DE5D83', gallery: ['https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'raspberry-sorbet', name: 'Raspberry Sorbet', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80', swatch: '#E30B5C', gallery: ['https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80'] },
      { id: 'terracotta-red', name: 'Terracotta Red', image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80', swatch: '#E2725B', gallery: ['https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'] },
      
      { id: 'tangerine-dream', name: 'Tangerine Dream', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80', swatch: '#F28500', gallery: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'burnt-orange', name: 'Burnt Orange', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', swatch: '#CC5500', gallery: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'apricot-glow', name: 'Apricot Glow', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80', swatch: '#FBCEB1', gallery: ['https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'peach-cream', name: 'Peach Cream', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80', swatch: '#FFE5B4', gallery: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'amber-glow', name: 'Amber Glow', image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80', swatch: '#FFBF00', gallery: ['https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'copper-fade', name: 'Copper Fade', image: 'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80', swatch: '#B87333', gallery: ['https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'pumpkin-spice', name: 'Pumpkin Spice', image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80', swatch: '#FF7518', gallery: ['https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'mandarin-zest', name: 'Mandarin Zest', image: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80', swatch: '#F37A48', gallery: ['https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'sunset-orange', name: 'Sunset Orange', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80', swatch: '#FD5E53', gallery: ['https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80'] },
      { id: 'rust-patina', name: 'Rust Patina', image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80', swatch: '#B7410E', gallery: ['https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'] },
      
      { id: 'golden-honey', name: 'Golden Honey', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80', swatch: '#FFD700', gallery: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'lemon-zest', name: 'Lemon Zest', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', swatch: '#FFF44F', gallery: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'buttercup-yellow', name: 'Buttercup Yellow', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80', swatch: '#F3E03B', gallery: ['https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'canary-bright', name: 'Canary Bright', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80', swatch: '#FFEF00', gallery: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'champagne-gold', name: 'Champagne Gold', image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80', swatch: '#F7E7CE', gallery: ['https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'mustard-seed', name: 'Mustard Seed', image: 'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80', swatch: '#FFDB58', gallery: ['https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'cream-vanilla', name: 'Cream Vanilla', image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80', swatch: '#FFFDD0', gallery: ['https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'sunflower-yellow', name: 'Sunflower Yellow', image: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80', swatch: '#FFDA03', gallery: ['https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'saffron-spice', name: 'Saffron Spice', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80', swatch: '#F4C430', gallery: ['https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80'] },
      { id: 'marigold-bloom', name: 'Marigold Bloom', image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80', swatch: '#EAA221', gallery: ['https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'] },
      
      { id: 'emerald-forest', name: 'Emerald Forest', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80', swatch: '#50C878', gallery: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'jade-green', name: 'Jade Green', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', swatch: '#00A86B', gallery: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'mint-fresh', name: 'Mint Fresh', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80', swatch: '#98FF98', gallery: ['https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'sage-whisper', name: 'Sage Whisper', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80', swatch: '#9DC183', gallery: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'olive-grove', name: 'Olive Grove', image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80', swatch: '#808000', gallery: ['https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'forest-pine', name: 'Forest Pine', image: 'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80', swatch: '#228B22', gallery: ['https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'lime-zest', name: 'Lime Zest', image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80', swatch: '#BFFF00', gallery: ['https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'seafoam-green', name: 'Seafoam Green', image: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80', swatch: '#93E9BE', gallery: ['https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'moss-garden', name: 'Moss Garden', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80', swatch: '#8A9A5B', gallery: ['https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80'] },
      { id: 'hunter-green', name: 'Hunter Green', image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80', swatch: '#355E3B', gallery: ['https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'] },
      
      { id: 'sapphire-blue', name: 'Sapphire Blue', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80', swatch: '#0F52BA', gallery: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'navy-midnight', name: 'Navy Midnight', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', swatch: '#000080', gallery: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'sky-azure', name: 'Sky Azure', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80', swatch: '#007FFF', gallery: ['https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'turquoise-wave', name: 'Turquoise Wave', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80', swatch: '#40E0D0', gallery: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'teal-ocean', name: 'Teal Ocean', image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80', swatch: '#008080', gallery: ['https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'powder-blue', name: 'Powder Blue', image: 'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80', swatch: '#B0E0E6', gallery: ['https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'cobalt-deep', name: 'Cobalt Deep', image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80', swatch: '#0047AB', gallery: ['https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'cerulean-sky', name: 'Cerulean Sky', image: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80', swatch: '#2A52BE', gallery: ['https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'steel-blue-gray', name: 'Steel Blue Gray', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80', swatch: '#4682B4', gallery: ['https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80'] },
      { id: 'prussian-blue', name: 'Prussian Blue', image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80', swatch: '#003153', gallery: ['https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'] },
      
      { id: 'royal-purple', name: 'Royal Purple', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80', swatch: '#7851A9', gallery: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'lavender-mist', name: 'Lavender Mist', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', swatch: '#E6E6FA', gallery: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'violet-dream', name: 'Violet Dream', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80', swatch: '#8F00FF', gallery: ['https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'plum-velvet', name: 'Plum Velvet', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80', swatch: '#8E4585', gallery: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'orchid-bloom', name: 'Orchid Bloom', image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80', swatch: '#DA70D6', gallery: ['https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'mauve-twilight', name: 'Mauve Twilight', image: 'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80', swatch: '#E0B0FF', gallery: ['https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'amethyst-crystal', name: 'Amethyst Crystal', image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80', swatch: '#9966CC', gallery: ['https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'lilac-soft', name: 'Lilac Soft', image: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80', swatch: '#C8A2C8', gallery: ['https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'magenta-burst', name: 'Magenta Burst', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80', swatch: '#FF00FF', gallery: ['https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80'] },
      { id: 'indigo-night', name: 'Indigo Night', image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80', swatch: '#4B0082', gallery: ['https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'] },
      
      { id: 'chocolate-truffle', name: 'Chocolate Truffle', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80', swatch: '#7B3F00', gallery: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'espresso-bean', name: 'Espresso Bean', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', swatch: '#3D2817', gallery: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'caramel-swirl', name: 'Caramel Swirl', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80', swatch: '#AF6E4D', gallery: ['https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'chestnut-brown', name: 'Chestnut Brown', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80', swatch: '#954535', gallery: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'walnut-wood', name: 'Walnut Wood', image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80', swatch: '#773F1A', gallery: ['https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'mahogany-rich', name: 'Mahogany Rich', image: 'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80', swatch: '#C04000', gallery: ['https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'tan-leather', name: 'Tan Leather', image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80', swatch: '#D2B48C', gallery: ['https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'sand-dune', name: 'Sand Dune', image: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80', swatch: '#C2B280', gallery: ['https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'taupe-neutral', name: 'Taupe Neutral', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80', swatch: '#483C32', gallery: ['https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80'] },
      { id: 'sepia-vintage', name: 'Sepia Vintage', image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80', swatch: '#704214', gallery: ['https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'] },
      
      { id: 'charcoal-slate', name: 'Charcoal Slate', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80', swatch: '#36454F', gallery: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'silver-mist', name: 'Silver Mist', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', swatch: '#C0C0C0', gallery: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'platinum-shine', name: 'Platinum Shine', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80', swatch: '#E5E4E2', gallery: ['https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'ash-gray', name: 'Ash Gray', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80', swatch: '#B2BEB5', gallery: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'pewter-metal', name: 'Pewter Metal', image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80', swatch: '#96A8A1', gallery: ['https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'dove-gray', name: 'Dove Gray', image: 'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80', swatch: '#6D6E71', gallery: ['https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'smoke-gray', name: 'Smoke Gray', image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80', swatch: '#738276', gallery: ['https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'concrete-urban', name: 'Concrete Urban', image: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80', swatch: '#95918C', gallery: ['https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'graphite-dark', name: 'Graphite Dark', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80', swatch: '#474A51', gallery: ['https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80'] },
      { id: 'storm-cloud', name: 'Storm Cloud', image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80', swatch: '#4F666A', gallery: ['https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'] },
      
      { id: 'pure-white', name: 'Pure White', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80', swatch: '#FFFFFF', gallery: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'ivory-cream', name: 'Ivory Cream', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', swatch: '#FFFFF0', gallery: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'pearl-white', name: 'Pearl White', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80', swatch: '#F0EAD6', gallery: ['https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'alabaster-soft', name: 'Alabaster Soft', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80', swatch: '#F2F0E6', gallery: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'linen-white', name: 'Linen White', image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80', swatch: '#FAF0E6', gallery: ['https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'eggshell-white', name: 'Eggshell White', image: 'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80', swatch: '#F0EAD6', gallery: ['https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'snow-white', name: 'Snow White', image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80', swatch: '#FFFAFA', gallery: ['https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'cotton-white', name: 'Cotton White', image: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80', swatch: '#FFFEF0', gallery: ['https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'soft-dawn', name: 'Soft Dawn', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80', swatch: '#F5F5DC', gallery: ['https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80'] },
      { id: 'porcelain-white', name: 'Porcelain White', image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80', swatch: '#ECE5DA', gallery: ['https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'] },
      
      { id: 'midnight-graphite', name: 'Midnight Graphite', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80', swatch: '#1E293B', gallery: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'jet-black', name: 'Jet Black', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', swatch: '#0A0A0A', gallery: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'onyx-black', name: 'Onyx Black', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80', swatch: '#353839', gallery: ['https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'ebony-wood', name: 'Ebony Wood', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80', swatch: '#555D50', gallery: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'carbon-black', name: 'Carbon Black', image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80', swatch: '#2B2B2B', gallery: ['https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'obsidian-stone', name: 'Obsidian Stone', image: 'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80', swatch: '#3B3C36', gallery: ['https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'raven-black', name: 'Raven Black', image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80', swatch: '#1C1C1C', gallery: ['https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'shadow-dark', name: 'Shadow Dark', image: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80', swatch: '#1A1A1A', gallery: ['https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'eclipse', name: 'Eclipse', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80', swatch: '#242124', gallery: ['https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80'] },
      { id: 'noir-black', name: 'Noir Black', image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80', swatch: '#0C0C0C', gallery: ['https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'] },
      
      { id: 'rose-gold', name: 'Rose Gold', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80', swatch: '#B76E79', gallery: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'bronze-metallic', name: 'Bronze Metallic', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', swatch: '#CD7F32', gallery: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'champagne-shimmer', name: 'Champagne Shimmer', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80', swatch: '#F7E7CE', gallery: ['https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'gunmetal-gray', name: 'Gunmetal Gray', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80', swatch: '#2C3539', gallery: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'antique-brass', name: 'Antique Brass', image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80', swatch: '#CD9575', gallery: ['https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'slate-blue', name: 'Slate Blue', image: 'https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80', swatch: '#6A5ACD', gallery: ['https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'dusty-rose', name: 'Dusty Rose', image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80', swatch: '#DCAE96', gallery: ['https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'seafoam-blue', name: 'Seafoam Blue', image: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80', swatch: '#71D9E2', gallery: ['https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1600&q=80'] },
      { id: 'warm-beige', name: 'Warm Beige', image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80', swatch: '#F5F5DC', gallery: ['https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80'] },
      { id: 'cool-mint', name: 'Cool Mint', image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80', swatch: '#AAF0D1', gallery: ['https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80'] },
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
    image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1600&q=80'
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
    image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1600&q=80'
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

