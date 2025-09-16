"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  getThemeFromFirebase, 
  setThemeInFirebase, 
  subscribeToThemeChanges,
  initializeDefaultTheme,
  ThemeSettings 
} from '@/lib/firebase-theme'

interface CarnivalThemeContextType {
  isCarnivalMode: boolean
  toggleCarnivalMode: () => void
  setCarnivalMode: (enabled: boolean) => void
  isLoading: boolean
  isAdmin: boolean
}

const CarnivalThemeContext = createContext<CarnivalThemeContextType | undefined>(undefined)

export function CarnivalThemeProvider({ children }: { children: React.ReactNode }) {
  const [isCarnivalMode, setIsCarnivalMode] = useState(false)
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
          setIsCarnivalMode(themeData.isCarnivalMode)
        }
      } catch (error) {
        console.error('Error initializing theme:', error)
        // Fallback to localStorage if Firebase fails
        const savedCarnivalMode = localStorage.getItem('carnivalMode')
        if (savedCarnivalMode === 'true') {
          setIsCarnivalMode(true)
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
      console.log('CarnivalThemeContext - Theme data received:', themeData)
      if (themeData) {
        console.log('CarnivalThemeContext - Setting Carnival mode to:', themeData.isCarnivalMode)
        setIsCarnivalMode(themeData.isCarnivalMode)
        // Also save to localStorage as backup
        localStorage.setItem('carnivalMode', themeData.isCarnivalMode.toString())
      }
    })

    return () => unsubscribe()
  }, [])

  const toggleCarnivalMode = async () => {
    const newMode = !isCarnivalMode
    setIsCarnivalMode(newMode)
    
    // Save to Firebase
    const success = await setThemeInFirebase(newMode, 'user', 'carnival')
    if (!success) {
      // Revert if Firebase save failed
      setIsCarnivalMode(!newMode)
      console.error('Failed to save theme to Firebase')
    }
  }

  const setCarnivalMode = async (enabled: boolean) => {
    console.log('CarnivalThemeContext - setCarnivalMode called with:', enabled)
    setIsCarnivalMode(enabled)
    
    // Save to Firebase
    const success = await setThemeInFirebase(enabled, 'user', 'carnival')
    console.log('CarnivalThemeContext - Firebase update success:', success)
    if (!success) {
      // Revert if Firebase save failed
      setIsCarnivalMode(!enabled)
      console.error('Failed to save theme to Firebase')
    }
  }

  return (
    <CarnivalThemeContext.Provider value={{
      isCarnivalMode,
      toggleCarnivalMode,
      setCarnivalMode,
      isLoading,
      isAdmin
    }}>
      {children}
    </CarnivalThemeContext.Provider>
  )
}

export function useCarnivalTheme() {
  const context = useContext(CarnivalThemeContext)
  if (context === undefined) {
    throw new Error('useCarnivalTheme must be used within a CarnivalThemeProvider')
  }
  return context
}
