"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'el' | 'en' | 'fr' | 'it' | 'de' | 'es'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string | string[]
  translations: Record<string, any>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('el')
  const [translations, setTranslations] = useState<Record<string, any>>({})

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [elTranslations, enTranslations, frTranslations, itTranslations, deTranslations, esTranslations] = await Promise.all([
          import('../locales/el.json'),
          import('../locales/en.json'),
          import('../locales/fr.json'),
          import('../locales/it.json'),
          import('../locales/de.json'),
          import('../locales/es.json')
        ])
        
        setTranslations({
          el: elTranslations.default,
          en: enTranslations.default,
          fr: frTranslations.default,
          it: itTranslations.default,
          de: deTranslations.default,
          es: esTranslations.default
        })
      } catch (error) {
        console.error('Error loading translations:', error)
      }
    }

    loadTranslations()
  }, [])

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['el', 'en', 'fr', 'it', 'de', 'es'].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    
    // Dispatch event for other components
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'language',
        newValue: lang,
        storageArea: localStorage,
      })
    )
  }

  const t = (key: string): string | string[] => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations: translations || {} }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
