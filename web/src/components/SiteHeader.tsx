"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { BagButton } from "@/components/BagButton";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MaggieLogo } from "@/components/MaggieLogo";
import { useI18n } from "@/lib/i18n/context";

const navLinks = [
  { href: "/shop", labelKey: "shop" as const },
  { href: "/shop?category=vales", labelKey: "vouchers" as const },
  { href: "/shop?category=aftercare", labelKey: "aftercare" as const },
  { href: "/shop?category=supplies", labelKey: "supplies" as const },
  { href: "/shop?category=merch", labelKey: "merch" as const },
  { href: "/#bio", labelKey: "bio" as const },
];

export function SiteHeader({
  transparent = false,
}: {
  transparent?: boolean;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header
      className={
        transparent
          ? "absolute inset-x-0 top-0 z-50"
          : "sticky top-0 z-50 border-b border-neon/15 bg-ink"
      }
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 md:px-8 md:py-5">
        {/* Left: hamburger (mobile/tablet) or desktop nav */}
        <div className="flex min-w-0 flex-1 items-center">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/20 text-white transition hover:border-neon/70 hover:text-neon lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>

          <nav
            className="hidden items-center gap-4 text-sm tracking-wide text-white/85 xl:gap-5 lg:flex"
            aria-label={t.nav.menu}
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link whitespace-nowrap">
                {t.nav[link.labelKey]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <MaggieLogo size="nav" />
        </div>

        {/* Right tools — mirrored min width so logo stays centered */}
        <div className="flex min-w-0 flex-1 items-center justify-end gap-3 text-sm tracking-wide text-white/85 sm:gap-4">
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
          <Link
            href="/login"
            className="nav-link hidden whitespace-nowrap lg:inline"
          >
            {t.nav.login}
          </Link>
          <LanguageToggle />
          <BagButton />
        </div>
      </div>

      {open ? (
        <div
          id={panelId}
          className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-sm lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
        >
          <div className="flex h-full flex-col px-5 pb-8 pt-4">
            <div className="flex items-center justify-between">
              <MaggieLogo size="nav" href="/" />
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/20 text-white transition hover:border-neon/70 hover:text-neon"
                aria-label={t.nav.closeMenu}
                onClick={closeMenu}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="mt-10 flex flex-1 flex-col gap-1" aria-label={t.nav.menu}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="border-b border-white/10 py-4 font-display text-2xl uppercase tracking-wide text-white transition hover:text-neon"
                >
                  {t.nav[link.labelKey]}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={closeMenu}
                className="border-b border-white/10 py-4 font-display text-2xl uppercase tracking-wide text-white transition hover:text-neon"
              >
                {t.nav.login}
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
