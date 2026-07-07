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
  disabled?: boolean;
};

/**
 * Button with an SVG stroke that draws itself around the button border on hover.
 *
 * The outline shape automatically follows the button's actual `border-radius` —
 * change the className from `rounded-full` to `rounded-md`, `rounded-none`,
 * `rounded-3xl` etc. and the stroke will redraw to match without any extra
 * configuration. Width, height and corner radius are measured from the live
 * DOM, then re-measured via ResizeObserver whenever the button changes size.
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
  disabled = false,
}: Props) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const rectRef = useRef<SVGRectElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const rect = rectRef.current;
    if (!wrap || !rect) return;

    const sync = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (!width || !height) return;

      // Read the button's actual CSS border-radius. Caps at half the smaller
      // dimension so border-radius:9999px (pill) renders correctly.
      const cssRadius = parseFloat(getComputedStyle(wrap).borderRadius) || 0;
      const maxRadius = Math.min(width, height) / 2;
      const radius = Math.min(cssRadius, maxRadius);

      // Inset by half a stroke-width so the painted line sits flush on the
      // button's visible border rather than overdrawing outside it.
      const inset = 0.5;
      const w = Math.max(0, width - inset * 2);
      const h = Math.max(0, height - inset * 2);
      const r = Math.max(0, radius - inset);

      rect.setAttribute("x", String(inset));
      rect.setAttribute("y", String(inset));
      rect.setAttribute("width", String(w));
      rect.setAttribute("height", String(h));
      rect.setAttribute("rx", String(r));
      rect.setAttribute("ry", String(r));

      // Defer so getTotalLength reflects the new attributes
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

  const sizeCls =
    size === "sm"
      ? "h-10 px-5 text-[0.6875rem] tracking-[0.18em]"
      : "h-12 px-7 text-xs tracking-[0.2em]";

  const variantCls =
    variant === "filled"
      ? "link-hover--filled text-[color:var(--bg)]"
      : "text-[color:var(--fg)]";

  const inner = (
    <>
      <svg className="link-hover__circle" aria-hidden="true">
        <rect ref={rectRef} fill="none" />
      </svg>
      <span className="relative z-10 uppercase">{children}</span>
    </>
  );

  const cls = `link-hover relative inline-flex items-center justify-center gap-2 rounded-full transition-colors ${sizeCls} ${variantCls} ${disabled ? "pointer-events-none opacity-60" : ""} ${className}`;

  if (href) {
    return (
      <a ref={wrapRef as React.Ref<HTMLAnchorElement>} href={href} target={target} className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <button ref={wrapRef as React.Ref<HTMLButtonElement>} type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}
