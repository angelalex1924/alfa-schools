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
import { useNationalHolidaysTheme } from "@/contexts/NationalHolidaysThemeContext"
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

  // Custom Home Icon for National Holidays (Greek Flag)
  const NationalHolidaysHomeIcon = ({ className }: { className?: string }) => (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1500 1000"
      fill="currentColor"
      className={className}
    >
      <defs>
        <style>{`.cls-1{fill:none;}.cls-2{clip-path:url(#clip-path);}.cls-3{fill:#145fac;}.cls-4{fill:#fff;}`}</style>
        <clipPath id="clip-path">
          <rect className="cls-1" x="0.08" y="0.19" width="1500" height="1000"/>
        </clipPath>
      </defs>
      <title>Flag-of-Greece</title>
      <g className="cls-2">
        <rect className="cls-3" x="-0.05" y="0.09" width="1500.29" height="1000.2"/>
        <path className="cls-4" d="M-.06,784.35v100.3H1500.23V784.35ZM696.4,338.61V438.9h803.83V338.61Zm0-222.86V216h803.83V115.75ZM410.86,561.47v-234H696.4V227.14H410.86V.09H285.49V227.14H-.06V327.48H285.49v234H-.06V661.77H1500.23V561.47Z"/>
      </g>
    </svg>
  )

  // Custom Contact Icon for National Holidays (Mail)
  const NationalHolidaysContactIcon = ({ className }: { className?: string }) => (
    <svg
      height="200px"
      width="200px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512.003 512.003"
      xmlSpace="preserve"
      fill="currentColor"
      className={className}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path style={{fill:"#CCCCCC"}} d="M228.723,346.835V471.82h-39.33V362.785c3.235-0.4,6.507-0.824,9.829-1.286 c11.166-1.549,21.52-6.707,29.488-14.675L228.723,346.835z"></path>
        <path style={{fill:"#0B9B53"}} d="M502.634,251.989v26.328l-203.869,16.012c-12.29,0.962-23.83,6.282-32.548,15l-37.507,37.494 c-7.968,7.968-18.322,13.127-29.488,14.675c-3.322,0.462-6.595,0.887-9.829,1.286c-72.64,8.843-123.398,0.712-152.087-7.044v-0.013 l39.305-76.512c9.192-17.898,27.402-29.338,47.511-29.888c126.458-3.497,282.429-5.97,339.57-15.15L502.634,251.989z"></path>
        <path style={{fill:"#999999"}} d="M228.723,346.835v44.938l-0.012,0.013c-7.968,7.968-18.322,13.127-29.488,14.675 c-3.322,0.462-6.595,0.887-9.829,1.286v-44.963c3.235-0.4,6.507-0.824,9.829-1.286c11.166-1.549,21.52-6.707,29.488-14.675 L228.723,346.835z"></path>
        <path style={{fill:"#06B559"}} d="M450.34,193.612l13.351,40.567c-57.14,9.18-213.112,11.653-339.57,15.15 c-20.108,0.55-38.318,11.99-47.511,29.888l-39.305,76.512v0.013c-18.61-5.033-27.939-9.917-27.939-9.917 c4.022-12.078,5.545-44.588,5.745-83.718c0.287-58.489,23.181-111.883,60.588-151.637c37.394-39.755,89.314-65.858,147.666-69.78 C325.068,33.869,418.466,96.804,450.34,193.612z"></path>
        <path style={{fill:"#0B9B53"}} d="M150.648,131.441c34.197-36.355,81.676-60.227,135.039-63.814c25.79-1.73,50.994,1.454,74.578,8.835 c-39.516-25.781-87.216-39.105-136.902-35.774c-58.352,3.922-110.272,30.025-147.666,69.78 c-37.407,39.755-60.3,93.148-60.588,151.637c-0.2,39.13-1.724,71.641-5.745,83.718c0,0,9.33,4.883,27.939,9.917v-0.013 l39.305-76.512c4.48-8.722,11.111-15.893,19.049-21.035C98.729,209.385,119.002,165.073,150.648,131.441z"></path>
        <g>
          <path style={{fill:"#333333"}} d="M506.528,243.478l-35.22-16.107l-12.073-36.68C426.019,89.756,328.779,24.227,222.744,31.346 c-58.825,3.948-113.471,29.768-153.869,72.706C28.462,147.005,6.043,203.119,5.749,262.058 c-0.272,54.539-3.015,74.043-5.267,80.801c-1.454,4.36,0.471,9.131,4.545,11.262c2.133,1.117,43.032,21.911,122.941,21.911 c15.817,0,33.18-0.823,52.06-2.768v98.554c0,5.173,4.194,9.367,9.367,9.367h39.33c5.173,0,9.367-4.194,9.367-9.367v-121.11 l34.75-34.75c7.134-7.135,16.604-11.501,26.664-12.29l203.862-16.008c4.875-0.383,8.634-4.45,8.634-9.339v-26.325 C512,248.332,509.862,245.002,506.528,243.478z M24.484,262.15c0.27-54.183,20.88-105.771,58.035-145.26 c37.147-39.48,87.392-63.222,141.481-66.851c97.475-6.547,186.898,53.704,217.442,146.51l9.846,29.915 c-52.589,6.478-160.152,9.21-264.424,11.858c-21.407,0.543-42.585,1.082-62.993,1.645c-23.541,0.648-44.841,14.051-55.585,34.974 l-35.758,69.593c-5.117-1.562-9.209-3.021-12.245-4.2C22.916,325.619,24.296,299.847,24.484,262.15z M198.761,462.45v-91.436 c0.592-0.08,1.165-0.147,1.76-0.23c6.558-0.913,12.932-2.911,18.836-5.851v97.517H198.761z M493.266,269.66l-195.228,15.33 c-14.504,1.139-28.158,7.433-38.445,17.72l-37.495,37.495c-6.488,6.488-15.068,10.757-24.16,12.024 c-67.182,9.354-116.284,3.911-146.834-2.853l33.847-65.876c7.621-14.841,22.732-24.347,39.437-24.807 c20.396-0.565,41.558-1.102,62.951-1.644c110.601-2.808,224.889-5.71,275.006-13.178l30.921,14.141V269.66z"></path>
          <circle style={{fill:"#333333"}} cx="235.381" cy="203.409" r="9.367"></circle>
        </g>
      </g>
    </svg>
  )

  // National Holidays Icons Helper
  const getNationalHolidaysIcon = (iconType: string, className?: string) => {
    switch (iconType) {
      case 'flag':
        return <NationalHolidaysHomeIcon className={className} />
      case 'monument':
        return <ServicesIcon className={className} />
      case 'laurel':
        return <Newspaper className={className} />
      case 'crown':
        return <WhyUsIcon className={className} />
      case 'shield':
        return <AboutUsIcon className={className} />
      case 'star':
        return <Users className={className} />
      default:
        return <span className={`${className} flex items-center justify-center`} style={{ lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          🇬🇷
        </span>
    }
  }

// Navigation items with the requested links - will be updated with translations
const getNavigationItems = (t: (key: string) => string | string[], isChristmasMode: boolean, isHalloweenMode: boolean, isCarnivalMode: boolean, isEasterMode: boolean, isSummerMode: boolean, isNationalHolidaysMode: boolean) => [
  {
    label: t('navigation.home'),
    href: "/",
    icon: isChristmasMode ? SantaIcon : isHalloweenMode ? "pumpkin" : isCarnivalMode ? "mask" : isEasterMode ? "bunny" : isSummerMode ? "sun" : isNationalHolidaysMode ? "flag" : HomeIcon,
    color: isChristmasMode ? "#dc2626" : isHalloweenMode ? "#ea580c" : isCarnivalMode ? "#ff6b6b" : isEasterMode ? "#ff6b9d" : isSummerMode ? "#fbbf24" : isNationalHolidaysMode ? "#1e40af" : "#3b82f6", // Κόκκινο για Χριστούγεννα, Πορτοκαλί για Halloween, Ροζ για Carnival, Pink για Easter, Κίτρινο για Summer, Μπλε για National Holidays
    iconColor: isChristmasMode ? "text-red-500" : isHalloweenMode ? "text-orange-500" : isCarnivalMode ? "text-pink-500" : isEasterMode ? "text-pink-500" : isSummerMode ? "text-yellow-500" : isNationalHolidaysMode ? "text-blue-600" : "text-blue-500"
  },
  {
    label: t('navigation.services'),
    href: "/services",
    icon: isChristmasMode ? ChristmasTreeIcon : isHalloweenMode ? HalloweenServicesIcon : isCarnivalMode ? "circus" : isEasterMode ? "egg" : isSummerMode ? "sunflower" : isNationalHolidaysMode ? "monument" : ServicesIcon,
    color: isChristmasMode ? "#16a34a" : isHalloweenMode ? "#7c3aed" : isCarnivalMode ? "#4ecdc4" : isEasterMode ? "#96ceb4" : isSummerMode ? "#f59e0b" : isNationalHolidaysMode ? "#1e40af" : "#c9b6e4", // Πράσινο για Χριστούγεννα, Μωβ για Halloween, Τυρκουάζ για Carnival, Πράσινο για Easter, Πορτοκαλί για Summer, Μπλε για National Holidays
    iconColor: isChristmasMode ? "text-green-500" : isHalloweenMode ? "text-purple-500" : isCarnivalMode ? "text-teal-500" : isEasterMode ? "text-green-500" : isSummerMode ? "text-orange-500" : isNationalHolidaysMode ? "text-blue-600" : "text-[#c9b6e4]"
  },
  {
    label: t('navigation.news'),
    href: "/articles",
    icon: isChristmasMode ? BellIcon : isHalloweenMode ? HalloweenNewsIcon : isCarnivalMode ? "art" : isEasterMode ? "chick" : isSummerMode ? "beach" : isNationalHolidaysMode ? "laurel" : ArticlesIcon,
    color: isChristmasMode ? "#fbbf24" : isHalloweenMode ? "#f59e0b" : isCarnivalMode ? "#feca57" : isEasterMode ? "#feca57" : isSummerMode ? "#f97316" : isNationalHolidaysMode ? "#1e40af" : "#f78da7", // Χρυσό για Χριστούγεννα, Κίτρινο για Halloween, Κίτρινο για Carnival, Κίτρινο για Easter, Πορτοκαλί για Summer, Μπλε για National Holidays
    iconColor: isChristmasMode ? "text-yellow-500" : isHalloweenMode ? "text-amber-500" : isCarnivalMode ? "text-yellow-500" : isEasterMode ? "text-yellow-500" : isSummerMode ? "text-orange-500" : isNationalHolidaysMode ? "text-blue-600" : "text-[#f78da7]"
  },
    {
      label: t('navigation.whyUs'),
      href: "/why-us",
      icon: isChristmasMode ? ReindeerIcon : isHalloweenMode ? "bat" : isCarnivalMode ? "music" : isEasterMode ? "flower" : isSummerMode ? "wave" : isNationalHolidaysMode ? "crown" : WhyUsIcon,
    color: isChristmasMode ? "#8b4513" : isHalloweenMode ? "#374151" : isCarnivalMode ? "#45b7d1" : isEasterMode ? "#ff6b9d" : isSummerMode ? "#06b6d4" : isNationalHolidaysMode ? "#1e40af" : "#fabeb6", // Καφέ για Χριστούγεννα, Γκρι για Halloween, Μπλε για Carnival, Pink για Easter, Cyan για Summer, Μπλε για National Holidays
    iconColor: isChristmasMode ? "text-amber-600" : isHalloweenMode ? "text-gray-600" : isCarnivalMode ? "text-blue-500" : isEasterMode ? "text-pink-500" : isSummerMode ? "text-cyan-500" : isNationalHolidaysMode ? "text-blue-600" : "text-[#fabeb6]"
  },
    {
      label: t('navigation.aboutUs'),
      href: "/about-us",
      icon: isChristmasMode ? "🏫" : isHalloweenMode ? "skull" : isCarnivalMode ? "mask" : isEasterMode ? "bunny" : isSummerMode ? "sun" : isNationalHolidaysMode ? "shield" : AboutUsIcon,
    color: isChristmasMode ? "#1e40af" : isHalloweenMode ? "#7c2d12" : isCarnivalMode ? "#be185d" : isEasterMode ? "#be185d" : isSummerMode ? "#f59e0b" : isNationalHolidaysMode ? "#1e40af" : "#1e40af", // Μπλε για Χριστούγεννα, Καφέ για Halloween, Ροζ για Carnival, Ροζ για Easter, Πορτοκαλί για Summer, Μπλε για National Holidays
    iconColor: isChristmasMode ? "text-blue-600" : isHalloweenMode ? "text-amber-800" : isCarnivalMode ? "text-pink-600" : isEasterMode ? "text-pink-600" : isSummerMode ? "text-orange-500" : isNationalHolidaysMode ? "text-blue-600" : "text-blue-600",
    isEmoji: isChristmasMode || isHalloweenMode || isCarnivalMode || isEasterMode || isSummerMode || isNationalHolidaysMode
  },
  {
    label: t('navigation.games'),
    href: "/games",
    icon: isChristmasMode ? GiftBoxIcon : isHalloweenMode ? HalloweenGamesIcon : isCarnivalMode ? "guitar" : isEasterMode ? "tulip" : isSummerMode ? "shell" : isNationalHolidaysMode ? "crown" : GamesIcon,
    color: isChristmasMode ? "#dc2626" : isHalloweenMode ? "#dc2626" : isCarnivalMode ? "#96ceb4" : isEasterMode ? "#4ecdc4" : isSummerMode ? "#f59e0b" : isNationalHolidaysMode ? "#1e40af" : "#a8e6cf", // Κόκκινο για Χριστούγεννα και Halloween, Πράσινο για Carnival, Τυρκουάζ για Easter, Πορτοκαλί για Summer, Μπλε για National Holidays
    iconColor: isChristmasMode ? "text-red-500" : isHalloweenMode ? "text-red-500" : isCarnivalMode ? "text-green-500" : isEasterMode ? "text-teal-500" : isSummerMode ? "text-orange-500" : isNationalHolidaysMode ? "text-blue-600" : "text-[#a8e6cf]"
  },
  {
    label: t('navigation.contact'),
    href: "/contact",
    icon: isHalloweenMode ? HalloweenContactIcon : isCarnivalMode ? "trumpet" : isEasterMode ? "butterfly" : isSummerMode ? "sunface" : isNationalHolidaysMode ? "flag" : ContactIcon,
    color: isChristmasMode ? "#16a34a" : isHalloweenMode ? "#6b7280" : isCarnivalMode ? "#ff9ff3" : isEasterMode ? "#54a0ff" : isSummerMode ? "#fbbf24" : isNationalHolidaysMode ? "#1e40af" : "#fde7dc", // Πράσινο για Χριστούγεννα, Γκρι για Halloween, Ροζ για Carnival, Μπλε για Easter, Κίτρινο για Summer, Μπλε για National Holidays
    iconColor: isChristmasMode ? "text-green-500" : isHalloweenMode ? "text-gray-500" : isCarnivalMode ? "text-pink-500" : isEasterMode ? "text-blue-500" : isSummerMode ? "text-yellow-500" : isNationalHolidaysMode ? "text-blue-600" : "text-[#fde7dc]"
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
  const { isNationalHolidaysMode } = useNationalHolidaysTheme()
  const navigationItems = getNavigationItems(t, isChristmasMode, isHalloweenMode, isCarnivalMode, isEasterMode, isSummerMode, isNationalHolidaysMode)

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
    } else if (isNationalHolidaysMode) {
      return scrolled
        ? isDarkMode
          ? "bg-gradient-to-r from-blue-800/20 via-blue-700/12 to-blue-800/20 backdrop-blur-2xl border border-blue-700/30 shadow-[0_8px_32px_rgba(30,64,175,0.25)]"
          : "bg-gradient-to-r from-blue-600/40 via-blue-700/30 to-blue-600/40 backdrop-blur-2xl border border-blue-600/50 shadow-[0_8px_32px_rgba(30,64,175,0.3)]"
        : isDarkMode
          ? "bg-gradient-to-r from-blue-800/18 via-blue-700/10 to-blue-800/18 backdrop-blur-2xl border border-blue-700/25 shadow-[0_4px_24px_rgba(30,64,175,0.2)]"
          : "bg-gradient-to-r from-blue-600/35 via-blue-700/25 to-blue-600/35 backdrop-blur-2xl border border-blue-600/40 shadow-[0_4px_24px_rgba(30,64,175,0.25)]"
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
                        : isNationalHolidaysMode
                          ? "/alfa-logo.png"
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

        {/* National Holidays Ελληνικό Σημαία δίπλα από το logo */}
        {isNationalHolidaysMode && (
          <div className="ml-2">
            <Image
              src="/Flag_of_Greece.gif"
              alt="Greek Flag"
              width={32}
              height={24}
              className="object-contain brightness-110 contrast-125 saturate-110"
            />
          </div>
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
            
            // Check if it's a Halloween, Carnival, Easter, Summer or National Holidays icon string
            const isHalloweenIcon = typeof item.icon === 'string' && ['pumpkin', 'witch', 'ghost', 'bat', 'spider', 'skull'].includes(item.icon)
            const isCarnivalIcon = typeof item.icon === 'string' && ['mask', 'circus', 'art', 'music', 'guitar', 'trumpet'].includes(item.icon)
            const isEasterIcon = typeof item.icon === 'string' && ['bunny', 'egg', 'chick', 'flower', 'tulip', 'butterfly'].includes(item.icon)
            const isSummerIcon = typeof item.icon === 'string' && ['sun', 'sunface', 'sunflower', 'beach', 'wave', 'shell'].includes(item.icon)
            const isNationalHolidaysIcon = typeof item.icon === 'string' && ['flag', 'monument', 'laurel', 'shield', 'star', 'crown'].includes(item.icon)

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
                        ) : isNationalHolidaysIcon ? (
                          getNationalHolidaysIcon(item.icon as string, "h-4 w-4 text-lg leading-none")
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
