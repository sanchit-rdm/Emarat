import Image from "next/image";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-12 pt-32 lg:px-10 lg:pb-16 lg:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2400&q=80&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "sepia(0.18) saturate(0.9) brightness(0.72) contrast(1.02)" }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--bg)]/25 via-[color:var(--bg)]/45 to-[color:var(--bg)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--line)] to-transparent" />
        <div className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[color:var(--accent)]/10 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-[color:var(--accent-2)]/10 blur-[180px]" />
      </div>

      <Reveal as="div" y={20} className="flex items-center gap-4 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
        <span>Architecture & Property Development — Est. 2009</span>
      </Reveal>

      <div className="mt-24 max-w-6xl">
        <SplitReveal
          as="h1"
          className="font-display text-[clamp(2.6rem,9vw,9.5rem)] leading-[0.95] tracking-[-0.025em]"
        >
          Buildings that
        </SplitReveal>
        <SplitReveal
          as="h1"
          delay={0.1}
          className="font-display text-[clamp(2.6rem,9vw,9.5rem)] leading-[0.95] tracking-[-0.025em] text-[color:var(--muted)]"
        >
          outlive their decade.
        </SplitReveal>

        <Reveal
          as="p"
          delay={0.4}
          className="mt-10 max-w-xl text-base leading-relaxed text-[color:var(--muted)] lg:text-lg"
        >
          We design, develop and deliver residential and mixed-use projects
          where craft, climate and context matter more than fashion. A small
          studio. Long horizons. One building at a time.
        </Reveal>
      </div>

      <Reveal
        as="div"
        delay={0.6}
        className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-[color:var(--line)] pt-8 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]"
      >
        <span>Scroll</span>
        <span className="hidden md:inline">A studio practice across MENA & Europe</span>
        <span>2026 — Selected works</span>
      </Reveal>
    </section>
  );
}
