"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import CircleButton from "@/components/CircleButton";

export default function ContactForm({
  form,
}: {
  form: {
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    consent: string;
    privacy: string;
    submitLabel: string;
  };
}) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  return (
    <Reveal
      as="form"
      delay={0.2}
      className="mt-12 flex flex-col gap-5"
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
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
              formName: "contact",
              fields: {
                Name: data.get("name"),
                Phone: data.get("phone"),
                Email: data.get("email"),
                Subject: data.get("subject"),
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
          <label className="block text-[0.625rem] uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {form.nameLabel}
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder={form.namePlaceholder}
            className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
          />
        </div>
        <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
          <label className="block text-[0.625rem] uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {form.phoneLabel}
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder={form.phonePlaceholder}
            className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
          <label className="block text-[0.625rem] uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {form.emailLabel}
          </label>
          <input
            type="email"
            name="email"
            placeholder={form.emailPlaceholder}
            className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
          />
        </div>
        <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
          <label className="block text-[0.625rem] uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {form.subjectLabel}
          </label>
          <input
            type="text"
            name="subject"
            placeholder={form.subjectPlaceholder}
            className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
          />
        </div>
      </div>

      <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
        <label className="block text-[0.625rem] uppercase tracking-[0.22em] text-[color:var(--muted)]">
          {form.messageLabel}
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder={form.messagePlaceholder}
          className="mt-2 w-full resize-none bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-xs text-[color:var(--muted)]">
        <input type="checkbox" defaultChecked className="mt-0.5 h-3.5 w-3.5 accent-[color:var(--accent)]" />
        <span>{form.consent}</span>
      </label>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[12px] text-[color:var(--muted)]">
          {error ? "Something went wrong — please try again." : form.privacy}
        </p>
        <CircleButton type="submit" variant="filled" disabled={submitting}>
          {submitting ? "Sending…" : form.submitLabel}
        </CircleButton>
      </div>
    </Reveal>
  );
}
