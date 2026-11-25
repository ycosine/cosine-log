import "../styles/globals.css"
import type { Viewport } from "next"
import { Hanken_Grotesk, Roboto_Serif } from "next/font/google"
import localFont from "next/font/local"
import { ThemeProvider } from "./providers/ThemeProvider"

// 拉丁字符：正文 / 界面用 Hanken Grotesk，标题用 Roboto Serif；
// 中文走系统字体（黑体 / 宋体），见 tailwind.config.js
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const serif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
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
      className={`${sans.variable} ${serif.variable} ${jetbrainsMono.variable}`}
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
