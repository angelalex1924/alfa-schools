import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'

export interface ThemeSettings {
  isChristmasMode: boolean
  isHalloweenMode: boolean
  isCarnivalMode: boolean
  isEasterMode: boolean
  isSummerMode: boolean
  isNationalHolidaysMode: boolean
  lastUpdated: number
  updatedBy: string
}

const THEME_DOC_ID = 'site-theme'

// Get current theme from Firebase
export async function getThemeFromFirebase(): Promise<ThemeSettings | null> {
  try {
    const themeDoc = await getDoc(doc(db, 'settings', THEME_DOC_ID))
    if (themeDoc.exists()) {
      return themeDoc.data() as ThemeSettings
    }
    return null
  } catch (error) {
    console.error('Error getting theme from Firebase:', error)
    return null
  }
}

// Set theme in Firebase
export async function setThemeInFirebase(
  isThemeMode: boolean, 
  updatedBy: string = 'admin',
  themeType: 'christmas' | 'halloween' | 'carnival' | 'easter' | 'summer' | 'nationalHolidays' = 'christmas'
): Promise<boolean> {
  try {
    // Get current theme data first
    const currentTheme = await getThemeFromFirebase()
    
    const themeData: ThemeSettings = {
      isChristmasMode: themeType === 'christmas' ? isThemeMode : (currentTheme?.isChristmasMode || false),
      isHalloweenMode: themeType === 'halloween' ? isThemeMode : (currentTheme?.isHalloweenMode || false),
      isCarnivalMode: themeType === 'carnival' ? isThemeMode : (currentTheme?.isCarnivalMode || false),
      isEasterMode: themeType === 'easter' ? isThemeMode : (currentTheme?.isEasterMode || false),
      isSummerMode: themeType === 'summer' ? isThemeMode : (currentTheme?.isSummerMode || false),
      isNationalHolidaysMode: themeType === 'nationalHolidays' ? isThemeMode : (currentTheme?.isNationalHolidaysMode || false),
      lastUpdated: Date.now(),
      updatedBy
    }
    
    await setDoc(doc(db, 'settings', THEME_DOC_ID), themeData)
    return true
  } catch (error) {
    console.error('Error setting theme in Firebase:', error)
    return false
  }
}

// Listen to theme changes in real-time
export function subscribeToThemeChanges(
  callback: (theme: ThemeSettings | null) => void
): () => void {
  const unsubscribe = onSnapshot(
    doc(db, 'settings', THEME_DOC_ID),
    (doc) => {
      if (doc.exists()) {
        callback(doc.data() as ThemeSettings)
      } else {
        callback(null)
      }
    },
    (error) => {
      console.error('Error listening to theme changes:', error)
      callback(null)
    }
  )
  
  return unsubscribe
}

// Initialize default theme if it doesn't exist
export async function initializeDefaultTheme(): Promise<void> {
  try {
    const existingTheme = await getThemeFromFirebase()
    if (!existingTheme) {
      const defaultTheme: ThemeSettings = {
        isChristmasMode: false,
        isHalloweenMode: false,
        isCarnivalMode: false,
        isEasterMode: false,
        isSummerMode: false,
        isNationalHolidaysMode: false,
        lastUpdated: Date.now(),
        updatedBy: 'system'
      }
      await setDoc(doc(db, 'settings', THEME_DOC_ID), defaultTheme)
      console.log('Default theme initialized')
    }
  } catch (error) {
    console.error('Error initializing default theme:', error)
  }
}
