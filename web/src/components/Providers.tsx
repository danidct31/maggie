"use client";

import { BagProvider } from "@/lib/bag";

export function Providers({ children }: { children: React.ReactNode }) {
  return <BagProvider>{children}</BagProvider>;
}
