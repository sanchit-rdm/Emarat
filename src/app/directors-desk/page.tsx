import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Parallax from "@/components/motion/Parallax";
import CircleButton from "@/components/CircleButton";
import { sanityFetch } from "@/sanity/lib/live";
import { DIRECTORS_DESK_PAGE_QUERY } from "@/sanity/lib/queries";
import { getPageContent, mergeHero, buildMetadata, pickStr, pickArr } from "@/sanity/lib/page";

export const dynamic = 'force-dynamic';

const HERO_FALLBACK = {
  eyebrow: "",
  titleTop: "A message from",
  titleBottom: "our Managing Director.",
  subtitle:
    "On vision, the work that drives us, and what it takes to build landmarks that define aspirations and enhance lifestyles for generations to come.",
  trailing: "Dr. Raahul Goel · Managing Director",
  bgImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2400&q=80&auto=format&fit=crop",
};

const FB = {
  portrait: {
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80&auto=format&fit=crop",
    personName: "Dr. Raahul Goel",
    personRole: "Managing Director · Emarat Realty",
  },
  quote: {
    line1: "We don't just build structures",
    line2: "we create landmarks that define aspirations.",
  },
  message: [
    "At Emarat, we don't just build structures; we create landmarks that define aspirations, enhance lifestyles, and drive progress. Every project we undertake is a reflection of our dedication to quality, innovation and an unrelenting focus on the people who choose to live and work in the spaces we deliver.",
    "Each development is a reflection of our excellence vision where architecture meets functionality and luxury integrates seamlessly with sustainability. From the placement of a window to the choice of every material, decisions are taken with care, with the long view in mind.",
    "We welcome you to be a part of Emarat's journey where vision meets reality, and excellence is built to last.",
  ],
  signatureName: "Dr. Raahul Goel",
  mission: {
    label: "Our Mission",
    heading: "Transformative real estate that sets new standards.",
    body: "To develop transformative real estate that establishes new standards of quality and sustainability. We prioritise exceptional spaces that foster growth, elevated lifestyles, and meaningful contributions to urban life through innovation and a customer-centric approach in everything we do.",
  },
  vision: {
    label: "Our Vision",
    heading: "Leading through excellence, sustainability and design.",
    body: "To lead the real estate sector through excellence, sustainability and forward-thinking design. We aspire to create landmark developments that reshape skylines while enhancing how people live, work, and experience their built environment.",
  },
  cta: {
    heading: "Be part of the journey.",
    body: "Explore our projects across Gurugram, or speak with our sales team about the right residence for your family.",
    primaryLabel: "View Projects",
    primaryHref: "/projects",
    secondaryLabel: "Get in Touch",
    secondaryHref: "/contact",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("directorsDeskPage");
  return buildMetadata(page?.seo, {
    title: "Director's Desk Emarat Realty",
    description:
      "A message from Dr. Raahul Goel, Managing Director at Emarat Realty on quality, innovation, and building landmarks that define aspirations.",
  });
}

export default async function DirectorsDeskPage() {
  const { data } = await sanityFetch({ query: DIRECTORS_DESK_PAGE_QUERY, tags: ["directorsDeskPage"] });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = (data as any) ?? {};
  const hero = mergeHero(c?.hero, HERO_FALLBACK);

  const portrait = {
    image: pickStr(c?.portrait?.image, FB.portrait.image),
    personName: pickStr(c?.portrait?.personName, FB.portrait.personName),
    personRole: pickStr(c?.portrait?.personRole, FB.portrait.personRole),
  };
  const quote = {
    line1: pickStr(c?.quote?.line1, FB.quote.line1),
    line2: pickStr(c?.quote?.line2, FB.quote.line2),
  };
  const message = pickArr<string>(c?.message, FB.message);
  const signatureName = pickStr(c?.signatureName, FB.signatureName);
  const cta = {
    heading: pickStr(c?.cta?.heading, FB.cta.heading),
    body: pickStr(c?.cta?.body, FB.cta.body),
    primaryLabel: pickStr(c?.cta?.primaryLabel, FB.cta.primaryLabel),
    primaryHref: pickStr(c?.cta?.primaryHref, FB.cta.primaryHref),
    secondaryLabel: pickStr(c?.cta?.secondaryLabel, FB.cta.secondaryLabel),
    secondaryHref: pickStr(c?.cta?.secondaryHref, FB.cta.secondaryHref),
  };

  return (
    <>
      <SiteNav />
      <main>
        <PageHero {...hero} />

        {/* Director portrait + intro */}
        <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-[1280px] grid-cols-12 items-end gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-5">
              <Parallax speed={0.2} className="relative aspect-[4/5] overflow-hidden rounded-md bg-[color:var(--bg-alt)]">
                <Image
                  src={portrait.image}
                  alt={`${portrait.personName}, ${portrait.personRole}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={{ filter: "sepia(0.12) saturate(0.9) brightness(0.92)" }}
                />
              </Parallax>
              <Reveal delay={0.2} className="mt-6">
                <div className="font-display-alt text-2xl">{portrait.personName}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  {portrait.personRole}
                </div>
              </Reveal>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <SplitReveal as="blockquote" className="font-display h-sub">
                {quote.line1}
              </SplitReveal>
              <SplitReveal as="blockquote" delay={0.1} className="font-display h-sub text-[color:var(--accent)]">
                {quote.line2}
              </SplitReveal>
            </div>
          </div>
        </section>

        {/* Full message body */}
        <section className="border-y border-[color:var(--line)] bg-[color:var(--bg-alt)] px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-3xl">
            {message.map((para, i) => (
              <Reveal
                as="p"
                key={i}
                delay={i * 0.1}
                className={`${i === 0 ? "" : "mt-8 "}font-display-alt text-xl leading-[1.7] text-[color:var(--fg)]/85 lg:text-2xl`}
              >
                {para}
              </Reveal>
            ))}

            <Reveal delay={0.3} className="mt-12 flex items-center gap-4 border-t border-[color:var(--line)] pt-8">
              <div className="font-display-alt text-2xl text-[color:var(--accent)]">
                {signatureName}
              </div>
            </Reveal>
          </div>
        </section>


        {/* CTA */}
        <section className="border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-32">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8">
            <div>
              <SplitReveal as="h2" className="font-display h-sub">
                {cta.heading}
              </SplitReveal>
              <Reveal as="p" delay={0.15} className="mt-4 max-w-md text-sm text-[color:var(--muted)]">
                {cta.body}
              </Reveal>
            </div>
            <div className="flex flex-wrap gap-4">
              <CircleButton href={cta.primaryHref} variant="filled">
                {cta.primaryLabel}
              </CircleButton>
              <CircleButton href={cta.secondaryHref} variant="outline">
                {cta.secondaryLabel}
              </CircleButton>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
