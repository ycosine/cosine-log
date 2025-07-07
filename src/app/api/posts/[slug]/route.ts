import { NextResponse } from 'next/server'
import { getPost } from 'src/libs/markdown/server'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const post = await getPost(slug)

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error(`Error fetching post ${params.slug}:`, error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}