import Link from "next/link";

type MaggieLogoProps = {
  size?: "nav" | "hero" | "footer";
  href?: string | null;
  className?: string;
};

const sizeClass = {
  nav: "text-xl md:text-2xl tracking-[0.04em]",
  hero: "text-[12vw] md:text-[8.5rem] leading-[0.85] tracking-[0.02em]",
  footer: "text-4xl md:text-5xl tracking-[0.04em]",
};

export function MaggieLogo({
  size = "nav",
  href = "/",
  className = "",
}: MaggieLogoProps) {
  const mark = (
    <span
      className={`maggie-logo font-display font-bold uppercase ${sizeClass[size]} ${className}`}
      aria-label="Maggie Studio"
    >
      Maggie Studio
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} className="inline-block" aria-label="Maggie Studio home">
      {mark}
    </Link>
  );
}
