//import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import Header from './header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'なおさんのツール置き場',
  description: 'ツールや記事を載せます',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
