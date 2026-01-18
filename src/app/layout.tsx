import "../styles/globals.css"
import QueryProvider from "./providers/QueryProvider"
import { ThemeProvider } from "./providers/ThemeProvider"
import localFont from "next/font/local"

// 配置 Montserrat 字体
const montserrat = localFont({
  src: [
    {
      path: "./fonts/Montserrat-300.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-600.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-700.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-800.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
})

// 配置 JetBrains Mono 字体
const jetbrainsMono = localFont({
  src: [
    {
      path: "./fonts/JetBrainsMono-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/JetBrainsMono-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/JetBrainsMono-600.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
})

export const metadata = {
  title: "Cosine 余弦是定理",
  description: "welcome to my blog!",
  metadataBase: new URL("https://www.0xcos.com"),
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${montserrat.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
