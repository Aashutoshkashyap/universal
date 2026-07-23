import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1360],
    qualities: [35, 45, 55, 65, 75],
  },
};

export default nextConfig;
