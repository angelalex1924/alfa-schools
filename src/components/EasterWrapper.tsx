"use client"

import React from 'react'
import { useEasterTheme } from '@/contexts/EasterThemeContext'
import { EasterEggsAnimation, EasterIcons, EasterBackground } from './EasterAnimations'

export function EasterWrapper({ children }: { children: React.ReactNode }) {
  const { isEasterMode, isLoading } = useEasterTheme()

  // Don't render Easter elements while loading
  if (isLoading) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      {isEasterMode && (
        <>
          <EasterBackground />
          <EasterEggsAnimation />
          <EasterIcons />
        </>
      )}
    </>
  )
}
