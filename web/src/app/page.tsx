import { AtlasPlanet } from "@/components/AtlasPlanet";
import { Hero } from "@/components/Hero";
import { HomeSections } from "@/components/HomeSections";
import { MaggieBio } from "@/components/MaggieBio";
import { SiteHeader } from "@/components/SiteHeader";
import { getFeaturedProducts } from "@/lib/api";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      <SiteHeader transparent />
      <Hero />
      <MaggieBio />
      <HomeSections featured={featured} />
      <AtlasPlanet />
    </>
  );
}
