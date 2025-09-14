"use client"

import React from 'react'
import { useChristmasTheme } from '@/contexts/ChristmasThemeContext'
import { SnowflakesAnimation, ChristmasIcons, ChristmasBackground } from './ChristmasAnimations'

export function ChristmasWrapper({ children }: { children: React.ReactNode }) {
  const { isChristmasMode, isLoading } = useChristmasTheme()

  // Don't render Christmas elements while loading
  if (isLoading) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      {isChristmasMode && (
        <>
          <ChristmasBackground />
          <SnowflakesAnimation />
          <ChristmasIcons />
        </>
      )}
    </>
  )
}
