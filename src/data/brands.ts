// src/data/brands.ts

export interface Brand {
  id: string;         // unique identifier
  key: string;        // matches product.brandKey
  logo: string;
  title: string;
  subtitle: string;
  description: string;
  img: string;
  category: string;
}

export const allBrandsData: Brand[] = [
  {
    id: 'brand-001',
    key: 'armani-casa',
    category: 'Collection',
    title: 'Armani/Casa & Skyline Textures',
    subtitle: 'Graphite silk on architectural geometrics',
    description:
      'Tailored jacquards layered with silk and metallised fibres emulate the skyline silhouettes of luxury penthouses.',
    logo: '/images/walls/armani-casa.png',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'brand-002',
    key: 'armani-casa',
    category: 'Collection',
    title: 'Armani/Casa & Emerald Lounge',
    subtitle: 'Velour botanicals with tonal embossing',
    description:
      'Velvet-sheen textures and deep jewel hues bring couture softness to hospitality lounges and private suites.',
    logo: '/images/walls/armani-casa.png',
    img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'brand-003',
    key: 'armani-casa',
    category: 'Collection',
    title: 'Armani/Casa & Archway Reliefs',
    subtitle: 'Plaster-finish murals in mineral tones',
    description:
      'Soft stucco washes and arched reliefs create serene gradations that highlight bespoke joinery and curated art.',
    logo: '/images/walls/armani-casa.png',
    img: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'brand-004',
    key: 'armani-casa',
    category: 'Collection',
    title: 'Armani/Casa & Atelier Panels',
    subtitle: 'Hand-painted panoramas on silk grounds',
    description:
      'Layered panoramas influenced by couture sketches, printed on silk-backed panels for statement feature walls.',
    logo: '/images/walls/armani-casa.png',
    img: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'brand-005',
    key: 'armani-casa',
    category: 'Collection',
    title: 'Armani/Casa & Mirage Weaves',
    subtitle: 'Metallic lattice on woven grasscloth',
    description:
      'Shimmering lattice motifs woven into natural fibres for elevated corridors and executive lounges.',
    logo: '/images/walls/armani-casa.png',
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'brand-006',
    key: 'armani-casa',
    category: 'Collection',
    title: 'Armani/Casa & Deco Reflections',
    subtitle: 'Pearlescent beadwork with ombrÃ© glow',
    description:
      'Opalescent beadwork captures light gradients to elevate dining rooms and cocktail lounges.',
    logo: '/images/walls/armani-casa.png',
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'brand-007',
    key: 'omexco',
    category: 'Collection',
    title: 'Omexco & Oase',
    subtitle: 'Mineral-wash gradients for coastal retreats',
    description:
      'A shimmering ombrÃ© palette printed on recycled textile fibres, designed for spa suites and beachfront residences.',
    logo: '/images/logo.png',
    img: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'brand-008',
    key: 'omexco',
    category: 'Collection',
    title: 'Omexco & Light at Night',
    subtitle: 'Soft-lit murals with tonal embossing',
    description:
      'Layered dusk-inspired murals with embossed detailing conceived for statement stair cores and reception halls.',
    logo: '/images/logo.png',
    img: 'https://images.unsplash.com/photo-1514516430032-7f39c2fc0d48?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'brand-009',
    key: 'omexco',
    category: 'Collection',
    title: 'Omexco & CafÃ© Society',
    subtitle: 'Art deco marbling with satin sheen',
    description:
      'Swirling marbled surfaces infused with satin accents to energise boutique lobbies and lounges.',
    logo: '/images/logo.png',
    img: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'brand-010',
    key: 'omexco',
    category: 'Collection',
    title: 'Omexco & Edition',
    subtitle: 'Watercolour horizons printed on linen',
    description:
      'Soft horizon bands digitally printed across linen grounds for calm residences and spa corridors.',
    logo: '/images/logo.png',
    img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'brand-011',
    key: 'omexco',
    category: 'Collection',
    title: 'Omexco & Archipelago',
    subtitle: 'Natural grasscloth with woven geometrics',
    description:
      'Sustainable grasscloth woven with geometric threads balancing organic warmth and contemporary rhythm.',
    logo: '/images/logo.png',
    img: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'brand-012',
    key: 'omexco',
    category: 'Collection',
    title: 'Omexco & Woven Wonders',
    subtitle: 'Hand-loomed raffia with metallic threads',
    description:
      'Richly woven raffia embellished with metallic filaments, delivering a crafted finish for boutique hotels.',
    logo: '/images/logo.png',
    img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'brand-013',
    key: 'phillip-jeffries',
    category: 'Collection',
    title: 'Phillip Jeffries & Linen Loft',
    subtitle: 'Layered linens washed in neutral tones',
    description:
      'Belgian linens stonewashed for a relaxed loft aesthetic while maintaining contract-grade durability.',
    logo: '/images/logo.png',
    img: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b05?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'brand-014',
    key: 'arte',
    category: 'Collection',
    title: 'Arte & Sculpted Silhouettes',
    subtitle: '3D reliefs inspired by contemporary sculpture',
    description:
      'Tactile relief surfaces cast dramatic shadows, ideal for flagship retail and gallery environments.',
    logo: '/images/logo.png',
    img: 'https://images.unsplash.com/photo-1526199277977-0f0b6cc8b5fa?auto=format&fit=crop&w=1200&q=80',
  },
];


