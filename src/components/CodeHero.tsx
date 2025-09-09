"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"

interface CodeHeroProps {
  title: string
  subtitle?: string
  fileName?: string
  codeLines?: string[]
  className?: string
}

export default function CodeHero({ 
  title, 
  subtitle, 
  fileName = "page.tsx",
  codeLines = [],
  className 
}: CodeHeroProps) {
  const { isDarkMode } = useTheme()
  const { t } = useLanguage()

  const defaultCodeLines = [
    `import { ${title.replace(/\s+/g, '')} } from '@/components'`,
    `const ${title.replace(/\s+/g, '')}Page = () => {`,
    `  return (`,
    `    <div className="container">`,
    `      <h1>${title}</h1>`,
    `    </div>`,
    `  )`,
    `}`
  ]

  const lines = codeLines.length > 0 ? codeLines : defaultCodeLines

  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-24 overflow-hidden", className)}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full blur-3xl"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(74, 111, 165, 0.15)" 
              : "rgba(74, 111, 165, 0.3)" 
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-40 h-40 sm:w-56 sm:h-56 rounded-full blur-3xl"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(129, 161, 212, 0.1)" 
              : "rgba(129, 161, 212, 0.4)" 
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -15, 0],
            y: [0, 15, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Code Snippet Container */}
        <motion.div
          className="rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto bg-gray-950 text-white mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Code Header */}
          <div className="flex items-center px-4 py-3 bg-gray-900 border-b border-gray-800">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-4 text-sm text-gray-400 font-mono">{fileName}</span>
            <div className="ml-auto px-3 py-1 rounded-full text-xs bg-blue-600 text-white font-mono">
              npm run dev
            </div>
          </div>
          
          {/* Code Content */}
          <div className="p-6 font-mono text-sm">
            <div className="text-gray-400 mb-4"># {subtitle || `Welcome to ${title}`}</div>
            {lines.map((line, index) => (
              <motion.div
                key={index}
                className="mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <span className="text-gray-500 mr-4 select-none">{String(index + 1).padStart(2, '0')}</span>
                <span 
                  className={cn(
                    line.includes('import') ? 'text-purple-400' :
                    line.includes('const') || line.includes('function') ? 'text-blue-400' :
                    line.includes('return') ? 'text-yellow-400' :
                    line.includes('className') ? 'text-green-400' :
                    line.includes('{') || line.includes('}') ? 'text-white' :
                    line.includes('//') ? 'text-gray-400' :
                    line.includes("'") || line.includes('"') ? 'text-orange-300' :
                    'text-gray-300'
                  )}
                >
                  {line}
                </span>
              </motion.div>
            ))}
            <motion.div
              className="mt-6 text-blue-400 text-3xl sm:text-4xl lg:text-5xl font-bold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {title}
            </motion.div>
          </div>
        </motion.div>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="text-center text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
