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
        <div className="col-span-12 lg:col-span-7">
          <SplitReveal
            as="h2"
            className="font-display h-section"
          >
            A distinguished leader
          </SplitReveal>
          <SplitReveal
            as="h2"
            delay={0.1}
            className="font-display h-section text-[color:var(--muted)]"
          >
            in luxury real estate.
          </SplitReveal>

          <Reveal
            as="p"
            delay={0.2}
            className="mt-10 max-w-xl text-base leading-relaxed text-[color:var(--muted)] lg:text-lg"
          >
            Emarat Realty specialises in exquisite residences and high-end
            commercial spaces across Gurugram. With over a decade of experience,
            we deliver homes built on quality, elegance and innovation — where
            every detail reflects our unwavering commitment to excellence.
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-8 lg:grid-cols-3">
            {[
              ["Luxury Residential", "3 & 4 BHK apartments"],
              ["Commercial Spaces", "High-end retail & offices"],
              ["Residential Plots", "Sector 93, Gurugram"],
              ["Independent Floors", "Phase 3, DLF"],
              ["Penthouses", "Top-floor living"],
              ["Development", "End-to-end delivery"],
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
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80&auto=format&fit=crop"
              alt="Emarat Realty — Luxury Residence Interior"
              fill
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="object-cover"
              style={{ filter: "sepia(0.12) saturate(0.9) brightness(0.9)" }}
            />
          </Parallax>
          <Reveal
            as="p"
            delay={0.2}
            className="mt-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]"
          >
            C5 Residences — DLF Garden City, 2023
          </Reveal>
        </div>
      </div>
    </section>
  );
}
