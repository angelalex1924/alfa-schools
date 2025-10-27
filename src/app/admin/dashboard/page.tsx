"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut, 
  User,
  Calendar,
  TrendingUp,
  Award,
  MessageSquare,
  FileText,
  HelpCircle
} from 'lucide-react';
import { DashboardThemeSwitcher } from '@/components/admin/DashboardThemeSwitcher';
import { AcronWebCloudLogo } from '@/components/acronweb-cloud-logo';
import AdminGuide from '@/components/admin/AdminGuide';

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Φόρτωση...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const quickActions = [
    {
      title: 'Δημιουργία Άρθρου',
      description: 'Δημιουργήστε νέο άρθρο',
      icon: BookOpen,
      color: 'bg-blue-500',
      href: '/admin/articles/create'
    },
    {
      title: 'Διαχείριση Άρθρων',
      description: 'Επεξεργασία υπαρχόντων άρθρων',
      icon: FileText,
      color: 'bg-green-500',
      href: '/admin/articles'
    },
    {
      title: 'Newsletter',
      description: 'Διαχείριση newsletter subscribers',
      icon: MessageSquare,
      color: 'bg-pink-500',
      href: '/admin/newsletter'
    },
    {
      title: 'Οδηγός Χρήσης',
      description: 'Πλήρης οδηγός για το Admin Panel',
      icon: HelpCircle,
      color: 'bg-purple-500',
      action: () => setShowGuide(true)
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AcronWeb Cloud Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <AcronWebCloudLogo 
            size="lg" 
            showTagline={false} 
            animated={true} 
          />
        </motion.div>

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            {t('admin.dashboard.welcome')}, {user.email?.split('@')[0]}
          </h2>
          <p className="text-slate-600">
            Εδώ μπορείτε να διαχειριστείτε όλες τις πτυχές του εκπαιδευτικού συστήματος
          </p>
        </motion.div>


        {/* Theme Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <DashboardThemeSwitcher />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Γρήγορες Ενέργειες
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                onClick={() => action.action ? action.action() : router.push(action.href)}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${action.color}`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {action.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Admin Guide Section */}
        {showGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 rounded-3xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto relative"
            >
              <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-50/95 via-blue-50/95 to-indigo-100/95 dark:from-slate-900/95 dark:to-slate-800/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 p-6">
                <button
                  onClick={() => setShowGuide(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-white/50 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 pt-0">
                <AdminGuide />
              </div>
            </motion.div>
          </motion.div>
        )}

      </main>
    </div>
  );
}
