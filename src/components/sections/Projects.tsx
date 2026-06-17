import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

type Project = {
  no: string;
  title: string;
  place: string;
  year: string;
  type: string;
  img: string;
  href: string;
};

const FALLBACK_PROJECTS: Project[] = [
  { no: "01", title: "C2 at DLF Garden City", place: "Sector 93, Gurugram", year: "Now Selling", type: "5 BHK Independent Floors", img: "/images/C-2/building.jpg", href: "/projects/c2" },
  { no: "02", title: "C5 at DLF Garden City", place: "Sector 93, Gurugram", year: "Now Selling", type: "Independent Floors", img: "/images/C-5/building.jpg", href: "/projects/c5" },
  { no: "03", title: "E11 at DLF Garden City", place: "Sector 93, Gurugram", year: "New Launch", type: "Three-Side Open Floors", img: "/images/E11/building.jpg", href: "/projects/e11" },
  { no: "04", title: "EA 04 at Alameda", place: "Sector 73, Gurugram", year: "Now Selling", type: "Boutique Private Floors", img: "/images/EA4/building.jpg", href: "/projects/ea04" },
];

// Shape returned by PROJECTS_LISTING_QUERY (the fields this list needs).
type SanityProject = {
  slug?: string;
  no?: string;
  title?: string;
  location?: string;
  status?: string;
  config?: string;
  heroImage?: string | null;
};

interface SectionData {
  heading1?: string;
  heading2?: string;
  allLabel?: string;
  allHref?: string;
}
interface Props { data?: SectionData; projects?: SanityProject[] }

function toProjects(projects?: SanityProject[]): Project[] {
  const mapped = (projects ?? [])
    .filter((p) => p.heroImage)
    .map((p, i) => ({
      no: p.no ?? String(i + 1).padStart(2, "0"),
      title: p.title ?? "",
      place: p.location ?? "",
      year: p.status ?? "",
      type: p.config ?? "",
      img: p.heroImage as string,
      href: p.slug ? `/projects/${p.slug}` : "/projects",
    }));
  return mapped.length ? mapped : FALLBACK_PROJECTS;
}

export default function Projects({ data, projects: sanityProjects }: Props) {
  const projects = toProjects(sanityProjects);
  const heading1 = data?.heading1?.trim() || "Find Your";
  const heading2 = data?.heading2?.trim() || "Dream Home";
  const allLabel = data?.allLabel?.trim() || "All projects";
  const allHref = data?.allHref?.trim() || "/projects";

  return (
    <section id="projects" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SplitReveal as="h2" className="font-display h-section">
              {heading1}
            </SplitReveal>
            <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
              {heading2}
            </SplitReveal>
          </div>
          <Reveal delay={0.2} className="self-end">
            <a href={allHref} className="group inline-flex items-center gap-3 text-sm">
              <span className="border-b border-[color:var(--line)] pb-1 transition-colors group-hover:border-[color:var(--fg)]">
                {allLabel}
              </span>
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>

        <ul className="flex flex-col">
          {projects.map((p, i) => (
            <li
              key={p.title}
              className="group relative border-t border-[color:var(--line)] last:border-b"
            >
              <Reveal as="div" delay={i * 0.04}>
                <Link
                  href={p.href}
                  className="grid cursor-pointer grid-cols-12 items-center gap-4 py-8 transition-colors hover:bg-[color:var(--bg-alt)]/40 lg:py-10"
                >
                  <span className="col-span-12 font-display-alt text-2xl transition-transform duration-500 group-hover:translate-x-2 lg:col-span-5 lg:text-4xl">
                    {p.title}
                  </span>
                  <span className="hidden text-sm text-[color:var(--muted)] lg:col-span-3 lg:block">
                    {p.place}
                  </span>
                  <span className="hidden text-sm text-[color:var(--muted)] lg:col-span-3 lg:block">
                    {p.type}
                  </span>
                  <span className="hidden text-right text-sm text-[color:var(--muted)] lg:col-span-1 lg:block">
                    {p.year}
                  </span>

                  <div
                    className="pointer-events-none absolute right-6 top-1/2 hidden h-44 w-64 -translate-y-1/2 overflow-hidden rounded-md opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:block"
                    aria-hidden
                  >
                    {p.img && (
                      <Image
                        src={p.img}
                        alt=""
                        fill
                        sizes="256px"
                        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                        style={{ filter: "sepia(0.15) saturate(0.9) brightness(0.9)" }}
                      />
                    )}
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
