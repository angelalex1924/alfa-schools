"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  getThemeFromFirebase, 
  setThemeInFirebase, 
  subscribeToThemeChanges,
  initializeDefaultTheme,
  ThemeSettings 
} from '@/lib/firebase-theme'

interface ChristmasThemeContextType {
  isChristmasMode: boolean
  toggleChristmasMode: () => void
  setChristmasMode: (enabled: boolean) => void
  isLoading: boolean
  isAdmin: boolean
}

const ChristmasThemeContext = createContext<ChristmasThemeContextType | undefined>(undefined)

export function ChristmasThemeProvider({ children }: { children: React.ReactNode }) {
  const [isChristmasMode, setIsChristmasMode] = useState(false)
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
          setIsChristmasMode(themeData.isChristmasMode)
        }
      } catch (error) {
        console.error('Error initializing theme:', error)
        // Fallback to localStorage if Firebase fails
        const savedChristmasMode = localStorage.getItem('christmasMode')
        if (savedChristmasMode === 'true') {
          setIsChristmasMode(true)
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
      console.log('ChristmasThemeContext - Theme data received:', themeData)
      if (themeData) {
        console.log('ChristmasThemeContext - Setting Christmas mode to:', themeData.isChristmasMode)
        setIsChristmasMode(themeData.isChristmasMode)
        // Also save to localStorage as backup
        localStorage.setItem('christmasMode', themeData.isChristmasMode.toString())
      }
    })

    return () => unsubscribe()
  }, [])

  const toggleChristmasMode = async () => {
    const newMode = !isChristmasMode
    setIsChristmasMode(newMode)
    
    // Save to Firebase
    const success = await setThemeInFirebase(newMode, 'user')
    if (!success) {
      // Revert if Firebase save failed
      setIsChristmasMode(!newMode)
      console.error('Failed to save theme to Firebase')
    }
  }

  const setChristmasMode = async (enabled: boolean) => {
    console.log('ChristmasThemeContext - setChristmasMode called with:', enabled)
    setIsChristmasMode(enabled)
    
    // Save to Firebase
    const success = await setThemeInFirebase(enabled, 'user')
    console.log('ChristmasThemeContext - Firebase update success:', success)
    if (!success) {
      // Revert if Firebase save failed
      setIsChristmasMode(!enabled)
      console.error('Failed to save theme to Firebase')
    }
  }

  return (
    <ChristmasThemeContext.Provider value={{
      isChristmasMode,
      toggleChristmasMode,
      setChristmasMode,
      isLoading,
      isAdmin
    }}>
      {children}
    </ChristmasThemeContext.Provider>
  )
}

export function useChristmasTheme() {
  const context = useContext(ChristmasThemeContext)
  if (context === undefined) {
    throw new Error('useChristmasTheme must be used within a ChristmasThemeProvider')
  }
  return context
}
