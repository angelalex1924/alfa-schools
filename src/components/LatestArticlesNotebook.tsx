"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Tag, Star, Zap, BookOpen, GraduationCap, Sparkles, PenTool, ArrowRight } from 'lucide-react';
import { getArticles } from '@/lib/firebase-articles';
import type { Article } from '@/lib/types';
import { useTheme } from '@/contexts/ThemeContext';

export default function LatestArticlesNotebook() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    loadLatestArticles();
  }, []);

  const loadLatestArticles = async () => {
    try {
      setLoading(true);
      const { articles: fetchedArticles } = await getArticles(6); // Get latest 6 articles
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error loading latest articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-lg font-medium">
                Φόρτωση άρθρων...
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (articles.length === 0) {
    return null; // Don't show the section if no articles
  }

  return (
    <section className="relative z-10 py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-6">
        {/* School Notebook Paper Background */}
        <div className="relative bg-white/98 dark:bg-gray-800/98 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-blue-200/40 dark:border-blue-700/40 overflow-hidden">
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          {/* Notebook Lines Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Horizontal lines - more authentic notebook spacing */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`line-${i}`}
                className={`absolute w-full h-px ${
                  isDarkMode ? 'bg-blue-300/20' : 'bg-blue-200/40'
                }`}
                style={{
                  top: `${8 + i * 6.5}%`,
                  left: '10%',
                  right: '6%'
                }}
              />
            ))}
            
            {/* Red margin line - more prominent */}
            <div className={`absolute left-10 top-0 bottom-0 w-0.5 ${
              isDarkMode ? 'bg-red-400/40' : 'bg-red-300/60'
            }`}></div>
            
            {/* Spiral binding holes - more realistic */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`hole-${i}`}
                className={`absolute w-2 h-2 rounded-full border-2 ${
                  isDarkMode 
                    ? 'bg-gray-600/40 border-gray-500/60' 
                    : 'bg-white/80 border-blue-300/80'
                }`}
                style={{
                  left: '6px',
                  top: `${12 + i * 14}%`
                }}
              />
            ))}
            
            {/* Spiral binding effect */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              isDarkMode ? 'bg-gray-500/30' : 'bg-blue-300/40'
            }`}></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-4 lg:p-6">
            {/* School Header - Enhanced */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/40 relative">
                  <span className="text-white font-bold text-base drop-shadow-sm">📰</span>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-500/20 rounded-full blur-sm"></div>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-white leading-tight" style={{ 
                  fontFamily: 'StampatelloFaceto, cursive',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  letterSpacing: '0.025em'
                }}>
                  Τελευταία Άρθρα
                </h2>
              </div>
              {/* Decorative underline */}
              <div className="w-24 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full"></div>
            </div>

            {/* Articles Feed - Enhanced */}
            <div className="space-y-4">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.08,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -2,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="group relative"
                >
                  <Link href={`/articles/${article.slug}`}>
                    <div className="relative bg-gradient-to-r from-white/95 to-slate-50/95 dark:from-gray-700/95 dark:to-gray-600/95 backdrop-blur-sm rounded-xl p-5 transition-all duration-300 hover:shadow-xl border border-blue-200/50 dark:border-blue-700/50 overflow-hidden shadow-md hover:shadow-lg hover:border-blue-300/60 dark:hover:border-blue-600/60">
                      {/* Paper texture on card */}
                      <div className="absolute inset-0 opacity-3 dark:opacity-5 pointer-events-none">
                        <div className="w-full h-full" style={{
                          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
                          backgroundSize: '15px 15px'
                        }}></div>
                      </div>
                      
                      {/* School Notebook Lines on Card */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={`card-line-${i}`}
                            className={`absolute w-full h-px ${
                              isDarkMode ? 'bg-blue-300/15' : 'bg-blue-200/25'
                            }`}
                            style={{
                              top: `${35 + i * 15}%`,
                              left: '18%',
                              right: '8%'
                            }}
                          />
                        ))}
                        
                        {/* Red margin line - more prominent */}
                        <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
                          isDarkMode ? 'bg-red-400/25' : 'bg-red-300/35'
                        }`}></div>
                        
                        {/* Small hole punch on card */}
                        <div className={`absolute w-1.5 h-1.5 rounded-full border ${
                          isDarkMode 
                            ? 'bg-gray-600/30 border-gray-500/50' 
                            : 'bg-white/60 border-blue-300/60'
                        }`}
                        style={{
                          left: '6px',
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}></div>
                      </div>

                      {/* Content - Feed Style Layout */}
                      <div className="relative z-10">
                        {/* Header Row */}
                        <div className="flex items-center gap-3 mb-3">
                          {/* Grade Badge - Enhanced */}
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 relative">
                              <span className="text-white text-sm font-bold drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                                A+
                              </span>
                              {/* Subtle glow effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-sm"></div>
                            </div>
                          </div>
                          
                          {/* Article Meta Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              {/* Category Badge */}
                              <motion.span 
                                className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-semibold rounded-full border border-yellow-300/50 dark:border-yellow-700/50 shadow-sm"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                                style={{ fontFamily: 'StampatelloFaceto, cursive' }}
                              >
                                <GraduationCap className="w-3 h-3" />
                                {article.category}
                              </motion.span>
                              
                              {/* Date */}
                              <motion.div 
                                className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Calendar className="w-3 h-3" />
                                <span className="font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{formatDate(article.date)}</span>
                              </motion.div>
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="flex-shrink-0">
                            <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                        
                        {/* Title - Smaller Size */}
                        <div className="ml-11">
                          <h3 className="text-sm font-bold text-slate-800 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-relaxed mb-2" style={{ 
                            fontFamily: 'StampatelloFaceto, cursive',
                            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                            letterSpacing: '0.025em'
                          }}>
                            {article.title}
                          </h3>
                          
                          {/* Tags Section - Same styling as /articles and /tags pages */}
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {article.tags.slice(0, 2).map((tag, tagIndex) => (
                                <motion.div
                                  key={tagIndex}
                                  whileHover={{ scale: 1.05, rotate: 2 }}
                                  whileTap={{ scale: 0.95 }}
                                  transition={{ duration: 0.2 }}
                                  className="inline-block relative z-50"
                                >
                                  <span
                                    className="px-2 py-0.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 text-xs rounded-full border-2 border-green-200/50 dark:border-green-700/50 shadow-sm cursor-pointer hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-800/40 dark:hover:to-emerald-800/40 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 inline-block relative z-50"
                                    style={{ fontFamily: 'StampatelloFaceto, cursive' }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      console.log('Tag clicked:', tag);
                                      window.location.href = `/tags/${encodeURIComponent(tag)}`;
                                    }}
                                  >
                                    #{tag}
                                  </span>
                                </motion.div>
                              ))}
                              {article.tags.length > 2 && (
                                <motion.span 
                                  className="px-2 py-0.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full border-2 border-purple-200/50 dark:border-purple-700/50 shadow-sm"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                  style={{ fontFamily: 'StampatelloFaceto, cursive' }}
                                >
                                  +{article.tags.length - 2}
                                </motion.span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Feed-like corner decoration */}
                      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-blue-300/60 dark:border-blue-600/60 rounded-tr"></div>
                      
                      {/* Subtle feed indicator */}
                      <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-400/30 dark:bg-blue-500/30 rounded-full"></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View All Articles Button - Enhanced */}
            <div className="text-center mt-8">
              <Link href="/articles">
                <motion.button
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl mx-auto text-sm border border-blue-400/30 relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                      backgroundSize: '8px 8px'
                    }}></div>
                  </div>
                  
                  <BookOpen className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                  <span className="font-semibold relative z-10" style={{ 
                    fontFamily: 'StampatelloFaceto, cursive',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                  }}>
                    Όλα τα Άρθρα
                  </span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
