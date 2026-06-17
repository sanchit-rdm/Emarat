import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";
import { sanityFetch } from "@/sanity/lib/live";
import { UPCOMING_PROJECTS_PAGE_QUERY } from "@/sanity/lib/queries";
import { buildMetadata, mergeHero, pickArr } from "@/sanity/lib/page";
import { renderPortableText } from "@/lib/portableText";
import type { PortableTextBlock } from "@/lib/portableText";

export const dynamic = 'force-dynamic';

const HERO_FALLBACK = {
  eyebrow: "Coming Soon",
  titleTop: "Upcoming",
  titleBottom: "Projects",
  subtitle: "Stay informed on everything that is coming next.",
  trailing: "",
  bgImage: "/images/alameda-bedroom-3.webp",
};

export type UpcomingProject = {
  _key: string;
  slug: string;
  title: string;
  tagline?: string;
  location?: string;
  status?: string;
  body?: string | PortableTextBlock[];
  heroImage?: string;
};

export const UPCOMING_PROJECTS_FALLBACK: UpcomingProject[] = [
  {
    _key: "goa",
    slug: "goa",
    title: "Goa",
    tagline: "Contemporary living in one of India's most desirable destinations.",
    location: "Goa",
    status: "Coming Soon",
    heroImage: "/images/Goa.jpeg",
    body: "Emarat Realty presents a thoughtfully designed residential project in Goa, India's premier lifestyle and investment destination. Merging modern architecture with functional layouts, the development promises contemporary comfort, superior construction quality, and lasting value. From concept to completion, Emarat ensures meticulous planning, timely delivery, and unmatched craftsmanship, reflecting the brand's commitment to creating high-quality, investment-worthy real estate. This project exemplifies Emarat's vision of delivering residences that balance aesthetics, functionality, and long-term growth.",
  },
  {
    _key: "bhimtal",
    slug: "bhimtal",
    title: "Bhimtal",
    tagline: "Luxury wooden cottages in the hills of Bhimtal.",
    location: "Bhimtal, Uttarakhand",
    status: "Coming Soon",
    heroImage: "/images/Bhimtal.jpeg",
    body: "Discover an exclusive collection of luxury wooden cottages set amidst Bhimtal's serene hills. Perched between lush forests and the tranquil lake, each home offers breathtaking valley and lake views.\n\nCrafted with premium natural materials, warm wooden finishes, and expansive decks, these residences seamlessly blend contemporary comfort with the timeless charm of mountain living.\n\nWake to misty mornings, unwind by shimmering waters, and embrace a lifestyle defined by peace, privacy, and nature.",
  },
  {
    _key: "lakefarms",
    slug: "lakefarms",
    title: "Lakefarms",
    tagline: "A luxury farmland retreat near Jewar, where open skies, serene lakes and future growth come together.",
    location: "Jewar, Uttar Pradesh",
    status: "Coming Soon",
    heroImage: "/images/LakeFarms.jpeg",
    body: "Discover Emarat Lakefarms, a luxury countryside retreat set amidst lush greenery, serene lakes, and the evolving Jewar region. Strategically located near the upcoming Noida International Airport and Yamuna Expressway corridor, it offers unmatched access to future growth while preserving the tranquility of nature.\n\nDesigned for luxury farm living, the project features expansive plots, tree-lined avenues, water features, curated green zones, and exclusive recreational spaces. Whether as a weekend escape, family estate, or investment, residents enjoy panoramic views, open skies, and a lifestyle where privacy, wellness, and leisure coexist.\n\nEmarat Lakefarms is more than land — it's a destination, a retreat, and a future-ready investment, blending natural serenity with exceptional growth potential.",
  },
  {
    _key: "lansdowne",
    slug: "lansdowne",
    title: "Lansdowne",
    tagline: "An exclusive hilltop retreat in Lansdowne — 70 private residences across 30 acres of natural mountain landscape.",
    location: "Lansdowne, Uttarakhand",
    status: "Coming Soon",
    heroImage: "/images/Lansdown.jpeg",
    body: "Lansdowne is an exclusive hilltop retreat in Uttarakhand, envisioned across 30 acres of pristine mountain landscape with only 70 carefully planned resort residences and independent cottages. Surrounded by forests, valley views, and uninterrupted natural serenity, the project offers rare privacy, low-density living, operational lifestyle amenities, and improved connectivity from Delhi — creating a secluded destination where nature, exclusivity, and elevated ownership come together.",
  },
];

