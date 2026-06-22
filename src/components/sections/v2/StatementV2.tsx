import Image from "next/image";
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

export default function StatementV2({ data }: Props) {
  const image = data?.image || "/images/E11/building.jpg";
  const lead = data?.lead || "Garden City Residences";
  const rest = data?.rest || "— here freedom begins";
  const body =
    data?.body ||
    "Far from the noise yet minutes from everything that matters. At DLF Garden City, Sector 93, Emarat Realty shapes homes around care, generosity and an unhurried sense of space — a project that turns true, lasting values into everyday living.";

  return (
    <section className="relative isolate flex min-h-screen flex-col justify-between overflow-hidden px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
      {/* Full-bleed background image */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      {/* Simple dark overlay for readability */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/50" />

      {/* Headline — upper area */}
      <div className="mx-auto w-full max-w-[1400px]">
        <h2 className="max-w-5xl">
          <SplitReveal as="span" className="font-display h-page block text-[color:var(--accent)]">
            {toPlainText(lead)}
          </SplitReveal>
          <SplitReveal as="span" delay={0.1} className="font-display h-page block text-white">
            {toPlainText(rest)}
          </SplitReveal>
        </h2>
      </div>

      {/* Lead paragraph — lower-left */}
      <div className="mx-auto mt-16 w-full max-w-[1400px]">
        <Reveal as="p" delay={0.15} className="max-w-md text-sm uppercase leading-relaxed tracking-[0.04em] text-[color:var(--fg)]/85">
          {renderPortableText(body)}
        </Reveal>
      </div>
    </section>
  );
}
