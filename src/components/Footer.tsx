import { CONFIG } from "../../site.config"

export default function Footer() {
  const year = new Date().getFullYear()
  const host = new URL(CONFIG.link).host

  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-6">
      <footer className="flex justify-between gap-4 border-t border-rule pt-7 pb-12 font-mono text-[13px] text-ink-3">
        <span>
          © {CONFIG.since}–{year} {CONFIG.profile.name}
        </span>
        <span>{host}</span>
      </footer>
    </div>
  )
}
