import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zaiocontent.s3.eu-west-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  // Keep links to the old static site working.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/projects.html", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
