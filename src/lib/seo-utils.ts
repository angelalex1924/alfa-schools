import type { Article } from './types';
import { generateUltraKeywords, generateHighPriorityKeywords } from './keyword-generator';

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
  canonical?: string;
  alternate?: { hreflang: string; href: string }[];
  robots?: string;
  viewport?: string;
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
    "timeRequired": article.readingTime ? `PT${article.readingTime}M` : undefined,
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

/**
 * Generate comprehensive SEO data for homepage
 */
export function generateHomepageSEO(baseUrl: string): SEOData {
  return {
    title: "Alfa School - Φροντιστήριο Ξένων Γλωσσών | Αγγλικά & Γαλλικά | Χαλάνδρι & Νέα Φιλαδέλφεια",
    description: "Το καλύτερο φροντιστήριο ξένων γλωσσών στην Αθήνα! Μαθήματα Αγγλικά & Γαλλικά για όλες τις ηλικίες. Προετοιμασία για IELTS, TOEFL, Cambridge, DELF, DALF. 35+ χρόνια εμπειρία, 1000+ επιτυχημένοι μαθητές. Εγγραφή τώρα!",
    keywords: "φροντιστήριο, αγγλικά, γαλλικά, IELTS, TOEFL, Cambridge, DELF, DALF, μαθήματα γλωσσών, Χαλάνδρι, Νέα Φιλαδέλφεια, Αθήνα, εκπαίδευση, ξένες γλώσσες, προετοιμασία εξετάσεων, φροντιστήριο Αθήνα, καλύτερο φροντιστήριο, μαθήματα αγγλικά, μαθήματα γαλλικά, online μαθήματα, ιδιαίτερα μαθήματα",
    image: `${baseUrl}/alfa-logo.png`,
    url: baseUrl,
    type: 'website',
    canonical: baseUrl,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    viewport: 'width=device-width, initial-scale=1',
    alternate: [
      { hreflang: 'el', href: baseUrl },
      { hreflang: 'en', href: `${baseUrl}/en` },
      { hreflang: 'x-default', href: baseUrl }
    ]
  };
}

/**
 * Generate SEO data for services page
 */
export function generateServicesSEO(baseUrl: string): SEOData {
  return {
    title: "Υπηρεσίες - Alfa School | Μαθήματα Αγγλικά & Γαλλικά | Φροντιστήριο Ξένων Γλωσσών",
    description: "Ανακαλύψτε τις υπηρεσίες μας! Μαθήματα Αγγλικά & Γαλλικά για όλες τις ηλικίες, προετοιμασία εξετάσεων, ιδιαίτερα μαθήματα, online μαθήματα. 35+ χρόνια εμπειρία, εξασφαλισμένα αποτελέσματα!",
    keywords: "υπηρεσίες φροντιστήριο, μαθήματα αγγλικά, μαθήματα γαλλικά, προετοιμασία εξετάσεων, IELTS, TOEFL, Cambridge, DELF, DALF, ιδιαίτερα μαθήματα, online μαθήματα, φροντιστήριο Αθήνα, εκπαίδευση γλωσσών",
    image: `${baseUrl}/alfa-logo.png`,
    url: `${baseUrl}/services`,
    type: 'website',
    canonical: `${baseUrl}/services`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  };
}

/**
 * Generate SEO data for contact page
 */
export function generateContactSEO(baseUrl: string): SEOData {
  return {
    title: "Επικοινωνία - Alfa School | Χαλάνδρι & Νέα Φιλαδέλφεια | Φροντιστήριο Ξένων Γλωσσών",
    description: "Επικοινωνήστε μαζί μας! Alfa School - Φροντιστήριο ξένων γλωσσών σε Χαλάνδρι & Νέα Φιλαδέλφεια. Τηλέφωνα, email, διευθύνσεις. Εγγραφή για μαθήματα Αγγλικά & Γαλλικά!",
    keywords: "επικοινωνία φροντιστήριο, Alfa School Χαλάνδρι, Alfa School Νέα Φιλαδέλφεια, τηλέφωνο φροντιστήριο, email φροντιστήριο, διεύθυνση φροντιστήριο, εγγραφή μαθήματα, φροντιστήριο Αθήνα επικοινωνία",
    image: `${baseUrl}/alfa-logo.png`,
    url: `${baseUrl}/contact`,
    type: 'website',
    canonical: `${baseUrl}/contact`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  };
}

/**
 * Generate SEO data for games page
 */
