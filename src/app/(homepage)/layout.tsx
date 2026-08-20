import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Analytics } from '../../components/VercelAnalytics'
import { ThemeProvider } from "../../components/ThemeProvider";
import { pageMetadata, personJsonLd } from '@/utils/seo'

const inter = Inter({ subsets: ['latin'] })
const GTMID = process.env.NEXT_PUBLIC_GTMID ?? ''

export const metadata: Metadata = pageMetadata({
  title: 'Ryan Russell — Cloud & DevOps Engineer',
  description:
    'Cloud and DevOps engineer in Sacramento, California. 7x AWS certified, ' +
    'specialising in AWS, Terraform and Infrastructure as Code.',
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
        <meta name="facebook-domain-verification" content="3v84x6tnl2ebgbx0atj2t8zvt5l582" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
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