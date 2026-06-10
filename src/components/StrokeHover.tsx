"use client";

import { useEffect, useRef } from "react";

/**
 * Frames any content with the same animated "stroke draws around the border on
 * hover" motion as CircleButton / the Enquire Now button — but imposes no
 * layout, so it can wrap cards, circles, anything. The SVG rect is measured
 * from the live DOM (size + border-radius), so the stroke always follows the
 * element's real shape and re-measures on resize.
 */
export default function StrokeHover({
  children,
  href,
  ariaLabel,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  ariaLabel?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLAnchorElement | null>(null);
  const rectRef = useRef<SVGRectElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const rect = rectRef.current;
    if (!wrap || !rect) return;

    const sync = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (!width || !height) return;
      const cssRadius = parseFloat(getComputedStyle(wrap).borderRadius) || 0;
      const radius = Math.min(cssRadius, Math.min(width, height) / 2);
      const inset = 0.75;
      rect.setAttribute("x", String(inset));
      rect.setAttribute("y", String(inset));
      rect.setAttribute("width", String(Math.max(0, width - inset * 2)));
      rect.setAttribute("height", String(Math.max(0, height - inset * 2)));
      rect.setAttribute("rx", String(Math.max(0, radius - inset)));
      rect.setAttribute("ry", String(Math.max(0, radius - inset)));
      requestAnimationFrame(() => {
        try {
          const len = rect.getTotalLength();
          if (len > 0) wrap.style.setProperty("--len", String(len));
        } catch {}
      });
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  return (
    <a
      ref={wrapRef}
      href={href}
      aria-label={ariaLabel}
      className={`stroke-hover group relative isolate overflow-hidden ${className}`}
    >
      {children}
      <svg className="stroke-hover__svg" aria-hidden="true">
        <rect ref={rectRef} fill="none" />
      </svg>
    </a>
  );
}
