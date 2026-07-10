import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    // Legacy URLs from the previous site. Blog posts still link to them and
    // they may hold external backlinks, so redirect to the closest current
    // equivalent rather than 404.
    return [
      {
        source: "/dlf-garden-city-plots-in-sector-93-gurgaon.html",
        destination: "/blog/buy-dlf-garden-city-plots-in-gurgaon-emarat-realty",
        permanent: true,
      },
      {
        source: "/dlf-independent-floors-in-gurgaon-phase-3.html",
        destination: "/blog/dlf-independent-floors-phase-3-luxury-living-in-gurgaon",
        permanent: true,
      },
      {
        source: "/dlf-residential-projects-in-gurgaon-sector-93.html",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
  images: {
    // Serve modern formats; AVIF first for the best compression.
    formats: ["image/avif", "image/webp"],
    // Optimized images are content-hashed, so they can cache for a year.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        // Still used by team / director portrait placeholders.
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
