import type { Metadata } from "next";
import { Manrope, Oswald } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "Maggie Studio — Gift vouchers & tattoo merch",
    template: "%s · Maggie Studio",
  },
  description:
    "Maggie Studio — buy gift vouchers (vales de regalo) and tattoo merch online. Ink that starts as a gift.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
