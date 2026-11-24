const CONFIG = {
  // profile setting (required)
  profile: {
    name: "余贤俊",
    image: "/avatar3.svg",
    role: "前端开发",
    bio: "让万物穿过自己",
    aboutBio:
      "Cosine 是一个专注于技术分享和思考的个人博客。在这里，我会分享我的技术心得、学习笔记以及对生活的感悟。", // About页面的简介
    email: "codecosine@gmail.com",
    github: "ycosine",
  },

  // blog setting (required)
  blog: {
    title: "Cosine",
    description: "记录技术思考与生活感悟的数字空间",
  },

  // CONFIG configration (required)
  link: "https://xianjun.cc",
  since: 2022, // If leave this empty, current year will be used.
  lang: "zh-CN", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // comments (giscus)
  giscus: {
    enable: true,
    config: {
      repo: "ycosine/cosine-log",
      repoId: "R_kgDOKxcW1Q",
      category: "Announcements",
      categoryId: "DIC_kwDOKxcW1c4C1GWI",
      mapping: "pathname",
      strict: "0",
      reactionsEnabled: "1",
      emitMetadata: "0",
      inputPosition: "bottom",
      lang: "zh-CN",
    },
  },
}

module.exports = { CONFIG }
