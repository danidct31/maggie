"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductActions } from "@/components/ProductActions";
import { useI18n, useProductCopy } from "@/lib/i18n/context";
import { formatPrice } from "@/lib/types";
import type { Product } from "@/lib/types";

export function ProductView({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { t, locale } = useI18n();
  const copy = useProductCopy(product.slug, product.name, product.description);

  return (
    <main className="mx-auto max-w-7xl flex-1 px-5 py-10 md:px-8 md:py-16">
      <Link
        href="/shop"
        className="text-sm text-mute transition hover:text-foreground"
      >
        {t.product.back}
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[3/4] overflow-hidden bg-mist">
          <Image
            src={product.imageUrl}
            alt={copy.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="lg:pt-8">
          <p className="text-xs uppercase tracking-[0.22em] text-mute">
            {t.categories[product.category] ?? product.category}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {copy.name}
          </h1>
          <p className="mt-4 text-xl tabular-nums text-foreground">
            {formatPrice(product.priceCents, locale)}
          </p>
          <p className="mt-8 max-w-md text-base leading-relaxed text-mute">
            {copy.description}
          </p>
          <ProductActions product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 border-t border-line pt-16">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
            {t.product.moreIn}{" "}
            {t.categories[product.category] ?? product.category}
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((item) => (
              <RelatedCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function RelatedCard({ item, locale }: { item: Product; locale: string }) {
  const copy = useProductCopy(item.slug, item.name, item.description);

  return (
    <Link href={`/product/${item.slug}`} className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-mist">
        <Image
          src={item.imageUrl}
          alt={copy.name}
          fill
          className="product-image object-cover"
          sizes="25vw"
        />
      </div>
      <p className="mt-3 font-display font-semibold text-foreground">
        {copy.name}
      </p>
      <p className="text-sm tabular-nums text-mute">
        {formatPrice(item.priceCents, locale)}
      </p>
    </Link>
  );
}
