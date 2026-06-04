/* ----------------------------------------------------------------------------
   Project content model + data.

   Drives the dynamic project detail pages at /projects/[slug]. Content is drawn
   from the official Emarat project brochures (public/emarat pdf/*). All four are
   Spanish-inspired independent / private floors. Distances and saleable areas
   are not published in the brochures, so floor plans carry real material
   specifications and connectivity is grouped by category (as in the brochures)
   rather than fabricated drive-times. Images reuse the compressed
   /public/images set — swap per-project renders / plans in later.
---------------------------------------------------------------------------- */

export type AmenityIcon =
  | "clubhouse"
  | "pool"
  | "gym"
  | "garden"
  | "security"
  | "parking"
  | "power"
  | "concierge"
  | "kids"
  | "sports"
  | "cafe"
  | "spa"
  | "lift"
  | "retail"
  | "balcony"
  | "kitchen"
  | "wardrobe"
  | "ev"
  | "ac"
  | "vastu"
  | "lock"
  | "family";

export type Amenity = { name: string; icon: AmenityIcon };

export type Spec = { label: string; value: string };

export type FloorPlan = {
  id: string;
  label: string;
  config: string;
  image: string;
  specs: Spec[];
};

export type LandmarkGroup = { category: string; items: string[] };

export type GalleryImage = { src: string; label: string };

export type Stat = { label: string; value: string };

export type Project = {
  slug: string;
  no: string;
  title: string;
  shortName: string;
  tagline: string;
  location: string;
  status: string;
  config: string;
  size: string;
  possession: string;
  rera: string;
  heroImage: string;
  overviewImage: string;
  overview: string[];
  stats: Stat[];
  amenities: Amenity[];
  floorPlans: FloorPlan[];
  gallery: GalleryImage[];
  connectivity: LandmarkGroup[];
  mapQuery: string;
  highlights: string[];
};

/* Shared, brochure-accurate floor finishes. The three floor types (Stilt /
   Typical residence / Terrace) are common across all four developments. */
function stiltFloor(image: string): FloorPlan {
  return {
    id: "stilt",
    label: "Stilt Floor",
    config: "Covered parking, services & EV-charging provision.",
    image,
    specs: [
      { label: "Flooring", value: "Vitrified Tiles" },
      { label: "Walls", value: "Texture Paint" },
      { label: "Ceiling", value: "Exposed Soffit" },
      { label: "Provision", value: "EV Charging" },
    ],
  };
}

function terraceFloor(image: string): FloorPlan {
  return {
    id: "terrace",
    label: "Terrace Floor",
    config: "Private terrace with sky-garden potential.",
    image,
    specs: [
      { label: "Flooring", value: "Granite / Marble" },
      { label: "Railing", value: "Frameless Glass" },
      { label: "Walls", value: "OBD Finish" },
      { label: "Access", value: "Private Staircase" },
    ],
  };
}

function typicalFloor(config: string, image: string): FloorPlan {
  return {
    id: "typical",
    label: "Typical Floor",
    config,
    image,
    specs: [
      { label: "Living & Dining", value: "Italian Marble" },
      { label: "Bedrooms", value: "Engineered Wood" },
      { label: "Kitchen", value: "Quartz Counter" },
      { label: "Toilets", value: "Anti-Skid Tiles" },
    ],
  };
}

/* Shared connectivity for the three DLF Garden City developments. */
const dlfGardenCityConnectivity: LandmarkGroup[] = [
  { category: "Connectivity", items: ["Dwarka Expressway", "NH-48"] },
  { category: "Retail", items: ["Saphire Mall", "Elan Miracle", "32nd Avenue"] },
  { category: "Growth Corridor", items: ["Manesar Golf Course", "Nakhrola Stadium", "Eros Corporate Park"] },
  { category: "Universities", items: ["Gurugram University", "The NorthCap University", "Sushant University"] },
  { category: "Schools", items: ["St. Xavier's High School", "Basant Valley School", "Rao Bharat Singh Intl. School"] },
  { category: "Healthcare", items: ["Aarvy Healthcare", "Silver Streak Hospital", "Medanta Hospital"] },
];

