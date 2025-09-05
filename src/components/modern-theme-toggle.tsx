"use client"

import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModernThemeToggleProps {
  isDarkMode: boolean
  onToggle: () => void
  className?: string
}

export function ModernThemeToggle({ isDarkMode, onToggle, className }: ModernThemeToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={cn(
        "relative w-10 h-10 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative"
      >
        {isDarkMode ? (
          <Moon className="h-5 w-5 text-blue-400" />
        ) : (
          <Sun className="h-5 w-5 text-amber-500" />
        )}
      </motion.div>
      
      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0"
        animate={{
          opacity: isDarkMode ? 0.1 : 0.05,
          boxShadow: isDarkMode 
            ? "0 0 20px rgba(59, 130, 246, 0.3)" 
            : "0 0 20px rgba(245, 158, 11, 0.2)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
