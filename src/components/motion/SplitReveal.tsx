"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, scheduleScrollRefresh } from "@/lib/gsap";

type Props = {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  start?: string;
  stagger?: number;
  delay?: number;
} & React.HTMLAttributes<HTMLElement>;

export default function SplitReveal({
  children,
  as = "h2",
  className,
  start = "top 80%",
  stagger = 0.05,
  delay = 0,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");
      gsap.set(words, { yPercent: 110 });
      const to = { yPercent: 0, ease: "power4.out", duration: 1.0, stagger, delay };
      // In-view headings play immediately; see Reveal for why this avoids the
      // cold-load font/measure race that left them stuck hidden until reload.
      const inView = el.getBoundingClientRect().top < window.innerHeight * 0.95;
      gsap.to(
        words,
        inView
          ? to
          : {
              ...to,
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: "play none none none",
              },
            }
      );
    }, el);

    scheduleScrollRefresh();

    return () => ctx.revert();
  }, [start, stagger, delay]);

  const Tag = as as React.ElementType;
  const tokens = children.split(/(\s+)/);

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className} {...rest}>
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
