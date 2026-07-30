"use client";

import { FormEvent, useState } from "react";
import { useBag } from "@/lib/bag";
import { useI18n } from "@/lib/i18n/context";
import { formatPrice } from "@/lib/types";

const FIXED_AMOUNTS = [50, 100, 150, 200] as const;

function GiftCardFace({
  amountLabel,
  message,
  studio,
}: {
  amountLabel: string;
  message?: string;
  studio: string;
}) {
  return (
    <div className={`gift-card-face${message ? "" : " gift-card-face--plain"}`}>
      <p className="gift-card-studio">{studio}</p>
      <div className="gift-card-body">
        <p className="gift-card-amount">{amountLabel}</p>
        {message ? <p className="gift-card-message">{message}</p> : null}
      </div>
    </div>
  );
}

export function GiftCardsSection() {
  const { t, locale } = useI18n();
  const { addGiftCard } = useBag();
  const [addedAmount, setAddedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [preview, setPreview] = useState<{
    amountCents: number;
    message: string;
  } | null>(null);
  const [customError, setCustomError] = useState<string | null>(null);
  const [customAdded, setCustomAdded] = useState(false);

  function addFixed(euros: number) {
    addGiftCard({ amountCents: euros * 100 });
    setAddedAmount(euros);
    window.setTimeout(() => setAddedAmount(null), 1400);
  }

  function parseCustomAmount() {
    const normalized = customAmount.replace(",", ".").trim();
    const value = Number(normalized);
    if (!Number.isFinite(value) || value < 1) return null;
    return Math.round(value * 100);
  }

  function onCreate(event: FormEvent) {
    event.preventDefault();
    setCustomError(null);
    setCustomAdded(false);
    const amountCents = parseCustomAmount();
    if (amountCents == null) {
      setCustomError(t.giftCards.amountError);
      setPreview(null);
      return;
    }
    setPreview({
      amountCents,
      message: customMessage.trim(),
    });
  }

  function onSendToCart() {
    setCustomError(null);
    const amountCents = preview?.amountCents ?? parseCustomAmount();
    if (amountCents == null) {
      setCustomError(t.giftCards.amountError);
      return;
    }
    if (!preview) {
      setPreview({
        amountCents,
        message: customMessage.trim(),
      });
    }
    addGiftCard({
      amountCents,
      message: (preview?.message ?? customMessage).trim() || undefined,
    });
    setCustomAdded(true);
    window.setTimeout(() => setCustomAdded(false), 1600);
  }

  return (
    <section
      id="gift-cards"
      className="border-b border-line bg-paper scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs uppercase tracking-[0.22em] text-mute">
          {t.giftCards.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-neon md:text-5xl">
          {t.giftCards.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
          {t.giftCards.body}
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5">
          {FIXED_AMOUNTS.map((euros) => {
            const justAdded = addedAmount === euros;
            return (
              <button
                key={euros}
                type="button"
                onClick={() => addFixed(euros)}
                className="gift-card-btn group text-left"
                aria-label={`${t.giftCards.addFixed} ${euros}€`}
              >
                <GiftCardFace
                  amountLabel={`${euros}€`}
                  studio="Maggie Studio"
                />
                <span className="gift-card-cta">
                  {justAdded ? t.giftCards.added : t.giftCards.addToCart}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-14 border-t border-neon/15 pt-12">
          <h3 className="font-display text-2xl font-semibold uppercase tracking-tight md:text-3xl">
            {t.giftCards.customTitle}
          </h3>
          <p className="mt-3 max-w-xl text-sm text-white/65">
            {t.giftCards.customBody}
          </p>

          <form
            onSubmit={onCreate}
            className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start"
          >
            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mute">
                  {t.giftCards.amountLabel}
                </span>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setCustomError(null);
                      setCustomAdded(false);
                    }}
                    placeholder="75"
                    className="admin-input pr-10"
                    aria-invalid={Boolean(customError)}
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-mute">
                    €
                  </span>
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mute">
                  {t.giftCards.messageLabel}
                </span>
                <textarea
                  value={customMessage}
                  onChange={(e) => {
                    setCustomMessage(e.target.value);
                    setCustomAdded(false);
                  }}
                  rows={4}
                  maxLength={180}
                  placeholder={t.giftCards.messagePlaceholder}
                  className="admin-input min-h-[7rem] resize-y"
                />
              </label>

              {customError ? (
                <p className="text-sm text-ember-glow" role="alert">
                  {customError}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="btn-primary inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-wide"
                >
                  {t.giftCards.create}
                </button>
                <button
                  type="button"
                  onClick={onSendToCart}
                  className="btn-ghost inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-wide"
                >
                  {customAdded ? t.giftCards.added : t.giftCards.sendToCart}
                </button>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-mute">
                {t.giftCards.preview}
              </p>
              {preview ? (
                <div className="gift-card-preview animate-rise">
                  <GiftCardFace
                    amountLabel={formatPrice(preview.amountCents, locale)}
                    message={preview.message || undefined}
                    studio="Maggie Studio"
                  />
                </div>
              ) : (
                <div className="gift-card-preview gift-card-preview--empty">
                  <p className="text-sm text-mute">{t.giftCards.previewEmpty}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
