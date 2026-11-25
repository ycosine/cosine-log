/** @type {import('tailwindcss').Config} */
// 配色「纯墨」：颜色值定义在 src/styles/globals.css 的 CSS 变量里（:root 亮色 / .dark 暗色），
// 这里只把变量映射成 Tailwind 工具类，例如 bg-paper、text-ink-3、border-rule。
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: {
          DEFAULT: "var(--ink)",
          2: "var(--ink-2)",
          3: "var(--ink-3)",
        },
        body: "var(--body)",
        rule: {
          DEFAULT: "var(--rule)",
          2: "var(--rule-2)",
        },
        soft: "var(--soft)",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Noto Sans SC"',
          '"Microsoft YaHei"',
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          '"Songti SC"',
          '"Noto Serif SC"',
          '"Source Han Serif SC"',
          "STSong",
          "SimSun",
          "Georgia",
          "serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
}
