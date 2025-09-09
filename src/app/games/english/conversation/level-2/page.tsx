"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Clock, Star, Trophy, RotateCcw, Home, MessageCircle, Sparkles, Zap } from "lucide-react"

// Intermediate conversation scenarios for level 2
const conversationScenarios = [
  {
    id: 1,
    scenario: "You're at a job interview and they ask about your weaknesses. How do you respond professionally?",
    options: [
      "I don't have any weaknesses",
      "I sometimes take on too many projects, but I'm learning to prioritize better",
      "I'm always late to work",
      "I hate working with other people"
    ],
    correct: "I sometimes take on too many projects, but I'm learning to prioritize better",
    explanation: "In interviews, show self-awareness and growth by mentioning a weakness you're actively working to improve.",
    category: "Job Interviews"
  },
  {
    id: 2,
    scenario: "You need to decline an invitation to a party because you're busy. How do you politely refuse?",
    options: [
      "I can't come, I'm too busy",
      "Thank you for the invitation, but I won't be able to make it this time. I hope you have a great party!",
      "I don't want to come",
      "Maybe next time, but probably not"
    ],
    correct: "Thank you for the invitation, but I won't be able to make it this time. I hope you have a great party!",
    explanation: "When declining invitations, be polite, express gratitude, and wish them well.",
    category: "Social Situations"
  },
  {
    id: 3,
    scenario: "You're giving a presentation and someone asks a question you don't know the answer to. How do you respond?",
    options: [
      "I don't know, ask someone else",
      "That's a great question. I don't have that information right now, but I'll find out and get back to you",
      "I'm not sure, but I think it's probably something",
      "That's not important"
    ],
    correct: "That's a great question. I don't have that information right now, but I'll find out and get back to you",
    explanation: "When you don't know something, acknowledge the question, admit you don't know, and offer to follow up.",
    category: "Professional Communication"
  },
  {
    id: 4,
    scenario: "You want to negotiate your salary with your boss. How do you approach this professionally?",
    options: [
      "I want more money or I'm leaving",
      "I'd like to discuss my compensation. Based on my performance and market research, I believe a salary review would be appropriate",
      "Give me a raise or I quit",
      "I need more money because I'm broke"
    ],
    correct: "I'd like to discuss my compensation. Based on my performance and market research, I believe a salary review would be appropriate",
    explanation: "Salary negotiations should be professional, based on performance and market data, not personal needs.",
    category: "Professional Communication"
  },
  {
    id: 5,
    scenario: "You're at a restaurant and the food is cold. How do you politely complain?",
    options: [
      "This food is terrible!",
      "Excuse me, I think my food might have gotten cold. Could you please heat it up?",
      "I want my money back right now!",
      "This is disgusting!"
    ],
    correct: "Excuse me, I think my food might have gotten cold. Could you please heat it up?",
    explanation: "When complaining, be polite, specific about the issue, and suggest a solution.",
    category: "Customer Service"
  },
  {
    id: 6,
    scenario: "You need to ask your colleague to cover your shift. How do you make this request?",
    options: [
      "You have to work for me tomorrow",
      "Would you be able to cover my shift tomorrow? I have a family emergency and I'd really appreciate it",
      "I can't work tomorrow, so you have to",
      "Tomorrow is your problem now"
    ],
    correct: "Would you be able to cover my shift tomorrow? I have a family emergency and I'd really appreciate it",
    explanation: "When asking for favors, be polite, explain the reason, and express appreciation.",
    category: "Workplace Communication"
  },
  {
    id: 7,
    scenario: "You're giving feedback to a team member whose work needs improvement. How do you approach this?",
    options: [
      "Your work is terrible and you need to do better",
      "I've noticed some areas where we could improve. Let's discuss how I can support you in developing these skills",
      "You're not good at your job",
      "I don't like your work"
    ],
    correct: "I've noticed some areas where we could improve. Let's discuss how I can support you in developing these skills",
    explanation: "Constructive feedback should be specific, supportive, and focused on improvement rather than criticism.",
    category: "Professional Communication"
  },
  {
    id: 8,
    scenario: "You're at a networking event and want to introduce yourself to someone important. How do you approach them?",
    options: [
      "Hi, I'm looking for a job",
      "Hello, I'm [Name]. I noticed you work at [Company]. I'd love to learn more about your role there",
      "Can you give me a job?",
      "I need to talk to you about business"
    ],
    correct: "Hello, I'm [Name]. I noticed you work at [Company]. I'd love to learn more about your role there",
    explanation: "Networking introductions should be professional, show genuine interest, and avoid being too direct about job seeking.",
    category: "Networking"
  },
  {
    id: 9,
    scenario: "You need to apologize to a client for a mistake your company made. How do you handle this professionally?",
    options: [
      "Sorry, but it's not really our fault",
      "I sincerely apologize for the inconvenience this has caused. We're taking immediate steps to resolve this issue and prevent it from happening again",
      "Mistakes happen, deal with it",
      "I'm sorry, but these things happen"
    ],
    correct: "I sincerely apologize for the inconvenience this has caused. We're taking immediate steps to resolve this issue and prevent it from happening again",
    explanation: "Professional apologies should be sincere, acknowledge the impact, and show what you're doing to fix the problem.",
    category: "Customer Service"
  },
  {
    id: 10,
    scenario: "You want to suggest a new idea to your team. How do you present it effectively?",
    options: [
      "I have an idea and you should all listen",
      "I'd like to share an idea I've been thinking about. I believe it could help us improve [specific area]. What do you all think?",
      "My idea is better than yours",
      "You should do what I say"
    ],
    correct: "I'd like to share an idea I've been thinking about. I believe it could help us improve [specific area]. What do you all think?",
    explanation: "Presenting ideas should be collaborative, specific about benefits, and invite discussion.",
    category: "Team Communication"
  },
  {
    id: 11,
    scenario: "You're in a meeting and someone keeps interrupting you. How do you handle this professionally?",
    options: [
      "Stop interrupting me!",
      "I appreciate your input, and I'd like to finish my point first, then we can discuss your thoughts",
      "You're being rude",
      "I'm talking, be quiet"
    ],
    correct: "I appreciate your input, and I'd like to finish my point first, then we can discuss your thoughts",
    explanation: "Handle interruptions professionally by acknowledging their input while asserting your need to finish your point.",
    category: "Professional Communication"
  },
  {
    id: 12,
    scenario: "You need to ask for a deadline extension on a project. How do you make this request?",
    options: [
      "I need more time, give me an extension",
      "I'd like to request a deadline extension. I've encountered some unexpected challenges, and I want to ensure the quality of the final deliverable",
      "The deadline is too soon, change it",
      "I can't finish on time, so extend it"
    ],
    correct: "I'd like to request a deadline extension. I've encountered some unexpected challenges, and I want to ensure the quality of the final deliverable",
    explanation: "When requesting extensions, be professional, explain the reason, and emphasize your commitment to quality.",
    category: "Workplace Communication"
  },
  {
    id: 13,
    scenario: "You're at a conference and want to ask a question during Q&A. How do you phrase your question professionally?",
    options: [
      "I have a question",
      "Thank you for your presentation. I was wondering if you could elaborate on [specific point] and how it might apply to [specific situation]?",
      "Can you explain that better?",
      "I don't understand what you said"
    ],
    correct: "Thank you for your presentation. I was wondering if you could elaborate on [specific point] and how it might apply to [specific situation]?",
    explanation: "Professional questions should be specific, show you were listening, and demonstrate how you're applying the information.",
    category: "Professional Communication"
  },
  {
    id: 14,
    scenario: "You need to decline a project because you're already overloaded. How do you say no professionally?",
    options: [
      "I can't do it, I'm too busy",
      "I appreciate you thinking of me for this project. Unfortunately, I'm currently at capacity with my current workload, but I'd be happy to help in the future",
      "No, I don't want to do it",
      "Ask someone else, I'm busy"
    ],
    correct: "I appreciate you thinking of me for this project. Unfortunately, I'm currently at capacity with my current workload, but I'd be happy to help in the future",
    explanation: "When declining work, show appreciation, explain your situation, and leave the door open for future opportunities.",
    category: "Workplace Communication"
  },
  {
    id: 15,
    scenario: "You're leading a team meeting and need to address a conflict between team members. How do you handle this?",
    options: [
      "Stop fighting and get back to work",
      "I'd like to address the recent tension in our team. Let's have an open discussion about our concerns and find a way to work together effectively",
      "You two need to figure this out yourselves",
      "I don't want to hear about your problems"
    ],
    correct: "I'd like to address the recent tension in our team. Let's have an open discussion about our concerns and find a way to work together effectively",
    explanation: "Addressing team conflicts should be done professionally, encourage open communication, and focus on solutions.",
    category: "Leadership"
  },
  {
    id: 16,
    scenario: "You want to ask your manager for more responsibility. How do you approach this conversation?",
    options: [
      "I want a promotion",
      "I'd like to discuss opportunities for growth in my role. I feel ready to take on additional responsibilities and would appreciate your guidance on how to advance",
      "Give me more work to do",
      "I deserve a better position"
    ],
    correct: "I'd like to discuss opportunities for growth in my role. I feel ready to take on additional responsibilities and would appreciate your guidance on how to advance",
    explanation: "Asking for more responsibility should be framed as growth and development, not just wanting more work or promotion.",
    category: "Career Development"
  },
  {
    id: 17,
    scenario: "You need to give bad news to a client about a project delay. How do you communicate this professionally?",
    options: [
      "The project is delayed, deal with it",
      "I need to inform you about a delay in the project timeline. Here's what happened and here's our plan to get back on track",
      "Sorry, but it's not my fault",
      "The project will be late, that's just how it is"
    ],
    correct: "I need to inform you about a delay in the project timeline. Here's what happened and here's our plan to get back on track",
    explanation: "When delivering bad news, be direct, explain the situation, and provide a solution or plan forward.",
    category: "Client Communication"
  },
  {
    id: 18,
    scenario: "You're in a job interview and they ask why you left your previous job. How do you respond professionally?",
    options: [
      "I hated my boss",
      "I was looking for new challenges and opportunities to grow in my career, which is why I'm excited about this position",
      "The pay was too low",
      "I didn't like the work"
    ],
    correct: "I was looking for new challenges and opportunities to grow in my career, which is why I'm excited about this position",
    explanation: "When discussing job changes, focus on positive reasons like growth and new opportunities, not negative aspects of previous jobs.",
    category: "Job Interviews"
  },
  {
    id: 19,
    scenario: "You need to ask a colleague to help you with a task. How do you make this request effectively?",
    options: [
      "You need to help me with this",
      "I was wondering if you might be able to help me with [specific task]. I know you have experience with this and I'd really appreciate your input",
      "Can you do this for me?",
      "I need you to help me now"
    ],
    correct: "I was wondering if you might be able to help me with [specific task]. I know you have experience with this and I'd really appreciate your input",
    explanation: "When asking for help, be specific about what you need, acknowledge their expertise, and express appreciation.",
    category: "Workplace Communication"
  },
  {
    id: 20,
    scenario: "You're giving a presentation and the technology fails. How do you handle this professionally?",
    options: [
      "This is terrible, I can't present without slides",
      "It looks like we're having some technical difficulties. Let me continue with the key points while we work on getting this resolved",
      "I can't do this without my presentation",
      "The technology is broken, so we're done"
    ],
    correct: "It looks like we're having some technical difficulties. Let me continue with the key points while we work on getting this resolved",
    explanation: "When technology fails, stay calm, acknowledge the issue, and adapt by continuing with your content while working on a solution.",
    category: "Professional Communication"
  }
]

