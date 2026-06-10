import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Parallax from "@/components/motion/Parallax";
import CircleButton from "@/components/CircleButton";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import { getPageContent, mergeHero, buildMetadata, pickStr, pickArr } from "@/sanity/lib/page";

const HERO_FALLBACK = {
  eyebrow: "",
  titleTop: "Redefining the standard",
  titleBottom: "of luxury living.",
  subtitle:
    "At Emarat, we're passionate about creating exquisite spaces that elevate the art of living. Our mission is to redefine the standards of living one breath-taking space at a time.",
  trailing: "An Argo Group company",
  bgImage: "/images/alameda-entrance.webp",
};

const FB = {
  intro: {
    heading1: "Crafting spaces that",
    heading2: "inspire and endure.",
    paragraph:
      "With a vision to transform the luxury real estate landscape, Argo Group presents Emarat a testament to opulence and sophistication. Our goal is to craft spaces that inspire, delight, and leave a lasting impression.",
    highlights: [
      "Luxurious living spaces, designed to perfection",
      "Unparalleled attention to detail and craftsmanship",
      "Prime locations with access to every amenity",
      "An unwavering commitment to excellence and customer satisfaction",
    ],
  },
  argo: {
    heading1: "Argo Group",
    heading2: "a legacy of excellence.",
    body:
      "Argo Group is a driving force across industries shaping businesses with vision, integrity, and excellence. Emarat's luxurious developments, rooted in innovation and meticulous planning, align seamlessly with the Group's vision of redefining modern real estate.",
    industries: [
      { name: "Real Estate", note: "Luxury residential & commercial" },
      { name: "Hospitality", note: "Hotels & guest experiences" },
      { name: "Manufacturing & Trading", note: "Industrial portfolio" },
      { name: "Import & Export", note: "Global trade operations" },
    ],
  },
  community: {
    heading1: "Building more",
    heading2: "than just buildings.",
    blurb:
      "Charitable initiatives focused on education, healthcare and social welfare across Haryana and the NCR.",
    initiatives: [
      {
        name: "Rukmani Devi Ji Charitable Trust",
        body: "Education and healthcare programmes serving the underprivileged in Haryana supporting schools, scholarships and free medical care.",
      },
      {
        name: "Anmol Ratan",
        body: "Social welfare initiative focused on child welfare, women's empowerment and community development across NCR.",
      },
    ],
  },
  leadership: {
    quote:
      "At Emarat, we are driven by a passion to create extraordinary living experiences.",
    body:
      "With a focus on innovation, quality and elegance, we aim to redefine the luxury real estate landscape.",
    personName: "Dr. Raahul Goel",
    personRole: "Managing Director",
    personInitials: "RG",
    primaryCtaLabel: "Read the full message",
    primaryCtaHref: "/directors-desk",
    secondaryCtaLabel: "Meet our team →",
    secondaryCtaHref: "/team",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("aboutPage");
  return buildMetadata(page?.seo, {
    title: "About Emarat Realty",
    description:
      "Emarat an Argo Group company redefining luxury living in Gurugram. Vision, mission, and a 15-year legacy across real estate, hospitality, manufacturing and trading.",
  });
}

export default async function AboutPage() {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY, tags: ["aboutPage"] });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = (data as any) ?? {};
  const hero = mergeHero(c?.hero, HERO_FALLBACK);

  const intro = {
    heading1: pickStr(c?.intro?.heading1, FB.intro.heading1),
    heading2: pickStr(c?.intro?.heading2, FB.intro.heading2),
    paragraph: pickStr(c?.intro?.paragraph, FB.intro.paragraph),
    highlights: pickArr<string>(c?.intro?.highlights, FB.intro.highlights),
  };
  const argo = {
    heading1: pickStr(c?.argo?.heading1, FB.argo.heading1),
    heading2: pickStr(c?.argo?.heading2, FB.argo.heading2),
    body: pickStr(c?.argo?.body, FB.argo.body),
    industries: pickArr(c?.argo?.industries, FB.argo.industries),
  };
  const community = {
    heading1: pickStr(c?.community?.heading1, FB.community.heading1),
    heading2: pickStr(c?.community?.heading2, FB.community.heading2),
    blurb: pickStr(c?.community?.blurb, FB.community.blurb),
    initiatives: pickArr(c?.community?.initiatives, FB.community.initiatives),
  };
  const lead = {
    quote: pickStr(c?.leadership?.quote, FB.leadership.quote),
    body: pickStr(c?.leadership?.body, FB.leadership.body),
    personName: pickStr(c?.leadership?.personName, FB.leadership.personName),
    personRole: pickStr(c?.leadership?.personRole, FB.leadership.personRole),
    personInitials: pickStr(c?.leadership?.personInitials, FB.leadership.personInitials),
    primaryCtaLabel: pickStr(c?.leadership?.primaryCtaLabel, FB.leadership.primaryCtaLabel),
    primaryCtaHref: pickStr(c?.leadership?.primaryCtaHref, FB.leadership.primaryCtaHref),
    secondaryCtaLabel: pickStr(c?.leadership?.secondaryCtaLabel, FB.leadership.secondaryCtaLabel),
    secondaryCtaHref: pickStr(c?.leadership?.secondaryCtaHref, FB.leadership.secondaryCtaHref),
  };

  return (
    <>
      <SiteNav />
      <main>
        <PageHero {...hero} />

        {/* Opening statement + highlights (light cream) */}
        <section className="theme-light px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-10">
              <SplitReveal as="h2" className="font-display h-section">
                {intro.heading1}
              </SplitReveal>
              <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
                {intro.heading2}
              </SplitReveal>

              <Reveal as="p" delay={0.2} className="mt-10 max-w-2xl text-base leading-relaxed text-[color:var(--muted)] lg:text-lg">
                {intro.paragraph}
              </Reveal>

              <ol className="mt-16 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                {intro.highlights.map((h, i) => (
                  <Reveal
                    key={h}
                    as="li"
                    delay={i * 0.07}
                    className="flex items-start gap-4 border-t border-[color:var(--line)] pt-6"
                  >
                    <span className="font-mono text-xs text-[color:var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display-alt text-xl leading-snug lg:text-2xl">
                      {h}
                    </span>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Argo Group section */}
        <section className="relative isolate overflow-hidden bg-[color:var(--bg-alt)] px-6 py-28 lg:px-10 lg:py-40">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <Image
              src="/images/alameda-lounge.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-[0.06]"
              style={{ filter: "sepia(0.3) saturate(0.5) brightness(0.6)" }}
            />
          </div>

          <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-7">
              <SplitReveal as="h2" className="font-display h-section">
                {argo.heading1}
              </SplitReveal>
              <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
                {argo.heading2}
              </SplitReveal>

              <Reveal as="p" delay={0.2} className="mt-10 max-w-xl text-base leading-relaxed text-[color:var(--muted)] lg:text-lg">
                {argo.body}
              </Reveal>

              <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                {argo.industries.map((ind, i) => (
                  <Reveal
                    key={ind.name ?? i}
                    delay={i * 0.06}
                    className="border-t border-[color:var(--line)] pt-4"
                  >
                    <div className="font-display-alt text-xl">{ind.name}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
                      {ind.note}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-3">
              <Parallax speed={0.2} className="relative aspect-[3/4] overflow-hidden rounded-md">
                <Image
                  src="/images/alameda-dining.webp"
                  alt="Argo Group portfolio"
                  fill
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="object-cover"
                  style={{ filter: "sepia(0.16) saturate(0.9) brightness(0.85)" }}
                />
              </Parallax>
            </div>
          </div>
        </section>

        {/* Community / Social (light cream) */}
        <section className="theme-light px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <SplitReveal as="h2" className="font-display h-section">
                  {community.heading1}
                </SplitReveal>
                <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
                  {community.heading2}
                </SplitReveal>
              </div>
              <Reveal as="p" delay={0.2} className="max-w-sm text-sm text-[color:var(--muted)]">
                {community.blurb}
              </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {community.initiatives.map((ci, i) => (
                <Reveal
                  key={ci.name ?? i}
                  delay={i * 0.08}
                  className="rounded-md border border-[color:var(--line)] p-8 transition-colors hover:border-[color:var(--accent)]/40 lg:p-12"
                >
                  <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    Initiative {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-6 font-display-alt text-2xl leading-tight lg:text-3xl">
                    {ci.name}
                  </h3>
                  <p className="mt-5 text-[color:var(--muted)]">{ci.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership teaser */}
        <section className="relative isolate overflow-hidden border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-28 lg:px-10 lg:py-40">
          <div className="pointer-events-none absolute -right-32 top-1/4 h-[440px] w-[440px] rounded-full bg-[color:var(--accent)]/10 blur-[200px]" />

          <div className="mx-auto grid max-w-[1440px] grid-cols-12 items-center gap-12">
            <div className="col-span-12 lg:col-span-7">
              <SplitReveal as="blockquote" className="font-display h-sub">
                {lead.quote}
              </SplitReveal>
              <Reveal as="p" delay={0.2} className="mt-6 text-base text-[color:var(--muted)] lg:text-lg">
                {lead.body}
              </Reveal>
              <Reveal delay={0.3} className="mt-8 flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[color:var(--accent)]/40 bg-[color:var(--bg)]">
                  <div className="absolute inset-0 flex items-center justify-center font-display text-base text-[color:var(--accent)]">
                    {lead.personInitials}
                  </div>
                </div>
                <div>
                  <div className="text-sm">{lead.personName}</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    {lead.personRole}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-span-12 flex flex-col gap-4 lg:col-span-5 lg:items-end">
              <CircleButton href={lead.primaryCtaHref} variant="outline">
                {lead.primaryCtaLabel}
              </CircleButton>
              <Link
                href={lead.secondaryCtaHref}
                className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent)]"
              >
                {lead.secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
