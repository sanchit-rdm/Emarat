"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

type Props = {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  start?: string;
  stagger?: number;
  delay?: number;
};

export default function SplitReveal({
  children,
  as = "h2",
  className,
  start = "top 80%",
  stagger = 0.05,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");
      gsap.set(words, { yPercent: 110 });
      gsap.to(words, {
        yPercent: 0,
        ease: "power4.out",
        duration: 1.0,
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [start, stagger, delay]);

  const Tag = as as React.ElementType;
  const tokens = children.split(/(\s+)/);

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {tokens.map((token, i) =>
        /^\s+$/.test(token) ? (
          <span key={i}> </span>
        ) : (
          <span key={i} className="inline-block overflow-hidden align-baseline">
            <span data-word className="inline-block will-change-transform">
              {token}
            </span>
          </span>
        )
      )}
    </Tag>
  );
}
