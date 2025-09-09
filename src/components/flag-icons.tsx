import React from 'react'

interface FlagIconProps {
  className?: string
  size?: number
}

export const UKFlagIcon = ({ className = "w-6 h-6", size }: FlagIconProps) => (
  <div className={`${className} rounded-sm overflow-hidden border border-gray-200 dark:border-gray-600`}>
    <svg viewBox="0 0 60 30" className="w-full h-full">
      <defs>
        <pattern id="uk-flag" patternUnits="userSpaceOnUse" width="60" height="30">
          <rect width="60" height="30" fill="#012169"/>
          <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
          <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
        </pattern>
      </defs>
      <rect width="60" height="30" fill="url(#uk-flag)"/>
    </svg>
  </div>
)

export const FranceFlagIcon = ({ className = "w-6 h-6", size }: FlagIconProps) => (
  <div className={`${className} rounded-sm overflow-hidden border border-gray-200 dark:border-gray-600`}>
    <svg viewBox="0 0 60 40" className="w-full h-full">
      <rect width="20" height="40" fill="#002395"/>
      <rect x="20" width="20" height="40" fill="#fff"/>
      <rect x="40" width="20" height="40" fill="#ED2939"/>
    </svg>
  </div>
)
