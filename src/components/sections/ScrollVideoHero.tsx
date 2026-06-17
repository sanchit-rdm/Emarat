"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap, scheduleScrollRefresh } from "@/lib/gsap";

/* ----------------------------------------------------------------------------
   Scroll-scrubbed background video hero.

   The video is NEVER played — instead its `currentTime` is tied to scroll
   position, so scrolling down advances the footage and scrolling up rewinds
   it. The hero is pinned full-viewport while a sequence of text blocks fades
   in/out at configured scroll points and on-screen positions. Everything runs
   off ONE scrubbed GSAP timeline so frames and text stay in lockstep in both
   directions. Reuses the project's `ensureGsap()` / `gsap.context()` pattern
   (see src/components/motion/Parallax.tsx).

   Assets — in /public/videos/:
     • hero-scrub.mp4    What the hero scrubs. Re-encoded keyframe-dense (a
                         keyframe every 6 frames) so any seek decodes ≤6 frames
                         and reverse scrubbing stays smooth. See videos/README.
     • hero-poster.webp  First-frame still (poster + reduced-motion fallback).
---------------------------------------------------------------------------- */

// Total scroll length of the pinned hero, in viewport heights. Tune to taste:
// larger = slower / more deliberate scrub, more room for text beats.
const TRACK_VH = 350;
// ScrollTrigger scrub smoothing (seconds of catch-up). A little inertia reads
// as cinematic and prevents seek-storms on fast flicks.
const SCRUB = 0.6;
// Fade duration of each text block, expressed in the timeline's 0..1 space.
const FADE = 0.08;

type Anchor =
  | "top-left" | "top-center" | "top-right"
  | "mid-left" | "center" | "mid-right"
  | "bot-left" | "bot-center" | "bot-right";

type TextBlock = {
  id: string;
  heading: string;
  anchor: Anchor;
  /** Scroll progress (0..1) where the block has finished fading IN. */
  enterAt: number;
  /** Scroll progress (0..1) where the block has finished fading OUT. */
  exitAt: number;
};

/* Heading copy is editable in Sanity → Home Page → Hero Text Blocks. These are
   only fallbacks (used until content is entered). `anchor` (where on screen)
   and enterAt/exitAt (scroll timing) stay fixed in code. */
const TEXT_BLOCKS: TextBlock[] = [
  { id: "intro", heading: "Homes that define how you live.", anchor: "bot-left", enterAt: 0, exitAt: 0.3 },
  { id: "craft", heading: "Crafted in stone, light and silence.", anchor: "bot-left", enterAt: 0.36, exitAt: 0.62 },
  { id: "place", heading: "An address that appreciates.", anchor: "bot-left", enterAt: 0.68, exitAt: 0.96 },
];

const ANCHOR_CLASSES: Record<Anchor, string> = {
  "top-left": "items-start justify-start text-left",
  "top-center": "items-start justify-center text-center",
  "top-right": "items-start justify-end text-right",
  "mid-left": "items-center justify-start text-left",
  "center": "items-center justify-center text-center",
  "mid-right": "items-center justify-end text-right",
  "bot-left": "items-end justify-start text-left",
  "bot-center": "items-end justify-center text-center",
  "bot-right": "items-end justify-end text-right",
};

type SanityBlock = { _key?: string; heading?: string };

// Overlay editable headings from Sanity onto the in-code timing/position slots,
// keeping the scroll choreography fixed. Extra Sanity blocks beyond the
// designed slots are ignored; missing ones keep their default heading.
function resolveBlocks(blocks?: SanityBlock[]): TextBlock[] {
  if (!blocks?.length) return TEXT_BLOCKS;
  const ZW_CHARS = /[\u200B\u200C\u200D\uFEFF]/g;
  const normalize = (heading: string) => heading.replace(ZW_CHARS, "").replace(/\s+/g, " ").trim();

  return TEXT_BLOCKS.map((base, i) => {
    const b = blocks[i];
    if (!b || !b.heading) return base;
    const heading = normalize(b.heading);
    return { ...base, heading: heading || base.heading };
  });
}