export function generateGamesSEO(baseUrl: string): SEOData {
  return {
    title: "Εκπαιδευτικά Παιχνίδια - Alfa School | Αγγλικά & Γαλλικά | Διαδραστική Μάθηση",
    description: "Μάθετε Αγγλικά & Γαλλικά με διαδραστικά παιχνίδια! Λεξιλόγιο, γραμματική, συνομιλία, αναγραμματισμοί. Εκπαιδευτικά παιχνίδια για όλες τις ηλικίες. Δωρεάν παιχνίδια γλωσσών!",
    keywords: "εκπαιδευτικά παιχνίδια, παιχνίδια αγγλικά, παιχνίδια γαλλικά, διαδραστική μάθηση, λεξιλόγιο, γραμματική, συνομιλία, αναγραμματισμοί, δωρεάν παιχνίδια, εκπαίδευση παιδιών, μάθηση γλωσσών",
    image: `${baseUrl}/alfa-logo.png`,
    url: `${baseUrl}/games`,
    type: 'website',
    canonical: `${baseUrl}/games`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  };
}

/**
 * Generate comprehensive structured data for educational organization
 */
export function generateEducationalOrganizationStructuredData(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Alfa Schools",
    "alternateName": "Alfa Schools Language Center",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/alfa-logo.png`,
      "width": 300,
      "height": 300
    },
    "description": "Εκπαιδευτικό κέντρο εξειδικευμένο στη διδασκαλία ξένων γλωσσών με 35+ χρόνια εμπειρία",
    "foundingDate": "1989",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Ρούμελης 27",
        "addressLocality": "Χαλάνδρι",
        "addressRegion": "Αττική",
        "postalCode": "15234",
        "addressCountry": "GR"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Αγίου Γεωργίου 15",
        "addressLocality": "Νέα Φιλαδέλφεια",
        "addressRegion": "Αττική",
        "postalCode": "14342",
        "addressCountry": "GR"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+30-210-6800-708",
        "contactType": "customer service",
        "areaServed": "GR",
        "availableLanguage": ["Greek", "English", "French"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+30-210-2777-725",
        "contactType": "customer service",
        "areaServed": "GR",
        "availableLanguage": ["Greek", "English", "French"]
      }
    ],
    "email": ["info@alfaschoolchalandri.com", "alfaschoolfiladelfeia@gmail.com"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Language Courses",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "English Language Courses",
            "description": "Comprehensive English language courses for all levels"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "French Language Courses",
            "description": "Comprehensive French language courses for all levels"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100057649952827",
      "https://www.instagram.com/alfaschools/"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Ποια γλώσσες διδάσκετε;",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Διδάσκουμε Αγγλικά και Γαλλικά για όλες τις ηλικίες, από παιδιά έως ενήλικες."
        }
      },
      {
        "@type": "Question",
        "name": "Που βρίσκεται το φροντιστήριο;",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Έχουμε δύο κέντρα: ένα στο Χαλάνδρι (Ρούμελης 27) και ένα στη Νέα Φιλαδέλφεια (Αγίου Γεωργίου 15)."
        }
      },
      {
        "@type": "Question",
        "name": "Προετοιμάζετε για εξετάσεις;",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ναι, προετοιμάζουμε για IELTS, TOEFL, Cambridge (Αγγλικά) και DELF, DALF (Γαλλικά)."
        }
      },
      {
        "@type": "Question",
        "name": "Έχετε online μαθήματα;",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ναι, προσφέρουμε online μαθήματα για όσους προτιμούν την εξ αποστάσεως εκπαίδευση."
        }
      }
    ]
  };
}

/**
 * Generate local business structured data
 */
export function generateLocalBusinessStructuredData(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}#business`,
    "name": "Alfa Schools",
    "alternateName": ["Alfa Schools Language Center", "Alfa Schools Φροντιστήριο", "Alfa Schools Ξένες Γλώσσες"],
    "image": `${baseUrl}/alfa-logo.png`,
    "telephone": ["+30-210-6800-708", "+30-210-2777-725"],
    "email": ["info@alfaschoolchalandri.com", "alfaschoolfiladelfeia@gmail.com"],
    "url": baseUrl,
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Ρούμελης 27",
        "addressLocality": "Χαλάνδρι",
        "addressRegion": "Αττική",
        "postalCode": "15234",
        "addressCountry": "GR"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Αγίου Γεωργίου 15",
        "addressLocality": "Νέα Φιλαδέλφεια",
        "addressRegion": "Αττική",
        "postalCode": "14342",
        "addressCountry": "GR"
      }
    ],
    "geo": [
      {
        "@type": "GeoCoordinates",
        "latitude": "38.029129737058376",
        "longitude": "23.793170706334312"
      },
      {
        "@type": "GeoCoordinates",
        "latitude": "38.050932454315465",
        "longitude": "23.745742769699632"
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "21:00"
      }
    ],
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "description": "Το καλύτερο φροντιστήριο ξένων γλωσσών στην Αθήνα! Μαθήματα Αγγλικά & Γαλλικά για όλες τις ηλικίες. Προετοιμασία για IELTS, TOEFL, Cambridge, DELF, DALF.",
    "keywords": "φροντιστήριο, αγγλικά, γαλλικά, IELTS, TOEFL, Cambridge, DELF, DALF, μαθήματα γλωσσών, Χαλάνδρι, Νέα Φιλαδέλφεια, Αθήνα",
    "areaServed": [
      {
        "@type": "City",
        "name": "Αθήνα"
      },
      {
        "@type": "City", 
        "name": "Χαλάνδρι"
      },
      {
        "@type": "City",
        "name": "Νέα Φιλαδέλφεια"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Language Courses",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "English Language Courses",
            "description": "Comprehensive English language courses for all levels"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "French Language Courses", 
            "description": "Comprehensive French language courses for all levels"
          }
        }
      ]
    }
  };
}

