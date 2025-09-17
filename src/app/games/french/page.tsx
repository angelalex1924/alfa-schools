"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { BookOpen, Brain, Users, ArrowLeft, Star, Trophy, Clock, Sparkles, Zap, Shuffle, Pencil, CheckCircle } from "lucide-react"
import { GamesIcon } from "@/components/custom-icons"
import { FranceFlagIcon } from "@/components/flag-icons"
import SchoolBreadcrumb from "@/components/SchoolBreadcrumb"

export default function FrenchGamesPage() {
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()

  const frenchGames = [
    {
      id: "vocabulary",
      title: t('games.french.vocabulary.title'),
      description: t('games.french.vocabulary.description'),
      icon: BookOpen,
      color: "from-emerald-500 to-green-500",
      hoverColor: "hover:from-emerald-600 hover:to-green-600",
      bgGradient: "from-emerald-500/20 to-green-500/20",
      levels: [
        { level: 1, title: t('games.levels.basic'), difficulty: "Facile", words: 20, color: "#10b981" },
        { level: 2, title: t('games.levels.intermediate'), difficulty: "Moyen", words: 30, color: "#f59e0b" },
        { level: 3, title: t('games.levels.advanced'), difficulty: "Difficile", words: 30, color: "#ef4444" }
      ],
      gameType: "vocabulary"
    },
    {
      id: "grammar",
      title: t('games.french.grammar.title'),
      description: t('games.french.grammar.description'),
      icon: Brain,
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:from-blue-600 hover:to-cyan-600",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      levels: [
        { level: 1, title: t('games.levels.basic'), difficulty: "Facile", topics: 5, color: "#10b981" },
        { level: 2, title: t('games.levels.intermediate'), difficulty: "Moyen", topics: 20, color: "#f59e0b" },
        { level: 3, title: t('games.levels.advanced'), difficulty: "Difficile", topics: 15, color: "#ef4444" }
      ],
      gameType: "grammar"
    },
    {
      id: "conversation",
      title: t('games.french.conversation.title'),
      description: t('games.french.conversation.description'),
      icon: Users,
      color: "from-cyan-500 to-blue-500",
      hoverColor: "hover:from-cyan-600 hover:to-blue-600",
      bgGradient: "from-cyan-500/20 to-blue-500/20",
      levels: [
        { level: 1, title: t('games.levels.basic'), difficulty: "Facile", scenarios: 8, color: "#10b981" },
        { level: 2, title: t('games.levels.intermediate'), difficulty: "Moyen", scenarios: 12, color: "#f59e0b" },
        { level: 3, title: t('games.levels.advanced'), difficulty: "Difficile", scenarios: 16, color: "#ef4444" }
      ],
      gameType: "conversation"
    },
    {
      id: "anagrams",
      title: t('games.french.anagrams.title'),
      description: t('games.french.anagrams.description'),
      icon: Shuffle,
      color: "from-purple-500 to-pink-500",
      hoverColor: "hover:from-purple-600 hover:to-pink-600",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      levels: [
        { level: 1, title: t('games.levels.basic'), difficulty: "Facile", words: 20, color: "#10b981" },
        { level: 2, title: t('games.levels.intermediate'), difficulty: "Moyen", words: 20, color: "#f59e0b" },
        { level: 3, title: t('games.levels.advanced'), difficulty: "Difficile", words: 20, color: "#ef4444" }
      ],
      gameType: "anagrams"
    }
  ]

  return (
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
              { label: 'Παιχνίδια', href: '/games' },
              { label: 'French Games' }
            ]}
          />
        </div>
      </div>

      {/* School Notebook French Games Section */}
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
                {/* Header */}
                <motion.div
                  className="mb-6 sm:mb-8"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <Link 
                      href="/games"
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 flex-shrink-0"
                    >
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: isDarkMode ? '#e5e7eb' : '#374151' }} />
                    </Link>
                    <div 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg flex-shrink-0" 
                      style={{ 
                        backgroundColor: '#8b5cf6',
                        minWidth: '32px',
                        minHeight: '32px',
                        aspectRatio: '1/1'
                      }}
                    >
                      <FranceFlagIcon className="w-5 h-3 sm:w-6 sm:h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h1 
                        className="text-lg sm:text-2xl lg:text-3xl font-bold leading-tight mb-1 sm:mb-2 break-words"
                        style={{ 
                          color: isDarkMode ? '#ffffff' : '#1f2937',
                          fontFamily: 'StampatelloFaceto, cursive'
                        }}
                      >
                        {t('games.french.title')}
                      </h1>
                      <p 
                        className="text-sm sm:text-base lg:text-lg leading-relaxed break-words"
                        style={{ 
                          color: isDarkMode ? '#d1d5db' : '#4b5563',
                          fontFamily: 'StampatelloFaceto, cursive'
                        }}
                      >
                        {t('games.french.description')}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Games List */}
                <div className="space-y-6 sm:space-y-8">
                  {frenchGames.map((game, index) => {
                    const IconComponent = game.icon
                    return (
                      <motion.div
                        key={game.id}
                        className="group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                      >
                        {/* Notebook Entry */}
                        <div 
                          className="relative p-4 sm:p-6 border-l-4 border-b-2 border-r border-t border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300"
                          style={{
                            backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
                            borderLeftColor: '#dc2626',
                            borderLeftWidth: '4px'
                          }}
                        >
                          {/* Game Header */}
                          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <div 
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
                              style={{ 
                                backgroundColor: game.color.includes('emerald') ? '#10b981' : 
                                                game.color.includes('blue') ? '#3b82f6' : 
                                                game.color.includes('cyan') ? '#06b6d4' : '#8b5cf6'
                              }}
                            >
                              <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 
                                className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 group-hover:scale-105 transition-all duration-300 break-words"
                                style={{ 
                                  color: isDarkMode ? '#ffffff' : '#1f2937',
                                  fontFamily: 'StampatelloFaceto, cursive'
                                }}
                              >
                                {game.title}
                              </h3>
                              <p 
                                className="text-xs sm:text-sm lg:text-base break-words"
                                style={{ 
                                  color: isDarkMode ? '#d1d5db' : '#4b5563',
                                  fontFamily: 'StampatelloFaceto, cursive'
                                }}
                              >
                                {game.description}
                              </p>
                            </div>
                          </div>

                          {/* Levels */}
                          <div className="grid gap-3 sm:gap-4">
                            {game.levels.map((level, levelIndex) => (
                              <Link
                                key={level.level}
                                href={`/games/french/${game.gameType}/level-${level.level}`}
                              >
                                <motion.div
                                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group/level border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
                                  whileHover={{ scale: 1.01, x: 5 }}
                                  whileTap={{ scale: 0.98 }}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.7 + index * 0.2 + levelIndex * 0.1 }}
                                >
                                  <div 
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg flex-shrink-0"
                                    style={{ 
                                      background: `linear-gradient(135deg, ${level.color}CC, ${level.color}99)` 
                                    }}
                                  >
                                    {level.level}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 
                                      className="font-semibold text-sm sm:text-base mb-0.5 sm:mb-1 group-hover/level:scale-105 transition-all duration-300 break-words"
                                      style={{ 
                                        color: isDarkMode ? '#ffffff' : '#1f2937',
                                        fontFamily: 'StampatelloFaceto, cursive'
                                      }}
                                    >
                                      {level.title}
                                    </h4>
                                    <p 
                                      className="text-xs sm:text-sm break-words"
                                      style={{ 
                                        color: isDarkMode ? '#9ca3af' : '#6b7280',
                                        fontFamily: 'StampatelloFaceto, cursive'
                                      }}
                                    >
                                      {game.gameType === "vocabulary" && `${(level as any).words} ${t('games.words')}`}
                                      {game.gameType === "grammar" && `${(level as any).topics} ${t('games.topics')}`}
                                      {game.gameType === "conversation" && `${(level as any).scenarios} ${t('games.scenarios')}`}
                                      {game.gameType === "anagrams" && `${(level as any).words} ${t('games.words')}`}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                                    <div 
                                      className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                                      style={{ 
                                        backgroundColor: level.color + '20',
                                        color: level.color,
                                        border: `1px solid ${level.color}40`
                                      }}
                                    >
                                      {level.difficulty}
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                                      <span className="text-xs sm:text-sm font-medium">{level.level * 10}</span>
                                    </div>
                                  </div>
                                </motion.div>
                              </Link>
                            ))}
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
                    )
                  })}
                </div>

                {/* Notebook Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-px"
                      style={{ 
                        backgroundColor: isDarkMode ? '#fabeb6' : '#d1d5db',
                        top: `${120 + i * 30}px`,
                        opacity: i % 2 === 0 ? 0.6 : 0.2,
                        width: '95%',
                        left: '2.5%'
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
    </div>
  )
}
