/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required because Next Image Optimization server isn't available on static hosting
  },
};

export default nextConfig;