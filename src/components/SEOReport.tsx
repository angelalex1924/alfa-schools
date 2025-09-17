"use client"

import { useEffect, useState } from 'react'

interface SEOReportProps {
  pageName: string;
  targetKeywords: string[];
  location?: string;
}

interface SEOReportData {
  score: number;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  structuredDataCount: number;
  recommendations: string[];
}

export default function SEOReport({ pageName, targetKeywords, location = 'Athens' }: SEOReportProps) {
  const [report, setReport] = useState<SEOReportData | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const generateReport = () => {
      // Check if all essential SEO elements are present
      const title = document.title
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
      const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || ''
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || ''
      const structuredData = document.querySelectorAll('script[type="application/ld+json"]')

      // SEO Score Calculation
      let seoScore = 0
      const maxScore = 100
      const recommendations: string[] = []

      // Title check (20 points)
      if (title && title.length > 30 && title.length < 60) {
        seoScore += 20
      } else if (title) {
        seoScore += 10
        if (title.length < 30) {
          recommendations.push('Title is too short (should be 30-60 characters)')
        } else if (title.length > 60) {
          recommendations.push('Title is too long (should be 30-60 characters)')
        }
      } else {
        recommendations.push('Missing title tag')
      }

      // Description check (20 points)
      if (description && description.length > 120 && description.length < 160) {
        seoScore += 20
      } else if (description) {
        seoScore += 10
        if (description.length < 120) {
          recommendations.push('Description is too short (should be 120-160 characters)')
        } else if (description.length > 160) {
          recommendations.push('Description is too long (should be 120-160 characters)')
        }
      } else {
        recommendations.push('Missing meta description')
      }

      // Keywords check (15 points)
      if (keywords && keywords.length > 50) {
        seoScore += 15
      } else if (keywords) {
        seoScore += 8
        recommendations.push('Add more relevant keywords')
      } else {
        recommendations.push('Missing keywords meta tag')
      }

      // Canonical URL check (10 points)
      if (canonical) {
        seoScore += 10
      } else {
        recommendations.push('Missing canonical URL')
      }

      // Open Graph tags check (15 points)
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content')
      const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content')
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content')
      
      if (ogTitle && ogDescription && ogImage) {
        seoScore += 15
      } else if (ogTitle || ogDescription || ogImage) {
        seoScore += 8
        recommendations.push('Complete Open Graph tags (title, description, image)')
      } else {
        recommendations.push('Missing Open Graph tags')
      }

      // Structured data check (20 points)
      if (structuredData.length > 0) {
        seoScore += 20
      } else {
        recommendations.push('Add structured data (JSON-LD)')
      }

      // Keyword coverage check
      const keywordCoverage = targetKeywords.filter(keyword => 
        title.toLowerCase().includes(keyword.toLowerCase()) ||
        description.toLowerCase().includes(keyword.toLowerCase()) ||
        keywords.toLowerCase().includes(keyword.toLowerCase())
      ).length

      const coveragePercentage = Math.round((keywordCoverage / targetKeywords.length) * 100)
      
      if (coveragePercentage < 70) {
        recommendations.push(`Improve keyword coverage (${coveragePercentage}% - should be >70%)`)
      }

      setReport({
        score: seoScore,
        title,
        description,
        keywords,
        canonical,
        structuredDataCount: structuredData.length,
        recommendations
      })
    }

    // Generate report after page load
    const timer = setTimeout(generateReport, 1000)

    return () => clearTimeout(timer)
  }, [pageName, targetKeywords, location])

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        📊 SEO Report
      </button>
      
      {isVisible && report && (
        <div className="absolute bottom-12 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl p-4 w-96 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">SEO Report - {pageName}</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">SEO Score:</span>
              <span className={`text-lg font-bold ${
                report.score >= 80 ? 'text-green-600' : 
                report.score >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {report.score}/100
              </span>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <div><strong>Title:</strong> {report.title}</div>
              <div><strong>Description:</strong> {report.description.substring(0, 100)}...</div>
              <div><strong>Canonical:</strong> {report.canonical}</div>
              <div><strong>Structured Data:</strong> {report.structuredDataCount} scripts</div>
              <div><strong>Keywords:</strong> {report.keywords.split(', ').length} keywords</div>
            </div>
            
            {report.recommendations.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recommendations:</h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  {report.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">⚠️</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}