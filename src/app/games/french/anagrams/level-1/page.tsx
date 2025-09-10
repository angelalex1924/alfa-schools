"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, RotateCcw, Check, X, Star, Trophy, Clock, Sparkles, Zap, Lightbulb, Shuffle } from "lucide-react"

// French anagram words for Level 1 (Basic)
const anagramWords = [
  { word: "chat", hint: "Un petit animal domestique qui miaule", scrambled: "tcha" },
  { word: "chien", hint: "Un animal domestique fidèle qui aboie", scrambled: "nehci" },
  { word: "soleil", hint: "L'étoile brillante dans notre ciel", scrambled: "leilos" },
  { word: "lune", hint: "Brille la nuit dans le ciel", scrambled: "enul" },
  { word: "livre", hint: "Vous lisez ceci pour apprendre", scrambled: "ervil" },
  { word: "arbre", hint: "Plante haute avec des feuilles", scrambled: "erbra" },
  { word: "maison", hint: "Où les gens vivent", scrambled: "nosiam" },
  { word: "voiture", hint: "Véhicule avec quatre roues", scrambled: "eruitov" },
  { word: "oiseau", hint: "Animal qui peut voler", scrambled: "uaesio" },
  { word: "poisson", hint: "Vit dans l'eau et nage", scrambled: "nossiop" },
  { word: "pomme", hint: "Fruit rouge ou vert", scrambled: "emmop" },
  { word: "eau", hint: "Liquide clair que nous buvons", scrambled: "aue" },
  { word: "feu", hint: "Flamme chaude et brillante", scrambled: "euf" },
  { word: "étoile", hint: "Scintille dans le ciel nocturne", scrambled: "elioté" },
  { word: "cœur", hint: "Pompe le sang dans votre corps", scrambled: "rœuc" },
  { word: "sourire", hint: "Expression heureuse sur le visage", scrambled: "erirous" },
  { word: "main", hint: "A cinq doigts", scrambled: "niam" },
  { word: "œil", hint: "Vous voyez avec ceci", scrambled: "lœi" },
  { word: "balle", hint: "Objet rond pour jouer", scrambled: "ellab" },
  { word: "fleur", hint: "Belle plante avec des pétales", scrambled: "reulf" }
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

export default function FrenchAnagramsLevel1() {
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
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
    setTimeLeft(60)
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
    setTimeLeft(60)
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
                    Anagrammes - Débutant
                  </span>
                </h1>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>
                  Mélangez les lettres pour former des mots
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
                  )}>Temps</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>60 secondes</p>
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
                  )}>Mots</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>{anagramWords.length} mots</p>
              </motion.div>
              <motion.div 
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl backdrop-blur-xl border bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-emerald-500/20">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                  </div>
                  <span className={cn(
                    "font-semibold text-sm sm:text-base",
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  )}>Score</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>Jusqu'à {anagramWords.length} points</p>
              </motion.div>
            </div>

            {/* Instructions */}
            <div className="mb-6 sm:mb-8">
              <h3 className={cn(
                "text-base sm:text-lg font-semibold mb-3 sm:mb-4",
                isDarkMode ? 'text-white' : 'text-gray-800'
              )}>
                {t('games.french.anagrams.instructions.title')}
              </h3>
              <div className="bg-white/5 dark:bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3 border border-white/10 dark:border-white/10">
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Mélangez les lettres pour former un mot
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Utilisez l'indice si vous avez besoin d'aide
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Vous avez 60 secondes pour terminer le jeu
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Vous gagnez 1 point pour chaque bonne réponse
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
              Commencer le jeu! 🎮
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
              Jeu Terminé! 🎉
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
                  Score: {score} / {anagramWords.length}
                </p>
                <p className={cn(
                  "text-base sm:text-lg",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>
                  Temps: {gameTime} secondes
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
                Rejouer 🔄
              </motion.button>
              <Link href="/games/french">
                <motion.button
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 dark:bg-white/10 backdrop-blur-xl border border-white/20 dark:border-white/20 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Retour 🏠
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
          ? `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%)`
          : `linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 50%, #d1e7ff 100%)`,
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl animate-pulse opacity-30"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(74, 111, 165, 0.2)" 
              : "rgba(74, 111, 165, 0.4)" 
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-56 h-56 rounded-full blur-3xl animate-pulse opacity-25"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(129, 161, 212, 0.15)" 
              : "rgba(129, 161, 212, 0.5)" 
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-35"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(201, 182, 228, 0.1)" 
              : "rgba(201, 182, 228, 0.3)" 
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
                  "text-lg sm:text-xl font-bold",
                  isDarkMode ? 'text-white' : 'text-gray-800'
                )}>
                  <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    Anagrammes - Niveau 1
                  </span>
                </h1>
                <p className={cn(
                  "text-xs sm:text-sm",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>
                  Question {currentWordIndex + 1} / {anagramWords.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-500">{score}</div>
                <div className={cn(
                  "text-xs",
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                )}>Score</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-red-500">{timeLeft}</div>
                <div className={cn(
                  "text-xs",
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                )}>Sec.</div>
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
                  Mélangez ce mot:
                </h2>
                <div className="flex justify-center gap-2 mb-4 flex-wrap">
                  {scrambledWord.split('').map((letter, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold",
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
              {showHint ? "Masquer l'indice" : "Afficher l'indice"}
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
                placeholder="Tapez votre réponse ici..."
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
                Soumettre
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
                  {isCorrect ? "Correct! 🎉" : `Incorrect! Le mot correct est: ${currentWord.word}`}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
