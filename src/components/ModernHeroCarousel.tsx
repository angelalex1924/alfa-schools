"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, GraduationCap, BookOpen, Award, Users, Star, Globe, Pencil, Ruler, Calculator, PenTool, BookMarked, School } from "lucide-react"
import SplitText from "./SplitText"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { useChristmasTheme } from "@/contexts/ChristmasThemeContext"
import { useHalloweenTheme } from "@/contexts/HalloweenThemeContext"
import { useCarnivalTheme } from "@/contexts/CarnivalThemeContext"
import { useEasterTheme } from "@/contexts/EasterThemeContext"
import { useSummerTheme } from "@/contexts/SummerThemeContext"
import { SantaIcon, ChristmasTreeIcon, ReindeerIcon, GiftBoxIcon, BellIcon } from "./ChristmasIcons"
import { motion, AnimatePresence } from "framer-motion"

interface CarouselSlide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  accentColor: string
  gradient: string
}

// Helper function to safely get string from translation
const getString = (value: string | string[]): string => {
  return Array.isArray(value) ? value.join(' ') : value
}

// Helper function to get carousel data based on language
const getCarouselData = (t: (key: string) => string | string[]): CarouselSlide[] => [
  {
    id: 1,
    title: getString(t('carousel.slide1.title')),
    subtitle: getString(t('carousel.slide1.subtitle')),
    description: getString(t('carousel.slide1.description')),
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&crop=center",
    ctaText: getString(t('carousel.slide1.ctaText')),
    ctaLink: "/services",
    accentColor: "#4a6fa5",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: getString(t('carousel.slide2.title')),
    subtitle: getString(t('carousel.slide2.subtitle')),
    description: getString(t('carousel.slide2.description')),
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=800&fit=crop&crop=center",
    ctaText: getString(t('carousel.slide2.ctaText')),
    ctaLink: "/services",
    accentColor: "#81a1d4",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    title: getString(t('carousel.slide3.title')),
    subtitle: getString(t('carousel.slide3.subtitle')),
    description: getString(t('carousel.slide3.description')),
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&crop=center",
    ctaText: getString(t('carousel.slide3.ctaText')),
    ctaLink: "/services",
    accentColor: "#c9b6e4",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 4,
    title: getString(t('carousel.slide4.title')),
    subtitle: getString(t('carousel.slide4.subtitle')),
    description: getString(t('carousel.slide4.description')),
    image: "https://static01.nyt.com/images/2024/07/12/books/review/1221stCentury-Day5/1221stCentury-Day5-facebookJumbo.jpg",
    ctaText: getString(t('carousel.slide4.ctaText')),
    ctaLink: "/services",
    accentColor: "#fabeb6",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
  },
  {
    id: 5,
    title: getString(t('carousel.slide5.title')),
    subtitle: getString(t('carousel.slide5.subtitle')),
    description: getString(t('carousel.slide5.description')),
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=800&fit=crop&crop=center",
    ctaText: getString(t('carousel.slide5.ctaText')),
    ctaLink: "/services",
    accentColor: "#f78da7",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  }
]

// Beautiful school-themed floating elements
const getSchoolElements = (isChristmasMode: boolean) => [
  { Icon: isChristmasMode ? SantaIcon : BookOpen, delay: 0, position: { top: '12%', left: '8%' }, type: 'notebook', size: 'w-6 h-6' },
  { Icon: isChristmasMode ? ChristmasTreeIcon : GraduationCap, delay: 1, position: { top: '68%', right: '12%' }, type: 'badge', size: 'w-7 h-7' },
  { Icon: isChristmasMode ? ReindeerIcon : Pencil, delay: 2, position: { top: '25%', left: '5%' }, type: 'pencil', size: 'w-5 h-5' },
  { Icon: isChristmasMode ? GiftBoxIcon : Ruler, delay: 3, position: { top: '45%', right: '8%' }, type: 'ruler', size: 'w-6 h-6' },
  { Icon: isChristmasMode ? BellIcon : Calculator, delay: 4, position: { top: '75%', left: '10%' }, type: 'calculator', size: 'w-5 h-5' },
  { Icon: PenTool, delay: 5, position: { top: '35%', right: '15%' }, type: 'pen', size: 'w-5 h-5' },
  { Icon: BookMarked, delay: 6, position: { top: '55%', left: '3%' }, type: 'bookmark', size: 'w-4 h-4' },
  { Icon: School, delay: 7, position: { top: '15%', right: '5%' }, type: 'school', size: 'w-6 h-6' }
]

