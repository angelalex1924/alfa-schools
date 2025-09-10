"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Clock, Star, Trophy, RotateCcw, Home, MessageCircle } from "lucide-react"

// Basic conversation scenarios for level 1
const conversationScenarios = [
  {
    id: 1,
    scenario: "Vous rencontrez quelqu'un pour la première fois. Que dites-vous ?",
    options: ["Bonjour, comment allez-vous ?", "Au revoir, à bientôt", "Merci beaucoup", "Je ne sais pas"],
    correct: "Bonjour, comment allez-vous ?",
    explanation: "Quand on rencontre quelqu'un pour la première fois, on le salue poliment et on demande comment il va.",
    category: "Salutations"
  },
  {
    id: 2,
    scenario: "Quelqu'un vous offre un cadeau. Comment réagissez-vous ?",
    options: ["De rien", "Merci beaucoup !", "Je suis désolé", "C'est d'accord"],
    correct: "Merci beaucoup !",
    explanation: "Quand quelqu'un vous offre un cadeau, vous devez exprimer votre gratitude avec 'Merci'.",
    category: "Gratitude"
  },
  {
    id: 3,
    scenario: "Vous devez demander votre chemin. Que dites-vous ?",
    options: ["Excusez-moi, où est la bibliothèque ?", "Je vais bien, merci", "Enchanté de vous rencontrer", "À demain"],
    correct: "Excusez-moi, où est la bibliothèque ?",
    explanation: "Quand on demande son chemin, on commence par 'Excusez-moi' pour être poli, puis on pose sa question.",
    category: "Demander de l'aide"
  },
  {
    id: 4,
    scenario: "Vous voulez commander de la nourriture dans un restaurant. Que dites-vous ?",
    options: ["Je voudrais une pizza, s'il vous plaît", "Je n'ai pas faim", "Il fait beau", "Je viens de Grèce"],
    correct: "Je voudrais une pizza, s'il vous plaît",
    explanation: "Quand on commande de la nourriture, on utilise 'Je voudrais' suivi de l'article et 's'il vous plaît'.",
    category: "Commander de la nourriture"
  },
  {
    id: 5,
    scenario: "Vous êtes en retard à une réunion. Comment vous excusez-vous ?",
    options: ["Je suis désolé d'être en retard", "De rien", "Enchanté de vous rencontrer", "Bonne journée"],
    correct: "Je suis désolé d'être en retard",
    explanation: "Quand on est en retard, on s'excuse en disant 'Je suis désolé d'être en retard'.",
    category: "S'excuser"
  },
  {
    id: 6,
    scenario: "Vous voulez vous présenter. Que dites-vous ?",
    options: ["Salut, je suis Marie", "Au revoir tout le monde", "Merci d'être venu", "Je ne comprends pas"],
    correct: "Salut, je suis Marie",
    explanation: "Quand on se présente, on dit 'Salut, je suis [votre nom]' ou 'Bonjour, je m'appelle [votre nom]'.",
    category: "Se présenter"
  },
  {
    id: 7,
    scenario: "Quelqu'un demande 'Comment allez-vous ?' Comment répondez-vous ?",
    options: ["Je vais bien, merci. Et vous ?", "Je suis désolé", "De rien", "Enchanté de vous rencontrer"],
    correct: "Je vais bien, merci. Et vous ?",
    explanation: "Quand quelqu'un demande comment vous allez, répondez poliment et demandez-leur en retour avec 'Et vous ?'.",
    category: "Petite conversation"
  },
  {
    id: 8,
    scenario: "Vous voulez acheter quelque chose dans un magasin. Que dites-vous ?",
    options: ["Combien coûte ceci ?", "Je viens d'Athènes", "Il fait beau", "Je ne parle pas français"],
    correct: "Combien coûte ceci ?",
    explanation: "Quand on fait du shopping, on demande le prix avec 'Combien coûte ceci ?' ou 'Combien ça coûte ?'.",
    category: "Shopping"
  },
  {
    id: 9,
    scenario: "Vous ne comprenez pas quelque chose. Comment demandez-vous des clarifications ?",
    options: ["Pouvez-vous répéter, s'il vous plaît ?", "Je vais bien, merci", "Enchanté de vous rencontrer", "À bientôt"],
    correct: "Pouvez-vous répéter, s'il vous plaît ?",
    explanation: "Quand on ne comprend pas, on demande poliment de répéter avec 'Pouvez-vous répéter, s'il vous plaît ?'.",
    category: "Demander de l'aide"
  },
  {
    id: 10,
    scenario: "Vous voulez terminer un appel téléphonique poliment. Que dites-vous ?",
    options: ["Je dois y aller maintenant. À bientôt !", "Bonjour, comment allez-vous ?", "Merci beaucoup", "Je suis désolé"],
    correct: "Je dois y aller maintenant. À bientôt !",
    explanation: "Quand on termine un appel téléphonique, on explique pourquoi on doit partir et on dit au revoir poliment.",
    category: "Conversations téléphoniques"
  },
  {
    id: 11,
    scenario: "Quelqu'un vous aide. Comment réagissez-vous ?",
    options: ["Merci pour votre aide", "De rien", "Je suis désolé", "Enchanté de vous rencontrer"],
    correct: "Merci pour votre aide",
    explanation: "Quand quelqu'un vous aide, exprimez votre gratitude avec 'Merci pour votre aide' ou 'Merci de m'avoir aidé'.",
    category: "Gratitude"
  },
  {
    id: 12,
    scenario: "Vous voulez faire une réservation dans un restaurant. Que dites-vous ?",
    options: ["Je voudrais faire une réservation pour deux personnes", "Je n'ai pas faim", "La nourriture est délicieuse", "Je viens de Grèce"],
    correct: "Je voudrais faire une réservation pour deux personnes",
    explanation: "Quand on fait une réservation, on dit 'Je voudrais faire une réservation pour [nombre] personnes'.",
    category: "Faire des réservations"
  },
  {
    id: 13,
    scenario: "Vous bousculez accidentellement quelqu'un. Comment vous excusez-vous ?",
    options: ["Je suis désolé, excusez-moi", "De rien", "Enchanté de vous rencontrer", "Merci beaucoup"],
    correct: "Je suis désolé, excusez-moi",
    explanation: "Quand on bouscule accidentellement quelqu'un, on s'excuse avec 'Je suis désolé' ou 'Excusez-moi'.",
    category: "S'excuser"
  },
  {
    id: 14,
    scenario: "Vous voulez demander le nom de quelqu'un. Que dites-vous ?",
    options: ["Comment vous appelez-vous ?", "Je vais bien, merci", "Enchanté de vous rencontrer", "À demain"],
    correct: "Comment vous appelez-vous ?",
    explanation: "Pour demander le nom de quelqu'un, on dit simplement 'Comment vous appelez-vous ?' ou 'Quel est votre nom ?'.",
    category: "Obtenir des informations"
  },
  {
    id: 15,
    scenario: "Vous voulez faire un compliment à quelqu'un. Que dites-vous ?",
    options: ["Vous avez l'air très bien aujourd'hui !", "Je suis désolé", "De rien", "Je ne comprends pas"],
    correct: "Vous avez l'air très bien aujourd'hui !",
    explanation: "Quand on fait des compliments, on est spécifique et positif, comme 'Vous avez l'air très bien !' ou 'C'est une belle chemise !'.",
    category: "Compliments"
  }
]

