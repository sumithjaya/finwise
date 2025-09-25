import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   trailingSlash: true,
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
