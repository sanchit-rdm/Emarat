"use client";

import { useEffect, useRef, useState } from "react";
import CircleButton from "@/components/CircleButton";

export default function BrochureButton() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const rectRef = useRef<SVGRectElement | null>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const rect = rectRef.current;
    if (!btn || !rect) return;
    const sync = () => {
      const { width, height } = btn.getBoundingClientRect();
      if (!width || !height) return;
      const cssRadius = parseFloat(getComputedStyle(btn).borderRadius) || 0;
      const maxRadius = Math.min(width, height) / 2;
      const r = Math.min(cssRadius, maxRadius);
      const inset = 0.5;
      const w = Math.max(0, width - inset * 2);
      const h = Math.max(0, height - inset * 2);
      rect.setAttribute("x", String(inset));
      rect.setAttribute("y", String(inset));
      rect.setAttribute("width", String(w));
      rect.setAttribute("height", String(h));
      rect.setAttribute("rx", String(Math.max(0, r - inset)));
      rect.setAttribute("ry", String(Math.max(0, r - inset)));
      requestAnimationFrame(() => {
        try {
          const len = rect.getTotalLength();
          if (len > 0) btn.style.setProperty("--len", String(len));
        } catch {}
      });
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(btn);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) { setHeroVisible(false); return; }
    const io = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => setSubmitted(false), 300);
  }

  return (
    <>
      {/* Sticky vertical button — hidden over the hero scrub */}
      <div className={`fixed right-0 top-1/2 z-40 -translate-y-1/2 transition-all duration-500 ${heroVisible ? "pointer-events-none translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}>
        <button
          ref={btnRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Request a callback"
          className="link-hover relative flex cursor-pointer flex-col items-center gap-3 bg-[#01472E] px-3 py-5 text-white"
        >
          <svg className="link-hover__circle" aria-hidden="true">
            <rect ref={rectRef} fill="none" />
          </svg>
          {/* Phone icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10 h-5 w-5 shrink-0"
          >
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.47 11.47 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.47 11.47 0 0 0 .57 3.6 1 1 0 0 1-.25 1.01z" />
          </svg>
          <span
            className="relative z-10 text-[0.5625rem] font-semibold uppercase tracking-[0.22em]"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Request a callback
          </span>
        </button>
      </div>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 pt-36 pb-8">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden
          />
          <div className="relative z-10 w-full max-w-md rounded-lg bg-[#011f14] p-8 shadow-2xl">
            {/* Close */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-4 top-4 cursor-pointer text-white/60 transition-colors hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#01472E]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-[#E2A724]">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-white">We&apos;ll call you back.</h3>
                <p className="mt-3 text-sm text-white/70">
                  Our team will reach out to you shortly.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 cursor-pointer text-xs uppercase tracking-[0.18em] text-[#E2A724] transition-colors hover:text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#E2A724]">Emarat Realty</p>
                  <h3 className="mt-2 font-display text-2xl text-white">Request a callback</h3>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="border-b border-white/15 pb-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                      aria-label="Name"
                    />
                  </div>
                  <div className="border-b border-white/15 pb-3">
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      required
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                      aria-label="Phone"
                    />
                  </div>
                  <div className="border-b border-white/15 pb-3">
                    <select
                      className="w-full cursor-pointer bg-transparent text-sm text-white/60 outline-none"
                      defaultValue=""
                      aria-label="Preferred time"
                    >
                      <option value="" disabled className="bg-[#011f14]">Preferred time to call…</option>
                      <option value="morning" className="bg-[#011f14]">Morning (9 am – 12 pm)</option>
                      <option value="afternoon" className="bg-[#011f14]">Afternoon (12 pm – 4 pm)</option>
                      <option value="evening" className="bg-[#011f14]">Evening (4 pm – 7 pm)</option>
                    </select>
                  </div>
                  <div className="border-b border-white/15 pb-3">
                    <select
                      className="w-full cursor-pointer bg-transparent text-sm text-white/60 outline-none"
                      defaultValue=""
                      aria-label="Project interest"
                    >
                      <option value="" disabled className="bg-[#011f14]">Interested in…</option>
                      <option value="c2" className="bg-[#011f14]">C2 at DLF Garden City</option>
                      <option value="c5" className="bg-[#011f14]">C5 at DLF Garden City</option>
                      <option value="e11" className="bg-[#011f14]">E11 at DLF Garden City</option>
                      <option value="ea04" className="bg-[#011f14]">EA 04 at Alameda</option>
                    </select>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-[0.625rem] uppercase tracking-[0.14em] text-white/40">
                      By submitting you agree to our privacy policy.
                    </p>
                    <CircleButton type="submit" variant="filled" size="sm">
                      Submit
                    </CircleButton>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
