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
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_PAGE_QUERY } from "@/sanity/lib/queries";
import { getPageContent, mergeHero, buildMetadata, pickStr, pickArr } from "@/sanity/lib/page";

const HERO_FALLBACK = {
  eyebrow: "",
  titleTop: "Selected works",
  titleBottom: "across Gurugram.",
  subtitle:
    "A portfolio of Spanish-inspired independent and boutique private floors at DLF Garden City and Alameda every Emarat home built on the same principles of quality, elegance and innovation.",
  trailing: "DLF Garden City · Alameda",
  bgImage: "/images/alameda-bedroom-3.webp",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("projectsPage");
  return buildMetadata(page?.seo, {
    title: "Projects Emarat Realty",
    description:
      "Selected projects by Emarat Realty C2, C5 and E11 independent floors at DLF Garden City; EA 04 boutique private floors at Alameda, Sector 73 Gurugram.",
  });
}

const projects = [
  {
    id: "c2",
    no: "01",
    title: "C2 at DLF Garden City",
    location: "DLF Garden City, Sector 93, Gurugram",
    status: "Now Selling",
    config: "5 BHK Independent Floors",
    size: "G+4 · 5 BHK",
    img: "/images/C-2/building.jpg",
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
    img: "/images/C-5/building.jpg",
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
    img: "/images/E11/building.jpg",
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
    img: "/images/EA4/building.jpg",
    body: "A boutique luxury residence — private, two-side-open floors in a palette of deep emerald stone and 24k-gold accents. Architecture that commands.",
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

const FILTER_LINKS = [
  { label: "C2 at DLF Garden City", href: "#c2" },
  { label: "C5 at DLF Garden City", href: "#c5" },
  { label: "E11 at DLF Garden City", href: "#e11" },
  { label: "EA 04 at Alameda", href: "#ea04" },
];

export default async function ProjectsPage() {
  // Merge any Sanity data over the static cards per slug, so a partial Sanity
  // document never blanks out a card — empty fields fall back to static.
  const sanityListings = await getSanityProjectListings();
  const bySlug = new Map(sanityListings.map((s) => [s.slug, s]));
  const pick = <T,>(v: T | null | undefined, fb: T): T =>
    v === null || v === undefined || (typeof v === "string" && v.trim() === "")
      ? fb
      : v;

  const cards = projects.map((base) => {
    const s = bySlug.get(base.id);
    if (!s) return base;
    return {
      id: base.id,
      no: pick(s.no, base.no),
      title: pick(s.title, base.title),
      location: pick(s.location, base.location),
      status: pick(s.status, base.status),
      config: pick(s.config, base.config),
      size: pick(s.size, base.size),
      img: pick(s.heroImage, base.img),
      body: pick(s.excerpt, pick(s.tagline, base.body)),
      highlights: s.stats?.length
        ? s.stats.map((st) => `${st.value} ${st.label}`)
        : base.highlights,
    };
  });

  // Append any projects that exist only in Sanity (not in the static list).
  const staticIds = new Set(projects.map((p) => p.id));
  const sanityOnly = sanityListings
    .filter((s) => s.slug && !staticIds.has(s.slug) && s.heroImage)
    .map((s) => ({
      id: s.slug,
      no: s.no ?? "",
      title: s.title ?? "",
      location: s.location ?? "",
      status: s.status ?? "",
      config: s.config ?? "",
      size: s.size ?? "",
      img: s.heroImage as string,
      body: s.excerpt ?? s.tagline ?? "",
      highlights: (s.stats ?? []).map((st) => `${st.value} ${st.label}`),
    }));

  const sanityProjects = [...cards, ...sanityOnly];

  const { data: pageRaw } = await sanityFetch({ query: PROJECTS_PAGE_QUERY, tags: ["projectsPage"] });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pc = (pageRaw as any) ?? {};
  const hero = mergeHero(pc?.hero, HERO_FALLBACK);

  const filter = {
    allLabel: pickStr(pc?.filter?.allLabel, "All Projects"),
    links: pickArr(pc?.filter?.links, FILTER_LINKS),
    trailing: pickStr(pc?.filter?.trailing, "Independent & Private Floors"),
  };
  const cardButtons = {
    viewLabel: pickStr(pc?.cardButtons?.viewLabel, "View Project"),
    enquireLabel: pickStr(pc?.cardButtons?.enquireLabel, "Enquire"),
    configLabel: pickStr(pc?.cardButtons?.configLabel, "Configuration"),
    sizesLabel: pickStr(pc?.cardButtons?.sizesLabel, "Sizes"),
  };
  const additionalHeading = pickStr(pc?.additionalHeading, "Plots and independent floors.");
  const additionalItems = pickArr(pc?.additional, additional);
  const cta = {
    heading: pickStr(pc?.cta?.heading, "Considering a residence?"),
    body: pickStr(
      pc?.cta?.body,
      "Our sales team will walk you through availability, pricing and the right configuration for your family."
    ),
    buttonLabel: pickStr(pc?.cta?.buttonLabel, "Speak to Sales"),
    buttonHref: pickStr(pc?.cta?.buttonHref, "/contact"),
  };

  return (
    <>
      <SiteNav />
      <main>
        <PageHero {...hero} />

        {/* Project filter strip */}
        <section className="border-b border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-8 lg:px-10">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {filter.links.map((l) => (
              <a key={l.href ?? l.label} href={l.href} className="transition-colors hover:text-[color:var(--accent)]">
                {l.label}
              </a>
            ))}
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
                  <Link href={`/projects/${p.id}`} className="transition-colors hover:text-[color:var(--accent)]">
                    <SplitReveal
                      as="h2"
                      className="font-display h-sub"
                    >
                      {p.title}
                    </SplitReveal>
                  </Link>

                  <Reveal as="p" delay={0.2} className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--muted)]">
                    {p.body}
                  </Reveal>

                  {/* Spec table */}
                  <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-[color:var(--line)] py-6">
                    <Reveal delay={0.25}>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                        Location
                      </div>
                      <div className="mt-1 text-sm">{p.location}</div>
                    </Reveal>
                    <Reveal delay={0.3}>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                        {cardButtons.sizesLabel}
                      </div>
                      <div className="mt-1 text-sm">{p.size}</div>
                    </Reveal>
                  </div>

                  {/* Highlights */}
                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[color:var(--muted)]">
                    {p.highlights.filter(h => !/s\+\d|built[\s-]?form/i.test(h)).slice(0, 3).map((h) => (
                      <li key={h} className="flex items-center gap-2">
                        <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--accent)]" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <Reveal delay={0.4} className="mt-8 flex gap-3">
                    <CircleButton href={`/projects/${p.id}`} size="sm" variant="filled">
                      {cardButtons.viewLabel}
                    </CircleButton>
                    <CircleButton href={`/projects/${p.id}#enquiry`} size="sm" variant="outline">
                      {cardButtons.enquireLabel}
                    </CircleButton>
                  </Reveal>
                </div>
              </article>
            ))}
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
                {cta.heading}
              </SplitReveal>
              <Reveal as="p" delay={0.15} className="mt-4 max-w-md text-sm text-[color:var(--muted)]">
                {cta.body}
              </Reveal>
            </div>
            <CircleButton href={cta.buttonHref} variant="filled">
              {cta.buttonLabel}
            </CircleButton>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
