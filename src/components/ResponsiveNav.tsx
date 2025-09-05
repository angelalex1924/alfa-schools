"use client"

import { useState, useEffect } from "react"
import GlowMenu from "./GlowMenu"
import MobileNav from "./MobileNav"

export default function ResponsiveNav() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener('resize', checkScreenSize)

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Show loading state to prevent hydration mismatch
  if (typeof window === 'undefined') {
    return null
  }

  return (
    <>
      {/* Desktop/Tablet Navigation (≥768px) */}
      <div className="hidden md:block">
        <GlowMenu />
      </div>

      {/* Mobile Navigation (<768px) */}
      <div className="md:hidden">
        <MobileNav items={[]} />
      </div>
    </>
  )
}
