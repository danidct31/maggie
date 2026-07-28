"use client";

import { useI18n } from "@/lib/i18n/context";
import type { Locale } from "@/lib/i18n/dictionaries";

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  const options: { id: Locale; label: string }[] = [
    { id: "it", label: "IT" },
    { id: "en", label: "EN" },
  ];

  return (
    <div
      className="inline-flex items-center gap-1 border border-white/25 p-0.5 text-xs tracking-[0.14em]"
      role="group"
      aria-label="Language"
    >
      {options.map((option) => {
        const active = locale === option.id;
        return (
          <button
            key={option.id}
            type="button"
            className={`min-w-9 px-2 py-1 font-semibold transition ${
              active
                ? "bg-neon text-ink"
                : "text-white/75 hover:text-white"
            }`}
            aria-pressed={active}
            onClick={() => setLocale(option.id)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