export default function ScrollVideoHero({ blocks, videoSrc, posterSrc, scrollLabel }: { blocks?: SanityBlock[]; videoSrc?: string; posterSrc?: string; scrollLabel?: string }) {
  const TEXT_BLOCKS = resolveBlocks(blocks);
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Resolved client-side only — keeps the static fallback in place when the
  // video can't load. Reduced-motion is read once inside the effect (matches
  // SmoothScroll.tsx), so it doesn't need to live in state.
  const [videoFailed, setVideoFailed] = useState(false);
  // Scrubbing runs on every screen size now; only reduced-motion opts out (it
  // falls back to a static poster hero with the first text block — no pin, no
  // scroll-jacking, no multi-MB fetch). The scrub clip is keyframe-dense (any
  // seek decodes ≤6 frames) and ~6 MB, which keeps currentTime seeking smooth
  // on phones too.
  const [enableScrub, setEnableScrub] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnableScrub(!reduced);
  }, []);

  useEffect(() => {
    if (videoFailed || !enableScrub) return;

    const pin = pinRef.current;
    const video = videoRef.current;
    if (!pin || !video) return;

    const { gsap } = ensureGsap();
    video.muted = true; // some browsers ignore the declarative prop
    video.load(); // pick up the <source> that was just rendered

    let ctx: ReturnType<typeof gsap.context> | undefined;

    const init = () => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration === 0) return;

      // iOS Safari won't paint a frame written via `currentTime` until the
      // video decoder has been started at least once. A muted + playsInline
      // clip may be play()ed without a user gesture, so prime it and pause
      // immediately — the scrub then drives every subsequent frame. (No-op /
      // harmless on desktop, where seeking paints without this.)
      video.play().then(() => video.pause()).catch(() => {});

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            // pinSpacing generates the extra scroll distance; % is relative to
            // the viewport, so (TRACK_VH - 100)% of extra travel after the
            // first viewport. Recomputed on refresh automatically.
            end: `+=${TRACK_VH - 100}%`,
            pin: pin,
            pinSpacing: true,
            scrub: SCRUB,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Highest priority so this top-of-page pin is measured (and its
            // pin-spacer inserted) before the Gallery below it — otherwise the
            // Gallery computes its start without this spacer and overlaps the
            // hero before the scrub finishes.
            refreshPriority: 2,
          },
        });

        // 1) Frame scrub: tween a proxy over the whole timeline (length 1) and
        //    write currentTime in onUpdate. Guards avoid undecoded seeks and
        //    redundant sub-frame seeks (the source of jank).
        const proxy = { t: 0 };
        tl.to(proxy, {
          t: duration,
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

        // 2) Text blocks on the SAME 0..1 clock → they reverse with the video.
        TEXT_BLOCKS.forEach((b, i) => {
          const el = blockRefs.current[i];
          if (!el) return;
          gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: 0 });
          if (i !== 0) {
            tl.fromTo(
              el,
              { autoAlpha: 0, y: 40 },
              { autoAlpha: 1, y: 0, duration: FADE, ease: "power2.out", immediateRender: false },
              b.enterAt
            );
          }
          tl.fromTo(
            el,
            { autoAlpha: 1, y: 0 },
            { autoAlpha: 0, y: -40, duration: FADE, ease: "power2.in", immediateRender: false },
            Math.max(b.exitAt - FADE, b.enterAt)
          );
        });

        // 3) Scroll cue fades out as soon as the scrub begins.
        if (cueRef.current) {
          tl.to(cueRef.current, { autoAlpha: 0, duration: 0.05, ease: "none", immediateRender: false }, 0.03);
        }
      }, sectionRef);

      scheduleScrollRefresh();
    };

    if (video.readyState >= 1 && Number.isFinite(video.duration)) {
      init();
    } else {
      video.addEventListener("loadedmetadata", init, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", init);
      ctx?.revert();
    };
  }, [videoFailed, enableScrub]);

  return (
    <section id="top" ref={sectionRef} className="relative">
      <div ref={pinRef} className="relative isolate h-[100svh] w-full overflow-hidden">
        {/* Background video — never played, only scrubbed. The source is
            mounted whenever scrubbing is on (all sizes except reduced-motion);
            reduced-motion users keep the static poster and never fetch it. */}
        <video
          ref={videoRef}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          poster={posterSrc ?? "/videos/hero-poster.webp"}
          muted
          playsInline
          preload={enableScrub ? "auto" : "none"}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        >
          {/* Optimized scrub copy: 720p, keyframe every 6 frames (see README).
              Re-encoded from the new hero clip for smooth seeking. */}
          {enableScrub && <source src={videoSrc ?? "/videos/hero-scrub.mp4"} type="video/mp4" />}
        </video>

        {/* Overlay only beneath the text content area (bottom ~55%). */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[color:var(--bg)]/70 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--line)] to-transparent" />
          <div className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-[color:var(--accent)]/8 blur-[160px]" />
          <div className="absolute -right-40 bottom-0 h-[560px] w-[560px] rounded-full bg-[color:var(--accent)]/6 blur-[200px]" />
        </div>

        {/* Text overlays. Each block fills the frame and aligns its content per
            its anchor. The first block is visible by default (no JS / reduced
            motion still shows it); GSAP fades the rest in/out on scroll. */}
        {TEXT_BLOCKS.map((b, i) => {
          const Heading = (i === 0 ? "h1" : "h2") as "h1" | "h2";
          return (
            <div
              key={b.id}
              ref={(el) => {
                blockRefs.current[i] = el;
              }}
              className={`pointer-events-none absolute inset-0 z-10 flex px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:px-14 lg:pb-24 lg:pt-36 ${ANCHOR_CLASSES[b.anchor]}`}
              style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
            >
              <div
                className="max-w-3xl"
                style={{ textShadow: "0 1px 40px rgba(0,0,0,0.45)" }}
              >
                <Heading className="font-display h-section text-[color:var(--fg)]">
                  {b.heading}
                </Heading>
              </div>
            </div>
          );
        })}

        {/* Scroll affordance — signals that scrolling drives the footage. */}
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
