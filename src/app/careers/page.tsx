import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";

export const metadata: Metadata = {
  title: "Careers — Emarat Realty",
  description:
    "Build a career with Emarat Realty — opportunities in architecture, engineering, sales, marketing and project management at our Gurugram office.",
};

const pillars = [
  {
    n: "I.",
    title: "Growth & Learning",
    body: "Work alongside industry leaders and gain hands-on experience across architecture, engineering, sales and marketing.",
  },
  {
    n: "II.",
    title: "Innovation & Excellence",
    body: "Be part of a team that pushes boundaries — from material innovation to construction technology, the curious thrive here.",
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
];

const areas = [
  "Architecture",
  "Engineering",
  "Sales",
  "Marketing",
  "Project Management",
  "Customer Experience",
];

export default function CareersPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHero
          eyebrow="(01) Careers"
          titleTop="Build your career,"
          titleBottom="building landmarks."
          subtitle="At Emarat, we're always looking for passionate, innovative and driven individuals who want to shape the future of luxury living in Gurugram."
          bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2400&q=80&auto=format&fit=crop"
          trailing="Gurugram · On-site"
        />

        {/* Why work with us — 4 pillars (light cream) */}
        <section className="theme-light px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
              <div>
                <Reveal as="div" className="mb-4 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                  <span>(02) Why Emarat</span>
                </Reveal>
                <SplitReveal
                  as="h2"
                  className="font-display h-section"
                >
                  Four reasons people
                </SplitReveal>
                <SplitReveal
                  as="h2"
                  delay={0.1}
                  className="font-display h-section text-[color:var(--muted)]"
                >
                  build careers here.
                </SplitReveal>
              </div>
            </div>

            <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {pillars.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.n}
                  delay={i * 0.07}
                  className="group flex gap-6 rounded-md border border-[color:var(--line)] p-8 transition-colors hover:border-[color:var(--accent)]/40 lg:p-10"
                >
                  <span className="font-mono text-sm uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl tracking-tight lg:text-3xl">
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
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=2400&q=80&auto=format&fit=crop"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-[0.08]"
              style={{ filter: "sepia(0.25) saturate(0.5) brightness(0.55)" }}
            />
          </div>

          <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8">
            <Reveal as="div" className="col-span-12 mb-6 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)] lg:col-span-2 lg:mb-0">
              <span>(03) We hire in</span>
            </Reveal>

            <div className="col-span-12 lg:col-span-10">
              <SplitReveal
                as="h2"
                className="font-display h-section"
              >
                Six disciplines.
              </SplitReveal>
              <SplitReveal
                as="h2"
                delay={0.1}
                className="font-display h-section text-[color:var(--muted)]"
              >
                One shared standard.
              </SplitReveal>

              <ul className="mt-12 grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {areas.map((a, i) => (
                  <Reveal
                    as="li"
                    key={a}
                    delay={i * 0.05}
                    className="flex items-baseline justify-between border-t border-[color:var(--line)] pt-4"
                  >
                    <span className="font-display text-xl tracking-tight lg:text-2xl">{a}</span>
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
              <Reveal as="div" className="mb-4 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                <span>(04) How to Apply</span>
              </Reveal>
              <SplitReveal
                as="h2"
                className="font-display h-section"
              >
                Send us your résumé.
              </SplitReveal>
              <SplitReveal
                as="h2"
                delay={0.1}
                className="font-display h-section text-[color:var(--muted)]"
              >
                We read every one.
              </SplitReveal>

              <Reveal as="p" delay={0.2} className="mt-8 max-w-xl text-base text-[color:var(--muted)] lg:text-lg">
                Email your résumé and a short note about what you&apos;d like to work on
                — we&apos;ll get back to you within five business days if there&apos;s a fit.
              </Reveal>
            </div>

            <div className="col-span-12 flex flex-col gap-4 lg:col-span-5">
              <div className="rounded-md border border-[color:var(--line)] p-8 lg:p-10">
                <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  Send applications to
                </div>
                <a
                  href="mailto:info@emaratrealty.com?subject=Career%20Application"
                  className="mt-4 block font-display text-2xl tracking-tight transition-colors hover:text-[color:var(--accent)] lg:text-3xl"
                >
                  info@emaratrealty.com
                </a>
                <div className="mt-6 space-y-2 border-t border-[color:var(--line)] pt-6 text-sm text-[color:var(--muted)]">
                  <div>Mon – Fri · 9am – 6pm</div>
                  <div>Corporate Office, Gurugram</div>
                </div>
                <div className="mt-8">
                  <CircleButton href="mailto:info@emaratrealty.com?subject=Career%20Application" variant="filled">
                    Apply Now
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
