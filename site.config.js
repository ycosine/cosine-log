const CONFIG = {
  // profile setting (required)
  profile: {
    name: "余贤俊",
    image: "/avatar3.svg",
    role: "前端开发",
    bio: "让万物穿过自己",
    aboutBio: "Cosine 是一个专注于技术分享和思考的个人博客。在这里，我会分享我的技术心得、学习笔记以及对生活的感悟。", // About页面的简介
    email: "codecosine@gmail.com",
    github: "ycosine",
    instagram: "",
  },
  projects: [],
  // blog setting (required)
  blog: {
    title: "Cosine",
    description: "记录技术思考与生活感悟的数字空间",
  },

  // CONFIG configration (required)
  link: "https://www.0xcos.com",
  since: 2022, // If leave this empty, current year will be used.
  lang: "zh-CN", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // markdown configuration (required)
  markdownConfig: {
    postsDirectory: "content/posts",
  },

  // 对象存储配置 (optional) - 支持 Cloudflare R2 和 Alibaba Cloud OSS
  storageConfig: {
    enable: false, // 设置为 true 启用对象存储
    type: process.env.STORAGE_TYPE || "r2", // 'r2' or 'oss'
    
    // Cloudflare R2 配置
    r2: {
      accountId: process.env.R2_ACCOUNT_ID || "",
      accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
      bucket: process.env.R2_BUCKET || "",
      publicUrl: process.env.R2_PUBLIC_URL || "",
    },
    
    // Alibaba Cloud OSS 配置 (向后兼容)
    oss: {
      region: process.env.OSS_REGION || "",
      accessKeyId: process.env.OSS_ACCESS_KEY_ID || "",
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || "",
      bucket: process.env.OSS_BUCKET || "",
      baseUrl: process.env.OSS_BASE_URL || "",
    },
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 21600 * 7, // revalidate time for [slug], index
}

module.exports = { CONFIG }
