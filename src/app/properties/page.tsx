import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";

export const metadata: Metadata = {
  title: "Properties — Emarat Realty",
  description:
    "Property types by Emarat Realty — luxury apartments, penthouses, residential plots, independent floors and high-end commercial spaces in Gurugram.",
};

const types = [
  {
    id: "apartments",
    label: "Luxury Apartments",
    blurb: "Three and four-bedroom residences with double-height lobbies, landscaped courtyards and curated amenities.",
    config: "3 & 4 BHK",
    size: "1,850 – 2,800 sq.ft.",
    where: "C2, C5, E11 — DLF Garden City",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&q=80&auto=format&fit=crop",
  },
  {
    id: "penthouses",
    label: "Penthouses",
    blurb: "Top-floor duplexes with private terraces, double-height living spaces, panoramic skyline views and dedicated valet entrances.",
    config: "Duplex 4–5 BHK",
    size: "3,800 – 5,200 sq.ft.",
    where: "E11 — DLF Garden City",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80&auto=format&fit=crop",
  },
  {
    id: "plots",
    label: "Residential Plots",
    blurb: "Freehold residential plots in the heart of DLF Garden City — design and build your own home in Gurugram's most coveted address.",
    config: "Freehold land",
    size: "240 – 500 sq. yards",
    where: "Sector 93, Gurugram",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1800&q=80&auto=format&fit=crop",
  },
  {
    id: "floors",
    label: "Independent Floors",
    blurb: "Spacious independent floors with private entrances, dedicated parking and the privacy of a villa with the convenience of an apartment.",
    config: "3 & 4 BHK Floors",
    size: "2,200 – 3,400 sq.ft.",
    where: "Phase 3, DLF",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1800&q=80&auto=format&fit=crop",
  },
  {
    id: "commercial",
    label: "Commercial & Retail",
    blurb: "Grade-A office suites and high-end retail spaces in Gurugram's premium business corridors — ideal for boutique brands and forward-thinking firms.",
    config: "Suites & Retail Units",
    size: "From 500 sq.ft.",
    where: "EA 04 — Almeda",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80&auto=format&fit=crop",
  },
];

const features = [
  ["Opulent Interiors", "Italian marble, brass detailing and curated palettes selected for permanence."],
  ["Bespoke Amenities", "Concierge, club, pools, landscaped gardens — every residence is supported by world-class facilities."],
  ["Exquisite Details", "From the placement of a window to the door handle in your hand — every detail considered."],
];

export default function PropertiesPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHero
          titleTop="Homes, plots,"
          titleBottom="and the spaces between."
          subtitle="From a single freehold plot to a luxury duplex penthouse — every Emarat property is delivered with uncompromising attention to design, materials and the rooms in between."
          bgImage="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=2400&q=80&auto=format&fit=crop"
          trailing="Five property categories"
        />

        {/* Unparalleled luxury features (light cream) */}
        <section className="theme-light px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1440px]">
            <SplitReveal
              as="h2"
              className="font-display h-section"
            >
              Three things every
            </SplitReveal>
            <SplitReveal
              as="h2"
              delay={0.1}
              className="font-display h-section text-[color:var(--muted)]"
            >
              Emarat home shares.
            </SplitReveal>

            <ol className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map(([title, body], i) => (
                <Reveal
                  as="li"
                  key={title}
                  delay={i * 0.08}
                  className="border-t border-[color:var(--accent)]/30 pt-6"
                >
                  <div className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    0{i + 1}
                  </div>
                  <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight lg:text-3xl">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted)]">
                    {body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Property type sections — large editorial layout */}
        <section className="border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1440px] space-y-24 lg:space-y-32">
            {types.map((t, i) => (
              <article
                key={t.id}
                id={t.id}
                className="grid scroll-mt-32 grid-cols-12 items-center gap-8 lg:gap-12"
              >
                <div className={`col-span-12 lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Reveal className="group relative aspect-[4/3] overflow-hidden rounded-md bg-[color:var(--bg)]">
                    <Image
                      src={t.img}
                      alt={t.label}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                      style={{ filter: "sepia(0.14) saturate(0.88) brightness(0.86)" }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--bg)]/55 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      0{i + 1} / 0{types.length}
                    </div>
                  </Reveal>
                </div>

                <div className={`col-span-12 lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Reveal as="div" className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    Property Type 0{i + 1}
                  </Reveal>
                  <SplitReveal
                    as="h2"
                    className="mt-4 font-display h-sub"
                  >
                    {t.label}
                  </SplitReveal>
                  <Reveal as="p" delay={0.2} className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--muted)]">
                    {t.blurb}
                  </Reveal>

                  <div className="mt-8 grid grid-cols-2 gap-x-6 border-y border-[color:var(--line)] py-6">
                    <Reveal delay={0.25}>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                        Configuration
                      </div>
                      <div className="mt-1 text-sm">{t.config}</div>
                    </Reveal>
                    <Reveal delay={0.3}>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                        Sizes
                      </div>
                      <div className="mt-1 text-sm">{t.size}</div>
                    </Reveal>
                  </div>

                  <Reveal delay={0.35} className="mt-6 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Available at — <span className="text-[color:var(--fg)]">{t.where}</span>
                  </Reveal>

                  <Reveal delay={0.4} className="mt-8">
                    <CircleButton href="/contact" size="sm" variant="outline">
                      Request Brochure
                    </CircleButton>
                  </Reveal>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Inside Emarat — full-width quote band */}
        <section className="relative isolate overflow-hidden px-6 py-24 lg:px-10 lg:py-32">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <Image
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=2400&q=80&auto=format&fit=crop"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-25"
              style={{ filter: "sepia(0.2) saturate(0.8) brightness(0.45) contrast(1.05)" }}
            />
            <div className="absolute inset-0 bg-[color:var(--bg)]/50" />
          </div>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal as="div" className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
              Inside Emarat
            </Reveal>
            <SplitReveal
              as="blockquote"
              className="mt-6 font-display h-sub"
            >
              Every room sees daylight from two sides.
            </SplitReveal>
            <SplitReveal
              as="blockquote"
              delay={0.1}
              className="font-display h-sub text-[color:var(--muted)]"
            >
              That is not luxury — that is the brief.
            </SplitReveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
