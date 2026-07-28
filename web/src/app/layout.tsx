import type { Metadata } from "next";
import { Manrope, Nunito, Oswald } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Maggie Studio — Buoni regalo e merch tattoo",
    template: "%s · Maggie Studio",
  },
  description:
    "Maggie Studio — compra buoni regalo e materiali tattoo online. Prodotti dello studio qui; checkout Amazon quando sei pronto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${oswald.variable} ${manrope.variable} ${nunito.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Providers>
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
