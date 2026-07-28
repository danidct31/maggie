"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n/context";

export function MaggieBio() {
  const { t } = useI18n();

  return (
    <section id="bio" className="border-b border-line bg-paper scroll-mt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <div className="animate-rise">
          <p className="text-xs uppercase tracking-[0.22em] text-mute">
            {t.bio.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            {t.bio.title}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-mute md:text-lg">
            <p>{t.bio.p1}</p>
            <p>{t.bio.p2}</p>
            <p>{t.bio.p3}</p>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden bg-mist md:aspect-[3/4]">
          <Image
            src="/images/2.jpeg"
            alt={t.bio.alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
