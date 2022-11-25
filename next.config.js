/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com',"localhost:3000","flowbite.com"],
    unoptimized: true,
  },
}

module.exports = nextConfig

const removeImports = require('next-remove-imports')();
module.exports = removeImports({});