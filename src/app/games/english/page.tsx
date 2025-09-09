"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { BookOpen, Brain, Users, ArrowLeft, Star, Trophy, Clock, Sparkles, Zap } from "lucide-react"
import { GamesIcon } from "@/components/custom-icons"
import { UKFlagIcon } from "@/components/flag-icons"

export default function EnglishGamesPage() {
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()

  const englishGames = [
    {
      id: "vocabulary",
      title: t('games.english.vocabulary.title'),
      description: t('games.english.vocabulary.description'),
      icon: BookOpen,
      color: "from-emerald-500 to-green-500",
      hoverColor: "hover:from-emerald-600 hover:to-green-600",
      bgGradient: "from-emerald-500/20 to-green-500/20",
      levels: [
        { level: 1, title: t('games.levels.basic'), difficulty: "Easy", words: 20, color: "#10b981" },
        { level: 2, title: t('games.levels.intermediate'), difficulty: "Medium", words: 30, color: "#f59e0b" },
        { level: 3, title: t('games.levels.advanced'), difficulty: "Hard", words: 30, color: "#ef4444" }
      ],
      gameType: "vocabulary"
    },
    {
      id: "grammar",
      title: t('games.english.grammar.title'),
      description: t('games.english.grammar.description'),
      icon: Brain,
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:from-blue-600 hover:to-cyan-600",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      levels: [
        { level: 1, title: t('games.levels.basic'), difficulty: "Easy", topics: 5, color: "#10b981" },
        { level: 2, title: t('games.levels.intermediate'), difficulty: "Medium", topics: 20, color: "#f59e0b" },
        { level: 3, title: t('games.levels.advanced'), difficulty: "Hard", topics: 15, color: "#ef4444" }
      ],
      gameType: "grammar"
    },
    {
      id: "conversation",
      title: t('games.english.conversation.title'),
      description: t('games.english.conversation.description'),
      icon: Users,
      color: "from-cyan-500 to-blue-500",
      hoverColor: "hover:from-cyan-600 hover:to-blue-600",
      bgGradient: "from-cyan-500/20 to-blue-500/20",
      levels: [
        { level: 1, title: t('games.levels.basic'), difficulty: "Easy", scenarios: 8, color: "#10b981" },
        { level: 2, title: t('games.levels.intermediate'), difficulty: "Medium", scenarios: 12, color: "#f59e0b" },
        { level: 3, title: t('games.levels.advanced'), difficulty: "Hard", scenarios: 16, color: "#ef4444" }
      ],
      gameType: "conversation"
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
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl animate-pulse opacity-30"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(74, 111, 165, 0.2)" 
              : "rgba(74, 111, 165, 0.4)" 
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-56 h-56 rounded-full blur-3xl animate-pulse opacity-25"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(129, 161, 212, 0.15)" 
              : "rgba(129, 161, 212, 0.5)" 
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-35"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(201, 182, 228, 0.1)" 
              : "rgba(201, 182, 228, 0.3)" 
          }}
        />
      </div>

      {/* Header */}
      <section className="relative z-10 pt-20 pb-8 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="flex items-center gap-3 sm:gap-6 mb-6 sm:mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/games"
              className={cn(
                "p-2 sm:p-3 rounded-lg sm:rounded-xl backdrop-blur-xl border transition-all duration-300",
                "bg-white/10 dark:bg-white/5",
                "border-white/20 dark:border-white/10",
                "hover:scale-110 hover:bg-white/20 dark:hover:bg-white/10"
              )}
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: isDarkMode ? '#e5e7eb' : '#374151' }} />
            </Link>
            
            <motion.div 
              className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl"
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <GamesIcon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400" />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <h1 className={cn(
                "text-xl sm:text-3xl lg:text-5xl font-bold flex items-center gap-2 sm:gap-4 mb-1 sm:mb-2",
                isDarkMode ? 'text-white' : 'text-gray-800'
              )}>
                <UKFlagIcon className="w-6 h-4 sm:w-8 sm:h-6 flex-shrink-0" />
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                  {t('games.english.title')}
                </span>
              </h1>
              <p className={cn(
                "text-sm sm:text-lg lg:text-xl",
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              )}>
                {t('games.english.description')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="relative z-10 py-8 sm:py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid gap-6 sm:gap-8 lg:gap-12">
            {englishGames.map((game, index) => {
              const IconComponent = game.icon
              return (
                <motion.div
                  key={game.id}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={cn(
                    "relative p-8 lg:p-10 rounded-3xl backdrop-blur-xl border",
                    "bg-white/10 dark:bg-white/5",
                    "border-white/20 dark:border-white/10",
                    "shadow-2xl hover:shadow-3xl transition-all duration-500",
                    "hover:scale-[1.02] hover:-translate-y-2",
                    "overflow-hidden"
                  )}>
                    {/* Animated Background Gradient */}
                    <div className={cn(
                      "absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500",
                      `bg-gradient-to-br ${game.bgGradient}`
                    )} />
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white/20 rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + i * 10}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.8, 0.2],
                          }}
                          transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>

                    {/* Game Header */}
                    <div className="relative z-10 flex items-center gap-6 mb-8">
                      <motion.div 
                        className={cn(
                          "p-4 rounded-2xl bg-gradient-to-br shadow-xl",
                          game.color,
                          "group-hover:scale-110 transition-all duration-300"
                        )}
                        whileHover={{ rotate: 5 }}
                      >
                        <IconComponent className="w-10 h-10 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className={cn(
                          "text-2xl lg:text-3xl font-bold mb-2",
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        )}>
                          {game.title}
                        </h3>
                        <p className={cn(
                          "text-base lg:text-lg",
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        )}>
                          {game.description}
                        </p>
                      </div>
                    </div>

                    {/* Levels */}
                    <div className="relative z-10 grid gap-4">
                      {game.levels.map((level, levelIndex) => (
                        <Link
                          key={level.level}
                          href={`/games/english/${game.gameType}/level-${level.level}`}
                        >
                          <motion.div
                            className={cn(
                              "p-5 rounded-2xl backdrop-blur-xl border",
                              "bg-white/5 dark:bg-white/5",
                              "border-white/10 dark:border-white/10",
                              "hover:bg-white/10 dark:hover:bg-white/10",
                              "transition-all duration-300 cursor-pointer group/level"
                            )}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.2 + levelIndex * 0.1 }}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className={cn(
                                  "w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg flex-shrink-0",
                                  "bg-gradient-to-br"
                                )}
                                  style={{ 
                                    background: `linear-gradient(135deg, ${level.color}CC, ${level.color}99)` 
                                  }}
                                >
                                  {level.level}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className={cn(
                                    "font-semibold text-sm sm:text-lg mb-1 group-hover/level:scale-105 transition-all duration-300",
                                    isDarkMode ? 'text-white' : 'text-gray-800'
                                  )}>
                                    {level.title}
                                  </h4>
                                  <p className={cn(
                                    "text-xs sm:text-sm",
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                  )}>
                                    {game.gameType === "vocabulary" && `${(level as any).words} ${t('games.words')}`}
                                    {game.gameType === "grammar" && `${(level as any).topics} ${t('games.topics')}`}
                                    {game.gameType === "conversation" && `${(level as any).scenarios} ${t('games.scenarios')}`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                                <motion.div 
                                  className={cn(
                                    "px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-xl border flex-shrink-0",
                                    "bg-white/10 dark:bg-white/10",
                                    "border-white/20 dark:border-white/20"
                                  )}
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <span style={{ color: level.color }}>
                                    {level.difficulty}
                                  </span>
                                </motion.div>
                                <div className="flex items-center gap-1 sm:gap-2 text-yellow-500">
                                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                                  <span className="text-xs sm:text-sm font-medium">{level.level * 10}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}
