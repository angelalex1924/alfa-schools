import { NextRequest, NextResponse } from 'next/server'
import { emailTemplates } from '@/lib/email-templates'

export async function GET() {
  try {
    // Return the available email templates
    const templates = emailTemplates.map(template => ({
      id: template.id,
      name: template.name,
      description: template.description,
      category: template.category,
      subject: template.subject
    }))

    return NextResponse.json({
      templates,
      status: 'success'
    })

  } catch (error) {
    console.error('Error loading templates:', error)
    return NextResponse.json(
      { 
        error: 'Failed to load templates',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
