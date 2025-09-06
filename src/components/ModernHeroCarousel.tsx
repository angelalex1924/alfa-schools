"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from "lucide-react"
import SplitText from "./SplitText"

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

const carouselData: CarouselSlide[] = [
  {
    id: 1,
    title: "ΚΕΝΤΡΑ",
    subtitle: "ΞΕΝΩΝ ΓΛΩΣΣΩΝ",
    description: "Μαζί από το 1986, με σεβασμό, αγάπη και αφοσίωση στη μάθηση",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&crop=center",
    ctaText: "Εξερευνήστε Μαθήματα",
    ctaLink: "/services",
    accentColor: "#4a6fa5",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: "ΑΓΓΛΙΚΑ",
    subtitle: "ΓΙΑ ΟΛΟΥΣ",
    description: "Αγγλικά για παιδιά, εφήβους και ενήλικες με πιστοποιημένους εκπαιδευτές",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=800&fit=crop&crop=center",
    ctaText: "Μάθετε Αγγλικά",
    ctaLink: "/services",
    accentColor: "#81a1d4",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    title: "ΓΕΡΜΑΝΙΚΑ",
    subtitle: "ΚΑΙ ΓΑΛΛΙΚΑ",
    description: "Ευρωπαϊκές γλώσσες με σύγχρονα μεθόδους διδασκαλίας και πιστοποιήσεις",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&crop=center",
    ctaText: "Ευρωπαϊκές Γλώσσες",
    ctaLink: "/services",
    accentColor: "#c9b6e4",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 4,
    title: "ΙΣΠΑΝΙΚΑ",
    subtitle: "ΚΑΙ ΙΤΑΛΙΚΑ",
    description: "Ρομανικές γλώσσες με πιστοποιημένους εκπαιδευτές και σύγχρονα εκπαιδευτικά υλικά",
    image: "https://static01.nyt.com/images/2024/07/12/books/review/1221stCentury-Day5/1221stCentury-Day5-facebookJumbo.jpg",
    ctaText: "Ρομανικές Γλώσσες",
    ctaLink: "/services",
    accentColor: "#fabeb6",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
  },
  {
    id: 5,
    title: "ΔΙΕΘΝΕΙΣ",
    subtitle: "ΠΙΣΤΟΠΟΙΗΣΕΙΣ",
    description: "Προετοιμασία για IELTS, TOEFL, Cambridge, Goethe και άλλες διεθνείς εξετάσεις",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=800&fit=crop&crop=center",
    ctaText: "Προετοιμασία Εξετάσεων",
    ctaLink: "/services",
    accentColor: "#f78da7",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  }
]

export default function ModernHeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

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
      className="relative min-h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background with Parallax Effect */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-2000 ease-out"
          style={{
            backgroundImage: `url(${currentData.image})`,
            filter: "brightness(0.7) contrast(1.1) saturate(1.2)",
            transform: isHovered ? "scale(1.05)" : "scale(1)"
          }}
        />
        <div
          className="absolute inset-0 transition-all duration-2000 ease-out"
          style={{ 
            background: currentData.gradient, 
            opacity: 0.4,
            mixBlendMode: "overlay"
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20 animate-pulse"
            style={{
              backgroundColor: currentData.accentColor,
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 lg:px-16 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Side - Content */}
            <div className="text-center lg:text-left space-y-8">
              
              {/* Logo */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-white/10 rounded-xl blur-sm opacity-60 group-hover:opacity-80 transition duration-700"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-xl px-6 py-1 border border-white/10">
                    <img
                      src="/alfa-logo.png"
                      alt="Alfa School Logo"
                      className="w-24 h-24 lg:w-32 lg:h-32 object-contain filter drop-shadow-xl transition-all duration-500 group-hover:scale-105"
                      style={{
                        filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.2)) brightness(1.05)"
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 shadow-lg">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentData.accentColor }}></div>
                  <span className="text-white/90 font-medium text-sm tracking-wide">ΑΠΟ ΤΟ 1986</span>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-4">
                <h1 className="font-black leading-tight" style={{ fontSize: "clamp(1.8rem, 5vw, 4.5rem)" }}>
                  <div className="mb-2">
                    <span 
                      key={`title-${currentSlide}`}
                      className="text-white drop-shadow-2xl tracking-tight animate-fade-in-up"
                      style={{ textShadow: `0 0 30px ${currentData.accentColor}40` }}
                    >
                      {currentData.title}
                    </span>
                  </div>
                  <div>
                    <span 
                      key={`subtitle-${currentSlide}`}
                      className="text-white/95 drop-shadow-2xl tracking-tight animate-fade-in-up"
                    >
                      {currentData.subtitle}
                    </span>
                  </div>
                </h1>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                {currentData.description}
              </p>

              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base lg:text-lg transition-all duration-300 hover:scale-105 text-white border-0 overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentData.accentColor} 0%, ${currentData.accentColor}CC 100%)`,
                    boxShadow: `0 10px 30px ${currentData.accentColor}40`
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {currentData.ctaText}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(135deg, ${currentData.accentColor}CC 0%, ${currentData.accentColor} 100%)` }}
                  />
                </Button>
              </div>
            </div>

            {/* Right Side - Visual Element */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main Card */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-white/10 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden">
                      <img
                        src={currentData.image}
                        alt={currentData.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-white/15 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">35+</div>
                    <div className="text-xs text-white/80">Χρόνια</div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white/15 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">1000+</div>
                    <div className="text-xs text-white/80">Μαθητές</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 shadow-lg">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
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
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="flex flex-col gap-2">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  )
}
