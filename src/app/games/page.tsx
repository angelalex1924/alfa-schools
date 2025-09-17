"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { BookOpen, Globe, Star, Users, Trophy, Brain, Sparkles, Gamepad2, Target, Zap, Play, ArrowUp, Shuffle, Pencil, CheckCircle } from "lucide-react"
import { GamesIcon } from "@/components/custom-icons"
import NotebookHero from "@/components/NotebookHero"
import SchoolBreadcrumb from "@/components/SchoolBreadcrumb"
import Link from "next/link"
import { useEffect, useState } from "react"
import SEOHead from "@/components/SEOHead"
import { generateEnhancedGamesSEO, generateComprehensiveStructuredData } from "@/lib/seo-utils"

export default function GamesPage() {
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alfaschools.gr'
  const seoData = generateEnhancedGamesSEO(baseUrl)
  const structuredData = generateComprehensiveStructuredData(baseUrl)

  // Detect mobile device to reduce animations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const gameCategories = [
    {
      id: "english",
      title: t('games.english.title'),
      description: t('games.english.description'),
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:from-blue-600 hover:to-cyan-600",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      games: [
        {
          title: t('games.english.vocabulary.title'),
          description: t('games.english.vocabulary.description'),
          icon: BookOpen,
          difficulty: "Easy",
          color: "#4ade80"
        },
        {
          title: t('games.english.grammar.title'),
          description: t('games.english.grammar.description'),
          icon: Brain,
          difficulty: "Medium",
          color: "#f59e0b"
        },
        {
          title: t('games.english.conversation.title'),
          description: t('games.english.conversation.description'),
          icon: Users,
          difficulty: "Hard",
          color: "#ef4444"
        },
        {
          title: t('games.english.anagrams.title'),
          description: t('games.english.anagrams.description'),
          icon: Shuffle,
          difficulty: "Medium",
          color: "#a855f7"
        }
      ]
    },
    {
      id: "french",
      title: t('games.french.title'),
      description: t('games.french.description'),
      icon: Star,
      color: "from-purple-500 to-pink-500",
      hoverColor: "hover:from-purple-600 hover:to-pink-600",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      games: [
        {
          title: t('games.french.vocabulary.title'),
          description: t('games.french.vocabulary.description'),
          icon: BookOpen,
          difficulty: "Facile",
          color: "#4ade80"
        },
        {
          title: t('games.french.grammar.title'),
          description: t('games.french.grammar.description'),
          icon: Brain,
          difficulty: "Moyen",
          color: "#f59e0b"
        },
        {
          title: t('games.french.conversation.title'),
          description: t('games.french.conversation.description'),
          icon: Users,
          difficulty: "Difficile",
          color: "#ef4444"
        },
        {
          title: t('games.french.anagrams.title'),
          description: t('games.french.anagrams.description'),
          icon: Shuffle,
          difficulty: "Moyen",
          color: "#a855f7"
        }
      ]
    }
  ]

  return (
    <>
      <SEOHead seoData={seoData} structuredData={structuredData} />
      <div 
        className="min-h-screen relative overflow-hidden"
        style={{
          background: isDarkMode 
            ? `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%)`
            : `linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)`,
        }}
      >
      {/* Breadcrumb Navigation */}
      <div className="pt-20 pb-4 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SchoolBreadcrumb 
            items={[
              { label: 'Αρχική', href: '/' },
              { label: 'Παιχνίδια' }
            ]}
          />
        </div>
      </div>

      {/* Notebook Hero Section */}
      <NotebookHero />

      {/* School Notebook Games Section */}
      <section className="relative z-10 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Notebook Container */}
          <motion.div
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Notebook Shadow */}
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
            
            {/* Notebook Paper */}
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
              {/* Red Margin Line */}
              <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col">
                <div
                  className="w-full h-px mt-16"
                  style={{ backgroundColor: '#dc2626', opacity: 0.8 }}
                />
              </div>

              {/* Content */}
              <div className="relative p-4 sm:p-6 lg:p-8 ml-6 sm:ml-8">
                {/* Title */}
                <motion.div
                  className="mb-6 sm:mb-8"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div 
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-lg flex-shrink-0" 
                      style={{ 
                        backgroundColor: '#fbbf24',
                        minWidth: '20px',
                        minHeight: '20px',
                        aspectRatio: '1/1'
                      }}
                    >
                      <span className="text-white font-bold text-xs sm:text-sm leading-none">🎮</span>
                    </div>
                    <h2 
                      className="text-lg sm:text-2xl lg:text-3xl font-bold leading-tight break-words"
                      style={{ 
                        color: isDarkMode ? '#ffffff' : '#1f2937',
                        fontFamily: 'StampatelloFaceto, cursive'
                      }}
                    >
                      {t('games.categories.title')}
                    </h2>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div 
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-lg mt-1 flex-shrink-0" 
                      style={{ 
                        backgroundColor: '#4a6fa5',
                        minWidth: '20px',
                        minHeight: '20px',
                        aspectRatio: '1/1'
                      }}
                    >
                      <span className="text-white font-bold text-xs sm:text-sm leading-none">✓</span>
                    </div>
                    <p 
                      className="text-sm sm:text-base lg:text-lg leading-relaxed font-medium break-words"
                      style={{ 
                        color: isDarkMode ? '#d1d5db' : '#4b5563',
                        fontFamily: 'StampatelloFaceto, cursive'
                      }}
                    >
                      {t('games.categories.subtitle')}
                    </p>
                  </div>
                </motion.div>

                {/* Games Categories */}
                <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                  {gameCategories.map((category, index) => {
                    const IconComponent = category.icon
                    return (
                      <Link href={`/games/${category.id}`} key={category.id}>
                        <motion.div
                          className="group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                        >
                          {/* Notebook Entry */}
                          <div 
                            className="relative p-4 sm:p-6 border-l-4 border-b-2 border-r border-t border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer group-hover:shadow-lg"
                            style={{
                              backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
                              borderLeftColor: '#dc2626',
                              borderLeftWidth: '4px'
                            }}
                          >
                            {/* Handwritten style header */}
                            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                              <div 
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
                                style={{ 
                                  backgroundColor: category.color.includes('blue') ? '#3b82f6' : 
                                                  category.color.includes('purple') ? '#8b5cf6' : '#10b981'
                                }}
                              >
                                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 
                                  className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 group-hover:scale-105 transition-all duration-300 break-words"
                                  style={{ 
                                    color: isDarkMode ? '#ffffff' : '#1f2937',
                                    fontFamily: 'StampatelloFaceto, cursive'
                                  }}
                                >
                                  {category.title}
                                </h3>
                                <p 
                                  className="text-xs sm:text-sm lg:text-base break-words"
                                  style={{ 
                                    color: isDarkMode ? '#d1d5db' : '#4b5563',
                                    fontFamily: 'StampatelloFaceto, cursive'
                                  }}
                                >
                                  {category.description}
                                </p>
                              </div>
                            </div>

                            {/* Games List */}
                            <div className="space-y-2 sm:space-y-3">
                              {category.games.map((game, gameIndex) => {
                                const GameIcon = game.icon
                                return (
                                  <motion.div
                                    key={gameIndex}
                                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group/game"
                                    whileHover={{ scale: 1.01, x: 5 }}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + index * 0.2 + gameIndex * 0.1 }}
                                  >
                                    <div className="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-700 shadow-md group-hover/game:scale-110 transition-all duration-300 flex-shrink-0">
                                      <GameIcon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: game.color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 
                                        className="font-semibold text-xs sm:text-sm lg:text-base mb-0.5 sm:mb-1 group-hover/game:scale-105 transition-all duration-300 break-words"
                                        style={{ 
                                          color: isDarkMode ? '#ffffff' : '#1f2937',
                                          fontFamily: 'StampatelloFaceto, cursive'
                                        }}
                                      >
                                        {game.title}
                                      </h4>
                                      <p 
                                        className="text-xs sm:text-sm break-words"
                                        style={{ 
                                          color: isDarkMode ? '#9ca3af' : '#6b7280',
                                          fontFamily: 'StampatelloFaceto, cursive'
                                        }}
                                      >
                                        {game.description}
                                      </p>
                                    </div>
                                    <div 
                                      className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0"
                                      style={{ 
                                        backgroundColor: game.color + '20',
                                        color: game.color,
                                        border: `1px solid ${game.color}40`
                                      }}
                                    >
                                      {game.difficulty}
                                    </div>
                                  </motion.div>
                                )
                              })}
                            </div>

                            {/* Handwritten arrow */}
                            <div className="mt-4 flex justify-end">
                              <motion.div
                                className="text-2xl"
                                style={{ color: '#dc2626' }}
                                whileHover={{ x: 5 }}
                              >
                                →
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    )
                  })}
                </div>

                {/* Notebook Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-px"
                      style={{ 
                        backgroundColor: isDarkMode ? '#fabeb6' : '#d1d5db',
                        top: `${100 + i * 25}px`,
                        opacity: i % 2 === 0 ? 0.6 : 0.2,
                        width: '90%',
                        left: '5%'
                      }}
                    />
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-6 w-8 h-8 opacity-20" style={{ color: isDarkMode ? '#fabeb6' : '#4a6fa5' }}>
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M50,15 L55,35 L75,35 L60,50 L65,70 L50,55 L35,70 L40,50 L25,35 L45,35 Z" fill="currentColor" opacity="0.4" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action in Notebook Style */}
      <section className="relative z-10 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="relative max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Notebook Shadow */}
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
            
            {/* Notebook Paper */}
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
              {/* Red Margin Line */}
              <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col">
                <div
                  className="w-full h-px mt-16"
                  style={{ backgroundColor: '#dc2626', opacity: 0.8 }}
                />
              </div>

              {/* Content */}
              <div className="relative p-6 sm:p-8 lg:p-10 ml-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg" 
                      style={{ backgroundColor: '#fbbf24' }}
                    >
                      <span className="text-white font-bold text-lg">⚡</span>
                    </div>
                    <h2 
                      className="text-xl sm:text-2xl lg:text-3xl font-bold"
                      style={{ 
                        color: isDarkMode ? '#ffffff' : '#1f2937',
                        fontFamily: 'StampatelloFaceto, cursive'
                      }}
                    >
                      {t('games.cta.title')}
                    </h2>
                  </div>
                  
                  <p 
                    className="text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed"
                    style={{ 
                      color: isDarkMode ? '#d1d5db' : '#4b5563',
                      fontFamily: 'StampatelloFaceto, cursive'
                    }}
                  >
                    {t('games.cta.description')}
                  </p>
                  
                  <motion.button
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-white shadow-xl border-0 relative overflow-hidden group"
                    style={{ 
                      background: `linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)`,
                      fontFamily: 'StampatelloFaceto, cursive'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center gap-2 justify-center">
                      <Zap className="w-5 h-5" />
                      {t('games.cta.button')}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-2xl border-0 backdrop-blur-xl"
        style={{ 
          background: `linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)` 
        }}
        whileHover={{ scale: 1.05 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </motion.button>
      </div>
    </>
  )
}
