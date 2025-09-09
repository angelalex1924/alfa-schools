"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Clock, Star, Trophy, RotateCcw, Home } from "lucide-react"

// Intermediate grammar questions for level 2
const grammarQuestions = [
  {
    id: 1,
    question: "Choisissez la bonne forme: 'Si j'_____ riche, je voyagerais partout.'",
    options: ["étais", "serais", "avais été", "aurais été"],
    correct: "étais",
    explanation: "Conditionnel présent: si + imparfait",
    category: "Conditionnel"
  },
  {
    id: 2,
    question: "Complétez: 'Je travaille ici _____ 2020.'",
    options: ["depuis", "pour", "dans", "pendant"],
    correct: "depuis",
    explanation: "'Depuis' indique le début d'une action qui continue",
    category: "Présent"
  },
  {
    id: 3,
    question: "Quelle est la forme correcte: 'Je regrette _____ vous dire la vérité.'",
    options: ["de", "à", "que", "pour"],
    correct: "de",
    explanation: "Regretter + de + infinitif",
    category: "Prépositions"
  },
  {
    id: 4,
    question: "Choisissez: 'Le livre _____ par des millions de personnes.'",
    options: ["est lu", "a été lu", "était lu", "sera lu"],
    correct: "est lu",
    explanation: "Présent passif pour une action habituelle",
    category: "Voix Passive"
  },
  {
    id: 5,
    question: "Complétez: 'Il a suggéré _____ au cinéma.'",
    options: ["aller", "d'aller", "que nous allions", "d'être allé"],
    correct: "d'aller",
    explanation: "Suggérer + de + infinitif",
    category: "Infinitif"
  },
  {
    id: 6,
    question: "Quelle est correcte: 'Je suis habitué _____ tôt.'",
    options: ["me lever", "à me lever", "de me lever", "me lever"],
    correct: "à me lever",
    explanation: "Être habitué à + infinitif",
    category: "Habitudes"
  },
  {
    id: 7,
    question: "Choisissez: 'La réunion _____ demain à 15h.'",
    options: ["commence", "va commencer", "commencera", "est en train de commencer"],
    correct: "va commencer",
    explanation: "Futur proche pour un événement planifié",
    category: "Futur"
  },
  {
    id: 8,
    question: "Complétez: 'Je préfère _____ à la maison ce soir.'",
    options: ["rester", "de rester", "que je reste", "rester"],
    correct: "rester",
    explanation: "Préférer + infinitif",
    category: "Préférences"
  },
  {
    id: 9,
    question: "Quelle est correcte: 'Le temps _____ pire.'",
    options: ["devient", "est en train de devenir", "va devenir", "deviendra"],
    correct: "devient",
    explanation: "Présent pour un changement progressif",
    category: "Présent"
  },
  {
    id: 10,
    question: "Choisissez: 'Elle _____ ses devoirs quand j'ai appelé.'",
    options: ["faisait", "a fait", "avait fait", "faisait"],
    correct: "faisait",
    explanation: "Imparfait pour une action en cours interrompue",
    category: "Imparfait"
  },
  {
    id: 11,
    question: "Complétez: 'Je _____ à Paris trois fois.'",
    options: ["suis allé", "allais", "irai", "vais"],
    correct: "suis allé",
    explanation: "Passé composé pour une expérience de vie",
    category: "Passé Composé"
  },
  {
    id: 12,
    question: "Quelle est correcte: 'La maison _____ l'année dernière.'",
    options: ["a été construite", "était construite", "sera construite", "est construite"],
    correct: "a été construite",
    explanation: "Passé composé passif pour une action terminée",
    category: "Voix Passive"
  },
  {
    id: 13,
    question: "Choisissez: 'Je ne peux pas m'empêcher _____ y penser.'",
    options: ["de", "à", "que", "pour"],
    correct: "de",
    explanation: "Ne pas pouvoir s'empêcher de + infinitif",
    category: "Prépositions"
  },
  {
    id: 14,
    question: "Complétez: 'Si j'_____ la loterie, je voyagerais le monde.'",
    options: ["gagne", "gagnais", "gagnerai", "gagnerais"],
    correct: "gagnais",
    explanation: "Conditionnel: si + imparfait",
    category: "Conditionnel"
  },
  {
    id: 15,
    question: "Quelle est correcte: 'La lettre _____ hier.'",
    options: ["arrive", "est arrivée", "arrivait", "arrivera"],
    correct: "est arrivée",
    explanation: "Passé composé pour une action terminée dans le passé",
    category: "Passé Composé"
  },
  {
    id: 16,
    question: "Choisissez: 'J'ai hâte _____ vous voir.'",
    options: ["de", "à", "que", "pour"],
    correct: "de",
    explanation: "Avoir hâte de + infinitif",
    category: "Prépositions"
  },
  {
    id: 17,
    question: "Complétez: 'Elle _____ ses clés depuis hier.'",
    options: ["perd", "a perdu", "perdait", "perdra"],
    correct: "a perdu",
    explanation: "Passé composé pour une action avec résultat présent",
    category: "Passé Composé"
  },
  {
    id: 18,
    question: "Quelle est correcte: 'Le travail _____ demain.'",
    options: ["finit", "va finir", "sera fini", "est en train de finir"],
    correct: "sera fini",
    explanation: "Futur passif pour une action terminée dans le futur",
    category: "Voix Passive"
  },
  {
    id: 19,
    question: "Choisissez: 'Je regrette _____ vous avoir dit la vérité.'",
    options: ["de", "à", "que", "pour"],
    correct: "de",
    explanation: "Regretter + de + infinitif passé",
    category: "Prépositions"
  },
  {
    id: 20,
    question: "Complétez: 'Si j'_____ plus dur, j'aurais réussi.'",
    options: ["étudiais", "avais étudié", "étudierai", "étudierais"],
    correct: "avais étudié",
    explanation: "Conditionnel passé: si + plus-que-parfait",
    category: "Conditionnel"
  }
]

export default function FrenchGrammarLevel2Page() {
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes for grammar
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
    setTimeLeft(120)
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
    setTimeLeft(120)
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
    }, 2000) // More time to read explanation
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
                  {t('games.french.grammar.title')} - {t('games.levels.intermediate')}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('games.french.grammar.description')}
                </p>
              </div>
            </div>

            {/* Game Info */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <span className="font-semibold text-indigo-800 dark:text-indigo-200">Temps</span>
                </div>
                <p className="text-indigo-600 dark:text-indigo-300">2 minutes</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800 dark:text-blue-200">Questions</span>
                </div>
                <p className="text-blue-600 dark:text-blue-300">{grammarQuestions.length} questions</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800 dark:text-purple-200">Score</span>
                </div>
                <p className="text-purple-600 dark:text-purple-300">Jusqu'à {grammarQuestions.length} points</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                Instructions:
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                  <span className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0"></span>
                  Lisez la question attentivement
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                  <span className="w-1 h-1 bg-green-500 rounded-full flex-shrink-0"></span>
                  Choisissez la bonne réponse
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                  <span className="w-1 h-1 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  Vous avez 2 minutes pour terminer le jeu
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                  <span className="w-1 h-1 bg-purple-500 rounded-full flex-shrink-0"></span>
                  Vous gagnez 1 point pour chaque bonne réponse
                </div>
              </div>
            </div>

            {/* Start Button */}
            <motion.button
              onClick={startGame}
              className="w-full py-4 px-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
                  Grammaire - Niveau 2
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
