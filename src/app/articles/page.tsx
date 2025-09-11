"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Tag, Star, Zap, BookOpen, GraduationCap, Sparkles, Heart, ArrowRight, PenTool } from 'lucide-react';
import { getArticles } from '@/lib/firebase-articles';
import type { Article } from '@/lib/types';
import NotebookHero from '@/components/NotebookHero';
import { useTheme } from '@/contexts/ThemeContext';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { articles: fetchedArticles } = await getArticles(20);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error loading articles:', error);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-6">
            <motion.div
              className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <BookOpen className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
          </div>
          <motion.p 
            className="text-slate-600 dark:text-slate-300 text-lg font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Φόρτωση άρθρων...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Notebook Hero Section */}
      <NotebookHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl"
            style={{ 
              backgroundColor: isDarkMode ? '#4a6fa5' : '#81a1d4',
              opacity: isDarkMode ? 0.1 : 0.15
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: isDarkMode ? [0.05, 0.1, 0.05] : [0.1, 0.15, 0.1],
              x: [0, 20, 0],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-40 h-40 rounded-full blur-3xl"
            style={{ 
              backgroundColor: isDarkMode ? '#fabeb6' : '#f78da7',
              opacity: isDarkMode ? 0.08 : 0.12
            }}
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: isDarkMode ? [0.05, 0.08, 0.05] : [0.08, 0.12, 0.08],
              x: [0, -15, 0],
              y: [0, 15, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Articles Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <Link href={`/articles/${article.slug}`}>
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 dark:border-gray-700/20">
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-bl-3xl" />
                  
                  {/* Article Image */}
                  {article.image ? (
                    <div className="relative aspect-video w-full overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {/* Floating Icons */}
                      <motion.div
                        className="absolute top-4 right-4 flex gap-2"
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {article.featured && (
                          <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {article.breaking && (
                          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                            <Zap className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </motion.div>
                    </div>
                  ) : (
                    <div className="aspect-video w-full bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <BookOpen className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                      </motion.div>
                    </div>
                  )}

                  {/* Article Content */}
                  <div className="p-6 relative">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <motion.span 
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full border border-blue-200/50 dark:border-blue-700/50"
                        whileHover={{ scale: 1.05 }}
                      >
                        <GraduationCap className="w-4 h-4" />
                        {article.category}
                      </motion.span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Meta Info - Only Date */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-gray-700 rounded-full">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{formatDate(article.date)}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 3).map((tag, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            className="px-3 py-1 bg-gradient-to-r from-slate-100 to-gray-100 dark:from-gray-700 dark:to-gray-600 text-slate-600 dark:text-slate-300 text-xs rounded-full border border-slate-200/50 dark:border-gray-600/50"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-600 dark:to-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full border border-gray-200/50 dark:border-gray-600/50">
                            +{article.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Read More Indicator */}
                    <motion.div
                      className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className="w-5 h-5 text-white" />
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
                className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mx-auto shadow-xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <BookOpen className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
            </div>
            <motion.h3 
              className="text-2xl font-bold text-slate-800 dark:text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Δεν υπάρχουν άρθρα ακόμα
            </motion.h3>
            <motion.p 
              className="text-slate-600 dark:text-slate-300 text-lg max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Επιστρέψτε αργότερα για να ανακαλύψετε νέα άρθρα και ενημερώσεις από το εκπαιδευτικό μας σύστημα
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
