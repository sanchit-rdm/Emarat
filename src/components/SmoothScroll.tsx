"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ensureGsap } from "@/lib/gsap";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // The Sanity Studio (/studio) manages its own scrolling — Lenis would hijack
  // the mouse wheel there and make the editor only scrollable via the scrollbar.
  const isStudio = pathname?.startsWith("/studio");

  useEffect(() => {
    if (isStudio) return;

    let teardown: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const { gsap, ScrollTrigger } = await ensureGsap();
      if (cancelled) return;

      ScrollTrigger.config({ ignoreMobileResize: true });

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Touch devices scroll natively: Lenis adds per-frame work and fights
      // iOS momentum scrolling, which reads as jank on real phones.
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      if (reduced || coarse) return;

      const lenis = new Lenis({
        duration: 0.5,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const tickerFn = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      teardown = () => {
        gsap.ticker.remove(tickerFn);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, [isStudio]);

  return <>{children}</>;
}
