# Cosine 余弦是定理

一个基于 Next.js 15 构建的现代博客系统，使用本地 Markdown 文件作为内容源。

## 技术栈

- **框架**: Next.js 15 + TypeScript
- **样式**: Tailwind CSS
- **数据获取**: Server Components (content) + React Query (client state)
- **内容管理**: 本地 Markdown 文件
- **Markdown 处理**: remark, rehype, gray-matter

## 项目结构

```
cosine-log/
├── content/
│   └── posts/          # Markdown 博客文章
├── public/             # 静态资源
├── src/
│   ├── app/           # Next.js App Router
│   │   ├── [slug]/    # 文章详情页
│   │   ├── about/     # 关于页面
│   │   ├── archives/  # 归档页面
│   │   ├── fonts/     # 本地字体文件
│   │   └── layout.tsx # 根布局
│   ├── apis/          # API 接口
│   ├── components/    # React 组件
│   ├── hooks/         # 自定义 Hooks
│   ├── libs/          # 工具库
│   │   └── markdown/  # Markdown 处理
│   ├── routes/        # 页面组件
│   └── styles/        # 全局样式
└── site.config.js     # 站点配置
```

## 开始使用

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 http://localhost:6789

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

服务将运行在 http://localhost:9876

## 写作指南

在 `content/posts/` 目录下创建 Markdown 文件：

```markdown
---
title: "文章标题"
date: "2024-01-01"
tags: ["标签1", "标签2"]
description: "文章描述"
author: "作者名"
draft: false
---

文章内容...
```

## 配置

编辑 `site.config.js` 文件来自定义站点信息：

- 博客标题
- 作者信息
- 社交媒体链接
- 其他配置项

## License

MIT
