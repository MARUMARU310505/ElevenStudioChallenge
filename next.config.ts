import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.igdb.com', // Dominio permitido
      },
    ],
  },
};

export default nextConfig;

