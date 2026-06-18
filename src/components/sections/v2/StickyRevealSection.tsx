"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, scheduleScrollRefresh } from "@/lib/gsap";

const SLIDES = [
  {
    text: "A Home Built the Way You Always Imagined",
    className: "font-display text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[1.06] text-white",
  },
  {
    text: "Crafted",
    className: "font-display text-[clamp(1.75rem,3vw,3rem)] leading-[1.1] text-[color:var(--accent)]",
  },
  {
    text: "Luxury finishes, smartly planned layouts, premium materials — every Emarat residence is designed to the finest detail, where quality is not a feature, it is the foundation.",
    className: "mx-auto max-w-2xl text-lg font-medium leading-relaxed text-white/80 sm:text-xl",
  },
  {
    text: "Connected",
    className: "font-display text-[clamp(1.75rem,3vw,3rem)] leading-[1.1] text-[color:var(--accent)]",
  },
  {
    text: "Located in Gurugram's most well-connected neighbourhoods — premier schools, world-class healthcare, premium retail and seamless NCR connectivity, all within reach.",
    className: "mx-auto max-w-2xl text-lg font-medium leading-relaxed text-white/80 sm:text-xl",
  },
  {
    text: "Complete",
    className: "font-display text-[clamp(1.75rem,3vw,3rem)] leading-[1.1] text-[color:var(--accent)]",
  },
  {
    text: "Luxury inside. Convenience outside. Everything your family needs — nothing missing, nothing compromised.",
    className: "mx-auto max-w-2xl text-lg font-medium leading-relaxed text-white/80 sm:text-xl",
  },
];

export default function StickyRevealSection() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const slides = slideRefs.current.filter(Boolean) as HTMLElement[];

    // All slides start invisible, 50px below their resting position
    gsap.set(slides, { y: 50, autoAlpha: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          // Each slide gets 200vh — the bulk of it is the fade transition itself
          end: () => `+=${slides.length * 200}vh`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      slides.forEach((el, i) => {
        const isLast = i === slides.length - 1;

        // FADE IN UP — takes up the majority of scroll distance
        tl.to(el, { y: 0, autoAlpha: 1, duration: 4, ease: "none" }, i === 0 ? 0 : ">");

        // Hold — short pause at full opacity
        tl.to(el, { duration: 0.8 });

        // FADE OUT UP — same length as fade in
        if (!isLast) {
          tl.to(el, { y: -50, autoAlpha: 0, duration: 4, ease: "none" });
        }
      });
    }, wrap);

    scheduleScrollRefresh();
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/C-2/building.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-black/65" />

      {/* Slide stage — fills the full pinned screen */}
      <div className="absolute inset-0 z-10">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-10"
          >
            <div className={slide.className}>{slide.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
