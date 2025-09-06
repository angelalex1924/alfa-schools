"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Settings, Newspaper, Users, Phone, Mail, Shield, ChevronRight, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ModernThemeToggle } from "./ModernThemeToggle"
import { useTheme } from "@/contexts/ThemeContext"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useLanguage } from "@/contexts/LanguageContext"

// Navigation items with the requested links - will be updated with translations
const getNavigationItems = (t: (key: string) => string | string[]) => [
  {
    label: t('navigation.home'),
    href: "/",
    icon: Home,
    color: "#3b82f6", // Μπλε παραμένει για αντίθεση
    iconColor: "text-blue-500"
  },
  {
    label: t('navigation.services'),
    href: "/services",
    icon: Settings,
    color: "#c9b6e4", // Λιλά-λεβάντα
    iconColor: "text-[#c9b6e4]"
  },
  {
    label: t('navigation.news'),
    href: "/news",
    icon: Newspaper,
    color: "#f78da7", // Ροζ-κοραλί
    iconColor: "text-[#f78da7]"
  },
  {
    label: t('navigation.whyUs'),
    href: "/why-us",
    icon: Users,
    color: "#fabeb6", // Ροζ
    iconColor: "text-[#fabeb6]"
  },
  {
    label: t('navigation.contact'),
    href: "/contact",
    icon: Phone,
    color: "#fde7dc", // Απαλό μπεζ-ροζ
    iconColor: "text-[#fde7dc]"
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
  const navigationItems = getNavigationItems(t)

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
        </motion.div>

      {/* Logo with alfa-logo.png */}
      <motion.div
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      >
        <Link href="/" className="relative group" prefetch={false}>
          <div className="relative w-32 h-12 hover:scale-105 transition-transform duration-300">
            <Image
              src="/alfa-logo.png"
              alt="Alfa Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
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
                        "flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 relative",
                        isActive ? "text-white" : "text-white/80 hover:text-white",
                      )}
                    >
                      {/* Icon with animations */}
                      <motion.div
                        className={cn(
                          "relative flex items-center justify-center w-7 h-7 rounded-lg transition-colors",
                          isActive || isHovered
                            ? `${item.iconColor} bg-white/20 backdrop-blur-sm`
                            : "text-white/70",
                        )}
                        animate={
                          isActive
                            ? {
                                scale: 1.05,
                                boxShadow: `0 2px 8px ${item.color}40`,
                              }
                            : {}
                        }
                        transition={
                          isActive
                            ? {
                                duration: 0.3,
                                ease: "easeOut",
                              }
                            : {}
                        }
                      >
                        <Icon className="h-4 w-4" />

                        {/* Subtle active indicator */}
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
                      </motion.div>

                      {/* Label with subtle animation */}
                      <motion.span
                        className={cn(
                          "text-sm font-medium",
                          isActive
                            ? "font-semibold text-shadow-sm shadow-black/40"
                            : "font-medium text-shadow-sm shadow-black/30",
                        )}
                        animate={
                          isActive
                            ? {
                                scale: 1.02,
                                transition: { duration: 0.2 },
                              }
                            : {}
                        }
                      >
                        {Array.isArray(item.label) ? item.label.join(' ') : item.label}
                      </motion.span>

                      {/* Clean bottom indicator for active item */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
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

          {/* Privacy Policy Link */}
          <Link href="/privacy-policy">
            <motion.div
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="h-3.5 w-3.5 text-blue-300" />
              <span className="text-xs font-semibold text-shadow-sm shadow-black/40">
                {t('navigation.privacy')}
              </span>
            </motion.div>
          </Link>

          {/* Terms Link */}
          <Link href="/terms-of-service">
            <motion.div
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-3.5 w-3.5 text-purple-300" />
              <span className="text-xs font-semibold text-shadow-sm shadow-black/40">
                {t('navigation.terms')}
              </span>
            </motion.div>
          </Link>

          {/* Call Us dropdown */}
          <div className="relative group">
            <motion.button
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="h-3.5 w-3.5 text-green-300" />
              <span className="text-xs font-semibold text-shadow-sm shadow-black/40">
                {t('navigation.callUs')}
              </span>
              <ChevronDown className="h-3 w-3 text-white/60" />
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

          {/* Email dropdown */}
          <div className="relative group">
            <motion.button
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="h-3.5 w-3.5 text-red-300" />
              <span className="text-xs font-semibold text-shadow-sm shadow-black/40">
                {t('navigation.email')}
              </span>
              <ChevronDown className="h-3 w-3 text-white/60" />
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
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 dark:text-gray-500">
                  <Mail className="h-4 w-4" />
                  <div>
                    <div className="text-sm font-medium">{t('emails.neaPhiladelphia.title')}</div>
                    <div className="text-xs">{t('emails.neaPhiladelphia.email')}</div>
                  </div>
                </div>
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
