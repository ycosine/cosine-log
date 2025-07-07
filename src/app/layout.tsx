import './globals.css'
import QueryProvider from './providers/QueryProvider'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Cosine 余弦是定理',
  description: 'welcome to my blog!',
  metadataBase: new URL('https://www.0xcos.com'),
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <ThemeProvider>
          <QueryProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}