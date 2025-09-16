"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  getThemeFromFirebase, 
  setThemeInFirebase, 
  subscribeToThemeChanges,
  initializeDefaultTheme,
  ThemeSettings 
} from '@/lib/firebase-theme'

interface SummerThemeContextType {
  isSummerMode: boolean
  toggleSummerMode: () => void
  setSummerMode: (enabled: boolean) => void
  isLoading: boolean
  isAdmin: boolean
}

const SummerThemeContext = createContext<SummerThemeContextType | undefined>(undefined)

export function SummerThemeProvider({ children }: { children: React.ReactNode }) {
  const [isSummerMode, setIsSummerMode] = useState(false)
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
          setIsSummerMode(themeData.isSummerMode)
        }
      } catch (error) {
        console.error('Error initializing theme:', error)
        // Fallback to localStorage if Firebase fails
        const savedSummerMode = localStorage.getItem('summerMode')
        if (savedSummerMode === 'true') {
          setIsSummerMode(true)
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
      console.log('SummerThemeContext - Theme data received:', themeData)
      if (themeData) {
        console.log('SummerThemeContext - Setting Summer mode to:', themeData.isSummerMode)
        setIsSummerMode(themeData.isSummerMode)
        // Also save to localStorage as backup
        localStorage.setItem('summerMode', themeData.isSummerMode.toString())
      }
    })

    return () => unsubscribe()
  }, [])

  const toggleSummerMode = async () => {
    const newMode = !isSummerMode
    setIsSummerMode(newMode)
    
    // Save to Firebase
    const success = await setThemeInFirebase(newMode, 'user', 'summer')
    if (!success) {
      // Revert if Firebase save failed
      setIsSummerMode(!newMode)
      console.error('Failed to save theme to Firebase')
    }
  }

  const setSummerMode = async (enabled: boolean) => {
    console.log('SummerThemeContext - setSummerMode called with:', enabled)
    setIsSummerMode(enabled)
    
    // Save to Firebase
    const success = await setThemeInFirebase(enabled, 'user', 'summer')
    console.log('SummerThemeContext - Firebase update success:', success)
    if (!success) {
      // Revert if Firebase save failed
      setIsSummerMode(!enabled)
      console.error('Failed to save theme to Firebase')
    }
  }

  return (
    <SummerThemeContext.Provider value={{
      isSummerMode,
      toggleSummerMode,
      setSummerMode,
      isLoading,
      isAdmin
    }}>
      {children}
    </SummerThemeContext.Provider>
  )
}

export function useSummerTheme() {
  const context = useContext(SummerThemeContext)
  if (context === undefined) {
    throw new Error('useSummerTheme must be used within a SummerThemeProvider')
  }
  return context
}
