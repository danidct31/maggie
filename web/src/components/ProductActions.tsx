"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";

export function ProductActions({ product }: { product: Product }) {
  const showSizes = product.sizes.length > 1 || product.sizes[0] !== "ONE";
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [added, setAdded] = useState(false);
  const isVale = product.category === "vales";

  return (
    <div className="mt-10 space-y-6">
      {showSizes && (
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-mute">
            Size
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

      <button
        type="button"
        onClick={() => {
          setAdded(true);
          window.setTimeout(() => setAdded(false), 1800);
        }}
        className={`btn btn-ink ${added ? "is-success" : ""}`}
      >
        <span>
          {added
            ? "Added to bag"
            : isVale
              ? "Add voucher to bag"
              : "Add to bag"}
        </span>
      </button>
    </div>
  );
}
