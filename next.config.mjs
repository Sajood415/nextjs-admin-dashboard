/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
        domains: ["via.placeholder.com", "robohash.org"],
      },    
  };
  
  export default nextConfig;
  