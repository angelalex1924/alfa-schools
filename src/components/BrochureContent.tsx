"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Star, Users, BookOpen, Globe, Award, Heart, Lightbulb, Phone, Mail, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FranceFlagIcon } from "./flag-icons";

const BrochureContent = () => {
  const { t } = useLanguage()
  
  // Helper function to safely get arrays from translations
  const getTranslationArray = (key: string, fallback: string[]): string[] => {
    const translation = t(key)
    return Array.isArray(translation) ? translation as unknown as string[] : fallback
  }
  
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
      {/* Hero Section - School Style */}
      <div className="relative">
        {/* School Notebook Paper Background */}
        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
          {/* Notebook Lines Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Horizontal lines */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`line-${i}`}
                className={`absolute w-full h-px ${
                  'bg-blue-200/30'
                }`}
                style={{
                  top: `${10 + i * 6}%`,
                  left: '8%',
                  right: '4%'
                }}
              />
            ))}
            
            {/* Red margin line */}
            <div className={`absolute left-8 top-0 bottom-0 w-px ${
              'bg-red-300/50'
            }`}></div>
            
            {/* Holes for binder */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`hole-${i}`}
                className={`absolute w-1.5 h-1.5 rounded-full border ${
                  'bg-blue-200/50 border-blue-300/70'
                }`}
                style={{
                  left: '4px',
                  top: `${15 + i * 12}%`
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 lg:p-8 text-center">
            {/* School Badge */}
            <div className="inline-flex items-center gap-2 backdrop-blur-sm border-2 border-blue-200/30 rounded-full px-6 py-2 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="w-2 h-2 rounded-full animate-pulse bg-blue-500"></div>
              <span className="font-medium text-blue-700" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('hero.title')}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('hero.years')}
              </span>
              <span className="block mt-2 text-slate-700 dark:text-slate-300" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('hero.experience')}
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* History Section - School Style */}
      <div className="relative">
        {/* School Notebook Paper Background */}
        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
          {/* Notebook Lines Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Horizontal lines */}
            {[...Array(15)].map((_, i) => (
              <div
                key={`line-${i}`}
                className={`absolute w-full h-px ${
                  'bg-blue-200/30'
                }`}
                style={{
                  top: `${8 + i * 5}%`,
                  left: '8%',
                  right: '4%'
                }}
              />
            ))}
            
            {/* Red margin line */}
            <div className={`absolute left-8 top-0 bottom-0 w-px ${
              'bg-red-300/50'
            }`}></div>
            
            {/* Holes for binder */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`hole-${i}`}
                className={`absolute w-1.5 h-1.5 rounded-full border ${
                  'bg-blue-200/50 border-blue-300/70'
                }`}
                style={{
                  left: '4px',
                  top: `${12 + i * 10}%`
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 lg:p-8">
            {/* School Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 border-2 border-white/30">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('history.title')}
              </h2>
            </div>
            
            <div className="text-center space-y-6 text-lg text-slate-600 dark:text-slate-300 px-4">
              <p className="leading-relaxed" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('history.paragraph1')}
              </p>
              <p className="leading-relaxed" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('history.paragraph2')}
              </p>
              <p className="leading-relaxed" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('history.paragraph3')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Centers Section - School Style */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Nea Philadelphia Center */}
        <div className="relative group">
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
            {/* Notebook Lines Background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className={`absolute w-full h-px ${
                    'bg-blue-200/30'
                  }`}
                  style={{
                    top: `${15 + i * 8}%`,
                    left: '8%',
                    right: '4%'
                  }}
                />
              ))}
              
              <div className={`absolute left-8 top-0 bottom-0 w-px ${
                'bg-red-300/50'
              }`}></div>
              
              {[...Array(4)].map((_, i) => (
                <div
                  key={`hole-${i}`}
                  className={`absolute w-1.5 h-1.5 rounded-full border ${
                    'bg-blue-200/50 border-blue-300/70'
                  }`}
                  style={{
                    left: '4px',
                    top: `${20 + i * 18}%`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-6 lg:p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white/30">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('centers.neaPhiladelphia.title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('centers.neaPhiladelphia.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Chalandri Center */}
        <div className="relative group">
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
            {/* Notebook Lines Background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className={`absolute w-full h-px ${
                    'bg-blue-200/30'
                  }`}
                  style={{
                    top: `${15 + i * 8}%`,
                    left: '8%',
                    right: '4%'
                  }}
                />
              ))}
              
              <div className={`absolute left-8 top-0 bottom-0 w-px ${
                'bg-red-300/50'
              }`}></div>
              
              {[...Array(4)].map((_, i) => (
                <div
                  key={`hole-${i}`}
                  className={`absolute w-1.5 h-1.5 rounded-full border ${
                    'bg-blue-200/50 border-blue-300/70'
                  }`}
                  style={{
                    left: '4px',
                    top: `${20 + i * 18}%`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-6 lg:p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white/30">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('centers.chalandri.title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('centers.chalandri.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section - School Style */}
      <div className="space-y-12">
        {/* School Header */}
        <div className="relative">
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
            {/* Notebook Lines Background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className={`absolute w-full h-px ${
                    'bg-blue-200/30'
                  }`}
                  style={{
                    top: `${20 + i * 12}%`,
                    left: '8%',
                    right: '4%'
                  }}
                />
              ))}
              
              <div className={`absolute left-8 top-0 bottom-0 w-px ${
                'bg-red-300/50'
              }`}></div>
              
              {[...Array(3)].map((_, i) => (
                <div
                  key={`hole-${i}`}
                  className={`absolute w-1.5 h-1.5 rounded-full border ${
                    'bg-blue-200/50 border-blue-300/70'
                  }`}
                  style={{
                    left: '4px',
                    top: `${25 + i * 25}%`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-6 lg:p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
                  <span className="text-white font-bold text-lg">📚</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('services.title')}
                </h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('services.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colors = [
              "from-blue-400 to-indigo-500",
              "from-green-400 to-emerald-500", 
              "from-yellow-400 to-orange-500",
              "from-purple-400 to-pink-500",
              "from-red-400 to-rose-500",
              "from-teal-400 to-cyan-500"
            ];
            const bgColors = [
              "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
              "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
              "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
              "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
              "from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20",
              "from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20"
            ];
            
            return (
              <div key={index} className="relative group">
                <div className={`relative bg-gradient-to-br ${bgColors[index]} backdrop-blur-sm rounded-xl p-6 lg:p-8 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden`}>
                  {/* School Notebook Lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`card-line-${i}`}
                        className={`absolute w-full h-px ${
                          'bg-blue-200/20'
                        }`}
                        style={{
                          top: `${20 + i * 10}%`,
                          left: '15%',
                          right: '5%'
                        }}
                      />
                    ))}
                    
                    {/* Red margin line */}
                    <div className={`absolute left-6 top-0 bottom-0 w-px ${
                      'bg-red-300/30'
                    }`}></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Grade Badge */}
                    <div className="flex justify-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${colors[index]} rounded-full flex items-center justify-center shadow-md border-2 border-white/30 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white text-center mb-3" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-center" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Features - School Style */}
      <div className="relative">
        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
          {/* Notebook Lines Background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div
                key={`line-${i}`}
                className={`absolute w-full h-px ${
                  'bg-blue-200/30'
                }`}
                style={{
                  top: `${10 + i * 8}%`,
                  left: '8%',
                  right: '4%'
                }}
              />
            ))}
            
            <div className={`absolute left-8 top-0 bottom-0 w-px ${
              'bg-red-300/50'
            }`}></div>
            
            {[...Array(5)].map((_, i) => (
              <div
                key={`hole-${i}`}
                className={`absolute w-1.5 h-1.5 rounded-full border ${
                  'bg-blue-200/50 border-blue-300/70'
                }`}
                style={{
                  left: '4px',
                  top: `${15 + i * 15}%`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 p-6 lg:p-8">
            {/* School Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
                  <span className="text-white font-bold text-lg">⭐</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('additionalFeatures.title')}
                </h2>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalFeatures.map((feature: string, index: number) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200/30 dark:border-blue-700/30 rounded-xl p-4 hover:scale-105 transition-transform duration-200 cursor-default"
                >
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Section - School Style */}
      <div className="relative">
        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
          {/* Notebook Lines Background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={`line-${i}`}
                className={`absolute w-full h-px ${
                  'bg-blue-200/30'
                }`}
                style={{
                  top: `${8 + i * 7}%`,
                  left: '8%',
                  right: '4%'
                }}
              />
            ))}
            
            <div className={`absolute left-8 top-0 bottom-0 w-px ${
              'bg-red-300/50'
            }`}></div>
            
            {[...Array(6)].map((_, i) => (
              <div
                key={`hole-${i}`}
                className={`absolute w-1.5 h-1.5 rounded-full border ${
                  'bg-blue-200/50 border-blue-300/70'
                }`}
                style={{
                  left: '4px',
                  top: `${12 + i * 12}%`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 p-6 lg:p-8">
            {/* School Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
                  <span className="text-white font-bold text-lg">💭</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  {t('philosophy.title')}
                </h2>
              </div>
            </div>
            
            <div className="text-center space-y-8 px-4">
              <blockquote className="text-xl lg:text-2xl italic font-medium text-slate-700 dark:text-slate-300 leading-relaxed" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                "{t('philosophy.quote')}"
              </blockquote>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('philosophy.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Languages Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-3xl font-bold text-gray-800">{t('languages.english.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <p className="text-gray-600 leading-relaxed">{t('languages.english.description1')}</p>
            <p className="text-gray-600 leading-relaxed">{t('languages.english.description2')}</p>
            <p className="text-gray-600 leading-relaxed">{t('languages.english.description3')}</p>
            <p className="text-gray-600 leading-relaxed">Σε κάθε τομέα – επιστήμη, τεχνολογία, πολιτική, επιχειρήσεις – τα αγγλικά έχουν κυρίαρχ�� ρόλο.</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <FranceFlagIcon className="w-5 h-4" />
              Γαλλικά
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <p className="text-gray-600 leading-relaxed">Μιλιούνται σε 5 ηπείρους από πάνω από 275 εκατομμύρια ανθρώπους.</p>
            <p className="text-gray-600 leading-relaxed">Είναι γλώσσα της Ευρωπαϊκής Ένωσης, του ΟΗΕ και διεθνών οργανισμών.</p>
            <p className="text-gray-600 leading-relaxed">Προσφέρουν πρόσβαση σε κορυφαία πανεπιστήμια και πολιτισμό.</p>
            <p className="text-gray-600 leading-relaxed">Χρησιμοποιούνται σε τέχνες, μόδα, γαστρονομία και διεθνή διπλωματία.</p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="border-0 shadow-xl overflow-hidden" style={{
        background: `linear-gradient(135deg, rgba(129, 161, 212, 0.05) 0%, rgba(201, 182, 228, 0.05) 100%)`
      }}>
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-4xl font-bold text-gray-800">Συχνές Ερωτήσεις</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 px-8 pb-12">
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-800">Γιατί να μάθω ξένη γλώσσα;</h4>
            <p className="text-gray-600 leading-relaxed text-lg">Η εκμάθηση ξένων γλωσσών ενισχύει τη μνήμη, την κριτική σκέψη, την κοινωνικοποίηση και ανοίγει δρόμους για σπουδές και εργασία σε όλο τον κόσμο.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-800">Ποια είναι η κατάλληλη ηλικία;</h4>
            <p className="text-gray-600 leading-relaxed text-lg">Από την Α' Δημοτικού τα παιδιά έχουν τη δυνατότητα να μάθουν εύκολα, φυσικά και δημιουργικά μια ξένη γλώσσα.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-800">Τι γίνεται με παιδιά με μαθησιακές δυσκολίες;</h4>
            <p className="text-gray-600 leading-relaxed text-lg">Με τη σωστή μεθοδολογία, ακόμα και παιδιά με δυσλεξία μπορούν να μάθουν ξένη γλώσσα με επιτυχία.</p>
          </div>
        </CardContent>
      </Card>

      {/* Useful Links */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold text-gray-800">Χρήσιμα Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usefulLinks.map((link: {name: string, url: string}, index: number) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-6 text-left justify-between hover:shadow-md transition-all duration-200 group"
                asChild
              >
                <a href={link.url}>
                  <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                    {link.name}
                  </span>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card className="border-0 shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, #4a6fa5 0%, #81a1d4 100%)`
        }}></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        <CardContent className="text-center py-16 px-8 relative z-10 text-white">
          <h3 className="text-4xl font-bold mb-6">Ετοιμοι να ξεκινήσετε;</h3>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Επικοινωνήστε μαζί μας και ανακαλύψτε πώς μπορούμε να σας βοηθήσουμε να πετύχετε τους στόχους σας
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="font-semibold px-8 py-4 rounded-full hover:scale-105 transition-all duration-200 shadow-xl"
              style={{
                background: `linear-gradient(135deg, #f78da7 0%, #c9b6e4 100%)`,
                border: 'none'
              }}
              asChild
            >
              <a href="tel:+306987770734" className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                +30 698 777 0734
              </a>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="font-semibold px-8 py-4 rounded-full hover:scale-105 transition-all duration-200 border-white/30 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <a href="mailto:info@alfaschool.gr" className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                info@alfaschool.gr
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-12">
        <p className="text-3xl font-bold text-gray-800 leading-relaxed">
          ΑΛΦΑ – Μαζί από το 1986, με σεβασμό, αγάπη και αφοσίωση στη μάθηση.
        </p>
      </div>
    </div>
  );
};

export default BrochureContent;