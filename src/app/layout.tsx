import "../styles/globals.css"
import type { Viewport } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { ThemeProvider } from "./providers/ThemeProvider"

// 拉丁字符用 Inter；中文走系统字体（苹方 / 思源黑体 / 微软雅黑），见 tailwind.config.js
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = localFont({
  src: [
    { path: "./fonts/JetBrainsMono-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/JetBrainsMono-500.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
})

export const metadata = {
  title: "Cosine 余弦是定理",
  description: "welcome to my blog!",
  metadataBase: new URL("https://xianjun.cc"),
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0d0e" },
  ],
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
