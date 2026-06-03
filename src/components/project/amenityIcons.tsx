import type { AmenityIcon } from "@/lib/projects";

/* Minimal stroke icons (currentColor) for the amenities grid. */
const C = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const amenityIcons: Record<AmenityIcon, React.ReactNode> = {
  clubhouse: (
    <svg viewBox="0 0 24 24" {...C}><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" /></svg>
  ),
  pool: (
    <svg viewBox="0 0 24 24" {...C}><path d="M3 18c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1M8 14V6a2 2 0 0 1 4 0M8 10h4" /></svg>
  ),
  gym: (
    <svg viewBox="0 0 24 24" {...C}><path d="M6.5 6.5l11 11M4 9l2-2m11 11l2-2M3 12l2 2 2-2-2-2zM17 12l2 2 2-2-2-2z" /></svg>
  ),
  garden: (
    <svg viewBox="0 0 24 24" {...C}><path d="M12 21v-7m0 0c-3 0-5-2-5-5 3 0 5 2 5 5zm0 0c0-3 2-5 5-5 0 3-2 5-5 5z" /></svg>
  ),
  security: (
    <svg viewBox="0 0 24 24" {...C}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /></svg>
  ),
  parking: (
    <svg viewBox="0 0 24 24" {...C}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 17V8h3.5a2.5 2.5 0 0 1 0 5H9" /></svg>
  ),
  power: (
    <svg viewBox="0 0 24 24" {...C}><path d="M13 3l-7 10h5l-1 8 7-10h-5z" /></svg>
  ),
  concierge: (
    <svg viewBox="0 0 24 24" {...C}><path d="M4 18h16M5 18a7 7 0 0 1 14 0M12 8v3M9 5h6" /></svg>
  ),
  kids: (
    <svg viewBox="0 0 24 24" {...C}><circle cx="12" cy="5" r="2" /><path d="M12 7v6m0 0l-3 5m3-5l3 5M7 10h10" /></svg>
  ),
  sports: (
    <svg viewBox="0 0 24 24" {...C}><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 0 0 18M3 12h18" /></svg>
  ),
  cafe: (
    <svg viewBox="0 0 24 24" {...C}><path d="M4 8h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM17 9h2a2 2 0 0 1 0 4h-2M6 3v2M10 3v2M14 3v2" /></svg>
  ),
  spa: (
    <svg viewBox="0 0 24 24" {...C}><path d="M12 13c0-4 3-7 3-7s3 3 3 7M12 13c0-4-3-7-3-7S6 9 6 13M4 14c4 0 8 3 8 7 4-4 8-7 8-7" /></svg>
  ),
  lift: (
    <svg viewBox="0 0 24 24" {...C}><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M12 3v18M9 8l1.5-2L12 8M12 16l1.5 2L15 16" /></svg>
  ),
  retail: (
    <svg viewBox="0 0 24 24" {...C}><path d="M4 9h16l-1 11H5zM4 9l1.5-5h13L20 9M9 13a3 3 0 0 0 6 0" /></svg>
  ),
  balcony: (
    <svg viewBox="0 0 24 24" {...C}><path d="M3 21h18M5 21v-7h14v7M5 14V9h14v5M8 14v7M12 14v7M16 14v7M9 9V4h6v5" /></svg>
  ),
  kitchen: (
    <svg viewBox="0 0 24 24" {...C}><rect x="4" y="4" width="16" height="16" rx="2" /><circle cx="9" cy="9" r="1.6" /><circle cx="15" cy="9" r="1.6" /><path d="M7 14h10" /></svg>
  ),
  wardrobe: (
    <svg viewBox="0 0 24 24" {...C}><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M12 3v18M10 10h.5M14 10h-.5" /></svg>
  ),
  ev: (
    <svg viewBox="0 0 24 24" {...C}><rect x="5" y="4" width="11" height="16" rx="1.5" /><path d="M16 9h2.5a1.5 1.5 0 0 1 1.5 1.5V15a1.5 1.5 0 0 1-3 0M11 8l-2 3.5h3L10 15" /></svg>
  ),
  ac: (
    <svg viewBox="0 0 24 24" {...C}><rect x="3" y="5" width="18" height="8" rx="2" /><path d="M6 9h9M7 17c1.5 0 1.5-1.5 0-1.5M11 18c1.5 0 1.5-1.5 0-1.5M15 17c1.5 0 1.5-1.5 0-1.5" /></svg>
  ),
  vastu: (
    <svg viewBox="0 0 24 24" {...C}><circle cx="12" cy="12" r="9" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M14.5 9.5l-2 5-2.5 2 2-5z" /></svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" {...C}><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" /></svg>
  ),
  family: (
    <svg viewBox="0 0 24 24" {...C}><circle cx="8" cy="7" r="2.2" /><circle cx="16" cy="7" r="2.2" /><path d="M3.5 20v-1a4.5 4.5 0 0 1 9 0v1M11.5 20v-1a4.5 4.5 0 0 1 9 0v1" /></svg>
  ),
};
