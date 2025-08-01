'use client'

import { useState, useMemo } from "react"
import { Post } from "src/libs/markdown/types"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import Link from "next/link"
import ThemeToggle from "src/components/ThemeToggle"
import { TTags } from "src/types"
import { CONFIG } from "../../../site.config"

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
      <header className="sticky top-4 bg-typo-light-background/80 dark:bg-typo-dark-background/80 backdrop-blur-[10px] z-50">
        <div className="max-width-main mx-auto px-[8vw]">
          <nav className="flex justify-between items-center py-6 border-b border-typo-light-hr dark:border-typo-dark-hr max-md:flex-col max-md:gap-4 max-md:py-4">
            <Link 
              href="/" 
              className="text-2xl font-semibold text-typo-light-font dark:text-typo-dark-font no-underline typo-transition"
            >
              {CONFIG.blog.title}
            </Link>
            <div className="flex items-center gap-8 max-md:gap-6">
              <Link 
                href="/archives" 
                className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary no-underline text-base typo-transition hover:text-typo-light-font dark:hover:text-typo-dark-font hover:underline"
              >
                归档
              </Link>
              <Link 
                href="/about" 
                className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary no-underline text-base typo-transition hover:text-typo-light-font dark:hover:text-typo-dark-font hover:underline"
              >
                关于
              </Link>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-width-main mx-auto px-[8vw] py-12">
        {/* Bio Section */}
        <section className="text-center mb-16 py-12">
          <h1 className="text-[32px] font-semibold m-0 mb-4 text-typo-light-font dark:text-typo-dark-font">
            {CONFIG.profile.bio}
          </h1>
          <p className="text-lg text-typo-light-font-secondary dark:text-typo-dark-font-secondary m-0 leading-relaxed">
            {CONFIG.blog.description}
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
              className="w-full max-w-[400px] py-3 px-4 border border-typo-light-hr dark:border-typo-dark-hr rounded-lg bg-typo-light-background dark:bg-typo-dark-background text-typo-light-font dark:text-typo-dark-font text-base typo-transition-colors placeholder:text-typo-light-font-extra dark:placeholder:text-typo-dark-font-extra focus:outline-hidden focus:border-typo-light-font dark:focus:border-typo-dark-font"
            />
          </section>
        )}

        {/* Posts List */}
        {currentPosts.length === 0 ? (
          <div className="text-center py-16 text-typo-light-font-secondary dark:text-typo-dark-font-secondary">
            <h2 className="text-typo-light-font dark:text-typo-dark-font mb-4">暂无文章</h2>
            <p className="my-2">正在加载文章列表...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {currentPosts.map((post) => (
            <article key={post.slug} className="pb-6 border-b border-dashed border-typo-light-hr dark:border-typo-dark-hr last:border-b-0">
              <time className="block text-sm text-typo-light-font-extra dark:text-typo-dark-font-extra font-medium mb-3">
                {format(new Date(post.frontmatter.date), 'yyyy-MM-dd', { locale: zhCN })}
              </time>
              
              <h2 className="m-0 mb-4 text-2xl font-semibold leading-[1.4]">
                <Link 
                  href={`/${post.slug}`} 
                  className="text-typo-light-font dark:text-typo-dark-font no-underline typo-transition hover:underline"
                >
                  {post.frontmatter.title}
                </Link>
              </h2>
              
              <p className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary m-0 mb-6 leading-[1.7]">
                {post.excerpt}
              </p>
              
              <div className="flex gap-2 flex-wrap">
                {post.frontmatter.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs text-typo-light-font-extra dark:text-typo-dark-font-extra bg-typo-light-list-item dark:bg-typo-dark-list-item py-[2px] px-2 rounded-lg before:content-['#']">
                    {tag}
                  </span>
                ))}
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
                className="bg-transparent text-typo-light-font-secondary dark:text-typo-dark-font-secondary border border-typo-light-hr dark:border-typo-dark-hr py-2 px-4 rounded-md cursor-pointer text-sm typo-transition hover:bg-typo-light-hr dark:hover:bg-typo-dark-hr hover:text-typo-light-font dark:hover:text-typo-dark-font hover:border-typo-light-font dark:hover:border-typo-dark-font"
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
                    ? "bg-typo-light-font dark:bg-typo-dark-font text-typo-light-background dark:text-typo-dark-background border border-typo-light-font dark:border-typo-dark-font"
                    : "bg-transparent text-typo-light-font-secondary dark:text-typo-dark-font-secondary border border-typo-light-hr dark:border-typo-dark-hr hover:bg-typo-light-hr dark:hover:bg-typo-dark-hr hover:text-typo-light-font dark:hover:text-typo-dark-font hover:border-typo-light-font dark:hover:border-typo-dark-font"
                }`}
              >
                {page}
              </button>
            ))}
            
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-transparent text-typo-light-font-secondary dark:text-typo-dark-font-secondary border border-typo-light-hr dark:border-typo-dark-hr py-2 px-4 rounded-md cursor-pointer text-sm typo-transition hover:bg-typo-light-hr dark:hover:bg-typo-dark-hr hover:text-typo-light-font dark:hover:text-typo-dark-font hover:border-typo-light-font dark:hover:border-typo-dark-font"
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