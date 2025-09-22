"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Import Geogola font
import "@/app/globals.css"

// Cloud Icon Component
const CloudIcon = ({ className, ...props }: { className?: string; [key: string]: any }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none"
    className={className}
    {...props}
  >
    <g clipPath="url(#clip0_4418_5515)">
      <path 
        d="M9 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44001 10.9 3.20001L12.4 5.20001C12.78 5.70001 13 6 14 6H17C21 6 22 7 22 11V13" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        opacity="0.4" 
        d="M13.7601 18.3204C11.4101 18.4904 11.4101 21.8904 13.7601 22.0604H19.3201C19.9901 22.0604 20.6501 21.8104 21.1401 21.3604C22.7901 19.9204 21.91 17.0404 19.74 16.7704C18.96 12.0804 12.1801 13.8604 13.7801 18.3304" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </g>
    <defs>
      <clipPath id="clip0_4418_5515">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)

// Main AcronWeb Cloud Logo Component
export const AcronWebCloudLogo = ({ 
  size = "default", 
  textSize = null,
  className = "", 
  showTagline = false,
  animated = true,
  variant = "horizontal",
  ...props 
}) => {
  const sizeClasses = {
    xxxxs: {
      icon: "h-3 w-3",
      text: "text-[8px]",
      container: "gap-0.5",
      spacing: "space-x-0",
      cloudSpacing: "ml-0.5"
    },
    xxs: {
      icon: "h-4 w-4",
      text: "text-[10px]",
      container: "gap-1",
      spacing: "space-x-0",
      cloudSpacing: "ml-0.5"
    },
    xs: {
      icon: "h-5 w-5",
      text: "text-xs",
      container: "gap-1.5",
      spacing: "space-x-0",
      cloudSpacing: "ml-1"
    },
    sm: {
      icon: "h-6 w-6",
      text: "text-sm",
      container: "gap-2",
      spacing: "space-x-0",
      cloudSpacing: "ml-1"
    },
    default: {
      icon: "h-8 w-8",
      text: "text-lg",
      container: "gap-2",
      spacing: "space-x-0",
      cloudSpacing: "ml-1.5"
    },
    lg: {
      icon: "h-10 w-10",
      text: "text-xl",
      container: "gap-2.5",
      spacing: "space-x-0",
      cloudSpacing: "ml-2"
    },
    xl: {
      icon: "h-12 w-12",
      text: "text-2xl",
      container: "gap-3",
      spacing: "space-x-0",
      cloudSpacing: "ml-2.5"
    },
    xxl: {
      icon: "h-16 w-16",
      text: "text-3xl",
      container: "gap-4",
      spacing: "space-x-0",
      cloudSpacing: "ml-3"
    },
    xxxl: {
      icon: "h-20 w-20",
      text: "text-4xl",
      container: "gap-5",
      spacing: "space-x-0",
      cloudSpacing: "ml-4"
    }
  }

  const currentSize = sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default
  const finalTextSize = textSize || currentSize.text

  const containerClasses = cn(
    "inline-flex items-center transition-all duration-500 ease-out antialiased subpixel-antialiased filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.1)]",
    currentSize.container,
    variant === "vertical" ? "flex-col" : "flex-row",
    className
  )

  const textContainerClasses = cn(
    "relative inline-flex items-baseline transition-all duration-500",
    currentSize.spacing,
    variant === "vertical" ? "flex-col items-center" : "flex-row"
  )

  return (
    <motion.div
      className={containerClasses}
      initial={animated ? { opacity: 0, y: 10 } : false}
      animate={animated ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.6, ease: "easeOut" }}
      {...props}
    >
      {/* Cloud Icon */}
      <motion.div
        className={cn(
          "relative inline-flex items-center justify-center transition-all duration-500",
          currentSize.icon
        )}
        initial={animated ? { scale: 0.8, rotate: -10 } : false}
        animate={animated ? { scale: 1, rotate: 0 } : false}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className="relative inline-flex items-center justify-center w-full h-full">
          {/* Blue gradient background for cloud */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-lg opacity-20 blur-sm"></div>
          <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-lg p-1">
            <CloudIcon className="w-full h-full text-white" />
          </div>
        </div>
      </motion.div>

      {/* Text Container */}
      <div className={textContainerClasses}>
        {/* ACRON part */}
        <motion.span
          className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-400 dark:via-blue-300 dark:to-blue-500 bg-clip-text text-transparent transition-all duration-500"
          style={{
            fontFamily: "'Outfit', 'Space Grotesk', 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 50%",
            textShadow: "0 2px 4px rgba(59, 130, 246, 0.15), 0 1px 2px rgba(59, 130, 246, 0.08)",
            filter: "contrast(1.1) brightness(1.02)",
            lineHeight: "1",
            display: "inline-block",
            verticalAlign: size === "xxxxs" ? "baseline" : "baseline",
            transform: size === "xxxxs" ? "translateY(0.5px)" : "none"
          }}
          initial={animated ? { opacity: 0, x: -20 } : false}
          animate={animated ? { opacity: 1, x: 0 } : false}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          ACRON
        </motion.span>

        {/* WEB part */}
        <motion.span
          className="bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800 dark:from-slate-50 dark:via-white dark:to-slate-100 bg-clip-text text-transparent transition-all duration-500 desktop-web-align"
          style={{
            fontFamily: "'Geogola', 'Gegola DEMO', 'Outfit', 'Space Grotesk', 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 50%",
            textShadow: "0 2px 4px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
            filter: "contrast(1.1) brightness(1.02)",
            lineHeight: size === "xxxxs" ? "1" : "1",
            display: "inline-block",
            verticalAlign: size === "xxxxs" ? "baseline" : "baseline",
            transform: size === "xxxxs" ? "translateY(0.5px)" : size === "xs" ? "translateY(1px)" : "translateY(2px)"
          }}
          initial={animated ? { opacity: 0, x: 20 } : false}
          animate={animated ? { opacity: 1, x: 0 } : false}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          WEB
        </motion.span>

        {/* CLOUD part */}
        <motion.span
          className={cn(
            "bg-gradient-to-br from-cyan-600 via-teal-500 to-blue-600 dark:from-cyan-400 dark:via-teal-300 dark:to-blue-400 bg-clip-text text-transparent transition-all duration-500",
            currentSize.cloudSpacing
          )}
          style={{
            fontFamily: "'Geogola', 'Gegola DEMO', 'Outfit', 'Space Grotesk', 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 50%",
            textShadow: "0 2px 4px rgba(6, 182, 212, 0.15), 0 1px 2px rgba(6, 182, 212, 0.08)",
            filter: "contrast(1.1) brightness(1.02)",
            lineHeight: "1",
            display: "inline-block",
            verticalAlign: size === "xxxxs" ? "baseline" : "baseline",
            transform: size === "xxxxs" ? "translateY(0.5px)" : size === "xs" ? "translateY(1px)" : "translateY(2px)"
          }}
          initial={animated ? { opacity: 0, x: 20 } : false}
          animate={animated ? { opacity: 1, x: 0 } : false}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        >
          CLOUD
        </motion.span>
      </div>

    </motion.div>
  )
}

// Export default
export default AcronWebCloudLogo
