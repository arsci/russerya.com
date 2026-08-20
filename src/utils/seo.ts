import type { Metadata } from 'next'
import { env } from '@/env.mjs'

export const siteUrl = env.NEXT_PUBLIC_APP_URL

export const person = {
  name: 'Ryan Russell',
  jobTitle: 'Staff Cloud Engineer',
  employer: 'Trust & Will',
  location: 'Sacramento, California',
  // Keep this list aligned with src/components/AboutMe.tsx
  skills: [
    'AWS',
    'Terraform',
    'DevOps',
    'Infrastructure as Code',
    'Cloud Architecture',
    'CI/CD',
    'Kubernetes',
    'Python',
  ],
  profiles: [
    'https://www.linkedin.com/in/russerya',
    'https://github.com/arsci',
  ],
}

const defaultDescription =
  'Ryan Russell is a Cloud and DevOps engineer in Sacramento, California, ' +
  'specialising in AWS, Terraform and Infrastructure as Code. 7x AWS certified.'

/**
 * Builds page metadata with sensible site-wide defaults: absolute canonical
 * URL, Open Graph and Twitter cards. Pass `path` as a root-relative path.
 */
export function pageMetadata({
  title,
  description = defaultDescription,
  path = '/',
  image = '/images/profile.jpg',
}: {
  title: string
  description?: string
  path?: string
  image?: string
}): Metadata {
  const url = new URL(path, siteUrl).toString()
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: person.name,
      type: 'website',
      images: [{ url: image, width: 400, height: 400, alt: person.name }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [image],
    },
  }
}

/** schema.org Person, so search engines can resolve the site to a real identity. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    url: siteUrl,
    image: new URL('/images/profile.jpg', siteUrl).toString(),
    jobTitle: person.jobTitle,
    worksFor: { '@type': 'Organization', name: person.employer },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sacramento',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    knowsAbout: person.skills,
    sameAs: person.profiles,
  }
}
