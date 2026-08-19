"use client";

import { useState } from "react";
import Image from "@/components/Image";

interface Props {
  label: string;
  src: string;
  href: string;
}

/* One icon card on /signature-icons — shows the badge, its direct image
   URL (for pasting into an email signature's <img src>) and the real
   destination link, with a one-click copy for each. */
export default function SignatureIconCard({ label, src, href }: Props) {
  const [copied, setCopied] = useState<"image" | "link" | null>(null);

  const copy = async (value: string, which: "image" | "link") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  const absoluteSrc = typeof window !== "undefined" ? new URL(src, window.location.origin).toString() : src;

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-[color:var(--line)] p-6 text-center">
      <Image src={src} alt={label} width={64} height={64} className="h-16 w-16" />
      <div className="text-sm font-medium">{label}</div>

      <div className="flex w-full flex-col gap-2">
        <button
          type="button"
          onClick={() => copy(absoluteSrc, "image")}
          className="rounded-full border border-[color:var(--line)] px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
        >
          {copied === "image" ? "Copied!" : "Copy Image URL"}
        </button>
        <button
          type="button"
          onClick={() => copy(href, "link")}
          className="rounded-full border border-[color:var(--line)] px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
        >
          {copied === "link" ? "Copied!" : "Copy Link URL"}
        </button>
      </div>
    </div>
  );
}
