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
  School,
  ImageIcon
} from 'lucide-react';
import { getArticleBySlug, incrementViewCount } from '@/lib/firebase-articles';
import type { Article } from '@/lib/types';
import { useTheme } from '@/contexts/ThemeContext';
import { useChristmasTheme } from '@/contexts/ChristmasThemeContext';
import { useHalloweenTheme } from '@/contexts/HalloweenThemeContext';
import { useEasterTheme } from '@/contexts/EasterThemeContext';
import { useCarnivalTheme } from '@/contexts/CarnivalThemeContext';
import { useSummerTheme } from '@/contexts/SummerThemeContext';
import SchoolBreadcrumb from '@/components/SchoolBreadcrumb';
import ShareButtons from '@/components/ShareButtons';
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
  const { isDarkMode } = useTheme();
  const { isChristmasMode } = useChristmasTheme();
  const { isHalloweenMode } = useHalloweenTheme();
  const { isEasterMode } = useEasterTheme();
  const { isCarnivalMode } = useCarnivalTheme();
  const { isSummerMode } = useSummerTheme();
  const [isMobile, setIsMobile] = useState(false);

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
        background: 'from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900',
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
      
      /* Tape Frame Effect Styles */
      .img-tape {
        position: relative;
        text-align: center;
        display: inline-block;
        margin: 20px auto 10px;
        z-index: 10;
      }
      
      .img-tape:before,
      .img-tape:after {
        background: rgba(255,255,235,.8);
        box-shadow: 0 2px 6px rgba(0,0,0,.3);
        content: "";
        display: block;
        height: 30px;
        position: absolute;
        margin: auto;
        width: 100px;
        z-index: 20;
        border-radius: 2px;
      }
      
      .img-tape img {
        background: #fff;
        border: 1px solid #ddd;
        box-shadow: 0 2px 8px rgba(0,0,0,.3);
        display: inline-block;
        height: auto;
        margin: 0 20px;
        max-width: 100%;
        padding: 8px;
        text-align: center;
        vertical-align: top;
        aspect-ratio: 16/9;
        object-fit: cover;
        width: 100%;
        border-radius: 4px;
        position: relative;
        z-index: 1;
      }
      
      .img-tape--1:before {
        left: 50%;
        margin-left: -50px;
        top: -10px;
      }
      
      .img-tape--1:after {
        display: none;
      }
      
      .img-tape--2:before {
        left: 0;
        top: 10px;
        transform: rotate(-35deg);
      }
      
      .img-tape--2:after {
        right: 0;
        top: 15px;
        transform: rotate(45deg);
      }
      
      .img-tape--3:before {
        left: 0;
        top: 10px;
        transform: rotate(-45deg);
      }
      
      .img-tape--3:after {
        bottom: 10px;
        right: 0;
        transform: rotate(-35deg);
      }
      
      .img-tape--4:before {
        left: -30px;
        margin-top: -15px;
        top: 50%;
        transform: rotate(93deg);
      }
      
      .img-tape--4:after {
        margin-top: -30px;
        right: -30px;
        top: 50%;
        transform: rotate(89deg);
      }
      
      /* Dark mode tape adjustments */
      .dark .img-tape:before,
      .dark .img-tape:after {
        background: rgba(255,255,235,.6);
        box-shadow: 0 2px 6px rgba(0,0,0,.5);
      }
      
      .dark .img-tape img {
        background: #1f2937;
        border: 1px solid #374151;
        box-shadow: 0 2px 8px rgba(0,0,0,.5);
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
      <div className={`min-h-screen bg-gradient-to-br ${themeColors.background} pt-20`}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative mb-8">
              <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${themeColors.accent} flex items-center justify-center shadow-2xl`}>
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
      <div className={`min-h-screen bg-gradient-to-br ${themeColors.background} pt-20`}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div 
            className="text-center max-w-md mx-auto px-6"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="relative mb-8">
              <div className={`w-32 h-32 bg-gradient-to-br from-${themeColors.accentColor}-100 to-${themeColors.accentColor2}-200 dark:from-${themeColors.accentColor}-900/30 dark:to-${themeColors.accentColor2}-900/30 rounded-full flex items-center justify-center mx-auto shadow-2xl`}>
                <BookOpen className={`w-16 h-16 text-${themeColors.accentColor}-600 dark:text-${themeColors.accentColor}-400`} />
              </div>
            </div>
            <motion.h1 
              className={`text-3xl font-bold ${themeColors.text} mb-4`}
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
                  className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${themeColors.accent} text-white rounded-xl hover:opacity-80 transition-colors duration-200 shadow-lg font-medium`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Επιστροφή στα Άρθρα
                </button>
              </Link>
              <button 
                onClick={() => window.history.back()}
                className={`flex items-center gap-2 px-6 py-3 ${themeColors.cardBg.replace('/95', '/80')} text-slate-700 dark:text-slate-300 rounded-xl hover:${themeColors.cardBg.replace('/95', '')} transition-colors duration-200 shadow-lg border border-${themeColors.accentColor}-200 dark:border-${themeColors.accentColor}-700 font-medium`}
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

  // Generate structured data for SEO
  const generateStructuredData = () => {
    if (!article) return null;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alfaschool.gr';
    const articleUrl = `${baseUrl}/articles/${article.slug}`;
    const imageUrl = article.image || `${baseUrl}/alfa-logo.png`;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.excerpt,
      "image": imageUrl,
      "url": articleUrl,
      "datePublished": article.date instanceof Date ? article.date.toISOString() : new Date(article.date).toISOString(),
      "dateModified": article.updatedAt instanceof Date ? article.updatedAt.toISOString() : new Date(article.updatedAt || article.date).toISOString(),
      "author": {
        "@type": "Person",
        "name": article.author || "Alfa School"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Alfa School",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/alfa-logo.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": articleUrl
      },
      "articleSection": article.category,
      "keywords": article.tags?.join(', ') || article.category,
      "wordCount": article.content.replace(/<[^>]*>/g, '').split(' ').length,
      "timeRequired": `PT${article.readingTime}M`,
      "inLanguage": "el-GR"
    };

    return structuredData;
  };

  return (
    <>
      {/* Structured Data for SEO */}
      {article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData())
          }}
        />
      )}
      
      <div 
        className={`min-h-screen pt-20 bg-gradient-to-br ${themeColors.background}`}
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

        {/* Back Button - School Style */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/articles">
            <motion.button
              className={`group relative flex items-center gap-3 px-4 py-2 ${themeColors.cardBg} backdrop-blur-xl rounded-2xl border-2 ${themeColors.border} shadow-lg hover:shadow-xl transition-all duration-300 text-slate-700 dark:text-slate-300 hover:opacity-80 overflow-hidden`}
              whileHover={{ scale: 1.02, x: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Notebook Lines Background */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Horizontal lines */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={`line-${i}`}
                    className={`absolute w-full h-px ${
                      isDarkMode ? themeColors.lines.replace('/30', '/10') : themeColors.lines.replace('/30', '/20')
                    }`}
                    style={{
                      top: `${20 + i * 15}%`,
                      left: '8%',
                      right: '4%'
                    }}
                  />
                ))}
                
                {/* Red margin line */}
                <div className={`absolute left-6 top-0 bottom-0 w-px ${
                  isDarkMode ? themeColors.margin.replace('/50', '/20') : themeColors.margin.replace('/50', '/30')
                }`}></div>
                
                {/* Holes for binder */}
                {[...Array(2)].map((_, i) => (
                  <div
                    key={`hole-${i}`}
                    className={`absolute w-1 h-1 rounded-full border ${
                      isDarkMode 
                        ? 'bg-gray-600/30 border-gray-500/50' 
                        : 'bg-blue-200/50 border-blue-300/70'
                    }`}
                    style={{
                      left: '3px',
                      top: `${25 + i * 30}%`
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center gap-3">
                {/* School Badge */}
                <div className={`w-8 h-8 bg-gradient-to-br ${themeColors.accent} rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <ArrowLeft className="w-4 h-4 text-white group-hover:-translate-x-1 transition-transform" />
                </div>
                
                <div>
                  <span className="font-bold text-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    Επιστροφή στα Άρθρα
                  </span>
                </div>
              </div>
              
              {/* School Corner Decorations */}
              <div className={`absolute top-2 right-2 w-3 h-3 border-r-2 border-b-2 ${themeColors.border.replace('/30', '/50')} rounded-br-lg`}></div>
            </motion.button>
          </Link>
        </motion.div>

        {/* Status Badges - Moved to top */}
        {(article.featured || article.breaking) && (
          <motion.div 
            className="mb-6 flex gap-3 justify-center md:justify-start"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {article.featured && (
              <motion.div
                className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${themeColors.accent} rounded-full shadow-lg`}
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
                className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${themeColors.accent} rounded-full shadow-lg`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Zap className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Σπουδαία Νέα</span>
              </motion.div>
            )}
          </motion.div>
        )}


        {/* Article Content - WIDER */}
        <div className="max-w-6xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Category Badge - School Style */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative inline-block">
                <div className={`relative ${themeColors.cardBg} backdrop-blur-xl rounded-2xl border-2 ${themeColors.border} shadow-lg overflow-hidden`}>
                  {/* Notebook Lines Background */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Horizontal lines */}
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={`line-${i}`}
                        className={`absolute w-full h-px ${
                          isDarkMode ? themeColors.lines.replace('/30', '/10') : themeColors.lines.replace('/30', '/20')
                        }`}
                        style={{
                          top: `${25 + i * 20}%`,
                          left: '10%',
                          right: '5%'
                        }}
                      />
                    ))}
                    
                    {/* Red margin line */}
                    <div className={`absolute left-6 top-0 bottom-0 w-px ${
                      isDarkMode ? themeColors.margin.replace('/50', '/20') : themeColors.margin.replace('/50', '/30')
                    }`}></div>
                    
                    {/* Holes for binder */}
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={`hole-${i}`}
                        className={`absolute w-1 h-1 rounded-full border ${
                          isDarkMode 
                            ? 'bg-gray-600/30 border-gray-500/50' 
                            : 'bg-blue-200/50 border-blue-300/70'
                        }`}
                        style={{
                          left: '3px',
                          top: `${30 + i * 25}%`
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-2 px-3 py-2">
                    {/* School Badge */}
                    <div className={`w-8 h-8 bg-gradient-to-br ${themeColors.accent} rounded-full flex items-center justify-center shadow-md`}>
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    
                    <div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* School Corner Decorations */}
                  <div className={`absolute top-2 right-2 w-3 h-3 border-r-2 border-b-2 ${themeColors.border.replace('/30', '/50')} rounded-br-lg`}></div>
                </div>
              </div>
            </motion.div>

            {/* SCHOOL STYLE TITLE WITH TAPE FRAME IMAGE */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
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
                        top: `${15 + i * 6}%`,
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
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={`hole-${i}`}
                      className={`absolute w-1.5 h-1.5 rounded-full border ${
                        isDarkMode 
                          ? 'bg-gray-600/30 border-gray-500/50' 
                          : 'bg-blue-200/50 border-blue-300/70'
                      }`}
                      style={{
                        left: '4px',
                        top: `${20 + i * 12}%`
                      }}
                    />
                  ))}
                </div>

                {/* Content with Image Layout */}
                <div className="relative z-10 p-8">
                  {/* Desktop Layout: Title on left, Image on right */}
                  <div className="hidden md:flex items-start gap-8">
                    {/* Title Section */}
                    <div className="flex-1">
                      {/* School Header with Grade */}
                      <div className="flex items-center justify-center mb-6">
                        {/* School Badge */}
                        <div className="relative">
                          <div className={`w-16 h-16 ${themeColors.cardBg.replace('/95', '')} rounded-full flex items-center justify-center shadow-lg border-2 ${themeColors.border.replace('/30', '')}`}>
                            <div className={`w-12 h-12 bg-gradient-to-br ${themeColors.accent} rounded-full flex items-center justify-center`}>
                              <BookOpen className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          {/* Grade A+ Badge */}
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                            <span className="text-white text-sm font-bold" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                              A+
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Main Title */}
                      <div className="text-center">
                        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${themeColors.text}`} style={{
                          fontFamily: 'StampatelloFaceto, cursive',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}>
                          {article.title}
                        </h1>
                        
                        {/* Title Underline */}
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className={`w-8 h-0.5 bg-gradient-to-r from-transparent ${themeColors.accent.split(' ')[1]}`}></div>
                          <div className={`w-3 h-3 ${themeColors.accent.split(' ')[1]} rounded-full`}></div>
                          <div className={`w-8 h-0.5 bg-gradient-to-l from-transparent ${themeColors.accent.split(' ')[1]}`}></div>
                        </div>
                        
                        {/* School Info */}
                        {article.author && (
                          <div className="flex items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{article.author}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Image Section with Tape Frame - Desktop */}
                    {(article.image || article.articleImage || article.profilePhoto) && (
                      <div className="flex-shrink-0 w-80">
                        <div className="img-tape img-tape--2">
                          <Image
                            src={article.image || article.articleImage || article.profilePhoto || '/alfa-logo.png'}
                            alt={article.title}
                            width={320}
                            height={180}
                            className="w-full h-auto"
                            priority
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mobile Layout: Title on top, Image below */}
                  <div className="md:hidden">
                    {/* School Header with Grade */}
                    <div className="flex items-center justify-center mb-6">
                      {/* School Badge */}
                      <div className="relative">
                        <div className={`w-16 h-16 ${themeColors.cardBg.replace('/95', '')} rounded-full flex items-center justify-center shadow-lg border-2 ${themeColors.border.replace('/30', '')}`}>
                          <div className={`w-12 h-12 bg-gradient-to-br ${themeColors.accent} rounded-full flex items-center justify-center`}>
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        {/* Grade A+ Badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                          <span className="text-white text-sm font-bold" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                            A+
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Main Title */}
                    <div className="text-center mb-6">
                      <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${themeColors.text}`} style={{
                        fontFamily: 'StampatelloFaceto, cursive',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        {article.title}
                      </h1>
                      
                      {/* Title Underline */}
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className={`w-8 h-0.5 bg-gradient-to-r from-transparent ${themeColors.accent.split(' ')[1]}`}></div>
                        <div className={`w-3 h-3 ${themeColors.accent.split(' ')[1]} rounded-full`}></div>
                        <div className={`w-8 h-0.5 bg-gradient-to-l from-transparent ${themeColors.accent.split(' ')[1]}`}></div>
                      </div>
                      
                      {/* School Info */}
                      {article.author && (
                        <div className="flex items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{article.author}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image Section with Tape Frame - Mobile */}
                    {(article.image || article.articleImage || article.profilePhoto) && (
                      <div className="flex justify-center">
                        <div className="img-tape img-tape--1 w-full max-w-sm">
                          <Image
                            src={article.image || article.articleImage || article.profilePhoto || '/alfa-logo.png'}
                            alt={article.title}
                            width={400}
                            height={225}
                            className="w-full h-auto"
                            priority
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* School Corner Decorations */}
                <div className={`absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-${themeColors.accentColor} opacity-60`}></div>
                <div className={`absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-${themeColors.accentColor2} opacity-60`}></div>
                <div className={`absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-${themeColors.accentColor} opacity-60`}></div>
                <div className={`absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-${themeColors.accentColor2} opacity-60`}></div>
                
                {/* Theme Special Effects */}
                {themeColors.specialEffects === 'halloween' && (
                  <>
                    {/* Floating Bats */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={`bat-${i}`}
                          className="absolute text-xl opacity-15"
                          style={{
                            left: `${15 + i * 25}%`,
                            top: `${10 + i * 20}%`,
                          }}
                          animate={{
                            y: [0, -15, 0],
                            x: [0, 8, 0],
                            rotate: [0, 8, -8, 0],
                          }}
                          transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.7,
                          }}
                        >
                          🦇
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Spooky Shadows */}
                    <div className="absolute inset-0 pointer-events-none">
                      <motion.div
                        className="absolute w-24 h-24 bg-black/5 rounded-full blur-2xl"
                        style={{ left: '5%', top: '15%' }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.05, 0.2, 0.05],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                        }}
                      />
                    </div>
                  </>
                )}
                
                {themeColors.specialEffects === 'christmas' && (
                  <>
                    {/* Floating Snowflakes */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={`snowflake-${i}`}
                          className="absolute text-sm opacity-25"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${-5 + Math.random() * 15}%`,
                          }}
                          animate={{
                            y: [0, 80],
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 6 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        >
                          ❄️
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Christmas Lights */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={`light-${i}`}
                          className="absolute w-1.5 h-1.5 rounded-full"
                          style={{
                            left: `${8 + i * 15}%`,
                            top: `${8 + (i % 2) * 8}%`,
                            backgroundColor: i % 2 === 0 ? '#ef4444' : '#22c55e',
                          }}
                          animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [0.6, 1.3, 0.6],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.15,
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
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={`egg-${i}`}
                          className="absolute text-lg opacity-30"
                          style={{
                            left: `${10 + i * 20}%`,
                            top: `${5 + i * 12}%`,
                          }}
                          animate={{
                            y: [0, -12, 0],
                            rotate: [0, 12, -12, 0],
                          }}
                          transition={{
                            duration: 5 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.6,
                          }}
                        >
                          🥚
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Spring Flowers */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={`flower-${i}`}
                          className="absolute text-xs opacity-25"
                          style={{
                            left: `${5 + i * 25}%`,
                            bottom: `${8 + (i % 2) * 12}%`,
                          }}
                          animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 8, -8, 0],
                          }}
                          transition={{
                            duration: 4 + i * 0.3,
                            repeat: Infinity,
                            delay: i * 0.4,
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
                      {[...Array(15)].map((_, i) => (
                        <motion.div
                          key={`confetti-${i}`}
                          className="absolute w-1.5 h-1.5 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${-3 + Math.random() * 8}%`,
                            backgroundColor: ['#ef4444', '#f59e0b', '#8b5cf6', '#ec4899'][i % 4],
                          }}
                          animate={{
                            y: [0, 100],
                            x: [0, Math.random() * 15 - 7.5],
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 2.5 + Math.random() * 1.5,
                            repeat: Infinity,
                            delay: Math.random() * 1.5,
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Masks */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={`mask-${i}`}
                          className="absolute text-sm opacity-15"
                          style={{
                            left: `${15 + i * 35}%`,
                            top: `${8 + i * 15}%`,
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 6, -6, 0],
                          }}
                          transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            delay: i * 0.6,
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
                        className="absolute w-40 h-40 bg-yellow-200/15 rounded-full blur-2xl"
                        style={{ left: '50%', top: '5%', transform: 'translateX(-50%)' }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                        }}
                      />
                    </div>
                    
                    {/* Beach Elements */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={`beach-${i}`}
                          className="absolute text-sm opacity-25"
                          style={{
                            left: `${8 + i * 20}%`,
                            bottom: `${5 + (i % 2) * 8}%`,
                          }}
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 4, -4, 0],
                          }}
                          transition={{
                            duration: 5 + i * 0.4,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        >
                          {i % 2 === 0 ? '🏖️' : '☀️'}
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Tropical Leaves */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={`leaf-${i}`}
                          className="absolute text-xs opacity-20"
                          style={{
                            right: `${5 + i * 20}%`,
                            top: `${12 + i * 18}%`,
                          }}
                          animate={{
                            rotate: [0, 12, -12, 0],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 6 + i,
                            repeat: Infinity,
                            delay: i * 0.7,
                          }}
                        >
                          🍃
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>


            {/* School Style Date - Left Aligned */}
            <motion.div 
              className="flex items-center justify-start mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              <div className={`relative ${themeColors.cardBg.replace('/95', '/90')} rounded-lg border ${themeColors.border.replace('/30', '/50')} px-4 py-2 shadow-sm`}>
                {/* Subtle notebook line */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className={`absolute w-full h-px ${
                    isDarkMode ? themeColors.lines.replace('/30', '/10') : themeColors.lines.replace('/30', '/20')
                  }`} style={{ top: '50%', left: '10%', right: '10%' }}></div>
                  <div className={`absolute left-3 top-0 bottom-0 w-px ${
                    isDarkMode ? themeColors.margin.replace('/50', '/20') : themeColors.margin.replace('/50', '/30')
                  }`}></div>
                </div>
                
                <div className="relative z-10 flex items-center gap-2">
                  <div className={`w-5 h-5 bg-gradient-to-br ${themeColors.accent} rounded-full flex items-center justify-center`}>
                    <Calendar className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    {formatDate(article.date)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Expert Quote - Beautiful School Style */}
            {article.expert && (
              <motion.div 
                className={`relative ${themeColors.cardBg} backdrop-blur-xl rounded-2xl shadow-lg border-2 ${themeColors.border} overflow-hidden mb-8`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {/* Notebook Lines Background */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Horizontal lines */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={`line-${i}`}
                      className={`absolute w-full h-px ${
                        isDarkMode ? themeColors.lines.replace('/30', '/15') : themeColors.lines
                      }`}
                      style={{
                        top: `${15 + i * 12}%`,
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
                        top: `${20 + i * 25}%`
                      }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10 p-6">
                  {/* School Header */}
                  <div className="flex items-center gap-3 mb-4">
                    {/* School Badge */}
                    <div className={`w-8 h-8 bg-gradient-to-br ${themeColors.badge} rounded-full flex items-center justify-center shadow-md`}>
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    
                    <div>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                        Σημαντική Παρατήρηση
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                        Εκπαιδευτική Συμβουλή
                      </p>
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <div className="relative pl-4">
                    <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed italic" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      "{article.expert}"
                    </p>
                    
                    {/* Quote decoration */}
                    <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${themeColors.accent} rounded-full`}></div>
                  </div>
                </div>
                
                {/* School Corner Decorations */}
                <div className={`absolute top-2 right-2 w-4 h-4 border-r-2 border-b-2 ${themeColors.border.replace('/30', '/50')} rounded-br-lg`}></div>
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

            {/* Tags - SCHOOL STYLE DESIGN */}
            {article.tags && article.tags.length > 0 && (
              <motion.div 
                className={`mt-16 pt-8 border-t border-${themeColors.accentColor}-200 dark:border-${themeColors.accentColor}-700`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                {/* School Notebook Paper Background */}
                <div className={`relative ${themeColors.cardBg} backdrop-blur-xl rounded-2xl shadow-xl border-2 ${themeColors.border} overflow-hidden`}>
                  {/* Notebook Lines Background */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Horizontal lines */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`line-${i}`}
                        className={`absolute w-full h-px ${
                          isDarkMode ? themeColors.lines.replace('/30', '/15') : themeColors.lines
                        }`}
                        style={{
                          top: `${20 + i * 8}%`,
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
                    <div className="flex items-center gap-3 mb-6">
                      {/* School Badge */}
                      <div className="relative">
                        <div className={`w-12 h-12 bg-gradient-to-br ${themeColors.badge} rounded-full flex items-center justify-center shadow-lg border-2 border-white/30`}>
                          <Tag className="w-6 h-6 text-white" />
                        </div>
                        {/* Grade A+ Badge */}
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                          <span className="text-white text-xs font-bold" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                            A+
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className={`text-2xl font-bold ${themeColors.text} mb-1`} style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                          Ετικέτες Άρθρου
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                          Κάντε κλικ για να δείτε περισσότερα άρθρα
                        </p>
                      </div>
                    </div>
                    
                    {/* Tags - Same Style as Articles Page */}
                    <div className="flex flex-wrap gap-1">
                      {article.tags.map((tag, index) => (
                        <motion.div
                          key={index}
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
                    </div>
                    
                    {/* School Footer */}
                    <div className={`mt-6 pt-4 border-t ${themeColors.border.replace('/30', '/50')}`}>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <div className={`w-4 h-4 bg-gradient-to-r ${themeColors.accent} rounded-full flex items-center justify-center`}>
                          <Tag className="w-2 h-2 text-white" />
                        </div>
                        <span style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                          Κάντε κλικ σε οποιαδήποτε ετικέτα για να δείτε σχετικά άρθρα
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Share Buttons - Below Tags */}
            <motion.div 
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <ShareButtons 
                title={article.title}
                url={typeof window !== "undefined" ? window.location.href : ""}
                image={article.image || article.articleImage || article.profilePhoto}
                className=""
              />
            </motion.div>

            {/* Image Source */}
            {article.imageSource && (
              <motion.div 
                className={`mt-12 pt-8 border-t border-${themeColors.accentColor}-200 dark:border-${themeColors.accentColor}-700`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <div className={`flex items-center gap-4 p-6 ${themeColors.cardBg.replace('/95', '/50')} rounded-2xl`}>
                  <div className={`w-8 h-8 bg-gradient-to-r ${themeColors.accent} rounded-full flex items-center justify-center`}>
                    <Tag className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    <strong className={`${themeColors.text}`}>Πηγή εικόνας:</strong> {article.imageSource}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.article>
        </div>
      </div>

      </div>
    </>
  );
}