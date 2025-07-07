/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.notion.so', 'lh5.googleusercontent.com', 's3-us-west-2.amazonaws.com'],
    formats: ['image/webp', 'image/avif'],
  },
  eslint: {
    ignoreDuringBuilds: true,
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
