"use client";

import { useEffect, useRef } from "react";

type Variant = "outline" | "filled";

type Props = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
  target?: string;
};

/**
 * Button with an SVG rounded-rect stroke that "draws" itself on hover —
 * mirrors the `link-hover` effect on vp.moscow. The rect uses stroke-dashoffset
 * animated from the rect's perimeter to 0.
 */
export default function CircleButton({
  children,
  href,
  type = "button",
  onClick,
  variant = "outline",
  size = "md",
  className = "",
  target,
}: Props) {
  const rectRef = useRef<SVGRectElement | null>(null);

  // Measure the rect path length so the stroke-dashoffset trick works
  // regardless of button width.
  useEffect(() => {
    const r = rectRef.current;
    if (!r) return;
    const set = () => {
      try {
        const len = r.getTotalLength();
        if (len > 0) {
          r.parentElement?.style.setProperty("--len", String(len));
          // also set on the link-hover wrapper (great-grandparent)
          const wrap = r.closest(".link-hover") as HTMLElement | null;
          if (wrap) wrap.style.setProperty("--len", String(len));
        }
      } catch {}
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(r);
    return () => ro.disconnect();
  }, []);

  const sizeCls =
    size === "sm"
      ? "h-10 px-5 text-[11px] tracking-[0.18em]"
      : "h-12 px-7 text-xs tracking-[0.2em]";

  const variantCls =
    variant === "filled"
      ? "link-hover--filled text-[color:var(--bg)]"
      : "text-[color:var(--fg)]";

  const inner = (
    <>
      <svg
        className="link-hover__circle"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect ref={rectRef} x="0.75" y="0.75" width="calc(100% - 1.5px)" height="calc(100% - 1.5px)" />
      </svg>
      <span className="relative z-10 uppercase">{children}</span>
    </>
  );

  const cls = `link-hover group relative inline-flex items-center justify-center gap-2 rounded-full transition-colors ${sizeCls} ${variantCls} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
