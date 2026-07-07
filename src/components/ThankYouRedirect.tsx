"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/motion/Reveal";
import CircleButton from "@/components/CircleButton";

const REDIRECT_SECONDS = 10;

export default function ThankYouRedirect() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) {
      router.push("/");
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, router]);

  return (
    <section className="flex min-h-[75svh] flex-col items-center justify-center px-4 pt-24 text-center sm:px-6 sm:pt-28 lg:pt-32">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--accent)]/40">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-[color:var(--accent)]" aria-hidden="true">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <SplitReveal as="h1" className="font-display h-section">
        Thank you.
      </SplitReveal>
      <SplitReveal as="h1" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
        We&apos;ll be in touch shortly.
      </SplitReveal>

      <Reveal as="p" delay={0.2} className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--muted)]">
        Your enquiry has been received. Our team will get back to you soon.
      </Reveal>

      <Reveal delay={0.3} className="mt-10 flex flex-col items-center gap-4">
        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
          Redirecting to home in {secondsLeft}s
        </p>
        <CircleButton href="/" variant="filled">
          Return home now
        </CircleButton>
      </Reveal>
    </section>
  );
}
