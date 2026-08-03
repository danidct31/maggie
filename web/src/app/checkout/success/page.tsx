"use client";

import Link from "next/link";
import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useBag } from "@/lib/bag";
import { useI18n } from "@/lib/i18n/context";

export default function CheckoutSuccessPage() {
  const { t } = useI18n();
  const { clear } = useBag();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-5 py-16 md:px-8">
        <p className="text-xs uppercase tracking-[0.22em] text-mute">
          {t.checkout.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-neon">
          {t.checkout.successTitle}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
          {t.checkout.successBody}
        </p>
        <Link
          href="/#gift-cards"
          className="btn-primary mt-10 inline-flex w-fit items-center justify-center rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-wide"
        >
          {t.checkout.back}
        </Link>
      </main>
    </>
  );
}
