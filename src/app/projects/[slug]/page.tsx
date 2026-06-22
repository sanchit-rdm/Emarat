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
import { getSanityProject, getSanityProjectSlugs, getSanityProjectSeo } from "@/lib/sanity.projects";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_PAGE_QUERY } from "@/sanity/lib/queries";
import { buildMetadata, pickStr, pickArr } from "@/sanity/lib/page";

export const dynamic = 'force-dynamic';

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
  const seo = await getSanityProjectSeo(slug);
  return buildMetadata(seo ?? undefined, {
    title: `${project.title} · Emarat Realty`,
    description: `${project.tagline} ${project.config}, ${project.size}, at ${project.location}. ${project.status}.`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = (await getSanityProject(slug)) ?? getProject(slug);
  if (!project) notFound();

  const { data: ppRaw } = await sanityFetch({ query: PROJECTS_PAGE_QUERY, tags: ["projectsPage"] });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = (ppRaw as any)?.detail ?? {};
  const dl = {
    breadcrumbHome: pickStr(d.breadcrumbHome, "Home"),
    breadcrumbProjects: pickStr(d.breadcrumbProjects, "Projects"),
    heroEnquireLabel: pickStr(d.heroEnquireLabel, "Enquire Now"),
    heroFloorPlansLabel: pickStr(d.heroFloorPlansLabel, "View Floor Plans"),
    overviewHeading1: pickStr(d.overviewHeading1, "Project"),
    overviewHeading2: pickStr(d.overviewHeading2, "Overview."),
    amenitiesHeading: pickStr(d.amenitiesHeading, "Amenities"),
    amenitiesBlurb: project.amenitiesBlurb ?? pickStr(d.amenitiesBlurb, "Designed to make everyday living as effortless as possible."),
  };
  const sectionLinks = [
    { href: "#overview", label: pickStr(d.navOverview, "Overview") },
    { href: "#amenities", label: pickStr(d.navAmenities, "Amenities") },
    { href: "#floor-plans", label: pickStr(d.navFloorPlans, "Floor Plans") },
    { href: "#gallery", label: pickStr(d.navGallery, "Gallery") },
    { href: "#location", label: pickStr(d.navLocation, "Location") },
    { href: "#enquiry", label: pickStr(d.navEnquire, "Enquire") },
  ];
  const floorPlansLabels = {
    heading: pickStr(d.floorPlansHeading, "Floor Plans"),
    blurb: project.floorPlansBlurb ?? pickStr(d.floorPlansBlurb, "Each floor has been planned with the same attention to detail that goes into every other aspect of the residence."),
    requestLabel: pickStr(d.floorPlansRequestLabel, "Request detailed plan"),
    badge: pickStr(d.floorPlansBadge, "Indicative"),
  };
  const galleryLabels = { heading: pickStr(d.galleryHeading, "Gallery") };
  const connectivityLabels = {
    heading1: pickStr(d.connectivityHeading1, "Location &"),
    heading2: pickStr(d.connectivityHeading2, "Connectivity."),
    blurb: project.connectivityBlurb ?? pickStr(d.connectivityBlurb, "Positioned in one of Gurugram's most well-connected corridors, placing everything the city has to offer within easy reach."),
  };
  const enquiryLabels = {
    heading: pickStr(d.enquiryHeading, "Enquire about"),
    blurb: pickStr(d.enquiryBlurb, "Share your details and our team will get back to you shortly for the next steps."),
    phone: pickStr(d.enquiryPhone, "+91 84509 84509"),
    email: pickStr(d.enquiryEmail, "info@emaratrealty.com"),
    submitLabel: pickStr(d.enquirySubmitLabel, "Send Enquiry"),
    interestedLabel: pickStr(d.enquiryInterestedLabel, "Interested in"),
    nameLabel: pickStr(d.enquiryNameLabel, "Full Name"),
    namePlaceholder: pickStr(d.enquiryNamePlaceholder, "Your name"),
    phoneLabel: pickStr(d.enquiryPhoneLabel, "Phone"),
    phonePlaceholder: pickStr(d.enquiryPhonePlaceholder, "+91 00000 00000"),
    emailLabel: pickStr(d.enquiryEmailLabel, "Email"),
    emailPlaceholder: pickStr(d.enquiryEmailPlaceholder, "your@email.com"),
    configLabel: pickStr(d.enquiryConfigLabel, "Configuration"),
    configPlaceholder: pickStr(d.enquiryConfigPlaceholder, "Preferred type"),
    configOptions: pickArr<string>(d.enquiryConfigOptions, ["Site visit", "Investment / NRI"]),
    messageLabel: pickStr(d.enquiryMessageLabel, "Message"),
    messagePlaceholder: pickStr(d.enquiryMessagePlaceholder, "Tell us what you're looking for…"),
    privacy: pickStr(d.enquiryPrivacy, "By submitting you agree to our privacy policy."),
  };

  return (
    <>
      <SiteNav />
      <main>
        {/* ---------------- 1 · Hero Banner ---------------- */}
        <section
          id="top"
          className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:min-h-[92svh] lg:px-10 lg:pb-20 lg:pt-40"
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
          <Reveal as="div" y={16} className="mb-auto flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            <Link href="/" className="transition-colors hover:text-[color:var(--fg)]">{dl.breadcrumbHome}</Link>
            <span aria-hidden>/</span>
            <Link href="/projects" className="transition-colors hover:text-[color:var(--fg)]">{dl.breadcrumbProjects}</Link>
            <span aria-hidden>/</span>
            <span className="text-[color:var(--accent)]">{project.shortName}</span>
          </Reveal>

          <div className="max-w-4xl">
            <Reveal as="div" y={20} className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-white">
              <span>{project.location}</span>
            </Reveal>

            <SplitReveal as="h1" className="mt-6 font-display h-page text-[color:var(--fg)]">
              {project.title}
            </SplitReveal>

            <Reveal as="p" delay={0.3} className="mt-5 max-w-xl font-display-alt text-2xl text-white/80 lg:text-3xl">
              {project.tagline}
            </Reveal>

            <Reveal as="div" delay={0.45} className="mt-10 flex flex-wrap gap-3">
              <CircleButton href="#enquiry" variant="filled">{dl.heroEnquireLabel}</CircleButton>
              <CircleButton href="#floor-plans" variant="outline">{dl.heroFloorPlansLabel}</CircleButton>
            </Reveal>
          </div>
        </section>

        {/* Sticky section nav */}
        <nav className="sticky top-0 z-40 border-y border-[color:var(--line)] bg-[color:var(--bg)]/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1400px] items-center gap-x-6 gap-y-2 overflow-x-auto px-6 py-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)] lg:px-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {sectionLinks.map((s) => (
              <a key={s.href} href={s.href} className="whitespace-nowrap transition-colors hover:text-[color:var(--fg)]">
                {s.label}
              </a>
            ))}
            <a
              href={project.brochure ?? "#enquiry"}
              download={project.brochure ? true : undefined}
              className="ml-auto flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[color:var(--accent)]/50 px-4 py-1.5 text-[0.625rem] uppercase tracking-[0.2em] text-[color:var(--accent)] transition-colors hover:bg-[color:var(--accent)]/10"
            >
              <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v8M5 7l3 3 3-3M3 13h10" />
              </svg>
              Download Brochure
            </a>
          </div>
        </nav>

        {/* ---------------- 2 · Project Overview ---------------- */}
        <section id="overview" className="theme-light scroll-mt-44 px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 lg:gap-16">
            <div className="col-span-12 lg:col-span-6">
              <SplitReveal as="h2" className="font-display h-section">
                {dl.overviewHeading1}
              </SplitReveal>
              <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
                {dl.overviewHeading2}
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
                    <div className="mt-2 text-[0.625rem] uppercase tracking-[0.18em] text-[color:var(--muted)]">{s.label}</div>
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
        <section id="amenities" className="theme-light scroll-mt-44 border-t border-[color:var(--line)] px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <SplitReveal as="h2" className="font-display h-section">
                {dl.amenitiesHeading}
              </SplitReveal>
              <Reveal as="p" delay={0.15} className="max-w-sm text-sm text-[color:var(--muted)]">
                {dl.amenitiesBlurb}
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
                  <span className="h-14 w-14 text-[color:var(--accent)] transition-transform duration-500 group-hover:-translate-y-1">
                    {amenityIcons[a.icon]}
                  </span>
                  <span className="font-display-alt text-lg leading-snug">{a.name}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- 4 · Floor Plans ---------------- */}
        <FloorPlans plans={project.floorPlans} labels={floorPlansLabels} />

        {/* ---------------- 5 · Gallery ---------------- */}
        <ProjectGallery images={project.gallery} labels={galleryLabels} />

        {/* ---------------- 6 · Location & Connectivity ---------------- */}
        <Connectivity landmarks={project.connectivity} mapQuery={project.mapQuery} location={project.location} labels={connectivityLabels} />

        {/* ---------------- 7 · Enquiry Form ---------------- */}
        <EnquiryForm projectTitle={project.title} config={project.config} labels={enquiryLabels} />
      </main>
      <SiteFooter />
    </>
  );
}
