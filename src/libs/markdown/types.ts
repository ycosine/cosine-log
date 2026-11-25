export interface PostFrontmatter {
  title: string
  date: string
  tags: string[]
  categories: string[]
  description: string
  author: string
  draft: boolean
  cover?: string
}

export interface TocItem {
  id: string
  text: string
  depth: 2 | 3
}

// 列表页用的轻量信息，不含正文
export interface PostSummary {
  slug: string
  title: string
  date: string // yyyy-MM-dd
  tags: string[]
}

export interface PostLink {
  slug: string
  title: string
}

export interface Post {
  id: string
  slug: string
  frontmatter: PostFrontmatter
  content: string
  htmlContent: string
  toc: TocItem[]
  excerpt: string
  readingTime: number
  createdTime: string
  updatedTime: string
}
