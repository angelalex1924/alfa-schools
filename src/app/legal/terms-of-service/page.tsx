"use client"

import React, { useEffect, useRef, useState } from "react"
import Navbar from "@/components/ResponsiveNav"
import { Component as Footer } from "@/components/footer-taped-design"
import { FileText, BookOpen, UserCheck, CreditCard, Clock, AlertCircle, Mail, ChevronRight, ScrollText, Users, CheckCircle, MessageSquare, Shield, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

// Helper function to safely get string from translation
const getString = (value: string | string[]): string => {
  return Array.isArray(value) ? value.join(' ') : value
}

// Helper function to get sections data based on language
const getSections = (t: (key: string) => string | string[]) => [
  {
    id: "overview",
    icon: <FileText className="w-6 h-6" />,
    title: getString(t('terms.overview.title')),
    summary: getString(t('terms.overview.summary')),
    content: Array.isArray(t('terms.overview.content')) ? t('terms.overview.content') as string[] : [t('terms.overview.content') as string],
    legal: "Αστικός Κώδικας"
  },
  {
    id: "registration",
    icon: <UserCheck className="w-6 h-6" />,
    title: getString(t('terms.registration.title')),
    summary: getString(t('terms.registration.summary')),
    content: Array.isArray(t('terms.registration.content')) ? t('terms.registration.content') as string[] : [t('terms.registration.content') as string],
    legal: "Νόμος περί Εκπαίδευσης"
  },
  {
    id: "fees",
    icon: <CreditCard className="w-6 h-6" />,
    title: getString(t('terms.fees.title')),
    summary: getString(t('terms.fees.summary')),
    content: Array.isArray(t('terms.fees.content')) ? t('terms.fees.content') as string[] : [t('terms.fees.content') as string],
    legal: "Κανονισμός Λειτουργίας"
  },
  {
    id: "attendance",
    icon: <Clock className="w-6 h-6" />,
    title: getString(t('terms.attendance.title')),
    summary: getString(t('terms.attendance.summary')),
    content: Array.isArray(t('terms.attendance.content')) ? t('terms.attendance.content') as string[] : [t('terms.attendance.content') as string],
    legal: "Εσωτερικός Κανονισμός"
  },
  {
    id: "evaluation",
    icon: <CheckCircle className="w-6 h-6" />,
    title: getString(t('terms.evaluation.title')),
    summary: getString(t('terms.evaluation.summary')),
    content: Array.isArray(t('terms.evaluation.content')) ? t('terms.evaluation.content') as string[] : [t('terms.evaluation.content') as string],
    legal: "Αξιολογητική Πολιτική"
  },
  {
    id: "parentMeetings",
    icon: <MessageSquare className="w-6 h-6" />,
    title: getString(t('terms.parentMeetings.title')),
    summary: getString(t('terms.parentMeetings.summary')),
    content: Array.isArray(t('terms.parentMeetings.content')) ? t('terms.parentMeetings.content') as string[] : [t('terms.parentMeetings.content') as string],
    legal: "Συνεργασία Γονέων"
  },
  {
    id: "behavior",
    icon: <Shield className="w-6 h-6" />,
    title: getString(t('terms.behavior.title')),
    summary: getString(t('terms.behavior.summary')),
    content: Array.isArray(t('terms.behavior.content')) ? t('terms.behavior.content') as string[] : [t('terms.behavior.content') as string],
    legal: "Κανόνες Συμπεριφοράς"
  }
]

// Table of Contents data
const getTableOfContents = (t: (key: string) => string | string[]) => [
  { id: "overview", title: getString(t('terms.overview.title')), level: 1 },
  { id: "registration", title: getString(t('terms.registration.title')), level: 1 },
  { id: "fees", title: getString(t('terms.fees.title')), level: 1 },
  { id: "attendance", title: getString(t('terms.attendance.title')), level: 1 },
  { id: "evaluation", title: getString(t('terms.evaluation.title')), level: 1 },
  { id: "parentMeetings", title: getString(t('terms.parentMeetings.title')), level: 1 },
  { id: "behavior", title: getString(t('terms.behavior.title')), level: 1 },
]

export default function TermsOfServicePage() {
  const { t } = useLanguage()
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeSection, setActiveSection] = useState("")
  const [isTocOpen, setIsTocOpen] = useState(false)
  const pathname = usePathname()
  
  const sections = getSections(t)
  const tableOfContents = getTableOfContents(t)

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sectionsRef.current.filter(Boolean)
      let currentSection = ""
      
      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sections[index].id
          }
        }
      })
      
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-slate-900 dark:via-blue-950/40 dark:to-indigo-950/30 min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-100 via-slate-100 to-white dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 overflow-hidden">
        <div className="relative w-full flex flex-col items-center justify-center max-w-5xl mx-auto px-6 z-10">
          <h1
            ref={heroTitleRef}
            className="text-center flex flex-row flex-wrap items-center justify-center gap-3 md:gap-4 mb-8"
          >
            <span className="hero-icon inline-block align-middle relative">
              <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
            </span>
            <span className="hero-word text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-800 dark:text-white drop-shadow-lg">
              {getString(t('terms.title')).split(' ')[0]}
            </span>
            <span className="hero-word text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-800 dark:text-white drop-shadow-lg">
              {getString(t('terms.title')).split(' ').slice(1).join(' ')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto text-center font-medium leading-relaxed mb-6">
            {getString(t('terms.subtitle'))}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {getString(t('terms.lastUpdated'))}
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {getString(t('terms.compliance'))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Table of Contents - Desktop */}
      <div className="fixed top-1/2 left-6 transform -translate-y-1/2 z-50 hidden xl:block">
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-2xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden max-h-[70vh]">
          {/* Header */}
          <div className="bg-slate-800 dark:bg-slate-700 p-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ScrollText className="w-4 h-4" />
              {getString(t('navigation.tableOfContents'))}
            </h3>
          </div>
          
          {/* Navigation */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[55vh]">
            {tableOfContents.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  const element = document.getElementById(item.id)
                  if (element) {
                    const yOffset = -80
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
                    window.scrollTo({ top: y, behavior: 'smooth' })
                  }
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-300 flex items-center gap-3 relative group ${
                  activeSection === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm border border-blue-200 dark:border-blue-700'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/30 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {/* Progress indicator */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400 group-hover:bg-blue-500 group-hover:text-white'
                }`}>
                  {index + 1}
                </div>
                
                <span className="flex-1 font-medium text-xs">{item.title}</span>
                
                {/* Active indicator */}
                {activeSection === item.id && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>
          
          {/* Progress bar */}
          <div className="bg-slate-200 dark:bg-slate-600 h-1">
            <div 
              className="bg-blue-600 h-full transition-all duration-500"
              style={{ width: `${((tableOfContents.findIndex(item => item.id === activeSection) + 1) / tableOfContents.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Mobile TOC Button */}
      <button
        onClick={() => setIsTocOpen(!isTocOpen)}
        className="fixed bottom-6 left-6 z-50 xl:hidden bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20"
      >
        <div className="relative">
          {isTocOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </div>
      </button>

      {/* Enhanced Mobile TOC Overlay */}
      {isTocOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsTocOpen(false)} />
          <div className="absolute bottom-24 left-4 right-4 max-h-[70vh] bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ScrollText className="w-5 h-5" />
                  {getString(t('navigation.tableOfContents'))}
                </h3>
                <button
                  onClick={() => setIsTocOpen(false)}
                  className="text-white/80 hover:text-white p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="max-h-[calc(70vh-80px)] overflow-y-auto">
              <nav className="p-4 space-y-3">
                {tableOfContents.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setIsTocOpen(false)
                      const element = document.getElementById(item.id)
                      if (element) {
                        const yOffset = -80
                        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
                        window.scrollTo({ top: y, behavior: 'smooth' })
                      }
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4 border ${
                      activeSection === item.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-600 shadow-md'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/30 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500'
                    }`}
                  >
                    {/* Number circle */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 flex-shrink-0 ${
                      activeSection === item.id 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                    }`}>
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold block text-base leading-tight">{item.title}</span>
                      {activeSection === item.id && (
                        <span className="text-sm text-blue-600 dark:text-blue-400 block mt-1">Τρέχουσα ενότητα</span>
                      )}
                    </div>
                    
                    {/* Status indicator */}
                    <div className="flex-shrink-0">
                      {activeSection === item.id ? (
                        <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </button>
                ))}
              </nav>
              
              {/* Progress indicator */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                  <span>Πρόοδος ανάγνωσης</span>
                  <span>{Math.round(((tableOfContents.findIndex(item => item.id === activeSection) + 1) / tableOfContents.length) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((tableOfContents.findIndex(item => item.id === activeSection) + 1) / tableOfContents.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Sections */}
      <div className="flex-1 py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              ref={el => { sectionsRef.current[index] = el }}
              className="group"
            >
              {/* Section Card */}
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-slate-700/20 hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                    <div className="flex items-start gap-6">
                      <div className="section-icon p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <span className="text-blue-700 dark:text-blue-300">
                          {section.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-3 leading-tight">
                          {section.title}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
                          {section.summary}
                        </p>
                      </div>
                    </div>
                    
                    {/* Legal Reference Badge */}
                    <div className="flex-shrink-0">
                      <div className="bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/50 dark:to-amber-800/50 px-4 py-2 rounded-xl border border-amber-200 dark:border-amber-700">
                        <div className="flex items-center gap-2">
                          <ScrollText className="w-4 h-4 text-amber-700 dark:text-amber-300" />
                          <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                            {section.legal}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                    <div className="space-y-6">
                      {section.content.map((paragraph, pIndex) => (
                        <div key={pIndex} className="relative">
                          {paragraph.startsWith('•') ? (
                            <div className="flex items-start gap-3 pl-4">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                                {paragraph.substring(2)}
                              </p>
                            </div>
                          ) : paragraph.includes('•') ? (
                            <div className="space-y-3">
                              {paragraph.split('\n').map((line, lineIndex) => (
                                <div key={lineIndex}>
                                  {line.startsWith('•') ? (
                                    <div className="flex items-start gap-3 pl-4">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                                        {line.substring(2)}
                                      </p>
                                    </div>
                                  ) : line.startsWith('-') ? (
                                    <div className="flex items-start gap-3 pl-8">
                                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-3.5 flex-shrink-0"></div>
                                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                                        {line.substring(2)}
                                      </p>
                                    </div>
                                  ) : line.trim() && (
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                                      {line}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                              {paragraph}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Bottom Notice */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-slate-50 dark:from-slate-900 dark:to-blue-950 border-t border-slate-200 dark:border-slate-700 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Important Notice */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-slate-700/20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-amber-700 dark:text-amber-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                    {getString(t('terms.importantNotice'))}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {getString(t('terms.importantText'))}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-slate-700/20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl">
                  <Mail className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                    {getString(t('terms.contact'))}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {getString(t('terms.contactText'))}
                  </p>
                  <Link 
                    href="mailto:terms@languageschool.gr"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200"
                  >
                    terms@languageschool.gr
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
