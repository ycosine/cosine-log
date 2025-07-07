const CONFIG = {
  // profile setting (required)
  profile: {
    name: "余贤俊",
    image: "/avatar3.svg",
    role: "前端开发",
    bio: "世间一切变化皆有利于我",
    email: "codecosine@gmail.com",
    github: "ycosine",
    instagram: "",
  },
  projects: [],
  // blog setting (required)
  blog: {
    title: "Cosine 余弦是定理",
    description: "welcome to my blog!",
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

  // OSS configuration (optional)
  ossConfig: {
    enable: false, // 设置为 true 启用 OSS 图片上传
    region: process.env.OSS_REGION || "",
    accessKeyId: process.env.OSS_ACCESS_KEY_ID || "",
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || "",
    bucket: process.env.OSS_BUCKET || "",
    baseUrl: process.env.OSS_BASE_URL || "",
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
