'use client'

import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import Link from "next/link"
import { BiTime, BiCalendar, BiUser, BiArrowBack } from "react-icons/bi"
import { HiOutlineShare, HiOutlineBookmark, HiHome } from "react-icons/hi"
import type { Post } from "src/libs/markdown/types"

type Props = {
  post: Post
}

const ModernPostDetail: React.FC<Props> = ({ post }) => {
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">文章不存在</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">抱歉，您要查看的文章不存在或已被删除。</p>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BiArrowBack className="mr-2" />
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-16 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <BiArrowBack className="mr-2 h-5 w-5" />
              <span className="font-medium">返回首页</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <button
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="收藏文章"
              >
                <HiOutlineBookmark className="h-5 w-5" />
              </button>
              <button
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="分享文章"
              >
                <HiOutlineShare className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 mb-6">
            {post.frontmatter.categories?.[0] || '技术'}
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.frontmatter.title}
          </h1>
          
          {post.frontmatter.description && (
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              {post.frontmatter.description}
            </p>
          )}
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <div className="flex items-center">
              <BiUser className="mr-2 h-4 w-4" />
              {post.frontmatter.author}
            </div>
            <div className="flex items-center">
              <BiCalendar className="mr-2 h-4 w-4" />
              {format(new Date(post.frontmatter.date), 'yyyy年MM月dd日', { locale: zhCN })}
            </div>
            <div className="flex items-center">
              <BiTime className="mr-2 h-4 w-4" />
              {post.readingTime || '5'} 分钟阅读
            </div>
          </div>

          {/* Tags */}
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {post.frontmatter.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Cover Image */}
        {post.frontmatter.cover && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={post.frontmatter.cover} 
              alt={post.frontmatter.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Article Content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-p:text-gray-700 dark:prose-p:text-gray-300
            prose-a:text-blue-600 dark:prose-a:text-blue-400
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-code:text-pink-600 dark:prose-code:text-pink-400
            prose-code:bg-gray-100 dark:prose-code:bg-gray-800
            prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
            prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400
            prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/30
            prose-th:text-gray-900 dark:prose-th:text-white
            prose-td:text-gray-700 dark:prose-td:text-gray-300"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            最后更新：{format(new Date(post.updatedTime || post.frontmatter.date), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
          </div>
          
          {/* Back to Home Link */}
          <div className="text-center mt-8">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <HiHome className="mr-2 h-5 w-5" />
              回到首页
            </Link>
          </div>
        </footer>
      </article>
    </div>
  )
}

export default ModernPostDetail