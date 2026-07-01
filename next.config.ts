import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
