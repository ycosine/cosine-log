import type { Post } from 'src/libs/markdown/types'

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : 'http://localhost:6789'
    const response = await fetch(`${baseUrl}/api/posts/${slug}`, {
      cache: 'force-cache',
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch post')
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error)
    return null
  }
}