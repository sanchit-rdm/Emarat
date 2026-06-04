"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";

/* ----------------------------------------------------------------------------
   Stats band — replaces the old scrolling green strip with a static grid of
   large count-up figures. Numbers animate from 0 once the band scrolls into
   view (skipped under prefers-reduced-motion). Brand: gold figures + a green
   accent tick, on the dark surface so it reads as quiet, premium punctuation.
---------------------------------------------------------------------------- */

type Stat = { n: number; suffix?: string; k: string };

const DEFAULT_STATS: Stat[] = [
  { n: 10, suffix: "+", k: "Years of experience" },
  { n: 7, k: "Projects delivered" },
  { n: 500, suffix: "+", k: "Happy families" },
  { n: 4, k: "Unique developments" },
  { n: 3, k: "Property types" },
  { n: 1, k: "Prime location, Gurugram" },
];

type SanityStat = { _key?: string; value: number; suffix?: string; label: string };
interface Props { stats?: SanityStat[] }

function useCountUp(target: number, run: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast then settling, reads as "counting up".
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

function StatItem({ stat, run, index }: { stat: Stat; run: boolean; index: number }) {
  const value = useCountUp(stat.n, run);
  return (
    <Reveal
      as="div"
      delay={index * 0.08}
      className="group relative flex flex-col items-center px-4 py-6 text-center lg:items-start lg:text-left"
    >
      <span className="mb-3 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--brand-green)] transition-transform duration-500 group-hover:scale-150" />
      <span className="font-display text-5xl leading-none tracking-tight text-[color:var(--accent)] lg:text-6xl">
        {value}
        {stat.suffix && <span className="text-[color:var(--accent-2)]">{stat.suffix}</span>}
      </span>
      <span className="mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
        {stat.k}
      </span>
    </Reveal>
  );
}

export default function StatsMarquee({ stats: rawStats }: Props) {
  const stats: Stat[] = rawStats?.length
    ? rawStats.map((s) => ({ n: s.value, suffix: s.suffix, k: s.label }))
    : DEFAULT_STATS;
  const ref = useRef<HTMLElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-[color:var(--line)] bg-[color:var(--bg-alt)] py-16 lg:py-20"
    >
      {/* Soft brand glows so the band feels composed, not a flat strip. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-[color:var(--brand-green)]/25 blur-[140px]" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[color:var(--accent)]/8 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal
          as="p"
          className="eyebrow mb-10 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]"
        >
          <span>By the numbers</span>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-0 lg:divide-x lg:divide-[color:var(--line)]">
          {stats.map((s, i) => (
            <StatItem key={`${s.k}-${i}`} stat={s} run={run} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
