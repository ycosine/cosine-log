import Link from "next/link"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"

type Props = {
  active?: "archives" | "about"
}

const NAV = [
  { key: "archives", href: "/archives", label: "归档" },
  { key: "about", href: "/about", label: "关于" },
] as const

export default function SiteHeader({ active }: Props) {
  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-6">
      <header className="flex h-16 items-center justify-between md:h-[88px]">
        <Logo />
        <nav className="flex items-center text-sm md:gap-1">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={active === item.key ? "page" : undefined}
              className={`px-2 py-3 transition-colors hover:text-ink md:px-3 md:py-2.5 ${
                active === item.key ? "text-ink" : "text-ink-2"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </header>
    </div>
  )
}
