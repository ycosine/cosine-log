import SiteHeader from "src/components/SiteHeader"
import Footer from "src/components/Footer"
import { CONFIG } from "../../../site.config"

type Props = {
  stats: {
    totalPosts: number
    totalTags: number
    since: number
  }
}

const rowClass =
  "flex justify-between gap-6 border-b border-rule-2 py-3.5 text-base"

export default function About({ stats }: Props) {
  return (
    <>
      <SiteHeader active="about" />
      <main className="mx-auto max-w-[680px] px-5 pb-24 md:px-6">
        <section className="flex flex-col gap-5 pt-9 pb-12 md:pt-14 md:pb-16">
          <h1 className="font-serif text-[25px] font-bold tracking-[-0.02em] md:text-[34px]">
            关于
          </h1>
          <p className="text-base leading-[1.85] text-body">
            {CONFIG.profile.aboutBio}
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[13px] text-ink-3">
            <span>{stats.totalPosts} 篇文章</span>
            <span>{stats.totalTags} 个标签</span>
            <span>始于 {stats.since}</span>
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="mb-1 font-mono text-xs text-ink-3">联系</h2>
          <a href={`mailto:${CONFIG.profile.email}`} className={`${rowClass} group`}>
            <span>Email</span>
            <span className="font-mono text-[13px] text-ink-3 group-hover:text-ink">
              {CONFIG.profile.email}
            </span>
          </a>
          <a
            href={`https://github.com/${CONFIG.profile.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${rowClass} group`}
          >
            <span>GitHub</span>
            <span className="font-mono text-[13px] text-ink-3 group-hover:text-ink">
              @{CONFIG.profile.github}
            </span>
          </a>
          <a href="/feed.xml" className={`${rowClass} group`}>
            <span>RSS</span>
            <span className="font-mono text-[13px] text-ink-3 group-hover:text-ink">
              /feed.xml
            </span>
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
