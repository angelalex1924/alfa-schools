"use client"

import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Mail, Users, Globe, Calendar, Search, Send, Download } from 'lucide-react'
import { motion } from 'framer-motion'

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
            onClick={exportSubscribers}
            variant="outline"
            className="bg-white/80 dark:bg-slate-800/80 border-0 shadow-lg"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </motion.div>

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
              <CardTitle className="text-slate-800 dark:text-white" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                Subscribers ({filteredSubscribers.length})
              </CardTitle>
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
