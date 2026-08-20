import type { Metadata } from 'next'
import { pageMetadata } from '@/utils/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Van Build — Ryan Russell',
  description:
    'Converting a 2023 Ford Transit into a camper: electrical, roof layout, insulation and build logs.',
  path: '/blog/van',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
