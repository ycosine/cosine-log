import './globals.css'
import QueryProvider from './providers/QueryProvider'

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
    <html lang="zh-CN">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}