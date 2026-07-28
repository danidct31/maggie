"use client";

import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { useI18n } from "@/lib/i18n/context";
import type { Product } from "@/lib/types";

export function HomeSections({ featured }: { featured: Product[] }) {
  const { t } = useI18n();

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-mute">
              {t.home.featured}
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
              {t.home.studioPicks}
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm tracking-wide text-foreground underline decoration-line underline-offset-4 transition hover:decoration-neon"
          >
            {t.home.viewAll}
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="relative overflow-hidden bg-ink px-5 py-24 text-paper md:px-8 md:py-32">
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-neon/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.22em] text-white/50">
            {t.home.why}
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight md:text-6xl">
            {t.home.whyTitle1}
            <br />
            {t.home.whyTitle2}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
            {t.home.whyBody}
          </p>
        </div>
      </section>
    </>
  );
}
