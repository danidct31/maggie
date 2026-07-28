/**
 * Amazon Associates architecture (ready before the real shop exists).
 *
 * Flow:
 * 1. Products live on Maggie Studio (browse, detail, bag).
 * 2. Items with fulfillment === "amazon" carry an ASIN.
 * 3. Checkout builds an Amazon cart URL and sends the user there once.
 *
 * Later: swap placeholder ASINs for real ones + set Associate Tag.
 * Optional next step: Product Advertising API (PA-API) for live price/image.
 */

export type AmazonMarketplace = "es" | "com" | "co.uk" | "de" | "fr" | "it";

const MARKETPLACE_HOST: Record<AmazonMarketplace, string> = {
  es: "www.amazon.es",
  com: "www.amazon.com",
  "co.uk": "www.amazon.co.uk",
  de: "www.amazon.de",
  fr: "www.amazon.fr",
  it: "www.amazon.it",
};

export type AmazonConfig = {
  /** Associates tracking id, e.g. maggiestudio-21 */
  associateTag: string;
  marketplace: AmazonMarketplace;
  /** When false, CTAs stay visible but warn that the shop is not live yet */
  enabled: boolean;
};

export function getAmazonConfig(): AmazonConfig {
  const associateTag =
    process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG?.trim() || "maggiestudio-21";
  const marketplace = (process.env.NEXT_PUBLIC_AMAZON_MARKETPLACE?.trim() ||
    "es") as AmazonMarketplace;
  const enabled =
    process.env.NEXT_PUBLIC_AMAZON_ENABLED === "true" ||
    Boolean(process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG);

  return {
    associateTag,
    marketplace: MARKETPLACE_HOST[marketplace] ? marketplace : "es",
    enabled,
  };
}

export function amazonHost(marketplace: AmazonMarketplace = getAmazonConfig().marketplace) {
  return MARKETPLACE_HOST[marketplace];
}
