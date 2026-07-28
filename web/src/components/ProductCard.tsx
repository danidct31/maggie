import Image from "next/image";
import Link from "next/link";
import { categoryLabel, formatPrice, isAmazonProduct } from "@/lib/types";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-mist">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="product-image object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {isAmazonProduct(product) && (
          <span className="absolute left-3 top-3 bg-ink/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neon">
            Amazon
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
            {product.name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-mute">
            {categoryLabel(product.category)}
          </p>
        </div>
        <p className="text-sm tabular-nums text-foreground">
          {formatPrice(product.priceCents)}
        </p>
      </div>
    </Link>
  );
}
