"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Tag, Star, Zap, BookOpen, GraduationCap, Sparkles, Heart, ArrowRight, PenTool, ArrowLeft, Hash } from 'lucide-react';
import { getArticlesByTag } from '@/lib/firebase-articles';
import type { Article } from '@/lib/types';
import NotebookHero from '@/components/NotebookHero';
import SchoolBreadcrumb from '@/components/SchoolBreadcrumb';
import { useTheme } from '@/contexts/ThemeContext';
import { useChristmasTheme } from '@/contexts/ChristmasThemeContext';
import { useHalloweenTheme } from '@/contexts/HalloweenThemeContext';
import { useEasterTheme } from '@/contexts/EasterThemeContext';
import { useCarnivalTheme } from '@/contexts/CarnivalThemeContext';
import { useSummerTheme } from '@/contexts/SummerThemeContext';

export default function TagPage() {
  const params = useParams();
  const tag = decodeURIComponent(params.tag as string);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const { isChristmasMode } = useChristmasTheme();
  const { isHalloweenMode } = useHalloweenTheme();
  const { isEasterMode } = useEasterTheme();
  const { isCarnivalMode } = useCarnivalTheme();
  const { isSummerMode } = useSummerTheme();

  useEffect(() => {
    if (tag) {
      loadArticles();
    }
  }, [tag]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { articles: fetchedArticles } = await getArticlesByTag(tag, 20);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error loading articles by tag:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // Theme-based styling functions
  const getThemeColors = () => {
    if (isChristmasMode) {
      return {
        background: 'from-red-50 via-green-50 to-red-50 dark:from-red-900/20 dark:via-green-900/20 dark:to-red-900/20',
        cardBg: 'bg-white/95 dark:bg-gray-800/95',
        border: 'border-red-200/30 dark:border-red-700/30',
        accent: 'from-red-500 to-green-600',
        text: 'text-red-800 dark:text-red-200',
        badge: 'from-red-400 to-green-500',
        lines: 'bg-red-200/30 dark:bg-red-300/15',
        margin: 'bg-red-300/50 dark:bg-red-400/30',
        accentColor: 'red',
        accentColor2: 'green',
        specialEffects: 'christmas'
      };
    } else if (isHalloweenMode) {
      return {
        background: 'from-orange-50 via-purple-50 to-orange-50 dark:from-orange-900/20 dark:via-purple-900/20 dark:to-orange-900/20',
        cardBg: 'bg-white/95 dark:bg-gray-800/95',
        border: 'border-orange-200/30 dark:border-orange-700/30',
        accent: 'from-orange-500 to-purple-600',
        text: 'text-orange-800 dark:text-orange-200',
        badge: 'from-orange-400 to-purple-500',
        lines: 'bg-orange-200/30 dark:bg-orange-300/15',
        margin: 'bg-orange-300/50 dark:bg-orange-400/30',
        accentColor: 'orange',
        accentColor2: 'purple',
        specialEffects: 'halloween'
      };
    } else if (isEasterMode) {
      return {
        background: 'from-pink-50 via-yellow-50 to-pink-50 dark:from-pink-900/20 dark:via-yellow-900/20 dark:to-pink-900/20',
        cardBg: 'bg-white/95 dark:bg-gray-800/95',
        border: 'border-pink-200/30 dark:border-pink-700/30',
        accent: 'from-pink-500 to-yellow-600',
        text: 'text-pink-800 dark:text-pink-200',
        badge: 'from-pink-400 to-yellow-500',
        lines: 'bg-pink-200/30 dark:bg-pink-300/15',
        margin: 'bg-pink-300/50 dark:bg-pink-400/30',
        accentColor: 'pink',
        accentColor2: 'yellow',
        specialEffects: 'easter'
      };
    } else if (isCarnivalMode) {
      return {
        background: 'from-purple-50 via-pink-50 to-yellow-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-yellow-900/20',
        cardBg: 'bg-white/95 dark:bg-gray-800/95',
        border: 'border-purple-200/30 dark:border-purple-700/30',
        accent: 'from-purple-500 to-pink-600',
        text: 'text-purple-800 dark:text-purple-200',
        badge: 'from-purple-400 to-pink-500',
        lines: 'bg-purple-200/30 dark:bg-purple-300/15',
        margin: 'bg-purple-300/50 dark:bg-purple-400/30',
        accentColor: 'purple',
        accentColor2: 'pink',
        specialEffects: 'carnival'
      };
    } else if (isSummerMode) {
      return {
        background: 'from-yellow-50 via-orange-50 to-yellow-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-yellow-900/20',
        cardBg: 'bg-white/95 dark:bg-gray-800/95',
        border: 'border-yellow-200/30 dark:border-yellow-700/30',
        accent: 'from-yellow-500 to-orange-600',
        text: 'text-yellow-800 dark:text-yellow-200',
        badge: 'from-yellow-400 to-orange-500',
        lines: 'bg-yellow-200/30 dark:bg-yellow-300/15',
        margin: 'bg-yellow-300/50 dark:bg-yellow-400/30',
        accentColor: 'yellow',
        accentColor2: 'orange',
        specialEffects: 'summer'
      };
    } else {
      // Default theme
      return {
        background: 'from-blue-50 via-slate-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900',
        cardBg: 'bg-white/95 dark:bg-gray-800/95',
        border: 'border-blue-200/30 dark:border-blue-700/30',
        accent: 'from-blue-500 to-indigo-600',
        text: 'text-slate-800 dark:text-white',
        badge: 'from-yellow-400 via-orange-500 to-red-500',
        lines: 'bg-blue-200/30 dark:bg-blue-300/15',
        margin: 'bg-red-300/50 dark:bg-red-400/30',
        accentColor: 'blue',
        accentColor2: 'indigo',
        specialEffects: 'default'
      };
    }
  };

  const themeColors = getThemeColors();

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('el-GR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${themeColors.background} flex items-center justify-center`}>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <Tag className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg font-medium">
            Φόρτωση άρθρων...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeColors.background}`}>
      {/* Breadcrumb Navigation */}
      <div className="pt-20 pb-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SchoolBreadcrumb 
            items={[
              { label: 'Αρχική', href: '/' },
              { label: 'Άρθρα', href: '/articles' },
              { label: `Tag: ${tag}` }
            ]}
          />
        </div>
      </div>

      {/* Notebook Hero Section */}
      <NotebookHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tag Header Section - SCHOOL STYLED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          {/* School Notebook Paper Background */}
          <div className={`relative ${themeColors.cardBg} backdrop-blur-xl rounded-2xl shadow-xl border-2 ${themeColors.border} overflow-hidden`}>
            {/* Notebook Lines Background */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Horizontal lines */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className={`absolute w-full h-px ${
                    isDarkMode ? themeColors.lines.replace('/30', '/15') : themeColors.lines
                  }`}
                  style={{
                    top: `${20 + i * 6}%`,
                    left: '8%',
                    right: '4%'
                  }}
                />
              ))}
              
              {/* Red margin line */}
              <div className={`absolute left-8 top-0 bottom-0 w-px ${
                isDarkMode ? themeColors.margin.replace('/50', '/30') : themeColors.margin
              }`}></div>
              
              {/* Holes for binder */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={`hole-${i}`}
                  className={`absolute w-1.5 h-1.5 rounded-full border ${
                    isDarkMode 
                      ? 'bg-gray-600/30 border-gray-500/50' 
                      : 'bg-blue-200/50 border-blue-300/70'
                  }`}
                  style={{
                    left: '4px',
                    top: `${25 + i * 18}%`
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 p-6">
              {/* School Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                {/* School Badge */}
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 bg-gradient-to-br ${themeColors.badge} rounded-full flex items-center justify-center shadow-lg border-2 border-white/30`}>
                    <Hash className="w-6 h-6 text-white" />
                  </div>
                  {/* Grade A+ Badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    <span className="text-white text-xs font-bold" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      A+
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h1 className={`text-2xl sm:text-3xl font-bold ${themeColors.text} mb-2 break-words`} style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    Άρθρα με Tag: <span className={`text-${themeColors.accentColor}-600 dark:text-${themeColors.accentColor}-400`}>#{tag}</span>
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    Βρέθηκαν {articles.length} άρθρα με αυτό το tag
                  </p>
                </div>

                {/* Back Button */}
                <div className="flex-shrink-0">
                  <Link href="/articles">
                    <motion.button
                      className={`group flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r ${themeColors.accent} text-white rounded-xl hover:from-${themeColors.accentColor}-600 hover:to-${themeColors.accentColor2}-700 transition-all duration-300 shadow-lg hover:shadow-xl w-auto`}
                      whileHover={{ scale: 1.05, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      <span className="font-semibold text-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                        Πίσω στα Άρθρα
                      </span>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05
              }}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <Link href={`/articles/${article.slug}`}>
                <div className={`relative ${themeColors.cardBg} backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border-2 ${themeColors.border} hover:border-${themeColors.accentColor}-300/50 dark:hover:border-${themeColors.accentColor}-600/50 group/card`}>
                  {/* School Notebook Lines Background */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Notebook lines */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`line-${i}`}
                        className={`absolute w-full h-px ${
                          isDarkMode ? themeColors.lines.replace('/30', '/15') : themeColors.lines
                        }`}
                        style={{
                          top: `${30 + i * 5}%`,
                          left: '15%',
                          right: '4%'
                        }}
                      />
                    ))}
                    
                    {/* Red margin line - moved more to the left */}
                    <div className={`absolute left-6 top-0 bottom-0 w-px ${
                      isDarkMode ? themeColors.margin.replace('/50', '/30') : themeColors.margin
                    }`}></div>
                    
                    {/* Holes for binder */}
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={`hole-${i}`}
                        className={`absolute w-1.5 h-1.5 rounded-full border ${
                          isDarkMode 
                            ? 'bg-gray-600/30 border-gray-500/50' 
                            : 'bg-blue-200/50 border-blue-300/70'
                        }`}
                        style={{
                          left: '4px',
                          top: `${35 + i * 15}%`
                        }}
                      />
                    ))}
                  </div>

                  {/* Grade Badge - Top Right */}
                  <motion.div
                    className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white/30 z-20"
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                  >
                    <span className="text-white text-xs font-bold" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      A+
                    </span>
                  </motion.div>

                  {/* Decorative Corner - School themed */}
                  <div className={`absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-${themeColors.accentColor}-400/15 to-${themeColors.accentColor2}-500/15 rounded-bl-2xl`} />
                  
                  {/* Theme Special Effects */}
                  {themeColors.specialEffects === 'halloween' && (
                    <>
                      {/* Floating Bats */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={`bat-${i}`}
                            className="absolute text-2xl opacity-20"
                            style={{
                              left: `${20 + i * 30}%`,
                              top: `${10 + i * 20}%`,
                            }}
                            animate={{
                              y: [0, -10, 0],
                              x: [0, 5, 0],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 3 + i,
                              repeat: Infinity,
                              delay: i * 0.5,
                            }}
                          >
                            🦇
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Spooky Shadows */}
                      <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                          className="absolute w-20 h-20 bg-black/10 rounded-full blur-xl"
                          style={{ left: '10%', top: '20%' }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.3, 0.1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                          }}
                        />
                        <motion.div
                          className="absolute w-16 h-16 bg-purple-900/20 rounded-full blur-lg"
                          style={{ right: '15%', bottom: '30%' }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.1, 0.4, 0.1],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            delay: 1,
                          }}
                        />
                      </div>
                    </>
                  )}
                  
                  {themeColors.specialEffects === 'christmas' && (
                    <>
                      {/* Floating Snowflakes */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={`snowflake-${i}`}
                            className="absolute text-lg opacity-30"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${-10 + Math.random() * 20}%`,
                            }}
                            animate={{
                              y: [0, 100],
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 8 + Math.random() * 4,
                              repeat: Infinity,
                              delay: Math.random() * 3,
                            }}
                          >
                            ❄️
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Christmas Lights */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={`light-${i}`}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                              left: `${10 + i * 12}%`,
                              top: `${5 + (i % 2) * 10}%`,
                              backgroundColor: i % 2 === 0 ? '#ef4444' : '#22c55e',
                            }}
                            animate={{
                              opacity: [0.3, 1, 0.3],
                              scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  {themeColors.specialEffects === 'easter' && (
                    <>
                      {/* Floating Easter Eggs */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={`egg-${i}`}
                            className="absolute text-xl opacity-40"
                            style={{
                              left: `${15 + i * 25}%`,
                              top: `${5 + i * 15}%`,
                            }}
                            animate={{
                              y: [0, -15, 0],
                              rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                              duration: 4 + i,
                              repeat: Infinity,
                              delay: i * 0.8,
                            }}
                          >
                            🥚
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Spring Flowers */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={`flower-${i}`}
                            className="absolute text-sm opacity-30"
                            style={{
                              left: `${5 + i * 20}%`,
                              bottom: `${10 + (i % 2) * 15}%`,
                            }}
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 3 + i * 0.5,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          >
                            🌸
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {themeColors.specialEffects === 'carnival' && (
                    <>
                      {/* Confetti */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={`confetti-${i}`}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${-5 + Math.random() * 10}%`,
                              backgroundColor: ['#ef4444', '#f59e0b', '#8b5cf6', '#ec4899'][i % 4],
                            }}
                            animate={{
                              y: [0, 120],
                              x: [0, Math.random() * 20 - 10],
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 3 + Math.random() * 2,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Masks */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={`mask-${i}`}
                            className="absolute text-lg opacity-20"
                            style={{
                              left: `${20 + i * 30}%`,
                              top: `${10 + i * 20}%`,
                            }}
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 4 + i,
                              repeat: Infinity,
                              delay: i * 0.5,
                            }}
                          >
                            🎭
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {themeColors.specialEffects === 'summer' && (
                    <>
                      {/* Sun Rays */}
                      <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                          className="absolute w-32 h-32 bg-yellow-200/20 rounded-full blur-xl"
                          style={{ left: '50%', top: '10%', transform: 'translateX(-50%)' }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                          }}
                        />
                      </div>
                      
                      {/* Beach Elements */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={`beach-${i}`}
                            className="absolute text-lg opacity-30"
                            style={{
                              left: `${10 + i * 25}%`,
                              bottom: `${5 + (i % 2) * 10}%`,
                            }}
                            animate={{
                              y: [0, -8, 0],
                              rotate: [0, 3, -3, 0],
                            }}
                            transition={{
                              duration: 4 + i * 0.5,
                              repeat: Infinity,
                              delay: i * 0.6,
                            }}
                          >
                            {i % 2 === 0 ? '🏖️' : '☀️'}
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Tropical Leaves */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={`leaf-${i}`}
                            className="absolute text-sm opacity-25"
                            style={{
                              right: `${5 + i * 15}%`,
                              top: `${15 + i * 20}%`,
                            }}
                            animate={{
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 5 + i,
                              repeat: Infinity,
                              delay: i * 0.8,
                            }}
                          >
                            🍃
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {/* Article Image - School themed */}
                  {article.image ? (
                    <div className="relative aspect-[4/1] w-full overflow-hidden rounded-t-2xl">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      
                      {/* School-themed floating badges */}
                      <motion.div
                        className="absolute top-4 right-4 flex gap-2"
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {article.featured && (
                          <motion.div 
                            className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl border-2 border-white/20"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <Star className="w-5 h-5 text-white" />
                          </motion.div>
                        )}
                        {article.breaking && (
                          <motion.div 
                            className="w-10 h-10 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full flex items-center justify-center shadow-xl border-2 border-white/20"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Zap className="w-5 h-5 text-white" />
                          </motion.div>
                        )}
                      </motion.div>

                      {/* School stamp effect */}
                      <div className="absolute bottom-2 left-2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-300/50">
                        <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  ) : (
                    <div className={`aspect-[4/1] w-full bg-gradient-to-br from-${themeColors.accentColor}-100 to-${themeColors.accentColor2}-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 flex items-center justify-center rounded-t-2xl relative overflow-hidden`}>
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-20">
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1.5 h-1.5 bg-${themeColors.accentColor}-400 rounded-full`}
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                            }}
                          />
                        ))}
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="relative z-10"
                      >
                        <div className={`w-16 h-16 bg-gradient-to-br ${themeColors.accent} rounded-full flex items-center justify-center shadow-xl`}>
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Article Content - School themed */}
                  <div className="p-3 pl-10 relative z-10">
                    {/* Category Badge - School themed */}
                    <div className="mb-3">
                      <motion.span 
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-${themeColors.accentColor}-100 to-${themeColors.accentColor2}-100 dark:from-${themeColors.accentColor}-900/30 dark:to-${themeColors.accentColor2}-900/30 text-${themeColors.accentColor}-700 dark:text-${themeColors.accentColor}-300 text-xs font-semibold rounded-full border-2 border-${themeColors.accentColor}-300/50 dark:border-${themeColors.accentColor}-700/50 shadow-lg`}
                        whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
                        transition={{ duration: 0.3 }}
                        style={{ fontFamily: 'StampatelloFaceto, cursive' }}
                      >
                        <GraduationCap className="w-3 h-3" />
                        {article.category}
                      </motion.span>
                    </div>

                    {/* Title - With school font */}
                    <h3 className={`text-base font-bold ${themeColors.text} mb-2 line-clamp-2 group-hover/card:text-${themeColors.accentColor}-600 dark:group-hover/card:text-${themeColors.accentColor}-400 transition-colors duration-300 leading-tight`} style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {article.title}
                    </h3>

                    {/* Excerpt - With school font */}
                    <p className="text-slate-600 dark:text-slate-300 mb-2 line-clamp-2 leading-relaxed text-xs" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {article.excerpt}
                    </p>

                    {/* Meta Info - School themed */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                      <motion.div 
                        className={`flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-${themeColors.accentColor}-100 to-${themeColors.accentColor2}-100 dark:from-${themeColors.accentColor}-900/30 dark:to-${themeColors.accentColor2}-900/30 rounded-full border-2 border-${themeColors.accentColor}-200/50 dark:border-${themeColors.accentColor}-700/50 shadow-md`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Calendar className={`w-3 h-3 text-${themeColors.accentColor}-600 dark:text-${themeColors.accentColor}-400`} />
                        <span className="font-medium text-xs" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{formatDate(article.date)}</span>
                      </motion.div>
                    </div>

                    {/* Tags - School themed */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 2).map((articleTag, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            className={`px-2 py-0.5 text-xs rounded-full border-2 shadow-sm cursor-pointer ${
                              articleTag.toLowerCase() === tag.toLowerCase()
                                ? 'bg-gradient-to-r from-blue-100 to-slate-100 dark:from-blue-900/30 dark:to-slate-900/30 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-700/50'
                                : 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 border-green-200/50 dark:border-green-700/50'
                            }`}
                            whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
                            transition={{ duration: 0.2 }}
                            style={{ fontFamily: 'StampatelloFaceto, cursive' }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('Tag clicked:', articleTag);
                              window.location.href = `/tags/${encodeURIComponent(articleTag)}`;
                            }}
                          >
                            {articleTag}
                          </motion.span>
                        ))}
                        {article.tags.length > 2 && (
                          <motion.span 
                            className="px-2 py-0.5 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 text-rose-700 dark:text-rose-300 text-xs rounded-full border-2 border-rose-200/50 dark:border-rose-700/50 shadow-sm"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                            style={{ fontFamily: 'StampatelloFaceto, cursive' }}
                          >
                            +{article.tags.length - 2}
                          </motion.span>
                        )}
                      </div>
                    )}

                    {/* Read More Indicator - School themed */}
                    <motion.div
                      className="absolute bottom-3 right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1.1, rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.3 }}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                    >
                      <PenTool className="w-4 h-4 text-white" />
                    </motion.div>

                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-center py-16"
          >
            <div className="relative mb-8">
              <motion.div
                className={`w-32 h-32 bg-gradient-to-br from-${themeColors.accentColor}-100 to-${themeColors.accentColor2}-200 dark:from-${themeColors.accentColor}-900/30 dark:to-${themeColors.accentColor2}-900/30 rounded-full flex items-center justify-center mx-auto shadow-xl`}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Hash className={`w-16 h-16 text-${themeColors.accentColor}-600 dark:text-${themeColors.accentColor}-400`} />
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
            </div>
            <motion.h3 
              className={`text-2xl font-bold ${themeColors.text} mb-4`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Δεν βρέθηκαν άρθρα με αυτό το tag
            </motion.h3>
            <motion.p 
              className="text-slate-600 dark:text-slate-300 text-lg max-w-md mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Δεν υπάρχουν άρθρα με το tag <span className={`font-semibold text-${themeColors.accentColor}-600 dark:text-${themeColors.accentColor}-400`}>#{tag}</span>
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link href="/articles">
                <button 
                  className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${themeColors.accent} text-white rounded-xl hover:from-${themeColors.accentColor}-600 hover:to-${themeColors.accentColor2}-700 transition-colors duration-200 shadow-lg font-medium`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Επιστροφή στα Άρθρα
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
