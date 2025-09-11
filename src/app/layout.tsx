import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConditionalResponsiveNav } from "@/components/ConditionalResponsiveNav";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CookieConsent } from "@/components/cookie-consent";
import { ConditionalChatbot } from "@/components/ConditionalChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alfa School",
  description: "Alfa School - Εκπαιδευτική πλατφόρμα",
  icons: {
    icon: [
      { url: '/alfa-bear.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/alfa-bear.png',
    apple: '/alfa-bear.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <ConditionalResponsiveNav />
            {children}
            <ConditionalFooter />
            <CookieConsent />
            <ConditionalChatbot />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
