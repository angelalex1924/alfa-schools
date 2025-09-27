"use client"

import { useState, useCallback } from "react"

interface SlugSuggestion {
  slug: string
  original: string
  valid: boolean
  length: number
}

interface UseSlugSuggestionsReturn {
  suggestions: SlugSuggestion[]
  loading: boolean
  error: string | null
  generateSuggestions: (title: string) => Promise<void>
  clearSuggestions: () => void
}

export function useSlugSuggestions(): UseSlugSuggestionsReturn {
  const [suggestions, setSuggestions] = useState<SlugSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateSuggestions = useCallback(async (title: string) => {
    if (!title || title.trim().length === 0) {
      setSuggestions([])
      return
    }

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
          maxSuggestions: 3
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
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, [])

  const clearSuggestions = useCallback(() => {
    setSuggestions([])
    setError(null)
  }, [])

  return {
    suggestions,
    loading,
    error,
    generateSuggestions,
    clearSuggestions
  }
}
