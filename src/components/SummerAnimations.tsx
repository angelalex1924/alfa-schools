"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMobileMenu } from "@/contexts/MobileMenuContext"

interface SunRay {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
  rotation: number
}

export function SunRaysAnimation() {
  const [sunRays, setSunRays] = useState<SunRay[]>([])
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
      setSunRays([])
      return
    }

    // Create initial sun rays - πιο διακριτικά
    const createSunRays = () => {
      const raysArray: SunRay[] = []
      const count = 16
      const colors = ['#fbbf24', '#f59e0b', '#f97316', '#ea580c', '#dc2626', '#fbbf24', '#f59e0b', '#f97316']
      
      for (let i = 0; i < count; i++) {
        raysArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1.5,
          speed: Math.random() * 0.8 + 0.3,
          opacity: Math.random() * 0.3 + 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360
        })
      }
      setSunRays(raysArray)
    }

    createSunRays()

    // Animate sun rays
    const animateRays = () => {
      setSunRays(prev => prev.map(ray => {
        const newY = ray.y + ray.speed
        return {
          ...ray,
          y: newY > 100 ? -10 : newY, // Reset when off screen
          x: ray.x + Math.sin(ray.y * 0.01) * 0.5, // Gentle swaying
          rotation: ray.rotation + 0.3, // Slow rotation
        }
      }))
    }

    const interval = setInterval(animateRays, isMobile ? 100 : 60) // Πιο αργά στο mobile
    return () => clearInterval(interval)
  }, [isMobile, isMobileMenuOpen])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sunRays.map(ray => (
        <motion.div
          key={ray.id}
          className="absolute"
          style={{
            left: `${ray.x}%`,
            top: `${ray.y}%`,
            width: `${ray.size}px`,
            height: `${ray.size}px`,
            backgroundColor: ray.color,
            opacity: ray.opacity,
            borderRadius: '50%',
            transform: `rotate(${ray.rotation}deg)`
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

// Summer Icons Component
export function SummerIcons() {
  const [isMobile, setIsMobile] = useState(false)
  const { isMobileMenuOpen } = useMobileMenu()
  const icons = ['☀️', '🌞', '🌻', '🏖️', '🌊', '🐚', '🌴', '🍉', '🍦', '🏄‍♂️', '🌺', '🦋']
  
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

// Summer Background Pattern
export function SummerBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Summer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/25 via-orange-50/25 to-red-50/25 dark:from-yellow-900/15 dark:via-orange-900/15 dark:to-red-900/15"></div>
      
      {/* Subtle Summer pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Cpath d='M50 0c-12 0-25 13-25 25 0 12 13 25 25 25s25-13 25-25c0-12-13-25-25-25zm0 40c-8 0-15 7-15 15 0 8 7 15 15 15s15-7 15-15c0-8-7-15-15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      ></div>
    </div>
  )
}

// Summer Icons for components
export function getSummerIcons() {
  return {
    Sun: '☀️',
    SunFace: '🌞',
    Sunflower: '🌻',
    Beach: '🏖️',
    Wave: '🌊',
    Shell: '🐚',
    Palm: '🌴',
    Watermelon: '🍉',
    IceCream: '🍦',
    Surfer: '🏄‍♂️',
    Hibiscus: '🌺',
    Butterfly: '🦋'
  }
}
