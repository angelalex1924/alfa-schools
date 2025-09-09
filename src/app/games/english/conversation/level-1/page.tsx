"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Clock, Star, Trophy, RotateCcw, Home, MessageCircle, Sparkles, Zap } from "lucide-react"

// Basic conversation scenarios for level 1
const conversationScenarios = [
  {
    id: 1,
    scenario: "You meet someone for the first time. What do you say?",
    options: ["Hello, how are you?", "Goodbye, see you later", "Thank you very much", "I don't know"],
    correct: "Hello, how are you?",
    explanation: "When meeting someone for the first time, we greet them politely and ask how they are.",
    category: "Greetings"
  },
  {
    id: 2,
    scenario: "Someone gives you a gift. How do you respond?",
    options: ["You're welcome", "Thank you so much!", "I'm sorry", "That's okay"],
    correct: "Thank you so much!",
    explanation: "When someone gives you a gift, you should express gratitude with 'Thank you'.",
    category: "Gratitude"
  },
  {
    id: 3,
    scenario: "You need to ask for directions. What do you say?",
    options: ["Excuse me, where is the library?", "I'm fine, thank you", "Nice to meet you", "See you tomorrow"],
    correct: "Excuse me, where is the library?",
    explanation: "When asking for directions, start with 'Excuse me' to be polite, then ask your question.",
    category: "Asking for Help"
  },
  {
    id: 4,
    scenario: "You want to order food at a restaurant. What do you say?",
    options: ["I would like a pizza, please", "I'm not hungry", "The weather is nice", "I'm from Greece"],
    correct: "I would like a pizza, please",
    explanation: "When ordering food, use 'I would like' or 'I'll have' followed by the item and 'please'.",
    category: "Ordering Food"
  },
  {
    id: 5,
    scenario: "You're late for a meeting. How do you apologize?",
    options: ["I'm sorry I'm late", "You're welcome", "Nice to meet you", "Have a good day"],
    correct: "I'm sorry I'm late",
    explanation: "When you're late, apologize by saying 'I'm sorry I'm late' or 'Sorry for being late'.",
    category: "Apologizing"
  },
  {
    id: 6,
    scenario: "You want to introduce yourself. What do you say?",
    options: ["Hi, I'm Maria", "Goodbye everyone", "Thank you for coming", "I don't understand"],
    correct: "Hi, I'm Maria",
    explanation: "When introducing yourself, say 'Hi, I'm [your name]' or 'Hello, my name is [your name]'.",
    category: "Introductions"
  },
  {
    id: 7,
    scenario: "Someone asks 'How are you?' How do you respond?",
    options: ["I'm fine, thank you. And you?", "I'm sorry", "You're welcome", "Nice to meet you"],
    correct: "I'm fine, thank you. And you?",
    explanation: "When someone asks how you are, respond politely and ask them back with 'And you?'",
    category: "Small Talk"
  },
  {
    id: 8,
    scenario: "You want to buy something in a shop. What do you say?",
    options: ["How much does this cost?", "I'm from Athens", "The weather is nice", "I don't speak English"],
    correct: "How much does this cost?",
    explanation: "When shopping, ask about the price with 'How much does this cost?' or 'How much is this?'",
    category: "Shopping"
  },
  {
    id: 9,
    scenario: "You don't understand something. How do you ask for clarification?",
    options: ["Could you repeat that, please?", "I'm fine, thank you", "Nice to meet you", "See you later"],
    correct: "Could you repeat that, please?",
    explanation: "When you don't understand, politely ask for repetition with 'Could you repeat that, please?'",
    category: "Asking for Help"
  },
  {
    id: 10,
    scenario: "You want to end a phone call politely. What do you say?",
    options: ["I have to go now. Talk to you later!", "Hello, how are you?", "Thank you very much", "I'm sorry"],
    correct: "I have to go now. Talk to you later!",
    explanation: "When ending a phone call, explain why you need to go and say goodbye politely.",
    category: "Phone Conversations"
  },
  {
    id: 11,
    scenario: "Someone helps you. How do you respond?",
    options: ["Thank you for your help", "You're welcome", "I'm sorry", "Nice to meet you"],
    correct: "Thank you for your help",
    explanation: "When someone helps you, express gratitude with 'Thank you for your help' or 'Thanks for helping'.",
    category: "Gratitude"
  },
  {
    id: 12,
    scenario: "You want to make a reservation at a restaurant. What do you say?",
    options: ["I'd like to make a reservation for two people", "I'm not hungry", "The food is delicious", "I'm from Greece"],
    correct: "I'd like to make a reservation for two people",
    explanation: "When making a reservation, say 'I'd like to make a reservation for [number] people'.",
    category: "Making Reservations"
  },
  {
    id: 13,
    scenario: "You accidentally bump into someone. How do you apologize?",
    options: ["I'm sorry, excuse me", "You're welcome", "Nice to meet you", "Thank you very much"],
    correct: "I'm sorry, excuse me",
    explanation: "When you accidentally bump into someone, apologize with 'I'm sorry' or 'Excuse me'.",
    category: "Apologizing"
  },
  {
    id: 14,
    scenario: "You want to ask someone's name. What do you say?",
    options: ["What's your name?", "I'm fine, thank you", "Nice to meet you", "See you tomorrow"],
    correct: "What's your name?",
    explanation: "To ask someone's name, simply say 'What's your name?' or 'May I ask your name?'",
    category: "Getting Information"
  },
  {
    id: 15,
    scenario: "You want to compliment someone. What do you say?",
    options: ["You look great today!", "I'm sorry", "You're welcome", "I don't understand"],
    correct: "You look great today!",
    explanation: "When giving compliments, be specific and positive, like 'You look great!' or 'That's a nice shirt!'",
    category: "Compliments"
  }
]

