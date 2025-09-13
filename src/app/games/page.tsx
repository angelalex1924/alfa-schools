"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { BookOpen, Globe, Star, Users, Trophy, Brain, Sparkles, Gamepad2, Target, Zap, Play, ArrowUp, Shuffle } from "lucide-react"
import { GamesIcon } from "@/components/custom-icons"
import NotebookHero from "@/components/NotebookHero"
import SchoolBreadcrumb from "@/components/SchoolBreadcrumb"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function GamesPage() {
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  const [isMobile, setIsMobile] = useState(false)

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
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: isDarkMode 
          ? `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%)`
          : `linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 50%, #d1e7ff 100%)`,
      }}
    >
      {/* Optimized Background Elements for Mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {isMobile ? (
          // Static background elements for mobile
          <>
            <div
              className="absolute top-20 left-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full"
              style={{ 
                backgroundColor: isDarkMode 
                  ? "rgba(74, 111, 165, 0.15)" 
                  : "rgba(74, 111, 165, 0.3)",
                filter: 'blur(20px)'
              }}
            />
            <div
              className="absolute top-40 right-20 w-40 h-40 sm:w-56 sm:h-56 rounded-full"
              style={{ 
                backgroundColor: isDarkMode 
                  ? "rgba(129, 161, 212, 0.1)" 
                  : "rgba(129, 161, 212, 0.4)",
                filter: 'blur(20px)'
              }}
            />
            <div
              className="absolute bottom-40 left-1/3 w-24 h-24 sm:w-32 sm:h-32 rounded-full"
              style={{ 
                backgroundColor: isDarkMode 
                  ? "rgba(201, 182, 228, 0.08)" 
                  : "rgba(201, 182, 228, 0.25)",
                filter: 'blur(15px)'
              }}
            />
            <div
              className="absolute top-1/2 right-1/4 w-20 h-20 sm:w-24 sm:h-24 rounded-full"
              style={{ 
                backgroundColor: isDarkMode 
                  ? "rgba(247, 141, 167, 0.08)" 
                  : "rgba(247, 141, 167, 0.3)",
                filter: 'blur(15px)'
              }}
            />
          </>
        ) : (
          // Full animations for desktop
          <>
            <motion.div
              className="absolute top-20 left-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full blur-3xl"
              style={{ 
                backgroundColor: isDarkMode 
                  ? "rgba(74, 111, 165, 0.2)" 
                  : "rgba(74, 111, 165, 0.4)" 
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2]
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
                backgroundColor: isDarkMode 
                  ? "rgba(129, 161, 212, 0.15)" 
                  : "rgba(129, 161, 212, 0.5)" 
              }}
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.15, 0.25, 0.15]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute bottom-40 left-1/3 w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-2xl"
              style={{ 
                backgroundColor: isDarkMode 
                  ? "rgba(201, 182, 228, 0.1)" 
                  : "rgba(201, 182, 228, 0.3)" 
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            <motion.div
              className="absolute top-1/2 right-1/4 w-20 h-20 sm:w-24 sm:h-24 rounded-full blur-xl"
              style={{ 
                backgroundColor: isDarkMode 
                  ? "rgba(247, 141, 167, 0.1)" 
                  : "rgba(247, 141, 167, 0.4)" 
              }}
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            {/* Floating particles for desktop */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/10 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}
      </div>

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

      {/* Game Categories Section */}
      <section className="relative z-10 py-4 sm:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-6 sm:mb-8 lg:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className={cn(
              "text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 px-4",
              isDarkMode ? 'text-white' : 'text-gray-800'
            )}>
              {t('games.categories.title')}
            </h2>
            <p className={cn(
              "text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-4",
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            )}>
              {t('games.categories.subtitle')}
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
            {gameCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Link href={`/games/${category.id}`} key={category.id}>
                  <motion.div
                    className="group h-full"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  >
                    <div className={cn(
                      "relative h-full p-3 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl backdrop-blur-xl border",
                      "bg-white/10 dark:bg-white/5",
                      "border-white/20 dark:border-white/10",
                      "shadow-xl hover:shadow-2xl transition-all duration-300",
                      "hover:scale-[1.02] hover:-translate-y-1",
                      "cursor-pointer overflow-hidden"
                    )}>
                      {/* Animated Background Gradient */}
                      <div className={cn(
                        "absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300",
                        `bg-gradient-to-br ${category.bgGradient}`
                      )} />
                      
                      {/* Optimized floating particles for mobile */}
                      <div className="absolute inset-0 overflow-hidden">
                        {isMobile ? (
                          // Static particles for mobile
                          <>
                            <div
                              className="absolute w-1 h-1 bg-white/10 rounded-full"
                              style={{
                                left: '30%',
                                top: '40%',
                              }}
                            />
                            <div
                              className="absolute w-1 h-1 bg-white/10 rounded-full"
                              style={{
                                left: '70%',
                                top: '60%',
                              }}
                            />
                          </>
                        ) : (
                          // Animated particles for desktop
                          <>
                            {[...Array(2)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white/10 rounded-full"
                                style={{
                                  left: `${30 + i * 40}%`,
                                  top: `${40 + i * 20}%`,
                                }}
                                animate={{
                                  y: [0, -10, 0],
                                  opacity: [0.1, 0.3, 0.1],
                                }}
                                transition={{
                                  duration: 6 + i * 2,
                                  repeat: Infinity,
                                  delay: i * 1,
                                }}
                              />
                            ))}
                          </>
                        )}
                      </div>

                      {/* Category Header */}
                      <div className="relative z-10 flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                        <motion.div 
                          className={cn(
                            "p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br shadow-lg",
                            category.color,
                            "group-hover:scale-110 transition-all duration-300"
                          )}
                          whileHover={{ rotate: 5 }}
                        >
                          <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h3 className={cn(
                            "text-base sm:text-xl lg:text-2xl font-bold mb-1",
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          )}>
                            {category.title}
                          </h3>
                          <p className={cn(
                            "text-xs sm:text-sm lg:text-base",
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          )}>
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Games List */}
                      <div className="relative z-10 space-y-3">
                        {category.games.map((game, gameIndex) => {
                          const GameIcon = game.icon
                          return (
                            <motion.div
                              key={gameIndex}
                              className={cn(
                                "p-2.5 sm:p-3 rounded-lg sm:rounded-xl backdrop-blur-xl border",
                                "bg-white/5 dark:bg-white/5",
                                "border-white/10 dark:border-white/10",
                                "hover:bg-white/10 dark:hover:bg-white/10",
                                "transition-all duration-300 cursor-pointer group/game"
                              )}
                              whileHover={{ scale: 1.01 }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + gameIndex * 0.1 }}
                            >
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                  <div className="p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-white/10 dark:bg-white/10 shadow-md group-hover/game:scale-110 transition-all duration-300 flex-shrink-0">
                                    <GameIcon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: game.color }} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className={cn(
                                      "font-semibold text-xs sm:text-sm lg:text-base mb-0.5 group-hover/game:scale-105 transition-all duration-300",
                                      isDarkMode ? 'text-white' : 'text-gray-800'
                                    )}>
                                      {game.title}
                                    </h4>
                                    <p className={cn(
                                      "text-xs sm:text-sm leading-tight",
                                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    )}>
                                      {game.description}
                                    </p>
                                  </div>
                                </div>
                                <motion.div 
                                  className={cn(
                                    "px-2 sm:px-3 py-1 rounded-full text-xs font-medium backdrop-blur-xl border flex-shrink-0",
                                    "bg-white/10 dark:bg-white/10",
                                    "border-white/20 dark:border-white/20"
                                  )}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <span style={{ color: game.color }}>
                                    {game.difficulty}
                                  </span>
                                </motion.div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>

                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Compact Call to Action Section */}
      <section className="relative z-10 py-4 sm:py-8 lg:py-12 mx-4 sm:mx-6 mb-6 sm:mb-8 lg:mb-12">
        <motion.div
          className="max-w-3xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-xl"
          style={{ 
            background: isDarkMode 
              ? `linear-gradient(135deg, #2d3748 0%, #4a5568 100%)` 
              : `linear-gradient(135deg, #4a6fa5 0%, #81a1d4 100%)` 
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center px-4 sm:px-6 py-6 sm:py-8 lg:py-10 text-white relative overflow-hidden">
            {/* Optimized background pattern for mobile */}
            <div className="absolute inset-0 opacity-5">
              {isMobile ? (
                // Static particles for mobile
                <>
                  <div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: '20%',
                      top: '30%',
                    }}
                  />
                  <div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: '40%',
                      top: '45%',
                    }}
                  />
                  <div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: '60%',
                      top: '60%',
                    }}
                  />
                  <div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: '80%',
                      top: '75%',
                    }}
                  />
                </>
              ) : (
                // Animated particles for desktop
                <>
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${20 + i * 20}%`,
                        top: `${30 + i * 15}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.4, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 1,
                      }}
                    />
                  ))}
                </>
              )}
            </div>

            <motion.h2 
              className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {t('games.cta.title')}
            </motion.h2>
            
            <motion.p 
              className="text-sm sm:text-base mb-4 sm:mb-6 max-w-xl mx-auto opacity-90 leading-relaxed relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {t('games.cta.description')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.button
                className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold text-white text-sm sm:text-base shadow-xl border-0 relative overflow-hidden group"
                style={{ 
                  background: `linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)` 
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 justify-center">
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {t('games.cta.button')}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Simplified Scroll to Top Button */}
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

      {/* Simplified Play Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.button
          className="p-3 rounded-full shadow-2xl border-0 backdrop-blur-xl bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10"
          whileHover={{ scale: 1.05 }}
        >
          <Play className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </motion.button>
      </motion.div>

      {/* Custom Styles */}
      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}
