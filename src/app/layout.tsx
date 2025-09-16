import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConditionalResponsiveNav } from "@/components/ConditionalResponsiveNav";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ChristmasThemeProvider } from "@/contexts/ChristmasThemeContext";
import { HalloweenThemeProvider } from "@/contexts/HalloweenThemeContext";
import { CarnivalThemeProvider } from "@/contexts/CarnivalThemeContext";
import { EasterThemeProvider } from "@/contexts/EasterThemeContext";
import { SummerThemeProvider } from "@/contexts/SummerThemeContext";
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
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
