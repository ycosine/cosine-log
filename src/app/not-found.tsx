import Link from "next/link"
import SiteHeader from "src/components/SiteHeader"
import Footer from "src/components/Footer"

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[60vh] max-w-[680px] flex-col justify-center gap-4 px-5 md:px-6">
        <p className="font-mono text-[13px] text-ink-3">404</p>
        <h1 className="font-serif text-[25px] font-bold tracking-[-0.02em] md:text-[34px]">
          这一页不存在
        </h1>
        <p className="text-base leading-[1.85] text-ink-2">
          可能是链接写错了，或者文章已经移走。
        </p>
        <Link
          href="/"
          className="mt-2 self-start border-b border-rule pb-0.5 text-sm text-ink-3 transition-colors hover:border-ink hover:text-ink"
        >
          回到首页
        </Link>
      </main>
      <Footer />
    </>
  )
}
