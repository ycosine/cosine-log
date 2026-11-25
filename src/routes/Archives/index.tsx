"use client"

import { useMemo, useState } from "react"
import SiteHeader from "src/components/SiteHeader"
import Footer from "src/components/Footer"
import PostIndex from "src/components/PostIndex"
import type { PostSummary } from "src/libs/markdown/types"

type Props = {
  posts: PostSummary[]
}

export default function Archives({ posts }: Props) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return posts
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    )
  }, [posts, query])

  const years = new Set(posts.map((p) => p.date.slice(0, 4))).size

  return (
    <>
      <SiteHeader active="archives" />
      <main className="mx-auto max-w-[680px] px-5 md:px-6">
        <section className="flex flex-col gap-3 pt-9 pb-10 md:pt-14 md:pb-14">
          <h1 className="text-[25px] font-bold tracking-[-0.02em] md:text-[34px]">
            归档
          </h1>
          <p className="font-mono text-[13px] text-ink-3">
            {posts.length} 篇 · {years} 年
          </p>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="按标题或标签筛选"
            aria-label="筛选文章"
            className="mt-4 h-11 w-full border-b border-rule bg-transparent text-base text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-ink md:max-w-[320px] md:text-[15px]"
          />
        </section>

        <section className="pb-24">
          {filtered.length > 0 ? (
            <PostIndex posts={filtered} />
          ) : (
            <p className="py-10 text-sm text-ink-3">没有匹配的文章</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
