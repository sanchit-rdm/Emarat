"use client";

import { useState } from "react";
import Honeypot from "@/components/Honeypot";
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from "@/lib/antiSpam";

export default function NewsletterForm({
  placeholder,
  buttonLabel,
}: {
  placeholder: string;
  buttonLabel: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  if (status === "sent") {
    return <p className="py-2 text-sm text-[color:var(--accent)]">Thanks for subscribing.</p>;
  }

  return (
    <form
      className="flex items-center border-b border-[color:var(--line)] py-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const data = new FormData(target);
        setStatus("submitting");
        try {
          const res = await fetch("/api/forms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              formName: "newsletter-signup",
              fields: {
                Email: data.get("email"),
                [HONEYPOT_FIELD]: data.get(HONEYPOT_FIELD),
                [TIMESTAMP_FIELD]: data.get(TIMESTAMP_FIELD),
              },
            }),
          });
          if (!res.ok) throw new Error("Request failed");
          setStatus("sent");
        } catch {
          setStatus("error");
        }
      }}
    >
      <Honeypot />
      <input
        type="email"
        name="email"
        required
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
        aria-label="Email"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="text-xs uppercase tracking-[0.18em] text-[color:var(--accent)] transition-colors hover:text-[color:var(--fg)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : status === "error" ? "Try again" : buttonLabel}
      </button>
    </form>
  );
}
