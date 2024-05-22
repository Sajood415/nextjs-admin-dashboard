/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
        domains: ["via.placeholder.com", "robohash.org", "cdn.dummyjson.com"],
      },    
  };
  
  export default nextConfig;
  