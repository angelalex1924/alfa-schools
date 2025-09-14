  "use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Settings, Newspaper, Users, Phone, Mail, Shield, ChevronRight, ChevronDown } from "lucide-react"
import { GamesIcon } from "./custom-icons"

// Custom Services Icon
const ServicesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
    <g clipPath="url(#clip0_4418_3849)">
      <path d="M2 13.02V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.3801 15.2693V7.57925C18.3801 6.80926 17.7601 6.24927 17.0001 6.30927H16.9601C15.6201 6.41927 13.5901 7.10928 12.4501 7.81928L12.3401 7.88928C12.1601 7.99928 11.8501 7.99928 11.6601 7.88928L11.5001 7.78928C10.3701 7.07928 8.34012 6.40926 7.00012 6.29926C6.24012 6.23926 5.62012 6.80928 5.62012 7.56928V15.2693C5.62012 15.8793 6.1201 16.4593 6.7301 16.5293L6.9101 16.5593C8.2901 16.7393 10.4301 17.4493 11.6501 18.1193L11.6801 18.1293C11.8501 18.2293 12.1301 18.2293 12.2901 18.1293C13.5101 17.4493 15.6601 16.7493 17.0501 16.5593L17.2601 16.5293C17.8801 16.4593 18.3801 15.8893 18.3801 15.2693Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8.09961V17.6596" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_4418_3849">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ModernThemeToggle } from "./ModernThemeToggle"
import { useTheme } from "@/contexts/ThemeContext"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useLanguage } from "@/contexts/LanguageContext"
import { useChristmasTheme } from "@/contexts/ChristmasThemeContext"
import { AnniversaryText } from "./AnniversaryText"
import { SantaIcon, ChristmasTreeIcon, ReindeerIcon, GiftBoxIcon, BellIcon } from "./ChristmasIcons"

// Navigation items with the requested links - will be updated with translations
const getNavigationItems = (t: (key: string) => string | string[], isChristmasMode: boolean) => [
  {
    label: t('navigation.home'),
    href: "/",
    icon: isChristmasMode ? SantaIcon : Home,
    color: isChristmasMode ? "#dc2626" : "#3b82f6", // Κόκκινο για Χριστούγεννα
    iconColor: isChristmasMode ? "text-red-500" : "text-blue-500"
  },
  {
    label: t('navigation.services'),
    href: "/services",
    icon: isChristmasMode ? ChristmasTreeIcon : ServicesIcon,
    color: isChristmasMode ? "#16a34a" : "#c9b6e4", // Πράσινο για Χριστούγεννα
    iconColor: isChristmasMode ? "text-green-500" : "text-[#c9b6e4]"
  },
  {
    label: t('navigation.news'),
    href: "/articles",
    icon: isChristmasMode ? BellIcon : Newspaper,
    color: isChristmasMode ? "#fbbf24" : "#f78da7", // Χρυσό για Χριστούγεννα
    iconColor: isChristmasMode ? "text-yellow-500" : "text-[#f78da7]"
  },
  {
    label: t('navigation.whyUs'),
    href: "/why-us",
    icon: isChristmasMode ? ReindeerIcon : Users,
    color: isChristmasMode ? "#8b4513" : "#fabeb6", // Καφέ για Χριστούγεννα
    iconColor: isChristmasMode ? "text-amber-600" : "text-[#fabeb6]"
  },
  {
    label: t('navigation.games'),
    href: "/games",
    icon: isChristmasMode ? GiftBoxIcon : GamesIcon,
    color: isChristmasMode ? "#dc2626" : "#a8e6cf", // Κόκκινο για Χριστούγεννα
    iconColor: isChristmasMode ? "text-red-500" : "text-[#a8e6cf]"
  },
  {
    label: t('navigation.contact'),
    href: "/contact",
    icon: Phone,
    color: isChristmasMode ? "#16a34a" : "#fde7dc", // Πράσινο για Χριστούγεννα
    iconColor: isChristmasMode ? "text-green-500" : "text-[#fde7dc]"
  }
]

interface GlowMenuProps {
  className?: string
  [key: string]: any
}

