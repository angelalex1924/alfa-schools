"use client"

import { useEffect } from 'react'
import type { SEOData } from '@/lib/seo-utils'

interface AdvancedSEOHeadProps {
  seoData: SEOData;
  structuredData?: any;
  additionalKeywords?: string[];
  locationKeywords?: string[];
  examKeywords?: string[];
}

export default function AdvancedSEOHead({ 
  seoData, 
  structuredData, 
  additionalKeywords = [],
  locationKeywords = [],
  examKeywords = []
}: AdvancedSEOHeadProps) {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alfaschools.gr'
    
    // Enhanced meta tags for maximum SEO impact
    const enhancedKeywords = [
      ...seoData.keywords.split(', '),
      ...additionalKeywords,
      ...locationKeywords,
      ...examKeywords,
      // Additional high-impact keywords
      'φροντιστήριο Αθήνα',
      'φροντιστήριο Αττική',
      'γλωσσικό κέντρο Αθήνα',
      'εκπαιδευτικό κέντρο Αθήνα',
      'μαθήματα αγγλικά Αθήνα',
      'μαθήματα γαλλικά Αθήνα',
      'IELTS Αθήνα',
      'TOEFL Αθήνα',
      'Cambridge Αθήνα',
      'DELF Αθήνα',
      'DALF Αθήνα',
      'φροντιστήριο Χαλάνδρι',
      'φροντιστήριο Νέα Φιλαδέλφεια',
      'Alfa School Χαλάνδρι',
      'Alfa School Νέα Φιλαδέλφεια',
      'καλύτερο φροντιστήριο Αθήνα',
      'καλύτερο φροντιστήριο Αττική',
      'φροντιστήριο ξένων γλωσσών Αθήνα',
      'φροντιστήριο ξένων γλωσσών Αττική',
      'μαθήματα γλωσσών Αθήνα',
      'μαθήματα γλωσσών Αττική',
      'εκπαίδευση γλωσσών Αθήνα',
      'εκπαίδευση γλωσσών Αττική',
      'online μαθήματα αγγλικά Αθήνα',
      'online μαθήματα γαλλικά Αθήνα',
      'ιδιαίτερα μαθήματα αγγλικά Αθήνα',
      'ιδιαίτερα μαθήματα γαλλικά Αθήνα',
      'φροντιστήριο παιδιά Αθήνα',
      'φροντιστήριο εφήβους Αθήνα',
      'φροντιστήριο ενήλικες Αθήνα',
      'μαθήματα αγγλικά για παιδιά Αθήνα',
      'μαθήματα γαλλικά για παιδιά Αθήνα',
      'μαθήματα αγγλικά για εφήβους Αθήνα',
      'μαθήματα γαλλικά για εφήβους Αθήνα',
      'μαθήματα αγγλικά για ενήλικες Αθήνα',
      'μαθήματα γαλλικά για ενήλικες Αθήνα',
      'προετοιμασία IELTS Αθήνα',
      'προετοιμασία TOEFL Αθήνα',
      'προετοιμασία Cambridge Αθήνα',
      'προετοιμασία DELF Αθήνα',
      'προετοιμασία DALF Αθήνα',
      'IELTS preparation Athens',
      'TOEFL preparation Athens',
      'Cambridge preparation Athens',
      'DELF preparation Athens',
      'DALF preparation Athens',
      'English courses Athens',
      'French courses Athens',
      'Language school Athens',
      'Language center Athens'
    ].join(', ')

    // Update basic SEO elements
    document.title = seoData.title
    updateMetaTag('name', 'description', seoData.description)
    updateMetaTag('name', 'keywords', enhancedKeywords)
    
    // Enhanced robots meta
    if (seoData.robots) {
      updateMetaTag('name', 'robots', seoData.robots)
    }
    
    // Enhanced viewport
    if (seoData.viewport) {
      updateMetaTag('name', 'viewport', seoData.viewport)
    }

    // Enhanced canonical URL
    updateCanonicalURL(seoData.canonical || seoData.url)

    // Enhanced Open Graph tags
    updateMetaTag('property', 'og:title', seoData.title)
    updateMetaTag('property', 'og:description', seoData.description)
    updateMetaTag('property', 'og:image', seoData.image)
    updateMetaTag('property', 'og:url', seoData.url)
    updateMetaTag('property', 'og:type', seoData.type)
    updateMetaTag('property', 'og:site_name', 'Alfa Schools - #1 Φροντιστήρια Αθήνα')
    updateMetaTag('property', 'og:locale', 'el_GR')
    updateMetaTag('property', 'og:locale:alternate', 'en_US')

    // Enhanced Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image')
    updateMetaTag('name', 'twitter:title', seoData.title)
    updateMetaTag('name', 'twitter:description', seoData.description)
    updateMetaTag('name', 'twitter:image', seoData.image)
    updateMetaTag('name', 'twitter:site', '@alfaschools')
    updateMetaTag('name', 'twitter:creator', '@alfaschools')

    // Enhanced article-specific meta tags
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

    // Enhanced alternate language links
    if (seoData.alternate) {
      seoData.alternate.forEach(alt => {
        updateAlternateLink(alt.hreflang, alt.href)
      })
    }

    // Add structured data if provided
    if (structuredData) {
      updateStructuredData(structuredData)
    }

    // Enhanced SEO meta tags
    updateMetaTag('name', 'author', 'Alfa Schools')
    updateMetaTag('name', 'generator', 'Next.js')
    updateMetaTag('name', 'theme-color', '#4a6fa5')
    updateMetaTag('name', 'msapplication-TileColor', '#4a6fa5')
    updateMetaTag('name', 'apple-mobile-web-app-capable', 'yes')
    updateMetaTag('name', 'apple-mobile-web-app-status-bar-style', 'default')
    updateMetaTag('name', 'apple-mobile-web-app-title', 'Alfa Schools')
    updateMetaTag('name', 'application-name', 'Alfa Schools')
    updateMetaTag('name', 'msapplication-tooltip', 'Alfa Schools - #1 Φροντιστήρια Αθήνα')
    updateMetaTag('name', 'msapplication-starturl', '/')
    updateMetaTag('name', 'msapplication-navbutton-color', '#4a6fa5')
    updateMetaTag('name', 'msapplication-TileImage', `${baseUrl}/alfa-logo.png`)
    updateMetaTag('name', 'apple-touch-icon', `${baseUrl}/alfa-logo.png`)
    updateMetaTag('name', 'apple-touch-icon-precomposed', `${baseUrl}/alfa-logo.png`)

    // Enhanced geo tags for local SEO
    updateMetaTag('name', 'geo.region', 'GR-ATT')
    updateMetaTag('name', 'geo.placename', 'Athens')
    updateMetaTag('name', 'geo.position', '38.029129737058376;23.793170706334312')
    updateMetaTag('name', 'ICBM', '38.029129737058376, 23.793170706334312')

    // Enhanced language and content tags
    updateMetaTag('name', 'language', 'Greek')
    updateMetaTag('name', 'content-language', 'el')
    updateMetaTag('http-equiv', 'content-language', 'el-GR')

    // Enhanced cache control
    updateMetaTag('http-equiv', 'cache-control', 'public, max-age=31536000')
    updateMetaTag('http-equiv', 'expires', new Date(Date.now() + 31536000000).toUTCString())

    // Additional SEO meta tags for maximum impact
    updateMetaTag('name', 'rating', 'General')
    updateMetaTag('name', 'distribution', 'Global')
    updateMetaTag('name', 'revisit-after', '1 days')
    updateMetaTag('name', 'classification', 'Education')
    updateMetaTag('name', 'category', 'Language Education')
    updateMetaTag('name', 'coverage', 'Worldwide')
    updateMetaTag('name', 'target', 'all')
    updateMetaTag('name', 'audience', 'all')
    updateMetaTag('name', 'resource-type', 'document')
    updateMetaTag('name', 'document-type', 'Web Page')
    updateMetaTag('name', 'document-classification', 'Public')
    updateMetaTag('name', 'document-state', 'Dynamic')
    updateMetaTag('name', 'document-rating', 'General')
    updateMetaTag('name', 'document-distribution', 'Global')

    // Enhanced Open Graph tags for better social sharing
    updateMetaTag('property', 'og:image:width', '1200')
    updateMetaTag('property', 'og:image:height', '630')
    updateMetaTag('property', 'og:image:type', 'image/png')
    updateMetaTag('property', 'og:image:alt', 'Alfa Schools - #1 Φροντιστήρια Αθήνα')
    updateMetaTag('property', 'og:updated_time', new Date().toISOString())
    updateMetaTag('property', 'og:see_also', baseUrl)
    updateMetaTag('property', 'og:rich_attachment', 'true')

    // Enhanced Twitter Card tags
    updateMetaTag('name', 'twitter:image:alt', 'Alfa Schools - #1 Φροντιστήρια Αθήνα')
    updateMetaTag('name', 'twitter:domain', 'alfaschools.gr')
    updateMetaTag('name', 'twitter:url', seoData.url)

    // Enhanced structured data for better search results
    updateMetaTag('name', 'google-site-verification', 'your-google-verification-code')
    updateMetaTag('name', 'msvalidate.01', 'your-bing-verification-code')
    updateMetaTag('name', 'yandex-verification', 'your-yandex-verification-code')

  }, [seoData, structuredData, additionalKeywords, locationKeywords, examKeywords])

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
