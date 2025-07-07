import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"

// TODO: refactor types
export type NextPageWithLayout<PageProps = {}> = NextPage<PageProps> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type TPostStatus = "Private" | "Public" | "PublicOnDetail"
export type TPostType = "Post" | "Paper" | "Page"

// New Markdown-based post type
export type TPost = {
  id: string
  slug: string
  title: string
  date: { start_date: string }
  tags: string[]
  category: string[]
  summary: string
  author: string
  cover?: string
  content: string
  htmlContent: string
  excerpt: string
  readingTime: number
  createdTime: string
  updatedTime: string
  type: TPostType[]
  status: TPostStatus[]
  fullWidth: boolean
  thumbnail?: string
  draft: boolean
}

export type PostDetail = TPost & {
  htmlContent: string
}

export type TPosts = TPost[]

export type TTags = {
  [tagName: string]: number
}
export type TCategories = {
  [category: string]: number
}

export type ThemeType = "dark" | "light"

// Re-export markdown types
export type { Post, PostFrontmatter } from 'src/libs/markdown'