function ProjectBody({ body }: { body?: string | PortableTextBlock[] }) {
  if (!body) return null;
  if (typeof body === "string") {
    return (
      <>
        {body.split("\n\n").map((para, i) => (
          <p key={i} className="text-base leading-relaxed text-[color:var(--muted)]">
            {para}
          </p>
        ))}
      </>
    );
  }
  return <div className="space-y-4 text-base leading-relaxed text-[color:var(--muted)]">{renderPortableText(body)}</div>;
}

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: UPCOMING_PROJECTS_PAGE_QUERY, tags: ["upcomingProjectsPage"] });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pc = (data as any) ?? {};
  return buildMetadata(pc?.seo, {
    title: "Upcoming Projects — Emarat Realty",
    description:
      "Explore Emarat Realty's upcoming residential projects in Goa, Bhimtal, Lansdowne and Jewar — luxury living across India's most sought-after destinations.",
  });
}

export default async function UpcomingProjectsPage() {
  const { data: pageRaw } = await sanityFetch({ query: UPCOMING_PROJECTS_PAGE_QUERY, tags: ["upcomingProjectsPage"] });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pc = (pageRaw as any) ?? {};

  const hero = mergeHero(pc?.hero, HERO_FALLBACK);
  const projects: UpcomingProject[] = pickArr(pc?.projects, UPCOMING_PROJECTS_FALLBACK)
    .map((p: UpcomingProject, i: number) => ({
      ...UPCOMING_PROJECTS_FALLBACK[i] ?? {},
      ...p,
      slug: p.slug || p._key || UPCOMING_PROJECTS_FALLBACK[i]?.slug,
      heroImage: p.heroImage || UPCOMING_PROJECTS_FALLBACK[i]?.heroImage,
    }));
  return (
    <>
      <SiteNav />
      <main>
        <PageHero {...hero} />

        {/* Project entries */}
        <section className="theme-light px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1440px]">
            {projects.map((project, i) => (
              <Reveal
                key={project._key}
                as="article"
                delay={0.05 * i}
                className="grid grid-cols-12 items-center gap-8 border-t border-[color:var(--line)] py-16 lg:gap-12 lg:py-20"
              >
                {/* Image */}
                {project.heroImage && (
                  <div className={`col-span-12 lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <Link href={`/upcoming-projects/${project.slug}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[color:var(--bg-alt)]">
                        <Image
                          src={project.heroImage}
                          alt={project.title}
                          fill
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                          style={{ filter: "sepia(0.1) saturate(0.9) brightness(0.9)" }}
                        />
                      </div>
                    </Link>
                  </div>
                )}

                {/* Text */}
                <div className={`col-span-12 ${project.heroImage ? "lg:col-span-7" : "lg:col-span-12"} ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  {project.status && (
                    <div className="mb-4">
                      <span className="rounded-full border border-[color:var(--accent)]/40 px-3 py-1 text-[0.625rem] uppercase tracking-[0.18em] text-[color:var(--accent)]">
                        {project.status}
                      </span>
                    </div>
                  )}
                  <Link href={`/upcoming-projects/${project.slug}`} className="group">
                    <SplitReveal as="h2" className="font-display h-sub mb-4 transition-colors group-hover:text-[color:var(--accent)]">
                      {project.title}
                    </SplitReveal>
                  </Link>
                  {project.location && (
                    <p className="mb-6 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      {project.location}
                    </p>
                  )}
                  <div className="max-w-xl space-y-4">
                    <ProjectBody body={project.body} />
                  </div>
                  <div className="mt-8">
                    <CircleButton href={`/upcoming-projects/${project.slug}`} size="sm" variant="outline">
                      Learn More
                    </CircleButton>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Bottom border */}
            <div className="border-t border-[color:var(--line)]" />
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
