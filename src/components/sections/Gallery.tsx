"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsap, scheduleScrollRefresh } from "@/lib/gsap";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/motion/Reveal";

const images = [
  {
    src: "/images/E11/E11-14_Living Dining_Interior View_R0_20250313.png",
    label: "E11 · Living & Dining",
  },
  {
    src: "/images/C-2/C2 Living _Interior View_APPROVED_R0_20240122.png",
    label: "C2 · Living Room",
  },
  {
    src: "/images/EA4/EA 4 ENT. LOBBYjpg.jpeg",
    label: "EA 04 · Entry Lobby",
  },
  {
    src: "/images/C-5/C-5-11 DOUBLE HEIGHT.jpg.jpeg",
    label: "C5 · Double Height Living",
  },
  {
    src: "/images/E11/E11-14_Kitchen_Interior View_V1_R2_20250412.png",
    label: "E11 · Kitchen",
  },
  {
    src: "/images/C-2/C2 Master Bedroom _Interior View 01_20250201.png",
    label: "C2 · Master Bedroom",
  },
  {
    src: "/images/EA4/EA 4 LOUNGE.& DININGjpg.jpeg",
    label: "EA 04 · Lounge & Dining",
  },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Pinned horizontal scrub is desktop-only — on touch / small screens it
    // fights native scrolling, so there we fall back to a normal swipe row.
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const { gsap } = ensureGsap();

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
          // Lower than the hero's pin so the hero refreshes first and this
          // section's start accounts for the hero's pin-spacer height.
          refreshPriority: 1,
        },
      });
    }, container);

    // Re-measure once both pinned triggers exist (the hero's is created async,
    // after its video metadata loads) so start/end positions stay in sync.
    scheduleScrollRefresh();

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" className="relative bg-[color:var(--bg-alt)]">
      {/* ---------- Mobile / tablet: heading + native swipe row ---------- */}
      <div className="lg:hidden">
        <div className="px-6 pt-20 pb-8">
          <SplitReveal as="h2" className="font-display h-sub">
            Crafted for
          </SplitReveal>
          <SplitReveal as="h2" delay={0.1} className="font-display h-sub text-[color:var(--muted)]">
            luxury living.
          </SplitReveal>
          <Reveal delay={0.25} className="mt-4 max-w-xs text-xs leading-relaxed text-[color:var(--muted)]">
            Swipe to explore spaces and residences.
          </Reveal>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-20 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <figure
              key={i}
              className="relative aspect-[3/4] w-[78vw] shrink-0 snap-center overflow-hidden rounded-md sm:w-[55vw]"
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="78vw"
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

      {/* ---------- Desktop: pinned horizontal scrub ---------- */}
      <div ref={containerRef} className="hidden lg:block">
        <div className="flex h-screen items-center overflow-hidden">
          {/* Floating heading — stays fixed while images scroll past */}
          <div className="pointer-events-none absolute left-10 top-1/2 z-10 -translate-y-1/2">
            <SplitReveal as="h2" className="font-display h-sub">
              Crafted for
            </SplitReveal>
            <SplitReveal as="h2" delay={0.1} className="font-display h-sub text-[color:var(--muted)]">
              luxury living.
            </SplitReveal>
            <Reveal delay={0.25} className="mt-4 max-w-[200px] text-xs leading-relaxed text-[color:var(--muted)]">
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
            className="flex h-[68vh] shrink-0 items-stretch gap-5 will-change-transform"
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
      </div>
    </section>
  );
}
