"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Clock, Star, Trophy, RotateCcw, Home, Sparkles, Zap } from "lucide-react"

// Advanced grammar questions for level 3
const grammarQuestions = [
  {
    id: 1,
    question: "Choose the correct form: 'Had I known about the meeting, I _____ attended.'",
    options: ["would have", "would", "had", "will have"],
    correct: "would have",
    explanation: "Inverted third conditional: Had + subject + past participle, subject + would have + past participle",
    category: "Advanced Conditionals"
  },
  {
    id: 2,
    question: "Complete: 'The proposal _____ by the committee next week.'",
    options: ["is being considered", "will be being considered", "will have been considered", "is considered"],
    correct: "will be being considered",
    explanation: "Future continuous passive for ongoing action in the future",
    category: "Advanced Passive"
  },
  {
    id: 3,
    question: "Which is correct: 'I wish I _____ more time when I was younger.'",
    options: ["had had", "had", "would have had", "have had"],
    correct: "had had",
    explanation: "Wish + past perfect for past regrets",
    category: "Advanced Wishes"
  },
  {
    id: 4,
    question: "Choose: 'The book _____ by the time you arrive.'",
    options: ["will have been read", "will be read", "is being read", "has been read"],
    correct: "will have been read",
    explanation: "Future perfect passive for action completed before future time",
    category: "Advanced Passive"
  },
  {
    id: 5,
    question: "Complete: 'Not only _____ late, but he also forgot the documents.'",
    options: ["he was", "was he", "he had been", "had he been"],
    correct: "was he",
    explanation: "Inversion after 'Not only' at the beginning of a sentence",
    category: "Inversion"
  },
  {
    id: 6,
    question: "Which is correct: 'I'd rather you _____ that again.'",
    options: ["don't do", "didn't do", "won't do", "haven't done"],
    correct: "didn't do",
    explanation: "Would rather + subject + past simple for present/future preferences",
    category: "Advanced Preferences"
  },
  {
    id: 7,
    question: "Choose: 'The meeting _____ for three hours by 5 PM.'",
    options: ["will have been going on", "will be going on", "is going on", "has been going on"],
    correct: "will have been going on",
    explanation: "Future perfect continuous for duration up to future time",
    category: "Advanced Tenses"
  },
  {
    id: 8,
    question: "Complete: 'Had it not been for the rain, we _____ the picnic.'",
    options: ["would have had", "would have", "had had", "will have had"],
    correct: "would have had",
    explanation: "Inverted third conditional with 'Had it not been for'",
    category: "Advanced Conditionals"
  },
  {
    id: 9,
    question: "Which is correct: 'The project _____ by the end of the month.'",
    options: ["will have been completed", "will be completed", "is being completed", "has been completed"],
    correct: "will have been completed",
    explanation: "Future perfect passive for action completed by future time",
    category: "Advanced Passive"
  },
  {
    id: 10,
    question: "Choose: 'So difficult _____ the exam that many students failed.'",
    options: ["was", "it was", "were", "it were"],
    correct: "was",
    explanation: "Inversion after 'So + adjective' at the beginning of a sentence",
    category: "Inversion"
  },
  {
    id: 11,
    question: "Complete: 'I wish I _____ more carefully before making that decision.'",
    options: ["had thought", "thought", "would think", "have thought"],
    correct: "had thought",
    explanation: "Wish + past perfect for past regrets",
    category: "Advanced Wishes"
  },
  {
    id: 12,
    question: "Which is correct: 'The report _____ by the time the meeting starts.'",
    options: ["will have been finished", "will be finished", "is being finished", "has been finished"],
    correct: "will have been finished",
    explanation: "Future perfect passive for action completed before future time",
    category: "Advanced Passive"
  },
  {
    id: 13,
    question: "Choose: 'Never _____ such a beautiful sunset.'",
    options: ["I have seen", "have I seen", "I saw", "did I see"],
    correct: "have I seen",
    explanation: "Inversion after 'Never' at the beginning of a sentence",
    category: "Inversion"
  },
  {
    id: 14,
    question: "Complete: 'The building _____ for over a century.'",
    options: ["will have been standing", "will be standing", "is standing", "has been standing"],
    correct: "will have been standing",
    explanation: "Future perfect continuous for duration up to future time",
    category: "Advanced Tenses"
  },
  {
    id: 15,
    question: "Which is correct: 'I'd sooner you _____ me the truth.'",
    options: ["tell", "told", "would tell", "had told"],
    correct: "told",
    explanation: "Would sooner + subject + past simple for present/future preferences",
    category: "Advanced Preferences"
  },
  {
    id: 16,
    question: "Choose: 'The contract _____ by both parties by tomorrow.'",
    options: ["will have been signed", "will be signed", "is being signed", "has been signed"],
    correct: "will have been signed",
    explanation: "Future perfect passive for action completed by future time",
    category: "Advanced Passive"
  },
  {
    id: 17,
    question: "Complete: 'Had I realized the consequences, I _____ differently.'",
    options: ["would have acted", "would act", "had acted", "will have acted"],
    correct: "would have acted",
    explanation: "Inverted third conditional: Had + subject + past participle, subject + would have + past participle",
    category: "Advanced Conditionals"
  },
  {
    id: 18,
    question: "Which is correct: 'The research _____ for five years by next month.'",
    options: ["will have been conducted", "will be conducted", "is being conducted", "has been conducted"],
    correct: "will have been conducted",
    explanation: "Future perfect passive for action completed by future time",
    category: "Advanced Passive"
  },
  {
    id: 19,
    question: "Choose: 'So tired _____ he that he fell asleep immediately.'",
    options: ["was", "he was", "were", "he were"],
    correct: "was",
    explanation: "Inversion after 'So + adjective' at the beginning of a sentence",
    category: "Inversion"
  },
  {
    id: 20,
    question: "Complete: 'The presentation _____ by the time you get here.'",
    options: ["will have been given", "will be given", "is being given", "has been given"],
    correct: "will have been given",
    explanation: "Future perfect passive for action completed before future time",
    category: "Advanced Passive"
  }
]

