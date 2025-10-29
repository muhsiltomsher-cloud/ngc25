
export interface ProductZone {
  id: string;
  x: number; // percentage or pixels
  y: number;
  width: number;
  height: number;
  label: string; // e.g., "Sofa Area", "Dining Table", "Rug"
  category?: string; // suggested product category
  locked?: boolean;
  rotation?: number;
}

export interface MoodboardTemplate {
  id: string;
  name: string;
  category: string; // "Living Room", "Bedroom", "Office", etc.
  style: string; // "Modern", "Minimalist", "Cozy", "Industrial", etc.
  thumbnail: string;
  backgroundImage?: string;
  description: string;
  zones: ProductZone[];
  wallColor?: string;
  floorColor?: string;
  wallTexture?: string;
  floorTexture?: string;
}

export const templateCategories = [
  "Living Room",
  "Bedroom",
  "Office",
  "Dining Room",
  "Kitchen",
  "Bathroom",
] as const;

export const templateStyles = [
  "Modern",
  "Minimalist",
  "Cozy",
  "Industrial",
  "Scandinavian",
  "Traditional",
] as const;

export const moodboardTemplates: MoodboardTemplate[] = [
  {
    id: "living-room-modern-1",
    name: "Modern Living Room",
    category: "Living Room",
    style: "Modern",
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
    description: "A contemporary living space with clean lines and neutral tones",
    wallColor: "#F5F5F5",
    floorColor: "#D4C5B9",
    zones: [
      {
        id: "sofa-area",
        x: 15,
        y: 40,
        width: 35,
        height: 25,
        label: "Sofa Area",
        category: "Fabrics",
      },
      {
        id: "coffee-table",
        x: 20,
        y: 68,
        width: 25,
        height: 15,
        label: "Coffee Table",
        category: "Furniture",
      },
      {
        id: "accent-chair",
        x: 55,
        y: 45,
        width: 20,
        height: 20,
        label: "Accent Chair",
        category: "Fabrics",
      },
      {
        id: "rug-area",
        x: 12,
        y: 65,
        width: 50,
        height: 25,
        label: "Area Rug",
        category: "Rugs",
      },
      {
        id: "wall-art",
        x: 10,
        y: 15,
        width: 30,
        height: 20,
        label: "Wall Art",
        category: "Wallcovering Panels",
      },
    ],
  },
  {
    id: "bedroom-cozy-1",
    name: "Cozy Bedroom",
    category: "Bedroom",
    style: "Cozy",
    thumbnail: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1600&q=80",
    description: "A warm and inviting bedroom with soft textures",
    wallColor: "#E8DDD3",
    floorColor: "#B8A99A",
    zones: [
      {
        id: "bed-area",
        x: 25,
        y: 35,
        width: 50,
        height: 40,
        label: "Bed",
        category: "Fabrics",
      },
      {
        id: "nightstand-left",
        x: 15,
        y: 45,
        width: 12,
        height: 15,
        label: "Nightstand",
        category: "Furniture",
      },
      {
        id: "nightstand-right",
        x: 73,
        y: 45,
        width: 12,
        height: 15,
        label: "Nightstand",
        category: "Furniture",
      },
      {
        id: "bedroom-rug",
        x: 20,
        y: 70,
        width: 60,
        height: 20,
        label: "Bedroom Rug",
        category: "Rugs",
      },
      {
        id: "headboard-wall",
        x: 25,
        y: 10,
        width: 50,
        height: 25,
        label: "Headboard Wall",
        category: "Textile Wallcovering",
      },
    ],
  },
  {
    id: "office-minimalist-1",
    name: "Minimalist Office",
    category: "Office",
    style: "Minimalist",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    description: "A clean and focused workspace with minimal distractions",
    wallColor: "#FFFFFF",
    floorColor: "#E5E5E5",
    zones: [
      {
        id: "desk-area",
        x: 20,
        y: 50,
        width: 40,
        height: 25,
        label: "Desk",
        category: "Furniture",
      },
      {
        id: "office-chair",
        x: 30,
        y: 70,
        width: 20,
        height: 18,
        label: "Office Chair",
        category: "Fabrics",
      },
      {
        id: "bookshelf",
        x: 65,
        y: 30,
        width: 25,
        height: 50,
        label: "Bookshelf",
        category: "Furniture",
      },
      {
        id: "desk-rug",
        x: 18,
        y: 65,
        width: 45,
        height: 25,
        label: "Desk Rug",
        category: "Rugs",
      },
    ],
  },
  {
    id: "living-room-industrial-1",
    name: "Industrial Living Room",
    category: "Living Room",
    style: "Industrial",
    thumbnail: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1600&q=80",
    description: "Urban loft style with exposed elements and raw materials",
    wallColor: "#8B8680",
    floorColor: "#6B5D52",
    zones: [
      {
        id: "sectional-sofa",
        x: 10,
        y: 40,
        width: 45,
        height: 30,
        label: "Sectional Sofa",
        category: "Fabrics",
      },
      {
        id: "industrial-table",
        x: 15,
        y: 72,
        width: 30,
        height: 18,
        label: "Coffee Table",
        category: "Furniture",
      },
      {
        id: "accent-wall",
        x: 60,
        y: 20,
        width: 35,
        height: 40,
        label: "Accent Wall",
        category: "Textured Plaster",
      },
      {
        id: "large-rug",
        x: 8,
        y: 65,
        width: 50,
        height: 30,
        label: "Large Area Rug",
        category: "Rugs",
      },
    ],
  },
  {
    id: "bedroom-scandinavian-1",
    name: "Scandinavian Bedroom",
    category: "Bedroom",
    style: "Scandinavian",
    thumbnail: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    description: "Light, airy space with natural materials and simple forms",
    wallColor: "#F7F7F5",
    floorColor: "#D9C9B5",
    zones: [
      {
        id: "platform-bed",
        x: 20,
        y: 30,
        width: 60,
        height: 45,
        label: "Platform Bed",
        category: "Fabrics",
      },
      {
        id: "side-table",
        x: 12,
        y: 40,
        width: 10,
        height: 12,
        label: "Side Table",
        category: "Furniture",
      },
      {
        id: "bedroom-rug-scandi",
        x: 15,
        y: 72,
        width: 70,
        height: 20,
        label: "Natural Fiber Rug",
        category: "Rugs",
      },
    ],
  },
  {
    id: "dining-room-traditional-1",
    name: "Traditional Dining Room",
    category: "Dining Room",
    style: "Traditional",
    thumbnail: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80",
    description: "Classic dining space with elegant furnishings",
    wallColor: "#E6DDD1",
    floorColor: "#8B7355",
    zones: [
      {
        id: "dining-table",
        x: 25,
        y: 45,
        width: 50,
        height: 35,
        label: "Dining Table",
        category: "Furniture",
      },
      {
        id: "dining-rug",
        x: 20,
        y: 40,
        width: 60,
        height: 50,
        label: "Dining Rug",
        category: "Rugs",
      },
      {
        id: "buffet-cabinet",
        x: 10,
        y: 15,
        width: 35,
        height: 20,
        label: "Buffet Cabinet",
        category: "Furniture",
      },
      {
        id: "feature-wall",
        x: 8,
        y: 10,
        width: 40,
        height: 30,
        label: "Feature Wall",
        category: "Wallcovering Panels",
      },
    ],
  },
];
