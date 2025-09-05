export default function Contact() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: `linear-gradient(135deg, #fafafa 0%, #fde7dc 50%, #fabeb6 100%)`
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full blur-xl animate-pulse" style={{backgroundColor: 'rgba(129, 161, 212, 0.1)'}}></div>
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full blur-xl animate-bounce" style={{backgroundColor: 'rgba(201, 182, 228, 0.1)'}}></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 rounded-full blur-xl animate-ping" style={{backgroundColor: 'rgba(247, 141, 167, 0.1)'}}></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 rounded-2xl animate-pulse" style={{backgroundColor: 'rgba(74, 111, 165, 0.05)'}}></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#81a1d4'}}></div>
        <div className="absolute top-1/3 right-16 w-1 h-1 rounded-full animate-bounce" style={{backgroundColor: '#c9b6e4'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full animate-ping" style={{backgroundColor: '#f78da7'}}></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full animate-pulse" style={{backgroundColor: '#fabeb6'}}></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/6 right-1/4 w-1 h-1 rounded-full animate-pulse delay-1000" style={{backgroundColor: '#81a1d4'}}></div>
        <div className="absolute bottom-1/4 right-1/6 w-2 h-2 rounded-full animate-bounce delay-700" style={{backgroundColor: '#c9b6e4'}}></div>
        <div className="absolute top-3/4 left-1/6 w-1.5 h-1.5 rounded-full animate-ping delay-500" style={{backgroundColor: '#f78da7'}}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #81a1d4 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      {/* Main content area */}
      <main className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero section */}
          <div className="text-center py-20">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 backdrop-blur-md border rounded-full px-6 py-2 mb-8 animate-pulse" style={{
              backgroundColor: 'rgba(129, 161, 212, 0.2)',
              borderColor: 'rgba(129, 161, 212, 0.3)'
            }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#f78da7'}}></div>
              <span className="font-medium text-gray-700">Επικοινωνήστε μαζί μας</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight" style={{
              background: `linear-gradient(135deg, #81a1d4 0%, #c9b6e4 50%, #f78da7 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Επικοινωνήστε μαζί μας
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Έχουμε ερωτήσεις; Επικοινωνήστε μαζί μας για περισσότερες πληροφορίες και θα σας απαντήσουμε άμεσα.
            </p>
          </div>

          {/* Contact Information and Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 relative">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-[#81a1d4]/20 to-[#c9b6e4]/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-6" style={{
                background: `linear-gradient(135deg, #81a1d4 0%, #c9b6e4 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Πληροφορίες Επικοινωνίας
              </h2>
              
              {/* Chalandri Center */}
              <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(129, 161, 212, 0.1) 100%)'
              }}>
                <h3 className="text-xl font-bold text-[#81a1d4] mb-4 group-hover:text-[#6b8bc4] transition-colors duration-300">Χαλάνδρι</h3>
                
              {/* Phone */}
                <div className="flex items-center space-x-4 mb-4 group/item">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#81a1d4] to-[#c9b6e4] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover/item:scale-110 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                    <a href="tel:+302106800708" className="text-gray-600 dark:text-gray-300 font-medium hover:text-[#81a1d4] transition-colors">
                      +30 210 6800 708
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 bg-[#81a1d4]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <a href="https://maps.google.com/?q=Ρούμελης+27,+Χαλάνδρι" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 text-sm hover:text-[#81a1d4] transition-colors">
                      Ρούμελης 27, Χαλάνδρι 152 33
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 bg-[#81a1d4]/20 rounded-full flex items-center justify-center flex-shrink-0">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#81a1d4]">
                    <g clipPath="url(#clip0_4418_6317)">
                      <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path opacity="0.4" d="M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4418_6317">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      <span className="font-medium">Ωράριο:</span><br />
                      Δευτέρα - Παρασκευή: 16:00 - 21:00
                    </p>
                  </div>
                </div>

                {/* Email for Chalandri */}
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#81a1d4]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <a href="mailto:info@alfaschoolchalandri.com" className="text-gray-600 dark:text-gray-300 text-sm hover:text-[#81a1d4] transition-colors">
                      info@alfaschoolchalandri.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Nea Filadelfeia Center */}
              <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(201, 182, 228, 0.1) 100%)'
              }}>
                <h3 className="text-xl font-bold text-[#81a1d4] mb-4 group-hover:text-[#6b8bc4] transition-colors duration-300">Νέα Φιλαδέλφεια</h3>
                
                {/* Phone */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 bg-[#81a1d4]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <a href="tel:+302102777725" className="text-gray-600 dark:text-gray-300 font-medium hover:text-[#81a1d4] transition-colors">
                      +30 210 2777 725
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#81a1d4]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <a href="https://maps.google.com/?q=Αγίου+Γεωργίου+15,+Νέα+Φιλαδέλφεια" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 text-sm hover:text-[#81a1d4] transition-colors">
                      Αγίου Γεωργίου 15, Νέα Φιλαδέλφεια Αττικής 143 42
                    </a>
                  </div>
                </div>
              </div>



              {/* Social Media */}
              <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(247, 141, 167, 0.1) 100%)'
              }}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#81a1d4] to-[#c9b6e4] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Κοινωνικά Δίκτυα</h3>
                    <div className="flex space-x-4">
                      <a href="https://www.facebook.com/profile.php?id=100057649952827" target="_blank" rel="nofollow noopener" className="flex items-center gap-2 text-[#81a1d4] hover:text-[#6b8bc4] transition-all duration-300 hover:scale-105">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Facebook
                      </a>
                      <a href="https://www.instagram.com/alfaschools/" target="_blank" rel="nofollow noopener" className="flex items-center gap-2 text-[#81a1d4] hover:text-[#6b8bc4] transition-all duration-300 hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <g clipPath="url(#clip0_4418_7411)">
                            <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"/>
                            <path d="M12 16.25C9.66 16.25 7.75 14.34 7.75 12C7.75 9.66 9.66 7.75 12 7.75C14.34 7.75 16.25 9.66 16.25 12C16.25 14.34 14.34 16.25 12 16.25ZM12 9.25C10.48 9.25 9.25 10.48 9.25 12C9.25 13.52 10.48 14.75 12 14.75C13.52 14.75 14.75 13.52 14.75 12C14.75 10.48 13.52 9.25 12 9.25Z"/>
                            <path d="M17 7.50088C16.87 7.50088 16.74 7.47088 16.62 7.42088C16.5 7.37088 16.39 7.30088 16.29 7.21088C16.2 7.11088 16.12 7.00088 16.07 6.88088C16.02 6.76088 16 6.63088 16 6.50088C16 6.37088 16.02 6.24088 16.07 6.12088C16.13 5.99088 16.2 5.89088 16.29 5.79088C16.34 5.75088 16.39 5.70088 16.44 5.67088C16.5 5.63088 16.56 5.60088 16.62 5.58088C16.68 5.55088 16.74 5.53088 16.81 5.52088C17.13 5.45088 17.47 5.56088 17.71 5.79088C17.8 5.89088 17.87 5.99088 17.92 6.12088C17.97 6.24088 18 6.37088 18 6.50088C18 6.63088 17.97 6.76088 17.92 6.88088C17.87 7.00088 17.8 7.11088 17.71 7.21088C17.61 7.30088 17.5 7.37088 17.38 7.42088C17.26 7.47088 17.13 7.50088 17 7.50088Z"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_4418_7411">
                              <rect width="24" height="24" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="pt-8">
                <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80" style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(250, 190, 182, 0.1) 100%)'
                }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Συχνές Ερωτήσεις</h3>
                  <p className="text-gray-600 mb-4">Δεν βρήκατε αυτό που ψάχνατε; Ελέγξτε τις συχνές ερωτήσεις μας.</p>
                  <a href="#" className="inline-flex items-center gap-2 text-[#81a1d4] font-semibold hover:text-[#6b8bc4] transition-all duration-300 group-hover:translate-x-1">
                    Δείτε τις FAQ 
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(129, 161, 212, 0.1) 100%)'
            }}>
              <h2 className="text-3xl font-bold mb-6" style={{
                background: `linear-gradient(135deg, #81a1d4 0%, #c9b6e4 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Στείλτε μας μήνυμα
              </h2>
              
              <form className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Όνομα *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81a1d4] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-[#81a1d4]/50 focus:scale-[1.02]"
                      placeholder="Το όνομά σας"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Επώνυμο *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81a1d4] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-[#81a1d4]/50 focus:scale-[1.02]"
                      placeholder="Το επώνυμό σας"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81a1d4] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-[#81a1d4]/50 focus:scale-[1.02]"
                    placeholder="Το email σας"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Τηλέφωνο
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81a1d4] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-[#81a1d4]/50 focus:scale-[1.02]"
                    placeholder="Το τηλέφωνό σας"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Θέμα *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81a1d4] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-[#81a1d4]/50 focus:scale-[1.02]"
                  >
                    <option value="">Επιλέξτε θέμα</option>
                    <option value="general">Γενικές πληροφορίες</option>
                    <option value="courses">Μαθήματα & Προγράμματα</option>
                    <option value="pricing">Τιμές & Πληρωμές</option>
                    <option value="technical">Τεχνική υποστήριξη</option>
                    <option value="partnership">Συνεργασίες</option>
                    <option value="other">Άλλο</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Μήνυμα *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81a1d4] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-[#81a1d4]/50 focus:scale-[1.02] resize-none"
                    placeholder="Γράψτε το μήνυμά σας..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group w-full bg-gradient-to-r from-[#81a1d4] to-[#c9b6e4] text-white py-4 px-6 rounded-xl hover:from-[#6b8bc4] hover:to-[#b8a5d4] transition-all duration-500 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transform"
                >
                  <span className="flex items-center justify-center gap-2">
                    Στείλτε το μήνυμα
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Maps Section */}
          <div className="py-16 relative">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-[#f78da7]/20 to-[#fabeb6]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            <h2 className="text-3xl font-bold mb-8 text-center" style={{
              background: `linear-gradient(135deg, #81a1d4 0%, #c9b6e4 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Βρείτε μας
            </h2>
            
            {/* Maps Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chalandri Map */}
              <div>
                <h3 className="text-2xl font-bold text-[#81a1d4] mb-6 text-center">Χαλάνδρι</h3>
                <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80" style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(129, 161, 212, 0.1) 100%)'
                }}>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d785.6926221684752!2d23.793170706334312!3d38.029129737058376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a198f1f1a3d1f5%3A0x3935ea2e235ffe0e!2zzpPOmc6Rzp3Onc6RzprOn86gzp_Opc6bzp_OpSDOnM6RzqHOmM6RIM6RzqHOk86lzqHOn86gzp_Opc6bzp_OpSDOk86VzqnOoc6TzpnOkSDOms6RzpkgzqPOmc6RIM6VzpU!5e0!3m2!1sel!2sgr!4v1756988299764!5m2!1sel!2sgr" 
                      width="100%" 
                      height="100%" 
                      style={{border:0}} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      <strong>Διεύθυνση:</strong> Ρούμελης 27, Χαλάνδρι 152 33
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                      <strong>Τηλέφωνο:</strong> 210 6800 708
                    </p>
                    
                    {/* Map Buttons */}
                    <div className="flex justify-center gap-3 mt-4">
                      <a 
                        href="https://maps.google.com/?q=Ρούμελης+27,+Χαλάνδρι" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg hover:bg-white hover:border-[#81a1d4] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                          <path fillRule="evenodd" clipRule="evenodd" d="M24 12.8116L23.9999 12.8541C23.9998 12.872 23.9996 12.8899 23.9994 12.9078C23.9998 12.9287 24 12.9498 24 12.971C24 16.3073 21.4007 19.2604 19.6614 21.2367C19.1567 21.8101 18.7244 22.3013 18.449 22.6957C17.4694 24.0986 16.9524 25.6184 16.8163 26.2029C16.8163 26.6431 16.4509 27 16 27C15.5491 27 15.1837 26.6431 15.1837 26.2029C15.0476 25.6184 14.5306 24.0986 13.551 22.6957C13.2756 22.3013 12.8433 21.8101 12.3386 21.2367C10.5993 19.2604 8 16.3073 8 12.971C8 12.9498 8.0002 12.9287 8.0006 12.9078C8.0002 12.8758 8 12.8437 8 12.8116C8 8.49736 11.5817 5 16 5C20.4183 5 24 8.49736 24 12.8116ZM16 15.6812C17.7132 15.6812 19.102 14.325 19.102 12.6522C19.102 10.9793 17.7132 9.62319 16 9.62319C14.2868 9.62319 12.898 10.9793 12.898 12.6522C12.898 14.325 14.2868 15.6812 16 15.6812Z" fill="#34A851"/>
                          <path d="M23.1054 9.21856C22.1258 7.37546 20.4161 5.96177 18.3504 5.34277L13.7559 10.5615C14.3208 9.98352 15.1174 9.62346 16.0002 9.62346C17.7134 9.62346 19.1022 10.9796 19.1022 12.6524C19.1022 13.3349 18.8711 13.9646 18.4811 14.4711L23.1054 9.21856Z" fill="#4285F5"/>
                          <path d="M12.4311 21.3425C12.4004 21.3076 12.3695 21.2725 12.3383 21.2371C11.1918 19.9344 9.67162 18.2073 8.76855 16.2257L13.5439 10.8018C13.1387 11.3136 12.8976 11.9556 12.8976 12.6526C12.8976 14.3254 14.2865 15.6816 15.9997 15.6816C16.8675 15.6816 17.6521 15.3336 18.2151 14.7727L12.4311 21.3425Z" fill="#F9BB0E"/>
                          <path d="M9.89288 7.76562C8.71207 9.12685 8 10.8881 8 12.8117C8 12.8438 8.0002 12.8759 8.0006 12.9079C8.0002 12.9288 8 12.9499 8 12.9711C8 14.1082 8.30196 15.2009 8.76889 16.2254L13.5362 10.8106L9.89288 7.76562Z" fill="#E74335"/>
                          <path d="M18.3499 5.34254C17.6068 5.11988 16.8176 5 15.9997 5C13.5514 5 11.36 6.07387 9.89258 7.76553L13.5359 10.8105L13.5438 10.8015C13.6101 10.7178 13.6807 10.6375 13.7554 10.5611L18.3499 5.34254Z" fill="#1A73E6"/>
                  </svg>
                        <span className="text-sm font-medium">Google Maps</span>
                      </a>
                      
                      <a 
                        href="https://maps.apple.com/?q=Ρούμελης+27,+Χαλάνδρι" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg hover:bg-white hover:border-[#81a1d4] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <img src="/apple-maps.png" alt="Apple Maps" className="w-5 h-5" />
                        <span className="text-sm font-medium">Apple Maps</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nea Filadelfeia Map */}
              <div>
                <h3 className="text-2xl font-bold text-[#81a1d4] mb-6 text-center">Νέα Φιλαδέλφεια</h3>
                <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80" style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(201, 182, 228, 0.1) 100%)'
                }}>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d785.4587324187893!2d23.745742769699632!3d38.050932454315465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1a2134259ece7%3A0x6fda03989a09b1d5!2zzpHOs86vzr_PhSDOk861z4nPgc6zzq_Ov8-FIDE1LCDOnc6tzrEgzqbOuc67zrHOtM6tzrvPhs61zrnOsSDOkc-Ez4TOuc66zq7PgiAxNDMgNDI!5e0!3m2!1sel!2sgr!4v1756988589319!5m2!1sel!2sgr" 
                      width="100%" 
                      height="100%" 
                      style={{border:0}} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      <strong>Διεύθυνση:</strong> Αγίου Γεωργίου 15, Νέα Φιλαδέλφεια Αττικής 143 42
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                      <strong>Τηλέφωνο:</strong> 210 2777 725
                    </p>
                    
                    {/* Map Buttons */}
                    <div className="flex justify-center gap-3 mt-4">
                      <a 
                        href="https://maps.google.com/?q=Αγίου+Γεωργίου+15,+Νέα+Φιλαδέλφεια" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg hover:bg-white hover:border-[#81a1d4] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                          <path fillRule="evenodd" clipRule="evenodd" d="M24 12.8116L23.9999 12.8541C23.9998 12.872 23.9996 12.8899 23.9994 12.9078C23.9998 12.9287 24 12.9498 24 12.971C24 16.3073 21.4007 19.2604 19.6614 21.2367C19.1567 21.8101 18.7244 22.3013 18.449 22.6957C17.4694 24.0986 16.9524 25.6184 16.8163 26.2029C16.8163 26.6431 16.4509 27 16 27C15.5491 27 15.1837 26.6431 15.1837 26.2029C15.0476 25.6184 14.5306 24.0986 13.551 22.6957C13.2756 22.3013 12.8433 21.8101 12.3386 21.2367C10.5993 19.2604 8 16.3073 8 12.971C8 12.9498 8.0002 12.9287 8.0006 12.9078C8.0002 12.8758 8 12.8437 8 12.8116C8 8.49736 11.5817 5 16 5C20.4183 5 24 8.49736 24 12.8116ZM16 15.6812C17.7132 15.6812 19.102 14.325 19.102 12.6522C19.102 10.9793 17.7132 9.62319 16 9.62319C14.2868 9.62319 12.898 10.9793 12.898 12.6522C12.898 14.325 14.2868 15.6812 16 15.6812Z" fill="#34A851"/>
                          <path d="M23.1054 9.21856C22.1258 7.37546 20.4161 5.96177 18.3504 5.34277L13.7559 10.5615C14.3208 9.98352 15.1174 9.62346 16.0002 9.62346C17.7134 9.62346 19.1022 10.9796 19.1022 12.6524C19.1022 13.3349 18.8711 13.9646 18.4811 14.4711L23.1054 9.21856Z" fill="#4285F5"/>
                          <path d="M12.4311 21.3425C12.4004 21.3076 12.3695 21.2725 12.3383 21.2371C11.1918 19.9344 9.67162 18.2073 8.76855 16.2257L13.5439 10.8018C13.1387 11.3136 12.8976 11.9556 12.8976 12.6526C12.8976 14.3254 14.2865 15.6816 15.9997 15.6816C16.8675 15.6816 17.6521 15.3336 18.2151 14.7727L12.4311 21.3425Z" fill="#F9BB0E"/>
                          <path d="M9.89288 7.76562C8.71207 9.12685 8 10.8881 8 12.8117C8 12.8438 8.0002 12.8759 8.0006 12.9079C8.0002 12.9288 8 12.9499 8 12.9711C8 14.1082 8.30196 15.2009 8.76889 16.2254L13.5362 10.8106L9.89288 7.76562Z" fill="#E74335"/>
                          <path d="M18.3499 5.34254C17.6068 5.11988 16.8176 5 15.9997 5C13.5514 5 11.36 6.07387 9.89258 7.76553L13.5359 10.8105L13.5438 10.8015C13.6101 10.7178 13.6807 10.6375 13.7554 10.5611L18.3499 5.34254Z" fill="#1A73E6"/>
                        </svg>
                        <span className="text-sm font-medium">Google Maps</span>
                      </a>
                      
                      <a 
                        href="https://maps.apple.com/?q=Αγίου+Γεωργίου+15,+Νέα+Φιλαδέλφεια" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg hover:bg-white hover:border-[#81a1d4] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <img src="/apple-maps.png" alt="Apple Maps" className="w-5 h-5" />
                        <span className="text-sm font-medium">Apple Maps</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
