"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PortableTextBlock } from "@/lib/portableText";
import { renderPortableText, toPlainText } from "@/lib/portableText";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";
import Honeypot from "@/components/Honeypot";
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from "@/lib/antiSpam";

interface ContactData {
  heading1?: string | PortableTextBlock[];
  heading2?: string | PortableTextBlock[];
  phone?: string;
  phoneHref?: string;
  phoneHours?: string;
  email?: string;
  emailNote?: string;
  address?: string;
}
interface ContactLabels {
  eyebrow?: string | PortableTextBlock[];
  lead?: string | PortableTextBlock[];
  namePlaceholder?: string;
  phonePlaceholder?: string;
  categoryPlaceholder?: string;
  categoryOptions?: string[];
  submitLabel?: string;
  privacy?: string;
}
interface Props { data?: ContactData; labels?: ContactLabels }

/**
 * Design Option 2 — closing callback section on a cream surface.
 *
 * A centred "request a callback" block: heading, lead line and a minimal lead
 * form, all centre-aligned in a single narrow column. Contact details live in
 * the footer, so they're intentionally omitted here.
 */
export default function ContactV2({ data, labels }: Props) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const heading1 = data?.heading1 ?? "Ready to find";
  const heading2 = data?.heading2 ?? "your perfect home?";
  const eyebrow = labels?.eyebrow ?? "Get in Touch";
  const lead = labels?.lead ?? "Submit your details and one of our representatives will get back to you as soon as possible.";
  const namePlaceholder = labels?.namePlaceholder?.trim() || "Your name";
  const phonePlaceholder = labels?.phonePlaceholder?.trim() || "+91 00000 00000";
  const categoryPlaceholder = labels?.categoryPlaceholder?.trim() || "Interested in…";
  const submitLabel = labels?.submitLabel?.trim() || "Request a Callback";
  const privacy = labels?.privacy?.trim() || "By proceeding, you acknowledge and agree to our Privacy Policy. You also consent to receive updates, notifications, and promotional communications via Email, SMS, and WhatsApp.";

  return (
    <section id="contact" className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal className="eyebrow mb-4 flex items-center justify-center font-script text-2xl text-[color:var(--accent)]">
          {/* div, not span — renderPortableText emits <p>, invalid inside <span> */}
          <div>{renderPortableText(eyebrow)}</div>
        </Reveal>
        <SplitReveal as="h2" className="font-display h-page whitespace-nowrap">
          {toPlainText(heading1)}
        </SplitReveal>
        <SplitReveal as="h2" delay={0.1} className="font-display h-page whitespace-nowrap text-[color:var(--accent)]">
          {toPlainText(heading2)}
        </SplitReveal>

        <Reveal delay={0.1} className="mx-auto mt-8 max-w-md text-sm text-[color:var(--muted)]">
          {renderPortableText(lead)}
        </Reveal>

        <Reveal as="div" delay={0.15} className="mx-auto mt-12 max-w-2xl">
          <form
            className="flex flex-col gap-6 text-left"
            onSubmit={async (e) => {
              e.preventDefault();
              const target = e.currentTarget;
              const data = new FormData(target);
              setSubmitting(true);
              setError(false);
              try {
                const res = await fetch("/api/forms", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    formName: "home-callback",
                    fields: {
                      Name: data.get("name"),
                      Phone: data.get("phone"),
                      Email: data.get("email"),
                      "Enquiring as": data.get("enquiryType"),
                      "Interested in": data.get("interest"),
                      [HONEYPOT_FIELD]: data.get(HONEYPOT_FIELD),
                      [TIMESTAMP_FIELD]: data.get(TIMESTAMP_FIELD),
                    },
                  }),
                });
                if (!res.ok) throw new Error("Request failed");
                target.reset();
                router.push("/thank-you");
              } catch {
                setError(true);
                setSubmitting(false);
              }
            }}
          >
            <Honeypot />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="border-b border-[color:var(--line)] pb-3">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={namePlaceholder}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                  aria-label="Name"
                />
              </div>
              <div className="border-b border-[color:var(--line)] pb-3">
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder={phonePlaceholder}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                  aria-label="Phone"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="border-b border-[color:var(--line)] pb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                  aria-label="Email"
                />
              </div>
              <div className="border-b border-[color:var(--line)] pb-3">
                <select
                  name="enquiryType"
                  className="w-full bg-transparent text-sm text-[color:var(--muted)] outline-none"
                  aria-label="Enquiry type"
                  defaultValue=""
                >
                  <option value="" disabled>Enquiring as…</option>
                  <option value="end-user">End User / Home Buyer</option>
                  <option value="channel-partner">Channel Partner / Broker</option>
                  <option value="investor">Investor</option>
                  <option value="corporate">Corporate / Institutional</option>
                  <option value="nri">NRI Buyer</option>
                </select>
              </div>
            </div>
            <div className="border-b border-[color:var(--line)] pb-3">
              <input
                type="text"
                name="interest"
                placeholder={categoryPlaceholder}
                className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                aria-label="Project interest"
              />
            </div>
            <div className="mt-4 flex flex-col items-center gap-6">
              <label className="flex cursor-pointer items-start gap-3 text-left">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[color:var(--accent)]"
                />
                <span className="text-[12px] leading-relaxed text-[color:var(--muted)]">
                  {privacy}
                </span>
              </label>
              {error && (
                <p className="text-[12px] text-red-500">Something went wrong — please try again.</p>
              )}
              <CircleButton type="submit" variant="filled" disabled={submitting}>
                {submitting ? "Sending…" : submitLabel}
              </CircleButton>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
