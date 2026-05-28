"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsap } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

const values = [
  {
    no: "I.",
    title: "Ethics",
    body: "Every transaction is built on complete transparency. We believe that trust is the foundation of every lasting relationship — between developer, buyer, and community.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop",
    alt: "Handshake — trust and integrity",
  },
  {
    no: "II.",
    title: "Excellence",
    body: "We never compromise on quality. From architectural design to finishing materials, every detail is selected for enduring elegance and superior craftsmanship.",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&auto=format&fit=crop",
    alt: "Luxury residence interior detail",
  },
  {
    no: "III.",
    title: "Efficiency",
    body: "From design to delivery, we optimise every stage of development. On-time handovers, streamlined processes and client-centric service — no compromises.",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80&auto=format&fit=crop",
    alt: "Construction and development",
  },
  {
    no: "IV.",
    title: "Innovation",
    body: "We integrate modern technology and sustainable development practices into every project — building homes that are as forward-thinking as the families who live in them.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop",
    alt: "Modern residential architecture",
  },
];

export default function Approach() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>("[data-value]");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
              end: "bottom 28%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
      return () => ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="values"
      ref={sectionRef}
      className="bg-[color:var(--bg-alt)] px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal as="div" className="mb-4 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
              <span>(05) Our Values</span>
            </Reveal>
            <SplitReveal
              as="h2"
              className="font-display text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.05] tracking-tight"
            >
              Building with Ethics,
            </SplitReveal>
            <SplitReveal
              as="h2"
              delay={0.1}
              className="font-display text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.05] tracking-tight text-[color:var(--muted)]"
            >
              Excellence & Efficiency.
            </SplitReveal>
          </div>
        </div>

        <ol className="col-span-12 flex flex-col lg:col-span-8">
          {values.map((v) => (
            <li
              key={v.no}
              data-value
              className="grid grid-cols-12 gap-6 border-t border-[color:var(--line)] py-12 last:border-b lg:py-16"
            >
              <span className="col-span-12 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent)] lg:col-span-1">
                {v.no}
              </span>
              <div className="col-span-12 lg:col-span-7">
                <h3 className="font-display text-2xl tracking-tight lg:text-3xl">{v.title}</h3>
                <p className="mt-4 max-w-xl text-[color:var(--muted)]">{v.body}</p>
              </div>
              <div className="col-span-12 lg:col-span-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[color:var(--bg)]">
                  <Image
                    src={v.img}
                    alt={v.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 100vw"
                    className="object-cover"
                    style={{ filter: "sepia(0.15) saturate(0.9) brightness(0.88)" }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
