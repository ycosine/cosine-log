# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog ("Cosine 余弦是定理") built with Next.js 16 (App Router) that uses local Markdown files as the content source. Content is authored in an external Obsidian vault and synced into the repo.

## Development Commands

- `pnpm dev` - Start development server on port 6789
- `pnpm build` - Build for production (runs `scripts/copy-assets.js` first via prebuild)
- `pnpm start` - Start production server on port 9876
- `pnpm lint` - Run oxlint on `src/` and `scripts/`
- `pnpm sync` - Sync posts and images from the local Obsidian vault (path hardcoded in `scripts/sync-content.js`; wipes and regenerates `content/posts/`)
- `pnpm postbuild` - Generate sitemap/robots.txt via next-sitemap (runs automatically after build; output is gitignored)

## Core Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 — note `src/styles/globals.css` loads `tailwind.config.js` via `@config`; the custom palette lives in that file, do not delete it
- **Content**: Local Markdown files with frontmatter
- **Markdown Processing**: unified pipeline (remark-parse → remark-gfm → remark-rehype → rehype-highlight → rehype-stringify) plus custom plugins (mermaid, Obsidian `![[]]` images, next-image)
- **Comments**: Giscus (config hardcoded in `site.config.js`)

### Key Directory Structure

- `content/posts/` - Markdown blog posts with frontmatter (synced from Obsidian; do not hand-edit if using `pnpm sync`, it wipes this directory)
- `src/app/` - App Router routes: `page.tsx` (feed), `[slug]/page.tsx` (post detail), `about/`, `archives/`, `feed.xml/route.ts` (RSS), `layout.tsx`, `not-found.tsx`
- `src/routes/` - Main UI components (Feed/PostList, Detail/PostDetail, About, Archives)
- `src/libs/markdown/` - Markdown parsing: `server.ts` (reads `content/posts`, filters drafts), `processor.ts` (unified pipeline), `imageProcessor.ts`, `plugins/`
- `src/components/` - Reusable UI components (MarkdownContent, Comments, Footer, ThemeToggle)
- `src/styles/globals.css` - All global styles and the highlight.js theme (hand-written `.hljs-*` rules)
- `scripts/` - `sync-content.js` (Obsidian sync), `copy-assets.js` (prebuild asset copy)

### Data Flow

1. Write posts in the Obsidian vault, run `pnpm sync` to copy them into `content/posts/`
2. `src/libs/markdown/server.ts` reads and parses Markdown at build/request time (Server Components)
3. `src/routes/` components render the feed and post detail pages

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

## Configuration

All site settings are in `site.config.js`: profile, blog metadata, site URL, and Giscus comment config. There are no required environment variables.
