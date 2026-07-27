export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  category: string;
  imageUrl: string;
  sizes: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function categoryLabel(category: string) {
  const labels: Record<string, string> = {
    vales: "Gift vouchers",
    merch: "Merch",
    apparel: "Apparel",
  };
  return labels[category] ?? category;
}
