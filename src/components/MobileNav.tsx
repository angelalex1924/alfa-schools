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

// Custom Services Icon
const ServicesIcon = ({ className }: { className?: string }) => (
  <svg
    version="1.0"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 64 64"
    enableBackground="new 0 0 64 64"
    xmlSpace="preserve"
    fill="currentColor"
    className={className}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <path fill="#F9EBB2" d="M56,62H10c-2.209,0-4-1.791-4-4s1.791-4,4-4h46V62z"></path>
        <g>
          <path fill="#45AAB8" d="M6,4v49.537C7.062,52.584,8.461,52,10,52h2V2H8C6.896,2,6,2.896,6,4z"></path>
          <path fill="#45AAB8" d="M56,2H14v50h42h2v-2V4C58,2.896,57.104,2,56,2z"></path>
        </g>
        <g>
          <path fill="#394240" d="M60,52V4c0-2.211-1.789-4-4-4H8C5.789,0,4,1.789,4,4v54c0,3.313,2.687,6,6,6h49c0.553,0,1-0.447,1-1 s-0.447-1-1-1h-1v-8C59.104,54,60,53.104,60,52z M6,4c0-1.104,0.896-2,2-2h4v50h-2c-1.539,0-2.938,0.584-4,1.537V4z M56,62H10 c-2.209,0-4-1.791-4-4s1.791-4,4-4h46V62z M56,52H14V2h42c1.104,0,2,0.896,2,2v46v2H56z"></path>
          <path fill="#394240" d="M43,26H23c-0.553,0-1,0.447-1,1s0.447,1,1,1h20c0.553,0,1-0.447,1-1S43.553,26,43,26z"></path>
          <path fill="#394240" d="M49,20H23c-0.553,0-1,0.447-1,1s0.447,1,1,1h26c0.553,0,1-0.447,1-1S49.553,20,49,20z"></path>
          <path fill="#394240" d="M23,16h12c0.553,0,1-0.447,1-1s-0.447-1-1-1H23c-0.553,0-1,0.447-1,1S22.447,16,23,16z"></path>
        </g>
        <path opacity="0.2" fill="#231F20" d="M6,4v49.537C7.062,52.584,8.461,52,10,52h2V2H8C6.896,2,6,2.896,6,4z"></path>
      </g>
    </g>
  </svg>
)
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { ModernThemeToggle } from "./ModernThemeToggle"
import { HamburgerMenu } from "./hamburger-menu"
import Image from "next/image"
import { useTheme } from "@/contexts/ThemeContext"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useLanguage } from "@/contexts/LanguageContext"
import { useChristmasTheme } from "@/contexts/ChristmasThemeContext"
import { useHalloweenTheme } from "@/contexts/HalloweenThemeContext"
import { useCarnivalTheme } from "@/contexts/CarnivalThemeContext"
import { useEasterTheme } from "@/contexts/EasterThemeContext"
import { useSummerTheme } from "@/contexts/SummerThemeContext"
import { useMobileMenu } from "@/contexts/MobileMenuContext"
import { GamesIcon } from "./custom-icons"
import { AnniversaryText } from "./AnniversaryText"
import LanguageIcon from "./LanguageIcon"
import { SantaIcon, ChristmasTreeIcon, ReindeerIcon, GiftBoxIcon, BellIcon } from "./ChristmasIcons"
import HomeIcon from "./HomeIcon"
import ArticlesIcon from "./ArticlesIcon"
import WhyUsIcon from "./WhyUsIcon"
import AboutUsIcon from "./AboutUsIcon"
import ContactIcon from "./ContactIcon"
import PrivacyIcon from "./PrivacyIcon"
import TermsIcon from "./TermsIcon"
import { HalloweenServicesIcon, HalloweenNewsIcon, HalloweenGamesIcon, HalloweenContactIcon } from "./HalloweenIcons"

