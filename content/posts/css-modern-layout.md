---
title: "现代 CSS 布局完全指南"
date: "2024-02-28"
tags: ["CSS", "布局", "前端"]
description: "掌握 Flexbox、Grid 和 Container Queries 等现代 CSS 布局技术"
author: "余贤俊"
draft: false
---

# 现代 CSS 布局完全指南

CSS 布局技术在过去几年有了巨大的进步。本文将介绍现代 CSS 布局的核心技术。

## Flexbox 布局

Flexbox 是一维布局的最佳选择：

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* 响应式 Flexbox */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.card {
  flex: 1 1 300px; /* grow shrink basis */
}
```

### 常用 Flexbox 模式

垂直居中：

```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

等高列：

```css
.columns {
  display: flex;
}

.column {
  flex: 1;
  padding: 1rem;
}
```

## Grid 布局

Grid 是二维布局的强大工具：

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

/* 复杂布局 */
.app-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

### Grid 的强大功能

自动填充：

```css
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
```

网格线命名：

```css
.named-grid {
  display: grid;
  grid-template-columns: [start] 1fr [content-start] 3fr [content-end] 1fr [end];
}

.content {
  grid-column: content-start / content-end;
}
```

## Container Queries

容器查询是响应式设计的游戏改变者：

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 150px 1fr;
  }
}

@container card (min-width: 600px) {
  .card {
    grid-template-columns: 200px 1fr;
    gap: 2rem;
  }
}
```

## CSS 逻辑属性

使用逻辑属性支持多语言布局：

```css
/* 传统方式 */
.box {
  margin-left: 1rem;
  padding-right: 2rem;
}

/* 逻辑属性 */
.box {
  margin-inline-start: 1rem;
  padding-inline-end: 2rem;
}

/* 逻辑尺寸 */
.container {
  max-inline-size: 1200px; /* 相当于 max-width */
  min-block-size: 100vh;   /* 相当于 min-height */
}
```

## Subgrid

Subgrid 让嵌套网格更加灵活：

```css
.parent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.child-grid {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 2;
}
```

## CSS Layers

使用级联层管理样式优先级：

```css
@layer reset, base, components, utilities;

@layer reset {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

@layer base {
  body {
    font-family: system-ui, sans-serif;
    line-height: 1.5;
  }
}

@layer components {
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
}
```

## 响应式设计新特性

### clamp() 函数

```css
.fluid-text {
  font-size: clamp(1rem, 2vw + 1rem, 3rem);
}

.fluid-spacing {
  padding: clamp(1rem, 5vw, 3rem);
}
```

### aspect-ratio

```css
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
  background: #000;
}

.square {
  aspect-ratio: 1;
  width: 100%;
  max-width: 300px;
}
```

## 实用布局模式

### 圣杯布局

```css
.holy-grail {
  display: grid;
  grid-template: auto 1fr auto / auto 1fr auto;
  min-height: 100vh;
}

header {
  grid-column: 1 / 4;
}

main {
  grid-column: 2 / 3;
}

footer {
  grid-column: 1 / 4;
}
```

### 卡片布局

```css
.cards {
  --min: 250px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--min), 1fr));
  gap: 2rem;
}
```

## 总结

现代 CSS 提供了强大而灵活的布局工具：

- **Flexbox** - 一维布局的首选
- **Grid** - 复杂二维布局的解决方案
- **Container Queries** - 组件级响应式设计
- **逻辑属性** - 国际化友好的布局
- **新函数** - clamp()、min()、max() 等

掌握这些技术，可以轻松创建复杂、响应式的现代网页布局。