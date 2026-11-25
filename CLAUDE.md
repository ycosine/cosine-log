# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog ("Cosine 余弦是定理") built with Next.js 16 (App Router) that uses local Markdown files as the content source. Content is authored in an external Obsidian vault and synced into the repo.

## Development Commands

- `pnpm dev` - Start development server on port 6789
- `pnpm build` - Static export to `out/` (runs `scripts/copy-assets.js` first via prebuild)
- `pnpm preview` - Serve `out/` locally with wrangler on port 9876, emulating Cloudflare (run `pnpm build` first)
- `pnpm deploy` - Deploy `out/` with wrangler (normally done by Cloudflare Workers Builds on push to `main`)
- `pnpm lint` - Run oxlint on `src/` and `scripts/`
- `pnpm sync` - Sync posts and images from the local Obsidian vault (path hardcoded in `scripts/sync-content.js`; wipes and regenerates `content/posts/`)
- `pnpm postbuild` - Generate sitemap/robots.txt into `out/` via next-sitemap (runs automatically after build)

## Core Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 — `src/styles/globals.css` loads `tailwind.config.js` via `@config`. The palette ("纯墨") is CSS variables in `globals.css` (`:root` light, `.dark` dark); `tailwind.config.js` maps them to utilities (`bg-paper`, `text-ink`, `text-ink-2/3`, `text-body`, `border-rule`, `border-rule-2`, `bg-soft`). Keep both. Fonts: Inter (next/font/google) for Latin, system CJK fonts for Chinese, local JetBrains Mono for code/meta
- **Content**: Local Markdown files with frontmatter
- **Markdown Processing**: unified pipeline (remark-parse → remark-gfm → remark-rehype → rehype-highlight → rehype-stringify) plus custom plugins (mermaid, Obsidian `![[]]` images, next-image, `rehype-toc` for heading ids + TOC, `rehype-code-block` for the language label/copy button)
- **Comments**: Giscus (config hardcoded in `site.config.js`)

### Key Directory Structure

- `content/posts/` - Markdown blog posts with frontmatter (synced from Obsidian; do not hand-edit if using `pnpm sync`, it wipes this directory)
- `src/app/` - App Router routes: `page.tsx` (feed), `[slug]/page.tsx` (post detail), `about/`, `archives/`, `feed.xml/route.ts` (RSS), `layout.tsx`, `not-found.tsx`
- `src/routes/` - Page UIs (Home, Detail/PostDetail, About, Archives); all share `SiteHeader` + `Footer`
- `src/libs/markdown/` - Markdown parsing: `server.ts` (reads `content/posts`, filters drafts), `processor.ts` (unified pipeline), `imageProcessor.ts`, `plugins/`
- `src/components/` - Reusable UI: `SiteHeader`, `Logo` (cosine wordmark + wave), `icons.tsx` (1.5px line icons), `PostIndex` (year-grouped list), `TableOfContents`, `ReadingProgress`, `MarkdownContent`, `Comments`, `Footer`, `ThemeToggle`
- `src/libs/wave.ts` - Generates the exact y = cos x polyline used by the logo; `src/app/icon.svg`, `apple-icon.png`, `favicon.ico` are the site icons
- `src/styles/globals.css` - Palette variables, base styles, `.markdown-content` typography, and the monochrome highlight.js theme
- `scripts/` - `sync-content.js` (Obsidian sync), `copy-assets.js` (prebuild asset copy)

### Data Flow

1. Write posts in the Obsidian vault, run `pnpm sync` to copy them into `content/posts/`
2. `src/libs/markdown/server.ts` reads and parses Markdown at build/request time (Server Components)
3. List pages use `getPostIndex()` (frontmatter only); the post page uses `getPost()` (full render + TOC)

## Content Management

### Markdown File Format

Posts are stored in `content/posts/` with this frontmatter structure:

```markdown
---
title: "Article Title"
date: "2024-01-01"
tags: ["tag1", "tag2"]
categories: ["category"]
description: "Article description"
author: "Author Name"
draft: false
---

# Content starts here...
```

`cover` is optional. Posts with `draft: true` are excluded from the site. Filenames use hyphens instead of spaces (the sync script enforces this) and are NFC-normalized for Chinese titles.

## Deployment

Deployed as a fully static site (`output: 'export'`) to Cloudflare Workers Static Assets at https://xianjun.cc, via Cloudflare Workers Builds (Git integration, build `pnpm build`, deploy `npx wrangler deploy`). Config lives in `wrangler.jsonc`; cache headers in `public/_headers`. Constraints of static export: no ISR/`revalidate`, no `next/image` optimization, route handlers must be `force-static`, and `trailingSlash` must stay `false` (Giscus maps comments by pathname).

## Configuration

All site settings are in `site.config.js`: profile, blog metadata, site URL, and Giscus comment config. There are no required environment variables.
