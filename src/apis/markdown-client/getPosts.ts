import type { Post } from 'src/libs/markdown/types'

export interface PostsResponse {
  posts: Post[]
  tags: string[]
  categories: string[]
  total: number
}

export async function getPosts(): Promise<PostsResponse> {
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : 'http://localhost:6789'
    const response = await fetch(`${baseUrl}/api/posts`, {
      cache: 'force-cache',
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching posts:', error)
    return {
      posts: [],
      tags: [],
      categories: [],
      total: 0
    }
  }
}

export async function getFilteredPosts(params: {
  tag?: string
  category?: string
  search?: string
  page?: number
  limit?: number
}): Promise<PostsResponse> {
  try {
    let posts = await getAllPosts()
    
    // 根据标签过滤
    if (params.tag) {
      posts = posts.filter(post => 
        post.frontmatter.tags.includes(params.tag!)
      )
    }
    
    // 根据分类过滤
    if (params.category) {
      posts = posts.filter(post => 
        post.frontmatter.categories.includes(params.category!)
      )
    }
    
    // 搜索过滤
    if (params.search) {
      const query = params.search.toLowerCase()
      posts = posts.filter(post => 
        post.frontmatter.title.toLowerCase().includes(query) ||
        post.frontmatter.description.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      )
    }
    
    // 分页
    const page = params.page || 1
    const limit = params.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = posts.slice(startIndex, endIndex)
    
    const [tags, categories] = await Promise.all([
      getAllTags(),
      getAllCategories()
    ])
    
    return {
      posts: paginatedPosts,
      tags,
      categories,
      total: posts.length
    }
  } catch (error) {
    console.error('Error fetching filtered posts:', error)
    return {
      posts: [],
      tags: [],
      categories: [],
      total: 0
    }
  }
}