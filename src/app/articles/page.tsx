"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Tag, Star, Zap, BookOpen, GraduationCap, Sparkles, Heart, ArrowRight, PenTool, Filter, X, Globe } from 'lucide-react';
import { getArticles, getArticlesByCategory } from '@/lib/firebase-articles';
import type { Article } from '@/lib/types';
import NotebookHero from '@/components/NotebookHero';
import SchoolBreadcrumb from '@/components/SchoolBreadcrumb';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Metadata } from 'next';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();

  // Define available categories with translations
  const categories = [
    { value: 'all', label: t('articles.categories.all'), icon: BookOpen, color: 'from-blue-500 to-indigo-600' },
    { value: 'Εκπαίδευση', label: t('articles.categories.education'), icon: GraduationCap, color: 'from-green-500 to-emerald-600' },
    { value: 'Νέα', label: t('articles.categories.news'), icon: Star, color: 'from-yellow-500 to-orange-600' },
    { value: 'Δράσεις', label: t('articles.categories.actions'), icon: Zap, color: 'from-purple-500 to-pink-600' },
    { value: 'Αγγλικά', label: t('articles.categories.english'), icon: Globe, color: 'from-red-500 to-rose-600' },
    { value: 'Γαλλικά', label: t('articles.categories.french'), icon: Heart, color: 'from-indigo-500 to-blue-600' },
    { value: 'Γλώσσες', label: t('articles.categories.languages'), icon: Tag, color: 'from-teal-500 to-cyan-600' },
  ];

  useEffect(() => {
    loadArticles();
  }, [selectedCategory]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      let fetchedArticles: Article[];
      
      if (selectedCategory === 'all') {
        const result = await getArticles(20);
        fetchedArticles = result.articles;
      } else {
        try {
          const result = await getArticlesByCategory(selectedCategory, 20);
          fetchedArticles = result.articles;
          setCategoryError(null); // Clear any previous errors
        } catch (categoryError) {
          console.warn(`Error loading articles for category "${selectedCategory}", falling back to all articles:`, categoryError);
          setCategoryError(`Χρησιμοποιείται εναλλακτική μέθοδος φιλτραρίσματος για την κατηγορία "${selectedCategory}"`);
          // Fallback to all articles if category query fails
          const result = await getArticles(20);
          fetchedArticles = result.articles.filter(article => 
            article.category.toLowerCase() === selectedCategory.toLowerCase()
          );
        }
      }
      
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error loading articles:', error);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg font-medium">
            {t('articles.loading')}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Breadcrumb Navigation */}
      <div className="pt-20 pb-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SchoolBreadcrumb 
            items={[
              { label: t('breadcrumbs.home') as string, href: '/' },
              { label: t('breadcrumbs.articles') as string }
            ]}
          />
        </div>
      </div>

      {/* Notebook Hero Section */}
      <NotebookHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Filter Section - SCHOOL STYLED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          {/* School Notebook Paper Background */}
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
            {/* Notebook Lines Background */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Horizontal lines */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className={`absolute w-full h-px ${
                    isDarkMode ? 'bg-blue-300/15' : 'bg-blue-200/30'
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
                isDarkMode ? 'bg-red-400/30' : 'bg-red-300/50'
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
            <div className="relative z-10 p-4">
              {/* School Header */}
              <div className="flex items-center gap-3 mb-4">
                {/* School Badge */}
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  {/* Grade A+ Badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    <span className="text-white text-xs font-bold" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      A+
                    </span>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    {t('articles.filters.title')}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    {t('articles.filters.category')}
                  </p>
                </div>
              </div>
            
              {/* School-Style Category Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.value;
                  
                  return (
                    <motion.button
                      key={category.value}
                      onClick={() => {
                        setSelectedCategory(category.value);
                        setCategoryError(null);
                      }}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group relative overflow-hidden transition-all duration-300 ${
                        isSelected
                          ? 'transform rotate-1'
                          : 'hover:rotate-1'
                      }`}
                    >
                      {/* School Notebook Card */}
                      <div className={`relative p-2 rounded-lg border-2 transition-all duration-300 ${
                        isSelected
                          ? `bg-gradient-to-br ${category.color} text-white border-transparent shadow-xl`
                          : 'bg-white/90 dark:bg-gray-700/90 text-slate-700 dark:text-slate-300 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-lg'
                      }`}>
                        
                        {/* Notebook Lines on Card */}
                        <div className="absolute inset-0 pointer-events-none">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={`card-line-${i}`}
                              className={`absolute w-full h-px ${
                                isSelected 
                                  ? 'bg-white/20' 
                                  : isDarkMode ? 'bg-blue-300/10' : 'bg-blue-200/20'
                              }`}
                              style={{
                                top: `${30 + i * 15}%`,
                                left: '10%',
                                right: '5%'
                              }}
                            />
                          ))}
                          
                          {/* Red margin line on card */}
                          <div className={`absolute left-3 top-0 bottom-0 w-px ${
                            isSelected 
                              ? 'bg-white/30' 
                              : isDarkMode ? 'bg-red-400/20' : 'bg-red-300/30'
                          }`}></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center gap-1">
                          {/* Icon with school decoration */}
                          <div className={`relative w-6 h-6 rounded-full flex items-center justify-center ${
                            isSelected 
                              ? 'bg-white/20' 
                              : 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30'
                          }`}>
                            <Icon className={`w-3 h-3 ${
                              isSelected 
                                ? 'text-white' 
                                : 'text-blue-600 dark:text-blue-400'
                            }`} />
                            
                            {/* School decoration */}
                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full flex items-center justify-center"
                              >
                                <Star className="w-1.5 h-1.5 text-white" />
                              </motion.div>
                            )}
                          </div>
                          
                          {/* Category Label */}
                          <span className={`font-bold text-xs text-center leading-tight ${
                            isSelected ? 'text-white' : 'text-slate-700 dark:text-slate-300'
                          }`} style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                            {category.label}
                          </span>
                          
                          {/* Selection indicator */}
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-1 text-xs"
                            >
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                              <span className="text-xs">Επιλεγμένο</span>
                            </motion.div>
                          )}
                        </div>

                        {/* School corner decoration */}
                        <div className={`absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 ${
                          isSelected 
                            ? 'border-white/50' 
                            : 'border-blue-300/50 dark:border-blue-600/50'
                        } rounded-tr-lg`}></div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            
              {selectedCategory !== 'all' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600"
                >
                  {/* School Status Card */}
                  <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 border-2 border-blue-200/50 dark:border-blue-700/50">
                    {/* School decoration */}
                    <div className="absolute top-1 right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Star className="w-2.5 h-2.5 text-white" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Filter className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-600 dark:text-slate-400" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                          Εμφανίζονται άρθρα από την κατηγορία:
                        </p>
                        <span className="font-bold text-blue-600 dark:text-blue-400 text-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                          {categories.find(c => c.value === selectedCategory)?.label}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setCategoryError(null);
                        }}
                        className="px-2 py-1 bg-white/80 dark:bg-gray-700/80 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                      >
                        <X className="w-3 h-3 text-slate-600 dark:text-slate-400" />
                      </button>
                    </div>
                    
                    {categoryError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
                      >
                        <div className="flex items-center gap-2 text-xs text-yellow-700 dark:text-yellow-300">
                          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                          <span style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{categoryError}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
        {/* Simplified Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-10"
            style={{ 
              backgroundColor: isDarkMode ? '#4a6fa5' : '#81a1d4'
            }}
          />
          <div
            className="absolute top-40 right-20 w-40 h-40 rounded-full blur-3xl opacity-8"
            style={{ 
              backgroundColor: isDarkMode ? '#fabeb6' : '#f78da7'
            }}
          />
        </div>

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
                <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border-2 border-blue-200/30 dark:border-blue-700/30 hover:border-blue-300/50 dark:hover:border-blue-600/50 group/card">
                  {/* School Notebook Lines Background */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Notebook lines */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`line-${i}`}
                        className={`absolute w-full h-px ${
                          isDarkMode ? 'bg-blue-300/15' : 'bg-blue-200/30'
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
                      isDarkMode ? 'bg-red-400/30' : 'bg-red-300/50'
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
                  <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400/15 to-orange-500/15 rounded-bl-2xl" />
                  
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
                            className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl border-2 border-white/20"
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
                    <div className="aspect-[4/1] w-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 flex items-center justify-center rounded-t-2xl relative overflow-hidden">
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-20">
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
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
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl">
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-semibold rounded-full border-2 border-yellow-300/50 dark:border-yellow-700/50 shadow-lg"
                        whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
                        transition={{ duration: 0.3 }}
                        style={{ fontFamily: 'StampatelloFaceto, cursive' }}
                      >
                        <GraduationCap className="w-3 h-3" />
                        {article.category}
                      </motion.span>
                    </div>

                    {/* Title - With school font */}
                    <h3 className="text-base font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors duration-300 leading-tight" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {article.title}
                    </h3>

                    {/* Excerpt - With school font */}
                    <p className="text-slate-600 dark:text-slate-300 mb-2 line-clamp-2 leading-relaxed text-xs" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {article.excerpt}
                    </p>

                    {/* Meta Info - School themed */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                      <motion.div 
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full border-2 border-blue-200/50 dark:border-blue-700/50 shadow-md"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-xs" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{formatDate(article.date)}</span>
                      </motion.div>
                    </div>

                    {/* Tags - School themed */}
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
                                router.push(`/tags/${encodeURIComponent(tag)}`);
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
