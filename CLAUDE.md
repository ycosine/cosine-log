# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern blog platform built with Next.js 15 that uses local Markdown files as the content source. The blog is called "Cosine 余弦是定理" and has been completely rewritten with a modern UI design and Markdown-based architecture.

## Development Commands

- `pnpm dev` - Start development server on port 6789
- `pnpm build` - Build for production (uses increased memory limit)
- `pnpm start` - Start production server on port 9876
- `pnpm lint` - Run ESLint for code quality checks
- `pnpm postbuild` - Generate sitemap after build (automatically runs after build)

## Core Architecture

### Tech Stack
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Emotion (CSS-in-JS) with modern color system
- **Data Fetching**: React Query (@tanstack/react-query)
- **Content**: Local Markdown files with frontmatter
- **Markdown Processing**: remark, rehype, gray-matter
- **File Storage**: Optional Alibaba Cloud OSS integration

### Key Directory Structure
- `content/posts/` - Markdown blog posts with frontmatter
- `src/pages/` - Next.js pages including API routes
- `src/routes/` - Main UI components (ModernFeed, ModernPostDetail)
- `src/apis/markdown-client/` - Markdown file processing API
- `src/libs/markdown/` - Core markdown parsing and utilities
- `src/libs/oss/` - OSS file upload utilities
- `src/hooks/` - Custom React hooks for data fetching
- `src/components/` - Reusable UI components
- `src/styles/` - Modern color system and theme definitions

### Data Flow
1. **Content Creation**: Write Markdown files in `content/posts/` with frontmatter
2. **File Processing**: `src/libs/markdown/index.ts` reads and parses Markdown files
3. **API Layer**: `src/apis/markdown-client/` provides data access methods
4. **State Management**: React Query manages server state with updated hooks
5. **Rendering**: Modern UI components display content with responsive design

### Main Components
- **ModernFeed** (`src/routes/Feed/ModernFeed.tsx`): Completely redesigned main page with hero section, search, filtering, and responsive card layouts
- **ModernPostDetail** (`src/routes/Detail/ModernPostDetail.tsx`): Modern article view with typography optimization and reading experience enhancements

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
cover: "/images/cover.jpg"
draft: false
---

# Content starts here...
```

### Required Fields
- `title`: Article title
- `date`: Publication date (YYYY-MM-DD format)
- `tags`: Array of tags
- `categories`: Array of categories
- `description`: Article description/summary
- `author`: Author name
- `draft`: Whether article is draft (true/false)

### Optional Fields
- `cover`: Cover image URL or path

## Configuration

### Site Configuration
All site settings are in `site.config.js`:
- Profile information, blog metadata
- Markdown configuration (posts directory)
- OSS configuration for image uploads
- Plugin settings (Google Analytics, comments, etc.)

### Environment Variables
See `.env.example` for complete list:
- `OSS_*`: Optional - Alibaba Cloud OSS configuration for image uploads
- `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID`: Optional - Google Analytics
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: Optional - Google Search Console
- `NEXT_PUBLIC_UTTERANCES_REPO`: Optional - GitHub repo for comments

## Development Notes

### Modern UI Design
- **Color System**: Comprehensive light/dark theme with primary, secondary, accent colors
- **Typography**: Optimized reading experience with proper spacing and hierarchy
- **Responsive Layout**: Mobile-first design with clean card-based layouts
- **Interactive Elements**: Hover effects, smooth transitions, modern buttons and inputs

### Content Processing
- **Markdown Parsing**: Full support for standard Markdown with code highlighting
- **Frontmatter Processing**: Structured metadata extraction
- **Reading Time**: Automatic calculation based on content length
- **Search & Filtering**: Real-time search with tag and category filtering

### Performance Optimizations
- **Static Generation**: All posts are statically generated at build time
- **Image Optimization**: Next.js image optimization with OSS integration
- **Code Splitting**: Automatic code splitting for optimal loading
- **Caching**: React Query for client-side caching with 5-minute stale time

### File Upload (OSS)
- **Image Upload**: Configurable OSS integration for image hosting
- **Asset Management**: Centralized asset handling with CDN support
- **Security**: Environment-based credentials management

### Docker Support
The project includes Docker configuration:
- `Dockerfile` for containerization
- `docker-compose.yml` for local development
- `deploy.sh` for deployment automation