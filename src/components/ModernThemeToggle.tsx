"use client"
import { Moon, Sun, Star, Cloud } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ModernThemeToggleProps {
  isDarkMode: boolean
  onToggle: () => void
  className?: string
}

export function ModernThemeToggle({ isDarkMode, onToggle, className = "" }: ModernThemeToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`relative overflow-hidden rounded-full p-1.5 w-8 h-8 theme-transition ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="dark-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ backgroundColor: "#36454F" }}
              className="absolute inset-0"
            />
          ) : (
            <motion.div
              key="light-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ backgroundColor: "#FFFFF0" }}
              className="absolute inset-0"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-10 overflow-visible">
        <AnimatePresence>
          {isDarkMode && (
            <>
              {/* Star at 45 degrees (top-right) */}
              <motion.div
                key="star-1"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 0.5,
                }}
                className="absolute"
                style={{
                  top: "25%",
                  left: "75%",
                }}
              >
                <Star className="text-yellow-200" fill="currentColor" size={10} />
              </motion.div>

              {/* Second star nearby */}
              <motion.div
                key="star-2"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 1.2,
                }}
                className="absolute"
                style={{
                  top: "20%",
                  left: "65%",
                }}
              >
                <Star className="text-yellow-200" fill="currentColor" size={8} />
              </motion.div>

              {/* Third star nearby */}
              <motion.div
                key="star-3"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 0.8,
                }}
                className="absolute"
                style={{
                  top: "30%",
                  left: "70%",
                }}
              >
                <Star className="text-yellow-200" fill="currentColor" size={6} />
              </motion.div>
            </>
          )}

          {!isDarkMode && (
            <>
              {[...Array(3)].map((_, i) => {
                // More natural cloud movement paths
                const cloudPath =
                  i === 0
                    ? { x: [-8, 8, -8], y: [0, -2, 0] }
                    : i === 1
                      ? { x: [5, -5, 5], y: [-1, 1, -1] }
                      : { x: [-3, 3, -3], y: [2, 0, 2] }

                return (
                  <motion.div
                    key={`cloud-${i}`}
                    initial={{ opacity: 0.8 }}
                    animate={{
                      opacity: [0.8, 1, 0.8],
                      x: cloudPath.x,
                      y: cloudPath.y,
                    }}
                    transition={{
                      duration: 4 + Math.random() * 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    className="absolute"
                    style={{
                      top: `${30 + i * 20}%`,
                      left: `${30 + i * 15}%`,
                    }}
                  >
                    <Cloud
                      className="text-blue-100"
                      fill="white"
                      stroke="rgba(186, 230, 253, 0.5)"
                      size={i % 2 === 0 ? 14 : 10}
                    />
                  </motion.div>
                )
              })}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Main icon */}
      <div className="relative z-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="moon-icon"
              initial={{ rotate: -30, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 30, opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <Moon className="h-4 w-4 text-yellow-100" fill="#fffbeb" />
            </motion.div>
          ) : (
            <motion.div
              key="sun-icon"
              initial={{ rotate: 30, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -30, opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <Sun className="h-4 w-4 text-yellow-500" fill="#fbbf24" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glow effect */}
      <AnimatePresence>
        {!isDarkMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-0 rounded-full bg-yellow-200/30 blur-md"
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}