export const GlowMenu = React.forwardRef<HTMLDivElement, GlowMenuProps>(({ className, ...props }, ref) => {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = React.useState<number | null>(null)
  const [scrolled, setScrolled] = React.useState(false)
  const { isDarkMode, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const { isChristmasMode } = useChristmasTheme()
  const navigationItems = getNavigationItems(t, isChristmasMode)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const containerVariants = {
    hidden: {
      width: 0,
      opacity: 0,
    },
    visible: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
              className={cn(
          "p-1 rounded-xl transition-all duration-300 fixed top-4 left-4 right-4 z-[100] mx-auto flex items-center justify-between",
          scrolled
            ? isDarkMode 
              ? "bg-[#0f172a]/50 backdrop-blur-2xl border border-[#0f172a]/60 shadow-[0_8px_32px_rgba(15,23,42,0.5)]"
              : "bg-[#81a1d4]/20 backdrop-blur-2xl border border-[#81a1d4]/30 shadow-[0_8px_32px_rgba(129,161,212,0.2)]"
            : isDarkMode
              ? "bg-[#0f172a]/45 backdrop-blur-2xl border border-[#0f172a]/50 shadow-[0_4px_24px_rgba(15,23,42,0.45)]"
              : "bg-[#81a1d4]/15 backdrop-blur-2xl border border-[#81a1d4]/20 shadow-[0_4px_24px_rgba(129,161,212,0.15)]",
          className,
        )}
      initial={{ y: -10, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 },
      }}
      {...props}
    >
              {/* Enhanced glass effect background */}
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`absolute inset-0 backdrop-blur-3xl ${isDarkMode ? 'bg-[#0f172a]/20' : 'bg-[#81a1d4]/10'}`}></div>
          <div className={`absolute inset-0 bg-gradient-to-r ${isDarkMode ? 'from-[#0f172a]/12 via-[#0f172a]/18 to-[#0f172a]/12' : 'from-[#81a1d4]/5 via-[#81a1d4]/8 to-[#81a1d4]/5'}`}></div>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl"></div>
          
          {/* Σχολικές πινελιές - Notebook lines */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-0 top-0 w-full h-full" style={{
              backgroundImage: `repeating-linear-gradient(
                transparent,
                transparent 20px,
                ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} 20px,
                ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} 21px
              )`
            }}></div>
            {/* Κόκκινη γραμμή αριστερά */}
            <div className={`absolute left-6 top-0 w-0.5 h-full ${isDarkMode ? 'bg-red-400/50' : 'bg-red-500/60'}`}></div>
            
            {/* Binder holes */}
            <div className="absolute left-1 top-1/2 transform -translate-y-1/2 flex flex-col gap-3">
              <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-gray-400/40' : 'bg-gray-600/50'}`}></div>
              <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-gray-400/40' : 'bg-gray-600/50'}`}></div>
              <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-gray-400/40' : 'bg-gray-600/50'}`}></div>
            </div>
            
            {/* Σχολικές πινελιές - Random ink spots */}
            <div className="absolute top-4 right-8 w-1 h-1 bg-blue-400/30 rounded-full"></div>
            <div className="absolute top-12 left-16 w-0.5 h-0.5 bg-gray-400/40 rounded-full"></div>
            <div className="absolute bottom-6 right-12 w-0.5 h-0.5 bg-gray-400/40 rounded-full"></div>
          </div>
        </motion.div>

      {/* Enhanced Logo with alfa-logo.png - REVEAL ANIMATION */}
      <motion.div
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-1"
      >
        <Link href="/" className="relative group" prefetch={false}>
          <motion.div 
            className="relative w-32 h-12 overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              rotate: [0, 1, -1, 0],
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 0 rgba(59, 130, 246, 0)",
                "0 0 20px rgba(59, 130, 246, 0.1)",
                "0 0 0 rgba(59, 130, 246, 0)"
              ]
            }}
            transition={{
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {/* Reveal Animation Container */}
            <motion.div
              className="absolute inset-0"
              initial={{ 
                clipPath: "inset(0 100% 0 0)",
                opacity: 0,
                scale: 0.8,
                rotate: -10
              }}
              animate={{ 
                clipPath: "inset(0 0% 0 0)",
                opacity: 1,
                scale: 1,
                rotate: 0
              }}
              transition={{ 
                duration: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom bounce
                delay: 0.5
              }}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{
                  y: [0, -3, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/alfa-logo.png"
                  alt="Alfa Logo"
                  fill
                  className="object-contain transition-all duration-300 group-hover:brightness-110"
                  priority
                />
              </motion.div>
            </motion.div>
            
            {/* Subtle glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)`,
                filter: 'blur(8px)'
              }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </motion.div>
        </Link>
        
        {/* Χριστουγεννιάτικο Δέντρο δίπλα από το logo */}
        {isChristmasMode && (
          <motion.div
            className="ml-2"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 200 }}
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChristmasTreeIcon className="w-8 h-8 text-green-500" />
            </motion.div>
          </motion.div>
        )}
        
        {/* 40 Years Anniversary Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 1.2,
            ease: "easeOut"
          }}
        >
          {/* <AnniversaryText 
            variant="desktop" 
            size="sm"
            className="relative group"
          /> */}
        </motion.div>
      </motion.div>

      {/* Navigation items */}
      <motion.div
        className="relative z-10 flex items-center gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ul className="flex items-center gap-1">
          {navigationItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const isHovered = hoveredItem === index

            return (
              <motion.li
                key={Array.isArray(item.label) ? item.label.join('-') : item.label}
                className="relative"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                variants={itemVariants}
              >
                <Link href={item.href}>
                  <div className="relative">
                    {/* Animated background highlight for active/hovered item */}
                    <AnimatePresence>
                      {(isActive || isHovered) && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{
                            opacity: isActive ? 1 : 0.7,
                            scale: 1,
                            background: isActive
                              ? `linear-gradient(to right, ${item.color}30, transparent)`
                              : `linear-gradient(to right, ${item.color}15, transparent)`,
                          }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="absolute inset-0 rounded-xl"
                        />
                      )}
                    </AnimatePresence>

                    {/* Item content */}
                    <div
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 relative group/item",
                        isActive ? "text-white" : "text-white/80 hover:text-white",
                      )}
                    >
                      {/* Icon with enhanced animations */}
                      <motion.div
                        className={cn(
                          "relative flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300",
                          isActive || isHovered
                            ? `${item.iconColor} bg-white/20 backdrop-blur-sm`
                            : "text-white/70",
                        )}
                        animate={
                          isActive
                            ? {
                                scale: 1.05,
                                boxShadow: `0 2px 8px ${item.color}40`,
                                rotate: [0, 2, -2, 0],
                              }
                            : isHovered
                            ? {
                                scale: 1.02,
                                rotate: [0, 1, -1, 0],
                              }
                            : {}
                        }
                        transition={
                          isActive
                            ? {
                                duration: 0.3,
                                ease: "easeOut",
                                rotate: { duration: 0.6, repeat: Infinity, repeatDelay: 3 }
                              }
                            : isHovered
                            ? {
                                duration: 0.2,
                                ease: "easeOut",
                                rotate: { duration: 0.4, repeat: Infinity, repeatDelay: 1 }
                              }
                            : {}
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="h-4 w-4" />

                        {/* Enhanced active indicator with glow */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute inset-0 rounded-lg border border-current opacity-20"
                            />
                          )}
                        </AnimatePresence>

                        {/* Subtle hover glow effect */}
                        <AnimatePresence>
                          {isHovered && !isActive && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                              className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-sm"
                            />
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Label with enhanced animation */}
                      <motion.span
                        className={cn(
                          "text-sm font-medium relative",
                          isActive
                            ? "font-semibold text-shadow-sm shadow-black/40"
                            : "font-medium text-shadow-sm shadow-black/30",
                        )}
                        style={{ fontFamily: 'StampatelloFaceto, cursive' }}
                        animate={
                          isActive
                            ? {
                                scale: 1.02,
                                transition: { duration: 0.2 },
                              }
                            : isHovered
                            ? {
                                scale: 1.01,
                                transition: { duration: 0.15 },
                              }
                            : {}
                        }
                        whileHover={{ scale: 1.01 }}
                      >
                        {Array.isArray(item.label) ? item.label.join(' ') : item.label}
                        
                        {/* Subtle text glow for active items */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0 text-shadow-lg"
                              style={{
                                textShadow: `0 0 8px ${item.color}60`,
                                filter: 'blur(0.5px)'
                              }}
                            >
                              {Array.isArray(item.label) ? item.label.join(' ') : item.label}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.span>

                      {/* Enhanced bottom indicator for active item */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ 
                              scaleX: 1, 
                              opacity: 1,
                              boxShadow: `0 0 8px ${item.color}80`
                            }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                            style={{
                              backgroundColor: item.color,
                              transformOrigin: "center",
                            }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Subtle hover indicator */}
                      <AnimatePresence>
                        {isHovered && !isActive && (
                          <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 0.6 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-white/40"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </Link>
              </motion.li>
            )
          })}
        </ul>

        {/* Right side elements - Privacy, Terms, Call Us, Email */}
        <motion.div
          className={cn(
            "flex items-center gap-2",
            scrolled ? "pl-2 border-l border-white/20" : "",
          )}
          variants={itemVariants}
        >
          {/* Language Switcher */}
          <LanguageSwitcher 
            className="bg-white/10 hover:bg-white/20 border-white/20"
            compact={true}
          />

          {/* Theme Toggle */}
          <ModernThemeToggle
            isDarkMode={isDarkMode}
            onToggle={toggleTheme}
            className="bg-white/10 hover:bg-white/20"
          />

          {/* Enhanced Privacy Policy Link */}
          <Link href="/legal/privacy-policy">
            <motion.div
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 relative group"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut"
                }}
              >
                <Shield className="h-3.5 w-3.5 text-blue-300" />
              </motion.div>
              <span className="text-xs font-semibold text-shadow-sm shadow-black/40" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('navigation.privacy')}
              </span>
              
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-blue-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          </Link>

          {/* Enhanced Terms Link */}
          <Link href="/legal/terms-of-service">
            <motion.div
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 relative group"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  x: [0, 2, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              >
                <ChevronRight className="h-3.5 w-3.5 text-purple-300" />
              </motion.div>
              <span className="text-xs font-semibold text-shadow-sm shadow-black/40" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('navigation.terms')}
              </span>
              
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-purple-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          </Link>

          {/* Enhanced Call Us dropdown */}
          <div className="relative group">
            <motion.button
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 relative"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut"
                }}
              >
                <Phone className="h-3.5 w-3.5 text-green-300" />
              </motion.div>
              <span className="text-xs font-semibold text-shadow-sm shadow-black/40" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('navigation.callUs')}
              </span>
              <motion.div
                animate={{
                  rotate: [0, 180, 0]
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className="group-hover:rotate-180 transition-transform duration-300"
              >
                <ChevronDown className="h-3 w-3 text-white/60" />
              </motion.div>
              
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-green-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.button>
            
            {/* Dropdown menu */}
            <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-600/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
              <div className="p-2">
                <a
                  href="tel:+302106800708"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 transition-colors ${isDarkMode ? 'hover:bg-[#0f172a]/20 hover:text-[#0f172a]' : 'hover:bg-[#81a1d4]/10 hover:text-[#81a1d4]'}`}
                >
                  <Phone className={`h-4 w-4 ${isDarkMode ? 'text-[#0f172a]' : 'text-[#81a1d4]'}`} />
                  <div>
                    <div className="text-sm font-medium">{t('phoneNumbers.chalandri.title')}</div>
                    <div className="text-xs text-gray-500">{t('phoneNumbers.chalandri.number')}</div>
                  </div>
                </a>
                <a
                  href="tel:+302102777725"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 transition-colors ${isDarkMode ? 'hover:bg-[#0f172a]/20 hover:text-[#0f172a]' : 'hover:bg-[#81a1d4]/10 hover:text-[#81a1d4]'}`}
                >
                  <Phone className={`h-4 w-4 ${isDarkMode ? 'text-[#0f172a]' : 'text-[#81a1d4]'}`} />
                  <div>
                    <div className="text-sm font-medium">{t('phoneNumbers.neaPhiladelphia.title')}</div>
                    <div className="text-xs text-gray-500">{t('phoneNumbers.neaPhiladelphia.number')}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Enhanced Email dropdown */}
          <div className="relative group">
            <motion.button
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 relative"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  y: [0, -1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut"
                }}
              >
                <Mail className="h-3.5 w-3.5 text-red-300" />
              </motion.div>
              <span className="text-xs font-semibold text-shadow-sm shadow-black/40" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('navigation.email')}
              </span>
              <motion.div
                animate={{
                  rotate: [0, 180, 0]
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className="group-hover:rotate-180 transition-transform duration-300"
              >
                <ChevronDown className="h-3 w-3 text-white/60" />
              </motion.div>
              
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-red-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.button>
            
            {/* Dropdown menu */}
            <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-600/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
              <div className="p-2">
                <a
                  href="mailto:info@alfaschoolchalandri.com"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 transition-colors ${isDarkMode ? 'hover:bg-[#0f172a]/20 hover:text-[#0f172a]' : 'hover:bg-[#81a1d4]/10 hover:text-[#81a1d4]'}`}
                >
                  <Mail className={`h-4 w-4 flex-shrink-0 ${isDarkMode ? 'text-[#0f172a]' : 'text-[#81a1d4]'}`} />
                  <div>
                    <div className="text-sm font-medium">{t('emails.chalandri.title')}</div>
                    <div className="text-xs text-gray-500">{t('emails.chalandri.email')}</div>
                  </div>
                </a>
                <a
                  href="mailto:alfaschoolfiladelfeia@gmail.com"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 transition-colors ${isDarkMode ? 'hover:bg-[#0f172a]/20 hover:text-[#0f172a]' : 'hover:bg-[#81a1d4]/10 hover:text-[#81a1d4]'}`}
                >
                  <Mail className={`h-4 w-4 flex-shrink-0 ${isDarkMode ? 'text-[#0f172a]' : 'text-[#81a1d4]'}`} />
                  <div>
                    <div className="text-sm font-medium">{t('emails.neaPhiladelphia.title')}</div>
                    <div className="text-xs text-gray-500">alfaschoolfiladelfeia@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
})

GlowMenu.displayName = "GlowMenu"

export default GlowMenu
