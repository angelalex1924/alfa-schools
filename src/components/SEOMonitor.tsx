"use client"

import { useEffect } from 'react'

interface SEOMonitorProps {
  pageName: string;
  keywords: string[];
  location?: string;
}

export default function SEOMonitor({ pageName, keywords, location = 'Athens' }: SEOMonitorProps) {
  useEffect(() => {
    // SEO Performance Monitoring
    const monitorSEO = () => {
      // Check if all essential SEO elements are present
      const title = document.title
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content')
      const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content')
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href')
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content')
      const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content')
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content')
      const structuredData = document.querySelectorAll('script[type="application/ld+json"]')

      // SEO Score Calculation
      let seoScore = 0
      const maxScore = 100

      // Title check (20 points)
      if (title && title.length > 30 && title.length < 60) {
        seoScore += 20
      } else if (title) {
        seoScore += 10
      }

      // Description check (20 points)
      if (description && description.length > 120 && description.length < 160) {
        seoScore += 20
      } else if (description) {
        seoScore += 10
      }

      // Keywords check (15 points)
      if (keywords && keywords.length > 50) {
        seoScore += 15
      } else if (keywords) {
        seoScore += 8
      }

      // Canonical URL check (10 points)
      if (canonical) {
        seoScore += 10
      }

      // Open Graph tags check (15 points)
      if (ogTitle && ogDescription && ogImage) {
        seoScore += 15
      } else if (ogTitle || ogDescription || ogImage) {
        seoScore += 8
      }

      // Structured data check (20 points)
      if (structuredData.length > 0) {
        seoScore += 20
      }

      // Log SEO performance
      console.log(`🎯 SEO Monitor - ${pageName}:`)
      console.log(`📊 SEO Score: ${seoScore}/${maxScore} (${Math.round((seoScore/maxScore)*100)}%)`)
      console.log(`📝 Title: ${title}`)
      console.log(`📄 Description: ${description?.substring(0, 100)}...`)
      console.log(`🔗 Canonical: ${canonical}`)
      console.log(`📊 Structured Data Scripts: ${structuredData.length}`)
      console.log(`🌍 Location: ${location}`)
      console.log(`🔑 Keywords: ${keywords?.split(', ').length} keywords`)

      // Performance recommendations
      if (seoScore < 70) {
        console.warn('⚠️ SEO Score is below 70%. Consider optimizing:')
        if (!title || title.length < 30 || title.length > 60) {
          console.warn('  - Title length should be 30-60 characters')
        }
        if (!description || description.length < 120 || description.length > 160) {
          console.warn('  - Description length should be 120-160 characters')
        }
        if (!keywords || keywords.length < 50) {
          console.warn('  - Add more relevant keywords')
        }
        if (!canonical) {
          console.warn('  - Add canonical URL')
        }
        if (structuredData.length === 0) {
          console.warn('  - Add structured data (JSON-LD)')
        }
      } else {
        console.log('✅ SEO Score is excellent!')
      }

      // Send analytics data (if analytics is available)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'seo_score', {
          'page_name': pageName,
          'seo_score': seoScore,
          'max_score': maxScore,
          'score_percentage': Math.round((seoScore/maxScore)*100),
          'location': location,
          'keywords_count': keywords?.split(', ').length || 0,
          'structured_data_count': structuredData.length
        })
      }
    }

    // Run SEO monitoring after page load
    const timer = setTimeout(monitorSEO, 1000)

    return () => clearTimeout(timer)
  }, [pageName, keywords, location])

  return null // This component doesn't render anything
}