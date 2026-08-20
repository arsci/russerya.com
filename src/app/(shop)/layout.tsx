import '../globals.css'
import type { Metadata } from 'next'
import { pageMetadata } from '@/utils/seo'
import { Inter } from 'next/font/google'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Analytics } from '../../components/VercelAnalytics'
import { ThemeProvider } from "../../components/ThemeProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = pageMetadata({
  title: 'Ryan Russell — Cloud & DevOps Engineer',
  description:
    'Cloud and DevOps engineer in Sacramento, California. 7x AWS certified, specialising in AWS, Terraform and Infrastructure as Code.',
  path: '/',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className={`${inter.className} bg-slate-100 dark:bg-gray-800`}>
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