/**
 * Prefill Sanity with the site's current copy so every section is recognisable
 * in the Studio. Run it once:
 *
 *   npx sanity exec scripts/seed.ts --with-user-token
 *
 * (You must be logged in: `npx sanity login`.)
 *
 * SAFE & NON-DESTRUCTIVE:
 *  - createIfNotExists never overwrites an existing document.
 *  - setIfMissing only fills fields you haven't already entered, so anything
 *    you've typed in the Studio is preserved.
 *  - Image fields and image-dependent lists (gallery, location places, values,
 *    team photos) are intentionally skipped — those keep their in-code images
 *    until you upload real ones in the Studio.
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-05-25" });

// Sanity array items need a stable, unique _key.
let _n = 0;
const key = () => `seed${(_n++).toString(36)}`;
const wk = <T extends object>(arr: T[]): Array<T & { _key: string }> =>
  arr.map((o) => ({ _key: key(), ...o }));

const PHONE = "+91 84509 84509";
const EMAIL = "info@emaratrealty.com";

const docs: Array<{ _id: string; _type: string; fields: Record<string, unknown> }> = [
  /* ----------------------------- Site Settings ----------------------------- */
  {
    _id: "siteSettings",
    _type: "siteSettings",
    fields: {
      siteTitle: "Emarat Realty Luxury Real Estate in Gurugram",
      siteDescription:
        "A distinguished leader in luxury real estate, specialising in exquisite residences and high-end commercial spaces at DLF Garden City, Sector 93, Gurugram.",
      contact: {
        phone: PHONE,
        phoneHours: "Mon – Sat, 10am – 7pm IST",
        email: EMAIL,
        emailNote: "We respond within one working day.",
        address: "Emarat Realty\n2nd Floor, Sector-15\nCivil Lines, Gurugram\nHaryana 122001",
      },
      socialLinks: wk([
        { platform: "LinkedIn", url: "https://www.linkedin.com/company/emarat-realty/" },
        { platform: "Instagram", url: "https://www.instagram.com/emarat.realty/" },
        { platform: "Facebook", url: "https://www.facebook.com/emaratrealty1/" },
        { platform: "Twitter / X", url: "https://x.com/Emaratrealty" },
        { platform: "YouTube", url: "https://youtube.com/@emarat.realty" },
      ]),
      nav: wk([
        { label: "Home", dropdown: wk([{ href: "/", label: "Home 1" }, { href: "/home-2", label: "Home 2" }]) },
        {
          label: "Corporate",
          dropdown: wk([
            { href: "/about", label: "About Us" },
            { href: "/directors-desk", label: "Director's Desk" },
          ]),
        },
        {
          label: "Projects",
          dropdown: wk([
            { href: "/projects/c2", label: "C2 at DLF Garden City" },
            { href: "/projects/c5", label: "C5 at DLF Garden City" },
            { href: "/projects/e11", label: "E11 at DLF Garden City" },
            { href: "/projects/ea04", label: "EA 04 at Alameda" },
          ]),
        },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/news" },
        { label: "Contact", href: "/contact" },
      ]),
      footer: {
        headline: "",
        tagline:
          "Redefining the standard of luxury living and building transformative real estate in Gurugram, Haryana.",
        addressLines: ["Emarat Realty, 2nd Floor, Sector-15,", "Civil Lines, Gurugram (Haryana) 122001"],
        columns: wk([
          {
            heading: "Corporate",
            links: wk([
              { label: "About Us", href: "/about" },
              { label: "Director's Desk", href: "/directors-desk" },
              { label: "Careers", href: "/careers" },
            ]),
          },
          {
            heading: "Projects",
            links: wk([
              { label: "C2 at DLF Garden City", href: "/projects/c2" },
              { label: "C5 at DLF Garden City", href: "/projects/c5" },
              { label: "E11 at DLF Garden City", href: "/projects/e11" },
              { label: "EA 04 at Alameda", href: "/projects/ea04" },
            ]),
          },
          {
            heading: "Explore",
            links: wk([
              { label: "News", href: "/news" },
              { label: "Contact", href: "/contact" },
            ]),
          },
        ]),
        contactHeading: "Get in Touch",
        officeHours: "Mon Fri · 9am – 6pm",
        copyright: "© 2026 Emarat Realty. All rights reserved.",
        legalNote: "RERA registered · Gurugram, Haryana",
      },
    },
  },

  /* -------------------------------- Home Page ------------------------------- */
  {
    _id: "homePage",
    _type: "homePage",
    fields: {
      heroBlocks: wk([
        { heading: "Homes that define how you live." },
        { heading: "Crafted in stone, light and silence." },
        { heading: "An address that appreciates." },
      ]),
      scrollCue: "Scroll",
      gallerySection: {
        heading1: "Crafted for",
        heading2: "luxury living.",
        scrollHint: "Scroll to explore spaces and residences.",
        swipeHint: "Swipe to explore spaces and residences.",
      },
      about: {
        heading1: "A distinguished leader",
        heading2: "in luxury real estate.",
        description:
          "Emarat Realty specialises in exquisite residences and high-end commercial spaces across Gurugram. We deliver homes built on quality, elegance and innovation where every detail reflects our unwavering commitment to excellence.",
        services: wk([
          { title: "Luxury Residential", subtitle: "3 & 4 BHK apartments" },
          { title: "Commercial Spaces", subtitle: "High-end retail & offices" },
          { title: "Residential Plots", subtitle: "Sector 93, Gurugram" },
          { title: "Independent Floors", subtitle: "Phase 3, DLF" },
        ]),
        imageCaption: "C5 Residences, DLF Garden City",
      },
      approach: { heading1: "Building with Ethics,", heading2: "Excellence & Efficiency.", heading3: "Designed to endure." },
      contact: {
        heading1: "Ready to find",
        heading2: "your perfect home?",
        phone: PHONE,
        phoneHref: "tel:+918450984509",
        phoneHours: "Mon – Sat, 10am – 7pm IST",
        email: EMAIL,
        emailNote: "We respond within one working day.",
        address: "Emarat Realty\n2nd Floor, Sector-15\nCivil Lines, Gurugram\nHaryana 122001",
        lead: "Leave your details and our team will get back to you within one business day.",
        namePlaceholder: "Your name",
        phonePlaceholder: "+91 00000 00000",
        emailPlaceholder: "Email address (optional)",
        categoryPlaceholder: "Interested in…",
        categoryOptions: [
          "C2 at DLF Garden City",
          "C5 at DLF Garden City",
          "E11 at DLF Garden City",
          "EA 04 at Alameda",
          "Residential Plots",
          "Independent Floors",
        ],
        privacy: "By submitting you agree to our privacy policy.",
        submitLabel: "Request Callback",
        callLabel: "Call Us",
        emailLabel: "Email Us",
        visitLabel: "Visit Us",
      },
      location: { eyebrow: "Location & Connectivity" },
      // statement (image falls back in code)
      statement: {
        eyebrow: "A Place to Belong",
        lead: "Garden City Residences",
        rest: "— here freedom begins",
        body: "Far from the noise yet minutes from everything that matters. At DLF Garden City, Sector 93, Emarat Realty shapes homes around care, generosity and an unhurried sense of space — a project that turns true, lasting values into everyday living.",
        ctaLabel: "Read More",
        ctaHref: "/projects",
      },
      newsSection: { heading1: "Latest from", heading2: "Emarat Realty.", allLabel: "All articles", allHref: "/news" },
      projectsSection: { heading1: "Find Your", heading2: "Dream Home", allLabel: "All projects", allHref: "/projects" },
      designTwo: {
        introEyebrow: "Emarat Realty — Est. Gurugram",
        elegant: { title: "Elegant Design", buttonLabel: "Learn More", buttonHref: "/projects" },
        iconic: {
          line1: "Life within reach",
          line2: "of every iconic landmark",
          watermark: "Iconic",
          ctaLabel: "Go to Location",
          ctaHref: "#location",
        },
        residences: {
          eyebrow: "The Residences",
          heading1: "Find your",
          heading2: "dream home.",
          allLabel: "All residences",
          allHref: "/projects",
          locationLabel: "Location",
          configLabel: "Configuration",
          viewLabel: "View Residence",
        },
        principles: {
          heading1: [
            {
              _type: "block",
              style: "normal",
              children: [{ _type: "span", text: "Building with Ethics," }],
            },
          ],
          heading2: [
            {
              _type: "block",
              style: "normal",
              children: [
                {
                  _type: "span",
                  text: "INTERIOR",
                  marks: ["strong", "em"],
                },
              ],
            },
          ],
          heading3: [
            {
              _type: "block",
              style: "normal",
              children: [{ _type: "span", text: "In Your Way" }],
            },
          ],
        },
        news: { eyebrow: "News & Offers", heading1: "Latest from", heading2: "Emarat Realty.", allLabel: "All articles", allHref: "/news" },
        contact: {
          eyebrow: "Make Your Enquiry",
          lead: "Leave your details and our team will get back to you within one business day.",
          namePlaceholder: "Your name",
          phonePlaceholder: "+91 00000 00000",
          categoryPlaceholder: "Interested in…",
          categoryOptions: [
            "C2 at DLF Garden City",
            "C5 at DLF Garden City",
            "E11 at DLF Garden City",
            "EA 04 at Alameda",
            "Residential Plots",
            "Independent Floors",
          ],
          submitLabel: "Request Callback",
          privacy: "By submitting you agree to our privacy policy.",
        },
      },
    },
  },

  /* ------------------------------- About Page ------------------------------- */
  {
    _id: "aboutPage",
    _type: "aboutPage",
    fields: {
      hero: {
        titleTop: "Redefining the standard",
        titleBottom: "of luxury living.",
        subtitle:
          "At Emarat, we're passionate about creating exquisite spaces that elevate the art of living. Our mission is to redefine the standards of living one breath-taking space at a time.",
        trailing: "",
      },
      intro: {
        heading1: "Crafting spaces that",
        heading2: "inspire and endure.",
        paragraph:
          "With a vision to transform the luxury real estate landscape, Emarat is a testament to opulence and sophistication. Our goal is to craft spaces that inspire, delight, and leave a lasting impression.",
        highlights: [
          "Luxurious living spaces, designed to perfection",
          "Unparalleled attention to detail and craftsmanship",
          "Prime locations with access to every amenity",
          "An unwavering commitment to excellence and customer satisfaction",
        ],
      },
      community: {
        heading1: "Building more",
        heading2: "than just buildings.",
        blurb: "Charitable initiatives focused on education, healthcare and social welfare across Haryana and the NCR.",
        initiatives: wk([
          {
            name: "Rukmani Devi Ji Charitable Trust",
            body: "Education and healthcare programmes serving the underprivileged in Haryana supporting schools, scholarships and free medical care.",
          },
          {
            name: "Anmol Ratan",
            body: "Social welfare initiative focused on child welfare, women's empowerment and community development across NCR.",
          },
        ]),
      },
      leadership: {
        quote: "At Emarat, we are driven by a passion to create extraordinary living experiences.",
        body: "With a focus on innovation, quality and elegance, we aim to redefine the luxury real estate landscape.",
        personName: "Dr. Raahul Goel",
        personRole: "Managing Director",
        personInitials: "RG",
        primaryCtaLabel: "Read the full message",
        primaryCtaHref: "/directors-desk",
        secondaryCtaLabel: "",
        secondaryCtaHref: "",
      },
    },
  },

  /* --------------------------- Director's Desk Page ------------------------- */
  {
    _id: "directorsDeskPage",
    _type: "directorsDeskPage",
    fields: {
      hero: {
        titleTop: "A message from",
        titleBottom: "our Managing Director.",
        subtitle:
          "On vision, the work that drives us, and what it takes to build landmarks that define aspirations and enhance lifestyles for generations to come.",
        trailing: "Dr. Raahul Goel · Managing Director",
      },
      portrait: { personName: "Dr. Raahul Goel", personRole: "Managing Director · Emarat Realty" },
      quote: { line1: "We don't just build structures", line2: "we create landmarks that define aspirations." },
      message: [
        "At Emarat, we don't just build structures; we create landmarks that define aspirations, enhance lifestyles, and drive progress. Every project we undertake is a reflection of our dedication to quality, innovation and an unrelenting focus on the people who choose to live and work in the spaces we deliver.",
        "Each development is a reflection of our excellence vision where architecture meets functionality and luxury integrates seamlessly with sustainability. From the placement of a window to the choice of every material, decisions are taken with care, with the long view in mind.",
        "We welcome you to be a part of Emarat's journey where vision meets reality, and excellence is built to last.",
      ],
      signatureName: "Dr. Raahul Goel",
      mission: {
        label: "Our Mission",
        heading: "Transformative real estate that sets new standards.",
        body: "To develop transformative real estate that establishes new standards of quality and sustainability. We prioritise exceptional spaces that foster growth, elevated lifestyles, and meaningful contributions to urban life through innovation and a customer-centric approach in everything we do.",
      },
      vision: {
        label: "Our Vision",
        heading: "Leading through excellence, sustainability and design.",
        body: "To lead the real estate sector through excellence, sustainability and forward-thinking design. We aspire to create landmark developments that reshape skylines while enhancing how people live, work, and experience their built environment.",
      },
      cta: {
        heading: "Be part of the journey.",
        body: "Explore our projects across Gurugram, or speak with our sales team about the right residence for your family.",
        primaryLabel: "View Projects",
        primaryHref: "/projects",
        secondaryLabel: "Get in Touch",
        secondaryHref: "/contact",
      },
    },
  },


  /* ------------------------------- Careers Page ----------------------------- */
  {
    _id: "careersPage",
    _type: "careersPage",
    fields: {
      hero: {
        titleTop: "Build your career,",
        titleBottom: "building landmarks.",
        subtitle:
          "At Emarat, we're always looking for passionate, innovative and driven individuals who want to shape the future of luxury living in Gurugram.",
        trailing: "Gurugram · On-site",
      },
      pillarsHeading: { heading1: "Four reasons people", heading2: "build careers here." },
      pillars: wk([
        { n: "I.", title: "Growth & Learning", body: "Work alongside industry leaders and gain hands-on experience across architecture, engineering, sales and marketing." },
        { n: "II.", title: "Innovation & Excellence", body: "Be part of a team that pushes boundaries from material innovation to construction technology, the curious thrive here." },
        { n: "III.", title: "Dynamic Work Environment", body: "Collaborate, create and excel in a forward-thinking culture where good ideas win regardless of where they originate." },
        { n: "IV.", title: "Competitive Rewards", body: "We value talent and offer competitive compensation, comprehensive benefits and clear pathways for progression." },
      ]),
      areasHeading: { heading1: "Six disciplines.", heading2: "One shared standard." },
      areas: ["Architecture", "Engineering", "Sales", "Marketing", "Project Management", "Customer Experience"],
      apply: {
        heading1: "Send us your résumé.",
        heading2: "We read every one.",
        body: "Email your résumé and a short note about what you'd like to work on we'll get back to you within five business days if there's a fit.",
        cardLabel: "Send applications to",
        email: EMAIL,
        hours: "Mon – Fri · 9am – 6pm",
        office: "Corporate Office, Gurugram",
        buttonLabel: "Apply Now",
      },
    },
  },

  /* ------------------------------- Contact Page ----------------------------- */
  {
    _id: "contactPage",
    _type: "contactPage",
    fields: {
      hero: {
        titleTop: "Speak to our",
        titleBottom: "sales team.",
        subtitle:
          "Whether you're enquiring about a specific residence, planning a site visit, or simply exploring the right investment for your family we're here to help.",
        trailing: "+91 84509 84509 · info@emaratrealty.com",
      },
      methods: wk([
        { label: "Call us", primary: PHONE, href: "tel:+918450984509", sub: "Mon – Fri · 9am – 6pm" },
        { label: "Email us", primary: EMAIL, href: "mailto:info@emaratrealty.com", sub: "We respond within one business day" },
        { label: "WhatsApp", primary: PHONE, href: "https://wa.me/918450984509", sub: "Tap to chat with sales" },
      ]),
      form: {
        heading1: "Leave your details.",
        heading2: "We'll be in touch.",
        nameLabel: "Full Name",
        namePlaceholder: "Your name",
        phoneLabel: "Phone",
        phonePlaceholder: "+91 00000 00000",
        emailLabel: "Email",
        emailPlaceholder: "your@email.com",
        categoryLabel: "Category",
        categoryPlaceholder: "Select a category",
        categoryOptions: ["Residential enquiry", "Commercial enquiry", "Plot purchase", "Press / Media", "Other"],
        messageLabel: "Message",
        messagePlaceholder: "Tell us how we can help…",
        consent: "I authorise Emarat Realty to contact me via Email, SMS, WhatsApp or Call regarding my enquiry.",
        privacy: "By submitting you agree to our privacy policy.",
        submitLabel: "Send Enquiry",
      },
      office: {
        label: "Corporate Office",
        addressLines: ["Emarat Realty", "2nd Floor, Sector-15,", "Civil Lines, Gurugram", "Haryana 122001"],
        phoneLabel: "Phone",
        phone: PHONE,
        emailLabel: "Email",
        email: EMAIL,
        hoursLabel: "Office Hours",
        hours: "Monday Friday · 9am – 6pm",
        socials: wk([
          { label: "LinkedIn", href: "https://www.linkedin.com/company/emarat-realty/" },
          { label: "Instagram", href: "https://www.instagram.com/emarat.realty/" },
          { label: "Facebook", href: "https://www.facebook.com/emaratrealty1/" },
          { label: "X", href: "https://x.com/Emaratrealty" },
        ]),
      },
      map: {
        title: "Emarat Realty Civil Lines, Gurugram",
        embedUrl: "https://www.google.com/maps?q=Sector+15+Civil+Lines+Gurugram&output=embed",
      },
    },
  },

  /* -------------------------------- News Page ------------------------------- */
  {
    _id: "newsPage",
    _type: "newsPage",
    fields: {
      hero: {
        titleTop: "From Vision",
        titleBottom: "to Value.",
        subtitle:
          "The Emarat perspective project updates, market notes from Gurugram and longer feature articles about how we think about luxury real estate in 2026.",
        trailing: "Updated monthly",
      },
      featuredLabel: "★ Featured",
      readArticleLabel: "Read article",
      gridHeading: "More from the journal.",
      authorFallback: "Emarat",
      emptyTitle: "Stay tuned.",
      emptyBody: "New articles published monthly.",
      newsletter: {
        heading1: "Monthly notes from",
        heading2: "the drawing table.",
        placeholder: "your@email.com",
        buttonLabel: "Subscribe →",
        note: "Monthly. New work, market notes and essays. No marketing.",
      },
    },
  },

  /* --------------------------- Projects Listing Page ------------------------ */
  {
    _id: "projectsPage",
    _type: "projectsPage",
    fields: {
      hero: {
        titleTop: "Selected works",
        titleBottom: "across Gurugram.",
        subtitle:
          "A portfolio of Spanish-inspired independent and boutique private floors at DLF Garden City and Alameda every Emarat home built on the same principles of quality, elegance and innovation.",
        trailing: "DLF Garden City · Alameda",
      },
      filter: {
        allLabel: "All Projects",
        links: wk([
          { label: "DLF Garden City", href: "#c2" },
          { label: "Alameda", href: "#ea04" },
          { label: "Plots & Floors", href: "#additional" },
        ]),
        trailing: "Independent & Private Floors",
      },
      cardButtons: { viewLabel: "View Project", enquireLabel: "Enquire", configLabel: "Configuration", sizesLabel: "Sizes" },
      additionalHeading: "Plots and independent floors.",
      additional: wk([
        { name: "DLF Garden City Plots", location: "Sector 93, Gurugram", type: "Freehold residential plots" },
        { name: "DLF Independent Floors", location: "Phase 3, Gurugram", type: "Independent builder floors" },
      ]),
      cta: {
        heading: "Considering a residence?",
        body: "Our sales team will walk you through availability, pricing and the right configuration for your family.",
        buttonLabel: "Speak to Sales",
        buttonHref: "/contact",
      },
      detail: {
        breadcrumbHome: "Home",
        breadcrumbProjects: "Projects",
        heroEnquireLabel: "Enquire Now",
        heroFloorPlansLabel: "View Floor Plans",
        navOverview: "Overview",
        navAmenities: "Amenities",
        navFloorPlans: "Floor Plans",
        navGallery: "Gallery",
        navLocation: "Location",
        navEnquire: "Enquire",
        overviewHeading1: "Project",
        overviewHeading2: "Overview.",
        amenitiesHeading: "Amenities",
        amenitiesBlurb: "Everything within the gates — designed to make everyday living effortless.",
        floorPlansHeading: "Floor Plans",
        floorPlansBlurb: "Indicative layouts. Select a floor to view its plan and key finishes.",
        floorPlansRequestLabel: "Request detailed plan",
        floorPlansBadge: "Indicative",
        galleryHeading: "Gallery",
        connectivityHeading1: "Location &",
        connectivityHeading2: "Connectivity.",
        connectivityBlurb: "anchored among the corridors, retail and institutions that connect the whole of the NCR.",
        enquiryHeading: "Enquire about",
        enquiryBlurb: "Share your details and our sales team will get back to you within one business day with availability, pricing and a private site visit.",
        enquiryPhone: PHONE,
        enquiryEmail: EMAIL,
        enquirySubmitLabel: "Send Enquiry",
        enquiryInterestedLabel: "Interested in",
        enquiryNameLabel: "Full Name",
        enquiryNamePlaceholder: "Your name",
        enquiryPhoneLabel: "Phone",
        enquiryPhonePlaceholder: "+91 00000 00000",
        enquiryEmailLabel: "Email",
        enquiryEmailPlaceholder: "your@email.com",
        enquiryConfigLabel: "Configuration",
        enquiryConfigPlaceholder: "Preferred type",
        enquiryConfigOptions: ["Site visit", "Investment / NRI"],
        enquiryMessageLabel: "Message",
        enquiryMessagePlaceholder: "Tell us what you're looking for…",
        enquiryPrivacy: "By submitting you agree to our privacy policy.",
      },
    },
  },
];

async function run() {
  for (const d of docs) {
    await client.createIfNotExists({ _id: d._id, _type: d._type });
    // Drop any accidental undefined keys before patching.
    const clean = Object.fromEntries(Object.entries(d.fields).filter(([, v]) => v !== undefined));
    await client.patch(d._id).setIfMissing(clean).commit();
    console.log(`✓ seeded ${d._id}`);
  }
  console.log("\nDone. Open the Studio — every section now shows its current copy.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
