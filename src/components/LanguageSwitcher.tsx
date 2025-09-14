"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronDown, Languages } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

// Σημαία Ελλάδας (SVG)
const GreekFlag = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className={className} aria-hidden="true">
    <path fill="#0d5eaf" d="M0 0h640v53.3H0z" />
    <path fill="#fff" d="M0 53.3h640v53.4H0z" />
    <path fill="#0d5eaf" d="M0 106.7h640V160H0z" />
    <path fill="#fff" d="M0 160h640v53.3H0z" />
    <path fill="#0d5eaf" d="M0 213.3h640v53.4H0z" />
    <path fill="#fff" d="M0 266.7h640V320H0z" />
    <path fill="#0d5eaf" d="M0 320h640v53.3H0z" />
    <path fill="#fff" d="M0 373.3h640v53.4H0z" />
    <path fill="#0d5eaf" d="M0 426.7h640V480H0z" />
    <path fill="#0d5eaf" d="M0 0h213.3v213.3H0z" />
    <path fill="#fff" d="M0 80h213.3v53.3H0z" />
    <path fill="#fff" d="M80 0h53.3v213.3H80z" />
  </svg>
)

// Σημαία Ηνωμένου Βασιλείου (SVG)
const UKFlag = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className={className} aria-hidden="true">
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" />
    <path
      fill="#C8102E"
      d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
    />
    <path fill="#FFF" d="M241 0v480h160V0h-96zM0 160v160h640V160H0z" />
    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
  </svg>
)

// Σημαία Γαλλίας (SVG)
const FrenchFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className={className} preserveAspectRatio="xMidYMid meet" fill="#000000">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path fill="#ED2939" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"></path>
      <path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"></path>
      <path fill="#EEE" d="M12 5h12v26H12z"></path>
    </g>
  </svg>
)

