import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";
import { getSanityProjectListings } from "@/lib/sanity.projects";

export const metadata: Metadata = {
  title: "Projects Emarat Realty",
  description:
    "Selected projects by Emarat Realty C2, C5 and E11 independent floors at DLF Garden City; EA 04 boutique private floors at Alameda, Sector 73 Gurugram.",
};

const projects = [
  {
    id: "c2",
    no: "01",
    title: "C2 at DLF Garden City",
    location: "DLF Garden City, Sector 93, Gurugram",
    status: "Now Selling",
    config: "5 BHK Independent Floors",
    size: "G+4 · 5 BHK",
    img: "/images/C-2/C2 Living Dining_Interior View 01_APPROVED_R0_20240122.png",
    body: "Thoughtfully designed 5 BHK independent floors within the prestigious DLF gated community — spacious layouts, modern architecture and everyday comfort for contemporary luxury living.",
    highlights: ["5BHK Independent Floors", "DLF Gated Community", "24x7 Security", "S+4 Built Form"],
  },
  {
    id: "c5",
    no: "02",
    title: "C5 at DLF Garden City",
    location: "DLF Garden City, Sector 93, Gurugram",
    status: "Now Selling",
    config: "Independent Floors",
    size: "G+4 Independent Floors",
    img: "/images/C-5/C-5-11 DOUBLE HEIGHT.jpg.jpeg",
    body: "Independent floors designed to invite light in and open life out — the Red Diamond of Gurugram. Double-height living and a Garden in the Sky terrace.",
    highlights: ["The Red Diamond of Gurugram", "Garden in the Sky terrace", "Double-height living", "Italian marble flooring"],
  },
  {
    id: "e11",
    no: "03",
    title: "E11 at DLF Garden City",
    location: "DLF Garden City, Sector 93, Gurugram",
    status: "New Launch",
    config: "Independent Floors · Three-Side Open",
    size: "G+4 · Three-Side Open",
    img: "/images/E11/E11-14_Living Room_Interior View_R1_20250412.png",
    body: "Three-side-open independent floors where imagination meets form — volume, light and architectural drama, with a private sky-garden terrace.",
    highlights: ["Three-side open floors", "Volume, light & drama", "Sky-garden terrace", "Premium modular kitchen"],
  },
  {
    id: "ea04",
    no: "04",
    title: "EA 04 at Alameda",
    location: "Sector 73, Gurugram",
    status: "Now Selling",
    config: "Boutique Private Floors",
    size: "Two-Side Open Private Floors",
    img: "/images/EA4/EA 4 LOUNGE.& DININGjpg.jpeg",
    body: "A boutique luxury residence in Sector 73 — private, two-side-open floors in a palette of deep emerald stone and 24k-gold accents. Architecture that commands.",
    highlights: ["Boutique private floors", "Two-side open homes", "Dual high-speed elevators", "Emerald & 24k-gold palette"],
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

export default async function ProjectsPage() {
  // Try Sanity first; fall back to static data so the page never breaks.
  const sanityListings = await getSanityProjectListings();
  const sanityProjects = sanityListings.length
    ? sanityListings.map((p) => ({
        id: p.slug,
        no: p.no,
        title: p.title,
        location: p.location,
        status: p.status,
        config: p.config,
        size: p.size,
        img: p.heroImage ?? "",
        body: p.excerpt ?? p.tagline,
        highlights: p.stats.map((s) => `${s.value} ${s.label}`),
      }))
    : null;
  return (
    <>
      <SiteNav />
      <main>
        <PageHero
          titleTop="Selected works"
          titleBottom="across Gurugram."
          subtitle="A portfolio of Spanish-inspired independent and boutique private floors at DLF Garden City and Alameda every Emarat home built on the same principles of quality, elegance and innovation."
          bgImage="/images/alameda-bedroom-3.webp"
          trailing="Six developments · 500+ residences"
        />

        {/* Project filter strip */}
        <section className="border-b border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-8 lg:px-10">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
            <span className="text-[color:var(--accent)]">All Projects (6)</span>
            <a href="#c2" className="transition-colors hover:text-[color:var(--fg)]">DLF Garden City</a>
            <a href="#ea04" className="transition-colors hover:text-[color:var(--fg)]">Alameda</a>
            <a href="#additional" className="transition-colors hover:text-[color:var(--fg)]">Plots & Floors</a>
            <span className="ml-auto hidden text-[color:var(--accent)] md:inline">Independent & Private Floors</span>
          </div>
        </section>

        {/* Detailed project cards — alternating image side (light cream) */}
        <section className="theme-light px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1440px] space-y-24 lg:space-y-32">
            {(sanityProjects ?? projects).map((p, i) => (
              <article
                key={p.id}
                id={p.id}
                className="grid scroll-mt-32 grid-cols-12 items-center gap-8 lg:gap-12"
              >
                {/* Image */}
                <div className={`col-span-12 lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Link href={`/projects/${p.id}`} className="group block">
                    <Reveal className="relative aspect-[4/3] overflow-hidden rounded-md bg-[color:var(--bg-alt)]">
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                        style={{ filter: "sepia(0.15) saturate(0.88) brightness(0.86)" }}
                      />
                    </Reveal>
                  </Link>
                </div>

                {/* Details */}
                <div className={`col-span-12 lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Reveal as="div" className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    <span className="font-mono text-[color:var(--accent)]">{p.no}</span>
                    <span className="h-px flex-1 max-w-[60px] bg-[color:var(--accent)]/40" />
                    <span className="text-[color:var(--accent)]">{p.status}</span>
                  </Reveal>

                  <Link href={`/projects/${p.id}`} className="transition-colors hover:text-[color:var(--accent)]">
                    <SplitReveal
                      as="h2"
                      className="mt-6 font-display h-sub"
                    >
                      {p.title}
                    </SplitReveal>
                  </Link>

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
                    <CircleButton href={`/projects/${p.id}`} size="sm" variant="filled">
                      View Project
                    </CircleButton>
                    <CircleButton href={`/projects/${p.id}#enquiry`} size="sm" variant="outline">
                      Enquire
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
                    <h3 className="font-display-alt text-2xl lg:text-3xl">{a.name}</h3>
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
