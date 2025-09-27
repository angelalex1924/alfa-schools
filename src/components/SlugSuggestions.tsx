"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Check, RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

interface SlugSuggestion {
  slug: string
  original: string
  valid: boolean
  length: number
}

interface SlugSuggestionsProps {
  title: string
  onSlugSelect: (slug: string) => void
  currentSlug?: string
  className?: string
}

export default function SlugSuggestions({ 
  title, 
  onSlugSelect, 
  currentSlug = "",
  className = "" 
}: SlugSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<SlugSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguage()

  // Generate suggestions when title or language changes
  useEffect(() => {
    if (title && title.trim().length > 0) {
      generateSuggestions()
    } else {
      setSuggestions([])
    }
  }, [title, language])

  const generateSuggestions = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/slug-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: title.trim(),
          maxSuggestions: 3,
          language: language
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate suggestions')
      }
      
      const data = await response.json()
      setSuggestions(data.suggestions || [])
      
    } catch (err) {
      console.error('Error generating slug suggestions:', err)
      setError('Αδυναμία δημιουργίας προτάσεων slug')
    } finally {
      setLoading(false)
    }
  }

  const handleSlugSelect = (slug: string) => {
    onSlugSelect(slug)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 2000)
  }

  const copyToClipboard = async (slug: string) => {
    try {
      await navigator.clipboard.writeText(slug)
      setCopiedSlug(slug)
      setTimeout(() => setCopiedSlug(null), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  if (!title || title.trim().length === 0) {
    return null
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Προτεινόμενα Slugs
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={generateSuggestions}
          disabled={loading}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <AlertCircle className="h-4 w-4 text-red-500" />
          <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
        </motion.div>
      )}

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                  suggestion.valid
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                } ${
                  currentSlug === suggestion.slug
                    ? 'ring-2 ring-blue-500 ring-opacity-50'
                    : 'hover:shadow-md'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {suggestion.slug}
                    </code>
                    {suggestion.valid ? (
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        ✓ Έγκυρο
                      </span>
                    ) : (
                      <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                        ✗ Μη έγκυρο
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Μήκος: {suggestion.length} χαρακτήρες
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(suggestion.slug)}
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedSlug === suggestion.slug ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  
                  {suggestion.valid && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSlugSelect(suggestion.slug)}
                      className="h-8 px-3 text-xs"
                    >
                      Επιλογή
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-4"
        >
          <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Δημιουργία προτάσεων...
          </span>
        </motion.div>
      )}
    </div>
  )
}
