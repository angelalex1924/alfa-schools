"use client"
import NotebookHero from "@/components/NotebookHero"
import SchoolBreadcrumb from "@/components/SchoolBreadcrumb"
import { useLanguage } from "@/contexts/LanguageContext"
import { useState } from "react"
import SEOHead from "@/components/SEOHead"
import { generateEnhancedAboutSEO, generateComprehensiveStructuredData } from "@/lib/seo-utils"
import { motion } from "framer-motion"

export default function AboutUs() {
  const { language, t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alfaschools.gr'
  const seoData = generateEnhancedAboutSEO(baseUrl)
  const structuredData = generateComprehensiveStructuredData(baseUrl)

  const timeline = [
    {
      year: "1986",
      title: t('aboutUs.timeline.1986.title'),
      description: t('aboutUs.timeline.1986.description'),
      icon: "🏫",
      color: "from-blue-500 to-indigo-600",
      achievements: Array.isArray(t('aboutUs.timeline.1986.achievements')) ? t('aboutUs.timeline.1986.achievements') as string[] : []
    },
    {
      year: "1996",
      title: t('aboutUs.timeline.1996.title'),
      description: t('aboutUs.timeline.1996.description'),
      icon: "📈",
      color: "from-green-500 to-emerald-600",
      achievements: Array.isArray(t('aboutUs.timeline.1996.achievements')) ? t('aboutUs.timeline.1996.achievements') as string[] : []
    },
    {
      year: "2000-2010",
      title: t('aboutUs.timeline.2000-2010.title'),
      description: t('aboutUs.timeline.2000-2010.description'),
      icon: "🏆",
      color: "from-purple-500 to-violet-600",
      achievements: Array.isArray(t('aboutUs.timeline.2000-2010.achievements')) ? t('aboutUs.timeline.2000-2010.achievements') as string[] : []
    },
    {
      year: "2010-2020",
      title: t('aboutUs.timeline.2010-2020.title'),
      description: t('aboutUs.timeline.2010-2020.description'),
      icon: "💻",
      color: "from-orange-500 to-red-600",
      achievements: Array.isArray(t('aboutUs.timeline.2010-2020.achievements')) ? t('aboutUs.timeline.2010-2020.achievements') as string[] : []
    },
    {
      year: language === 'el' ? "Σήμερα" : language === 'en' ? "Today" : "Aujourd'hui",
      title: t('aboutUs.timeline.today.title'),
      description: t('aboutUs.timeline.today.description'),
      icon: "🌟",
      color: "from-yellow-500 to-orange-600",
      achievements: Array.isArray(t('aboutUs.timeline.today.achievements')) ? t('aboutUs.timeline.today.achievements') as string[] : []
    }
  ];

  const teachers = [
    {
      title: t('aboutUs.teachers.qualifications.title'),
      description: t('aboutUs.teachers.qualifications.description'),
      icon: "🎓"
    },
    {
      title: t('aboutUs.teachers.training.title'),
      description: t('aboutUs.teachers.training.description'),
      icon: "📚"
    },
    {
      title: t('aboutUs.teachers.examiners.title'),
      description: t('aboutUs.teachers.examiners.description'),
      icon: "🏆"
    }
  ];

  const centers = [
    {
      name: t('aboutUs.centers.neaFiladelfeia.name'),
      description: t('aboutUs.centers.neaFiladelfeia.description'),
      features: Array.isArray(t('aboutUs.centers.neaFiladelfeia.features')) ? t('aboutUs.centers.neaFiladelfeia.features') as string[] : [],
      icon: "🏢"
    },
    {
      name: t('aboutUs.centers.chalandri.name'), 
      description: t('aboutUs.centers.chalandri.description'),
      features: Array.isArray(t('aboutUs.centers.chalandri.features')) ? t('aboutUs.centers.chalandri.features') as string[] : [],
      icon: "🏫"
    }
  ];

  const services = [
    {
      title: t('aboutUs.services.allLevels.title'),
      description: t('aboutUs.services.allLevels.description'),
      icon: "👥"
    },
    {
      title: t('aboutUs.services.freeClasses.title'),
      description: t('aboutUs.services.freeClasses.description'),
      icon: "🎁"
    },
    {
      title: t('aboutUs.services.ebook.title'),
      description: t('aboutUs.services.ebook.description'),
      icon: "💻"
    },
    {
      title: t('aboutUs.services.reinforcement.title'),
      description: t('aboutUs.services.reinforcement.description'),
      icon: "📖"
    },
    {
      title: t('aboutUs.services.summer.title'),
      description: t('aboutUs.services.summer.description'),
      icon: "☀️"
    },
    {
      title: t('aboutUs.services.university.title'),
      description: t('aboutUs.services.university.description'),
      icon: "🎯"
    }
  ];

  const faqs = [
    {
      question: t('aboutUs.faq.whyLearn.question'),
      answer: t('aboutUs.faq.whyLearn.answer')
    },
    {
      question: t('aboutUs.faq.age.question'),
      answer: t('aboutUs.faq.age.answer')
    },
    {
      question: t('aboutUs.faq.classOrPrivate.question'),
      answer: t('aboutUs.faq.classOrPrivate.answer')
    }
  ];

  return (
    <>
      <SEOHead seoData={seoData} structuredData={structuredData} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      
      {/* Floating School Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce" style={{animationDelay: '0s'}}>📚</div>
        <div className="absolute top-40 right-20 text-5xl opacity-10 animate-bounce" style={{animationDelay: '1s'}}>✏️</div>
        <div className="absolute bottom-40 left-20 text-4xl opacity-10 animate-bounce" style={{animationDelay: '2s'}}>🎨</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-10 animate-bounce" style={{animationDelay: '3s'}}>📝</div>
        <div className="absolute top-60 left-1/2 text-4xl opacity-10 animate-bounce" style={{animationDelay: '4s'}}>⭐</div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="pt-20 pb-4 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SchoolBreadcrumb 
            items={[
              { label: t('breadcrumbs.home') as string, href: '/' },
              { label: t('breadcrumbs.aboutUs') as string }
            ]}
          />
        </div>
      </div>

      {/* Notebook Hero Section */}
      <NotebookHero />

      {/* Main content area */}
      <main className="px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Hero Section - MOBILE FRIENDLY */}
          <div className="text-center py-16 px-4 md:px-0">
            <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
              {/* Notebook Lines Background */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Horizontal lines */}
                {[...Array(15)].map((_, i) => (
                  <div
                    key={`line-${i}`}
                    className="absolute w-full h-px bg-blue-200/30 dark:bg-blue-300/15"
                    style={{
                      top: `${15 + i * 5}%`,
                      left: '8%',
                      right: '4%'
                    }}
                  />
                ))}
                
                {/* Red margin line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-red-300/50 dark:bg-red-400/30"></div>
                
                {/* Holes for binder */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`hole-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full border bg-blue-200/50 border-blue-300/70 dark:bg-gray-600/30 dark:border-gray-500/50"
                    style={{
                      left: '4px',
                      top: `${20 + i * 15}%`
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8">
                <div className="flex justify-center mb-4 md:mb-6">
                  <span className="text-6xl md:text-8xl">🏫</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 font-handwriting">
                  {t('aboutUs.title')}
                </h1>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 md:mb-8 font-handwriting max-w-4xl mx-auto">
                  {t('aboutUs.subtitle')}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Section - MOBILE FRIENDLY */}
          <div className="py-16">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-handwriting"
              >
                📅 {t('aboutUs.history.title')}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-handwriting max-w-3xl mx-auto px-4"
              >
                {t('aboutUs.history.subtitle')}
              </motion.p>
            </div>

            {/* Mobile-First Timeline Container */}
            <div className="relative max-w-4xl mx-auto">
              {/* Timeline Line - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 rounded-full"></div>
              
              <div className="space-y-8 md:space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="relative"
                  >
                    {/* Mobile Layout - Single Column */}
                    <div className="md:hidden">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden group mx-4"
                      >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                        
                        {/* School Notebook Lines Background */}
                        <div className="absolute inset-0 pointer-events-none">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={`line-${i}`}
                              className="absolute w-full h-px bg-blue-200/20 dark:bg-blue-300/10"
                              style={{
                                top: `${15 + i * 12}%`,
                                left: '8%',
                                right: '4%'
                              }}
                            />
                          ))}
                          
                          {/* Red margin line */}
                          <div className="absolute left-6 top-0 bottom-0 w-px bg-red-300/30 dark:bg-red-400/20"></div>
                          
                          {/* Holes for binder */}
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={`hole-${i}`}
                              className="absolute w-1 h-1 rounded-full border bg-blue-200/40 border-blue-300/60 dark:bg-gray-600/20 dark:border-gray-500/40"
                              style={{
                                left: '4px',
                                top: `${20 + i * 20}%`
                              }}
                            />
                          ))}
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-6 pl-8">
                          <div className="flex items-center mb-4">
                            <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white text-lg mr-3 shadow-lg`}>
                              {item.icon}
                            </div>
                            <div>
                              <div className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-handwriting`}>
                                {item.year}
                              </div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white font-handwriting">
                                {item.title}
                              </h3>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300 font-handwriting mb-4 leading-relaxed text-sm">
                            {item.description}
                          </p>
                          
                          {/* Achievements */}
                          <div className="space-y-2">
                            {Array.isArray(item.achievements) && item.achievements.map((achievement, achievementIndex) => (
                              <div key={achievementIndex} className="flex items-center text-xs text-gray-600 dark:text-gray-400 font-handwriting">
                                <div className={`w-1.5 h-1.5 bg-gradient-to-r ${item.color} rounded-full mr-2`}></div>
                                {achievement}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Desktop Layout - Alternating Sides */}
                    <div className={`hidden md:flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* Timeline Dot */}
                      <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r ${item.color} rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10`}>
                        <div className="w-full h-full flex items-center justify-center text-white text-sm">
                          {item.icon}
                        </div>
                      </div>

                      {/* Content Card - Alternating sides */}
                      <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                        <motion.div
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden group"
                        >
                          {/* Gradient Background */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                          
                          {/* School Notebook Lines Background */}
                          <div className="absolute inset-0 pointer-events-none">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={`line-${i}`}
                                className="absolute w-full h-px bg-blue-200/20 dark:bg-blue-300/10"
                                style={{
                                  top: `${15 + i * 8}%`,
                                  left: '10%',
                                  right: '5%'
                                }}
                              />
                            ))}
                            
                            {/* Red margin line */}
                            <div className="absolute left-8 top-0 bottom-0 w-px bg-red-300/30 dark:bg-red-400/20"></div>
                            
                            {/* Holes for binder */}
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={`hole-${i}`}
                                className="absolute w-1 h-1 rounded-full border bg-blue-200/40 border-blue-300/60 dark:bg-gray-600/20 dark:border-gray-500/40"
                                style={{
                                  left: '6px',
                                  top: `${20 + i * 15}%`
                                }}
                              />
                            ))}
                          </div>

                          {/* Content */}
                          <div className="relative z-10 p-8 pl-12">
                            <div className="flex items-center mb-4">
                              <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white text-2xl mr-4 shadow-lg`}>
                                {item.icon}
                              </div>
                              <div>
                                <div className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-handwriting`}>
                                  {item.year}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-handwriting">
                                  {item.title}
                                </h3>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 dark:text-gray-300 font-handwriting mb-4 leading-relaxed">
                              {item.description}
                            </p>
                            
                            {/* Achievements */}
                            <div className="space-y-2">
                              {Array.isArray(item.achievements) && item.achievements.map((achievement, achievementIndex) => (
                                <div key={achievementIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400 font-handwriting">
                                  <div className={`w-2 h-2 bg-gradient-to-r ${item.color} rounded-full mr-3`}></div>
                                  {achievement}
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Teachers Section - MOBILE FRIENDLY */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-handwriting">
                👨‍🏫 {t('aboutUs.teachers.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
              {teachers.map((teacher, index) => (
                <div key={index} className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
                  {/* School Notebook Lines Background */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Notebook lines */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`line-${i}`}
                        className="absolute w-full h-px bg-blue-200/30 dark:bg-blue-300/15"
                        style={{
                          top: `${25 + i * 6}%`,
                          left: '15%',
                          right: '4%'
                        }}
                      />
                    ))}
                    
                    {/* Red margin line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-red-300/50 dark:bg-red-400/30"></div>
                    
                    {/* Holes for binder */}
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={`hole-${i}`}
                        className="absolute w-1.5 h-1.5 rounded-full border bg-blue-200/50 border-blue-300/70 dark:bg-gray-600/30 dark:border-gray-500/50"
                        style={{
                          left: '4px',
                          top: `${30 + i * 15}%`
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 pl-10 text-center">
                    <div className="text-5xl mb-4">{teacher.icon}</div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 font-handwriting">{teacher.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-handwriting">{teacher.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Centers Section - MOBILE FRIENDLY */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-handwriting">
                🏢 {t('aboutUs.centers.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 md:px-0">
              {centers.map((center, index) => (
                <div key={index} className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
                  {/* School Notebook Lines Background */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Notebook lines */}
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={`line-${i}`}
                        className="absolute w-full h-px bg-blue-200/30 dark:bg-blue-300/15"
                        style={{
                          top: `${20 + i * 5}%`,
                          left: '15%',
                          right: '4%'
                        }}
                      />
                    ))}
                    
                    {/* Red margin line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-red-300/50 dark:bg-red-400/30"></div>
                    
                    {/* Holes for binder */}
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={`hole-${i}`}
                        className="absolute w-1.5 h-1.5 rounded-full border bg-blue-200/50 border-blue-300/70 dark:bg-gray-600/30 dark:border-gray-500/50"
                        style={{
                          left: '4px',
                          top: `${25 + i * 12}%`
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 pl-10">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4">{center.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-handwriting">{center.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-handwriting">{center.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {Array.isArray(center.features) && center.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400 font-handwriting">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Section - MOBILE FRIENDLY */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-handwriting">
                🎯 {t('aboutUs.services.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
              {services.map((service, index) => (
                <div key={index} className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
                  {/* School Notebook Lines Background */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Notebook lines */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`line-${i}`}
                        className="absolute w-full h-px bg-blue-200/30 dark:bg-blue-300/15"
                        style={{
                          top: `${25 + i * 8}%`,
                          left: '15%',
                          right: '4%'
                        }}
                      />
                    ))}
                    
                    {/* Red margin line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-red-300/50 dark:bg-red-400/30"></div>
                    
                    {/* Holes for binder */}
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={`hole-${i}`}
                        className="absolute w-1.5 h-1.5 rounded-full border bg-blue-200/50 border-blue-300/70 dark:bg-gray-600/30 dark:border-gray-500/50"
                        style={{
                          left: '4px',
                          top: `${30 + i * 20}%`
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 pl-10 text-center">
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-handwriting">{service.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-handwriting">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section - MOBILE FRIENDLY */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-handwriting">
                ❓ {t('aboutUs.faq.title')}
              </h2>
            </div>

            <div className="space-y-4 md:space-y-6 px-4 md:px-0">
              {faqs.map((faq, index) => (
                <div key={index} className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
                  {/* School Notebook Lines Background */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Notebook lines */}
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={`line-${i}`}
                        className="absolute w-full h-px bg-blue-200/30 dark:bg-blue-300/15"
                        style={{
                          top: `${15 + i * 6}%`,
                          left: '15%',
                          right: '4%'
                        }}
                      />
                    ))}
                    
                    {/* Red margin line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-red-300/50 dark:bg-red-400/30"></div>
                    
                    {/* Holes for binder */}
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={`hole-${i}`}
                        className="absolute w-1.5 h-1.5 rounded-full border bg-blue-200/50 border-blue-300/70 dark:bg-gray-600/30 dark:border-gray-500/50"
                        style={{
                          left: '4px',
                          top: `${20 + i * 15}%`
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 pl-10">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 font-handwriting text-lg">{faq.question}</h3>
                    <p className="text-gray-700 dark:text-gray-300 font-handwriting">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA section - MOBILE FRIENDLY */}
          <div className="text-center py-16 px-4 md:px-0">
            <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
              {/* Notebook Lines Background */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Horizontal lines */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={`line-${i}`}
                    className="absolute w-full h-px bg-blue-200/30 dark:bg-blue-300/15"
                    style={{
                      top: `${20 + i * 6}%`,
                      left: '8%',
                      right: '4%'
                    }}
                  />
                ))}
                
                {/* Red margin line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-red-300/50 dark:bg-red-400/30"></div>
                
                {/* Holes for binder */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={`hole-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full border bg-blue-200/50 border-blue-300/70 dark:bg-gray-600/30 dark:border-gray-500/50"
                    style={{
                      left: '4px',
                      top: `${25 + i * 18}%`
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8">
                <div className="flex justify-center mb-4">
                  <span className="text-4xl md:text-6xl">🎓</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 font-handwriting">
                  {t('aboutUs.cta.title')}
                </h2>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 md:mb-8 font-handwriting">
                  {t('aboutUs.cta.subtitle')}
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-lg md:text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 font-handwriting"
                >
                  {t('aboutUs.cta.button')}
                  <span className="text-xl md:text-2xl">📞</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .font-handwriting {
          font-family: 'StampatelloFaceto', cursive;
        }

        @keyframes starTwinkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(5deg); }
          50% { transform: scale(1.2) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(3deg); }
        }

        .star-twinkle {
          animation: starTwinkle 1.5s ease-in-out infinite;
        }

        .star-twinkle:nth-child(2) { animation-delay: 0.2s; }
        .star-twinkle:nth-child(3) { animation-delay: 0.4s; }
        .star-twinkle:nth-child(4) { animation-delay: 0.6s; }
        .star-twinkle:nth-child(5) { animation-delay: 0.8s; }

        @keyframes bounceIn {
          0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.05) rotate(5deg); opacity: 0.8; }
          70% { transform: scale(0.9) rotate(-2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        .bounce-in {
          animation: bounceIn 0.6s ease-out;
        }
      `}</style>
      </div>
    </>
  );
}
