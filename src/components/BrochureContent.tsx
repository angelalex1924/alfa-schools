"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Star, Users, BookOpen, Globe, Award, Heart, Lightbulb, Phone, Mail, ExternalLink } from "lucide-react";

const BrochureContent = () => {
  const features = [
    {
      icon: Users,
      title: "Τμήματα για όλες τις ηλικίες",
      description: "Από την Α' Δημοτικού και πάνω",
      color: "from-blue-500/10 to-blue-600/10"
    },
    {
      icon: BookOpen,
      title: "Ενισχυτικά & επαναληπτικά",
      description: "Εξατομικευμένη διδασκαλία",
      color: "from-green-500/10 to-green-600/10"
    },
    {
      icon: Star,
      title: "Προετοιμασία Πανελληνίων",
      description: "Αγγλική & Γαλλική Φιλολογία",
      color: "from-yellow-500/10 to-yellow-600/10"
    },
    {
      icon: Globe,
      title: "IELTS & TOEFL",
      description: "Προετοιμασία για εξωτερικό",
      color: "from-purple-500/10 to-purple-600/10"
    },
    {
      icon: Lightbulb,
      title: "Θερινά τμήματα",
      description: "Εντατικά προγράμματα",
      color: "from-orange-500/10 to-orange-600/10"
    },
    {
      icon: Heart,
      title: "Επαγγελματίες",
      description: "Ταχύρρυθμα τμήματα",
      color: "from-red-500/10 to-red-600/10"
    }
  ];

  const additionalFeatures = [
    "Σύγχρονες αίθουσες με διαδραστικούς πίνακες",
    "Δανειστική βιβλιοθήκη",
    "Τετράδιο συνεργασίας μαθητή – γονέα – καθηγητή",
    "Τακτικές συγκεντρώσεις γονέων",
    "Πολιτιστικές & ψυχαγωγικές εκδηλώσεις",
    "Συνεργασίες με γνωστά κολλέγια του εξωτερικού",
    "Εκπαιδευτικά ταξίδια στο εξωτερικό"
  ];

  const usefulLinks = [
    { name: "Ελληνοαμερικάνικη Ένωση", url: "#" },
    { name: "British Council", url: "#" },
    { name: "Γαλλικό Ινστιτούτο", url: "#" },
    { name: "Europalso", url: "#" },
    { name: "Cambridge Dictionary", url: "#" }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 space-y-24">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-6 py-2 mb-8" style={{
          backgroundColor: 'rgba(129, 161, 212, 0.1)',
          borderColor: 'rgba(129, 161, 212, 0.2)'
        }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#f78da7'}}></div>
          <span className="font-medium text-gray-700">Κέντρα Ξένων Γλωσσών ΑΛΦΑ</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="block" style={{
            background: `linear-gradient(135deg, #4a6fa5 0%, #81a1d4 50%, #c9b6e4 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            35+ Χρόνια
          </span>
          <span className="block mt-2" style={{
            background: `linear-gradient(135deg, #c9b6e4 0%, #f78da7 50%, #fabeb6 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Εμπειρίας
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Μαζί από το 1986, με σεβασμό, αγάπη και αφοσίωση στη μάθηση
        </p>
      </div>

      {/* History Section */}
      <Card className="border-0 shadow-xl overflow-hidden" style={{
        background: `linear-gradient(135deg, rgba(129, 161, 212, 0.05) 0%, rgba(201, 182, 228, 0.05) 100%)`
      }}>
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{
              background: `linear-gradient(135deg, #81a1d4 0%, #4a6fa5 100%)`
            }}>
              <Star className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold text-gray-800">Η ιστορία μας</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6 text-lg text-gray-600 px-8 pb-12">
          <p className="leading-relaxed">
            Το πρώτο μας σχολείο γεννήθηκε το <span className="font-semibold text-gray-800">1986</span> στη Νέα Φιλαδέλφεια, 
            με όραμα να δώσει νέα διάσταση στην εκμάθηση ξένων γλωσσών.
          </p>
          <p className="leading-relaxed">
            Με αφοσίωση, μεράκι και σωστή επιστημονική κατάρτιση, δημιουργήσαμε σχέσεις 
            εμπιστοσύνης με μαθητές και γονείς, σημειώνοντας συνεχείς επιτυχίες στις εξετάσεις.
          </p>
          <p className="leading-relaxed">
            Η πορεία μας συνεχίστηκε το <span className="font-semibold text-gray-800">1996</span> στο Χαλάνδρι, πάντα με τον ίδιο στόχο: 
            σύγχρονη, μεθοδική και αποτελεσματική εκπαίδευση.
          </p>
        </CardContent>
      </Card>

      {/* Centers Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="text-center relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300" style={{
                background: `linear-gradient(135deg, #81a1d4 0%, #4a6fa5 100%)`
              }}>
                <MapPin className="w-7 h-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Νέα Φιλαδέλφεια</CardTitle>
          </CardHeader>
          <CardContent className="text-center relative z-10">
            <p className="text-gray-600 font-medium">Το πρώτο μας κέντρο από το 1986</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="text-center relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300" style={{
                background: `linear-gradient(135deg, #c9b6e4 0%, #f78da7 100%)`
              }}>
                <MapPin className="w-7 h-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Χαλάνδρι</CardTitle>
          </CardHeader>
          <CardContent className="text-center relative z-10">
            <p className="text-gray-600 font-medium">Το δεύτερο μας κέντρο από το 1996</p>
          </CardContent>
        </Card>
      </div>

      {/* Services Section */}
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Οι Υπηρεσίες μας</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ανακαλύψτε τις εξειδικευμένες εκπαιδευτικές υπηρεσίες που προσφέρουμε
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{
                    background: `linear-gradient(135deg, rgba(129, 161, 212, 0.1) 0%, rgba(201, 182, 228, 0.1) 100%)`
                  }}>
                    <IconComponent className="w-6 h-6 text-gray-700" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Additional Features */}
      <Card className="border-0 shadow-xl overflow-hidden" style={{
        background: `linear-gradient(135deg, rgba(247, 141, 167, 0.05) 0%, rgba(250, 190, 182, 0.05) 100%)`
      }}>
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold text-gray-800">Επιπλέον Παροχές</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalFeatures.map((feature, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="text-sm py-3 px-4 font-medium hover:scale-105 transition-transform duration-200 cursor-default"
                style={{
                  backgroundColor: 'rgba(129, 161, 212, 0.1)',
                  color: '#4a6fa5',
                  border: '1px solid rgba(129, 161, 212, 0.2)'
                }}
              >
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Philosophy Section */}
      <Card className="border-0 shadow-xl overflow-hidden relative">
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, rgba(201, 182, 228, 0.1) 0%, rgba(247, 141, 167, 0.1) 100%)`
        }}></div>
        <CardHeader className="text-center relative z-10 pb-8">
          <CardTitle className="text-4xl font-bold text-gray-800">Η φιλοσοφία μας</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-8 relative z-10 px-8 pb-12">
          <blockquote className="text-2xl italic font-medium text-gray-700 leading-relaxed">
            "Η εκμάθηση ξένων γλωσσών δεν είναι μόνο ένα δίπλωμα.<br />
            Είναι καλλιέργεια, προσωπική ανάπτυξη και εφόδιο για έναν κόσμο που συνεχώς αλλάζει."
          </blockquote>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Η οικογένεια του ΑΛΦΑ αγκαλιάζει με προσωπικό ενδιαφέρον κάθε μαθητή, 
            καλλιεργώντας δεξιότητες που τον συνοδεύουν σε όλη του τη ζωή.
          </p>
        </CardContent>
      </Card>

      {/* Languages Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-3xl font-bold text-gray-800">🇬🇧 Αγγλικά</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <p className="text-gray-600 leading-relaxed">Είναι η διεθνής γλώσσα επικοινωνίας και πληροφορίας.</p>
            <p className="text-gray-600 leading-relaxed">Ανοίγουν δρόμους για σπουδές, καριέρα και ταξίδια.</p>
            <p className="text-gray-600 leading-relaxed">Το 80% του διαδικτύου είναι στα αγγλικά.</p>
            <p className="text-gray-600 leading-relaxed">Σε κάθε τομέα – επιστήμη, τεχνολογία, πολιτική, επιχειρήσεις – τα αγγλικά έχουν κυρίαρχ�� ρόλο.</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-3xl font-bold text-gray-800">🇫🇷 Γαλλικά</CardTitle>
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
            {usefulLinks.map((link, index) => (
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