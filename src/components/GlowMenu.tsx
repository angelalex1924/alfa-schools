  "use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Settings, Newspaper, Users, Phone, Mail, Shield, ChevronRight, ChevronDown } from "lucide-react"
import { GamesIcon } from "./custom-icons"

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
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ModernThemeToggle } from "./ModernThemeToggle"
import { useTheme } from "@/contexts/ThemeContext"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useLanguage } from "@/contexts/LanguageContext"
import { useChristmasTheme } from "@/contexts/ChristmasThemeContext"
import { useHalloweenTheme } from "@/contexts/HalloweenThemeContext"
import { useCarnivalTheme } from "@/contexts/CarnivalThemeContext"
import { useEasterTheme } from "@/contexts/EasterThemeContext"
import { useSummerTheme } from "@/contexts/SummerThemeContext"
import { AnniversaryText } from "./AnniversaryText"
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

// Navigation items with the requested links - will be updated with translations
const getNavigationItems = (t: (key: string) => string | string[], isChristmasMode: boolean, isHalloweenMode: boolean, isCarnivalMode: boolean, isEasterMode: boolean, isSummerMode: boolean) => [
  {
    label: t('navigation.home'),
    href: "/",
    icon: isChristmasMode ? SantaIcon : isHalloweenMode ? "pumpkin" : isCarnivalMode ? "mask" : isEasterMode ? "bunny" : isSummerMode ? "sun" : HomeIcon,
    color: isChristmasMode ? "#dc2626" : isHalloweenMode ? "#ea580c" : isCarnivalMode ? "#ff6b6b" : isEasterMode ? "#ff6b9d" : isSummerMode ? "#fbbf24" : "#3b82f6", // Κόκκινο για Χριστούγεννα, Πορτοκαλί για Halloween, Ροζ για Carnival, Pink για Easter, Κίτρινο για Summer
    iconColor: isChristmasMode ? "text-red-500" : isHalloweenMode ? "text-orange-500" : isCarnivalMode ? "text-pink-500" : isEasterMode ? "text-pink-500" : isSummerMode ? "text-yellow-500" : "text-blue-500"
  },
  {
    label: t('navigation.services'),
    href: "/services",
    icon: isChristmasMode ? ChristmasTreeIcon : isHalloweenMode ? HalloweenServicesIcon : isCarnivalMode ? "circus" : isEasterMode ? "egg" : isSummerMode ? "sunflower" : ServicesIcon,
    color: isChristmasMode ? "#16a34a" : isHalloweenMode ? "#7c3aed" : isCarnivalMode ? "#4ecdc4" : isEasterMode ? "#96ceb4" : isSummerMode ? "#f59e0b" : "#c9b6e4", // Πράσινο για Χριστούγεννα, Μωβ για Halloween, Τυρκουάζ για Carnival, Πράσινο για Easter, Πορτοκαλί για Summer
    iconColor: isChristmasMode ? "text-green-500" : isHalloweenMode ? "text-purple-500" : isCarnivalMode ? "text-teal-500" : isEasterMode ? "text-green-500" : isSummerMode ? "text-orange-500" : "text-[#c9b6e4]"
  },
  {
    label: t('navigation.news'),
    href: "/articles",
    icon: isChristmasMode ? BellIcon : isHalloweenMode ? HalloweenNewsIcon : isCarnivalMode ? "art" : isEasterMode ? "chick" : isSummerMode ? "beach" : ArticlesIcon,
    color: isChristmasMode ? "#fbbf24" : isHalloweenMode ? "#f59e0b" : isCarnivalMode ? "#feca57" : isEasterMode ? "#feca57" : isSummerMode ? "#f97316" : "#f78da7", // Χρυσό για Χριστούγεννα, Κίτρινο για Halloween, Κίτρινο για Carnival, Κίτρινο για Easter, Πορτοκαλί για Summer
    iconColor: isChristmasMode ? "text-yellow-500" : isHalloweenMode ? "text-amber-500" : isCarnivalMode ? "text-yellow-500" : isEasterMode ? "text-yellow-500" : isSummerMode ? "text-orange-500" : "text-[#f78da7]"
  },
  {
    label: t('navigation.whyUs'),
    href: "/why-us",
    icon: isChristmasMode ? ReindeerIcon : isHalloweenMode ? "bat" : isCarnivalMode ? "music" : isEasterMode ? "flower" : isSummerMode ? "wave" : WhyUsIcon,
    color: isChristmasMode ? "#8b4513" : isHalloweenMode ? "#374151" : isCarnivalMode ? "#45b7d1" : isEasterMode ? "#ff6b9d" : isSummerMode ? "#06b6d4" : "#fabeb6", // Καφέ για Χριστούγεννα, Γκρι για Halloween, Μπλε για Carnival, Pink για Easter, Cyan για Summer
    iconColor: isChristmasMode ? "text-amber-600" : isHalloweenMode ? "text-gray-600" : isCarnivalMode ? "text-blue-500" : isEasterMode ? "text-pink-500" : isSummerMode ? "text-cyan-500" : "text-[#fabeb6]"
  },
  {
    label: t('navigation.aboutUs'),
    href: "/about-us",
    icon: isChristmasMode ? "🏫" : isHalloweenMode ? "skull" : isCarnivalMode ? "mask" : isEasterMode ? "bunny" : isSummerMode ? "sun" : AboutUsIcon,
    color: isChristmasMode ? "#1e40af" : isHalloweenMode ? "#7c2d12" : isCarnivalMode ? "#be185d" : isEasterMode ? "#be185d" : isSummerMode ? "#f59e0b" : "#1e40af", // Μπλε για Χριστούγεννα, Καφέ για Halloween, Ροζ για Carnival, Ροζ για Easter, Πορτοκαλί για Summer
    iconColor: isChristmasMode ? "text-blue-600" : isHalloweenMode ? "text-amber-800" : isCarnivalMode ? "text-pink-600" : isEasterMode ? "text-pink-600" : isSummerMode ? "text-orange-500" : "text-blue-600",
    isEmoji: isChristmasMode || isHalloweenMode || isCarnivalMode || isEasterMode || isSummerMode
  },
  {
    label: t('navigation.games'),
    href: "/games",
    icon: isChristmasMode ? GiftBoxIcon : isHalloweenMode ? HalloweenGamesIcon : isCarnivalMode ? "guitar" : isEasterMode ? "tulip" : isSummerMode ? "shell" : GamesIcon,
    color: isChristmasMode ? "#dc2626" : isHalloweenMode ? "#dc2626" : isCarnivalMode ? "#96ceb4" : isEasterMode ? "#4ecdc4" : isSummerMode ? "#f59e0b" : "#a8e6cf", // Κόκκινο για Χριστούγεννα και Halloween, Πράσινο για Carnival, Τυρκουάζ για Easter, Πορτοκαλί για Summer
    iconColor: isChristmasMode ? "text-red-500" : isHalloweenMode ? "text-red-500" : isCarnivalMode ? "text-green-500" : isEasterMode ? "text-teal-500" : isSummerMode ? "text-orange-500" : "text-[#a8e6cf]"
  },
  {
    label: t('navigation.contact'),
    href: "/contact",
    icon: isHalloweenMode ? HalloweenContactIcon : isCarnivalMode ? "trumpet" : isEasterMode ? "butterfly" : isSummerMode ? "sunface" : ContactIcon,
    color: isChristmasMode ? "#16a34a" : isHalloweenMode ? "#6b7280" : isCarnivalMode ? "#ff9ff3" : isEasterMode ? "#54a0ff" : isSummerMode ? "#fbbf24" : "#fde7dc", // Πράσινο για Χριστούγεννα, Γκρι για Halloween, Ροζ για Carnival, Μπλε για Easter, Κίτρινο για Summer
    iconColor: isChristmasMode ? "text-green-500" : isHalloweenMode ? "text-gray-500" : isCarnivalMode ? "text-pink-500" : isEasterMode ? "text-blue-500" : isSummerMode ? "text-yellow-500" : "text-[#fde7dc]"
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
  const { isHalloweenMode } = useHalloweenTheme()
  const { isCarnivalMode } = useCarnivalTheme()
  const { isEasterMode } = useEasterTheme()
  const { isSummerMode } = useSummerTheme()
  const navigationItems = getNavigationItems(t, isChristmasMode, isHalloweenMode, isCarnivalMode, isEasterMode, isSummerMode)

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

  // Theme-based navbar background colors
  const getNavbarBackground = () => {
    if (isChristmasMode) {
      return scrolled
        ? isDarkMode
          ? "bg-gradient-to-r from-red-900/15 via-green-900/8 to-red-900/15 backdrop-blur-2xl border border-red-800/20 shadow-[0_8px_32px_rgba(220,38,38,0.15)]"
          : "bg-gradient-to-r from-red-50/30 via-green-50/20 to-red-50/30 backdrop-blur-2xl border border-red-200/40 shadow-[0_8px_32px_rgba(220,38,38,0.2)]"
        : isDarkMode
          ? "bg-gradient-to-r from-red-900/12 via-green-900/6 to-red-900/12 backdrop-blur-2xl border border-red-800/15 shadow-[0_4px_24px_rgba(220,38,38,0.12)]"
          : "bg-gradient-to-r from-red-50/25 via-green-50/15 to-red-50/25 backdrop-blur-2xl border border-red-200/30 shadow-[0_4px_24px_rgba(220,38,38,0.15)]"
    } else if (isHalloweenMode) {
      return scrolled
        ? isDarkMode
          ? "bg-gradient-to-r from-orange-900/15 via-purple-900/8 to-orange-900/15 backdrop-blur-2xl border border-orange-800/20 shadow-[0_8px_32px_rgba(234,88,12,0.15)]"
          : "bg-gradient-to-r from-orange-50/30 via-purple-50/20 to-orange-50/30 backdrop-blur-2xl border border-orange-200/40 shadow-[0_8px_32px_rgba(234,88,12,0.2)]"
        : isDarkMode
          ? "bg-gradient-to-r from-orange-900/12 via-purple-900/6 to-orange-900/12 backdrop-blur-2xl border border-orange-800/15 shadow-[0_4px_24px_rgba(234,88,12,0.12)]"
          : "bg-gradient-to-r from-orange-50/25 via-purple-50/15 to-orange-50/25 backdrop-blur-2xl border border-orange-200/30 shadow-[0_4px_24px_rgba(234,88,12,0.15)]"
    } else if (isCarnivalMode) {
      return scrolled
        ? isDarkMode
          ? "bg-gradient-to-r from-pink-900/15 via-teal-900/8 to-pink-900/15 backdrop-blur-2xl border border-pink-800/20 shadow-[0_8px_32px_rgba(236,72,153,0.15)]"
          : "bg-gradient-to-r from-pink-50/30 via-teal-50/20 to-pink-50/30 backdrop-blur-2xl border border-pink-200/40 shadow-[0_8px_32px_rgba(236,72,153,0.2)]"
        : isDarkMode
          ? "bg-gradient-to-r from-pink-900/12 via-teal-900/6 to-pink-900/12 backdrop-blur-2xl border border-pink-800/15 shadow-[0_4px_24px_rgba(236,72,153,0.12)]"
          : "bg-gradient-to-r from-pink-50/25 via-teal-50/15 to-pink-50/25 backdrop-blur-2xl border border-pink-200/30 shadow-[0_4px_24px_rgba(236,72,153,0.15)]"
    } else if (isEasterMode) {
      return scrolled
        ? isDarkMode
          ? "bg-gradient-to-r from-pink-900/15 via-green-900/8 to-pink-900/15 backdrop-blur-2xl border border-pink-800/20 shadow-[0_8px_32px_rgba(236,72,153,0.15)]"
          : "bg-gradient-to-r from-pink-50/30 via-green-50/20 to-pink-50/30 backdrop-blur-2xl border border-pink-200/40 shadow-[0_8px_32px_rgba(236,72,153,0.2)]"
        : isDarkMode
          ? "bg-gradient-to-r from-pink-900/12 via-green-900/6 to-pink-900/12 backdrop-blur-2xl border border-pink-800/15 shadow-[0_4px_24px_rgba(236,72,153,0.12)]"
          : "bg-gradient-to-r from-pink-50/25 via-green-50/15 to-pink-50/25 backdrop-blur-2xl border border-pink-200/30 shadow-[0_4px_24px_rgba(236,72,153,0.15)]"
    } else if (isSummerMode) {
      return scrolled
        ? isDarkMode
          ? "bg-gradient-to-r from-yellow-900/15 via-orange-900/8 to-yellow-900/15 backdrop-blur-2xl border border-yellow-800/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)]"
          : "bg-gradient-to-r from-yellow-50/30 via-orange-50/20 to-yellow-50/30 backdrop-blur-2xl border border-yellow-200/40 shadow-[0_8px_32px_rgba(251,191,36,0.2)]"
        : isDarkMode
          ? "bg-gradient-to-r from-yellow-900/12 via-orange-900/6 to-yellow-900/12 backdrop-blur-2xl border border-yellow-800/15 shadow-[0_4px_24px_rgba(251,191,36,0.12)]"
          : "bg-gradient-to-r from-yellow-50/25 via-orange-50/15 to-yellow-50/25 backdrop-blur-2xl border border-yellow-200/30 shadow-[0_4px_24px_rgba(251,191,36,0.15)]"
    } else {
      return scrolled
        ? isDarkMode
          ? "bg-[#0f172a]/50 backdrop-blur-2xl border border-[#0f172a]/60 shadow-[0_8px_32px_rgba(15,23,42,0.5)]"
          : "bg-[#81a1d4]/20 backdrop-blur-2xl border border-[#81a1d4]/30 shadow-[0_8px_32px_rgba(129,161,212,0.2)]"
        : isDarkMode
          ? "bg-[#0f172a]/45 backdrop-blur-2xl border border-[#0f172a]/50 shadow-[0_4px_24px_rgba(15,23,42,0.45)]"
          : "bg-[#81a1d4]/15 backdrop-blur-2xl border border-[#81a1d4]/20 shadow-[0_4px_24px_rgba(129,161,212,0.15)]"
    }
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-out z-[100] mx-auto flex items-center justify-between",
        scrolled 
          ? "p-1 rounded-xl fixed top-4 left-4 right-4" 
          : "p-0 rounded-none fixed top-0 left-0 right-0",
        getNavbarBackground(),
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
          className={cn(
            "absolute inset-0 overflow-hidden transition-all duration-500 ease-out",
            scrolled ? "rounded-xl" : "rounded-none"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`absolute inset-0 backdrop-blur-3xl ${isDarkMode ? 'bg-[#0f172a]/20' : 'bg-[#81a1d4]/10'}`}></div>
          <div className={`absolute inset-0 bg-gradient-to-r ${isDarkMode ? 'from-[#0f172a]/12 via-[#0f172a]/18 to-[#0f172a]/12' : 'from-[#81a1d4]/5 via-[#81a1d4]/8 to-[#81a1d4]/5'}`}></div>
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
        </motion.div>

      {/* Enhanced Logo with alfa-logo.png - REVEAL ANIMATION */}
      <motion.div
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "flex items-center gap-1 transition-all duration-500 ease-out",
          scrolled ? "px-3 py-1" : "px-6 py-1"
        )}
      >
        <Link href="/" className="relative group" prefetch={false}>
          <motion.div 
            className={cn(
              "relative overflow-hidden transition-all duration-500 ease-out",
              scrolled ? "w-30 h-10" : "w-34 h-12"
            )}
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

        {/* Halloween Κολοκύθα δίπλα από το logo */}
        {isHalloweenMode && (
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
              <span className="text-3xl">🎃</span>
            </motion.div>
          </motion.div>
        )}

        {/* Carnival Μάσκα δίπλα από το logo */}
        {isCarnivalMode && (
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
              <span className="text-3xl">🎭</span>
            </motion.div>
          </motion.div>
        )}

        {/* Easter Λαγός δίπλα από το logo */}
        {isEasterMode && (
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
              <span className="text-3xl">🐰</span>
            </motion.div>
          </motion.div>
        )}

        {/* Summer Ήλιος δίπλα από το logo */}
        {isSummerMode && (
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
              <span className="text-3xl">☀️</span>
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
        className={cn(
          "relative z-10 flex items-center gap-2 transition-all duration-500 ease-out",
          scrolled ? "px-3 py-1" : "px-6 py-1"
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ul className="flex items-center gap-1">
          {navigationItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const isHovered = hoveredItem === index
            
            // Check if it's a Halloween, Carnival, Easter or Summer icon string
            const isHalloweenIcon = typeof item.icon === 'string' && ['pumpkin', 'witch', 'ghost', 'bat', 'spider', 'skull'].includes(item.icon)
            const isCarnivalIcon = typeof item.icon === 'string' && ['mask', 'circus', 'art', 'music', 'guitar', 'trumpet'].includes(item.icon)
            const isEasterIcon = typeof item.icon === 'string' && ['bunny', 'egg', 'chick', 'flower', 'tulip', 'butterfly'].includes(item.icon)
            const isSummerIcon = typeof item.icon === 'string' && ['sun', 'sunface', 'sunflower', 'beach', 'wave', 'shell'].includes(item.icon)

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
                          "relative flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300 shadow-lg",
                          isActive || isHovered
                            ? `${item.iconColor} bg-white/30 backdrop-blur-sm shadow-xl`
                            : "text-white/90",
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
                        {isHalloweenIcon ? (
                          getHalloweenIcon(item.icon as string, "h-4 w-4 text-lg leading-none")
                        ) : isCarnivalIcon ? (
                          getCarnivalIcon(item.icon as string, "h-4 w-4 text-lg leading-none")
                        ) : isEasterIcon ? (
                          getEasterIcon(item.icon as string, "h-4 w-4 text-lg leading-none")
                        ) : isSummerIcon ? (
                          getSummerIcon(item.icon as string, "h-4 w-4 text-lg leading-none")
                        ) : (item as any).isEmoji ? (
                          <span className="h-4 w-4 text-lg leading-none flex items-center justify-center">{item.icon as string}</span>
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}

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
            "flex items-center gap-2 transition-all duration-500 ease-out",
            scrolled ? "pl-2 border-l border-white/20" : "pl-4",
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
                <PrivacyIcon className="h-5 w-5 text-blue-300" />
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
                <TermsIcon className="h-5 w-5 text-purple-300" />
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
