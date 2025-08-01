import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Detail from 'src/routes/Detail'
import { getPost, getAllPostSlugs } from 'src/libs/markdown/server'
import { CONFIG } from '../../../site.config'

interface Props {
  params: Promise<{ slug: string }>
}

// 生成静态参数
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// 生成元数据
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: '文章不存在',
      description: '抱歉，您要查看的文章不存在或已被删除。',
    }
  }

  const title = post.frontmatter.title
  const description = post.frontmatter.description || post.excerpt
  const publishedTime = new Date(post.frontmatter.date).toISOString()
  const modifiedTime = new Date(post.updatedTime).toISOString()
  const url = `${CONFIG.link}/${slug}`
  const image = post.frontmatter.cover || `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(title)}.png`

  return {
    title,
    description,
    authors: [{ name: post.frontmatter.author }],
    keywords: post.frontmatter.tags,
    openGraph: {
      title,
      description,
      url,
      siteName: CONFIG.blog.title,
      locale: CONFIG.lang,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [post.frontmatter.author],
      tags: post.frontmatter.tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: `@${CONFIG.profile.github}`,
    },
    alternates: {
      canonical: url,
    },
    other: {
      'article:published_time': publishedTime,
      'article:modified_time': modifiedTime,
      'article:author': post.frontmatter.author,
      'article:tag': post.frontmatter.tags.join(', '),
    },
  }
}

// 页面组件
export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return <Detail post={post} />
}

// 启用静态生成
export const dynamic = 'force-static'
export const revalidate = 604800 // 7 days in seconds