export default function ModernHeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  const { isChristmasMode } = useChristmasTheme()
  const { isHalloweenMode } = useHalloweenTheme()
  const { isCarnivalMode } = useCarnivalTheme()
  const { isEasterMode } = useEasterTheme()
  const { isSummerMode } = useSummerTheme()
  
  const carouselData = getCarouselData(t)
  const schoolElements = getSchoolElements(isChristmasMode)

  // Theme-based styling functions
  const getThemeColors = () => {
    if (isChristmasMode) {
      return {
        primary: '#dc2626', // Red
        secondary: '#16a34a', // Green
        accent: '#fbbf24', // Gold
        gradient: 'linear-gradient(135deg, #dc2626 0%, #16a34a 100%)',
        buttonGradient: '#5e0d0c', // Christmas button color
        sparkle1: '#fbbf24', // Gold
        sparkle2: '#dc2626', // Red
        corner: '#16a34a' // Green
      }
    } else if (isHalloweenMode) {
      return {
        primary: '#ea580c', // Orange
        secondary: '#7c2d12', // Dark orange
        accent: '#fbbf24', // Gold
        gradient: 'linear-gradient(135deg, #ea580c 0%, #7c2d12 100%)',
        buttonGradient: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
        sparkle1: '#fbbf24', // Gold
        sparkle2: '#ea580c', // Orange
        corner: '#7c2d12' // Dark orange
      }
    } else if (isCarnivalMode) {
      return {
        primary: '#7c3aed', // Purple
        secondary: '#ec4899', // Pink
        accent: '#fbbf24', // Gold
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
        buttonGradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
        sparkle1: '#fbbf24', // Gold
        sparkle2: '#ec4899', // Pink
        corner: '#7c3aed' // Purple
      }
    } else if (isEasterMode) {
      return {
        primary: '#ec4899', // Pink
        secondary: '#22c55e', // Green
        accent: '#fbbf24', // Gold
        gradient: 'linear-gradient(135deg, #ec4899 0%, #22c55e 100%)',
        buttonGradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
        sparkle1: '#fbbf24', // Gold
        sparkle2: '#22c55e', // Green
        corner: '#ec4899' // Pink
      }
    } else if (isSummerMode) {
      return {
        primary: '#f59e0b', // Amber
        secondary: '#06b6d4', // Cyan
        accent: '#fbbf24', // Gold
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #06b6d4 100%)',
        buttonGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        sparkle1: '#fbbf24', // Gold
        sparkle2: '#06b6d4', // Cyan
        corner: '#f59e0b' // Amber
      }
    } else {
      return {
        primary: '#2563eb', // Blue
        secondary: '#1d4ed8', // Dark blue
        accent: '#fbbf24', // Gold
        gradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        buttonGradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        sparkle1: '#fbbf24', // Gold
        sparkle2: '#2563eb', // Blue
        corner: '#2563eb' // Blue
      }
    }
  }

  const getThemeIcon = () => {
    if (isChristmasMode) return '🎄'
    if (isHalloweenMode) return '🎃'
    if (isCarnivalMode) return '🎭'
    if (isEasterMode) return '🐰'
    if (isSummerMode) return '☀️'
    return '⭐'
  }

  const themeColors = getThemeColors()
  const themeIcon = getThemeIcon()

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isHovered) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, isHovered])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % carouselData.length)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const currentData = carouselData[currentSlide]

  return (
    <div 
      className={`relative min-h-screen overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50/40 via-blue-100/30 to-indigo-50/40'
      }`}
      style={{ fontFamily: 'StampatelloFaceto, cursive' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Notebook Paper Background with Photo Overlay */}
      <div className="absolute inset-0">
        {/* Main paper background */}
        <div 
          className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : ''}`}
          style={{ backgroundColor: isDarkMode ? undefined : `${themeColors.primary}10` }}
        ></div>
        
        {/* Photo background overlay */}
          <div
            key={`bg-${currentSlide}`}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out opacity-30"
            style={{
              backgroundImage: `url(${currentData.image})`,
            filter: "brightness(0.8) contrast(1.1) saturate(1.2)"
          }}
        />
        
        {/* Notebook lines */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`line-${i}`}
            className={`absolute w-full h-px ${
              isDarkMode ? 'bg-gray-600/40' : ''
            }`}
            style={{
              backgroundColor: isDarkMode ? undefined : `${themeColors.primary}30`,
              top: `${8 + i * 4.5}%`,
              left: '8%',
              right: '8%'
            }}
          />
        ))}
        
        {/* Red margin line */}
        <div 
          className={`absolute left-8 top-0 bottom-0 w-px ${
            isDarkMode ? 'bg-red-400' : ''
          }`}
          style={{ backgroundColor: isDarkMode ? undefined : themeColors.primary }}
        ></div>
        
        {/* Holes for binder */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`hole-${i}`}
            className={`absolute w-2 h-2 rounded-full border ${
              isDarkMode 
                ? 'bg-gray-600 border-gray-500' 
                : 'bg-blue-200 border-blue-300'
            }`}
            style={{
              left: '6px',
              top: `${20 + i * 30}%`
            }}
          />
        ))}
      </div>

      {/* Simple School Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Simple School Elements */}
        <div className="absolute top-20 right-4 opacity-20">
          <BookOpen 
            className="w-6 h-6" 
            style={{ color: themeColors.primary }}
          />
        </div>
        <div className="absolute bottom-20 left-4 opacity-20">
          <Pencil 
            className="w-5 h-5" 
            style={{ color: themeColors.secondary }}
          />
        </div>
        <div className="absolute top-1/2 right-8 opacity-20">
          <Ruler 
            className="w-5 h-5" 
            style={{ color: themeColors.accent }}
          />
        </div>
        <div className="absolute top-32 left-8 opacity-15">
          <Calculator 
            className="w-4 h-4" 
            style={{ color: themeColors.primary }}
          />
        </div>
        <div className="absolute bottom-32 right-12 opacity-15">
          <PenTool 
            className="w-4 h-4" 
            style={{ color: themeColors.secondary }}
          />
        </div>
        <div className="absolute top-1/3 left-12 opacity-15">
          <BookMarked 
            className="w-4 h-4" 
            style={{ color: themeColors.accent }}
          />
        </div>
        
        {/* Theme Emojis */}
        {isChristmasMode && (
          <>
            <div className="absolute top-16 left-8 text-2xl opacity-30">🎄</div>
            <div className="absolute top-24 right-12 text-xl opacity-25">🎁</div>
            <div className="absolute bottom-24 left-12 text-xl opacity-20">❄️</div>
            <div className="absolute bottom-16 right-8 text-2xl opacity-30">⭐</div>
            <div className="absolute top-40 left-16 text-lg opacity-15">🎅</div>
            <div className="absolute bottom-40 right-16 text-lg opacity-15">🦌</div>
            <div className="absolute top-1/2 left-4 text-lg opacity-20">🔔</div>
            <div className="absolute top-1/2 right-4 text-lg opacity-20">⛄</div>
          </>
        )}
        
        {isHalloweenMode && (
          <>
            <div className="absolute top-16 left-8 text-2xl opacity-30">🎃</div>
            <div className="absolute top-24 right-12 text-xl opacity-25">👻</div>
            <div className="absolute bottom-24 left-12 text-xl opacity-20">🦇</div>
            <div className="absolute bottom-16 right-8 text-2xl opacity-30">🕷️</div>
            <div className="absolute top-40 left-16 text-lg opacity-15">💀</div>
            <div className="absolute bottom-40 right-16 text-lg opacity-15">🕸️</div>
            <div className="absolute top-1/2 left-4 text-lg opacity-20">🎭</div>
            <div className="absolute top-1/2 right-4 text-lg opacity-20">⚰️</div>
          </>
        )}
        
        {isEasterMode && (
          <>
            <div className="absolute top-16 left-8 text-2xl opacity-30">🐰</div>
            <div className="absolute top-24 right-12 text-xl opacity-25">🥚</div>
            <div className="absolute bottom-24 left-12 text-xl opacity-20">🌸</div>
            <div className="absolute bottom-16 right-8 text-2xl opacity-30">🦋</div>
            <div className="absolute top-40 left-16 text-lg opacity-15">🌷</div>
            <div className="absolute bottom-40 right-16 text-lg opacity-15">🐣</div>
            <div className="absolute top-1/2 left-4 text-lg opacity-20">🌱</div>
            <div className="absolute top-1/2 right-4 text-lg opacity-20">🌺</div>
          </>
        )}
        
        {isCarnivalMode && (
          <>
            <div className="absolute top-16 left-8 text-2xl opacity-30">🎭</div>
            <div className="absolute top-24 right-12 text-xl opacity-25">🎪</div>
            <div className="absolute bottom-24 left-12 text-xl opacity-20">🎈</div>
            <div className="absolute bottom-16 right-8 text-2xl opacity-30">🎊</div>
            <div className="absolute top-40 left-16 text-lg opacity-15">🎉</div>
            <div className="absolute bottom-40 right-16 text-lg opacity-15">🎨</div>
            <div className="absolute top-1/2 left-4 text-lg opacity-20">🎵</div>
            <div className="absolute top-1/2 right-4 text-lg opacity-20">🎸</div>
          </>
        )}
        
        {isSummerMode && (
          <>
            <div className="absolute top-16 left-8 text-2xl opacity-30">☀️</div>
            <div className="absolute top-24 right-12 text-xl opacity-25">🏖️</div>
            <div className="absolute bottom-24 left-12 text-xl opacity-20">🌊</div>
            <div className="absolute bottom-16 right-8 text-2xl opacity-30">🌴</div>
            <div className="absolute top-40 left-16 text-lg opacity-15">🏄‍♂️</div>
            <div className="absolute bottom-40 right-16 text-lg opacity-15">🦀</div>
            <div className="absolute top-1/2 left-4 text-lg opacity-20">🐚</div>
            <div className="absolute top-1/2 right-4 text-lg opacity-20">🌺</div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-[80vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-16 pt-24 sm:pt-12 sm:py-20 pb-12">
        <div className="max-w-6xl lg:max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            
            {/* Left Side - Content */}
            <div className="text-center lg:text-left space-y-8 sm:space-y-10">
              
              {/* School Logo with Since 1986 */}
              <div className="flex justify-center lg:justify-start">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <img
                      src="/alfa-logo.png"
                      alt="Alfa School Logo"
                      className="w-40 h-40 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Decorative sparkles */}
                    <div 
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: themeColors.sparkle1 }}
                    ></div>
                    <div 
                      className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: themeColors.sparkle2 }}
                    ></div>
                  </div>
                  
                  {/* Since 1986 Badge - School Style */}
                  <div className="relative group mt-4 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                    <div 
                      className="bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl rounded-xl px-4 py-3 border-2 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                      style={{ borderColor: isDarkMode ? undefined : `${themeColors.primary}50` }}
                    >
                      {/* Paper texture */}
                      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
                        <div className="w-full h-full" style={{
                          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                          backgroundSize: '12px 12px'
                        }}></div>
                      </div>
                      
                      <div className="text-center relative z-10">
                        <div className="text-sm font-bold text-gray-700 dark:text-gray-300" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                          {t('carousel.badge.since1986') || 'Since 1986'}
                        </div>
                      </div>
                      
                      {/* Corner decoration */}
                      <div 
                        className="absolute top-1 left-1 w-2 h-2 border-t border-l rounded-tl"
                        style={{ borderColor: isDarkMode ? undefined : `${themeColors.primary}60` }}
                      ></div>
                    </div>
                    
                  {/* Grade Badge - OUTSIDE the badge */}
                  <div 
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-lg border border-white/50"
                    style={{ background: themeColors.gradient }}
                  >
                    <span className="text-white text-xs font-bold" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {themeIcon}
                    </span>
                  </div>
                  </div>
                </div>
              </div>


              {/* Enhanced Title */}
              <div className="text-center lg:text-left space-y-6">
                <AnimatePresence mode="wait">
                  <motion.h1 
                    key={`title-${currentSlide}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`text-4xl lg:text-6xl font-bold leading-tight transition-all duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}
                    style={{
                      textShadow: isDarkMode 
                        ? '0 2px 8px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)' 
                        : 'none',
                      filter: isDarkMode ? 'contrast(1.1) brightness(1.05)' : 'none'
                    }}
                  >
                    {currentData.title}
                  </motion.h1>
                </AnimatePresence>
                
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={`subtitle-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className={`text-xl lg:text-2xl font-medium transition-all duration-500 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                    style={{
                      textShadow: isDarkMode 
                        ? '0 1px 4px rgba(0,0,0,0.4)' 
                        : 'none'
                    }}
                  >
                    {currentData.subtitle}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Enhanced Description - School Notebook Style */}
              <div className="max-w-2xl mx-auto lg:mx-0">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`description-${currentSlide}`}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className={`relative rounded-2xl p-8 shadow-2xl border-2 transition-all duration-300 hover:shadow-3xl hover:scale-105 overflow-hidden ${
                      isDarkMode 
                        ? 'bg-white/20 border-white/40 text-white backdrop-blur-xl' 
                        : 'bg-white/98 text-gray-800 backdrop-blur-xl'
                    }`}
                    style={{ borderColor: isDarkMode ? undefined : `${themeColors.primary}50` }}>
                  
                  {/* Paper Texture Overlay */}
                  <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
                    <div className="w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>
                  
                  {/* Notebook Lines Background */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Horizontal lines */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`line-${i}`}
                        className={`absolute w-full h-px ${
                          isDarkMode ? 'bg-blue-300/20' : 'bg-blue-200/40'
                        }`}
                        style={{
                          top: `${15 + i * 12}%`,
                          left: '12%',
                          right: '8%'
                        }}
                      />
                    ))}
                    
                    {/* Red margin line */}
                    <div 
                      className={`absolute left-12 top-0 bottom-0 w-0.5 ${
                        isDarkMode ? 'bg-red-400/40' : ''
                      }`}
                      style={{ backgroundColor: isDarkMode ? undefined : `${themeColors.primary}60` }}
                    ></div>
                    
                    {/* Spiral binding holes */}
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={`hole-${i}`}
                        className={`absolute w-2 h-2 rounded-full border-2 ${
                          isDarkMode 
                            ? 'bg-gray-600/40 border-gray-500/60' 
                            : 'bg-white/80'
                        }`}
                        style={{ 
                          borderColor: isDarkMode ? undefined : `${themeColors.primary}80`,
                          left: '8px',
                          top: `${20 + i * 25}%`
                        }}
                      />
                    ))}
                  </div>

                  {/* Grade Badge - 100% */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 relative">
                      <span className="text-white text-sm font-bold drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>100%</span>
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-lime-400/20 to-green-500/20 rounded-full blur-sm"></div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    {/* Enhanced decorative bullet point */}
                    <div className="absolute -left-3 top-2 w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className={`text-lg lg:text-xl leading-relaxed pl-8 font-medium ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`} style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {currentData.description}
                    </p>
                  </div>
                  
                  {/* Enhanced decorative underline */}
                  <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 rounded-full"></div>
                  
                  {/* School corner decorations */}
                  <div 
                    className="absolute top-2 left-2 w-3 h-3 border-t border-l rounded-tl"
                    style={{ borderColor: isDarkMode ? undefined : `${themeColors.primary}60` }}
                  ></div>
                  <div 
                    className="absolute bottom-2 right-2 w-3 h-3 border-b border-r rounded-br"
                    style={{ borderColor: isDarkMode ? undefined : `${themeColors.secondary}60` }}
                  ></div>
                </motion.div>
                </AnimatePresence>
              </div>

              {/* Enhanced CTA Button - School Style */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative group">
                  <Button
                    size="lg"
                    className={`text-white px-12 py-6 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl font-bold text-lg border-2 relative overflow-hidden ${
                      isChristmasMode ? 'font-lobster hover:bg-[#a61715] hover:text-shadow-[0_1px_2px_rgba(0,0,0,0.75),0_0_40px_#FFF]' : ''
                    }`}
                    style={{ 
                      background: isChristmasMode ? '#5e0d0c' : themeColors.buttonGradient,
                      borderColor: isChristmasMode ? '#4c0300' : `${themeColors.primary}30`,
                      textShadow: isChristmasMode ? '0 1px 2px rgba(0,0,0,0.75)' : undefined,
                      boxShadow: isChristmasMode ? `
                        inset 1px 1px 0px rgba(255,255,255,0.25),
                        inset 0 0 6px #a23227,
                        inset 0 80px 80px -40px #ac3223,
                        1px 1px 3px rgba(0,0,0,0.75)
                      ` : undefined
                    }}
                  >
                    {/* Christmas Button ::before effect */}
                    {isChristmasMode && (
                      <div 
                        className="absolute -top-7 -left-3 -right-0 h-23 w-full pointer-events-none"
                        style={{
                          backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAXCAYAAACS5bYWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABFpJREFUeNrUV0tIo1cUvpkYjQ4xxSA6DxuNqG0dtaUKOgs3s6i0dFd3pSsXdjeIixakiGA34sZuXCkoONLFwJTK4GMYLYXg29gatTpiXurkbd7vv9/5ub+IxuhA7eiFQ5Kbc8/57ne/e87/ywRBYLdl3GG3aNwqsLJ0k0tLS+fmcnNzWUVFBVMoFGx2djarvLxcm5OTw+bm5iytra2xc4ExNjY27iqVyvvwK6CpeDzuCYVC1urq6qDA9UcfPp+PHR4esmAwKK6tr68/l5/8rgQ2Ozub1dbWyiYmJooaGxt/VqvV38jlchX9l0qlwoFA4DWS/RKLxRxFRUVf5+XlPcaaT2AP0sVPJBL2SCRiAPBpu93+vKamZo/Ae71eZjabWV1dXVqw7CKwp43ksrCw8Bhg7MJ/PLDZ5PHx8cz29vYT5JGD/bSYLgTrcDgYdk6siSc6NjZWDaAe4ZoHQL+cmZnRpZPnhWDpD8kw7uKo9ML/NMCsd2tr61vkzboMrEyv138M7TyLRqMWMBsX3sMgaZhMpp+AR5EJrCocDpuEGzKg4x8khs+CVWxubvZfR9JkMik4nU7BarUKLpeLmLsKuwIqTLynp4fqmIzASrqQT09Pf1VVVfX0KsWZ6uHBwQHTaDSsoKAgo6/H4xHLEcrVyRwuEisrKzs5XrrIVAVwiUVDKRRrL+YI32ewdVhMApuHWvcj6vids6J2u90MF4yBHUZNgKoEBaRBQalJqFSqtJfUYrGIlQX+ydXVVTN+u0tKSjQNDQ1axJVl2iTyp+bn55d7e3v/kqoDgZU1NTU9LCws/Py0M+2ekuGincxJ3yF+18jIyHJLS0slQJUWFxczrBeBE0vE5tHRkbixlZWVfSR8gTX/0P5gH7S1tX3Z3t7+BW8qAvwSfr8/jA0EIRM/qoFtampqbW9vTw+XA+ojUruVd3Z2tvb19T2TQFEim81GgVJoCvvj4+NLOJZgaWmpemdn5y3a6BbcnJDAw8HBwac6ne6eqCW5XDwB3qVSqM9/DAwMUNy/eVLabT7sI25qwgujThCBhWE+mAt2yNc4SQKSZrOQQE1HS22VJkmPAGTr7+//fX19fRk+Zgq0trbGeFAKEAQT98BSqKOj47vm5uaa/Px8JeIk4GcaHh6eWlxcfAU/A8xG67BxAX3fwdcbYUpSDJ06Z49Ak8ZC3OL8f3YiA4PBYKdLQ2AJ9OTk5GpXV9cQiCVh79M94QtlPLDUE/1gPNrd3f0W33W4cBoco48zQuy/IZYAMnGqlSc4c66L9JruQUaSARXeT8HGKzxAqFBekni6+h46+pMzGiJGMgTOJh1yU/KNEGDvZWvfBawkA9ppwGg0mrRa7SOI2g+gxOgbJIpdFpj72PnxSnPX8vqRxTURgBQWKisrH+GThOm+CtAzoK/9/Uiqq/6hoaHfdnd3jaOjo7/yY7yxbwqkWy3sQzpS2C6YirwvUJk0y7hurfyGRrnduPGvAAMASmo8wzeVwfsAAAAASUVORK5CYII=) no-repeat 0 0, url(data:image/png;base64,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) no-repeat 50% 0, url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAXCAYAAACFxybfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAodJREFUeNrsVb1rWlEUv2pN/GqspKRSKFYXWzEloIWif0Fn6dJChQ7OQil0qd3EzcEpg0OgdHDr4CQODk7VRlLMEIVqApX4We0zflR9/Z1Ui4T34ksaaAYP/Hzc673n/M6550PG8zz73yKjn0wm83fDYDAwo9HINBrNnwOQg4MDs0ql2lQqlfdAWont7ng8Pjw+Ps44nc4G1pI9EXWaSOzt7TGO42aH5Pv7+08ajUZ0MBiUeXEZd7vdL5VK5fX29rZ+5tQiEmdxKrlcjsEYczgcynK5/BKKv/IXFNz/XiqVXkHdjUuRIA9SqdRD8or/R8Ez9fr9fqHVakUR4c2z0REjIQuHw2ZcrPBXLCA0RHTezEdHjIQqkUhEr9I4HOILhQLf6/VoOUFEvDMiQiToDx1Cdz+bzZ6bUFarlel0OkkVUC/X2bvdPoVer5fh3ntsfwJ+CJ2XA4p0Op1bpBgJyxDehQQ6nQ5DZXHBYDBZq9V+EhFUndnr9drEqoc2bwJbwGPgtohuVSwWe2Gz2TZMJpNgRKi6qtUqg2EWj8dTgUDgo0KhWPN4PC70EvXOzs67fD6/S6kiRIKeZA1YJ2MiJNbdbvfTUCjkV6vVK2hcDF8GI2w0GrGTkxM2HA5PDxaLxSOfz/cWEfk81X0XIMMFgJJ/srBjCgk8IdcfuVyuZ36//7nFYtkQyAMumUzuRiKRD0jMFLa+AZOpYwqgB/ziBVqmVBKUO7eAB/R0WG/Z7XaTVqtdbTabHJL6EK2djBaBPHA0NSqpbUsiMUeEBgpF4Q5AbZrmSJ/yEWgBTaBNHl9kdkgmMUeG7qwAq9PqovceTA3zlxlgsuswyuXsGsiSxJLEkoSY/BZgAEjRodi+uBruAAAAAElFTkSuQmCC) no-repeat 100% 0`,
                          backgroundSize: '100% 100%',
                          backgroundPosition: '0 0, 50% 0, 100% 0'
                        }}
                      />
                    )}
                    
                    {/* Christmas Snow Effect Background */}
                    {isChristmasMode && (
                      <div 
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{
                          background: `url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPHJhZGlhbEdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNzUlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNkMzU0NDgiIHN0b3Atb3BhY2l0eT0iMSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNGExMTBjIiBzdG9wLW9wYWNpdHk9IjEiLz4KICA8L3JhZGlhbEdyYWRpZW50PgogIDxyZWN0IHg9Ii01MCIgeT0iLTUwIiB3aWR0aD0iMTAxIiBoZWlnaHQ9IjEwMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+)`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          opacity: 0.3
                        }}
                      />
                    )}
                    
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                        backgroundSize: '8px 8px'
                      }}></div>
                    </div>
                    
                    <span className="flex items-center gap-3 relative z-10">
                      <GraduationCap className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                      {currentData.ctaText}
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </span>
                  </Button>
                  
                  {/* Grade Badge on Button - A+ */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 relative">
                    <span className="text-white text-sm font-bold drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>A+</span>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-sm"></div>
                  </div>
                  
                  {/* Decorative sparkles */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Image with Stats */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div className={`w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border-2 transition-all duration-300 group-hover:shadow-3xl group-hover:scale-105 ${
                  isDarkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <img
                    src={currentData.image}
                    alt={currentData.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Photo overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Enhanced corner decorations */}
                <div 
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-pulse"
                  style={{ backgroundColor: themeColors.corner }}
                >
                  <Star className="w-4 h-4 text-white" />
                </div>
                
                {/* School badge decoration */}
                <div 
                  className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: themeColors.primary }}
                >
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                
                {/* Decorative corner lines */}
                <div 
                  className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 opacity-60"
                  style={{ borderColor: themeColors.primary }}
                ></div>
                <div 
                  className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 opacity-60"
                  style={{ borderColor: themeColors.secondary }}
                ></div>
                
                {/* Enhanced Stats Badges - School Notebook Style */}
                <div 
                  className="absolute -top-8 -right-8 sm:-top-10 sm:-right-10 bg-white/25 dark:bg-gray-800/25 backdrop-blur-xl rounded-2xl p-6 border-2 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden"
                  style={{ borderColor: isDarkMode ? undefined : `${themeColors.primary}40` }}
                >
                  {/* Paper texture */}
                  <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
                    <div className="w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                      backgroundSize: '15px 15px'
                    }}></div>
                  </div>
                  
                  
                  <div className="text-center relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div className="p-2 bg-yellow-400/20 rounded-xl border border-yellow-300/30">
                        <GraduationCap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div className="text-3xl font-bold text-white dark:text-white drop-shadow-lg" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>35+</div>
                    </div>
                    <div className="text-sm font-bold text-white/90 dark:text-gray-300 drop-shadow-md" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{t('carousel.stats.years')}</div>
                  </div>
                  
                  {/* Corner decoration */}
                  <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-yellow-300/60 dark:border-yellow-600/60 rounded-tl"></div>
                </div>

                <div className="absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-10 bg-white/25 dark:bg-gray-800/25 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/40 dark:border-gray-600/40 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  {/* Paper texture */}
                  <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
                    <div className="w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                      backgroundSize: '15px 15px'
                    }}></div>
                  </div>
                  
                  <div className="text-center relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div 
                        className="p-2 rounded-xl border"
                        style={{ 
                          backgroundColor: `${themeColors.primary}20`,
                          borderColor: `${themeColors.primary}30`
                        }}
                      >
                        <Users 
                          className="w-5 h-5" 
                          style={{ color: themeColors.primary }}
                        />
                      </div>
                      <div className="text-3xl font-bold text-white dark:text-white drop-shadow-lg" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>1000+</div>
                    </div>
                    <div className="text-sm font-bold text-white/90 dark:text-gray-300 drop-shadow-md" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{t('carousel.stats.students')}</div>
                  </div>
                  
                  {/* Corner decoration */}
                  <div 
                    className="absolute bottom-1 right-1 w-2 h-2 border-b border-r rounded-br"
                    style={{ borderColor: isDarkMode ? undefined : `${themeColors.primary}60` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Navigation Controls */}
      <div className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={prevSlide}
            className={`p-2 rounded-full shadow-md border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>

          <button
            onClick={togglePlayPause}
            className={`p-2 rounded-full shadow-md border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            {isPlaying ? (
              <Pause className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            ) : (
              <Play className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            )}
          </button>

          <button
            onClick={nextSlide}
            className={`p-2 rounded-full shadow-md border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>

      {/* Simple Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 z-30">
        <div className="flex gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-200/50 dark:border-gray-600/50">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "scale-125"
                  : isDarkMode 
                    ? "bg-gray-600 hover:bg-gray-500 hover:scale-110"
                    : "bg-gray-400 hover:bg-gray-500 hover:scale-110"
              }`}
              style={{
                backgroundColor: index === currentSlide ? themeColors.primary : undefined
              }}
            />
          ))}
        </div>
      </div>

    </div>
  )
}
