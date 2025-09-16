"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMobileMenu } from "@/contexts/MobileMenuContext"

interface Bat {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export function BatsAnimation() {
  const [bats, setBats] = useState<Bat[]>([])
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
      setBats([])
      return
    }

    // Create initial bats - πιο διακριτικά
    const createBats = () => {
      const batArray: Bat[] = []
      const count = 12
      for (let i = 0; i < count; i++) {
        batArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.8,
          speed: Math.random() * 0.8 + 0.3,
          opacity: Math.random() * 0.2 + 0.1
        })
      }
      setBats(batArray)
    }

    createBats()

    // Animate bats
    const animateBats = () => {
      setBats(prev => prev.map(bat => {
        const newY = bat.y + bat.speed
        return {
          ...bat,
          y: newY > 100 ? -10 : newY, // Reset when off screen
          x: bat.x + Math.sin(bat.y * 0.02) * 1.5, // Flying pattern
        }
      }))
    }

    const interval = setInterval(animateBats, isMobile ? 120 : 60) // Πιο αργά στο mobile
    return () => clearInterval(interval)
  }, [isMobile, isMobileMenuOpen])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {bats.map(bat => (
        <motion.div
          key={bat.id}
          className="absolute text-gray-800 dark:text-gray-200"
          style={{
            left: `${bat.x}%`,
            top: `${bat.y}%`,
            fontSize: `${bat.size}px`,
            opacity: bat.opacity
          }}
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🦇
        </motion.div>
      ))}
    </div>
  )
}

// Halloween Icons Component
export function HalloweenIcons() {
  const [isMobile, setIsMobile] = useState(false)
  const { isMobileMenuOpen } = useMobileMenu()
  const icons = ['🎃', '👻', '🦇', '🕷️', '🕸️', '💀', '🧙‍♀️', '🧛‍♂️', '🌙', '⚰️']
  
  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Disable floating icons on mobile or when mobile menu is open for better performance
  if (isMobile || isMobileMenuOpen) {
    return null
  }
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl opacity-15"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  )
}

// Halloween Background Pattern
export function HalloweenBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Halloween gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-purple-50/20 to-black/10 dark:from-orange-900/10 dark:via-purple-900/10 dark:to-black/20"></div>
      
      {/* Subtle Halloween pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ea580c' fill-opacity='0.1'%3E%3Cpath d='M30 0c-5 0-10 5-10 10 0 5 5 10 10 10s10-5 10-10c0-5-5-10-10-10zm0 20c-5 0-10 5-10 10 0 5 5 10 10 10s10-5 10-10c0-5-5-10-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>
    </div>
  )
}

// Halloween Icons for components
export function getHalloweenIcons() {
  return {
    Pumpkin: '🎃',
    Ghost: '👻',
    Bat: '🦇',
    Spider: '🕷️',
    Web: '🕸️',
    Skull: '💀',
    Witch: '🧙‍♀️',
    Vampire: '🧛‍♂️',
    Moon: '🌙',
    Coffin: '⚰️'
  }
}
