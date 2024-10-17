/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables lint checks during the build process
  },
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "img.icons8.com",
      "icpc.global",
      "img.freepik.com"
    ],
  },
};

export default nextConfig;
