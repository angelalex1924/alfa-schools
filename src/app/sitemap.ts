import { MetadataRoute } from 'next'
import { getArticles } from '@/lib/firebase-articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/why-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // Dynamic article pages
  let articlePages: MetadataRoute.Sitemap = []
  
  try {
    const { articles } = await getArticles(100) // Get up to 100 articles for sitemap
    
    articlePages = articles.map((article) => {
      // Calculate priority based on article features
      let priority = 0.6;
      if (article.featured) priority = 0.8;
      if (article.breaking) priority = 0.9;
      
      // Calculate change frequency based on article age
      const articleDate = new Date(article.date);
      const daysSincePublished = (Date.now() - articleDate.getTime()) / (1000 * 60 * 60 * 24);
      let changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly';
      
      if (daysSincePublished < 7) changeFrequency = 'daily';
      else if (daysSincePublished < 30) changeFrequency = 'weekly';
      else if (daysSincePublished < 365) changeFrequency = 'monthly';
      else changeFrequency = 'yearly';
      
      return {
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified: new Date(article.updatedAt || article.date),
        changeFrequency,
        priority,
      }
    })
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error)
  }

  return [...staticPages, ...articlePages]
}
