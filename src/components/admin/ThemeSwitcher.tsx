"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChristmasTheme } from '@/contexts/ChristmasThemeContext'
import { ChristmasTreeIcon, SantaIcon, ReindeerIcon, GiftBoxIcon } from '@/components/ChristmasIcons'

export function AdminThemeSwitcher() {
  const { isChristmasMode, setChristmasMode, isLoading, isAdmin } = useChristmasTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const themes = [
    {
      id: 'normal',
      name: 'Κανονικό Θέμα',
      description: 'Το κανονικό θέμα της ιστοσελίδας',
      icon: '🏠',
      active: !isChristmasMode
    },
    {
      id: 'christmas',
      name: 'Χριστουγεννιάτικο Θέμα',
      description: 'Χιονιά, Αγιος Βασίλης, Χριστουγεννιάτικα στοιχεία',
      icon: '🎄',
      active: isChristmasMode
    }
  ]

  const handleThemeChange = async (themeId: string) => {
    setIsSaving(true)
    try {
      if (themeId === 'christmas') {
        await setChristmasMode(true)
      } else {
        await setChristmasMode(false)
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
          {isLoading || isSaving ? '⏳' : (isChristmasMode ? '🎄' : '🎨')}
        </div>
        <div className="text-left">
          <div className="font-semibold">Θέμα Ιστοσελίδας</div>
          <div className="text-sm opacity-90">
            {isLoading ? 'Φόρτωση...' : isSaving ? 'Αποθήκευση...' : (isChristmasMode ? 'Χριστουγεννιάτικο' : 'Κανονικό')}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
