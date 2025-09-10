"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, GraduationCap, BookOpen, Award, Users, Star, Globe, Pencil, Ruler, Calculator, PenTool, BookMarked, School } from "lucide-react"
import SplitText from "./SplitText"
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

// Beautiful school-themed floating elements
const schoolElements = [
  { Icon: BookOpen, delay: 0, position: { top: '12%', left: '8%' }, type: 'notebook', size: 'w-6 h-6' },
  { Icon: GraduationCap, delay: 1, position: { top: '68%', right: '12%' }, type: 'badge', size: 'w-7 h-7' },
  { Icon: Pencil, delay: 2, position: { top: '25%', left: '5%' }, type: 'pencil', size: 'w-5 h-5' },
  { Icon: Ruler, delay: 3, position: { top: '45%', right: '8%' }, type: 'ruler', size: 'w-6 h-6' },
  { Icon: Calculator, delay: 4, position: { top: '75%', left: '10%' }, type: 'calculator', size: 'w-5 h-5' },
  { Icon: PenTool, delay: 5, position: { top: '35%', right: '15%' }, type: 'pen', size: 'w-5 h-5' },
  { Icon: BookMarked, delay: 6, position: { top: '55%', left: '3%' }, type: 'bookmark', size: 'w-4 h-4' },
  { Icon: School, delay: 7, position: { top: '15%', right: '5%' }, type: 'school', size: 'w-6 h-6' }
]

export default function ModernHeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  
  const carouselData = getCarouselData(t)

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isHovered) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, isHovered])

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
          : 'bg-gradient-to-br from-blue-50/20 via-white/20 to-blue-50/20 backdrop-blur-sm'
      }`}
      style={{ fontFamily: 'StampatelloFaceto, cursive' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Notebook Paper Background with Photo Overlay */}
      <div className="absolute inset-0">
        {/* Main paper background */}
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white/10'}`}></div>
        
        {/* Photo background overlay */}
          <div
            key={`bg-${currentSlide}`}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out opacity-30"
            style={{
              backgroundImage: `url(${currentData.image})`,
            filter: "brightness(0.8) contrast(1.1) saturate(1.2)"
          }}
        />
        
        {/* Notebook lines */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`line-${i}`}
            className={`absolute w-full h-px ${
              isDarkMode ? 'bg-gray-600/40' : 'bg-blue-200/50'
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

      {/* Simple School Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Simple School Elements */}
        <div className="absolute top-20 right-4 opacity-20">
          <BookOpen className={`w-6 h-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-400'}`} />
        </div>
        <div className="absolute bottom-20 left-4 opacity-20">
          <Pencil className={`w-5 h-5 ${isDarkMode ? 'text-orange-300' : 'text-orange-400'}`} />
        </div>
        <div className="absolute top-1/2 right-8 opacity-20">
          <Ruler className={`w-5 h-5 ${isDarkMode ? 'text-green-300' : 'text-green-400'}`} />
        </div>
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

      {/* Main Content */}
      <div className="relative z-10 min-h-[80vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-16 pt-24 sm:pt-12 sm:py-20 pb-12">
        <div className="max-w-6xl lg:max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            
            {/* Left Side - Content */}
            <div className="text-center lg:text-left space-y-8 sm:space-y-10">
              
              {/* School Logo with Since 1986 */}
              <div className="flex justify-center lg:justify-start">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <img
                      src="/alfa-logo.png"
                      alt="Alfa School Logo"
                      className="w-40 h-40 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Decorative sparkles */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Since 1986 Badge */}
                  <div className="relative group mt-4">
                    <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200/30 dark:border-gray-600/30 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('carousel.badge.since1986') || 'Since 1986'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Enhanced Title */}
              <div className="text-center lg:text-left space-y-6">
                <h1 
                  className={`text-4xl lg:text-6xl font-bold leading-tight transition-all duration-500 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}
                  style={{
                    textShadow: isDarkMode 
                      ? '0 2px 8px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)' 
                      : 'none',
                    filter: isDarkMode ? 'contrast(1.1) brightness(1.05)' : 'none'
                  }}
                >
                  {currentData.title}
                </h1>
                
                <p 
                  className={`text-xl lg:text-2xl font-medium transition-all duration-500 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                  style={{
                    textShadow: isDarkMode 
                      ? '0 1px 4px rgba(0,0,0,0.4)' 
                      : 'none'
                  }}
                >
                  {currentData.subtitle}
                </p>
              </div>

              {/* Enhanced Description */}
              <div className="max-w-2xl mx-auto lg:mx-0">
                <div className={`relative rounded-xl p-8 shadow-xl border transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-white/15 border-white/30 text-white backdrop-blur-sm' 
                    : 'bg-white/95 border-gray-200 text-gray-800 backdrop-blur-sm'
                }`}>
                  <div className="relative">
                    {/* Enhanced decorative bullet point */}
                    <div className="absolute -left-3 top-2 w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>
                    <p className={`text-lg lg:text-xl leading-relaxed pl-6 font-medium ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {currentData.description}
                    </p>
                  </div>
                  
                  {/* Enhanced decorative underline */}
                  <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 rounded-full"></div>
                  
                  {/* Additional decorative element */}
                  <div className="absolute -right-3 bottom-3 w-2 h-2 bg-yellow-400 rounded-full shadow-md"></div>
                </div>
              </div>

              {/* Enhanced CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative group">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-5 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl font-bold text-lg"
                  >
                    <span className="flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                      {currentData.ctaText}
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </span>
                  </Button>
                  
                  {/* Decorative sparkles */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Image with Stats */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div className={`w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border-2 transition-all duration-300 group-hover:shadow-3xl group-hover:scale-105 ${
                  isDarkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <img
                    src={currentData.image}
                    alt={currentData.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Photo overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                
                {/* Enhanced Stats Badges */}
                <div className="absolute -top-8 -right-8 sm:-top-10 sm:-right-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl p-6 border border-gray-200/60 dark:border-gray-600/60 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div className="p-2 bg-yellow-400/20 rounded-xl">
                        <GraduationCap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div className="text-3xl font-bold text-gray-800 dark:text-white">35+</div>
                    </div>
                    <div className="text-sm font-bold text-gray-600 dark:text-gray-300">Years</div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl p-6 border border-gray-200/60 dark:border-gray-600/60 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div className="p-2 bg-blue-400/20 rounded-xl">
                        <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-3xl font-bold text-gray-800 dark:text-white">1000+</div>
                    </div>
                    <div className="text-sm font-bold text-gray-600 dark:text-gray-300">Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Navigation Controls */}
      <div className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4">
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
      </div>

      {/* Simple Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 z-20">
        <div className="flex gap-2">
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
      </div>

    </div>
  )
}
