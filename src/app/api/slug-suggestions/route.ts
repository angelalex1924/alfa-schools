import { NextRequest, NextResponse } from 'next/server'
import { generateSlugSuggestions, isValidSlug } from '../../../lib/slug-utils'

export async function POST(request: NextRequest) {
  try {
    const { title, maxSuggestions = 3, language = 'el' } = await request.json()

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required and must be a string' },
        { status: 400 }
      )
    }

    // Generate slug suggestions
    const suggestions = generateSlugSuggestions(title, maxSuggestions, language)

    // Format suggestions with validation
    const formattedSuggestions = suggestions.map((slug: string) => ({
      slug,
      original: title,
      valid: isValidSlug(slug),
      length: slug.length
    }))

    return NextResponse.json({
      suggestions: formattedSuggestions
    })

  } catch (error) {
    console.error('Error generating slug suggestions:', error)
    return NextResponse.json(
      { error: 'Failed to generate slug suggestions' },
      { status: 500 }
    )
  }
}
