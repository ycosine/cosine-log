import Link from "next/link"
import type { PostSummary } from "src/libs/markdown/types"

type Props = {
  posts: PostSummary[]
}

// 按年份分组的文章列表：大号浅色年份 + 细线分隔的标题行
export default function PostIndex({ posts }: Props) {
  const groups: { year: string; posts: PostSummary[] }[] = []
  for (const post of posts) {
    const year = post.date.slice(0, 4)
    const last = groups[groups.length - 1]
    if (last && last.year === year) last.posts.push(post)
    else groups.push({ year, posts: [post] })
  }

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      {groups.map((group) => (
        <section key={group.year} className="flex flex-col">
          <h2 className="-mb-2.5 select-none text-[36px] font-extrabold leading-none tracking-[-0.04em] text-rule md:-mb-3 md:-ml-0.5 md:text-[44px]">
            {group.year}
          </h2>
          {group.posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="group relative flex flex-col gap-1 border-b border-rule-2 py-3.5 md:flex-row md:items-baseline md:justify-between md:gap-6"
            >
              <span className="text-base leading-normal decoration-1 underline-offset-4 group-hover:underline">
                {post.title}
              </span>
              <span className="shrink-0 font-mono text-xs text-ink-3 md:text-[13px]">
                {post.date.slice(5, 10)}
                {post.tags[0] && (
                  <span className="md:hidden"> · {post.tags[0]}</span>
                )}
              </span>
            </Link>
          ))}
        </section>
      ))}
    </div>
  )
}
