import { AtlasPlanet } from "@/components/AtlasPlanet";
import { GiftCardsSection } from "@/components/GiftCardsSection";
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
      <GiftCardsSection />
      <MaggieBio />
      <HomeSections featured={featured} />
      <AtlasPlanet />
    </>
  );
}
