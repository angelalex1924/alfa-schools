"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { useChristmasTheme } from "@/contexts/ChristmasThemeContext"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface NotebookHeroProps {
  title?: string
  subtitle?: string
  subject?: string
  className?: string
}

export default function NotebookHero({ 
  title, 
  subtitle, 
  subject,
  className 
}: NotebookHeroProps) {
  const { isDarkMode } = useTheme()
  const { t, language } = useLanguage()
  const { isChristmasMode } = useChristmasTheme()
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  // Debug logging
  console.log('NotebookHero - isChristmasMode:', isChristmasMode)

  // Force re-render when Christmas mode changes
  useEffect(() => {
    console.log('NotebookHero - Christmas mode changed:', isChristmasMode)
  }, [isChristmasMode])

  // Detect mobile device to reduce animations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  
  // Get translated title based on current page
  const getTitle = () => {
    if (title) return title
    
    // Use pathname from Next.js router to get translated title
    if (pathname.includes('/games')) return t('notebook.titles.games')
    if (pathname.includes('/services')) return t('notebook.titles.services')
    if (pathname.includes('/why-us')) return t('notebook.titles.why_us')
    if (pathname.includes('/news')) return t('notebook.titles.news')
    if (pathname.includes('/articles')) return t('notebook.titles.news')
    if (pathname.includes('/contact')) return t('notebook.titles.contact')
    if (pathname.includes('/tags')) return '#Tags'
    
    return title || 'Page'
  }
  
  // Get translated subtitle based on current page
  const getSubtitle = () => {
    if (subtitle) return subtitle
    
    // Use pathname from Next.js router to get translated subtitle
    if (pathname.includes('/games')) return t('notebook.subtitles.games')
    if (pathname.includes('/services')) return t('notebook.subtitles.services')
    if (pathname.includes('/why-us')) return t('notebook.subtitles.why_us')
    if (pathname.includes('/news')) return t('notebook.subtitles.news')
    if (pathname.includes('/articles')) return t('notebook.subtitles.news')
    if (pathname.includes('/contact')) return t('notebook.subtitles.contact')
    
    return subtitle || ''
  }
  
  // Format date based on language but keep Greek format
  const formatDate = () => {
    const date = new Date()
    if (language === 'en') {
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }
    return date.toLocaleDateString('el-GR')
  }

  return (
    <section className={cn("relative pt-20 pb-8 sm:pt-24 sm:pb-10 lg:pt-28 lg:pb-12 overflow-hidden", className)}>
      {/* Optimized Background Elements for Mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {isMobile ? (
          // Simplified static background for mobile
          <>
            <div
              className="absolute top-20 left-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full"
              style={{ 
                backgroundColor: isChristmasMode 
                  ? (isDarkMode ? '#dc2626' : '#dc2626')
                  : (isDarkMode ? '#4a6fa5' : '#81a1d4'),
                opacity: isDarkMode ? 0.1 : 0.15,
                filter: 'blur(20px)'
              }}
            />
            <div
              className="absolute top-40 right-20 w-40 h-40 sm:w-56 sm:h-56 rounded-full"
              style={{ 
                backgroundColor: isChristmasMode 
                  ? (isDarkMode ? '#16a34a' : '#16a34a')
                  : (isDarkMode ? '#81a1d4' : '#fabeb6'),
                opacity: isDarkMode ? 0.08 : 0.12,
                filter: 'blur(20px)'
              }}
            />
          </>
        ) : (
          // Full animations for desktop
          <>
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full blur-3xl"
          style={{ 
            backgroundColor: isChristmasMode 
              ? (isDarkMode ? '#dc2626' : '#dc2626')
              : (isDarkMode ? '#4a6fa5' : '#81a1d4'),
            opacity: isDarkMode ? 0.15 : 0.2
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: isDarkMode ? [0.1, 0.12, 0.1] : [0.1, 0.15, 0.1],
            x: [0, 5, 0],
            y: [0, -2, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-40 h-40 sm:w-56 sm:h-56 rounded-full blur-3xl"
          style={{ 
            backgroundColor: isChristmasMode 
              ? (isDarkMode ? '#16a34a' : '#16a34a')
              : (isDarkMode ? '#81a1d4' : '#fabeb6'),
            opacity: isDarkMode ? 0.1 : 0.15
          }}
          animate={{
            scale: [1.05, 1, 1.05],
            opacity: isDarkMode ? [0.05, 0.08, 0.05] : [0.1, 0.12, 0.1],
            x: [0, -5, 0],
            y: [0, 5, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
          </>
        )}
      </div>

      <div key={`notebook-hero-${isChristmasMode}`} className="max-w-4xl mx-auto px-3 sm:px-6 relative z-10">
        {/* Optimized Notebook Container for Mobile */}
        {isMobile ? (
          <div key={`mobile-notebook-${isChristmasMode}`} className="max-w-3xl mx-auto relative">
            {/* Realistic Notebook Shadow */}
            <div 
              className="absolute inset-0 transform rotate-1"
              style={{
                backgroundColor: isDarkMode ? '#0a0a1a' : '#d1d5db',
                top: '8px',
                left: '8px'
              }}
            />
            <div 
              className="absolute inset-0 transform rotate-0.5"
              style={{
                backgroundColor: isDarkMode ? '#0f0f23' : '#e5e7eb',
                top: '4px',
                left: '4px'
              }}
            />
            
            {/* Realistic Notebook with Paper Texture */}
            <div
              key={`mobile-notebook-container-${isChristmasMode}`}
              className="relative shadow-2xl overflow-hidden"
              style={{
                backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
                border: 'none',
                borderRadius: '0',
                boxShadow: isDarkMode 
                  ? '0 25px 50px -12px rgba(74, 111, 165, 0.3), 0 0 0 1px rgba(74, 111, 165, 0.1)' 
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                backgroundImage: isDarkMode 
                  ? 'none' 
                  : 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.02) 50%, transparent 100%), linear-gradient(0deg, transparent 0%, rgba(0,0,0,0.01) 50%, transparent 100%)'
              }}
            >
              {/* Realistic Notebook Cover */}
              <div 
                className="relative px-3 sm:px-6 py-3 sm:py-5"
                style={{ 
                  backgroundColor: isChristmasMode ? '#dc2626' : '#4a6fa5',
                  borderBottom: isChristmasMode ? '3px solid #16a34a' : '3px solid #81a1d4',
                  backgroundImage: isChristmasMode 
                    ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #dc2626 100%)'
                    : 'linear-gradient(135deg, #4a6fa5 0%, #5a7fb5 50%, #4a6fa5 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                {/* Simple Spiral Binding */}
                <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col items-center justify-start pt-8">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 h-1 rounded-full mb-2"
                      style={{ 
                        backgroundColor: isDarkMode ? '#fabeb6' : '#ffffff',
                        border: '1px solid #e5e5e5'
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center ml-8">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                      <Image
                        src="/alfa-logo.png"
                        alt="Alfa School Logo"
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Notebook Paper Content */}
              <div 
                className="relative p-4 sm:p-6"
                style={{ 
                  backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
                  backgroundImage: isDarkMode 
                    ? 'none' 
                    : 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.02) 50%, transparent 100%), linear-gradient(0deg, transparent 0%, rgba(0,0,0,0.01) 50%, transparent 100%)',
                  minHeight: '200px'
                }}
              >
                {/* Simple Red Margin Line */}
                <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col">
                  <div
                    className="w-full h-px mt-16"
                    style={{ backgroundColor: '#dc2626', opacity: 0.8 }}
                  />
                </div>

                {/* Content with proper notebook spacing */}
                <div className="relative ml-8">
                  {/* Title with Handwriting Style */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg flex-shrink-0" 
                        style={{ 
                          backgroundColor: isChristmasMode ? '#fbbf24' : '#fabeb6',
                          minWidth: '24px',
                          minHeight: '24px',
                          aspectRatio: '1/1'
                        }}
                      >
                        <span className="text-white font-bold text-sm leading-none">
                          {isChristmasMode ? '🎄' : '★'}
                        </span>
                      </div>
                      <h1 
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight"
                        style={{ 
                          color: isDarkMode ? '#ffffff' : '#1f2937',
                          fontFamily: 'StampatelloFaceto, cursive'
                        }}
                      >
                        {getTitle()}
                      </h1>
                    </div>
                  </div>

                  {/* Subtitle with Handwriting Style */}
                  {getSubtitle() && (
                    <div className="mb-6 sm:mb-8">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg mt-1 flex-shrink-0" 
                          style={{ 
                            backgroundColor: isChristmasMode 
                              ? (isDarkMode ? '#16a34a' : '#16a34a')
                              : (isDarkMode ? '#fabeb6' : '#81a1d4'),
                            minWidth: '24px',
                            minHeight: '24px',
                            aspectRatio: '1/1'
                          }}
                        >
                          <span className="text-white font-bold text-sm leading-none">
                            {isChristmasMode ? '🎁' : '✓'}
                          </span>
                        </div>
                        <p 
                          className="text-base sm:text-lg leading-relaxed font-medium"
                          style={{ 
                            color: isDarkMode ? '#d1d5db' : '#4b5563',
                            fontFamily: 'StampatelloFaceto, cursive'
                          }}
                        >
                          {getSubtitle()}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Static Notebook Lines for Mobile */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full h-px"
                        style={{ 
                          backgroundColor: isDarkMode ? '#fabeb6' : '#d1d5db',
                          top: `${80 + i * 25}px`,
                          opacity: i % 2 === 0 ? 0.6 : 0.2,
                          width: '95%',
                          left: '2.5%'
                        }}
                      />
                    ))}
                  </div>

                  {/* Static Decorative Element for Mobile */}
                  <div
                    className="absolute top-20 right-6 w-8 h-8 opacity-20"
                    style={{ color: isDarkMode ? '#fabeb6' : '#4a6fa5' }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path d="M50,15 L55,35 L75,35 L60,50 L65,70 L50,55 L35,70 L40,50 L25,35 L45,35 Z" fill="currentColor" opacity="0.4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
        <motion.div
          key={`desktop-notebook-${isChristmasMode}`}
          className="max-w-3xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Realistic Notebook Shadow */}
          <div 
            className="absolute inset-0 transform rotate-1"
            style={{
              backgroundColor: isDarkMode ? '#0a0a1a' : '#d1d5db',
              top: '8px',
              left: '8px'
            }}
          />
          <div 
            className="absolute inset-0 transform rotate-0.5"
            style={{
              backgroundColor: isDarkMode ? '#0f0f23' : '#e5e7eb',
              top: '4px',
              left: '4px'
            }}
          />
          
            {/* Realistic Notebook with Paper Texture */}
          <div
            key={`notebook-container-${isChristmasMode}`}
            className="relative shadow-2xl overflow-hidden"
            style={{
              backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
              border: 'none',
              borderRadius: '0',
              boxShadow: isDarkMode 
                ? '0 25px 50px -12px rgba(74, 111, 165, 0.3), 0 0 0 1px rgba(74, 111, 165, 0.1)' 
                : '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              backgroundImage: isDarkMode 
                ? 'none' 
                : 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.02) 50%, transparent 100%), linear-gradient(0deg, transparent 0%, rgba(0,0,0,0.01) 50%, transparent 100%)'
            }}
          >
            {/* Realistic Notebook Cover */}
            <div 
              className="relative px-3 sm:px-6 py-3 sm:py-5"
              style={{ 
                backgroundColor: isChristmasMode ? '#dc2626' : '#4a6fa5',
                borderBottom: isChristmasMode ? '3px solid #16a34a' : '3px solid #81a1d4',
                backgroundImage: isChristmasMode 
                  ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #dc2626 100%)'
                  : 'linear-gradient(135deg, #4a6fa5 0%, #5a7fb5 50%, #4a6fa5 100%)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              {/* Simple Spiral Binding */}
              <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col items-center justify-start pt-8">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1 h-1 rounded-full mb-2"
                    style={{ 
                      backgroundColor: isDarkMode ? '#fabeb6' : '#ffffff',
                      border: '1px solid #e5e5e5'
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center ml-8">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <Image
                      src="/alfa-logo.png"
                      alt="Alfa School Logo"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notebook Paper Content */}
            <div 
              className="relative p-4 sm:p-6"
              style={{ 
                backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
                backgroundImage: isDarkMode 
                  ? 'none' 
                  : 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.02) 50%, transparent 100%), linear-gradient(0deg, transparent 0%, rgba(0,0,0,0.01) 50%, transparent 100%)',
                minHeight: '200px'
              }}
            >
              {/* Simple Red Margin Line */}
              <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col">
                <div
                  className="w-full h-px mt-16"
                  style={{ 
                    backgroundColor: isChristmasMode ? '#16a34a' : '#dc2626', 
                    opacity: 0.8 
                  }}
                />
              </div>

              {/* Content with proper notebook spacing */}
              <div className="relative ml-8">
                {/* Title with Handwriting Style */}
                <motion.div
                  className="mb-6 sm:mb-8"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg flex-shrink-0" 
                      style={{ 
                        backgroundColor: isChristmasMode ? '#fbbf24' : '#fabeb6',
                        minWidth: '24px',
                        minHeight: '24px',
                        aspectRatio: '1/1'
                      }}
                    >
                      <span className="text-white font-bold text-sm leading-none">
                        {isChristmasMode ? '🎄' : '★'}
                      </span>
                    </div>
                    <h1 
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight"
                      style={{ 
                        color: isDarkMode ? '#ffffff' : '#1f2937',
                        fontFamily: 'StampatelloFaceto, cursive'
                      }}
                    >
                      {getTitle()}
                    </h1>
                  </div>
                </motion.div>

                {/* Subtitle with Handwriting Style */}
                {getSubtitle() && (
                  <motion.div
                    className="mb-6 sm:mb-8"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg mt-1 flex-shrink-0" 
                        style={{ 
                          backgroundColor: isChristmasMode 
                            ? (isDarkMode ? '#16a34a' : '#16a34a')
                            : (isDarkMode ? '#fabeb6' : '#81a1d4'),
                          minWidth: '24px',
                          minHeight: '24px',
                          aspectRatio: '1/1'
                        }}
                      >
                        <span className="text-white font-bold text-sm leading-none">
                          {isChristmasMode ? '🎁' : '✓'}
                        </span>
                      </div>
                      <p 
                        className="text-base sm:text-lg leading-relaxed font-medium"
                        style={{ 
                          color: isDarkMode ? '#d1d5db' : '#4b5563',
                          fontFamily: 'StampatelloFaceto, cursive'
                        }}
                      >
                        {getSubtitle()}
                      </p>
                    </div>
                  </motion.div>
                )}

                  {/* Animated Notebook Lines for Desktop */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-full h-px"
                      style={{ 
                        backgroundColor: isChristmasMode 
                          ? (isDarkMode ? '#16a34a' : '#16a34a')
                          : (isDarkMode ? '#fabeb6' : '#d1d5db'),
                        top: `${80 + i * 25}px`,
                        opacity: i % 2 === 0 ? 0.6 : 0.2,
                        width: '95%',
                        left: '2.5%'
                      }}
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ 
                        opacity: i % 2 === 0 ? 0.6 : 0.2, 
                        scaleX: 1 
                      }}
                      transition={{ duration: 0.2, delay: 0.3 + i * 0.03 }}
                    />
                  ))}
                </div>

                  {/* Animated Decorative Element for Desktop */}
                <motion.div
                  className="absolute top-20 right-6 w-8 h-8 opacity-20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: isDarkMode ? '#fabeb6' : '#4a6fa5' }}>
                    <path d="M50,15 L55,35 L75,35 L60,50 L65,70 L50,55 L35,70 L40,50 L25,35 L45,35 Z" fill="currentColor" opacity="0.4" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        )}
      </div>
    </section>
  )
}