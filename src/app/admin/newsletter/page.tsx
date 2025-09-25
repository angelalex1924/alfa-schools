"use client"

import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, where, doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Mail, Users, Globe, Calendar, Search, Send, Download, Trash2, AlertTriangle, FileText, Send as SendIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { emailTemplates } from '@/lib/email-templates'
import TemplateEditor from '@/components/TemplateEditor'

interface NewsletterSubscriber {
  id: string
  email: string
  language: string
  subscribedAt: any
  isActive: boolean
}

export default function NewsletterDashboard() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([])
  const [filteredSubscribers, setFilteredSubscribers] = useState<NewsletterSubscriber[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    languages: {} as Record<string, number>
  })
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([])
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [templateContent, setTemplateContent] = useState({
    title: '',
    message: '',
    additionalInfo: '',
    actionText: '',
    actionUrl: '',
    language: 'el'
  })
  const [isSendingTemplate, setIsSendingTemplate] = useState(false)
  const [testEmail, setTestEmail] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [previewHtml, setPreviewHtml] = useState('')
  const [showTemplateEditor, setShowTemplateEditor] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<{id: string, name: string} | null>(null)

  useEffect(() => {
    fetchSubscribers()
  }, [])

  useEffect(() => {
    filterSubscribers()
  }, [subscribers, searchTerm])

  const fetchSubscribers = async () => {
    try {
      setIsLoading(true)
      const subscribersRef = collection(db, 'newsletter_subscribers')
      const q = query(subscribersRef, orderBy('subscribedAt', 'desc'))
      const snapshot = await getDocs(q)
      
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsletterSubscriber[]

      setSubscribers(data)
      
      // Calculate stats
      const total = data.length
      const active = data.filter(sub => sub.isActive).length
      const languages = data.reduce((acc, sub) => {
        acc[sub.language] = (acc[sub.language] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      setStats({ total, active, languages })
    } catch (error) {
      console.error('Error fetching subscribers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterSubscribers = () => {
    if (!searchTerm) {
      setFilteredSubscribers(subscribers)
      return
    }

    const filtered = subscribers.filter(sub =>
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.language.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredSubscribers(filtered)
  }

  const exportSubscribers = () => {
    const csvContent = [
      ['Email', 'Language', 'Subscribed At', 'Active'],
      ...filteredSubscribers.map(sub => [
        sub.email,
        sub.language,
        sub.subscribedAt?.toDate?.()?.toLocaleDateString() || 'N/A',
        sub.isActive ? 'Yes' : 'No'
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const sendNewsletter = async () => {
    // This would trigger the newsletter sending
    // For now, just show an alert
    alert('Newsletter sending feature will be implemented in the article creation process')
  }

  const sendTemplateEmail = async (isTest = false) => {
    if (!selectedTemplate || !templateContent.title || !templateContent.message) {
      alert('Παρακαλώ συμπληρώστε όλα τα απαραίτητα πεδία!')
      return
    }

    try {
      setIsSendingTemplate(true)
      
      const response = await fetch('/api/send-template-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          ...templateContent,
          testEmail: isTest ? testEmail : null
        })
      })

      const result = await response.json()

      if (response.ok) {
        alert(isTest 
          ? `Test email sent successfully to ${testEmail}!`
          : `Template emails sent successfully to ${result.recipients} subscribers!`
        )
        
        if (!isTest) {
          setShowTemplateModal(false)
          setTemplateContent({
            title: '',
            message: '',
            additionalInfo: '',
            actionText: '',
            actionUrl: '',
            language: 'el'
          })
          setSelectedTemplate('')
        }
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      console.error('Error sending template email:', error)
      alert('Error sending template email. Please try again.')
    } finally {
      setIsSendingTemplate(false)
    }
  }

  const openTemplateModal = () => {
    setShowTemplateModal(true)
    setSelectedTemplate('')
    setTemplateContent({
      title: '',
      message: '',
      additionalInfo: '',
      actionText: '',
      actionUrl: '',
      language: 'el'
    })
  }

  const generatePreview = async () => {
    if (!selectedTemplate || !templateContent.title || !templateContent.message) {
      alert('Παρακαλώ συμπληρώστε όλα τα απαραίτητα πεδία για preview!')
      return
    }

    try {
      const response = await fetch('/api/send-template-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          ...templateContent,
          preview: true // Special flag for preview
        })
      })

      const result = await response.json()

      if (response.ok) {
        setPreviewHtml(result.html)
        setShowPreview(true)
      } else {
        alert(`Error generating preview: ${result.error}`)
      }
    } catch (error) {
      console.error('Error generating preview:', error)
      alert('Error generating preview. Please try again.')
    }
  }

  const openTemplateEditor = (templateId: string, templateName: string) => {
    setEditingTemplate({ id: templateId, name: templateName })
    setShowTemplateEditor(true)
  }

  const saveTemplateCustomization = (customization: any) => {
    // Here you would save the customization to your database
    // For now, just show a success message
    alert(`Template "${customization.name}" customization saved successfully!`)
    setShowTemplateEditor(false)
    setEditingTemplate(null)
  }

  const previewTemplateCustomization = (customization: any) => {
    // This would generate a preview with the custom styling
    console.log('Previewing template with customization:', customization)
  }

  const deleteSubscriber = async (id: string) => {
    try {
      setDeletingId(id)
      await deleteDoc(doc(db, 'newsletter_subscribers', id))
      
      // Update local state
      setSubscribers(prev => prev.filter(sub => sub.id !== id))
      setFilteredSubscribers(prev => prev.filter(sub => sub.id !== id))
      
      // Recalculate stats
      const updatedSubscribers = subscribers.filter(sub => sub.id !== id)
      const total = updatedSubscribers.length
      const active = updatedSubscribers.filter(sub => sub.isActive).length
      const languages = updatedSubscribers.reduce((acc, sub) => {
        acc[sub.language] = (acc[sub.language] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      setStats({ total, active, languages })
      
      alert('Subscriber deleted successfully!')
    } catch (error) {
      console.error('Error deleting subscriber:', error)
      alert('Error deleting subscriber. Please try again.')
    } finally {
      setDeletingId(null)
      setShowDeleteConfirm(null)
    }
  }

  const toggleSubscriberSelection = (id: string) => {
    setSelectedSubscribers(prev => 
      prev.includes(id) 
        ? prev.filter(subId => subId !== id)
        : [...prev, id]
    )
  }

  const selectAllSubscribers = () => {
    setSelectedSubscribers(filteredSubscribers.map(sub => sub.id))
  }

  const clearSelection = () => {
    setSelectedSubscribers([])
  }

  const bulkDeleteSubscribers = async () => {
    try {
      setDeletingId('bulk')
      
      // Delete all selected subscribers
      await Promise.all(
        selectedSubscribers.map(id => deleteDoc(doc(db, 'newsletter_subscribers', id)))
      )
      
      // Update local state
      setSubscribers(prev => prev.filter(sub => !selectedSubscribers.includes(sub.id)))
      setFilteredSubscribers(prev => prev.filter(sub => !selectedSubscribers.includes(sub.id)))
      
      // Recalculate stats
      const updatedSubscribers = subscribers.filter(sub => !selectedSubscribers.includes(sub.id))
      const total = updatedSubscribers.length
      const active = updatedSubscribers.filter(sub => sub.isActive).length
      const languages = updatedSubscribers.reduce((acc, sub) => {
        acc[sub.language] = (acc[sub.language] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      setStats({ total, active, languages })
      
      alert(`${selectedSubscribers.length} subscribers deleted successfully!`)
      setSelectedSubscribers([])
    } catch (error) {
      console.error('Error deleting subscribers:', error)
      alert('Error deleting subscribers. Please try again.')
    } finally {
      setDeletingId(null)
      setShowBulkDeleteConfirm(false)
    }
  }

  const getLanguageFlag = (language: string) => {
    const flags: Record<string, string> = {
      'el': '🇬🇷',
      'en': '🇬🇧',
      'fr': '🇫🇷',
      'de': '🇩🇪',
      'es': '🇪🇸',
      'it': '🇮🇹'
    }
    return flags[language] || '🌍'
  }

  const getLanguageName = (language: string) => {
    const names: Record<string, string> = {
      'el': 'Greek',
      'en': 'English',
      'fr': 'French',
      'de': 'German',
      'es': 'Spanish',
      'it': 'Italian'
    }
    return names[language] || language
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
            Newsletter Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your newsletter subscribers and send updates
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Subscribers</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Subscribers</p>
                  <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <Mail className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Languages</p>
                  <p className="text-2xl font-bold text-purple-600">{Object.keys(stats.languages).length}</p>
                </div>
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Engagement</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}%
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search subscribers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg"
              />
            </div>
          </div>
          <Button
            onClick={sendNewsletter}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Newsletter
          </Button>
          <Button
            onClick={openTemplateModal}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
          >
            <FileText className="h-4 w-4 mr-2" />
            Send Template Email
          </Button>
          <Button
            onClick={() => window.location.href = '/admin/template-editor'}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg"
          >
            <FileText className="h-4 w-4 mr-2" />
            Edit Templates
          </Button>
          <Button
            onClick={exportSubscribers}
            variant="outline"
            className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </motion.div>

        {/* Bulk Actions */}
        {selectedSubscribers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  {selectedSubscribers.length} subscriber(s) selected
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearSelection}
                  className="text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                >
                  Clear Selection
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                {showBulkDeleteConfirm ? (
                  <>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={bulkDeleteSubscribers}
                      disabled={deletingId === 'bulk'}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {deletingId === 'bulk' ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Confirm Delete All
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowBulkDeleteConfirm(false)}
                      disabled={deletingId === 'bulk'}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowBulkDeleteConfirm(true)}
                    className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete Selected
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Language Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                Language Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {Object.entries(stats.languages).map(([language, count]) => (
                  <Badge
                    key={language}
                    variant="secondary"
                    className="px-4 py-2 text-sm font-medium"
                  >
                    {getLanguageFlag(language)} {getLanguageName(language)}: {count}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subscribers List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  Subscribers ({filteredSubscribers.length})
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={selectAllSubscribers}
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    Select All
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={clearSelection}
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSubscribers.map((subscriber, index) => (
                  <motion.div
                    key={subscriber.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedSubscribers.includes(subscriber.id)}
                        onChange={() => toggleSubscriberSelection(subscriber.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {subscriber.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">{subscriber.email}</p>
                        <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                          <span>{getLanguageFlag(subscriber.language)} {getLanguageName(subscriber.language)}</span>
                          <span>•</span>
                          <span>
                            {subscriber.subscribedAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={subscriber.isActive ? "default" : "secondary"}
                        className={subscriber.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                      >
                        {subscriber.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      
                      {showDeleteConfirm === subscriber.id ? (
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteSubscriber(subscriber.id)}
                            disabled={deletingId === subscriber.id}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {deletingId === subscriber.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                              <>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Confirm Delete
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowDeleteConfirm(null)}
                            disabled={deletingId === subscriber.id}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowDeleteConfirm(subscriber.id)}
                          className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Template Email Modal */}
        {showTemplateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  Στείλτε Template Email
                </h3>
                <Button
                  variant="outline"
                  onClick={() => setShowTemplateModal(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Επιλέξτε Template
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="">Επιλέξτε template...</option>
                    {emailTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name} - {template.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Τίτλος *
                  </label>
                  <Input
                    value={templateContent.title}
                    onChange={(e) => setTemplateContent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Εισάγετε τον τίτλο..."
                    className="w-full"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Μήνυμα *
                  </label>
                  <textarea
                    value={templateContent.message}
                    onChange={(e) => setTemplateContent(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Εισάγετε το μήνυμα..."
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white h-32 resize-none"
                  />
                </div>

                {/* Additional Info */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Επιπλέον Πληροφορίες
                  </label>
                  <textarea
                    value={templateContent.additionalInfo}
                    onChange={(e) => setTemplateContent(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    placeholder="Επιπλέον πληροφορίες (προαιρετικά)..."
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white h-24 resize-none"
                  />
                </div>

                {/* Action Button */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Κείμενο Κουμπιού
                    </label>
                    <Input
                      value={templateContent.actionText}
                      onChange={(e) => setTemplateContent(prev => ({ ...prev, actionText: e.target.value }))}
                      placeholder="π.χ. Μάθετε Περισσότερα"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      URL Κουμπιού
                    </label>
                    <Input
                      value={templateContent.actionUrl}
                      onChange={(e) => setTemplateContent(prev => ({ ...prev, actionUrl: e.target.value }))}
                      placeholder="https://..."
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Γλώσσα
                  </label>
                  <select
                    value={templateContent.language}
                    onChange={(e) => setTemplateContent(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="el">Ελληνικά</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="es">Español</option>
                    <option value="it">Italiano</option>
                  </select>
                </div>

                {/* Test Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Test Email (προαιρετικά)
                  </label>
                  <Input
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="test@example.com"
                    className="w-full"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={generatePreview}
                    disabled={!selectedTemplate || !templateContent.title || !templateContent.message}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    onClick={() => sendTemplateEmail(true)}
                    disabled={isSendingTemplate || !testEmail}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    <SendIcon className="h-4 w-4 mr-2" />
                    {isSendingTemplate ? 'Στέλνεται...' : 'Test Email'}
                  </Button>
                  <Button
                    onClick={() => sendTemplateEmail(false)}
                    disabled={isSendingTemplate}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <SendIcon className="h-4 w-4 mr-2" />
                    {isSendingTemplate ? 'Στέλνεται...' : 'Στείλε σε Όλους'}
                  </Button>
                  <Button
                    onClick={() => setShowTemplateModal(false)}
                    variant="outline"
                    disabled={isSendingTemplate}
                  >
                    Ακύρωση
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Preview Modal */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  Email Preview
                </h3>
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ✕
                </Button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div 
                  className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              </div>
              
              <div className="p-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-end gap-3">
                  <Button
                    onClick={() => setShowPreview(false)}
                    variant="outline"
                  >
                    Κλείσε Preview
                  </Button>
                  <Button
                    onClick={() => {
                      setShowPreview(false)
                      setShowTemplateModal(true)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Επεξεργασία
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Template Editor */}
        {showTemplateEditor && editingTemplate && (
          <TemplateEditor
            templateId={editingTemplate.id}
            templateName={editingTemplate.name}
            onSave={saveTemplateCustomization}
            onPreview={previewTemplateCustomization}
            onClose={() => {
              setShowTemplateEditor(false)
              setEditingTemplate(null)
            }}
          />
        )}
      </div>
    </div>
  )
}
