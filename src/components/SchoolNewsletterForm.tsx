"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useChristmasTheme } from '@/contexts/ChristmasThemeContext'
import { useHalloweenTheme } from '@/contexts/HalloweenThemeContext'
import { useCarnivalTheme } from '@/contexts/CarnivalThemeContext'
import { useEasterTheme } from '@/contexts/EasterThemeContext'
import { useSummerTheme } from '@/contexts/SummerThemeContext'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, AlertCircle, BookOpen, Pencil } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function SchoolNewsletterForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const { t, language } = useLanguage()
  const { isDarkMode } = useTheme()
  const { isChristmasMode } = useChristmasTheme()
  const { isHalloweenMode } = useHalloweenTheme()
  const { isCarnivalMode } = useCarnivalTheme()
  const { isEasterMode } = useEasterTheme()
  const { isSummerMode } = useSummerTheme()

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
    <section className="relative z-10 py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        {/* School Notebook Paper Background */}
        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
          {/* Notebook Lines Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Horizontal lines */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`line-${i}`}
                className={`absolute w-full h-px ${
                  isDarkMode ? 'bg-blue-300/15' : 'bg-blue-200/30'
                }`}
                style={{
                  top: `${15 + i * 8}%`,
                  left: '8%',
                  right: '4%'
                }}
              />
            ))}
            
            {/* Red margin line */}
            <div className={`absolute left-8 top-0 bottom-0 w-px ${
              isDarkMode ? 'bg-red-400/30' : 'bg-red-300/50'
            }`}></div>
            
            {/* Holes for binder */}
            {[...Array(4)].map((_, i) => (
              <div
                key={`hole-${i}`}
                className={`absolute w-1.5 h-1.5 rounded-full border ${
                  isDarkMode 
                    ? 'bg-gray-600/30 border-gray-500/50' 
                    : 'bg-blue-200/50 border-blue-300/70'
                }`}
                style={{
                  left: '4px',
                  top: `${20 + i * 18}%`
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 lg:p-8">
            {/* School Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
                  <span className="text-white font-bold text-lg">📧</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {language === 'el' ? 'Newsletter Σχολείου' : 'School Newsletter'}
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {language === 'el' 
                  ? 'Μείνετε ενημερωμένοι με τα τελευταία νέα, άρθρα και εκδηλώσεις του σχολείου μας!' 
                  : 'Stay updated with our latest news, articles and school events!'
                }
              </p>
            </div>

            {/* Newsletter Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              {/* School Form Background */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200/30 dark:border-blue-700/30">
                {/* School Form Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={`form-line-${i}`}
                      className={`absolute w-full h-px ${
                        isDarkMode ? 'bg-blue-300/10' : 'bg-blue-200/20'
                      }`}
                      style={{
                        top: `${25 + i * 15}%`,
                        left: '10%',
                        right: '5%'
                      }}
                    />
                  ))}
                  
                  {/* Red margin line */}
                  <div className={`absolute left-6 top-0 bottom-0 w-px ${
                    isDarkMode ? 'bg-red-400/20' : 'bg-red-300/30'
                  }`}></div>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  {/* Email Input with School Style */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {language === 'el' ? 'Διεύθυνση Email:' : 'Email Address:'}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        type="email"
                        placeholder={language === 'el' ? 'π.χ. student@example.com' : 'e.g. student@example.com'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-white/80 dark:bg-gray-700/80 border-2 border-blue-200 dark:border-blue-600 text-slate-800 dark:text-white placeholder-slate-500 focus:bg-white dark:focus:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-500 rounded-lg"
                        style={{ fontFamily: 'StampatelloFaceto, cursive' }}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button with School Style */}
                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl hover:scale-105 transition-all duration-200 shadow-lg border-0"
                      style={{ fontFamily: 'StampatelloFaceto, cursive' }}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>{language === 'el' ? 'Εγγραφή...' : 'Subscribing...'}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{language === 'el' ? 'Εγγραφή στο Newsletter' : 'Subscribe to Newsletter'}</span>
                        </div>
                      )}
                    </Button>
                  </div>

                  {/* Status messages */}
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 text-sm bg-green-50 dark:bg-green-900/20 rounded-lg p-3"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{message}</span>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 rounded-lg p-3"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{message}</span>
                    </motion.div>
                  )}
                </form>
              </div>

              {/* School Benefits */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: "📚",
                    title: language === 'el' ? 'Άρθρα & Νέα' : 'Articles & News',
                    description: language === 'el' ? 'Τα τελευταία άρθρα μας' : 'Our latest articles'
                  },
                  {
                    icon: "🎓",
                    title: language === 'el' ? 'Εκδηλώσεις' : 'Events',
                    description: language === 'el' ? 'Σχολικές εκδηλώσεις' : 'School events'
                  },
                  {
                    icon: "💡",
                    title: language === 'el' ? 'Συμβουλές' : 'Tips',
                    description: language === 'el' ? 'Χρήσιμες συμβουλές' : 'Useful tips'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="text-center p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg border border-blue-200/30 dark:border-blue-700/30">
                    <div className="text-2xl mb-2">{benefit.icon}</div>
                    <h4 className="font-semibold text-slate-800 dark:text-white text-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
