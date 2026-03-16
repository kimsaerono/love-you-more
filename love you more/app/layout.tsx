import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '致我最爱的你',
  description: '情人节表白页面',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
