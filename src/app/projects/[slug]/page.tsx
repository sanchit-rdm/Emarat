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
import FloorPlans from "@/components/project/FloorPlans";
import ProjectGallery from "@/components/project/ProjectGallery";
import Connectivity from "@/components/project/Connectivity";
import EnquiryForm from "@/components/project/EnquiryForm";
import { amenityIcons } from "@/components/project/amenityIcons";
import { getProject, projectSlugs } from "@/lib/projects";
import { getSanityProject, getSanityProjectSlugs } from "@/lib/sanity.projects";

export async function generateStaticParams() {
  const sanitySlugs = await getSanityProjectSlugs();
  const allSlugs = [...new Set([...sanitySlugs, ...projectSlugs])];
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getSanityProject(slug)) ?? getProject(slug);
  if (!project) return { title: "Project Not Found · Emarat Realty" };
  return {
    title: `${project.title} · Emarat Realty`,
    description: `${project.tagline} ${project.config}, ${project.size}, at ${project.location}. ${project.status}.`,
  };
}

const SECTION_LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#amenities", label: "Amenities" },
  { href: "#floor-plans", label: "Floor Plans" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "#enquiry", label: "Enquire" },
];

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = (await getSanityProject(slug)) ?? getProject(slug);
  if (!project) notFound();

  return (
    <>
      <SiteNav />
      <main>
        {/* ---------------- 1 · Hero Banner ---------------- */}
        <section
          id="top"
          className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden px-6 pb-14 pt-32 lg:px-10 lg:pb-20 lg:pt-40"
        >
          <div className="pointer-events-none absolute inset-0 -z-20">
            <Parallax speed={0.3} className="h-full w-full">
              <Image
                src={project.heroImage}
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
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--bg)] via-[color:var(--bg)]/40 to-[color:var(--bg)]/30" />
            <div className="absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-[color:var(--accent)]/8 blur-[160px]" />
          </div>

          {/* Breadcrumb */}
          <Reveal as="div" y={16} className="mb-auto flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            <Link href="/" className="transition-colors hover:text-[color:var(--fg)]">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/projects" className="transition-colors hover:text-[color:var(--fg)]">Projects</Link>
            <span aria-hidden>/</span>
            <span className="text-[color:var(--accent)]">{project.shortName}</span>
          </Reveal>

          <div className="max-w-4xl">
            <Reveal as="div" y={20} className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-white">
              <span className="brand-pill">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                {project.status}
              </span>
              <span>{project.location}</span>
            </Reveal>

            <SplitReveal as="h1" className="mt-6 font-display h-page text-[color:var(--fg)]">
              {project.title}
            </SplitReveal>

            <Reveal as="p" delay={0.3} className="mt-5 max-w-xl font-display-alt text-2xl text-white/80 lg:text-3xl">
              {project.tagline}
            </Reveal>

            <Reveal as="div" delay={0.45} className="mt-10 flex flex-wrap gap-3">
              <CircleButton href="#enquiry" variant="filled">Enquire Now</CircleButton>
              <CircleButton href="#floor-plans" variant="outline">View Floor Plans</CircleButton>
            </Reveal>
          </div>
        </section>

        {/* Sticky section nav — sits just below the fixed site header (h-28) */}
        <nav className="sticky top-28 z-40 border-y border-[color:var(--line)] bg-[color:var(--bg)]/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1440px] items-center gap-x-6 gap-y-2 overflow-x-auto px-6 py-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)] lg:px-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="hidden font-mono text-[color:var(--accent)] md:inline">{project.no}</span>
            {SECTION_LINKS.map((s) => (
              <a key={s.href} href={s.href} className="whitespace-nowrap transition-colors hover:text-[color:var(--fg)]">
                {s.label}
              </a>
            ))}
            <span className="ml-auto hidden whitespace-nowrap text-[color:var(--accent)] lg:inline">{project.config}</span>
          </div>
        </nav>

        {/* ---------------- 2 · Project Overview ---------------- */}
        <section id="overview" className="scroll-mt-44 px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-10 lg:gap-16">
            <div className="col-span-12 lg:col-span-6">
              <SplitReveal as="h2" className="font-display h-section">
                Project
              </SplitReveal>
              <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--muted)]">
                Overview.
              </SplitReveal>
              {project.overview.map((para, i) => (
                <Reveal as="p" key={i} delay={0.15 + i * 0.08} className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--muted)] lg:text-lg">
                  {para}
                </Reveal>
              ))}

              {/* Quick stats */}
              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[color:var(--line)] pt-10 sm:grid-cols-4">
                {project.stats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 0.06}>
                    <div className="font-display text-3xl tracking-tight text-[color:var(--accent)]">{s.value.split(" ")[0]}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted)]">{s.label}</div>
                  </Reveal>
                ))}
              </div>

            </div>

            <div className="col-span-12 lg:col-span-6">
              <Parallax speed={0.22} className="relative aspect-[4/5] overflow-hidden rounded-md bg-[color:var(--bg-alt)]">
                <Image
                  src={project.overviewImage}
                  alt={`${project.title} interior`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  style={{ filter: "sepia(0.14) saturate(0.9) brightness(0.88)" }}
                />
              </Parallax>
              <Reveal as="div" delay={0.2} className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                <span>{project.location}</span>
                <span>{project.rera}</span>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- 3 · Amenities ---------------- */}
        <section id="amenities" className="scroll-mt-44 border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <SplitReveal as="h2" className="font-display h-section">
                Amenities
              </SplitReveal>
              <Reveal as="p" delay={0.15} className="max-w-sm text-sm text-[color:var(--muted)]">
                Everything within the gates — designed to make everyday living effortless.
              </Reveal>
            </div>

            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {project.amenities.map((a, i) => (
                <Reveal
                  as="li"
                  key={a.name}
                  delay={(i % 4) * 0.06}
                  className="group flex flex-col gap-4 rounded-md border border-[color:var(--line)] p-6 transition-colors hover:border-[color:var(--accent)]/40 lg:p-8"
                >
                  <span className="h-8 w-8 text-[color:var(--accent)] transition-transform duration-500 group-hover:-translate-y-1">
                    {amenityIcons[a.icon]}
                  </span>
                  <span className="font-display-alt text-lg leading-snug">{a.name}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- 4 · Floor Plans ---------------- */}
        <FloorPlans plans={project.floorPlans} />

        {/* ---------------- 5 · Gallery ---------------- */}
        <ProjectGallery images={project.gallery} />

        {/* ---------------- 6 · Location & Connectivity ---------------- */}
        <Connectivity landmarks={project.connectivity} mapQuery={project.mapQuery} location={project.location} />

        {/* ---------------- 7 · Enquiry Form ---------------- */}
        <EnquiryForm projectTitle={project.title} config={project.config} />
      </main>
      <SiteFooter />
    </>
  );
}
