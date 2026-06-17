import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
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

  return (
    <>
      <SiteNav />
      <main>
        {/* Hero */}
        <section
          id="top"
          className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-10 lg:pb-20 lg:pt-40"
        >
          <div className="pointer-events-none absolute inset-0 -z-20">
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
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--bg)] via-[color:var(--bg)]/40 to-[color:var(--bg)]/20" />
          </div>

          {/* Breadcrumb */}
          <Reveal as="div" y={16} className="mb-auto flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            <Link href="/" className="transition-colors hover:text-[color:var(--fg)]">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/upcoming-projects" className="transition-colors hover:text-[color:var(--fg)]">Upcoming Projects</Link>
            <span aria-hidden>/</span>
            <span className="text-[color:var(--accent)]">{project.location}</span>
          </Reveal>

          <div className="max-w-4xl">
            <SplitReveal as="h1" className="font-display h-page text-[color:var(--fg)]">
              {project.title}
            </SplitReveal>

            {project.tagline && (
              <Reveal as="p" delay={0.3} className="mt-5 max-w-xl font-display-alt text-2xl text-white/80 lg:text-3xl">
                {project.tagline}
              </Reveal>
            )}

            <Reveal as="div" delay={0.45} className="mt-10 flex flex-wrap items-center gap-4">
              <CircleButton href="#newsletter" variant="filled">Stay Informed</CircleButton>
              {project.status && (
                <span className="rounded-full border border-white/30 px-4 py-2 text-[0.6875rem] uppercase tracking-[0.2em] text-white/70">
                  {project.status}
                </span>
              )}
            </Reveal>
          </div>
        </section>

        {/* Description */}
        <section className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-10 lg:gap-16">
            <div className="col-span-12 lg:col-span-4">
              <SplitReveal as="h2" className="font-display h-section">
                About the
              </SplitReveal>
              <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
                Project.
              </SplitReveal>
              {project.location && (
                <Reveal delay={0.2} className="mt-8 border-t border-[color:var(--line)] pt-6">
                  <div className="text-[0.625rem] uppercase tracking-[0.22em] text-[color:var(--muted)]">Location</div>
                  <div className="mt-2 font-display-alt text-lg">{project.location}</div>
                </Reveal>
              )}
              {project.status && (
                <Reveal delay={0.25} className="mt-6">
                  <div className="text-[0.625rem] uppercase tracking-[0.22em] text-[color:var(--muted)]">Status</div>
                  <div className="mt-2 inline-block rounded-full border border-[color:var(--accent)]/40 px-3 py-1 text-[0.6875rem] uppercase tracking-[0.18em] text-[color:var(--accent)]">
                    {project.status}
                  </div>
                </Reveal>
              )}
            </div>

            <div className="col-span-12 space-y-5 lg:col-span-8">
              <ProjectBody body={project.body} />
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section id="newsletter" className="border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-12 items-end gap-8">
            <div className="col-span-12 lg:col-span-7">
              <SplitReveal as="h2" className="font-display h-section">
                Interested in upcoming
              </SplitReveal>
              <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
                projects?
              </SplitReveal>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <form className="flex items-center border-b border-[color:var(--line)] py-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                  aria-label="Email"
                />
                <button
                  type="submit"
                  className="text-xs uppercase tracking-[0.18em] text-[color:var(--accent)] transition-colors hover:text-[color:var(--fg)]"
                >
                  Subscribe →
                </button>
              </form>
              <p className="mt-3 text-xs text-[color:var(--muted)]">
                Be the first to know about launch dates, pricing and more.
              </p>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
