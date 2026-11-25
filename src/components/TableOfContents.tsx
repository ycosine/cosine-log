"use client"

import { useEffect, useState } from "react"
import type { TocItem } from "src/libs/markdown/types"
import { ChevronUpIcon } from "./icons"

// 当前阅读到的标题：顶部 120px 以上的最后一个
function useActiveId(items: TocItem[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (items.length === 0) return
    let frame = 0
    const update = () => {
      frame = 0
      let current: string | null = null
      for (const item of items) {
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top < 120) current = item.id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [items])

  return active
}

type Props = {
  items: TocItem[]
}

// 桌面：文章右侧的目录
export function TocAside({ items }: Props) {
  const active = useActiveId(items)
  return (
    <nav aria-label="目录" className="flex flex-col gap-2.5 text-[13px] leading-normal">
      <span className="mb-1 font-mono text-xs text-ink-3">目录</span>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`transition-colors hover:text-ink ${
            item.depth === 3 ? "pl-3" : ""
          } ${active === item.id ? "font-semibold text-ink" : "text-ink-3"}`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  )
}

// 手机：标题下方可折叠的目录
export function TocDetails({ items }: Props) {
  const active = useActiveId(items)
  const sections = items.filter((i) => i.depth === 2).length || items.length
  return (
    <details className="group border-y border-rule open:pb-3 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex h-12 cursor-pointer list-none items-center justify-between text-[13px] text-ink-2">
        <span>
          目录<span className="ml-3 text-ink-3">{sections} 节</span>
        </span>
        <ChevronUpIcon size={16} className="rotate-180 transition-transform group-open:rotate-0" />
      </summary>
      <nav aria-label="目录" className="flex flex-col items-start text-sm">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`py-2 ${item.depth === 3 ? "pl-4" : ""} ${
              active === item.id ? "font-semibold text-ink" : "text-ink-2"
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </details>
  )
}
