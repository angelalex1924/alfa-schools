"use client"

import { useState, useEffect } from "react"
import GlowMenu from "./GlowMenu"
import MobileNav from "./MobileNav"
import { useLanguage } from "@/contexts/LanguageContext"
import { Home, Phone, Newspaper, Users } from "lucide-react"
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

// Navigation items - same as in GlowMenu
const getNavigationItems = (t: (key: string) => string | string[]) => [
  {
    label: t('navigation.home'),
    href: "/",
    icon: Home,
    color: "#3b82f6",
    iconColor: "text-blue-500"
  },
  {
    label: t('navigation.services'),
    href: "/services",
    icon: ServicesIcon,
    color: "#c9b6e4",
    iconColor: "text-[#c9b6e4]"
  },
  {
    label: t('navigation.news'),
    href: "/articles",
    icon: Newspaper,
    color: "#f78da7",
    iconColor: "text-[#f78da7]"
  },
  {
    label: t('navigation.whyUs'),
    href: "/why-us",
    icon: Users,
    color: "#fabeb6",
    iconColor: "text-[#fabeb6]"
  },
  {
    label: t('navigation.games'),
    href: "/games",
    icon: GamesIcon,
    color: "#a8e6cf",
    iconColor: "text-[#a8e6cf]"
  },
  {
    label: t('navigation.contact'),
    href: "/contact",
    icon: Phone,
    color: "#fde7dc",
    iconColor: "text-[#fde7dc]"
  }
]

export default function ResponsiveNav() {
  const [isMounted, setIsMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const navigationItems = getNavigationItems(t)

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <>
        {/* Desktop/Tablet Navigation (≥768px) */}
        <div className="hidden md:block">
          <GlowMenu />
        </div>

        {/* Mobile Navigation (<768px) */}
        <div className="md:hidden">
          <MobileNav items={navigationItems} />
        </div>
      </>
    )
  }

  return (
    <>
      {/* Desktop/Tablet Navigation (≥768px) */}
      <div className="hidden md:block">
        <GlowMenu />
      </div>

      {/* Mobile Navigation (<768px) */}
      <div className="md:hidden">
        <MobileNav items={navigationItems} />
      </div>
    </>
  )
}