export default function EnglishConversationLevel2Page() {
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
                ? "rgba(59, 130, 246, 0.2)" 
                : "rgba(59, 130, 246, 0.4)" 
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-56 h-56 rounded-full blur-3xl animate-pulse opacity-25"
            style={{ 
              backgroundColor: isDarkMode 
                ? "rgba(6, 182, 212, 0.15)" 
                : "rgba(6, 182, 212, 0.5)" 
            }}
          />
          <motion.div
            className="absolute bottom-40 left-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-35"
            style={{ 
              backgroundColor: isDarkMode 
                ? "rgba(14, 165, 233, 0.1)" 
                : "rgba(14, 165, 233, 0.3)" 
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
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 bg-clip-text text-transparent">
                    Conversation - Intermediate
                  </span>
                </h1>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>
                  Master intermediate conversation skills
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
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  </div>
                  <span className={cn(
                    "font-semibold text-sm sm:text-base",
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  )}>Time</span>
                </div>
                <p className={cn(
                  "text-sm sm:text-base",
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                )}>2 minutes</p>
              </motion.div>
              <motion.div 
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl backdrop-blur-xl border bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-cyan-500/20">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
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
                  <div className="p-2 rounded-lg bg-sky-500/20">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />
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
                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Read the scenario carefully
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Choose the most appropriate response
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0"></span>
                  <span className={cn(
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    You have 2 minutes to complete the game
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
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
              className="w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3"
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
                ? "rgba(59, 130, 246, 0.2)" 
                : "rgba(59, 130, 246, 0.4)" 
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-56 h-56 rounded-full blur-3xl animate-pulse opacity-25"
            style={{ 
              backgroundColor: isDarkMode 
                ? "rgba(6, 182, 212, 0.15)" 
                : "rgba(6, 182, 212, 0.5)" 
            }}
          />
          <motion.div
            className="absolute bottom-40 left-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-35"
            style={{ 
              backgroundColor: isDarkMode 
                ? "rgba(14, 165, 233, 0.1)" 
                : "rgba(14, 165, 233, 0.3)" 
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
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2"
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
              ? "rgba(59, 130, 246, 0.2)" 
              : "rgba(59, 130, 246, 0.4)" 
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-56 h-56 rounded-full blur-3xl animate-pulse opacity-25"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(6, 182, 212, 0.15)" 
              : "rgba(6, 182, 212, 0.5)" 
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-35"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(14, 165, 233, 0.1)" 
              : "rgba(14, 165, 233, 0.3)" 
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
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 bg-clip-text text-transparent">
                    Conversation - Intermediate
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
                <div className="text-xl sm:text-2xl font-bold text-blue-500">{score}</div>
                <div className={cn(
                  "text-xs",
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                )}>Score</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-cyan-500">{timeLeft}</div>
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
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 sm:h-3 rounded-full"
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
