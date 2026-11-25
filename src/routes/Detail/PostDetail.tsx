import Link from "next/link"
import { format } from "date-fns"
import SiteHeader from "src/components/SiteHeader"
import Footer from "src/components/Footer"
import { MarkdownContent } from "src/components/MarkdownContent"
import Comments from "src/components/Comments"
import ReadingProgress from "src/components/ReadingProgress"
import { TocAside, TocDetails } from "src/components/TableOfContents"
import { ArrowLeftIcon } from "src/components/icons"
import type { Post, PostLink } from "src/libs/markdown/types"

type Props = {
  post: Post
  prev: PostLink | null // 更早的一篇
  next: PostLink | null // 更新的一篇
}

export default function PostDetail({ post, prev, next }: Props) {
  const { title, date, tags } = post.frontmatter
  const hasToc = post.toc.length > 0

  return (
    <>
      <SiteHeader />
      <ReadingProgress />

      <div className="flex justify-center gap-14 px-5 md:px-6">
        {/* 左侧占位，让正文在宽屏上居中 */}
        <div className="hidden w-[180px] shrink-0 xl:block" />

        <article className="w-full max-w-[632px] min-w-0 pt-7 pb-24 md:pt-16">
          <Link
            href="/"
            className="mb-10 hidden items-center gap-1.5 text-sm text-ink-3 transition-colors hover:text-ink md:inline-flex"
          >
            <ArrowLeftIcon size={16} />
            全部文章
          </Link>

          <h1 className="mb-3.5 text-[25px] leading-[1.4] font-bold tracking-[-0.02em] md:mb-5 md:text-[34px] md:leading-[1.35]">
            {title}
          </h1>

          <div className="flex flex-wrap gap-x-3 gap-y-1 pb-5 font-mono text-xs text-ink-3 md:gap-x-3.5 md:gap-y-1.5 md:border-b md:border-rule md:pb-8 md:text-[13px]">
            <time dateTime={format(new Date(date), "yyyy-MM-dd")}>
              {format(new Date(date), "yyyy-MM-dd")}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min</span>
            {tags.length > 0 && <span aria-hidden="true">·</span>}
            {tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>

          {hasToc && (
            <div className="xl:hidden">
              <TocDetails items={post.toc} />
            </div>
          )}

          <div className="pt-6 md:pt-9">
            <MarkdownContent content={post.htmlContent} />
          </div>

          {(prev || next) && (
            <nav
              aria-label="相邻文章"
              className="mt-16 grid grid-cols-2 gap-4 border-t border-rule pt-6 md:mt-[72px] md:gap-6"
            >
              {prev ? (
                <Link href={`/${prev.slug}`} className="group flex flex-col gap-1.5">
                  <span className="font-mono text-xs text-ink-3">← 上一篇</span>
                  <span className="text-[15px] leading-normal underline-offset-4 group-hover:underline">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={`/${next.slug}`}
                  className="group flex flex-col gap-1.5 text-right"
                >
                  <span className="font-mono text-xs text-ink-3">下一篇 →</span>
                  <span className="text-[15px] leading-normal underline-offset-4 group-hover:underline">
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          )}

          <Comments />
        </article>

        <aside className="hidden w-[180px] shrink-0 xl:block">
          {hasToc && (
            <div className="sticky top-24 mt-[236px] max-h-[calc(100vh-8rem)] overflow-y-auto pb-6">
              <TocAside items={post.toc} />
            </div>
          )}
        </aside>
      </div>

      <Footer />
    </>
  )
}
