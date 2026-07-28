"use client";

import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { useI18n } from "@/lib/i18n/context";
import type { Product } from "@/lib/types";

export function ShopView({
  products,
  category,
}: {
  products: Product[];
  category?: string;
}) {
  const { t } = useI18n();

  const categories = [
    { value: "", label: t.shop.all },
    { value: "vales", label: t.categories.vales },
    { value: "aftercare", label: t.categories.aftercare },
    { value: "supplies", label: t.categories.supplies },
    { value: "merch", label: t.categories.merch },
  ];

  return (
    <main className="mx-auto max-w-7xl flex-1 px-5 py-14 md:px-8 md:py-20">
      <p className="text-xs uppercase tracking-[0.22em] text-mute">
        {t.shop.catalog}
      </p>
      <h1 className="mt-3 font-display text-5xl font-bold uppercase tracking-tight text-foreground md:text-6xl">
        {t.shop.title}
      </h1>
      <p className="mt-4 max-w-lg text-mute">{t.shop.blurb}</p>

      <div className="mt-10 flex flex-wrap gap-2 border-b border-line pb-6">
        {categories.map((cat) => {
          const active = (category ?? "") === cat.value;
          const href = cat.value ? `/shop?category=${cat.value}` : "/shop";
          return (
            <Link
              key={cat.value || "all"}
              href={href}
              className={`btn-chip ${active ? "is-active" : ""}`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-12">
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
