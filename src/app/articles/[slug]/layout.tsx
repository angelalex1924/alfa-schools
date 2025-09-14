import { Metadata } from 'next';
import { getArticleBySlug } from '@/lib/firebase-articles';

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    
    if (!article) {
      return {
        title: 'Άρθρο δεν βρέθηκε | Alfa School',
        description: 'Το άρθρο που αναζητάτε δεν βρέθηκε.',
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alfaschool.gr';
    const articleUrl = `${baseUrl}/articles/${article.slug}`;
    const imageUrl = article.image || `${baseUrl}/alfa-logo.png`;

    // Clean content for description (remove HTML tags)
    const cleanContent = article.content.replace(/<[^>]*>/g, '').substring(0, 160);
    const description = article.excerpt || cleanContent;

    return {
      title: `${article.title} | Alfa School`,
      description: description,
      keywords: article.tags?.join(', ') || `${article.category}, εκπαίδευση, γλώσσες`,
      authors: article.author ? [{ name: article.author }] : undefined,
      openGraph: {
        title: article.title,
        description: description,
        url: articleUrl,
        siteName: 'Alfa School',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        locale: 'el_GR',
        type: 'article',
        publishedTime: article.date instanceof Date ? article.date.toISOString() : new Date(article.date).toISOString(),
        modifiedTime: article.updatedAt instanceof Date ? article.updatedAt.toISOString() : new Date(article.updatedAt || article.date).toISOString(),
        authors: article.author ? [article.author] : undefined,
        section: article.category,
        tags: article.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: description,
        images: [imageUrl],
        creator: '@alfaschool',
      },
      alternates: {
        canonical: articleUrl,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Άρθρο | Alfa School',
      description: 'Διαβάστε το άρθρο μας στο Alfa School.',
    };
  }
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
