import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { generateUltraKeywords } from "@/lib/keyword-generator";
import { ConditionalResponsiveNav } from "@/components/ConditionalResponsiveNav";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ChristmasThemeProvider } from "@/contexts/ChristmasThemeContext";
import { HalloweenThemeProvider } from "@/contexts/HalloweenThemeContext";
import { CarnivalThemeProvider } from "@/contexts/CarnivalThemeContext";
import { EasterThemeProvider } from "@/contexts/EasterThemeContext";
import { SummerThemeProvider } from "@/contexts/SummerThemeContext";
import { NationalHolidaysThemeProvider } from "@/contexts/NationalHolidaysThemeContext";
import { CookieConsent } from "@/components/cookie-consent";
import { ConditionalChatbot } from "@/components/ConditionalChatbot";
import { ChristmasWrapper } from "@/components/ChristmasWrapper";
import { HalloweenWrapper } from "@/components/HalloweenWrapper";
import { CarnivalWrapper } from "@/components/CarnivalWrapper";
import { EasterWrapper } from "@/components/EasterWrapper";
import { SummerWrapper } from "@/components/SummerWrapper";
import { MobileMenuProvider } from "@/contexts/MobileMenuContext";

// Pacifico font for anniversary text
const pacifico = {
  fontFamily: "Pacifico, cursive",
  fontDisplay: "swap",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Alfa Schools - #1 Φροντιστήρια Αθήνα | Αγγλικά & Γαλλικά",
    template: "%s | Alfa Schools - #1 Φροντιστήρια Ξένων Γλωσσών"
  },
  description: "🏆 Τα #1 φροντιστήρια ξένων γλωσσών στην Αθήνα! Μαθήματα Αγγλικά & Γαλλικά για όλες τις ηλικίες. IELTS, TOEFL, Cambridge, DELF, DALF. 35+ χρόνια εμπειρία!",
  keywords: generateUltraKeywords().split(', '),
  authors: [{ name: "Alfa Schools" }],
  creator: "Alfa Schools",
  publisher: "Alfa Schools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://alfaschools.gr'),
  alternates: {
    canonical: '/',
    languages: {
      'el': '/',
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'el_GR',
    url: '/',
        siteName: 'Alfa Schools',
    title: 'Alfa Schools - #1 Φροντιστήρια Αθήνα | Αγγλικά & Γαλλικά',
    description: '🏆 Τα #1 φροντιστήρια ξένων γλωσσών στην Αθήνα! Μαθήματα Αγγλικά & Γαλλικά για όλες τις ηλικίες.',
    images: [
      {
        url: '/alfa-logo.png',
        width: 1200,
        height: 630,
        alt: 'Alfa Schools - #1 Φροντιστήρια Αθήνα',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@alfaschools',
    creator: '@alfaschools',
    title: 'Alfa Schools - #1 Φροντιστήρια Αθήνα | Αγγλικά & Γαλλικά',
    description: '🏆 Τα #1 φροντιστήρια ξένων γλωσσών στην Αθήνα! Μαθήματα Αγγλικά & Γαλλικά.',
    images: ['/alfa-logo.png'],
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
  icons: {
    icon: [
      { url: '/alfa-bear.png', sizes: '16x16', type: 'image/png' },
      { url: '/alfa-bear.png', sizes: '32x32', type: 'image/png' },
      { url: '/alfa-bear.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/alfa-bear.png',
    apple: [
      { url: '/alfa-bear.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/alfa-bear.png',
        color: '#4a6fa5',
      },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#4a6fa5',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#4a6fa5',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Alfa Schools',
        'application-name': 'Alfa Schools',
    'msapplication-tooltip': 'Alfa Schools - #1 Φροντιστήρια Αθήνα',
    'msapplication-starturl': '/',
    'msapplication-navbutton-color': '#4a6fa5',
    'msapplication-TileImage': '/alfa-logo.png',
    'apple-touch-icon': '/alfa-logo.png',
    'apple-touch-icon-precomposed': '/alfa-logo.png',
    'geo.region': 'GR-ATT',
    'geo.placename': 'Athens',
    'geo.position': '38.029129737058376;23.793170706334312',
    'ICBM': '38.029129737058376, 23.793170706334312',
    'language': 'Greek',
    'content-language': 'el',
    // Iframe embedding support
    'X-Frame-Options': 'ALLOWALL',
    'Content-Security-Policy': 'frame-ancestors *;',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  } as Record<string, string>,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Paytone+One&display=swap" rel="stylesheet" />
        <link rel="icon" href="/alfa-bear.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/alfa-bear.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/alfa-bear.png?v=2" />
        <meta name="theme-color" content="#4a6fa5" />
        <meta name="msapplication-TileColor" content="#4a6fa5" />
        <meta name="msapplication-TileImage" content="/alfa-bear.png?v=2" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <MobileMenuProvider>
              <ChristmasThemeProvider>
                <HalloweenThemeProvider>
                  <CarnivalThemeProvider>
                    <EasterThemeProvider>
                      <SummerThemeProvider>
                        <NationalHolidaysThemeProvider>
                      <ChristmasWrapper>
                        <HalloweenWrapper>
                          <CarnivalWrapper>
                            <EasterWrapper>
                              <SummerWrapper>
                                <ConditionalResponsiveNav />
                                {children}
                                <ConditionalFooter />
                                <CookieConsent />
                                <ConditionalChatbot />
                              </SummerWrapper>
                            </EasterWrapper>
                          </CarnivalWrapper>
                        </HalloweenWrapper>
                      </ChristmasWrapper>
                        </NationalHolidaysThemeProvider>
                      </SummerThemeProvider>
                    </EasterThemeProvider>
                  </CarnivalThemeProvider>
                </HalloweenThemeProvider>
              </ChristmasThemeProvider>
            </MobileMenuProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
