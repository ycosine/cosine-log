'use client'

import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import Link from "next/link"
import ThemeToggle from "src/components/ThemeToggle"
import { MarkdownContent } from "src/components/MarkdownContent"
import type { Post } from "src/libs/markdown/types"

type Props = {
  post: Post
}

const TypoPostDetail: React.FC<Props> = ({ post }) => {
  if (!post) {
    return (
      <div className="min-h-screen bg-typo-light-background dark:bg-typo-dark-background text-typo-light-font dark:text-typo-dark-font font-montserrat text-base leading-[1.75] tracking-[0.6px] typo-transition">
        <header className="sticky top-0 bg-typo-light-background dark:bg-typo-dark-background border-b border-typo-light-hr dark:border-typo-dark-hr z-50 backdrop-blur-[10px]">
          <nav className="flex justify-between items-center max-width-main mx-auto px-[8vw] py-6 max-md:flex-col max-md:gap-4 max-md:py-4">
            <Link 
              href="/" 
              className="text-2xl font-semibold text-typo-light-font dark:text-typo-dark-font no-underline typo-transition-colors hover:text-typo-light-active dark:hover:text-typo-dark-active"
            >
              Cosine 余弦是定理
            </Link>
            <div className="flex items-center gap-8 max-md:gap-6">
              <Link 
                href="/archives" 
                className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary no-underline text-base typo-transition-colors hover:text-typo-light-active dark:hover:text-typo-dark-active hover:underline"
              >
                归档
              </Link>
              <Link 
                href="/about" 
                className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary no-underline text-base typo-transition-colors hover:text-typo-light-active dark:hover:text-typo-dark-active hover:underline"
              >
                关于
              </Link>
              <ThemeToggle />
            </div>
          </nav>
        </header>
        
        <main className="max-width-main mx-auto px-[8vw] py-12">
          <div className="text-center py-16">
            <h1 className="text-3xl mb-4 text-typo-light-font dark:text-typo-dark-font">404 - Post Not Found</h1>
            <p className="text-lg text-typo-light-font-secondary dark:text-typo-dark-font-secondary mb-8">
              The post you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link 
              href="/" 
              className="text-typo-light-active dark:text-typo-dark-active no-underline text-base typo-transition-colors hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-typo-light-background dark:bg-typo-dark-background text-typo-light-font dark:text-typo-dark-font font-montserrat text-base leading-[1.75] tracking-[0.6px] typo-transition">
      {/* Header */}
      <header className="sticky top-0 bg-typo-light-background dark:bg-typo-dark-background border-b border-typo-light-hr dark:border-typo-dark-hr z-50 backdrop-blur-[10px]">
        <nav className="flex justify-between items-center max-width-main mx-auto px-[8vw] py-6 max-md:flex-col max-md:gap-4 max-md:py-4">
          <Link 
            href="/" 
            className="text-2xl font-semibold text-typo-light-font dark:text-typo-dark-font no-underline typo-transition-colors hover:text-typo-light-active dark:hover:text-typo-dark-active"
          >
            Cosine 余弦是定理
          </Link>
          <div className="flex items-center gap-8 max-md:gap-6">
            <Link 
              href="/archives" 
              className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary no-underline text-base typo-transition-colors hover:text-typo-light-active dark:hover:text-typo-dark-active hover:underline"
            >
              归档
            </Link>
            <Link 
              href="/about" 
              className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary no-underline text-base typo-transition-colors hover:text-typo-light-active dark:hover:text-typo-dark-active hover:underline"
            >
              关于
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-width-main mx-auto px-[8vw] py-12">
        <article className="max-w-[800px] mx-auto">
          {/* Article Header */}
          <header className="mb-12 text-center">
            <div className="flex justify-center items-center gap-2 mb-6 text-typo-light-font-extra dark:text-typo-dark-font-extra text-sm max-md:flex-wrap">
              <span>{format(new Date(post.frontmatter.date), 'yyyy-MM-dd', { locale: zhCN })}</span>
              <span className="opacity-50">·</span>
              <span>{post.frontmatter.categories[0] || '未分类'}</span>
              <span className="opacity-50">·</span>
              <span>{post.readingTime || '5'} min read</span>
            </div>
            
            <h1 className="text-[36px] font-bold m-0 mb-6 text-typo-light-font dark:text-typo-dark-font leading-[1.3] max-md:text-[28px]">
              {post.frontmatter.title}
            </h1>
            
            {post.frontmatter.description && (
              <p className="text-lg text-typo-light-font-secondary dark:text-typo-dark-font-secondary leading-relaxed m-0 mb-6 max-w-[600px] mx-auto">
                {post.frontmatter.description}
              </p>
            )}
            
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap justify-center mt-6">
                {post.frontmatter.tags.map(tag => (
                  <span key={tag} className="text-xs text-typo-light-font-extra dark:text-typo-dark-font-extra bg-typo-light-list-item dark:bg-typo-dark-list-item py-1 px-3 rounded-xl before:content-['#']">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Cover Image */}
          {post.frontmatter.cover && (
            <div className="m-0 mb-12 text-center">
              <img 
                src={post.frontmatter.cover} 
                alt={post.frontmatter.title}
                className="max-w-full h-auto rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="mb-16">
            <MarkdownContent content={post.htmlContent} />
          </div>

          {/* Article Footer */}
          <footer className="border-t border-dashed border-typo-light-hr dark:border-typo-dark-hr pt-8 text-center flex flex-col gap-6">
            <div className="text-sm text-typo-light-font-extra dark:text-typo-dark-font-extra">
              Last updated: {format(new Date(post.updatedTime || post.frontmatter.date), 'yyyy-MM-dd', { locale: zhCN })}
            </div>
            
            <Link 
              href="/" 
              className="text-typo-light-active dark:text-typo-dark-active no-underline text-base font-medium typo-transition-colors hover:underline hover:-translate-x-1"
            >
              ← Back to Home
            </Link>
          </footer>
        </article>
      </main>
    </div>
  )
}

export default TypoPostDetail