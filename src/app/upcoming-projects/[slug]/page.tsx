import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "@/components/Image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Parallax from "@/components/motion/Parallax";
import CircleButton from "@/components/CircleButton";
import { sanityFetch } from "@/sanity/lib/live";
import { UPCOMING_PROJECTS_PAGE_QUERY } from "@/sanity/lib/queries";
import { buildMetadata } from "@/sanity/lib/page";
import { renderPortableText } from "@/lib/portableText";
import type { PortableTextBlock } from "@/lib/portableText";
import { UPCOMING_PROJECTS_FALLBACK, type UpcomingProject } from "../page";

export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// Per-project enrichment — placeholder data, fully replaceable via Sanity
// ---------------------------------------------------------------------------
type Highlight = { label: string; desc: string };
type LocationFact = { label: string; value: string };
type Enrichment = { highlights: Highlight[]; locationFacts: LocationFact[]; whyHeading: string; whyText: string; gallery?: string[] };

const ENRICHMENT: Record<string, Enrichment> = {
  bhimtal: {
    highlights: [
      { label: "Lake & Valley Views", desc: "Every residence frames panoramic views of Bhimtal Lake and the surrounding valley." },
      { label: "Premium Wood Architecture", desc: "Crafted with natural wood and warm finishes that complement the mountain landscape." },
      { label: "Exclusive Low-Density Community", desc: "A small, private enclave — designed to feel exclusive, not crowded." },
      { label: "Year-Round Mountain Climate", desc: "Cooler temperatures and clean air make Bhimtal a genuine four-season retreat." },
    ],
    locationFacts: [
      { label: "Location", value: "Bhimtal, Uttarakhand" },
      { label: "Distance from Delhi", value: "~5.5 hrs by road" },
      { label: "Altitude", value: "~1,370 m above sea level" },
      { label: "Nearest City", value: "Nainital — 15 km" },
    ],
    whyHeading: "Why Bhimtal?",
    whyText: "Bhimtal sits at the heart of Kumaon's lake district — serene, green, and unhurried. With a cooler climate year-round, proximity to Nainital, and growing demand for private mountain retreats, it offers both lifestyle value and strong long-term investment potential. As connectivity to the hills improves and remote working becomes the norm, Bhimtal is emerging as one of North India's most sought-after destinations.",
    gallery: [
      "/images/Upcomimg Projects/BL Outer.jpeg",
      "/images/Upcomimg Projects/BL Living Room.jpeg",
      "/images/Upcomimg Projects/BL Room.jpeg",
    ],
  },
  lansdowne: {
    highlights: [
      { label: "30 Acres of Pristine Landscape", desc: "Expansive land surrounded by natural forest cover, valley views, and open skies." },
      { label: "Only 70 Residences", desc: "Rare low-density planning — complete privacy and an unhurried pace of living." },
      { label: "Forest & Himalayan Views", desc: "Surrounded by Garhwal forests, with views of the lower Himalayan range." },
      { label: "Improved Delhi Connectivity", desc: "A comfortable drive from the capital, with ongoing infrastructure improvements." },
    ],
    locationFacts: [
      { label: "Location", value: "Lansdowne, Uttarakhand" },
      { label: "Distance from Delhi", value: "~5–6 hrs by road" },
      { label: "Altitude", value: "~1,706 m above sea level" },
      { label: "Type", value: "Hill Station Retreat" },
    ],
    whyHeading: "Why Lansdowne?",
    whyText: "Lansdowne is one of Uttarakhand's best-kept secrets — a quiet hill town with old-world charm, dense deodar forests, and wide Himalayan views. As mountain living gains momentum and Delhi buyers look for peace away from the city, early ownership here represents rare value in a place that has stayed largely untouched. With only 70 residences across 30 acres, this will remain exactly that.",
  },
  goa: {
    highlights: [
      { label: "Prime Location", desc: "Thoughtfully positioned in one of India's most desirable lifestyle and investment destinations." },
      { label: "Contemporary Architecture", desc: "Modern design principles, shaped by Goa's natural surroundings and easy pace of life." },
      { label: "Superior Construction Quality", desc: "Built to one consistent standard of quality across every Emarat development, without compromise." },
      { label: "Strong Investment Potential", desc: "Goa remains one of India's most sought-after real estate markets for long-term investors." },
    ],
    locationFacts: [
      { label: "Location", value: "Goa, India" },
      { label: "Status", value: "Coming Soon" },
      { label: "Developer", value: "Emarat Realty" },
      { label: "Type", value: "Residential" },
    ],
    whyHeading: "Why Goa?",
    whyText: "Goa has always stood for a different way of living, refreshing mornings, open spaces, and a pace of life that's hard to find elsewhere in India. It's this lifestyle that continues to draw people back, year after year. This is exactly what Emarat has set out to build here: a home that lets you live the way Goa has always made people want to live.",
    gallery: [
      "/images/Upcomimg Projects/Goa Outer.jpeg",
      "/images/Upcomimg Projects/Goa Living room.jpeg",
      "/images/Upcomimg Projects/Goa BedRoom.jpeg",
      "/images/Upcomimg Projects/Goa Kitchen.jpeg",
    ],
  },
  lakefarms: {
    highlights: [
      { label: "Near Noida International Airport", desc: "Strategically positioned in the Yamuna Expressway corridor — one of India's fastest-growing regions." },
      { label: "Luxury Farm Living", desc: "Expansive plots with tree-lined avenues, water features, and curated green zones." },
      { label: "Serene Lakes & Open Skies", desc: "A landscape defined by natural water bodies, open farmland, and panoramic horizons." },
      { label: "Future-Ready Investment", desc: "Infrastructure growth around Jewar positions this as one of UP's most promising growth corridors." },
    ],
    locationFacts: [
      { label: "Location", value: "Jewar, Uttar Pradesh" },
      { label: "Near", value: "Noida International Airport" },
      { label: "Access", value: "Yamuna Expressway" },
      { label: "Type", value: "Luxury Farmland" },
    ],
    whyHeading: "Why Lakefarms?",
    whyText: "The Yamuna Expressway corridor is undergoing a once-in-a-generation transformation. With the Noida International Airport, Film City, and DMIC investment flowing in, land values in this belt are on a steep upward trajectory. Emarat Lakefarms offers early access to this growth story — with the added appeal of a peaceful, nature-led lifestyle that the city simply cannot provide.",
  },
};

