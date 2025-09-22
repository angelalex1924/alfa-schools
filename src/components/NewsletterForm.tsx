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

export default function NewsletterForm() {
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
  const getNewsletterBackground = () => {
    if (isChristmasMode) {
      return "bg-gradient-to-br from-red-50/40 via-green-50/30 to-red-50/40 dark:from-red-900/20 dark:via-green-900/15 dark:to-red-900/20"
    } else if (isHalloweenMode) {
      return "bg-gradient-to-br from-orange-50/40 via-purple-50/30 to-orange-50/40 dark:from-orange-900/20 dark:via-purple-900/15 dark:to-orange-900/20"
    } else if (isCarnivalMode) {
      return "bg-gradient-to-br from-pink-50/40 via-teal-50/30 to-pink-50/40 dark:from-pink-900/20 dark:via-teal-900/15 dark:to-pink-900/20"
    } else if (isEasterMode) {
      return "bg-gradient-to-br from-pink-50/40 via-green-50/30 to-pink-50/40 dark:from-pink-900/20 dark:via-green-900/15 dark:to-pink-900/20"
    } else if (isSummerMode) {
      return "bg-gradient-to-br from-yellow-50/40 via-orange-50/30 to-yellow-50/40 dark:from-yellow-900/20 dark:via-orange-900/15 dark:to-yellow-900/20"
    } else {
      return "bg-[#81a1d4]/30 dark:bg-[#0f172a]"
    }
  }

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
      setMessage(language === 'el' ? 'Εγγραφήκατε επιτυχώς στο newsletter!' : 'Successfully subscribed to newsletter!')
      setEmail('')
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setStatus('error')
      setMessage(language === 'el' ? 'Σφάλμα κατά την εγγραφή. Δοκιμάστε ξανά.' : 'Error during subscription. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative ${getNewsletterBackground()} rounded-2xl p-8 border-2 border-white/20 dark:border-white/10`}
    >
      {/* Decorative elements */}
      <div className="absolute -top-2 -left-2 w-8 h-8 bg-white/20 rounded-full"></div>
      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white/20 rounded-full"></div>
      
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
        >
          <Mail className="w-8 h-8 text-white" />
        </motion.div>

        <h3 className={`text-2xl font-bold mb-2 ${getAccentColor()}`} style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
          {language === 'el' ? 'Newsletter' : 'Newsletter'}
        </h3>
        
        <p className="text-white/80 mb-6 text-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
          {language === 'el' 
            ? 'Μείνετε ενημερωμένοι με τα τελευταία νέα και άρθρα μας!' 
            : 'Stay updated with our latest news and articles!'
          }
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder={language === 'el' ? 'Διεύθυνση email...' : 'Email address...'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white/20 focus:border-white/40"
              style={{ fontFamily: 'StampatelloFaceto, cursive' }}
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className={`${getButtonColor()} text-white font-semibold px-6 py-2 rounded-lg hover:scale-105 transition-all duration-200 shadow-lg`}
              style={{ fontFamily: 'StampatelloFaceto, cursive' }}
            >
              {isLoading 
                ? (language === 'el' ? 'Εγγραφή...' : 'Subscribing...') 
                : (language === 'el' ? 'Εγγραφή' : 'Subscribe')
              }
            </Button>
          </div>

          {/* Status messages */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-green-400 text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              <span style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{message}</span>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              <span style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{message}</span>
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  )
}
