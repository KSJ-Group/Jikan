/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["images.pexels.com"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};
