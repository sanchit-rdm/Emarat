import Image from "next/image";
import type { PortableTextBlock } from "@/lib/portableText";
import { renderPortableText, toPlainText } from "@/lib/portableText";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Parallax from "@/components/motion/Parallax";

interface AboutData {
  heading1?: string | PortableTextBlock[];
  heading2?: string | PortableTextBlock[];
  description?: string | PortableTextBlock[];
  services?: Array<{ _key?: string; title: string; subtitle: string }>;
  image?: string | null;
  imageCaption?: string;
}
interface Props { data?: AboutData }

const ZW_CHARS = /[\u200B\u200C\u200D\uFEFF]/g;
const normalize = (s?: string | null) =>
  typeof s === "string"
    ? s.replace(ZW_CHARS, "").replace(/\s+/g, " ").trim()
    : undefined;

export default function About({ data }: Props) {
  const heading1 = typeof data?.heading1 === "string" ? normalize(data.heading1) : data?.heading1;
  const heading2 = typeof data?.heading2 === "string" ? normalize(data.heading2) : data?.heading2;
  const description = typeof data?.description === "string" ? normalize(data.description) : data?.description;
  const heading1Value = heading1 ?? "A distinguished leader";
  const heading2Value = heading2 ?? "in luxury real estate.";
  const descriptionValue = description ?? "Emarat Realty specialises in exquisite residences and high-end commercial spaces across Gurugram. We deliver homes built on quality, elegance and innovation where every detail reflects our unwavering commitment to excellence.";
  const services = data?.services ?? [
    { title: "Luxury Residential", subtitle: "3 & 4 BHK apartments" },
    { title: "Commercial Spaces", subtitle: "High-end retail & offices" },
    { title: "Residential Plots", subtitle: "Sector 93, Gurugram" },
    { title: "Independent Floors", subtitle: "Phase 3, DLF" },
    { title: "Penthouses", subtitle: "Top-floor living" },
    { title: "Development", subtitle: "End-to-end delivery" },
  ];
  const image = data?.image ?? "/images/alameda-kitchen.webp";
  return (
    <section
      id="about"
      className="px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <SplitReveal as="h2" className="font-display h-section" data-heading={toPlainText(heading1Value)}>
            {toPlainText(heading1Value)}
          </SplitReveal>
          <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]" data-heading={toPlainText(heading2Value)}>
            {toPlainText(heading2Value)}
          </SplitReveal>

          <Reveal as="p" delay={0.2} className="mt-10 max-w-xl text-base leading-relaxed text-[color:var(--muted)] lg:text-lg">
            {renderPortableText(descriptionValue)}
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-6 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-8">
            {services.map((svc, i) => (
              <Reveal
                key={svc._key ?? svc.title}
                delay={0.05 * i}
                className="border-t border-[color:var(--line)] pt-4 text-center"
              >
                <div className="text-sm">{svc.title}</div>
                <div className="text-xs text-[color:var(--muted)]">{svc.subtitle}</div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <Parallax speed={0.25} className="relative aspect-[3/4] overflow-hidden rounded-md">
            <Image
              src={image}
              alt="Emarat Realty Luxury Residence Interior"
              fill
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="object-cover"
              style={{ filter: "sepia(0.12) saturate(0.9) brightness(0.9)" }}
            />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
