"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  getThemeFromFirebase, 
  setThemeInFirebase, 
  subscribeToThemeChanges,
  initializeDefaultTheme,
  ThemeSettings 
} from '@/lib/firebase-theme'

interface EasterThemeContextType {
  isEasterMode: boolean
  toggleEasterMode: () => void
  setEasterMode: (enabled: boolean) => void
  isLoading: boolean
  isAdmin: boolean
}

const EasterThemeContext = createContext<EasterThemeContextType | undefined>(undefined)

export function EasterThemeProvider({ children }: { children: React.ReactNode }) {
  const [isEasterMode, setIsEasterMode] = useState(false)
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
          setIsEasterMode(themeData.isEasterMode)
        }
      } catch (error) {
        console.error('Error initializing theme:', error)
        // Fallback to localStorage if Firebase fails
        const savedEasterMode = localStorage.getItem('easterMode')
        if (savedEasterMode === 'true') {
          setIsEasterMode(true)
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
      console.log('EasterThemeContext - Theme data received:', themeData)
      if (themeData) {
        console.log('EasterThemeContext - Setting Easter mode to:', themeData.isEasterMode)
        setIsEasterMode(themeData.isEasterMode)
        // Also save to localStorage as backup
        localStorage.setItem('easterMode', themeData.isEasterMode.toString())
      }
    })

    return () => unsubscribe()
  }, [])

  const toggleEasterMode = async () => {
    const newMode = !isEasterMode
    setIsEasterMode(newMode)
    
    // Save to Firebase
    const success = await setThemeInFirebase(newMode, 'user', 'easter')
    if (!success) {
      // Revert if Firebase save failed
      setIsEasterMode(!newMode)
      console.error('Failed to save theme to Firebase')
    }
  }

  const setEasterMode = async (enabled: boolean) => {
    console.log('EasterThemeContext - setEasterMode called with:', enabled)
    setIsEasterMode(enabled)
    
    // Save to Firebase
    const success = await setThemeInFirebase(enabled, 'user', 'easter')
    console.log('EasterThemeContext - Firebase update success:', success)
    if (!success) {
      // Revert if Firebase save failed
      setIsEasterMode(!enabled)
      console.error('Failed to save theme to Firebase')
    }
  }

  return (
    <EasterThemeContext.Provider value={{
      isEasterMode,
      toggleEasterMode,
      setEasterMode,
      isLoading,
      isAdmin
    }}>
      {children}
    </EasterThemeContext.Provider>
  )
}

export function useEasterTheme() {
  const context = useContext(EasterThemeContext)
  if (context === undefined) {
    throw new Error('useEasterTheme must be used within an EasterThemeProvider')
  }
  return context
}
