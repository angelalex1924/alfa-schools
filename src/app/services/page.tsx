"use client"
import NotebookHero from "@/components/NotebookHero"
import SchoolBreadcrumb from "@/components/SchoolBreadcrumb"
import { useLanguage } from "@/contexts/LanguageContext"
import { useState } from "react"

export default function Services() {
  const { language, t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      title: t('services.english.title'),
      description: t('services.english.description'),
      icon: "🇬🇧",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
      borderColor: "border-blue-200",
      items: Array.isArray(t('services.english.items')) ? t('services.english.items') as string[] : ["English for all ages", "IELTS & TOEFL Preparation", "Cambridge Exams", "Business English", "Academic English"],
      grade: "A+",
      stars: 5
    },
    {
      id: 2,
      title: t('services.french.title'),
      description: t('services.french.description'),
      icon: "🇫🇷",
      color: "from-red-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-red-50 to-pink-100",
      borderColor: "border-red-200",
      items: Array.isArray(t('services.french.items')) ? t('services.french.items') as string[] : ["French for all ages", "DELF & DALF Preparation", "Sorbonne Exams", "Professional French", "Culture and literature"],
      grade: "A+",
      stars: 5
    },
    {
      id: 3,
      title: t('services.allAges.title'),
      description: t('services.allAges.description'),
      icon: "👥",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
      borderColor: "border-green-200",
      items: ["From 1st grade", "Up to adults", "Grouped levels", "Modern materials"],
      grade: "A+",
      stars: 5
    },
    {
      id: 4,
      title: t('services.reinforcement.title'),
      description: t('services.reinforcement.description'),
      icon: "✅",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-100",
      borderColor: "border-purple-200",
      items: ["Personalized teaching", "Review lessons", "Homework help", "Exam preparation"],
      grade: "A",
      stars: 4
    },
    {
      id: 5,
      title: t('services.universityPrep.title'),
      description: t('services.universityPrep.description'),
      icon: "🎓",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-100",
      borderColor: "border-orange-200",
      items: ["University entrance preparation", "English Philology", "French Philology", "Special programs"],
      grade: "A+",
      stars: 5
    },
    {
      id: 6,
      title: t('services.summer.title'),
      description: t('services.summer.description'),
      icon: "☀️",
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-100",
      borderColor: "border-yellow-200",
      items: ["Intensive programs", "Summer classes", "Educational trips", "Cultural activities"],
      grade: "A",
      stars: 4
    }
  ];

  return (
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
              { label: t('breadcrumbs.services') as string }
            ]}
          />
        </div>
      </div>

      {/* Notebook Hero Section */}
      <NotebookHero />

      {/* Main content area */}
      <main className="px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">


          {/* Services grid with notebook styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border-2 border-blue-200/30 dark:border-blue-700/30 hover:border-blue-300/50 dark:hover:border-blue-600/50 group/card"
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* School Notebook Lines Background */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Notebook lines */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`line-${i}`}
                      className="absolute w-full h-px bg-blue-200/30 dark:bg-blue-300/15"
                      style={{
                        top: `${30 + i * 5}%`,
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
                        top: `${35 + i * 15}%`
                      }}
                    />
                  ))}
                      </div>

                {/* Grade Badge - Top Right */}
                <div className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white/30 z-20">
                  <span className="text-white text-xs font-bold" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    {service.grade}
                  </span>
                </div>

                {/* Decorative Corner - School themed */}
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400/15 to-orange-500/15 rounded-bl-2xl" />
                
                {/* Service Content */}
                <div className="p-6 pl-10 relative z-10">
                  {/* Icon */}
                  <div className="text-center mb-4">
                    <div className="flex justify-center mb-2 bounce-in">
                      {service.id === 1 ? (
                        <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="w-20 h-20" preserveAspectRatio="xMidYMid meet" fill="#000000">
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path fill="#00247D" d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"></path>
                            <path fill="#CF1B2B" d="M25.14 23l9.712 6.801a3.977 3.977 0 0 0 .99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8a3.988 3.988 0 0 0-1.937-1.085L23 12.057V13zm-12.141 0L1.148 6.2a3.994 3.994 0 0 0-.991 1.749L7.372 13h3.487z"></path>
                            <path fill="#EEE" d="M36 21H21v10h2v-5.836L31.335 31H32a3.99 3.99 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9a3.983 3.983 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4.001 4.001 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4a3.985 3.985 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A3.968 3.968 0 0 0 0 9v.059L5.628 13H0v2h15V5h-2z"></path>
                            <path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z"></path>
                          </g>
                        </svg>
                      ) : service.id === 2 ? (
                        <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="w-20 h-20" preserveAspectRatio="xMidYMid meet" fill="#000000">
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path fill="#ED2939" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"></path>
                            <path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"></path>
                            <path fill="#EEE" d="M12 5h12v26H12z"></path>
                          </g>
                        </svg>
                      ) : (
                        <div className="text-8xl">{service.icon}</div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-handwriting">{service.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-center font-handwriting">
                    {service.description}
                  </p>

                  {/* Items list */}
                  <ul className="space-y-2 mb-6">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400 font-handwriting">
                        <span className="text-green-500 mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Stars */}
                  <div className="flex justify-center space-x-1">
                    {[...Array(service.stars)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg star-twinkle">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
                      </div>

          {/* Why Choose Us Section */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-handwriting">
                🎯 {t('whyUs.title')}
              </h2>
                    </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "🏆", title: t('hero.years') + " " + t('hero.experience'), desc: t('hero.subtitle') },
                { icon: "👨‍🏫", title: t('whyUs.teachers'), desc: t('whyUs.teachersDesc') },
                { icon: "📚", title: t('whyUs.materials'), desc: t('whyUs.materialsDesc') },
                { icon: "🎉", title: t('whyUs.fun'), desc: t('whyUs.funDesc') }
              ].map((feature, index) => (
                <div key={index} className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border-2 border-blue-200/30 dark:border-blue-700/30 hover:border-blue-300/50 dark:hover:border-blue-600/50">
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
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-handwriting">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-handwriting">{feature.desc}</p>
                  </div>
                      </div>
              ))}
                      </div>
                    </div>

          {/* Student Testimonials */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-handwriting">
                💬 {t('testimonials.title')}
              </h2>
                        </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: t('testimonials.student1.name'), grade: "A+", text: t('testimonials.student1.text'), stars: 5 },
                { name: t('testimonials.student2.name'), grade: "A", text: t('testimonials.student2.text'), stars: 5 },
                { name: t('testimonials.student3.name'), grade: "A+", text: t('testimonials.student3.text'), stars: 5 }
              ].map((testimonial, index) => (
                <div key={index} className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border-2 border-blue-200/30 dark:border-blue-700/30 hover:border-blue-300/50 dark:hover:border-blue-600/50">
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

                  {/* Grade Badge - Top Right */}
                  <div className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white/30 z-20">
                    <span className="text-white text-xs font-bold" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {testimonial.grade}
                    </span>
                </div>
                
                  {/* Content */}
                  <div className="relative z-10 p-6 pl-10">
                    <div className="flex justify-center mb-3">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl star-twinkle">⭐</span>
                      ))}
              </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 font-handwriting italic">"{testimonial.text}"</p>
                    <div className="text-center">
                      <div className="font-bold text-gray-900 dark:text-white font-handwriting">{testimonial.name}</div>
                    </div>
                  </div>
                </div>
              ))}
                  </div>
                </div>
                
          {/* CTA section */}
          <div className="text-center py-16">
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
              <div className="relative z-10 p-8">
                <div className="flex justify-center mb-4">
                  <span className="text-6xl">🎨</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-handwriting">
                  {t('contact.title')}
            </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 font-handwriting">
                  {t('contact.subtitle')}
            </p>
            <a
              href="/contact"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 font-handwriting"
                >
                  {t('contact.pageTitle')}
                  <span className="text-2xl">🚀</span>
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
  );
}
