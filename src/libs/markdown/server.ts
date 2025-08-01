import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { imageProcessor } from './imageProcessor'
import { processMarkdown } from './processor'
import type { Post, PostFrontmatter } from './types'

const postsDirectory = path.join(process.cwd(), 'content/posts')

// 确保内容目录存在
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

// 计算阅读时间（按中文字符计算）
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.length
  return Math.ceil(words / wordsPerMinute)
}

// 生成文章摘要
function generateExcerpt(content: string, maxLength: number = 150): string {
  const plainText = content.replace(/[#*`]/g, '').replace(/\n/g, ' ')
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText
}

// 获取所有文章的 slug
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
}

// 根据 slug 获取文章内容
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // 验证必要字段
    if (!data.title || !data.date) {
      console.warn(`Post ${slug} missing required fields`)
      return null
    }

    // 处理图片链接
    const { content: processedImageContent } = imageProcessor.processImages(content)
    
    // 处理 Markdown 转 HTML（包括代码高亮和 Mermaid）
    const htmlContent = await processMarkdown(processedImageContent)
    
    // 获取文件统计信息
    const stats = fs.statSync(fullPath)
    
    const post: Post = {
      id: slug,
      slug,
      frontmatter: {
        title: data.title,
        date: data.date,
        tags: data.tags || [],
        categories: [], // Deprecated, kept for backward compatibility
        description: data.description || '',
        author: data.author || '',
        draft: data.draft || false
      },
      content,
      htmlContent,
      excerpt: generateExcerpt(content),
      readingTime: calculateReadingTime(content),
      createdTime: format(stats.birthtime, 'yyyy-MM-dd HH:mm:ss', { locale: zhCN }),
      updatedTime: format(stats.mtime, 'yyyy-MM-dd HH:mm:ss', { locale: zhCN })
    }
    
    return post
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// 获取所有文章
export async function getAllPosts(): Promise<Post[]> {
  const slugs = getAllPostSlugs()
  const posts = await Promise.all(
    slugs.map(slug => getPostBySlug(slug))
  )
  
  return posts
    .filter((post): post is Post => post !== null)
    .filter(post => !post.frontmatter.draft) // 过滤草稿
    .sort((a, b) => {
      // 按日期降序排序
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    })
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = new Set<string>()
  
  posts.forEach(post => {
    post.frontmatter.tags.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

// 获取所有分类 - Deprecated
export async function getAllCategories(): Promise<string[]> {
  return []
}

// 根据标签过滤文章
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter(post => 
    post.frontmatter.tags.includes(tag)
  )
}

// 根据分类过滤文章 - Deprecated
export async function getPostsByCategory(category: string): Promise<Post[]> {
  return []
}

// 搜索文章
export async function searchPosts(query: string): Promise<Post[]> {
  const posts = await getAllPosts()
  const lowerQuery = query.toLowerCase()
  
  return posts.filter(post => 
    post.frontmatter.title.toLowerCase().includes(lowerQuery) ||
    post.frontmatter.description.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery) ||
    post.frontmatter.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

// 别名导出，方便导入
export const getPost = getPostBySlug