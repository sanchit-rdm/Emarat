"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsap } from "@/lib/gsap";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/motion/Reveal";

const images = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=80&auto=format&fit=crop",
    label: "DLF Garden City Street Elevation",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1800&q=80&auto=format&fit=crop",
    label: "C5 Residences Grand Living Hall",
  },
  {
    src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=80&auto=format&fit=crop",
    label: "Garden City Landscaped Courtyard",
  },
  {
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1800&q=80&auto=format&fit=crop",
    label: "E11 Master Bedroom Suite",
  },
  {
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1800&q=80&auto=format&fit=crop",
    label: "Almeda Reception Lobby",
  },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      const getAmount = () => -(track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: getAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${Math.abs(getAmount())}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={containerRef} className="relative bg-[color:var(--bg-alt)]">
      <div className="flex h-screen items-center overflow-hidden">
        {/* Floating heading — stays fixed while images scroll past */}
        <div className="pointer-events-none absolute left-6 top-1/2 z-10 -translate-y-1/2 lg:left-10">
          <SplitReveal
            as="h2"
            className="font-display h-sub"
          >
            Crafted for
          </SplitReveal>
          <SplitReveal
            as="h2"
            delay={0.1}
            className="font-display h-sub text-[color:var(--muted)]"
          >
            luxury living.
          </SplitReveal>
          <Reveal
            delay={0.25}
            className="mt-4 max-w-[200px] text-xs leading-relaxed text-[color:var(--muted)]"
          >
            Scroll to explore spaces and residences.
          </Reveal>
          <Reveal delay={0.35} className="mt-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--accent)]">
              01 {String(images.length).padStart(2, "0")}
            </span>
          </Reveal>
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={trackRef}
          className="flex h-[68vh] shrink-0 items-stretch gap-4 will-change-transform lg:gap-5"
          style={{ paddingLeft: "clamp(3.5rem, 28vw, 38vw)", paddingRight: "5vw" }}
        >
          {images.map((img, i) => (
            <figure
              key={i}
              className="relative shrink-0 overflow-hidden rounded-md"
              style={{ width: "clamp(280px, 38vw, 560px)" }}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="40vw"
                className="object-cover"
                style={{ filter: "sepia(0.12) saturate(0.92) brightness(0.85)" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--bg)]/70 via-[color:var(--bg)]/5 to-transparent" />
              <figcaption className="absolute bottom-5 left-5 flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-[color:var(--fg)]/70">
                  {img.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
