"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";

export default function EnquiryForm({
  projectTitle,
  config,
}: {
  projectTitle: string;
  config: string;
}) {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="enquiry"
      className="relative isolate scroll-mt-44 overflow-hidden border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[440px] w-[440px] rounded-full bg-[color:var(--accent)]/10 blur-[200px]" />

      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-10 lg:gap-16">
        <div className="col-span-12 lg:col-span-5">
          <SplitReveal as="h2" className="font-display h-section">
            Enquire about
          </SplitReveal>
          <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--muted)]">
            {`${projectTitle.replace(/ at .*/, "")}.`}
          </SplitReveal>
          <Reveal as="p" delay={0.2} className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--muted)]">
            Share your details and our sales team will get back to you within one
            business day with availability, pricing and a private site visit.
          </Reveal>

          <Reveal delay={0.3} className="mt-10 space-y-4 border-t border-[color:var(--line)] pt-8 text-sm">
            <a href="tel:+918450984509" className="block transition-colors hover:text-[color:var(--accent)]">
              +91 84509 84509
            </a>
            <a href="mailto:info@emaratrealty.com" className="block transition-colors hover:text-[color:var(--accent)]">
              info@emaratrealty.com
            </a>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <Reveal className="rounded-md border border-[color:var(--line)] bg-[color:var(--bg)]/40 p-8 lg:p-10">
            {/* Static, presentational form — wire to a backend / CRM later. */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="flex flex-col gap-5"
            >
              <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                Interested in · {projectTitle}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full Name" name="name" placeholder="Your name" required />
                <Field label="Phone" name="phone" type="tel" placeholder="+91 00000 00000" required />
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" placeholder="your@email.com" />
                <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
                  <label className="block text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    Configuration
                  </label>
                  <select className="mt-2 w-full bg-transparent text-sm outline-none" defaultValue="">
                    <option value="" disabled className="bg-[color:var(--bg)]">Preferred type</option>
                    <option className="bg-[color:var(--bg)]">{config}</option>
                    <option className="bg-[color:var(--bg)]">Site visit</option>
                    <option className="bg-[color:var(--bg)]">Investment / NRI</option>
                  </select>
                </div>
              </div>
              <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
                <label className="block text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you're looking for…"
                  className="mt-2 w-full resize-none bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
                  {sent ? "Thank you — we'll be in touch shortly." : "By submitting you agree to our privacy policy."}
                </p>
                <CircleButton type="submit" variant="filled">
                  {sent ? "Sent" : "Send Enquiry"}
                </CircleButton>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
      <label className="block text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
      />
    </div>
  );
}
