"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Clock, Star, Trophy, RotateCcw, Home, MessageCircle, Sparkles, Zap } from "lucide-react"

// Advanced conversation scenarios for level 3
const conversationScenarios = [
  {
    id: 1,
    scenario: "You're in a high-stakes negotiation and the other party is using aggressive tactics. How do you maintain professionalism while protecting your interests?",
    options: [
      "I understand your position, and I'd like to explore a solution that addresses both our concerns. Let's focus on finding common ground",
      "You're being unreasonable and I won't accept this",
      "Fine, I'll just agree to whatever you want",
      "This is ridiculous, I'm leaving"
    ],
    correct: "I understand your position, and I'd like to explore a solution that addresses both our concerns. Let's focus on finding common ground",
    explanation: "In difficult negotiations, maintain professionalism, acknowledge their position, and redirect toward collaborative problem-solving.",
    category: "Advanced Negotiation"
  },
  {
    id: 2,
    scenario: "You're leading a crisis management meeting and team members are panicking. How do you restore calm and focus?",
    options: [
      "Everyone calm down and listen to me",
      "I understand this is stressful for everyone. Let's take a step back, assess the situation objectively, and work through this systematically",
      "Stop panicking, this isn't that bad",
      "I don't know what to do either"
    ],
    correct: "I understand this is stressful for everyone. Let's take a step back, assess the situation objectively, and work through this systematically",
    explanation: "In crisis situations, acknowledge emotions, provide structure, and guide the team toward systematic problem-solving.",
    category: "Crisis Leadership"
  },
  {
    id: 3,
    scenario: "You need to deliver difficult feedback to a senior executive about their management style. How do you approach this diplomatically?",
    options: [
      "Your management style is causing problems and needs to change",
      "I'd like to share some observations about team dynamics that might be worth discussing. I've noticed some patterns that could be impacting our effectiveness",
      "People don't like working for you",
      "You need to be nicer to your employees"
    ],
    correct: "I'd like to share some observations about team dynamics that might be worth discussing. I've noticed some patterns that could be impacting our effectiveness",
    explanation: "When giving feedback to superiors, frame it as observations about systems and outcomes rather than personal criticism.",
    category: "Executive Communication"
  },
  {
    id: 4,
    scenario: "You're in a board meeting and need to present a controversial proposal. How do you handle potential resistance professionally?",
    options: [
      "I know some of you won't like this, but it's the right thing to do",
      "I'd like to present a proposal that addresses our current challenges. I anticipate there may be concerns, so I've prepared a detailed analysis and would welcome your questions",
      "This is the only solution, so you have to approve it",
      "I don't care what you think, this is happening"
    ],
    correct: "I'd like to present a proposal that addresses our current challenges. I anticipate there may be concerns, so I've prepared a detailed analysis and would welcome your questions",
    explanation: "When presenting controversial ideas, acknowledge potential concerns upfront, provide thorough preparation, and invite discussion.",
    category: "Board Communication"
  },
  {
    id: 5,
    scenario: "You're mediating a conflict between two key team members who are both threatening to quit. How do you facilitate resolution?",
    options: [
      "You both need to stop acting like children and work this out",
      "I can see this situation is affecting both of you significantly. Let's work together to understand each perspective and find a path forward that works for everyone",
      "One of you needs to apologize",
      "I don't have time for this drama"
    ],
    correct: "I can see this situation is affecting both of you significantly. Let's work together to understand each perspective and find a path forward that works for everyone",
    explanation: "In mediation, acknowledge the impact on all parties, create a safe space for dialogue, and focus on collaborative solutions.",
    category: "Conflict Resolution"
  },
  {
    id: 6,
    scenario: "You need to communicate a major organizational change that will affect many employees negatively. How do you deliver this message with empathy?",
    options: [
      "We're making changes and some people will be affected, that's just business",
      "I want to share some important changes that will impact our organization. I understand this may be difficult news, and I want to ensure we support everyone through this transition",
      "Some of you will lose your jobs, deal with it",
      "Change is necessary, so accept it"
    ],
    correct: "I want to share some important changes that will impact our organization. I understand this may be difficult news, and I want to ensure we support everyone through this transition",
    explanation: "When delivering difficult organizational news, be direct but empathetic, acknowledge the impact, and emphasize support during transition.",
    category: "Change Management"
  },
  {
    id: 7,
    scenario: "You're in a high-pressure client meeting and they're questioning your company's competence. How do you defend your organization while maintaining the relationship?",
    options: [
      "You're wrong about our company and I can prove it",
      "I appreciate you raising these concerns. Let me address each point with specific examples of our capabilities and results. I'm confident we can demonstrate our value",
      "If you don't trust us, maybe we shouldn't work together",
      "Our company is the best, you just don't understand"
    ],
    correct: "I appreciate you raising these concerns. Let me address each point with specific examples of our capabilities and results. I'm confident we can demonstrate our value",
    explanation: "When defending your organization, thank them for the feedback, provide concrete evidence, and focus on demonstrating value rather than arguing.",
    category: "Client Relations"
  },
  {
    id: 8,
    scenario: "You're leading a cross-cultural team and there's a misunderstanding due to cultural differences. How do you address this sensitively?",
    options: [
      "You need to adapt to our way of doing things",
      "I think we may have a cultural misunderstanding here. Let's take a moment to explore different perspectives and find a way to work together effectively",
      "Your culture is causing problems",
      "We do things differently here, so change"
    ],
    correct: "I think we may have a cultural misunderstanding here. Let's take a moment to explore different perspectives and find a way to work together effectively",
    explanation: "In cross-cultural situations, acknowledge the potential for misunderstanding, create space for different perspectives, and focus on collaboration.",
    category: "Cross-Cultural Communication"
  },
  {
    id: 9,
    scenario: "You need to terminate a long-term employee for performance issues. How do you conduct this difficult conversation with dignity?",
    options: [
      "You're fired because you're not good enough",
      "I need to discuss your employment status. This decision wasn't made lightly, and I want to ensure you understand the reasons and have support during this transition",
      "We're letting you go, pack your things",
      "Your performance is terrible, so you're out"
    ],
    correct: "I need to discuss your employment status. This decision wasn't made lightly, and I want to ensure you understand the reasons and have support during this transition",
    explanation: "When terminating employment, be direct but respectful, acknowledge the gravity of the decision, and offer support during transition.",
    category: "Difficult Conversations"
  },
  {
    id: 10,
    scenario: "You're in a public speaking situation and the audience is clearly disengaged. How do you regain their attention and engagement?",
    options: [
      "Pay attention, this is important",
      "I notice the energy has shifted. Let me pause here and ask - what questions do you have about what we've covered so far?",
      "If you're not interested, you can leave",
      "This is boring, I know, but listen anyway"
    ],
    correct: "I notice the energy has shifted. Let me pause here and ask - what questions do you have about what we've covered so far?",
    explanation: "When losing audience engagement, acknowledge the shift, pause for interaction, and invite participation to re-engage them.",
    category: "Public Speaking"
  },
  {
    id: 11,
    scenario: "You're dealing with a client who is threatening legal action over a misunderstanding. How do you de-escalate while protecting your organization?",
    options: [
      "Go ahead and sue us, we'll win",
      "I understand you're frustrated, and I want to resolve this situation. Let me review the details and work with you to find a solution that addresses your concerns",
      "You're overreacting, this isn't a big deal",
      "We didn't do anything wrong, so there's nothing to discuss"
    ],
    correct: "I understand you're frustrated, and I want to resolve this situation. Let me review the details and work with you to find a solution that addresses your concerns",
    explanation: "When facing potential legal action, acknowledge their frustration, express commitment to resolution, and focus on collaborative problem-solving.",
    category: "Crisis Communication"
  },
  {
    id: 12,
    scenario: "You're leading a team through a major project failure. How do you maintain morale while ensuring accountability?",
    options: [
      "This failure is unacceptable and someone needs to be held responsible",
      "This outcome isn't what we wanted, but it's an opportunity to learn. Let's analyze what happened, identify lessons learned, and apply them to future projects",
      "We failed because people didn't do their jobs",
      "This is a disaster and I don't know how to fix it"
    ],
    correct: "This outcome isn't what we wanted, but it's an opportunity to learn. Let's analyze what happened, identify lessons learned, and apply them to future projects",
    explanation: "After project failures, acknowledge the disappointment, reframe as learning opportunity, and focus on systematic improvement.",
    category: "Leadership in Failure"
  },
  {
    id: 13,
    scenario: "You're in a meeting with investors and they're questioning your company's financial projections. How do you respond with confidence while being transparent?",
    options: [
      "Our projections are accurate and you should trust us",
      "I appreciate your questions about our projections. Let me walk you through our methodology and the assumptions behind these numbers, and I'm happy to discuss any concerns",
      "If you don't believe our numbers, don't invest",
      "The projections are what they are, take it or leave it"
    ],
    correct: "I appreciate your questions about our projections. Let me walk you through our methodology and the assumptions behind these numbers, and I'm happy to discuss any concerns",
    explanation: "When facing investor scrutiny, welcome questions, provide transparent methodology, and invite further discussion to build confidence.",
    category: "Investor Relations"
  },
  {
    id: 14,
    scenario: "You're dealing with a media crisis where your company is being criticized publicly. How do you respond to maintain reputation?",
    options: [
      "The media is wrong and we're not commenting",
      "We take these concerns seriously and are committed to addressing them transparently. We're conducting a thorough review and will share our findings and corrective actions",
      "This is fake news and we're ignoring it",
      "We don't care what people think"
    ],
    correct: "We take these concerns seriously and are committed to addressing them transparently. We're conducting a thorough review and will share our findings and corrective actions",
    explanation: "In media crises, acknowledge concerns, demonstrate commitment to transparency, and show concrete steps toward resolution.",
    category: "Crisis PR"
  },
  {
    id: 15,
    scenario: "You're negotiating a merger and the other company's CEO is being unreasonable about terms. How do you maintain the deal while protecting your interests?",
    options: [
      "Your terms are ridiculous and we're not accepting them",
      "I understand you want to maximize value for your shareholders. Let's explore creative solutions that address your concerns while ensuring this deal works for both organizations",
      "Take it or leave it, these are our final terms",
      "We're not changing anything, so accept our offer"
    ],
    correct: "I understand you want to maximize value for your shareholders. Let's explore creative solutions that address your concerns while ensuring this deal works for both organizations",
    explanation: "In complex negotiations, acknowledge their motivations, seek creative solutions, and focus on mutual benefit rather than positional bargaining.",
    category: "M&A Negotiation"
  },
  {
    id: 16,
    scenario: "You're leading a team through a major organizational restructuring. How do you communicate this change while maintaining productivity?",
    options: [
      "We're restructuring and everyone needs to adapt",
      "We're implementing changes to strengthen our organization. I want to ensure everyone understands how this affects them and that we have support systems in place during this transition",
      "Change is happening whether you like it or not",
      "The restructuring is necessary, so deal with it"
    ],
    correct: "We're implementing changes to strengthen our organization. I want to ensure everyone understands how this affects them and that we have support systems in place during this transition",
    explanation: "During restructuring, explain the rationale, address individual impacts, and emphasize support systems to maintain engagement.",
    category: "Organizational Change"
  },
  {
    id: 17,
    scenario: "You're in a high-stakes presentation to potential clients and your technology fails. How do you maintain professionalism and still deliver value?",
    options: [
      "The technology is broken, so we can't present",
      "It looks like we're having technical difficulties. Let me continue with the key points while we work on resolving this, and I'll ensure you get all the materials afterward",
      "This is embarrassing, I can't continue",
      "The presentation is ruined, we should reschedule"
    ],
    correct: "It looks like we're having technical difficulties. Let me continue with the key points while we work on resolving this, and I'll ensure you get all the materials afterward",
    explanation: "When technology fails in important presentations, stay calm, adapt your delivery, and ensure follow-up materials to maintain professionalism.",
    category: "Crisis Presentation"
  },
  {
    id: 18,
    scenario: "You're dealing with a whistleblower situation where an employee has reported serious misconduct. How do you handle this with integrity?",
    options: [
      "We'll investigate this internally and handle it quietly",
      "We take these reports very seriously. We're initiating a thorough, independent investigation and will take appropriate action based on the findings",
      "This is probably just a disgruntled employee",
      "We'll look into it but don't expect much"
    ],
    correct: "We take these reports very seriously. We're initiating a thorough, independent investigation and will take appropriate action based on the findings",
    explanation: "When handling whistleblower reports, demonstrate seriousness, ensure independent investigation, and commit to appropriate action.",
    category: "Ethics & Compliance"
  },
  {
    id: 19,
    scenario: "You're leading a team through a major product recall. How do you communicate this to stakeholders while maintaining confidence?",
    options: [
      "We're recalling the product and that's all there is to it",
      "We've identified an issue with our product and are implementing a voluntary recall. We're committed to customer safety and will provide regular updates on our progress",
      "The recall is necessary, so accept it",
      "We made a mistake, but it's not that serious"
    ],
    correct: "We've identified an issue with our product and are implementing a voluntary recall. We're committed to customer safety and will provide regular updates on our progress",
    explanation: "During product recalls, be transparent about the issue, demonstrate commitment to safety, and provide ongoing communication.",
    category: "Crisis Management"
  },
  {
    id: 20,
    scenario: "You're in a board meeting where you need to recommend closing a division that's been struggling. How do you present this difficult recommendation?",
    options: [
      "We need to close this division because it's losing money",
      "After careful analysis, I'm recommending we restructure this division. While this is a difficult decision, I believe it's necessary for our long-term success and I've prepared a transition plan",
      "The division is a failure and should be shut down",
      "We're closing the division, end of discussion"
    ],
    correct: "After careful analysis, I'm recommending we restructure this division. While this is a difficult decision, I believe it's necessary for our long-term success and I've prepared a transition plan",
    explanation: "When recommending difficult business decisions, demonstrate thorough analysis, acknowledge the difficulty, and provide comprehensive transition planning.",
    category: "Strategic Decision Making"
  }
]

