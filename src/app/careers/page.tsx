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
import { toPlainText } from "@/lib/portableText";

export const dynamic = 'force-dynamic';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pillars = pickArr(c?.pillars, FB.pillars).map((p: any) => ({
    ...p,
    title: toPlainText(p.title) || p.title,
    body: toPlainText(p.body) || p.body,
  }));
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

  return (
    <>
      <SiteNav />
      <main>
        <PageHero {...hero} hideFooterStrip />

        {/* Why work with us — pillars (light cream) */}
        <section className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
              <div>
                <SplitReveal as="h2" className="font-display h-section">
                  {pillarsHeading.heading1}
                </SplitReveal>
                <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
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

        {/* How to apply */}
        <section className="px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto max-w-[900px] text-center">
            <div>
              <SplitReveal as="h2" className="font-display h-section">
                {apply.heading1}
              </SplitReveal>
              <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
                {apply.heading2}
              </SplitReveal>

              <Reveal as="p" delay={0.2} className="mx-auto mt-8 max-w-xl text-base text-[color:var(--muted)] lg:text-lg">
                {apply.body}
              </Reveal>
            </div>

            <div className="mt-16">
              <form action="#" method="post" className="mx-auto max-w-xl rounded-md border border-[color:var(--line)] bg-[color:var(--bg-alt)] p-8 lg:p-10 text-left">
                <div className="grid gap-6">
                  <label className="block text-sm text-[color:var(--muted)]">
                    <span className="font-display-alt text-base">Full name</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      className="mt-3 w-full rounded-md border border-[color:var(--line)] bg-transparent px-4 py-3 text-[color:var(--fg)] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
                    />
                  </label>

                  <label className="block text-sm text-[color:var(--muted)]">
                    <span className="font-display-alt text-base">Email address</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="mt-3 w-full rounded-md border border-[color:var(--line)] bg-transparent px-4 py-3 text-[color:var(--fg)] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
                    />
                  </label>

                  <label className="block text-sm text-[color:var(--muted)]">
                    <span className="font-display-alt text-base">Phone number</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 12345 67890"
                      className="mt-3 w-full rounded-md border border-[color:var(--line)] bg-transparent px-4 py-3 text-[color:var(--fg)] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
                    />
                  </label>

                  <label className="block text-sm text-[color:var(--muted)]">
                    <span className="font-display-alt text-base">Position / department</span>
                    <input
                      type="text"
                      name="position"
                      placeholder="Role or department you are applying for"
                      className="mt-3 w-full rounded-md border border-[color:var(--line)] bg-transparent px-4 py-3 text-[color:var(--fg)] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
                    />
                  </label>

                  <label className="block text-sm text-[color:var(--muted)]">
                    <span className="font-display-alt text-base">Upload resume</span>
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      className="mt-3 w-full rounded-md border border-[color:var(--line)] bg-transparent px-4 py-3 text-[color:var(--fg)] outline-none"
                    />
                  </label>

                  <label className="block text-sm text-[color:var(--muted)]">
                    <span className="font-display-alt text-base">Message</span>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell us about your experience and what excites you about this role."
                      className="mt-3 w-full rounded-md border border-[color:var(--line)] bg-transparent px-4 py-3 text-[color:var(--fg)] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent)] px-8 py-3 text-sm uppercase tracking-[0.24em] text-[color:var(--bg)] transition-colors hover:bg-[color:var(--accent)]/90"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
