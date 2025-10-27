"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  getThemeFromFirebase, 
  setThemeInFirebase, 
  subscribeToThemeChanges,
  initializeDefaultTheme,
  ThemeSettings 
} from '@/lib/firebase-theme'

interface NationalHolidaysThemeContextType {
  isNationalHolidaysMode: boolean
  toggleNationalHolidaysMode: () => void
  setNationalHolidaysMode: (enabled: boolean) => void
  isLoading: boolean
  isAdmin: boolean
}

const NationalHolidaysThemeContext = createContext<NationalHolidaysThemeContextType | undefined>(undefined)

export function NationalHolidaysThemeProvider({ children }: { children: React.ReactNode }) {
  const [isNationalHolidaysMode, setIsNationalHolidaysMode] = useState(false)
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
          setIsNationalHolidaysMode(themeData.isNationalHolidaysMode)
        }
      } catch (error) {
        console.error('Error initializing theme:', error)
        // Fallback to localStorage if Firebase fails
        const savedNationalHolidaysMode = localStorage.getItem('nationalHolidaysMode')
        if (savedNationalHolidaysMode === 'true') {
          setIsNationalHolidaysMode(true)
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
      console.log('NationalHolidaysThemeContext - Theme data received:', themeData)
      if (themeData) {
        console.log('NationalHolidaysThemeContext - Setting National Holidays mode to:', themeData.isNationalHolidaysMode)
        setIsNationalHolidaysMode(themeData.isNationalHolidaysMode)
        // Also save to localStorage as backup
        localStorage.setItem('nationalHolidaysMode', themeData.isNationalHolidaysMode.toString())
      }
    })

    return () => unsubscribe()
  }, [])

  const toggleNationalHolidaysMode = async () => {
    const newMode = !isNationalHolidaysMode
    setIsNationalHolidaysMode(newMode)
    
    // Save to Firebase
    const success = await setThemeInFirebase(newMode, 'user', 'nationalHolidays')
    if (!success) {
      // Revert if Firebase save failed
      setIsNationalHolidaysMode(!newMode)
      console.error('Failed to save theme to Firebase')
    }
  }

  const setNationalHolidaysMode = async (enabled: boolean) => {
    console.log('NationalHolidaysThemeContext - setNationalHolidaysMode called with:', enabled)
    setIsNationalHolidaysMode(enabled)
    
    // Save to Firebase
    const success = await setThemeInFirebase(enabled, 'user', 'nationalHolidays')
    console.log('NationalHolidaysThemeContext - Firebase update success:', success)
    if (!success) {
      // Revert if Firebase save failed
      setIsNationalHolidaysMode(!enabled)
      console.error('Failed to save theme to Firebase')
    }
  }

  return (
    <NationalHolidaysThemeContext.Provider value={{
      isNationalHolidaysMode,
      toggleNationalHolidaysMode,
      setNationalHolidaysMode,
      isLoading,
      isAdmin
    }}>
      {children}
    </NationalHolidaysThemeContext.Provider>
  )
}

export function useNationalHolidaysTheme() {
  const context = useContext(NationalHolidaysThemeContext)
  if (context === undefined) {
    throw new Error('useNationalHolidaysTheme must be used within a NationalHolidaysThemeProvider')
  }
  return context
}