/**
 * Generate enhanced homepage SEO with maximum keyword coverage
 */
export function generateEnhancedHomepageSEO(baseUrl: string): SEOData {
  return {
    title: "Alfa Schools - #1 Φροντιστήρια Αθήνα | Αγγλικά & Γαλλικά",
    description: "🏆 Τα #1 φροντιστήρια ξένων γλωσσών στην Αθήνα! Μαθήματα Αγγλικά & Γαλλικά για όλες τις ηλικίες. IELTS, TOEFL, Cambridge, DELF, DALF. 35+ χρόνια εμπειρία!",
    keywords: generateUltraKeywords(),
    image: `${baseUrl}/alfa-logo.png`,
    url: baseUrl,
    type: 'website',
    canonical: baseUrl,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    viewport: 'width=device-width, initial-scale=1',
    alternate: [
      { hreflang: 'el', href: baseUrl },
      { hreflang: 'en', href: `${baseUrl}/en` },
      { hreflang: 'x-default', href: baseUrl }
    ]
  };
}

/**
 * Generate enhanced services SEO with comprehensive keyword coverage
 */
export function generateEnhancedServicesSEO(baseUrl: string): SEOData {
  return {
    title: "Υπηρεσίες - Alfa School | Μαθήματα Αγγλικά & Γαλλικά | Φροντιστήριο Ξένων Γλωσσών Αθήνα | IELTS TOEFL Cambridge DELF DALF",
    description: "🌟 Ανακαλύψτε τις υπηρεσίες μας! Μαθήματα Αγγλικά & Γαλλικά για όλες τις ηλικίες, προετοιμασία εξετάσεων IELTS, TOEFL, Cambridge, DELF, DALF, ιδιαίτερα μαθήματα, online μαθήματα. 35+ χρόνια εμπειρία, εξασφαλισμένα αποτελέσματα!",
    keywords: "υπηρεσίες φροντιστήριο, μαθήματα αγγλικά, μαθήματα γαλλικά, προετοιμασία εξετάσεων, IELTS, TOEFL, Cambridge, DELF, DALF, ιδιαίτερα μαθήματα, online μαθήματα, φροντιστήριο Αθήνα, εκπαίδευση γλωσσών, μαθήματα αγγλικά για παιδιά, μαθήματα γαλλικά για παιδιά, μαθήματα αγγλικά για εφήβους, μαθήματα γαλλικά για εφήβους, μαθήματα αγγλικά για ενήλικες, μαθήματα γαλλικά για ενήλικες, φροντιστήριο Χαλάνδρι, φροντιστήριο Νέα Φιλαδέλφεια, γλωσσικό κέντρο, εκπαιδευτικό κέντρο",
    image: `${baseUrl}/alfa-logo.png`,
    url: `${baseUrl}/services`,
    type: 'website',
    canonical: `${baseUrl}/services`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  };
}

/**
 * Generate enhanced contact SEO with local focus
 */
export function generateEnhancedContactSEO(baseUrl: string): SEOData {
  return {
    title: "Επικοινωνία - Alfa School | Χαλάνδρι & Νέα Φιλαδέλφεια | Φροντιστήριο Ξένων Γλωσσών Αθήνα | Τηλέφωνα & Email",
    description: "📞 Επικοινωνήστε μαζί μας! Alfa School - Φροντιστήριο ξένων γλωσσών σε Χαλάνδρι & Νέα Φιλαδέλφεια. Τηλέφωνα, email, διευθύνσεις. Εγγραφή για μαθήματα Αγγλικά & Γαλλικά!",
    keywords: "επικοινωνία φροντιστήριο, Alfa School Χαλάνδρι, Alfa School Νέα Φιλαδέλφεια, τηλέφωνο φροντιστήριο, email φροντιστήριο, διεύθυνση φροντιστήριο, εγγραφή μαθήματα, φροντιστήριο Αθήνα επικοινωνία, φροντιστήριο Χαλάνδρι τηλέφωνο, φροντιστήριο Νέα Φιλαδέλφεια τηλέφωνο, μαθήματα αγγλικά Χαλάνδρι, μαθήματα γαλλικά Χαλάνδρι, μαθήματα αγγλικά Νέα Φιλαδέλφεια, μαθήματα γαλλικά Νέα Φιλαδέλφεια",
    image: `${baseUrl}/alfa-logo.png`,
    url: `${baseUrl}/contact`,
    type: 'website',
    canonical: `${baseUrl}/contact`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  };
}

