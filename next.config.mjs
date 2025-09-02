/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Temporarily ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Temporarily ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  // Ensure proper static file handling
  trailingSlash: false,
  // Optimize images
  images: {
    unoptimized: true,
  },
};

export default nextConfig;