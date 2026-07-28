import Image from "next/image";

export function MaggieBio() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <div className="animate-rise">
          <p className="text-xs uppercase tracking-[0.22em] text-mute">
            The artist
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Meet Maggie
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-mute md:text-lg">
            <p>
              Maggie is the hand behind Maggie Studio — custom tattoos, flash,
              and the warm chaos of a wall that never stops collecting art.
            </p>
            <p>
              She works with clean lines, strong contrast, and pieces meant to
              age with you. Sessions are personal: from first sketch on the
              light pad to the last pass of ink.
            </p>
            <p>
              Gift a voucher for someone ready for their next piece, or take
              home a bit of the studio — merch, prints, and aftercare built the
              same way she tattoos: careful, lasting, no filler.
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden bg-mist md:aspect-[3/4]">
          <Image
            src="/images/2.jpeg"
            alt="Maggie working at her studio desk on a light pad"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
