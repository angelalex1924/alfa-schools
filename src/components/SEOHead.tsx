"use client"

import { useEffect } from 'react'
import type { SEOData } from '@/lib/seo-utils'

interface SEOHeadProps {
  seoData: SEOData;
  structuredData?: any;
}

export default function SEOHead({ seoData, structuredData }: SEOHeadProps) {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alfaschools.gr'
    
    // Update document title
    document.title = seoData.title

    // Update or create meta description
    updateMetaTag('name', 'description', seoData.description)
    
    // Update or create meta keywords
    updateMetaTag('name', 'keywords', seoData.keywords)
    
    // Update or create robots meta
    if (seoData.robots) {
      updateMetaTag('name', 'robots', seoData.robots)
    }
    
    // Update or create viewport meta
    if (seoData.viewport) {
      updateMetaTag('name', 'viewport', seoData.viewport)
    }

    // Update or create canonical URL
    updateCanonicalURL(seoData.canonical || seoData.url)

    // Update or create Open Graph tags
    updateMetaTag('property', 'og:title', seoData.title)
    updateMetaTag('property', 'og:description', seoData.description)
    updateMetaTag('property', 'og:image', seoData.image)
    updateMetaTag('property', 'og:url', seoData.url)
    updateMetaTag('property', 'og:type', seoData.type)
    updateMetaTag('property', 'og:site_name', 'Alfa School')
    updateMetaTag('property', 'og:locale', 'el_GR')

    // Update or create Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image')
    updateMetaTag('name', 'twitter:title', seoData.title)
    updateMetaTag('name', 'twitter:description', seoData.description)
    updateMetaTag('name', 'twitter:image', seoData.image)
    updateMetaTag('name', 'twitter:site', '@alfaschools')
    updateMetaTag('name', 'twitter:creator', '@alfaschools')

    // Update or create article-specific meta tags
    if (seoData.type === 'article') {
      if (seoData.publishedTime) {
        updateMetaTag('property', 'article:published_time', seoData.publishedTime)
      }
      if (seoData.modifiedTime) {
        updateMetaTag('property', 'article:modified_time', seoData.modifiedTime)
      }
      if (seoData.author) {
        updateMetaTag('property', 'article:author', seoData.author)
      }
      if (seoData.section) {
        updateMetaTag('property', 'article:section', seoData.section)
      }
      if (seoData.tags) {
        seoData.tags.forEach(tag => {
          updateMetaTag('property', 'article:tag', tag)
        })
      }
    }

    // Update or create alternate language links
    if (seoData.alternate) {
      seoData.alternate.forEach(alt => {
        updateAlternateLink(alt.hreflang, alt.href)
      })
    }

    // Add structured data if provided
    if (structuredData) {
      updateStructuredData(structuredData)
    }

    // Add additional SEO meta tags
    updateMetaTag('name', 'author', 'Alfa School')
    updateMetaTag('name', 'generator', 'Next.js')
    updateMetaTag('name', 'theme-color', '#4a6fa5')
    updateMetaTag('name', 'msapplication-TileColor', '#4a6fa5')
    updateMetaTag('name', 'apple-mobile-web-app-capable', 'yes')
    updateMetaTag('name', 'apple-mobile-web-app-status-bar-style', 'default')
    updateMetaTag('name', 'apple-mobile-web-app-title', 'Alfa School')
    updateMetaTag('name', 'application-name', 'Alfa School')
    updateMetaTag('name', 'msapplication-tooltip', 'Alfa School - Φροντιστήριο Ξένων Γλωσσών')
    updateMetaTag('name', 'msapplication-starturl', '/')
    updateMetaTag('name', 'msapplication-navbutton-color', '#4a6fa5')
    updateMetaTag('name', 'msapplication-TileImage', `${baseUrl}/alfa-logo.png`)
    updateMetaTag('name', 'apple-touch-icon', `${baseUrl}/alfa-logo.png`)
    updateMetaTag('name', 'apple-touch-icon-precomposed', `${baseUrl}/alfa-logo.png`)

    // Add geo tags for local SEO
    updateMetaTag('name', 'geo.region', 'GR-ATT')
    updateMetaTag('name', 'geo.placename', 'Athens')
    updateMetaTag('name', 'geo.position', '38.029129737058376;23.793170706334312')
    updateMetaTag('name', 'ICBM', '38.029129737058376, 23.793170706334312')

    // Add language and content tags
    updateMetaTag('name', 'language', 'Greek')
    updateMetaTag('name', 'content-language', 'el')
    updateMetaTag('http-equiv', 'content-language', 'el-GR')

    // Add cache control
    updateMetaTag('http-equiv', 'cache-control', 'public, max-age=31536000')
    updateMetaTag('http-equiv', 'expires', new Date(Date.now() + 31536000000).toUTCString())

  }, [seoData, structuredData])

  return null // This component doesn't render anything
}

function updateMetaTag(attribute: string, value: string, content: string) {
  const selector = attribute === 'name' ? `meta[name="${value}"]` : `meta[property="${value}"]`
  let meta = document.querySelector(selector) as HTMLMetaElement
  
  if (meta) {
    meta.content = content
  } else {
    meta = document.createElement('meta')
    if (attribute === 'name') {
      meta.name = value
    } else {
      meta.setAttribute('property', value)
    }
    meta.content = content
    document.head.appendChild(meta)
  }
}

function updateCanonicalURL(url: string) {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
  
  if (canonical) {
    canonical.href = url
  } else {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = url
    document.head.appendChild(canonical)
  }
}

function updateAlternateLink(hreflang: string, href: string) {
  const selector = `link[rel="alternate"][hreflang="${hreflang}"]`
  let alternate = document.querySelector(selector) as HTMLLinkElement
  
  if (alternate) {
    alternate.href = href
  } else {
    alternate = document.createElement('link')
    alternate.rel = 'alternate'
    alternate.hreflang = hreflang
    alternate.href = href
    document.head.appendChild(alternate)
  }
}

function updateStructuredData(data: any) {
  // Remove existing structured data
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
  existingScripts.forEach(script => script.remove())

  // Add new structured data
  if (Array.isArray(data)) {
    // If data is an array, add each item as a separate script
    data.forEach(item => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(item)
      document.head.appendChild(script)
    })
  } else {
    // If data is a single object, add it as one script
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }
}