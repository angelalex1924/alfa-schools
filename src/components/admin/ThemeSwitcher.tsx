"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChristmasTheme } from '@/contexts/ChristmasThemeContext'
import { useHalloweenTheme } from '@/contexts/HalloweenThemeContext'
import { useCarnivalTheme } from '@/contexts/CarnivalThemeContext'
import { useEasterTheme } from '@/contexts/EasterThemeContext'
import { useSummerTheme } from '@/contexts/SummerThemeContext'
import { ChristmasTreeIcon, SantaIcon, ReindeerIcon, GiftBoxIcon } from '@/components/ChristmasIcons'

export function AdminThemeSwitcher() {
  const { isChristmasMode, setChristmasMode, isLoading: christmasLoading, isAdmin: christmasAdmin } = useChristmasTheme()
  const { isHalloweenMode, setHalloweenMode, isLoading: halloweenLoading, isAdmin: halloweenAdmin } = useHalloweenTheme()
  const { isCarnivalMode, setCarnivalMode, isLoading: carnivalLoading, isAdmin: carnivalAdmin } = useCarnivalTheme()
  const { isEasterMode, setEasterMode, isLoading: easterLoading, isAdmin: easterAdmin } = useEasterTheme()
  const { isSummerMode, setSummerMode, isLoading: summerLoading, isAdmin: summerAdmin } = useSummerTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  const isLoading = christmasLoading || halloweenLoading || carnivalLoading || easterLoading || summerLoading
  const isAdmin = christmasAdmin || halloweenAdmin || carnivalAdmin || easterAdmin || summerAdmin

  const themes = [
    {
      id: 'normal',
      name: 'Κανονικό Θέμα',
      description: 'Το κανονικό θέμα της ιστοσελίδας',
      icon: '🏠',
      active: !isChristmasMode && !isHalloweenMode && !isCarnivalMode && !isEasterMode && !isSummerMode
    },
    {
      id: 'christmas',
      name: 'Χριστουγεννιάτικο Θέμα',
      description: 'Χιονιά, Αγιος Βασίλης, Χριστουγεννιάτικα στοιχεία',
      icon: '🎄',
      active: isChristmasMode
    },
    {
      id: 'halloween',
      name: 'Halloween Θέμα',
      description: 'Κολοκύθες, φαντάσματα, νυχτερινά στοιχεία',
      icon: '🎃',
      active: isHalloweenMode
    },
    {
      id: 'carnival',
      name: 'Αποκριάτικο Θέμα',
      description: 'Καρναβάλι, μάσκες, χρωματιστά στοιχεία',
      icon: '🎭',
      active: isCarnivalMode
    },
    {
      id: 'easter',
      name: 'Πασχαλινό Θέμα',
      description: 'Αυγά, λαγούς, λουλούδια, φθινοπωρινά στοιχεία',
      icon: '🐰',
      active: isEasterMode
    },
    {
      id: 'summer',
      name: 'Καλοκαιρινό Θέμα',
      description: 'Ήλιος, παραλία, καλοκαιρινά στοιχεία',
      icon: '☀️',
      active: isSummerMode
    }
  ]

  const handleThemeChange = async (themeId: string) => {
    setIsSaving(true)
    try {
      if (themeId === 'christmas') {
        await setChristmasMode(true)
        await setHalloweenMode(false)
        await setCarnivalMode(false)
        await setEasterMode(false)
        await setSummerMode(false)
      } else if (themeId === 'halloween') {
        await setHalloweenMode(true)
        await setChristmasMode(false)
        await setCarnivalMode(false)
        await setEasterMode(false)
        await setSummerMode(false)
      } else if (themeId === 'carnival') {
        await setCarnivalMode(true)
        await setChristmasMode(false)
        await setHalloweenMode(false)
        await setEasterMode(false)
        await setSummerMode(false)
      } else if (themeId === 'easter') {
        await setEasterMode(true)
        await setChristmasMode(false)
        await setHalloweenMode(false)
        await setCarnivalMode(false)
        await setSummerMode(false)
      } else if (themeId === 'summer') {
        await setSummerMode(true)
        await setChristmasMode(false)
        await setHalloweenMode(false)
        await setCarnivalMode(false)
        await setEasterMode(false)
      } else {
        // Normal theme
        await setChristmasMode(false)
        await setHalloweenMode(false)
        await setCarnivalMode(false)
        await setEasterMode(false)
        await setSummerMode(false)
      }
      setIsOpen(false)
    } catch (error) {
      console.error('Error changing theme:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="relative">
      <motion.button
        className={`flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
          isLoading || isSaving ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => !isLoading && !isSaving && setIsOpen(!isOpen)}
        whileHover={{ scale: isLoading || isSaving ? 1 : 1.02 }}
        whileTap={{ scale: isLoading || isSaving ? 1 : 0.98 }}
        disabled={isLoading || isSaving}
      >
        <div className="text-2xl">
          {isLoading || isSaving ? '⏳' : (isChristmasMode ? '🎄' : isHalloweenMode ? '🎃' : isCarnivalMode ? '🎭' : isEasterMode ? '🐰' : isSummerMode ? '☀️' : '🎨')}
        </div>
        <div className="text-left">
          <div className="font-semibold">Θέμα Ιστοσελίδας</div>
          <div className="text-sm opacity-90">
            {isLoading ? 'Φόρτωση...' : isSaving ? 'Αποθήκευση...' : (isChristmasMode ? 'Χριστουγεννιάτικο' : isHalloweenMode ? 'Halloween' : isCarnivalMode ? 'Αποκριάτικο' : isEasterMode ? 'Πασχαλινό' : isSummerMode ? 'Καλοκαιρινό' : 'Κανονικό')}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full mt-2 right-0 z-50 min-w-[300px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Επιλογή Θέματος
              </h3>
              
              <div className="space-y-3">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      theme.active
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                    }`}
                    onClick={() => handleThemeChange(theme.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{theme.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 dark:text-white">
                          {theme.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {theme.description}
                        </div>
                      </div>
                      {theme.active && (
                        <motion.div
                          className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {isChristmasMode && (
                <motion.div
                  className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <div className="text-lg">🎄</div>
                    <div className="text-sm font-medium">
                      Το Χριστουγεννιάτικο θέμα είναι ενεργό!
                    </div>
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-500 mt-1">
                    Όλοι οι χρήστες θα βλέπουν χιονιά και Χριστουγεννιάτικα στοιχεία
                  </div>
                </motion.div>
              )}

              {isHalloweenMode && (
                <motion.div
                  className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                    <div className="text-lg">🎃</div>
                    <div className="text-sm font-medium">
                      Το Halloween θέμα είναι ενεργό!
                    </div>
                  </div>
                  <div className="text-xs text-orange-600 dark:text-orange-500 mt-1">
                    Όλοι οι χρήστες θα βλέπουν κολοκύθες και Halloween στοιχεία
                  </div>
                </motion.div>
              )}

              {isCarnivalMode && (
                <motion.div
                  className="mt-4 p-3 bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 text-pink-700 dark:text-pink-400">
                    <div className="text-lg">🎭</div>
                    <div className="text-sm font-medium">
                      Το Αποκριάτικο θέμα είναι ενεργό!
                    </div>
                  </div>
                  <div className="text-xs text-pink-600 dark:text-pink-500 mt-1">
                    Όλοι οι χρήστες θα βλέπουν μάσκες και καρναβαλιστικά στοιχεία
                  </div>
                </motion.div>
              )}

              {isEasterMode && (
                <motion.div
                  className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <div className="text-lg">🐰</div>
                    <div className="text-sm font-medium">
                      Το Πασχαλινό θέμα είναι ενεργό!
                    </div>
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-500 mt-1">
                    Όλοι οι χρήστες θα βλέπουν λαγούς, αυγά και λουλούδια
                  </div>
                </motion.div>
              )}

              {isSummerMode && (
                <motion.div
                  className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                    <div className="text-lg">☀️</div>
                    <div className="text-sm font-medium">
                      Το Καλοκαιρινό θέμα είναι ενεργό!
                    </div>
                  </div>
                  <div className="text-xs text-yellow-600 dark:text-yellow-500 mt-1">
                    Όλοι οι χρήστες θα βλέπουν ήλιο, παραλία και καλοκαιρινά στοιχεία
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
