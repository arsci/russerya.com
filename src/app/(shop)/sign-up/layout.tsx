import type { Metadata } from 'next'
import { pageMetadata } from '@/utils/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Newsletter — Ryan Russell',
  description:
    'Subscribe for occasional updates on AWS, DevOps, van build progress and home projects.',
  path: '/sign-up',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
