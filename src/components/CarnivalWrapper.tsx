"use client"

import React from 'react'
import { useCarnivalTheme } from '@/contexts/CarnivalThemeContext'
import { ConfettiAnimation, CarnivalIcons, CarnivalBackground } from './CarnivalAnimations'

export function CarnivalWrapper({ children }: { children: React.ReactNode }) {
  const { isCarnivalMode, isLoading } = useCarnivalTheme()

  // Don't render Carnival elements while loading
  if (isLoading) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      {isCarnivalMode && (
        <>
          <CarnivalBackground />
          <ConfettiAnimation />
          <CarnivalIcons />
        </>
      )}
    </>
  )
}
