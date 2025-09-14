import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Άρθρα & Νέα | Alfa School - Εκπαιδευτικό Κέντρο',
  description: 'Διαβάστε τα τελευταία άρθρα και νέα από το Alfa School. Εκπαιδευτικά θέματα, γλωσσικές συμβουλές, και ενημερώσεις για τα μαθήματα μας.',
  keywords: 'άρθρα, νέα, εκπαίδευση, γλώσσες, αγγλικά, γαλλικά, μαθήματα, Alfa School',
  openGraph: {
    title: 'Άρθρα & Νέα | Alfa School',
    description: 'Διαβάστε τα τελευταία άρθρα και νέα από το Alfa School. Εκπαιδευτικά θέματα, γλωσσικές συμβουλές, και ενημερώσεις για τα μαθήματα μας.',
    type: 'website',
    locale: 'el_GR',
    siteName: 'Alfa School',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Άρθρα & Νέα | Alfa School',
    description: 'Διαβάστε τα τελευταία άρθρα και νέα από το Alfa School.',
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

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
