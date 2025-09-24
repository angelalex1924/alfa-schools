import { 
  collection, 
  getDocs, 
  query, 
  orderBy,
  where,
  limit
} from 'firebase/firestore';
import { db } from './firebase';

export interface SitemapArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  featured: boolean;
  breaking: boolean;
  trending: boolean;
  tags: string[];
  date: Date;
  updatedAt?: Date;
  publishDate?: string;
}

// Fetch all articles for sitemap generation
export async function fetchAllArticlesForSitemap(): Promise<SitemapArticle[]> {
  try {
    console.log('🔄 Fetching articles for sitemap...');
    
    // Get all articles ordered by date (newest first)
    const q = query(
      collection(db, 'articles'),
      orderBy('date', 'desc'),
      limit(1000) // Limit to prevent timeout, adjust as needed
    );

    const querySnapshot = await getDocs(q);
    const articles: SitemapArticle[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        slug: data.slug || '',
        title: data.title || '',
        category: data.category || '',
        featured: data.featured || false,
        breaking: data.breaking || false,
        trending: data.trending || false,
        tags: data.tags || [],
        date: data.date?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate(),
        publishDate: data.publishDate,
      });
    });

    console.log(`✅ Fetched ${articles.length} articles for sitemap`);
    return articles;
  } catch (error) {
    console.error('❌ Error fetching articles for sitemap:', error);
    throw new Error('Failed to fetch articles for sitemap');
  }
}

// Fetch articles by category for category-specific sitemaps
export async function fetchArticlesByCategory(category: string): Promise<SitemapArticle[]> {
  try {
    const q = query(
      collection(db, 'articles'),
      where('category', '==', category),
      orderBy('date', 'desc'),
      limit(500)
    );

    const querySnapshot = await getDocs(q);
    const articles: SitemapArticle[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        slug: data.slug || '',
        title: data.title || '',
        category: data.category || '',
        featured: data.featured || false,
        breaking: data.breaking || false,
        trending: data.trending || false,
        tags: data.tags || [],
        date: data.date?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate(),
        publishDate: data.publishDate,
      });
    });

    return articles;
  } catch (error) {
    console.error(`❌ Error fetching articles for category ${category}:`, error);
    return [];
  }
}

// Get unique tags from all articles
export async function getAllArticleTags(): Promise<string[]> {
  try {
    const articles = await fetchAllArticlesForSitemap();
    const tagSet = new Set<string>();
    
    articles.forEach(article => {
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach(tag => {
          if (tag && tag.trim()) {
            tagSet.add(tag.trim());
          }
        });
      }
    });

    return Array.from(tagSet);
  } catch (error) {
    console.error('❌ Error getting article tags:', error);
    return [];
  }
}

// Get article count for statistics
export async function getArticleCount(): Promise<number> {
  try {
    const articles = await fetchAllArticlesForSitemap();
    return articles.length;
  } catch (error) {
    console.error('❌ Error getting article count:', error);
    return 0;
  }
}
