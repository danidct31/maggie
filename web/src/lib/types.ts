export type Fulfillment = "studio" | "amazon";

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
  fulfillment: Fulfillment;
  amazonAsin: string | null;
  createdAt: string;
  updatedAt: string;
};

export function formatPrice(cents: number, locale: string = "it") {
  const numberLocale = locale === "en" ? "en-IE" : "it-IT";
  return new Intl.NumberFormat(numberLocale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function categoryLabel(category: string) {
  const labels: Record<string, string> = {
    vales: "Buoni regalo",
    aftercare: "Aftercare",
    supplies: "Materiali",
    merch: "Merch",
  };
  return labels[category] ?? category;
}

export function isAmazonProduct(product: Pick<Product, "fulfillment">) {
  return product.fulfillment === "amazon";
}
