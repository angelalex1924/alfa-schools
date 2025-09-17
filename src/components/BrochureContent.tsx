"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Star, Users, BookOpen, Globe, Award, Heart, Lightbulb, Phone, Mail, ExternalLink, GraduationCap, School, BookMarked, Clock, Calendar, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { FranceFlagIcon } from "./flag-icons";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BrochureContent = () => {
  const { t } = useLanguage()
  const { isDarkMode } = useTheme()
  
  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const centersRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const languagesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Helper function to safely get arrays from translations
  const getTranslationArray = (key: string, fallback: string[]): string[] => {
    const translation = t(key)
    return Array.isArray(translation) ? translation as unknown as string[] : fallback
  }

  // GSAP animations
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // History section animation
      gsap.fromTo(historyRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: historyRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Centers section animation
      gsap.fromTo(centersRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: centersRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Services section animation
      gsap.fromTo(servicesRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Features section animation
      gsap.fromTo(featuresRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Philosophy section animation
      gsap.fromTo(philosophyRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Languages section animation
      gsap.fromTo(languagesRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: languagesRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Contact section animation
      gsap.fromTo(contactRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, [heroRef, historyRef, centersRef, servicesRef, featuresRef, philosophyRef, languagesRef, contactRef]);

    return () => ctx.revert();
  }, []);
  
  const features = [
    {
      icon: Users,
      title: t('services.allAges.title'),
      description: t('services.allAges.description'),
      color: "from-blue-500/10 to-blue-600/10"
    },
    {
      icon: BookOpen,
      title: t('services.reinforcement.title'),
      description: t('services.reinforcement.description'),
      color: "from-green-500/10 to-green-600/10"
    },
    {
      icon: Star,
      title: t('services.universityPrep.title'),
      description: t('services.universityPrep.description'),
      color: "from-yellow-500/10 to-yellow-600/10"
    },
    {
      icon: Globe,
      title: t('services.ieltsToefl.title'),
      description: t('services.ieltsToefl.description'),
      color: "from-purple-500/10 to-purple-600/10"
    },
    {
      icon: Lightbulb,
      title: t('services.summer.title'),
      description: t('services.summer.description'),
      color: "from-orange-500/10 to-orange-600/10"
    },
    {
      icon: Heart,
      title: t('services.professionals.title'),
      description: t('services.professionals.description'),
      color: "from-red-500/10 to-red-600/10"
    }
  ];

  // Safe array handling with fallbacks
  const additionalFeatures = getTranslationArray('additionalFeatures.features', [
    "Σύγχρονες αίθουσες με διαδραστικούς πίνακες",
    "Δανειστική βιβλιοθήκη",
    "Τετράδιο συνεργασίας μαθητή – γονέα – καθηγητή",
    "Τακτικές συγκεντρώσεις γονέων",
    "Πολιτιστικές & ψυχαγωγικές εκδηλώσεις",
    "Συνεργασίες με γνωστά κολλέγια του εξωτερικού",
    "Εκπαιδευτικά ταξίδια στο εξωτερικό"
  ]);

  const usefulLinksData = getTranslationArray('usefulLinks.links', [
    "Ελληνοαμερικάνικη Ένωση",
    "British Council", 
    "Γαλλικό Ινστιτούτο",
    "Europalso",
    "Cambridge Dictionary"
  ]);

  const usefulLinks = usefulLinksData.map((name: string, index: number) => ({
    name,
    url: "#"
  }));

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 space-y-24">
      {/* Hero Section - Child-Friendly School Style */}
      <div className="relative" ref={heroRef}>
        {/* Child-Friendly Notebook Paper Background */}
        <div className="relative backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-blue-300/40 dark:border-blue-600/40 overflow-hidden transform hover:scale-[1.02] transition-all duration-500" style={{
          backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
          boxShadow: isDarkMode 
            ? '0 35px 70px -12px rgba(74, 111, 165, 0.4), 0 0 0 1px rgba(74, 111, 165, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
            : '0 35px 70px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
          backgroundImage: isDarkMode 
            ? 'none' 
            : 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #e0f2fe 100%), linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)'
        }}>
          {/* Enhanced Notebook Lines Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Horizontal lines with gradient */}
            {[...Array(15)].map((_, i) => (
              <div
                key={`line-${i}`}
                className={`absolute w-full h-px ${
                  isDarkMode ? 'bg-blue-400/20' : 'bg-blue-300/40'
                }`}
                style={{
                  top: `${8 + i * 5.5}%`,
                  left: '12%',
                  right: '6%'
                }}
              />
            ))}
            
            {/* Enhanced red margin line */}
            <div className={`absolute left-10 top-0 bottom-0 w-1 ${
              isDarkMode ? 'bg-red-400/60' : 'bg-red-400/70'
            } shadow-sm`}></div>
            
            {/* Enhanced holes for binder */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`hole-${i}`}
                className={`absolute w-2 h-2 rounded-full border-2 ${
                  isDarkMode 
                    ? 'bg-blue-300/60 border-blue-400/80' 
                    : 'bg-blue-200/70 border-blue-300/90'
                } shadow-sm`}
                style={{
                  left: '6px',
                  top: `${12 + i * 10}%`
                }}
              />
            ))}
            
            {/* Decorative corner elements */}
            <div className="absolute top-4 right-4 w-8 h-8 border-2 border-blue-300/50 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-400/60 rounded-full"></div>
            </div>
          </div>

          {/* Enhanced Content */}
          <div className="relative z-10 p-8 lg:p-12 text-center">
            {/* Enhanced School Badge */}
            <div className="inline-flex items-center gap-3 backdrop-blur-sm border-3 border-blue-300/50 rounded-full px-8 py-3 mb-10 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 shadow-lg">
              <div className="w-3 h-3 rounded-full animate-pulse bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <span className="font-bold text-blue-800 text-lg" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('hero.title')}
              </span>
              <GraduationCap className="w-5 h-5 text-blue-600" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              <span className="block text-slate-800 dark:text-white drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('hero.years')}
              </span>
              <span className="block mt-3 text-slate-700 dark:text-slate-300 drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('hero.experience')}
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
              {t('hero.subtitle')}
            </p>
            
            {/* Decorative elements */}
            <div className="flex justify-center mt-8 space-x-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* History Section - Child-Friendly School Style */}
      <div className="relative" ref={historyRef}>
        {/* Child-Friendly School Notebook Paper Background */}
        <div className="relative backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-yellow-300/40 dark:border-yellow-600/40 overflow-hidden transform hover:scale-[1.01] transition-all duration-500" style={{
          backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
          boxShadow: isDarkMode 
            ? '0 35px 70px -12px rgba(251, 191, 36, 0.4), 0 0 0 1px rgba(251, 191, 36, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
            : '0 35px 70px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
          backgroundImage: isDarkMode 
            ? 'none' 
            : 'linear-gradient(135deg, #fefce8 0%, #ffffff 50%, #fef3c7 100%), linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.03) 50%, transparent 100%)'
        }}>
          {/* Enhanced Notebook Lines Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Horizontal lines with gradient */}
            {[...Array(18)].map((_, i) => (
              <div
                key={`line-${i}`}
                className={`absolute w-full h-px ${
                  isDarkMode ? 'bg-yellow-400/20' : 'bg-yellow-300/40'
                }`}
                style={{
                  top: `${6 + i * 4.5}%`,
                  left: '12%',
                  right: '6%'
                }}
              />
            ))}
            
            {/* Enhanced red margin line */}
            <div className={`absolute left-10 top-0 bottom-0 w-1 ${
              isDarkMode ? 'bg-red-400/60' : 'bg-red-400/70'
            } shadow-sm`}></div>
            
            {/* Enhanced holes for binder */}
            {[...Array(10)].map((_, i) => (
              <div
                key={`hole-${i}`}
                className={`absolute w-2 h-2 rounded-full border-2 ${
                  isDarkMode 
                    ? 'bg-yellow-300/60 border-yellow-400/80' 
                    : 'bg-yellow-200/70 border-yellow-300/90'
                } shadow-sm`}
                style={{
                  left: '6px',
                  top: `${8 + i * 8}%`
                }}
              />
            ))}
            
            {/* Decorative corner elements */}
            <div className="absolute top-4 right-4 w-8 h-8 border-2 border-yellow-300/50 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-400/60 rounded-full"></div>
            </div>
          </div>

          {/* Enhanced Content */}
          <div className="relative z-10 p-8 lg:p-12">
            {/* Enhanced School Header */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 border-4 border-white/40 transform hover:scale-110 transition-all duration-300">
                  <Star className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('history.title')}
              </h2>
            </div>
            
            <div className="text-center space-y-8 text-xl text-slate-600 dark:text-slate-300 px-6">
              <p className="leading-relaxed font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('history.paragraph1')}
              </p>
              <p className="leading-relaxed font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('history.paragraph2')}
              </p>
              <p className="leading-relaxed font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('history.paragraph3')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Centers Section - Beautiful School Style */}
      <div className="grid md:grid-cols-2 gap-12" ref={centersRef}>
        {/* Nea Philadelphia Center */}
        <div className="relative group">
          <div className="relative backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-green-300/40 dark:border-green-600/40 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[1.03] transform" style={{
            backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
            boxShadow: isDarkMode 
              ? '0 35px 70px -12px rgba(34, 197, 94, 0.4), 0 0 0 1px rgba(34, 197, 94, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
              : '0 35px 70px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
            backgroundImage: isDarkMode 
              ? 'none' 
              : 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #dcfce7 100%), linear-gradient(90deg, transparent 0%, rgba(34, 197, 94, 0.03) 50%, transparent 100%)'
          }}>
            {/* Enhanced Notebook Lines Background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className={`absolute w-full h-px ${
                    isDarkMode ? 'bg-green-400/20' : 'bg-green-300/40'
                  }`}
                  style={{
                    top: `${12 + i * 7}%`,
                    left: '12%',
                    right: '6%'
                  }}
                />
              ))}
              
              <div className={`absolute left-10 top-0 bottom-0 w-1 ${
                isDarkMode ? 'bg-red-400/60' : 'bg-red-400/70'
              } shadow-sm`}></div>
              
              {[...Array(5)].map((_, i) => (
                <div
                  key={`hole-${i}`}
                  className={`absolute w-2 h-2 rounded-full border-2 ${
                    isDarkMode 
                      ? 'bg-green-300/60 border-green-400/80' 
                      : 'bg-green-200/70 border-green-300/90'
                  } shadow-sm`}
                  style={{
                    left: '6px',
                    top: `${15 + i * 15}%`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-8 lg:p-10 text-center">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-green-400 to-emerald-500 border-4 border-white/40">
                  <MapPin className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('centers.neaPhiladelphia.title')}
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('centers.neaPhiladelphia.description')}
              </p>
              
              {/* Contact Information */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-center gap-3 text-green-700 dark:text-green-300">
                  <Phone className="w-5 h-5" />
                  <span className="font-bold text-lg" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    +30 210 2777 725
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3 text-green-700 dark:text-green-300">
                  <Mail className="w-5 h-5" />
                  <span className="font-bold text-lg" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    alfaschoolfiladelfeia@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chalandri Center */}
        <div className="relative group">
          <div className="relative backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-purple-300/40 dark:border-purple-600/40 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[1.03] transform" style={{
            backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
            boxShadow: isDarkMode 
              ? '0 35px 70px -12px rgba(168, 85, 247, 0.4), 0 0 0 1px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
              : '0 35px 70px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
            backgroundImage: isDarkMode 
              ? 'none' 
              : 'linear-gradient(135deg, #faf5ff 0%, #ffffff 50%, #f3e8ff 100%), linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.03) 50%, transparent 100%)'
          }}>
            {/* Enhanced Notebook Lines Background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className={`absolute w-full h-px ${
                    isDarkMode ? 'bg-purple-400/20' : 'bg-purple-300/40'
                  }`}
                  style={{
                    top: `${12 + i * 7}%`,
                    left: '12%',
                    right: '6%'
                  }}
                />
              ))}
              
              <div className={`absolute left-10 top-0 bottom-0 w-1 ${
                isDarkMode ? 'bg-red-400/60' : 'bg-red-400/70'
              } shadow-sm`}></div>
              
              {[...Array(5)].map((_, i) => (
                <div
                  key={`hole-${i}`}
                  className={`absolute w-2 h-2 rounded-full border-2 ${
                    isDarkMode 
                      ? 'bg-purple-300/60 border-purple-400/80' 
                      : 'bg-purple-200/70 border-purple-300/90'
                  } shadow-sm`}
                  style={{
                    left: '6px',
                    top: `${15 + i * 15}%`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-8 lg:p-10 text-center">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-purple-400 to-pink-500 border-4 border-white/40">
                  <MapPin className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('centers.chalandri.title')}
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('centers.chalandri.description')}
              </p>
              
              {/* Contact Information */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-center gap-3 text-purple-700 dark:text-purple-300">
                  <Phone className="w-5 h-5" />
                  <span className="font-bold text-lg" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    +30 210 6800 708
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3 text-purple-700 dark:text-purple-300">
                  <Mail className="w-5 h-5" />
                  <span className="font-bold text-lg" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    info@alfaschoolchalandri.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section - Child-Friendly School Style */}
      <div className="space-y-16" ref={servicesRef}>
        {/* Child-Friendly School Header */}
        <div className="relative">
          <div className="relative backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-purple-300/40 dark:border-purple-600/40 overflow-hidden transform hover:scale-[1.01] transition-all duration-500" style={{
            backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
            boxShadow: isDarkMode 
              ? '0 35px 70px -12px rgba(168, 85, 247, 0.4), 0 0 0 1px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
              : '0 35px 70px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
            backgroundImage: isDarkMode 
              ? 'none' 
              : 'linear-gradient(135deg, #faf5ff 0%, #ffffff 50%, #f3e8ff 100%), linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.03) 50%, transparent 100%)'
          }}>
            {/* Enhanced Notebook Lines Background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className={`absolute w-full h-px ${
                    isDarkMode ? 'bg-purple-400/20' : 'bg-purple-300/40'
                  }`}
                  style={{
                    top: `${15 + i * 10}%`,
                    left: '12%',
                    right: '6%'
                  }}
                />
              ))}
              
              <div className={`absolute left-10 top-0 bottom-0 w-1 ${
                isDarkMode ? 'bg-red-400/60' : 'bg-red-400/70'
              } shadow-sm`}></div>
              
              {[...Array(4)].map((_, i) => (
                <div
                  key={`hole-${i}`}
                  className={`absolute w-2 h-2 rounded-full border-2 ${
                    isDarkMode 
                      ? 'bg-purple-300/60 border-purple-400/80' 
                      : 'bg-purple-200/70 border-purple-300/90'
                  } shadow-sm`}
                  style={{
                    left: '6px',
                    top: `${20 + i * 20}%`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-8 lg:p-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white/40">
                  <BookOpen className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('services.title')}
                </h2>
              </div>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('services.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colors = [
              "from-blue-400 to-blue-500",
              "from-green-400 to-green-500", 
              "from-yellow-400 to-yellow-500",
              "from-purple-400 to-purple-500",
              "from-red-400 to-red-500",
              "from-pink-400 to-pink-500"
            ];
            const borderColors = [
              "border-blue-300/40",
              "border-green-300/40",
              "border-yellow-300/40",
              "border-purple-300/40",
              "border-red-300/40",
              "border-pink-300/40"
            ];
            
            return (
              <div key={index} className="relative group">
                <div className={`relative backdrop-blur-xl rounded-3xl shadow-2xl border-4 ${borderColors[index]} overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:shadow-3xl transform`} style={{
                  backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
                  boxShadow: isDarkMode 
                    ? '0 35px 70px -12px rgba(74, 111, 165, 0.4), 0 0 0 1px rgba(74, 111, 165, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
                    : '0 35px 70px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)'
                }}>
                  {/* Enhanced School Notebook Lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`card-line-${i}`}
                        className={`absolute w-full h-px ${
                          isDarkMode ? 'bg-blue-400/15' : 'bg-blue-300/30'
                        }`}
                        style={{
                          top: `${15 + i * 8}%`,
                          left: '14%',
                          right: '8%'
                        }}
                      />
                    ))}
                    
                    {/* Enhanced red margin line */}
                    <div className={`absolute left-8 top-0 bottom-0 w-1 ${
                      isDarkMode ? 'bg-red-400/40' : 'bg-red-400/50'
                    } shadow-sm`}></div>
                    
                    {/* Enhanced holes for binder */}
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={`card-hole-${i}`}
                        className={`absolute w-1.5 h-1.5 rounded-full border ${
                          isDarkMode 
                            ? 'bg-blue-300/50 border-blue-400/70' 
                            : 'bg-blue-200/60 border-blue-300/80'
                        } shadow-sm`}
                        style={{
                          left: '4px',
                          top: `${20 + i * 18}%`
                        }}
                      />
                    ))}
                  </div>

                  {/* Enhanced Content */}
                  <div className="relative z-10 p-8 lg:p-10 text-center">
                    {/* Enhanced Grade Badge */}
                    <div className="flex justify-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${colors[index]} rounded-2xl flex items-center justify-center shadow-xl border-4 border-white/40 group-hover:scale-110 transition-all duration-300`}>
                        <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white text-center mb-4 drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {feature.title}
                    </h3>
                    <p className="text-lg text-slate-600 dark:text-slate-300 text-center leading-relaxed font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Features - Child-Friendly School Style */}
      <div className="relative" ref={featuresRef}>
        <div className="relative backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-green-300/40 dark:border-green-600/40 overflow-hidden transform hover:scale-[1.01] transition-all duration-500" style={{
          backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
          boxShadow: isDarkMode 
            ? '0 35px 70px -12px rgba(34, 197, 94, 0.4), 0 0 0 1px rgba(34, 197, 94, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
            : '0 35px 70px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
          backgroundImage: isDarkMode 
            ? 'none' 
            : 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #dcfce7 100%), linear-gradient(90deg, transparent 0%, rgba(34, 197, 94, 0.03) 50%, transparent 100%)'
        }}>
          {/* Enhanced Notebook Lines Background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={`line-${i}`}
                className={`absolute w-full h-px ${
                  isDarkMode ? 'bg-green-400/20' : 'bg-green-300/40'
                }`}
                style={{
                  top: `${8 + i * 7}%`,
                  left: '12%',
                  right: '6%'
                }}
              />
            ))}
            
            <div className={`absolute left-10 top-0 bottom-0 w-1 ${
              isDarkMode ? 'bg-red-400/60' : 'bg-red-400/70'
            } shadow-sm`}></div>
            
            {[...Array(6)].map((_, i) => (
              <div
                key={`hole-${i}`}
                className={`absolute w-2 h-2 rounded-full border-2 ${
                  isDarkMode 
                    ? 'bg-green-300/60 border-green-400/80' 
                    : 'bg-green-200/70 border-green-300/90'
                } shadow-sm`}
                style={{
                  left: '6px',
                  top: `${12 + i * 12}%`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 p-8 lg:p-12">
            {/* Enhanced School Header */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white/40">
                  <CheckCircle className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('additionalFeatures.title')}
                </h2>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalFeatures.map((feature: string, index: number) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-green-50 dark:from-green-900/20 dark:to-green-900/20 border-4 border-green-200/40 dark:border-green-700/40 rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-default shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-green-700 dark:text-green-300" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {feature}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Section - Child-Friendly School Style */}
      <div className="relative" ref={philosophyRef}>
        <div className="relative backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-pink-300/40 dark:border-pink-600/40 overflow-hidden transform hover:scale-[1.01] transition-all duration-500" style={{
          backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
          boxShadow: isDarkMode 
            ? '0 35px 70px -12px rgba(236, 72, 153, 0.4), 0 0 0 1px rgba(236, 72, 153, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
            : '0 35px 70px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
          backgroundImage: isDarkMode 
            ? 'none' 
            : 'linear-gradient(135deg, #fdf2f8 0%, #ffffff 50%, #fce7f3 100%), linear-gradient(90deg, transparent 0%, rgba(236, 72, 153, 0.03) 50%, transparent 100%)'
        }}>
          {/* Enhanced Notebook Lines Background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={`line-${i}`}
                className={`absolute w-full h-px ${
                  isDarkMode ? 'bg-pink-400/20' : 'bg-pink-300/40'
                }`}
                style={{
                  top: `${6 + i * 5.5}%`,
                  left: '12%',
                  right: '6%'
                }}
              />
            ))}
            
            <div className={`absolute left-10 top-0 bottom-0 w-1 ${
              isDarkMode ? 'bg-red-400/60' : 'bg-red-400/70'
            } shadow-sm`}></div>
            
            {[...Array(8)].map((_, i) => (
              <div
                key={`hole-${i}`}
                className={`absolute w-2 h-2 rounded-full border-2 ${
                  isDarkMode 
                    ? 'bg-pink-300/60 border-pink-400/80' 
                    : 'bg-pink-200/70 border-pink-300/90'
                } shadow-sm`}
                style={{
                  left: '6px',
                  top: `${10 + i * 10}%`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 p-8 lg:p-12">
            {/* Enhanced School Header */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white/40">
                  <Heart className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('philosophy.title')}
                </h2>
              </div>
            </div>
            
            <div className="text-center space-y-10 px-6">
              <blockquote className="text-2xl lg:text-3xl italic font-bold text-slate-700 dark:text-slate-300 leading-relaxed drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                "{t('philosophy.quote')}"
              </blockquote>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-5xl mx-auto leading-relaxed font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('philosophy.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Languages Section - Child-Friendly School Style */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12" ref={languagesRef}>
        {/* English Language Card */}
        <div className="relative group w-full">
          <div className="relative backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-red-300/40 dark:border-red-600/40 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[1.03] transform" style={{
            backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
            boxShadow: isDarkMode 
              ? '0 35px 70px -12px rgba(239, 68, 68, 0.4), 0 0 0 1px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
              : '0 35px 70px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
            backgroundImage: isDarkMode 
              ? 'none' 
              : 'linear-gradient(135deg, #fef2f2 0%, #ffffff 50%, #fee2e2 100%), linear-gradient(90deg, transparent 0%, rgba(239, 68, 68, 0.03) 50%, transparent 100%)'
          }}>
            {/* Enhanced Notebook Lines Background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className={`absolute w-full h-px ${
                    isDarkMode ? 'bg-red-400/10' : 'bg-red-300/20'
                  }`}
                  style={{
                    top: `${10 + i * 8}%`,
                    left: '12%',
                    right: '6%'
                  }}
                />
              ))}
              
              <div className={`absolute left-10 top-0 bottom-0 w-1 ${
                isDarkMode ? 'bg-red-400/60' : 'bg-red-400/70'
              } shadow-sm`}></div>
              
              {[...Array(5)].map((_, i) => (
                <div
                  key={`hole-${i}`}
                  className={`absolute w-2 h-2 rounded-full border-2 ${
                    isDarkMode 
                      ? 'bg-red-300/60 border-red-400/80' 
                      : 'bg-red-200/70 border-red-300/90'
                  } shadow-sm`}
                  style={{
                    left: '6px',
                    top: `${15 + i * 15}%`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-6 lg:p-10 pl-16 lg:pl-20">
              <div className="text-center mb-6 lg:mb-8">
                <div className="flex justify-center mb-4 lg:mb-6">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white/40">
                    <Globe className="w-6 h-6 lg:w-8 lg:h-8 text-white drop-shadow-lg" />
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('languages.english.title')}
                </h3>
              </div>
              <div className="space-y-4 lg:space-y-6">
                <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('languages.english.description1')}
                </p>
                <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('languages.english.description2')}
                </p>
                <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('languages.english.description3')}
                </p>
                <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('languages.english.description4')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* French Language Card */}
        <div className="relative group w-full">
          <div className="relative backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-blue-300/40 dark:border-blue-600/40 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[1.03] transform" style={{
            backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
            boxShadow: isDarkMode 
              ? '0 35px 70px -12px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
              : '0 35px 70px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
            backgroundImage: isDarkMode 
              ? 'none' 
              : 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #dbeafe 100%), linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)'
          }}>
            {/* Enhanced Notebook Lines Background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className={`absolute w-full h-px ${
                    isDarkMode ? 'bg-blue-400/10' : 'bg-blue-300/20'
                  }`}
                  style={{
                    top: `${10 + i * 8}%`,
                    left: '12%',
                    right: '6%'
                  }}
                />
              ))}
              
              <div className={`absolute left-10 top-0 bottom-0 w-1 ${
                isDarkMode ? 'bg-red-400/60' : 'bg-red-400/70'
              } shadow-sm`}></div>
              
              {[...Array(5)].map((_, i) => (
                <div
                  key={`hole-${i}`}
                  className={`absolute w-2 h-2 rounded-full border-2 ${
                    isDarkMode 
                      ? 'bg-blue-300/60 border-blue-400/80' 
                      : 'bg-blue-200/70 border-blue-300/90'
                  } shadow-sm`}
                  style={{
                    left: '6px',
                    top: `${15 + i * 15}%`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-6 lg:p-10 pl-16 lg:pl-20">
              <div className="text-center mb-6 lg:mb-8">
                <div className="flex justify-center mb-4 lg:mb-6">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white/40">
                    <FranceFlagIcon className="w-6 h-4 lg:w-8 lg:h-6 text-white drop-shadow-lg" />
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('languages.french.title')}
                </h3>
              </div>
              <div className="space-y-4 lg:space-y-6">
                <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('languages.french.description1')}
                </p>
                <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('languages.french.description2')}
                </p>
                <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('languages.french.description3')}
                </p>
                <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('languages.french.description4')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section - Child-Friendly School Style */}
      <div className="relative" ref={contactRef}>
        <div className="relative backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-blue-300/40 dark:border-blue-600/40 overflow-hidden transform hover:scale-[1.01] transition-all duration-500" style={{
          backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
          boxShadow: isDarkMode 
            ? '0 35px 70px -12px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
            : '0 35px 70px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
          backgroundImage: isDarkMode 
            ? 'none' 
            : 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #dbeafe 100%), linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)'
        }}>
          {/* Enhanced Notebook Lines Background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={`line-${i}`}
                className={`absolute w-full h-px ${
                  isDarkMode ? 'bg-blue-400/20' : 'bg-blue-300/40'
                }`}
                style={{
                  top: `${8 + i * 7}%`,
                  left: '12%',
                  right: '6%'
                }}
              />
            ))}
            
            <div className={`absolute left-10 top-0 bottom-0 w-1 ${
              isDarkMode ? 'bg-red-400/60' : 'bg-red-400/70'
            } shadow-sm`}></div>
            
            {[...Array(6)].map((_, i) => (
              <div
                key={`hole-${i}`}
                className={`absolute w-2 h-2 rounded-full border-2 ${
                  isDarkMode 
                    ? 'bg-blue-300/60 border-blue-400/80' 
                    : 'bg-blue-200/70 border-blue-300/90'
                } shadow-sm`}
                style={{
                  left: '6px',
                  top: `${12 + i * 12}%`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 p-8 lg:p-12 text-center">
            {/* Child-Friendly School Header */}
            <div className="mb-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white/40">
                  <Phone className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('contact.title')}
                </h3>
              </div>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('contact.subtitle')}
              </p>
            </div>
            
            {/* Contact Information for Both Centers */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
              {/* Nea Philadelphia Center */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-4 border-green-200/40 dark:border-green-700/40 rounded-2xl p-4 lg:p-6 hover:scale-105 transition-all duration-300 w-full">
                <div className="flex items-center justify-center gap-2 lg:gap-3 mb-3 lg:mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold text-green-700 dark:text-green-300" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    {t('contact.neaFiladelfeia')}
                  </h4>
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-center justify-center gap-2 lg:gap-3 text-green-700 dark:text-green-300">
                    <Phone className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="font-bold text-base lg:text-lg" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      +30 210 2777 725
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 lg:gap-3 text-green-700 dark:text-green-300">
                    <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="font-bold text-sm lg:text-lg break-all" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      alfaschoolfiladelfeia@gmail.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Chalandri Center */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-4 border-blue-200/40 dark:border-blue-700/40 rounded-2xl p-4 lg:p-6 hover:scale-105 transition-all duration-300 w-full">
                <div className="flex items-center justify-center gap-2 lg:gap-3 mb-3 lg:mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold text-blue-700 dark:text-blue-300" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    {t('contact.chalandri')}
                  </h4>
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-center justify-center gap-2 lg:gap-3 text-blue-700 dark:text-blue-300">
                    <Phone className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="font-bold text-base lg:text-lg" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      +30 210 6800 708
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 lg:gap-3 text-blue-700 dark:text-blue-300">
                    <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="font-bold text-sm lg:text-lg break-all" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      info@alfaschoolchalandri.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Child-Friendly Footer */}
      <div className="relative" style={{
        backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
        boxShadow: isDarkMode 
          ? '0 35px 70px -12px rgba(74, 111, 165, 0.4), 0 0 0 1px rgba(74, 111, 165, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
          : '0 35px 70px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
        backgroundImage: isDarkMode 
          ? 'none' 
          : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%), linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)',
        borderRadius: '2rem',
        padding: '4rem'
      }}>
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white/40">
              <School className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
          </div>
            <p className="text-4xl font-bold text-slate-800 dark:text-white leading-relaxed drop-shadow-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
              {t('footer.message')}
            </p>
        </div>
      </div>
    </div>
  );
};

export default BrochureContent;