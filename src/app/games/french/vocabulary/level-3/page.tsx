"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Clock, Star, Trophy, RotateCcw, Home } from "lucide-react"

// Creative and challenging vocabulary words for level 3 - Mixed categories
const vocabularyWords = [
  // Art & Culture
  { greek: "ζωγράφος", french: "peintre", image: "🎨", category: "Art" },
  { greek: "συνθέτης", french: "compositeur", image: "🎼", category: "Musique" },
  { greek: "συγγραφέας", french: "auteur", image: "📚", category: "Littérature" },
  { greek: "ποιητής", french: "poète", image: "✍️", category: "Poésie" },
  { greek: "ηθοποιός", french: "acteur", image: "🎭", category: "Théâtre" },
  
  // Science & Technology
  { greek: "επιστήμονας", french: "scientifique", image: "🔬", category: "Science" },
  { greek: "αστροναύτης", french: "astronaute", image: "🚀", category: "Espace" },
  { greek: "προγραμματιστής", french: "programmeur", image: "💻", category: "Technologie" },
  { greek: "ερευνητής", french: "chercheur", image: "🔍", category: "Recherche" },
  { greek: "εφευρέτης", french: "inventeur", image: "⚗️", category: "Innovation" },
  
  // Nature & Environment
  { greek: "οικολόγος", french: "écologiste", image: "🌱", category: "Environnement" },
  { greek: "μετεωρολόγος", french: "météorologue", image: "⛅", category: "Météo" },
  { greek: "γεωλόγος", french: "géologue", image: "🗻", category: "Terre" },
  { greek: "βιολόγος", french: "biologiste", image: "🧬", category: "Biologie" },
  { greek: "βοτανολόγος", french: "botaniste", image: "🌿", category: "Plantes" },
  
  // Sports & Adventure
  { greek: "αθλητής", french: "athlète", image: "🏃", category: "Sport" },
  { greek: "οδηγός", french: "pilote", image: "🏎️", category: "Course" },
  { greek: "πλοηγός", french: "pilote", image: "✈️", category: "Aviation" },
  { greek: "ναυτικός", french: "marin", image: "⛵", category: "Navigation" },
  { greek: "ορειβάτης", french: "alpiniste", image: "🏔️", category: "Escalade" },
  
  // Food & Culinary
  { greek: "μάγειρας", french: "chef", image: "👨‍🍳", category: "Cuisine" },
  { greek: "σερβιτόρος", french: "serveur", image: "🍽️", category: "Service" },
  { greek: "ζαχαροπλάστης", french: "pâtissier", image: "🧁", category: "Desserts" },
  { greek: "σομμελιέ", french: "sommelier", image: "🍷", category: "Vin" },
  { greek: "κριτικός", french: "critique", image: "⭐", category: "Critique" },
  
  // Creative & Design
  { greek: "σχεδιαστής", french: "designer", image: "🎨", category: "Design" },
  { greek: "φωτογράφος", french: "photographe", image: "📸", category: "Photographie" },
  { greek: "αρχιτέκτονας", french: "architecte", image: "🏗️", category: "Architecture" },
  { greek: "γλύπτης", french: "sculpteur", image: "🗿", category: "Sculpture" },
  { greek: "γράφων", french: "calligraphe", image: "✒️", category: "Écriture" }
]

export default function FrenchVocabularyLevel3Page() {
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(90) // More time for very difficult words
  const [gameTime, setGameTime] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)

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
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameCompleted(true)
            return 0
          }
          return prev - 1
        })
        setGameTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [gameStarted, gameCompleted, timeLeft])

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(90)
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
    setTimeLeft(90)
    setGameTime(0)
    setShowResult(false)
    setSelectedAnswer("")
  }

  const handleAnswer = (answer: string) => {
    if (showResult) return
    
    setSelectedAnswer(answer)
    const correct = answer === currentWord.french
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

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <motion.div
          className="max-w-2xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <Link 
                href="/games/french"
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {t('games.french.vocabulary.title')} - {t('games.levels.advanced')}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('games.french.vocabulary.description')}
                </p>
              </div>
            </div>

            {/* Game Info */}
            <div className="grid md:grid-cols-3 gap-4 mb-6 sm:mb-8">
              <motion.div 
                className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20 dark:border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-red-500/20">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  </div>
                  <span className={cn(
                    "font-semibold text-sm sm:text-base",
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  )}>Temps</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>90 secondes</p>
              </motion.div>
              <motion.div 
                className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20 dark:border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  </div>
                  <span className={cn(
                    "font-semibold text-sm sm:text-base",
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  )}>Mots</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>{vocabularyWords.length} mots</p>
              </motion.div>
              <motion.div 
                className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20 dark:border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
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
                )}>Jusqu'à {vocabularyWords.length} points</p>
              </motion.div>
            </div>

            {/* Instructions */}
            <div className="mb-6 sm:mb-8">
              <h3 className={cn(
                "text-base sm:text-lg font-semibold mb-3 sm:mb-4",
                isDarkMode ? 'text-white' : 'text-gray-800'
              )}>
                {t('games.french.vocabulary.instructions.title')}
              </h3>
              <div className="bg-white/5 dark:bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3 border border-white/10 dark:border-white/10">
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    {t('games.french.vocabulary.instructions.step1')}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    {t('games.french.vocabulary.instructions.step2')}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Vous avez 90 secondes pour terminer le jeu
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    {t('games.french.vocabulary.instructions.step4')}
                  </span>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <motion.button
              onClick={startGame}
              className="w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencer le Jeu! 🎮
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (gameCompleted) {
    const percentage = Math.round((score / vocabularyWords.length) * 100)
    const isExcellent = percentage >= 90
    const isGood = percentage >= 70
    const isPass = percentage >= 50

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-md mx-auto text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className={cn(
              "p-8 rounded-2xl shadow-2xl",
              isExcellent ? "bg-gradient-to-br from-yellow-400 to-orange-500" :
              isGood ? "bg-gradient-to-br from-green-400 to-emerald-500" :
              isPass ? "bg-gradient-to-br from-blue-400 to-cyan-500" :
              "bg-gradient-to-br from-red-400 to-pink-500"
            )}>
              <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">
                {isExcellent ? "Excellent!" : isGood ? "Très bien!" : isPass ? "Bien!" : "Continuez!"}
              </h2>
              <p className="text-white/90 mb-4">
                Score: {score}/{vocabularyWords.length} ({percentage}%)
              </p>
              <p className="text-white/80 text-sm">
                Temps: {gameTime} secondes
              </p>
            </div>
            
            <div className="mt-6 flex gap-4">
              <motion.button
                onClick={resetGame}
                className="flex-1 py-3 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw className="w-4 h-4" />
                Recommencer
              </motion.button>
              <Link
                href="/games/french"
                className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Accueil
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
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
                  Vocabulaire - Niveau 3
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Question {currentWordIndex + 1} / {vocabularyWords.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{score}</div>
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
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
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
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 text-sm font-medium rounded-full">
                  {currentWord.category}
                </span>
              </div>
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
                  onClick={() => handleAnswer(option.french)}
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
                  "p-4 rounded-xl font-semibold",
                  isCorrect ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                )}>
                  {isCorrect ? "Correct! 🎉" : `Incorrect! La bonne réponse est: ${currentWord.french}`}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
