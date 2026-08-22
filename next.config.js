/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // AVIF first, webp fallback. Next defaults to webp only.
    formats: ['image/avif', 'image/webp'],
    // How long optimised derivatives stay cached. Source images here are
    // effectively immutable once published, so a long TTL is safe.
    minimumCacheTTL: 2592000, // 30 days
  },

  async redirects() {
    return [
      {
        // /about-me is now the site root. It was previously indexed and may be
        // linked externally, so redirect permanently rather than 404.
        source: '/about-me',
        destination: '/',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Stop browsers from MIME-sniffing a response away from the declared type.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Disallow framing by other origins (clickjacking).
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Send the origin but not the path to other sites.
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Opt out of APIs the site does not use.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      {
        // Files under public/ are served with max-age=0 by default, so the
        // avatar, icons and every blog image are refetched on each visit.
        // Filenames here are not content-hashed, hence the modest max-age
        // with a longer stale-while-revalidate window rather than immutable.
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // Next appends a content hash to the icon URLs it emits, so these are
        // safe to cache; they are served max-age=0 otherwise.
        source: '/:icon(icon|apple-icon).png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
