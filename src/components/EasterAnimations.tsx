"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMobileMenu } from "@/contexts/MobileMenuContext"

interface EasterEgg {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
  rotation: number
}

export function EasterEggsAnimation() {
  const [easterEggs, setEasterEggs] = useState<EasterEgg[]>([])
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
      setEasterEggs([])
      return
    }

    // Create initial Easter eggs - πιο διακριτικά
    const createEasterEggs = () => {
      const eggsArray: EasterEgg[] = []
      const count = 12
      const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#ffa726']
      
      for (let i = 0; i < count; i++) {
        eggsArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 2,
          speed: Math.random() * 0.8 + 0.3,
          opacity: Math.random() * 0.3 + 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360
        })
      }
      setEasterEggs(eggsArray)
    }

    createEasterEggs()

    // Animate Easter eggs
    const animateEggs = () => {
      setEasterEggs(prev => prev.map(egg => {
        const newY = egg.y + egg.speed
        return {
          ...egg,
          y: newY > 100 ? -10 : newY, // Reset when off screen
          x: egg.x + Math.sin(egg.y * 0.008) * 0.6, // Gentle swaying
          rotation: egg.rotation + 0.5, // Slow rotation
        }
      }))
    }

    const interval = setInterval(animateEggs, isMobile ? 120 : 80) // Πιο αργά στο mobile
    return () => clearInterval(interval)
  }, [isMobile, isMobileMenuOpen])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {easterEggs.map(egg => (
        <motion.div
          key={egg.id}
          className="absolute"
          style={{
            left: `${egg.x}%`,
            top: `${egg.y}%`,
            width: `${egg.size}px`,
            height: `${egg.size}px`,
            backgroundColor: egg.color,
            opacity: egg.opacity,
            borderRadius: '60% 40% 60% 40%', // Egg shape
            transform: `rotate(${egg.rotation}deg)`
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Easter Icons Component
export function EasterIcons() {
  const [isMobile, setIsMobile] = useState(false)
  const { isMobileMenuOpen } = useMobileMenu()
  const icons = ['🐰', '🥚', '🐣', '🌸', '🌷', '🌼', '🦋', '🐇', '🌿', '🌺', '🪺', '🌱']
  
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
            y: [0, -20, 0],
            rotate: [0, 6, -6, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
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

// Easter Background Pattern
export function EasterBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Easter gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/25 via-yellow-50/25 to-green-50/25 dark:from-pink-900/15 dark:via-yellow-900/15 dark:to-green-900/15"></div>
      
      {/* Subtle Easter pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b9d' fill-opacity='0.1'%3E%3Cpath d='M40 0c-8 0-15 7-15 15 0 8 7 15 15 15s15-7 15-15c0-8-7-15-15-15zm0 25c-5 0-10 5-10 10 0 5 5 10 10 10s10-5 10-10c0-5-5-10-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}
      ></div>
    </div>
  )
}

// Easter Icons for components
export function getEasterIcons() {
  return {
    Bunny: '🐰',
    Egg: '🥚',
    Chick: '🐣',
    Flower: '🌸',
    Tulip: '🌷',
    Daisy: '🌼',
    Butterfly: '🦋',
    Rabbit: '🐇',
    Leaf: '🌿',
    Hibiscus: '🌺',
    Nest: '🪺',
    Sprout: '🌱'
  }
}
