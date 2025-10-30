import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    domains: ["localhost", "ec2-44-208-31-214.compute-1.amazonaws.com"], // allow images from your Strapi server
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: false, // keep false in dev
      },
    ];
  },
};

export default nextConfig;
