"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, scheduleScrollRefresh } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
  once?: boolean;
};

export default function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 40,
  duration = 1.0,
  start = "top 85%",
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      const to = { y: 0, opacity: 1, duration, delay, ease: "power3.out" };
      // Elements already in the viewport at mount play immediately instead of
      // waiting on a scroll trigger. ScrollTrigger positions are measured
      // before the display font swaps in, and on a cold load that mismeasure
      // could leave above-the-fold reveals stuck in their hidden state until a
      // manual reload. The in-view check sidesteps that race entirely.
      const inView = el.getBoundingClientRect().top < window.innerHeight * 0.95;
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        inView
          ? to
          : {
              ...to,
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: once
                  ? "play none none none"
                  : "play reverse play reverse",
              },
            }
      );
    }, el);

    scheduleScrollRefresh();

    return () => ctx.revert();
  }, [delay, y, duration, start, once]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}
