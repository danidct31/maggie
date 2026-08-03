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
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const studioTotalCents = studioItems.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );

  async function payWithStripe() {
    if (studioItems.length === 0 || paying) return;
    setPaying(true);
    setPayError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          items: studioItems.map((item) => ({
            productId: item.productId,
            name: item.name,
            priceCents: item.priceCents,
            quantity: item.quantity,
            giftMessage: item.giftMessage ?? null,
            isGiftCard: Boolean(item.isGiftCard),
          })),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setPayError(data.error ?? t.bag.payError);
        return;
      }
      window.location.href = data.url;
    } catch {
      setPayError(t.bag.payError);
    } finally {
      setPaying(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="nav-link inline-flex items-center gap-1.5 whitespace-nowrap"
        aria-label={`${t.nav.bag} (${count})`}
        onClick={() => setOpen(true)}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 sm:hidden"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden
        >
          <path
            d="M6 8h12l-1 12H7L6 8zm3-3a3 3 0 0 1 6 0"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="hidden sm:inline">
          {t.nav.bag} ({count})
        </span>
        <span className="sm:hidden text-sm">{count}</span>
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
              {studioItems.length > 0 && (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-mute">{t.bag.studioTotal}</span>
                    <span className="font-display text-lg font-semibold tabular-nums text-neon">
                      {formatPrice(studioTotalCents, locale)}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary w-full disabled:opacity-60"
                    onClick={payWithStripe}
                    disabled={paying}
                  >
                    <span>{paying ? t.bag.paying : t.bag.payStripe}</span>
                  </button>
                  <p className="text-xs leading-relaxed text-mute">
                    {t.bag.studioNote}
                  </p>
                </>
              )}

              {checkoutAmazonUrl ? (
                <a
                  href={checkoutAmazonUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn btn-ghost w-full !text-[var(--foreground)] !border-[var(--line)]"
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

              {payError ? (
                <p className="text-sm text-ember-glow" role="alert">
                  {payError}
                </p>
              ) : null}

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
    giftMessage?: string | null;
    isGiftCard?: boolean;
  };
  locale: string;
  onRemove: () => void;
  onNavigate: () => void;
}) {
  const { t } = useI18n();
  const copy = useProductCopy(item.slug, item.name, "");
  const title = item.isGiftCard ? item.name : copy.name;

  return (
    <li className="flex gap-4">
      {item.isGiftCard ? (
        <div className="relative flex h-20 w-16 shrink-0 items-center justify-center overflow-hidden bg-[#2a160e] text-center">
          <span className="px-1 font-display text-sm font-bold text-neon">
            {formatPrice(item.priceCents, locale)}
          </span>
        </div>
      ) : (
        <Link
          href={`/product/${item.slug}`}
          className="relative h-20 w-16 shrink-0 overflow-hidden bg-mist"
          onClick={onNavigate}
        >
          <Image
            src={item.imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="64px"
          />
        </Link>
      )}
      <div className="min-w-0 flex-1">
        <p className="font-display font-semibold leading-tight">{title}</p>
        {item.giftMessage ? (
          <p className="mt-1 line-clamp-2 text-xs italic text-white/60">
            “{item.giftMessage}”
          </p>
        ) : null}
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-mute">
          {item.isGiftCard
            ? t.bag.giftCard
            : item.fulfillment === "amazon"
              ? t.bag.amazon
              : t.bag.studio}{" "}
          · ×{item.quantity}
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
