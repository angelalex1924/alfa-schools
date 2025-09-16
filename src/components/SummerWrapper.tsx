"use client"

import React from 'react'
import { useSummerTheme } from '@/contexts/SummerThemeContext'
import { SunRaysAnimation, SummerIcons, SummerBackground } from './SummerAnimations'

export function SummerWrapper({ children }: { children: React.ReactNode }) {
  const { isSummerMode, isLoading } = useSummerTheme()

  // Don't render Summer elements while loading
  if (isLoading) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      {isSummerMode && (
        <>
          <SummerBackground />
          <SunRaysAnimation />
          <SummerIcons />
        </>
      )}
    </>
  )
}
