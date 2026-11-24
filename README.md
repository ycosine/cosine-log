# Cosine 余弦是定理

> 记录技术思考与生活感悟的数字空间

一个基于 **Next.js 16** 构建的现代博客系统，深度集成 **Obsidian** 工作流，拥有极简的设计和优秀的阅读体验。

## ✨ 特性

- 🛠 **现代化技术栈**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- 📝 **Obsidian 友好**: 支持直接同步 Obsidian 笔记库，自动处理 `![[]]` 图片链接和资源引用
- 🌗 **暗黑模式**: 完美适配的日间/夜间模式，无闪烁切换 (next-themes)
- 💬 **评论系统**: 集成 Giscus (基于 GitHub Discussions)，支持 Markdown 和 Emoji
- 📡 **RSS 订阅**: 自动生成标准 RSS 2.0 订阅源 (`/feed.xml`)
- 🔍 **搜索与归档**: 实时文章搜索，按年份归档
- 📱 **响应式设计**: 移动端优先的 UI 设计，优秀的排版体验

## 🚀 工作流

本博客设计为与 **Obsidian** 配合使用。你可以在 Obsidian 中舒适地写作，然后一键同步发布。

1. **写作**: 在本地 Obsidian 仓库 (`/Users/yuxianjun/Project/cosine_obsidian/Blog`) 中撰写文章
2. **同步**: 运行 `npm run sync` 脚本
   - 自动将文章复制到 `content/posts/`
   - 自动将文件名中的空格转换为连字符 `-` (SEO 友好)
   - 自动解析并复制文章中引用的图片资源到 `public/images/`
3. **发布**: 推送到 GitHub，触发 Cloudflare Workers 自动构建并部署到 https://xianjun.cc

## 🛠 开发指南

### 安装依赖

```bash
pnpm install
```

### 内容同步 (核心)

从外部 Obsidian 仓库同步最新的文章和图片：

```bash
npm run sync
```

> **注意**: 需要在 `scripts/sync-content.js` 中配置你的 Obsidian 仓库路径 `OBSIDIAN_VAULT_ROOT`。

### 本地开发

```bash
pnpm dev
```

访问 http://localhost:6789

### 构建生产版本

```bash
pnpm build
pnpm start
```

## ⚙️ 配置

### 站点配置

编辑 `site.config.js` 自定义核心信息：

- 博客标题、描述、作者信息
- Giscus 评论配置
- 社交媒体链接

## 📂 项目结构

```
cosine-log/
├── content/
│   └── posts/          # (自动生成) 同步后的 Markdown 文章
├── public/
│   └── images/         # (自动生成) 同步后的文章图片
├── scripts/
│   └── sync-content.js # Obsidian 内容同步脚本
├── src/
│   ├── app/            # Next.js App Router 路由
│   ├── components/     # React UI 组件
│   ├── libs/           # 工具库 (Markdown 解析等)
│   └── styles/         # 全局样式 (Tailwind)
└── site.config.js      # 全局配置文件
```

## 📝 Markdown 格式

支持标准 Markdown 语法及 Frontmatter 元数据：

```markdown
---
title: "文章标题"
date: "2024-03-20"
tags: ["Next.js", "React"]
description: "文章摘要..."
author: "余贤俊"
draft: false
---

# 正文

支持 **粗体**, _斜体_, `代码块` 以及 Obsidian 风格的图片引用 `![[image.png]]`。
```

## License

MIT © 余贤俊
