"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

type Hotspot = {
  id: string;
  href: string;
  labelKey:
    | "wallShop"
    | "wallVouchers"
    | "wallAftercare"
    | "wallSupplies"
    | "wallMerch"
    | "wallBio"
    | "wallContact"
    | "wallInstagram";
  /** percent of hero box */
  style: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
  external?: boolean;
  paintedIg?: boolean;
};

/**
 * Hotspots mapped to objects on /images/1.jpeg (wall as menu).
 * Positions are % of the hero viewport with object-cover centered.
 */
const hotspots: Hotspot[] = [
  {
    id: "make-art",
    href: "/shop",
    labelKey: "wallShop",
    style: { left: "8%", top: "58%", width: "16%", height: "28%" },
  },
  {
    id: "skull",
    href: "/shop?category=vales",
    labelKey: "wallVouchers",
    style: { left: "22%", top: "28%", width: "18%", height: "26%" },
  },
  {
    id: "heart-mirror",
    href: "/shop?category=aftercare",
    labelKey: "wallAftercare",
    style: { left: "42%", top: "52%", width: "12%", height: "14%" },
  },
  {
    id: "patent",
    href: "/shop?category=supplies",
    labelKey: "wallSupplies",
    style: { left: "58%", top: "30%", width: "14%", height: "32%" },
  },
  {
    id: "leopard",
    href: "/shop?category=merch",
    labelKey: "wallMerch",
    style: { left: "74%", top: "34%", width: "16%", height: "22%" },
  },
  {
    id: "roses",
    href: "#bio",
    labelKey: "wallBio",
    style: { left: "52%", top: "6%", width: "18%", height: "22%" },
  },
  {
    id: "botanical",
    href: "mailto:hello@maggiestudio.shop",
    labelKey: "wallContact",
    style: { left: "38%", top: "72%", width: "14%", height: "22%" },
    external: true,
  },
  {
    id: "instagram-frame",
    href: "https://www.instagram.com/lamaggietattoo_studio/",
    labelKey: "wallInstagram",
    style: { left: "26%", top: "54%", width: "11%", height: "14%" },
    external: true,
    paintedIg: true,
  },
];

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
          className="hero-media-image object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/25" />
      </div>

      <nav
        className="absolute inset-0 z-10"
        aria-label={t.hero.wallHint}
      >
        {hotspots.map((spot) => {
          const label = t.hero[spot.labelKey];
          const className =
            "wall-hotspot group absolute block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon";

          const content = (
            <>
              {spot.paintedIg && (
                <span className="painted-ig-frame absolute inset-[8%] overflow-hidden rounded-[2px] shadow-[0_0_18px_rgba(255,204,51,0.35)]">
                  <Image
                    src="/images/instagram-painted.png"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </span>
              )}
              <span className="wall-hotspot-ring" aria-hidden />
              <span className="wall-hotspot-label">{label}</span>
            </>
          );

          if (spot.external || spot.href.startsWith("mailto:")) {
            return (
              <a
                key={spot.id}
                href={spot.href}
                className={className}
                style={spot.style}
                aria-label={label}
                {...(spot.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={spot.id}
              href={spot.href}
              className={className}
              style={spot.style}
              aria-label={label}
            >
              {content}
            </Link>
          );
        })}
      </nav>

      <div className="pointer-events-none relative z-20 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-32 md:px-8 md:pb-14">
        <p className="pointer-events-none max-w-md text-sm tracking-wide text-white/75 md:text-base">
          {t.hero.wallHint}
        </p>
      </div>
    </section>
  );
}
