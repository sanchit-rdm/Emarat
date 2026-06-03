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
    tagline: "The address within the address.",
    location: "DLF Garden City, Sector 93, Gurugram",
    status: "Now Selling",
    config: "5 BHK Independent Floors",
    size: "G+4 · 5 BHK",
    possession: "On Request",
    rera: "HARERA Registered",
    heroImage: "/images/C-2/Building.jpeg",
    overviewImage: "/images/C-2/C2 Living Dining_Interior View 02_APPROVED_R0_20240122.png",
    overview: [
      "C2 at DLF Garden City is a collection of Spanish-inspired 5 BHK independent floors — self-contained homes with generous proportions, expansive wrap-around balconies and abundant open space. Designed so light lingers longer and life feels effortless, it is, quite simply, the address within the address.",
      "Every residence opens to park-facing greenery, with a family lounge, a dedicated puja room and walk-in wardrobes. Italian marble, engineered timber and a quartz-topped modular kitchen complete a home made for a larger-than-life way of living, set within the DLF gated community.",
    ],
    stats: [
      { label: "Configuration", value: "5 BHK" },
      { label: "Built Form", value: "G+4" },
      { label: "Per Floor", value: "1 Home" },
      { label: "Community", value: "DLF Gated" },
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
      stiltFloor("/images/C-2/DLFGC_REAR 3D View_INITIAL DESIGN_20250307.jpg.jpeg"),
      typicalFloor("Spanish-inspired 5 BHK residence per floor.", "/images/C-2/C2 Living Dining_Interior View 01_APPROVED_R0_20240122.png"),
      terraceFloor("/images/C-2/C2 Master Bedroom _Interior View 02_20250201.png"),
    ],
    gallery: [
      { src: "/images/C-2/C2 Living _Interior View_APPROVED_R0_20240122.png", label: "Living Room" },
      { src: "/images/C-2/C2 Living Dining_Interior View 01_APPROVED_R0_20240122.png", label: "Living & Dining" },
      { src: "/images/C-2/C2 Dining_Interior View_APPROVED_R0_20240122.png", label: "Dining Room" },
      { src: "/images/C-2/C2 Kitchen_Interior View_R0_20240129.png", label: "Kitchen" },
      { src: "/images/C-2/C2  Family Lounge_Interior View_R0_20240129.png", label: "Family Lounge" },
      { src: "/images/C-2/C2 Master Bedroom _Interior View 01_20250201.png", label: "Master Bedroom" },
    ],
    connectivity: dlfGardenCityConnectivity,
    mapQuery: "DLF Garden City Sector 93 Gurugram",
    highlights: ["Spanish-inspired 5 BHK floors", "Wrap-around balconies", "Dedicated puja room", "Italian marble & quartz finishes"],
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
    heroImage: "/images/C-5/Building.jpeg",
    overviewImage: "/images/C-5/C-5-11 DOUBLE HEIGHT.jpg.jpeg",
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
      stiltFloor("/images/C-5/C-5-11 STILT.jpg.jpeg"),
      typicalFloor("Full-floor independent residence.", "/images/C-5/C-5-11 DOUBLE HEIGHT.jpg.jpeg"),
      terraceFloor("/images/C-5/C5 LEFT SIDE Image 2026-03-06 at 2.44.10 PM.jpeg"),
    ],
    gallery: [
      { src: "/images/C-5/C-5-11 DOUBLE HEIGHT.jpg.jpeg", label: "Double Height Living" },
      { src: "/images/C-5/c-5-11 dnd.jpg.jpeg", label: "Dining" },
      { src: "/images/C-5/C-5-11 KITCHEN.jpg.jpeg", label: "Kitchen" },
      { src: "/images/C-5/c-5-11 bedroom-1.jpg.jpeg", label: "Bedroom" },
      { src: "/images/C-5/C-5-11_Family Lounge.jpg.jpeg", label: "Family Lounge" },
      { src: "/images/C-5/C-5-11_passage.jpg.jpeg", label: "Passage" },
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
    heroImage: "/images/E11/Building.jpg",
    overviewImage: "/images/E11/E11-14_Living Dining_Interior View_R0_20250313.png",
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
      stiltFloor("/images/E11/E11-14_Lobby_Interior View_R0_20250313.png"),
      typicalFloor("Three-side-open independent residence.", "/images/E11/E11-14_Living Room_Interior View_R1_20250412.png"),
      terraceFloor("/images/E11/Building Night.jpg"),
    ],
    gallery: [
      { src: "/images/E11/E11-14_Living Dining_Interior View_R0_20250313.png", label: "Living & Dining" },
      { src: "/images/E11/E11-14_Living Room_Interior View_R1_20250412.png", label: "Living Room" },
      { src: "/images/E11/E11-14_Kitchen_Interior View_V1_R2_20250412.png", label: "Kitchen" },
      { src: "/images/E11/E11-14_Master Bedroom_Interior View_ V1_R1_20250412.png", label: "Master Bedroom" },
      { src: "/images/E11/E11-14_Family Lounge_Interior View_V1_R1_20250412.png", label: "Family Lounge" },
      { src: "/images/E11/E11-14_Foyer_Interior View_R1_20250326.png", label: "Foyer" },
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
    heroImage: "/images/EA4/Building.jpeg",
    overviewImage: "/images/EA4/EA 4 LOUNGE.& DININGjpg.jpeg",
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
      stiltFloor("/images/EA4/EA-4 STILT FLOOR.jpg.jpeg"),
      typicalFloor("Two-side-open boutique private floor.", "/images/EA4/EA 4 LOUNGE.& DININGjpg.jpeg"),
      terraceFloor("/images/EA4/E A-4 Elevation View_.jpg.jpeg"),
    ],
    gallery: [
      { src: "/images/EA4/EA 4 ENT. LOBBYjpg.jpeg", label: "Entry Lobby" },
      { src: "/images/EA4/EA 4 LOUNGE.& DININGjpg.jpeg", label: "Lounge & Dining" },
      { src: "/images/EA4/EA 4  Formal DINNING.jpg.jpeg", label: "Formal Dining" },
      { src: "/images/EA4/EA 4 KITCHEN.jpg.jpeg", label: "Kitchen" },
      { src: "/images/EA4/EA4 A BEDROOM-1.jpg.jpeg", label: "Bedroom" },
      { src: "/images/EA4/4 EAST AVENUE, DLF ALAMEDA PASSAGE.jpg.jpeg", label: "Passage" },
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
