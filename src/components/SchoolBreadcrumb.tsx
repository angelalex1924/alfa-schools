"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { useChristmasTheme } from "@/contexts/ChristmasThemeContext"
import { useHalloweenTheme } from "@/contexts/HalloweenThemeContext"
import { useCarnivalTheme } from "@/contexts/CarnivalThemeContext"
import { useEasterTheme } from "@/contexts/EasterThemeContext"
import { useSummerTheme } from "@/contexts/SummerThemeContext"
import elTranslations from "@/locales/el.json"
import enTranslations from "@/locales/en.json"
import frTranslations from "@/locales/fr.json"
import { cn } from "@/lib/utils"
import { ChevronRight, Home, BookOpen, Gamepad2, Mail, Users, FileText } from "lucide-react"
import HomeIcon from './HomeIcon'
import ArticlesIcon from './ArticlesIcon'
import WhyUsIcon from './WhyUsIcon'
import AboutUsIcon from './AboutUsIcon'
import ContactIcon from './ContactIcon'
import { GamesIcon } from './custom-icons'

// Custom Services Icon - EXACT SAME as GlowMenu
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
import Link from "next/link"
import { useEffect, useState } from "react"
import { SantaIcon, ChristmasTreeIcon, ReindeerIcon, GiftBoxIcon, BellIcon } from "./ChristmasIcons"

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ComponentType<any>
}

interface SchoolBreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function SchoolBreadcrumb({ items, className }: SchoolBreadcrumbProps) {
  const { isDarkMode } = useTheme()
  const { language } = useLanguage()
  const { isChristmasMode } = useChristmasTheme()
  const { isHalloweenMode } = useHalloweenTheme()
  const { isCarnivalMode } = useCarnivalTheme()
  const { isEasterMode } = useEasterTheme()
  const { isSummerMode } = useSummerTheme()
  const [isMobile, setIsMobile] = useState(false)
  
  const translations = language === 'en' ? enTranslations : language === 'fr' ? frTranslations : elTranslations

  // Function to get translated label
  const getTranslatedLabel = (label: string) => {
    const labelLower = label.toLowerCase()
    
    // Check if it's a breadcrumb key
    if (labelLower.includes('αρχική') || labelLower.includes('home') || labelLower.includes('accueil')) {
      return translations.breadcrumbs.home
    }
    if (labelLower.includes('υπηρεσίες') || labelLower.includes('services')) {
      return translations.breadcrumbs.services
    }
    if (labelLower.includes('άρθρα') || labelLower.includes('articles') || labelLower.includes('actualités')) {
      return translations.breadcrumbs.articles
    }
    if (labelLower.includes('παιχνίδια') || labelLower.includes('games') || labelLower.includes('jeux')) {
      return translations.breadcrumbs.games
    }
    if (labelLower.includes('επικοινωνία') || labelLower.includes('contact')) {
      return translations.breadcrumbs.contact
    }
    if (labelLower.includes('γιατί εμάς') || labelLower.includes('why us') || labelLower.includes('pourquoi nous')) {
      return translations.breadcrumbs.whyUs
    }
    
    // Return original label if no translation found (e.g., article titles)
    return label
  }

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Christmas Icons Helper
  const getChristmasIcon = (iconType: string, className?: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      santa: SantaIcon,
      tree: ChristmasTreeIcon,
      reindeer: ReindeerIcon,
      gift: GiftBoxIcon,
      bell: BellIcon
    }
    
