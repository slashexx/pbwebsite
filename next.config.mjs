/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Disables lint checks during the build process
    },
    images: {
      domains: ['firebasestorage.googleapis.com'], 
  },
  };
  
  export default nextConfig;
  