const DEFAULT_ENRICHMENT: Enrichment = {
  highlights: [
    { label: "Thoughtful Design", desc: "Architecture that balances aesthetics with functionality and comfort." },
    { label: "Prime Location", desc: "Strategically positioned for lifestyle appeal and long-term investment value." },
    { label: "Natural Setting", desc: "Green spaces and natural elements woven into every aspect of the development." },
    { label: "Emarat Quality", desc: "Built to the same exacting standards as our flagship projects in Gurugram." },
  ],
  locationFacts: [
    { label: "Status", value: "Coming Soon" },
    { label: "Developer", value: "Emarat Realty" },
  ],
  whyHeading: "Why This Project?",
  whyText: "Every Emarat project is chosen for its long-term lifestyle and investment value. This upcoming development continues that tradition — combining thoughtful design, quality construction, and a location selected for its enduring appeal.",
};

// ---------------------------------------------------------------------------

function resolveProject(
  sanityProjects: UpcomingProject[],
  slug: string
): UpcomingProject | undefined {
  const sanity = sanityProjects.find((p) => (p.slug || p._key) === slug);
  const fallback = UPCOMING_PROJECTS_FALLBACK.find((p) => p.slug === slug);
  if (!sanity && !fallback) return undefined;
  return { ...fallback, ...sanity, slug, _key: (sanity?._key ?? fallback?._key ?? slug) } as UpcomingProject;
}

export async function generateStaticParams() {
  return UPCOMING_PROJECTS_FALLBACK.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: pageRaw } = await sanityFetch({ query: UPCOMING_PROJECTS_PAGE_QUERY, tags: ["upcomingProjectsPage"] });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sanityProjects: UpcomingProject[] = (pageRaw as any)?.projects ?? [];
  const project = resolveProject(sanityProjects, slug);
  if (!project) return { title: "Project Not Found · Emarat Realty" };
  return buildMetadata(undefined, {
    title: `${project.title} · Emarat Realty`,
    description: project.tagline ?? `An upcoming Emarat Realty development in ${project.location}.`,
  });
}

function ProjectBody({ body }: { body?: string | PortableTextBlock[] }) {
  if (!body) return null;
  if (typeof body === "string") {
    return (
      <>
        {body.split("\n\n").map((para, i) => (
          <p key={i} className="text-base leading-relaxed text-[color:var(--muted)] lg:text-lg">
            {para}
          </p>
        ))}
      </>
    );
  }
  return (
    <div className="space-y-5 text-base leading-relaxed text-[color:var(--muted)] lg:text-lg">
      {renderPortableText(body)}
    </div>
  );
}

