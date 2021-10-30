/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.pexels.com"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};
