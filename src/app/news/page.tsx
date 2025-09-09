import NotebookHero from "@/components/NotebookHero"

export default function News() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Notebook Hero Section */}
      <NotebookHero />

      {/* Main content area */}
      <main className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Featured News */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Προτεινόμενα Άρθρα
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Featured Article 1 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-[#81a1d4]/20 to-[#81a1d4]/40 flex items-center justify-center">
                  <svg className="w-16 h-16 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-[#81a1d4] mb-3">
                    <span className="bg-[#81a1d4]/10 px-3 py-1 rounded-full">Εκπαίδευση</span>
                    <span>15 Δεκεμβρίου 2024</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Νέα Τεχνολογίες στην Εκπαίδευση
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Πώς οι τεχνολογίες AI και VR αλλάζουν τον τρόπο που μαθαίνουμε και διδάσκουμε.
                  </p>
                  <a href="#" className="text-[#81a1d4] font-semibold hover:underline">
                    Διαβάστε περισσότερα →
                  </a>
                </div>
              </div>

              {/* Featured Article 2 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-[#81a1d4]/20 to-[#81a1d4]/40 flex items-center justify-center">
                  <svg className="w-16 h-16 text-[#81a1d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-[#81a1d4] mb-3">
                    <span className="bg-[#81a1d4]/10 px-3 py-1 rounded-full">Workshop</span>
                    <span>10 Δεκεμβρίου 2024</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Επιτυχημένο Workshop για Επιχειρηματικότητα
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Πάνω από 100 συμμετέχοντες συμμετείχαν στο workshop μας για την επιχειρηματικότητα.
                  </p>
                  <a href="#" className="text-[#81a1d4] font-semibold hover:underline">
                    Διαβάστε περισσότερα →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Latest News Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Τελευταία Νέα
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* News Item 1 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 text-sm text-[#81a1d4] mb-3">
                  <span className="bg-[#81a1d4]/10 px-2 py-1 rounded-full text-xs">Ανακοίνωση</span>
                  <span className="text-gray-500">8 Δεκεμβρίου 2024</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Νέα Συνεργασία με Διεθνείς Πανεπιστήμια
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Η Alfa School ανακοινώνει νέες συνεργασίες με κορυφαία διεθνή πανεπιστήμια.
                </p>
              </div>

              {/* News Item 2 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 text-sm text-[#81a1d4] mb-3">
                  <span className="bg-[#81a1d4]/10 px-2 py-1 rounded-full text-xs">Εκδήλωση</span>
                  <span className="text-gray-500">5 Δεκεμβρίου 2024</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Επερχόμενη Εκδήλωση: Tech Education Summit
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Συνέδριο για την τεχνολογική εκπαίδευση στις 20 Ιανουαρίου 2025.
                </p>
              </div>

              {/* News Item 3 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 text-sm text-[#81a1d4] mb-3">
                  <span className="bg-[#81a1d4]/10 px-2 py-1 rounded-full text-xs">Επιτυχία</span>
                  <span className="text-gray-500">1 Δεκεμβρίου 2024</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Φοιτητές μας κερδίζουν Διεθνή Βραβεία
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Τρεις φοιτητές μας κέρδισαν βραβεία σε διεθνείς διαγωνισμούς.
                </p>
              </div>

              {/* News Item 4 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 text-sm text-[#81a1d4] mb-3">
                  <span className="bg-[#81a1d4]/10 px-2 py-1 rounded-full text-xs">Ενημέρωση</span>
                  <span className="text-gray-500">28 Νοεμβρίου 2024</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Νέα Πλατφόρμα Μάθησης
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Εκκινεί η νέα πλατφόρμα μας με βελτιωμένα χαρακτηριστικά.
                </p>
              </div>

              {/* News Item 5 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 text-sm text-[#81a1d4] mb-3">
                  <span className="bg-[#81a1d4]/10 px-2 py-1 rounded-full text-xs">Συνέντευξη</span>
                  <span className="text-gray-500">25 Νοεμβρίου 2024</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Συνέντευξη με τον Διευθυντή μας
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Διαβάστε τη συνέντευξη του διευθυντή μας για το μέλλον της εκπαίδευσης.
                </p>
              </div>

              {/* News Item 6 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 text-sm text-[#81a1d4] mb-3">
                  <span className="bg-[#81a1d4]/10 px-2 py-1 rounded-full text-xs">Έρευνα</span>
                  <span className="text-gray-500">20 Νοεμβρίου 2024</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Νέα Έρευνα για την Online Μάθηση
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Δημοσιεύθηκε νέα έρευνα για την αποτελεσματικότητα της online μάθησης.
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="text-center py-16">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Μείνετε Ενημερωμένοι
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Εγγραφείτε στο newsletter μας για να λαμβάνετε τα τελευταία νέα και ενημερώσεις.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Το email σας"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#81a1d4] focus:border-transparent"
                />
                <button className="px-6 py-3 bg-[#81a1d4] text-white rounded-full hover:bg-[#81a1d4]/90 transition-colors font-semibold">
                  Εγγραφή
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
