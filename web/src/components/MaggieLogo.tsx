import Link from "next/link";

type MaggieLogoProps = {
  size?: "nav" | "hero" | "footer";
  href?: string | null;
  className?: string;
};

const sizeClass = {
  nav: "maggie-logo--nav",
  hero: "maggie-logo--hero",
  footer: "maggie-logo--footer",
};

export function MaggieLogo({
  size = "nav",
  href = "/",
  className = "",
}: MaggieLogoProps) {
  const mark = (
    <span
      className={`maggie-logo ${sizeClass[size]} ${className}`}
      aria-label="Maggie Studio"
    >
      <span className="maggie-logo-name">maggie</span>
      <span className="maggie-logo-studio">STUDIO</span>
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} className="inline-block" aria-label="Maggie Studio home">
      {mark}
    </Link>
  );
}
