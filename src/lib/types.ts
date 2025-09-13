export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  imageSource?: string;
  featured: boolean;
  breaking: boolean;
  showInTicker: boolean;
  tags: string[];
  author?: string;
  date: Date | string;
  publishDate: string;
  viewCount: number;
  readingTime: number;
  expert?: string;
  // English translations
  titleEn?: string;
  excerptEn?: string;
  contentEn?: string;
  expertEn?: string;
  authorEn?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  imageSource: string;
  featured: boolean;
  breaking: boolean;
  showInTicker: boolean;
  tags: string[];
  author?: string;
  publishDate: string;
  viewCount: number;
  readingTime: number;
  expert: string;
  // English translations
  titleEn: string;
  excerptEn: string;
  contentEn: string;
  expertEn: string;
  authorEn: string;
}

export interface Category {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export interface ArticleStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  featuredArticles: number;
  totalViews: number;
  recentArticles: Article[];
}
