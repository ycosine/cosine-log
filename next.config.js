/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      { hostname: "www.notion.so" },
      { hostname: "lh5.googleusercontent.com" },
      { hostname: "s3-us-west-2.amazonaws.com" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return []
  },
  async rewrites() {
    return []
  },
}

module.exports = nextConfig
