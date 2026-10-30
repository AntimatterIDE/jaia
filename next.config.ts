import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ScrollStack and other photos request quality 90; default allowlist is [75].
    qualities: [75, 90],
  },
  async redirects() {
    return [
      {
        source: "/case-studies/apcm-bhi",
        destination: "/case-studies/mukesh-gandhi",
        permanent: true,
      },
      {
        source: "/case-studies/hrv-assessment",
        destination: "/case-studies/novo-wellness",
        permanent: true,
      },
      {
        source: "/case-studies/billing-rcm",
        destination: "/case-studies/novo-wellness",
        permanent: true,
      },
      {
        source: "/case-studies/pol-establishment",
        destination: "/case-studies",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
