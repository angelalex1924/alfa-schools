"use client"

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Tag, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  ArrowLeft, 
  Share2, 
  Heart, 
  Star,
  Zap,
  ChevronRight,
  BookmarkPlus,
  MessageCircle,
  Clock,
  Eye,
  User,
  PenTool,
  Award,
  Lightbulb,
  Flame,
  Brain,
  AlertTriangle,
  BadgeInfo,
  Pencil,
  Ruler,
  Calculator,
  BookMarked,
  School
} from 'lucide-react';
import { getArticleBySlug, incrementViewCount } from '@/lib/firebase-articles';
import type { Article } from '@/lib/types';
import { useTheme } from '@/contexts/ThemeContext';
import SchoolBreadcrumb from '@/components/SchoolBreadcrumb';
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/rich-text-editor.css';

// Declare global types for social media APIs
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
    FB?: {
      XFBML: {
        parse: (element?: HTMLElement) => void
      }
    }
    tiktok?: {
      loadEmbedScript: () => void
    }
  }
}


export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device to reduce animations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, []);

  useEffect(() => {
    if (slug) {
      loadArticle();
    }
  }, [slug]);

  // Function to process social media embeds
  const processSocialEmbeds = useCallback(() => {
    // Process Instagram embeds
    if (document.querySelector(".instagram-media")) {
      console.log("Processing Instagram embeds")
      
      // Remove existing Instagram scripts to force reload
      const existingScripts = document.querySelectorAll('script[src*="instagram.com/embed.js"]')
      existingScripts.forEach(script => script.remove())
      
      // Load Instagram SDK
      const script = document.createElement("script")
      script.id = "instagram-embed-script"
      script.async = true
      script.src = "//www.instagram.com/embed.js"
      script.onload = () => {
        console.log("Instagram script loaded")
        // Multiple processing attempts
        setTimeout(() => {
          if (window.instgrm) {
            window.instgrm.Embeds.process()
            console.log("Instagram embeds processed")
          }
        }, 100)
        setTimeout(() => {
          if (window.instgrm) {
            window.instgrm.Embeds.process()
            console.log("Instagram embeds processed again")
          }
        }, 1000)
      }
      document.body.appendChild(script)
    }

    // Process Facebook embeds with fallback for mobile
    if (document.querySelector(".fb-post, .fb-video, .fb-page")) {
      console.log("Processing Facebook embeds")
      const isMobile = window.innerWidth <= 768
      
      if (isMobile) {
        // For mobile, show a link instead of iframe
        const fbEmbeds = document.querySelectorAll('.fb-post, .fb-video, .fb-page')
        fbEmbeds.forEach(embed => {
          const iframe = embed.querySelector('iframe')
          if (iframe) {
            const src = iframe.src
            if (src && src.includes('facebook.com')) {
              // Create a mobile-friendly link
              const linkContainer = document.createElement('div')
              linkContainer.style.cssText = `
                width: 100%;
                padding: 20px;
                background: #f0f0f0;
                border-radius: 8px;
                text-align: center;
                margin: 10px 0;
              `
              linkContainer.innerHTML = `
                <p style="margin: 0 0 10px 0; color: #666;">Facebook Post</p>
                <a href="${src}" target="_blank" style="
                  display: inline-block;
                  padding: 10px 20px;
                  background: #1877f2;
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
                ">View on Facebook</a>
              `
              embed.parentNode?.replaceChild(linkContainer, embed)
            }
          }
        })
      } else {
        // For desktop, use normal Facebook SDK
        if (window.FB) {
          window.FB.XFBML.parse()
        } else {
          // Load Facebook SDK if not already loaded
          if (!document.getElementById("facebook-jssdk")) {
            const script = document.createElement("script")
            script.id = "facebook-jssdk"
            script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v16.0"
            script.async = true
            script.defer = true
            script.crossOrigin = "anonymous"
            script.onload = () => {
              if (window.FB) window.FB.XFBML.parse()
            }
            document.body.appendChild(script)
          }
        }
      }
    }

    // Process TikTok embeds
    if (document.querySelector('blockquote[cite*="tiktok.com"]')) {
      console.log("Processing TikTok embeds")

      // Αφαιρούμε τυχόν υπάρχοντα TikTok scripts για να αναγκάσουμε επαναφόρτωση
      const oldScript = document.getElementById("tiktok-embed-script")
      if (oldScript) {
        oldScript.remove()
      }

      // Προσθέτουμε το TikTok embed script με βελτιωμένο χειρισμό
      const script = document.createElement("script")
      script.id = "tiktok-embed-script"
      script.src = "https://www.tiktok.com/embed.js"
      script.async = true

      // Προσθέτουμε event listener για να επιβεβαιώσουμε τη φόρτωση
      script.onload = () => {
        console.log("TikTok script loaded successfully")

        // Προσθέτουμε μια επιπλέον προσπάθεια επεξεργασίας μετά τη φόρτωση
        setTimeout(() => {
          // Προσθέτουμε ξανά το script για να ενεργοποιήσουμε την επεξεργασία των embeds
          const refreshScript = document.createElement("script")
          refreshScript.async = true
          refreshScript.src = "https://www.tiktok.com/embed.js"
          document.body.appendChild(refreshScript)
        }, 1000)
      }

      // Χειρισμός σφαλμάτων φόρτωσης
      script.onerror = () => {
        console.error("Failed to load TikTok embed script")
        // Προσπαθούμε ξανά με εναλλακτικό URL
        const retryScript = document.createElement("script")
        retryScript.id = "tiktok-embed-script-retry"
        retryScript.async = true
        retryScript.src = "https://sf16-scmcdn-va.ibytedtos.com/goofy/tiktok/web/embed/embed_lib.js"
        document.body.appendChild(retryScript)
      }

      document.body.appendChild(script)
    }
  }, []);

  // Process embeds when article content changes
  useEffect(() => {
    if (article && article.content) {
      // Check if content has social media embeds or raw HTML containers
      if (
        article.content.includes("instagram-media") ||
        article.content.includes("fb-post") ||
        article.content.includes("fb-video") ||
        article.content.includes("fb-page") ||
        article.content.includes("tiktok.com") ||
        article.content.includes("raw-html-container")
      ) {
        // Αρχική επεξεργασία με μεγαλύτερες καθυστερήσεις
        setTimeout(() => {
          processSocialEmbeds()
        }, 500)
        
        // Πολλαπλές προσπάθειες με αυξανόμενες καθυστερήσεις
        setTimeout(processSocialEmbeds, 1500)
        setTimeout(processSocialEmbeds, 3000)
        setTimeout(processSocialEmbeds, 5000)
        setTimeout(processSocialEmbeds, 8000)
      }
    }
  }, [article, processSocialEmbeds]);

  // Add mobile viewport meta tag for better mobile rendering
  useEffect(() => {
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    if (!viewportMeta) {
      const meta = document.createElement('meta')
      meta.name = 'viewport'
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      document.head.appendChild(meta)
    }
  }, [])

  // Add CSS for embeds and lists
  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      .raw-html-container {
        display: block;
        width: 100%;
        margin: 1em 0;
        padding: 0.5em;
        text-align: center;
        position: relative;
        min-height: 100px;
        overflow: visible;
      }
      .raw-html-content {
        min-height: 24px;
        width: 100%;
        overflow: visible;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .raw-html-content iframe {
        max-width: 100%;
        min-width: 250px;
        width: 100%;
        height: auto;
        min-height: 400px;
      }
      .raw-html-content iframe[src*="facebook.com"] {
        border: 1px solid #ddd;
        border-radius: 8px;
      }
      /* Mobile-specific fixes for Facebook embeds */
      @media (max-width: 768px) {
        .raw-html-content iframe {
          min-width: 100%;
          width: 100%;
          min-height: 300px;
          max-height: 600px;
        }
        .raw-html-container {
          padding: 0.25em;
          margin: 0.5em 0;
        }
      }
      .raw-html-container::before {
        content: 'HTML';
        position: absolute;
        top: -10px;
        left: 10px;
        background: #f0f0f0;
        padding: 0 5px;
        font-size: 10px;
        color: #666;
        border-radius: 3px;
        z-index: 1;
      }
      /* Fix for lists in article content */
      .prose ul {
        list-style: none;
        padding-left: 0;
        margin: 0.5em 0;
      }
      .prose ol {
        list-style: none;
        padding-left: 0;
        margin: 0.5em 0;
        counter-reset: list-counter;
      }
      .prose li {
        margin: 0.25em 0;
        padding-left: 1.5em;
        position: relative;
        min-height: 1.5em;
      }
      .prose ul li::before {
        content: "•";
        position: absolute;
        left: 0;
        top: 0;
        width: 1.5em;
        text-align: center;
        color: #000;
        font-weight: bold;
      }
      .prose ol li::before {
        content: counter(list-counter) ".";
        counter-increment: list-counter;
        position: absolute;
        left: 0;
        top: 0;
        width: 1.5em;
        text-align: center;
        color: #000;
        font-weight: bold;
      }
      .prose li p {
        margin: 0;
        padding: 0;
        display: block;
        line-height: 1.5;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, []);

  // Function to process raw HTML content for display
  const processContentForDisplay = useCallback((content: string) => {
    // Find all raw HTML containers and extract their content
    const processedContent = content.replace(
      /<div[^>]*data-type="raw-html"[^>]*data-html-content="([^"]*)"[^>]*>[\s\S]*?<\/div>/g,
      (match, htmlContent) => {
        // Decode HTML entities
        const decodedContent = htmlContent
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#x27;/g, "'")
          .replace(/&amp;/g, '&');
        
        return decodedContent;
      }
    );
    
    return processedContent;
  }, []);

  // Function to restore content for editing (reverse process)
  const restoreContentForEditing = useCallback((content: string) => {
    // This function restores the original raw HTML structure for editing
    // It's used when we need to pass content back to the editor
    return content;
  }, []);

  const loadArticle = async () => {
    try {
      setLoading(true);
      const fetchedArticle = await getArticleBySlug(slug);
      
      if (fetchedArticle) {
        setArticle(fetchedArticle);
        // Increment view count
        await incrementViewCount(fetchedArticle.id);
      } else {
        setError('Το άρθρο δεν βρέθηκε');
      }
    } catch (error) {
      console.error('Error loading article:', error);
      setError('Σφάλμα κατά τη φόρτωση του άρθρου');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('el-GR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to get the appropriate icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case "hype and headlines":
      case "hype headlines":
        return <Flame className="w-3 h-3 md:w-4 md:h-4 mr-1" />
      case "mind unplugged":
        return <Brain className="w-3 h-3 md:w-4 md:h-4 mr-1" />
      case "raw reality":
        return <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
      default:
        return <BadgeInfo className="w-3 h-3 md:w-4 md:h-4 mr-1" />
    }
  }

  // Function to get category color based on category name - BLUE THEME
  const getCategoryColor = (category: string) => {
    const categoryLower = category?.toLowerCase() || ""

    if (categoryLower.includes("hype") || categoryLower.includes("headlines")) {
      return "from-blue-500/50 to-cyan-500/50 hover:from-blue-500 hover:to-cyan-500"
    } else if (categoryLower.includes("mind") || categoryLower.includes("unplugged")) {
      return "from-blue-600/50 to-indigo-500/50 hover:from-blue-600 hover:to-indigo-500"
    } else if (categoryLower.includes("raw") || categoryLower.includes("reality")) {
      return "from-blue-700/50 to-blue-500/50 hover:from-blue-700 hover:to-blue-500"
    }

    // Default blue gradient
    return "from-blue-500/50 to-indigo-500/50 hover:from-blue-500 hover:to-indigo-500"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xl font-medium">
              Φόρτωση άρθρου...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div 
            className="text-center max-w-md mx-auto px-6"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-pink-200 dark:from-red-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <BookOpen className="w-16 h-16 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <motion.h1 
              className="text-3xl font-bold text-slate-800 dark:text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Άρθρο δεν βρέθηκε
            </motion.h1>
            <motion.p 
              className="text-slate-600 dark:text-slate-300 text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {error || 'Το άρθρο που αναζητάτε δεν υπάρχει ή έχει διαγραφεί.'}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link href="/articles">
                <button 
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-colors duration-200 shadow-lg font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Επιστροφή στα Άρθρα
                </button>
              </Link>
              <button 
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 shadow-lg border border-slate-200 dark:border-gray-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Πίσω
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen pt-20 ${
        isDarkMode 
          ? 'bg-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
      }`}
      style={{ fontFamily: 'StampatelloFaceto, cursive' }}
    >
      {/* Notebook Paper Background - FULL HEIGHT LINES */}
      <div className="absolute inset-0">
        {/* Main paper background - UNIFORM COLOR */}
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}></div>
      </div>

      {/* Optimized Background Elements for Mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isMobile ? (
          // Static background elements for mobile
          <>
            <div
              className="absolute top-40 left-10 w-40 h-40 rounded-full"
              style={{ 
                backgroundColor: isDarkMode ? '#3b82f6' : '#60a5fa',
                opacity: isDarkMode ? 0.06 : 0.1,
                filter: 'blur(20px)'
              }}
            />
            <div
              className="absolute top-80 right-20 w-32 h-32 rounded-full"
              style={{ 
                backgroundColor: isDarkMode ? '#06b6d4' : '#22d3ee',
                opacity: isDarkMode ? 0.04 : 0.08,
                filter: 'blur(20px)'
              }}
            />
          </>
        ) : (
          // Full animations for desktop
          <>
            <motion.div
              className="absolute top-40 left-10 w-40 h-40 rounded-full blur-3xl"
              style={{ 
                backgroundColor: isDarkMode ? '#3b82f6' : '#60a5fa',
                opacity: isDarkMode ? 0.08 : 0.12
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: isDarkMode ? [0.05, 0.08, 0.05] : [0.08, 0.12, 0.08],
                x: [0, 30, 0],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-80 right-20 w-32 h-32 rounded-full blur-3xl"
              style={{ 
                backgroundColor: isDarkMode ? '#06b6d4' : '#22d3ee',
                opacity: isDarkMode ? 0.06 : 0.1
              }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: isDarkMode ? [0.03, 0.06, 0.03] : [0.05, 0.1, 0.05],
                x: [0, -25, 0],
                y: [0, 25, 0]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
            />
          </>
        )}
      </div>

      {/* Main Content Container - SAME AS ADMIN */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <SchoolBreadcrumb 
            items={[
              { label: 'Αρχική', href: '/' },
              { label: 'Άρθρα', href: '/articles' },
              { label: article?.title || 'Φόρτωση...' }
            ]}
          />
        </div>

        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/articles">
            <motion.button
              className="group flex items-center gap-3 px-6 py-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              whileHover={{ scale: 1.02, x: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Επιστροφή στα Άρθρα</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Featured Image */}
        {article.image && (
          <motion.div 
            className="relative w-full h-[50vh] min-h-[400px] overflow-hidden rounded-3xl shadow-2xl mb-12"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Status Badges */}
            <div className="absolute bottom-6 left-6 flex gap-3">
              {article.featured && (
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Star className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">Προτεινόμενο</span>
                </motion.div>
              )}
              {article.breaking && (
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <Zap className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">Σπουδαία Νέα</span>
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-6 right-6 flex gap-3">
              <motion.button
                className="w-12 h-12 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Share2 className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </motion.button>
              <motion.button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="w-12 h-12 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Heart className={`w-5 h-5 transition-colors ${
                  isBookmarked 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-slate-600 dark:text-slate-300 group-hover:text-red-500'
                }`} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Article Content - WIDER */}
        <div className="max-w-6xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Category Badge */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full border border-blue-200/50 dark:border-blue-700/50">
                <GraduationCap className="w-5 h-5" />
                {article.category}
              </span>
            </motion.div>

            {/* CRAZY NOTEBOOK STYLE TITLE */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Notebook Paper Background for Title */}
              <div className={`relative rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-200'
              }`}>
                {/* Notebook Lines */}
                <div className="absolute inset-0 rounded-2xl" style={{
                  backgroundImage: `
                    linear-gradient(to right, ${isDarkMode ? '#4a5568' : '#e5e7eb'} 1px, transparent 1px),
                    linear-gradient(to bottom, ${isDarkMode ? '#4a5568' : '#e5e7eb'} 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                  opacity: 0.3
                }}></div>
                
                {/* Red Margin Line */}
                <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
                  isDarkMode ? 'bg-red-400' : 'bg-red-300'
                } opacity-60`}></div>
                
                {/* Title */}
                <h1 className={`relative z-10 text-4xl lg:text-6xl font-bold leading-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`} style={{
                  fontFamily: 'StampatelloFaceto, cursive',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}>
                  {article.title}
                </h1>
                
                {/* Optimized Decorative Elements for Mobile */}
                {isMobile ? (
                  // Static decorative elements for mobile
                  <>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-sm"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-sm"></div>
                    
                    {/* School decorations */}
                    <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                      <Star className="w-2 h-2 text-white" />
                    </div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                      <GraduationCap className="w-3 h-3 text-white" />
                    </div>
                  </>
                ) : (
                  // Animated decorative elements for desktop
                  <>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-sm animate-pulse"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-sm animate-bounce"></div>
                    
                    {/* School decorations */}
                    <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-md animate-pulse">
                      <Star className="w-2 h-2 text-white" />
                    </div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                      <GraduationCap className="w-3 h-3 text-white" />
                    </div>
                  </>
                )}
                
                {/* Decorative corner lines */}
                <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-blue-400 opacity-60"></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-green-400 opacity-60"></div>
              </div>
            </motion.div>

            {/* Expert Quote */}
            {article.expert && (
              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-500 p-8 mb-12 rounded-r-2xl shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 italic text-xl leading-relaxed">"{article.expert}"</p>
                </div>
              </motion.div>
            )}

            {/* Excerpt */}
            <motion.p 
              className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {article.excerpt}
            </motion.p>

            {/* Meta Information - Only Date */}
            <motion.div 
              className="flex items-center gap-4 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-gray-700 pb-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3 px-6 py-3 bg-slate-100 dark:bg-gray-700 rounded-full">
                <Calendar className="w-5 h-5" />
                <span className="font-medium text-lg">{formatDate(article.date)}</span>
              </div>
            </motion.div>

            {/* Article Content - NORMAL SIZES */}
            <motion.div 
              className="prose prose-lg max-w-none prose-headings:text-slate-800 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-strong:text-slate-800 dark:prose-strong:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-img:rounded-2xl prose-img:shadow-xl prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:mb-3 prose-p:leading-relaxed prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:border-l-4 prose-pre:border-blue-500 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-table:border-collapse prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-600 prose-th:bg-gray-100 dark:prose-th:bg-gray-700 prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600 prose-th:p-3 prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600 prose-td:p-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div 
                dangerouslySetInnerHTML={{ __html: processContentForDisplay(article.content) }}
                className="rich-text-editor prose prose-base max-w-none"
                style={{ 
                  lineHeight: '1.6',
                  fontSize: '16px',
                  fontFamily: 'StampatelloFaceto, cursive'
                }}
              />
            </motion.div>

            {/* Tags - BEAUTIFUL BLUE DESIGN */}
            {article.tags && article.tags.length > 0 && (
              <motion.div 
                className="mt-16 pt-8 border-t border-slate-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                {/* Modern Tags Container */}
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-indigo-500/10 backdrop-blur-xl rounded-3xl border border-blue-200/20 dark:border-blue-800/30 p-8 shadow-lg hover:shadow-xl transition-all duration-500">
                  
                  {/* Animated background elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-tr from-indigo-400/15 to-blue-400/10 rounded-full blur-xl" />
                  </div>
                  
                  {/* Subtle top accent */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full z-10"></div>
                  
                  <div className="relative z-10 flex items-center gap-4 mb-6">
                    {/* Modern hashtag icon */}
                    <div className="group relative">
                      {/* Glass container with gradient border */}
                      <div className="w-14 h-14 rounded-2xl bg-white/40 dark:bg-gray-900/20 backdrop-blur-xl flex items-center justify-center border border-blue-300/40 dark:border-blue-700/30 shadow-lg overflow-hidden transition-all duration-500 group-hover:shadow-blue-500/20 dark:group-hover:shadow-blue-500/30">
                        {/* Animated gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 via-cyan-500/40 to-indigo-500/40 opacity-60 group-hover:opacity-70 transition-opacity duration-500"></div>
                        
                        {/* Optimized particle effects for mobile */}
                        {isMobile ? (
                          // Static particles for mobile
                          <>
                            <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-70"></div>
                            <div className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full opacity-70"></div>
                          </>
                        ) : (
                          // Animated particles for desktop
                          <>
                            <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping opacity-70" style={{animationDuration: '2s', animationDelay: '0s'}}></div>
                            <div className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full animate-ping opacity-70" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}></div>
                          </>
                        )}
                        
                        {/* Hashtag symbol */}
                        <span className="relative text-2xl font-bold text-white transition-all duration-500">
                          #
                        </span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                        Ετικέτες Άρθρου
                      </h3>
                      
                      {/* Accent line */}
                      <div className="mt-2 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    {article.tags.map((tag, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block relative z-50"
                      >
                        <span 
                          className="px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 text-base font-medium rounded-full border border-blue-200/50 dark:border-blue-700/50 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-800/40 dark:hover:to-cyan-800/40 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer inline-block relative z-50"
                          onClick={() => {
                            console.log('Tag clicked:', tag);
                            router.push(`/tags/${encodeURIComponent(tag)}`);
                          }}
                        >
                          #{tag}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Subtle bottom highlight */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                </div>
              </motion.div>
            )}

            {/* Image Source */}
            {article.imageSource && (
              <motion.div 
                className="mt-12 pt-8 border-t border-slate-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <div className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-gray-800/50 rounded-2xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full flex items-center justify-center">
                    <Tag className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-800 dark:text-slate-200">Πηγή εικόνας:</strong> {article.imageSource}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.article>
        </div>
      </div>

    </div>
  );
}