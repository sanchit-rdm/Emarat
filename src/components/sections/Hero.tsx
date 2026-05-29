import Image from "next/image";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/motion/Reveal";
import CircleButton from "@/components/CircleButton";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-12 pt-32 lg:px-10 lg:pb-16 lg:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=2400&q=80&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "sepia(0.15) saturate(0.85) brightness(0.62) contrast(1.05)" }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[color:var(--bg)]/50" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--line)] to-transparent" />
        <div className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-[color:var(--accent)]/8 blur-[160px]" />
        <div className="absolute -right-40 bottom-0 h-[560px] w-[560px] rounded-full bg-[color:var(--accent)]/6 blur-[200px]" />
      </div>

      <Reveal as="div" y={20} className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--brand-green)]" />
        <span>Luxury Real Estate Gurugram, Haryana · Est. 2014</span>
        <span className="brand-pill ml-auto">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          RERA Approved · An Argo Group Company
        </span>
      </Reveal>

      <div className="mt-24 max-w-6xl">
        <SplitReveal
          as="h1"
          className="font-display h-page"
        >
          Homes that define
        </SplitReveal>
        <SplitReveal
          as="h1"
          delay={0.1}
          className="font-display h-page text-[color:var(--muted)]"
        >
          how you live.
        </SplitReveal>

        <Reveal
          as="p"
          delay={0.4}
          className="mt-10 max-w-xl text-base leading-relaxed text-[color:var(--muted)] lg:text-lg"
        >
          Emarat Realty is a distinguished leader in luxury real estate,
          specialising in exquisite residences and high-end commercial spaces
          built on quality, elegance and innovation.
        </Reveal>

        <Reveal as="div" delay={0.55} className="mt-10 flex flex-wrap items-center gap-4">
          <CircleButton href="/projects" variant="filled">
            Explore Projects
          </CircleButton>
          <CircleButton href="/contact" variant="outline">
            Get in Touch
          </CircleButton>
        </Reveal>
      </div>

      <Reveal
        as="div"
        delay={0.7}
        className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-[color:var(--line)] pt-8 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]"
      >
        <span>Scroll to explore</span>
        <span className="hidden md:inline">DLF Garden City · Sector 93 · Gurugram</span>
        <span>2026 Selected Residences</span>
      </Reveal>
    </section>
  );
}
