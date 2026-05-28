"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
};

export default function Parallax({ children, className, speed = 0.2 }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const { gsap } = ensureGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
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

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={innerRef} className="h-[120%] -mt-[10%] will-change-transform">
        {children}
      </div>
    </div>
  );
}
