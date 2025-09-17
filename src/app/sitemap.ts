import { MetadataRoute } from 'next'
import { getArticles } from '@/lib/firebase-articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alfaschools.gr'
  
  // ULTRA-COMPREHENSIVE STATIC PAGES - COVERING ALL POSSIBLE SEARCHES
  const staticPages = [
    // MAIN PAGES - HIGHEST PRIORITY
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/why-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    
    // LANGUAGE-SPECIFIC PAGES - TARGETING "ΞΕΝΕΣ ΓΛΩΣΣΕΣ"
    {
      url: `${baseUrl}/services/english`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/french`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/ielts-preparation`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/toefl-preparation`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/cambridge-exams`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/delf-preparation`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/dalf-preparation`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    
    // LOCATION-SPECIFIC PAGES - TARGETING "ΦΡΟΝΤΙΣΤΗΡΙΑ ΑΘΗΝΑ"
    {
      url: `${baseUrl}/locations/chalandri`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/nea-filadelfeia`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/athens`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    
    // COURSE-SPECIFIC PAGES
    {
      url: `${baseUrl}/courses/beginner-english`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/intermediate-english`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/advanced-english`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/beginner-french`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/intermediate-french`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/advanced-french`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    
    // AGE-SPECIFIC PAGES
    {
      url: `${baseUrl}/courses/kids-english`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/teens-english`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/adults-english`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/kids-french`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/teens-french`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/adults-french`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    
    // EXAM PREPARATION PAGES
    {
      url: `${baseUrl}/exams/ielts`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/exams/toefl`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/exams/cambridge`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/exams/delf`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/exams/dalf`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    
    // CONTENT PAGES
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    
    // INTERACTIVE PAGES
    {
      url: `${baseUrl}/games`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/games/english`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/games/french`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    
    // LEGAL PAGES
    {
      url: `${baseUrl}/legal/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/iframe-test`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
  ]

  // DYNAMIC ARTICLE PAGES WITH ENHANCED SEO
  let articlePages: MetadataRoute.Sitemap = []
  
  try {
    const { articles } = await getArticles(500) // Get more articles for comprehensive sitemap
    
    articlePages = articles.map((article) => {
      // Enhanced priority calculation based on content and keywords
      let priority = 0.6;
      
      // Boost priority for language-related content
      if (article.title.toLowerCase().includes('αγγλικά') || 
          article.title.toLowerCase().includes('english')) priority = 0.8;
      if (article.title.toLowerCase().includes('γαλλικά') || 
          article.title.toLowerCase().includes('french')) priority = 0.8;
      if (article.title.toLowerCase().includes('ielts') || 
          article.title.toLowerCase().includes('toefl') ||
          article.title.toLowerCase().includes('cambridge') ||
          article.title.toLowerCase().includes('delf') ||
          article.title.toLowerCase().includes('dalf')) priority = 0.9;
      
      // Boost for featured and breaking content
      if (article.featured) priority = Math.min(priority + 0.1, 0.95);
      if (article.breaking) priority = Math.min(priority + 0.15, 1.0);
      
      // Calculate change frequency based on article age and type
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

  // DYNAMIC TAG PAGES
  let tagPages: MetadataRoute.Sitemap = []
  
  try {
    // Get unique tags from articles
    const { articles } = await getArticles(500)
    const uniqueTags = [...new Set(articles.flatMap(article => article.tags || []))]
    
    tagPages = uniqueTags.map(tag => ({
      url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Error fetching tags for sitemap:', error)
  }

  // DYNAMIC GAME PAGES
  const gamePages: MetadataRoute.Sitemap = [
    // English Games
    {
      url: `${baseUrl}/games/english/vocabulary/level-1`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/english/vocabulary/level-2`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/english/vocabulary/level-3`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/english/grammar/level-1`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/english/grammar/level-2`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/english/grammar/level-3`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/english/conversation/level-1`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/english/conversation/level-2`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/english/conversation/level-3`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/english/anagrams/level-1`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/english/anagrams/level-2`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/english/anagrams/level-3`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    
    // French Games
    {
      url: `${baseUrl}/games/french/vocabulary/level-1`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/french/vocabulary/level-2`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/french/vocabulary/level-3`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/french/grammar/level-1`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/french/grammar/level-2`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/french/grammar/level-3`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/french/conversation/level-1`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/french/conversation/level-2`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/french/conversation/level-3`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/french/anagrams/level-1`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/french/anagrams/level-2`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/games/french/anagrams/level-3`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // COMBINE ALL PAGES
  return [
    ...staticPages,
    ...articlePages,
    ...tagPages,
    ...gamePages
  ]
}