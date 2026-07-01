"use client";

import Image from "@/components/Image";
import { useEffect, useRef, useState } from "react";
import { ensureGsap, scheduleScrollRefresh } from "@/lib/gsap";

/* ----------------------------------------------------------------------------
   Scroll-pinned hero. Behaviour adapts by screen size:

   Mobile / tablet (< lg):
     Three project building images that crossfade as the user scrolls,
     in lockstep with the heading text. No video downloaded.

   Desktop (lg+):
     Video whose `currentTime` is tied to scroll — scrolling advances /
     rewinds the footage. Same GSAP ScrollTrigger pin, same text timing.

   Both modes:
     • Section is pinned for TRACK_VH scroll distance.
     • Three text blocks fade in/out at the same progress points.
     • Respects prefers-reduced-motion (falls back to static first image/frame).
---------------------------------------------------------------------------- */

const TRACK_VH  = 350;
const SCRUB     = 0.6;
const FADE      = 0.08;
const FADE_IMG  = 0.05; // image crossfade duration on the 0..1 timeline

const MOBILE_IMAGES = [
  "/images/C-2/C2 M.jpeg",
  "/images/C-5/C5 M.jpeg",
  "/images/E11/E11 M.jpg",
];

// Scroll progress points where images 0→1 and 1→2 crossfade.
const IMG_SWITCH = [0.31, 0.63] as const;

type Anchor =
  | "top-left"  | "top-center"  | "top-right"
  | "mid-left"  | "center"      | "mid-right"
  | "bot-left"  | "bot-center"  | "bot-right";

type TextBlock = {
  id: string;
  heading: string;
  anchor: Anchor;
  enterAt: number;
  exitAt: number;
};

const TEXT_BLOCKS: TextBlock[] = [
  { id: "intro", heading: "Homes that define how you live.",      anchor: "bot-left", enterAt: 0,    exitAt: 0.3  },
  { id: "craft", heading: "Crafted in stone, light and silence.", anchor: "bot-left", enterAt: 0.36, exitAt: 0.62 },
  { id: "place", heading: "An address that appreciates.",         anchor: "bot-left", enterAt: 0.68, exitAt: 0.96 },
];

const ANCHOR_CLASSES: Record<Anchor, string> = {
  "top-left":   "items-start justify-start text-left",
  "top-center": "items-start justify-center text-center",
  "top-right":  "items-start justify-end text-right",
  "mid-left":   "items-center justify-start text-left",
  "center":     "items-center justify-center text-center",
  "mid-right":  "items-center justify-end text-right",
  "bot-left":   "items-end justify-start text-left",
  "bot-center": "items-end justify-center text-center",
  "bot-right":  "items-end justify-end text-right",
};

type SanityBlock = { _key?: string; heading?: string };

function resolveBlocks(blocks?: SanityBlock[]): TextBlock[] {
  if (!blocks?.length) return TEXT_BLOCKS;
  const ZW = /[​‌‍﻿]/g;
  const normalize = (h: string) => h.replace(ZW, "").replace(/\s+/g, " ").trim();
  return TEXT_BLOCKS.map((base, i) => {
    const b = blocks[i];
    if (!b?.heading) return base;
    const heading = normalize(b.heading);
    return { ...base, heading: heading || base.heading };
  });
}

