"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { BiArrowBack, BiTime, BiSearch } from "react-icons/bi"
import ThemeToggle from "src/components/ThemeToggle"
import type { Post } from "src/libs/markdown/types"
import { CONFIG } from "../../../site.config"

type Props = {
  posts: Post[]
}

type GroupedPosts = {
  [year: string]: {
    [month: string]: Post[]
  }
}

const Archives: React.FC<Props> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set())

  // 按年月分组文章
  const groupedPosts = useMemo(() => {
    const groups: GroupedPosts = {}

    posts.forEach((post) => {
      const date = new Date(post.frontmatter.date)
      const year = format(date, "yyyy")
      const month = format(date, "MM")

      if (!groups[year]) {
        groups[year] = {}
      }

      if (!groups[year][month]) {
        groups[year][month] = []
      }

      groups[year][month].push(post)
    })

    // 默认展开最近的年份
    const years = Object.keys(groups).sort((a, b) => parseInt(b) - parseInt(a))
    if (years.length > 0) {
      setExpandedYears(new Set([years[0]]))
    }

    return groups
  }, [posts])

  // 过滤文章
  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts

    const query = searchQuery.toLowerCase()
    return posts.filter(
      (post) =>
        post.frontmatter.title.toLowerCase().includes(query) ||
        post.frontmatter.description.toLowerCase().includes(query) ||
        post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  }, [posts, searchQuery])

  // 计算统计信息
  const stats = useMemo(() => {
    const years = Object.keys(groupedPosts)
    const totalMonths = Object.values(groupedPosts).reduce(
      (acc, yearData) => acc + Object.keys(yearData).length,
      0
    )

    return {
      totalYears: years.length,
      totalMonths,
      totalPosts: posts.length,
      oldestYear: years[years.length - 1],
      newestYear: years[0],
    }
  }, [groupedPosts, posts])

  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears)
    if (newExpanded.has(year)) {
      newExpanded.delete(year)
    } else {
      newExpanded.add(year)
    }
    setExpandedYears(newExpanded)
  }

  return (
    <div className="min-h-screen bg-background-primary-light dark:bg-background-primary-dark text-text-primary-light dark:text-text-primary-dark">
      {/* Header */}
      <header className="sticky top-4 bg-background-primary-light/80 dark:bg-background-primary-dark/80 backdrop-blur-[10px] z-50">
        <div className="max-width-main mx-auto px-8">
          <nav className="flex justify-between items-center py-6 border-b border-border-primary-light dark:border-border-primary-dark">
            <Link
              href="/"
              className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark no-underline transition-all duration-200 ease-in-out hover:text-text-primary-light dark:hover:text-text-primary-dark hover:-translate-x-0.5"
            >
              <BiArrowBack />
              <span>返回首页</span>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[900px] mx-auto px-8 py-12">
        <div className="animate-fade-in">
          <h1 className="text-[2.5rem] font-bold mb-8 text-center text-text-primary-light dark:text-text-primary-dark">
            文章归档
          </h1>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8 p-4 bg-background-secondary-light dark:bg-background-secondary-dark rounded-lg max-sm:flex-wrap max-sm:gap-4">
            <div className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
              共 <strong className="text-text-primary-light dark:text-text-primary-dark font-semibold">{stats.totalPosts}</strong> 篇文章
            </div>
            <div className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
              跨越 <strong className="text-text-primary-light dark:text-text-primary-dark font-semibold">{stats.totalYears}</strong> 年
            </div>
            <div className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
              始于 <strong className="text-text-primary-light dark:text-text-primary-dark font-semibold">{stats.oldestYear}</strong> 年
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-12">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary-light dark:text-text-tertiary-dark text-xl">
              <BiSearch />
            </div>
            <input
              type="text"
              placeholder="搜索文章标题、描述或标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pr-4 pl-12 bg-background-secondary-light dark:bg-background-secondary-dark 
                         border border-border-primary-light dark:border-border-primary-dark rounded-lg
                         text-text-primary-light dark:text-text-primary-dark text-base
                         transition-all duration-200 ease-in-out
                         focus:outline-hidden focus:border-border-secondary-light dark:focus:border-border-secondary-dark
                         placeholder:text-text-tertiary-light dark:placeholder:text-text-tertiary-dark"
            />
          </div>

          {/* Archives Timeline */}
          <div className="relative before:content-[''] before:absolute before:left-5 before:top-0 before:bottom-0 before:w-0.5 before:bg-border-primary-light dark:before:bg-border-primary-dark">
            {Object.entries(groupedPosts)
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .map(([year, months]) => {
                const yearPosts = Object.values(months).flat()
                const isExpanded = expandedYears.has(year)
                const matchedPosts = yearPosts.filter((post) =>
                  filteredPosts.includes(post)
                )

                if (searchQuery && matchedPosts.length === 0) {
                  return null
                }

                return (
                  <div key={year} className="mb-8">
                    <div
                      onClick={() => toggleYear(year)}
                      className="flex items-center justify-between p-4 px-6 -ml-2.5 
                                 bg-background-secondary-light dark:bg-background-secondary-dark rounded-lg
                                 cursor-pointer transition-all duration-200 ease-in-out
                                 hover:bg-background-tertiary-light dark:hover:bg-background-tertiary-dark"
                    >
                      <div className="flex items-baseline gap-4">
                        <h2 className="text-[1.75rem] font-bold text-text-primary-light dark:text-text-primary-dark relative
                                       before:content-[''] before:absolute before:-left-[30px] before:top-1/2 before:-translate-y-1/2
                                       before:w-3 before:h-3 before:bg-primary-600 dark:before:bg-primary-400
                                       before:rounded-full before:border-[3px] before:border-background-primary-light dark:before:border-background-primary-dark">
                          {year}
                        </h2>
                        <span className="text-sm text-text-tertiary-light dark:text-text-tertiary-dark">
                          {yearPosts.length} 篇
                        </span>
                      </div>
                      <div className={`text-xs text-text-tertiary-light dark:text-text-tertiary-dark transition-transform duration-200 ease-in-out ${
                        isExpanded ? "rotate-90" : "rotate-0"
                      }`}>
                        ▶
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="ml-12 mt-4">
                        {Object.entries(months)
                          .sort(([a], [b]) => parseInt(b) - parseInt(a))
                          .map(([month, monthPosts]) => {
                            const monthMatchedPosts = monthPosts.filter(
                              (post) => filteredPosts.includes(post)
                            )

                            if (searchQuery && monthMatchedPosts.length === 0) {
                              return null
                            }

                            return (
                              <div key={`${year}-${month}`} className="mb-8">
                                <div className="flex items-baseline gap-3 mb-4">
                                  <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
                                    {parseInt(month)} 月
                                  </h3>
                                  <span className="text-sm text-text-tertiary-light dark:text-text-tertiary-dark">
                                    {monthPosts.length} 篇
                                  </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                  {monthPosts
                                    .filter((post) =>
                                      filteredPosts.includes(post)
                                    )
                                    .map((post) => (
                                      <div
                                        key={post.slug}
                                        className="flex items-start gap-4 p-3 px-4
                                                   bg-background-primary-light dark:bg-background-primary-dark
                                                   border border-border-primary-light dark:border-border-primary-dark
                                                   rounded-lg transition-all duration-200 ease-in-out
                                                   hover:bg-background-secondary-light dark:hover:bg-background-secondary-dark
                                                   hover:border-border-secondary-light dark:hover:border-border-secondary-dark"
                                      >
                                        <div className="shrink-0 text-sm text-text-tertiary-light dark:text-text-tertiary-dark font-medium">
                                          {format(
                                            new Date(post.frontmatter.date),
                                            "dd日"
                                          )}
                                        </div>
                                        <div className="flex-1">
                                          <Link
                                            href={`/${post.slug}`}
                                            className="text-text-primary-light dark:text-text-primary-dark
                                                       no-underline font-medium leading-relaxed block mb-1
                                                       hover:text-text-primary-light dark:hover:text-text-primary-dark"
                                          >
                                            {post.frontmatter.title}
                                          </Link>
                                          <div className="flex items-center gap-1 text-xs text-text-tertiary-light dark:text-text-tertiary-dark">
                                            <BiTime className="text-sm" />
                                            {post.readingTime}分钟
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    )}
                  </div>
                )
              })}
          </div>

          {/* No Results */}
          {searchQuery && filteredPosts.length === 0 && (
            <div className="text-center py-16 px-8">
              <div className="text-6xl mb-4">🔍</div>
              <div className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                没有找到匹配的文章
              </div>
              <div className="text-text-secondary-light dark:text-text-secondary-dark">
                试试其他关键词
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Archives