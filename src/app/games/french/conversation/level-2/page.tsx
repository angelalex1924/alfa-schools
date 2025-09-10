"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Clock, Star, Trophy, RotateCcw, Home, MessageCircle } from "lucide-react"

// Intermediate conversation scenarios for level 2
const conversationScenarios = [
  {
    id: 1,
    scenario: "Vous êtes en entretien d'embauche et on vous demande vos faiblesses. Comment répondez-vous professionnellement ?",
    options: [
      "Je n'ai aucune faiblesse",
      "Je prends parfois trop de projets, mais j'apprends à mieux prioriser",
      "Je suis toujours en retard au travail",
      "Je déteste travailler avec d'autres personnes"
    ],
    correct: "Je prends parfois trop de projets, mais j'apprends à mieux prioriser",
    explanation: "En entretien, montrez de la conscience de soi et de la croissance en mentionnant une faiblesse sur laquelle vous travaillez activement.",
    category: "Entretiens d'embauche"
  },
  {
    id: 2,
    scenario: "Vous devez décliner une invitation à une fête parce que vous êtes occupé. Comment refusez-vous poliment ?",
    options: [
      "Je ne peux pas venir, je suis trop occupé",
      "Merci pour l'invitation, mais je ne pourrai pas venir cette fois. J'espère que vous passerez une excellente soirée !",
      "Je ne veux pas venir",
      "Peut-être la prochaine fois, mais probablement pas"
    ],
    correct: "Merci pour l'invitation, mais je ne pourrai pas venir cette fois. J'espère que vous passerez une excellente soirée !",
    explanation: "Quand on décline une invitation, on est poli, on exprime sa gratitude et on leur souhaite du bon temps.",
    category: "Situations sociales"
  },
  {
    id: 3,
    scenario: "Vous donnez une présentation et quelqu'un pose une question à laquelle vous ne savez pas répondre. Comment réagissez-vous ?",
    options: [
      "Je ne sais pas, demandez à quelqu'un d'autre",
      "C'est une excellente question. Je n'ai pas cette information maintenant, mais je vais me renseigner et vous recontacter",
      "Je ne suis pas sûr, mais je pense que c'est probablement quelque chose",
      "Ce n'est pas important"
    ],
    correct: "C'est une excellente question. Je n'ai pas cette information maintenant, mais je vais me renseigner et vous recontacter",
    explanation: "Quand on ne sait pas quelque chose, on reconnaît la question, on admet qu'on ne sait pas et on propose de faire un suivi.",
    category: "Communication professionnelle"
  },
  {
    id: 4,
    scenario: "Vous voulez négocier votre salaire avec votre patron. Comment abordez-vous cela professionnellement ?",
    options: [
      "Je veux plus d'argent ou je pars",
      "J'aimerais discuter de ma rémunération. Basé sur mes performances et mes recherches de marché, je pense qu'une révision de salaire serait appropriée",
      "Donnez-moi une augmentation ou je démissionne",
      "J'ai besoin de plus d'argent parce que je suis fauché"
    ],
    correct: "J'aimerais discuter de ma rémunération. Basé sur mes performances et mes recherches de marché, je pense qu'une révision de salaire serait appropriée",
    explanation: "Les négociations salariales doivent être professionnelles, basées sur les performances et les données de marché, pas sur les besoins personnels.",
    category: "Communication professionnelle"
  },
  {
    id: 5,
    scenario: "Vous êtes dans un restaurant et la nourriture est froide. Comment vous plaignez-vous poliment ?",
    options: [
      "Cette nourriture est terrible !",
      "Excusez-moi, je pense que ma nourriture est peut-être devenue froide. Pourriez-vous la réchauffer, s'il vous plaît ?",
      "Je veux mon argent tout de suite !",
      "C'est dégoûtant !"
    ],
    correct: "Excusez-moi, je pense que ma nourriture est peut-être devenue froide. Pourriez-vous la réchauffer, s'il vous plaît ?",
    explanation: "Quand on se plaint, on est poli, on est spécifique sur le problème et on suggère une solution.",
    category: "Service client"
  },
  {
    id: 6,
    scenario: "Vous devez demander à un collègue de couvrir votre service. Comment faites-vous cette demande ?",
    options: [
      "Tu dois travailler pour moi demain",
      "Serais-tu capable de couvrir mon service demain ? J'ai une urgence familiale et j'apprécierais vraiment",
      "Je ne peux pas travailler demain, donc tu dois le faire",
      "Demain, c'est ton problème maintenant"
    ],
    correct: "Serais-tu capable de couvrir mon service demain ? J'ai une urgence familiale et j'apprécierais vraiment",
    explanation: "Quand on demande des faveurs, on est poli, on explique la raison et on exprime sa gratitude.",
    category: "Communication au travail"
  },
  {
    id: 7,
    scenario: "Vous donnez des commentaires à un membre de l'équipe dont le travail a besoin d'amélioration. Comment abordez-vous cela ?",
    options: [
      "Ton travail est terrible et tu dois faire mieux",
      "J'ai remarqué quelques domaines où nous pourrions nous améliorer. Discutons de comment je peux t'aider à développer ces compétences",
      "Tu n'es pas bon dans ton travail",
      "Je n'aime pas ton travail"
    ],
    correct: "J'ai remarqué quelques domaines où nous pourrions nous améliorer. Discutons de comment je peux t'aider à développer ces compétences",
    explanation: "Les commentaires constructifs doivent être spécifiques, encourageants et axés sur l'amélioration plutôt que sur la critique.",
    category: "Communication professionnelle"
  },
  {
    id: 8,
    scenario: "Vous êtes à un événement de réseautage et vous voulez vous présenter à quelqu'un d'important. Comment les abordez-vous ?",
    options: [
      "Salut, je cherche un emploi",
      "Bonjour, je suis [Nom]. J'ai remarqué que vous travaillez chez [Entreprise]. J'aimerais en savoir plus sur votre rôle là-bas",
      "Pouvez-vous me donner un emploi ?",
      "Je dois vous parler d'affaires"
    ],
    correct: "Bonjour, je suis [Nom]. J'ai remarqué que vous travaillez chez [Entreprise]. J'aimerais en savoir plus sur votre rôle là-bas",
    explanation: "Les présentations de réseautage doivent être professionnelles, montrer un intérêt sincère et éviter d'être trop direct sur la recherche d'emploi.",
    category: "Réseautage"
  },
  {
    id: 9,
    scenario: "Vous devez vous excuser auprès d'un client pour une erreur de votre entreprise. Comment gérez-vous cela professionnellement ?",
    options: [
      "Désolé, mais ce n'est pas vraiment de notre faute",
      "Je m'excuse sincèrement pour les inconvénients que cela a causés. Nous prenons des mesures immédiates pour résoudre ce problème et empêcher que cela se reproduise",
      "Les erreurs arrivent, acceptez-le",
      "Je suis désolé, mais ces choses arrivent"
    ],
    correct: "Je m'excuse sincèrement pour les inconvénients que cela a causés. Nous prenons des mesures immédiates pour résoudre ce problème et empêcher que cela se reproduise",
    explanation: "Les excuses professionnelles doivent être sincères, reconnaître l'impact et montrer ce que vous faites pour résoudre le problème.",
    category: "Service client"
  },
  {
    id: 10,
    scenario: "Vous voulez suggérer une nouvelle idée à votre équipe. Comment la présentez-vous efficacement ?",
    options: [
      "J'ai une idée et vous devriez tous écouter",
      "J'aimerais partager une idée à laquelle je pense. Je crois qu'elle pourrait nous aider à améliorer [domaine spécifique]. Qu'en pensez-vous tous ?",
      "Mon idée est meilleure que la vôtre",
      "Vous devriez faire ce que je dis"
    ],
    correct: "J'aimerais partager une idée à laquelle je pense. Je crois qu'elle pourrait nous aider à améliorer [domaine spécifique]. Qu'en pensez-vous tous ?",
    explanation: "Présenter des idées doit être collaboratif, spécifique sur les avantages et inviter à la discussion.",
    category: "Communication d'équipe"
  },
  {
    id: 11,
    scenario: "Vous êtes dans une réunion et quelqu'un vous interrompt constamment. Comment gérez-vous cela professionnellement ?",
    options: [
      "Arrêtez de m'interrompre !",
      "J'apprécie votre contribution, et j'aimerais finir mon point d'abord, puis nous pourrons discuter de vos pensées",
      "Vous êtes impoli",
      "Je parle, taisez-vous"
    ],
    correct: "J'apprécie votre contribution, et j'aimerais finir mon point d'abord, puis nous pourrons discuter de vos pensées",
    explanation: "Gérez les interruptions professionnellement en reconnaissant leur contribution tout en affirmant votre besoin de finir votre point.",
    category: "Communication professionnelle"
  },
  {
    id: 12,
    scenario: "Vous devez demander une extension de délai pour un projet. Comment faites-vous cette demande ?",
    options: [
      "J'ai besoin de plus de temps, donnez-moi une extension",
      "J'aimerais demander une extension de délai. J'ai rencontré des défis inattendus et je veux m'assurer de la qualité du livrable final",
      "Le délai est trop court, changez-le",
      "Je ne peux pas finir à temps, alors prolongez-le"
    ],
    correct: "J'aimerais demander une extension de délai. J'ai rencontré des défis inattendus et je veux m'assurer de la qualité du livrable final",
    explanation: "Quand on demande des extensions, on est professionnel, on explique la raison et on met l'accent sur son engagement envers la qualité.",
    category: "Communication au travail"
  },
  {
    id: 13,
    scenario: "Vous êtes à une conférence et vous voulez poser une question pendant la Q&A. Comment formulez-vous votre question professionnellement ?",
    options: [
      "J'ai une question",
      "Merci pour votre présentation. Je me demandais si vous pourriez élaborer sur [point spécifique] et comment cela pourrait s'appliquer à [situation spécifique] ?",
      "Pouvez-vous expliquer cela mieux ?",
      "Je ne comprends pas ce que vous avez dit"
    ],
    correct: "Merci pour votre présentation. Je me demandais si vous pourriez élaborer sur [point spécifique] et comment cela pourrait s'appliquer à [situation spécifique] ?",
    explanation: "Les questions professionnelles doivent être spécifiques, montrer qu'on a écouté et démontrer comment on applique l'information.",
    category: "Communication professionnelle"
  },
  {
    id: 14,
    scenario: "Vous devez décliner un projet parce que vous êtes déjà surchargé. Comment dites-vous non professionnellement ?",
    options: [
      "Je ne peux pas le faire, je suis trop occupé",
      "J'apprécie que vous pensiez à moi pour ce projet. Malheureusement, je suis actuellement à capacité avec ma charge de travail actuelle, mais je serais heureux d'aider à l'avenir",
      "Non, je ne veux pas le faire",
      "Demandez à quelqu'un d'autre, je suis occupé"
    ],
    correct: "J'apprécie que vous pensiez à moi pour ce projet. Malheureusement, je suis actuellement à capacité avec ma charge de travail actuelle, mais je serais heureux d'aider à l'avenir",
    explanation: "Quand on décline du travail, on montre de l'appréciation, on explique sa situation et on laisse la porte ouverte pour de futures opportunités.",
    category: "Communication au travail"
  },
  {
    id: 15,
    scenario: "Vous dirigez une réunion d'équipe et vous devez aborder un conflit entre membres de l'équipe. Comment gérez-vous cela ?",
    options: [
      "Arrêtez de vous battre et retournez au travail",
      "J'aimerais aborder la tension récente dans notre équipe. Ayons une discussion ouverte sur nos préoccupations et trouvons un moyen de travailler ensemble efficacement",
      "Vous deux devez résoudre cela vous-mêmes",
      "Je ne veux pas entendre parler de vos problèmes"
    ],
    correct: "J'aimerais aborder la tension récente dans notre équipe. Ayons une discussion ouverte sur nos préoccupations et trouvons un moyen de travailler ensemble efficacement",
    explanation: "Aborder les conflits d'équipe doit se faire professionnellement, encourager la communication ouverte et se concentrer sur les solutions.",
    category: "Leadership"
  },
  {
    id: 16,
    scenario: "Vous voulez demander plus de responsabilités à votre manager. Comment abordez-vous cette conversation ?",
    options: [
      "Je veux une promotion",
      "J'aimerais discuter des opportunités de croissance dans mon rôle. Je me sens prêt à prendre plus de responsabilités et j'apprécierais vos conseils sur comment progresser",
      "Donnez-moi plus de travail à faire",
      "Je mérite une meilleure position"
    ],
    correct: "J'aimerais discuter des opportunités de croissance dans mon rôle. Je me sens prêt à prendre plus de responsabilités et j'apprécierais vos conseils sur comment progresser",
    explanation: "Demander plus de responsabilités doit être encadré comme croissance et développement, pas seulement vouloir plus de travail ou de promotion.",
    category: "Développement de carrière"
  },
  {
    id: 17,
    scenario: "Vous devez donner de mauvaises nouvelles à un client concernant un retard de projet. Comment communiquez-vous cela professionnellement ?",
    options: [
      "Le projet est en retard, acceptez-le",
      "Je dois vous informer d'un retard dans le calendrier du projet. Voici ce qui s'est passé et voici notre plan pour revenir sur la bonne voie",
      "Désolé, mais ce n'est pas de ma faute",
      "Le projet sera en retard, c'est comme ça"
    ],
    correct: "Je dois vous informer d'un retard dans le calendrier du projet. Voici ce qui s'est passé et voici notre plan pour revenir sur la bonne voie",
    explanation: "Quand on donne de mauvaises nouvelles, on est direct, on explique la situation et on fournit une solution ou un plan d'action.",
    category: "Communication client"
  },
  {
    id: 18,
    scenario: "Vous êtes en entretien d'embauche et on vous demande pourquoi vous avez quitté votre emploi précédent. Comment répondez-vous professionnellement ?",
    options: [
      "Je détestais mon patron",
      "Je cherchais de nouveaux défis et des opportunités de croissance dans ma carrière, c'est pourquoi je suis enthousiaste à propos de ce poste",
      "Le salaire était trop bas",
      "Je n'aimais pas le travail"
    ],
    correct: "Je cherchais de nouveaux défis et des opportunités de croissance dans ma carrière, c'est pourquoi je suis enthousiaste à propos de ce poste",
    explanation: "Quand on discute des changements d'emploi, on se concentre sur des raisons positives comme la croissance et les nouvelles opportunités, pas sur les aspects négatifs des emplois précédents.",
    category: "Entretiens d'embauche"
  },
  {
    id: 19,
    scenario: "Vous devez demander à un collègue de vous aider avec une tâche. Comment faites-vous cette demande efficacement ?",
    options: [
      "Tu dois m'aider avec ceci",
      "Je me demandais si tu pourrais m'aider avec [tâche spécifique]. Je sais que tu as de l'expérience avec cela et j'apprécierais vraiment ton avis",
      "Peux-tu faire ceci pour moi ?",
      "J'ai besoin que tu m'aides maintenant"
    ],
    correct: "Je me demandais si tu pourrais m'aider avec [tâche spécifique]. Je sais que tu as de l'expérience avec cela et j'apprécierais vraiment ton avis",
    explanation: "Quand on demande de l'aide, on est spécifique sur ce dont on a besoin, on reconnaît leur expertise et on exprime sa gratitude.",
    category: "Communication au travail"
  },
  {
    id: 20,
    scenario: "Vous donnez une présentation et la technologie tombe en panne. Comment gérez-vous cela professionnellement ?",
    options: [
      "C'est terrible, je ne peux pas présenter sans diapositives",
      "Il semble que nous ayons des difficultés techniques. Laissez-moi continuer avec les points clés pendant que nous travaillons à résoudre cela",
      "Je ne peux pas faire ceci sans ma présentation",
      "La technologie est cassée, donc nous avons terminé"
    ],
    correct: "Il semble que nous ayons des difficultés techniques. Laissez-moi continuer avec les points clés pendant que nous travaillons à résoudre cela",
    explanation: "Quand la technologie tombe en panne, on reste calme, on reconnaît le problème et on s'adapte en continuant avec son contenu tout en travaillant sur une solution.",
    category: "Communication professionnelle"
  }
]

export default function FrenchConversationLevel2Page() {
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes for intermediate
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
    setTimeLeft(120)
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
    setTimeLeft(120)
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
    }, 2000) // More time for intermediate level
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
                  {t('games.french.conversation.title')} - {t('games.levels.intermediate')}
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
                <p className="text-emerald-600 dark:text-emerald-300">2 minutes</p>
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
                    Vous avez 2 minutes pour terminer le jeu
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
                  Conversation - Niveau 2
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
