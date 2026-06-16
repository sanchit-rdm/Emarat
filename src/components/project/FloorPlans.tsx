"use client";

import { useState } from "react";
import Image from "next/image";
import type { FloorPlan } from "@/lib/projects";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

export default function FloorPlans({
  plans,
  labels,
}: {
  plans: FloorPlan[];
  labels?: { heading?: string; blurb?: string; requestLabel?: string; badge?: string };
}) {
  const [active, setActive] = useState(0);
  if (!plans?.length) return null;
  const plan = plans[active] ?? plans[0];
  const heading = labels?.heading?.trim() || "Floor Plans";
  const blurb = labels?.blurb?.trim() || "Indicative layouts. Select a floor to view its plan and key finishes.";
  const requestLabel = labels?.requestLabel?.trim() || "Request detailed plan";
  const badge = labels?.badge?.trim() || "Indicative";

  return (
    <section id="floor-plans" className="scroll-mt-44 px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SplitReveal as="h2" className="font-display h-section">
            {heading}
          </SplitReveal>
          <Reveal as="p" delay={0.15} className="max-w-sm text-sm text-[color:var(--muted)]">
            {blurb}
          </Reveal>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3">
          {plans.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.16em] transition-colors ${
                i === active
                  ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--bg)]"
                  : "border-[color:var(--line)] text-[color:var(--muted)] hover:border-[color:var(--accent)]/50 hover:text-[color:var(--fg)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-12 gap-8 lg:gap-12">
          {/* Plan image */}
          <div className="col-span-12 lg:col-span-7">
            <div
              key={`img-${plan.id}`}
              className="places-fade relative aspect-[4/3] overflow-hidden rounded-md border border-[color:var(--line)] bg-[color:var(--bg-alt)]"
            >
              <Image
                src={plan.image}
                alt={`${plan.label} floor plan`}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
                style={{ filter: "sepia(0.12) saturate(0.9) brightness(0.9)" }}
              />
            </div>
          </div>

          {/* Plan specs */}
          <div key={`spec-${plan.id}`} className="places-fade col-span-12 lg:col-span-5">
            <div className="font-display-alt text-2xl sm:text-3xl lg:text-4xl">{plan.label}</div>

            <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 border-t border-[color:var(--line)] pt-8 sm:grid-cols-2 sm:gap-y-6">
              {plan.specs.map((s) => (
                <div key={s.label}>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">{s.label}</dt>
                  <dd className="mt-1 font-display-alt text-xl tracking-tight lg:text-2xl">{s.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href="#enquiry"
              className="mt-10 inline-flex items-center gap-3 text-sm text-[color:var(--accent)]"
            >
              <span className="border-b border-[color:var(--accent)]/40 pb-1">{requestLabel}</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
