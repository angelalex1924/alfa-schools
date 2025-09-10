"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ModernHeroCarousel from "./ModernHeroCarousel"
import MobileNotebookCarousel from "./MobileNotebookCarousel"

export default function CarouselDemo() {
  const [activeView, setActiveView] = useState<'desktop' | 'mobile'>('desktop')

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Demo Controls */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2">
          <Button
            variant={activeView === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveView('desktop')}
            className="text-xs"
          >
            🖥️ Desktop
          </Button>
          <Button
            variant={activeView === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveView('mobile')}
            className="text-xs"
          >
            📱 Mobile
          </Button>
        </div>
      </div>

      {/* Carousel Views */}
      <div className="relative">
        {activeView === 'desktop' ? (
          <div className="w-full">
            <ModernHeroCarousel />
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto">
            <MobileNotebookCarousel />
          </div>
        )}
      </div>
    </div>
  )
}