// Halloween Icons Helper
const getHalloweenIcon = (iconType: string, className?: string) => {
  const iconMap: { [key: string]: string } = {
    pumpkin: "🎃",
    witch: "🧙‍♀️", 
    ghost: "👻",
    bat: "🦇",
    spider: "🕷️",
    skull: "💀"
  }
  
  return (
    <span className={`${className} flex items-center justify-center`} style={{ lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {iconMap[iconType] || "🎃"}
    </span>
  )
}

// Carnival Icons Helper
const getCarnivalIcon = (iconType: string, className?: string) => {
  const iconMap: { [key: string]: string } = {
    mask: "🎭",
    circus: "🎪", 
    art: "🎨",
    music: "🎵",
    guitar: "🎸",
    trumpet: "🎺"
  }
  
  return (
    <span className={`${className} flex items-center justify-center`} style={{ lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {iconMap[iconType] || "🎭"}
    </span>
  )
}

// Easter Icons Helper
const getEasterIcon = (iconType: string, className?: string) => {
  const iconMap: { [key: string]: string } = {
    bunny: "🐰",
    egg: "🥚", 
    chick: "🐣",
    flower: "🌸",
    tulip: "🌷",
    butterfly: "🦋"
  }
  
  return (
    <span className={`${className} flex items-center justify-center`} style={{ lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {iconMap[iconType] || "🐰"}
    </span>
  )
}

// Summer Icons Helper
const getSummerIcon = (iconType: string, className?: string) => {
  const iconMap: { [key: string]: string } = {
    sun: "☀️",
    sunface: "🌞", 
    sunflower: "🌻",
    beach: "🏖️",
    wave: "🌊",
    shell: "🐚"
  }
  
  return (
    <span className={`${className} flex items-center justify-center`} style={{ lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {iconMap[iconType] || "☀️"}
    </span>
  )
}

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
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()
  const { t, language, setLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Update the toggleMenu function to handle state changes more efficiently
  const toggleMenu = () => {
    // Prevent multiple rapid toggles that can cause flickering
    if (isToggling) return
    
    setIsToggling(true)
    
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
      setActiveIndex(null)
    } else {
      setIsMobileMenuOpen(true)
      setAnimationComplete(false)
      setActiveIndex(null)
    }
    
    // Reset toggling flag after animation
    setTimeout(() => setIsToggling(false), 300)
  }

  // Add scroll event listener with throttling to prevent flickering
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY
          setScrolled(scrollPosition > 10)
          ticking = false
        })
        ticking = true
      }
    }

    // Initial check
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])



  useEffect(() => {
    // Lock body scroll when menu is open
    if (isMobileMenuOpen) {
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
  }, [isMobileMenuOpen])

  // Listen for language change events to close mobile menu
  useEffect(() => {
    const handleCloseMobileMenu = () => {
      setIsMobileMenuOpen(false)
    }

    window.addEventListener('closeMobileMenu', handleCloseMobileMenu)
    return () => window.removeEventListener('closeMobileMenu', handleCloseMobileMenu)
  }, [])

  useEffect(() => {
    // Set animation complete after items have animated in
    if (isMobileMenuOpen) {
      const timer = setTimeout(() => {
        setAnimationComplete(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isMobileMenuOpen])

  // Handle navigation with client-side routing
  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false)
    router.push(href)
  }

  // Optimized animation variants to prevent flickering
  const backdropVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  }

  const panelVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.98,
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
  const { isChristmasMode } = useChristmasTheme()
  const { isHalloweenMode } = useHalloweenTheme()
  const { isCarnivalMode } = useCarnivalTheme()
  const { isEasterMode } = useEasterTheme()
  const { isSummerMode } = useSummerTheme()
  const mainNavigationLinks = [
    {
      label: t('navigation.home'),
      href: "/",
      icon: isChristmasMode ? SantaIcon : isHalloweenMode ? "pumpkin" : isCarnivalMode ? "mask" : isEasterMode ? "bunny" : isSummerMode ? "sun" : HomeIcon,
      color: isChristmasMode ? "bg-gradient-to-br from-red-500 to-red-600" : isHalloweenMode ? "bg-gradient-to-br from-orange-500 to-orange-600" : isCarnivalMode ? "bg-gradient-to-br from-pink-500 to-pink-600" : isEasterMode ? "bg-gradient-to-br from-pink-500 to-pink-600" : isSummerMode ? "bg-gradient-to-br from-yellow-500 to-yellow-600" : "bg-gradient-to-br from-blue-500 to-blue-600",
      hoverEffect: isChristmasMode ? "hover:shadow-red-500/20" : isHalloweenMode ? "hover:shadow-orange-500/20" : isCarnivalMode ? "hover:shadow-pink-500/20" : isEasterMode ? "hover:shadow-pink-500/20" : isSummerMode ? "hover:shadow-yellow-500/20" : "hover:shadow-blue-500/20",
    },
    {
      label: t('navigation.services'),
      href: "/services",
      icon: isChristmasMode ? ChristmasTreeIcon : isHalloweenMode ? HalloweenServicesIcon : isCarnivalMode ? "circus" : isEasterMode ? "egg" : isSummerMode ? "sunflower" : ServicesIcon,
      color: isChristmasMode ? "bg-gradient-to-br from-green-500 to-green-600" : isHalloweenMode ? "bg-gradient-to-br from-purple-500 to-purple-600" : isCarnivalMode ? "bg-gradient-to-br from-teal-500 to-teal-600" : isEasterMode ? "bg-gradient-to-br from-green-500 to-green-600" : isSummerMode ? "bg-gradient-to-br from-orange-500 to-orange-600" : "bg-gradient-to-br from-[#c9b6e4] to-[#a78fd8]",
      hoverEffect: isChristmasMode ? "hover:shadow-green-500/20" : isHalloweenMode ? "hover:shadow-purple-500/20" : isCarnivalMode ? "hover:shadow-teal-500/20" : isEasterMode ? "hover:shadow-green-500/20" : isSummerMode ? "hover:shadow-orange-500/20" : "hover:shadow-[#c9b6e4]/20",
    },
    {
      label: t('navigation.news'),
      href: "/articles",
      icon: isChristmasMode ? BellIcon : isHalloweenMode ? HalloweenNewsIcon : isCarnivalMode ? "art" : isEasterMode ? "chick" : isSummerMode ? "beach" : ArticlesIcon,
      color: isChristmasMode ? "bg-gradient-to-br from-yellow-500 to-yellow-600" : isHalloweenMode ? "bg-gradient-to-br from-amber-500 to-amber-600" : isCarnivalMode ? "bg-gradient-to-br from-yellow-500 to-yellow-600" : isEasterMode ? "bg-gradient-to-br from-yellow-500 to-yellow-600" : isSummerMode ? "bg-gradient-to-br from-orange-500 to-orange-600" : "bg-gradient-to-br from-[#f78da7] to-[#f06292]",
      hoverEffect: isChristmasMode ? "hover:shadow-yellow-500/20" : isHalloweenMode ? "hover:shadow-amber-500/20" : isCarnivalMode ? "hover:shadow-yellow-500/20" : isEasterMode ? "hover:shadow-yellow-500/20" : isSummerMode ? "hover:shadow-orange-500/20" : "hover:shadow-[#f78da7]/20",
    },
    {
      label: t('navigation.whyUs'),
      href: "/why-us",
      icon: isChristmasMode ? ReindeerIcon : isHalloweenMode ? "bat" : isCarnivalMode ? "music" : isEasterMode ? "flower" : isSummerMode ? "wave" : WhyUsIcon,
      color: isChristmasMode ? "bg-gradient-to-br from-amber-600 to-amber-700" : isHalloweenMode ? "bg-gradient-to-br from-gray-600 to-gray-700" : isCarnivalMode ? "bg-gradient-to-br from-blue-500 to-blue-600" : isEasterMode ? "bg-gradient-to-br from-pink-500 to-pink-600" : isSummerMode ? "bg-gradient-to-br from-cyan-500 to-cyan-600" : "bg-gradient-to-br from-[#fabeb6] to-[#f8a5a5]",
      hoverEffect: isChristmasMode ? "hover:shadow-amber-500/20" : isHalloweenMode ? "hover:shadow-gray-500/20" : isCarnivalMode ? "hover:shadow-blue-500/20" : isEasterMode ? "hover:shadow-pink-500/20" : isSummerMode ? "hover:shadow-cyan-500/20" : "hover:shadow-[#fabeb6]/20",
    },
    {
      label: t('navigation.aboutUs'),
      href: "/about-us",
      icon: isChristmasMode ? "🏫" : isHalloweenMode ? "skull" : isCarnivalMode ? "mask" : isEasterMode ? "bunny" : isSummerMode ? "sun" : AboutUsIcon,
      color: isChristmasMode ? "bg-gradient-to-br from-blue-600 to-blue-700" : isHalloweenMode ? "bg-gradient-to-br from-amber-800 to-amber-900" : isCarnivalMode ? "bg-gradient-to-br from-pink-600 to-pink-700" : isEasterMode ? "bg-gradient-to-br from-pink-600 to-pink-700" : isSummerMode ? "bg-gradient-to-br from-orange-500 to-orange-600" : "bg-gradient-to-br from-blue-600 to-blue-700",
      hoverEffect: isChristmasMode ? "hover:shadow-blue-500/20" : isHalloweenMode ? "hover:shadow-amber-500/20" : isCarnivalMode ? "hover:shadow-pink-500/20" : isEasterMode ? "hover:shadow-pink-500/20" : isSummerMode ? "hover:shadow-orange-500/20" : "hover:shadow-blue-500/20",
      isEmoji: isChristmasMode || isHalloweenMode || isCarnivalMode || isEasterMode || isSummerMode
    },
    {
      label: t('navigation.games'),
      href: "/games",
      icon: isChristmasMode ? GiftBoxIcon : isHalloweenMode ? HalloweenGamesIcon : isCarnivalMode ? "guitar" : isEasterMode ? "tulip" : isSummerMode ? "shell" : GamesIcon,
      color: isChristmasMode ? "bg-gradient-to-br from-red-500 to-red-600" : isHalloweenMode ? "bg-gradient-to-br from-red-500 to-red-600" : isCarnivalMode ? "bg-gradient-to-br from-green-500 to-green-600" : isEasterMode ? "bg-gradient-to-br from-teal-500 to-teal-600" : isSummerMode ? "bg-gradient-to-br from-orange-500 to-orange-600" : "bg-gradient-to-br from-[#a8e6cf] to-[#88d8a3]",
      hoverEffect: isChristmasMode ? "hover:shadow-red-500/20" : isHalloweenMode ? "hover:shadow-red-500/20" : isCarnivalMode ? "hover:shadow-green-500/20" : isEasterMode ? "hover:shadow-teal-500/20" : isSummerMode ? "hover:shadow-orange-500/20" : "hover:shadow-[#a8e6cf]/20",
    },
    {
      label: t('navigation.contact'),
      href: "/contact",
      icon: isHalloweenMode ? HalloweenContactIcon : isCarnivalMode ? "trumpet" : isEasterMode ? "butterfly" : isSummerMode ? "sunface" : ContactIcon,
      color: isChristmasMode ? "bg-gradient-to-br from-green-500 to-green-600" : isHalloweenMode ? "bg-gradient-to-br from-gray-500 to-gray-600" : isCarnivalMode ? "bg-gradient-to-br from-pink-500 to-pink-600" : isEasterMode ? "bg-gradient-to-br from-blue-500 to-blue-600" : isSummerMode ? "bg-gradient-to-br from-yellow-500 to-yellow-600" : "bg-gradient-to-br from-[#fde7dc] to-[#fad4c4]",
      hoverEffect: isChristmasMode ? "hover:shadow-green-500/20" : isHalloweenMode ? "hover:shadow-gray-500/20" : isCarnivalMode ? "hover:shadow-pink-500/20" : isEasterMode ? "hover:shadow-blue-500/20" : isSummerMode ? "hover:shadow-yellow-500/20" : "hover:shadow-[#fde7dc]/20",
    },
  ]



  // Additional quick links
  const additionalLinks = [
    {
      label: t("navigation.privacy"),
      href: "/legal/privacy-policy",
      icon: PrivacyIcon,
      color: "bg-gradient-to-br from-indigo-500/20 to-blue-500/20 text-indigo-500",
      hoverEffect: "hover:shadow-indigo-500/20",
    },
    {
      label: t("navigation.terms"),
      href: "/legal/terms-of-service",
      icon: TermsIcon,
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
      icon: ContactIcon,
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

  // Theme-based mobile navbar background colors
  const getMobileNavbarBackground = () => {
    if (isChristmasMode) {
      return scrolled
        ? isDarkMode
          ? "bg-gradient-to-r from-red-900/15 via-green-900/8 to-red-900/15 backdrop-blur-2xl border border-red-800/20"
          : "bg-gradient-to-r from-red-50/30 via-green-50/20 to-red-50/30 backdrop-blur-2xl border border-red-200/40"
        : isDarkMode
          ? "bg-gradient-to-r from-red-900/12 via-green-900/6 to-red-900/12 backdrop-blur-2xl border border-red-800/15"
          : "bg-gradient-to-r from-red-50/25 via-green-50/15 to-red-50/25 backdrop-blur-2xl border border-red-200/30"
    } else if (isHalloweenMode) {
      return scrolled
        ? isDarkMode
          ? "bg-gradient-to-r from-orange-900/15 via-purple-900/8 to-orange-900/15 backdrop-blur-2xl border border-orange-800/20"
          : "bg-gradient-to-r from-orange-50/30 via-purple-50/20 to-orange-50/30 backdrop-blur-2xl border border-orange-200/40"
        : isDarkMode
          ? "bg-gradient-to-r from-orange-900/12 via-purple-900/6 to-orange-900/12 backdrop-blur-2xl border border-orange-800/15"
          : "bg-gradient-to-r from-orange-50/25 via-purple-50/15 to-orange-50/25 backdrop-blur-2xl border border-orange-200/30"
    } else if (isCarnivalMode) {
      return scrolled
        ? isDarkMode
          ? "bg-gradient-to-r from-pink-900/15 via-teal-900/8 to-pink-900/15 backdrop-blur-2xl border border-pink-800/20"
          : "bg-gradient-to-r from-pink-50/30 via-teal-50/20 to-pink-50/30 backdrop-blur-2xl border border-pink-200/40"
        : isDarkMode
          ? "bg-gradient-to-r from-pink-900/12 via-teal-900/6 to-pink-900/12 backdrop-blur-2xl border border-pink-800/15"
          : "bg-gradient-to-r from-pink-50/25 via-teal-50/15 to-pink-50/25 backdrop-blur-2xl border border-pink-200/30"
    } else if (isEasterMode) {
      return scrolled
        ? isDarkMode
          ? "bg-gradient-to-r from-pink-900/15 via-green-900/8 to-pink-900/15 backdrop-blur-2xl border border-pink-800/20"
          : "bg-gradient-to-r from-pink-50/30 via-green-50/20 to-pink-50/30 backdrop-blur-2xl border border-pink-200/40"
        : isDarkMode
          ? "bg-gradient-to-r from-pink-900/12 via-green-900/6 to-pink-900/12 backdrop-blur-2xl border border-pink-800/15"
          : "bg-gradient-to-r from-pink-50/25 via-green-50/15 to-pink-50/25 backdrop-blur-2xl border border-pink-200/30"
    } else if (isSummerMode) {
      return scrolled
        ? isDarkMode
          ? "bg-gradient-to-r from-yellow-900/15 via-orange-900/8 to-yellow-900/15 backdrop-blur-2xl border border-yellow-800/20"
          : "bg-gradient-to-r from-yellow-50/30 via-orange-50/20 to-yellow-50/30 backdrop-blur-2xl border border-yellow-200/40"
        : isDarkMode
          ? "bg-gradient-to-r from-yellow-900/12 via-orange-900/6 to-yellow-900/12 backdrop-blur-2xl border border-yellow-800/15"
          : "bg-gradient-to-r from-yellow-50/25 via-orange-50/15 to-yellow-50/25 backdrop-blur-2xl border border-yellow-200/30"
    } else {
      return scrolled
        ? isDarkMode
          ? "bg-[#0f172a]/50 backdrop-blur-2xl border border-[#0f172a]/60"
          : "bg-[#81a1d4]/20 backdrop-blur-2xl border border-[#81a1d4]/30"
        : isDarkMode
          ? "bg-[#0f172a]/45 backdrop-blur-2xl border border-[#0f172a]/50"
          : "bg-[#81a1d4]/15 backdrop-blur-2xl border border-[#81a1d4]/20"
    }
  }

  // Theme-based mobile menu panel background colors
  const getMobileMenuBackground = () => {
    if (isChristmasMode) {
      return isDarkMode 
        ? 'bg-gradient-to-br from-red-900/85 via-green-900/80 to-red-900/85'
        : 'bg-gradient-to-br from-red-50/98 via-green-50/95 to-red-50/98'
    } else if (isHalloweenMode) {
      return isDarkMode 
        ? 'bg-gradient-to-br from-orange-900/85 via-purple-900/80 to-orange-900/85'
        : 'bg-gradient-to-br from-orange-50/98 via-purple-50/95 to-orange-50/98'
    } else if (isCarnivalMode) {
      return isDarkMode 
        ? 'bg-gradient-to-br from-pink-900/85 via-teal-900/80 to-pink-900/85'
        : 'bg-gradient-to-br from-pink-50/98 via-teal-50/95 to-pink-50/98'
    } else if (isEasterMode) {
      return isDarkMode 
        ? 'bg-gradient-to-br from-pink-900/85 via-green-900/80 to-pink-900/85'
        : 'bg-gradient-to-br from-pink-50/98 via-green-50/95 to-pink-50/98'
    } else if (isSummerMode) {
      return isDarkMode 
        ? 'bg-gradient-to-br from-yellow-900/85 via-orange-900/80 to-yellow-900/85'
        : 'bg-gradient-to-br from-yellow-50/98 via-orange-50/95 to-yellow-50/98'
    } else {
      return isDarkMode 
        ? 'bg-gradient-to-br from-slate-900/98 via-blue-900/95 to-slate-900/98'
        : 'bg-gradient-to-br from-blue-50/98 via-white/95 to-blue-50/98'
    }
  }

  // Theme-based accent colors for mobile nav elements
  const getMobileNavAccentColor = () => {
    if (isChristmasMode) {
      return "text-red-600 dark:text-red-400"
    } else if (isHalloweenMode) {
      return "text-orange-600 dark:text-orange-400"
    } else if (isCarnivalMode) {
      return "text-pink-600 dark:text-pink-400"
    } else if (isEasterMode) {
      return "text-pink-600 dark:text-pink-400"
    } else if (isSummerMode) {
      return "text-yellow-600 dark:text-yellow-400"
    } else {
      return "text-blue-600 dark:text-blue-400"
    }
  }

  // Theme-based card background colors for mobile nav
  const getMobileNavCardBackground = () => {
    if (isChristmasMode) {
      return isDarkMode 
        ? "bg-gradient-to-br from-red-900/12 via-green-900/6 to-red-900/12 border-red-800/20"
        : "bg-gradient-to-br from-red-50/20 via-green-50/10 to-red-50/20 border-red-200/30"
    } else if (isHalloweenMode) {
      return isDarkMode 
        ? "bg-gradient-to-br from-orange-900/12 via-purple-900/6 to-orange-900/12 border-orange-800/20"
        : "bg-gradient-to-br from-orange-50/20 via-purple-50/10 to-orange-50/20 border-orange-200/30"
    } else if (isCarnivalMode) {
      return isDarkMode 
        ? "bg-gradient-to-br from-pink-900/12 via-teal-900/6 to-pink-900/12 border-pink-800/20"
        : "bg-gradient-to-br from-pink-50/20 via-teal-50/10 to-pink-50/20 border-pink-200/30"
    } else if (isEasterMode) {
      return isDarkMode 
        ? "bg-gradient-to-br from-pink-900/12 via-green-900/6 to-pink-900/12 border-pink-800/20"
        : "bg-gradient-to-br from-pink-50/20 via-green-50/10 to-pink-50/20 border-pink-200/30"
    } else if (isSummerMode) {
      return isDarkMode 
        ? "bg-gradient-to-br from-yellow-900/12 via-orange-900/6 to-yellow-900/12 border-yellow-800/20"
        : "bg-gradient-to-br from-yellow-50/20 via-orange-50/10 to-yellow-50/20 border-yellow-200/30"
    } else {
      return isDarkMode 
        ? "bg-gradient-to-br from-white/15 via-white/8 to-white/3 border-white/25"
        : "bg-gradient-to-br from-white/15 via-white/8 to-white/3 border-white/25"
    }
  }


  return (
    <div className="mobile-nav-container">
      {/* Logo and Hamburger Menu with refined glassmorphism and rounded corners like MEGA */}
      <motion.div
        className={cn(
          "transition-all duration-500 ease-out z-50",
          scrolled 
            ? "fixed top-4 left-4 right-4 rounded-xl" 
            : "fixed top-0 left-0 right-0 rounded-none",
          getMobileNavbarBackground(),
        )}
        initial={{ y: -10, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.5 },
        }}
      >
        {/* Enhanced glass effect background */}
        <div className={cn(
          "absolute inset-0 overflow-hidden transition-all duration-500 ease-out",
          scrolled ? "rounded-xl" : "rounded-none"
        )}>
          <div className={`absolute inset-0 backdrop-blur-3xl ${isDarkMode ? 'bg-[#0f172a]/15' : 'bg-[#81a1d4]/10'}`}></div>
          <div className={`absolute inset-0 bg-gradient-to-r ${isDarkMode ? 'from-[#0f172a]/8 via-[#0f172a]/12 to-[#0f172a]/8' : 'from-[#81a1d4]/5 via-[#81a1d4]/8 to-[#81a1d4]/5'}`}></div>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl"></div>
          
          {/* Christmas Snow Effect Background */}
          {isChristmasMode ? (
            <div 
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                background: `url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPHJhZGlhbEdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNzUlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmZmZmYiIHN0b3Atb3BhY2l0eT0iMC4xIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZmZmZmYiIHN0b3Atb3BhY2l0eT0iMC4yIi8+CiAgPC9yYWRpYWxHcmFkaWVudD4KICA8cmVjdCB4PSItNTAiIHk9Ii01MCIgd2lkdGg9IjEwMSIgaGVpZ2h0PSIxMDEiIGZpbGw9InVybCgjZ3JhZC11Y2dnLWdlbmVyYXRlZCkiIC8+Cjwvc3ZnPg==)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.3
              }}
            />
          ) : !isHalloweenMode && !isEasterMode && !isCarnivalMode && !isSummerMode ? (
            <>
              {/* Σχολικές πινελιές - Notebook lines - Only for normal theme */}
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
            </>
          ) : null}
        </div>
        
        <div className={cn(
          "flex items-center justify-between mx-auto relative z-10 transition-all duration-500 ease-out",
          scrolled ? "p-1 px-3" : "p-2 px-4"
        )}>
          <div className="flex items-center gap-2">
            <Link href={homeHref} className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: -5, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="relative overflow-hidden"
              >
                <div className={cn(
                  "relative transition-all duration-500 ease-out",
                  scrolled ? "w-24 h-10" : "w-28 h-11"
                )}>
                  {/* Reveal Animation Container */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ 
                      clipPath: "inset(0 100% 0 0)",
                      opacity: 0,
                      scale: 0.7,
                      rotate: -15
                    }}
                    animate={{ 
                      clipPath: "inset(0 0% 0 0)",
                      opacity: 1,
                      scale: 1,
                      rotate: 0
                    }}
                    transition={{ 
                      duration: 1.2,
                      ease: [0.68, -0.55, 0.265, 1.55], // Bouncy
                      delay: 0.3
                    }}
                  >
                    <motion.div
                      className="relative w-full h-full"
                      animate={{
                        y: [0, -2, 0],
                        rotate: [0, 0.5, -0.5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Image
                src={
                  isChristmasMode
                    ? "/alfa-christmas-logo.png"
                    : isHalloweenMode
                      ? "/alfa-logo-halloween.png"
                      : isCarnivalMode
                        ? "/alfa-logo-carnival.png"
                        : isEasterMode
                          ? "/alfa-logo-easter.png"
                          : isSummerMode
                            ? "/alfa-summer-logo.png"
                            : "/alfa-logo.png"
                }
                        alt="Alfa Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
            
            {/* Χριστουγεννιάτικο Δέντρο δίπλα από το logo στο Mobile */}
            {isChristmasMode && (
              <motion.div
                className="-ml-1"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 200 }}
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
                  <ChristmasTreeIcon className="w-6 h-6 text-green-500" />
                </motion.div>
              </motion.div>
            )}

            {/* Halloween Κολοκύθα δίπλα από το logo στο Mobile */}
            {isHalloweenMode && (
              <motion.div
                className="-ml-1"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 200 }}
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
                  <span className="text-2xl">🎃</span>
                </motion.div>
              </motion.div>
            )}

            {/* Carnival Μάσκα δίπλα από το logo στο Mobile */}
            {isCarnivalMode && (
              <motion.div
                className="-ml-1"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 200 }}
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
                  <span className="text-2xl">🎭</span>
                </motion.div>
              </motion.div>
            )}

            {/* Easter Λαγός δίπλα από το logo στο Mobile */}
            {isEasterMode && (
              <motion.div
                className="-ml-1"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 200 }}
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
                  <span className="text-2xl">🐰</span>
                </motion.div>
              </motion.div>
            )}

            {/* Summer Ήλιος δίπλα από το logo στο Mobile */}
            {isSummerMode && (
              <motion.div
                className="-ml-1"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 200 }}
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
                  <span className="text-2xl">☀️</span>
                </motion.div>
              </motion.div>
            )}
            
            {/* 40 Years Anniversary Text for Mobile */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.0,
                ease: "easeOut"
              }}
            >
              {/* <AnniversaryText 
                variant="mobile" 
                size="sm"
                className="relative group"
              /> */}
            </motion.div>
          </div>

          {/* Theme toggle button */}
          <div className={cn(
            "flex items-center gap-2 transition-all duration-500 ease-out",
            scrolled ? "gap-2" : "gap-3"
          )}>
            {/* Custom Language Icon for Mobile */}
            <motion.button
              className={cn(
                "p-2 rounded-lg transition-all duration-300",
                scrolled ? "bg-white/20 dark:bg-gray-800/50" : "bg-white/10 dark:bg-gray-800/30",
                "hover:bg-white/30 dark:hover:bg-gray-800/60"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Cycle through languages: el -> en -> fr -> el
                if (language === 'el') {
                  setLanguage('en')
                } else if (language === 'en') {
                  setLanguage('fr')
                } else {
                  setLanguage('el')
                }
              }}
            >
                <div className="relative">
                  <LanguageIcon className="w-6 h-5" />
                  {/* Language Badge */}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg border border-blue-400/30" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    {language === 'el' ? 'EL' : language === 'en' ? 'EN' : 'FR'}
                  </div>
                </div>
            </motion.button>

            <ModernThemeToggle
              isDarkMode={isDarkMode}
              onToggle={toggleTheme}
              className={cn(scrolled ? "bg-white/20 dark:bg-gray-800/50" : "")}
            />

            <div className="hamburger">
              <HamburgerMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMenu} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Animated Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop with enhanced blur effect */}
            <motion.div
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-md will-change-transform"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              transition={{ duration: 0.15, ease: "easeOut" }}
              onClick={toggleMenu}
              aria-hidden="true"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                zIndex: 90,
                willChange: "opacity",
                WebkitBackfaceVisibility: "hidden",
                WebkitTransform: "translateZ(0)",
              }}
            />

            {/* Mobile Navigation Panel with theme-based design */}
            <motion.div
              className={`fixed inset-0 z-[100] backdrop-blur-xl overflow-auto mobile-menu-optimized ${getMobileMenuBackground()}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelVariants}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                zIndex: 100,
                willChange: "transform, opacity",
                WebkitBackfaceVisibility: "hidden",
                WebkitTransform: "translateZ(0)",
              }}
            >
              {/* Close button */}
              <motion.div
                className="absolute top-4 right-4 z-50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <HamburgerMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMenu} />
              </motion.div>

              {/* Content container with school-themed background */}
              <div className="relative h-full overflow-hidden">
                {/* Christmas Snow Effect Background */}
                {isChristmasMode ? (
                  <div 
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                      background: `url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPHJhZGlhbEdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNzUlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmZmZmYiIHN0b3Atb3BhY2l0eT0iMC4xIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZmZmZmYiIHN0b3Atb3BhY2l0eT0iMC4yIi8+CiAgPC9yYWRpYWxHcmFkaWVudD4KICA8cmVjdCB4PSItNTAiIHk9Ii01MCIgd2lkdGg9IjEwMSIgaGVpZ2h0PSIxMDEiIGZpbGw9InVybCgjZ3JhZC11Y2dnLWdlbmVyYXRlZCkiIC8+Cjwvc3ZnPg==)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: 0.3
                    }}
                  />
                ) : !isHalloweenMode && !isEasterMode && !isCarnivalMode && !isSummerMode ? (
                  <>
                    {/* Notebook paper background - Only for normal theme */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Main paper background */}
                      <div className={`absolute inset-0 ${isDarkMode ? 'bg-slate-800/20' : 'bg-white/30'}`}></div>
                      
                      {/* Notebook lines */}
                      {[...Array(25)].map((_, i) => (
                        <div
                          key={`line-${i}`}
                          className={`absolute w-full h-px ${
                            isDarkMode ? 'bg-blue-300/20' : 'bg-blue-200/40'
                          }`}
                          style={{
                            top: `${8 + i * 3.5}%`,
                            left: '5%',
                            right: '5%'
                          }}
                        />
                      ))}
                      
                      {/* Red margin line */}
                      <div className={`absolute left-6 top-0 bottom-0 w-px ${
                        isDarkMode ? 'bg-red-400/40' : 'bg-red-300/60'
                      }`}></div>
                      
                      {/* Holes for binder */}
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={`hole-${i}`}
                          className={`absolute w-2 h-2 rounded-full border ${
                            isDarkMode 
                              ? 'bg-slate-600/40 border-slate-500/60' 
                              : 'bg-blue-200/60 border-blue-300/80'
                          }`}
                          style={{
                            left: '4px',
                            top: `${15 + i * 22}%`
                          }}
                        />
                      ))}
                    </div>
                  </>
                ) : null}
                
                {/* Βελτιωμένο gradient background με περισσότερα χρώματα */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div
                    className="absolute top-0 right-0 w-80 h-80 bg-blue-400/8 rounded-full blur-3xl"
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
                    className="absolute bottom-0 left-0 w-80 h-80 bg-green-400/8 rounded-full blur-3xl"
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
                    className="absolute top-1/3 left-1/4 w-60 h-60 bg-yellow-400/8 rounded-full blur-3xl"
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
                  {/* Company badge - school-themed */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/15 to-green-500/15 border border-blue-400/30 mb-3 shadow-lg"
                      whileHover={{ scale: 1.05, x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                        {t('hero.title')}
                      </span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </motion.div>
                    <div className="flex items-center">
                      <div className="relative w-32 h-12">
                        <Image
                src={
                  isChristmasMode
                    ? "/alfa-christmas-logo.png"
                    : isHalloweenMode
                      ? "/alfa-logo-halloween.png"
                      : isCarnivalMode
                        ? "/alfa-logo-carnival.png"
                        : isEasterMode
                          ? "/alfa-logo-easter.png"
                          : isSummerMode
                            ? "/alfa-summer-logo.png"
                            : "/alfa-logo.png"
                }
                          alt="Alfa Logo"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="relative">
                        <svg className={`absolute -left-1 -top-1 w-6 h-6 ${isDarkMode ? 'text-amber-100' : 'text-amber-600'}`} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM11.61 11.84C11.61 14.92 10.94 15.61 9.15 16.67C9.03 16.74 8.9 16.77 8.77 16.77C8.51 16.77 8.26 16.64 8.12 16.4C7.91 16.04 8.03 15.58 8.38 15.37C9.59 14.65 10.01 14.39 10.09 12.58H8.19C7.1 12.58 6.25 11.73 6.25 10.64V9.16C6.25 8.07 7.1 7.22 8.19 7.22H9.68C10.75 7.22 11.62 8.09 11.62 9.16V11.84H11.61ZM17.75 11.84C17.75 14.92 17.08 15.61 15.29 16.67C15.17 16.74 15.04 16.77 14.91 16.77C14.65 16.77 14.4 16.64 14.26 16.4C14.05 16.04 14.17 15.58 14.52 15.37C15.73 14.65 16.15 14.39 16.23 12.58H14.32C13.23 12.58 12.38 11.73 12.38 10.64V9.16C12.38 8.07 13.23 7.22 14.32 7.22H15.81C16.88 7.22 17.75 8.09 17.75 9.16V11.84Z"/>
                        </svg>
                        <p className={`text-sm italic font-medium leading-relaxed pl-6 pr-2 ${
                          isDarkMode ? 'text-white/90' : 'text-gray-700'
                        }`} style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
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
                    <h3 className={`text-sm font-medium mb-4 flex items-center ${getMobileNavAccentColor()}`} style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      <div className={`w-6 h-6 bg-gradient-to-br ${isChristmasMode ? 'from-red-400 to-green-500' : isHalloweenMode ? 'from-orange-400 to-purple-500' : isCarnivalMode ? 'from-pink-400 to-teal-500' : isEasterMode ? 'from-pink-400 to-green-500' : isSummerMode ? 'from-yellow-400 to-orange-500' : 'from-yellow-400 to-orange-500'} rounded-full flex items-center justify-center mr-2 shadow-lg`}>
                        <Star className="h-3 w-3 text-white" />
                      </div>
                      {t('navigation.main') || 'Main Navigation'}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {mainNavigationLinks.map((link, index) => {
            // Check if it's a Halloween, Carnival, Easter or Summer icon string
            const isHalloweenIcon = typeof link.icon === 'string' && ['pumpkin', 'witch', 'ghost', 'bat', 'spider', 'skull'].includes(link.icon)
            const isCarnivalIcon = typeof link.icon === 'string' && ['mask', 'circus', 'art', 'music', 'guitar', 'trumpet'].includes(link.icon)
            const isEasterIcon = typeof link.icon === 'string' && ['bunny', 'egg', 'chick', 'flower', 'tulip', 'butterfly'].includes(link.icon)
            const isSummerIcon = typeof link.icon === 'string' && ['sun', 'sunface', 'sunflower', 'beach', 'wave', 'shell'].includes(link.icon)
                        
                        return (
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
                            className={`group flex items-center gap-4 p-4 rounded-2xl backdrop-blur-2xl border transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden mobile-nav-item ${
                              pathname === link.href
                                ? `${getMobileNavCardBackground()} shadow-lg`
                                : `${getMobileNavCardBackground()} hover:scale-[1.02]`
                            } ${isDarkMode ? 'hover:shadow-slate-900/30' : 'hover:shadow-blue-200/30'}`}
                            style={{
                              transform: "translateZ(0)",
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden",
                              WebkitTransform: "translateZ(0)",
                            }}
                            onClick={(e) => {
                              if (link.href.startsWith("http")) {
                                window.open(link.href, "_blank")
                              } else {
                                e.preventDefault()
                                handleNavigation(link.href)
                              }
                            }}
                          >
                            {/* Active indicator - animated glow effect */}
                            {pathname === link.href && (
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-blue-500/30 to-blue-400/20 rounded-2xl"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ 
                                  opacity: 1, 
                                  scale: 1,
                                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
                                }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                            
                            {/* Active indicator - left border */}
                            {pathname === link.href && (
                              <motion.div
                                className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-full shadow-lg"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                              />
                            )}
                            {/* Icon with enhanced styling */}
                            <motion.div
                              className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative ${
                                pathname === link.href 
                                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/30' 
                                  : link.color
                              }`}
                              whileHover={{
                                scale: 1.1,
                                rotate: 5,
                              }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                            {isHalloweenIcon ? (
                              getHalloweenIcon(link.icon as string, `h-7 w-7 transition-colors duration-300 leading-none ${
                                pathname === link.href ? 'text-white' : 'text-white'
                              }`)
                            ) : isCarnivalIcon ? (
                              getCarnivalIcon(link.icon as string, `h-7 w-7 transition-colors duration-300 leading-none ${
                                pathname === link.href ? 'text-white' : 'text-white'
                              }`)
                            ) : isEasterIcon ? (
                              getEasterIcon(link.icon as string, `h-7 w-7 transition-colors duration-300 leading-none ${
                                pathname === link.href ? 'text-white' : 'text-white'
                              }`)
                            ) : isSummerIcon ? (
                              getSummerIcon(link.icon as string, `h-7 w-7 transition-colors duration-300 leading-none ${
                                pathname === link.href ? 'text-white' : 'text-white'
                              }`)
                            ) : (link as any).isEmoji ? (
                              <span className={`h-7 w-7 transition-colors duration-300 leading-none flex items-center justify-center ${
                                pathname === link.href ? 'text-white' : 'text-white'
                              }`}>{link.icon as string}</span>
                            ) : (
                              <link.icon className={`h-7 w-7 transition-colors duration-300 ${
                                pathname === link.href ? 'text-white' : 'text-white'
                              }`} />
                            )}
                              
                              {/* Active icon glow effect */}
                              {pathname === link.href && (
                                <motion.div
                                  className="absolute inset-0 rounded-2xl bg-blue-400/20 blur-sm"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                />
                              )}
                            </motion.div>
                            
                            {/* Content */}
                            <div className="flex-1 relative z-10">
                              <h4 className={`text-lg font-semibold transition-colors duration-300 ${
                                pathname === link.href 
                                  ? 'text-white' 
                                  : 'text-gray-800 dark:text-white group-hover:text-[#81a1d4]'
                              }`} style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                                {link.label}
                                {/* Active indicator dot */}
                                {pathname === link.href && (
                                  <motion.span
                                    className="inline-block w-2 h-2 bg-blue-400 rounded-full ml-2"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                  />
                                )}
                              </h4>
                              <p className={`text-sm mt-1 transition-colors duration-300 ${
                                pathname === link.href 
                                  ? 'text-blue-100' 
                                  : 'text-gray-600 dark:text-white/80'
                              }`}>
                                {link.label === t('navigation.home') && t('navigation.homeDescription')}
                                {link.label === t('navigation.services') && t('navigation.servicesDescription')}
                                {link.label === t('navigation.news') && t('navigation.newsDescription')}
                                {link.label === t('navigation.whyUs') && t('navigation.whyUsDescription')}
                                {link.label === t('navigation.aboutUs') && t('navigation.aboutUsDescription')}
                                {link.label === t('navigation.games') && t('navigation.gamesDescription')}
                                {link.label === t('navigation.contact') && t('navigation.contactDescription')}
                              </p>
                            </div>
                            
                            {/* Arrow indicator */}
                            <motion.div
                              className={`transition-colors duration-300 ${
                                pathname === link.href 
                                  ? 'text-blue-300' 
                                  : 'text-gray-400 group-hover:text-[#81a1d4]'
                              }`}
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="h-5 w-5" />
                            </motion.div>
                          </a>
                        </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>



                  {/* Legal & Contact Links */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                  >
                    <h3 className={`text-sm font-medium mb-3 flex items-center ${getMobileNavAccentColor()}`} style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      <div className={`w-6 h-6 bg-gradient-to-br ${isChristmasMode ? 'from-green-400 to-red-500' : isHalloweenMode ? 'from-purple-400 to-orange-500' : isCarnivalMode ? 'from-teal-400 to-pink-500' : isEasterMode ? 'from-green-400 to-pink-500' : isSummerMode ? 'from-orange-400 to-yellow-500' : 'from-green-400 to-blue-500'} rounded-full flex items-center justify-center mr-2 shadow-lg`}>
                        <Shield className="h-3 w-3 text-white" />
                      </div>
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
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl ${getMobileNavCardBackground()} backdrop-blur-2xl hover:scale-[1.02] transition-all shadow-lg hover:shadow-2xl mobile-nav-item ${isDarkMode ? 'hover:shadow-[#0f172a]/50' : 'hover:shadow-[#81a1d4]/50'}`}
                            style={{
                              transform: "translateZ(0)",
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden",
                              WebkitTransform: "translateZ(0)",
                            }}
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
                              {(link as any).isEmoji ? (
                                <span className="h-5 w-5 flex items-center justify-center">{link.icon as unknown as string}</span>
                              ) : (
                                <link.icon className="h-5 w-5" />
                              )}
                            </motion.div>
                            <span className="text-sm font-medium text-gray-700 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{link.label}</span>
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
                    <h3 className={`text-sm font-medium mb-3 flex items-center ${getMobileNavAccentColor()}`} style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      <div className={`w-6 h-6 bg-gradient-to-br ${isChristmasMode ? 'from-red-400 to-green-500' : isHalloweenMode ? 'from-orange-400 to-purple-500' : isCarnivalMode ? 'from-pink-400 to-teal-500' : isEasterMode ? 'from-pink-400 to-green-500' : isSummerMode ? 'from-yellow-400 to-orange-500' : 'from-purple-400 to-pink-500'} rounded-full flex items-center justify-center mr-2 shadow-lg`}>
                        <Globe className="h-3 w-3 text-white" />
                      </div>
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
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl ${getMobileNavCardBackground()} backdrop-blur-2xl hover:scale-[1.02] transition-all shadow-lg hover:shadow-2xl will-change-transform ${isDarkMode ? 'hover:shadow-[#0f172a]/50' : 'hover:shadow-[#81a1d4]/50'}`}
                          style={{
                            transform: "translateZ(0)",
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            WebkitTransform: "translateZ(0)",
                          }}
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
                          <span className="text-sm font-medium text-gray-700 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>Facebook</span>
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
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl ${getMobileNavCardBackground()} backdrop-blur-2xl hover:scale-[1.02] transition-all shadow-lg hover:shadow-2xl will-change-transform ${isDarkMode ? 'hover:shadow-[#0f172a]/50' : 'hover:shadow-[#81a1d4]/50'}`}
                          style={{
                            transform: "translateZ(0)",
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            WebkitTransform: "translateZ(0)",
                          }}
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
                          <span className="text-sm font-medium text-gray-700 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>Instagram</span>
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
                    <h3 className={`text-sm font-medium mb-3 flex items-center ${getMobileNavAccentColor()}`} style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      <div className={`w-6 h-6 bg-gradient-to-br ${isChristmasMode ? 'from-red-400 to-green-500' : isHalloweenMode ? 'from-orange-400 to-purple-500' : isCarnivalMode ? 'from-pink-400 to-teal-500' : isEasterMode ? 'from-pink-400 to-green-500' : isSummerMode ? 'from-yellow-400 to-orange-500' : 'from-red-400 to-orange-500'} rounded-full flex items-center justify-center mr-2 shadow-lg`}>
                        <Mail className="h-3 w-3 text-white" />
                      </div>
                       {t('contact.needHelp')}
                    </h3>
                    <p className={`text-sm mb-4 ${
                      isDarkMode ? 'text-white/80' : 'text-gray-600'
                    }`}>{t('contact.helpDescription')}</p>
                    
                    {/* Χαλάνδρι */}
                    <motion.div
                      className="mb-3"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                    >
                      <div className={`p-4 rounded-2xl ${getMobileNavCardBackground()} backdrop-blur-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl mobile-nav-item ${isDarkMode ? 'hover:shadow-[#0f172a]/50' : 'hover:shadow-[#81a1d4]/50'}`}
                           style={{
                             transform: "translateZ(0)",
                             backfaceVisibility: "hidden",
                             WebkitBackfaceVisibility: "hidden",
                             WebkitTransform: "translateZ(0)",
                           }}>
                        <h4 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`} style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
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
                                <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t('contact.phone')}</div>
                                <div className="text-xs text-green-600 dark:text-green-300">+30 210 6800 708</div>
                              </div>
                          </a>
                          <a
                            href="mailto:info@alfaschoolchalandri.com"
                            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 hover:from-red-500/30 hover:to-rose-500/30 transition-all duration-300 border border-red-500/20"
                          >
                            <Mail className="h-5 w-5 text-red-500" />
                              <div>
                                <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t('contact.email')}</div>
                                <div className="text-xs text-red-600 dark:text-red-300">info@alfaschoolchalandri.com</div>
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
                      <div className={`p-4 rounded-2xl ${getMobileNavCardBackground()} backdrop-blur-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl mobile-nav-item ${isDarkMode ? 'hover:shadow-[#0f172a]/50' : 'hover:shadow-[#81a1d4]/50'}`}
                           style={{
                             transform: "translateZ(0)",
                             backfaceVisibility: "hidden",
                             WebkitBackfaceVisibility: "hidden",
                             WebkitTransform: "translateZ(0)",
                           }}>
                        <h4 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`} style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
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
                                <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t('contact.phone')}</div>
                                <div className="text-xs text-green-600 dark:text-green-300">+30 210 2777 725</div>
                              </div>
                          </a>
                          <a
                            href="mailto:alfaschoolfiladelfeia@gmail.com"
                            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 hover:from-red-500/30 hover:to-rose-500/30 transition-all duration-300 border border-red-500/20"
                          >
                            <Mail className="h-5 w-5 text-red-500" />
                            <div>
                              <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t('contact.email')}</div>
                              <div className="text-xs text-red-600 dark:text-red-300">alfaschoolfiladelfeia@gmail.com</div>
                            </div>
                          </a>
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
                        className={`text-xs flex items-center gap-1 ${
                          isDarkMode ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                        }`}
                        whileHover={{ scale: 1.05, x: 2 }}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavigation("/legal/privacy-policy")
                        }}
                      >
                        <PrivacyIcon className="h-4 w-4" />
                        <span style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{t("navigation.privacy")}</span>
                      </motion.a>
                      <motion.a
                        href="/legal/terms-of-service"
                        className={`text-xs flex items-center gap-1 ${
                          isDarkMode ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                        }`}
                        whileHover={{ scale: 1.05, x: 2 }}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavigation("/legal/terms-of-service")
                        }}
                      >
                        <TermsIcon className="h-4 w-4" />
                        <span className="text-xs font-semibold" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                           {t('navigation.terms')}
                        </span>
                      </motion.a>
                    </div>

                    {/* Copyright */}
                    <div className="mt-4 text-center">
                      <p className="whitespace-nowrap text-xs font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                        {(() => {
                          const currentYear = new Date().getFullYear();
                          const copyrightText = t('footer.copyright') || 'AcronWeb × Alfa Schools © {year} | All rights reserved';
                          const text = Array.isArray(copyrightText) ? copyrightText[0] : copyrightText;
                          const fullText = text.replace('{year}', currentYear.toString());
                          
                          // Split the text to highlight both "AcronWeb" and "Alfa Schools"
                          const acronWebParts = fullText.split('AcronWeb');
                          if (acronWebParts.length === 2) {
                            const afterAcronWeb = acronWebParts[1];
                            const alfaSchoolsParts = afterAcronWeb.split('Alfa Schools');
                            
                            return (
                              <>
                                {/* AcronWeb with professional styling */}
                                <span 
                                  className="font-bold tracking-tight leading-none relative inline-flex items-center transition-all duration-500 ease-out antialiased subpixel-antialiased filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                                  style={{
                                    fontFamily: "'Inter', 'SF Pro Display', 'Segoe UI', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                                    fontWeight: 700,
                                    letterSpacing: "-0.01em",
                                    textShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                    lineHeight: '1',
                                    height: 'auto'
                                  }}
                                >
                                  <div className="relative inline-flex items-baseline" style={{ lineHeight: '1', height: 'auto' }}>
                                    {/* ACRON part */}
                                    <span 
                                      className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-400 dark:via-blue-300 dark:to-blue-500 bg-clip-text text-transparent transition-all duration-500"
                                      style={{ 
                                        fontFamily: "'Outfit', 'Space Grotesk', 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif", 
                                        fontWeight: 800, 
                                        letterSpacing: "-0.02em", 
                                        backgroundSize: "200% 200%", 
                                        backgroundPosition: "0% 50%", 
                                        textShadow: "0 2px 4px rgba(59, 130, 246, 0.15), 0 1px 2px rgba(59, 130, 246, 0.08)", 
                                        filter: "contrast(1.1) brightness(1.02)", 
                                        lineHeight: "1" 
                                      }}
                                    >
                                      ACRON
                                    </span>
                                    {/* WEB part */}
                                    <span 
                                      className="bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800 dark:from-slate-50 dark:via-white dark:to-slate-100 bg-clip-text text-transparent transition-all duration-500"
                                      style={{ 
                                        fontFamily: "'Geogola', 'Gegola DEMO', 'Outfit', 'Space Grotesk', 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif", 
                                        fontWeight: 800, 
                                        letterSpacing: "-0.02em", 
                                        backgroundSize: "200% 200%", 
                                        backgroundPosition: "0% 50%", 
                                        textShadow: "0 2px 4px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)", 
                                        filter: "contrast(1.1) brightness(1.02)", 
                                        lineHeight: "1" 
                                      }}
                                    >
                                      WEB
                                    </span>
                                  </div>
                                </span>
                                
                                {/* Text between AcronWeb and Alfa Schools */}
                                {alfaSchoolsParts[0]}
                                
                                {/* Alfa Schools with blue accent color */}
                                <span className={`${getMobileNavAccentColor()} font-semibold`}>Alfa Schools</span>
                                
                                {/* Rest of the text after Alfa Schools */}
                                {alfaSchoolsParts[1]}
                              </>
                            );
                          }
                          return fullText;
                        })()}
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
