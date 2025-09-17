/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable iframe embedding
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL'
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *;"
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  },
  
  // Enable experimental features for better iframe support
  experimental: {
    esmExternals: true
  },
  
  // Optimize for iframe embedding
  poweredByHeader: false,
  
  // Enable compression
  compress: true,
  
  // Enable static optimization
  trailingSlash: false,
  
  // Enable image optimization
  images: {
    domains: ['alfaschools.gr', 'www.hubspot.com', 'images.unsplash.com', 'picsum.photos', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.hubspot.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  }
}

module.exports = nextConfig
