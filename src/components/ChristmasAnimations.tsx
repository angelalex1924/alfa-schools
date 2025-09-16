"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMobileMenu } from "@/contexts/MobileMenuContext"

interface Snowflake {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export function SnowflakesAnimation() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const { isMobileMenuOpen } = useMobileMenu()

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Disable animations on mobile or when mobile menu is open for better performance
    if (isMobile || isMobileMenuOpen) {
      setSnowflakes([])
      return
    }

    // Create initial snowflakes - πιο διακριτικά
    const createSnowflakes = () => {
      const flakes: Snowflake[] = []
      const count = 15
      for (let i = 0; i < count; i++) {
        flakes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 1 + 0.3,
          opacity: Math.random() * 0.3 + 0.1
        })
      }
      setSnowflakes(flakes)
    }

    createSnowflakes()

    // Animate snowflakes
    const animateSnowflakes = () => {
      setSnowflakes(prev => prev.map(flake => {
        const newY = flake.y + flake.speed
        return {
          ...flake,
          y: newY > 100 ? -10 : newY, // Reset when off screen
          x: flake.x + Math.sin(flake.y * 0.01) * 0.5, // Gentle swaying
        }
      }))
    }

    const interval = setInterval(animateSnowflakes, isMobile ? 100 : 50) // Πιο αργά στο mobile
    return () => clearInterval(interval)
  }, [isMobile, isMobileMenuOpen])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map(flake => (
        <motion.div
          key={flake.id}
          className="absolute text-white/60"
          style={{
            left: `${flake.x}%`,
            top: `${flake.y}%`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ❄️
        </motion.div>
      ))}
    </div>
  )
}

// Christmas Icons Component
export function ChristmasIcons() {
  const [isMobile, setIsMobile] = useState(false)
  const { isMobileMenuOpen } = useMobileMenu()
  const icons = ['🎄', '🎅', '🦌', '🎁', '⭐', '🔔', '❄️', '⛄']
  
  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Disable animations on mobile or when mobile menu is open
  if (isMobile || isMobileMenuOpen) {
    return null
  }
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={isMobile ? {
            // Στο mobile: μόνο subtle movement
            y: [0, -5, 0],
            scale: [1, 1.02, 1]
          } : {
            // Στο desktop: πλήρες animation
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={isMobile ? {
            // Στο mobile: πιο αργά και smooth
            duration: 6 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          } : {
            // Στο desktop: κανονικό animation
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  )
}

// Christmas Background Pattern
export function ChristmasBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Christmas gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/20 via-green-50/20 to-red-50/20 dark:from-red-900/10 dark:via-green-900/10 dark:to-red-900/10"></div>
      
      {/* Subtle Christmas pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.1'%3E%3Cpath d='M30 0l5 10h10l-8 8 3 10-10-5-10 5 3-10-8-8h10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>
    </div>
  )
}
