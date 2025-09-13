"use client"
import NotebookHero from "@/components/NotebookHero"
import SchoolBreadcrumb from "@/components/SchoolBreadcrumb"
import { useTheme } from "@/contexts/ThemeContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { useState } from "react"

export default function Contact() {
  const { isDarkMode } = useTheme()
  const { t } = useLanguage()
  
  // Helper function to ensure we get a string from translation
  const getString = (key: string): string => {
    const translation = t(key)
    return Array.isArray(translation) ? translation[0] : translation
  }
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    center: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          center: ''
        })
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || getString('contact.messageError'))
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(getString('contact.messageError'))
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: isDarkMode 
          ? `linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)`
          : `linear-gradient(135deg, #fefefe 0%, #f8fafc 50%, #f1f5f9 100%)`,
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl animate-pulse opacity-20"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(148, 163, 184, 0.15)" 
              : "rgba(59, 130, 246, 0.1)" 
          }}
        ></div>
        <div
          className="absolute top-40 right-20 w-56 h-56 rounded-full blur-3xl animate-pulse opacity-15"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(186, 230, 253, 0.1)" 
              : "rgba(147, 197, 253, 0.15)" 
          }}
        ></div>
        <div
          className="absolute bottom-40 left-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-25"
          style={{ 
            backgroundColor: isDarkMode 
              ? "rgba(167, 243, 208, 0.08)" 
              : "rgba(34, 197, 94, 0.08)" 
          }}
        ></div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="pt-20 pb-4 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SchoolBreadcrumb 
            items={[
              { label: getString('breadcrumbs.home'), href: '/' },
              { label: getString('contact.pageTitle') }
            ]}
          />
        </div>
      </div>

      {/* Notebook Hero Section */}
      <NotebookHero />

      {/* Main content area */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Contact Information and Form - School Style */}
          <div className="py-16 lg:py-24">
            {/* School Notebook Paper Background */}
            <div className="relative bg-gradient-to-br from-white/98 via-blue-50/30 to-indigo-50/20 dark:from-slate-800/98 dark:via-slate-700/30 dark:to-slate-600/20 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-slate-200/60 dark:border-slate-600/60 overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
              {/* Notebook Lines Background */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Horizontal lines */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={`line-${i}`}
                    className={`absolute w-full h-px ${
                      isDarkMode ? 'bg-slate-600/20' : 'bg-slate-300/30'
                    }`}
                    style={{
                      top: `${8 + i * 6}%`,
                      left: '8%',
                      right: '4%'
                    }}
                  />
                ))}
                
                {/* Red margin line */}
                <div className={`absolute left-8 top-0 bottom-0 w-px ${
                  isDarkMode ? 'bg-red-400/40' : 'bg-red-300/60'
                }`}></div>
                
                {/* Holes for binder */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`hole-${i}`}
                    className={`absolute w-1.5 h-1.5 rounded-full border ${
                      isDarkMode 
                        ? 'bg-slate-700/40 border-slate-600/60' 
                        : 'bg-slate-200/60 border-slate-300/70'
                    }`}
                    style={{
                      left: '4px',
                      top: `${12 + i * 12}%`
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 lg:p-8">
                {/* Enhanced School Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/40 transform hover:scale-110 transition-all duration-300 animate-pulse">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                        {t('contact.pageTitle')}
                      </h2>
                      <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mt-2"></div>
                    </div>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    {t('contact.pageSubtitle')}
                  </p>
                </div>

                {/* Contact Information and Form Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
                  {/* Contact Information */}
                  <div className="xl:col-span-1 space-y-6">
                    <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-8" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                      {t('contact.centersTitle')}
                    </h3>
                    
                    {/* Chalandri Center */}
                    <div className="group relative">
                      {/* School Card Background */}
                      <div className="relative bg-gradient-to-br from-white/90 via-blue-50/50 to-indigo-50/30 dark:from-slate-700/60 dark:via-slate-600/40 dark:to-slate-500/30 backdrop-blur-sm rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 border-slate-200/70 dark:border-slate-500/70 overflow-hidden transform hover:-translate-y-2">
                        {/* School Notebook Lines */}
                        <div className="absolute inset-0 pointer-events-none">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={`card-line-${i}`}
                              className={`absolute w-full h-px ${
                                isDarkMode ? 'bg-slate-600/15' : 'bg-slate-300/25'
                              }`}
                              style={{
                                top: `${25 + i * 15}%`,
                                left: '15%',
                                right: '5%'
                              }}
                            />
                          ))}
                          
                          {/* Red margin line */}
                          <div className={`absolute left-6 top-0 bottom-0 w-px ${
                            isDarkMode ? 'bg-red-400/25' : 'bg-red-300/40'
                          }`}></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Grade Badge */}
                          <div className="flex justify-center mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center shadow-md border-2 border-white/30">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                          </div>
                          
                          <h4 className="text-xl lg:text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100 text-center bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                            {t('contact.chalandri')}
                          </h4>
                
                          {/* Phone */}
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transform hover:scale-110 transition-all duration-300">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <div>
                              <a href="tel:+302106800708" className="text-slate-700 dark:text-slate-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                                +30 210 6800 708
                              </a>
                            </div>
                          </div>

                          {/* Address */}
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transform hover:scale-110 transition-all duration-300">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div>
                              <a href="https://maps.google.com/?q=Ρούμελης+27,+Χαλάνδρι" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                                {t('footer.addresses.chalandri')}
                              </a>
                            </div>
                          </div>

                          {/* Hours */}
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transform hover:scale-110 transition-all duration-300">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12,6 12,12 16,14"></polyline>
                              </svg>
                            </div>
                            <div>
                              <p className="text-slate-700 dark:text-slate-300 text-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                                <span className="font-medium">{t('contact.workingHours')}:</span><br />
                                {t('contact.mondayFriday')}
                              </p>
                            </div>
                          </div>

                          {/* Email for Chalandri */}
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transform hover:scale-110 transition-all duration-300">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <a href="mailto:info@alfaschoolchalandri.com" className="text-slate-700 dark:text-slate-300 text-sm hover:text-orange-600 dark:hover:text-orange-400 transition-colors" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                                info@alfaschoolchalandri.com
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Nea Filadelfeia Center */}
                    <div className="group relative">
                      {/* School Card Background */}
                      <div className="relative bg-gradient-to-br from-slate-50/80 to-green-50/60 dark:from-slate-700/40 dark:to-slate-600/40 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:scale-102 hover:shadow-lg border border-slate-200/60 dark:border-slate-600/60 overflow-hidden">
                        {/* School Notebook Lines */}
                        <div className="absolute inset-0 pointer-events-none">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={`card-line-${i}`}
                              className={`absolute w-full h-px ${
                                isDarkMode ? 'bg-slate-600/15' : 'bg-slate-300/25'
                              }`}
                              style={{
                                top: `${25 + i * 15}%`,
                                left: '15%',
                                right: '5%'
                              }}
                            />
                          ))}
                          
                          {/* Red margin line */}
                          <div className={`absolute left-6 top-0 bottom-0 w-px ${
                            isDarkMode ? 'bg-red-400/25' : 'bg-red-300/40'
                          }`}></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Grade Badge */}
                          <div className="flex justify-center mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center shadow-md border-2 border-white/30">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                              </svg>
                            </div>
                          </div>
                          
                          <h4 className="text-xl lg:text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100 text-center bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                            {t('contact.neaFiladelfeia')}
                          </h4>
                          
                          {/* Phone */}
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transform hover:scale-110 transition-all duration-300">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <div>
                              <a href="tel:+302102777725" className="text-slate-700 dark:text-slate-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                                +30 210 2777 725
                              </a>
                            </div>
                          </div>

                          {/* Address */}
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transform hover:scale-110 transition-all duration-300">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div>
                              <a href="https://maps.google.com/?q=Αγίου+Γεωργίου+15,+Νέα+Φιλαδέλφεια" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                                {t('footer.addresses.neaPhiladelphia')}
                              </a>
                            </div>
                          </div>

                          {/* Hours */}
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transform hover:scale-110 transition-all duration-300">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12,6 12,12 16,14"></polyline>
                              </svg>
                            </div>
                            <div>
                              <p className="text-slate-700 dark:text-slate-300 text-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                                <span className="font-medium">{t('contact.workingHours')}:</span><br />
                                {t('contact.mondayFriday')}
                              </p>
                            </div>
                          </div>

                          {/* Email for Nea Filadelfeia */}
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transform hover:scale-110 transition-all duration-300">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <a href="mailto:alfaschoolfiladelfeia@gmail.com" className="text-slate-700 dark:text-slate-300 text-sm hover:text-orange-600 dark:hover:text-orange-400 transition-colors" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                                alfaschoolfiladelfeia@gmail.com
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Social Media */}
                    <div className="group relative">
                      {/* School Card Background */}
                      <div className="relative bg-gradient-to-br from-slate-50/80 to-sky-50/60 dark:from-slate-700/40 dark:to-slate-600/40 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:scale-102 hover:shadow-lg border border-slate-200/60 dark:border-slate-600/60 overflow-hidden">
                        {/* School Notebook Lines */}
                        <div className="absolute inset-0 pointer-events-none">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={`card-line-${i}`}
                              className={`absolute w-full h-px ${
                                isDarkMode ? 'bg-slate-600/15' : 'bg-slate-300/25'
                              }`}
                              style={{
                                top: `${30 + i * 20}%`,
                                left: '15%',
                                right: '5%'
                              }}
                            />
                          ))}
                          
                          {/* Red margin line */}
                          <div className={`absolute left-6 top-0 bottom-0 w-px ${
                            isDarkMode ? 'bg-red-400/25' : 'bg-red-300/40'
                          }`}></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Grade Badge */}
                          <div className="flex justify-center mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-500 rounded-full flex items-center justify-center shadow-md border-2 border-white/30">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                              </svg>
                            </div>
                          </div>
                          
                          <h4 className="text-lg lg:text-xl font-bold mb-4 text-slate-800 dark:text-slate-100 text-center" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                            {t('contact.socialMedia')}
                          </h4>
                          
                          <div className="flex flex-col space-y-3">
                            <a href="https://www.facebook.com/profile.php?id=100057649952827" target="_blank" rel="nofollow noopener" className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-102" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                              </div>
                              <span className="text-sm font-medium">Facebook</span>
                            </a>
                            <a href="https://www.instagram.com/alfaschools/" target="_blank" rel="nofollow noopener" className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:scale-102" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                              </div>
                              <span className="text-sm font-medium">Instagram</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FAQ Link */}
                    <div className="group relative">
                      {/* School Card Background */}
                      <div className="relative bg-gradient-to-br from-slate-50/80 to-amber-50/60 dark:from-slate-700/40 dark:to-slate-600/40 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:scale-102 hover:shadow-lg border border-slate-200/60 dark:border-slate-600/60 overflow-hidden">
                        {/* School Notebook Lines */}
                        <div className="absolute inset-0 pointer-events-none">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={`card-line-${i}`}
                              className={`absolute w-full h-px ${
                                isDarkMode ? 'bg-slate-600/15' : 'bg-slate-300/25'
                              }`}
                              style={{
                                top: `${25 + i * 20}%`,
                                left: '15%',
                                right: '5%'
                              }}
                            />
                          ))}
                          
                          {/* Red margin line */}
                          <div className={`absolute left-6 top-0 bottom-0 w-px ${
                            isDarkMode ? 'bg-red-400/25' : 'bg-red-300/40'
                          }`}></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Grade Badge */}
                          <div className="flex justify-center mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-md border-2 border-white/30">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                          
                          <h4 className="text-lg lg:text-xl font-bold mb-3 text-slate-800 dark:text-slate-100 text-center" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                            {t('faq.title')}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 text-center" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                            {t('contact.helpDescription')}
                          </p>
                          <div className="text-center">
                            <a href="#" className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold hover:text-amber-700 dark:hover:text-amber-300 transition-all duration-300 hover:scale-105" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                              {t('faq.title')} 
                              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="xl:col-span-2 group relative">
                    {/* School Card Background */}
                    <div className="relative bg-gradient-to-br from-white/95 via-blue-50/40 to-indigo-50/30 dark:from-slate-800/95 dark:via-slate-700/40 dark:to-slate-600/30 backdrop-blur-sm rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl border-2 border-slate-200/70 dark:border-slate-600/70 overflow-hidden shadow-xl">
                      {/* School Notebook Lines */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={`form-line-${i}`}
                            className={`absolute w-full h-px ${
                              isDarkMode ? 'bg-slate-600/15' : 'bg-slate-300/25'
                            }`}
                            style={{
                              top: `${15 + i * 8}%`,
                              left: '15%',
                              right: '5%'
                            }}
                          />
                        ))}
                        
                        {/* Red margin line */}
                        <div className={`absolute left-6 top-0 bottom-0 w-px ${
                          isDarkMode ? 'bg-red-400/25' : 'bg-red-300/40'
                        }`}></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Grade Badge */}
                        <div className="flex justify-center mb-6">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-slate-800 dark:text-slate-100 text-center bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                          {t('contact.formTitle')}
                        </h3>
              
                        <form onSubmit={handleSubmit} className="space-y-6">
                          {/* Name and Email Row */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                                {t('contact.firstName')} *
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-5 py-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-400/50 focus:border-indigo-500 bg-white/95 dark:bg-slate-700/95 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-400 focus:scale-[1.02] text-slate-800 dark:text-slate-200 shadow-md hover:shadow-lg"
                                placeholder={getString('contact.firstName')}
                              />
                            </div>
                            <div>
                              <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                                {t('contact.lastName')} *
                              </label>
                              <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-5 py-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-400/50 focus:border-indigo-500 bg-white/95 dark:bg-slate-700/95 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-400 focus:scale-[1.02] text-slate-800 dark:text-slate-200 shadow-md hover:shadow-lg"
                                placeholder={getString('contact.lastName')}
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                              {t('contact.emailAddress')} *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-400 focus:scale-[1.01] text-slate-800 dark:text-slate-200"
                              placeholder={getString('contact.emailAddress')}
                            />
                          </div>

                          {/* Phone */}
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                              {t('contact.phone')}
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-400 focus:scale-[1.01] text-slate-800 dark:text-slate-200"
                              placeholder={getString('contact.phoneNumber')}
                            />
                          </div>

                          {/* Center Selection */}
                          <div>
                            <label htmlFor="center" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                              {t('contact.centerSelection')} *
                            </label>
                            <select
                              id="center"
                              name="center"
                              value={formData.center}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-400 focus:scale-[1.01] text-slate-800 dark:text-slate-200"
                            >
                              <option value="">{t('contact.selectCenter')}</option>
                              <option value="chalandri">{t('contact.chalandri')}</option>
                              <option value="nea-filadelfeia">{t('contact.neaFiladelfeia')}</option>
                            </select>
                          </div>

                          {/* Subject */}
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                              {t('contact.subject')} *
                            </label>
                            <select
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-400 focus:scale-[1.01] text-slate-800 dark:text-slate-200"
                            >
                              <option value="">{t('contact.selectSubject')}</option>
                              <option value="general">{t('contact.generalInquiry')}</option>
                              <option value="courses">{t('contact.courseInformation')}</option>
                              <option value="pricing">{t('contact.registration')}</option>
                              <option value="technical">{t('contact.support')}</option>
                              <option value="partnership">{t('contact.other')}</option>
                              <option value="other">{t('contact.other')}</option>
                            </select>
                          </div>

                          {/* Message */}
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                              {t('contact.message')} *
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              rows={5}
                              required
                              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-400 focus:scale-[1.01] resize-none text-slate-800 dark:text-slate-200"
                              placeholder={getString('contact.enterMessage')}
                            ></textarea>
                          </div>

                          {/* Status Messages */}
                          {submitStatus === 'success' && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                              <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-green-800 dark:text-green-200 font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                                  {t('contact.messageSent')}
                                </p>
                              </div>
                            </div>
                          )}

                          {submitStatus === 'error' && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                              <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <p className="text-red-800 dark:text-red-200 font-medium" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                                  {errorMessage}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Submit Button */}
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-5 px-8 rounded-2xl transition-all duration-500 font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-110 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                          >
                            <span className="flex items-center justify-center gap-2" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                              {isSubmitting ? (
                                <>
                                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                  </svg>
                                  {t('contact.sending')}
                                </>
                              ) : (
                                <>
                                  {t('contact.sendMessage')}
                                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                  </svg>
                                </>
                              )}
                            </span>
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Maps Section - School Style */}
          <div className="py-16 lg:py-24">
            {/* Enhanced School Notebook Paper Background */}
            <div className="relative bg-gradient-to-br from-white/98 via-emerald-50/30 to-teal-50/20 dark:from-slate-800/98 dark:via-slate-700/30 dark:to-slate-600/20 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-slate-200/60 dark:border-slate-600/60 overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
              {/* Notebook Lines Background */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Horizontal lines */}
                {[...Array(10)].map((_, i) => (
                  <div
                    key={`line-${i}`}
                    className={`absolute w-full h-px ${
                      isDarkMode ? 'bg-slate-600/20' : 'bg-slate-300/30'
                    }`}
                    style={{
                      top: `${10 + i * 7}%`,
                      left: '8%',
                      right: '4%'
                    }}
                  />
                ))}
                
                {/* Red margin line */}
                <div className={`absolute left-8 top-0 bottom-0 w-px ${
                  isDarkMode ? 'bg-red-400/40' : 'bg-red-300/60'
                }`}></div>
                
                {/* Holes for binder */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`hole-${i}`}
                    className={`absolute w-1.5 h-1.5 rounded-full border ${
                      isDarkMode 
                        ? 'bg-slate-700/40 border-slate-600/60' 
                        : 'bg-slate-200/60 border-slate-300/70'
                    }`}
                    style={{
                      left: '4px',
                      top: `${15 + i * 15}%`
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 lg:p-8">
                {/* Enhanced School Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/40 transform hover:scale-110 transition-all duration-300 animate-pulse">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-emerald-600 to-teal-600 dark:from-slate-100 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                        {t('contact.mapTitle')}
                      </h2>
                      <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mt-2"></div>
                    </div>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                    {t('contact.mapSubtitle')}
                  </p>
                </div>
            
                {/* Maps Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Chalandri Map */}
                  <div className="group relative">
                    {/* School Card Background */}
                    <div className="relative bg-gradient-to-br from-white/90 via-emerald-50/50 to-teal-50/30 dark:from-slate-700/60 dark:via-slate-600/40 dark:to-slate-500/30 backdrop-blur-sm rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 border-slate-200/70 dark:border-slate-500/70 overflow-hidden transform hover:-translate-y-2">
                      {/* School Notebook Lines */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={`map-line-${i}`}
                            className={`absolute w-full h-px ${
                              isDarkMode ? 'bg-slate-600/15' : 'bg-slate-300/25'
                            }`}
                            style={{
                              top: `${20 + i * 15}%`,
                              left: '15%',
                              right: '5%'
                            }}
                          />
                        ))}
                        
                        {/* Red margin line */}
                        <div className={`absolute left-6 top-0 bottom-0 w-px ${
                          isDarkMode ? 'bg-red-400/25' : 'bg-red-300/40'
                        }`}></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Grade Badge */}
                        <div className="flex justify-center mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center shadow-md border-2 border-white/30">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                        </div>
                        
                        <h3 className="text-xl lg:text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100 text-center bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                          {t('contact.chalandri')}
                        </h3>
                        
                        <div className="aspect-video rounded-lg overflow-hidden mb-4">
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
                        
                        <div className="text-center space-y-2 mb-4">
                          <p className="text-slate-600 dark:text-slate-400 text-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                            <strong>{t('contact.address')}:</strong> {t('footer.addresses.chalandri')}
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 text-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                            <strong>{t('contact.phone')}:</strong> {t('phoneNumbers.chalandri.number')}
                          </p>
                        </div>
                        
                        {/* Map Buttons */}
                        <div className="flex justify-center gap-3">
                          <a 
                            href="https://maps.google.com/?q=Ρούμελης+27,+Χαλάνδρι" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-white/95 to-blue-50/50 dark:from-slate-700/95 dark:to-slate-600/50 backdrop-blur-sm border-2 border-slate-300 dark:border-slate-600 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-slate-600 dark:hover:to-slate-500 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                          >
                            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                              <path fillRule="evenodd" clipRule="evenodd" d="M24 12.8116L23.9999 12.8541C23.9998 12.872 23.9996 12.8899 23.9994 12.9078C23.9998 12.9287 24 12.9498 24 12.971C24 16.3073 21.4007 19.2604 19.6614 21.2367C19.1567 21.8101 18.7244 22.3013 18.449 22.6957C17.4694 24.0986 16.9524 25.6184 16.8163 26.2029C16.8163 26.6431 16.4509 27 16 27C15.5491 27 15.1837 26.6431 15.1837 26.2029C15.0476 25.6184 14.5306 24.0986 13.551 22.6957C13.2756 22.3013 12.8433 21.8101 12.3386 21.2367C10.5993 19.2604 8 16.3073 8 12.971C8 12.9498 8.0002 12.9287 8.0006 12.9078C8.0002 12.8758 8 12.8437 8 12.8116C8 8.49736 11.5817 5 16 5C20.4183 5 24 8.49736 24 12.8116ZM16 15.6812C17.7132 15.6812 19.102 14.325 19.102 12.6522C19.102 10.9793 17.7132 9.62319 16 9.62319C14.2868 9.62319 12.898 10.9793 12.898 12.6522C12.898 14.325 14.2868 15.6812 16 15.6812Z" fill="#34A851"/>
                              <path d="M23.1054 9.21856C22.1258 7.37546 20.4161 5.96177 18.3504 5.34277L13.7559 10.5615C14.3208 9.98352 15.1174 9.62346 16.0002 9.62346C17.7134 9.62346 19.1022 10.9796 19.1022 12.6524C19.1022 13.3349 18.8711 13.9646 18.4811 14.4711L23.1054 9.21856Z" fill="#4285F5"/>
                              <path d="M12.4311 21.3425C12.4004 21.3076 12.3695 21.2725 12.3383 21.2371C11.1918 19.9344 9.67162 18.2073 8.76855 16.2257L13.5439 10.8018C13.1387 11.3136 12.8976 11.9556 12.8976 12.6526C12.8976 14.3254 14.2865 15.6816 15.9997 15.6816C16.8675 15.6816 17.6521 15.3336 18.2151 14.7727L12.4311 21.3425Z" fill="#F9BB0E"/>
                              <path d="M9.89288 7.76562C8.71207 9.12685 8 10.8881 8 12.8117C8 12.8438 8.0002 12.8759 8.0006 12.9079C8.0002 12.9288 8 12.9499 8 12.9711C8 14.1082 8.30196 15.2009 8.76889 16.2254L13.5362 10.8106L9.89288 7.76562Z" fill="#E74335"/>
                              <path d="M18.3499 5.34254C17.6068 5.11988 16.8176 5 15.9997 5C13.5514 5 11.36 6.07387 9.89258 7.76553L13.5359 10.8105L13.5438 10.8015C13.6101 10.7178 13.6807 10.6375 13.7554 10.5611L18.3499 5.34254Z" fill="#1A73E6"/>
                            </svg>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{t('contact.getDirections')}</span>
                          </a>
                          
                          <a 
                            href="https://maps.apple.com/?q=Ρούμελης+27,+Χαλάνδρι" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-white/95 to-blue-50/50 dark:from-slate-700/95 dark:to-slate-600/50 backdrop-blur-sm border-2 border-slate-300 dark:border-slate-600 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-slate-600 dark:hover:to-slate-500 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                          >
                            <img src="/apple-maps.png" alt="Apple Maps" className="w-4 h-4" />
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{t('contact.getDirections')}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nea Filadelfeia Map */}
                  <div className="group relative">
                    {/* School Card Background */}
                    <div className="relative bg-gradient-to-br from-slate-50/80 to-green-50/60 dark:from-slate-700/40 dark:to-slate-600/40 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:scale-102 hover:shadow-lg border border-slate-200/60 dark:border-slate-600/60 overflow-hidden">
                      {/* School Notebook Lines */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={`map-line-${i}`}
                            className={`absolute w-full h-px ${
                              isDarkMode ? 'bg-slate-600/15' : 'bg-slate-300/25'
                            }`}
                            style={{
                              top: `${20 + i * 15}%`,
                              left: '15%',
                              right: '5%'
                            }}
                          />
                        ))}
                        
                        {/* Red margin line */}
                        <div className={`absolute left-6 top-0 bottom-0 w-px ${
                          isDarkMode ? 'bg-red-400/25' : 'bg-red-300/40'
                        }`}></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Grade Badge */}
                        <div className="flex justify-center mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center shadow-md border-2 border-white/30">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            </svg>
                          </div>
                        </div>
                        
                        <h3 className="text-xl lg:text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100 text-center bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                          {t('contact.neaFiladelfeia')}
                        </h3>
                        
                        <div className="aspect-video rounded-lg overflow-hidden mb-4">
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
                        
                        <div className="text-center space-y-2 mb-4">
                          <p className="text-slate-600 dark:text-slate-400 text-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                            <strong>{t('contact.address')}:</strong> {t('footer.addresses.neaPhiladelphia')}
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 text-sm" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                            <strong>{t('contact.phone')}:</strong> {t('phoneNumbers.neaPhiladelphia.number')}
                          </p>
                        </div>
                        
                        {/* Map Buttons */}
                        <div className="flex justify-center gap-3">
                          <a 
                            href="https://maps.google.com/?q=Αγίου+Γεωργίου+15,+Νέα+Φιλαδέλφεια" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-white/95 to-emerald-50/50 dark:from-slate-700/95 dark:to-slate-600/50 backdrop-blur-sm border-2 border-slate-300 dark:border-slate-600 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-slate-600 dark:hover:to-slate-500 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                          >
                            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                              <path fillRule="evenodd" clipRule="evenodd" d="M24 12.8116L23.9999 12.8541C23.9998 12.872 23.9996 12.8899 23.9994 12.9078C23.9998 12.9287 24 12.9498 24 12.971C24 16.3073 21.4007 19.2604 19.6614 21.2367C19.1567 21.8101 18.7244 22.3013 18.449 22.6957C17.4694 24.0986 16.9524 25.6184 16.8163 26.2029C16.8163 26.6431 16.4509 27 16 27C15.5491 27 15.1837 26.6431 15.1837 26.2029C15.0476 25.6184 14.5306 24.0986 13.551 22.6957C13.2756 22.3013 12.8433 21.8101 12.3386 21.2367C10.5993 19.2604 8 16.3073 8 12.971C8 12.9498 8.0002 12.9287 8.0006 12.9078C8.0002 12.8758 8 12.8437 8 12.8116C8 8.49736 11.5817 5 16 5C20.4183 5 24 8.49736 24 12.8116ZM16 15.6812C17.7132 15.6812 19.102 14.325 19.102 12.6522C19.102 10.9793 17.7132 9.62319 16 9.62319C14.2868 9.62319 12.898 10.9793 12.898 12.6522C12.898 14.325 14.2868 15.6812 16 15.6812Z" fill="#34A851"/>
                              <path d="M23.1054 9.21856C22.1258 7.37546 20.4161 5.96177 18.3504 5.34277L13.7559 10.5615C14.3208 9.98352 15.1174 9.62346 16.0002 9.62346C17.7134 9.62346 19.1022 10.9796 19.1022 12.6524C19.1022 13.3349 18.8711 13.9646 18.4811 14.4711L23.1054 9.21856Z" fill="#4285F5"/>
                              <path d="M12.4311 21.3425C12.4004 21.3076 12.3695 21.2725 12.3383 21.2371C11.1918 19.9344 9.67162 18.2073 8.76855 16.2257L13.5439 10.8018C13.1387 11.3136 12.8976 11.9556 12.8976 12.6526C12.8976 14.3254 14.2865 15.6816 15.9997 15.6816C16.8675 15.6816 17.6521 15.3336 18.2151 14.7727L12.4311 21.3425Z" fill="#F9BB0E"/>
                              <path d="M9.89288 7.76562C8.71207 9.12685 8 10.8881 8 12.8117C8 12.8438 8.0002 12.8759 8.0006 12.9079C8.0002 12.9288 8 12.9499 8 12.9711C8 14.1082 8.30196 15.2009 8.76889 16.2254L13.5362 10.8106L9.89288 7.76562Z" fill="#E74335"/>
                              <path d="M18.3499 5.34254C17.6068 5.11988 16.8176 5 15.9997 5C13.5514 5 11.36 6.07387 9.89258 7.76553L13.5359 10.8105L13.5438 10.8015C13.6101 10.7178 13.6807 10.6375 13.7554 10.5611L18.3499 5.34254Z" fill="#1A73E6"/>
                            </svg>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{t('contact.getDirections')}</span>
                          </a>
                          
                          <a 
                            href="https://maps.apple.com/?q=Αγίου+Γεωργίου+15,+Νέα+Φιλαδέλφεια" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-white/95 to-emerald-50/50 dark:from-slate-700/95 dark:to-slate-600/50 backdrop-blur-sm border-2 border-slate-300 dark:border-slate-600 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-slate-600 dark:hover:to-slate-500 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                          >
                            <img src="/apple-maps.png" alt="Apple Maps" className="w-4 h-4" />
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>{t('contact.getDirections')}</span>
                          </a>
                        </div>
                      </div>
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