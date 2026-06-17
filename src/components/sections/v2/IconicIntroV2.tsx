"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsap, scheduleScrollRefresh } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";

type SanityPlace = { _key?: string; image?: string | null };
interface LocationData {
  eyebrow?: string;
  places?: SanityPlace[];
}
interface IconicLabels {
  line1?: string;
  line2?: string;
  watermark?: string;
  ctaLabel?: string;
  ctaHref?: string;
}
interface Props { data?: LocationData; labels?: IconicLabels }

/**
 * Design Option 2 — connectivity teaser.
 *
 * A full-height dark statement that introduces the connectivity section. The
 * background colour stays constant, but as the section scrolls a faint image
 * and a large cursive watermark fade up into view (low opacity) behind the
 * headline — the "slightly visible image appears on scroll" beat from the
 * reference design. Flows straight into the full-screen connectivity section.
 */
export default function IconicIntroV2({ data, labels }: Props) {
  const bgImage = data?.places?.[0]?.image || "/images/C-5/c5-right-side-2026-03-06-at-2-44-11-pm-1.jpg";
  const eyebrow = data?.eyebrow?.trim() || "Location & Connectivity";
  const line1 = labels?.line1?.trim() || "Life within reach";
  const line2 = labels?.line2?.trim() || "of every iconic landmark";

  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const { gsap } = ensureGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(img, { autoAlpha: 0.28 });
        return;
      }

      // Faint image emerges and drifts as the section travels up the viewport.
      gsap.fromTo(
        img,
        { autoAlpha: 0, scale: 1.18, yPercent: -6 },
        {
          autoAlpha: 0.3,
          scale: 1,
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
        }
      );

    }, section);

    scheduleScrollRefresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[color:var(--bg)] px-4 py-20 sm:px-6 sm:py-28 lg:py-32"
    >
      {/* Faint image that appears on scroll */}
      <div
        ref={imgRef}
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        <Image
          src={bgImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ filter: "brightness(0.55) saturate(0.85)" }}
        />
        <div className="absolute inset-0 bg-[color:var(--bg)]/40" />
      </div>

      {/* Headline + CTA */}
      <Reveal className="relative z-10 text-center">
        <div className="mb-6 font-script text-2xl tracking-[5px] text-[color:var(--accent)]">
          {eyebrow}
        </div>
        <h2 className="font-display mx-auto max-w-4xl text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[1.08] tracking-[1px]">
          <span className="block">{line1}</span>
          <span className="block text-[color:var(--accent)]">{line2}</span>
        </h2>
      </Reveal>
    </section>
  );
}
