"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, scheduleScrollRefresh } from "@/lib/gsap";

type From = "bottom" | "top" | "left" | "right";

type Props = {
  /** The image(s). Use a `fill` <Image>; it fills the parallax layer. */
  children: React.ReactNode;
  /**
   * Content rendered above the image and NOT parallaxed — badges, captions,
   * gradients, slider controls. Sits inside the clip window so it reveals with
   * the image, but stays put while the image drifts.
   */
  overlay?: React.ReactNode;
  /** Sizing/shape utilities. Must include a position + a height (aspect ratio). */
  className?: string;
  /** Parallax drift amplitude in yPercent (image moves ±this). 0 disables it. */
  parallax?: number;
  /** Edge the clip-reveal opens from. */
  from?: From;
};

/* clip-path closed states keyed by reveal direction. inset(top right bottom left). */
const CLOSED: Record<From, string> = {
  bottom: "inset(0% 0% 100% 0%)", // opens downward
  top: "inset(100% 0% 0% 0%)",    // opens upward
  left: "inset(0% 100% 0% 0%)",   // opens rightward
  right: "inset(0% 0% 0% 100%)",  // opens leftward
};
const OPEN = "inset(0% 0% 0% 0%)";

/**
 * Scroll-driven image reveal used across Design Option 2 — the signature motion
 * of the reference design. As the frame enters the viewport a clip-path "wipes"
 * the image open; throughout the scroll the image drifts with a slow parallax.
 * Both honour reduced-motion (the image simply sits open and still). Built on
 * the project's GSAP/ScrollTrigger + Lenis stack.
 */
export default function RevealImage({
  children,
  overlay,
  className,
  parallax = 7,
  from = "bottom",
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const { gsap } = ensureGsap();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(wrap, { clipPath: OPEN });
        return;
      }

      // Clip-path reveal. Elements already in view at mount play immediately —
      // same cold-load guard as Reveal/SplitReveal — so a missed trigger can
      // never leave an image stuck clipped (invisible).
      const inView = wrap.getBoundingClientRect().top < window.innerHeight * 0.9;
      const to = { clipPath: OPEN, duration: 1.2, ease: "power3.out" };
      gsap.fromTo(
        wrap,
        { clipPath: CLOSED[from] },
        inView
          ? to
          : {
              ...to,
              scrollTrigger: { trigger: wrap, start: "top 88%", toggleActions: "play none none none" },
            }
      );

      // Parallax drift — image trails the page scroll (scrubbed).
      if (parallax > 0) {
        gsap.fromTo(
          inner,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: "none",
            scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
    }, wrap);

    scheduleScrollRefresh();
    return () => ctx.revert();
  }, [parallax, from]);

  // Overscan the parallax layer so its drift never exposes an empty edge.
  const innerCls = parallax > 0 ? "absolute -inset-[14%]" : "absolute inset-0";

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={innerRef} className={`${innerCls} will-change-transform`}>
        {children}
      </div>
      {overlay}
    </div>
  );
}
