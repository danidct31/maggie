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

  const links = [
    { href: "/shop", label: t.nav.shop },
    { href: "/shop?category=vales", label: t.nav.vouchers },
    { href: "/shop?category=aftercare", label: t.nav.aftercare },
    { href: "/shop?category=supplies", label: t.nav.supplies },
  ];

  return (
    <header
      className={
        transparent
          ? "absolute inset-x-0 top-0 z-50"
          : "sticky top-0 z-50 border-b border-neon/15 bg-ink"
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <nav className="hidden items-center gap-8 text-sm tracking-wide text-white/85 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
          <MaggieLogo size="nav" />
        </div>

        <div className="flex items-center gap-4 text-sm tracking-wide text-white/85 md:gap-5">
          <LanguageToggle />
          <Link href="/shop" className="nav-link md:hidden">
            {t.nav.shop}
          </Link>
          <BagButton />
        </div>
      </div>
    </header>
  );
}
