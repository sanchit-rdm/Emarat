"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ensureGsap, scheduleScrollRefresh } from "@/lib/gsap";

type GalleryImg = { _key?: string; src: string; label: string };

const DEFAULT_IMAGES: GalleryImg[] = [
  { src: "/images/E11/e11-14-living-dining-interior-view-r0-20250313.jpg", label: "E11 · Living & Dining" },
  { src: "/images/C-2/c2-living-interior-view-approved-r0-20240122.jpg", label: "C2 · Living Room" },
  { src: "/images/EA4/ea-4-ent-lobbyjpg.jpg", label: "EA 04 · Entry Lobby" },
  { src: "/images/C-5/c-5-11-double-height.jpg", label: "C5 · Double Height Living" },
  { src: "/images/E11/e11-14-kitchen-interior-view-v1-r2-20250412.jpg", label: "E11 · Kitchen" },
  { src: "/images/C-2/c2-master-bedroom-interior-view-01-20250201.jpg", label: "C2 · Master Bedroom" },
  { src: "/images/EA4/ea-4-lounge-diningjpg.jpg", label: "EA 04 · Lounge & Dining" },
];

interface Props {
  images?: GalleryImg[];
  labels?: { title?: string; buttonLabel?: string; buttonHref?: string };
}

/**
 * Design Option 2 — "Elegant Design".
 *
 * A horizontal band of images that drifts right-to-left as the section passes
 * through the viewport on normal vertical scroll — NOT pinned, so the page keeps
 * scrolling naturally while the imagery glides. A cursive title (Bizantheum) and
 * a circular "Learn More" button sit fixed in the centre. Mirrors the reference
 * design's signature elegant-design band.
 */
export default function ElegantDesignV2({ images: rawImages, labels }: Props) {
  const images = rawImages?.length ? rawImages : DEFAULT_IMAGES;
  const title = labels?.title?.trim() || "Elegant Design";
  const buttonLabel = labels?.buttonLabel?.trim() || "Learn More";
  const buttonHref = labels?.buttonHref?.trim() || "/projects";
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
      id="elegant-design"
      className="relative overflow-hidden bg-[color:var(--bg)] py-16 lg:py-24"
    >
      <div className="relative h-[58vh] min-h-[380px] overflow-hidden lg:h-[80vh]">
        {/* Drifting image track — wider than the viewport, centred at rest. */}
        <div className="flex h-full items-center justify-center">
          <div
            ref={trackRef}
            className="flex h-full items-center gap-3 will-change-transform lg:gap-5"
          >
            {images.map((img, i) => (
              <figure
                key={img._key ?? i}
                className="relative h-full w-[74vw] shrink-0 overflow-hidden sm:w-[48vw] lg:w-[34vw]"
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 48vw, 74vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </div>

        {/* Subtle radial gradient behind text */}
        <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(0,0,0,0.38)_0%,transparent_100%)]" />

        {/* Fixed centre overlay — cursive title + circular call to action. */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="font-script whitespace-nowrap text-[clamp(2.75rem,9vw,8rem)] leading-none text-[color:var(--fg)] drop-shadow-[0_4px_40px_rgba(0,0,0,0.55)]">
            {title}
          </h2>

          <Link
            href={buttonHref}
            className="pointer-events-auto mt-8 flex h-28 w-28 items-center justify-center rounded-full border border-[color:var(--accent)]/70 text-[10px] uppercase tracking-[0.24em] text-[color:var(--fg)] backdrop-blur-sm transition-all duration-500 hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)] hover:text-[color:var(--bg)] lg:h-32 lg:w-32"
          >
            <span className="text-center leading-[1.5]">{buttonLabel}</span>
          </Link>
        </div>
      </div>

    </section>
  );
}
