"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Honeypot from "@/components/Honeypot";

export default function CareersApplyForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  return (
    <form
      className="mx-auto max-w-xl rounded-md border border-[color:var(--line)] bg-[color:var(--bg-alt)] p-8 lg:p-10 text-left"
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const formData = new FormData(target);
        setStatus("submitting");
        try {
          const res = await fetch("/api/careers", { method: "POST", body: formData });
          if (!res.ok) throw new Error("Request failed");
          target.reset();
          router.push("/thank-you");
        } catch {
          setStatus("error");
        }
      }}
    >
      <Honeypot />
      <div className="grid gap-6">
        <label className="block text-sm text-[color:var(--muted)]">
          <span className="font-display-alt text-base">Full name</span>
          <input
            type="text"
            name="name"
            required
            placeholder="Your full name"
            className="mt-3 w-full rounded-md border border-[color:var(--line)] bg-transparent px-4 py-3 text-[color:var(--fg)] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
          />
        </label>

        <label className="block text-sm text-[color:var(--muted)]">
          <span className="font-display-alt text-base">Email address</span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="mt-3 w-full rounded-md border border-[color:var(--line)] bg-transparent px-4 py-3 text-[color:var(--fg)] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
          />
        </label>

        <label className="block text-sm text-[color:var(--muted)]">
          <span className="font-display-alt text-base">Phone number</span>
          <input
            type="tel"
            name="phone"
            placeholder="+91 12345 67890"
            className="mt-3 w-full rounded-md border border-[color:var(--line)] bg-transparent px-4 py-3 text-[color:var(--fg)] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
          />
        </label>

        <label className="block text-sm text-[color:var(--muted)]">
          <span className="font-display-alt text-base">Position / department</span>
          <input
            type="text"
            name="position"
            placeholder="Role or department you are applying for"
            className="mt-3 w-full rounded-md border border-[color:var(--line)] bg-transparent px-4 py-3 text-[color:var(--fg)] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
          />
        </label>

        <label className="block text-sm text-[color:var(--muted)]">
          <span className="font-display-alt text-base">Upload resume</span>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            className="mt-3 w-full rounded-md border border-[color:var(--line)] bg-transparent px-4 py-3 text-[color:var(--fg)] outline-none"
          />
        </label>

        <label className="block text-sm text-[color:var(--muted)]">
          <span className="font-display-alt text-base">Message</span>
          <textarea
            name="message"
            rows={5}
            placeholder="Tell us about your experience and what excites you about this role."
            className="mt-3 w-full rounded-md border border-[color:var(--line)] bg-transparent px-4 py-3 text-[color:var(--fg)] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent)] px-8 py-3 text-sm uppercase tracking-[0.24em] text-[color:var(--bg)] transition-colors hover:bg-[color:var(--accent)]/90 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit Application"}
      </button>
      {status === "error" && (
        <p className="mt-4 text-center text-sm text-red-500">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
