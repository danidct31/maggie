"use client";

import Link from "next/link";
import { MaggieLogo } from "@/components/MaggieLogo";
import { useI18n } from "@/lib/i18n/context";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <MaggieLogo size="footer" href={null} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            {t.footer.blurb}
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm text-white/70">
          <Link href="/shop?category=vales" className="nav-link">
            {t.footer.vouchers}
          </Link>
          <Link href="/shop" className="nav-link">
            {t.footer.shopAll}
          </Link>
          <a href="mailto:hello@maggiestudio.shop" className="nav-link">
            {t.footer.contact}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-xs text-white/40 md:px-8">
        © {new Date().getFullYear()} Maggie Studio.
      </div>
    </footer>
  );
}
