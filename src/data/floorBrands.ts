// src/data/floorBrands.ts

export interface Brand {
  id: string;
  key: string;
  logo: string;
  title: string;
  subtitle: string;
  description: string;
  img: string;
  category: string;
}

export const allFloorBrandsData: Brand[] = [
  {
    id: 'floor-brand-001',
    key: 'floor-brand-one',
    category: 'Flooring',
    title: 'Prestige Carpets',
    subtitle: 'Luxury woven carpets for hospitality',
    description:
      'Crafted from the finest wools and silks, our woven carpets offer unparalleled luxury and durability for high-end hotels and residences.',
    logo: '/images/products/floors.png',
    img: '/images/carpet-tiles/hero-banner.png',
  },
  {
    id: 'floor-brand-002',
    key: 'floor-brand-two',
    category: 'Flooring',
    title: 'Urban Vinyl',
    subtitle: 'Contemporary LVT for modern spaces',
    description:
      'Our luxury vinyl tiles combine cutting-edge design with superior performance, perfect for commercial and residential projects.',
    logo: '/images/products/floors.png',
    img: '/images/collections/woven-vinyl.png',
  },
  {
    id: 'floor-brand-003',
    key: 'floor-brand-three',
    category: 'Flooring',
    title: 'Heritage Wood',
    subtitle: 'Engineered hardwood for timeless elegance',
    description:
      'Sustainably sourced and expertly crafted, our engineered wood flooring brings natural beauty and warmth to any interior.',
    logo: '/images/products/floors.png',
    img: '/images/segments/residential.png',
  },
];
