"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import ThemeToggle from "src/components/ThemeToggle"
import Footer from "src/components/Footer"
import type { Post } from "src/libs/markdown/types"
import { CONFIG } from "../../../site.config"

type Props = {
  posts: Post[]
}

type GroupedPosts = {
  [year: string]: Post[]
}

const Archives: React.FC<Props> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 20

  // 按年分组文章
  const groupedPosts = useMemo(() => {
    const groups: GroupedPosts = {}

    posts.forEach((post) => {
      const date = new Date(post.frontmatter.date)
      const year = format(date, "yyyy")

      if (!groups[year]) {
        groups[year] = []
      }

      groups[year].push(post)
    })

    // Sort posts within each year by date descending
    Object.keys(groups).forEach((year) => {
      groups[year].sort(
        (a, b) =>
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
      )
    })

    return groups
  }, [posts])

  // 过滤文章
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.frontmatter.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      post.frontmatter.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      post.frontmatter.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )

    return matchesSearch
  })

  // 分页
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  // 计算统计信息
  const stats = useMemo(() => {
    const years = Object.keys(groupedPosts)
    return {
      totalPosts: posts.length,
      totalYears: years.length,
    }
  }, [groupedPosts, posts])

  return (
    <div className="min-h-screen bg-typo-light-background dark:bg-typo-dark-background text-typo-light-font dark:text-typo-dark-font font-montserrat text-base leading-[1.75] tracking-[0.6px] typo-transition">
      {/* Top spacer to cover scroll content */}
      <div className="fixed top-0 left-0 right-0 h-4 bg-typo-light-background dark:bg-typo-dark-background z-40"></div>

      {/* Header - 与首页保持一致 */}
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
                className="text-typo-light-font dark:text-typo-dark-font no-underline text-base typo-transition underline"
              >
                归档
              </Link>
              <Link
                href="/about"
                className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary no-underline text-base typo-transition hover:text-typo-light-font dark:hover:text-typo-dark-font hover:underline"
              >
                关于
              </Link>
              <a
                href="/feed.xml"
                target="_blank"
                className="text-typo-light-font-secondary dark:text-typo-dark-font-secondary no-underline text-base typo-transition hover:text-typo-light-font dark:hover:text-typo-dark-font hover:underline"
              >
                RSS
              </a>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-width-main mx-auto px-[8vw] py-12">
        {/* Title Section */}
        <section className="text-center mb-16 py-12">
          <h1 className="text-[32px] font-semibold m-0 mb-4 text-typo-light-font dark:text-typo-dark-font">
            文章归档
          </h1>
          <p className="text-lg text-typo-light-font-secondary dark:text-typo-dark-font-secondary m-0 leading-relaxed">
            共 {stats.totalPosts} 篇文章，跨越 {stats.totalYears} 年时光
          </p>
        </section>

        {/* Search Bar */}
        <section className="mb-12 text-center">
          <input
            type="text"
            placeholder="搜索文章标题、描述或标签..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full max-w-[400px] py-3 px-4 border border-typo-light-hr dark:border-typo-dark-hr rounded-lg bg-typo-light-background dark:bg-typo-dark-background text-typo-light-font dark:text-typo-dark-font text-base typo-transition-colors placeholder:text-typo-light-font-extra dark:placeholder:text-typo-dark-font-extra focus:outline-hidden focus:border-typo-light-font dark:focus:border-typo-dark-font"
          />
        </section>

        {/* Archives List */}
        {searchQuery ? (
          // 搜索结果展示
          currentPosts.length === 0 ? (
            <div className="text-center py-16 text-typo-light-font-secondary dark:text-typo-dark-font-secondary">
              <h2 className="text-typo-light-font dark:text-typo-dark-font mb-4">
                没有找到匹配的文章
              </h2>
              <p className="my-2">试试其他关键词</p>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {currentPosts.map((post) => (
                <article
                  key={post.slug}
                  className="pb-6 border-b border-dashed border-typo-light-hr dark:border-typo-dark-hr last:border-b-0"
                >
                  <time className="block text-sm text-typo-light-font-extra dark:text-typo-dark-font-extra font-medium mb-3">
                    {format(new Date(post.frontmatter.date), "yyyy-MM-dd", {
                      locale: zhCN,
                    })}
                  </time>

                  <h2 className="m-0 mb-3 text-xl font-semibold leading-[1.4]">
                    <Link
                      href={`/${post.slug}`}
                      className="text-typo-light-font dark:text-typo-dark-font no-underline typo-transition hover:underline"
                    >
                      {post.frontmatter.title}
                    </Link>
                  </h2>

                  <div className="flex gap-2 flex-wrap">
                    {post.frontmatter.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-typo-light-font-extra dark:text-typo-dark-font-extra bg-typo-light-list-item dark:bg-typo-dark-list-item py-[2px] px-2 rounded-lg before:content-['#']"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )
        ) : (
          // 按年份分组展示
          <div className="flex flex-col gap-12">
            {Object.entries(groupedPosts)
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .map(([year, yearPosts]) => (
                <section key={year}>
                  <h2 className="text-2xl font-semibold mb-6 text-typo-light-font dark:text-typo-dark-font flex items-baseline gap-3">
                    {year}
                    <span className="text-sm text-typo-light-font-extra dark:text-typo-dark-font-extra font-normal">
                      {yearPosts.length} 篇
                    </span>
                  </h2>

                  <div className="flex flex-col gap-6">
                    {yearPosts.map((post) => (
                      <article
                        key={post.slug}
                        className="flex gap-4 items-baseline max-md:flex-col max-md:gap-2"
                      >
                        <time className="shrink-0 text-sm text-typo-light-font-extra dark:text-typo-dark-font-extra font-medium">
                          {format(new Date(post.frontmatter.date), "MM-dd")}
                        </time>

                        <div className="flex-1">
                          <h3 className="m-0 text-base font-medium leading-[1.5]">
                            <Link
                              href={`/${post.slug}`}
                              className="text-typo-light-font dark:text-typo-dark-font no-underline typo-transition hover:underline"
                            >
                              {post.frontmatter.title}
                            </Link>
                          </h3>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
          </div>
        )}

        {/* Pagination - 仅在搜索时显示 */}
        {searchQuery && totalPages > 1 && (
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

      <Footer />
    </div>
  )
}

export default Archives