export default function EnglishConversationLevel1Page() {
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(90) // 1.5 minutes for basic
  const [gameTime, setGameTime] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)

  const currentScenario = conversationScenarios[currentScenarioIndex]
  
  // Create stable options for each scenario
  const options = useMemo(() => {
    const correctAnswer = currentScenario.correct
    const otherOptions = currentScenario.options.filter(opt => opt !== correctAnswer)
    
    // Use currentScenarioIndex as seed for consistent but different positioning
    const seed = currentScenarioIndex * 17 + 11
    
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
  }, [currentScenarioIndex])

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
    setCurrentScenarioIndex(0)
    setGameCompleted(false)
    setGameTime(0)
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameCompleted(false)
    setCurrentScenarioIndex(0)
    setScore(0)
    setTimeLeft(90)
    setGameTime(0)
    setShowResult(false)
    setSelectedAnswer("")
  }

  const handleAnswer = (answer: string) => {
    if (showResult) return
    
    setSelectedAnswer(answer)
    const correct = answer === currentScenario.correct
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      setScore(prev => prev + 1)
    }
    
    setTimeout(() => {
      if (currentScenarioIndex < conversationScenarios.length - 1) {
        setCurrentScenarioIndex(prev => prev + 1)
        setShowResult(false)
        setSelectedAnswer("")
      } else {
        setGameCompleted(true)
      }
    }, 1500) // Less time for basic level
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
                  <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    Conversation - Basic
                  </span>
                </h1>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>
                  Master basic conversation skills
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
                )}>1.5 minutes</p>
              </motion.div>
              <motion.div 
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl backdrop-blur-xl border bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-emerald-500/20">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                  </div>
                  <span className={cn(
                    "font-semibold text-sm sm:text-base",
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  )}>Scenarios</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>{conversationScenarios.length} scenarios</p>
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
                )}>Up to {conversationScenarios.length} points</p>
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
                    Read the scenario carefully
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Choose the most appropriate response
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    You have 1.5 minutes to complete the game
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
    const percentage = Math.round((score / conversationScenarios.length) * 100)
    const isExcellent = percentage >= 90
    const isGood = percentage >= 70
    const isPass = percentage >= 50

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
              Game Completed! 🎉
            </h2>
            
            <div className="bg-white/5 dark:bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-white/10 dark:border-white/10">
              <p className={cn(
                "text-lg sm:text-xl font-semibold mb-2",
                isDarkMode ? 'text-white' : 'text-gray-800'
              )}>
                Score: {score}/{conversationScenarios.length} ({percentage}%)
              </p>
              <p className={cn(
                "text-sm sm:text-base",
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              )}>
                Time: {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.button
                onClick={resetGame}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                Play Again 🔄
              </motion.button>
              <Link href="/games/english" className="flex-1">
                <motion.button
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/20 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                  Return 🏠
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
          {/* Game Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link 
                href="/games/english"
                className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/20 hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </Link>
              <div className="flex-1 min-w-0">
                <h1 className={cn(
                  "text-lg sm:text-xl font-bold",
                  isDarkMode ? 'text-white' : 'text-gray-800'
                )}>
                  <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    Conversation - Basic
                  </span>
                </h1>
                <p className={cn(
                  "text-sm",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>
                  Question {currentScenarioIndex + 1} / {conversationScenarios.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-500">{score}</div>
                <div className={cn(
                  "text-xs",
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                )}>Score</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-emerald-500">{timeLeft}</div>
                <div className={cn(
                  "text-xs",
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                )}>Time</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 dark:bg-white/5 rounded-full h-2 sm:h-3 mb-6 sm:mb-8">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 sm:h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentScenarioIndex + 1) / conversationScenarios.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Scenario */}
          <div className="mb-8">
            <motion.div
              key={currentScenarioIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">
                  {currentScenario.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {currentScenario.scenario}
              </h2>
            </motion.div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <AnimatePresence mode="wait">
              {options.map((option, index) => (
                <motion.button
                  key={`${currentScenarioIndex}-${option}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={cn(
                    "p-4 rounded-xl font-semibold text-lg transition-all duration-300 text-left",
                    "hover:scale-105 active:scale-95",
                    showResult && option === currentScenario.correct && "bg-green-500 text-white",
                    showResult && option === selectedAnswer && option !== currentScenario.correct && "bg-red-500 text-white",
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
                  {isCorrect ? "Σωστά! 🎉" : `Λάθος! Η σωστή απάντηση είναι: ${currentScenario.correct}`}
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>Εξήγηση:</strong> {currentScenario.explanation}
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
