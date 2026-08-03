import { NextResponse } from "next/server";
import { getSiteUrl, getStripe } from "@/lib/stripe";

type CheckoutLine = {
  name?: string;
  priceCents?: number;
  quantity?: number;
  giftMessage?: string | null;
  isGiftCard?: boolean;
  productId?: string;
};

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to the web env." },
      { status: 503 },
    );
  }

  let body: { items?: CheckoutLine[]; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items : [];
  const lineItems = items
    .map((item) => {
      const priceCents = Math.round(Number(item.priceCents));
      const quantity = Math.max(1, Math.round(Number(item.quantity) || 1));
      const name = (item.name ?? "Gift card").trim().slice(0, 120);
      if (!Number.isFinite(priceCents) || priceCents < 100) return null;
      if (!Number.isFinite(quantity) || quantity > 20) return null;

      const description = item.giftMessage
        ? String(item.giftMessage).trim().slice(0, 200)
        : item.isGiftCard
          ? "Maggie Studio gift card"
          : "Maggie Studio";

      return {
        quantity,
        price_data: {
          currency: "eur",
          unit_amount: priceCents,
          product_data: {
            name,
            description: description || undefined,
            metadata: {
              productId: String(item.productId ?? ""),
              isGiftCard: item.isGiftCard ? "true" : "false",
            },
          },
        },
      };
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line));

  if (lineItems.length === 0) {
    return NextResponse.json(
      { error: "No payable studio items in the bag." },
      { status: 400 },
    );
  }

  const site = getSiteUrl();
  const locale = body.locale === "en" ? "en" : "it";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${site}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/checkout/cancel`,
      locale,
      billing_address_collection: "auto",
      metadata: {
        source: "maggie-studio-bag",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return NextResponse.json(
      { error: "Could not start Stripe checkout." },
      { status: 500 },
    );
  }
}
