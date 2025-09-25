"use client"
import { useState, useEffect } from "react"
import { useTheme } from "@/contexts/ThemeContext"
import { useLanguage } from "@/contexts/LanguageContext"

export default function NotFound() {
  const { isDarkMode } = useTheme()
  const { t } = useLanguage()
  const [currentEmoji, setCurrentEmoji] = useState("😅")
  const [isAnimating, setIsAnimating] = useState(false)

  // Χιουμοριστικά emojis που αλλάζουν
  const funnyEmojis = ["😅", "🤔", "😵", "🤷‍♂️", "😵‍💫", "🤯", "😴", "🎯", "📚", "✏️", "📝", "🎓", "🏫", "👨‍🏫", "📖", "🔍", "❓", "💭", "🤓", "😎"]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentEmoji(funnyEmojis[Math.floor(Math.random() * funnyEmojis.length)])
        setIsAnimating(false)
      }, 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])



  const goHome = () => {
    window.location.href = '/'
  }

  const goBack = () => {
    window.history.back()
  }

  const goToContact = () => {
    window.location.href = '/contact'
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 pt-20 md:pt-4"
      style={{
        background: isDarkMode 
          ? `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%)`
          : `linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 50%, #d1e7ff 100%)`,
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl animate-pulse opacity-30"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(74, 111, 165, 0.2)" 
              : "rgba(74, 111, 165, 0.4)" 
          }}
        ></div>
        <div
          className="absolute top-40 right-20 w-56 h-56 rounded-full blur-3xl animate-pulse opacity-25"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(129, 161, 212, 0.15)" 
              : "rgba(129, 161, 212, 0.5)" 
          }}
        ></div>
        <div
          className="absolute bottom-40 left-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-35"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(201, 182, 228, 0.1)" 
              : "rgba(201, 182, 228, 0.3)" 
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full mt-8 md:mt-0">
        {/* School Notebook Paper Background */}
        <div 
          className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden"
        >
          {/* Notebook Lines Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Horizontal lines */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`line-${i}`}
                className={`absolute w-full h-px ${
                  isDarkMode ? 'bg-blue-300/15' : 'bg-blue-200/30'
                }`}
                style={{
                  top: `${8 + i * 6}%`,
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
            {[...Array(6)].map((_, i) => (
              <div
                key={`hole-${i}`}
                className={`absolute w-1.5 h-1.5 rounded-full border ${
                  isDarkMode 
                    ? 'bg-gray-600/30 border-gray-500/50' 
                    : 'bg-blue-200/50 border-blue-300/70'
                }`}
                style={{
                  left: '4px',
                  top: `${12 + i * 12}%`
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 p-4 md:p-8 lg:p-12 text-center">
            {/* School Header */}
            <div className="mb-6 md:mb-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 via-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
                  <span className={`text-white font-bold text-2xl transition-all duration-300 ${isAnimating ? 'scale-125 rotate-12' : 'scale-100 rotate-0'}`}>
                    {currentEmoji}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-2" style={{ fontFamily: 'StampatelloFaceto, Comic Sans MS, cursive' }}>
                    404
                  </h1>
                  <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mx-auto"></div>
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-3 md:mb-4" style={{ fontFamily: 'StampatelloFaceto, Comic Sans MS, cursive' }}>
                {t('notFound.title') as string}
              </h2>
              
              <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-4 md:mb-6" style={{ fontFamily: 'StampatelloFaceto, Comic Sans MS, cursive' }}>
                {t('notFound.subtitle') as string}
              </p>
            </div>

            {/* Description */}
            <div className="mb-6 md:mb-8">
              <p className="text-sm md:text-base lg:text-lg text-slate-700 dark:text-slate-300 mb-4 md:mb-6 leading-relaxed" style={{ fontFamily: 'StampatelloFaceto, Comic Sans MS, cursive' }}>
                {t('notFound.description') as string}
              </p>
              
              {/* Suggestions */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 md:p-6 mb-4 md:mb-6 border-2 border-yellow-200/30 dark:border-yellow-700/30">
                <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white mb-3 md:mb-4" style={{ fontFamily: 'StampatelloFaceto, Comic Sans MS, cursive' }}>
                  {t('notFound.suggestions.title') as string}
                </h3>
                <ul className="space-y-2 text-left">
                  {Array.isArray(t('notFound.suggestions.items')) ? (t('notFound.suggestions.items') as string[]).map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-700 dark:text-slate-300" style={{ fontFamily: 'StampatelloFaceto, Comic Sans MS, cursive' }}>
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>{suggestion}</span>
                    </li>
                  )) : null}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8">
              <button
                onClick={goHome}
                className="font-semibold px-4 md:px-6 py-3 md:py-4 rounded-xl hover:scale-105 transition-all duration-200 shadow-lg border-0 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 flex items-center gap-2 md:gap-3 justify-center text-white text-sm md:text-base"
                style={{ fontFamily: 'StampatelloFaceto, Comic Sans MS, cursive' }}
              >
                <span className="text-lg">🏠</span>
                <span>{t('notFound.buttons.home') as string}</span>
              </button>

              <button
                onClick={goBack}
                className="font-semibold px-4 md:px-6 py-3 md:py-4 rounded-xl hover:scale-105 transition-all duration-200 border-2 border-green-300 dark:border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 bg-transparent flex items-center gap-2 md:gap-3 justify-center text-sm md:text-base"
                style={{ fontFamily: 'StampatelloFaceto, Comic Sans MS, cursive' }}
              >
                <span className="text-lg">⬅️</span>
                <span>{t('notFound.buttons.back') as string}</span>
              </button>

              <button
                onClick={goToContact}
                className="font-semibold px-4 md:px-6 py-3 md:py-4 rounded-xl hover:scale-105 transition-all duration-200 border-2 border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent flex items-center gap-2 md:gap-3 justify-center text-sm md:text-base"
                style={{ fontFamily: 'StampatelloFaceto, Comic Sans MS, cursive' }}
              >
                <span className="text-lg">📞</span>
                <span>{t('notFound.buttons.contact') as string}</span>
              </button>
            </div>

            {/* Fun Facts */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 md:p-6 border-2 border-blue-200/30 dark:border-blue-700/30">
              <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white mb-3 md:mb-4" style={{ fontFamily: 'StampatelloFaceto, Comic Sans MS, cursive' }}>
                {t('notFound.facts.title') as string}
              </h3>
              <div className="space-y-3">
                {Array.isArray(t('notFound.facts.items')) ? (t('notFound.facts.items') as string[]).map((fact, index) => (
                  <div key={index} className="flex items-start gap-3 text-slate-700 dark:text-slate-300" style={{ fontFamily: 'StampatelloFaceto, Comic Sans MS, cursive' }}>
                    <span className="text-blue-500 mt-1 text-sm">📌</span>
                    <span className="text-sm lg:text-base">{fact}</span>
                  </div>
                )) : null}
              </div>
            </div>

            {/* School Footer */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-blue-200/30 dark:border-blue-700/30">
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400" style={{ fontFamily: 'StampatelloFaceto, Comic Sans MS, cursive' }}>
                {t('notFound.footer') as string}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 md:right-20 animate-bounce">
        <div className="text-3xl md:text-4xl opacity-20">📚</div>
      </div>
      <div className="absolute bottom-20 left-10 md:left-20 animate-bounce" style={{ animationDelay: '1000ms' }}>
        <div className="text-2xl md:text-3xl opacity-20">✏️</div>
      </div>
      <div className="absolute top-1/2 right-5 md:right-10 animate-bounce" style={{ animationDelay: '500ms' }}>
        <div className="text-xl md:text-2xl opacity-20">🎓</div>
      </div>
      <div className="absolute bottom-1/3 left-1/4 animate-bounce" style={{ animationDelay: '1500ms' }}>
        <div className="text-2xl opacity-15">📝</div>
      </div>
    </div>
  )
}