// 按 y = cos x 逐点生成折线，用于 Logo 和图标。
// 从 x = 0 的波峰开始；amplitude 向下为正（SVG 坐标）。
export function cosinePath({
  x0,
  x1,
  midY,
  amplitude,
  periods,
  steps = 48,
}: {
  x0: number
  x1: number
  midY: number
  amplitude: number
  periods: number
  steps?: number
}): string {
  const n = Math.round(steps * periods)
  const points: string[] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const x = x0 + (x1 - x0) * t
    const y = midY - amplitude * Math.cos(t * periods * 2 * Math.PI)
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return points.join(" ")
}
