import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'

export interface ThemeSettings {
  isChristmasMode: boolean
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
  isChristmasMode: boolean, 
  updatedBy: string = 'admin'
): Promise<boolean> {
  try {
    const themeData: ThemeSettings = {
      isChristmasMode,
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
      await setThemeInFirebase(false, 'system')
      console.log('Default theme initialized')
    }
  } catch (error) {
    console.error('Error initializing default theme:', error)
  }
}
