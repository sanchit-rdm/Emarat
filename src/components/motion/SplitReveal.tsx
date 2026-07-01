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

    let ctx: { revert(): void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await ensureGsap();
      if (cancelled) return;

      ctx = gsap.context(() => {
        const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");
        gsap.set(words, { yPercent: 110 });
        const to = { yPercent: 0, ease: "power4.out", duration: 1.0, stagger, delay };
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
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [start, stagger, delay]);

  const Tag = as as React.ElementType;
  const ZW_CHARS = /[\u200B\u200C\u200D\uFEFF]/g;
  const normalized = children.replace(ZW_CHARS, "").replace(/\s+/g, " ").trim();
  const tokens = normalized.split(/(\s+)/);

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
