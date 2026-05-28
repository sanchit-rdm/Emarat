"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

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
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, duration, start, once]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}