/**
 * Generate enhanced games SEO
 */
export function generateEnhancedGamesSEO(baseUrl: string): SEOData {
  return {
    title: "Εκπαιδευτικά Παιχνίδια - Alfa School | Αγγλικά & Γαλλικά | Διαδραστική Μάθηση | Δωρεάν Παιχνίδια Γλωσσών",
    description: "🎮 Μάθετε Αγγλικά & Γαλλικά με διαδραστικά παιχνίδια! Λεξιλόγιο, γραμματική, συνομιλία, αναγραμματισμοί. Εκπαιδευτικά παιχνίδια για όλες τις ηλικίες. Δωρεάν παιχνίδια γλωσσών!",
    keywords: "εκπαιδευτικά παιχνίδια, παιχνίδια αγγλικά, παιχνίδια γαλλικά, διαδραστική μάθηση, λεξιλόγιο, γραμματική, συνομιλία, αναγραμματισμοί, δωρεάν παιχνίδια, εκπαίδευση παιδιών, μάθηση γλωσσών, παιχνίδια για παιδιά, παιχνίδια για εφήβους, παιχνίδια για ενήλικες, online παιχνίδια αγγλικά, online παιχνίδια γαλλικά, εκπαιδευτικά παιχνίδια γλωσσών",
    image: `${baseUrl}/alfa-logo.png`,
    url: `${baseUrl}/games`,
    type: 'website',
    canonical: `${baseUrl}/games`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  };
}

/**
 * Generate enhanced about us SEO
 */
export function generateEnhancedAboutSEO(baseUrl: string): SEOData {
  return {
    title: "Σχετικά με εμάς - Alfa School | 35+ Χρόνια Εμπειρία | Φροντιστήριο Ξένων Γλωσσών Αθήνα | Χαλάνδρι & Νέα Φιλαδέλφεια",
    description: "🏫 Γνωρίστε την ιστορία μας! Από το 1986, τα Φροντιστήρια Ξένων Γλωσσών ΑΛΦΑ προσφέρουν υψηλής ποιότητας εκπαίδευση με πάθος, μεράκι και αγάπη για τους μαθητές μας. Χαλάνδρι & Νέα Φιλαδέλφεια.",
    keywords: "σχετικά με εμάς, Alfa School ιστορία, φροντιστήριο Αθήνα, φροντιστήριο Χαλάνδρι, φροντιστήριο Νέα Φιλαδέλφεια, 35 χρόνια εμπειρία, καθηγητές φροντιστήριο, εκπαιδευτικό κέντρο, γλωσσικό κέντρο, μαθήματα αγγλικά Αθήνα, μαθήματα γαλλικά Αθήνα, φροντιστήριο ξένων γλωσσών, εκπαίδευση γλωσσών, μαθησιακό κέντρο, εκπαιδευτική ποιότητα, καθηγητές αγγλικά, καθηγητές γαλλικά, TTC διπλώμα, εξεταστές Cambridge, εξεταστές DELF, εξεταστές IELTS",
    image: `${baseUrl}/alfa-logo.png`,
    url: `${baseUrl}/about-us`,
    type: 'website',
    canonical: `${baseUrl}/about-us`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  };
}

/**
 * Generate comprehensive keyword-rich structured data
 */
export function generateComprehensiveStructuredData(baseUrl: string) {
  return [
    // Educational Organization
    generateEducationalOrganizationStructuredData(baseUrl),
    
    // Local Business
    generateLocalBusinessStructuredData(baseUrl),
    
    // FAQ
    generateFAQStructuredData(),
    
    // Course Catalog
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "English Language Courses",
      "description": "Comprehensive English language courses for all levels and ages",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Alfa Schools",
        "url": baseUrl
      },
      "courseMode": ["onsite", "online"],
      "educationalLevel": ["Beginner", "Intermediate", "Advanced"],
      "inLanguage": "en",
      "availableLanguage": "Greek",
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": ["student", "parent"]
      }
    },
    
    // Service
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Language Education Services",
      "description": "Professional language education services for English and French",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Alfa Schools",
        "url": baseUrl
      },
      "serviceType": "Language Education",
      "areaServed": [
        {
          "@type": "City",
          "name": "Athens"
        },
        {
          "@type": "City",
          "name": "Chalandri"
        },
        {
          "@type": "City",
          "name": "Nea Filadelfeia"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Language Courses",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "English Language Courses"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "French Language Courses"
            }
          }
        ]
      }
    }
  ];
}
