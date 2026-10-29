import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/AlexWaweru.github.io", // Set the base path to the GitHub repository name
  assetPrefix: "/AlexWaweru.github.io/", // Set the asset prefix to match the base path
  output: "export", // Export the app as a static site
  images: { unoptimized: true }, // next/image optimization isn't available in static exports
};

export default nextConfig;
