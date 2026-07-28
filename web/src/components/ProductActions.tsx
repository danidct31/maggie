"use client";

import { useState } from "react";
import {
  buildAmazonProductUrl,
  isPlaceholderAsin,
} from "@/lib/amazon";
import { useBag } from "@/lib/bag";
import { useI18n } from "@/lib/i18n/context";
import type { Product } from "@/lib/types";
import { isAmazonProduct } from "@/lib/types";

export function ProductActions({ product }: { product: Product }) {
  const { t } = useI18n();
  const showSizes = product.sizes.length > 1 || product.sizes[0] !== "ONE";
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [added, setAdded] = useState(false);
  const { addProduct } = useBag();
  const amazon = isAmazonProduct(product);
  const asinReady =
    Boolean(product.amazonAsin) && !isPlaceholderAsin(product.amazonAsin);

  return (
    <div className="mt-10 space-y-6">
      {showSizes && (
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-mute">
            {t.product.size}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`btn-chip ${size === s ? "is-active" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {amazon && (
        <p className="text-sm text-mute">
          {t.product.amazonNote}
          {!asinReady && (
            <span className="mt-1 block text-neon/80">
              {t.product.amazonPending}
            </span>
          )}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => {
            addProduct(product);
            setAdded(true);
            window.setTimeout(() => setAdded(false), 1800);
          }}
          className={`btn btn-ink ${added ? "is-success" : ""}`}
        >
          <span>
            {added
              ? t.product.added
              : product.category === "vales"
                ? t.product.addVoucher
                : t.product.addToBag}
          </span>
        </button>

        {amazon && asinReady && product.amazonAsin && (
          <a
            href={buildAmazonProductUrl(product.amazonAsin)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn btn-primary"
          >
            <span>{t.product.buyAmazon}</span>
          </a>
        )}
      </div>
    </div>
  );
}
