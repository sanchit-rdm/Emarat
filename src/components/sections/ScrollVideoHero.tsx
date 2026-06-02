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

   Asset (the team's video) — drop into /public/hero/:
     • hero.mp4          primary source. SMOOTHNESS IS ENCODING-BOUND: use a
                         short ~5–8s clip, H.264, keyframe-dense / short GOP so
                         any seek lands on/near an I-frame, e.g.
                         ffmpeg -i in.mov -c:v libx264 -g 6 -pix_fmt yuv420p \
                                -movflags +faststart -an hero.mp4
                         (use -g 1 for the smoothest seek at a larger file).
     • hero.webm         optional VP9/AV1 secondary source.
     • hero-poster.jpg   first-frame still (poster + reduced-motion fallback).
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
  eyebrow?: string;
  heading: string;
  sub?: string;
  anchor: Anchor;
  /** Scroll progress (0..1) where the block has finished fading IN. */
  enterAt: number;
  /** Scroll progress (0..1) where the block has finished fading OUT. */
  exitAt: number;
};

/* ----------------------------------------------------------------------------
   EDIT ME — placeholder copy. Change the words, `anchor` (where on screen),
   and enterAt/exitAt (when, as a fraction of the scroll) to retime each beat.
   The first block stays visible at the very top, then fades as you scroll.
---------------------------------------------------------------------------- */
const TEXT_BLOCKS: TextBlock[] = [
  {
    id: "intro",
    eyebrow: "Luxury Real Estate · Gurugram · Est. 2014",
    heading: "Homes that define how you live.",
    anchor: "bot-left",
    enterAt: 0,
    exitAt: 0.3,
  },
  {
    id: "craft",
    eyebrow: "Design & Materials",
    heading: "Crafted in stone, light and silence.",
    sub: "Every residence is composed around how it feels to live in it.",
    anchor: "bot-left",
    enterAt: 0.36,
    exitAt: 0.62,
  },
  {
    id: "place",
    eyebrow: "DLF Garden City · Sector 93",
    heading: "An address that appreciates.",
    anchor: "bot-left",
    enterAt: 0.68,
    exitAt: 0.96,
  },
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

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Resolved client-side only — keeps the static fallback in place when the
  // video can't load. Reduced-motion is read once inside the effect (matches
  // SmoothScroll.tsx), so it doesn't need to live in state.
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (videoFailed) return;

    const pin = pinRef.current;
    const video = videoRef.current;
    if (!pin || !video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // static hero: first block stays visible, no pin

    const { gsap } = ensureGsap();
    video.muted = true; // some browsers ignore the declarative prop

    let ctx: ReturnType<typeof gsap.context> | undefined;

    const init = () => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration === 0) return;

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
  }, [videoFailed]);

  return (
    <section id="top" ref={sectionRef} className="relative">
      <div ref={pinRef} className="relative isolate h-screen w-full overflow-hidden">
        {/* Background video — never played, only scrubbed. */}
        <video
          ref={videoRef}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          poster="/videos/hero-poster.jpg"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        >
          {/* Optimized scrub copy: 1080p, keyframe every 6 frames (see README).
              Re-encoded from the source "Sample 1.mp4" for smooth seeking. */}
          <source src="/videos/hero-scrub.mp4" type="video/mp4" />
        </video>

        {/* Brand tint + vignette for legibility (mirrors the old Hero). */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[color:var(--bg)]/55" />
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
              className={`pointer-events-none absolute inset-0 z-10 flex px-6 pb-20 pt-32 lg:px-14 lg:pb-24 lg:pt-36 ${ANCHOR_CLASSES[b.anchor]}`}
              style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
            >
              <div
                className="max-w-3xl"
                style={{ textShadow: "0 1px 40px rgba(0,0,0,0.45)" }}
              >
                {b.eyebrow && (
                  <p className="eyebrow mb-5 text-xs uppercase tracking-[0.24em] text-white">
                    <span>{b.eyebrow}</span>
                  </p>
                )}
                <Heading className="font-display h-section text-[color:var(--fg)]">
                  {b.heading}
                </Heading>
                {b.sub && (
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-white lg:text-lg">
                    {b.sub}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Scroll affordance — signals that scrolling drives the footage. */}
        <div
          ref={cueRef}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)]"
        >
          <span>Scroll</span>
          <span className="h-8 w-px bg-gradient-to-b from-[color:var(--accent)]/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
