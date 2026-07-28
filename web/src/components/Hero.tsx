"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-white">
      <div className="hero-media">
        <Image
          src="/images/1.jpeg"
          alt={t.hero.alt}
          fill
          priority
          className="hero-media-image object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <div className="mt-6 flex max-w-xl flex-col gap-6 md:mt-4 md:flex-row md:items-end md:justify-between md:max-w-none">
          <p className="animate-rise-delay-1 text-base leading-relaxed text-white/85 md:max-w-md md:text-lg">
            {t.hero.tagline}
          </p>
          <div className="animate-rise-delay-2 flex flex-wrap gap-3">
            <Link href="/shop?category=vales" className="btn btn-primary">
              <span>{t.hero.ctaVoucher}</span>
            </Link>
            <Link href="/shop?category=merch" className="btn btn-ghost">
              <span>{t.hero.ctaMerch}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
