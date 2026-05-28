import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";

export const metadata: Metadata = {
  title: "Projects — Emarat Realty",
  description:
    "Selected projects by Emarat Realty — C2, C5 and E11 at DLF Garden City; EA 04 at Almeda; plots and independent floors across Gurugram, Haryana.",
};

const projects = [
  {
    id: "c2",
    no: "01",
    title: "C2 at DLF Garden City",
    location: "Sector 93, Gurugram",
    status: "Ready to Move",
    config: "3 & 4 BHK Luxury Apartments",
    size: "1,850 – 2,400 sq.ft.",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&q=80&auto=format&fit=crop",
    body: "Premium high-rise residences with double-height entrance lobbies, landscaped podium gardens and curated club amenities. Direct frontage on the Dwarka Expressway.",
    highlights: ["Podium-level club", "Three-side open units", "100% power backup", "Concierge service"],
  },
  {
    id: "c5",
    no: "02",
    title: "C5 at DLF Garden City",
    location: "Sector 93, Gurugram",
    status: "Possession Ready",
    config: "Premium 3 & 4 BHK Residences",
    size: "2,100 – 2,800 sq.ft.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=80&auto=format&fit=crop",
    body: "Spacious cross-ventilated residences with refined interiors, French balconies and a curated palette of natural materials. Designed around a central landscaped courtyard.",
    highlights: ["Cross-ventilated layouts", "French balconies", "Courtyard-facing units", "Italian marble flooring"],
  },
  {
    id: "e11",
    no: "03",
    title: "E11 at DLF Garden City",
    location: "Sector 93, Gurugram",
    status: "New Launch",
    config: "Luxury Flats & Penthouses",
    size: "2,400 – 5,200 sq.ft.",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=80&auto=format&fit=crop",
    body: "The most anticipated launch in DLF Garden City — featuring duplex penthouses with private terraces, sky lounges and double-height living spaces.",
    highlights: ["Duplex penthouses", "Private terraces", "Sky lounge", "Concierge & valet"],
  },
  {
    id: "ea04",
    no: "04",
    title: "EA 04 at Almeda",
    location: "Gurugram, Haryana",
    status: "Operational",
    config: "Commercial & Retail Spaces",
    size: "Suites from 500 sq.ft.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80&auto=format&fit=crop",
    body: "High-end retail and Grade-A office spaces at Almeda — designed for boutique brands, restaurants and forward-thinking firms looking for a premium business address.",
    highlights: ["Grade-A specifications", "Triple-height retail", "Dedicated visitor parking", "F&B-ready services"],
  },
];

const additional = [
  {
    name: "DLF Garden City Plots",
    location: "Sector 93, Gurugram",
    type: "Freehold residential plots",
  },
  {
    name: "DLF Independent Floors",
    location: "Phase 3, Gurugram",
    type: "Independent builder floors",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHero
          eyebrow="(01) Our Projects"
          titleTop="Selected works"
          titleBottom="across Gurugram."
          subtitle="A portfolio of residential and commercial developments at DLF Garden City and Almeda — every Emarat project built on the same principles of quality, elegance and innovation."
          bgImage="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=2400&q=80&auto=format&fit=crop"
          trailing="Six developments · 500+ residences"
        />

        {/* Project filter strip */}
        <section className="border-b border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-8 lg:px-10">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
            <span className="text-[color:var(--accent)]">All Projects (6)</span>
            <a href="#c2" className="transition-colors hover:text-[color:var(--fg)]">Residential</a>
            <a href="#ea04" className="transition-colors hover:text-[color:var(--fg)]">Commercial</a>
            <a href="#additional" className="transition-colors hover:text-[color:var(--fg)]">Plots & Floors</a>
            <span className="ml-auto hidden text-[color:var(--accent)] md:inline">DLF Garden City · Sector 93</span>
          </div>
        </section>

        {/* Detailed project cards — alternating image side (light cream) */}
        <section className="theme-light px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1440px] space-y-24 lg:space-y-32">
            {projects.map((p, i) => (
              <article
                key={p.id}
                id={p.id}
                className="grid scroll-mt-32 grid-cols-12 items-center gap-8 lg:gap-12"
              >
                {/* Image */}
                <div className={`col-span-12 lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Reveal className="relative aspect-[4/3] overflow-hidden rounded-md bg-[color:var(--bg-alt)]">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover"
                      style={{ filter: "sepia(0.15) saturate(0.88) brightness(0.86)" }}
                    />
                  </Reveal>
                </div>

                {/* Details */}
                <div className={`col-span-12 lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Reveal as="div" className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    <span className="font-mono text-[color:var(--accent)]">{p.no}</span>
                    <span className="h-px flex-1 max-w-[60px] bg-[color:var(--accent)]/40" />
                    <span className="text-[color:var(--accent)]">{p.status}</span>
                  </Reveal>

                  <SplitReveal
                    as="h2"
                    className="mt-6 font-display h-sub"
                  >
                    {p.title}
                  </SplitReveal>

                  <Reveal as="p" delay={0.1} className="mt-3 text-sm text-[color:var(--muted)]">
                    {p.location}
                  </Reveal>

                  <Reveal as="p" delay={0.2} className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--muted)]">
                    {p.body}
                  </Reveal>

                  {/* Spec table */}
                  <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-[color:var(--line)] py-6">
                    <Reveal delay={0.25}>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                        Configuration
                      </div>
                      <div className="mt-1 text-sm">{p.config}</div>
                    </Reveal>
                    <Reveal delay={0.3}>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                        Sizes
                      </div>
                      <div className="mt-1 text-sm">{p.size}</div>
                    </Reveal>
                  </div>

                  {/* Highlights */}
                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[color:var(--muted)]">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2">
                        <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--accent)]" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <Reveal delay={0.4} className="mt-8 flex gap-3">
                    <CircleButton href="/contact" size="sm" variant="filled">
                      Request Details
                    </CircleButton>
                    <CircleButton href="/contact" size="sm" variant="outline">
                      Schedule Visit
                    </CircleButton>
                  </Reveal>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Additional offerings */}
        <section id="additional" className="border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <Reveal as="div" className="mb-4 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
              <span>(02) Also Available</span>
            </Reveal>
            <SplitReveal
              as="h2"
              className="font-display h-section"
            >
              Plots and independent floors.
            </SplitReveal>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {additional.map((a, i) => (
                <Reveal
                  key={a.name}
                  delay={i * 0.07}
                  className="group flex items-center justify-between rounded-md border border-[color:var(--line)] p-8 transition-colors hover:border-[color:var(--accent)]/40 lg:p-10"
                >
                  <div>
                    <h3 className="font-display text-2xl tracking-tight lg:text-3xl">{a.name}</h3>
                    <div className="mt-2 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                      {a.location} · {a.type}
                    </div>
                  </div>
                  <span aria-hidden className="text-2xl text-[color:var(--muted)] transition-transform group-hover:translate-x-1 group-hover:text-[color:var(--accent)]">
                    →
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8">
            <div>
              <SplitReveal
                as="h2"
                className="font-display h-sub"
              >
                Considering a residence?
              </SplitReveal>
              <Reveal as="p" delay={0.15} className="mt-4 max-w-md text-sm text-[color:var(--muted)]">
                Our sales team will walk you through availability, pricing and the right
                configuration for your family.
              </Reveal>
            </div>
            <CircleButton href="/contact" variant="filled">
              Speak to Sales
            </CircleButton>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
