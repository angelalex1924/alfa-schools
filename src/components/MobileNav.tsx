"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Phone,
  Code,
  ChevronRight,
  Star,
  Lightbulb,
  Shield,
  Globe,
  FileText,
  Zap,
  ArrowRight,
  Coffee,
  Languages,
  Briefcase,
  Home,
  Settings,
  Newspaper,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { ModernThemeToggle } from "./ModernThemeToggle"
import { HamburgerMenu } from "./hamburger-menu"
import Image from "next/image"
import { useTheme } from "@/contexts/ThemeContext"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useLanguage } from "@/contexts/LanguageContext"

// AcronAI SVG Icon
const AcronAIIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path
        opacity="0.5"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
        fill="#92e232"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0004 6.77539C11.5448 6.77539 11.1754 7.14476 11.1754 7.60039V16.4004C11.1754 16.856 11.5448 17.2254 12.0004 17.2254C12.456 17.2254 12.8254 16.856 12.8254 16.4004V7.60039C12.8254 7.14476 12.456 6.77539 12.0004 6.77539Z"
        fill="#92e232"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.60039 8.97539C7.14476 8.97539 6.77539 9.34476 6.77539 9.80039V14.2004C6.77539 14.656 7.14476 15.0254 7.60039 15.0254C8.05603 15.0254 8.42539 14.656 8.42539 14.2004V9.80039C8.42539 9.34476 8.05603 8.97539 7.60039 8.97539Z"
        fill="#92e232"
      ></path>
      <path
        d="M15.5754 9.80039C15.5754 9.34476 15.9448 8.97539 16.4004 8.97539C16.856 8.97539 17.2254 9.34476 17.2254 9.80039V14.2004C17.2254 14.656 16.856 15.0254 16.4004 15.0254C15.9448 15.0254 15.5754 14.656 15.5754 14.2004V9.80039Z"
        fill="#92e232"
      ></path>
    </g>
  </svg>
)

