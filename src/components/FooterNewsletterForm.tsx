"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/contexts/LanguageContext'
import { useChristmasTheme } from '@/contexts/ChristmasThemeContext'
import { useHalloweenTheme } from '@/contexts/HalloweenThemeContext'
import { useCarnivalTheme } from '@/contexts/CarnivalThemeContext'
import { useEasterTheme } from '@/contexts/EasterThemeContext'
import { useSummerTheme } from '@/contexts/SummerThemeContext'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function FooterNewsletterForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const { t, language } = useLanguage()
  const { isChristmasMode } = useChristmasTheme()
  const { isHalloweenMode } = useHalloweenTheme()
  const { isCarnivalMode } = useCarnivalTheme()
  const { isEasterMode } = useEasterTheme()
  const { isSummerMode } = useSummerTheme()

  // Theme-based styling
  const getAccentColor = () => {
    if (isChristmasMode) {
      return "text-red-600 dark:text-red-400"
    } else if (isHalloweenMode) {
      return "text-orange-600 dark:text-orange-400"
    } else if (isCarnivalMode) {
      return "text-pink-600 dark:text-pink-400"
    } else if (isEasterMode) {
      return "text-pink-600 dark:text-pink-400"
    } else if (isSummerMode) {
      return "text-yellow-600 dark:text-yellow-400"
    } else {
      return "text-[#81a1d4]"
    }
  }

  const getButtonColor = () => {
    if (isChristmasMode) {
      return "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
    } else if (isHalloweenMode) {
      return "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
    } else if (isCarnivalMode) {
      return "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
    } else if (isEasterMode) {
      return "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
    } else if (isSummerMode) {
      return "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
    } else {
      return "bg-gradient-to-r from-[#81a1d4] to-blue-600 hover:from-blue-600 hover:to-blue-700"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setStatus('idle')

    try {
      // Add to Firestore
      await addDoc(collection(db, 'newsletter_subscribers'), {
        email: email,
        language: language,
        subscribedAt: serverTimestamp(),
        isActive: true
      })

      setStatus('success')
      setMessage(language === 'el' ? 'Εγγραφήκατε επιτυχώς!' : 'Successfully subscribed!')
      setEmail('')
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setStatus('error')
      setMessage(language === 'el' ? 'Σφάλμα κατά την εγγραφή.' : 'Subscription error.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder={language === 'el' ? 'Email...' : 'Email...'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white/90 dark:bg-gray-700/90 border border-blue-300 dark:border-blue-500 text-slate-800 dark:text-white placeholder-slate-500 focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded text-sm h-8 shadow-sm"
          style={{ fontFamily: 'StampatelloFaceto, cursive' }}
          required
        />
        <Button
          type="submit"
          disabled={isLoading}
          className={`${getButtonColor()} text-white font-semibold px-3 py-1 rounded hover:scale-105 transition-all duration-200 text-sm h-8 shadow-sm border border-white/20`}
          style={{ fontFamily: 'StampatelloFaceto, cursive' }}
        >
          {isLoading 
            ? (language === 'el' ? '...' : '...') 
            : (language === 'el' ? 'Εγγραφή' : 'Subscribe')
          }
        </Button>
      </form>

      {/* Status messages */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm"
        >
          <CheckCircle className="w-4 h-4" />
          <span style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{message}</span>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          <span style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{message}</span>
        </motion.div>
      )}
    </div>
  )
}
