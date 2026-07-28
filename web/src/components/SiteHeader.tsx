"use client";

import Link from "next/link";
import { BagButton } from "@/components/BagButton";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MaggieLogo } from "@/components/MaggieLogo";
import { useI18n } from "@/lib/i18n/context";

export function SiteHeader({
  transparent = false,
}: {
  transparent?: boolean;
}) {
  const { t } = useI18n();

  return (
    <header
      className={
        transparent
          ? "absolute inset-x-0 top-0 z-50"
          : "sticky top-0 z-50 border-b border-neon/15 bg-ink"
      }
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <Link
          href="/shop"
          className="nav-link text-sm tracking-wide text-white/85"
        >
          {t.nav.shop}
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2">
          <MaggieLogo size="nav" />
        </div>

        <div className="flex items-center gap-4 text-sm tracking-wide text-white/85 md:gap-5">
          <a
            href="https://www.instagram.com/lamaggietattoo_studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-white/85 transition hover:text-neon"
            aria-label="Instagram Maggie Studio"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 3.691a6.146 6.146 0 1 0 0 12.292 6.146 6.146 0 0 0 0-12.292zm0 10.155a4.009 4.009 0 1 1 0-8.018 4.009 4.009 0 0 1 0 8.018zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
          <LanguageToggle />
          <BagButton />
        </div>
      </div>
    </header>
  );
}
