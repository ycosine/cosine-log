/** @type {import('next').NextConfig} */
const nextConfig = {
  // 纯静态导出到 out/，由 Cloudflare Workers Static Assets 托管
  output: "export",
  // 保持 /slug 而非 /slug/，避免 Giscus（按 pathname 匹配）丢失历史评论
  trailingSlash: false,
  images: {
    // 静态导出没有图片优化服务
    unoptimized: true,
  },
}

module.exports = nextConfig
