"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { usePathname } from "next/navigation"

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
  const pathname = usePathname()
  
  // Get translated subject based on current page or default
  const getSubject = () => {
    if (subject) return subject
    
    // Use pathname from Next.js router instead of window.location
    if (pathname.includes('/games')) return t('notebook.subject_games')
    if (pathname.includes('/services')) return t('notebook.subject_services')
    if (pathname.includes('/why-us')) return t('notebook.subject_why_us')
    if (pathname.includes('/news')) return t('notebook.subject_news')
    if (pathname.includes('/contact')) return t('notebook.subject_contact')
    
    return t('notebook.subject')
  }
  
  // Get translated title based on current page
  const getTitle = () => {
    if (title) return title
    
    // Use pathname from Next.js router to get translated title
    if (pathname.includes('/games')) return t('notebook.titles.games')
    if (pathname.includes('/services')) return t('notebook.titles.services')
    if (pathname.includes('/why-us')) return t('notebook.titles.why_us')
    if (pathname.includes('/news')) return t('notebook.titles.news')
    if (pathname.includes('/contact')) return t('notebook.titles.contact')
    
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
    <section className={cn("relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden", className)}>
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full blur-3xl"
          style={{ 
            backgroundColor: isDarkMode ? '#4a6fa5' : '#81a1d4',
            opacity: isDarkMode ? 0.15 : 0.2
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: isDarkMode ? [0.1, 0.15, 0.1] : [0.1, 0.2, 0.1],
            x: [0, 10, 0],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-40 h-40 sm:w-56 sm:h-56 rounded-full blur-3xl"
          style={{ 
            backgroundColor: isDarkMode ? '#81a1d4' : '#fabeb6',
            opacity: isDarkMode ? 0.1 : 0.15
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: isDarkMode ? [0.05, 0.1, 0.05] : [0.1, 0.15, 0.1],
            x: [0, -10, 0],
            y: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 relative z-10">
        {/* Ultra Realistic Notebook Container */}
        <motion.div
          className="max-w-4xl mx-auto relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
              className="relative px-4 sm:px-8 py-4 sm:py-6"
              style={{ 
                backgroundColor: '#4a6fa5',
                borderBottom: '2px solid #81a1d4',
                backgroundImage: 'linear-gradient(135deg, #4a6fa5 0%, #5a7fb5 50%, #4a6fa5 100%)'
              }}
            >
              {/* Realistic Spiral Binding */}
              <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 flex flex-col items-center justify-start pt-12 sm:pt-16">
                {[...Array(15)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="relative w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mb-2 sm:mb-2.5"
                    style={{ 
                      backgroundColor: isDarkMode ? '#fabeb6' : '#ffffff',
                      border: isDarkMode ? '1px solid #e0a896' : '1px solid #e5e5e5',
                      boxShadow: isDarkMode 
                        ? 'inset 0 1px 2px rgba(0,0,0,0.2), 0 1px 1px rgba(255,255,255,0.1)' 
                        : 'inset 0 1px 2px rgba(0,0,0,0.1), 0 1px 1px rgba(255,255,255,0.3)'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.9, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                  />
                ))}
              </div>
              
              {/* Spiral Wire Connections */}
              <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 flex flex-col items-center justify-start pt-12 sm:pt-16">
                {[...Array(14)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="absolute w-0.5 h-4 sm:h-6 rounded-full"
                    style={{ 
                      backgroundColor: isDarkMode ? '#fabeb6' : '#d1d5db',
                      top: `${48 + i * 16}px`,
                      left: '3px',
                      opacity: 0.4
                    }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 0.4, scaleY: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 * i + 0.5 }}
                  />
                ))}
              </div>

              <div className="flex items-center ml-6 sm:ml-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <motion.div 
                    className="relative w-12 h-12 sm:w-16 sm:h-16"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src="/alfa-logo.png"
                      alt="Alfa School Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: '#fabeb6' }}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-white">{t('notebook.schoolName')}</h3>
                    <p className="text-xs sm:text-sm font-medium" style={{ color: '#fabeb6' }}>{getSubject()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notebook Paper Content */}
            <div 
              className="relative p-4 sm:p-8"
              style={{ 
                backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
                backgroundImage: isDarkMode 
                  ? 'none' 
                  : 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.02) 50%, transparent 100%), linear-gradient(0deg, transparent 0%, rgba(0,0,0,0.01) 50%, transparent 100%)'
              }}
            >
              {/* Realistic Red Margin Line */}
              <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 flex flex-col">
                {/* Main red margin line */}
                <motion.div
                  className="w-full h-px mt-16 sm:mt-20"
                  style={{ backgroundColor: '#dc2626' }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 0.8, scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                {/* Additional margin lines */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-full h-px mt-6 sm:mt-8"
                    style={{ backgroundColor: '#fca5a5', opacity: 0.4 }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 0.4, scaleX: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  />
                ))}
              </div>

              {/* Content with proper notebook spacing */}
              <div className="relative ml-8 sm:ml-12">
                {/* Title with Handwriting Style */}
                <motion.div
                  className="mb-6 sm:mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <motion.div 
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg" 
                      style={{ backgroundColor: '#fabeb6' }}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-white font-bold text-sm sm:text-lg">★</span>
                    </motion.div>
                    <h1 
                      className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold"
                      style={{ 
                        color: isDarkMode ? '#ffffff' : '#1f2937',
                        fontFamily: 'Georgia, serif'
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
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <motion.div 
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg mt-1" 
                        style={{ backgroundColor: isDarkMode ? '#fabeb6' : '#81a1d4' }}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-white font-bold text-sm sm:text-lg">✓</span>
                      </motion.div>
                      <p 
                        className="text-base sm:text-lg lg:text-xl leading-relaxed font-medium"
                        style={{ 
                          color: isDarkMode ? '#d1d5db' : '#4b5563',
                          fontFamily: 'Georgia, serif'
                        }}
                      >
                        {getSubtitle()}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Realistic Notebook Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-full h-px"
                      style={{ 
                        backgroundColor: isDarkMode ? '#fabeb6' : '#d1d5db',
                        top: `${80 + i * 26}px`,
                        opacity: i % 5 === 0 ? 0.8 : 0.3, // Every 5th line is darker
                        width: i % 5 === 0 ? '100%' : '95%', // Every 5th line is full width
                        left: i % 5 === 0 ? '0' : '2.5%'
                      }}
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ 
                        opacity: i % 5 === 0 ? 0.8 : 0.3, 
                        scaleX: 1 
                      }}
                      transition={{ duration: 0.3, delay: 0.6 + i * 0.015 }}
                    />
                  ))}
                </div>

                {/* Hand-drawn Style Decorations */}
                <motion.div
                  className="absolute top-20 right-8 w-20 h-20 opacity-20"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 0.2, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: isDarkMode ? '#fabeb6' : '#4a6fa5' }}>
                    <path d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,2" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,1" />
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute bottom-8 left-8 w-16 h-16 opacity-20"
                  initial={{ opacity: 0, scale: 0, rotate: 180 }}
                  animate={{ opacity: 0.2, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: isDarkMode ? '#81a1d4' : '#fabeb6' }}>
                    <path d="M25,25 L75,25 L75,75 L25,75 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,3" />
                    <path d="M35,35 L65,35 L65,65 L35,65 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,2" />
                    <path d="M45,45 L55,45 L55,55 L45,55 Z" fill="currentColor" opacity="0.2" />
                  </svg>
                </motion.div>

                {/* Hand-drawn Stars */}
                <motion.div
                  className="absolute top-40 right-20 w-8 h-8 opacity-30"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: isDarkMode ? '#fabeb6' : '#81a1d4' }}>
                    <path d="M50,15 L55,35 L75,35 L60,50 L65,70 L50,55 L35,70 L40,50 L25,35 L45,35 Z" fill="currentColor" opacity="0.4" />
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute bottom-24 right-16 w-6 h-6 opacity-30"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: isDarkMode ? '#81a1d4' : '#fabeb6' }}>
                    <path d="M50,15 L55,35 L75,35 L60,50 L65,70 L50,55 L35,70 L40,50 L25,35 L45,35 Z" fill="currentColor" opacity="0.5" />
                  </svg>
                </motion.div>

                {/* Hand-drawn Hearts */}
                <motion.div
                  className="absolute top-60 right-12 w-6 h-6 opacity-25"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.25, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: isDarkMode ? '#fabeb6' : '#f78da7' }}>
                    <path d="M50,85 C50,85 20,55 20,35 C20,25 30,15 40,15 C45,15 50,20 50,20 C50,20 55,15 60,15 C70,15 80,25 80,35 C80,55 50,85 50,85 Z" fill="currentColor" opacity="0.3" />
                  </svg>
                </motion.div>

                {/* Additional Hand-drawn Elements */}
                <motion.div
                  className="absolute top-80 right-24 w-4 h-4 opacity-20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: isDarkMode ? '#81a1d4' : '#fabeb6' }}>
                    <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2,1" />
                    <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.2" />
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute bottom-32 left-16 w-5 h-5 opacity-25"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.25, scale: 1 }}
                  transition={{ duration: 0.6, delay: 2.0 }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full" style={{ color: isDarkMode ? '#fabeb6' : '#81a1d4' }}>
                    <path d="M50,10 L60,40 L90,40 L70,60 L80,90 L50,70 L20,90 L30,60 L10,40 L40,40 Z" fill="currentColor" opacity="0.3" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
