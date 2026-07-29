"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { useI18n } from "@/lib/i18n/context";

export default function LoginClient() {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setError(t.login.error);
        return;
      }
      router.replace(next.startsWith("/") ? next : "/admin");
      router.refresh();
    } catch {
      setError(t.login.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16 md:px-8">
        <p className="text-xs uppercase tracking-[0.22em] text-mute">
          {t.login.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-neon">
          {t.login.title}
        </h1>
        <p className="mt-3 text-sm text-white/70">{t.login.body}</p>

        <form onSubmit={onSubmit} className="mt-10 space-y-5">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mute">
              {t.login.username}
            </span>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="admin-input"
              required
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mute">
              {t.login.password}
            </span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              required
            />
          </label>

          {error ? (
            <p className="text-sm text-ember-glow" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="btn-primary inline-flex w-full items-center justify-center rounded-sm px-5 py-3 text-sm font-semibold uppercase tracking-wide disabled:opacity-60"
            disabled={loading}
          >
            {loading ? t.login.submitting : t.login.submit}
          </button>
        </form>

        <Link
          href="/"
          className="mt-8 text-center text-sm text-white/55 transition hover:text-neon"
        >
          {t.login.back}
        </Link>
      </main>
    </>
  );
}