export default function EnglishGrammarLevel3Page() {
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes for advanced
  const [gameTime, setGameTime] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)

  const currentQuestion = grammarQuestions[currentQuestionIndex]
  
  // Create stable options for each question
  const options = useMemo(() => {
    const correctAnswer = currentQuestion.correct
    const otherOptions = currentQuestion.options.filter(opt => opt !== correctAnswer)
    
    // Use currentQuestionIndex as seed for consistent but different positioning
    const seed = currentQuestionIndex * 17 + 11
    
    // Create deterministic shuffle of other options
    const shuffledOthers = [...otherOptions].sort((a, b) => {
      const hashA = (a.charCodeAt(0) + seed) % 1000
      const hashB = (b.charCodeAt(0) + seed) % 1000
      return hashA - hashB
    })
    
    // Create options array with correct answer
    const optionsArray = [correctAnswer, ...shuffledOthers]
    
    // Use seed to determine position of correct answer (0-3)
    const correctPosition = seed % 4
    
    // Move correct answer to determined position
    const result = [...optionsArray]
    const correctOption = result.splice(0, 1)[0]
    result.splice(correctPosition, 0, correctOption)
    
    return result
  }, [currentQuestionIndex])

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
    setTimeLeft(180)
    setScore(0)
    setCurrentQuestionIndex(0)
    setGameCompleted(false)
    setGameTime(0)
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameCompleted(false)
    setCurrentQuestionIndex(0)
    setScore(0)
    setTimeLeft(180)
    setGameTime(0)
    setShowResult(false)
    setSelectedAnswer("")
  }

  const handleAnswer = (answer: string) => {
    if (showResult) return
    
    setSelectedAnswer(answer)
    const correct = answer === currentQuestion.correct
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      setScore(prev => prev + 1)
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < grammarQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setShowResult(false)
        setSelectedAnswer("")
      } else {
        setGameCompleted(true)
      }
    }, 2500) // More time for advanced level
  }

  if (!gameStarted) {
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
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
                  <span className="bg-gradient-to-r from-purple-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                    Grammar - Advanced
                  </span>
                </h1>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>
                  Master advanced grammar rules
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
                )}>3 minutes</p>
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
                  )}>Questions</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>{grammarQuestions.length} questions</p>
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
                )}>Up to {grammarQuestions.length} points</p>
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
                    Read the question carefully
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Choose the correct answer
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    You have 3 minutes to complete the game
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
              className="w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-purple-500 to-red-500 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3"
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
    const percentage = Math.round((score / grammarQuestions.length) * 100)
    const isExcellent = percentage >= 90
    const isGood = percentage >= 70
    const isPass = percentage >= 50

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
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
                {isExcellent ? "Εξαιρετικά!" : isGood ? "Πολύ καλά!" : isPass ? "Καλά!" : "Συνεχίστε!"}
              </h2>
              <p className="text-white/90 mb-4">
                Σκορ: {score}/{grammarQuestions.length} ({percentage}%)
              </p>
              <p className="text-white/80 text-sm">
                Χρόνος: {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}
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
                Ξανά
              </motion.button>
              <Link
                href="/games/english"
                className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Αρχική
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
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
                href="/games/english"
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  Γραμματική - Επίπεδο 3
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Ερώτηση {currentQuestionIndex + 1} / {grammarQuestions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-xs text-gray-500">Σκορ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{timeLeft}</div>
                <div className="text-xs text-gray-500">Δευτ.</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mb-8">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / grammarQuestions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Question */}
          <div className="mb-8">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                  {currentQuestion.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {currentQuestion.question}
              </h2>
            </motion.div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <AnimatePresence mode="wait">
              {options.map((option, index) => (
                <motion.button
                  key={`${currentQuestionIndex}-${option}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={cn(
                    "p-4 rounded-xl font-semibold text-lg transition-all duration-300",
                    "hover:scale-105 active:scale-95",
                    showResult && option === currentQuestion.correct && "bg-green-500 text-white",
                    showResult && option === selectedAnswer && option !== currentQuestion.correct && "bg-red-500 text-white",
                    !showResult && "bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white"
                  )}
                >
                  {option}
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
                className="text-center"
              >
                <div className={cn(
                  "p-4 rounded-xl font-semibold mb-2",
                  isCorrect ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                )}>
                  {isCorrect ? "Σωστά! 🎉" : `Λάθος! Η σωστή απάντηση είναι: ${currentQuestion.correct}`}
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Εξήγηση:</strong> {currentQuestion.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