// Placeholder logo components
const StreamitLogo = ({ size = "default", className = "" }: { size?: string, className?: string }) => (
  <div className={`text-red-500 ${size === "sm" ? "w-6 h-6" : "w-8 h-8"} ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  </div>
)

const SpeedtestLogo = ({ size = "default", className = "" }: { size?: string, className?: string }) => (
  <div className={`text-blue-500 ${size === "sm" ? "w-6 h-6" : "w-8 h-8"} ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  </div>
)

const AcronFlowLogo = ({ size = "default", showBadge = true, className = "" }: { size?: string, showBadge?: boolean, className?: string }) => (
  <div className={`text-indigo-500 ${size === "sm" ? "w-6 h-6" : "w-8 h-8"} ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  </div>
)

const AcronTextLogo = ({ className = "" }: { className?: string }) => (
  <div className={`text-pink-500 w-6 h-6 ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
      <path d="M14 2v6h6"/>
      <path d="M16 13H8"/>
      <path d="M16 17H8"/>
      <path d="M10 9H8"/>
    </svg>
  </div>
)

const AcronwebCookiesLogo = ({ className = "" }: { className?: string }) => (
  <div className={`text-amber-500 w-8 h-8 ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="8" cy="8" r="2"/>
      <circle cx="16" cy="8" r="2"/>
      <circle cx="8" cy="16" r="2"/>
      <circle cx="16" cy="16" r="2"/>
    </svg>
  </div>
)

const AcronWebIDLogo = ({ size = "default", showText = true, iconClassName = "" }: { size?: string, showText?: boolean, iconClassName?: string }) => (
  <div className={`text-teal-500 ${size === "sm" ? "w-6 h-6" : "w-8 h-8"} ${iconClassName}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  </div>
)

const ApplicationsIcon = ({ className = "" }: { className?: string }) => (
  <div className={`text-indigo-500 w-6 h-6 ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
    </svg>
  </div>
)

interface MobileNavProps {
  items: any[]
}

const MobileNav = ({ items }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Update the toggleMenu function to handle state changes more efficiently
  const toggleMenu = () => {
    // When closing, first set a flag to prevent flickering during animation
    if (isOpen) {
      setIsOpen(false)
    } else {
      // When opening, set state immediately
      setIsOpen(true)
      setAnimationComplete(false)
      setActiveIndex(null)
    }
  }

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Initial check
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])



  useEffect(() => {
    // Lock body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.body.classList.add("mobile-menu-open")
    } else {
      document.body.style.overflow = ""
      document.body.classList.remove("mobile-menu-open")
    }

    return () => {
      document.body.style.overflow = ""
      document.body.classList.remove("mobile-menu-open")
    }
  }, [isOpen])

  useEffect(() => {
    // Set animation complete after items have animated in
    if (isOpen) {
      const timer = setTimeout(() => {
        setAnimationComplete(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Handle navigation with client-side routing
  const handleNavigation = (href: string) => {
    setIsOpen(false)
    router.push(href)
  }

  // Simplify the animation variants to reduce performance impact
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  const panelVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  }

  // Main navigation links - Same as GlowMenu with proper branding colors
    const mainNavigationLinks = [
      {
        label: t('navigation.home'),
        href: "/",
        icon: Home,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      hoverEffect: "hover:shadow-blue-500/20",
    },
    {
      label: t('navigation.services'),
      href: "/services",
      icon: Settings,
      color: "bg-gradient-to-br from-[#c9b6e4] to-[#a78fd8]",
      hoverEffect: "hover:shadow-[#c9b6e4]/20",
    },
    {
      label: t('navigation.news'),
      href: "/news",
      icon: Newspaper,
      color: "bg-gradient-to-br from-[#f78da7] to-[#f06292]",
      hoverEffect: "hover:shadow-[#f78da7]/20",
    },
    {
      label: t('navigation.whyUs'),
      href: "/why-us",
      icon: Users,
      color: "bg-gradient-to-br from-[#fabeb6] to-[#f8a5a5]",
      hoverEffect: "hover:shadow-[#fabeb6]/20",
    },
    {
      label: t('navigation.contact'),
      href: "/contact",
      icon: Phone,
      color: "bg-gradient-to-br from-[#fde7dc] to-[#fad4c4]",
      hoverEffect: "hover:shadow-[#fde7dc]/20",
    },
  ]



  // Additional quick links
  const additionalLinks = [
    {
      label: t("navigation.privacy"),
      href: "/legal/privacy-policy",
      icon: Shield,
      color: "bg-gradient-to-br from-indigo-500/20 to-blue-500/20 text-indigo-500",
      hoverEffect: "hover:shadow-indigo-500/20",
    },
    {
      label: t("navigation.terms"),
      href: "/legal/terms-of-service",
      icon: FileText,
      color: "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-500",
      hoverEffect: "hover:shadow-purple-500/20",
    },
    {
      label: t("navigation.contact"),
      href: "/contact",
      icon: Mail,
      color: "bg-gradient-to-br from-red-500/20 to-rose-500/20 text-red-500",
      hoverEffect: "hover:shadow-red-500/20",
    },
  ]

  // Προσθέτουμε νέα κατηγορία για γρήγορη επικοινωνία
  const contactOptions = [
    {
      label: t("contact.call"),
      href: "tel:+306987770734",
      icon: Phone,
      color: "bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-500",
      hoverEffect: "hover:shadow-green-500/20",
    },
    {
      label: t("contact.email"),
      href: "mailto:contact@acronweb.com",
      icon: Mail,
      color: "bg-gradient-to-br from-red-500/20 to-rose-500/20 text-red-500",
      hoverEffect: "hover:shadow-red-500/20",
    },
    {
      label: "Website",
      href: "https://acronweb.com",
      icon: Globe,
      color: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-500",
      hoverEffect: "hover:shadow-blue-500/20",
    },
    {
      label: "Coffee Chat",
      href: "/contact",
      icon: Coffee,
      color: "bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-amber-500",
      hoverEffect: "hover:shadow-amber-500/20",
    },
  ]

  // Καθορισμός του home path - πλέον πάντα αγγλικά
  const homeHref = "/"

  return (
    <div className="mobile-nav-container">
      {/* Logo and Hamburger Menu with refined glassmorphism and rounded corners like MEGA */}
      <motion.div
        className={cn(
          "fixed top-4 left-4 right-4 z-50 rounded-xl transition-all duration-300",
          scrolled
            ? isDarkMode 
              ? "bg-[#0f172a]/50 backdrop-blur-2xl border border-[#0f172a]/60 shadow-[0_8px_32px_rgba(15,23,42,0.5)]"
              : "bg-[#81a1d4]/20 backdrop-blur-2xl border border-[#81a1d4]/30 shadow-[0_8px_32px_rgba(129,161,212,0.2)]"
            : isDarkMode
              ? "bg-[#0f172a]/45 backdrop-blur-2xl border border-[#0f172a]/50 shadow-[0_4px_24px_rgba(15,23,42,0.45)]"
              : "bg-[#81a1d4]/15 backdrop-blur-2xl border border-[#81a1d4]/20 shadow-[0_4px_24px_rgba(129,161,212,0.15)]",
        )}
        initial={{ y: -10, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.5 },
        }}
      >
        {/* Enhanced glass effect background */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className={`absolute inset-0 backdrop-blur-3xl ${isDarkMode ? 'bg-[#0f172a]/15' : 'bg-[#81a1d4]/10'}`}></div>
          <div className={`absolute inset-0 bg-gradient-to-r ${isDarkMode ? 'from-[#0f172a]/8 via-[#0f172a]/12 to-[#0f172a]/8' : 'from-[#81a1d4]/5 via-[#81a1d4]/8 to-[#81a1d4]/5'}`}></div>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl"></div>
        </div>
        
        <div className="flex items-center justify-between p-1 px-3 mx-auto relative z-10">
          <Link href={homeHref} className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -5, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative"
            >
              <div className="relative w-24 h-10">
                <Image
                  src="/alfa-logo.png"
                  alt="Alfa Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </Link>

          {/* Theme toggle button */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <LanguageSwitcher 
              className={cn(scrolled ? "bg-white/50 dark:bg-gray-800/50" : "")}
              compact={true}
            />

            <ModernThemeToggle
              isDarkMode={isDarkMode}
              onToggle={toggleTheme}
              className={cn(scrolled ? "bg-white/50 dark:bg-gray-800/50" : "")}
            />

            <div className="hamburger">
              <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Animated Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with enhanced blur effect */}
            <motion.div
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-md will-change-transform"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              onClick={toggleMenu}
              aria-hidden="true"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                zIndex: 90,
              }}
            />

            {/* Mobile Navigation Panel with refined design */}
            <motion.div
              className={`fixed inset-0 z-[100] backdrop-blur-xl overflow-auto will-change-transform ${isDarkMode ? 'bg-[#0f172a]/98' : 'bg-[#81a1d4]/95'}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelVariants}
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                zIndex: 100,
              }}
            >
              {/* Close button */}
              <motion.div
                className="absolute top-4 right-4 z-50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
              </motion.div>

              {/* Content container with subtle gradient background */}
              <div className="relative h-full overflow-hidden">
                {/* Βελτιωμένο gradient background με περισσότερα χρώματα */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div
                    className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                      x: [0, 20, 0],
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"
                    animate={{
                      x: [0, -20, 0],
                      y: [0, 20, 0],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                  />
                  <motion.div
                    className="absolute top-1/3 left-1/4 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                      x: [0, 15, 0],
                      y: [0, 15, 0],
                    }}
                    transition={{
                      duration: 18,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </div>

                {/* Content with refined styling */}
                <div className="relative z-10 pt-20 pb-8 px-6 h-full flex flex-col overflow-y-auto overflow-x-hidden hide-scrollbar max-w-md mx-auto">
                  {/* Company badge - βελτιωμένο με animation */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/20 mb-3"
                      whileHover={{ scale: 1.05, x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {t('hero.title')}
                      </span>
                    </motion.div>
                    <div className="flex items-center">
                      <div className="relative w-32 h-12">
                        <Image
                          src="/alfa-logo.png"
                          alt="Alfa Logo"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="relative">
                        <svg className="absolute -left-1 -top-1 w-6 h-6 text-amber-100" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM11.61 11.84C11.61 14.92 10.94 15.61 9.15 16.67C9.03 16.74 8.9 16.77 8.77 16.77C8.51 16.77 8.26 16.64 8.12 16.4C7.91 16.04 8.03 15.58 8.38 15.37C9.59 14.65 10.01 14.39 10.09 12.58H8.19C7.1 12.58 6.25 11.73 6.25 10.64V9.16C6.25 8.07 7.1 7.22 8.19 7.22H9.68C10.75 7.22 11.62 8.09 11.62 9.16V11.84H11.61ZM17.75 11.84C17.75 14.92 17.08 15.61 15.29 16.67C15.17 16.74 15.04 16.77 14.91 16.77C14.65 16.77 14.4 16.64 14.26 16.4C14.05 16.04 14.17 15.58 14.52 15.37C15.73 14.65 16.15 14.39 16.23 12.58H14.32C13.23 12.58 12.38 11.73 12.38 10.64V9.16C12.38 8.07 13.23 7.22 14.32 7.22H15.81C16.88 7.22 17.75 8.09 17.75 9.16V11.84Z"/>
                        </svg>
                        <p className="text-sm text-white/90 italic font-medium leading-relaxed pl-6 pr-2">
                          {t('footer.slogan')}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Language Switcher in menu */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                  >
                    <LanguageSwitcher mobile={true} />
                  </motion.div>

                  {/* Main Navigation Links - Same as GlowMenu */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h3 className="text-sm font-medium text-white mb-4 flex items-center">
                      <Star className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                      {t('navigation.main') || 'Main Navigation'}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {mainNavigationLinks.map((link, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -2, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 20,
                            delay: 0.2 + index * 0.1, 
                            duration: 0.4 
                          }}
                        >
                                                      <a
                              href={link.href}
                              className={`group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border border-white/30 hover:bg-gradient-to-br hover:from-white/40 hover:via-white/30 hover:to-white/20 hover:border-white/60 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl ${isDarkMode ? 'hover:shadow-[#0f172a]/50' : 'hover:shadow-[#81a1d4]/50'}`}
                              onClick={(e) => {
                                if (link.href.startsWith("http")) {
                                  window.open(link.href, "_blank")
                                } else {
                                  e.preventDefault()
                                  handleNavigation(link.href)
                                }
                              }}
                            >
                            {/* Icon with enhanced styling */}
                            <motion.div
                              className={`w-14 h-14 rounded-2xl ${link.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                              whileHover={{
                                scale: 1.1,
                                rotate: 5,
                              }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <link.icon className="h-7 w-7 text-white" />
                            </motion.div>
                            
                            {/* Content */}
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-[#81a1d4] transition-colors duration-300">
                                {link.label}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-white/80 mt-1">
                                {link.label === t('navigation.home') && (t('navigation.homeDescription') || "Αρχική σελίδα")}
                                {link.label === t('navigation.services') && (t('navigation.servicesDescription') || "Εξειδικευμένες υπηρεσίες")}
                                {link.label === t('navigation.news') && (t('navigation.newsDescription') || "Τελευταία νέα και ενημερώσεις")}
                                {link.label === t('navigation.whyUs') && (t('navigation.whyUsDescription') || "Ανακαλύψτε τα πλεονεκτήματά μας")}
                                {link.label === t('navigation.contact') && (t('navigation.contactDescription') || "Επικοινωνήστε μαζί μας")}
                              </p>
                            </div>
                            
                            {/* Arrow indicator */}
                            <motion.div
                              className="text-gray-400 group-hover:text-[#81a1d4] transition-colors duration-300"
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="h-5 w-5" />
                            </motion.div>
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>



                  {/* Legal & Contact Links */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                  >
                    <h3 className="text-sm font-medium text-white mb-3 flex items-center">
                      <Star className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                      {t("navigation.legal") || "Legal & Contact"}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {additionalLinks.map((link, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -5, scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                          whileTap={{ scale: 0.97 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 10,
                            delay: 0.3 + index * 0.05, 
                            duration: 0.3 
                          }}
                        >
                          <a
                            href={link.href}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border border-white/30 hover:bg-gradient-to-br hover:from-white/40 hover:via-white/30 hover:to-white/20 hover:border-white/60 hover:scale-[1.02] transition-all shadow-lg hover:shadow-2xl ${isDarkMode ? 'hover:shadow-[#0f172a]/50' : 'hover:shadow-[#81a1d4]/50'}`}
                            onClick={(e) => {
                              e.preventDefault()
                              handleNavigation(link.href)
                            }}
                          >
                            <motion.div
                              className={`w-10 h-10 rounded-xl ${link.color} flex items-center justify-center shadow-sm ${link.hoverEffect}`}
                              whileHover={{
                                scale: 1.1,
                                rotate: 5,
                                boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                              }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <link.icon className="h-5 w-5" />
                            </motion.div>
                            <span className="text-sm font-medium text-gray-700 dark:text-white">{link.label}</span>
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Κοινωνικά Δίκτυα */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                  >
                    <h3 className="text-sm font-medium text-white mb-3 flex items-center">
                      <Globe className="h-3.5 w-3.5 mr-1.5 text-[#81a1d4]" />
                       {t('footer.socialMedia')}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        whileHover={{ y: -5, scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        <a
                          href="https://www.facebook.com/profile.php?id=100057649952827"
                          target="_blank"
                          rel="nofollow noopener"
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border border-white/30 hover:bg-gradient-to-br hover:from-white/40 hover:via-white/30 hover:to-white/20 hover:border-white/60 hover:scale-[1.02] transition-all shadow-lg hover:shadow-2xl ${isDarkMode ? 'hover:shadow-[#0f172a]/50' : 'hover:shadow-[#81a1d4]/50'}`}
                        >
                          <motion.div
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center shadow-sm"
                            whileHover={{
                              scale: 1.1,
                              rotate: 5,
                              boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </motion.div>
                          <span className="text-sm font-medium text-gray-700 dark:text-white">Facebook</span>
                        </a>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ y: -5, scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.3 }}
                      >
                        <a
                          href="https://www.instagram.com/alfaschools/"
                          target="_blank"
                          rel="nofollow noopener"
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border border-white/30 hover:bg-gradient-to-br hover:from-white/40 hover:via-white/30 hover:to-white/20 hover:border-white/60 hover:scale-[1.02] transition-all shadow-lg hover:shadow-2xl ${isDarkMode ? 'hover:shadow-[#0f172a]/50' : 'hover:shadow-[#81a1d4]/50'}`}
                        >
                          <motion.div
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center shadow-sm"
                            whileHover={{
                              scale: 1.1,
                              rotate: 5,
                              boxShadow: "0 0 15px rgba(236, 72, 153, 0.5)",
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <g clipPath="url(#clip0_4418_7411)">
                                <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"/>
                                <path d="M12 16.25C9.66 16.25 7.75 14.34 7.75 12C7.75 9.66 9.66 7.75 12 7.75C14.34 7.75 16.25 9.66 16.25 12C16.25 14.34 14.34 16.25 12 16.25ZM12 9.25C10.48 9.25 9.25 10.48 9.25 12C9.25 13.52 10.48 14.75 12 14.75C13.52 14.75 14.75 13.52 14.75 12C14.75 10.48 13.52 9.25 12 9.25Z"/>
                                <path d="M17 7.50088C16.87 7.50088 16.74 7.47088 16.62 7.42088C16.5 7.37088 16.39 7.30088 16.29 7.21088C16.2 7.11088 16.12 7.00088 16.07 6.88088C16.02 6.76088 16 6.63088 16 6.50088C16 6.37088 16.02 6.24088 16.07 6.12088C16.13 5.99088 16.2 5.89088 16.29 5.79088C16.34 5.75088 16.39 5.70088 16.44 5.67088C16.5 5.63088 16.56 5.60088 16.62 5.58088C16.68 5.55088 16.74 5.53088 16.81 5.52088C17.13 5.45088 17.47 5.56088 17.71 5.79088C17.8 5.89088 17.87 5.99088 17.92 6.12088C17.97 6.24088 18 6.37088 18 6.50088C18 6.63088 17.97 6.76088 17.92 6.88088C17.87 7.00088 17.8 7.11088 17.71 7.21088C17.61 7.30088 17.5 7.37088 17.38 7.42088C17.26 7.47088 17.13 7.50088 17 7.50088Z"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_4418_7411">
                                  <rect width="24" height="24" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                          </motion.div>
                          <span className="text-sm font-medium text-gray-700 dark:text-white">Instagram</span>
                        </a>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Επικοινωνία με επιλογές για Χαλάνδρι και Νέα Φιλαδέλφεια */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h3 className="text-sm font-medium text-white mb-3 flex items-center">
                      <Mail className="h-3.5 w-3.5 mr-1.5 text-[#81a1d4]" />
                       {t('contact.needHelp')}
                    </h3>
                    <p className="text-sm text-white/80 mb-4">{t('contact.helpDescription')}</p>
                    
                    {/* Χαλάνδρι */}
                    <motion.div
                      className="mb-3"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                    >
                      <div className={`p-4 rounded-2xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border border-white/30 hover:bg-gradient-to-br hover:from-white/40 hover:via-white/30 hover:to-white/20 hover:border-white/60 transition-all duration-300 shadow-lg hover:shadow-2xl ${isDarkMode ? 'hover:shadow-[#0f172a]/50' : 'hover:shadow-[#81a1d4]/50'}`}>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br flex items-center justify-center ${isDarkMode ? 'from-[#0f172a] to-[#1e293b]' : 'from-[#81a1d4] to-[#6b8bc4]'}`}>
                            <Phone className="h-5 w-5 text-white" />
                          </div>
                           {t('phoneNumbers.chalandri.title')}
                        </h4>
                        <div className="space-y-3">
                          <a
                            href="tel:+302106800708"
                            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 border border-green-500/20"
                          >
                            <Phone className="h-5 w-5 text-green-500" />
                              <div>
                                <div className="text-sm font-medium text-white">{t('contact.phone')}</div>
                                <div className="text-xs text-green-300">+30 210 6800 708</div>
                              </div>
                          </a>
                          <a
                            href="mailto:info@alfaschoolchalandri.com"
                            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 hover:from-red-500/30 hover:to-rose-500/30 transition-all duration-300 border border-red-500/20"
                          >
                            <Mail className="h-5 w-5 text-red-500" />
                              <div>
                                <div className="text-sm font-medium text-white">{t('contact.email')}</div>
                                <div className="text-xs text-red-300">info@alfaschoolchalandri.com</div>
                              </div>
                          </a>
                        </div>
                      </div>
                    </motion.div>

                    {/* Νέα Φιλαδέλφεια */}
                    <motion.div
                      className="mb-3"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      <div className={`p-4 rounded-2xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border border-white/30 hover:bg-gradient-to-br hover:from-white/40 hover:via-white/30 hover:to-white/20 hover:border-white/60 transition-all duration-300 shadow-lg hover:shadow-2xl ${isDarkMode ? 'hover:shadow-[#0f172a]/50' : 'hover:shadow-[#81a1d4]/50'}`}>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br flex items-center justify-center ${isDarkMode ? 'from-[#0f172a] to-[#1e293b]' : 'from-[#81a1d4] to-[#6b8bc4]'}`}>
                            <Phone className="h-5 w-5 text-white" />
                          </div>
                           {t('phoneNumbers.neaPhiladelphia.title')}
                        </h4>
                        <div className="space-y-3">
                          <a
                            href="tel:+302102777725"
                            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 border border-green-500/20"
                          >
                            <Phone className="h-5 w-5 text-green-500" />
                              <div>
                                <div className="text-sm font-medium text-white">{t('contact.phone')}</div>
                                <div className="text-xs text-green-300">+30 210 2777 725</div>
                              </div>
                          </a>
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 border border-gray-500/20">
                            <Mail className="h-5 w-5 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-white/60">{t('contact.email')}</div>
                              <div className="text-xs text-gray-400">-</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Footer section - Βελτιωμένο με animation */}
                  <motion.div
                    className="mt-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                  >

                    {/* Footer links - Βελτιωμένα με animation */}
                    <div className="mt-6 flex justify-center gap-4">
                      <motion.a
                        href="/legal/privacy-policy"
                        className="text-xs text-white/80 hover:text-white flex items-center gap-1"
                        whileHover={{ scale: 1.05, x: 2 }}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavigation("/legal/privacy-policy")
                        }}
                      >
                        <Shield className="h-3 w-3" />
                        {t("navigation.privacy")}
                      </motion.a>
                      <motion.a
                        href="/legal/terms-of-service"
                        className="text-xs text-white/80 hover:text-white flex items-center gap-1"
                        whileHover={{ scale: 1.05, x: 2 }}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavigation("/legal/terms-of-service")
                        }}
                      >
                        <FileText className="h-3 w-3" />
                        <span className="text-xs font-semibold text-shadow-sm shadow-black/40">
                           {t('navigation.terms')}
                        </span>
                      </motion.a>
                    </div>

                    {/* Copyright */}
                    <div className="mt-4 text-center">
                      <p className="text-xs text-white/60">
                        © {new Date().getFullYear()} {t('footer.copyright') || 'Alfa Schools. All rights reserved.'}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNav
