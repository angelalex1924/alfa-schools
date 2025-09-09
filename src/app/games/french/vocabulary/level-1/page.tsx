"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, RotateCcw, Check, X, Star, Trophy, Clock, Sparkles, Zap } from "lucide-react"

// French vocabulary words for Level 1
const vocabularyWords = [
  { french: "chat", greek: "γάτα", image: "🐱" },
  { french: "chien", greek: "σκύλος", image: "🐶" },
  { french: "maison", greek: "σπίτι", image: "🏠" },
  { french: "voiture", greek: "αυτοκίνητο", image: "🚗" },
  { french: "livre", greek: "βιβλίο", image: "📚" },
  { french: "arbre", greek: "δέντρο", image: "🌳" },
  { french: "soleil", greek: "ήλιος", image: "☀️" },
  { french: "lune", greek: "φεγγάρι", image: "🌙" },
  { french: "eau", greek: "νερό", image: "💧" },
  { french: "feu", greek: "φωτιά", image: "🔥" },
  { french: "pomme", greek: "μήλο", image: "🍎" },
  { french: "balle", greek: "μπάλα", image: "⚽" },
  { french: "oiseau", greek: "πουλί", image: "🐦" },
  { french: "poisson", greek: "ψάρι", image: "🐟" },
  { french: "fleur", greek: "λουλούδι", image: "🌸" },
  { french: "étoile", greek: "αστέρι", image: "⭐" },
  { french: "cœur", greek: "καρδιά", image: "❤️" },
  { french: "sourire", greek: "χαμόγελο", image: "😊" },
  { french: "main", greek: "χέρι", image: "✋" },
  { french: "œil", greek: "μάτι", image: "👁️" }
]

export default function FrenchVocabularyLevel1() {
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [timeLeft, setTimeLeft] = useState(45)
  const [gameTime, setGameTime] = useState(0)

  const currentWord = vocabularyWords[currentWordIndex]
  
  // Create stable options for each question - same options, different positions
  const options = useMemo(() => {
    const allWords = [...vocabularyWords]
    const correctAnswer = currentWord
    const otherWords = allWords.filter(word => word.french !== correctAnswer.french)
    
    // Use currentWordIndex as seed for consistent but different positioning
    const seed = currentWordIndex * 13 + 7 // Different seed for each question
    
    // Create deterministic shuffle of other words
    const shuffledOthers = [...otherWords].sort((a, b) => {
      const hashA = (a.french.charCodeAt(0) + seed) % 1000
      const hashB = (b.french.charCodeAt(0) + seed) % 1000
      return hashA - hashB
    })
    
    // Create options array with correct answer
    const optionsArray = [correctAnswer, ...shuffledOthers.slice(0, 3)]
    
    // Use seed to determine position of correct answer (0-3)
    const correctPosition = seed % 4
    
    // Move correct answer to determined position
    const result = [...optionsArray]
    const correctOption = result.splice(0, 1)[0] // Remove correct answer
    result.splice(correctPosition, 0, correctOption) // Insert at determined position
    
    return result
  }, [currentWordIndex]) // Only recalculate when currentWordIndex changes

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
    setTimeLeft(45)
    setScore(0)
    setCurrentWordIndex(0)
    setGameCompleted(false)
    setGameTime(0)
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameCompleted(false)
    setCurrentWordIndex(0)
    setScore(0)
    setTimeLeft(45)
    setGameTime(0)
    setShowResult(false)
    setSelectedAnswer("")
  }

  const handleAnswer = (answer: typeof currentWord) => {
    setSelectedAnswer(answer.french)
    const correct = answer.french === currentWord.french
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setScore(prev => prev + 1)
    }

    setTimeout(() => {
      if (currentWordIndex < vocabularyWords.length - 1) {
        setCurrentWordIndex(prev => prev + 1)
        setShowResult(false)
        setSelectedAnswer("")
      } else {
        setGameCompleted(true)
      }
    }, 1500)
  }

  const getScoreMessage = () => {
    const percentage = (score / vocabularyWords.length) * 100
    if (percentage >= 80) return { message: "Magnifique! 🎉", color: "text-green-600" }
    if (percentage >= 60) return { message: "Très bien! 👍", color: "text-blue-600" }
    if (percentage >= 40) return { message: "Bien! 😊", color: "text-yellow-600" }
    return { message: "Continue! 💪", color: "text-red-600" }
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
                href="/games/french"
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
                    Vocabulaire - Basique
                  </span>
                </h1>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>
                  Enrichissez votre vocabulaire
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
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <span className={cn(
                    "font-semibold text-sm sm:text-base",
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  )}>Time</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>45 seconds</p>
              </motion.div>
              <motion.div 
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl backdrop-blur-xl border bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-emerald-500/20">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                  </div>
                  <span className={cn(
                    "font-semibold text-sm sm:text-base",
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  )}>Words</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>{vocabularyWords.length} words</p>
              </motion.div>
              <motion.div 
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl backdrop-blur-xl border bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-teal-500/20">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
                  </div>
                  <span className={cn(
                    "font-semibold text-sm sm:text-base",
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  )}>Score</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>Up to {vocabularyWords.length} points</p>
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
                  <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    You see an icon
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Choose the correct French word
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    You have 45 seconds to complete the game
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
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
              className="w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900/20 flex items-center justify-center p-4">
        <motion.div
          className="max-w-2xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Jeu Terminé! 🎉
            </h2>
            
            <div className="mb-6">
              <p className={cn("text-2xl font-semibold mb-2", scoreInfo.color)}>
                {scoreInfo.message}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Score: {score} / {vocabularyWords.length}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Temps: {gameTime} secondes
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={resetGame}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Rejouer 🔄
              </motion.button>
              <Link href="/games/french">
                <motion.button
                  className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Retour ←
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900/20 flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50">
          {/* Game Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link 
                href="/games/french"
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  Vocabulaire - Niveau 1
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Question {currentWordIndex + 1} / {vocabularyWords.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{score}</div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{timeLeft}</div>
                <div className="text-xs text-gray-500">Sec.</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mb-8">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentWordIndex + 1) / vocabularyWords.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <motion.div
              key={currentWordIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className="text-8xl mb-4">{currentWord.image}</div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                {t('games.french.vocabulary.question')}
              </h2>
            </motion.div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence mode="wait">
              {options.map((option, index) => (
                <motion.button
                  key={`${currentWordIndex}-${option.french}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={cn(
                    "p-4 rounded-xl font-semibold text-lg transition-all duration-300",
                    "hover:scale-105 active:scale-95",
                    showResult && option.french === currentWord.french && "bg-green-500 text-white",
                    showResult && option.french === selectedAnswer && option.french !== currentWord.french && "bg-red-500 text-white",
                    !showResult && "bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white"
                  )}
                >
                  {option.french}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Result Feedback */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 text-center"
              >
                <div className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold",
                  isCorrect ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                )}>
                  {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  {isCorrect ? "Correct! 🎉" : "Incorrect! 😔"}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
