import Link from "next/link"
import { cosinePath } from "src/libs/wave"

// 字标下方两个完整周期的余弦波，0 到 4π
const WAVE = cosinePath({ x0: 2, x1: 198, midY: 9, amplitude: 6, periods: 2 })

type Props = {
  // 波浪是导航的「当前位置」标记：在首页和文章页时出现在字标下
  active?: boolean
}

export default function Logo({ active = false }: Props) {
  return (
    <Link
      href="/"
      aria-label="cosine 首页"
      aria-current={active ? "page" : undefined}
      className="group relative block pb-[7px] text-ink"
    >
      <span className="block text-[19px] font-bold leading-[1.1] tracking-[-0.03em]">
        cosine
      </span>
      {/* 宽度跟随字标文字，不再写死，换字体也不会溢出 */}
      <svg
        viewBox="0 0 200 18"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-[6px] w-full wave-mark ${active ? "is-active" : ""}`}
      >
        <path
          d={WAVE}
          stroke="currentColor"
          strokeWidth="1.7"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  )
}