export default function ScrollVideoHero({
  blocks,
  videoSrc,
  posterSrc,
  scrollLabel,
}: {
  blocks?: SanityBlock[];
  videoSrc?: string;
  posterSrc?: string;
  scrollLabel?: string;
}) {
  const resolvedBlocks = resolveBlocks(blocks);

  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef     = useRef<HTMLDivElement | null>(null);
  const videoRef   = useRef<HTMLVideoElement | null>(null);
  const cueRef     = useRef<HTMLDivElement | null>(null);
  const blockRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs  = useRef<(HTMLDivElement | null)[]>([]);

  // isDesktopRef is read inside the GSAP effect without needing it as a dep.
  const isDesktopRef = useRef(false);

  const [videoFailed, setVideoFailed] = useState(false);
  const [enableScrub, setEnableScrub] = useState(false);
  const [isDesktop,   setIsDesktop]   = useState(false); // for conditional render

  useEffect(() => {
    const reduced   = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop   = window.matchMedia("(min-width: 1024px)").matches;
    isDesktopRef.current = desktop;
    setIsDesktop(desktop);
    setEnableScrub(!reduced && !videoFailed);
  }, [videoFailed]);

  useEffect(() => {
    if (!enableScrub) return;

    const pin = pinRef.current;
    if (!pin) return;

    let ctx: { revert(): void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await ensureGsap();
      if (cancelled) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: `+=${TRACK_VH - 100}%`,
            pin,
            pinSpacing: true,
            scrub: SCRUB,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 2,
          },
        });

        if (isDesktopRef.current) {
          // ── Desktop: scrub video currentTime ──────────────────────────────
          const video = videoRef.current;
          if (video) {
            video.muted = true;
            video.load();

            const applyProxy = () => {
              const duration = video.duration;
              if (!Number.isFinite(duration) || duration === 0) return;
              video.play().then(() => video.pause()).catch(() => {});
              const proxy = { t: 0 };
              tl.to(proxy, {
                t: Math.max(0, duration - 0.04),
                duration: 1,
                ease: "none",
                onUpdate: () => {
                  if (video.readyState < 2) return;
                  const target = proxy.t;
                  if (Math.abs(video.currentTime - target) > 0.001) {
                    video.currentTime = target;
                  }
                },
              }, 0);
            };

            if (video.readyState >= 1 && Number.isFinite(video.duration)) {
              applyProxy();
            } else {
              video.addEventListener("loadedmetadata", applyProxy, { once: true });
            }
          }
        } else {
          // ── Mobile/tablet: crossfade images ───────────────────────────────
          const [i0, i1, i2] = imageRefs.current;
          if (i0) gsap.set(i0, { autoAlpha: 1 });
          if (i1) gsap.set(i1, { autoAlpha: 0 });
          if (i2) gsap.set(i2, { autoAlpha: 0 });

          // 0 → 1
          if (i0) tl.to(i0, { autoAlpha: 0, duration: FADE_IMG, ease: "none" }, IMG_SWITCH[0]);
          if (i1) tl.fromTo(i1, { autoAlpha: 0 }, { autoAlpha: 1, duration: FADE_IMG, ease: "none" }, IMG_SWITCH[0]);
          // 1 → 2
          if (i1) tl.to(i1, { autoAlpha: 0, duration: FADE_IMG, ease: "none" }, IMG_SWITCH[1]);
          if (i2) tl.fromTo(i2, { autoAlpha: 0 }, { autoAlpha: 1, duration: FADE_IMG, ease: "none" }, IMG_SWITCH[1]);
        }

        // ── Text blocks (same for both modes) ─────────────────────────────
        resolvedBlocks.forEach((b, i) => {
          const el = blockRefs.current[i];
          if (!el) return;
          gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: 0 });
          if (i !== 0) {
            tl.fromTo(
              el,
              { autoAlpha: 0, y: 40 },
              { autoAlpha: 1, y: 0, duration: FADE, ease: "power2.out", immediateRender: false },
              b.enterAt,
            );
          }
          tl.fromTo(
            el,
            { autoAlpha: 1, y: 0 },
            { autoAlpha: 0, y: -40, duration: FADE, ease: "power2.in", immediateRender: false },
            Math.max(b.exitAt - FADE, b.enterAt),
          );
        });

        // Scroll cue fades out as scrub begins.
        if (cueRef.current) {
          tl.to(cueRef.current, { autoAlpha: 0, duration: 0.05, ease: "none", immediateRender: false }, 0.03);
        }
      }, sectionRef);

      scheduleScrollRefresh();
    })();

    return () => {
      cancelled = true;
      videoRef.current?.removeEventListener("loadedmetadata", () => {});
      ctx?.revert();
    };
  }, [enableScrub]);

  return (
    <section id="top" ref={sectionRef} className="relative">
      <div ref={pinRef} className="relative isolate h-[100svh] w-full overflow-hidden">

        {/* ── Mobile / tablet background: 3 project images ── */}
        {!isDesktop && (
          <div className="absolute inset-0 -z-20">
            {MOBILE_IMAGES.map((src, i) => (
              <div
                key={src}
                ref={(el) => { imageRefs.current[i] = el; }}
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
              >
                <Image
                  src={src}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  alt=""
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Desktop background: scrubbed video ── */}
        {isDesktop && (
          <video
            ref={videoRef}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            poster={posterSrc ?? "/videos/home2-poster.webp"}
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            onError={() => setVideoFailed(true)}
          >
            {enableScrub && <source src={videoSrc ?? "/videos/home2-scrub.mp4"} type="video/mp4" />}
          </video>
        )}

        {/* Fallback poster when not yet scrubbing (SSR / reduced-motion) */}
        {!enableScrub && !isDesktop && (
          <div className="absolute inset-0 -z-20">
            <Image
              src={posterSrc ?? "/videos/home2-poster.webp"}
              fill
              sizes="100vw"
              className="object-cover"
              alt=""
              priority
            />
          </div>
        )}

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[color:var(--bg)]/70 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--line)] to-transparent" />
          <div className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-[color:var(--accent)]/8 blur-[160px]" />
          <div className="absolute -right-40 bottom-0 h-[560px] w-[560px] rounded-full bg-[color:var(--accent)]/6 blur-[200px]" />
        </div>

        {/* Text overlays — GSAP drives opacity/y via blockRefs */}
        {resolvedBlocks.map((b, i) => {
          const Heading = (i === 0 ? "h1" : "h2") as "h1" | "h2";
          return (
            <div
              key={b.id}
              ref={(el) => { blockRefs.current[i] = el; }}
              className={`pointer-events-none absolute inset-0 z-10 flex px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:px-14 lg:pb-24 lg:pt-36 ${ANCHOR_CLASSES[b.anchor]}`}
              style={i !== 0 ? { opacity: 0, visibility: "hidden" } : undefined}
            >
              <div className="max-w-3xl" style={{ textShadow: "0 1px 40px rgba(0,0,0,0.45)" }}>
                <Heading className="font-display h-section text-[color:var(--fg)]">
                  {b.heading}
                </Heading>
              </div>
            </div>
          );
        })}

        {/* Scroll cue */}
        <div
          ref={cueRef}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex items-center justify-center gap-3 text-[0.625rem] uppercase tracking-[0.3em] text-[color:var(--muted)]"
        >
          <span>{scrollLabel?.trim() || "Scroll"}</span>
          <span className="h-8 w-px bg-gradient-to-b from-[color:var(--accent)]/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
