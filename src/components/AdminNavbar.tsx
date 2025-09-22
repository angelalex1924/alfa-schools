'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home,
  BarChart3,
  Mail,
  BookOpen
} from 'lucide-react'

interface AdminNavbarProps {
  onLogout: () => void
}

export default function AdminNavbar({ onLogout }: AdminNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      description: 'Κύρια πληροφόρηση'
    },
    {
      name: 'Άρθρα',
      href: '/admin/articles',
      icon: FileText,
      description: 'Διαχείριση άρθρων'
    },
    {
      name: 'Newsletter',
      href: '/admin/newsletter',
      icon: MessageSquare,
      description: 'Διαχείριση newsletter'
    }
  ]

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === '/admin' || pathname === '/admin/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-lg border-b border-blue-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md p-1">
                  <img 
                    src="/alfa-logo.png" 
                    alt="Alfa Schools Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Alfa Schools</h1>
                  <p className="text-blue-200 text-sm">Admin Panel</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                    title={item.description}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Home Link */}
              <Link
                href="/"
                className="flex items-center space-x-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                title="Πήγαινε στην αρχική σελίδα"
              >
                <Home className="w-5 h-5" />
                <span className="hidden xl:inline">Αρχική</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                title="Αποσύνδεση"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden xl:inline">Αποσύνδεση</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-lg border-b border-blue-300">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md p-1">
                <img 
                  src="/alfa-logo.png" 
                  alt="Alfa Schools Logo" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Alfa Schools</h1>
                <p className="text-blue-200 text-xs">Admin</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-blue-500 border-t border-blue-300 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-white/20 text-white'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-blue-200">{item.description}</div>
                    </div>
                  </Link>
                )
              })}

              {/* Mobile Actions */}
              <div className="border-t border-blue-300 pt-2 mt-2">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-blue-100 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200"
                >
                  <Home className="w-5 h-5" />
                  <div>
                    <div className="font-medium">Αρχική Σελίδα</div>
                    <div className="text-xs text-blue-200">Πήγαινε στην αρχική</div>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    onLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <div>
                    <div className="font-medium">Αποσύνδεση</div>
                    <div className="text-xs text-red-200">Αποσύνδεση από το admin</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
