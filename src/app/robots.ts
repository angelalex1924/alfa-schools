import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alfaschool.gr'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/articles/',
          '/services/',
          '/contact/',
          '/why-us/',
          '/news/',
          '/legal/',
          '/tags/',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
          '/*.json$',
          '/*?*',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/articles/',
          '/services/',
          '/contact/',
          '/why-us/',
          '/news/',
          '/legal/',
          '/tags/',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
        ],
        crawlDelay: 0,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
