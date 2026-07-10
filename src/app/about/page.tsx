import type { Metadata } from "next";
import Image from "@/components/Image";
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

export const dynamic = 'force-dynamic';

const HERO_FALLBACK = {
  eyebrow: "",
  titleTop: "Redefining the standard",
  titleBottom: "of luxury living.",
  subtitle:
    "At Emarat, we're passionate about creating exquisite spaces that elevate the art of living. Our mission is to redefine the standards of living one breath-taking space at a time.",
  trailing: "",
  bgImage: "/images/alameda-entrance.webp",
};

const FB = {
  intro: {
    heading1: "Crafting spaces that",
    heading2: "inspire and endure.",
    paragraph:
      "With a vision to transform the luxury real estate landscape, Emarat is a testament to opulence and sophistication. Our goal is to craft spaces that inspire, delight, and leave a lasting impression.",
    highlights: [
      "Luxurious living spaces, designed to perfection",
      "Unparalleled attention to detail and craftsmanship",
      "Prime locations with access to every amenity",
      "An unwavering commitment to excellence and customer satisfaction",
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
    secondaryCtaLabel: "",
    secondaryCtaHref: "",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("aboutPage");
  return buildMetadata(page?.seo, {
    title: "About Emarat Realty",
    description:
      "Emarat redefining luxury living in Gurugram. Vision, mission, and a 15-year legacy across real estate, hospitality, manufacturing and trading.",
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
  const community = {
    heading1: pickStr(c?.community?.heading1, FB.community.heading1),
    heading2: pickStr(c?.community?.heading2, FB.community.heading2),
    blurb: pickStr(c?.community?.blurb, FB.community.blurb),
  };
  const mission = {
    heading: "Our Mission",
    body:
      "At Emarat, our mission is simple: to build residences that families are proud to live in, in locations worth investing in, to a standard that never wavers. Every project we undertake is guided by quality, integrity and a long-term commitment to the families and communities we build for.",
  };
  const vision = {
    heading: "Our Vision",
    body:
      "Our vision is to be Gurugram's most trusted name in luxury residential development, recognised not for the volume of homes we build but for the standard every single one of them is held to. We exist to raise what families expect from a home and to consistently deliver on that expectation.",
  };
  const secondaryCtaHref = pickStr(c?.leadership?.secondaryCtaHref, FB.leadership.secondaryCtaHref);
  const lead = {
    quote: pickStr(c?.leadership?.quote, FB.leadership.quote),
    body: pickStr(c?.leadership?.body, FB.leadership.body),
    personName: pickStr(c?.leadership?.personName, FB.leadership.personName),
    personRole: pickStr(c?.leadership?.personRole, FB.leadership.personRole),
    personInitials: pickStr(c?.leadership?.personInitials, FB.leadership.personInitials),
    primaryCtaLabel: pickStr(c?.leadership?.primaryCtaLabel, FB.leadership.primaryCtaLabel),
    primaryCtaHref: pickStr(c?.leadership?.primaryCtaHref, FB.leadership.primaryCtaHref),
    secondaryCtaLabel: secondaryCtaHref
      ? pickStr(c?.leadership?.secondaryCtaLabel, FB.leadership.secondaryCtaLabel)
      : undefined,
    secondaryCtaHref: secondaryCtaHref || undefined,
  };

  return (
    <>
      <SiteNav />
      <main>
        <PageHero {...hero} />

        {/* Opening statement + highlights (light cream) */}
        <section className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-y-8">
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
                    className="border-t border-[color:var(--line)] pt-6"
                  >
                    <span className="font-display-alt text-xl leading-snug lg:text-2xl">
                      {h}
                    </span>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>


        {/* Community / Social (light cream) */}
        <section className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {[mission, vision].map((item, i) => (
                <Reveal
                  key={item.heading}
                  delay={i * 0.08}
                  className="rounded-md border border-[color:var(--line)] p-8 transition-colors hover:border-[color:var(--accent)]/40 lg:p-12"
                >
                  <h3 className="font-display-alt text-2xl leading-tight lg:text-3xl">
                    {item.heading}
                  </h3>
                  <p className="mt-5 text-[color:var(--muted)]">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership teaser */}
        <section className="relative isolate overflow-hidden border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="pointer-events-none absolute -right-32 top-1/4 hidden h-[440px] w-[440px] rounded-full bg-[color:var(--accent)]/10 blur-[200px] lg:block" />

          <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-center gap-y-10 lg:gap-12">
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
              {lead.secondaryCtaHref ? (
                <Link
                  href={lead.secondaryCtaHref}
                  className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent)]"
                >
                  {lead.secondaryCtaLabel}
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
