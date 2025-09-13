import NotebookHero from "@/components/NotebookHero"
import SchoolBreadcrumb from "@/components/SchoolBreadcrumb"

export default function WhyUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28">
        <div className="max-w-7xl mx-auto">
          <SchoolBreadcrumb 
            items={[
              { label: 'Αρχική', href: '/' },
              { label: 'Γιατί εμάς' }
            ]}
          />
        </div>
      </div>

      {/* Notebook Hero Section */}
      <NotebookHero />

      {/* Main content area */}
      <main className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
            {/* Experience */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#81a1d4]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">15+ Χρόνια Εμπειρία</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Πάνω από 15 χρόνια εμπειρίας στον τομέα της εκπαίδευσης με χιλιάδες ικανοποιημένους μαθητές.
              </p>
            </div>

            {/* Expert Instructors */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#81a1d4]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ειδικοί Καθηγητές</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ομάδα ειδικών καθηγητών με διεθνή εμπειρία και πιστοποιήσεις από κορυφαία πανεπιστήμια.
              </p>
            </div>

            {/* Modern Methods */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#81a1d4]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Σύγχρονες Μέθοδοι</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Χρήση των πιο σύγχρονων εκπαιδευτικών μεθόδων και τεχνολογιών για βέλτιστα αποτελέσματα.
              </p>
            </div>

            {/* Flexible Learning */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#81a1d4]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ευέλικτη Μάθηση</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Προσαρμοσμένα προγράμματα που ταιριάζουν στο πρόγραμμα και τις ανάγκες κάθε μαθητή.
              </p>
            </div>

            {/* Support */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#81a1d4]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">24/7 Υποστήριξη</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Συνεχής υποστήριξη και καθοδήγηση για όλες τις ερωτήσεις και τις αμφιβολίες σας.
              </p>
            </div>

            {/* Results */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#81a1d4]/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Εξασφαλισμένα Αποτελέσματα</h3>
              <p className="text-gray-600 dark:text-gray-300">
                95% επιτυχία στους μαθητές μας με εγγύηση αποτελεσμάτων ή επιστροφή χρημάτων.
              </p>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="py-16">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                Οι Αριθμοί μιλούν από μόνοι τους
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#81a1d4] mb-2">15+</div>
                  <div className="text-gray-600 dark:text-gray-300">Χρόνια Εμπειρία</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#81a1d4] mb-2">10,000+</div>
                  <div className="text-gray-600 dark:text-gray-300">Ικανοποιημένοι Μαθητές</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#81a1d4] mb-2">95%</div>
                  <div className="text-gray-600 dark:text-gray-300">Ποσοστό Επιτυχίας</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#81a1d4] mb-2">50+</div>
                  <div className="text-gray-600 dark:text-gray-300">Ειδικοί Καθηγητές</div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="py-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Τι λένε οι μαθητές μας
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#81a1d4]/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-[#81a1d4] font-bold text-lg">Μ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Μαρία Κωνσταντίνου</div>
                    <div className="text-sm text-gray-500">Φοιτήτρια</div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Η Alfa School μου έδωσε τις γνώσεις και τις δεξιότητες που χρειαζόμουν για να πετύχω στην καριέρα μου."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#81a1d4]/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-[#81a1d4] font-bold text-lg">Γ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Γιώργος Παπαδόπουλος</div>
                    <div className="text-sm text-gray-500">Επιχειρηματίας</div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Τα workshops της Alfa School ήταν καθοριστικά για την ανάπτυξη της επιχείρησής μου."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#81a1d4]/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-[#81a1d4] font-bold text-lg">Α</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Αννα Δημητρίου</div>
                    <div className="text-sm text-gray-500">Εργαζόμενη</div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Η ευελιξία των online μαθημάτων μου επέτρεψε να σπουδάσω ενώ εργαζόμουν."
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Έτοιμοι να ξεκινήσετε το ταξίδι σας;
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Εγγραφείτε τώρα και γίνετε μέρος της οικογένειας της Alfa School.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#81a1d4] text-white rounded-full hover:bg-[#81a1d4]/90 transition-colors text-lg font-semibold"
              >
                Δείτε τις Υπηρεσίες μας
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#81a1d4] text-[#81a1d4] rounded-full hover:bg-[#81a1d4] hover:text-white transition-colors text-lg font-semibold"
              >
                Επικοινωνήστε μαζί μας
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
