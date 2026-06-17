"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsap, scheduleScrollRefresh } from "@/lib/gsap";

const DEFAULT_IMAGES: string[] = [
  "/images/design-customized-1.jpg",
  "/images/design-customized-2.jpg",
  "/images/design-customized-3.jpg",
  "/images/design-customized-4.jpg",
];

interface PortableTextSpan {
  _type?: string;
  text?: string;
  marks?: string[];
}
interface PortableTextBlock {
  _type?: string;
  style?: string;
  children?: PortableTextSpan[];
  markDefs?: Array<{ _key?: string; _type?: string; href?: string }>;
}
interface ApproachData {
  heading1?: string | PortableTextBlock[];
  heading2?: string | PortableTextBlock[];
  heading3?: string | PortableTextBlock[];
  values?: Array<{ _key?: string; img?: string }>;
}
interface PrinciplesLabels {
  heading1?: string | PortableTextBlock[];
  heading2?: string | PortableTextBlock[];
  heading3?: string | PortableTextBlock[];
}
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
  const heading1 = labels?.heading1 ?? data?.heading1 ?? "Building with Ethics,";
  const heading2 = labels?.heading2 ?? data?.heading2 ?? "INTERIOR";
  const heading3 = labels?.heading3 ?? data?.heading3 ?? "";
  const images: string[] = data?.values?.length
    ? data.values.map((v) => v.img).filter((s): s is string => !!s)
    : DEFAULT_IMAGES;
  const list = images.length ? images : DEFAULT_IMAGES;

  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const renderInline = (value: string | PortableTextBlock[] | undefined) => {
    if (!value) return null;
    if (typeof value === "string") return value;

    return value.flatMap((block, blockIndex) => {
      if (!block || block._type !== "block" || !Array.isArray(block.children)) {
        return null;
      }

      const children = block.children.map((child, childIndex) => {
        const text = child.text || "";
        const marks = child.marks || [];
        const hrefMark = marks.find((mark) => mark !== "strong" && mark !== "em" && mark !== "code");

        let node: React.ReactNode = text;
        if (marks.includes("code")) node = <code key={`code-${blockIndex}-${childIndex}`}>{node}</code>;
        if (marks.includes("em")) node = <em key={`em-${blockIndex}-${childIndex}`}>{node}</em>;
        if (marks.includes("strong")) node = <strong key={`strong-${blockIndex}-${childIndex}`}>{node}</strong>;

        if (hrefMark && Array.isArray(block.markDefs)) {
          const linkDef = block.markDefs.find((def) => def._key === hrefMark);
          if (linkDef?.href) {
            node = (
              <a
                key={`link-${blockIndex}-${childIndex}`}
                href={linkDef.href}
                target="_blank"
                rel="noreferrer noopener"
                className="underline"
              >
                {node}
              </a>
            );
          }
        }

        return <span key={`span-${blockIndex}-${childIndex}`}>{node}</span>;
      });

      if (blockIndex < value.length - 1) {
        return [children, <br key={`br-${blockIndex}`} />];
      }

      return children;
    });
  };

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
      className="theme-light relative overflow-hidden py-10 lg:py-[100px]"
    >
      <div className="relative h-[45vh] min-h-[260px] overflow-hidden sm:h-[58vh] sm:min-h-[380px] lg:h-[80vh]">
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

        {/* Subtle radial gradient behind text */}
        <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(0,0,0,0.38)_0%,transparent_100%)]" />

        {/* Fixed centre overlay — section heading, white, no button. */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <h2 className="font-script max-w-5xl text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.02] text-white drop-shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
            <span className="block">{renderInline(heading1)}</span>
            <span className="block text-[color:#E2A724] uppercase font-bold italic tracking-[0.2em]">
              {renderInline(heading2)}
            </span>
            {heading3 ? <span className="block">{renderInline(heading3)}</span> : null}
          </h2>
        </div>
      </div>
    </section>
  );
}
