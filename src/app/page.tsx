"use client"
import Silk from "@/components/Silk"
import BrochureContent from "@/components/BrochureContent"
import ResponsiveCarousel from "@/components/ResponsiveCarousel"
import LatestArticlesNotebook from "@/components/LatestArticlesNotebook"
import { Button } from "@/components/ui/button"
import CountUp from "@/components/CountUp"
import { useTheme } from "@/contexts/ThemeContext"

export default function Home() {
  const { isDarkMode } = useTheme()
  
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: isDarkMode 
          ? `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%)`
          : `linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 50%, #d1e7ff 100%)`,
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl animate-pulse opacity-30"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(74, 111, 165, 0.2)" 
              : "rgba(74, 111, 165, 0.4)" 
          }}
        ></div>
        <div
          className="absolute top-40 right-20 w-56 h-56 rounded-full blur-3xl animate-pulse opacity-25"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(129, 161, 212, 0.15)" 
              : "rgba(129, 161, 212, 0.5)" 
          }}
        ></div>
        <div
          className="absolute bottom-40 left-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-35"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(201, 182, 228, 0.1)" 
              : "rgba(201, 182, 228, 0.3)" 
          }}
        ></div>
      </div>

      {/* RESPONSIVE CAROUSEL - Desktop: Modern, Mobile: Notebook Style */}
      <ResponsiveCarousel />

      {/* Statistics Section - School Style */}
      <section className="relative z-10 py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          {/* School Notebook Paper Background */}
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
            {/* Notebook Lines Background */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Horizontal lines */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className={`absolute w-full h-px ${
                    isDarkMode ? 'bg-blue-300/15' : 'bg-blue-200/30'
                  }`}
                  style={{
                    top: `${15 + i * 8}%`,
                    left: '8%',
                    right: '4%'
                  }}
                />
              ))}
              
              {/* Red margin line */}
              <div className={`absolute left-8 top-0 bottom-0 w-px ${
                isDarkMode ? 'bg-red-400/30' : 'bg-red-300/50'
              }`}></div>
              
              {/* Holes for binder */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={`hole-${i}`}
                  className={`absolute w-1.5 h-1.5 rounded-full border ${
                    isDarkMode 
                      ? 'bg-gray-600/30 border-gray-500/50' 
                      : 'bg-blue-200/50 border-blue-300/70'
                  }`}
                  style={{
                    left: '4px',
                    top: `${20 + i * 18}%`
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 lg:p-8">
              {/* School Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
                    <span className="text-white font-bold text-lg">📊</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    Στατιστικά Επιτυχίας
                  </h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  35+ χρόνια εμπειρίας στην εκπαίδευση
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {[
                  { 
                    number: 35, 
                    suffix: "+", 
                    label: "Χρόνια Εμπειρίας", 
                    icon: "🏆",
                    color: "from-yellow-400 to-orange-500"
                  },
                  { 
                    number: 1000, 
                    suffix: "+", 
                    label: "Επιτυχημένοι Μαθητές", 
                    icon: "👥",
                    color: "from-blue-400 to-indigo-500"
                  },
                  { 
                    number: 25, 
                    suffix: "+", 
                    label: "Επιτυχημένες Εξετάσεις/Έτος", 
                    icon: "🎓",
                    color: "from-green-400 to-emerald-500"
                  },
                  { 
                    number: 99, 
                    suffix: "%", 
                    label: "Επιτυχία", 
                    icon: "📈",
                    color: "from-purple-400 to-pink-500"
                  },
                ].map((stat, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-gray-700/80 dark:to-gray-600/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-blue-200/30 dark:border-blue-700/30">
                      {/* Grade Badge */}
                      <div className="flex justify-center mb-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center shadow-md border-2 border-white/30`}>
                          <span className="text-white text-lg">{stat.icon}</span>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold mb-2 text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                          <CountUp 
                            to={stat.number} 
                            from={0}
                            direction="up"
                            duration={2.5}
                            delay={index * 0.2}
                            className="inline-block"
                            onStart={() => {}}
                            onEnd={() => {}}
                          />
                          <span className="text-xl lg:text-2xl">{stat.suffix}</span>
                        </div>
                        <div className="text-slate-600 dark:text-slate-300 font-medium text-xs lg:text-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section - School Notebook Style */}
      <LatestArticlesNotebook />

      {/* Services Section - School Style */}
      <section className="relative z-10 py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          {/* School Notebook Paper Background */}
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
            {/* Notebook Lines Background */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Horizontal lines */}
              {[...Array(10)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className={`absolute w-full h-px ${
                    isDarkMode ? 'bg-blue-300/15' : 'bg-blue-200/30'
                  }`}
                  style={{
                    top: `${10 + i * 7}%`,
                    left: '8%',
                    right: '4%'
                  }}
                />
              ))}
              
              {/* Red margin line */}
              <div className={`absolute left-8 top-0 bottom-0 w-px ${
                isDarkMode ? 'bg-red-400/30' : 'bg-red-300/50'
              }`}></div>
              
              {/* Holes for binder */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={`hole-${i}`}
                  className={`absolute w-1.5 h-1.5 rounded-full border ${
                    isDarkMode 
                      ? 'bg-gray-600/30 border-gray-500/50' 
                      : 'bg-blue-200/50 border-blue-300/70'
                  }`}
                  style={{
                    left: '4px',
                    top: `${15 + i * 15}%`
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 lg:p-8">
              {/* School Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
                    <span className="text-white font-bold text-lg">📚</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    Οι Υπηρεσίες μας
                  </h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  Εξειδικευμένες εκπαιδευτικές υπηρεσίες
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {[
                  {
                    title: "Μαθήματα Γλωσσών",
                    description: "Αγγλικά, Γερμανικά, Γαλλικά, Ισπανικά και άλλες γλώσσες με πιστοποιημένους εκπαιδευτές",
                    icon: "🌍",
                    color: "from-blue-400 to-indigo-500",
                    bgColor: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
                  },
                  {
                    title: "Προετοιμασία Εξετάσεων",
                    description: "Εξειδικευμένη προετοιμασία για IELTS, TOEFL, Cambridge, Goethe και άλλες πιστοποιήσεις",
                    icon: "🎯",
                    color: "from-green-400 to-emerald-500",
                    bgColor: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
                  },
                  {
                    title: "Ιδιαίτερα Μαθήματα",
                    description: "Εξατομικευμένη διδασκαλία που προσαρμόζεται στις ανάγκες και τους στόχους σας",
                    icon: "👨‍🏫",
                    color: "from-purple-400 to-pink-500",
                    bgColor: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="group relative"
                  >
                    {/* School Card Background */}
                    <div className={`relative bg-gradient-to-br ${service.bgColor} backdrop-blur-sm rounded-xl p-6 lg:p-8 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden`}>
                      {/* School Notebook Lines */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={`card-line-${i}`}
                            className={`absolute w-full h-px ${
                              isDarkMode ? 'bg-blue-300/10' : 'bg-blue-200/20'
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
                          isDarkMode ? 'bg-red-400/20' : 'bg-red-300/30'
                        }`}></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Grade Badge */}
                        <div className="flex justify-center mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center shadow-md border-2 border-white/30`}>
                            <span className="text-white text-xl">{service.icon}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-slate-800 dark:text-white text-center" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                          {service.title}
                        </h3>
                        <p className="leading-relaxed text-sm lg:text-base text-slate-600 dark:text-slate-300 text-center" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - School Style */}
      <section className="relative z-10 py-16 lg:py-24 mx-6 mb-12 lg:mb-20">
        <div className="max-w-4xl mx-auto">
          {/* School Notebook Paper Background */}
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden">
            {/* Notebook Lines Background */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Horizontal lines */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className={`absolute w-full h-px ${
                    isDarkMode ? 'bg-blue-300/15' : 'bg-blue-200/30'
                  }`}
                  style={{
                    top: `${15 + i * 8}%`,
                    left: '8%',
                    right: '4%'
                  }}
                />
              ))}
              
              {/* Red margin line */}
              <div className={`absolute left-8 top-0 bottom-0 w-px ${
                isDarkMode ? 'bg-red-400/30' : 'bg-red-300/50'
              }`}></div>
              
              {/* Holes for binder */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={`hole-${i}`}
                  className={`absolute w-1.5 h-1.5 rounded-full border ${
                    isDarkMode 
                      ? 'bg-gray-600/30 border-gray-500/50' 
                      : 'bg-blue-200/50 border-blue-300/70'
                  }`}
                  style={{
                    left: '4px',
                    top: `${20 + i * 18}%`
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 lg:p-8 text-center">
              {/* School Header */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
                    <span className="text-white font-bold text-lg">📞</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    Ξεκινήστε το ταξίδι σας σήμερα
                  </h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  Επικοινωνήστε μαζί μας και ανακαλύψτε πώς μπορούμε να σας βοηθήσουμε να πετύχετε τους στόχους σας
                </p>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
                <Button
                  size="lg"
                  className="font-semibold px-6 py-4 rounded-xl hover:scale-105 transition-all duration-200 shadow-lg border-0 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  asChild
                >
                  <a href="tel:+306987770734" className="flex items-center gap-3 justify-center text-white">
                    <span className="text-lg">📞</span>
                    <span style={{ fontFamily: 'StampatelloFaceto, cursive' }}>+30 698 777 0734</span>
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold px-6 py-4 rounded-xl hover:scale-105 transition-all duration-200 border-2 border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-transparent"
                  asChild
                >
                  <a href="mailto:info@alfaschool.gr" className="flex items-center gap-3 justify-center">
                    <span className="text-lg">✉️</span>
                    <span style={{ fontFamily: 'StampatelloFaceto, cursive' }}>info@alfaschool.gr</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brochure Content */}
      <BrochureContent />

      {/* Custom Styles */}
      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}