export default async function UpcomingProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: pageRaw } = await sanityFetch({ query: UPCOMING_PROJECTS_PAGE_QUERY, tags: ["upcomingProjectsPage"] });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pc = (pageRaw as any) ?? {};
  const sanityProjects: UpcomingProject[] = pc?.projects ?? [];

  const project = resolveProject(sanityProjects, slug);
  if (!project) notFound();

  const enrichment = ENRICHMENT[slug] ?? DEFAULT_ENRICHMENT;

  return (
    <>
      <SiteNav />
      <main>

        {/* ── 1 · Hero ───────────────────────────────────────────────── */}
        <section
          id="top"
          className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-10 lg:pb-20 lg:pt-40"
        >
          <div className="pointer-events-none absolute inset-0 -z-20">
            {/* Mobile: no parallax so the 120% zoom trick doesn't crop the image */}
            {project.heroImageMobile && (
              <div className="absolute inset-0 lg:hidden">
                <Image
                  src={project.heroImageMobile}
                  alt={project.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                  style={{ filter: "sepia(0.18) saturate(0.85) brightness(0.5) contrast(1.05)" }}
                />
              </div>
            )}
            {/* Desktop: parallax scroll effect */}
            <div className={`absolute inset-0 ${project.heroImageMobile ? "hidden lg:block" : ""}`}>
              <Parallax speed={0.3} className="h-full w-full">
                <Image
                  src={project.heroImage ?? "/images/alameda-bedroom-3.webp"}
                  alt={project.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                  style={{ filter: "sepia(0.18) saturate(0.85) brightness(0.5) contrast(1.05)" }}
                />
              </Parallax>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--bg)] via-[color:var(--bg)]/40 to-[color:var(--bg)]/20" />
          </div>

          <div className="mx-auto flex w-full max-w-[1400px] flex-col flex-1">
          <Reveal as="div" y={16} className="mb-auto flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            <Link href="/" className="transition-colors hover:text-[color:var(--fg)]">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/upcoming-projects" className="transition-colors hover:text-[color:var(--fg)]">Upcoming Projects</Link>
            <span aria-hidden>/</span>
            <span className="text-[color:var(--accent)]">{project.title}</span>
          </Reveal>

          <div className="max-w-4xl">
            {project.status && (
              <Reveal as="div" delay={0.1} className="mb-6">
                <span className="rounded-full border border-[color:var(--accent)]/50 px-4 py-1.5 text-[0.625rem] uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  {project.status}
                </span>
              </Reveal>
            )}
            <SplitReveal as="h1" className="font-display h-page text-[color:var(--fg)]">
              {project.title}
            </SplitReveal>
            {project.tagline && (
              <Reveal as="p" delay={0.3} className="mt-5 max-w-xl font-display-alt text-2xl text-white/80 lg:text-3xl">
                {project.tagline}
              </Reveal>
            )}
            <Reveal as="div" delay={0.45} className="mt-10 flex flex-wrap items-center gap-4">
              <CircleButton href="#interest" variant="filled">Stay Updated</CircleButton>
            </Reveal>
          </div>
          </div>
        </section>

        {/* ── 2 · About the Project ──────────────────────────────────── */}
        <section id="about" className="theme-light scroll-mt-20 px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-start gap-y-8 lg:gap-16">

            {/* Property image */}
            {project.heroImage && (
              <Reveal className="col-span-12 lg:col-span-5">
                <div className="relative aspect-[3/4] overflow-hidden rounded-md">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}

            {/* Content */}
            <div className={`col-span-12 flex flex-col justify-center ${project.heroImage ? "lg:col-span-7" : "lg:col-span-12"}`}>
              <Reveal as="h2" className="font-display h-section whitespace-nowrap">
                About the <span className="text-[color:var(--accent)]">Project.</span>
              </Reveal>

              <div className="mt-8 space-y-6">
                <ProjectBody body={project.body} />
              </div>

            </div>

          </div>
        </section>

        {/* ── 3 · Key Highlights ─────────────────────────────────────── */}
        <section className="scroll-mt-20 px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <SplitReveal as="h2" className="font-display h-section">
                  Key
                </SplitReveal>
                <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
                  Highlights.
                </SplitReveal>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {enrichment.highlights.map((h, i) => (
                <Reveal key={h.label} delay={i * 0.07} className="group rounded-md border border-[color:var(--line)] p-8 transition-colors hover:border-[color:var(--accent)]/40">
                  <div className="mb-3 text-[0.625rem] uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mb-3 font-display-alt text-xl leading-snug">{h.label}</div>
                  <p className="text-sm leading-relaxed text-[color:var(--muted)]">{h.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4 · Full-bleed image ───────────────────────────────────── */}
        {project.heroImage && (
          <div className="relative h-[60vh] min-h-[320px] w-full overflow-hidden lg:h-[75vh]">
            <Parallax speed={0.2} className="h-full w-full">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-black/30" />
          </div>
        )}

        {/* ── 5 · Why This Location ──────────────────────────────────── */}
        <section className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-center gap-y-8 lg:gap-20">
            <div className="col-span-12 lg:col-span-5">
              <SplitReveal as="h2" className="font-display h-section">
                {enrichment.whyHeading.split(" ").slice(0, -1).join(" ")}
              </SplitReveal>
              <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
                {enrichment.whyHeading.split(" ").slice(-1)[0]}
              </SplitReveal>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <Reveal as="p" delay={0.15} className="text-base leading-relaxed text-[color:var(--muted)] lg:text-lg">
                {enrichment.whyText}
              </Reveal>
              <Reveal delay={0.25} className="mt-10">
                <CircleButton href="#interest" variant="outline" size="sm">Stay Updated</CircleButton>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 6 · Gallery ────────────────────────────────────────────── */}
        {enrichment.gallery?.length ? (
          <section className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
            <div className="mx-auto max-w-[1400px]">
              <Reveal className="mb-10">
                <h2 className="font-display h-sub">Gallery</h2>
              </Reveal>
              <div className={`grid gap-4 ${enrichment.gallery.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"}`}>
                {enrichment.gallery.map((src, i) => (
                  <Reveal key={src} delay={i * 0.07}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                      <Image
                        src={src}
                        alt={`${project.title} — ${i + 1}`}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ── 7 · Expression of Interest ─────────────────────────────── */}
        <section id="interest" className="scroll-mt-20 border-t border-[color:var(--line)] px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-12 max-w-xl">
              <SplitReveal as="h2" className="font-display h-section">
                Register For
              </SplitReveal>
              <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
                Updates.
              </SplitReveal>
              <Reveal as="p" delay={0.15} className="mt-6 text-sm leading-relaxed text-[color:var(--muted)]">
                Be among the first to receive launch details, pricing, and exclusive updates for {project.title}.
              </Reveal>
            </div>

            <Reveal delay={0.2} className="max-w-2xl">
              <form className="flex flex-col gap-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="border-b border-[color:var(--line)] pb-3">
                    <input
                      type="text"
                      placeholder="Full name"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                      aria-label="Name"
                    />
                  </div>
                  <div className="border-b border-[color:var(--line)] pb-3">
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                      aria-label="Phone"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="border-b border-[color:var(--line)] pb-3">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                      aria-label="Email"
                    />
                  </div>
                  <div className="border-b border-[color:var(--line)] pb-3">
                    <select
                      defaultValue=""
                      className="w-full bg-transparent text-sm text-[color:var(--muted)] outline-none"
                      aria-label="Enquiry type"
                    >
                      <option value="" disabled>Enquiring as…</option>
                      <option value="end-user">End User / Home Buyer</option>
                      <option value="channel-partner">Channel Partner / Broker</option>
                      <option value="investor">Investor</option>
                      <option value="nri">NRI Buyer</option>
                    </select>
                  </div>
                </div>
                <div className="border-b border-[color:var(--line)] pb-3">
                  <textarea
                    placeholder="Tell us what you're looking for…"
                    rows={3}
                    className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                    aria-label="Message"
                  />
                </div>
                <div className="flex flex-col items-start gap-6">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[color:var(--accent)]"
                    />
                    <span className="text-[12px] leading-relaxed text-[color:var(--muted)]">
                      By proceeding, you acknowledge and agree to our Privacy Policy. You also consent to receive updates, notifications, and promotional communications via Email, SMS, and WhatsApp.
                    </span>
                  </label>
                  <CircleButton type="submit" variant="filled">Submit</CircleButton>
                </div>
              </form>
            </Reveal>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
