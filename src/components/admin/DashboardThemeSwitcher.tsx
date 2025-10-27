"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChristmasTheme } from '@/contexts/ChristmasThemeContext'
import { useHalloweenTheme } from '@/contexts/HalloweenThemeContext'
import { useCarnivalTheme } from '@/contexts/CarnivalThemeContext'
import { useEasterTheme } from '@/contexts/EasterThemeContext'
import { useSummerTheme } from '@/contexts/SummerThemeContext'
import { useNationalHolidaysTheme } from '@/contexts/NationalHolidaysThemeContext'

export function DashboardThemeSwitcher() {
  const { isChristmasMode, setChristmasMode, isLoading: christmasLoading, isAdmin: christmasAdmin } = useChristmasTheme()
  const { isHalloweenMode, setHalloweenMode, isLoading: halloweenLoading, isAdmin: halloweenAdmin } = useHalloweenTheme()
  const { isCarnivalMode, setCarnivalMode, isLoading: carnivalLoading, isAdmin: carnivalAdmin } = useCarnivalTheme()
  const { isEasterMode, setEasterMode, isLoading: easterLoading, isAdmin: easterAdmin } = useEasterTheme()
  const { isSummerMode, setSummerMode, isLoading: summerLoading, isAdmin: summerAdmin } = useSummerTheme()
  const { isNationalHolidaysMode, setNationalHolidaysMode, isLoading: nationalHolidaysLoading, isAdmin: nationalHolidaysAdmin } = useNationalHolidaysTheme()
  const [isSaving, setIsSaving] = useState(false)
  
  const isLoading = christmasLoading || halloweenLoading || carnivalLoading || easterLoading || summerLoading || nationalHolidaysLoading
  const isAdmin = christmasAdmin || halloweenAdmin || carnivalAdmin || easterAdmin || summerAdmin || nationalHolidaysAdmin

  const themes = [
    {
      id: 'normal',
      name: 'Κανονικό Θέμα',
      description: 'Το κανονικό θέμα της ιστοσελίδας',
      icon: '🏠',
      color: 'bg-gradient-to-br from-slate-500 to-slate-600',
      active: !isChristmasMode && !isHalloweenMode && !isCarnivalMode && !isEasterMode && !isSummerMode && !isNationalHolidaysMode
    },
    {
      id: 'christmas',
      name: 'Χριστουγεννιάτικο Θέμα',
      description: 'Χιονιά, Αγιος Βασίλης, Χριστουγεννιάτικα στοιχεία',
      icon: '🎄',
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      active: isChristmasMode
    },
    {
      id: 'halloween',
      name: 'Halloween Θέμα',
      description: 'Κολοκύθες, φαντάσματα, νυχτερινά στοιχεία',
      icon: '🎃',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      active: isHalloweenMode
    },
    {
      id: 'carnival',
      name: 'Αποκριάτικο Θέμα',
      description: 'Καρναβάλι, μάσκες, χρωματιστά στοιχεία',
      icon: '🎭',
      color: 'bg-gradient-to-br from-pink-500 to-pink-600',
      active: isCarnivalMode
    },
    {
      id: 'easter',
      name: 'Πασχαλινό Θέμα',
      description: 'Αυγά, λαγούς, λουλούδια, φθινοπωρινά στοιχεία',
      icon: '🐰',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      active: isEasterMode
    },
    {
      id: 'summer',
      name: 'Καλοκαιρινό Θέμα',
      description: 'Ήλιος, παραλία, καλοκαιρινά στοιχεία',
      icon: '☀️',
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      active: isSummerMode
    },
    {
      id: 'nationalHolidays',
      name: 'Εθνικές Γιορτές Θέμα',
      description: '28η Οκτωβρίου - 25η Μαρτίου, Ελληνικό σημαία',
      icon: '🇬🇷',
      color: 'bg-gradient-to-br from-blue-600 to-blue-700',
      active: isNationalHolidaysMode
    }
  ]

  const handleThemeChange = async (themeId: string) => {
    if (isLoading || isSaving) return
    
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
        await setNationalHolidaysMode(false)
      } else if (themeId === 'nationalHolidays') {
        await setNationalHolidaysMode(true)
        await setChristmasMode(false)
        await setHalloweenMode(false)
        await setCarnivalMode(false)
        await setEasterMode(false)
        await setSummerMode(false)
      } else {
        // Normal theme
        await setChristmasMode(false)
        await setHalloweenMode(false)
        await setCarnivalMode(false)
        await setEasterMode(false)
        await setSummerMode(false)
        await setNationalHolidaysMode(false)
      }
    } catch (error) {
      console.error('Error changing theme:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Διαχείριση Θέματος Ιστοσελίδας
        </h3>
        <p className="text-sm text-slate-600">
          Επιλέξτε το θέμα που θα εμφανίζεται στους επισκέπτες
        </p>
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <motion.div
            key={theme.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleThemeChange(theme.id)}
            className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
              theme.active
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            } ${isLoading || isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {/* Active Indicator */}
            {theme.active && (
              <motion.div
                className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <span className="text-white text-sm">✓</span>
              </motion.div>
            )}

            {/* Theme Icon */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 ${theme.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                {theme.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 text-sm">
                  {theme.name}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {theme.description}
                </p>
              </div>
            </div>

            {/* Loading State */}
            {(isLoading || isSaving) && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Active Theme Status */}
      <AnimatePresence>
        {(isChristmasMode || isHalloweenMode || isCarnivalMode || isEasterMode || isSummerMode || isNationalHolidaysMode) && (
          <motion.div
            className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">
                {isChristmasMode ? '🎄' : isHalloweenMode ? '🎃' : isCarnivalMode ? '🎭' : isEasterMode ? '🐰' : isSummerMode ? '☀️' : isNationalHolidaysMode ? '🇬🇷' : '🏠'}
              </div>
              <div>
                <div className="font-semibold text-blue-800">
                  {isChristmasMode ? 'Χριστουγεννιάτικο θέμα ενεργό!' : 
                   isHalloweenMode ? 'Halloween θέμα ενεργό!' :
                   isCarnivalMode ? 'Αποκριάτικο θέμα ενεργό!' :
                   isEasterMode ? 'Πασχαλινό θέμα ενεργό!' :
                   isSummerMode ? 'Καλοκαιρινό θέμα ενεργό!' :
                   isNationalHolidaysMode ? 'Εθνικές Γιορτές θέμα ενεργό!' :
                   'Κανονικό θέμα ενεργό!'}
                </div>
                <div className="text-sm text-blue-600">
                  Όλοι οι χρήστες θα βλέπουν αυτό το θέμα
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
