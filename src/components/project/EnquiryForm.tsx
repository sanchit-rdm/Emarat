"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";

export default function EnquiryForm({
  projectTitle,
  config,
  labels,
}: {
  projectTitle: string;
  config: string;
  labels?: {
    heading?: string;
    blurb?: string;
    phone?: string;
    email?: string;
    submitLabel?: string;
    interestedLabel?: string;
    nameLabel?: string;
    namePlaceholder?: string;
    phoneLabel?: string;
    phonePlaceholder?: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
    privacy?: string;
  };
}) {
  const [sent, setSent] = useState(false);
  const heading = labels?.heading?.trim() || "Enquire about";
  const blurb = labels?.blurb?.trim() || "Share your details and our team will get back to you shortly for the next steps.";
  const phone = labels?.phone?.trim() || "+91 84509 84509";
  const email = labels?.email?.trim() || "info@emaratrealty.com";
  const submitLabel = labels?.submitLabel?.trim() || "Send Enquiry";
  const interestedLabel = labels?.interestedLabel?.trim() || "Interested in";
  const nameLabel = labels?.nameLabel?.trim() || "Full Name";
  const namePlaceholder = labels?.namePlaceholder?.trim() || "Your name";
  const phoneLabel = labels?.phoneLabel?.trim() || "Phone";
  const phonePlaceholder = labels?.phonePlaceholder?.trim() || "+91 00000 00000";
  const emailLabel = labels?.emailLabel?.trim() || "Email";
  const emailPlaceholder = labels?.emailPlaceholder?.trim() || "your@email.com";
  const messageLabel = labels?.messageLabel?.trim() || "Message";
  const messagePlaceholder = labels?.messagePlaceholder?.trim() || "Tell us what you're looking for…";
  const privacy = labels?.privacy?.trim() || "By submitting you agree to our privacy policy.";

  return (
    <section
      id="enquiry"
      className="relative isolate scroll-mt-44 overflow-hidden border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-40"
    >
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[440px] w-[440px] rounded-full bg-[color:var(--accent)]/10 blur-[200px]" />

      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-10 lg:gap-16">
        <div className="col-span-12 lg:col-span-5">
          <SplitReveal as="h2" className="font-display h-section">
            {heading}
          </SplitReveal>
          <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
            {`${projectTitle.replace(/ at .*/, "")}.`}
          </SplitReveal>
          <Reveal as="p" delay={0.2} className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--muted)]">
            {blurb}
          </Reveal>

          <Reveal delay={0.3} className="mt-10 space-y-4 border-t border-[color:var(--line)] pt-8 text-sm">
            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="block transition-colors hover:text-[color:var(--accent)]">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="block transition-colors hover:text-[color:var(--accent)]">
              {email}
            </a>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <Reveal className="rounded-md border border-[color:var(--line)] bg-[color:var(--bg)]/40 p-5 sm:p-8 lg:p-10">
            {/* Static, presentational form — wire to a backend / CRM later. */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="flex flex-col gap-5"
            >
              <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                {interestedLabel} · {projectTitle}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label={nameLabel} name="name" placeholder={namePlaceholder} required />
                <Field label={phoneLabel} name="phone" type="tel" placeholder={phonePlaceholder} required />
              </div>
              <Field label={emailLabel} name="email" type="email" placeholder={emailPlaceholder} />
              <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
                <label className="block text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                  {messageLabel}
                </label>
                <textarea
                  rows={3}
                  placeholder={messagePlaceholder}
                  className="mt-2 w-full resize-none bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
                  {sent ? "Thank you — we'll be in touch shortly." : privacy}
                </p>
                <CircleButton type="submit" variant="filled">
                  {sent ? "Sent" : submitLabel}
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
