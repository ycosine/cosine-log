"use client"

import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "./icons"

// 两个图标都渲染，用 .dark 切换显示，避免首屏闪烁和 hydration 不一致
export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="切换亮色 / 暗色"
      className="-mr-2.5 flex h-11 w-11 items-center justify-center text-ink-2 transition-colors hover:text-ink md:mr-0 md:h-10 md:w-10"
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </button>
  )
}
