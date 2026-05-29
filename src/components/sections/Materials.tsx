import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Parallax from "@/components/motion/Parallax";

const propertyTypes = [
  {
    id: "apartments",
    label: "Luxury Apartments",
    caption: "3 & 4 BHK C2, C5, E11 at DLF Garden City",
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
    ratio: "aspect-[3/4]",
  },
  {
    id: "penthouses",
    label: "Penthouses",
    caption: "Top-floor residences DLF Garden City",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
    ratio: "aspect-[4/3]",
  },
  {
    id: "plots",
    label: "Residential Plots",
    caption: "Freehold plots Sector 93, Gurugram",
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
    ratio: "aspect-[3/4]",
  },
  {
    id: "floors",
    label: "Independent Floors",
    caption: "Builder floors Phase 3, DLF",
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format&fit=crop",
    ratio: "aspect-[4/3]",
  },
  {
    id: "commercial",
    label: "Commercial",
    caption: "High-end retail & offices EA 04 at Almeda",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop",
    ratio: "aspect-[3/4]",
  },
  {
    id: "amenities",
    label: "Amenities",
    caption: "Club, pool & resident lounges",
    src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80&auto=format&fit=crop",
    ratio: "aspect-[4/3]",
  },
];

export default function Materials() {
  return (
    <section id="properties" className="px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SplitReveal
              as="h2"
              className="font-display h-section"
            >
              Homes, plots,
            </SplitReveal>
            <SplitReveal
              as="h2"
              delay={0.1}
              className="font-display h-section text-[color:var(--muted)]"
            >
              and the spaces between.
            </SplitReveal>
          </div>
          <Reveal as="p" delay={0.2} className="max-w-sm text-sm text-[color:var(--muted)]">
            From a single plot to a luxury penthouse we source, develop and
            deliver every property with uncompromising attention to quality.
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {propertyTypes.map((s, i) => {
            // Alternate parallax speeds so the grid has rhythmic upward motion,
            // not a uniform slab. Slight stagger of speeds: 0.35, 0.55, 0.4...
            const parallaxSpeed = 0.35 + (i % 3) * 0.1;
            return (
              <Reveal key={s.id} as="figure" delay={i * 0.06} className="group">
                <div className={`relative ${s.ratio} overflow-hidden rounded-md bg-[color:var(--bg-alt)]`}>
                  {/* Image scrolls upward faster than the section — the "running up" effect */}
                  <Parallax direction="lead" speed={parallaxSpeed} className="absolute inset-0">
                    <div className="relative h-full w-full">
                      <Image
                        src={s.src}
                        alt={s.caption}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                        style={{ filter: "sepia(0.12) saturate(0.9) brightness(0.88)" }}
                      />
                    </div>
                  </Parallax>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--bg)]/80 via-[color:var(--bg)]/10 to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                    <span className="font-display text-2xl tracking-tight">{s.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {s.caption}
                </figcaption>
              </Reveal>
            );
          })}
        </div>

        <Reveal as="div" delay={0.2} className="mt-12 lg:mt-16">
          <div className="relative aspect-[21/9] overflow-hidden rounded-md bg-[color:var(--bg-alt)]">
            <Image
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=2100&q=80&auto=format&fit=crop"
              alt="Luxury living room DLF Garden City"
              fill
              sizes="100vw"
              className="object-cover"
              style={{ filter: "sepia(0.15) saturate(0.9) brightness(0.8)" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[color:var(--bg)]/85 via-[color:var(--bg)]/20 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-end p-8 lg:p-12">
              <div className="mb-2 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                Inside / C5 Residences
              </div>
              <p className="font-display text-2xl leading-snug tracking-tight lg:text-3xl">
                Every room designed for the way you actually live. That is not a promise that is the brief.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
