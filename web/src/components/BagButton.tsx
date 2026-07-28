"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useBag } from "@/lib/bag";
import { useI18n, useProductCopy } from "@/lib/i18n/context";
import { formatPrice } from "@/lib/types";

export function BagButton() {
  const { count, items, removeItem, clear, checkoutAmazonUrl, studioItems } =
    useBag();
  const { t, locale } = useI18n();
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
        aria-label={`${t.nav.bag} (${count})`}
        onClick={() => setOpen(true)}
      >
        {t.nav.bag} ({count})
      </button>

      {open && (
        <div className="fixed inset-0 z-[80]">
          <button
            type="button"
            className="absolute inset-0 bg-ink/70"
            aria-label={t.bag.close}
            onClick={() => setOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-neon/20 bg-[var(--paper)] text-[var(--foreground)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-5">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                {t.bag.title}
              </h2>
              <button
                type="button"
                className="text-sm text-mute nav-link"
                onClick={() => setOpen(false)}
              >
                {t.bag.close}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {items.length === 0 ? (
                <p className="text-sm text-mute">{t.bag.empty}</p>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <BagLine
                      key={item.productId}
                      item={item}
                      locale={locale}
                      onRemove={() => removeItem(item.productId)}
                      onNavigate={() => setOpen(false)}
                    />
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
                  <span>{t.bag.checkoutAmazon}</span>
                </a>
              ) : (
                items.some((i) => i.fulfillment === "amazon") && (
                  <p className="text-xs leading-relaxed text-mute">
                    {t.bag.amazonPending}
                  </p>
                )
              )}

              {studioItems.length > 0 && (
                <p className="text-xs leading-relaxed text-mute">
                  {t.bag.studioNote}
                </p>
              )}

              {items.length > 0 && (
                <button
                  type="button"
                  className="btn btn-ghost w-full !text-[var(--foreground)] !border-[var(--line)]"
                  onClick={clear}
                >
                  <span>{t.bag.clear}</span>
                </button>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

function BagLine({
  item,
  locale,
  onRemove,
  onNavigate,
}: {
  item: {
    productId: string;
    slug: string;
    name: string;
    priceCents: number;
    imageUrl: string;
    fulfillment: "studio" | "amazon";
    quantity: number;
  };
  locale: string;
  onRemove: () => void;
  onNavigate: () => void;
}) {
  const { t } = useI18n();
  const copy = useProductCopy(item.slug, item.name, "");

  return (
    <li className="flex gap-4">
      <Link
        href={`/product/${item.slug}`}
        className="relative h-20 w-16 shrink-0 overflow-hidden bg-mist"
        onClick={onNavigate}
      >
        <Image
          src={item.imageUrl}
          alt={copy.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <p className="font-display font-semibold leading-tight">{copy.name}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-mute">
          {item.fulfillment === "amazon" ? t.bag.amazon : t.bag.studio} · ×
          {item.quantity}
        </p>
        <p className="mt-1 text-sm tabular-nums">
          {formatPrice(item.priceCents * item.quantity, locale)}
        </p>
        <button
          type="button"
          className="mt-2 text-xs text-mute underline underline-offset-2"
          onClick={onRemove}
        >
          {t.bag.remove}
        </button>
      </div>
    </li>
  );
}
