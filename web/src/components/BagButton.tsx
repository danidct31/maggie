"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useBag } from "@/lib/bag";
import { formatPrice } from "@/lib/types";

export function BagButton() {
  const { count, items, removeItem, clear, checkoutAmazonUrl, studioItems } =
    useBag();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="nav-link"
        aria-label={`Bag (${count})`}
        onClick={() => setOpen(true)}
      >
        Bag ({count})
      </button>

      {open && (
        <div className="fixed inset-0 z-[80]">
          <button
            type="button"
            className="absolute inset-0 bg-ink/70"
            aria-label="Close bag"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-neon/20 bg-[var(--paper)] text-[var(--foreground)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-5">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                Bag
              </h2>
              <button
                type="button"
                className="text-sm text-mute nav-link"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {items.length === 0 ? (
                <p className="text-sm text-mute">
                  Empty for now — add vouchers or Amazon studio picks.
                </p>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li key={item.productId} className="flex gap-4">
                      <Link
                        href={`/product/${item.slug}`}
                        className="relative h-20 w-16 shrink-0 overflow-hidden bg-mist"
                        onClick={() => setOpen(false)}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-semibold leading-tight">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-mute">
                          {item.fulfillment === "amazon"
                            ? "Amazon"
                            : "Studio"}{" "}
                          · ×{item.quantity}
                        </p>
                        <p className="mt-1 text-sm tabular-nums">
                          {formatPrice(item.priceCents * item.quantity)}
                        </p>
                        <button
                          type="button"
                          className="mt-2 text-xs text-mute underline underline-offset-2"
                          onClick={() => removeItem(item.productId)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-3 border-t border-line px-5 py-5">
              {checkoutAmazonUrl ? (
                <a
                  href={checkoutAmazonUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn btn-primary w-full"
                  onClick={() => setOpen(false)}
                >
                  <span>Checkout Amazon items</span>
                </a>
              ) : (
                items.some((i) => i.fulfillment === "amazon") && (
                  <p className="text-xs leading-relaxed text-mute">
                    Amazon checkout unlocks when real ASINs replace the PENDING
                    placeholders.
                  </p>
                )
              )}

              {studioItems.length > 0 && (
                <p className="text-xs leading-relaxed text-mute">
                  Studio vouchers stay with Maggie — payment for those comes in a
                  later step (Stripe / studio checkout).
                </p>
              )}

              {items.length > 0 && (
                <button
                  type="button"
                  className="btn btn-ghost w-full !text-[var(--foreground)] !border-[var(--line)]"
                  onClick={clear}
                >
                  <span>Clear bag</span>
                </button>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
