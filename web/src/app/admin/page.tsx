"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { useI18n } from "@/lib/i18n/context";

export default function AdminPage() {
  const { t } = useI18n();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-mute">
              {t.admin.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-neon md:text-5xl">
              {t.admin.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              {t.admin.body}
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="btn-ghost shrink-0 rounded-sm px-4 py-2 text-xs uppercase tracking-wide"
          >
            {t.admin.logout}
          </button>
        </div>

        <div className="mt-12">
          <Link
            href="/admin/administration"
            className="btn-primary inline-flex items-center justify-center rounded-sm px-8 py-4 text-sm font-semibold uppercase tracking-wide"
          >
            {t.admin.administration}
          </Link>
        </div>
      </main>
    </>
  );
}
