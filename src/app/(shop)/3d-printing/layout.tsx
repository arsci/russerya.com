import type { Metadata } from 'next'
import { pageMetadata } from '@/utils/seo'

export const metadata: Metadata = pageMetadata({
  title: '3D Printing — Ryan Russell',
  description:
    'Custom 3D printing and design work by Ryan Russell, including request-a-quote for hobby and prototype parts.',
  path: '/3d-printing',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
