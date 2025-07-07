export interface PostFrontmatter {
  title: string
  date: string
  tags: string[]
  categories: string[]
  description: string
  author: string
  cover?: string
  draft: boolean
}

export interface Post {
  id: string
  slug: string
  frontmatter: PostFrontmatter
  content: string
  htmlContent: string
  excerpt: string
  readingTime: number
  createdTime: string
  updatedTime: string
}