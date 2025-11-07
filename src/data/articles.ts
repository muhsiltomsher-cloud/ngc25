export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: 'News' | 'Case Study' | 'Guide' | 'Press';
  date: string; // ISO
  readMinutes: number;
  content: string[]; // simple paragraphs for now
}

export const articles: Article[] = [
  {
    slug: 'workplace-textures-2025',
    title: 'Workplace Textures for 2025: Quiet Luxury Meets Performance',
    excerpt:
      'A practical guide to specifying high‑performance wallcoverings and modular flooring for modern workplaces—balancing acoustics, durability and mood.',
    image: '/images/workspace/options-wallcoverings.png',
    category: 'Guide',
    date: '2025-01-10',
    readMinutes: 6,
    content: [
      'Quiet luxury continues to influence workplace palettes with mineral tones and soft textures. In this guide we explore contract‑grade finishes that elevate without overwhelming.',
      'From Type II vinyl to woven textiles, the right wallcovering can radically improve acoustics and maintenance cycles. Pair with carpet tiles in multi‑level loops for zoning and wayfinding.',
    ],
  },
  {
    slug: 'ngc-quickship-expands-uae-2025',
    title: 'NGC Expands Quickship Coverage Across the UAE',
    excerpt:
      'Our 24‑hour delivery program now services additional Emirates with improved cut‑off times and weekend dispatch.',
    image: '/images/walls/runway-to-your-walls.png',
    category: 'News',
    date: '2025-01-28',
    readMinutes: 3,
    content: [
      'We have expanded our Quickship network to improve availability and shorten lead times across the UAE. Instock wallcoverings and carpet tiles can now be dispatched within 24 hours for more regions.',
      'Contact your representative for the current eligible SKUs and delivery windows in your Emirate.',
    ],
  },
  {
    slug: 'partnership-press-2025',
    title: 'Press: Partnership Announced with Regional Hospitality Group',
    excerpt:
      'NGC is selected to supply wallcoverings and carpet tiles for a multi‑hotel refresh program across the Middle East.',
    image: '/images/walls/versace.png',
    category: 'Press',
    date: '2025-01-22',
    readMinutes: 2,
    content: [
      'The partnership focuses on durable, contract‑grade materials with rapid install schedules enabled by Quickship. Our design support team will provide palettes tailored to each property.',
    ],
  },
  {
    slug: 'sustainability-update-epds-2025',
    title: 'Sustainability Update: EPDs & Low‑VOC Programs',
    excerpt:
      'A growing list of collections now offer EPDs and low‑VOC certifications to support project documentation.',
    image: '/images/workspace/options-hero.png',
    category: 'News',
    date: '2025-01-15',
    readMinutes: 4,
    content: [
      'We continue to expand our library of documented, low‑impact materials. Designers can request EPDs, emission certificates and recycled‑content statements directly from our team.',
    ],
  },
  {
    slug: 'press-design-collab-2024',
    title: 'Press: Design Collaboration Unveils Limited Wallcovering Series',
    excerpt:
      'A limited capsule brings couture‑inspired textures and panoramic murals in mineral palettes.',
    image: '/images/walls/luxury.png',
    category: 'Press',
    date: '2024-11-28',
    readMinutes: 3,
    content: [
      'The series explores layered textures and calm gradations designed for hospitality and residential applications. Availability is limited; contact us for sampling.',
    ],
  },
  {
    slug: 'hospitality-refresh-quickship',
    title: 'Hospitality Refresh with Quickship: 24‑Hour Turnarounds',
    excerpt:
      'How operators are using our Quickship program to refresh corridors and public spaces with minimal downtime.',
    image: '/images/walls/runway-walls.png',
    category: 'Case Study',
    date: '2025-01-05',
    readMinutes: 4,
    content: [
      'Lead time is a project risk. With Quickship, designers select in‑stock SKUs for 24‑hour delivery across the UAE, enabling weekend turnarounds for corridors and lift lobbies.',
      'Carpet tiles and Type II wallcoverings ensure rapid install and easy maintenance for high‑traffic zones.',
    ],
  },
  {
    slug: 'acoustic-wallcovering-basics',
    title: 'Acoustic Wallcovering Basics for Open Offices',
    excerpt:
      'Understanding NRC, installation details and where acoustic wallcoverings make the biggest difference.',
    image: '/images/workspace/wallcoverings.png',
    category: 'Guide',
    date: '2024-12-18',
    readMinutes: 7,
    content: [
      'Open offices demand intelligent acoustic control. Wallcoverings with felted or micro‑perforated substrates can improve speech privacy and comfort.',
      'We outline best practices for perimeter walls, phone rooms and collaboration zones.',
    ],
  },
  {
    slug: 'designer-collab-press',
    title: 'NGC Announces Designer Collaboration for 2025',
    excerpt:
      'A new partnership brings runway‑inspired wallcoverings to regional hospitality and residential projects.',
    image: '/images/walls/designer-hero.png',
    category: 'Press',
    date: '2024-12-01',
    readMinutes: 3,
    content: [
      'The collaboration introduces couture‑inspired textures and panoramic murals tailored for the Middle East market.',
    ],
  },
  {
    slug: 'carpet-tile-patterns',
    title: 'Five Carpet Tile Patterns for Zoning',
    excerpt:
      'Ashlar, herringbone and more: using pattern to guide movement and define neighborhoods.',
    image: '/images/workspace/options-floorings.png',
    category: 'Guide',
    date: '2024-11-20',
    readMinutes: 5,
    content: [
      'Layout does more than cover the floor—it communicates. These five patterns help create intuitive wayfinding and zones.',
    ],
  },
  {
    slug: 'residential-case-green',
    title: 'Calm Residential Project with Mineral Greens',
    excerpt:
      'A case study featuring textured wallcoverings and soft piles for a serene family space.',
    image: '/images/walls/lifestyle-img.jpg',
    category: 'Case Study',
    date: '2024-11-05',
    readMinutes: 4,
    content: [
      'Mineral greens and textural contrasts deliver a calm, timeless interior with robust maintenance performance.',
    ],
  },
];
