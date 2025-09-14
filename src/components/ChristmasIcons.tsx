"use client"

import React from 'react'

// Santa Claus Icon
export const SantaIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="#dc2626"/>
    <path d="M12 6C8.7 6 6 8.7 6 12V16C6 17.1 6.9 18 8 18H16C17.1 18 18 17.1 18 16V12C18 8.7 15.3 6 12 6Z" fill="#dc2626"/>
    <path d="M8 18V20C8 21.1 8.9 22 10 22H14C15.1 22 16 21.1 16 20V18H8Z" fill="#1f2937"/>
    <circle cx="10" cy="12" r="1" fill="white"/>
    <circle cx="14" cy="12" r="1" fill="white"/>
    <path d="M10 15C10 15.5 10.4 16 11 16H13C13.6 16 14 15.5 14 15" stroke="white" strokeWidth="1" fill="none"/>
  </svg>
)

// Christmas Tree Icon
export const ChristmasTreeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L8 8H16L12 2Z" fill="#16a34a"/>
    <path d="M12 6L8 12H16L12 6Z" fill="#16a34a"/>
    <path d="M12 10L8 16H16L12 10Z" fill="#16a34a"/>
    <path d="M12 16L8 22H16L12 16Z" fill="#16a34a"/>
    <rect x="10" y="20" width="4" height="2" fill="#8b4513"/>
    <circle cx="10" cy="8" r="1" fill="#dc2626"/>
    <circle cx="14" cy="12" r="1" fill="#dc2626"/>
    <circle cx="10" cy="16" r="1" fill="#dc2626"/>
  </svg>
)

// Reindeer Icon
export const ReindeerIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <ellipse cx="12" cy="16" rx="8" ry="4" fill="#8b4513"/>
    <ellipse cx="8" cy="12" rx="2" ry="3" fill="#8b4513"/>
    <ellipse cx="16" cy="12" rx="2" ry="3" fill="#8b4513"/>
    <circle cx="9" cy="10" r="1" fill="black"/>
    <circle cx="15" cy="10" r="1" fill="black"/>
    <path d="M12 8L10 6L8 4" stroke="#8b4513" strokeWidth="2" fill="none"/>
    <path d="M12 8L14 6L16 4" stroke="#8b4513" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="6" r="1" fill="#dc2626"/>
  </svg>
)

// Gift Box Icon
export const GiftBoxIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="8" width="16" height="12" fill="#dc2626"/>
    <rect x="4" y="8" width="16" height="4" fill="#16a34a"/>
    <path d="M12 2V8" stroke="#16a34a" strokeWidth="2"/>
    <path d="M8 4H16" stroke="#16a34a" strokeWidth="2"/>
    <circle cx="12" cy="6" r="1" fill="#16a34a"/>
  </svg>
)

// Bell Icon
export const BellIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C8.7 2 6 4.7 6 8V12L4 16H20L18 12V8C18 4.7 15.3 2 12 2Z" fill="#fbbf24"/>
    <path d="M12 20C13.1 20 14 19.1 14 18H10C10 19.1 10.9 20 12 20Z" fill="#fbbf24"/>
    <circle cx="12" cy="6" r="1" fill="#dc2626"/>
  </svg>
)

// Star Icon
export const StarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="#fbbf24"/>
  </svg>
)

// Snowman Icon
export const SnowmanIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="3" fill="white" stroke="#1f2937" strokeWidth="1"/>
    <circle cx="12" cy="16" r="4" fill="white" stroke="#1f2937" strokeWidth="1"/>
    <circle cx="10" cy="7" r="0.5" fill="black"/>
    <circle cx="14" cy="7" r="0.5" fill="black"/>
    <path d="M10 9C10.5 9.5 11.2 9.8 12 9.8C12.8 9.8 13.5 9.5 14 9" stroke="black" strokeWidth="1" fill="none"/>
    <path d="M12 2L11 4" stroke="#8b4513" strokeWidth="2"/>
    <path d="M12 2L13 4" stroke="#8b4513" strokeWidth="2"/>
  </svg>
)

// Candy Cane Icon
export const CandyCaneIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 2L8 22" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"/>
    <path d="M8 2L8 22" stroke="white" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2"/>
    <path d="M8 2C8 2 10 4 12 6C14 8 16 10 18 12" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
