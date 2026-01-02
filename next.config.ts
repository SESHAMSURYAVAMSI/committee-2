/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.aoicon2026kolkata.com",
        pathname: "/assets/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
