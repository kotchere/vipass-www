import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      // Bunny CDN — event flyers / covers. Dev storage + stream zones explicitly,
      // plus a wildcard so the prod zones work without a config change.
      {
        protocol: "https",
        hostname: "vip-dev.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "vz-4f3b5a3c-004.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "**.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
