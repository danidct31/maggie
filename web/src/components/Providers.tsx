"use client";

import { BagProvider } from "@/lib/bag";
import { LocaleProvider } from "@/lib/i18n/context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <BagProvider>{children}</BagProvider>
    </LocaleProvider>
  );
}
