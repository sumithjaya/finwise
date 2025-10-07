import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
   trailingSlash: true,
    images: {
    domains: ["localhost"], // allow images from your Strapi server
  },
   async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
        permanent: false, // keep false in dev
      },
    ];
  },
};

export default nextConfig;
