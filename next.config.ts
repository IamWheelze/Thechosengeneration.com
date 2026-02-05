import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: "export",

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Trailing slashes for better compatibility
  trailingSlash: true,

  // Base path - uncomment if deploying to a subpath like /Thechosengeneration.com/
  // basePath: "/Thechosengeneration.com",
};

export default nextConfig;
