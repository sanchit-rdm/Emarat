import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import RevealImage from "@/components/motion/RevealImage";

interface AboutData {
  heading1?: string;
  heading2?: string;
  description?: string;
  services?: Array<{ _key?: string; title: string; subtitle: string }>;
  image?: string | null;
  imageCaption?: string;
}
interface Props { data?: AboutData }

/**
 * Design Option 2 — opening brand statement.
 *
 * Airy, centred editorial introduction on a cream surface: a small numbered
 * eyebrow, a large display statement, a lead paragraph, then a full-bleed
 * feature image with a quiet caption and a thin services row beneath. Mirrors
 * the spacious, image-led "statement" sections of the reference design.
 */
export default function IntroV2({ data }: Props) {
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
  const imageCaption = data?.imageCaption ?? "C5 Residences, DLF Garden City";

  return (
    <section id="intro" className="theme-light px-6 py-24 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1100px] text-center">
        <Reveal className="eyebrow mb-6 flex items-center justify-center font-script text-2xl text-[color:var(--muted)]">
          <span>Emarat Realty — Est. Gurugram</span>
        </Reveal>

        <SplitReveal as="h2" className="font-display h-page">
          {heading1}
        </SplitReveal>
        <SplitReveal as="h2" delay={0.1} className="font-display h-page text-[color:var(--muted)]">
          {heading2}
        </SplitReveal>

        <Reveal
          as="p"
          delay={0.2}
          className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-[color:var(--muted)] lg:text-lg"
        >
          {description}
        </Reveal>
      </div>

      {/* Full-bleed feature image — clip-wipe reveal + slow parallax drift. */}
      <div className="mx-auto mt-16 max-w-[1440px] lg:mt-24">
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
        <Reveal as="p" delay={0.15} className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
          {imageCaption}
        </Reveal>
      </div>

      {/* Thin services row. */}
      <div className="mx-auto mt-16 grid max-w-[1440px] grid-cols-2 gap-x-10 gap-y-10 lg:mt-24 lg:grid-cols-4">
        {services.map((svc, i) => (
          <Reveal
            key={svc._key ?? svc.title}
            delay={0.05 * i}
            className="border-t border-[color:var(--line)] pt-5"
          >
            <div className="h-px w-6 bg-[color:var(--accent)]" />
            <div className="mt-4 font-display-alt text-lg">{svc.title}</div>
            <div className="mt-1 text-xs text-[color:var(--muted)]">{svc.subtitle}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
