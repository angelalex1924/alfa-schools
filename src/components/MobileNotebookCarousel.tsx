"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, GraduationCap, BookOpen, Award, Users, Star, Globe, Pencil, Ruler, Calculator, PenTool, BookMarked, School } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"

interface CarouselSlide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  accentColor: string
  gradient: string
}

// Helper function to safely get string from translation
const getString = (value: string | string[]): string => {
  return Array.isArray(value) ? value.join(' ') : value
}

// Helper function to get carousel data based on language
const getCarouselData = (t: (key: string) => string | string[]): CarouselSlide[] => [
  {
    id: 1,
    title: getString(t('carousel.slide1.title')),
    subtitle: getString(t('carousel.slide1.subtitle')),
    description: getString(t('carousel.slide1.description')),
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&crop=center",
    ctaText: getString(t('carousel.slide1.ctaText')),
    ctaLink: "/services",
    accentColor: "#4a6fa5",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: getString(t('carousel.slide2.title')),
    subtitle: getString(t('carousel.slide2.subtitle')),
    description: getString(t('carousel.slide2.description')),
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=800&fit=crop&crop=center",
    ctaText: getString(t('carousel.slide2.ctaText')),
    ctaLink: "/services",
    accentColor: "#81a1d4",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    title: getString(t('carousel.slide3.title')),
    subtitle: getString(t('carousel.slide3.subtitle')),
    description: getString(t('carousel.slide3.description')),
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&crop=center",
    ctaText: getString(t('carousel.slide3.ctaText')),
    ctaLink: "/services",
    accentColor: "#c9b6e4",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 4,
    title: getString(t('carousel.slide4.title')),
    subtitle: getString(t('carousel.slide4.subtitle')),
    description: getString(t('carousel.slide4.description')),
    image: "https://static01.nyt.com/images/2024/07/12/books/review/1221stCentury-Day5/1221stCentury-Day5-facebookJumbo.jpg",
    ctaText: getString(t('carousel.slide4.ctaText')),
    ctaLink: "/services",
    accentColor: "#fabeb6",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
  },
  {
    id: 5,
    title: getString(t('carousel.slide5.title')),
    subtitle: getString(t('carousel.slide5.subtitle')),
    description: getString(t('carousel.slide5.description')),
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=800&fit=crop&crop=center",
    ctaText: getString(t('carousel.slide5.ctaText')),
    ctaLink: "/services",
    accentColor: "#f78da7",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  }
]

export default function MobileNotebookCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  
  const carouselData = getCarouselData(t)

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPlaying, carouselData.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const currentData = carouselData[currentSlide]

  return (
    <div 
      className={`relative min-h-screen overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
      }`}
      style={{ fontFamily: 'StampatelloFaceto, cursive' }}
    >
      
      {/* Notebook Paper Background */}
      <div className="absolute inset-0">
        {/* Main paper background */}
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}></div>
        
        {/* Notebook lines */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`line-${i}`}
            className={`absolute w-full h-px ${
              isDarkMode ? 'bg-gray-600/30' : 'bg-blue-200/40'
            }`}
            style={{
              top: `${8 + i * 4.5}%`,
              left: '8%',
              right: '8%'
            }}
          />
        ))}
        
        {/* Red margin line */}
        <div className={`absolute left-8 top-0 bottom-0 w-px ${
          isDarkMode ? 'bg-red-400' : 'bg-red-300'
        }`}></div>
        
        {/* Holes for binder */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`hole-${i}`}
            className={`absolute w-2 h-2 rounded-full border ${
              isDarkMode 
                ? 'bg-gray-600 border-gray-500' 
                : 'bg-blue-200 border-blue-300'
            }`}
            style={{
              left: '6px',
              top: `${20 + i * 30}%`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 py-8 pt-20">
        
         {/* Header - School Logo */}
         <div className="flex justify-center mb-6 mt-2">
           <div className="flex items-center gap-3">
             <img
               src="/alfa-logo.png"
               alt="Alfa School Logo"
               className="w-20 h-20 object-contain"
             />
             <div className="flex items-center">
               <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                 {t('carousel.badge.since1986') || 'Since 1986'}
               </p>
             </div>
           </div>
         </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          
           {/* Title Section */}
           <div className="text-center space-y-4 max-w-sm">
             <h1 className={`text-2xl font-bold leading-tight ${
               isDarkMode ? 'text-white' : 'text-gray-800'
             }`}>
               {currentData.title}
             </h1>
             <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
               {currentData.subtitle}
             </p>
           </div>

          {/* Image Section */}
          <div className="relative group">
            <div className={`w-64 h-48 rounded-lg overflow-hidden shadow-lg border-2 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 ${
              isDarkMode ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <img
                src={currentData.image}
                alt={currentData.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            
            {/* Enhanced corner decorations */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md animate-pulse">
              <Star className="w-4 h-4 text-white" />
            </div>
            
            {/* School badge decoration */}
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            
            {/* Decorative corner lines */}
            <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-blue-400 opacity-60"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-green-400 opacity-60"></div>
          </div>

          {/* Description */}
          <div className="max-w-sm text-center">
            <div className={`rounded-lg p-4 shadow-md border transition-all duration-300 hover:shadow-lg hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="relative">
                {/* Decorative bullet point */}
                <div className="absolute -left-2 top-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className={`text-sm leading-relaxed pl-4 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  {currentData.description}
                </p>
              </div>
              
              {/* Decorative underline */}
              <div className="mt-3 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <div className="relative group">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                  {currentData.ctaText}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
              
              {/* Decorative sparkles */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 max-w-sm">
            <div className={`rounded-lg p-3 shadow-md border flex-1 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="relative">
                <div className="text-2xl font-bold text-blue-600">35+</div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('carousel.stats.years')}</div>
            </div>
            <div className={`rounded-lg p-3 shadow-md border flex-1 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="relative">
                <div className="text-2xl font-bold text-green-600">1000+</div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('carousel.stats.students')}</div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            className={`p-2 rounded-full shadow-md border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>

          <button
            onClick={togglePlayPause}
            className={`p-2 rounded-full shadow-md border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            {isPlaying ? (
              <Pause className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            ) : (
              <Play className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            )}
          </button>

          <button
            onClick={nextSlide}
            className={`p-2 rounded-full shadow-md border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentSlide
                  ? "bg-blue-600"
                  : isDarkMode 
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Enhanced School Elements */}
        <div className="absolute top-20 right-4 opacity-20 animate-bounce">
          <div className="relative">
            <BookOpen className={`w-6 h-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-400'}`} />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="absolute bottom-20 left-4 opacity-20 animate-pulse">
          <div className="relative">
            <Pencil className={`w-5 h-5 ${isDarkMode ? 'text-orange-300' : 'text-orange-400'}`} />
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-1/2 right-8 opacity-20 animate-bounce">
          <div className="relative">
            <Ruler className={`w-5 h-5 ${isDarkMode ? 'text-green-300' : 'text-green-400'}`} />
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-32 left-8 opacity-15">
          <Calculator className={`w-4 h-4 ${isDarkMode ? 'text-purple-300' : 'text-purple-400'}`} />
        </div>
        <div className="absolute bottom-32 right-12 opacity-15">
          <PenTool className={`w-4 h-4 ${isDarkMode ? 'text-pink-300' : 'text-pink-400'}`} />
        </div>
        <div className="absolute top-1/3 left-12 opacity-15">
          <BookMarked className={`w-4 h-4 ${isDarkMode ? 'text-red-300' : 'text-red-400'}`} />
        </div>
      </div>
    </div>
  )
}
