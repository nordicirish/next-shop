/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // allows us to use localhost for images
  // images are fetched from strapi but served by next
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
