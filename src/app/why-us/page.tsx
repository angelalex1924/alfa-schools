"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NotebookHero from "@/components/NotebookHero"
import SchoolBreadcrumb from "@/components/SchoolBreadcrumb"
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  GraduationCap, 
  Users, 
  MapPin, 
  BookOpen, 
  Award, 
  Heart, 
  Globe, 
  Star,
  Clock,
  CheckCircle,
  Lightbulb,
  Target,
  Trophy,
  BookMarked,
  Users2,
  Building2,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  Play,
  PenTool,
  Pencil,
  Eraser,
  BarChart3
} from 'lucide-react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Helper function to safely get string from translation
const getString = (value: string | string[]): string => {
  return Array.isArray(value) ? value.join(' ') : value
}

export default function WhyUs() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)
  const teachersRef = useRef<HTMLDivElement>(null)
  const centersRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const philosophyRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // History section with image reveal
      const historyImages = gsap.utils.toArray('.history-image')
      const historyTexts = gsap.utils.toArray('.history-text')

      gsap.fromTo(historyImages,
        { 
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          y: 50,
          opacity: 0
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: historyRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1
          }
        }
      )

      gsap.fromTo(historyTexts,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: historyRef.current,
            start: "top 70%"
          }
        }
      )

      // Teachers section
      gsap.fromTo('.teacher-card',
        { scale: 0.8, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: teachersRef.current,
            start: "top 80%"
          }
        }
      )

      // Centers section with parallax
      gsap.fromTo('.center-card',
        { y: 100, opacity: 0, rotation: 5 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: centersRef.current,
            start: "top 80%"
          }
        }
      )

      // Services section
      gsap.fromTo('.service-item',
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%"
          }
        }
      )

      // Philosophy section
      gsap.fromTo('.philosophy-content',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 80%"
          }
        }
      )

      // FAQ section
      gsap.fromTo('.faq-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%"
          }
        }
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50/30 to-orange-50 dark:from-slate-900 dark:via-amber-950/40 dark:to-orange-950/30 relative overflow-hidden">
      {/* School Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            #d97706 10px,
            #d97706 11px
          )`
        }}></div>
      </div>
      
      {/* Notebook Lines Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            transparent,
            transparent 24px,
            #d97706 24px,
            #d97706 25px
          )`
        }}></div>
      </div>
      
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SchoolBreadcrumb 
            items={[
              { label: getString(t('breadcrumbs.home')), href: '/' },
              { label: getString(t('navigation.whyUs')) }
            ]}
          />
        </div>
      </div>

      {/* Notebook Hero Section */}
      <NotebookHero />

      {/* History Section - Enhanced School Style */}
      <section ref={historyRef} className="py-20 bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-slate-800 dark:to-amber-900/20 relative overflow-hidden">
        {/* School Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              #d97706 10px,
              #d97706 11px
            )`
          }}></div>
        </div>
        
        {/* Notebook lines background */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 24px,
              #d97706 24px,
              #d97706 25px
            )`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-lg border border-amber-200/50 dark:border-amber-700/50 mb-8">
              <PenTool className="w-6 h-6 text-amber-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
                {getString(t('whyUs.history.title'))}
              </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Images Container - Notebook Style */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="history-image relative overflow-hidden rounded-lg shadow-2xl border-2 border-amber-200 dark:border-amber-700">
                  <img 
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="ALFA School 1986"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">1986</div>
                    <p className="text-xs mt-1">Νέα Φιλαδέλφεια</p>
                  </div>
                </div>
                <div className="history-image relative overflow-hidden rounded-lg shadow-2xl border-2 border-amber-200 dark:border-amber-700">
                  <img 
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="ALFA School 1996"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">1996</div>
                    <p className="text-xs mt-1">Χαλάνδρι</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content - Notebook Style */}
            <div className="space-y-8">
              <div className="history-text bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-amber-200/50 dark:border-amber-700/50">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  {getString(t('whyUs.history.title'))}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {getString(t('whyUs.history.content'))}
                </p>
              </div>

              <div className="history-text bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-amber-200/50 dark:border-amber-700/50">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  {getString(t('whyUs.history.evolution.title'))}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {getString(t('whyUs.history.evolution.content'))}
                </p>
              </div>

              <div className="history-text bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-amber-200/50 dark:border-amber-700/50">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  {getString(t('whyUs.history.expansion.title'))}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {getString(t('whyUs.history.expansion.content'))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Section - Enhanced School Style */}
      <section ref={teachersRef} className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
        {/* School Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              #3b82f6 10px,
              #3b82f6 11px
            )`
          }}></div>
        </div>
        
        {/* Notebook lines background */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 24px,
              #3b82f6 24px,
              #3b82f6 25px
            )`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-lg border border-blue-200/50 dark:border-blue-700/50 mb-8">
              <Pencil className="w-6 h-6 text-blue-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
                {getString(t('whyUs.teachers.title'))}
              </h2>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              {getString(t('whyUs.teachers.subtitle'))}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="teacher-card bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-blue-200/50 dark:border-blue-700/50">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">{getString(t('whyUs.teachers.qualified.title'))}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {getString(t('whyUs.teachers.qualified.content'))}
              </p>
            </div>

            <div className="teacher-card bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-blue-200/50 dark:border-blue-700/50">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">{getString(t('whyUs.teachers.methodology.title'))}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {getString(t('whyUs.teachers.methodology.content'))}
              </p>
            </div>

            <div className="teacher-card bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-blue-200/50 dark:border-blue-700/50">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">{getString(t('whyUs.teachers.personalized.title'))}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {getString(t('whyUs.teachers.personalized.content'))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Centers Section - Enhanced School Style */}
      <section ref={centersRef} className="py-20 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-slate-800 dark:to-green-900/20 relative overflow-hidden">
        {/* School Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              #10b981 10px,
              #10b981 11px
            )`
          }}></div>
        </div>
        
        {/* Notebook lines background */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 24px,
              #10b981 24px,
              #10b981 25px
            )`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-lg border border-green-200/50 dark:border-green-700/50 mb-8">
              <MapPin className="w-6 h-6 text-green-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
                {getString(t('whyUs.centers.title'))}
              </h2>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              {getString(t('whyUs.centers.subtitle'))}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="center-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 rounded-2xl p-8 shadow-2xl border border-blue-200/50 dark:border-blue-700/50">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{getString(t('whyUs.centers.neaPhiladelphia.title'))}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">{getString(t('whyUs.centers.neaPhiladelphia.description'))}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-600 dark:text-slate-300">+30 210 2777 725</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-600 dark:text-slate-300">{getString(t('whyUs.centers.neaPhiladelphia.address'))}</span>
                </div>
              </div>
            </div>

            <div className="center-card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 rounded-2xl p-8 shadow-2xl border border-green-200/50 dark:border-green-700/50">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{getString(t('whyUs.centers.chalandri.title'))}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">{getString(t('whyUs.centers.chalandri.description'))}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-500" />
                  <span className="text-slate-600 dark:text-slate-300">+30 210 6800 708</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span className="text-slate-600 dark:text-slate-300">{getString(t('whyUs.centers.chalandri.address'))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Notebook Style */}
      <section ref={servicesRef} className="py-20 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-slate-800 dark:to-purple-900/20 relative overflow-hidden">
        {/* Notebook lines background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 24px,
              #e5e7eb 24px,
              #e5e7eb 25px
            )`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-lg border border-purple-200/50 dark:border-purple-700/50 mb-8">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
                {getString(t('whyUs.services.title'))}
              </h2>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              {getString(t('whyUs.services.subtitle'))}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: getString(t('whyUs.services.allLevels.title')),
                description: getString(t('whyUs.services.allLevels.description')),
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: getString(t('whyUs.services.freeClasses.title')),
                description: getString(t('whyUs.services.freeClasses.description')),
                color: "from-pink-500 to-pink-600"
              },
              {
                icon: <BookMarked className="w-8 h-8" />,
                title: getString(t('whyUs.services.ebook.title')),
                description: getString(t('whyUs.services.ebook.description')),
                color: "from-green-500 to-green-600"
              },
              {
                icon: <Users2 className="w-8 h-8" />,
                title: getString(t('whyUs.services.reinforcement.title')),
                description: getString(t('whyUs.services.reinforcement.description')),
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: getString(t('whyUs.services.universityPrep.title')),
                description: getString(t('whyUs.services.universityPrep.description')),
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: getString(t('whyUs.services.abroadStudies.title')),
                description: getString(t('whyUs.services.abroadStudies.description')),
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((service, index) => (
              <div key={index} className="service-item bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-purple-200/50 dark:border-purple-700/50 hover:shadow-2xl transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 text-white`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section - Enhanced School Style */}
      <section ref={philosophyRef} className="py-20 bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-slate-800 dark:to-amber-900/20 relative overflow-hidden">
        {/* School Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              #d97706 10px,
              #d97706 11px
            )`
          }}></div>
        </div>
        
        {/* Notebook lines background */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 24px,
              #d97706 24px,
              #d97706 25px
            )`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="philosophy-content text-center">
            <div className="max-w-4xl mx-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-12 shadow-2xl border border-amber-200/50 dark:border-amber-700/50">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <blockquote className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-8 leading-relaxed">
                "{getString(t('whyUs.philosophy.quote'))}"
              </blockquote>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                {getString(t('whyUs.philosophy.content'))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Notebook Style */}
      <section ref={faqRef} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        {/* Notebook lines background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 24px,
              #e5e7eb 24px,
              #e5e7eb 25px
            )`
          }}></div>
          </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-lg border border-blue-200/50 dark:border-blue-700/50 mb-8">
              <Eraser className="w-6 h-6 text-blue-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
                {getString(t('whyUs.faq.title'))}
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: getString(t('whyUs.faq.whyLearn.question')),
                answer: getString(t('whyUs.faq.whyLearn.answer'))
              },
              {
                question: getString(t('whyUs.faq.age.question')),
                answer: getString(t('whyUs.faq.age.answer'))
              },
              {
                question: getString(t('whyUs.faq.dyslexia.question')),
                answer: getString(t('whyUs.faq.dyslexia.answer'))
              },
              {
                question: getString(t('whyUs.faq.classOrPrivate.question')),
                answer: getString(t('whyUs.faq.classOrPrivate.answer'))
              }
            ].map((faq, index) => (
              <div key={index} className="faq-item bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/50 dark:border-blue-700/50">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">?</span>
                  </div>
                  {faq.question}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ALFA Section - School Style */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900 dark:to-yellow-800 relative overflow-hidden">
        {/* Notebook lines background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 24px,
              #d97706 24px,
              #d97706 25px
            )`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
              {getString(t('whyUs.title'))}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              {getString(t('whyUs.subtitle'))}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Experience */}
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-2 border-amber-200 dark:border-amber-600 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                {getString(t('whyUs.stats.experience.title'))}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {getString(t('whyUs.stats.experience.content'))}
              </p>
            </div>

            {/* Success Stories */}
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-2 border-green-200 dark:border-green-600 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                {getString(t('whyUs.stats.successes.title'))}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {getString(t('whyUs.stats.successes.content'))}
              </p>
            </div>

            {/* Quality Education */}
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-2 border-blue-200 dark:border-blue-600 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                {getString(t('whyUs.stats.quality.title'))}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {getString(t('whyUs.stats.quality.content'))}
              </p>
            </div>

            {/* Family Approach */}
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-2 border-purple-200 dark:border-purple-600 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                {getString(t('whyUs.stats.family.title'))}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {getString(t('whyUs.stats.family.content'))}
              </p>
            </div>
          </div>

          {/* Real Reasons Section */}
          <div className="mt-16 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border-2 border-amber-200 dark:border-amber-600">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 text-center">
              {getString(t('whyUs.reasons.title'))}
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <PenTool className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                      {getString(t('whyUs.reasons.qualifiedTeachers.title'))}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      {getString(t('whyUs.reasons.qualifiedTeachers.content'))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                      {getString(t('whyUs.reasons.personalizedApproach.title'))}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      {getString(t('whyUs.reasons.personalizedApproach.content'))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                      {getString(t('whyUs.reasons.modernMethod.title'))}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      {getString(t('whyUs.reasons.modernMethod.content'))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                      {getString(t('whyUs.reasons.smallGroups.title'))}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      {getString(t('whyUs.reasons.smallGroups.content'))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                      {getString(t('whyUs.reasons.multicultural.title'))}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      {getString(t('whyUs.reasons.multicultural.content'))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                      {getString(t('whyUs.reasons.results.title'))}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      {getString(t('whyUs.reasons.results.content'))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section - School Style */}
      <section className="py-20 bg-gradient-to-br from-amber-100 to-yellow-200 dark:from-amber-900 dark:to-yellow-800 relative overflow-hidden">
        {/* Notebook lines background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 24px,
              #d97706 24px,
              #d97706 25px
            )`
          }}></div>
          </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border-2 border-amber-300 dark:border-amber-600">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
              {getString(t('whyUs.cta.title'))}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              {getString(t('whyUs.cta.subtitle'))}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                {getString(t('whyUs.cta.viewServices'))}
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-amber-500 text-amber-600 dark:text-amber-400 rounded-2xl hover:bg-amber-500 hover:text-white transition-all duration-300 text-lg font-semibold"
              >
                {getString(t('whyUs.cta.contactUs'))}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}