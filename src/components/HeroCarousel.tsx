"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { motion } from "framer-motion"

interface CarouselSlide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  bgGradient: string
}

const carouselData: CarouselSlide[] = [
  {
    id: 1,
    title: "ΚΕΝΤΡΑ",
    subtitle: "ΞΕΝΩΝ ΓΛΩΣΣΩΝ",
    description: "Μαζί από το 1986, με σεβασμό, αγάπη και αφοσίωση στη μάθηση",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center",
    ctaText: "Εξερευνήστε Μαθήματα",
    ctaLink: "/services",
    bgGradient: "linear-gradient(135deg, #4a6fa5 0%, #81a1d4 100%)"
  },
  {
    id: 2,
    title: "ΑΓΓΛΙΚΑ",
    subtitle: "ΓΙΑ ΟΛΟΥΣ",
    description: "Αγγλικά για παιδιά, εφήβους και ενήλικες με πιστοποιημένους εκπαιδευτές",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop&crop=center",
    ctaText: "Μάθετε Αγγλικά",
    ctaLink: "/services",
    bgGradient: "linear-gradient(135deg, #81a1d4 0%, #c9b6e4 100%)"
  },
  {
    id: 3,
    title: "ΓΕΡΜΑΝΙΚΑ",
    subtitle: "ΚΑΙ ΓΑΛΛΙΚΑ",
    description: "Ευρωπαϊκές γλώσσες με σύγχρονα μεθόδους διδασκαλίας και πιστοποιήσεις",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
    ctaText: "Ευρωπαϊκές Γλώσσες",
    ctaLink: "/services",
    bgGradient: "linear-gradient(135deg, #c9b6e4 0%, #f78da7 100%)"
  },
  {
    id: 4,
    title: "ΠΙΣΤΟΠΟΙΗΣΕΙΣ",
    subtitle: "ΔΙΕΘΝΕΙΣ",
    description: "Προετοιμασία για IELTS, TOEFL, Cambridge, Goethe και άλλες διεθνείς εξετάσεις",
    image: "https://images.unsplash.com/photo-1523240798030-4b38b0b0b0b0?w=800&h=600&fit=crop&crop=center",
    ctaText: "Προετοιμασία Εξετάσεων",
    ctaLink: "/services",
    bgGradient: "linear-gradient(135deg, #f78da7 0%, #fabeb6 100%)"
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPlaying])

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
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1500 ease-in-out"
          style={{
            backgroundImage: `url(${currentData.image})`,
            filter: "brightness(0.6) contrast(1.05)"
          }}
        />
        <div
          className="absolute inset-0 transition-all duration-1500 ease-in-out"
          style={{ background: currentData.bgGradient, opacity: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto text-center text-white">
          
          {/* Logo Section */}
          <div className="mb-6 lg:mb-8">
            <div className="inline-block bg-white/15 backdrop-blur-md rounded-2xl p-4 lg:p-5 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <motion.div
                className="relative w-20 h-20 lg:w-24 lg:h-24"
                initial={{ 
                  clipPath: "inset(0 100% 0 0)",
                  opacity: 0,
                  scale: 0.5,
                  rotate: -20
                }}
                animate={{ 
                  clipPath: "inset(0 0% 0 0)",
                  opacity: 1,
                  scale: 1,
                  rotate: 0
                }}
                transition={{ 
                  duration: 2.0,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.8
                }}
              >
                <motion.div
                  className="relative w-full h-full"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 2, -2, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img
                    src="/alfa-logo.png"
                    alt="Alfa School Logo - Κέντρα Ξένων Γλωσσών"
                    className="w-full h-full object-contain filter drop-shadow-lg"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-3 lg:gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 lg:px-6 py-2 lg:py-3 mb-6 lg:mb-8 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-white"></div>
              <span className="font-semibold text-white/90 text-xs lg:text-sm tracking-wide">ΑΠΟ ΤΟ 1986</span>
            </div>
            <div className="w-px h-3 lg:h-4 bg-white/40"></div>
            <span className="font-medium text-white/80 text-xs lg:text-sm tracking-wide">35+ ΧΡΟΝΙΑ ΑΡΙΣΤΕΙΑΣ</span>
          </div>

          {/* Main Title */}
          <div className="mb-6 lg:mb-8">
            <h1 className="font-black leading-tight mb-4" style={{ fontSize: "clamp(2.2rem, 7vw, 5rem)" }}>
              <div className="mb-1">
                <span className="text-white drop-shadow-2xl tracking-tight">{currentData.title}</span>
              </div>
              <div>
                <span className="text-white/95 drop-shadow-2xl tracking-tight">
                  {currentData.subtitle}
                </span>
              </div>
            </h1>
          </div>

          {/* Description */}
          <p className="text-base lg:text-lg xl:text-xl text-white/85 leading-relaxed mb-8 lg:mb-10 max-w-3xl mx-auto font-normal drop-shadow-md">
            {currentData.description}
          </p>

          {/* CTA Button */}
          <div className="mb-10">
            <Button
              size="lg"
              className="px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl text-white border-0 bg-white/15 backdrop-blur-md hover:bg-white/25 border border-white/20"
            >
              {currentData.ctaText}
            </Button>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-3">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="p-2.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex gap-2">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-150"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 z-20">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
          <span className="text-white/90 font-medium text-xs tracking-wide">
            {currentSlide + 1} / {carouselData.length}
          </span>
        </div>
      </div>
    </div>
  )
}
