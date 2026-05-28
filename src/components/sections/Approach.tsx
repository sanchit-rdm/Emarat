"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsap } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

const principles = [
  {
    no: "I.",
    title: "Site before form",
    body: "Every project begins on foot. We don't draw until we've walked the land at three times of day and learned what the wind does in August.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format&fit=crop",
    alt: "Property at first light",
  },
  {
    no: "II.",
    title: "Slow materials",
    body: "Stone, lime, timber, brass. We design around materials that age legibly, so the building gets older with grace rather than urgency.",
    img: "https://images.unsplash.com/photo-1600566753086-00f18fe6ba68?w=800&q=80&auto=format&fit=crop",
    alt: "Interior — natural materials",
  },
  {
    no: "III.",
    title: "Climate as authorship",
    body: "Shade, mass, courtyard, breeze. Passive logic carries 70% of the comfort load before mechanical systems are even drawn.",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&auto=format&fit=crop",
    alt: "Shaded terrace at a residence",
  },
  {
    no: "IV.",
    title: "One desk, one drawing",
    body: "Every detail crosses the principal's table. Construction documents are not delegated to software — they are signed.",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format&fit=crop",
    alt: "Residential interior detail",
  },
];

export default function Approach() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>("[data-principle]");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.25, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              end: "bottom 30%",
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
      id="approach"
      ref={sectionRef}
      className="bg-[color:var(--bg-alt)] px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal as="div" className="mb-4 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
              <span>(03) Approach</span>
            </Reveal>
            <SplitReveal
              as="h2"
              className="font-display text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.05] tracking-tight"
            >
              Four principles
            </SplitReveal>
            <SplitReveal
              as="h2"
              delay={0.1}
              className="font-display text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.05] tracking-tight text-[color:var(--muted)]"
            >
              we don&apos;t compromise.
            </SplitReveal>
          </div>
        </div>

        <ol className="col-span-12 flex flex-col lg:col-span-8">
          {principles.map((p) => (
            <li
              key={p.no}
              data-principle
              className="grid grid-cols-12 gap-6 border-t border-[color:var(--line)] py-12 last:border-b lg:py-16"
            >
              <span className="col-span-12 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] lg:col-span-1">
                {p.no}
              </span>
              <div className="col-span-12 lg:col-span-7">
                <h3 className="font-display text-2xl tracking-tight lg:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-xl text-[color:var(--muted)]">{p.body}</p>
              </div>
              <div className="col-span-12 lg:col-span-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[color:var(--bg)]">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 100vw"
                    className="object-cover"
                    style={{ filter: "sepia(0.18) saturate(0.9) brightness(0.9)" }}
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
