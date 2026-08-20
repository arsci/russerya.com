import type { Metadata } from 'next'
import { pageMetadata } from '@/utils/seo'

export const metadata: Metadata = pageMetadata({
  title: 'About Ryan Russell — Cloud & DevOps Engineer',
  description:
    'Experience, AWS certifications and skills. Staff Cloud Engineer at Trust & Will, previously Gruntwork, Slalom Consulting and PG&E. 7x AWS certified.',
  path: '/about-me',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
