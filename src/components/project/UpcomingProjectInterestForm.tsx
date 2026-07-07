"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CircleButton from "@/components/CircleButton";

export default function UpcomingProjectInterestForm({ projectTitle }: { projectTitle: string }) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="flex flex-col gap-8"
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
              formName: "upcoming-project-interest",
              fields: {
                Project: projectTitle,
                Name: data.get("name"),
                Phone: data.get("phone"),
                Email: data.get("email"),
                "Enquiring as": data.get("enquiryType"),
                Message: data.get("message"),
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
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="border-b border-[color:var(--line)] pb-3">
          <input
            type="text"
            name="name"
            required
            placeholder="Full name"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
            aria-label="Name"
          />
        </div>
        <div className="border-b border-[color:var(--line)] pb-3">
          <input
            type="tel"
            name="phone"
            required
            placeholder="+91 00000 00000"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
            aria-label="Phone"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
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
            defaultValue=""
            className="w-full bg-transparent text-sm text-[color:var(--muted)] outline-none"
            aria-label="Enquiry type"
          >
            <option value="" disabled>Enquiring as…</option>
            <option value="end-user">End User / Home Buyer</option>
            <option value="channel-partner">Channel Partner / Broker</option>
            <option value="investor">Investor</option>
            <option value="nri">NRI Buyer</option>
          </select>
        </div>
      </div>
      <div className="border-b border-[color:var(--line)] pb-3">
        <textarea
          name="message"
          placeholder="Tell us what you're looking for…"
          rows={3}
          className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
          aria-label="Message"
        />
      </div>
      <div className="flex flex-col items-start gap-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[color:var(--accent)]"
          />
          <span className="text-[12px] leading-relaxed text-[color:var(--muted)]">
            By proceeding, you acknowledge and agree to our Privacy Policy. You also consent to receive updates, notifications, and promotional communications via Email, SMS, and WhatsApp.
          </span>
        </label>
        {error && (
          <p className="text-[12px] text-red-500">Something went wrong — please try again.</p>
        )}
        <CircleButton type="submit" variant="filled" disabled={submitting}>
          {submitting ? "Sending…" : "Submit"}
        </CircleButton>
      </div>
    </form>
  );
}
