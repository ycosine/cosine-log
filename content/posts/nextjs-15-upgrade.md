---
title: "升级到 Next.js 15"
date: "2024-01-02"
tags: ["Next.js", "升级", "前端"]
categories: ["技术"]
description: "记录升级到 Next.js 15 的过程和注意事项"
author: "余贤俊"
cover: "/images/nextjs-15-cover.jpg"
draft: false
---

# 升级到 Next.js 15

今天将博客系统从 Next.js 14 升级到了 Next.js 15，记录一下升级过程中的要点。

## 主要变化

### 1. 性能优化
- 更快的构建速度
- 优化的运行时性能
- 更好的开发体验

### 2. 新功能
- 改进的 App Router
- 更好的 TypeScript 支持
- 增强的中间件功能

## 升级步骤

1. 更新 package.json 中的 Next.js 版本
2. 安装新的依赖
3. 检查代码兼容性
4. 测试应用功能

```bash
pnpm install next@15
```

## 注意事项

- 检查所有依赖包的兼容性
- 测试所有页面和功能
- 关注性能指标变化

升级完成后，应用运行正常，性能有所提升。