    const IconComponent = iconMap[iconType] || ChristmasTreeIcon
    return <IconComponent className={className} />
  }

  // Get Christmas icon for each breadcrumb item
  const getChristmasIconType = (label: string) => {
    const labelLower = label.toLowerCase()
    if (labelLower.includes('home') || labelLower.includes('αρχική')) return "santa"
    if (labelLower.includes('services') || labelLower.includes('υπηρεσίες')) return "tree"
    if (labelLower.includes('articles') || labelLower.includes('άρθρα')) return "bell"
    if (labelLower.includes('games') || labelLower.includes('παιχνίδια')) return "gift"
    if (labelLower.includes('contact') || labelLower.includes('επικοινωνία')) return "reindeer"
    return "tree"
  }

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
      <span className={`${className} flex items-center justify-center leading-none`} style={{ lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {iconMap[iconType] || "🎃"}
      </span>
    )
  }

  // Get icon for each breadcrumb item
  const getIcon = (label: string) => {
    const labelLower = label.toLowerCase()
    if (labelLower.includes('home') || labelLower.includes('αρχική')) return HomeIcon
    if (labelLower.includes('services') || labelLower.includes('υπηρεσίες')) return ServicesIcon
    if (labelLower.includes('articles') || labelLower.includes('άρθρα') || labelLower.includes('νέα') || labelLower.includes('τα νέα')) return ArticlesIcon
    if (labelLower.includes('games') || labelLower.includes('παιχνίδια')) return GamesIcon
    if (labelLower.includes('contact') || labelLower.includes('επικοινωνία')) return ContactIcon
    if (labelLower.includes('why') || labelLower.includes('γιατί')) return WhyUsIcon
    if (labelLower.includes('about') || labelLower.includes('σχετικά')) return AboutUsIcon
    return BookOpen
  }

  // Get Halloween icon for each breadcrumb item
  const getHalloweenIconType = (label: string) => {
    const labelLower = label.toLowerCase()
    if (labelLower.includes('home') || labelLower.includes('αρχική')) return "pumpkin"
    if (labelLower.includes('services') || labelLower.includes('υπηρεσίες')) return "witch"
    if (labelLower.includes('articles') || labelLower.includes('άρθρα')) return "ghost"
    if (labelLower.includes('games') || labelLower.includes('παιχνίδια')) return "spider"
    if (labelLower.includes('contact') || labelLower.includes('επικοινωνία')) return "skull"
    return "bat"
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
      <span className={`${className} flex items-center justify-center leading-none`} style={{ lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {iconMap[iconType] || "🎭"}
      </span>
    )
  }

  // Get Carnival icon for each breadcrumb item
  const getCarnivalIconType = (label: string) => {
    const labelLower = label.toLowerCase()
    if (labelLower.includes('home') || labelLower.includes('αρχική')) return "mask"
    if (labelLower.includes('services') || labelLower.includes('υπηρεσίες')) return "circus"
    if (labelLower.includes('articles') || labelLower.includes('άρθρα')) return "art"
    if (labelLower.includes('games') || labelLower.includes('παιχνίδια')) return "guitar"
    if (labelLower.includes('contact') || labelLower.includes('επικοινωνία')) return "trumpet"
    return "music"
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
      <span className={`${className} flex items-center justify-center leading-none`} style={{ lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {iconMap[iconType] || "🐰"}
      </span>
    )
  }

  // Get Easter icon for each breadcrumb item
  const getEasterIconType = (label: string) => {
    const labelLower = label.toLowerCase()
    if (labelLower.includes('home') || labelLower.includes('αρχική')) return "bunny"
    if (labelLower.includes('services') || labelLower.includes('υπηρεσίες')) return "egg"
    if (labelLower.includes('articles') || labelLower.includes('άρθρα')) return "chick"
    if (labelLower.includes('games') || labelLower.includes('παιχνίδια')) return "tulip"
    if (labelLower.includes('contact') || labelLower.includes('επικοινωνία')) return "butterfly"
    return "flower"
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
      <span className={`${className} flex items-center justify-center leading-none`} style={{ lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {iconMap[iconType] || "☀️"}
      </span>
    )
  }

  // Get Summer icon for each breadcrumb item
  const getSummerIconType = (label: string) => {
    const labelLower = label.toLowerCase()
    if (labelLower.includes('home') || labelLower.includes('αρχική')) return "sun"
    if (labelLower.includes('services') || labelLower.includes('υπηρεσίες')) return "sunflower"
    if (labelLower.includes('articles') || labelLower.includes('άρθρα')) return "beach"
    if (labelLower.includes('games') || labelLower.includes('παιχνίδια')) return "shell"
    if (labelLower.includes('contact') || labelLower.includes('επικοινωνία')) return "sunface"
    return "wave"
  }

  return (
    <div key={`breadcrumb-${isChristmasMode}-${isHalloweenMode}-${isCarnivalMode}-${isEasterMode}-${isSummerMode}`} className={cn("relative z-20", className)}>
      {/* Enhanced Notebook Paper Background */}
      <div className="relative">
        {/* Main notebook paper */}
        <div 
          key={`notebook-paper-${isChristmasMode}-${isHalloweenMode}-${isCarnivalMode}-${isEasterMode}-${isSummerMode}`}
          className="relative px-3 sm:px-4 py-2 sm:py-2.5 overflow-hidden"
          style={{
            backgroundImage: isDarkMode 
              ? 'none' 
              : 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}
        >
          {/* Red margin line */}
          <div className="absolute left-0 top-0 bottom-0 w-2 sm:w-3 flex flex-col">
            <div
              className="w-full h-px mt-1.5 sm:mt-2"
              style={{ 
                backgroundColor: isChristmasMode ? '#16a34a' : isHalloweenMode ? '#ea580c' : isCarnivalMode ? '#ff6b6b' : isEasterMode ? '#ff6b9d' : isSummerMode ? '#fbbf24' : '#dc2626', 
                opacity: 0.9 
              }}
            />
          </div>

          {/* Breadcrumb content */}
          <div className="relative ml-5 sm:ml-6 overflow-hidden">
            <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} aria-label="Breadcrumb">
              {items.map((item, index) => {
                const IconComponent = item.icon || getIcon(item.label)
                const isLast = index === items.length - 1
                
                return (
                  <div key={index} className="flex items-center">
                    {index > 0 && (
                      <motion.div
                        className="mx-1 sm:mx-2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ChevronRight 
                          className="w-3 h-3 sm:w-4 sm:h-4" 
                          style={{ 
                            color: isChristmasMode 
                              ? (isDarkMode ? '#dc2626' : '#dc2626')
                              : isHalloweenMode 
                                ? (isDarkMode ? '#ea580c' : '#ea580c')
                                : isCarnivalMode 
                                  ? (isDarkMode ? '#ff6b6b' : '#ff6b6b')
                                  : isEasterMode 
                                    ? (isDarkMode ? '#ff6b9d' : '#ff6b9d')
                                    : isSummerMode 
                                      ? (isDarkMode ? '#fbbf24' : '#fbbf24')
                                      : (isDarkMode ? '#fabeb6' : '#4a6fa5')
                          }}
                        />
                      </motion.div>
                    )}
                    
                    {isLast ? (
                      // Current page (non-clickable) - Compact style
                      <motion.div
                        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-1.5 relative"
                        style={{
                          color: isChristmasMode ? '#fbbf24' : isHalloweenMode ? '#f59e0b' : isCarnivalMode ? '#feca57' : isEasterMode ? '#feca57' : isSummerMode ? '#f59e0b' : '#fabeb6'
                        }}
                        initial={{ opacity: 0, x: -10, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                      >
                        {isChristmasMode ? (
                          getChristmasIcon(getChristmasIconType(item.label), "w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0")
                        ) : isHalloweenMode ? (
                          getHalloweenIcon(getHalloweenIconType(item.label), "w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0")
                        ) : isCarnivalMode ? (
                          getCarnivalIcon(getCarnivalIconType(item.label), "w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0")
                        ) : isEasterMode ? (
                          getEasterIcon(getEasterIconType(item.label), "w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0")
                        ) : isSummerMode ? (
                          getSummerIcon(getSummerIconType(item.label), "w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0")
                        ) : (
                          <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        )}
                        <div className="relative">
                          <span 
                            className="text-xs sm:text-sm font-bold truncate max-w-[100px] sm:max-w-[200px] block relative"
                            style={{ 
                              fontFamily: 'StampatelloFaceto, cursive',
                              letterSpacing: '0.5px',
                              textShadow: isDarkMode ? '1px 1px 2px rgba(0,0,0,0.3)' : '1px 1px 2px rgba(0,0,0,0.1)'
                            }}
                          >
                            {getTranslatedLabel(item.label)}
                          </span>
                           {/* Custom wavy underline - Inline SVG for iPhone compatibility */}
                           <div 
                             className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden"
                             style={{ 
                               transform: 'translateY(2px)',
                               WebkitTransform: 'translateY(2px)'
                             }}
                           >
                             <svg 
                               width="100%" 
                               height="4" 
                               viewBox="0 0 100 4" 
                               preserveAspectRatio="none"
                               style={{
                                 display: 'block',
                                 width: '100%',
                                 height: '100%'
                               }}
                             >
                               <path 
                                 d="m0,2 q25,-2 50,0 t50,0" 
                                 stroke={isChristmasMode ? '#fbbf24' : isHalloweenMode ? '#f59e0b' : isCarnivalMode ? '#feca57' : isEasterMode ? '#feca57' : isSummerMode ? '#f59e0b' : '#fabeb6'} 
                                 strokeWidth="2" 
                                 fill="none"
                                 vectorEffect="non-scaling-stroke"
                               />
                             </svg>
                           </div>
                        </div>
                      </motion.div>
                    ) : (
                      // Clickable breadcrumb - Compact style
                      <Link href={item.href || '#'}>
                        <motion.div
                          className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-1.5 transition-all duration-300 hover:scale-105"
                          style={{
                            color: isChristmasMode 
                              ? (isDarkMode ? '#dc2626' : '#dc2626')
                              : isHalloweenMode 
                                ? (isDarkMode ? '#ea580c' : '#ea580c')
                                : isCarnivalMode 
                                  ? (isDarkMode ? '#ff6b6b' : '#ff6b6b')
                                  : isEasterMode 
                                    ? (isDarkMode ? '#ff6b9d' : '#ff6b9d')
                                    : isSummerMode 
                                      ? (isDarkMode ? '#fbbf24' : '#fbbf24')
                                      : (isDarkMode ? '#81a1d4' : '#4a6fa5')
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            y: -1
                          }}
                          initial={{ opacity: 0, x: -10, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                        >
                          {isChristmasMode ? (
                            getChristmasIcon(getChristmasIconType(item.label), "w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0")
                          ) : isHalloweenMode ? (
                            getHalloweenIcon(getHalloweenIconType(item.label), "w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0")
                          ) : isCarnivalMode ? (
                            getCarnivalIcon(getCarnivalIconType(item.label), "w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0")
                          ) : isEasterMode ? (
                            getEasterIcon(getEasterIconType(item.label), "w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0")
                          ) : isSummerMode ? (
                            getSummerIcon(getSummerIconType(item.label), "w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0")
                          ) : (
                            <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          )}
                          <span 
                            className="text-xs sm:text-sm font-semibold truncate max-w-[80px] sm:max-w-[150px]"
                            style={{ 
                              fontFamily: 'StampatelloFaceto, cursive',
                              letterSpacing: '0.5px',
                              textShadow: isDarkMode ? '1px 1px 2px rgba(0,0,0,0.3)' : '1px 1px 2px rgba(0,0,0,0.1)'
                            }}
                          >
                            {getTranslatedLabel(item.label)}
                          </span>
                        </motion.div>
                      </Link>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>

          {/* School notebook lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-px"
                style={{ 
                  backgroundColor: isChristmasMode 
                    ? (isDarkMode ? '#16a34a' : '#16a34a')
                    : isHalloweenMode 
                      ? (isDarkMode ? '#ea580c' : '#ea580c')
                      : isCarnivalMode 
                        ? (isDarkMode ? '#ff6b6b' : '#ff6b6b')
                        : isEasterMode 
                          ? (isDarkMode ? '#ff6b9d' : '#ff6b9d')
                          : isSummerMode 
                            ? (isDarkMode ? '#fbbf24' : '#fbbf24')
                            : (isDarkMode ? '#fabeb6' : '#d1d5db'),
                  top: `${30 + i * 6}px`,
                  opacity: i === 0 ? 0.4 : 0.2,
                  width: '90%',
                  left: '5%'
                }}
              />
            ))}
          </div>
          
          {/* Bottom line for mobile */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ 
              backgroundColor: isChristmasMode 
                ? (isDarkMode ? '#16a34a' : '#16a34a')
                : isHalloweenMode 
                  ? (isDarkMode ? '#ea580c' : '#ea580c')
                  : isCarnivalMode 
                    ? (isDarkMode ? '#ff6b6b' : '#ff6b6b')
                    : isEasterMode 
                      ? (isDarkMode ? '#ff6b9d' : '#ff6b9d')
                      : isSummerMode 
                        ? (isDarkMode ? '#fbbf24' : '#fbbf24')
                        : (isDarkMode ? '#fabeb6' : '#d1d5db'),
              opacity: 0.3
            }}
          />
        </div>
      </div>
    </div>
  )
}
