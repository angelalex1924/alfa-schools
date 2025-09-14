import type { Article } from './types';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
  type: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/**
 * Generate SEO data for articles
 */
export function generateArticleSEO(article: Article, baseUrl: string): SEOData {
  const articleUrl = `${baseUrl}/articles/${article.slug}`;
  const imageUrl = article.image || `${baseUrl}/alfa-logo.png`;
  
  // Clean content for description (remove HTML tags)
  const cleanContent = article.content.replace(/<[^>]*>/g, '').substring(0, 160);
  const description = article.excerpt || cleanContent;
  
  return {
    title: `${article.title} | Alfa School`,
    description,
    keywords: article.tags?.join(', ') || `${article.category}, εκπαίδευση, γλώσσες`,
    image: imageUrl,
    url: articleUrl,
    type: 'article',
    publishedTime: article.date instanceof Date ? article.date.toISOString() : new Date(article.date).toISOString(),
    modifiedTime: article.updatedAt instanceof Date ? article.updatedAt.toISOString() : new Date(article.updatedAt || article.date).toISOString(),
    author: article.author,
    section: article.category,
    tags: article.tags,
  };
}

/**
 * Generate structured data for articles
 */
export function generateArticleStructuredData(article: Article, baseUrl: string) {
  const articleUrl = `${baseUrl}/articles/${article.slug}`;
  const imageUrl = article.image || `${baseUrl}/alfa-logo.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": imageUrl,
    "url": articleUrl,
    "datePublished": article.date instanceof Date ? article.date.toISOString() : new Date(article.date).toISOString(),
    "dateModified": article.updatedAt instanceof Date ? article.updatedAt.toISOString() : new Date(article.updatedAt || article.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": article.author || "Alfa School"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Alfa School",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/alfa-logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "articleSection": article.category,
    "keywords": article.tags?.join(', ') || article.category,
    "wordCount": article.content.replace(/<[^>]*>/g, '').split(' ').length,
    "timeRequired": `PT${article.readingTime}M`,
    "inLanguage": "el-GR"
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{ label: string; href: string }>, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${baseUrl}${item.href}`
    }))
  };
}

/**
 * Generate organization structured data
 */
export function generateOrganizationStructuredData(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Alfa School",
    "url": baseUrl,
    "logo": `${baseUrl}/alfa-logo.png`,
    "description": "Εκπαιδευτικό κέντρο εξειδικευμένο στη διδασκαλία ξένων γλωσσών",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Greek", "English", "French"]
    },
    "sameAs": [
      // Add social media URLs here when available
    ]
  };
}

/**
 * Clean text for SEO (remove HTML tags, limit length)
 */
export function cleanTextForSEO(text: string, maxLength: number = 160): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
    .substring(0, maxLength)
    .replace(/\s+\S*$/, ''); // Don't cut words in half
}

/**
 * Generate canonical URL
 */
export function generateCanonicalURL(path: string, baseUrl: string): string {
  return `${baseUrl}${path}`;
}
