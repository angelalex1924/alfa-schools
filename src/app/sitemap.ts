import { MetadataRoute } from 'next'
import { fetchAllArticlesForSitemap, getAllArticleTags } from '@/lib/server-sitemap'

// Cache configuration for faster updates - every 4 hours
export const revalidate = 14400 // 4 hours in seconds (4 * 60 * 60)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.alfaschools.gr'
  
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

  // Get all articles from Firebase - this runs every 4 hours and fetches ALL articles
  let articles: any[] = []
  try {
    articles = await fetchAllArticlesForSitemap()
    console.log(`📊 Article types: Breaking: ${articles.filter(a => a.breaking).length}, Featured: ${articles.filter(a => a.featured).length}, Total: ${articles.length}`)
  } catch (error) {
    console.error('❌ Error fetching articles for sitemap:', error)
  }

  // Create article pages
  const articlePages = articles
    .filter((article) => article.slug) // Filter out articles without slugs first
    .map((article) => {
      // Calculate priority based on article properties
      let priority = 0.7 // Default priority
      
      if (article.breaking) {
        priority = 0.9 // Breaking news gets highest priority
      } else if (article.featured) {
        priority = 0.8 // Featured articles get high priority
      } else if (article.category === "English" || article.category === "French") {
        priority = 0.75 // Language articles get slightly higher priority
      }

      // Calculate change frequency based on content type
      let changeFrequency: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' = 'daily' // Default to daily for all articles
      
      if (article.breaking) {
        changeFrequency = 'hourly' // Breaking news changes frequently
      } else if (article.featured) {
        changeFrequency = 'daily' // Featured articles change daily
      } else {
        changeFrequency = 'daily' // All articles get daily updates for better Google indexing
      }

      return {
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified: new Date(article.updatedAt || article.date || article.publishDate),
        changeFrequency,
        priority,
      }
    })

  // Create tag pages for common tags
  const commonTags = [
    // Language Learning
    "αγγλικά", "english", "γαλλικά", "french", "γερμανικά", "german",
    "ισπανικά", "spanish", "ιταλικά", "italian", "πορτογαλικά", "portuguese",
    
    // Exams & Certifications
    "ielts", "toefl", "cambridge", "delf", "dalf", "delf", "dalf",
    "certificate", "πιστοποίηση", "exam", "εξέταση", "test", "δοκιμασία",
    
    // Education & Learning
    "education", "εκπαίδευση", "learning", "μάθηση", "teaching", "διδασκαλία",
    "school", "σχολείο", "student", "μαθητής", "teacher", "δάσκαλος",
    
    // Language Skills
    "grammar", "γραμματική", "vocabulary", "λεξιλόγιο", "pronunciation", "προφορά",
    "conversation", "συζήτηση", "writing", "γράψιμο", "reading", "ανάγνωση",
    "listening", "ακουστική", "speaking", "ομιλία",
    
    // Age Groups
    "children", "παιδιά", "kids", "adults", "ενήλικες", "teenagers", "έφηβοι",
    "beginners", "αρχάριοι", "intermediate", "μεσαίοι", "advanced", "προχωρημένοι",
    
    // Popular Topics
    "business", "επιχειρήσεις", "travel", "ταξίδι", "culture", "πολιτισμός",
    "technology", "τεχνολογία", "science", "επιστήμη", "art", "τέχνη",
  ]

  // Get unique tags from articles
  const articleTags = new Set<string>()
  articles.forEach((article) => {
    if (article.tags && Array.isArray(article.tags)) {
      article.tags.forEach((tag: string) => articleTags.add(tag))
    }
  })

  // Combine common tags with article tags
  const allTags = [...new Set([...commonTags, ...Array.from(articleTags)])]

  // Create tag pages
  const tagPages = allTags.map((tag) => {
    // Calculate priority based on tag importance
    let priority = 0.6 // Default tag priority
    
    // High priority tags
    if (["αγγλικά", "english", "γαλλικά", "french", "ielts", "toefl"].includes(tag.toLowerCase())) {
      priority = 0.8
    } else if (["cambridge", "delf", "dalf", "grammar", "γραμματική"].includes(tag.toLowerCase())) {
      priority = 0.7
    }

    // Create slug from tag
    const tagSlug = tag.toLowerCase()
      .replace(/[^a-z0-9α-ωάέήίόύώ]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    return {
      url: `${baseUrl}/tags/${tagSlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority,
    }
  })

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