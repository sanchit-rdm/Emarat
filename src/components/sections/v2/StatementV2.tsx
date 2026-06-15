import Image from "next/image";
import Link from "next/link";
import type { PortableTextBlock } from "@/lib/portableText";
import { renderPortableText, toPlainText } from "@/lib/portableText";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

interface StatementData {
  image?: string | null;
  eyebrow?: string | PortableTextBlock[];
  lead?: string | PortableTextBlock[];
  rest?: string | PortableTextBlock[];
  body?: string | PortableTextBlock[];
  ctaLabel?: string;
  ctaHref?: string;
}
interface Props { data?: StatementData }

/**
 * Design Option 2 — full-bleed lifestyle statement.
 *
 * A single tall image carries a large display headline up top and a short lead
 * paragraph with a "Read More" pill anchored to the lower-left — the editorial
 * "here freedom begins" beat from the reference design. Sits after the
 * residences slider as a quiet, atmospheric pause before the principles band.
 */
export default function StatementV2({ data }: Props) {
  const image = data?.image || "/images/E11/building.jpg";
  const eyebrow = data?.eyebrow || "A Place to Belong";
  const lead = data?.lead || "Garden City Residences";
  const rest = data?.rest || "— here freedom begins";
  const body =
    data?.body ||
    "Far from the noise yet minutes from everything that matters. At DLF Garden City, Sector 93, Emarat Realty shapes homes around care, generosity and an unhurried sense of space — a project that turns true, lasting values into everyday living.";
  const href = data?.ctaHref || "/projects";
  const ctaLabel = data?.ctaLabel || "Read More";
  return (
    <section className="relative isolate flex min-h-screen flex-col justify-between overflow-hidden px-6 py-24 lg:px-10 lg:py-28">
      {/* Full-bleed background image with gentle, warm grading */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ filter: "sepia(0.14) saturate(0.92) brightness(0.62)" }}
        />
      </div>
      {/* Soft vignettes top + bottom so the type stays legible over any image */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[color:var(--bg)]/45 via-transparent to-[color:var(--bg)]/70" />

      {/* Headline — upper area */}
      <div className="mx-auto w-full max-w-[1440px]">
        <Reveal className="eyebrow mb-6 flex items-center font-script text-2xl text-[color:var(--fg)]/85">
          <span>{renderPortableText(eyebrow)}</span>
        </Reveal>
        <h2 className="max-w-5xl">
          <SplitReveal as="span" className="font-display h-page block text-[color:var(--accent)]">
            {toPlainText(lead)}
          </SplitReveal>
          <SplitReveal as="span" delay={0.1} className="font-display h-page block text-white">
            {toPlainText(rest)}
          </SplitReveal>
        </h2>
      </div>

      {/* Lead paragraph + Read More — lower-left */}
      <div className="mx-auto mt-16 w-full max-w-[1440px]">
        <Reveal as="p" delay={0.15} className="max-w-md text-sm uppercase leading-relaxed tracking-[0.04em] text-[color:var(--fg)]/85">
          {renderPortableText(body)}
        </Reveal>
        <Reveal delay={0.25} className="mt-10">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--fg)]/40 px-10 py-4 text-[11px] uppercase tracking-[0.28em] text-[color:var(--fg)] backdrop-blur-sm transition-all duration-500 hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)] hover:text-[color:var(--bg)]"
          >
            {ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
