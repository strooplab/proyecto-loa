import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();
const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.LOCAL_ORIGIN || "localhost"],
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindcss.com",
        port: "",
        pathname: "/plus-assets/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "pub-415cf98523294c368075ea9561ec3752.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
