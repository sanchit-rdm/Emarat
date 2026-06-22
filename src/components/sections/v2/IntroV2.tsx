import Image from "next/image";
import type { PortableTextBlock } from "@/lib/portableText";
import { renderPortableText, toPlainText } from "@/lib/portableText";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import RevealImage from "@/components/motion/RevealImage";

interface AboutData {
  heading1?: string | PortableTextBlock[];
  heading2?: string | PortableTextBlock[];
  description?: string | PortableTextBlock[];
  services?: Array<{ _key?: string; title: string; subtitle: string }>;
  image?: string | null;
  imageCaption?: string;
}
interface Props { data?: AboutData; eyebrow?: string }

/**
 * Design Option 2 — opening brand statement.
 *
 * Airy, centred editorial introduction on a cream surface: a small numbered
 * eyebrow, a large display statement, a lead paragraph, then a full-bleed
 * feature image with a quiet caption and a thin services row beneath. Mirrors
 * the spacious, image-led "statement" sections of the reference design.
 */
export default function IntroV2({ data, eyebrow }: Props) {
  const eyebrowText = eyebrow?.trim() || "Emarat Realty";
  const heading1 = data?.heading1 ?? "A distinguished leader";
  const heading2 = data?.heading2 ?? "in luxury real estate.";
  const description =
    data?.description ??
    "Emarat Realty specialises in exquisite residences and high-end commercial spaces across Gurugram. We deliver homes built on quality, elegance and innovation where every detail reflects our unwavering commitment to excellence.";
  const services = data?.services ?? [
    { title: "Luxury Residential", subtitle: "3 & 4 BHK apartments" },
    { title: "Commercial Spaces", subtitle: "High-end retail & offices" },
    { title: "Residential Plots", subtitle: "Sector 93, Gurugram" },
    { title: "Independent Floors", subtitle: "Phase 3, DLF" },
  ];
  const image = data?.image ?? "/images/alameda-kitchen.webp";

  return (
    <section id="intro" className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
      <div className="mx-auto max-w-[1100px] text-center">
        <SplitReveal as="h2" className="font-display h-page">
          {toPlainText(heading1)}
        </SplitReveal>
        <SplitReveal as="h2" delay={0.1} className="font-display h-page text-[color:var(--accent)]">
          {toPlainText(heading2)}
        </SplitReveal>

        <Reveal
          as="p"
          delay={0.2}
          className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-[color:var(--muted)] lg:text-lg"
        >
          {renderPortableText(description)}
        </Reveal>
      </div>

      {/* Full-bleed feature image — clip-wipe reveal + slow parallax drift. */}
      <div className="mx-auto mt-16 max-w-[1400px] lg:mt-24">
        <RevealImage
          className="relative aspect-[16/10] rounded-lg sm:aspect-[21/9]"
          parallax={8}
        >
          <Image
            src={image}
            alt="Emarat Realty luxury residence interior"
            fill
            priority
            sizes="(min-width: 1440px) 1440px, 100vw"
            className="object-cover"
          />
        </RevealImage>
      </div>

      {/* Thin services row. */}
      <div className="mx-auto mt-16 flex max-w-[1400px] flex-wrap justify-center gap-x-6 gap-y-6 sm:gap-x-10 lg:mt-24 lg:gap-x-16 lg:gap-y-10">
        {services.map((svc, i) => (
          <Reveal
            key={svc._key ?? svc.title}
            delay={0.05 * i}
            className="w-full border-t border-[color:var(--line)] pt-6 text-center sm:w-[200px] lg:w-[240px]"
          >
            <div className="h-px w-8 bg-[color:var(--accent)] mx-auto" />
            <div className="mt-5 font-display-alt text-2xl">{svc.title}</div>
            <div className="mt-2 text-sm text-[color:var(--muted)]">{svc.subtitle}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
