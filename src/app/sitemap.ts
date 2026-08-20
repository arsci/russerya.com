import type { MetadataRoute } from 'next'
import { allHomePosts, allTechPosts, allVanPosts } from 'contentlayer2/generated'
import { siteUrl } from '@/utils/seo'

// /sign-up is intentionally absent: it is the SMS opt-in consent page kept
// for A2P 10DLC vetting, not content meant to be found via search.
const staticRoutes: { path: string; priority: number }[] = [
  { path: '/', priority: 1.0 },
  { path: '/about-me', priority: 0.9 },
  { path: '/blog', priority: 0.8 },
  { path: '/blog/tech', priority: 0.7 },
  { path: '/blog/van', priority: 0.7 },
  { path: '/blog/home', priority: 0.7 },
  { path: '/3d-printing', priority: 0.5 },
  { path: '/terms', priority: 0.1 },
  { path: '/privacy', priority: 0.1 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = [...allTechPosts, ...allVanPosts, ...allHomePosts].map((post) => ({
    url: new URL(post.slug, siteUrl).toString(),
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const pages = staticRoutes.map(({ path, priority }) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority,
  }))

  return [...pages, ...posts]
}
