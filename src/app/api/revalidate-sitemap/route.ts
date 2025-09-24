import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Revalidate the sitemap
    revalidatePath('/sitemap.xml')
    
    console.log('✅ Sitemap revalidated successfully')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Sitemap revalidated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Error revalidating sitemap:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to revalidate sitemap' 
      },
      { status: 500 }
    )
  }
}
