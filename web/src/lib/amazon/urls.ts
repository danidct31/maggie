import { amazonHost, getAmazonConfig, type AmazonMarketplace } from "./config";

export type AmazonCartLine = {
  asin: string;
  quantity?: number;
};

/** Single product page on Amazon (last-step redirect). */
export function buildAmazonProductUrl(
  asin: string,
  options?: { marketplace?: AmazonMarketplace; tag?: string },
) {
  const config = getAmazonConfig();
  const host = amazonHost(options?.marketplace ?? config.marketplace);
  const tag = options?.tag ?? config.associateTag;
  const params = new URLSearchParams({ tag });
  return `https://${host}/dp/${encodeURIComponent(asin)}?${params.toString()}`;
}

/**
 * Add one or more ASINs to the Amazon cart in one hop.
 * Use this from the bag "Checkout on Amazon" button.
 */
export function buildAmazonCartUrl(
  lines: AmazonCartLine[],
  options?: { marketplace?: AmazonMarketplace; tag?: string },
) {
  const config = getAmazonConfig();
  const host = amazonHost(options?.marketplace ?? config.marketplace);
  const tag = options?.tag ?? config.associateTag;
  const params = new URLSearchParams({ AssociateTag: tag });

  lines
    .filter((line) => line.asin && !line.asin.startsWith("PENDING"))
    .forEach((line, index) => {
      const n = index + 1;
      params.set(`ASIN.${n}`, line.asin);
      params.set(`Quantity.${n}`, String(line.quantity ?? 1));
    });

  return `https://${host}/gp/aws/cart/add.html?${params.toString()}`;
}

export function isPlaceholderAsin(asin: string | null | undefined) {
  if (!asin) return true;
  return asin.startsWith("PENDING") || asin.startsWith("EXAMPLE");
}
