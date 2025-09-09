import NotebookHero from "@/components/NotebookHero"

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Notebook Hero Section */}
      <NotebookHero />

      {/* Main content area */}
      <main className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
            {/* Online Courses */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#81a1d4]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                </svg>
                      </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Online Courses</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Εξειδικευμένα online μαθήματα σε διάφορους τομείς με interactive περιεχόμενο και πιστοποιήσεις.
              </p>
              <div className="flex items-center text-[#81a1d4] font-semibold">
                <span>Μάθετε περισσότερα</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                  </div>
                </div>
                
            {/* Live Workshops */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#81a1d4]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Live Workshops</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Συμμετοχή σε live workshops με ειδικούς και άμεση επικοινωνία για ερωτήσεις και διευκρινίσεις.
              </p>
              <div className="flex items-center text-[#81a1d4] font-semibold">
                <span>Μάθετε περισσότερα</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                  </div>
                </div>
                
            {/* Personal Coaching */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#81a1d4]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Personal Coaching</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Προσωπική καθοδήγηση και mentoring για εξειδικευμένα θέματα και προσωπικό ανάπτυξη.
              </p>
              <div className="flex items-center text-[#81a1d4] font-semibold">
                <span>Μάθετε περισσότερα</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                      </div>
                    </div>

            {/* Corporate Training */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#81a1d4]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                      </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Corporate Training</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Εκπαιδευτικά προγράμματα για εταιρείες και οργανισμούς με προσαρμοσμένο περιεχόμενο.
              </p>
              <div className="flex items-center text-[#81a1d4] font-semibold">
                <span>Μάθετε περισσότερα</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                      </div>
                    </div>

            {/* Certification Programs */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#81a1d4]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                        </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Certification Programs</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Πιστοποιητικά επαγγελματικής κατάρτισης αναγνωρισμένα από διεθνείς οργανισμούς.
              </p>
              <div className="flex items-center text-[#81a1d4] font-semibold">
                <span>Μάθετε περισσότερα</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                  </div>
                </div>
                
            {/* Learning Resources */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#81a1d4]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Learning Resources</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Βιβλία, άρθρα, βίντεο και άλλα εκπαιδευτικά υλικά για συνεχή μάθηση.
              </p>
              <div className="flex items-center text-[#81a1d4] font-semibold">
                <span>Μάθετε περισσότερα</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                    </div>
                  </div>
                </div>
                
          {/* CTA section */}
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Έτοιμοι να ξεκινήσετε;
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Επικοινωνήστε μαζί μας για να μάθετε περισσότερα για τις υπηρεσίες μας.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#81a1d4] text-white rounded-full hover:bg-[#81a1d4]/90 transition-colors text-lg font-semibold"
            >
              Επικοινωνήστε μαζί μας
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
          </div>
        </div>
      </main>
    </div>
  );
}
