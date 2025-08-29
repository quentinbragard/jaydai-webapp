import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* App Router i18n is handled via middleware + [locale] URL prefixes (no i18n in next.config) */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vetoswvwgsebhxetqppa.supabase.co",
        pathname: "/storage/v1/object/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
