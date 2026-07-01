"use client";

import { useEffect, useRef, useState } from "react";
import CircleButton from "@/components/CircleButton";

interface Props {
  whatsappPhone?: string;
  instagramUrl?: string;
}

export default function BrochureButton({
  whatsappPhone = "+918450984509",
  instagramUrl = "https://www.instagram.com/emarat.realty/",
}: Props) {
  const waUrl = `https://wa.me/${whatsappPhone.replace(/\D/g, "")}`;
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  const btnRefs = useRef<(HTMLElement | null)[]>([]);
  const rectRefs = useRef<(SVGRectElement | null)[]>([]);

  useEffect(() => {
    const observers: ResizeObserver[] = [];

    btnRefs.current.forEach((btn, i) => {
      const rect = rectRefs.current[i];
      if (!btn || !rect) return;

      const sync = () => {
        const { width, height } = btn.getBoundingClientRect();
        if (!width || !height) return;
        const cssRadius = parseFloat(getComputedStyle(btn).borderRadius) || 0;
        const r = Math.min(cssRadius, Math.min(width, height) / 2);
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
      observers.push(ro);
    });

    return () => observers.forEach((ro) => ro.disconnect());
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
      <div
        className={`fixed bottom-0 inset-x-0 z-40 flex flex-row gap-px transition-all duration-500 lg:inset-x-auto lg:right-0 lg:bottom-auto lg:top-1/2 lg:flex-col lg:-translate-y-1/2 ${
          heroVisible ? "pointer-events-none translate-y-full opacity-0 lg:translate-y-0 lg:translate-x-full" : "translate-y-0 opacity-100 lg:translate-x-0"
        }`}
      >
        {/* WhatsApp */}
        <a
          ref={(el) => { btnRefs.current[0] = el; }}
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="link-hover relative flex flex-1 flex-col items-center justify-center gap-1 bg-[#01472E] py-3 text-white lg:flex-none lg:px-3 lg:py-4"
        >
          <svg className="link-hover__circle" aria-hidden="true">
            <rect ref={(el) => { rectRefs.current[0] = el; }} fill="none" />
          </svg>
          <svg viewBox="0 0 24 24" fill="currentColor" className="relative z-10 h-5 w-5 shrink-0" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </a>

        {/* Callback */}
        <button
          ref={(el) => { btnRefs.current[1] = el; }}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Request a callback"
          className="link-hover relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 bg-[#01472E] py-3 text-white lg:flex-none lg:gap-3 lg:px-3 lg:py-5"
        >
          <svg className="link-hover__circle" aria-hidden="true">
            <rect ref={(el) => { rectRefs.current[1] = el; }} fill="none" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="relative z-10 h-5 w-5 shrink-0" aria-hidden="true">
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.47 11.47 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.47 11.47 0 0 0 .57 3.6 1 1 0 0 1-.25 1.01z" />
          </svg>
          <span className="relative z-10 text-[0.5625rem] font-semibold uppercase tracking-[0.22em] lg:hidden">
            Callback
          </span>
          <span
            className="relative z-10 hidden text-[0.5625rem] font-semibold uppercase tracking-[0.22em] lg:block"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Request a callback
          </span>
        </button>

        {/* Instagram */}
        <a
          ref={(el) => { btnRefs.current[2] = el; }}
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow on Instagram"
          className="link-hover relative flex flex-1 flex-col items-center justify-center gap-1 bg-[#01472E] py-3 text-white lg:flex-none lg:px-3 lg:py-4"
        >
          <svg className="link-hover__circle" aria-hidden="true">
            <rect ref={(el) => { rectRefs.current[2] = el; }} fill="none" />
          </svg>
          <svg viewBox="0 0 24 24" fill="currentColor" className="relative z-10 h-5 w-5 shrink-0" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
          </svg>
        </a>
      </div>

      {/* Callback modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 pb-8 pt-36">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden
          />
          <div className="relative z-10 w-full max-w-md rounded-lg bg-[#011f14] p-8 shadow-2xl">
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
                <p className="mt-3 text-sm text-white/70">Our team will reach out to you shortly.</p>
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
                    <input
                      type="text"
                      placeholder="Interested in…"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/60"
                      aria-label="Project interest"
                    />
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
