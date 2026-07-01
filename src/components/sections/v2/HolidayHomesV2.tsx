import Image from "@/components/Image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

type Project = {
  _key?: string;
  slug: string;
  title: string;
  tagline?: string;
  location?: string;
  heroImage?: string;
};

interface Labels {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  beachLabel?: string;
  mountainLabel?: string;
  exploreLabel?: string;
}

interface Props {
  projects?: Project[];
  labels?: Labels;
}

const FALLBACK: Project[] = [
  {
    slug: "goa",
    title: "Goa",
    location: "Goa, India",
    tagline: "Contemporary living in one of India's most desirable destinations.",
    heroImage: "/images/Upcomimg Projects/Goa.jpeg",
  },
  {
    slug: "lakefarms",
    title: "Lakefarms",
    location: "Jewar, Uttar Pradesh",
    tagline: "A luxury retreat where open skies, serene lakes and future growth come together.",
    heroImage: "/images/LakeFarms.jpeg",
  },
  {
    slug: "bhimtal",
    title: "Bhimtal",
    location: "Bhimtal, Uttarakhand",
    tagline: "Luxury wooden cottages in the hills of Bhimtal.",
    heroImage: "/images/Upcomimg Projects/Bhimtal.jpeg",
  },
  {
    slug: "lansdowne",
    title: "Lansdowne",
    location: "Lansdowne, Uttarakhand",
    tagline: "An exclusive hilltop retreat — 70 private residences across 30 acres of natural mountain landscape.",
    heroImage: "/images/Lansdown.jpeg",
  },
];

const BEACH_SLUGS = ["goa", "lakefarms"];
const MOUNTAIN_SLUGS = ["bhimtal", "lansdowne"];

function ProjectCard({ project, exploreLabel }: { project: Project; exploreLabel: string }) {
  return (
    <Reveal as="article" className="group">
      <Link href={`/upcoming-projects/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[color:var(--bg-alt)]">
          {project.heroImage && (
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <div className="mt-4">
          {project.location && (
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">{project.location}</p>
          )}
          <h3 className="mt-2 font-display text-2xl transition-colors group-hover:text-[color:var(--accent)]">
            {project.title}
          </h3>
          {project.tagline && (
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)] line-clamp-2">{project.tagline}</p>
          )}
          <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
            {exploreLabel}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3 w-3">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function HolidayHomesV2({ projects, labels }: Props) {
  const all = projects?.length ? projects : FALLBACK;
  const beach = BEACH_SLUGS.map((s) => all.find((p) => p.slug === s)).filter(Boolean) as Project[];
  const mountain = MOUNTAIN_SLUGS.map((s) => all.find((p) => p.slug === s)).filter(Boolean) as Project[];

  const eyebrow = labels?.eyebrow?.trim() || "Holiday Homes";
  const heading = labels?.heading?.trim() || "Escape to nature";
  const subheading = labels?.subheading?.trim() || "A curated collection of retreat residences, from beaches that slow you down to hills that bring you peace.";
  const beachLabel = labels?.beachLabel?.trim() || "Beach & Lake";
  const mountainLabel = labels?.mountainLabel?.trim() || "Mountain";
  const exploreLabel = labels?.exploreLabel?.trim() || "Explore";

  return (
    <section className="theme-light px-4 py-16 sm:px-6 sm:py-[80px] lg:px-10 lg:py-[120px]">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="mb-14 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">{eyebrow}</p>
          </Reveal>
          <SplitReveal as="h2" delay={0.05} className="font-display h-page mt-3">
            {heading}
          </SplitReveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[color:var(--muted)]">
              {subheading}
            </p>
          </Reveal>
        </div>

        {/* Two category columns */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">

          {/* Beach & Lake */}
          <div>
            <Reveal className="mb-8 flex items-center gap-3 border-b border-[color:var(--line)] pb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="h-5 w-5 shrink-0 text-[color:var(--accent)]" aria-hidden="true">
                <path d="M2 12c1.5-3 3-3 4.5 0s3 3 4.5 0 3-3 4.5 0 3 3 4.5 0" />
                <path d="M2 17c1.5-3 3-3 4.5 0s3 3 4.5 0 3-3 4.5 0 3 3 4.5 0" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-[0.25em]">{beachLabel}</span>
            </Reveal>
            <div className="grid grid-cols-2 gap-6">
              {beach.map((p) => <ProjectCard key={p.slug} project={p} exploreLabel={exploreLabel} />)}
            </div>
          </div>

          {/* Mountain */}
          <div>
            <Reveal className="mb-8 flex items-center gap-3 border-b border-[color:var(--line)] pb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-[color:var(--accent)]" aria-hidden="true">
                <path d="M2 21h20M9 21L15 7l6 14M2 21l7-13 5 8" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-[0.25em]">{mountainLabel}</span>
            </Reveal>
            <div className="grid grid-cols-2 gap-6">
              {mountain.map((p) => <ProjectCard key={p.slug} project={p} exploreLabel={exploreLabel} />)}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
