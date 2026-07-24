"use client";

import { useState } from "react";
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from "@/lib/antiSpam";

/**
 * Anti-spam trap for public forms: a hidden field bots that blindly fill every
 * input will populate, plus a render timestamp real users can't beat. Drop
 * this inside every `<form>` and forward both fields to the submit payload.
 */
export default function Honeypot() {
  const [renderedAt] = useState(() => Date.now());
  return (
    <>
      <input type="hidden" name={TIMESTAMP_FIELD} value={renderedAt} readOnly />
      <input
        type="text"
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
      />
    </>
  );
}
