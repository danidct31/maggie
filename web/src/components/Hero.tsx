"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n/context";
import { wallCutouts } from "@/lib/wall-cutouts";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-white">
      {/* Stage matches object-cover crop of the 1600×1200 wall */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="wall-stage">
          <Image
            src="/images/1.jpeg"
            alt={t.hero.alt}
            fill
            priority
            className="object-fill"
            sizes="100vw"
          />

          <nav className="absolute inset-0 z-10" aria-label={t.hero.wallHint}>
            {wallCutouts.map((spot) => {
              const label = t.hero[spot.labelKey];
              const style = {
                left: `${spot.leftPct}%`,
                top: `${spot.topPct}%`,
                width: `${spot.widthPct}%`,
                height: `${spot.heightPct}%`,
              } as const;
              const isHttp = spot.href.startsWith("http");

              return (
                <a
                  key={spot.id}
                  href={spot.href}
                  className="wall-cutout-link group"
                  style={style}
                  aria-label={label}
                  {...(isHttp
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {spot.file ? (
                    <Image
                      src={spot.file}
                      alt=""
                      fill
                      className="wall-cutout-img object-contain drop-shadow-none transition duration-300 group-hover:drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
                      sizes="30vw"
                    />
                  ) : (
                    <span className="wall-cutout-hit" aria-hidden />
                  )}
                  <span className="wall-cutout-label">{label}</span>
                </a>
              );
            })}
          </nav>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent px-5 pb-10 pt-24 md:px-8 md:pb-14">
            <p className="mx-auto max-w-7xl text-sm tracking-wide text-white/75 md:text-base">
              {t.hero.wallHint}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
