import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";

export const metadata: Metadata = {
  title: "Our Team — Emarat Realty",
  description:
    "Meet the Emarat Realty leadership — visionary leaders, expert architects and dedicated professionals collaborating to create spaces that inspire and endure.",
};

const team = [
  {
    name: "Dr. Raahul Goel",
    role: "Managing Director",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80&auto=format&fit=crop",
    bio: "Drives the vision and strategy of Emarat Realty with a focus on innovation, quality and customer experience.",
  },
  {
    name: "Head of Architecture",
    role: "Architecture Lead",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80&auto=format&fit=crop",
    bio: "Leads design and planning across every Emarat development — from massing studies to material specification.",
  },
  {
    name: "Head of Sales",
    role: "Sales & Client Experience",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80&auto=format&fit=crop",
    bio: "Manages the client journey from first enquiry to handover, ensuring every transaction reflects Emarat's standards.",
  },
  {
    name: "Head of Construction",
    role: "Project Delivery",
    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=900&q=80&auto=format&fit=crop",
    bio: "Oversees site execution, quality control and timely handover across every project in the portfolio.",
  },
];

const values = [
  { label: "Integrity", body: "Every transaction. Every promise. Every time." },
  { label: "Quality", body: "From first sketch to final handover — no compromises." },
  { label: "Customer-first", body: "The people we build for shape every decision." },
];

export default function TeamPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHero
          titleTop="Leaders in innovation,"
          titleBottom="architects of change."
          subtitle="Emarat is driven by a team of visionary leaders, expert architects and dedicated professionals who share a passion for excellence — collaborating to create spaces that inspire and endure."
          bgImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=2400&q=80&auto=format&fit=crop"
          trailing="A small team. Long horizons."
        />

        {/* Values strip */}
        <section className="border-y border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-12 lg:px-10 lg:py-16">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal
                key={v.label}
                delay={i * 0.07}
                className="flex items-center gap-6"
              >
                <span className="font-display text-4xl text-[color:var(--accent)] lg:text-5xl">
                  0{i + 1}
                </span>
                <div>
                  <div className="font-display text-xl">{v.label}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
                    {v.body}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Team grid (light cream) */}
        <section className="theme-light px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
              <div>
                <SplitReveal
                  as="h2"
                  className="font-display h-section"
                >
                  The people
                </SplitReveal>
                <SplitReveal
                  as="h2"
                  delay={0.1}
                  className="font-display h-section text-[color:var(--muted)]"
                >
                  behind every project.
                </SplitReveal>
              </div>
              <Reveal as="p" delay={0.2} className="max-w-sm text-sm text-[color:var(--muted)]">
                Decisions are made by the same people who sign the drawings — that&apos;s
                how we keep quality consistent across every Emarat residence.
              </Reveal>
            </div>

            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m, i) => (
                <Reveal as="li" key={m.name} delay={i * 0.07} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-[color:var(--bg-alt)]">
                    <Image
                      src={m.img}
                      alt={m.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                      style={{ filter: "sepia(0.14) saturate(0.85) brightness(0.88)" }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--bg)]/85 via-transparent to-transparent" />
                  </div>
                  <div className="mt-5">
                    <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--accent)]">
                      {m.role}
                    </div>
                    <div className="mt-2 font-display text-xl tracking-tight lg:text-2xl">
                      {m.name}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                      {m.bio}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Join us CTA */}
        <section className="relative isolate overflow-hidden border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-28 lg:px-10 lg:py-40">
          <div className="pointer-events-none absolute -right-32 top-1/3 h-[480px] w-[480px] rounded-full bg-[color:var(--accent)]/10 blur-[200px]" />
          <div className="mx-auto grid max-w-[1280px] grid-cols-12 items-end gap-8">
            <div className="col-span-12 lg:col-span-8">
              <SplitReveal
                as="h2"
                className="font-display h-section"
              >
                Architecture, engineering,
              </SplitReveal>
              <SplitReveal
                as="h2"
                delay={0.1}
                className="font-display h-section text-[color:var(--muted)]"
              >
                sales and beyond.
              </SplitReveal>
              <Reveal as="p" delay={0.2} className="mt-6 max-w-xl text-base text-[color:var(--muted)] lg:text-lg">
                We&apos;re always looking for passionate, innovative and driven individuals
                to join the Emarat team.
              </Reveal>
            </div>
            <div className="col-span-12 flex flex-wrap gap-4 lg:col-span-4 lg:justify-end">
              <CircleButton href="/careers" variant="filled">
                Explore Careers
              </CircleButton>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
