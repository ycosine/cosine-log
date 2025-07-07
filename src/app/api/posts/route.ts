import { NextResponse } from 'next/server'
import { getAllPosts, getAllTags, getAllCategories } from 'src/libs/markdown/server'

export async function GET() {
  try {
    const [posts, tags, categories] = await Promise.all([
      getAllPosts(),
      getAllTags(),
      getAllCategories()
    ])

    return NextResponse.json({
      posts,
      tags,
      categories,
      total: posts.length
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}