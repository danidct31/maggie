"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  buildAmazonCartUrl,
  isPlaceholderAsin,
  type AmazonCartLine,
} from "@/lib/amazon";
import type { Product } from "@/lib/types";

export type BagItem = {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  imageUrl: string;
  fulfillment: "studio" | "amazon";
  amazonAsin: string | null;
  quantity: number;
};

type BagContextValue = {
  items: BagItem[];
  count: number;
  addProduct: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  amazonLines: AmazonCartLine[];
  studioItems: BagItem[];
  checkoutAmazonUrl: string | null;
};

const STORAGE_KEY = "maggie-studio-bag-v1";
const BagContext = createContext<BagContextValue | null>(null);

function loadBag(): BagItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BagItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function BagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(loadBag());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addProduct = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          priceCents: product.priceCents,
          imageUrl: product.imageUrl,
          fulfillment: product.fulfillment,
          amazonAsin: product.amazonAsin,
          quantity,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const amazonLines = useMemo(
    () =>
      items
        .filter(
          (item) =>
            item.fulfillment === "amazon" &&
            item.amazonAsin &&
            !isPlaceholderAsin(item.amazonAsin),
        )
        .map((item) => ({
          asin: item.amazonAsin as string,
          quantity: item.quantity,
        })),
    [items],
  );

  const studioItems = useMemo(
    () => items.filter((item) => item.fulfillment === "studio"),
    [items],
  );

  const checkoutAmazonUrl =
    amazonLines.length > 0 ? buildAmazonCartUrl(amazonLines) : null;

  const value: BagContextValue = {
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    addProduct,
    removeItem,
    clear,
    amazonLines,
    studioItems,
    checkoutAmazonUrl,
  };

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) {
    throw new Error("useBag must be used within BagProvider");
  }
  return ctx;
}
