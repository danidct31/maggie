import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/ProductView";
import { SiteHeader } from "@/components/SiteHeader";
import { getProduct, getProducts } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = (await getProducts(product.category))
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <SiteHeader />
      <ProductView product={product} related={related} />
    </>
  );
}
