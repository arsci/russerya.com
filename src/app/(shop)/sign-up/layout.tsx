import type { Metadata } from 'next'
import { pageMetadata } from '@/utils/seo'

// This page is the public SMS opt-in flow, kept as the consent evidence that
// A2P 10DLC registration requires: it shows the disclosures and links to the
// Terms and Privacy pages. It is deliberately not linked from the site nav.
//
// noindex keeps it out of search results while leaving it publicly reachable,
// which is all the carrier vetting process needs.
export const metadata: Metadata = {
  ...pageMetadata({
    title: 'SMS Updates — Ryan Russell',
    description: 'Opt in to receive text message updates from Ryan Russell.',
    path: '/sign-up',
  }),
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
