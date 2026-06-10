"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsap, scheduleScrollRefresh } from "@/lib/gsap";

const DEFAULT_IMAGES: string[] = [
  "/images/alameda-entrance.webp",
  "/images/alameda-lounge.webp",
  "/images/alameda-bedroom-1.webp",
  "/images/alameda-kitchen.webp",
  "/images/alameda-bedroom-2.webp",
  "/images/alameda-dining.webp",
];

interface ApproachData {
  heading1?: string;
  heading2?: string;
  values?: Array<{ _key?: string; img?: string }>;
}
interface PrinciplesLabels { heading3?: string; heading1?: string; heading2?: string }
interface Props { data?: ApproachData; labels?: PrinciplesLabels }

/**
 * Design Option 2 — "Our Principles" band.
 *
 * The same right-to-left drifting image band as the Elegant Design section, but
 * on a cream surface and pared back: the section heading centred in white over
 * the imagery — no button, no captions, no listed values. A calm, gallery pause
 * before the news grid.
 */
export default function PrinciplesV2({ data, labels }: Props) {
  const heading3 = labels?.heading3?.trim() || "Interior";
  const heading1 = labels?.heading1?.trim() || data?.heading1 || "Building with Ethics,";
  const heading2 = labels?.heading2?.trim() || data?.heading2 || "Excellence & Efficiency.";
  const images: string[] = data?.values?.length
    ? data.values.map((v) => v.img).filter((s): s is string => !!s)
    : DEFAULT_IMAGES;
  const list = images.length ? images : DEFAULT_IMAGES;

  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = ensureGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        track,
        { xPercent: 8 },
        {
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, section);

    scheduleScrollRefresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="principles"
      className="theme-light relative overflow-hidden py-16 lg:py-24"
    >
      <div className="relative h-[58vh] min-h-[380px] overflow-hidden lg:h-[80vh]">
        {/* Drifting image track — wider than the viewport, centred at rest. */}
        <div className="flex h-full items-center justify-center">
          <div
            ref={trackRef}
            className="flex h-full items-center gap-3 will-change-transform lg:gap-5"
          >
            {list.map((src, i) => (
              <figure
                key={i}
                className="relative h-full w-[74vw] shrink-0 overflow-hidden sm:w-[48vw] lg:w-[34vw]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 48vw, 74vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </div>

        {/* Fixed centre overlay — section heading, white, no button. */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <div className="text-sm uppercase tracking-[0.4em] text-white/70 md:text-base">
            {heading3}
          </div>
          <h2 className="font-script max-w-5xl text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.02] text-white drop-shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
            <span className="block">{heading1}</span>
            <span className="block">{heading2}</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
