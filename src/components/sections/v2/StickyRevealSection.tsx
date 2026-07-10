"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, scheduleScrollRefresh } from "@/lib/gsap";

const HEADING_CLASS =
  "font-display text-[clamp(2.1rem,4.1vw,4.1rem)] leading-[1.06] text-white";

const SUBHEADING_CLASS =
  "font-script text-[clamp(2.4rem,4.2vw,4.2rem)] leading-[1.15] text-[color:var(--accent)]";

const PARAGRAPH_CLASS =
  "mx-auto max-w-2xl text-lg font-medium leading-relaxed text-white/80 sm:text-xl";

interface SanitySlide {
  line1?: string;
  line2?: string;
  body?: string;
}

interface StickyRevealData {
  heading?: string;
  slides?: SanitySlide[];
}

const DEFAULT_HEADING = "A Home Built the Way You Always Imagined";
const DEFAULT_SLIDES: SanitySlide[] = [
  {
    line1: "Crafted",
    body: "With luxury finishes, smartly planned layouts, premium materials — every Emarat residence is designed to the finest detail, where quality is not a feature, it is the foundation.",
  },
  {
    line1: "Connected",
    body: "To Gurugram's premier schools, world-class healthcare, premium retail and seamless NCR connectivity, all within reach.",
  },
  {
    line1: "Complete",
    body: "Home with luxury inside. Convenience outside. Everything your family needs — nothing missing, nothing compromised.",
  },
];

export default function StickyRevealSection({ data }: { data?: StickyRevealData }) {
  const heading = data?.heading?.trim() || DEFAULT_HEADING;
  const slides = data?.slides?.length ? data.slides : DEFAULT_SLIDES;

  const wrapRef   = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert(): void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await ensureGsap();
      if (cancelled) return;

      const allSlides = slideRefs.current.filter(Boolean) as HTMLElement[];
      gsap.set(allSlides, { y: 50, autoAlpha: 0 });

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${allSlides.length * 300}vh`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        allSlides.forEach((el, i) => {
          const isLast = i === allSlides.length - 1;
          tl.to(el, { y: 0, autoAlpha: 1, duration: 4, ease: "none" }, i === 0 ? 0 : ">");
          tl.to(el, { duration: 0.8 });
          if (!isLast) {
            tl.to(el, { y: -50, autoAlpha: 0, duration: 4, ease: "none" });
          }
        });
      }, wrap);

      scheduleScrollRefresh();
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  // heading + slides combined into one flat list for the animation
  const allItems = [
    { type: "heading" as const, text: heading },
    ...slides.map((s) => ({ type: "slide" as const, ...s })),
  ];

  return (
    <div
      ref={wrapRef}
      id="sticky-reveal-bg"
      className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center"
    >
      {/* Sized-per-breakpoint background via Sanity CDN transforms; fixed
          attachment only on desktop — it forces whole-layer repaints on
          phones and iOS Safari mishandles it. */}
      <style>{`
        #sticky-reveal-bg { background-image: url("https://cdn.sanity.io/images/k6lgt7ii/production/ffe414a23af6679e70aa2300d9f90b77fc941832-2200x1100.jpg?w=1080&fm=webp&q=75"); }
        @media (min-width: 1024px) and (pointer: fine) {
          #sticky-reveal-bg {
            background-image: url("https://cdn.sanity.io/images/k6lgt7ii/production/ffe414a23af6679e70aa2300d9f90b77fc941832-2200x1100.jpg?w=2048&fm=webp&q=80");
            background-attachment: fixed;
          }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 bg-black/65" />

      <div className="absolute inset-0 z-10">
        {allItems.map((item, i) => (
          <div
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-4 text-center sm:px-6 lg:px-10"
          >
            {item.type === "heading" ? (
              <div className={HEADING_CLASS}>{item.text}</div>
            ) : (
              <>
                <div className={SUBHEADING_CLASS}>
                  <span className="block">{item.line1}</span>
                </div>
                {item.body && (
                  <p className={PARAGRAPH_CLASS}>
                    {item.line2 ? `${item.line2} ${item.body}` : item.body}
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
