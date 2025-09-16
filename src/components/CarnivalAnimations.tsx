"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMobileMenu } from "@/contexts/MobileMenuContext"

interface Confetti {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
}

export function ConfettiAnimation() {
  const [confetti, setConfetti] = useState<Confetti[]>([])
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
      setConfetti([])
      return
    }

    // Create initial confetti - πιο διακριτικά
    const createConfetti = () => {
      const confettiArray: Confetti[] = []
      const count = 15
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff']
      
      for (let i = 0; i < count; i++) {
        confettiArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1.5,
          speed: Math.random() * 1 + 0.5,
          opacity: Math.random() * 0.4 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
      setConfetti(confettiArray)
    }

    createConfetti()

    // Animate confetti
    const animateConfetti = () => {
      setConfetti(prev => prev.map(conf => {
        const newY = conf.y + conf.speed
        return {
          ...conf,
          y: newY > 100 ? -10 : newY, // Reset when off screen
          x: conf.x + Math.sin(conf.y * 0.01) * 0.8, // Gentle swaying
        }
      }))
    }

    const interval = setInterval(animateConfetti, isMobile ? 100 : 60) // Πιο αργά στο mobile
    return () => clearInterval(interval)
  }, [isMobile, isMobileMenuOpen])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {confetti.map(conf => (
        <motion.div
          key={conf.id}
          className="absolute"
          style={{
            left: `${conf.x}%`,
            top: `${conf.y}%`,
            width: `${conf.size}px`,
            height: `${conf.size}px`,
            backgroundColor: conf.color,
            opacity: conf.opacity,
            borderRadius: '50%'
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

// Carnival Icons Component
export function CarnivalIcons() {
  const [isMobile, setIsMobile] = useState(false)
  const { isMobileMenuOpen } = useMobileMenu()
  const icons = ['🎭', '🎪', '🎨', '🎵', '🎸', '🎺', '🥁', '🎤', '💃', '🕺', '🎊', '🎉']
  
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

// Carnival Background Pattern
export function CarnivalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Carnival gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/20 via-purple-50/20 to-yellow-50/20 dark:from-pink-900/10 dark:via-purple-900/10 dark:to-yellow-900/10"></div>
      
      {/* Subtle Carnival pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b6b' fill-opacity='0.1'%3E%3Cpath d='M30 0c-5 0-10 5-10 10 0 5 5 10 10 10s10-5 10-10c0-5-5-10-10-10zm0 20c-5 0-10 5-10 10 0 5 5 10 10 10s10-5 10-10c0-5-5-10-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>
    </div>
  )
}

// Carnival Icons for components
export function getCarnivalIcons() {
  return {
    Mask: '🎭',
    Circus: '🎪',
    Art: '🎨',
    Music: '🎵',
    Guitar: '🎸',
    Trumpet: '🎺',
    Drums: '🥁',
    Microphone: '🎤',
    Dancer: '💃',
    DancerMale: '🕺',
    Confetti: '🎊',
    Party: '🎉'
  }
}
