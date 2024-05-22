/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
        domains: ["cdn-icons-png.flaticon.com", "robohash.org", "cdn.dummyjson.com", "via.placeholder.com"],
      },    
  };
  
  export default nextConfig;
  