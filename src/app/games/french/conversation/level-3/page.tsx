"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Clock, Star, Trophy, RotateCcw, Home, MessageCircle } from "lucide-react"

// Advanced conversation scenarios for level 3
const conversationScenarios = [
  {
    id: 1,
    scenario: "Vous êtes dans une négociation à haut risque et l'autre partie utilise des tactiques agressives. Comment maintenez-vous le professionnalisme tout en protégeant vos intérêts ?",
    options: [
      "Je comprends votre position, et j'aimerais explorer une solution qui répond aux préoccupations des deux parties. Concentrons-nous sur la recherche d'un terrain d'entente",
      "Vous êtes déraisonnable et je n'accepterai pas cela",
      "D'accord, je vais accepter tout ce que vous voulez",
      "C'est ridicule, je pars"
    ],
    correct: "Je comprends votre position, et j'aimerais explorer une solution qui répond aux préoccupations des deux parties. Concentrons-nous sur la recherche d'un terrain d'entente",
    explanation: "Dans les négociations difficiles, maintenez le professionnalisme, reconnaissez leur position et redirigez vers la résolution collaborative de problèmes.",
    category: "Négociation avancée"
  },
  {
    id: 2,
    scenario: "Vous dirigez une réunion de gestion de crise et les membres de l'équipe paniquent. Comment rétablissez-vous le calme et la concentration ?",
    options: [
      "Tout le monde se calme et m'écoute",
      "Je comprends que c'est stressant pour tout le monde. Prenons du recul, évaluons la situation objectivement et travaillons à travers cela systématiquement",
      "Arrêtez de paniquer, ce n'est pas si grave",
      "Je ne sais pas quoi faire non plus"
    ],
    correct: "Je comprends que c'est stressant pour tout le monde. Prenons du recul, évaluons la situation objectivement et travaillons à travers cela systématiquement",
    explanation: "Dans les situations de crise, reconnaissez les émotions, fournissez de la structure et guidez l'équipe vers la résolution systématique de problèmes.",
    category: "Leadership de crise"
  },
  {
    id: 3,
    scenario: "Vous devez donner des commentaires difficiles à un cadre supérieur sur son style de management. Comment abordez-vous cela diplomatiquement ?",
    options: [
      "Votre style de management cause des problèmes et doit changer",
      "J'aimerais partager quelques observations sur la dynamique d'équipe qui pourraient valoir la peine d'être discutées. J'ai remarqué des modèles qui pourraient affecter notre efficacité",
      "Les gens n'aiment pas travailler pour vous",
      "Vous devez être plus gentil avec vos employés"
    ],
    correct: "J'aimerais partager quelques observations sur la dynamique d'équipe qui pourraient valoir la peine d'être discutées. J'ai remarqué des modèles qui pourraient affecter notre efficacité",
    explanation: "Quand on donne des commentaires aux supérieurs, on les encadre comme observations sur les systèmes et les résultats plutôt que comme critique personnelle.",
    category: "Communication exécutive"
  },
  {
    id: 4,
    scenario: "Vous êtes dans une réunion de conseil et vous devez présenter une proposition controversée. Comment gérez-vous la résistance potentielle professionnellement ?",
    options: [
      "Je sais que certains d'entre vous n'aimeront pas cela, mais c'est la bonne chose à faire",
      "J'aimerais présenter une proposition qui répond à nos défis actuels. J'anticipe qu'il pourrait y avoir des préoccupations, alors j'ai préparé une analyse détaillée et j'accueillerais vos questions",
      "C'est la seule solution, donc vous devez l'approuver",
      "Je me fiche de ce que vous pensez, cela se passe"
    ],
    correct: "J'aimerais présenter une proposition qui répond à nos défis actuels. J'anticipe qu'il pourrait y avoir des préoccupations, alors j'ai préparé une analyse détaillée et j'accueillerais vos questions",
    explanation: "Quand on présente des idées controversées, on reconnaît les préoccupations potentielles dès le départ, on fournit une préparation approfondie et on invite à la discussion.",
    category: "Communication de conseil"
  },
  {
    id: 5,
    scenario: "Vous médiez un conflit entre deux membres clés de l'équipe qui menacent tous les deux de démissionner. Comment facilitez-vous la résolution ?",
    options: [
      "Vous deux devez arrêter d'agir comme des enfants et résoudre cela",
      "Je peux voir que cette situation vous affecte tous les deux considérablement. Travaillons ensemble pour comprendre chaque perspective et trouver un chemin qui fonctionne pour tout le monde",
      "L'un de vous doit s'excuser",
      "Je n'ai pas le temps pour ce drame"
    ],
    correct: "Je peux voir que cette situation vous affecte tous les deux considérablement. Travaillons ensemble pour comprendre chaque perspective et trouver un chemin qui fonctionne pour tout le monde",
    explanation: "En médiation, reconnaissez l'impact sur toutes les parties, créez un espace sûr pour le dialogue et concentrez-vous sur les solutions collaboratives.",
    category: "Résolution de conflit"
  },
  {
    id: 6,
    scenario: "Vous devez communiquer un changement organisationnel majeur qui affectera négativement de nombreux employés. Comment livrez-vous ce message avec empathie ?",
    options: [
      "Nous faisons des changements et certaines personnes seront affectées, c'est juste les affaires",
      "Je veux partager des changements importants qui impacteront notre organisation. Je comprends que ce peut être une nouvelle difficile, et je veux m'assurer que nous soutenons tout le monde pendant cette transition",
      "Certains d'entre vous perdront leur emploi, acceptez-le",
      "Le changement est nécessaire, alors acceptez-le"
    ],
    correct: "Je veux partager des changements importants qui impacteront notre organisation. Je comprends que ce peut être une nouvelle difficile, et je veux m'assurer que nous soutenons tout le monde pendant cette transition",
    explanation: "Quand on livre des nouvelles organisationnelles difficiles, on est direct mais empathique, on reconnaît l'impact et on met l'accent sur le soutien pendant la transition.",
    category: "Gestion du changement"
  },
  {
    id: 7,
    scenario: "Vous êtes dans une réunion client à haute pression et ils remettent en question la compétence de votre entreprise. Comment défendez-vous votre organisation tout en maintenant la relation ?",
    options: [
      "Vous avez tort sur notre entreprise et je peux le prouver",
      "J'apprécie que vous souleviez ces préoccupations. Laissez-moi aborder chaque point avec des exemples spécifiques de nos capacités et résultats. Je suis confiant que nous pouvons démontrer notre valeur",
      "Si vous ne nous faites pas confiance, peut-être que nous ne devrions pas travailler ensemble",
      "Notre entreprise est la meilleure, vous ne comprenez tout simplement pas"
    ],
    correct: "J'apprécie que vous souleviez ces préoccupations. Laissez-moi aborder chaque point avec des exemples spécifiques de nos capacités et résultats. Je suis confiant que nous pouvons démontrer notre valeur",
    explanation: "Quand on défend son organisation, on remercie pour les commentaires, on fournit des preuves concrètes et on se concentre sur la démonstration de valeur plutôt que sur l'argumentation.",
    category: "Relations client"
  },
  {
    id: 8,
    scenario: "Vous dirigez une équipe interculturelle et il y a un malentendu dû aux différences culturelles. Comment abordez-vous cela avec sensibilité ?",
    options: [
      "Vous devez vous adapter à notre façon de faire les choses",
      "Je pense que nous avons peut-être un malentendu culturel ici. Prenons un moment pour explorer différentes perspectives et trouver un moyen de travailler ensemble efficacement",
      "Votre culture cause des problèmes",
      "Nous faisons les choses différemment ici, alors changez"
    ],
    correct: "Je pense que nous avons peut-être un malentendu culturel ici. Prenons un moment pour explorer différentes perspectives et trouver un moyen de travailler ensemble efficacement",
    explanation: "Dans les situations interculturelles, reconnaissez le potentiel de malentendu, créez de l'espace pour différentes perspectives et concentrez-vous sur la collaboration.",
    category: "Communication interculturelle"
  },
  {
    id: 9,
    scenario: "Vous devez licencier un employé de longue date pour des problèmes de performance. Comment menez-vous cette conversation difficile avec dignité ?",
    options: [
      "Vous êtes viré parce que vous n'êtes pas assez bon",
      "Je dois discuter de votre statut d'emploi. Cette décision n'a pas été prise à la légère, et je veux m'assurer que vous comprenez les raisons et avez du soutien pendant cette transition",
      "Nous vous laissons partir, faites vos bagages",
      "Votre performance est terrible, donc vous êtes dehors"
    ],
    correct: "Je dois discuter de votre statut d'emploi. Cette décision n'a pas été prise à la légère, et je veux m'assurer que vous comprenez les raisons et avez du soutien pendant cette transition",
    explanation: "Quand on met fin à un emploi, on est direct mais respectueux, on reconnaît la gravité de la décision et on offre du soutien pendant la transition.",
    category: "Conversations difficiles"
  },
  {
    id: 10,
    scenario: "Vous êtes dans une situation de prise de parole en public et le public est clairement désengagé. Comment regagnez-vous leur attention et leur engagement ?",
    options: [
      "Faites attention, c'est important",
      "Je remarque que l'énergie a changé. Laissez-moi faire une pause ici et demander - quelles questions avez-vous sur ce que nous avons couvert jusqu'à présent ?",
      "Si vous n'êtes pas intéressés, vous pouvez partir",
      "C'est ennuyeux, je sais, mais écoutez quand même"
    ],
    correct: "Je remarque que l'énergie a changé. Laissez-moi faire une pause ici et demander - quelles questions avez-vous sur ce que nous avons couvert jusqu'à présent ?",
    explanation: "Quand on perd l'engagement du public, on reconnaît le changement, on fait une pause pour l'interaction et on invite à la participation pour les réengager.",
    category: "Prise de parole en public"
  },
  {
    id: 11,
    scenario: "Vous traitez avec un client qui menace d'action en justice à cause d'un malentendu. Comment désescaladez-vous tout en protégeant votre organisation ?",
    options: [
      "Allez-y et poursuivez-nous, nous gagnerons",
      "Je comprends que vous êtes frustré, et je veux résoudre cette situation. Laissez-moi examiner les détails et travailler avec vous pour trouver une solution qui répond à vos préoccupations",
      "Vous réagissez de manière excessive, ce n'est pas grave",
      "Nous n'avons rien fait de mal, donc il n'y a rien à discuter"
    ],
    correct: "Je comprends que vous êtes frustré, et je veux résoudre cette situation. Laissez-moi examiner les détails et travailler avec vous pour trouver une solution qui répond à vos préoccupations",
    explanation: "Quand on fait face à une action en justice potentielle, on reconnaît leur frustration, on exprime l'engagement envers la résolution et on se concentre sur la résolution collaborative de problèmes.",
    category: "Communication de crise"
  },
  {
    id: 12,
    scenario: "Vous dirigez une équipe à travers un échec de projet majeur. Comment maintenez-vous le moral tout en assurant la responsabilité ?",
    options: [
      "Cet échec est inacceptable et quelqu'un doit être tenu responsable",
      "Ce résultat n'est pas ce que nous voulions, mais c'est une opportunité d'apprendre. Analysons ce qui s'est passé, identifions les leçons apprises et appliquons-les aux projets futurs",
      "Nous avons échoué parce que les gens n'ont pas fait leur travail",
      "C'est un désastre et je ne sais pas comment le réparer"
    ],
    correct: "Ce résultat n'est pas ce que nous voulions, mais c'est une opportunité d'apprendre. Analysons ce qui s'est passé, identifions les leçons apprises et appliquons-les aux projets futurs",
    explanation: "Après les échecs de projet, reconnaissez la déception, recadrez comme opportunité d'apprentissage et concentrez-vous sur l'amélioration systématique.",
    category: "Leadership dans l'échec"
  },
  {
    id: 13,
    scenario: "Vous êtes dans une réunion avec des investisseurs et ils remettent en question les projections financières de votre entreprise. Comment répondez-vous avec confiance tout en étant transparent ?",
    options: [
      "Nos projections sont exactes et vous devriez nous faire confiance",
      "J'apprécie vos questions sur nos projections. Laissez-moi vous expliquer notre méthodologie et les hypothèses derrière ces chiffres, et je suis heureux de discuter de toute préoccupation",
      "Si vous ne croyez pas nos chiffres, n'investissez pas",
      "Les projections sont ce qu'elles sont, prenez-les ou laissez-les"
    ],
    correct: "J'apprécie vos questions sur nos projections. Laissez-moi vous expliquer notre méthodologie et les hypothèses derrière ces chiffres, et je suis heureux de discuter de toute préoccupation",
    explanation: "Quand on fait face au contrôle des investisseurs, on accueille les questions, on fournit une méthodologie transparente et on invite à une discussion plus approfondie pour construire la confiance.",
    category: "Relations investisseurs"
  },
  {
    id: 14,
    scenario: "Vous traitez avec une crise médiatique où votre entreprise est critiquée publiquement. Comment répondez-vous pour maintenir la réputation ?",
    options: [
      "Les médias ont tort et nous ne commentons pas",
      "Nous prenons ces préoccupations au sérieux et nous nous engageons à les aborder de manière transparente. Nous menons un examen approfondi et partagerons nos conclusions et actions correctives",
      "C'est de fausses nouvelles et nous l'ignorons",
      "Nous nous fichons de ce que les gens pensent"
    ],
    correct: "Nous prenons ces préoccupations au sérieux et nous nous engageons à les aborder de manière transparente. Nous menons un examen approfondi et partagerons nos conclusions et actions correctives",
    explanation: "Dans les crises médiatiques, reconnaissez les préoccupations, démontrez l'engagement envers la transparence et montrez des étapes concrètes vers la résolution.",
    category: "RP de crise"
  },
  {
    id: 15,
    scenario: "Vous négociez une fusion et le PDG de l'autre entreprise est déraisonnable sur les termes. Comment maintenez-vous l'accord tout en protégeant vos intérêts ?",
    options: [
      "Vos termes sont ridicules et nous ne les acceptons pas",
      "Je comprends que vous voulez maximiser la valeur pour vos actionnaires. Explorons des solutions créatives qui répondent à vos préoccupations tout en assurant que cet accord fonctionne pour les deux organisations",
      "Prenez-le ou laissez-le, ce sont nos termes finaux",
      "Nous ne changeons rien, alors acceptez notre offre"
    ],
    correct: "Je comprends que vous voulez maximiser la valeur pour vos actionnaires. Explorons des solutions créatives qui répondent à vos préoccupations tout en assurant que cet accord fonctionne pour les deux organisations",
    explanation: "Dans les négociations complexes, reconnaissez leurs motivations, cherchez des solutions créatives et concentrez-vous sur l'avantage mutuel plutôt que sur le marchandage positionnel.",
    category: "Négociation M&A"
  },
  {
    id: 16,
    scenario: "Vous dirigez une équipe à travers une restructuration organisationnelle majeure. Comment communiquez-vous ce changement tout en maintenant la productivité ?",
    options: [
      "Nous restructurons et tout le monde doit s'adapter",
      "Nous mettons en œuvre des changements pour renforcer notre organisation. Je veux m'assurer que tout le monde comprend comment cela les affecte et que nous avons des systèmes de soutien en place pendant cette transition",
      "Le changement se passe que vous l'aimiez ou non",
      "La restructuration est nécessaire, alors acceptez-la"
    ],
    correct: "Nous mettons en œuvre des changements pour renforcer notre organisation. Je veux m'assurer que tout le monde comprend comment cela les affecte et que nous avons des systèmes de soutien en place pendant cette transition",
    explanation: "Pendant la restructuration, expliquez la logique, abordez les impacts individuels et mettez l'accent sur les systèmes de soutien pour maintenir l'engagement.",
    category: "Changement organisationnel"
  },
  {
    id: 17,
    scenario: "Vous êtes dans une présentation à haut risque pour des clients potentiels et votre technologie tombe en panne. Comment maintenez-vous le professionnalisme et livrez-vous toujours de la valeur ?",
    options: [
      "La technologie est cassée, donc nous ne pouvons pas présenter",
      "Il semble que nous ayons des difficultés techniques. Laissez-moi continuer avec les points clés pendant que nous travaillons à résoudre cela, et je m'assurerai que vous obtenez tous les matériaux par la suite",
      "C'est embarrassant, je ne peux pas continuer",
      "La présentation est ruinée, nous devrions reprogrammer"
    ],
    correct: "Il semble que nous ayons des difficultés techniques. Laissez-moi continuer avec les points clés pendant que nous travaillons à résoudre cela, et je m'assurerai que vous obtenez tous les matériaux par la suite",
    explanation: "Quand la technologie tombe en panne dans des présentations importantes, restez calme, adaptez votre livraison et assurez des matériaux de suivi pour maintenir le professionnalisme.",
    category: "Présentation de crise"
  },
  {
    id: 18,
    scenario: "Vous traitez avec une situation de dénonciation où un employé a signalé une inconduite grave. Comment gérez-vous cela avec intégrité ?",
    options: [
      "Nous enquêterons sur cela en interne et le gérerons discrètement",
      "Nous prenons ces rapports très au sérieux. Nous lançons une enquête approfondie et indépendante et prendrons les mesures appropriées basées sur les conclusions",
      "C'est probablement juste un employé mécontent",
      "Nous l'examinerons mais n'attendez pas grand-chose"
    ],
    correct: "Nous prenons ces rapports très au sérieux. Nous lançons une enquête approfondie et indépendante et prendrons les mesures appropriées basées sur les conclusions",
    explanation: "Quand on traite les rapports de dénonciation, on démontre le sérieux, on assure une enquête indépendante et on s'engage à une action appropriée.",
    category: "Éthique et conformité"
  },
  {
    id: 19,
    scenario: "Vous dirigez une équipe à travers un rappel de produit majeur. Comment communiquez-vous cela aux parties prenantes tout en maintenant la confiance ?",
    options: [
      "Nous rappelons le produit et c'est tout",
      "Nous avons identifié un problème avec notre produit et mettons en œuvre un rappel volontaire. Nous nous engageons envers la sécurité des clients et fournirons des mises à jour régulières sur nos progrès",
      "Le rappel est nécessaire, alors acceptez-le",
      "Nous avons fait une erreur, mais ce n'est pas si grave"
    ],
    correct: "Nous avons identifié un problème avec notre produit et mettons en œuvre un rappel volontaire. Nous nous engageons envers la sécurité des clients et fournirons des mises à jour régulières sur nos progrès",
    explanation: "Pendant les rappels de produits, soyez transparent sur le problème, démontrez l'engagement envers la sécurité et fournissez une communication continue.",
    category: "Gestion de crise"
  },
  {
    id: 20,
    scenario: "Vous êtes dans une réunion de conseil où vous devez recommander la fermeture d'une division qui a des difficultés. Comment présentez-vous cette recommandation difficile ?",
    options: [
      "Nous devons fermer cette division parce qu'elle perd de l'argent",
      "Après une analyse approfondie, je recommande que nous restructurions cette division. Bien que ce soit une décision difficile, je crois que c'est nécessaire pour notre succès à long terme et j'ai préparé un plan de transition",
      "La division est un échec et devrait être fermée",
      "Nous fermons la division, fin de discussion"
    ],
    correct: "Après une analyse approfondie, je recommande que nous restructurions cette division. Bien que ce soit une décision difficile, je crois que c'est nécessaire pour notre succès à long terme et j'ai préparé un plan de transition",
    explanation: "Quand on recommande des décisions d'affaires difficiles, on démontre une analyse approfondie, on reconnaît la difficulté et on fournit une planification de transition complète.",
    category: "Prise de décision stratégique"
  }
]

export default function FrenchConversationLevel3Page() {
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes for advanced
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
    setTimeLeft(180)
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
    setTimeLeft(180)
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
    }, 2500) // More time for advanced level
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
                  {t('games.french.conversation.title')} - {t('games.levels.advanced')}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('games.french.conversation.description')}
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
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  </div>
                  <span className={cn(
                    "font-semibold text-sm sm:text-base",
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  )}>Scénarios</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>{conversationScenarios.length} scénarios</p>
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
                )}>Jusqu'à {conversationScenarios.length} points</p>
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
                    Lisez le scénario attentivement
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Choisissez la réponse la plus appropriée
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
                  Conversation - Niveau 3
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
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 leading-relaxed">
                {currentScenario.scenario}
              </h2>
            </motion.div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 gap-3 mb-6">
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
                    "p-3 rounded-xl font-medium text-sm transition-all duration-300 text-left leading-relaxed",
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
                  <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed">
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
