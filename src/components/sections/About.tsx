import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Parallax from "@/components/motion/Parallax";

interface AboutData {
  heading1?: string;
  heading2?: string;
  description?: string;
  services?: Array<{ _key?: string; title: string; subtitle: string }>;
  image?: string | null;
  imageCaption?: string;
}
interface Props { data?: AboutData }

export default function About({ data }: Props) {
  const normalize = (s?: string | null) => (typeof s === "string" ? s.replace(/\s+/g, " ").trim() : undefined);
  const heading1 = normalize(data?.heading1) ?? "A distinguished leader";
  const heading2 = normalize(data?.heading2) ?? "in luxury real estate.";
  const description = normalize(data?.description) ?? "Emarat Realty specialises in exquisite residences and high-end commercial spaces across Gurugram. We deliver homes built on quality, elegance and innovation where every detail reflects our unwavering commitment to excellence.";
  const services = data?.services ?? [
    { title: "Luxury Residential", subtitle: "3 & 4 BHK apartments" },
    { title: "Commercial Spaces", subtitle: "High-end retail & offices" },
    { title: "Residential Plots", subtitle: "Sector 93, Gurugram" },
    { title: "Independent Floors", subtitle: "Phase 3, DLF" },
    { title: "Penthouses", subtitle: "Top-floor living" },
    { title: "Development", subtitle: "End-to-end delivery" },
  ];
  const image = data?.image ?? "/images/alameda-kitchen.webp";
  const imageCaption = data?.imageCaption ?? "C5 Residences, DLF Garden City";
  return (
    <section
      id="about"
      className="px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <SplitReveal as="h2" className="font-display h-section" data-heading={heading1}>
            {heading1}
          </SplitReveal>
          <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]" data-heading={heading2}>
            {heading2}
          </SplitReveal>

          <Reveal as="p" delay={0.2} className="mt-10 max-w-xl text-base leading-relaxed text-[color:var(--muted)] lg:text-lg">
            {description}
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-8 lg:grid-cols-3">
            {services.map((svc, i) => (
              <Reveal
                key={svc._key ?? svc.title}
                delay={0.05 * i}
                className="border-t border-[color:var(--line)] pt-4"
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
          <Reveal
            as="p"
            delay={0.2}
            className="mt-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]"
          >
            {imageCaption}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
