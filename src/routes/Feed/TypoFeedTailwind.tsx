'use client'

import { useState, useMemo } from "react"
import { Post } from "src/libs/markdown/types"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import Link from "next/link"
import ThemeToggle from "src/components/ThemeToggle"
import { DEFAULT_CATEGORY } from "src/constants"
import { TCategories, TTags } from "src/types"

type Props = {
  posts: Post[]
}

const TypoFeed: React.FC<Props> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10
  
  // Calculate tags and categories from posts
  const tags = useMemo(() => {
    const tagCount: TTags = {}
    posts.forEach(post => {
      post.frontmatter.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    })
    return tagCount
  }, [posts])
  
  const categories = useMemo(() => {
    const categoryCount: TCategories = {
      [DEFAULT_CATEGORY]: posts.length,
    }
    posts.forEach(post => {
      post.frontmatter.categories.forEach(category => {
        categoryCount[category] = (categoryCount[category] || 0) + 1
      })
    })
    return categoryCount
  }, [posts])

  // 过滤文章
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  })

  // 分页
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-typo-light-background dark:bg-typo-dark-background text-typo-light-font dark:text-typo-dark-font font-montserrat text-base leading-[1.75] tracking-[0.6px] typo-transition">
      {/* Header */}
      <header className="sticky top-0 bg-typo-light-background dark:bg-typo-dark-background border-b border-typo-light-hr dark:border-typo-dark-hr z-50 backdrop-blur-[10px]">
        <nav className="flex justify-between items-center max-w-[1080px] mx-auto px-[8vw] py-6 max-md:flex-col max-md:gap-4 max-md:py-4">
          <Link 
            href="/" 
            className="text-2xl font-semibold text-typo-light-font dark:text-typo-dark-font no-underline typo-transition-colors hover:text-typo-light-active dark:hover:text-typo-dark-active"
          >
            Cosine 余弦是定理
          </Link>
          <div className="flex items-center gap-8 max-md:gap-6">
            <Link 
              href="/archives" 
              className="text-typo-light-fontSecondary dark:text-typo-dark-fontSecondary no-underline text-base typo-transition-colors hover:text-typo-light-active dark:hover:text-typo-dark-active hover:underline"
            >
              归档
            </Link>
            <Link 
              href="/about" 
              className="text-typo-light-fontSecondary dark:text-typo-dark-fontSecondary no-underline text-base typo-transition-colors hover:text-typo-light-active dark:hover:text-typo-dark-active hover:underline"
            >
              关于
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-[1080px] mx-auto px-[8vw] py-12">
        {/* Bio Section */}
        <section className="text-center mb-16 py-12">
          <h1 className="text-[32px] font-semibold m-0 mb-4 text-typo-light-font dark:text-typo-dark-font">
            让万物穿过
          </h1>
          <p className="text-lg text-typo-light-fontSecondary dark:text-typo-dark-fontSecondary m-0 leading-relaxed">
            记录技术思考与生活感悟的数字空间
          </p>
        </section>

        {/* Search Bar */}
        {posts.length > 10 && (
          <section className="mb-12 text-center">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full max-w-[400px] py-3 px-4 border border-typo-light-hr dark:border-typo-dark-hr rounded-lg bg-typo-light-background dark:bg-typo-dark-background text-typo-light-font dark:text-typo-dark-font text-base typo-transition-colors placeholder:text-typo-light-fontExtra dark:placeholder:text-typo-dark-fontExtra focus:outline-none focus:border-typo-light-active dark:focus:border-typo-dark-active focus:shadow-[0_0_0_2px_rgba(64,120,242,0.1)] dark:focus:shadow-[0_0_0_2px_rgba(97,174,238,0.1)]"
            />
          </section>
        )}

        {/* Posts List */}
        {currentPosts.length === 0 ? (
          <div className="text-center py-16 text-typo-light-fontSecondary dark:text-typo-dark-fontSecondary">
            <h2 className="text-typo-light-font dark:text-typo-dark-font mb-4">暂无文章</h2>
            <p className="my-2">正在加载文章列表...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {currentPosts.map((post) => (
            <article key={post.slug} className="pb-6 border-b border-dashed border-typo-light-hr dark:border-typo-dark-hr last:border-b-0">
              <div className="flex justify-between items-center mb-3 max-md:flex-col max-md:items-start max-md:gap-1">
                <time className="text-sm text-typo-light-fontExtra dark:text-typo-dark-fontExtra font-medium">
                  {format(new Date(post.frontmatter.date), 'yyyy-MM-dd', { locale: zhCN })}
                </time>
                <span className="text-sm text-typo-light-active dark:text-typo-dark-active bg-typo-light-listItem dark:bg-typo-dark-listItem py-1 px-3 rounded-xl font-medium">
                  {post.frontmatter.categories[0] || '未分类'}
                </span>
              </div>
              
              <h2 className="m-0 mb-4 text-2xl font-semibold leading-[1.4]">
                <Link 
                  href={`/${post.slug}`} 
                  className="text-typo-light-font dark:text-typo-dark-font no-underline typo-transition-colors hover:text-typo-light-active dark:hover:text-typo-dark-active"
                >
                  {post.frontmatter.title}
                </Link>
              </h2>
              
              <p className="text-typo-light-fontSecondary dark:text-typo-dark-fontSecondary m-0 mb-6 leading-[1.7]">
                {post.excerpt}
              </p>
              
              <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-4">
                <div className="flex gap-2 flex-wrap">
                  {post.frontmatter.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs text-typo-light-fontExtra dark:text-typo-dark-fontExtra bg-typo-light-listItem dark:bg-typo-dark-listItem py-[2px] px-2 rounded-lg before:content-['#']">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/${post.slug}`} 
                  className="text-typo-light-active dark:text-typo-dark-active no-underline text-sm font-medium typo-transition-colors hover:underline hover:translate-x-1"
                >
                  Read more →
                </Link>
              </div>
            </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-16">
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-transparent text-typo-light-fontSecondary dark:text-typo-dark-fontSecondary border border-typo-light-hr dark:border-typo-dark-hr py-2 px-4 rounded-md cursor-pointer text-sm typo-transition-colors hover:bg-typo-light-active dark:hover:bg-typo-dark-active hover:text-white hover:border-typo-light-active dark:hover:border-typo-dark-active"
              >
                ←
              </button>
            )}
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`py-2 px-4 rounded-md cursor-pointer text-sm typo-transition-colors ${
                  currentPage === page
                    ? "bg-typo-light-active dark:bg-typo-dark-active text-white border border-typo-light-active dark:border-typo-dark-active"
                    : "bg-transparent text-typo-light-fontSecondary dark:text-typo-dark-fontSecondary border border-typo-light-hr dark:border-typo-dark-hr hover:bg-typo-light-active dark:hover:bg-typo-dark-active hover:text-white hover:border-typo-light-active dark:hover:border-typo-dark-active"
                }`}
              >
                {page}
              </button>
            ))}
            
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-transparent text-typo-light-fontSecondary dark:text-typo-dark-fontSecondary border border-typo-light-hr dark:border-typo-dark-hr py-2 px-4 rounded-md cursor-pointer text-sm typo-transition-colors hover:bg-typo-light-active dark:hover:bg-typo-dark-active hover:text-white hover:border-typo-light-active dark:hover:border-typo-dark-active"
              >
                →
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default TypoFeed