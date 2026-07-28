import type { Product } from "./types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

function withDefaults(product: Product): Product {
  return {
    ...product,
    fulfillment: product.fulfillment ?? "studio",
    amazonAsin: product.amazonAsin ?? null,
  };
}

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    const products = await apiFetch<Product[]>(`/products${query}`);
    return products.map(withDefaults);
  } catch {
    return fallbackProducts.filter((p) =>
      category ? p.category === category : true,
    );
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await apiFetch<Product[]>("/products/featured");
    return products.map(withDefaults);
  } catch {
    return fallbackProducts.filter((p) => p.featured);
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const product = await apiFetch<Product>(`/products/${slug}`);
    return withDefaults(product);
  } catch {
    return fallbackProducts.find((p) => p.slug === slug) ?? null;
  }
}

const now = () => new Date().toISOString();

/** Offline / pre-API catalog so the shop still looks alive locally */
const fallbackProducts: Product[] = [
  {
    id: "1",
    slug: "vale-50",
    name: "Gift voucher €50",
    description:
      "A €50 gift voucher (vale de regalo) for any tattoo session or studio product at Maggie Studio. Valid for 12 months. Delivered by email.",
    priceCents: 5000,
    category: "vales",
    imageUrl:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=80",
    sizes: ["ONE"],
    featured: true,
    fulfillment: "studio",
    amazonAsin: null,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "2",
    slug: "vale-100",
    name: "Gift voucher €100",
    description:
      "A €100 gift voucher for Maggie Studio — perfect for a small piece or a deposit toward a larger session. Valid for 12 months.",
    priceCents: 10000,
    category: "vales",
    imageUrl:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
    sizes: ["ONE"],
    featured: true,
    fulfillment: "studio",
    amazonAsin: null,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "3",
    slug: "vale-150",
    name: "Gift voucher €150",
    description:
      "A €150 vale de regalo toward custom work, flash, or studio merch. The gift that becomes ink. Valid for 12 months.",
    priceCents: 15000,
    category: "vales",
    imageUrl:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80",
    sizes: ["ONE"],
    featured: true,
    fulfillment: "studio",
    amazonAsin: null,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "4",
    slug: "healing-balm",
    name: "Tattoo healing balm",
    description:
      "Fragrance-free healing balm for fresh ink. Amazon example product — browse here, checkout on Amazon when the shop goes live.",
    priceCents: 1299,
    category: "aftercare",
    imageUrl:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=80",
    sizes: ["ONE"],
    featured: true,
    fulfillment: "amazon",
    amazonAsin: "PENDING-HEALING-BALM",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "5",
    slug: "second-skin-wrap",
    name: "Second-skin tattoo wrap",
    description:
      "Breathable protective film for the first days after a session. Placeholder Amazon ASIN until Maggie’s store is connected.",
    priceCents: 1899,
    category: "aftercare",
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    sizes: ["ONE"],
    featured: true,
    fulfillment: "amazon",
    amazonAsin: "PENDING-SECOND-SKIN",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "6",
    slug: "green-soap",
    name: "Concentrated green soap",
    description:
      "Studio-grade green soap concentrate for cleaning skin during and after tattooing. Amazon example listing.",
    priceCents: 1599,
    category: "supplies",
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    sizes: ["ONE"],
    featured: false,
    fulfillment: "amazon",
    amazonAsin: "PENDING-GREEN-SOAP",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "7",
    slug: "stencil-transfer-paper",
    name: "Stencil transfer paper",
    description:
      "Thermal stencil paper for clean transfers from sketch to skin. Example Amazon supply — replace ASIN when live.",
    priceCents: 1499,
    category: "supplies",
    imageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    sizes: ["ONE"],
    featured: true,
    fulfillment: "amazon",
    amazonAsin: "PENDING-STENCIL-PAPER",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "8",
    slug: "nitrile-gloves",
    name: "Black nitrile gloves (box)",
    description:
      "Powder-free black nitrile gloves — a studio essential. Shown as an Amazon example product for the shop architecture.",
    priceCents: 1199,
    category: "supplies",
    imageUrl:
      "https://images.unsplash.com/photo-1583947215259-38e31bebd861?auto=format&fit=crop&w=1200&q=80",
    sizes: ["M", "L", "XL"],
    featured: false,
    fulfillment: "amazon",
    amazonAsin: "PENDING-NITRILE-GLOVES",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "9",
    slug: "flash-sheet-book",
    name: "Traditional flash sheet book",
    description:
      "Classic tattoo flash reference book for inspiration and wall energy. Amazon example — checkout stays on Amazon.",
    priceCents: 2499,
    category: "merch",
    imageUrl:
      "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?auto=format&fit=crop&w=1200&q=80",
    sizes: ["ONE"],
    featured: true,
    fulfillment: "amazon",
    amazonAsin: "PENDING-FLASH-BOOK",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "10",
    slug: "ink-cap-set",
    name: "Disposable ink cap set",
    description:
      "Single-use ink caps for clean sessions. Placeholder Amazon product wired into the late-checkout bag flow.",
    priceCents: 999,
    category: "supplies",
    imageUrl:
      "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1200&q=80",
    sizes: ["ONE"],
    featured: false,
    fulfillment: "amazon",
    amazonAsin: "PENDING-INK-CAPS",
    createdAt: now(),
    updatedAt: now(),
  },
];
