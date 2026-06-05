"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsap, scheduleScrollRefresh } from "@/lib/gsap";
import Reveal from "@/components/motion/Reveal";
import CircleButton from "@/components/CircleButton";

type SanityPlace = { _key?: string; image?: string | null };
interface LocationData {
  eyebrow?: string;
  places?: SanityPlace[];
}
interface Props { data?: LocationData }

/**
 * Design Option 2 — connectivity teaser.
 *
 * A full-height dark statement that introduces the connectivity section. The
 * background colour stays constant, but as the section scrolls a faint image
 * and a large cursive watermark fade up into view (low opacity) behind the
 * headline — the "slightly visible image appears on scroll" beat from the
 * reference design. Flows straight into the full-screen connectivity section.
 */
export default function IconicIntroV2({ data }: Props) {
  const bgImage = data?.places?.[0]?.image || "/images/dwarka-expressway.jpg";
  const eyebrow = data?.eyebrow?.trim() || "Location & Connectivity";

  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    const word = wordRef.current;
    if (!section || !img || !word) return;

    const { gsap } = ensureGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(img, { autoAlpha: 0.28 });
        gsap.set(word, { autoAlpha: 0.1 });
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

      // Oversized cursive watermark rises faintly into view.
      gsap.fromTo(
        word,
        { autoAlpha: 0, yPercent: 30 },
        {
          autoAlpha: 0.12,
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top center", end: "bottom top", scrub: true },
        }
      );
    }, section);

    scheduleScrollRefresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[color:var(--bg)] px-6 py-32"
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

      {/* Oversized cursive watermark, faint, anchored to the bottom */}
      <div
        ref={wordRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center overflow-hidden"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        <span className="font-script select-none text-[28vw] leading-[0.8] text-[color:var(--fg)]" style={{ marginBottom: "-0.12em" }}>
          Iconic
        </span>
      </div>

      {/* Headline + CTA */}
      <Reveal className="relative z-10 text-center">
        <div className="mb-6 font-script text-2xl tracking-[5px] text-[color:var(--accent)]">
          {eyebrow}
        </div>
        <h2 className="font-display mx-auto max-w-4xl text-[clamp(2.25rem,6.5vw,5.5rem)] uppercase leading-[1.08] tracking-[1px]">
          <span className="block">Life within reach</span>
          <span className="block">
            of every <span className="text-[color:var(--accent)]">iconic</span>
          </span>
          <span className="block">Gurugram landmark</span>
        </h2>
        <div className="mt-12 flex justify-center">
          <CircleButton href="/location" variant="outline">
            Go to Location
          </CircleButton>
        </div>
      </Reveal>
    </section>
  );
}
