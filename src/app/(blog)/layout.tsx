import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../../components/Header'
import Footer from '../../components/FooterBlog'
import { Analytics } from '../../components/VercelAnalytics'
import { ThemeProvider } from "../../components/ThemeProvider";
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] })
const GTMID = process.env.NEXT_PUBLIC_GTMID ?? ''

export const metadata: Metadata = {
  title: 'Ryan Russell',
  description: 'Ryan Russell',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className={`${inter.className} bg-slate-100 dark:bg-gray-800`}>
        <GoogleTagManager gtmId={GTMID} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
        </body>
      </html>
  )
}