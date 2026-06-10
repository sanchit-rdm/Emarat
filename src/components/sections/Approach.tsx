"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsap } from "@/lib/gsap";
import SplitReveal from "@/components/motion/SplitReveal";

type Value = { _key?: string; no: string; title: string; body: string; img: string; alt: string };

const DEFAULT_VALUES: Value[] = [
  { no: "I.", title: "Built on Trust", body: "We believe in transparency, accountability and delivering on our commitments. Every decision we make is guided by integrity and a responsibility to create homes our customers can trust.", img: "/images/alameda-entrance.webp", alt: "Emarat Realty entrance — trust and transparency" },
  { no: "II.", title: "Commitment to Quality", body: "Every project reflects our focus on quality construction and lasting value. From the materials we use to the way we build, attention to detail remains a priority at every stage.", img: "/images/alameda-lounge.webp", alt: "Luxury lounge — quality craftsmanship" },
  { no: "III.", title: "Smart Planning", body: "Thoughtfully planned spaces that make everyday living more comfortable. From room layouts to shared areas, every element is designed to make the best use of space while supporting the needs of modern families.", img: "/images/alameda-bedroom-1.webp", alt: "Well-planned bedroom layout" },
  { no: "IV.", title: "Prime Locations", body: "Projects located in areas that offer convenience, good connectivity and everyday ease. From daily essentials to key destinations, everything is closer to where you live.", img: "/images/alameda-kitchen.webp", alt: "Emarat Realty — prime location living" },
  { no: "V.", title: "Modern Living", body: "Homes designed to suit the needs and lifestyles of modern families. From spacious interiors to community-focused surroundings, every detail is planned with residents in mind.", img: "/images/alameda-bedroom-2.webp", alt: "Modern family residence interior" },
];

interface ApproachData {
  heading1?: string;
  heading2?: string;
  heading3?: string;
  values?: Array<{ _key?: string; no: string; title: string; body: string; img?: string; alt?: string }>;
}
interface Props { data?: ApproachData }

export default function Approach({ data }: Props) {
  const heading1 = data?.heading1 ?? "Building with Ethics,";
  const heading2 = data?.heading2 ?? "Excellence & Efficiency.";
  const heading3 = data?.heading3 ?? "";
  const values: Value[] = data?.values?.length
    ? data.values.map((v) => ({ ...v, img: v.img ?? "/images/alameda-entrance.webp", alt: v.alt ?? v.title }))
    : DEFAULT_VALUES;
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const { gsap } = ensureGsap();

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>("[data-value]");
      gsap.fromTo(
        items,
        { opacity: 0, x: 120 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.22,
          scrollTrigger: {
            trigger: el,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="values"
      ref={sectionRef}
      className="bg-[color:var(--bg-alt)] px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SplitReveal as="h2" className="font-display h-section">
              {heading1}
            </SplitReveal>
            <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
              {heading2}
            </SplitReveal>
            {heading3 ? (
              <SplitReveal as="h2" delay={0.2} className="font-display h-section">
                {heading3}
              </SplitReveal>
            ) : null}
          </div>
        </div>

        <ol className="col-span-12 flex flex-col overflow-x-clip lg:col-span-8">
          {values.map((v) => (
            <li
              key={v._key ?? v.no}
              data-value
              className="grid grid-cols-12 gap-6 border-t border-[color:var(--line)] py-12 last:border-b lg:py-16"
              style={{ willChange: "transform, opacity" }}
            >
              <span className="col-span-12 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent)] lg:col-span-1">
                {v.no}
              </span>
              <div className="col-span-12 lg:col-span-7">
                {/* Point titles use Adelora (subheading font) */}
                <h3 className="font-display-alt text-2xl lg:text-3xl">{v.title}</h3>
                <p className="mt-4 max-w-xl text-[color:var(--muted)]">{v.body}</p>
              </div>
              <div className="col-span-12 lg:col-span-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[color:var(--bg)]">
                  <Image
                    src={v.img}
                    alt={v.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 100vw"
                    className="object-cover"
                    style={{ filter: "sepia(0.15) saturate(0.9) brightness(0.88)" }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
