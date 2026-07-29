"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useI18n } from "@/lib/i18n/context";

type SheetMeta = {
  fileName: string | null;
  uploadedAt: string | null;
  shareUrl: string | null;
};

export default function AdministrationPage() {
  const { t } = useI18n();
  const [meta, setMeta] = useState<SheetMeta | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function loadMeta() {
    const res = await fetch("/api/admin/sheet");
    if (!res.ok) return;
    const data = (await res.json()) as SheetMeta;
    setMeta(data);
    setShareUrl(data.shareUrl ?? "");
  }

  useEffect(() => {
    void loadMeta();
  }, []);

  async function onUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/sheet", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? t.administration.uploadError);
        return;
      }
      setMeta(json);
      setMessage(t.administration.uploadOk);
      form.reset();
    } catch {
      setError(t.administration.uploadError);
    } finally {
      setBusy(false);
    }
  }

  async function onSaveLink(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shareUrl }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? t.administration.linkError);
        return;
      }
      setMeta(json);
      setMessage(t.administration.linkOk);
    } catch {
      setError(t.administration.linkError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <Link
          href="/admin"
          className="text-sm text-white/55 transition hover:text-neon"
        >
          {t.administration.back}
        </Link>

        <p className="mt-8 text-xs uppercase tracking-[0.22em] text-mute">
          {t.administration.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-neon md:text-5xl">
          {t.administration.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
          {t.administration.body}
        </p>

        <section className="mt-12 space-y-3 border-t border-neon/15 pt-10">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-tight">
            {t.administration.uploadTitle}
          </h2>
          <p className="text-sm text-white/65">{t.administration.uploadBody}</p>

          <form onSubmit={onUpload} className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">
            <label className="block flex-1">
              <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mute">
                {t.administration.fileLabel}
              </span>
              <input
                type="file"
                name="file"
                accept=".xlsx,.xls,.csv,.ods,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
                className="admin-input file:mr-4 file:border-0 file:bg-transparent file:text-sm file:text-neon"
                required
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="btn-primary rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-wide disabled:opacity-60"
            >
              {t.administration.upload}
            </button>
          </form>

          {meta?.fileName ? (
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/75">
              <span>
                {t.administration.currentFile}:{" "}
                <strong className="text-white">{meta.fileName}</strong>
                {meta.uploadedAt
                  ? ` · ${new Date(meta.uploadedAt).toLocaleString()}`
                  : null}
              </span>
              <a
                href="/api/admin/sheet?download=1"
                className="btn-ghost rounded-sm px-4 py-2 text-xs uppercase tracking-wide"
              >
                {t.administration.download}
              </a>
            </div>
          ) : (
            <p className="mt-4 text-sm text-mute">{t.administration.noFile}</p>
          )}
        </section>

        <section className="mt-12 space-y-3 border-t border-neon/15 pt-10">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-tight">
            {t.administration.linkTitle}
          </h2>
          <p className="text-sm text-white/65">{t.administration.linkBody}</p>

          <form onSubmit={onSaveLink} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mute">
                {t.administration.linkLabel}
              </span>
              <input
                type="url"
                value={shareUrl}
                onChange={(e) => setShareUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/..."
                className="admin-input"
              />
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={busy}
                className="btn-primary rounded-sm px-6 py-3 text-sm font-semibold uppercase tracking-wide disabled:opacity-60"
              >
                {t.administration.saveLink}
              </button>
              {meta?.shareUrl ? (
                <a
                  href={meta.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost rounded-sm px-6 py-3 text-sm uppercase tracking-wide"
                >
                  {t.administration.openLink}
                </a>
              ) : null}
            </div>
          </form>
        </section>

        {message ? (
          <p className="mt-8 text-sm text-neon" role="status">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="mt-8 text-sm text-ember-glow" role="alert">
            {error}
          </p>
        ) : null}
      </main>
    </>
  );
}
