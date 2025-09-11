"use client"

import React, { useEffect } from 'react';
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
  FileText
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

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
      title: 'Ρυθμίσεις',
      description: 'Ρυθμίσεις συστήματος',
      icon: Settings,
      color: 'bg-purple-500',
      href: '/admin/settings'
    },
    {
      title: 'Αναφορές',
      description: 'Στατιστικά και αναφορές',
      icon: BarChart3,
      color: 'bg-orange-500',
      href: '/admin/reports'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Header */}
      <header className="bg-white/90 backdrop-blur-2xl border-b border-white/30 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Left Section - Logo & Title */}
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur-sm"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-2 border border-white/40">
                  <img 
                    src="/alfa-logo.png" 
                    alt="Alfa Schools Logo" 
                    className="h-6 w-auto lg:h-8"
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {t('admin.dashboard.title')}
                </h1>
              </div>
            </div>
            
            {/* Right Section - User Info & Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* User Info - Hidden on mobile */}
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-slate-800 truncate max-w-32 lg:max-w-none">
                  {user.email}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Διαχειριστής
                </p>
              </div>

              {/* User Avatar - Mobile */}
              <div className="md:hidden">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="group flex items-center gap-2 px-3 lg:px-4 py-2 text-sm font-medium text-slate-600 hover:text-white bg-white/60 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl border border-white/40 hover:border-red-300 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">{t('admin.dashboard.logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            {t('admin.dashboard.welcome')}, {user.email?.split('@')[0]}
          </h2>
          <p className="text-slate-600">
            Εδώ μπορείτε να διαχειριστείτε όλες τις πτυχές του εκπαιδευτικού συστήματος
          </p>
        </motion.div>


        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Γρήγορες Ενέργειες
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                onClick={() => router.push(action.href)}
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

      </main>
    </div>
  );
}
