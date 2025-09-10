"use client"
import Silk from "@/components/Silk"
import BrochureContent from "@/components/BrochureContent"
import ResponsiveCarousel from "@/components/ResponsiveCarousel"
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

      {/* Statistics Section */}
      <section
        className="relative z-10 py-16 lg:py-24"
        style={{ 
          background: isDarkMode 
            ? `linear-gradient(135deg, #2d3748 0%, #4a5568 100%)` 
            : `linear-gradient(135deg, #4a6fa5 0%, #81a1d4 100%)` 
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
            {[
              { 
                number: 35, 
                suffix: "+", 
                label: "Χρόνια Εμπειρίας", 
                icon: "🏆"
              },
              { 
                number: 1000, 
                suffix: "+", 
                label: "Επιτυχημένοι Μαθητές", 
                icon: "👥"
              },
              { 
                number: 25, 
                suffix: "+", 
                label: "Επιτυχημένες Εξετάσεις/Έτος", 
                icon: "🎓"
              },
              { 
                number: 99, 
                suffix: "%", 
                label: "Επιτυχία", 
                icon: "📈"
              },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 transition-all duration-300 hover:scale-105 hover:bg-white/20 border border-white/20">
                  <div className="text-2xl lg:text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl lg:text-4xl font-bold mb-2 text-white">
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
                    <span className="text-2xl lg:text-4xl">{stat.suffix}</span>
                  </div>
                  <div className="text-white/90 font-medium text-sm lg:text-base">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`relative z-10 py-16 lg:py-24 ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 to-orange-50'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className={`text-3xl lg:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Οι Υπηρεσίες μας</h2>
            <p className={`text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Ανακαλύψτε τις εξειδικευμένες εκπαιδευτικές υπηρεσίες που προσφέρουμε
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Μαθήματα Γλωσσών",
                description: "Αγγλικά, Γερμανικά, Γαλλικά, Ισπανικά και άλλες γλώσσες με πιστοποιημένους εκπαιδευτές",
                icon: "🌍",
                color: "#81a1d4",
              },
              {
                title: "Προετοιμασία Εξετάσεων",
                description: "Εξειδικευμένη προετοιμασία για IELTS, TOEFL, Cambridge, Goethe και άλλες πιστοποιήσεις",
                icon: "🎯",
                color: "#c9b6e4",
              },
              {
                title: "Ιδιαίτερα Μαθήματα",
                description: "Εξατομικευμένη διδασκαλία που προσαρμόζεται στις ανάγκες και τους στόχους σας",
                icon: "👨‍🏫",
                color: "#f78da7",
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`group rounded-2xl lg:rounded-3xl p-6 lg:p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800/80 backdrop-blur-xl border-gray-700/50 hover:border-gray-600/50' 
                    : 'bg-white border-gray-200/50 hover:border-gray-300/50'
                }`}
                style={{ borderColor: service.color, borderWidth: "1px" }}
              >
                <div className="text-4xl lg:text-5xl mb-4 lg:mb-6">{service.icon}</div>
                <h3 className={`text-xl lg:text-2xl font-bold mb-3 lg:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{service.title}</h3>
                <p className={`leading-relaxed text-sm lg:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-16 lg:py-24 mx-6 mb-12 lg:mb-20">
        <div
          className="max-w-4xl mx-auto rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl"
          style={{ 
            background: isDarkMode 
              ? `linear-gradient(135deg, #2d3748 0%, #4a5568 100%)` 
              : `linear-gradient(135deg, #4a6fa5 0%, #81a1d4 100%)` 
          }}
        >
          <div className="text-center px-6 lg:px-8 py-12 lg:py-16 text-white">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6">Ξεκινήστε το ταξίδι σας σήμερα</h2>
            <p className="text-lg lg:text-xl mb-8 lg:mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed">
              Επικοινωνήστε μαζί μας και ανακαλύψτε πώς μπορούμε να σας βοηθήσουμε να πετύχετε τους στόχους σας
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
              <Button
                size="lg"
                className="font-semibold px-8 py-4 rounded-full hover:scale-105 transition-all duration-200 shadow-xl border-0"
                style={{ background: `linear-gradient(135deg, #f78da7 0%, #fabeb6 100%)` }}
                asChild
              >
                <a href="tel:+306987770734" className="flex items-center gap-3 justify-center">
                  📞 +30 698 777 0734
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="font-semibold px-8 py-4 rounded-full hover:scale-105 transition-all duration-200 border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
                asChild
              >
                <a href="mailto:info@alfaschool.gr" className="flex items-center gap-3 justify-center">
                  ✉️ info@alfaschool.gr
                </a>
              </Button>
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
