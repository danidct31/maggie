import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { ShopView } from "@/components/ShopView";
import { getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Shop",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products = await getProducts(category);

  return (
    <>
      <SiteHeader />
      <ShopView products={products} category={category} />
    </>
  );
}
