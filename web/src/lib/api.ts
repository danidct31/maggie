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

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return await apiFetch<Product[]>(`/products${query}`);
  } catch {
    return fallbackProducts.filter((p) =>
      category ? p.category === category : true,
    );
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    return await apiFetch<Product[]>("/products/featured");
  } catch {
    return fallbackProducts.filter((p) => p.featured);
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    return await apiFetch<Product>(`/products/${slug}`);
  } catch {
    return fallbackProducts.find((p) => p.slug === slug) ?? null;
  }
}

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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    slug: "vale-250",
    name: "Gift voucher €250",
    description:
      "A €250 studio voucher for a full session credit. Ideal for someone ready for a serious piece. Valid for 12 months.",
    priceCents: 25000,
    category: "vales",
    imageUrl:
      "https://images.unsplash.com/photo-1607344645866-009c447b6a0b?auto=format&fit=crop&w=1200&q=80",
    sizes: ["ONE"],
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    slug: "ink-studio-tee",
    name: "Ink Studio Tee",
    description:
      "Heavyweight black tee with the Maggie Studio mark. Soft cotton, boxy fit — made for the shop floor and the street.",
    priceCents: 3200,
    category: "apparel",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    slug: "needle-tote",
    name: "Needle Tote",
    description:
      "Canvas tote with screen-printed studio line art. Holds a sketchbook, aftercare, and whatever else the day needs.",
    priceCents: 2800,
    category: "merch",
    imageUrl:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80",
    sizes: ["ONE"],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    slug: "flash-print-pack",
    name: "Flash Print Pack",
    description:
      "Three limited studio flash prints on heavy stock. Pick up in studio or ship — hang them or use them as reference.",
    priceCents: 4500,
    category: "merch",
    imageUrl:
      "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?auto=format&fit=crop&w=1200&q=80",
    sizes: ["ONE"],
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    slug: "aftercare-kit",
    name: "Aftercare Kit",
    description:
      "Studio-approved aftercare: fragrance-free wash, healing balm, and printed care card. Everything for the first weeks.",
    priceCents: 2400,
    category: "merch",
    imageUrl:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=80",
    sizes: ["ONE"],
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
