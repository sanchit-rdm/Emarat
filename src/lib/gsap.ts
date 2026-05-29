"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsap() {
  if (registered) return { gsap, ScrollTrigger };
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;

    // The display font (Italiana) swaps in after first paint and reflows the
    // headings, which shifts every trigger's start/end. The window `load`
    // event fires once images settle. Both move layout after triggers were
    // first measured, so re-measure when each happens.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });
  }
  return { gsap, ScrollTrigger };
}

let raf: number | undefined;

/**
 * Debounced ScrollTrigger.refresh(). Call after creating a trigger so the
 * *final* set of triggers gets measured — this matters because React Strict
 * Mode (dev) mounts effects twice (mount → revert → mount), and a one-shot
 * refresh tied to the first mount would miss the second mount's triggers,
 * leaving above-the-fold reveals stuck in their hidden state until reload.
 * Collapsing to a single rAF means one refresh after the last mount in a tick.
 */
export function scheduleScrollRefresh() {
  if (typeof window === "undefined") return;
  if (raf !== undefined) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    raf = undefined;
    ScrollTrigger.refresh();
  });
}

export { gsap, ScrollTrigger };
