/* ----------------------------------------------------------------------------
   Project content model + data.

   Drives the dynamic project detail pages at /projects/[slug]. Each project
   carries everything the page renders: hero, overview, amenities, floor plans,
   gallery, connectivity and the enquiry context. Images reuse the compressed
   /public/images set for now — swap per-project renders/plans in later.
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
  | "retail";

export type Amenity = { name: string; icon: AmenityIcon };

export type FloorPlan = {
  id: string;
  label: string;
  config: string;
  area: string;
  bedrooms: string;
  baths: string;
  facing: string;
  image: string;
};

export type Landmark = { name: string; minutes: number; category: string };

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
  connectivity: Landmark[];
  mapQuery: string;
  highlights: string[];
};

const commonAmenities: Amenity[] = [
  { name: "Grand Clubhouse", icon: "clubhouse" },
  { name: "Swimming Pool", icon: "pool" },
  { name: "Fitness Centre", icon: "gym" },
  { name: "Landscaped Gardens", icon: "garden" },
  { name: "24×7 Security", icon: "security" },
  { name: "Covered Parking", icon: "parking" },
  { name: "100% Power Backup", icon: "power" },
  { name: "Concierge Service", icon: "concierge" },
  { name: "Kids' Play Area", icon: "kids" },
  { name: "Sports Courts", icon: "sports" },
  { name: "Café & Lounge", icon: "cafe" },
  { name: "Spa & Wellness", icon: "spa" },
];

export const projects: Project[] = [
  {
    slug: "c2",
    no: "01",
    title: "C2 at DLF Garden City",
    shortName: "C2",
    tagline: "Podium living on the Dwarka Expressway.",
    location: "Sector 93, Gurugram",
    status: "Ready to Move",
    config: "3 & 4 BHK Luxury Apartments",
    size: "1,850 – 2,400 sq.ft.",
    possession: "Ready",
    rera: "RERA-GGM-2019-C2",
    heroImage: "/images/alameda-entrance.webp",
    overviewImage: "/images/alameda-lounge.webp",
    overview: [
      "C2 is a collection of premium high-rise residences set on a landscaped podium, with double-height entrance lobbies and curated club amenities. Direct frontage on the Dwarka Expressway places the whole of the NCR within easy reach.",
      "Every apartment is planned for light and cross-ventilation, with three-side-open units, expansive balconies and a refined palette of natural stone and engineered timber.",
    ],
    stats: [
      { label: "Configuration", value: "3 & 4 BHK" },
      { label: "Saleable Area", value: "1,850–2,400 sq.ft." },
      { label: "Towers", value: "4 High-rise" },
      { label: "Status", value: "Ready to Move" },
    ],
    amenities: commonAmenities,
    floorPlans: [
      {
        id: "3bhk",
        label: "3 BHK",
        config: "3 Bed · 3 Bath · Utility",
        area: "1,850 sq.ft.",
        bedrooms: "3",
        baths: "3",
        facing: "East / Park",
        image: "/images/alameda-bedroom-1.webp",
      },
      {
        id: "3bhk-study",
        label: "3 BHK + Study",
        config: "3 Bed · Study · 3 Bath",
        area: "2,100 sq.ft.",
        bedrooms: "3",
        baths: "3",
        facing: "North-East",
        image: "/images/alameda-bedroom-2.webp",
      },
      {
        id: "4bhk",
        label: "4 BHK",
        config: "4 Bed · 4 Bath · Servant",
        area: "2,400 sq.ft.",
        bedrooms: "4",
        baths: "4",
        facing: "Corner / 3-side open",
        image: "/images/alameda-bedroom-3.webp",
      },
    ],
    gallery: [
      { src: "/images/alameda-entrance.webp", label: "Entrance Foyer" },
      { src: "/images/alameda-lounge.webp", label: "Living Lounge" },
      { src: "/images/alameda-dining.webp", label: "Dining Area" },
      { src: "/images/alameda-kitchen.webp", label: "Modular Kitchen" },
      { src: "/images/alameda-bedroom-1.webp", label: "Master Bedroom" },
      { src: "/images/alameda-bathroom.webp", label: "Bathroom" },
    ],
    connectivity: [
      { name: "Dwarka Expressway", minutes: 1, category: "Highway" },
      { name: "Golf Course Ext. Road", minutes: 8, category: "Business" },
      { name: "IGI Airport", minutes: 35, category: "Airport" },
      { name: "CPR Metro Station", minutes: 12, category: "Metro" },
    ],
    mapQuery: "DLF Garden City Sector 93 Gurugram",
    highlights: ["Podium-level club", "Three-side open units", "100% power backup", "Concierge service"],
  },
  {
    slug: "c5",
    no: "02",
    title: "C5 at DLF Garden City",
    shortName: "C5",
    tagline: "Courtyard residences, composed in light.",
    location: "Sector 93, Gurugram",
    status: "Possession Ready",
    config: "Premium 3 & 4 BHK Residences",
    size: "2,100 – 2,800 sq.ft.",
    possession: "Ready",
    rera: "RERA-GGM-2020-C5",
    heroImage: "/images/alameda-lounge.webp",
    overviewImage: "/images/alameda-dining.webp",
    overview: [
      "C5 gathers spacious, cross-ventilated residences around a central landscaped courtyard. French balconies, refined interiors and a curated palette of natural materials give every home a quiet, enduring elegance.",
      "Generous floor plates and courtyard-facing layouts mean light reaches deep into each apartment through the day — a calm counterpoint to the city beyond.",
    ],
    stats: [
      { label: "Configuration", value: "3 & 4 BHK" },
      { label: "Saleable Area", value: "2,100–2,800 sq.ft." },
      { label: "Towers", value: "3 Mid-rise" },
      { label: "Status", value: "Possession Ready" },
    ],
    amenities: commonAmenities,
    floorPlans: [
      {
        id: "3bhk",
        label: "3 BHK",
        config: "3 Bed · 3 Bath · Utility",
        area: "2,100 sq.ft.",
        bedrooms: "3",
        baths: "3",
        facing: "Courtyard",
        image: "/images/alameda-bedroom-2.webp",
      },
      {
        id: "4bhk",
        label: "4 BHK",
        config: "4 Bed · 4 Bath · Servant",
        area: "2,500 sq.ft.",
        bedrooms: "4",
        baths: "4",
        facing: "East / Park",
        image: "/images/alameda-bedroom-3.webp",
      },
      {
        id: "4bhk-pent",
        label: "4 BHK Grand",
        config: "4 Bed · 4 Bath · Family Lounge",
        area: "2,800 sq.ft.",
        bedrooms: "4",
        baths: "4",
        facing: "Corner",
        image: "/images/alameda-bedroom-4.webp",
      },
    ],
    gallery: [
      { src: "/images/alameda-lounge.webp", label: "Living Lounge" },
      { src: "/images/alameda-dining.webp", label: "Dining Area" },
      { src: "/images/alameda-kitchen.webp", label: "Modular Kitchen" },
      { src: "/images/alameda-bedroom-2.webp", label: "Master Bedroom" },
      { src: "/images/alameda-powder-room.webp", label: "Powder Room" },
      { src: "/images/alameda-entrance.webp", label: "Entrance Foyer" },
    ],
    connectivity: [
      { name: "Dwarka Expressway", minutes: 2, category: "Highway" },
      { name: "Golf Course Ext. Road", minutes: 9, category: "Business" },
      { name: "IGI Airport", minutes: 35, category: "Airport" },
      { name: "Diplomatic Enclave", minutes: 20, category: "Landmark" },
    ],
    mapQuery: "DLF Garden City Sector 93 Gurugram",
    highlights: ["Cross-ventilated layouts", "French balconies", "Courtyard-facing units", "Italian marble flooring"],
  },
  {
    slug: "e11",
    no: "03",
    title: "E11 at DLF Garden City",
    shortName: "E11",
    tagline: "Penthouses with a private sky.",
    location: "Sector 93, Gurugram",
    status: "New Launch",
    config: "Luxury Flats & Penthouses",
    size: "2,400 – 5,200 sq.ft.",
    possession: "2027",
    rera: "RERA-GGM-2024-E11",
    heroImage: "/images/alameda-bedroom-1.webp",
    overviewImage: "/images/alameda-bedroom-3.webp",
    overview: [
      "The most anticipated launch in DLF Garden City, E11 introduces duplex penthouses with private terraces, sky lounges and double-height living spaces — homes designed for those who want the city at their feet.",
      "Below the penthouses, generously proportioned flats share the same uncompromising specification: full-height glazing, concierge and valet, and amenities that read more like a private resort than a residence.",
    ],
    stats: [
      { label: "Configuration", value: "3, 4 BHK & Penthouses" },
      { label: "Saleable Area", value: "2,400–5,200 sq.ft." },
      { label: "Towers", value: "2 Signature" },
      { label: "Possession", value: "2027" },
    ],
    amenities: commonAmenities,
    floorPlans: [
      {
        id: "3bhk",
        label: "3 BHK",
        config: "3 Bed · 3 Bath · Utility",
        area: "2,400 sq.ft.",
        bedrooms: "3",
        baths: "3",
        facing: "City / Park",
        image: "/images/alameda-bedroom-1.webp",
      },
      {
        id: "4bhk",
        label: "4 BHK",
        config: "4 Bed · 4 Bath · Servant",
        area: "3,200 sq.ft.",
        bedrooms: "4",
        baths: "4",
        facing: "Corner",
        image: "/images/alameda-bedroom-5.webp",
      },
      {
        id: "penthouse",
        label: "Duplex Penthouse",
        config: "4 Bed · Private Terrace · Sky Lounge",
        area: "5,200 sq.ft.",
        bedrooms: "4+",
        baths: "5",
        facing: "Panoramic",
        image: "/images/alameda-lounge.webp",
      },
    ],
    gallery: [
      { src: "/images/alameda-bedroom-1.webp", label: "Master Bedroom" },
      { src: "/images/alameda-lounge.webp", label: "Double-height Living" },
      { src: "/images/alameda-dining.webp", label: "Dining Area" },
      { src: "/images/alameda-bedroom-5.webp", label: "Guest Suite" },
      { src: "/images/alameda-kitchen.webp", label: "Island Kitchen" },
      { src: "/images/alameda-bathroom.webp", label: "Spa Bathroom" },
    ],
    connectivity: [
      { name: "Dwarka Expressway", minutes: 1, category: "Highway" },
      { name: "Golf Course Ext. Road", minutes: 8, category: "Business" },
      { name: "IGI Airport", minutes: 32, category: "Airport" },
      { name: "Upcoming Metro", minutes: 10, category: "Metro" },
    ],
    mapQuery: "DLF Garden City Sector 93 Gurugram",
    highlights: ["Duplex penthouses", "Private terraces", "Sky lounge", "Concierge & valet"],
  },
  {
    slug: "ea04",
    no: "04",
    title: "EA 04 at Almeda",
    shortName: "EA 04",
    tagline: "A premium address for business.",
    location: "Gurugram, Haryana",
    status: "Operational",
    config: "Commercial & Retail Spaces",
    size: "Suites from 500 sq.ft.",
    possession: "Operational",
    rera: "RERA-GGM-2018-EA04",
    heroImage: "/images/alameda-dining.webp",
    overviewImage: "/images/alameda-kitchen.webp",
    overview: [
      "EA 04 at Almeda brings together high-end retail and Grade-A office space designed for boutique brands, restaurants and forward-thinking firms looking for a premium business address.",
      "Triple-height retail frontage, dedicated visitor parking and F&B-ready services make it as practical as it is striking — a place that works as hard as the businesses inside it.",
    ],
    stats: [
      { label: "Use", value: "Retail & Office" },
      { label: "Suite Sizes", value: "From 500 sq.ft." },
      { label: "Grade", value: "Grade-A" },
      { label: "Status", value: "Operational" },
    ],
    amenities: [
      { name: "Triple-height Retail", icon: "retail" },
      { name: "Grade-A Offices", icon: "clubhouse" },
      { name: "Visitor Parking", icon: "parking" },
      { name: "24×7 Security", icon: "security" },
      { name: "100% Power Backup", icon: "power" },
      { name: "High-speed Lifts", icon: "lift" },
      { name: "F&B-ready Services", icon: "cafe" },
      { name: "Concierge & Reception", icon: "concierge" },
    ],
    floorPlans: [
      {
        id: "retail",
        label: "Retail Suite",
        config: "Triple-height frontage",
        area: "500–1,200 sq.ft.",
        bedrooms: "—",
        baths: "Shared",
        facing: "High-street",
        image: "/images/alameda-entrance.webp",
      },
      {
        id: "office",
        label: "Office Floor",
        config: "Grade-A open floor plate",
        area: "2,000–8,000 sq.ft.",
        bedrooms: "—",
        baths: "Per floor",
        facing: "Curtain-wall glazing",
        image: "/images/alameda-lounge.webp",
      },
    ],
    gallery: [
      { src: "/images/alameda-dining.webp", label: "Retail Atrium" },
      { src: "/images/alameda-entrance.webp", label: "Lobby" },
      { src: "/images/alameda-lounge.webp", label: "Office Lounge" },
      { src: "/images/alameda-kitchen.webp", label: "Café Space" },
      { src: "/images/alameda-powder-room.webp", label: "Washrooms" },
      { src: "/images/alameda-bathroom.webp", label: "Amenity Core" },
    ],
    connectivity: [
      { name: "Dwarka Expressway", minutes: 3, category: "Highway" },
      { name: "NH-48", minutes: 10, category: "Highway" },
      { name: "IGI Airport", minutes: 30, category: "Airport" },
      { name: "Cyber City", minutes: 18, category: "Business" },
    ],
    mapQuery: "Almeda Gurugram Haryana",
    highlights: ["Grade-A specifications", "Triple-height retail", "Dedicated visitor parking", "F&B-ready services"],
  },
];

export const projectSlugs = projects.map((p) => p.slug);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
