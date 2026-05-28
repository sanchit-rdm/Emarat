import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import Parallax from "@/components/motion/Parallax";

export default function About() {
  return (
    <section
      id="about"
      className="px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8">
        <Reveal as="div" className="col-span-12 mb-6 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)] lg:col-span-2 lg:mb-0">
          <span>(02) The studio</span>
        </Reveal>

        <div className="col-span-12 lg:col-span-7">
          <SplitReveal
            as="h2"
            className="font-display text-[clamp(1.8rem,4.5vw,4rem)] leading-[1.05] tracking-tight"
          >
            We are twenty-eight architects,
          </SplitReveal>
          <SplitReveal
            as="h2"
            delay={0.1}
            className="font-display text-[clamp(1.8rem,4.5vw,4rem)] leading-[1.05] tracking-tight text-[color:var(--muted)]"
          >
            engineers and craftspeople working in three studios across Dubai, Lisbon and Tbilisi.
          </SplitReveal>

          <Reveal
            as="p"
            delay={0.2}
            className="mt-10 max-w-xl text-base leading-relaxed text-[color:var(--muted)] lg:text-lg"
          >
            Founded in 2009, the practice has grown slowly on purpose. We
            choose the projects we take on, work closely with the people we
            build for, and stay involved long after handover. Every drawing
            crosses one desk before it leaves the office.
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-8 lg:grid-cols-3">
            {[
              ["Master planning", "Mira, Halqa, Bayt Al Noor"],
              ["Residential", "Single-home to 200-unit"],
              ["Adaptive reuse", "Historic & industrial fabric"],
              ["Interiors", "Hospitality, residential"],
              ["Landscape", "In-house, every site"],
              ["Development", "Own-account & joint"],
            ].map(([title, sub], i) => (
              <Reveal
                key={title}
                delay={0.05 * i}
                className="border-t border-[color:var(--line)] pt-4"
              >
                <div className="text-sm">{title}</div>
                <div className="text-xs text-[color:var(--muted)]">{sub}</div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <Parallax speed={0.25} className="relative aspect-[3/4] overflow-hidden rounded-md">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop"
              alt="Residential project — exterior"
              fill
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="object-cover"
              style={{ filter: "sepia(0.18) saturate(0.9) brightness(0.92)" }}
            />
          </Parallax>
          <Reveal
            as="p"
            delay={0.2}
            className="mt-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]"
          >
            Mira Residences, Dubai — 2024
          </Reveal>
        </div>
      </div>
    </section>
  );
}
