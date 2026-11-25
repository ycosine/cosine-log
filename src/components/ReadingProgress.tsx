"use client"

import { useEffect, useRef } from "react"

// 手机端顶部 2px 阅读进度条，直接改 transform，不触发重渲染
export default function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${ratio})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="sticky top-0 z-10 h-0.5 bg-rule md:hidden" aria-hidden="true">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-ink" />
    </div>
  )
}
