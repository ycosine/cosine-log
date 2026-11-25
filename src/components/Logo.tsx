import Link from "next/link"
import { cosinePath } from "src/libs/wave"

// 字标下方两个完整周期的余弦波，0 到 4π
const WAVE = cosinePath({ x0: 2, x1: 198, midY: 9, amplitude: 6, periods: 2 })

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="cosine 首页"
      className="flex flex-col gap-px text-ink"
    >
      <span className="text-[19px] font-bold leading-[1.1] tracking-[-0.03em]">
        cosine
      </span>
      <svg
        width="66"
        height="6"
        viewBox="0 0 200 18"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d={WAVE}
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  )
}