export default function FrenchConversationLevel1Page() {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
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
                  {t('games.french.conversation.title')} - {t('games.levels.basic')}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('games.french.conversation.description')}
                </p>
              </div>
            </div>

            {/* Game Info */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-emerald-800 dark:text-emerald-200">Temps</span>
                </div>
                <p className="text-emerald-600 dark:text-emerald-300">1.5 minutes</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800 dark:text-blue-200">Scénarios</span>
                </div>
                <p className="text-blue-600 dark:text-blue-300">{conversationScenarios.length} scénarios</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800 dark:text-purple-200">Score</span>
                </div>
                <p className="text-purple-600 dark:text-purple-300">Jusqu'à {conversationScenarios.length} points</p>
              </div>
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
                    Lisez le scénario attentivement
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Choisissez la réponse la plus appropriée
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Vous avez 1.5 minutes pour terminer le jeu
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
    const percentage = Math.round((score / conversationScenarios.length) * 100)
    const isExcellent = percentage >= 90
    const isGood = percentage >= 70
    const isPass = percentage >= 50

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
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
                Score: {score}/{conversationScenarios.length} ({percentage}%)
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
                className="flex-1 py-3 px-6 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
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
                  Conversation - Niveau 1
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Scénario {currentScenarioIndex + 1} / {conversationScenarios.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{score}</div>
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
              className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full"
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
                <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 text-sm font-medium rounded-full">
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
                  {isCorrect ? "Correct! 🎉" : `Incorrect! La bonne réponse est: ${currentScenario.correct}`}
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <p className="text-sm text-emerald-800 dark:text-emerald-200">
                    <strong>Explication:</strong> {currentScenario.explanation}
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
