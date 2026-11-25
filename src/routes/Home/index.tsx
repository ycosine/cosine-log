import Link from "next/link"
import SiteHeader from "src/components/SiteHeader"
import Footer from "src/components/Footer"
import PostIndex from "src/components/PostIndex"
import type { PostSummary } from "src/libs/markdown/types"
import { CONFIG } from "../../../site.config"

const HOME_LIMIT = 12

type Props = {
  posts: PostSummary[]
}

const linkClass =
  "border-b border-rule pt-1.5 pb-0.5 text-ink-3 transition-colors hover:border-ink hover:text-ink md:pt-0"

export default function Home({ posts }: Props) {
  const shown = posts.slice(0, HOME_LIMIT)
  const rest = posts.length - shown.length

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[680px] px-5 md:px-6">
        <section className="flex flex-col gap-3 pt-9 pb-12 md:gap-4 md:pt-14 md:pb-[72px]">
          <h1 className="text-base font-semibold">{CONFIG.profile.name}</h1>
          <p className="max-w-[520px] text-[15px] leading-[1.85] text-ink-2 md:text-base">
            {CONFIG.profile.intro}
          </p>
          <div className="flex gap-[18px] text-sm md:gap-5">
            <a
              href={`https://github.com/${CONFIG.profile.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              GitHub
            </a>
            <a href={`mailto:${CONFIG.profile.email}`} className={linkClass}>
              Email
            </a>
            <a href="/feed.xml" className={linkClass}>
              RSS
            </a>
          </div>
        </section>

        <section className="pb-24">
          <PostIndex posts={shown} />
          {rest > 0 && (
            <Link
              href="/archives"
              className="mt-6 inline-block text-sm text-ink-3 transition-colors hover:text-ink"
            >
              还有 {rest} 篇，查看全部归档 →
            </Link>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
