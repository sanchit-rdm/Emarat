"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

type Direction = "lag" | "lead";

type Props = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  /**
   * "lag"  — traditional parallax. Image drifts slower than the page scroll
   *          (looks like depth — the image hangs back).
   * "lead" — image translates UP faster than the page, so it appears to
   *          "run upward" as you scroll down. Useful for image grids that
   *          need a sense of forward momentum.
   */
  direction?: Direction;
};

export default function Parallax({
  children,
  className,
  speed = 0.2,
  direction = "lag",
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const yStart = direction === "lead" ? speed * 50 : -speed * 50;
    const yEnd = direction === "lead" ? -speed * 50 : speed * 50;

    let ctx: { revert(): void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await ensureGsap();
      if (cancelled) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          inner,
          { yPercent: yStart },
          {
            yPercent: yEnd,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }, wrap);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [speed, direction]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={innerRef} className="h-[120%] -mt-[10%] will-change-transform">
        {children}
      </div>
    </div>
  );
}
