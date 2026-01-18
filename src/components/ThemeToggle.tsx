"use client"

import { HiSun, HiMoon } from "react-icons/hi"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-md border border-border-primary-light dark:border-border-primary-dark opacity-0"></div>
    )
  }

  const handleClick = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light")
  }

  return (
    <button
      onClick={handleClick}
      aria-label={
        resolvedTheme === "light" ? "切换到暗色模式" : "切换到亮色模式"
      }
      className="w-9 h-9 rounded-md border border-border-primary-light dark:border-border-primary-dark 
                 bg-transparent text-text-secondary-light dark:text-text-secondary-dark
                 hover:text-typo-light-font dark:hover:text-typo-dark-font
                 hover:border-typo-light-font dark:hover:border-typo-dark-font
                 flex items-center justify-center typo-transition-colors cursor-pointer"
    >
      {resolvedTheme === "light" ? (
        <HiMoon className="w-[18px] h-[18px]" />
      ) : (
        <HiSun className="w-[18px] h-[18px]" />
      )}
    </button>
  )
}
