/**
 * Greek to Latin slug conversion utilities
 * Converts Greek text to SEO-friendly Latin slugs
 */

// Greek to Latin character mapping
const GREEK_TO_LATIN_MAP: Record<string, string> = {
  // Uppercase letters
  'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'I', 'Θ': 'TH',
  'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': 'X', 'Ο': 'O', 'Π': 'P',
  'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'CH', 'Ψ': 'PS', 'Ω': 'O',
  
  // Lowercase letters
  'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'i', 'θ': 'th',
  'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ο': 'o', 'π': 'p',
  'ρ': 'r', 'σ': 's', 'ς': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'ch', 'ψ': 'ps', 'ω': 'o',
  
  // Special characters and diacritics
  'ά': 'a', 'έ': 'e', 'ή': 'i', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ώ': 'o',
  'Ά': 'A', 'Έ': 'E', 'Ή': 'I', 'Ί': 'I', 'Ό': 'O', 'Ύ': 'Y', 'Ώ': 'O',
  
  // Common Greek words to English equivalents
  'και': 'kai', 'για': 'gia', 'με': 'me', 'από': 'apo', 'στο': 'sto', 'στη': 'sti',
  'στον': 'ston', 'στην': 'stin', 'της': 'tis', 'του': 'tou', 'των': 'ton',
  'ότι': 'oti', 'πως': 'pos', 'που': 'pou', 'όταν': 'otan', 'αν': 'an',
  'γιατί': 'giati', 'επειδή': 'epeidi', 'ενώ': 'eno', 'πριν': 'prin', 'μετά': 'meta',
  'πάνω': 'pano', 'κάτω': 'kato', 'μέσα': 'mesa', 'έξω': 'exo', 'εδώ': 'edo', 'εκεί': 'ekei'
}

/**
 * Convert Greek text to Latin slug
 */
export function greekToLatinSlug(text: string): string {
  if (!text) return ''
  
  let slug = text.trim()
  
  // Convert Greek characters to Latin
  for (const [greek, latin] of Object.entries(GREEK_TO_LATIN_MAP)) {
    slug = slug.replace(new RegExp(greek, 'g'), latin)
  }
  
  // Convert to lowercase
  slug = slug.toLowerCase()
  
  // Replace spaces and special characters with hyphens
  slug = slug.replace(/[\s\W]+/g, '-')
  
  // Remove multiple consecutive hyphens
  slug = slug.replace(/-+/g, '-')
  
  // Remove leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '')
  
  return slug
}

/**
 * Generate multiple slug suggestions from a title
 */
export function generateSlugSuggestions(title: string, maxSuggestions: number = 3, language: string = 'el'): string[] {
  if (!title) return []
  
  const suggestions: string[] = []
  
  // Basic slug - use different conversion based on language
  let basicSlug: string
  if (language === 'el') {
    basicSlug = greekToLatinSlug(title)
  } else {
    // For other languages, use standard slugify
    basicSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  
  if (basicSlug) {
    suggestions.push(basicSlug)
  }
  
  // Shorter version (remove common words)
  let shortTitle: string
  if (language === 'el') {
    shortTitle = title
      .replace(/\b(και|για|με|από|στο|στη|στον|στην|της|του|των|ή|ότι|πως|που|όταν|αν|γιατί|επειδή|ενώ|πριν|μετά|πάνω|κάτω|μέσα|έξω|εδώ|εκεί)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim()
  } else {
    // For other languages, remove common English words
    shortTitle = title
      .replace(/\b(the|a|an|and|or|but|in|on|at|to|for|of|with|by|from|up|about|into|through|during|before|after|above|below|between|among|under|over|around|near|far|here|there|where|when|why|how|what|who|which|that|this|these|those|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|could|should|may|might|must|can|shall)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim()
  }
  
  if (shortTitle && shortTitle !== title) {
    let shortSlug: string
    if (language === 'el') {
      shortSlug = greekToLatinSlug(shortTitle)
    } else {
      shortSlug = shortTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
    }
    
    if (shortSlug && shortSlug !== basicSlug) {
      suggestions.push(shortSlug)
    }
  }
  
  // Even shorter version (first 5-6 words)
  const words = title.split(/\s+/)
  if (words.length > 5) {
    const shortWords = words.slice(0, 5).join(' ')
    let veryShortSlug: string
    if (language === 'el') {
      veryShortSlug = greekToLatinSlug(shortWords)
    } else {
      veryShortSlug = shortWords
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
    }
    
    if (veryShortSlug && !suggestions.includes(veryShortSlug)) {
      suggestions.push(veryShortSlug)
    }
  }
  
  // Add timestamp-based suggestions if needed
  if (suggestions.length < maxSuggestions) {
    const timestamp = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    let withDate: string
    if (language === 'el') {
      withDate = greekToLatinSlug(`${title} ${timestamp}`)
    } else {
      withDate = `${title} ${timestamp}`
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
    }
    
    if (withDate && !suggestions.includes(withDate)) {
      suggestions.push(withDate)
    }
  }
  
  // Add numbered suggestions if still needed
  let counter = 1
  while (suggestions.length < maxSuggestions && counter <= 5) {
    let numberedSlug: string
    if (language === 'el') {
      numberedSlug = greekToLatinSlug(`${title} ${counter}`)
    } else {
      numberedSlug = `${title} ${counter}`
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
    }
    
    if (numberedSlug && !suggestions.includes(numberedSlug)) {
      suggestions.push(numberedSlug)
    }
    counter++
  }
  
  return suggestions.slice(0, maxSuggestions)
}

/**
 * Validate slug format
 */
export function isValidSlug(slug: string): boolean {
  if (!slug) return false
  
  // Check if slug contains only lowercase letters, numbers, and hyphens
  const slugRegex = /^[a-z0-9-]+$/
  
  // Check if slug doesn't start or end with hyphen
  const noLeadingTrailingHyphens = !slug.startsWith('-') && !slug.endsWith('-')
  
  // Check if slug is not too long (max 100 characters)
  const notTooLong = slug.length <= 100
  
  // Check if slug is not too short (min 3 characters)
  const notTooShort = slug.length >= 3
  
  return slugRegex.test(slug) && noLeadingTrailingHyphens && notTooLong && notTooShort
}

/**
 * Clean and optimize slug
 */
export function optimizeSlug(slug: string): string {
  if (!slug) return ''
  
  // Convert to lowercase
  let optimized = slug.toLowerCase()
  
  // Remove multiple consecutive hyphens
  optimized = optimized.replace(/-+/g, '-')
  
  // Remove leading and trailing hyphens
  optimized = optimized.replace(/^-+|-+$/g, '')
  
  // Remove any remaining special characters except hyphens
  optimized = optimized.replace(/[^a-z0-9-]/g, '')
  
  return optimized
}

/**
 * Check if slug is available (you can integrate with your database)
 */
export async function isSlugAvailable(slug: string, currentArticleId?: string): Promise<boolean> {
  // This is a placeholder - you'll need to implement actual database checking
  // For now, we'll just validate the format
  return isValidSlug(slug)
}

/**
 * Get slug suggestions with availability check
 */
export async function getSlugSuggestions(
  title: string, 
  maxSuggestions: number = 3,
  currentArticleId?: string,
  language: string = 'el'
): Promise<Array<{slug: string, available: boolean}>> {
  const suggestions = generateSlugSuggestions(title, maxSuggestions, language)
  
  const results = await Promise.all(
    suggestions.map(async (slug) => ({
      slug,
      available: await isSlugAvailable(slug, currentArticleId)
    }))
  )
  
  return results
}
