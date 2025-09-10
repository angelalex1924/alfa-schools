"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Clock, Star, Trophy, RotateCcw, Home } from "lucide-react"

// Advanced grammar questions for level 3
const grammarQuestions = [
  {
    id: 1,
    question: "Choisissez la forme correcte: 'Eût-il su la vérité, il _____ différemment.'",
    options: ["aurait agi", "agirait", "avait agi", "agira"],
    correct: "aurait agi",
    explanation: "Conditionnel passé avec inversion: Eût-il + participe passé, il + aurait + participe passé",
    category: "Conditionnel Avancé"
  },
  {
    id: 2,
    question: "Complétez: 'Le rapport _____ par le comité la semaine prochaine.'",
    options: ["est en train d'être examiné", "sera en train d'être examiné", "aura été examiné", "est examiné"],
    correct: "sera en train d'être examiné",
    explanation: "Futur passif continu pour une action en cours dans le futur",
    category: "Passif Avancé"
  },
  {
    id: 3,
    question: "Quelle est correcte: 'Je regrette _____ plus de temps quand j'étais jeune.'",
    options: ["d'avoir eu", "d'avoir", "d'être eu", "d'avoir été"],
    correct: "d'avoir eu",
    explanation: "Regretter + de + infinitif passé pour des regrets du passé",
    category: "Regrets Avancés"
  },
  {
    id: 4,
    question: "Choisissez: 'Le livre _____ au moment de votre arrivée.'",
    options: ["aura été lu", "sera lu", "est en train d'être lu", "a été lu"],
    correct: "aura été lu",
    explanation: "Futur antérieur passif pour une action terminée avant un moment futur",
    category: "Passif Avancé"
  },
  {
    id: 5,
    question: "Complétez: 'Non seulement _____ en retard, mais il a aussi oublié les documents.'",
    options: ["il était", "était-il", "il avait été", "avait-il été"],
    correct: "était-il",
    explanation: "Inversion après 'Non seulement' en début de phrase",
    category: "Inversion"
  },
  {
    id: 6,
    question: "Quelle est correcte: 'J'aimerais que vous _____ cela encore.'",
    options: ["ne faites pas", "ne fassiez pas", "ne ferez pas", "n'avez pas fait"],
    correct: "ne fassiez pas",
    explanation: "Subjonctif présent après 'J'aimerais que'",
    category: "Subjonctif"
  },
  {
    id: 7,
    question: "Choisissez: 'La réunion _____ depuis trois heures à 17h.'",
    options: ["aura duré", "durera", "dure", "a duré"],
    correct: "aura duré",
    explanation: "Futur antérieur pour une durée jusqu'à un moment futur",
    category: "Temps Avancés"
  },
  {
    id: 8,
    question: "Complétez: 'N'eût-ce été la pluie, nous _____ le pique-nique.'",
    options: ["aurions eu", "aurions", "avions eu", "aurons eu"],
    correct: "aurions eu",
    explanation: "Conditionnel passé avec 'N'eût-ce été'",
    category: "Conditionnel Avancé"
  },
  {
    id: 9,
    question: "Quelle est correcte: 'Le projet _____ d'ici la fin du mois.'",
    options: ["aura été terminé", "sera terminé", "est en train d'être terminé", "a été terminé"],
    correct: "aura été terminé",
    explanation: "Futur antérieur passif pour une action terminée avant un moment futur",
    category: "Passif Avancé"
  },
  {
    id: 10,
    question: "Choisissez: 'Si difficile _____ l'examen que beaucoup d'étudiants ont échoué.'",
    options: ["était", "il était", "étaient", "ils étaient"],
    correct: "était",
    explanation: "Inversion après 'Si + adjectif' en début de phrase",
    category: "Inversion"
  },
  {
    id: 11,
    question: "Complétez: 'Je regrette _____ plus attentivement avant de prendre cette décision.'",
    options: ["d'avoir réfléchi", "de réfléchir", "d'être réfléchi", "de m'être réfléchi"],
    correct: "d'avoir réfléchi",
    explanation: "Regretter + de + infinitif passé pour des regrets du passé",
    category: "Regrets Avancés"
  },
  {
    id: 12,
    question: "Quelle est correcte: 'Le rapport _____ au moment où la réunion commence.'",
    options: ["aura été terminé", "sera terminé", "est en train d'être terminé", "a été terminé"],
    correct: "aura été terminé",
    explanation: "Futur antérieur passif pour une action terminée avant un moment futur",
    category: "Passif Avancé"
  },
  {
    id: 13,
    question: "Choisissez: 'Jamais _____ un si beau coucher de soleil.'",
    options: ["j'ai vu", "ai-je vu", "j'ai vu", "je vis"],
    correct: "ai-je vu",
    explanation: "Inversion après 'Jamais' en début de phrase",
    category: "Inversion"
  },
  {
    id: 14,
    question: "Complétez: 'Le bâtiment _____ depuis plus d'un siècle.'",
    options: ["aura tenu", "tiendra", "tient", "a tenu"],
    correct: "aura tenu",
    explanation: "Futur antérieur pour une durée jusqu'à un moment futur",
    category: "Temps Avancés"
  },
  {
    id: 15,
    question: "Quelle est correcte: 'J'aimerais mieux que vous _____ la vérité.'",
    options: ["dites", "disiez", "diriez", "aviez dit"],
    correct: "disiez",
    explanation: "Subjonctif présent après 'J'aimerais mieux que'",
    category: "Subjonctif"
  },
  {
    id: 16,
    question: "Choisissez: 'Le contrat _____ par les deux parties d'ici demain.'",
    options: ["aura été signé", "sera signé", "est en train d'être signé", "a été signé"],
    correct: "aura été signé",
    explanation: "Futur antérieur passif pour une action terminée avant un moment futur",
    category: "Passif Avancé"
  },
  {
    id: 17,
    question: "Complétez: 'Eussé-je réalisé les conséquences, j'_____ différemment.'",
    options: ["aurais agi", "agirais", "avais agi", "aurai agi"],
    correct: "aurais agi",
    explanation: "Conditionnel passé avec inversion: Eussé-je + participe passé, j' + aurais + participe passé",
    category: "Conditionnel Avancé"
  },
  {
    id: 18,
    question: "Quelle est correcte: 'La recherche _____ depuis cinq ans le mois prochain.'",
    options: ["aura été menée", "sera menée", "est en train d'être menée", "a été menée"],
    correct: "aura été menée",
    explanation: "Futur antérieur passif pour une action terminée avant un moment futur",
    category: "Passif Avancé"
  },
  {
    id: 19,
    question: "Choisissez: 'Si fatigué _____ qu'il s'est endormi immédiatement.'",
    options: ["était", "il était", "étaient", "ils étaient"],
    correct: "était",
    explanation: "Inversion après 'Si + adjectif' en début de phrase",
    category: "Inversion"
  },
  {
    id: 20,
    question: "Complétez: 'La présentation _____ au moment où vous arriverez.'",
    options: ["aura été faite", "sera faite", "est en train d'être faite", "a été faite"],
    correct: "aura été faite",
    explanation: "Futur antérieur passif pour une action terminée avant un moment futur",
    category: "Passif Avancé"
  }
]

export default function FrenchGrammarLevel3Page() {
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
                  {t('games.french.grammar.title')} - {t('games.levels.advanced')}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('games.french.grammar.description')}
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
                )}>3 minutes</p>
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
                  )}>Questions</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>{grammarQuestions.length} questions</p>
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
                )}>Jusqu'à {grammarQuestions.length} points</p>
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
                    Lisez la question attentivement
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Choisissez la bonne réponse
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Vous avez 3 minutes pour terminer le jeu
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
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
    const percentage = Math.round((score / grammarQuestions.length) * 100)
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
                Score: {score}/{grammarQuestions.length} ({percentage}%)
              </p>
              <p className="text-white/80 text-sm">
                Temps: {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}
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
                  Grammaire - Niveau 3
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Question {currentQuestionIndex + 1} / {grammarQuestions.length}
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
                <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 text-sm font-medium rounded-full">
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
                  {isCorrect ? "Correct! 🎉" : `Incorrect! La bonne réponse est: ${currentQuestion.correct}`}
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <p className="text-sm text-indigo-800 dark:text-indigo-200">
                    <strong>Explication:</strong> {currentQuestion.explanation}
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
