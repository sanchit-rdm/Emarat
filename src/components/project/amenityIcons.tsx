import type { AmenityIcon } from "@/lib/projects";

const I = (src: string) => (
  <span
    aria-hidden
    className="block h-full w-full"
    style={{
      backgroundColor: "#01472E",
      WebkitMaskImage: `url("${src}")`,
      maskImage: `url("${src}")`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
    }}
  />
);

/* Fallback stroke icons for amenities without a file asset. */
const C = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const amenityIcons: Record<AmenityIcon, React.ReactNode> = {
  clubhouse: I("/Icons/DLF Club House.svg"),
  pool: (
    <svg viewBox="0 0 24 24" {...C}><path d="M3 18c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1M8 14V6a2 2 0 0 1 4 0M8 10h4" /></svg>
  ),
  gym: (
    <svg viewBox="0 0 24 24" {...C}><path d="M6.5 6.5l11 11M4 9l2-2m11 11l2-2M3 12l2 2 2-2-2-2zM17 12l2 2 2-2-2-2z" /></svg>
  ),
  garden: I("/Icons/Large Open Spaces.svg"),
  security: I("/Icons/Two Side Open and 247 Security.svg"),
  parking: I("/Icons/Adajcent car parking Bays.svg"),
  power: I("/Icons/Power Backup.svg"),
  concierge: I("/Icons/Arrival Experience.svg"),
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
  lift: I("/Icons/Dual High Speed Elevator.svg"),
  retail: I("/Icons/Community Shoping.svg"),
  balcony: I("/Icons/Wrap Around Balconies.svg"),
  kitchen: I("/Icons/Moduler Kitchen With HOB Chimney Microwave & Oven.svg"),
  wardrobe: I("/Icons/Walk in Bardrobes.svg"),
  ev: I("/Icons/Electric Car Charging Provision.svg"),
  ac: I("/Icons/All Season VRVVRF Air Conditioning.svg"),
  vastu: I("/Icons/Vastu Compliant.svg"),
  lock: I("/Icons/Digital Secure Door Lock.svg"),
  family: I("/Icons/Dedicated Guest and Family Space.svg"),
  yoga: (
    <svg viewBox="0 0 24 24" {...C}><circle cx="12" cy="4" r="1.5" /><path d="M8 10c1 1.5 2.5 2.5 4 2.5s3-1 4-2.5M8 10l-2 7M16 10l2 7M7 17h10M10 8v2M14 8v2" /></svg>
  ),
  jogging: (
    <svg viewBox="0 0 24 24" {...C}><circle cx="15" cy="4" r="2" /><path d="M13 8l-3 4-2 4M13 8l3 3 2 3M10 12l-2 5M16 11l1 5M7 21l3-4M18 19l-2-3" /></svg>
  ),
  tennis: (
    <svg viewBox="0 0 24 24" {...C}><circle cx="11" cy="10" r="7" /><path d="M5 5c1 2 1 8 0 10M17 5c-1 2-1 8 0 10M16 18l4 4" /></svg>
  ),
  squash: (
    <svg viewBox="0 0 24 24" {...C}><ellipse cx="10" cy="10" rx="6" ry="7" /><path d="M15 16l4 4" /><circle cx="19" cy="7" r="1.5" /></svg>
  ),
  library: (
    <svg viewBox="0 0 24 24" {...C}><path d="M4 4h3v16H4zM9 5h3v15H9zM14 7h3v13h-3z" /><path d="M4 20h16" /></svg>
  ),
  lounge: (
    <svg viewBox="0 0 24 24" {...C}><path d="M2 11a2 2 0 0 1 4 0v2H2v-2zM18 11a2 2 0 0 1 4 0v2h-4v-2zM6 13h12v4H6zM4 17h16M6 17v3M18 17v3" /></svg>
  ),
  amphitheatre: (
    <svg viewBox="0 0 24 24" {...C}><path d="M3 20a9 9 0 0 1 18 0M6 20a6 6 0 0 1 12 0M9 20a3 3 0 0 1 6 0" /></svg>
  ),
  bbq: (
    <svg viewBox="0 0 24 24" {...C}><path d="M5 3h14M8 3l-4 8h16l-4-8M12 11v7M8 18h8M6 6l1 1M12 5v2M17 6l-1 1" /></svg>
  ),
  sauna: (
    <svg viewBox="0 0 24 24" {...C}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M7 11V8M12 11V5M17 11V8" /></svg>
  ),
  jacuzzi: (
    <svg viewBox="0 0 24 24" {...C}><path d="M4 15a8 8 0 0 1 16 0v6H4v-6z" /><circle cx="8" cy="11" r="1" /><circle cx="12" cy="9" r="1" /><circle cx="16" cy="11" r="1" /></svg>
  ),
  golf: (
    <svg viewBox="0 0 24 24" {...C}><path d="M12 21V4M12 4l5 3-5 3" /><path d="M4 21c2-2 4-3 8-3s6 1 8 3" /></svg>
  ),
  cycling: (
    <svg viewBox="0 0 24 24" {...C}><circle cx="6" cy="16" r="4" /><circle cx="18" cy="16" r="4" /><path d="M6 16l4-9h4M14 7l4 9M10 12h4" /></svg>
  ),
  basketball: (
    <svg viewBox="0 0 24 24" {...C}><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18M6.3 6.3c2 2 3.7 5 3.7 5.7M17.7 6.3c-2 2-3.7 5-3.7 5.7M6.3 17.7c2-2 3.7-5 3.7-5.7M17.7 17.7c-2-2-3.7-5-3.7-5.7" /></svg>
  ),
  indoor: (
    <svg viewBox="0 0 24 24" {...C}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M3 14h18M8 6v12M16 6v12" /></svg>
  ),
  meditation: (
    <svg viewBox="0 0 24 24" {...C}><circle cx="12" cy="5" r="2" /><path d="M8 12c0-2 1.5-4 4-4s4 2 4 4M6 17c1.5-2 3.5-3 6-3s4.5 1 6 3M3 21h18" /></svg>
  ),
  rooftop: (
    <svg viewBox="0 0 24 24" {...C}><path d="M3 21h18M5 21v-6h14v6M5 15v-3l7-6 7 6v3M9 21v-5h6v5" /></svg>
  ),
  theatre: (
    <svg viewBox="0 0 24 24" {...C}><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M7 20h10M9 17v3M15 17v3" /></svg>
  ),
  study: (
    <svg viewBox="0 0 24 24" {...C}><path d="M4 20h16M4 20V8h16v12M9 8V5h6v3M7 12h10M7 16h6" /></svg>
  ),
  laundry: (
    <svg viewBox="0 0 24 24" {...C}><rect x="4" y="3" width="16" height="18" rx="2" /><circle cx="12" cy="13" r="4" /><path d="M7 7h2M14 7h3" /></svg>
  ),
  wifi: (
    <svg viewBox="0 0 24 24" {...C}><path d="M1.5 9C6 4.5 18 4.5 22.5 9M5 13c2-2 7-5 14 0M9 17c1-1 2-1.5 3-1.5s2 .5 3 1.5" /><circle cx="12" cy="20" r="1.5" /></svg>
  ),
  cctv: I("/Icons/Integrated Security Monitoring.svg"),
  intercom: (
    <svg viewBox="0 0 24 24" {...C}><rect x="8" y="3" width="8" height="18" rx="2" /><circle cx="12" cy="7" r="1.5" /><path d="M10 11h4M10 14h4M10 17h2" /></svg>
  ),
  water: (
    <svg viewBox="0 0 24 24" {...C}><path d="M12 3C9 8 5 11 5 15a7 7 0 0 0 14 0c0-4-4-7-7-12z" /></svg>
  ),
  rainwater: I("/Icons/Storm Water Drains.svg"),
  solar: (
    <svg viewBox="0 0 24 24" {...C}><rect x="2" y="12" width="9" height="7" rx="1" /><rect x="13" y="12" width="9" height="7" rx="1" /><path d="M12 3v6M9 5l3 4 3-4M6 12L2 7M18 12l4-5" /></svg>
  ),
  pet: (
    <svg viewBox="0 0 24 24" {...C}><circle cx="12" cy="14" r="4" /><circle cx="7" cy="8" r="1.5" /><circle cx="17" cy="8" r="1.5" /><circle cx="5" cy="13" r="1.5" /><circle cx="19" cy="13" r="1.5" /></svg>
  ),
  banquet: (
    <svg viewBox="0 0 24 24" {...C}><path d="M2 7h20M4 7v10h16V7M8 7V5h8v2M7 11h10M7 15h10" /></svg>
  ),
  business: (
    <svg viewBox="0 0 24 24" {...C}><rect x="2" y="8" width="20" height="13" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 14h20M12 14v4" /></svg>
  ),
  fire: (
    <svg viewBox="0 0 24 24" {...C}><path d="M12 22c4.5 0 7-2.5 7-6 0-3-2-5-4-6 1 2 0 4-1.5 4.5 0-3-2-5.5-3.5-7.5C9 10 7 12 7 15c-1.5-1-1.5-3-1-4.5C4 12 5 22 12 22z" /></svg>
  ),
  fountain: (
    <svg viewBox="0 0 24 24" {...C}><path d="M12 3v6M9 5c0 2.5 1.5 4 3 4s3-1.5 3-4M6 9c0 4 2.5 6 6 6s6-2 6-6M4 21c1-2 4-4 8-4s7 2 8 4M12 15v2" /></svg>
  ),
  threeSideOpen: I("/Icons/Three Side Open.svg"),
  rearpark: I("/Icons/Rear Park Access.svg"),
  domesticHelp: I("/Icons/Domestic Help Room.svg"),
  staffWashroom: I("/Icons/Dedicated Staff Washroom.svg"),
  dlfGated: I("/Icons/DFL Gated Community.svg"),
};
