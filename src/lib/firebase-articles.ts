import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  orderBy, 
  where, 
  limit,
  startAfter,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import type { Article, ArticleFormData } from './types';

const ARTICLES_COLLECTION = 'articles';

// Create a new article
export async function createArticle(articleData: ArticleFormData): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, ARTICLES_COLLECTION), {
      ...articleData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      date: Timestamp.fromDate(new Date(articleData.publishDate)),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating article:', error);
    throw new Error('Failed to create article');
  }
}

// Update an existing article
export async function updateArticle(articleId: string, articleData: Partial<ArticleFormData>): Promise<void> {
  try {
    const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
    await updateDoc(articleRef, {
      ...articleData,
      updatedAt: Timestamp.now(),
      date: articleData.publishDate ? Timestamp.fromDate(new Date(articleData.publishDate)) : undefined,
    });
  } catch (error) {
    console.error('Error updating article:', error);
    throw new Error('Failed to update article');
  }
}

// Delete an article
export async function deleteArticle(articleId: string): Promise<void> {
  try {
    const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
    await deleteDoc(articleRef);
  } catch (error) {
    console.error('Error deleting article:', error);
    throw new Error('Failed to delete article');
  }
}

// Get all articles (for admin)
export async function getAllArticles(): Promise<Article[]> {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      orderBy('date', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const articles: Article[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        ...data,
        date: data.date?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Article);
    });

    return articles;
  } catch (error) {
    console.error('Error getting all articles:', error);
    throw new Error('Failed to get articles');
  }
}

// Get a single article by ID
export async function getArticleById(articleId: string): Promise<Article | null> {
  try {
    const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
    const articleSnap = await getDoc(articleRef);
    
    if (articleSnap.exists()) {
      const data = articleSnap.data();
      return {
        id: articleSnap.id,
        ...data,
        date: data.date?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Article;
    }
    return null;
  } catch (error) {
    console.error('Error getting article:', error);
    throw new Error('Failed to get article');
  }
}

// Get article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('slug', '==', slug),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: data.date?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Article;
    }
    return null;
  } catch (error) {
    console.error('Error getting article by slug:', error);
    throw new Error('Failed to get article by slug');
  }
}

// Get all articles with pagination
export async function getArticles(
  pageSize: number = 10,
  lastDoc?: any
): Promise<{ articles: Article[]; lastDoc: any }> {
  try {
    let q = query(
      collection(db, ARTICLES_COLLECTION),
      orderBy('date', 'desc'),
      limit(pageSize)
    );

    if (lastDoc) {
      q = query(
        collection(db, ARTICLES_COLLECTION),
        orderBy('date', 'desc'),
        startAfter(lastDoc),
        limit(pageSize)
      );
    }

    const querySnapshot = await getDocs(q);
    const articles: Article[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        ...data,
        date: data.date?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Article);
    });

    const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
    
    return {
      articles,
      lastDoc: lastDocument
    };
  } catch (error) {
    console.error('Error getting articles:', error);
    throw new Error('Failed to get articles');
  }
}

// Get featured articles
export async function getFeaturedArticles(limitCount: number = 5): Promise<Article[]> {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('featured', '==', true),
      orderBy('date', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const articles: Article[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        ...data,
        date: data.date?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Article);
    });

    return articles;
  } catch (error) {
    console.error('Error getting featured articles:', error);
    throw new Error('Failed to get featured articles');
  }
}

// Get articles by category
export async function getArticlesByCategory(
  category: string,
  pageSize: number = 10,
  lastDoc?: any
): Promise<{ articles: Article[]; lastDoc: any }> {
  try {
    let q = query(
      collection(db, ARTICLES_COLLECTION),
      where('category', '==', category),
      orderBy('date', 'desc'),
      limit(pageSize)
    );

    if (lastDoc) {
      q = query(
        collection(db, ARTICLES_COLLECTION),
        where('category', '==', category),
        orderBy('date', 'desc'),
        startAfter(lastDoc),
        limit(pageSize)
      );
    }

    const querySnapshot = await getDocs(q);
    const articles: Article[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        ...data,
        date: data.date?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Article);
    });

    const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
    
    return {
      articles,
      lastDoc: lastDocument
    };
  } catch (error) {
    console.error('Error getting articles by category:', error);
    throw new Error('Failed to get articles by category');
  }
}

// Search articles
export async function searchArticles(searchTerm: string): Promise<Article[]> {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a basic implementation that searches in title and excerpt
    // For production, consider using Algolia or similar service
    
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      orderBy('date', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const articles: Article[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const article = {
        id: doc.id,
        ...data,
        date: data.date?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Article;

      // Simple text search in title, excerpt, and content
      const searchLower = searchTerm.toLowerCase();
      if (
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower)
      ) {
        articles.push(article);
      }
    });

    return articles;
  } catch (error) {
    console.error('Error searching articles:', error);
    throw new Error('Failed to search articles');
  }
}

// Increment view count
export async function incrementViewCount(articleId: string): Promise<void> {
  try {
    const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
    const articleSnap = await getDoc(articleRef);
    
    if (articleSnap.exists()) {
      const currentViews = articleSnap.data().viewCount || 0;
      await updateDoc(articleRef, {
        viewCount: currentViews + 1
      });
    }
  } catch (error) {
    console.error('Error incrementing view count:', error);
    // Don't throw error for view count increment failures
  }
}

// Convert image to base64 with compression
export async function convertImageToBase64(
  file: File, 
  maxWidth: number = 1200, 
  quality: number = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      const base64 = canvas.toDataURL('image/jpeg', quality);
      resolve(base64);
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}
