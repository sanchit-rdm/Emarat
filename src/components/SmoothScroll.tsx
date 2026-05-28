"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsap } from "@/lib/gsap";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Register ScrollTrigger before anything — even if reduced motion is on
    const { gsap, ScrollTrigger } = ensureGsap();

    // Prevent mobile viewport-resize from retriggering all scroll positions
    ScrollTrigger.config({ ignoreMobileResize: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    // Pass the direct reference so Lenis notifies ScrollTrigger on every scroll tick
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP ticker drives Lenis — the officially recommended integration.
    // gsap.ticker time is in seconds; lenis.raf expects milliseconds.
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);

    // Prevent GSAP from throttling the ticker on slow CPUs / background tabs
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
