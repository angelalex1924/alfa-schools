"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  getThemeFromFirebase, 
  setThemeInFirebase, 
  subscribeToThemeChanges,
  initializeDefaultTheme,
  ThemeSettings 
} from '@/lib/firebase-theme'

interface HalloweenThemeContextType {
  isHalloweenMode: boolean
  toggleHalloweenMode: () => void
  setHalloweenMode: (enabled: boolean) => void
  isLoading: boolean
  isAdmin: boolean
}

const HalloweenThemeContext = createContext<HalloweenThemeContextType | undefined>(undefined)

export function HalloweenThemeProvider({ children }: { children: React.ReactNode }) {
  const [isHalloweenMode, setIsHalloweenMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = () => {
      // Check if we're on admin pages
      const isAdminPage = window.location.pathname.startsWith('/admin')
      
      // Check for admin cookie or localStorage
      const hasAdminCookie = document.cookie.includes('admin=true')
      const hasAdminLocalStorage = localStorage.getItem('admin') === 'true'
      
      // Check for specific admin emails (you can add more)
      const adminEmails = ['admin@alfaschool.gr', 'angel@acronweb.gr']
      const currentEmail = localStorage.getItem('userEmail') || ''
      const isAdminEmail = adminEmails.includes(currentEmail)
      
      setIsAdmin(isAdminPage || hasAdminCookie || hasAdminLocalStorage || isAdminEmail)
    }
    
    checkAdminStatus()
    
    // Listen for storage changes (when user logs in/out)
    const handleStorageChange = () => {
      checkAdminStatus()
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Initialize theme from Firebase
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        setIsLoading(true)
        
        // Initialize default theme if it doesn't exist
        await initializeDefaultTheme()
        
        // Get current theme from Firebase
        const themeData = await getThemeFromFirebase()
        if (themeData) {
          setIsHalloweenMode(themeData.isHalloweenMode)
        }
      } catch (error) {
        console.error('Error initializing theme:', error)
        // Fallback to localStorage if Firebase fails
        const savedHalloweenMode = localStorage.getItem('halloweenMode')
        if (savedHalloweenMode === 'true') {
          setIsHalloweenMode(true)
        }
      } finally {
        setIsLoading(false)
      }
    }

    initializeTheme()
  }, [])

  // Listen to real-time theme changes from Firebase
  useEffect(() => {
    const unsubscribe = subscribeToThemeChanges((themeData: ThemeSettings | null) => {
      console.log('HalloweenThemeContext - Theme data received:', themeData)
      if (themeData) {
        console.log('HalloweenThemeContext - Setting Halloween mode to:', themeData.isHalloweenMode)
        setIsHalloweenMode(themeData.isHalloweenMode)
        // Also save to localStorage as backup
        localStorage.setItem('halloweenMode', themeData.isHalloweenMode.toString())
      }
    })

    return () => unsubscribe()
  }, [])

  const toggleHalloweenMode = async () => {
    const newMode = !isHalloweenMode
    setIsHalloweenMode(newMode)
    
    // Save to Firebase
    const success = await setThemeInFirebase(newMode, 'user', 'halloween')
    if (!success) {
      // Revert if Firebase save failed
      setIsHalloweenMode(!newMode)
      console.error('Failed to save theme to Firebase')
    }
  }

  const setHalloweenMode = async (enabled: boolean) => {
    console.log('HalloweenThemeContext - setHalloweenMode called with:', enabled)
    setIsHalloweenMode(enabled)
    
    // Save to Firebase
    const success = await setThemeInFirebase(enabled, 'user', 'halloween')
    console.log('HalloweenThemeContext - Firebase update success:', success)
    if (!success) {
      // Revert if Firebase save failed
      setIsHalloweenMode(!enabled)
      console.error('Failed to save theme to Firebase')
    }
  }

  return (
    <HalloweenThemeContext.Provider value={{
      isHalloweenMode,
      toggleHalloweenMode,
      setHalloweenMode,
      isLoading,
      isAdmin
    }}>
      {children}
    </HalloweenThemeContext.Provider>
  )
}

export function useHalloweenTheme() {
  const context = useContext(HalloweenThemeContext)
  if (context === undefined) {
    throw new Error('useHalloweenTheme must be used within a HalloweenThemeProvider')
  }
  return context
}