export const projects: Project[] = [
  {
    slug: "c2",
    no: "01",
    title: "C2 at DLF Garden City",
    shortName: "C2",
    tagline: "Independent Floors in New Gurugram",
    location: "DLF Garden City, Sector 93, Gurugram",
    status: "Now Selling",
    config: "5 BHK Independent Floors",
    size: "G+4 · 5 BHK",
    possession: "On Request",
    rera: "HARERA Registered",
    heroImage: "/images/C-2/building.jpg",
    overviewImage: "/images/C-2/c2-living-dining-interior-view-02-approved-r0-20240122.jpg",
    overview: [
      "C2, DLF Garden City by Emarat Realty offers thoughtfully designed independent floors in a well-established and rapidly evolving residential community in Gurugram. The project is crafted with a focus on spacious layouts, modern architecture, and everyday comfort suited for contemporary luxury living. It enjoys excellent connectivity to Dwarka Expressway, NH-48, leading schools, hospitals, retail destinations, and key business hubs, ensuring daily convenience.",
      "With well-planned interiors, specifications and essential lifestyle amenities, C2 balances privacy, luxury and modern comfort. It is an ideal choice for those seeking a well-connected, peaceful and smartly designed ambiance within a well-developed neighbourhood.",
    ],
    stats: [
      { label: "Built Form", value: "S+4" },
      { label: "Independent Floors", value: "5BHK" },
      { label: "Gated Community", value: "DLF" },
      { label: "Security", value: "24x7" },
    ],
    amenities: [
      { name: "Wrap-around Balconies", icon: "balcony" },
      { name: "Modular Kitchen", icon: "kitchen" },
      { name: "Walk-in Wardrobes", icon: "wardrobe" },
      { name: "Dedicated Puja Room", icon: "spa" },
      { name: "Guest & Family Lounge", icon: "family" },
      { name: "High-Speed Elevator", icon: "lift" },
      { name: "EV Charging Provision", icon: "ev" },
      { name: "Adjacent Car Parking", icon: "parking" },
      { name: "DLF Club House", icon: "clubhouse" },
      { name: "Park-Facing Greens", icon: "garden" },
      { name: "100% Power Backup", icon: "power" },
      { name: "VRV / VRF Air Conditioning", icon: "ac" },
    ],
    floorPlans: [
      stiltFloor("/images/C-2/dlfgc-rear-3d-view-initial-design-20250307.jpg"),
      typicalFloor("Spanish-inspired 5 BHK residence per floor.", "/images/C-2/c2-living-dining-interior-view-01-approved-r0-20240122.jpg"),
      terraceFloor("/images/C-2/c2-master-bedroom-interior-view-02-20250201.jpg"),
    ],
    gallery: [
      { src: "/images/C-2/c2-living-interior-view-approved-r0-20240122.jpg", label: "Living Room" },
      { src: "/images/C-2/c2-living-dining-interior-view-01-approved-r0-20240122.jpg", label: "Living & Dining" },
      { src: "/images/C-2/c2-dining-interior-view-approved-r0-20240122.jpg", label: "Dining Room" },
      { src: "/images/C-2/c2-kitchen-interior-view-r0-20240129.jpg", label: "Kitchen" },
      { src: "/images/C-2/c2-family-lounge-interior-view-r0-20240129.jpg", label: "Family Lounge" },
      { src: "/images/C-2/c2-master-bedroom-interior-view-01-20250201.jpg", label: "Master Bedroom" },
    ],
    connectivity: dlfGardenCityConnectivity,
    mapQuery: "DLF Garden City Sector 93 Gurugram",
    highlights: [],
  },
  {
    slug: "c5",
    no: "02",
    title: "C5 at DLF Garden City",
    shortName: "C5",
    tagline: "Own the Red Diamond of Gurugram.",
    location: "DLF Garden City, Sector 93, Gurugram",
    status: "Now Selling",
    config: "Independent Floors",
    size: "G+4 Independent Floors",
    possession: "On Request",
    rera: "HARERA Registered",
    heroImage: "/images/C-5/building.jpg",
    overviewImage: "/images/C-5/c-5-11-double-height.jpg",
    overview: [
      "C5 at DLF Garden City is a collection of independent floors designed to invite light in and open life out — the Red Diamond of Gurugram. Crafted for those who see more and seek more, each home is an interplay of height, light and architectural drama.",
      "From the double-height Vertical Majesty to the Garden in the Sky terrace, every space is composed with Italian marble, quartz and frameless glass. A sanctuary of green brilliance within the prestigious DLF gated community, moments from Gurugram's beating heart.",
    ],
    stats: [
      { label: "Built Form", value: "G+4" },
      { label: "Per Floor", value: "1 Home" },
      { label: "Terrace", value: "Sky-Garden" },
      { label: "Community", value: "DLF Gated" },
    ],
    amenities: [
      { name: "Wrap-around Balconies", icon: "balcony" },
      { name: "Modular Kitchen", icon: "kitchen" },
      { name: "Walk-in Wardrobes", icon: "wardrobe" },
      { name: "Guest & Family Space", icon: "family" },
      { name: "High-Speed Elevator", icon: "lift" },
      { name: "EV Charging Provision", icon: "ev" },
      { name: "Adjacent Car Parking", icon: "parking" },
      { name: "DLF Club House", icon: "clubhouse" },
      { name: "Park Facing", icon: "garden" },
      { name: "VRV / VRF Air Conditioning", icon: "ac" },
      { name: "Digital Secure Lock", icon: "lock" },
      { name: "Vastu Compliant", icon: "vastu" },
    ],
    floorPlans: [
      stiltFloor("/images/C-5/c-5-11-stilt.jpg"),
      typicalFloor("Full-floor independent residence.", "/images/C-5/c-5-11-double-height.jpg"),
      terraceFloor("/images/C-5/c5-left-side-image-2026-03-06-at-2-44-10-pm.jpg"),
    ],
    gallery: [
      { src: "/images/C-5/c-5-11-double-height.jpg", label: "Double Height Living" },
      { src: "/images/C-5/c-5-11-dnd.jpg", label: "Dining" },
      { src: "/images/C-5/c-5-11-kitchen.jpg", label: "Kitchen" },
      { src: "/images/C-5/c-5-11-bedroom-1.jpg", label: "Bedroom" },
      { src: "/images/C-5/c-5-11-family-lounge.jpg", label: "Family Lounge" },
      { src: "/images/C-5/c-5-11-passage.jpg", label: "Passage" },
    ],
    connectivity: dlfGardenCityConnectivity,
    mapQuery: "DLF Garden City Sector 93 Gurugram",
    highlights: ["The Red Diamond of Gurugram", "Garden in the Sky terrace", "Double-height living", "Italian marble flooring"],
  },
  {
    slug: "e11",
    no: "03",
    title: "E11 at DLF Garden City",
    shortName: "E11",
    tagline: "A home that doesn't just hold your story — it reflects how it was written.",
    location: "DLF Garden City, Sector 93, Gurugram",
    status: "New Launch",
    config: "Independent Floors · Three-Side Open",
    size: "G+4 · Three-Side Open",
    possession: "On Request",
    rera: "HARERA Registered",
    heroImage: "/images/E11/building.jpg",
    overviewImage: "/images/E11/e11-14-living-dining-interior-view-r0-20250313.jpg",
    overview: [
      "E11 at DLF Garden City is a collection of thoughtfully designed, three-side-open independent floors where imagination meets form. Created for those who don't just look for a home — they look for what a home can become.",
      "Volume, light and architectural drama define every level, from the grand living spaces to the private sky-garden terrace. Finished in Italian marble, engineered timber and a jeweller-precise modular kitchen — rare, radiant, redefined.",
    ],
    stats: [
      { label: "Built Form", value: "G+4" },
      { label: "Aspect", value: "3-Side" },
      { label: "Per Floor", value: "1 Home" },
      { label: "Community", value: "DLF Gated" },
    ],
    amenities: [
      { name: "Three-Side Open Layout", icon: "garden" },
      { name: "Wrap-around Balconies", icon: "balcony" },
      { name: "Modular Kitchen", icon: "kitchen" },
      { name: "Walk-in Wardrobes", icon: "wardrobe" },
      { name: "Guest & Family Space", icon: "family" },
      { name: "High-Speed Elevator", icon: "lift" },
      { name: "EV Charging Provision", icon: "ev" },
      { name: "Adjacent Car Parking", icon: "parking" },
      { name: "DLF Club House", icon: "clubhouse" },
      { name: "Community Shopping", icon: "retail" },
      { name: "VRV / VRF Air Conditioning", icon: "ac" },
      { name: "Vastu Compliant", icon: "vastu" },
    ],
    floorPlans: [
      stiltFloor("/images/E11/e11-14-lobby-interior-view-r0-20250313.jpg"),
      typicalFloor("Three-side-open independent residence.", "/images/E11/e11-14-living-room-interior-view-r1-20250412.jpg"),
      terraceFloor("/images/E11/building-night.jpg"),
    ],
    gallery: [
      { src: "/images/E11/e11-14-living-dining-interior-view-r0-20250313.jpg", label: "Living & Dining" },
      { src: "/images/E11/e11-14-living-room-interior-view-r1-20250412.jpg", label: "Living Room" },
      { src: "/images/E11/e11-14-kitchen-interior-view-v1-r2-20250412.jpg", label: "Kitchen" },
      { src: "/images/E11/e11-14-master-bedroom-interior-view-v1-r1-20250412.jpg", label: "Master Bedroom" },
      { src: "/images/E11/e11-14-family-lounge-interior-view-v1-r1-20250412.jpg", label: "Family Lounge" },
      { src: "/images/E11/e11-14-foyer-interior-view-r1-20250326.jpg", label: "Foyer" },
    ],
    connectivity: dlfGardenCityConnectivity,
    mapQuery: "DLF Garden City Sector 93 Gurugram",
    highlights: ["Three-side open floors", "Volume, light & drama", "Sky-garden terrace", "Premium modular kitchen"],
  },
  {
    slug: "ea04",
    no: "04",
    title: "EA 04 at Alameda",
    shortName: "EA 04",
    tagline: "Architecture that commands, interiors that whisper.",
    location: "Sector 73, Gurugram",
    status: "Now Selling",
    config: "Boutique Private Floors",
    size: "Two-Side Open Private Floors",
    possession: "On Request",
    rera: "HARERA Registered",
    heroImage: "/images/EA4/building.jpg",
    overviewImage: "/images/EA4/ea-4-lounge-diningjpg.jpg",
    overview: [
      "EA-04, Alameda is a boutique luxury residence in Sector 73, Gurugram — private, two-side-open floors for those who value space, elegance and absolute privacy. Architecture that commands; interiors that whisper, in a palette of deep emerald stone and 24k-gold accents.",
      "From the monumental entrance foyer to the panoramic sky terrace, every space is a deliberate act of luxury — high-gloss marble, a culinary studio of a kitchen and a spa-like master bath. Dual high-speed elevators and rear park access complete the address.",
    ],
    stats: [
      { label: "Built Form", value: "G+4" },
      { label: "Aspect", value: "2-Side" },
      { label: "Elevators", value: "Dual" },
      { label: "Address", value: "Sector-73" },
    ],
    amenities: [
      { name: "Dual High-Speed Elevators", icon: "lift" },
      { name: "Wrap-around Balconies", icon: "balcony" },
      { name: "Modular Kitchen", icon: "kitchen" },
      { name: "Walk-in Wardrobes", icon: "wardrobe" },
      { name: "Guest & Family Space", icon: "family" },
      { name: "Rear Park Access", icon: "garden" },
      { name: "EV Charging Provision", icon: "ev" },
      { name: "Adjacent Car Parking", icon: "parking" },
      { name: "DLF Club House", icon: "clubhouse" },
      { name: "VRV / VRF Air Conditioning", icon: "ac" },
      { name: "Digital Secure Lock", icon: "lock" },
      { name: "Vastu Compliant", icon: "vastu" },
    ],
    floorPlans: [
      stiltFloor("/images/EA4/ea-4-stilt-floor.jpg"),
      typicalFloor("Two-side-open boutique private floor.", "/images/EA4/ea-4-lounge-diningjpg.jpg"),
      terraceFloor("/images/EA4/e-a-4-elevation-view.jpg"),
    ],
    gallery: [
      { src: "/images/EA4/ea-4-ent-lobbyjpg.jpg", label: "Entry Lobby" },
      { src: "/images/EA4/ea-4-lounge-diningjpg.jpg", label: "Lounge & Dining" },
      { src: "/images/EA4/ea-4-formal-dinning.jpg", label: "Formal Dining" },
      { src: "/images/EA4/ea-4-kitchen.jpg", label: "Kitchen" },
      { src: "/images/EA4/ea4-a-bedroom-1.jpg", label: "Bedroom" },
      { src: "/images/EA4/4-east-avenue-dlf-alameda-passage.jpg", label: "Passage" },
    ],
    connectivity: [
      { category: "Connectivity", items: ["Dwarka Expressway", "Golf Course Ext. Road", "Sohna Road", "NH-48"] },
      { category: "Retail", items: ["Elan Epic Mall", "M3M Corner Walk", "M3M 65th Avenue"] },
      { category: "Growth Corridor", items: ["DLF Corporate Greens", "American Express Campus", "Cyber City on SPR"] },
      { category: "Universities", items: ["Gurugram University", "The NorthCap University", "Sushant University"] },
      { category: "Schools", items: ["Indus World School", "DAV Public School", "St. Xavier's High School", "DPS International School"] },
      { category: "Healthcare", items: ["Medanta – The Medicity", "Park Hospital"] },
    ],
    mapQuery: "Sector 73 Gurugram Haryana",
    highlights: ["Boutique private floors", "Two-side open homes", "Dual high-speed elevators", "Emerald & 24k-gold palette"],
  },
];

export const projectSlugs = projects.map((p) => p.slug);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
