import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";
import { sanityFetch } from "@/sanity/lib/live";
import { CAREERS_PAGE_QUERY } from "@/sanity/lib/queries";
import { getPageContent, mergeHero, buildMetadata, pickStr, pickArr } from "@/sanity/lib/page";

const HERO_FALLBACK = {
  eyebrow: "",
  titleTop: "Build your career,",
  titleBottom: "building landmarks.",
  subtitle:
    "At Emarat, we're always looking for passionate, innovative and driven individuals who want to shape the future of luxury living in Gurugram.",
  trailing: "Gurugram · On-site",
  bgImage: "/images/alameda-kitchen.webp",
};

const FB = {
  pillarsHeading: { heading1: "Four reasons people", heading2: "build careers here." },
  pillars: [
    {
      n: "I.",
      title: "Growth & Learning",
      body: "Work alongside industry leaders and gain hands-on experience across architecture, engineering, sales and marketing.",
    },
    {
      n: "II.",
      title: "Innovation & Excellence",
      body: "Be part of a team that pushes boundaries from material innovation to construction technology, the curious thrive here.",
    },
    {
      n: "III.",
      title: "Dynamic Work Environment",
      body: "Collaborate, create and excel in a forward-thinking culture where good ideas win regardless of where they originate.",
    },
    {
      n: "IV.",
      title: "Competitive Rewards",
      body: "We value talent and offer competitive compensation, comprehensive benefits and clear pathways for progression.",
    },
  ],
  areasHeading: { heading1: "Six disciplines.", heading2: "One shared standard." },
  areas: ["Architecture", "Engineering", "Sales", "Marketing", "Project Management", "Customer Experience"],
  apply: {
    heading1: "Send us your résumé.",
    heading2: "We read every one.",
    body: "Email your résumé and a short note about what you'd like to work on we'll get back to you within five business days if there's a fit.",
    cardLabel: "Send applications to",
    email: "info@emaratrealty.com",
    hours: "Mon – Fri · 9am – 6pm",
    office: "Corporate Office, Gurugram",
    buttonLabel: "Apply Now",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("careersPage");
  return buildMetadata(page?.seo, {
    title: "Careers Emarat Realty",
    description:
      "Build a career with Emarat Realty opportunities in architecture, engineering, sales, marketing and project management at our Gurugram office.",
  });
}

export default async function CareersPage() {
  const { data } = await sanityFetch({ query: CAREERS_PAGE_QUERY, tags: ["careersPage"] });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = (data as any) ?? {};
  const hero = mergeHero(c?.hero, HERO_FALLBACK);

  const pillarsHeading = {
    heading1: pickStr(c?.pillarsHeading?.heading1, FB.pillarsHeading.heading1),
    heading2: pickStr(c?.pillarsHeading?.heading2, FB.pillarsHeading.heading2),
  };
  const pillars = pickArr(c?.pillars, FB.pillars);
  const areasHeading = {
    heading1: pickStr(c?.areasHeading?.heading1, FB.areasHeading.heading1),
    heading2: pickStr(c?.areasHeading?.heading2, FB.areasHeading.heading2),
  };
  const areas = pickArr<string>(c?.areas, FB.areas);
  const apply = {
    heading1: pickStr(c?.apply?.heading1, FB.apply.heading1),
    heading2: pickStr(c?.apply?.heading2, FB.apply.heading2),
    body: pickStr(c?.apply?.body, FB.apply.body),
    cardLabel: pickStr(c?.apply?.cardLabel, FB.apply.cardLabel),
    email: pickStr(c?.apply?.email, FB.apply.email),
    hours: pickStr(c?.apply?.hours, FB.apply.hours),
    office: pickStr(c?.apply?.office, FB.apply.office),
    buttonLabel: pickStr(c?.apply?.buttonLabel, FB.apply.buttonLabel),
  };
  const applyMailto = `mailto:${apply.email}?subject=${encodeURIComponent("Career Application")}`;

  return (
    <>
      <SiteNav />
      <main>
        <PageHero {...hero} />

        {/* Why work with us — pillars (light cream) */}
        <section className="theme-light px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
              <div>
                <SplitReveal as="h2" className="font-display h-section">
                  {pillarsHeading.heading1}
                </SplitReveal>
                <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--muted)]">
                  {pillarsHeading.heading2}
                </SplitReveal>
              </div>
            </div>

            <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {pillars.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.n ?? i}
                  delay={i * 0.07}
                  className="group flex gap-6 rounded-md border border-[color:var(--line)] p-8 transition-colors hover:border-[color:var(--accent)]/40 lg:p-10"
                >
                  <span className="font-mono text-sm uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="font-display-alt text-2xl lg:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-[color:var(--muted)]">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Areas we hire in */}
        <section className="relative isolate overflow-hidden border-y border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-28 lg:px-10 lg:py-40">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <Image
              src="/images/alameda-bedroom-1.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-[0.08]"
              style={{ filter: "sepia(0.25) saturate(0.5) brightness(0.55)" }}
            />
          </div>

          <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-10">
              <SplitReveal as="h2" className="font-display h-section">
                {areasHeading.heading1}
              </SplitReveal>
              <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--muted)]">
                {areasHeading.heading2}
              </SplitReveal>

              <ul className="mt-12 grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {areas.map((a, i) => (
                  <Reveal
                    as="li"
                    key={a}
                    delay={i * 0.05}
                    className="flex items-baseline justify-between border-t border-[color:var(--line)] pt-4"
                  >
                    <span className="font-display-alt text-xl lg:text-2xl">{a}</span>
                    <span className="font-mono text-xs text-[color:var(--accent)]">
                      0{i + 1}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How to apply */}
        <section className="px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto grid max-w-[1280px] grid-cols-12 items-end gap-8 lg:gap-16">
            <div className="col-span-12 lg:col-span-7">
              <SplitReveal as="h2" className="font-display h-section">
                {apply.heading1}
              </SplitReveal>
              <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--muted)]">
                {apply.heading2}
              </SplitReveal>

              <Reveal as="p" delay={0.2} className="mt-8 max-w-xl text-base text-[color:var(--muted)] lg:text-lg">
                {apply.body}
              </Reveal>
            </div>

            <div className="col-span-12 flex flex-col gap-4 lg:col-span-5">
              <div className="rounded-md border border-[color:var(--line)] p-8 lg:p-10">
                <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  {apply.cardLabel}
                </div>
                <a
                  href={applyMailto}
                  className="mt-4 block font-display-alt text-2xl transition-colors hover:text-[color:var(--accent)] lg:text-3xl"
                >
                  {apply.email}
                </a>
                <div className="mt-6 space-y-2 border-t border-[color:var(--line)] pt-6 text-sm text-[color:var(--muted)]">
                  <div>{apply.hours}</div>
                  <div>{apply.office}</div>
                </div>
                <div className="mt-8">
                  <CircleButton href={applyMailto} variant="filled">
                    {apply.buttonLabel}
                  </CircleButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
