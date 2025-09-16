"use client"

import React from 'react'
import { useHalloweenTheme } from '@/contexts/HalloweenThemeContext'
import { BatsAnimation, HalloweenIcons, HalloweenBackground } from './HalloweenAnimations'

export function HalloweenWrapper({ children }: { children: React.ReactNode }) {
  const { isHalloweenMode, isLoading } = useHalloweenTheme()

  // Don't render Halloween elements while loading
  if (isLoading) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      {isHalloweenMode && (
        <>
          <HalloweenBackground />
          <BatsAnimation />
          <HalloweenIcons />
        </>
      )}
    </>
  )
}