export function LanguageSwitcher({ className, compact = false, mobile = false }: { className?: string, compact?: boolean, mobile?: boolean }) {
  const { language, setLanguage, t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Αποφυγή hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Ενημέρωση του language context όταν αλλάζει η γλώσσα
  const handleLanguageChange = (newLang: 'el' | 'en' | 'fr') => {
    setLanguage(newLang)
    setIsOpen(false)
    
    // Κλείσιμο του mobile menu αν είμαστε σε mobile view
    if (mobile) {
      // Dispatch event για να κλείσει το mobile menu
      window.dispatchEvent(new Event('closeMobileMenu'))
    }
  }

  // Για compact view (GlowMenu)
  if (compact) {
    return (
      <div className="relative">
        <motion.div
          className={cn(
            "flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer",
            className,
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Languages className="h-3.5 w-3.5 text-blue-400 dark:text-blue-300" />
          <span className="text-xs font-semibold text-shadow-sm shadow-black/40">
            {t('navigation.language')}
          </span>
          <ChevronDown className="h-3 w-3 text-white/60" />
        </motion.div>
        
        {/* Dropdown menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-600/20 rounded-xl shadow-2xl z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2">
                {/* Ελληνικά */}
                <div
                  onClick={() => handleLanguageChange("el")}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    language === 'el' 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <GreekFlag className="w-5 h-3 rounded-sm" />
                  <span className="text-sm font-medium">Ελληνικά</span>
                  {language === 'el' && (
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full ml-auto"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                  )}
                </div>
                
                {/* Αγγλικά */}
                <div
                  onClick={() => handleLanguageChange("en")}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    language === 'en' 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <UKFlag className="w-5 h-3 rounded-sm" />
                  <span className="text-sm font-medium">English</span>
                  {language === 'en' && (
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full ml-auto"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                  )}
                </div>
                
                {/* Γαλλικά */}
                <div
                  onClick={() => handleLanguageChange("fr")}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    language === 'fr' 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <FrenchFlag className="w-5 h-3 rounded-sm" />
                  <span className="text-sm font-medium">Français</span>
                  {language === 'fr' && (
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full ml-auto"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Για mobile view, χρησιμοποιούμε ένα μοντέρνο toggle design
  if (mobile) {
    return (
      <div className={cn("mb-6", className)}>
        <h3 className="text-sm font-medium mb-4 flex items-center text-gray-800 dark:text-white/90">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
            <Languages className="h-3 w-3 text-white" />
          </div>
          {t('navigation.language')}
        </h3>
        
        {/* Modern Button Design - 3 Options */}
        <div className="flex gap-2">
          {/* Greek Option */}
          <motion.button
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl cursor-pointer transition-all duration-300",
              "border-2 shadow-lg backdrop-blur-sm",
              language === 'el' 
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-400 text-white shadow-blue-500/30" 
                : "bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600"
            )}
            onClick={() => handleLanguageChange("el")}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            animate={language === 'el' ? { y: -2 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <GreekFlag className="w-4 h-3 rounded-sm shadow-sm" />
            <span className="text-sm font-medium">
              Ελληνικά
            </span>
            {language === 'el' && (
              <motion.div
                className="w-2 h-2 bg-white rounded-full ml-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              />
            )}
          </motion.button>

          {/* English Option */}
          <motion.button
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl cursor-pointer transition-all duration-300",
              "border-2 shadow-lg backdrop-blur-sm",
              language === 'en' 
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-400 text-white shadow-blue-500/30" 
                : "bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600"
            )}
            onClick={() => handleLanguageChange("en")}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            animate={language === 'en' ? { y: -2 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <UKFlag className="w-4 h-3 rounded-sm shadow-sm" />
            <span className="text-sm font-medium">
              English
            </span>
            {language === 'en' && (
              <motion.div
                className="w-2 h-2 bg-white rounded-full ml-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              />
            )}
          </motion.button>

          {/* French Option */}
          <motion.button
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl cursor-pointer transition-all duration-300",
              "border-2 shadow-lg backdrop-blur-sm",
              language === 'fr' 
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-400 text-white shadow-blue-500/30" 
                : "bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600"
            )}
            onClick={() => handleLanguageChange("fr")}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            animate={language === 'fr' ? { y: -2 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <FrenchFlag className="w-4 h-3 rounded-sm shadow-sm" />
            <span className="text-sm font-medium">
              Français
            </span>
            {language === 'fr' && (
              <motion.div
                className="w-2 h-2 bg-white rounded-full ml-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              />
            )}
          </motion.button>
        </div>
      </div>
    )
  }

  // Νέο μοντέρνο dropdown για desktop
  return (
    <div className="relative">
      <motion.button
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl",
          "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20",
          "border border-blue-200/50 dark:border-blue-700/50",
          "hover:border-blue-300 dark:hover:border-blue-600",
          "shadow-sm hover:shadow-md hover:shadow-blue-500/10",
          "transition-all duration-300",
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative"
          animate={isHovered ? { y: [0, -2, 0] } : {}}
          transition={{ duration: 0.5, repeat: isHovered ? 1 : 0 }}
        >
          <Languages className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>

        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('navigation.language')}</span>

        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-4 w-4 text-blue-500" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full mt-1 right-0 z-50 min-w-[160px] rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-blue-200/50 dark:border-blue-700/50 overflow-hidden"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-1">
              {/* Επιλογή Ελληνικών */}
              <div
                onClick={() => handleLanguageChange("el")}
              >
                <motion.div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer",
                    language === 'el' ? "bg-blue-50 dark:bg-blue-900/30" : "hover:bg-gray-100 dark:hover:bg-gray-700/50",
                  )}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <GreekFlag className="w-6 h-4 rounded-sm" />
                    {language === 'el' && (
                      <motion.div
                        className="absolute -right-1 -top-1 w-2 h-2 bg-green-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${language === 'el' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    Ελληνικά
                  </span>
                </motion.div>
              </div>

              {/* Επιλογή Αγγλικών */}
              <div
                onClick={() => handleLanguageChange("en")}
              >
                <motion.div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg mt-1 cursor-pointer",
                    language === 'en' ? "bg-blue-50 dark:bg-blue-900/30" : "hover:bg-gray-100 dark:hover:bg-gray-700/50",
                  )}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <UKFlag className="w-6 h-4 rounded-sm" />
                    {language === 'en' && (
                      <motion.div
                        className="absolute -right-1 -top-1 w-2 h-2 bg-green-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${language === 'en' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    English
                  </span>
                </motion.div>
              </div>

              {/* Επιλογή Γαλλικών */}
              <div
                onClick={() => handleLanguageChange("fr")}
              >
                <motion.div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg mt-1 cursor-pointer",
                    language === 'fr' ? "bg-blue-50 dark:bg-blue-900/30" : "hover:bg-gray-100 dark:hover:bg-gray-700/50",
                  )}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <FrenchFlag className="w-6 h-4 rounded-sm" />
                    {language === 'fr' && (
                      <motion.div
                        className="absolute -right-1 -top-1 w-2 h-2 bg-green-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${language === 'fr' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    Français
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
