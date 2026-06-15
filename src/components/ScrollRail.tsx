"use client";

import { useEffect, useRef } from "react";

export default function ScrollRail() {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.min(scrolled / maxScroll, 1);
      const thumbPx = thumb.offsetHeight;
      const trackPx = window.innerHeight;
      const maxTravel = trackPx - thumbPx;
      thumb.style.transform = `translateY(${progress * maxTravel}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="brand-rail" aria-hidden>
      <div
        ref={thumbRef}
        className="absolute left-0 top-0 w-full will-change-transform"
        style={{
          height: "25vh",
          background: "linear-gradient(180deg, var(--brand-green) 0%, var(--accent) 25%, var(--accent-2) 50%, var(--accent) 75%, var(--brand-green) 100%)",
        }}
      />
    </div>
  );
}
