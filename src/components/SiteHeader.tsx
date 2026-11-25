import Link from "next/link"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"
import { cosinePath } from "src/libs/wave"

type Props = {
  // 当前所在栏目；首页和文章页都算 home
  active?: "home" | "archives" | "about"
}

const NAV = [
  { key: "archives", href: "/archives", label: "归档" },
  { key: "about", href: "/about", label: "关于" },
] as const

// 导航项下两个完整周期的余弦波，和字标下的波同样是 0 到 4π
const NAV_WAVE = cosinePath({ x0: 1, x1: 31, midY: 2.5, amplitude: 1.5, periods: 2 })

export default function SiteHeader({ active }: Props) {
  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-6">
      <header className="flex h-16 items-center justify-between md:h-[88px]">
        <Logo active={active === "home"} />
        <nav className="flex items-center text-sm md:gap-1">
          {NAV.map((item) => {
            const isActive = active === item.key
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`group px-2 py-3 transition-colors hover:text-ink md:px-3 md:py-2.5 ${
                  isActive ? "text-ink" : "text-ink-2"
                }`}
              >
                <span className="relative block">
                  {item.label}
                  <svg
                    viewBox="0 0 32 5"
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden="true"
                    className={`absolute top-full left-0 mt-0.5 h-[5px] w-full wave-mark ${isActive ? "is-active" : ""}`}
                  >
                    <path
                      d={NAV_WAVE}
                      stroke="currentColor"
                      strokeWidth="1.6"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            )
          })}
          <ThemeToggle />
        </nav>
      </header>
    </div>
  )
}
