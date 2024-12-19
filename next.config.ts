import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Export the app as a static site
  basePath: "/AlexWaweru.github.io", // Set the base path to the GitHub repository name
  assetPrefix: "/AlexWaweru.github.io/", // Set the asset prefix to match the base path
};

export default nextConfig;