export default function EnglishConversationLevel3Page() {
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
                    Conversation - Advanced
                  </span>
                </h1>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>
                  Master advanced conversation skills
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
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
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
                  <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Read the scenario carefully
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Choose the most appropriate response
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
    const percentage = Math.round((score / conversationScenarios.length) * 100)
    const isExcellent = percentage >= 90
    const isGood = percentage >= 70
    const isPass = percentage >= 50

    return (
      <div 
        className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 pt-20 sm:pt-4"
        style={{
          background: isDarkMode 
            ? `linear-gradient(135deg, #2d1b69 0%, #1a0e3a 50%, #0f0a1a 100%)`
            : `linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)`,
        }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl animate-pulse opacity-30"
            style={{ 
              backgroundColor: isDarkMode 
                ? "rgba(168, 85, 247, 0.2)" 
                : "rgba(168, 85, 247, 0.4)" 
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
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-red-500 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2"
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
          ? `linear-gradient(135deg, #2d1b69 0%, #1a0e3a 50%, #0f0a1a 100%)`
          : `linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)`,
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl animate-pulse opacity-30"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(168, 85, 247, 0.2)" 
              : "rgba(168, 85, 247, 0.4)" 
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
                  <span className="bg-gradient-to-r from-purple-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                    Conversation - Advanced
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
                <div className="text-xl sm:text-2xl font-bold text-purple-500">{score}</div>
                <div className={cn(
                  "text-xs",
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                )}>Score</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-red-500">{timeLeft}</div>
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
              className="bg-gradient-to-r from-purple-500 to-red-500 h-2 sm:h-3 rounded-full"
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
                  {isCorrect ? "Σωστά! 🎉" : `Λάθος! Η σωστή απάντηση είναι: ${currentScenario.correct}`}
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-xs text-green-800 dark:text-green-200 leading-relaxed">
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
