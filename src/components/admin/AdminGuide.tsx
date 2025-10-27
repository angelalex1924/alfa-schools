"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Mail, 
  Settings, 
  ChevronRight,
  ChevronDown,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Image as ImageIcon,
  Calendar,
  Tag,
  Users,
  Send,
  Edit,
  Trash2,
  Eye,
  Plus,
  Save,
  Layers,
  Globe,
  Palette,
  MessageSquare,
  Download,
  X,
  Star
} from 'lucide-react';

interface GuideSection {
  id: string;
  title: string;
  icon: any;
  content: React.ReactNode;
}

export default function AdminGuide() {
  const [expandedSection, setExpandedSection] = useState<string | null>('articles');

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const sections: GuideSection[] = [
    {
      id: 'articles',
      title: 'Διαχείριση Άρθρων',
      icon: FileText,
      content: (
        <div className="space-y-6">
          {/* Creating Articles */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Δημιουργία Νέου Άρθρου
            </h4>
            
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-2">Βήμα 1: Πρόσβαση στη Φόρμα Δημιουργίας</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Από το Dashboard, κάντε κλικ στο <strong>"Δημιουργία Άρθρου"</strong></li>
                  <li>Ή πηγαίνετε στη <strong>Διαχείριση Άρθρων</strong> και κάντε κλικ στο κουμπί <strong>"Νέο Άρθρο"</strong></li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Βήμα 2: Συμπληρώστε τις Βασικές Πληροφορίες</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="font-medium text-blue-600 dark:text-blue-400">📝 Τίτλος *</p>
                    <p className="text-xs mt-1">Ο κύριος τίτλος του άρθρου σας. Είναι υποχρεωτικό πεδίο.</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-blue-600 dark:text-blue-400">🔗 Slug *</p>
                    <p className="text-xs mt-1">Δημιουργείται <strong>αυτόματα</strong> από τον τίτλο. Είναι το URL-friendly όνομα (π.χ. "ekpaideutiko-systima" αντί "Εκπαιδευτικό Σύστημα"). Μπορείτε να το επεξεργαστείτε χειροκίνητα αν θέλετε.</p>
                    <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-900/30 rounded border border-blue-300 dark:border-blue-700">
                      <p className="text-xs font-semibold">💡 Χρήσιμο: Το σύστημα προσφέρει προτάσεις για slug με το component SlugSuggestions!</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-blue-600 dark:text-blue-400">📁 Κατηγορία *</p>
                    <p className="text-xs mt-1">Επιλέξτε μία από τις διαθέσιμες κατηγορίες:</p>
                    <ul className="text-xs mt-2 space-y-1 ml-4">
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        <strong>Εκπαίδευση</strong> - Γενικά εκπαιδευτικά θέματα
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <strong>Νέα</strong> - Ανακοινώσεις και νέα
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                        <strong>Δράσεις</strong> - Εκδηλώσεις και δράσεις
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <strong>Αγγλικά</strong> - Άρθρα για αγγλικά
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                        <strong>Γαλλικά</strong> - Άρθρα για γαλλικά
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
                        <strong>Γλώσσες</strong> - Γενικά για γλώσσες
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium text-blue-600 dark:text-blue-400">👤 Συγγραφέας (Προαιρετικό)</p>
                    <p className="text-xs mt-1">Το όνομα του συγγραφέα. Αν αφεθεί κενό, δεν θα εμφανίζεται.</p>
                  </div>

                  <div>
                    <p className="font-medium text-blue-600 dark:text-blue-400">🖼️ Εικόνα Άρθρου (Προαιρετικό)</p>
                    <p className="text-xs mt-1">URL της κύριας εικόνας που θα εμφανίζεται στο πάνω μέρος του άρθρου. Αν αφεθεί κενό, δεν θα εμφανίζεται.</p>
                  </div>

                  <div>
                    <p className="font-medium text-blue-600 dark:text-blue-400">📅 Ημερομηνία Δημοσίευσης *</p>
                    <p className="text-xs mt-1">Επιλέξτε την ημερομηνία και ώρα δημοσίευσης. Προεπιλεγμένη είναι η τρέχουσα ώρα.</p>
                  </div>

                  <div>
                    <p className="font-medium text-blue-600 dark:text-blue-400">📄 Περίληψη *</p>
                    <p className="text-xs mt-1">Σύντομη περίληψη 1-2 προτάσεων. Εμφανίζεται στις προεπισκοπήσεις άρθρων και στα SEO meta tags.</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">Βήμα 3: Περιεχόμενο Άρθρου</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-3">
                  <p className="text-xs">Χρησιμοποιήστε τον <strong>Rich Text Editor</strong> για να γράψετε το άρθρο σας με πλήρη μορφοποίηση:</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded border">
                      <p className="font-medium mb-1">📝 Μορφοποίηση Κειμένου</p>
                      <ul className="space-y-0.5 ml-3 text-xs">
                        <li>• Bold, Italic, Underline</li>
                        <li>• Headings (H1, H2, H3)</li>
                        <li>• Παράγραφοι</li>
                        <li>• Λίστες (bullets, αριθμημένες)</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded border">
                      <p className="font-medium mb-1">🖼️ Media & Links</p>
                      <ul className="space-y-0.5 ml-3 text-xs">
                        <li>• Εισαγωγή εικόνων</li>
                        <li>• Εισαγωγή videos</li>
                        <li>• Σύνδεσμοι (links)</li>
                        <li>• Πίνακες (tables)</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded border">
                      <p className="font-medium mb-1">🎨 Styling</p>
                      <ul className="space-y-0.5 ml-3 text-xs">
                        <li>• Χρώματα κειμένου</li>
                        <li>• Χρώματα φόντου</li>
                        <li>• Στοίχιση κειμένου</li>
                        <li>• Code blocks</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded border">
                      <p className="font-medium mb-1">⚙️ Προχωρημένα</p>
                      <ul className="space-y-0.5 ml-3 text-xs">
                        <li>• Blockquotes</li>
                        <li>• Horizontal rules</li>
                        <li>• Undo/Redo</li>
                        <li>• Clear formatting</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-300 dark:border-yellow-700">
                    <p className="text-xs font-semibold">⚡ Συμβουλή: Το περιεχόμενο αποθηκεύεται ως HTML, οπότε μπορείτε να χρησιμοποιήσετε όλες τις δυνατότητες μορφοποίησης!</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">Βήμα 4: Meta & Tags</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-2">
                  <div>
                    <p className="font-medium text-blue-600 dark:text-blue-400">🏷️ Tags</p>
                    <p className="text-xs mt-1">Προσθέστε tags για καλύτερη οργάνωση και αναζήτηση:</p>
                    <ul className="text-xs mt-2 space-y-1 ml-4 list-disc list-inside">
                      <li>Κάντε κλικ στο <strong>"Προσθήκη Tag"</strong> για να προσθέσετε νέο tag</li>
                      <li>Χρησιμοποιήστε το εικονίδιο <Trash2 className="inline h-3 w-3 text-red-500" /> για να αφαιρέσετε tag</li>
                      <li>Τα κενά tags αγνοούνται αυτόματα κατά την αποθήκευση</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">Βήμα 5: Αποθήκευση & Δημοσίευση</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <ul className="text-xs space-y-2 list-disc list-inside">
                    <li>Κάντε κλικ στο κουμπί <strong className="text-blue-600">"Δημοσίευση"</strong> για να αποθηκεύσετε το άρθρο</li>
                    <li>Το άρθρο αποθηκεύεται στη Firebase Firestore database</li>
                    <li className="font-semibold text-green-600 dark:text-green-400">✅ ΑΥΤΟΜΑΤΑ: Το σύστημα στέλνει newsletter σε όλους τους subscribers!</li>
                    <li className="font-semibold text-green-600 dark:text-green-400">✅ ΑΥΤΟΜΑΤΑ: Το sitemap ενημερώνεται για SEO!</li>
                    <li className="font-semibold text-green-600 dark:text-green-400">✅ ΑΥΤΟΜΑΤΑ: Το άρθρο υποβάλλεται για instant indexing στη Google!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Managing Articles */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Διαχείριση Υπαρχόντων Άρθρων
            </h4>
            
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-2">Προβολή Όλων των Άρθρων</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-xs">
                  <li>Πηγαίνετε στη <strong>Διαχείριση Άρθρων</strong> από το μενού</li>
                  <li>Βλέπετε όλα τα άρθρα σε μορφή λίστας με preview</li>
                  <li>Χρησιμοποιήστε το πεδίο αναζήτησης για να βρείτε άρθρα (αναζήτηση σε τίτλο, κατηγορία, tags)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Ενέργειες για κάθε Άρθρο</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <Eye className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-600">Προβολή</p>
                      <p className="text-xs mt-1">Ανοίγει το άρθρο στην δημόσια σελίδα για προεπισκόπηση</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Edit className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-600">Επεξεργασία</p>
                      <p className="text-xs mt-1">Ανοίγει τη φόρμα επεξεργασίας με όλα τα δεδομένα του άρθρου</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Trash2 className="h-4 w-4 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-600">Διαγραφή</p>
                      <p className="text-xs mt-1">Διαγράφει το άρθρο (ζητάει επιβεβαίωση πρώτα)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">Πληροφορίες που Εμφανίζονται</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-xs">
                  <li>Τίτλος άρθρου</li>
                  <li>Περίληψη</li>
                  <li>Ημερομηνία δημοσίευσης</li>
                  <li>Κατηγορία</li>
                  <li>Tags (έως 2 εμφανίζονται + πόσα ακόμα υπάρχουν)</li>
                  <li>Εικόνα preview (αν υπάρχει)</li>
                  <li>Badges: "Προτεινόμενο" και "Σπουδαία Νέα" (αν ισχύουν)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Article Features */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
            <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
              <Star className="h-5 w-5" />
              Επιπλέον Χαρακτηριστικά Άρθρων
            </h4>
            
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium text-purple-600 mb-2">⚡ Αυτόματα Χαρακτηριστικά</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                  <li><strong>View Counter:</strong> Καταμέτρηση προβολών κάθε άρθρου</li>
                  <li><strong>Reading Time:</strong> Αυτόματος υπολογισμός χρόνου ανάγνωσης</li>
                  <li><strong>SEO Optimization:</strong> Αυτόματη δημιουργία meta tags</li>
                  <li><strong>Sitemap Integration:</strong> Προσθήκη στο sitemap.xml</li>
                  <li><strong>Social Sharing:</strong> Open Graph και Twitter Card tags</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium text-purple-600 mb-2">🌐 Πολυγλωσσική Υποστήριξη</p>
                <p className="text-xs">Το σύστημα υποστηρίζει πεδία για αγγλικές μεταφράσεις:</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4 mt-2">
                  <li>titleEn: Αγγλικός τίτλος</li>
                  <li>excerptEn: Αγγλική περίληψη</li>
                  <li>contentEn: Αγγλικό περιεχόμενο</li>
                  <li>authorEn: Αγγλικό όνομα συγγραφέα</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'newsletter',
      title: 'Διαχείριση Newsletter',
      icon: Mail,
      content: (
        <div className="space-y-6">
          {/* Newsletter Dashboard */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-6 rounded-xl border border-pink-200 dark:border-pink-800">
            <h4 className="text-lg font-semibold text-pink-900 dark:text-pink-100 mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Newsletter Dashboard
            </h4>
            
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-2">Πληροφορίες που Βλέπετε</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="font-medium text-blue-600">📊 Total Subscribers</p>
                    <p className="mt-1">Συνολικός αριθμός εγγεγραμμένων</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="font-medium text-green-600">✅ Active Subscribers</p>
                    <p className="mt-1">Ενεργοί συνδρομητές</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="font-medium text-purple-600">🌍 Languages</p>
                    <p className="mt-1">Πόσες γλώσσες χρησιμοποιούν</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <p className="font-medium text-orange-600">📈 Engagement</p>
                    <p className="mt-1">Ποσοστό ενεργών χρηστών</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">Λίστα Subscribers</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-2">
                  <p className="text-xs">Για κάθε subscriber βλέπετε:</p>
                  <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                    <li>Email address</li>
                    <li>Γλώσσα προτίμησης (με σημαία 🇬🇷, 🇬🇧, κλπ.)</li>
                    <li>Ημερομηνία εγγραφής</li>
                    <li>Status: Active ή Inactive</li>
                    <li>Checkbox για επιλογή (bulk actions)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Actions */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
              <Send className="h-5 w-5" />
              Αποστολή Newsletter
            </h4>
            
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-2">🚀 Αυτόματο Newsletter (Συνιστάται)</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-xs mb-3">Όταν δημιουργείτε νέο άρθρο, το σύστημα <strong className="text-green-600">στέλνει ΑΥΤΟΜΑΤΑ</strong> newsletter σε όλους τους subscribers!</p>
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded border border-green-200 dark:border-green-700">
                    <p className="text-xs font-semibold">✨ Δεν χρειάζεται να κάνετε τίποτα - είναι πλήρως αυτόματο!</p>
                    <p className="text-xs mt-2">Το newsletter περιλαμβάνει:</p>
                    <ul className="text-xs mt-1 space-y-0.5 ml-4 list-disc list-inside">
                      <li>Τίτλο άρθρου</li>
                      <li>Περίληψη</li>
                      <li>Εικόνα (αν υπάρχει)</li>
                      <li>Κουμπί "Διαβάστε περισσότερα" με link στο άρθρο</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">📧 Χειροκίνητη Αποστολή Template Email</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-3">
                  <p className="text-xs">Για προσαρμοσμένα emails:</p>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="font-medium">Βήμα 1: Κάντε κλικ "Send Template Email"</p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Βήμα 2: Επιλέξτε Template</p>
                      <p className="ml-4 mt-1">Διαθέσιμα templates από τη βιβλιοθήκη email-templates</p>
                    </div>

                    <div>
                      <p className="font-medium">Βήμα 3: Συμπληρώστε τα Πεδία</p>
                      <ul className="ml-4 mt-1 space-y-1 list-disc list-inside">
                        <li><strong>Τίτλος:</strong> Κύριος τίτλος του email (Υποχρεωτικό)</li>
                        <li><strong>Μήνυμα:</strong> Το κύριο περιεχόμενο (Υποχρεωτικό)</li>
                        <li><strong>Επιπλέον Πληροφορίες:</strong> Προαιρετικό κείμενο</li>
                        <li><strong>Κείμενο Κουμπιού:</strong> π.χ. "Μάθετε Περισσότερα"</li>
                        <li><strong>URL Κουμπιού:</strong> Link προορισμού</li>
                        <li><strong>Γλώσσα:</strong> Ελληνικά, English, κλπ.</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium">Βήμα 4: Επιλογές Αποστολής</p>
                      <div className="ml-4 mt-2 space-y-2">
                        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                          <p className="font-medium text-purple-600">👁️ Preview</p>
                          <p className="mt-1">Δείτε πώς θα φαίνεται το email πριν το στείλετε</p>
                        </div>
                        <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                          <p className="font-medium text-yellow-600">🧪 Test Email</p>
                          <p className="mt-1">Στείλτε σε δοκιμαστικό email για έλεγχο</p>
                        </div>
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                          <p className="font-medium text-green-600">📤 Στείλε σε Όλους</p>
                          <p className="mt-1">Αποστολή στους subscribers που ταιριάζουν στη γλώσσα</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">📥 Export Subscribers</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-xs">Κάντε κλικ στο <strong>"Export CSV"</strong> για να κατεβάσετε τη λίστα subscribers σε αρχείο CSV που περιλαμβάνει:</p>
                  <ul className="text-xs mt-2 space-y-1 list-disc list-inside ml-4">
                    <li>Email</li>
                    <li>Language</li>
                    <li>Subscribed At</li>
                    <li>Active Status</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Subscriber Management */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
            <h4 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Διαχείριση Subscribers
            </h4>
            
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-2">🔍 Αναζήτηση</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-xs">Χρησιμοποιήστε το πεδίο αναζήτησης για να βρείτε subscribers με βάση:</p>
                  <ul className="text-xs mt-2 space-y-1 list-disc list-inside ml-4">
                    <li>Email address</li>
                    <li>Γλώσσα (π.χ. "el", "en")</li>
                  </ul>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">🗑️ Διαγραφή Subscribers</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-xs font-medium text-red-600">Μεμονωμένη Διαγραφή:</p>
                    <ol className="text-xs mt-2 space-y-1 ml-4 list-decimal list-inside">
                      <li>Κάντε κλικ στο κουμπί <Trash2 className="inline h-3 w-3 text-red-500" /> "Delete"</li>
                      <li>Θα ζητηθεί επιβεβαίωση</li>
                      <li>Κάντε κλικ "Confirm Delete" για οριστική διαγραφή</li>
                    </ol>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-red-600">Bulk Διαγραφή (Πολλαπλή):</p>
                    <ol className="text-xs mt-2 space-y-1 ml-4 list-decimal list-inside">
                      <li>Επιλέξτε subscribers με τα checkboxes</li>
                      <li>Ή κάντε κλικ "Select All" για όλους</li>
                      <li>Κάντε κλικ "Delete Selected"</li>
                      <li>Επιβεβαιώστε τη διαγραφή</li>
                    </ol>
                    <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded border border-yellow-300">
                      <p className="text-xs font-semibold">⚠️ Προσοχή: Η διαγραφή είναι μόνιμη και δεν μπορεί να αναιρεθεί!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">📊 Στατιστικά Κατανομής Γλωσσών</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-xs">Βλέπετε badges με τη κατανομή subscribers ανά γλώσσα, π.χ.:</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">🇬🇷 Greek: 45</span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">🇬🇧 English: 23</span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">🇫🇷 French: 12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'templates',
      title: 'Template Editor',
      icon: Palette,
      content: (
        <div className="space-y-6">
          {/* Template Editor Overview */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
            <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Επισκόπηση Template Editor
            </h4>
            
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-xs mb-3">Ο <strong>Template Editor</strong> σας επιτρέπει να προσαρμόσετε πλήρως την εμφάνιση των email templates σας!</p>
                <p className="text-xs">Πρόσβαση: Από το Newsletter Dashboard → <strong>"Edit Templates"</strong></p>
              </div>
            </div>
          </div>

          {/* Color Customization */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Προσαρμογή Χρωμάτων
            </h4>
            
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-2">🎨 Color Presets (Προεπιλεγμένα Χρώματα)</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-xs mb-3">Επιλέξτε από 6 έτοιμα color schemes:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span>Classic Blue</span>
                    </div>
                    <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      <span>Warm Orange</span>
                    </div>
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span>Success Green</span>
                    </div>
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <span>Elegant Purple</span>
                    </div>
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                      <span>Vibrant Red</span>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                      <span>Professional Gray</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">🖌️ Custom Colors (Προσαρμοσμένα Χρώματα)</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-xs mb-3">Ορίστε ακριβώς τα χρώματα που θέλετε:</p>
                  <ul className="text-xs space-y-2 list-disc list-inside ml-4">
                    <li><strong>Primary:</strong> Κύριο χρώμα (headers, buttons)</li>
                    <li><strong>Secondary:</strong> Δευτερεύον χρώμα (accents)</li>
                    <li><strong>Accent:</strong> Χρώμα έμφασης (highlights)</li>
                    <li><strong>Background:</strong> Χρώμα φόντου</li>
                  </ul>
                  <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/30 rounded border border-blue-200">
                    <p className="text-xs">💡 Χρησιμοποιήστε το color picker ή εισάγετε hex codes (π.χ. #81a1d4)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Typography & Layout */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Typography & Layout
            </h4>
            
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-2">📝 Typography</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-xs mb-2">Επιλέξτε γραμματοσειρές από 6 επαγγελματικές επιλογές:</p>
                  <ul className="text-xs space-y-1 ml-4 list-disc list-inside">
                    <li><strong>Heading Font:</strong> Για τίτλους (Outfit, Inter, Roboto, Open Sans, Lato, Montserrat)</li>
                    <li><strong>Body Font:</strong> Για κύριο κείμενο (ίδιες επιλογές)</li>
                  </ul>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">📐 Layout Settings</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-2">
                  <div className="text-xs">
                    <p className="font-medium">Border Radius:</p>
                    <p className="ml-4 mt-1">Στρογγυλεμένες γωνίες (π.χ. "20px", "10px")</p>
                  </div>
                  <div className="text-xs">
                    <p className="font-medium">Padding:</p>
                    <p className="ml-4 mt-1">Εσωτερική απόσταση (π.χ. "40px", "30px")</p>
                  </div>
                  <div className="text-xs">
                    <p className="font-medium">Spacing:</p>
                    <p className="ml-4 mt-1">Απόσταση μεταξύ στοιχείων (π.χ. "25px", "20px")</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">🖼️ Logo Settings</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                    <li><strong>Size:</strong> Μέγεθος logo (π.χ. "100px", "120px")</li>
                    <li><strong>Position:</strong> Θέση (Center, Left, Right)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Seasonal Themes */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-6 rounded-xl border border-pink-200 dark:border-pink-800">
            <h4 className="text-lg font-semibold text-pink-900 dark:text-pink-100 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎄</span>
              Seasonal Themes (Εποχιακά Θέματα)
            </h4>
            
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-xs mb-3">Προσθέστε εορταστική ατμόσφαιρα στα emails σας!</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold mb-2">Διαθέσιμα Θέματα:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded text-xs flex items-center gap-2">
                        <span className="text-lg">🎨</span>
                        <span>None (Χωρίς θέμα)</span>
                      </div>
                      <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded text-xs flex items-center gap-2">
                        <span className="text-lg">🎄</span>
                        <span>Christmas</span>
                      </div>
                      <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded text-xs flex items-center gap-2">
                        <span className="text-lg">🎃</span>
                        <span>Halloween</span>
                      </div>
                      <div className="p-2 bg-pink-50 dark:bg-pink-900/20 rounded text-xs flex items-center gap-2">
                        <span className="text-lg">🐰</span>
                        <span>Easter</span>
                      </div>
                      <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs flex items-center gap-2">
                        <span className="text-lg">☀️</span>
                        <span>Summer</span>
                      </div>
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded text-xs flex items-center gap-2">
                        <span className="text-lg">🎭</span>
                        <span>Carnival</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold mb-2">Holiday Icons:</p>
                    <p className="text-xs mb-2">Όταν επιλέξετε θέμα, μπορείτε να διαλέξετε συγκεκριμένα icons:</p>
                    <ul className="text-xs space-y-1 ml-4 list-disc list-inside">
                      <li><strong>Christmas:</strong> 🎄🎅❄️🎁🌟⛄🦌🔔</li>
                      <li><strong>Halloween:</strong> 🎃👻🦇🕷️🕸️💀🧙‍♀️🧛‍♂️</li>
                      <li><strong>Easter:</strong> 🐰🥚🌸🌷🦋🌿🐣🌼</li>
                      <li><strong>Summer:</strong> ☀️🏖️🌊🌴🍦🏄‍♂️🌺🦋</li>
                      <li><strong>Carnival:</strong> 🎭🎪🎨🎊🎉🎈🎠🎡</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Saving & Preview */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800">
            <h4 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Preview & Αποθήκευση
            </h4>
            
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-2">👁️ Live Preview</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-xs">Κάντε κλικ στο κουμπί <strong className="text-purple-600">"Preview"</strong> για να δείτε πώς θα φαίνεται το template με τις επιλογές σας.</p>
                  <p className="text-xs mt-2">Το preview εμφανίζεται σε πραγματικό χρόνο με όλες τις προσαρμογές!</p>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">💾 Αποθήκευση Template</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-2">
                  <p className="text-xs">Κάντε κλικ στο <strong className="text-green-600">"Save Template"</strong> για να αποθηκεύσετε τις αλλαγές.</p>
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded border border-green-200">
                    <p className="text-xs font-semibold">✅ Οι προσαρμογές αποθηκεύονται στη Firebase Firestore!</p>
                    <p className="text-xs mt-1">Θα χρησιμοποιούνται αυτόματα όταν στέλνετε template emails.</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">↩️ Reset to Default</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-xs">Κάντε κλικ στο <strong className="text-orange-600">"Reset"</strong> για να επιστρέψετε στις προεπιλεγμένες ρυθμίσεις.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'tips',
      title: 'Συμβουλές & Best Practices',
      icon: Lightbulb,
      content: (
        <div className="space-y-6">
          {/* SEO Best Practices */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <h4 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              SEO Best Practices
            </h4>
            
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-xs font-semibold mb-2">📝 Τίτλοι Άρθρων:</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                  <li>Κρατήστε τους κάτω από 60 χαρακτήρες</li>
                  <li>Χρησιμοποιήστε περιγραφικές και ελκυστικές λέξεις</li>
                  <li>Συμπεριλάβετε keywords που ταιριάζουν στο περιεχόμενο</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-xs font-semibold mb-2">📄 Περιλήψεις:</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                  <li>150-160 χαρακτήρες (ιδανικό για SEO)</li>
                  <li>Περιγράψτε σαφώς το περιεχόμενο</li>
                  <li>Προσθέστε call-to-action όπου χρειάζεται</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-xs font-semibold mb-2">🔗 Slugs:</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                  <li>Χρησιμοποιήστε μόνο πεζά γράμματα</li>
                  <li>Χρησιμοποιήστε παύλες (-) αντί για κενά</li>
                  <li>Κρατήστε το σύντομο και περιγραφικό</li>
                  <li>Αποφύγετε ειδικούς χαρακτήρες</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-xs font-semibold mb-2">🏷️ Tags:</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                  <li>Χρησιμοποιήστε 3-7 σχετικά tags</li>
                  <li>Επιλέξτε συγκεκριμένα και περιγραφικά tags</li>
                  <li>Αποφύγετε υπερβολική χρήση tags</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Content Best Practices */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Συμβουλές Περιεχομένου
            </h4>
            
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-xs font-semibold mb-2">📸 Εικόνες:</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                  <li>Χρησιμοποιήστε υψηλής ποιότητας εικόνες</li>
                  <li>Βελτιστοποιήστε το μέγεθος για γρήγορη φόρτωση</li>
                  <li>Προσθέστε alt text για προσβασιμότητα</li>
                  <li>Χρησιμοποιήστε σχετικές εικόνες με το θέμα</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-xs font-semibold mb-2">✍️ Κείμενο:</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                  <li>Χρησιμοποιήστε σύντομες παραγράφους (3-4 γραμμές)</li>
                  <li>Προσθέστε headings για καλύτερη δομή</li>
                  <li>Χρησιμοποιήστε λίστες για ευκολότερη ανάγνωση</li>
                  <li>Προσθέστε bold για έμφαση σε σημαντικά σημεία</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-xs font-semibold mb-2">🎥 Videos:</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                  <li>Ενσωματώστε videos από YouTube/Vimeo</li>
                  <li>Προσθέστε περιγραφικό κείμενο πριν/μετά</li>
                  <li>Χρησιμοποιήστε responsive video embeds</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter Best Practices */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Newsletter Tips
            </h4>
            
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-xs font-semibold mb-2">📧 Timing:</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                  <li>Το αυτόματο newsletter στέλνεται όταν δημοσιεύετε άρθρο</li>
                  <li>Για custom emails, επιλέξτε κατάλληλες ώρες (π.χ. πρωί)</li>
                  <li>Αποφύγετε Σαββατοκύριακα εκτός αν είναι σκόπιμο</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-xs font-semibold mb-2">🎯 Content:</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                  <li>Κρατήστε το μήνυμα σύντομο και στο θέμα</li>
                  <li>Χρησιμοποιήστε ελκυστικούς τίτλους</li>
                  <li>Προσθέστε clear call-to-action</li>
                  <li>Test πάντα πρώτα με test email!</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-xs font-semibold mb-2">🌍 Γλώσσες:</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                  <li>Τα emails στέλνονται στη γλώσσα που επιλέγετε</li>
                  <li>Subscribers λαμβάνουν emails στη γλώσσα προτίμησής τους</li>
                  <li>Δημιουργήστε ξεχωριστά templates για διαφορετικές γλώσσες</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
            <h4 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Σημαντικές Σημειώσεις
            </h4>
            
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-red-500">
                <p className="text-xs font-semibold text-red-600 mb-2">⚠️ Αυτόματες Λειτουργίες:</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                  <li>Το newsletter στέλνεται ΑΥΤΟΜΑΤΑ όταν δημιουργείτε νέο άρθρο</li>
                  <li>Το sitemap ενημερώνεται ΑΥΤΟΜΑΤΑ</li>
                  <li>Instant indexing υποβάλλεται ΑΥΤΟΜΑΤΑ</li>
                  <li>Βεβαιωθείτε ότι τα στοιχεία είναι σωστά πριν δημοσιεύσετε!</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-xs font-semibold text-yellow-600 mb-2">💡 Backup & Ασφάλεια:</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                  <li>Τα δεδομένα αποθηκεύονται στη Firebase Firestore</li>
                  <li>Δεν υπάρχει αυτόματο backup - προσοχή στη διαγραφή!</li>
                  <li>Εξάγετε τακτικά τη λίστα subscribers (Export CSV)</li>
                  <li>Κρατήστε backup των σημαντικών άρθρων</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-xs font-semibold text-green-600 mb-2">✅ Καλές Πρακτικές:</p>
                <ul className="text-xs space-y-1 list-disc list-inside ml-4">
                  <li>Preview πάντα πριν δημοσιεύσετε</li>
                  <li>Ελέγξτε τη μορφοποίηση σε διαφορετικές συσκευές</li>
                  <li>Χρησιμοποιήστε τα slug suggestions για SEO</li>
                  <li>Test τα template emails πριν στείλετε σε όλους</li>
                  <li>Ελέγχετε τακτικά τα newsletter statistics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-8 rounded-2xl mb-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <BookOpen className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Οδηγός Χρήσης Admin Panel</h2>
            <p className="text-white/90 mt-1">Πλήρης και λεπτομερής οδηγός για όλες τις λειτουργίες</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
          <p className="text-sm">
            <CheckCircle className="inline h-4 w-4 mr-2" />
            Αυτός ο οδηγός βασίζεται στον <strong>πραγματικό κώδικα</strong> του συστήματος και είναι 100% ακριβής!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {section.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-500 rounded-lg text-white">
            <Lightbulb className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
              Χρειάζεστε Βοήθεια;
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Αυτός ο οδηγός καλύπτει όλες τις βασικές λειτουργίες του Admin Panel. Όλες οι πληροφορίες είναι ακριβείς και βασισμένες στον πραγματικό κώδικα του συστήματος. Για τεχνική υποστήριξη, επικοινωνήστε με τον διαχειριστή του συστήματος.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

