import Image from "next/image";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/motion/Reveal";

type Props = {
  eyebrow?: string;
  titleTop: string;
  titleBottom?: string;
  subtitle?: string;
  bgImage?: string;
  /** breadcrumb-style trailing text shown on the right */
  trailing?: string;
  hideFooterStrip?: boolean;
};

/**
 * Inner-page hero — smaller than the homepage hero, used at the top of
 * every menu-driven page. Subtle full-bleed background image,
 * eyebrow + two-line serif headline + optional subtitle.
 */
export default function PageHero({
  eyebrow,
  titleTop,
  titleBottom,
  subtitle,
  bgImage,
  trailing,
  hideFooterStrip,
}: Props) {
  return (
    <section className="relative isolate flex min-h-[65svh] flex-col justify-between overflow-hidden px-4 pb-6 pt-24 sm:min-h-[70svh] sm:px-6 sm:pt-28 lg:px-10 lg:pb-10 lg:pt-40">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        {bgImage && (
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "sepia(0.18) saturate(0.85) brightness(0.45) contrast(1.05)" }}
          />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[color:var(--bg)]/50" />
        <div className="absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-[color:var(--accent)]/8 blur-[160px]" />
      </div>

      {eyebrow && (
        <Reveal as="div" y={20} className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
          <span className="inline-block h-px w-8 bg-[color:var(--brand-green)]" />
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--brand-green)]" />
          <span>{eyebrow}</span>
        </Reveal>
      )}

      <div className="my-8 max-w-6xl lg:my-20">
        <SplitReveal
          as="h1"
          className="font-display h-page"
        >
          {titleTop}
        </SplitReveal>
        {titleBottom && (
          <SplitReveal
            as="h1"
            delay={0.1}
            className="font-display h-page text-[color:var(--accent)]"
          >
            {titleBottom}
          </SplitReveal>
        )}

        {subtitle && (
          <Reveal
            as="p"
            delay={0.4}
            className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--muted)] lg:mt-10 lg:text-lg"
          >
            {subtitle}
          </Reveal>
        )}
      </div>

      {/* Bottom strip removed globally per request */}
    </section>
  );
}
