"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, RotateCcw, Check, X, Star, Trophy, Clock, Sparkles, Zap, Lightbulb, Shuffle } from "lucide-react"

// English anagram words for Level 3 (Advanced)
const anagramWords = [
  { word: "adventure", hint: "Exciting journey or experience", scrambled: "tureadnev" },
  { word: "beautiful", hint: "Very attractive or pleasing", scrambled: "lufituabe" },
  { word: "chocolate", hint: "Sweet treat made from cocoa", scrambled: "latechoco" },
  { word: "education", hint: "Process of learning and teaching", scrambled: "noitacude" },
  { word: "fantastic", hint: "Extraordinarily good or impressive", scrambled: "citsatnaf" },
  { word: "geography", hint: "Study of Earth's physical features", scrambled: "ypargheog" },
  { word: "happiness", hint: "Feeling of joy and contentment", scrambled: "ssenippah" },
  { word: "important", hint: "Having great significance or value", scrambled: "tnatropmi" },
  { word: "knowledge", hint: "Information and understanding", scrambled: "egdelwonk" },
  { word: "landscape", hint: "Visible features of an area", scrambled: "epacsknal" },
  { word: "mountain", hint: "Large natural elevation of land", scrambled: "naintoum" },
  { word: "necessary", hint: "Required or essential", scrambled: "yrassecen" },
  { word: "operation", hint: "Process of working or functioning", scrambled: "noitarepo" },
  { word: "paragraph", hint: "Distinct section of writing", scrambled: "hpargarap" },
  { word: "question", hint: "Sentence that asks for information", scrambled: "noitseuq" },
  { word: "restaurant", hint: "Place where meals are served", scrambled: "tnuaratser" },
  { word: "scientist", hint: "Person who studies science", scrambled: "tsitneics" },
  { word: "telephone", hint: "Device for voice communication", scrambled: "enohpelet" },
  { word: "umbrella", hint: "Protective device against rain", scrambled: "llabremu" },
  { word: "volunteer", hint: "Person who offers help freely", scrambled: "reteunlov" }
]

// Function to scramble a word
const scrambleWord = (word: string): string => {
  const letters = word.split('')
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[letters[i], letters[j]] = [letters[j], letters[i]]
  }
  return letters.join('')
}

