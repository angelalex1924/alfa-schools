"use client"

import { useState, useEffect } from "react"
import ModernHeroCarousel from "./ModernHeroCarousel"
import MobileNotebookCarousel from "./MobileNotebookCarousel"

export default function ResponsiveCarousel() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return <MobileNotebookCarousel />
  }

  return <ModernHeroCarousel />
}
