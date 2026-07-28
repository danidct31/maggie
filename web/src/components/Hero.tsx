"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n/context";

type LabelKey =
  | "wallShop"
  | "wallVouchers"
  | "wallAftercare"
  | "wallSupplies"
  | "wallMerch"
  | "wallBio"
  | "wallContact"
  | "wallInstagram";

type ContourSpot = {
  id: string;
  href: string;
  labelKey: LabelKey;
  d: string;
  external?: boolean;
  labelX: number;
  labelY: number;
};

/** Object contours on /images/1.jpeg (1600×1200). */
const contours: ContourSpot[] = [
  {
    id: "make-art",
    href: "/shop",
    labelKey: "wallShop",
    d: "M95 705 H305 V1095 H95 Z",
    labelX: 200,
    labelY: 900,
  },
  {
    id: "skull",
    href: "/shop?category=vales",
    labelKey: "wallVouchers",
    d: "M430 250 C500 210 590 205 660 240 C720 280 745 350 730 420 C715 500 670 545 600 560 C520 575 450 540 410 470 C375 400 380 300 430 250 Z",
    labelX: 560,
    labelY: 400,
  },
  {
    id: "heart-mirror",
    href: "/shop?category=aftercare",
    labelKey: "wallAftercare",
    d: "M800 640 C760 600 700 610 695 670 C690 720 760 780 800 820 C840 780 910 720 905 670 C900 610 840 600 800 640 Z",
    labelX: 800,
    labelY: 700,
  },
  {
    id: "patent",
    href: "/shop?category=supplies",
    labelKey: "wallSupplies",
    d: "M930 275 H1175 V715 H930 Z",
    labelX: 1050,
    labelY: 490,
  },
  {
    id: "leopard",
    href: "/shop?category=merch",
    labelKey: "wallMerch",
    d: "M1235 365 H1490 V640 H1235 Z",
    labelX: 1360,
    labelY: 500,
  },
  {
    id: "roses",
    href: "#bio",
    labelKey: "wallBio",
    d: "M900 20 C980 20 1055 70 1055 160 C1055 250 980 330 900 330 C820 330 745 250 745 160 C745 70 820 20 900 20 Z",
    labelX: 900,
    labelY: 170,
  },
  {
    id: "botanical",
    href: "mailto:hello@maggiestudio.shop",
    labelKey: "wallContact",
    d: "M690 875 H910 V1165 H690 Z",
    labelX: 800,
    labelY: 1020,
    external: true,
  },
  {
    id: "instagram-frame",
    href: "https://www.instagram.com/lamaggietattoo_studio/",
    labelKey: "wallInstagram",
    d: "M275 575 H405 V735 H275 Z",
    labelX: 340,
    labelY: 655,
    external: true,
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
          className="hero-media-image object-cover object-center"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/20" />
      </div>

      <svg
        className="absolute inset-0 z-10 h-full w-full"
        viewBox="0 0 1600 1200"
        preserveAspectRatio="xMidYMid slice"
        role="navigation"
        aria-label={t.hero.wallHint}
      >
        <defs>
          <filter id="contourGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="4"
              floodColor="#ffcc33"
              floodOpacity="0.55"
            />
          </filter>
        </defs>

        {contours.map((spot) => {
          const label = t.hero[spot.labelKey];
          const isHttp = spot.href.startsWith("http");

          return (
            <a
              key={spot.id}
              href={spot.href}
              className="wall-contour-link"
              aria-label={label}
              {...(isHttp
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <path d={spot.d} className="wall-contour" />
              <foreignObject
                x={spot.labelX - 90}
                y={spot.labelY - 70}
                width="180"
                height="40"
                className="pointer-events-none overflow-visible"
              >
                <div className="wall-contour-label flex justify-center">
                  <span>{label}</span>
                </div>
              </foreignObject>
            </a>
          );
        })}
      </svg>

      <div className="pointer-events-none relative z-20 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-32 md:px-8 md:pb-14">
        <p className="max-w-md text-sm tracking-wide text-white/75 md:text-base">
          {t.hero.wallHint}
        </p>
      </div>
    </section>
  );
}