export default function EnglishAnagramsLevel3() {
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120)
  const [gameTime, setGameTime] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [hintUsed, setHintUsed] = useState(false)

  const currentWord = anagramWords[currentWordIndex]
  const scrambledWord = useMemo(() => scrambleWord(currentWord.word), [currentWordIndex])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameStarted && !gameCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
        setGameTime(prev => prev + 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setGameCompleted(true)
    }
    return () => clearInterval(timer)
  }, [gameStarted, gameCompleted, timeLeft])

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(120)
    setScore(0)
    setCurrentWordIndex(0)
    setGameCompleted(false)
    setGameTime(0)
    setUserAnswer("")
    setShowHint(false)
    setHintUsed(false)
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameCompleted(false)
    setCurrentWordIndex(0)
    setScore(0)
    setTimeLeft(120)
    setGameTime(0)
    setShowResult(false)
    setUserAnswer("")
    setShowHint(false)
    setHintUsed(false)
  }

  const handleSubmit = () => {
    if (!userAnswer.trim()) return
    
    const correct = userAnswer.toLowerCase().trim() === currentWord.word.toLowerCase()
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setScore(prev => prev + 1)
    }

    setTimeout(() => {
      if (currentWordIndex < anagramWords.length - 1) {
        setCurrentWordIndex(prev => prev + 1)
        setShowResult(false)
        setUserAnswer("")
        setShowHint(false)
        setHintUsed(false)
      } else {
        setGameCompleted(true)
      }
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const toggleHint = () => {
    setShowHint(!showHint)
    if (!showHint) {
      setHintUsed(true)
    }
  }

  const getScoreMessage = () => {
    const percentage = (score / anagramWords.length) * 100
    if (percentage >= 80) return { message: "Εξαιρετικά! 🎉", color: "text-green-600" }
    if (percentage >= 60) return { message: "Καλά! 👍", color: "text-blue-600" }
    if (percentage >= 40) return { message: "Καλό! 😊", color: "text-yellow-600" }
    return { message: "Συνεχίστε! 💪", color: "text-red-600" }
  }

  if (!gameStarted) {
    return (
      <div 
        className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 pt-20 sm:pt-4"
        style={{
          background: isDarkMode 
            ? `linear-gradient(135deg, #1a2e1a 0%, #1a3d1a 50%, #0f1a0f 100%)`
            : `linear-gradient(135deg, #f0fff4 0%, #e6ffed 50%, #d1fae5 100%)`,
        }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl animate-pulse opacity-30"
            style={{ 
              backgroundColor: isDarkMode 
                ? "rgba(34, 197, 94, 0.2)" 
                : "rgba(34, 197, 94, 0.4)" 
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-56 h-56 rounded-full blur-3xl animate-pulse opacity-25"
            style={{ 
              backgroundColor: isDarkMode 
                ? "rgba(16, 185, 129, 0.15)" 
                : "rgba(16, 185, 129, 0.5)" 
            }}
          />
          <motion.div
            className="absolute bottom-40 left-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-35"
            style={{ 
              backgroundColor: isDarkMode 
                ? "rgba(5, 150, 105, 0.1)" 
                : "rgba(5, 150, 105, 0.3)" 
            }}
          />
        </div>

        <motion.div
          className="max-w-2xl w-full relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-white/10">
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Link 
                href="/games/english"
                className={cn(
                  "p-2 sm:p-3 rounded-lg sm:rounded-xl backdrop-blur-xl border transition-all duration-300",
                  "bg-white/10 dark:bg-white/5",
                  "border-white/20 dark:border-white/10",
                  "hover:scale-110 hover:bg-white/20 dark:hover:bg-white/10"
                )}
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: isDarkMode ? '#e5e7eb' : '#374151' }} />
              </Link>
              <div className="flex-1 min-w-0">
                <h1 className={cn(
                  "text-2xl sm:text-3xl font-bold mb-1 sm:mb-2",
                  isDarkMode ? 'text-white' : 'text-gray-800'
                )}>
                  <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    Anagrams - Advanced
                  </span>
                </h1>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>
                  Challenge yourself with complex words
                </p>
              </div>
            </div>

            {/* Game Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
              <motion.div 
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl backdrop-blur-xl border bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-red-500/20">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  </div>
                  <span className={cn(
                    "font-semibold text-sm sm:text-base",
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  )}>Time</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>2 minutes</p>
              </motion.div>
              <motion.div 
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl backdrop-blur-xl border bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  </div>
                  <span className={cn(
                    "font-semibold text-sm sm:text-base",
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  )}>Words</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>{anagramWords.length} words</p>
              </motion.div>
              <motion.div 
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl backdrop-blur-xl border bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  </div>
                  <span className={cn(
                    "font-semibold text-sm sm:text-base",
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  )}>Score</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>Up to {anagramWords.length} points</p>
              </motion.div>
            </div>

            {/* Instructions */}
            <div className="mb-6 sm:mb-8">
              <h3 className={cn(
                "text-base sm:text-lg font-semibold mb-3 sm:mb-4",
                isDarkMode ? 'text-white' : 'text-gray-800'
              )}>
                Instructions:
              </h3>
              <div className="bg-white/5 dark:bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3 border border-white/10 dark:border-white/10">
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Unscramble the letters to form a word
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Use the hint if you need help
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    You have 90 seconds to complete the game
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    You earn 1 point for each correct answer
                  </span>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <motion.button
              onClick={startGame}
              className="w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="w-5 h-5" />
              Start Game! 🎮
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (gameCompleted) {
    const scoreInfo = getScoreMessage()
    return (
      <div 
        className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 pt-20 sm:pt-4"
        style={{
          background: isDarkMode 
            ? `linear-gradient(135deg, #1a2e1a 0%, #1a3d1a 50%, #0f1a0f 100%)`
            : `linear-gradient(135deg, #f0fff4 0%, #e6ffed 50%, #d1fae5 100%)`,
        }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl animate-pulse opacity-30"
            style={{ 
              backgroundColor: isDarkMode 
                ? "rgba(34, 197, 94, 0.2)" 
                : "rgba(34, 197, 94, 0.4)" 
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-56 h-56 rounded-full blur-3xl animate-pulse opacity-25"
            style={{ 
              backgroundColor: isDarkMode 
                ? "rgba(16, 185, 129, 0.15)" 
                : "rgba(16, 185, 129, 0.5)" 
            }}
          />
          <motion.div
            className="absolute bottom-40 left-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-35"
            style={{ 
              backgroundColor: isDarkMode 
                ? "rgba(5, 150, 105, 0.1)" 
                : "rgba(5, 150, 105, 0.3)" 
            }}
          />
        </div>

        <motion.div
          className="max-w-2xl w-full relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-white/10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border border-yellow-500/30 mb-6 inline-block">
                <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-500" />
              </div>
            </motion.div>
            
            <h2 className={cn(
              "text-2xl sm:text-3xl font-bold mb-4 sm:mb-6",
              isDarkMode ? 'text-white' : 'text-gray-800'
            )}>
              Παιχνίδι Ολοκληρώθηκε! 🎉
            </h2>
            
            <div className="mb-6 sm:mb-8">
              <p className={cn("text-xl sm:text-2xl font-semibold mb-3 sm:mb-4", scoreInfo.color)}>
                {scoreInfo.message}
              </p>
              <div className="space-y-2">
                <p className={cn(
                  "text-base sm:text-lg",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>
                  Σκορ: {score} / {anagramWords.length}
                </p>
                <p className={cn(
                  "text-base sm:text-lg",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>
                  Χρόνος: {gameTime} δευτερόλεπτα
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.button
                onClick={resetGame}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-5 h-5" />
                Παίξτε Ξανά 🔄
              </motion.button>
              <Link href="/games/english">
                <motion.button
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 dark:bg-white/10 backdrop-blur-xl border border-white/20 dark:border-white/20 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Επιστροφή 🏠
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
      <div 
        className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 pt-20 sm:pt-4"
        style={{
          background: isDarkMode 
            ? `linear-gradient(135deg, #2d1b69 0%, #4a1a4a 50%, #1a0f1a 100%)`
            : `linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #f3e8ff 100%)`,
        }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl animate-pulse opacity-30"
            style={{ 
              backgroundColor: isDarkMode 
                ? "rgba(147, 51, 234, 0.2)" 
                : "rgba(147, 51, 234, 0.4)" 
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-56 h-56 rounded-full blur-3xl animate-pulse opacity-25"
            style={{ 
              backgroundColor: isDarkMode 
                ? "rgba(239, 68, 68, 0.15)" 
                : "rgba(239, 68, 68, 0.5)" 
            }}
          />
          <motion.div
            className="absolute bottom-40 left-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-35"
            style={{ 
              backgroundColor: isDarkMode 
                ? "rgba(249, 115, 22, 0.1)" 
                : "rgba(249, 115, 22, 0.3)" 
            }}
          />
      </div>

      <motion.div
        className="max-w-2xl w-full relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/20 dark:border-white/10">
          {/* Game Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link 
                href="/games/english"
                className={cn(
                  "p-2 sm:p-3 rounded-lg sm:rounded-xl backdrop-blur-xl border transition-all duration-300",
                  "bg-white/10 dark:bg-white/5",
                  "border-white/20 dark:border-white/10",
                  "hover:scale-110 hover:bg-white/20 dark:hover:bg-white/10"
                )}
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: isDarkMode ? '#e5e7eb' : '#374151' }} />
              </Link>
              <div className="flex-1 min-w-0">
                <h1 className={cn(
                  "text-lg sm:text-xl font-bold",
                  isDarkMode ? 'text-white' : 'text-gray-800'
                )}>
                  <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    Αναγραμματισμός - Επίπεδο 3
                  </span>
                </h1>
                <p className={cn(
                  "text-xs sm:text-sm",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>
                  Ερώτηση {currentWordIndex + 1} / {anagramWords.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-500">{score}</div>
                <div className={cn(
                  "text-xs",
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                )}>Σκορ</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-red-500">{timeLeft}</div>
                <div className={cn(
                  "text-xs",
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                )}>Δευτ.</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 dark:bg-white/5 rounded-full h-2 sm:h-3 mb-6 sm:mb-8">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 sm:h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentWordIndex + 1) / anagramWords.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Anagram Display */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              key={currentWordIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-4 sm:mb-6"
            >
              <div className="mb-4">
                <h2 className={cn(
                  "text-lg sm:text-xl font-semibold mb-3",
                  isDarkMode ? 'text-white' : 'text-gray-800'
                )}>
                  Unscramble this word:
                </h2>
                <div className="flex justify-center gap-1 sm:gap-2 mb-4 flex-wrap">
                  {scrambledWord.split('').map((letter, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-base sm:text-lg font-bold",
                        "bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20",
                        "shadow-lg backdrop-blur-xl"
                      )}
                    >
                      {letter.toUpperCase()}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hint Section */}
          <div className="mb-6">
            <motion.button
              onClick={toggleHint}
              className={cn(
                "w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2",
                "backdrop-blur-xl border",
                hintUsed 
                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-400/30" 
                  : "bg-blue-500/20 text-blue-400 border-blue-400/30 hover:bg-blue-500/30"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
              {showHint ? "Hide Hint" : "Show Hint"}
            </motion.button>
            
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-3 sm:p-4 bg-white/10 dark:bg-white/5 rounded-xl sm:rounded-2xl border border-white/20 dark:border-white/10"
                >
                  <p className={cn(
                    "text-sm sm:text-base italic",
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    💡 {currentWord.hint}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Answer Input */}
          <div className="mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer here..."
                disabled={showResult}
                className={cn(
                  "flex-1 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold",
                  "bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10",
                  "text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50",
                  "backdrop-blur-xl shadow-lg",
                  showResult && "opacity-50 cursor-not-allowed"
                )}
              />
              <motion.button
                onClick={handleSubmit}
                disabled={!userAnswer.trim() || showResult}
                className={cn(
                  "px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg",
                  "transition-all duration-300 flex items-center justify-center gap-2",
                  "backdrop-blur-xl border shadow-lg",
                  userAnswer.trim() && !showResult
                    ? "bg-green-500/80 text-white border-green-400/50 hover:bg-green-500/90"
                    : "bg-gray-500/50 text-gray-300 border-gray-400/30 cursor-not-allowed"
                )}
                whileHover={userAnswer.trim() && !showResult ? { scale: 1.05 } : {}}
                whileTap={userAnswer.trim() && !showResult ? { scale: 0.95 } : {}}
              >
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                Submit
              </motion.button>
            </div>
          </div>

          {/* Result Feedback */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className={cn(
                  "inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base backdrop-blur-xl border",
                  isCorrect ? "bg-green-500/20 text-green-400 border-green-400/30" : "bg-red-500/20 text-red-400 border-red-400/30"
                )}>
                  {isCorrect ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <X className="w-4 h-4 sm:w-5 sm:h-5" />}
                  {isCorrect ? "Σωστά! 🎉" : `Λάθος! Η σωστή λέξη είναι: ${currentWord.word}`}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
