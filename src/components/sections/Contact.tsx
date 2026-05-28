import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-32 lg:px-10 lg:py-48"
    >
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=2400&q=80&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-35"
          style={{ filter: "sepia(0.22) saturate(0.85) brightness(0.55) contrast(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--bg-alt)]/55 via-[color:var(--bg-alt)]/70 to-[color:var(--bg-alt)]" />
      </div>
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full bg-[color:var(--accent)]/15 blur-[180px]" />

      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8">
        <Reveal as="div" className="col-span-12 mb-4 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)] lg:col-span-2 lg:mb-0">
          <span>(06) Get in touch</span>
        </Reveal>

        <div className="col-span-12 lg:col-span-10">
          <SplitReveal
            as="h2"
            className="font-display text-[clamp(2.4rem,8vw,8rem)] leading-[0.96] tracking-[-0.025em]"
          >
            Have a site
          </SplitReveal>
          <SplitReveal
            as="h2"
            delay={0.1}
            className="font-display text-[clamp(2.4rem,8vw,8rem)] leading-[0.96] tracking-[-0.025em] text-[color:var(--muted)]"
          >
            you want considered?
          </SplitReveal>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            <Reveal as="div" delay={0.1} className="space-y-3">
              <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                New projects
              </div>
              <a
                href="mailto:hello@emarat.studio"
                className="block font-display text-2xl tracking-tight transition-colors hover:text-[color:var(--accent)]"
              >
                hello@emarat.studio
              </a>
              <p className="text-sm text-[color:var(--muted)]">
                We respond within three working days.
              </p>
            </Reveal>

            <Reveal as="div" delay={0.15} className="space-y-3">
              <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Press & journal
              </div>
              <a
                href="mailto:press@emarat.studio"
                className="block font-display text-2xl tracking-tight transition-colors hover:text-[color:var(--accent)]"
              >
                press@emarat.studio
              </a>
              <p className="text-sm text-[color:var(--muted)]">
                For publications, lectures and exhibitions.
              </p>
            </Reveal>

            <Reveal as="div" delay={0.2} className="space-y-3">
              <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Studios
              </div>
              <p className="font-display text-lg leading-relaxed">
                Dubai · Al Quoz<br />
                Lisbon · Marvila<br />
                Tbilisi · Sololaki
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
