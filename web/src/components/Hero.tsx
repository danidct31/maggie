"use client";

import Image from "next/image";
import Link from "next/link";
import { MaggieLogo } from "@/components/MaggieLogo";
import { useI18n } from "@/lib/i18n/context";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/1.jpeg"
          alt={t.hero.alt}
          fill
          priority
          className="object-cover object-center animate-drift"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-ink/30" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
        <div className="animate-rise max-w-2xl">
          <MaggieLogo size="hero" href={null} />
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
            {t.hero.tagline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/shop?category=vales"
              className="btn-primary inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-wide"
            >
              {t.hero.ctaVoucher}
            </Link>
            <Link
              href="/shop?category=merch"
              className="btn-ghost inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-wide"
            >
              {t.hero.ctaMerch}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
