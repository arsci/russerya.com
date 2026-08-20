/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    ]
  },
}

module.exports = nextConfig
