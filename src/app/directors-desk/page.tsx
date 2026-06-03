import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Parallax from "@/components/motion/Parallax";
import CircleButton from "@/components/CircleButton";

export const metadata: Metadata = {
  title: "Director's Desk Emarat Realty",
  description:
    "A message from Dr. Raahul Goel, Managing Director at Emarat Realty on quality, innovation, and building landmarks that define aspirations.",
};

export default function DirectorsDeskPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHero
          titleTop="A message from"
          titleBottom="our Managing Director."
          subtitle="On vision, the work that drives us, and what it takes to build landmarks that define aspirations and enhance lifestyles for generations to come."
          bgImage="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2400&q=80&auto=format&fit=crop"
          trailing="Dr. Raahul Goel · Managing Director"
        />

        {/* Director portrait + intro */}
        <section className="px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-[1280px] grid-cols-12 items-end gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-5">
              <Parallax speed={0.2} className="relative aspect-[4/5] overflow-hidden rounded-md bg-[color:var(--bg-alt)]">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80&auto=format&fit=crop"
                  alt="Dr. Raahul Goel, Managing Director, Emarat Realty"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={{ filter: "sepia(0.12) saturate(0.9) brightness(0.92)" }}
                />
              </Parallax>
              <Reveal delay={0.2} className="mt-6">
                <div className="font-display-alt text-2xl">Dr. Raahul Goel</div>
                <div className="mt-1 text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  Managing Director · Emarat Realty
                </div>
              </Reveal>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <SplitReveal
                as="blockquote"
                className="font-display h-sub"
              >
                We don&apos;t just build structures
              </SplitReveal>
              <SplitReveal
                as="blockquote"
                delay={0.1}
                className="font-display h-sub text-[color:var(--accent)]"
              >
                we create landmarks that define aspirations.
              </SplitReveal>
            </div>
          </div>
        </section>

        {/* Full message body */}
        <section className="border-y border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <Reveal as="p" className="font-display-alt text-xl leading-[1.7] text-[color:var(--fg)]/85 lg:text-2xl">
              At Emarat, we don&apos;t just build structures; we create landmarks that
              define aspirations, enhance lifestyles, and drive progress. Every project
              we undertake is a reflection of our dedication to quality, innovation and
              an unrelenting focus on the people who choose to live and work in the
              spaces we deliver.
            </Reveal>

            <Reveal as="p" delay={0.1} className="mt-8 font-display-alt text-xl leading-[1.7] text-[color:var(--fg)]/85 lg:text-2xl">
              Each development is a reflection of our excellence vision where
              architecture meets functionality and luxury integrates seamlessly with
              sustainability. From the placement of a window to the choice of every
              material, decisions are taken with care, with the long view in mind.
            </Reveal>

            <Reveal as="p" delay={0.2} className="mt-8 font-display-alt text-xl leading-[1.7] text-[color:var(--fg)]/85 lg:text-2xl">
              We welcome you to be a part of Emarat&apos;s journey where vision meets
              reality, and excellence is built to last.
            </Reveal>

            <Reveal delay={0.3} className="mt-12 flex items-center gap-4 border-t border-[color:var(--line)] pt-8">
              <div className="font-display-alt text-2xl text-[color:var(--accent)]">
                Dr. Raahul Goel
              </div>
            </Reveal>
          </div>
        </section>

        {/* Mission + Vision cards (light cream) */}
        <section className="theme-light px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              <Reveal className="group relative overflow-hidden rounded-md border border-[color:var(--line)] p-8 transition-colors hover:border-[color:var(--accent)]/40 lg:p-12">
                <div className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  Our Mission
                </div>
                <h3 className="mt-6 font-display-alt text-3xl leading-tight lg:text-4xl">
                  Transformative real estate that sets new standards.
                </h3>
                <p className="mt-6 text-base leading-relaxed text-[color:var(--muted)]">
                  To develop transformative real estate that establishes new standards
                  of quality and sustainability. We prioritise exceptional spaces that
                  foster growth, elevated lifestyles, and meaningful contributions to
                  urban life through innovation and a customer-centric approach in
                  everything we do.
                </p>
              </Reveal>

              <Reveal delay={0.1} className="group relative overflow-hidden rounded-md border border-[color:var(--line)] p-8 transition-colors hover:border-[color:var(--accent)]/40 lg:p-12">
                <div className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  Our Vision
                </div>
                <h3 className="mt-6 font-display-alt text-3xl leading-tight lg:text-4xl">
                  Leading through excellence, sustainability and design.
                </h3>
                <p className="mt-6 text-base leading-relaxed text-[color:var(--muted)]">
                  To lead the real estate sector through excellence, sustainability and
                  forward-thinking design. We aspire to create landmark developments
                  that reshape skylines while enhancing how people live, work, and
                  experience their built environment.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8">
            <div>
              <SplitReveal
                as="h2"
                className="font-display h-sub"
              >
                Be part of the journey.
              </SplitReveal>
              <Reveal as="p" delay={0.15} className="mt-4 max-w-md text-sm text-[color:var(--muted)]">
                Explore our projects across Gurugram, or speak with our sales team about
                the right residence for your family.
              </Reveal>
            </div>
            <div className="flex flex-wrap gap-4">
              <CircleButton href="/projects" variant="filled">
                View Projects
              </CircleButton>
              <CircleButton href="/contact" variant="outline">
                Get in Touch
              </CircleButton>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
