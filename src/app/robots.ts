import type { MetadataRoute } from 'next'
import { siteUrl } from '@/utils/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Nothing useful for crawlers, and keeps form endpoints out of indexes.
        disallow: ['/api/'],
      },
    ],
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  }
}
